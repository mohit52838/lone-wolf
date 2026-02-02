
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// Take top 20
const batch = videos.slice(0, 20);

const parseISO = (iso) => {
    // PT1H2M10S, PT5M, PT30S
    const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "";

    const h = (match[1] || "").replace("H", "");
    const m = (match[2] || "").replace("M", "");
    const s = (match[3] || "").replace("S", "");

    const hh = h ? parseInt(h) : 0;
    const mm = m ? parseInt(m) : 0;
    const ss = s ? parseInt(s) : 0;

    // Format
    const pad = (n) => n.toString().padStart(2, '0');
    if (hh > 0) {
        return `${hh}:${pad(mm)}:${pad(ss)}`;
    } else {
        return `${pad(mm)}:${pad(ss)}`;
    }
};

const verifyVideo = async (video) => {
    try {
        const res = await fetch(`https://www.youtube.com/watch?v=${video.id}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const text = await res.text();
        const isoMatch = text.match(/itemprop="duration" content="(PT[^"]+)"/);

        if (isoMatch) {
            const clean = parseISO(isoMatch[1]);
            return { id: video.id, duration: clean, original: video.duration, verified: true };
        }
        return { id: video.id, duration: "", original: video.duration, verified: false };
    } catch (e) {
        return { id: video.id, duration: "", original: video.duration, verified: false };
    }
};

(async () => {
    console.log("--- BATCH 1 VERIFICATION START ---");
    const updates = [];

    for (const v of batch) {
        const res = await verifyVideo(v);
        console.log(`[${v.id}] ${v.title.substring(0, 20)}... | Old: ${res.original} -> New: ${res.duration || "FAILED"}`);
        if (res.verified) {
            updates.push(res);
        } else {
            // If failed, strictly clear it as per rules
            updates.push({ ...res, duration: "" });
        }
        // Polite delay
        await new Promise(r => setTimeout(r, 500));
    }

    // Update JSON
    const newVideos = videos.map(v => {
        const update = updates.find(u => u.id === v.id);
        if (update) {
            v.duration = update.duration;
        }
        return v;
    });

    fs.writeFileSync(videosPath, JSON.stringify(newVideos, null, 4), 'utf8');
    console.log("--- BATCH 1 UPDATE COMPLETE ---");
})();
