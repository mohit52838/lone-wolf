
const https = require('https');

const videoId = 'nLmg4wSHdxQ'; // Ovulation (Short)
const url = `https://www.youtube.com/watch?v=${videoId}`;

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
    }
};

https.get(url, options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        // Look for schema duration
        const metaMatch = data.match(/itemprop="duration" content="(PT[^"]+)"/);
        // Look for lengthSeconds in JSON
        const jsonMatch = data.match(/"lengthSeconds":"(\d+)"/);

        console.log("--- FETCH RESULT ---");
        if (metaMatch) console.log(`Meta ISO: ${metaMatch[1]}`);
        if (jsonMatch) console.log(`Seconds: ${jsonMatch[1]}`);

        if (!metaMatch && !jsonMatch) {
            console.log("No duration found. Page title match: ", data.match(/<title>(.*?)<\/title>/)?.[1]);
        }
    });
}).on('error', (e) => {
    console.error(e);
});
