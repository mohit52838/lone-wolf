
import https from 'https';

const checkVideo = (item) => {
    return new Promise((resolve) => {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.id}&format=json`;
        https.get(oembedUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const json = JSON.parse(data);
                    console.log(`[PASS] ${item.name} (${item.id}) is WORKING. Title: "${json.title}"`);
                    resolve(true);
                } else {
                    console.log(`[FAIL] ${item.name} (${item.id}) is BROKEN/RESTRICTED. Status: ${res.statusCode}`);
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
    // 1. Check the claimed "Broken" one
    await checkVideo({ id: 'sW4f3Y9qN0k', name: 'TEDx Nicole Pensak' });

    // 2. Control
    await checkVideo({ id: 'jOsX_HnJtHU', name: 'Short TED Talk' });
};

run();
