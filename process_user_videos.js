const fs = require('fs');
const path = require('path');

const RAW_PATH = path.join(process.cwd(), 'raw_videos.json');
const VIDEOS_PATH = path.join(process.cwd(), 'src/data/videos.json');

const processVideos = () => {
    try {
        console.log('Reading raw videos from:', RAW_PATH);
        const rawData = fs.readFileSync(RAW_PATH, 'utf8');
        let videos = JSON.parse(rawData);

        const processedVideos = [];
        const seenIds = new Set();

        for (const video of videos) {
            // Clean strings (remove newlines and trim)
            for (const key in video) {
                if (typeof video[key] === 'string') {
                    video[key] = video[key].replace(/\n/g, '').trim();
                }
            }

            const id = video.id;

            // Filter out placeholders
            if (id.startsWith('SAMPLE')) {
                console.log(`Skipping placeholder ${id}`);
                continue;
            }

            // Deduplicate
            if (seenIds.has(id)) {
                console.log(`Skipping duplicate ${id}`);
                continue;
            }

            // Ensure required fields
            if (!video.tags) video.tags = [];

            // Set embedUrl based on ID (assuming all non-placeholders are embeddable unless known otherwise)
            // The user provided embedUrls, so we keep them, but cleaned.
            // However, I previously identified 'gqFOi9bQJ9c' (TED-Ed) as blocked.
            // I should probably respect my previous finding if it's in the list.
            if (id === 'gqFOi9bQJ9c') {
                video.embedUrl = null; // Block embed for TED-Ed
                video.openOnYoutube = true;
            } else {
                // Ensure embedUrl is set if missing (though user provided it)
                if (!video.embedUrl) {
                    video.embedUrl = `https://www.youtube.com/embed/${id}`;
                }
                video.openOnYoutube = false;
            }

            seenIds.add(id);
            processedVideos.push(video);
        }

        console.log(`Writing ${processedVideos.length} videos to ${VIDEOS_PATH}`);
        fs.writeFileSync(VIDEOS_PATH, JSON.stringify(processedVideos, null, 4));
        console.log('Done.');

    } catch (error) {
        console.error('Error processing videos:', error);
    }
};

processVideos();
