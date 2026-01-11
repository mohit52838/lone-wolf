// src/utils/overpassApi.js
import { distanceKm } from './distance';

const OVERPASS_INSTANCES = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];

export const fetchNearbyHealthcare = async (lat, lng, radiusMeters = 5000, bounds = null) => {
    let areaFilter = '';
    if (bounds) {
        areaFilter = `(${bounds.south},${bounds.west},${bounds.north},${bounds.east})`;
    } else {
        areaFilter = `(around:${radiusMeters},${lat},${lng})`;
    }

    const query = `
        [out:json][timeout:25];
        (
          node["healthcare:speciality"="gynaecology"]${areaFilter};
          node["amenity"="clinic"]${areaFilter};
          node["healthcare"="doctor"]${areaFilter};
          node["amenity"="hospital"]${areaFilter};
          way["healthcare:speciality"="gynaecology"]${areaFilter};
          way["amenity"="clinic"]${areaFilter};
          way["healthcare"="doctor"]${areaFilter};
          way["amenity"="hospital"]${areaFilter};
        );
        out center;
    `;

    let lastError = null;

    for (const apiUrl of OVERPASS_INSTANCES) {
        try {
            console.log(`Fetching from Overpass instance: ${apiUrl}`);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: 'data=' + encodeURIComponent(query),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(`Rate limit exceeded (${response.status})`);
                }
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return parseOverpassResponse(data.elements, lat, lng);

        } catch (error) {
            console.warn(`Failed to fetch from ${apiUrl}:`, error.message);
            lastError = error;
            // Continue to next mirror
        }
    }

    // If we get here, all mirrors failed
    console.error("All Overpass instances failed.", lastError);
    throw lastError || new Error("Failed to fetch healthcare data from all available sources.");
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
