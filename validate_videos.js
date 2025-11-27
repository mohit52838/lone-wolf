const fs = require('fs');
const https = require('https');
const path = require('path');

const RAW_PATH = path.join(process.cwd(), 'raw_videos_v2.json');
const OUTPUT_PATH = path.join(process.cwd(), 'src/data/videos.json');

// Known blocked IDs that oEmbed might not catch or that we want to explicitly exclude based on user feedback
const EXPLICIT_BLOCK_LIST = [
    'gqFOi9bQJ9c', // TED-Ed Anatomy (User previously flagged this, and now wants ONLY embeddable)
];

const checkEmbeddability = (videoId) => {
    return new Promise((resolve) => {
        if (EXPLICIT_BLOCK_LIST.includes(videoId)) {
            console.log(`[${videoId}] Explicitly blocked.`);
            resolve(false);
            return;
        }

        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

        https.get(url, (res) => {
            if (res.statusCode === 200) {
                resolve(true);
            } else {
                console.log(`[${videoId}] oEmbed failed: ${res.statusCode}`);
                resolve(false);
            }
        }).on('error', (e) => {
            console.error(`[${videoId}] Error checking oEmbed: ${e.message}`);
            resolve(false);
        });
    });
};

const processVideos = async () => {
    try {
        const rawData = fs.readFileSync(RAW_PATH, 'utf8');
        const videos = JSON.parse(rawData);
        const validVideos = [];
        const seenIds = new Set();

        console.log(`Processing ${videos.length} videos...`);

        for (const video of videos) {
            // Basic cleanup
            const id = video.id.trim();
            if (seenIds.has(id)) continue;

            // Check embeddability
            const isEmbeddable = await checkEmbeddability(id);

            if (isEmbeddable) {
                // Standardize object
                const cleanVideo = {
                    id: id,
                    title: video.title.trim(),
                    source: video.source.trim(),
                    sourceUrl: `https://www.youtube.com/watch?v=${id}`,
                    embedUrl: `https://www.youtube.com/embed/${id}`,
                    thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                    duration: video.duration || "05:00",
                    published: video.published || "2020-01-01",
                    category: video.category.trim(),
                    tags: video.tags || [],
                    language: video.language || "en",
                    official: !!video.official,
                    expertVerified: !!video.expertVerified,
                    description: video.description.trim(),
                    transcriptUrl: null,
                    openOnYoutube: false // Always false as we are filtering for embeddable
                };

                validVideos.push(cleanVideo);
                seenIds.add(id);
                process.stdout.write('.');
            } else {
                process.stdout.write('x');
            }
        }

        console.log(`\n\nValidation complete.`);
        console.log(`Total input: ${videos.length}`);
        console.log(`Valid embeddable videos: ${validVideos.length}`);

        if (validVideos.length < 40) {
            console.warn("WARNING: Valid video count is below 40. You may need to add more sources.");
        }

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(validVideos, null, 4));
        console.log(`Written to ${OUTPUT_PATH}`);

    } catch (error) {
        console.error("Fatal error:", error);
    }
};

processVideos();
