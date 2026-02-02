
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const badDurations = [
    "0:30", "00:30", "30", "30s", "30 sec",
    "1 min", "1:00", "01:00",
    "0:00", "00:00",
    "4 min" // Seems like a placeholder if repeated too much, but I'll stick to the proven ones first.
];

// Based on audit, "0:30" appeared 1990 times!
// "1 min" isn't in my top list but user mentioned it.

const sanitizeFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;

    console.log(`Sanitizing ${path.basename(filePath)}...`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let fixedCount = 0;

    const cleanData = data.map(v => {
        if (!v.duration) return v;

        // Specific targeting of the "1990 videos" issue
        if (v.duration === "0:30" || v.duration === "1 min" || v.duration === "01:00") {
            console.log(`  Unknown duration '${v.duration}' removed for ${v.title}`);
            v.duration = ""; // Clear it
            fixedCount++;
        }

        return v;
    });

    if (fixedCount > 0) {
        fs.writeFileSync(filePath, JSON.stringify(cleanData, null, 4), 'utf8');
        console.log(`Fixed ${fixedCount} entries.`);
    } else {
        console.log("No changes needed.");
    }
};

sanitizeFile(path.join(__dirname, 'src/data/videos.json'));
sanitizeFile(path.join(__dirname, 'src/data/expertTalks.json'));
