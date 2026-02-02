
import https from 'https';

const checkVideo = (item) => {
    return new Promise((resolve) => {
        // Check 1: OEmbed (Best for embeddability)
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.id}&format=json`;
        https.get(oembedUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const json = JSON.parse(data);
                    console.log(`[PASS] ${item.name} (${item.id}) is EMBEDDABLE. Title: "${json.title}"`);
                    resolve(true);
                } else {
                    console.log(`[FAIL] ${item.name} (${item.id}) OEmbed Status: ${res.statusCode} (Likely not embeddable)`);
                    resolve(false);
                }
            });
        }).on('error', err => {
            console.log(`[ERROR] ${item.name} (${item.id}): ${err.message}`);
            resolve(false);
        });
    });
};

const run = async () => {
    // 1. Check known good
    await checkVideo({ id: 'jOsX_HnJtHU', name: 'Short TED Talk' });

    // 2. Check candidates (replace with IDs I find)
    // await checkVideo({ id: '...', name: 'Candidate' });
};

run();
