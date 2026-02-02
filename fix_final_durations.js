
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sanitizeFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let fixedCount = 0;

    const cleanData = data.map(v => {
        if (!v.duration) return v;
        const d = v.duration.trim();

        // Remove known placeholders
        if (d === "00:30" || d === "0:30" || d === "1 min" || d === "01:00" || d === "00:00") {
            v.duration = "";
            fixedCount++;
        }
        return v;
    });

    if (fixedCount > 0) {
        fs.writeFileSync(filePath, JSON.stringify(cleanData, null, 4), 'utf8');
        console.log(`Cleaned ${fixedCount} entries in ${path.basename(filePath)}`);
    } else {
        console.log(`No changes for ${path.basename(filePath)}`);
    }
};

sanitizeFile(path.join(__dirname, 'src/data/videos.json'));
sanitizeFile(path.join(__dirname, 'src/data/expertTalks.json'));
