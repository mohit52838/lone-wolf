
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const count = (file) => {
    const p = path.join(__dirname, 'src/data', file);
    if (!fs.existsSync(p)) return 0;
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    console.log(`${file}: ${data.length} items`);
};

count('videos.json');
count('expertTalks.json');
