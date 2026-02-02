
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// 1. Find and replace the BROKEN long-form video (lDcj212I-tY)
const brokenId = "lDcj212I-tY";
const replacementVideo = {
    id: "Fq7e2730S_Y",
    title: "NWHW: Shining a Light on Maternal Mental Health",
    source: "Office on Women's Health (NWHW)",
    embedUrl: "https://www.youtube.com/embed/Fq7e2730S_Y",
    thumbnail: "https://img.youtube.com/vi/Fq7e2730S_Y/hqdefault.jpg",
    duration: "1:34:35",
    published: "2024-05-20",
    category: "Mental Health & Hormones",
    tags: [
        "maternal health",
        "mental health",
        "webinar",
        "official",
        "cdc"
    ],
    language: "en",
    official: true,
    expertVerified: true,
    description: "Full webinar on maternal mental health featuring experts from CDC and OWH.",
    transcriptUrl: null,
    openOnYoutube: false
};

const brokenIndex = videos.findIndex(v => v.id === brokenId);

console.log("Checking for broken video ID:", brokenId);

if (brokenIndex !== -1) {
    console.log(`Found broken video at index ${brokenIndex}. Replaced with NWHW webinar.`);
    videos[brokenIndex] = replacementVideo;
} else {
    // Maybe it's not there if the previous step failed? 
    // Or maybe I should check if replacement is already there
    const replacementIndex = videos.findIndex(v => v.id === replacementVideo.id);
    if (replacementIndex === -1) {
        console.log("Broken video not found, and replacement not found. Appending replacement.");
        videos.push(replacementVideo);
    } else {
        console.log("Replacement video is already present.");
    }
}

// 2. Verify TED talk exists
const tedId = "jOsX_HnJtHU";
const tedIndex = videos.findIndex(v => v.id === tedId);
if (tedIndex !== -1) {
    console.log("Verified: Short TED talk is present.");
} else {
    console.log("WARNING: Short TED talk is MISSING! Adding it back.");
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
console.log("Videos.json updated.");
