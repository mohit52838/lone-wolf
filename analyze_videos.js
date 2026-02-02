
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

console.log('Total videos:', videos.length);

const idMap = {};
const titleMap = {};

videos.forEach(v => {
    // Check ID duplicates
    if (idMap[v.id]) {
        console.log(`Duplicate ID found: ${v.id}`);
        console.log(`  Existing category: ${idMap[v.id].category}`);
        console.log(`  New category: ${v.category}`);
    } else {
        idMap[v.id] = v;
    }

    // Check Title duplicates
    if (titleMap[v.title]) {
        console.log(`Duplicate Title found: "${v.title}"`);
        console.log(`  Existing category: ${titleMap[v.title].category}`);
        console.log(`  New category: ${v.category}`);
    } else {
        titleMap[v.title] = v;
    }
});

console.log('Duplicate check complete.');
