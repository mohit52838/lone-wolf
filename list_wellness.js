
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

const wellness = videos.filter(v => v.category === 'Wellness');
console.log('Remaining Wellness videos:');
wellness.forEach(v => {
    console.log(`- [${v.id}] ${v.title}`);
});
