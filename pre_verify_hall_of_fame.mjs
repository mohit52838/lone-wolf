import fs from 'fs';
import https from 'https';

const candidates = [
    // Hall of Fame Replacements
    { id: "tI9eX_W2M7g", title: "Sapolsky Stress (Stanford)", type: "podcast", category: "Mental Health" }, // ~1h20m
    { id: "dBnniua6-oM", title: "Lustig Sugar (UCTV)", type: "podcast", category: "Nutrition" }, // ~1h30m
    { id: "pwaWilO_Pig", title: "Matthew Walker Sleep (Google)", type: "podcast", category: "Wellness" }, // ~1h
    { id: "N7y6rG6YjD0", title: "Roland Griffiths Psilocybin (JHU)", type: "podcast", category: "Research" }, // ~1h
    { id: "3Xh6A6Yj6C0", title: "Stanford Long Covid", type: "podcast", category: "Public Health" }, // ~1h
    // Backup
    { id: "mNhP9uXQ1jo", title: "Harvard Exercise (Lieberman)", type: "podcast", category: "Wellness" }
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
