
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// We are replacing the PREVIOUS replacement (jOsX_HnJtHU) or the original broken one if the script didn't run?
// The previous script DID run. So I need to find `jOsX_HnJtHU` now.
const targetId = "jOsX_HnJtHU";

const replacement = {
    id: "Fq7e2730S_Y",
    title: "NWHW: Shining a Light on Maternal Mental Health",
    source: "Office on Women's Health (NWHW)",
    embedUrl: "https://www.youtube.com/embed/Fq7e2730S_Y",
    thumbnail: "https://img.youtube.com/vi/Fq7e2730S_Y/hqdefault.jpg",
    duration: "94:35",
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

const index = videos.findIndex(v => v.id === targetId);

if (index !== -1) {
    console.log(`Found previous replacement video at index ${index}. Updating to long-form webinar...`);
    videos[index] = replacement;
    fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4), 'utf8');
    console.log("Video updated successfully.");
} else {
    console.log(`Video ID ${targetId} not found. Checking for original broken ID (YJ4H22vrRnQ)...`);
    const originalIndex = videos.findIndex(v => v.id === "YJ4H22vrRnQ");
    if (originalIndex !== -1) {
        console.log(`Found original broken video at index ${originalIndex}. Replacing...`);
        videos[originalIndex] = replacement;
        fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4), 'utf8');
        console.log("Video replaced successfully.");
    } else {
        console.log("Neither previous replacement nor original broken video found.");
    }
}
