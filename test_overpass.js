
// using global fetch

const ENDPOINTS = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    'https://overpass-api.de/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter'
];

const QUERY = `[out:json][timeout:10];
(
  node["amenity"="hospital"](18.5204,73.8567,18.6204,73.9567);
);
out body;>;out skel qt;`;

async function testEndpoint(url) {
    const start = Date.now();
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url + '?data=' + encodeURIComponent(QUERY), {
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        const duration = Date.now() - start;
        console.log(`[SUCCESS] ${url}: ${duration}ms, Size: ${text.length} bytes`);
        return { url, duration, success: true };
    } catch (e) {
        const duration = Date.now() - start;
        console.log(`[FAILED] ${url}: ${duration}ms - ${e.message}`);
        return { url, duration, success: false, error: e.message };
    }
}

async function run() {
    console.log("Starting Overpass API Benchmark...");
    // Run sequentially to match current app behavior roughly
    // But also we want to see independent times.
    // Let's run them in parallel to save time for this test.

    await Promise.all(ENDPOINTS.map(testEndpoint));
}

run();
