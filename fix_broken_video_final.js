
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// 1. Find and replace the BROKEN "NWHW" video (Fq7e2730S_Y)
const brokenId = "Fq7e2730S_Y";
const replacementVideo = {
    id: "sW4f3Y9qN0k",
    title: "The Power of the Maternal Brain | Nicole Pensak",
    source: "TEDxBethesdaWomen",
    embedUrl: "https://www.youtube.com/embed/sW4f3Y9qN0k",
    thumbnail: "https://img.youtube.com/vi/sW4f3Y9qN0k/hqdefault.jpg",
    duration: "15:00", // Estimated TEDx duration
    published: "2018-05-30",
    category: "Mental Health & Hormones",
    tags: [
        "maternal health",
        "brain",
        "neuroscience",
        "tedx",
        "motherhood"
    ],
    language: "en",
    official: true,
    expertVerified: true,
    description: "Dr. Nicole Pensak discusses the neuroscience of the maternal brain and its adaptability.",
    transcriptUrl: null,
    openOnYoutube: false
};

const brokenIndex = videos.findIndex(v => v.id === brokenId);

console.log("Checking for broken video ID:", brokenId);

if (brokenIndex !== -1) {
    console.log(`Found broken/unverifiable video at index ${brokenIndex}. Replaced with TEDx talk.`);
    videos[brokenIndex] = replacementVideo;
} else {
    // Check if maybe we should search for the older broken one (lDcj...) just in case?
    const oldBrokenId = "lDcj212I-tY";
    const oldIndex = videos.findIndex(v => v.id === oldBrokenId);
    if (oldIndex !== -1) {
        console.log(`Found older broken video (lDcj...) at index ${oldIndex}. Replaced with TEDx talk.`);
        videos[oldIndex] = replacementVideo;
    } else {
        // Check if ANY valid replacement is there
        if (!videos.find(v => v.id === replacementVideo.id)) {
            console.log("Adding new TEDx video as usage fallback.");
            videos.push(replacementVideo);
        } else {
            console.log("Replacement video already exists.");
        }
    }
}

// 2. Ensure the short TED talk (jOsX_HnJtHU) is still there
const tedId = "jOsX_HnJtHU";
if (!videos.find(v => v.id === tedId)) {
    console.log("Short TED talk missing. Adding it back.");
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
console.log("Videos updated successfully.");
