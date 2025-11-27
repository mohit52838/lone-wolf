const fs = require('fs');
const https = require('https');
const path = require('path');

const VIDEOS_PATH = path.join(process.cwd(), 'src/data/videos.json');
const BACKUP_DIR = path.join(process.cwd(), 'src/data/backups');

if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const BACKUP_PATH = path.join(BACKUP_DIR, 'videos-validation-report-' + new Date().toISOString().replace(/[:.]/g, '-') + '.json');

const REPLACEMENTS = {
    'SAMPLE032': 'p4vWc6v7Tj4', // NHS Menstrual Disorders
    'SAMPLE033': 'kS5gVvLzJ1o', // Harvard Sleep
    'SAMPLE036': 't20iL40b3k0', // Johns Hopkins Pelvic Pain
};

const checkOembed = (id) => {
    return new Promise((resolve) => {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
        const req = https.get(url, (res) => {
            if (res.statusCode === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        req.on('error', (e) => {
            console.error(`Error checking ${id}: ${e.message}`);
            resolve(false);
        });
        req.end();
    });
};

const processVideos = async () => {
    try {
        console.log('Reading videos from:', VIDEOS_PATH);
        const rawData = fs.readFileSync(VIDEOS_PATH, 'utf8');
        let videos = JSON.parse(rawData);

        const report = {
            added: [],
            replaced: [],
            removed: [],
            embedBlocked: [],
            total_final_count: 0
        };

        const processedVideos = [];
        const seenIds = new Set();

        for (const video of videos) {
            let id = video.id;
            let isReplacement = false;

            if (REPLACEMENTS[id]) {
                console.log(`Replacing ${id} with ${REPLACEMENTS[id]}`);
                report.replaced.push({ original: id, new: REPLACEMENTS[id] });
                id = REPLACEMENTS[id];
                video.id = id;
                video.sourceUrl = `https://www.youtube.com/watch?v=${id}`;
                video.embedUrl = `https://www.youtube.com/embed/${id}`;
                video.thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                isReplacement = true;
            }

            if (id.startsWith('SAMPLE') && !isReplacement) {
                console.log(`Removing placeholder ${id}`);
                report.removed.push(id);
                continue;
            }

            if (seenIds.has(id)) {
                console.log(`Removing duplicate ${id}`);
                continue;
            }

            const isEmbeddable = await checkOembed(id);
            if (!isEmbeddable) {
                console.log(`Video ${id} is not embeddable.`);
                video.embedUrl = null;
                video.openOnYoutube = true;
                report.embedBlocked.push(id);
            } else {
                video.embedUrl = `https://www.youtube.com/embed/${id}`;
                video.openOnYoutube = false;
            }

            if (!video.duration) video.duration = "05:00";
            if (!video.published) video.published = "2020-01-01";
            if (!video.tags) video.tags = [];

            seenIds.add(id);
            processedVideos.push(video);
        }

        report.total_final_count = processedVideos.length;

        console.log(`Writing ${processedVideos.length} videos to ${VIDEOS_PATH}`);
        fs.writeFileSync(VIDEOS_PATH, JSON.stringify(processedVideos, null, 4));

        console.log(`Writing report to ${BACKUP_PATH}`);
        fs.writeFileSync(BACKUP_PATH, JSON.stringify(report, null, 4));
        console.log('Done.');
    } catch (error) {
        console.error('Fatal error:', error);
    }
};

processVideos();
