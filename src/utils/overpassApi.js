// src/utils/overpassApi.js
import { distanceKm } from './distance';

const OVERPASS_INSTANCES = [
    'https://overpass.kumi.systems/api/interpreter', // Usually fastest
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter', // Good backup
    'https://overpass-api.de/api/interpreter' // Often overloaded
];

const fetchWithRace = async (urls, options) => {
    // Helper to race fetch requests
    // We Map each URL to a fetch promise

    // We need to handle failures carefully. Promise.any waits for the first FULFILLED promise.
    // If all reject, it throws an AggregateError.

    const requests = urls.map(async (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 65000); // 65s timeout

        try {
            console.log(`Starting race request to: ${url}`);
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(`Rate limit ${url}`);
                }
                throw new Error(`HTTP ${response.status} from ${url}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            clearTimeout(timeoutId);
            console.warn(`Race failed for ${url}: ${err.message}`);
            throw err; // Propagate error so Promise.any ignores this implementation
        }
    });

    return Promise.any(requests);
};

export const fetchNearbyHealthcare = async (lat, lng, radiusMeters = 5000, bounds = null, searchQuery = '') => {
    let areaFilter = '';
    if (bounds) {
        areaFilter = `(${bounds.south},${bounds.west},${bounds.north},${bounds.east})`;
    } else {
        areaFilter = `(around:${radiusMeters},${lat},${lng})`;
    }

    // Base filters for healthcare facilities
    // We fetch ALL healthcare items in the area and let the client filter them.
    // This avoids expensive regex queries on the Overpass server which cause timeouts.
    const baseFilters = [
        '["healthcare:speciality"="gynaecology"]',
        '["amenity"="clinic"]',
        '["healthcare"="doctor"]',
        '["amenity"="hospital"]',
        '["amenity"="doctors"]'
    ];

    let queryLines = [];

    // Always fetch all facilities in the area
    baseFilters.forEach(filter => {
        queryLines.push(`node${filter}${areaFilter};`);
        queryLines.push(`way${filter}${areaFilter};`);
    });

    const query = `
        [out:json][timeout:60];
        (
          ${queryLines.join('\n          ')}
        );
        out center;
    `;

    try {
        console.log(`Initiating Overpass Search (Fetching all in radius)...`);
        const data = await fetchWithRace(OVERPASS_INSTANCES, {
            method: 'POST',
            body: 'data=' + encodeURIComponent(query),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log("Overpass request successful. Parsing results...");
        return parseOverpassResponse(data.elements, lat, lng);

    } catch (error) {
        console.error("Overpass request failed:", error);
        throw new Error("Unable to fetch data. The map server might be busy.");
    }
};

const parseOverpassResponse = (elements, userLat, userLng) => {
    if (!elements) return [];

    return elements.map(element => {
        const tags = element.tags || {};

        // Determine location (node has lat/lon, way has center.lat/center.lon)
        const lat = element.lat || element.center?.lat;
        const lon = element.lon || element.center?.lon;

        if (!lat || !lon) return null;

        // Determine type
        let type = 'Clinic'; // Default
        if (tags['healthcare:speciality'] === 'gynaecology' || tags['speciality'] === 'gynaecology') {
            type = 'Gynecologist';
        } else if (tags.amenity === 'hospital') {
            type = 'Hospital';
        } else if (tags.healthcare === 'doctor' || tags.amenity === 'doctors') {
            type = 'Doctor';
        } else if (tags.amenity === 'clinic') {
            type = 'Clinic';
        }

        // Determine Name
        let name = tags.name || tags['name:en'] || tags['official_name'] || tags.brand || tags.operator;
        if (!name) {
            // Capitalize first letter of type if used as fallback
            name = `${type} (Unnamed)`;
        }

        // Format address
        let address = tags['addr:full'] || tags['contact:full'];

        if (!address) {
            const addressParts = [
                tags['addr:housename'] || tags['contact:housename'],
                tags['addr:housenumber'] || tags['contact:housenumber'],
                tags['addr:street'] || tags['contact:street'] || tags['addr:place'] || tags['addr:locality'],
                tags['addr:suburb'] || tags['contact:suburb'] || tags['addr:district'],
                tags['addr:city'] || tags['contact:city'] || tags['is_in:city'],
                tags['addr:state'] || tags['is_in:state'],
                tags['addr:postcode'] || tags['contact:postcode'] || tags['postal_code']
            ].filter(Boolean);

            if (addressParts.length > 0) {
                // Deduplicate parts (e.g. if street and locality are same)
                address = [...new Set(addressParts)].join(', ');
            }
        }

        if (!address) {
            address = 'Address not available';
        }

        return {
            id: element.id,
            name: name,
            lat,
            lon,
            type,
            address,
            distance: userLat && userLng ? distanceKm(userLat, userLng, lat, lon) : null,
            tags
        };
    }).filter(Boolean); // Remove nulls
};
