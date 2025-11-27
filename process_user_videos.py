import json
import os

RAW_PATH = 'raw_videos.json'
VIDEOS_PATH = 'src/data/videos.json'

def process_videos():
    try:
        print(f'Reading raw videos from: {RAW_PATH}')
        with open(RAW_PATH, 'r', encoding='utf-8') as f:
            videos = json.load(f)

        processed_videos = []
        seen_ids = set()

        for video in videos:
            # Clean strings
            for key, value in video.items():
                if isinstance(value, str):
                    video[key] = value.replace('\n', '').strip()

            vid_id = video.get('id')

            # Filter out placeholders
            if vid_id.startswith('SAMPLE'):
                print(f'Skipping placeholder {vid_id}')
                continue

            # Deduplicate
            if vid_id in seen_ids:
                print(f'Skipping duplicate {vid_id}')
                continue

            # Handle blocked embed for TED-Ed
            if vid_id == 'gqFOi9bQJ9c':
                video['embedUrl'] = None
                video['openOnYoutube'] = True
            else:
                video['openOnYoutube'] = False
            
            seen_ids.add(vid_id)
            processed_videos.append(video)

        print(f'Writing {len(processed_videos)} videos to {VIDEOS_PATH}')
        with open(VIDEOS_PATH, 'w', encoding='utf-8') as f:
            json.dump(processed_videos, f, indent=4)
        print('Done.')

    except Exception as e:
        print(f'Error processing videos: {e}')

if __name__ == "__main__":
    process_videos()
