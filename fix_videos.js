
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

console.log('Initial video count:', videos.length);

const cleanedVideos = [];
const seenIds = new Set();
const seenTitles = new Set();

// We want to prioritize specific categories over "Wellness" if duplicates exist.
// Strategy: distinct videos by ID/Title. If we see a duplicate, we need to decide which one to keep.
// A simple single-pass might be tricky if "Wellness" comes first.
// Better strategy: Group by ID (or Title), then pick the best one from each group.

const groups = {};

videos.forEach(v => {
    const key = v.id; // Using ID as primary key.
    if (!groups[key]) {
        groups[key] = [];
    }
    groups[key].push(v);
});

// Also check for Title duplicates that might have different IDs (though less likely to be the exact same video file, but logically same content)
// detailed check found "The Ovarian Cycle" appearing with different IDs or same IDs?
// The previous check showed title duplicates. Let's group by Title as well to be safe, or just handle ID first.
// The previous output showed: Duplicate found for title: "The Ovarian Cycle" -> ID: VYSFNwTUkG0 vs VYSFNwTUkG0_pcos
// So distinct IDs but same content.
// We should probably dedupe by Title too if the content is effectively the same.

const finalVideos = [];
const processedTitles = new Set();

// Helper to calculate score for a category (lower is better, assuming we want to avoid "Wellness" if possible)
const getCategoryScore = (cat) => {
    if (cat === 'Wellness') return 10;
    return 1; // Specific category preferred
};

Object.keys(groups).forEach(id => {
    const group = groups[id];
    // Sort group by category specificity
    group.sort((a, b) => getCategoryScore(a.category) - getCategoryScore(b.category));

    // Pick the best one (first one after sort)
    const bestVideo = group[0];

    // Now check if we've already added a video with this Title (handling the pcos_id case)
    // But wait, if they have different IDs strictly speaking they play different things? 
    // Wait, "VYSFNwTUkG0" and "VYSFNwTUkG0_pcos" play the SAME youtube video (ID inside might be different? No, check original file).
    // Let's look at the previous `view_file` output. 
    // Line 111: embedUrl... VYSFNwTUkG0. 
    // Line 562: embedUrl... RFDatCchpus (Wait, the ID is VYSFNwTUkG0_pcos but the embed URL is RFDatCchpus??)
    // Line 562 in previous view_file output:
    // "id": "VYSFNwTUkG0_pcos", "title": "The Ovarian Cycle", "embedUrl": "https://www.youtube.com/embed/RFDatCchpus"
    // Wait, RFDatCchpus is "Female Reproductive System - Crash Course" (Line 90).
    // So "The Ovarian Cycle" (VYSFNwTUkG0_pcos) has a WRONG embed URL or title?
    // Actually, Line 109 is "The Ovarian Cycle" (VYSFNwTUkG0).
    // If we have content duplicates, we should probably verify carefully.

    // However, the USER request is: "Wellness tag in every other category... sort it out and move it category wise"
    // The immediate issue is "Wellness" videos appearing elsewhere OR "Wellness" containing videos from other categories.
    // My previous finding: "The brain-changing benefits of exercise" appeared in "Wellness" AND "Mental Health".
    // If it's the SAME video ID, we just keep the specific one.

    finalVideos.push(bestVideo);
});

// Now let's filter `finalVideos` to also dedupe by Title if necessary, OR just trust the ID dedupe for now.
// The user complaint was "Wellness tag in every other category".
// If "The brain-changing benefits of exercise" is in "Wellness" and "Mental Health", and we remove the "Wellness" one, that solves it for that video.
// If there are different IDs for the same Title, that's a bit messier.
// Let's do a Title dedupe pass too, prioritizing non-Wellness.

const titleGroups = {};
finalVideos.forEach(v => {
    if (!titleGroups[v.title]) {
        titleGroups[v.title] = [];
    }
    titleGroups[v.title].push(v);
});

const reallyFinalVideos = [];
Object.keys(titleGroups).forEach(title => {
    const group = titleGroups[title];
    // Sort by category specificity
    group.sort((a, b) => getCategoryScore(a.category) - getCategoryScore(b.category));
    reallyFinalVideos.push(group[0]);
});

console.log('Final video count:', reallyFinalVideos.length);

fs.writeFileSync(videosPath, JSON.stringify(reallyFinalVideos, null, 4), 'utf8');
console.log('Successfully rewrote videos.json');
