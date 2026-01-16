const fs = require('fs');
const videos = JSON.parse(fs.readFileSync('src/data/videos.json', 'utf8'));
const wellnessVideos = videos.filter(v => v.category === 'Wellness');

const html = `<!DOCTYPE html>
<html>
<head>
    <title>Verify Wellness Videos (Final)</title>
    <style>
        body { font-family: sans-serif; padding: 20px; background: #e0e0e0; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .card { background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; }
        iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
        h3 { margin: 10px 0 5px; font-size: 16px; }
        p { margin: 0; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>Wellness Videos (${wellnessVideos.length})</h1>
    <div class="grid">
        ${wellnessVideos.map(v => `
        <div class="card">
            <div class="video-container">
                <iframe src="${v.embedUrl}" allowfullscreen></iframe>
            </div>
            <h3>${v.title}</h3>
            <p>ID: ${v.id}</p>
            <p>Source: ${v.source}</p>
        </div>
        `).join('')}
    </div>
</body>
</html>`;

fs.writeFileSync('verify_wellness_final.html', html);
console.log('Generated verify_wellness_final.html with ' + wellnessVideos.length + ' videos.');
