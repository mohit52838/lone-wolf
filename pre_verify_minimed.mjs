import fs from 'fs';
import https from 'https';

const candidates = [
    // --- FINAL CHECK FOR NUTRITION ---
    { id: "s0zg-H17y2Q", title: "Christopher Gardner Diet & Microbiome (Stanford)", type: "podcast", category: "Nutrition" },
    { id: "7rNcV6y8Wks", title: "Michael Greger How Not to Die (Google)", type: "podcast", category: "Nutrition" } // Expected ID for Greger
];

const checkVideo = (video) => {
    return new Promise((resolve) => {
        const url = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${video.id}&format=json`;

        const req = https.get(url, (res) => {
            resolve({ ...video, status: res.statusCode === 200 ? 'OK' : 'FAIL', code: res.statusCode });
        });

        req.on('error', (e) => {
            resolve({ ...video, status: 'ERROR', error: e.message });
        });

        req.end();
    });
};

const verifyAll = async () => {
    console.log(`Verifying ${candidates.length} candidates...`);
    const results = await Promise.all(candidates.map(checkVideo));

    const failures = results.filter(r => r.status !== 'OK');
    const successes = results.filter(r => r.status === 'OK');

    console.log(`\n✅ ${successes.length} PASSED`);
    console.log(`❌ ${failures.length} FAILED`);

    if (failures.length > 0) {
        console.log('\nFailed Videos:');
        failures.forEach(f => console.log(`- [${f.code}] ${f.id} (${f.title})`));
    }

    console.log('\nSuccessful IDs:');
    console.log(JSON.stringify(successes.map(s => s.id)));
};

verifyAll();
