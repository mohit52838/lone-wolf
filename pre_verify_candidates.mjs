import fs from 'fs';
import https from 'https';

const candidates = [
    // --- EXISTING VALID ---
    { id: "e5LYGzKUPlE", title: "Women are not small men (TED)", type: "expert-talk", category: "General Health" },
    { id: "9qKWXEKqZRI", title: "Maternal Mental Health Forum (Harvard Affil)", type: "podcast", category: "Maternal Health" },
    { id: "Ks-_Mh1QhMc", title: "Amy Cuddy (TED)", type: "expert-talk", category: "Mental Health" },
    { id: "psN1DORYYV0", title: "Brene Brown (TED)", type: "expert-talk", category: "Mental Health" },
    { id: "2wseM6wWd74", title: "Elizabeth Blackburn (TED)", type: "expert-talk", category: "Aging & Genetics" },
    { id: "UxLRv0FEndM", title: "Sophie Scott (TED)", type: "expert-talk", category: "Brain Health" },

    // --- NEW PODCAST CANDIDATES (Grand Rounds/Seminars) ---
    { id: "e3pjp4jf208", title: "UCSF Covid Grand Rounds", type: "podcast", category: "Public Health" },
    { id: "MefmQL0fY3o", title: "Harvard Fauci Grand Rounds", type: "podcast", category: "Public Health" },
    { id: "ZpXn1WvV5n4", title: "JHU Psychiatry Grand Rounds 1", type: "podcast", category: "Mental Health" },
    { id: "s24k-sI6uD4", title: "JHU Psychiatry Grand Rounds 2", type: "podcast", category: "Mental Health" },
    { id: "qKzZJ4Xz0e0", title: "JHU ID Grand Rounds", type: "podcast", category: "General Health" },
    { id: "gdVKVY5de-U", title: "CDC Maternal Grand Rounds", type: "podcast", category: "Maternal Health" },
    { id: "sR2E8_xI_fI", title: "WHO Mental Health Launch", type: "podcast", category: "Mental Health" },
    { id: "n1I-jB5Nl2M", title: "NIH Director Women's Health", type: "podcast", category: "Research" },
    { id: "L0dE3yXbH5Q", title: "NIH Innovation Gap", type: "podcast", category: "Research" },
    { id: "d6y8mP7R2b0", title: "Bridging Health Gap", type: "podcast", category: "Research" },
    { id: "dBnniua6-oM", title: "Sugar The Bitter Truth (UCTV)", type: "podcast", category: "Nutrition" },
    { id: "pNHcXmiYsBk", title: "Harvard Sleep Deficit", type: "podcast", category: "Wellness" },
    { id: "Ft9N2-CEPzc", title: "Stanford Huberman Sleep", type: "podcast", category: "Wellness" },

    // --- NEW EXPERT TALK CANDIDATES (TED/Official) ---
    { id: "IkeuKPZxEhM", title: "Alua Arthur (TED)", type: "expert-talk", category: "Wellness" },
    { id: "cheqkrcHkrI", title: "Jen Gunter Menopause (TED)", type: "expert-talk", category: "Menopause" },
    { id: "OGb04i2i9dI", title: "Lisa Mosconi Menopause (TED)", type: "expert-talk", category: "Menopause" },
    { id: "P2AUat93a8Q", title: "Esther Perel Infidelity (TED)", type: "expert-talk", category: "Mental Health" },
    { id: "Kn5JRgz3W0o", title: "Margaret Heffernan (TED)", type: "expert-talk", category: "Research" },
    { id: "A427oVj739Y", title: "Female Brain Leadership (TEDx)", type: "expert-talk", category: "Brain Health" },
    { id: "g4Q_8zWvj84", title: "Lisa Mosconi Brains", type: "expert-talk", category: "Brain Health" },
    { id: "95ovIJ3dsNk", title: "Nadine Burke Harris Trauma", type: "expert-talk", category: "Mental Health" },
    { id: "MB5IX-np5fE", title: "Johann Hari Depression", type: "expert-talk", category: "Mental Health" },
    { id: "NDQ1LUPLFco", title: "Susan David Emotional Agility", type: "expert-talk", category: "Mental Health" }, // Placeholder ID - verify or replace
    { id: "0gks6ceq4eQ", title: "Lisa Feldman Barrett Emotions", type: "expert-talk", category: "Mental Health" }, // Placeholder ID - verify or replace

    // --- RE-VERIFYING OLD ---
    { id: "e5LYGzKUPlE", title: "Women not small men", type: "expert-talk", category: "General Health" },
    { id: "9qKWXEKqZRI", title: "Maternal Mental Health", type: "podcast", category: "Maternal Health" },
    { id: "Ks-_Mh1QhMc", title: "Amy Cuddy", type: "expert-talk", category: "Mental Health" },
    { id: "psN1DORYYV0", title: "Brene Brown", type: "expert-talk", category: "Mental Health" },
    { id: "2wseM6wWd74", title: "Elizabeth Blackburn", type: "expert-talk", category: "Aging & Genetics" },
    { id: "UxLRv0FEndM", title: "Sophie Scott", type: "expert-talk", category: "Brain Health" },
];

const checkVideo = (video) => {
    return new Promise((resolve) => {
        const url = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${video.id}&format=json`;

        const req = https.get(url, (res) => {
            // 401/403 often mean valid ID but no embed, which acts as fail for us.
            // 404 means deleted/wrong ID
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

    // Output successes for easy copying
    console.log('\nSuccessful IDs:');
    console.log(JSON.stringify(successes.map(s => s.id)));
};

verifyAll();
