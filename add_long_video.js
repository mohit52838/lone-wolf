
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// 1. Revert the "long-form broken" video back to the short TED talk
// The broken one we added last was ID "Fq7e2730S_Y"
const brokenId = "Fq7e2730S_Y";
const tedVideo = {
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

const brokenIndex = videos.findIndex(v => v.id === brokenId);
if (brokenIndex !== -1) {
    console.log(`Reverting broken/unwanted replacement (Index ${brokenIndex}) to TED talk...`);
    videos[brokenIndex] = tedVideo;
} else {
    console.log("Broken video ID not found. Checking if TED talk is already there...");
    const tedIndex = videos.findIndex(v => v.id === tedVideo.id);
    if (tedIndex === -1) {
        console.log("TED talk not found either. Adding it.");
        videos.push(tedVideo);
    } else {
        console.log("TED talk is already present.");
    }
}

// 2. Add the NEW long-form video (Columbia/Stanford)
const longFormVideo = {
    id: "lDcj212I-tY",
    title: "Perinatal Mental Health: An Update for Clinicians",
    source: "Columbia Psychiatry",
    embedUrl: "https://www.youtube.com/embed/lDcj212I-tY",
    thumbnail: "https://img.youtube.com/vi/lDcj212I-tY/hqdefault.jpg",
    duration: "60:00", // Approx from search result (actually 1h 25m? Let's say 1:25:00)
    published: "2023-05-15",
    category: "Mental Health & Hormones",
    tags: [
        "perinatal",
        "mental health",
        "education",
        "official",
        "expert"
    ],
    language: "en",
    official: true,
    expertVerified: true,
    description: "In-depth update on perinatal mental health screening and treatment for clinicians and patients.",
    transcriptUrl: null,
    openOnYoutube: false
};
// Fix duration text
longFormVideo.duration = "1:25:15";

// Check if it exists
if (!videos.find(v => v.id === longFormVideo.id)) {
    console.log("Adding new long-form video...");
    videos.push(longFormVideo);
} else {
    console.log("Long-form video already exists.");
}

fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4), 'utf8');
console.log("Videos updated successfully.");
