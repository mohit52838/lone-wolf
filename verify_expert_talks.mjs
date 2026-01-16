import fs from 'fs';
import path from 'path';
import https from 'https';

const filePath = path.join(process.cwd(), 'src', 'data', 'expertTalks.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Verifying ${data.length} videos...`);

const checkVideo = (video) => {
    return new Promise((resolve) => {
        const url = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${video.id}&format=json`;

        const req = https.get(url, (res) => {
            if (res.statusCode === 200) {
                // Video is valid and embeddable
                resolve({ id: video.id, status: 'OK', title: video.title });
            } else {
                // Video might be unavailable or not embeddable
                resolve({ id: video.id, status: 'FAIL', code: res.statusCode, title: video.title });
            }
        });

        req.on('error', (e) => {
            resolve({ id: video.id, status: 'ERROR', error: e.message, title: video.title });
        });

        req.end();
    });
};

const verifyAll = async () => {
    const results = await Promise.all(data.map(checkVideo));

    const failures = results.filter(r => r.status !== 'OK');

    if (failures.length > 0) {
        console.error('\n❌ FOUND FAILED VIDEOS:');
        failures.forEach(f => console.error(`[${f.status}] ${f.id} - ${f.title}`));
        process.exit(1);
    } else {
        console.log('\n✅ ALL VIDEOS VERIFIED SUCCESSFULLY.');
        process.exit(0);
    }
};

verifyAll();
