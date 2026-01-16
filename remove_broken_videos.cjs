const fs = require('fs');
const path = require('path');

const brokenIds = [
    'sl4yX5tI-sE',
    'e2Zk-3_C7C0',
    '_f-K-x5eD08',
    'pwaWilO_VrY',
    'PjQWwZt1088',
    'WppPFqsECz8'
];

const videosPath = path.join(process.cwd(), 'src', 'data', 'videos.json');

try {
    const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    const initialCount = videos.length;

    // Filter out broken videos
    const validVideos = videos.filter(v => !brokenIds.includes(v.id));
    const removedCount = initialCount - validVideos.length;

    fs.writeFileSync(videosPath, JSON.stringify(validVideos, null, 4));
    console.log(`Successfully removed ${removedCount} broken videos. New total: ${validVideos.length}`);
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
