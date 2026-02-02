
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auditFile = (filePath, label) => {
    console.log(`\n--- Auditing ${label} ---`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const durationCounts = {};

    data.forEach(v => {
        const d = v.duration;
        if (!d) return;
        if (!durationCounts[d]) durationCounts[d] = 0;
        durationCounts[d]++;
    });

    console.log("Durations appearing 3+ times (Possible Placeholders):");
    Object.entries(durationCounts)
        .filter(([dur, count]) => count >= 3)
        .sort((a, b) => b[1] - a[1])
        .forEach(([dur, count]) => console.log(`  "${dur}": ${count} videos`));
};

auditFile(path.join(__dirname, 'src/data/videos.json'), 'Videos');
auditFile(path.join(__dirname, 'src/data/expertTalks.json'), 'Expert Talks');
