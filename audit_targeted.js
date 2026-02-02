
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auditFile = (filePath, label) => {
    console.log(`\n--- Deep Audit ${label} ---`);
    if (!fs.existsSync(filePath)) return;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Targeted search for patterns user mentioned + obvious bad ones
    const suspicious = data.filter(v => {
        if (!v.duration) return false;
        const d = v.duration.toLowerCase();
        return (
            d.includes('min') ||
            d.includes('sec') ||
            d === '0:30' ||
            d === '00:30' ||
            !d.includes(':') // "8 min" wouldn't have a colon if formatted "8 min"
        );
    });

    if (suspicious.length > 0) {
        console.log(`Found ${suspicious.length} suspicious entries:`);
        suspicious.forEach(v => console.log(`  [${v.duration}] ${v.title} (${v.id})`));
    } else {
        console.log("No specific suspicious patterns key-matched.");
    }
};

auditFile(path.join(__dirname, 'src/data/videos.json'), 'Videos');
auditFile(path.join(__dirname, 'src/data/expertTalks.json'), 'Expert Talks');
