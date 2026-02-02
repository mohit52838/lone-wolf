
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

const brokenId = "YJ4H22vrRnQ";
const replacement = {
    id: "jOsX_HnJtHU",
    title: "A new way to think about the transition to motherhood",
    source: "TED (Alexandra Sacks)",
    embedUrl: "https://www.youtube.com/embed/jOsX_HnJtHU",
    thumbnail: "https://img.youtube.com/vi/jOsX_HnJtHU/hqdefault.jpg",
    duration: "06:30",
    published: "2018-05-01",
    category: "Mental Health & Hormones",
    tags: [
        "matrescence",
        "motherhood",
        "mental health",
        "ted"
    ],
    language: "en",
    official: true,
    expertVerified: true,
    description: "Alexandra Sacks explains 'matrescence' — the developmental transition into motherhood.",
    transcriptUrl: null,
    openOnYoutube: false
};

const index = videos.findIndex(v => v.id === brokenId);

if (index !== -1) {
    console.log(`Found broken video at index ${index}. Replacing...`);
    videos[index] = replacement;
    fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4), 'utf8');
    console.log("Video replaced successfully.");
} else {
    console.log("Broken video ID not found! Maybe it was already removed?");
}
