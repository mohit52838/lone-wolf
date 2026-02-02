
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, 'src/data/videos.json');
const talksPath = path.join(__dirname, 'src/data/expertTalks.json');

const parseISO = (iso) => {
    const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "";
    const h = (match[1] || "").replace("H", "");
    const m = (match[2] || "").replace("M", "");
    const s = (match[3] || "").replace("S", "");
    const hh = h ? parseInt(h) : 0;
    const mm = m ? parseInt(m) : 0;
    const ss = s ? parseInt(s) : 0;
    const pad = (n) => n.toString().padStart(2, '0');
    return hh > 0 ? `${hh}:${pad(mm)}:${pad(ss)}` : `${pad(mm)}:${pad(ss)}`;
};

const verifyVideo = async (id, title) => {
    try {
        const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const text = await res.text();
        const isoMatch = text.match(/itemprop="duration" content="(PT[^"]+)"/);

        if (isoMatch) {
            return { id, duration: parseISO(isoMatch[1]), verified: true };
        }
        console.log(`[FAIL] No ISO duration for ${id} (${title})`);
        return { id, duration: "", verified: false };
    } catch (e) {
        console.log(`[ERR] Fetch failed for ${id}: ${e.message}`);
        return { id, duration: "", verified: false };
    }
};

const processFile = async (filePath, label) => {
    console.log(`\n--- PROCESSING ${label} ---`);
    if (!fs.existsSync(filePath)) return;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let updatedCount = 0;

    // We will verify ALL videos that don't look verified (simple check: if we trust previous batch, we skip. 
    // But safely, let's verify anything that doesn't "look" like our verified output or just redo all to be safe? 
    // 100 requests might trigger rate limit. Let's skip ones we JUST verified (top 20).
    // Actually, "Process Batch 1" verified indices 0-19. 
    // Let's verify indices 20 to END.

    const startIdx = label === 'VIDEOS' ? 20 : 0; // Skip first 20 for videos.json as they are done

    for (let i = startIdx; i < data.length; i++) {
        const v = data[i];

        // Skip purely if it has no ID (shouldn't happen)
        if (!v.id) continue;

        console.log(`[${i + 1}/${data.length}] Verifying: ${v.title.substring(0, 30)}...`);

        const res = await verifyVideo(v.id, v.title);

        // Update logic: strict overwrite
        if (res.verified) {
            if (v.duration !== res.duration) {
                console.log(`   -> UPDATE: ${v.duration} => ${res.duration}`);
                v.duration = res.duration;
                updatedCount++;
            } else {
                console.log(`   -> MATCH: ${v.duration}`);
            }
        } else {
            if (v.duration !== "") {
                console.log(`   -> CLEARING INVALID: ${v.duration} => ""`);
                v.duration = "";
                updatedCount++;
            }
        }

        // Delay 1.5s to be polite
        await new Promise(r => setTimeout(r, 1500));
    }

    if (updatedCount > 0) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Saved ${updatedCount} updates to ${label}`);
    } else {
        console.log(`No changes needed for ${label}`);
    }
};

(async () => {
    await processFile(videosPath, 'VIDEOS');
    await processFile(talksPath, 'EXPERT_TALKS');
    console.log("\n--- GLOBAL VERIFICATION COMPLETE ---");
})();
