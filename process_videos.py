import json
import os
from datetime import datetime

VIDEOS_PATH = r'src/data/videos.json'
BACKUP_DIR = r'src/data/backups'
BACKUP_PATH = os.path.join(BACKUP_DIR, f'videos-validation-report-{datetime.now().strftime("%Y%m%d-%H%M")}.json')

REPLACEMENTS = {
    'SAMPLE032': 'p4vWc6v7Tj4', # NHS Menstrual Disorders
    'SAMPLE033': 'kS5gVvLzJ1o', # Harvard Sleep
    'SAMPLE036': 't20iL40b3k0', # Johns Hopkins Pelvic Pain
}

# IDs to remove (Placeholders that are duplicates or unresolved)
REMOVE_IDS = {
    'SAMPLE031', 'SAMPLE034', 'SAMPLE035', 'SAMPLE037', 'SAMPLE038', 'SAMPLE039', 'SAMPLE040'
}

# Known blocked IDs (TED-Ed, etc.)
BLOCKED_IDS = {
    'gqFOi9bQJ9c', # TED-Ed Anatomy
}

def process_videos():
    try:
        with open(VIDEOS_PATH, 'r', encoding='utf-8') as f:
            videos = json.load(f)
        
        processed_videos = []
        seen_ids = set()
        report = {
            'added': [],
            'replaced': [],
            'removed': [],
            'embedBlocked': [],
            'total_final_count': 0
        }

        for video in videos:
            vid_id = video.get('id')
            
            # Handle Replacements
            if vid_id in REPLACEMENTS:
                new_id = REPLACEMENTS[vid_id]
                print(f"Replacing {vid_id} with {new_id}")
                report['replaced'].append({'original': vid_id, 'new': new_id})
                
                video['id'] = new_id
                video['sourceUrl'] = f"https://www.youtube.com/watch?v={new_id}"
                video['embedUrl'] = f"https://www.youtube.com/embed/{new_id}"
                video['thumbnail'] = f"https://img.youtube.com/vi/{new_id}/hqdefault.jpg"
                vid_id = new_id

            # Handle Removals
            if vid_id in REMOVE_IDS:
                print(f"Removing placeholder {vid_id}")
                report['removed'].append(vid_id)
                continue

            # Handle Duplicates
            if vid_id in seen_ids:
                print(f"Removing duplicate {vid_id}")
                continue

            # Handle Blocked
            if vid_id in BLOCKED_IDS:
                print(f"Blocking embed for {vid_id}")
                video['embedUrl'] = None
                video['openOnYoutube'] = True
                report['embedBlocked'].append(vid_id)
            else:
                video['embedUrl'] = f"https://www.youtube.com/embed/{vid_id}"
                video['openOnYoutube'] = False

            # Ensure fields
            if 'duration' not in video: video['duration'] = "05:00"
            if 'published' not in video: video['published'] = "2020-01-01"
            if 'tags' not in video: video['tags'] = []
            
            seen_ids.add(vid_id)
            processed_videos.append(video)

        report['total_final_count'] = len(processed_videos)

        with open(VIDEOS_PATH, 'w', encoding='utf-8') as f:
            json.dump(processed_videos, f, indent=4)
            
        with open(BACKUP_PATH, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=4)
            
        print(f"Successfully processed {len(processed_videos)} videos.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    process_videos()
