const fs = require('fs');
const path = require('path');

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

let errors = 0;
console.log(`Checking ${videos.length} videos...`);

videos.forEach((video, index) => {
    if (!video.id) {
        console.error(`Error: Video at index ${index} has no ID.`);
        errors++;
    } else if (video.id.includes('http') || video.id.includes('youtube.com')) {
        console.error(`Error: Video at index ${index} (${video.title}) has a URL as ID: ${video.id}`);
        errors++;
    } else if (video.id.startsWith('SAMPLE')) {
        console.error(`Error: Video at index ${index} (${video.title}) has a SAMPLE ID: ${video.id}`);
        errors++;
    }

    if (!video.sourceUrl) {
        console.error(`Error: Video at index ${index} (${video.title}) has no sourceUrl.`);
        errors++;
    }
});

if (errors === 0) {
    console.log('All video data checks passed!');
} else {
    console.log(`Found ${errors} errors.`);
}
