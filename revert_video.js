
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// 1. Remove the BROKEN/RESTRICTED "TEDx" video (sW4f3Y9qN0k)
const brokenId = "sW4f3Y9qN0k";
const brokenIndex = videos.findIndex(v => v.id === brokenId);

if (brokenIndex !== -1) {
    console.log(`Removing restricted video ${brokenId}.`);
    videos.splice(brokenIndex, 1);
}

// 2. Also remove NWHW if it crept in
const nwhwId = "Fq7e2730S_Y";
const nwhwIndex = videos.findIndex(v => v.id === nwhwId);
if (nwhwIndex !== -1) {
    console.log(`Removing restricted video ${nwhwId}.`);
    videos.splice(nwhwIndex, 1);
}

// 3. Ensure Short TED talk is there
const tedId = "jOsX_HnJtHU";
if (!videos.find(v => v.id === tedId)) {
    console.log("Restoring Short TED Talk.");
    videos.push({
        id: "jOsX_HnJtHU",
        title: "A new way to think about the transition to motherhood",
        source: "TED (Alexandra Sacks)",
        embedUrl: "https://www.youtube.com/embed/jOsX_HnJtHU",
        thumbnail: "https://img.youtube.com/vi/jOsX_HnJtHU/hqdefault.jpg",
        duration: "06:30",
        published: "2018-05-01",
        category: "Mental Health & Hormones",
        tags: ["matrescence", "motherhood", "mental health", "ted"],
        language: "en",
        official: true,
        expertVerified: true,
        description: "Alexandra Sacks explains 'matrescence' — the developmental transition into motherhood.",
        transcriptUrl: null,
        openOnYoutube: false
    });
}

fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4), 'utf8');
console.log("Videos reverted to safe state.");
