
import https from 'https';

const checkVideo = (item) => {
    return new Promise((resolve) => {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.id}&format=json`;
        console.log(`Checking ${item.name} (${item.id})...`);
        https.get(oembedUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const json = JSON.parse(data);
                    console.log(`[PASS] ${item.name} is WORKING. Title: "${json.title}"`);
                    resolve(true);
                } else {
                    console.log(`[FAIL] ${item.name} Status: ${res.statusCode}`);
                    resolve(false);
                }
            });
        }).on('error', err => {
            console.log(`[ERROR] ${item.name}: ${err.message}`);
            resolve(false);
        });
    });
};

const run = async () => {
    // 1. Rachael Watters
    await checkVideo({ id: 'yJ43sM8lH7U', name: 'Rachael Watters' });

    // 2. Fatimah Jackson-Best
    await checkVideo({ id: 'O_J8F4M-8t8', name: 'Fatimah Jackson-Best' });
};

run();
