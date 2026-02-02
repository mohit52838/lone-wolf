
const verifyVideo = async (id) => {
    try {
        const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const text = await res.text();

        // Match ISO duration (reliable)
        const isoMatch = text.match(/itemprop="duration" content="(PT[^"]+)"/);
        // Match approximate seconds (less reliable but useful backup)
        const secMatch = text.match(/"approxDurationMs":"(\d+)"/);

        if (isoMatch) return isoMatch[1]; // e.g., PT4M
        if (secMatch) return `APPROX_${Math.round(secMatch[1] / 1000)}`;
        return null;
    } catch (e) {
        console.error(`Error fetching ${id}:`, e.message);
        return null;
    }
};

const IDs = ['nLmg4wSHdxQ', 'eK7Gp6AWnuY'];

(async () => {
    console.log("--- START BATCH VERIFICATION ---");
    for (const id of IDs) {
        const result = await verifyVideo(id);
        console.log(`[${id}] -> ${result || 'FAILED'}`);
    }
})();
