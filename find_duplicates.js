
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

const titleMap = {};

videos.forEach((v, index) => {
    if (titleMap[v.title]) {
        console.log(`\nDuplicate found for title: "${v.title}"`);
        console.log(`1. ID: ${titleMap[v.title].id}, Category: "${titleMap[v.title].category}"`);
        console.log(`2. ID: ${v.id}, Category: "${v.category}"`);
    } else {
        titleMap[v.title] = v;
    }
});
