
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const verify = () => {
    const videos = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/videos.json'), 'utf8'));
    const expertTalks = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/expertTalks.json'), 'utf8'));

    const check = (list, id, label) => {
        const item = list.find(v => v.id === id) || list.find(v => v.title.includes(id));
        if (item) {
            console.log(`[${label}] Title: "${item.title}" | Duration: "${item.duration}"`);
        } else {
            console.log(`[${label}] NOT FOUND: ${id}`);
        }
    };

    console.log("--- FINAL VERIFICATION ---");
    // 1. Long Podcast (Expert Talks)
    check(expertTalks, "e3pjp4jf208", "LONG");

    // 2. Short Explainer (Videos)
    check(videos, "nLmg4wSHdxQ", "SHORT");

    // 3. Cleaned/Empty (Videos) - Searching by title "Urgent Maternal Warning Signs"
    check(videos, "Urgent Maternal Warning Signs", "EMPTY");
};

verify();
