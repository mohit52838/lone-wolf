
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

const target = "Maternal Mental Health: Know the Signs";
const found = videos.find(v => v.title.includes("Maternal Mental Health") || v.title === target);

if (found) {
    console.log('Video Found:');
    console.log(JSON.stringify(found, null, 2));
} else {
    console.log('Video NOT found with exact or partial match.');
}
