
import https from 'https';

const idsToCheck = [
    { id: 'jOsX_HnJtHU', name: 'Short TED Talk (Expected Working)' },
    { id: 'sW4f3Y9qN0k', name: 'TEDx Nicole Pensak (Suspected Broken)' },
    { id: 'dQw4w9WgXcQ', name: 'Rick Astley (Control)' }
];

idsToCheck.forEach(item => {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.id}&format=json`;

    https.get(oembedUrl, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`[${item.name}] ID: ${item.id} -> Status: ${res.statusCode}`);
            if (res.statusCode === 200) {
                const json = JSON.parse(data);
                console.log(`   Title: ${json.title}`);
            }
        });
    }).on('error', err => {
        console.log(`[${item.name}] Error: ${err.message}`);
    });
});
