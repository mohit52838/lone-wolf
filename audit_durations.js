
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auditFile = (filePath, label) => {
    console.log(`\n--- Auditing ${label} ---`);
    if (!fs.existsSync(filePath)) {
        console.log("File not found.");
        return;
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const durationCounts = {};
    const weirdDurations = [];

    data.forEach(v => {
        const d = v.duration;
        if (!d) {
            if (!durationCounts['(missing)']) durationCounts['(missing)'] = 0;
            durationCounts['(missing)']++;
            return;
        }

        // Count frequency
        if (!durationCounts[d]) durationCounts[d] = 0;
        durationCounts[d]++;

        // Check format (simple check for colon)
        if (!d.includes(':')) {
            weirdDurations.push({ id: v.id, title: v.title, duration: d });
        }
    });

    console.log("Top 10 Most Common Durations:");
    Object.entries(durationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([dur, count]) => console.log(`  "${dur}": ${count}`));

    console.log("\nDurations without ':' (Potentially '1 min' etc):");
    if (weirdDurations.length > 0) {
        weirdDurations.forEach(w => console.log(`  [${w.duration}] ${w.title} (${w.id})`));
    } else {
        console.log("  None found.");
    }
};

auditFile(path.join(__dirname, 'src/data/videos.json'), 'Videos');
auditFile(path.join(__dirname, 'src/data/expertTalks.json'), 'Expert Talks');
