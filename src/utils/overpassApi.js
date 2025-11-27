// src/utils/overpassApi.js
import { distanceKm } from './distance';

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

export const fetchNearbyHealthcare = async (lat, lng, radiusMeters = 5000, bounds = null) => {
    // Construct the query
    // We use a timeout of 25 seconds
    // We search for nodes and ways with specific tags

    let areaFilter = '';
    if (bounds) {
        // If bounds are provided, use bbox: (south,west,north,east)
        areaFilter = `(${bounds.south},${bounds.west},${bounds.north},${bounds.east})`;
    } else {
        // Otherwise use around:radius,lat,lon
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

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s client timeout

        const response = await fetch(OVERPASS_API_URL, {
            method: 'POST',
            body: 'data=' + encodeURIComponent(query),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Overpass API error: ${response.status}`);
        }

        const data = await response.json();
        return parseOverpassResponse(data.elements, lat, lng);

    } catch (error) {
        console.error("Error fetching healthcare data:", error);
        throw error;
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

        // Format address
        const addressParts = [
            tags['addr:housenumber'],
            tags['addr:street'],
            tags['addr:suburb'],
            tags['addr:city'],
            tags['addr:postcode']
        ].filter(Boolean);

        const address = addressParts.length > 0 ? addressParts.join(', ') : 'Address not available';

        return {
            id: element.id,
            name: tags.name || `${type} (Unnamed)`,
            lat,
            lon,
            type,
            address,
            distance: userLat && userLng ? distanceKm(userLat, userLng, lat, lon) : null,
            tags
        };
    }).filter(Boolean); // Remove nulls
};
