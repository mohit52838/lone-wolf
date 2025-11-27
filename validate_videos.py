import json
import urllib.request
import urllib.error
import os
import sys

RAW_PATH = 'raw_videos_v2.json'
OUTPUT_PATH = 'src/data/videos.json'

# Known blocked IDs
EXPLICIT_BLOCK_LIST = [
    'gqFOi9bQJ9c', # TED-Ed Anatomy
]

def check_embeddability(video_id):
    if video_id in EXPLICIT_BLOCK_LIST:
        print(f"[{video_id}] Explicitly blocked.")
        return False

    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    try:
        with urllib.request.urlopen(url) as response:
            if response.getcode() == 200:
                return True
    except urllib.error.HTTPError as e:
        print(f"[{video_id}] oEmbed failed: {e.code}")
    except Exception as e:
        print(f"[{video_id}] Error: {e}")
    
    return False

def process_videos():
    try:
        with open(RAW_PATH, 'r', encoding='utf-8') as f:
            videos = json.load(f)
        
        valid_videos = []
        seen_ids = set()

        print(f"Processing {len(videos)} videos...")

        for video in videos:
            vid_id = video.get('id').strip()
            
            if vid_id in seen_ids:
                continue

            if check_embeddability(vid_id):
                clean_video = {
                    "id": vid_id,
                    "title": video.get('title', '').strip(),
                    "source": video.get('source', '').strip(),
                    "sourceUrl": f"https://www.youtube.com/watch?v={vid_id}",
                    "embedUrl": f"https://www.youtube.com/embed/{vid_id}",
                    "thumbnail": f"https://img.youtube.com/vi/{vid_id}/hqdefault.jpg",
                    "duration": video.get('duration', "05:00"),
                    "published": video.get('published', "2020-01-01"),
                    "category": video.get('category', '').strip(),
                    "tags": video.get('tags', []),
                    "language": video.get('language', "en"),
                    "official": bool(video.get('official')),
                    "expertVerified": bool(video.get('expertVerified')),
                    "description": video.get('description', '').strip(),
                    "transcriptUrl": None,
                    "openOnYoutube": False
                }
                valid_videos.append(clean_video)
                seen_ids.add(vid_id)
                sys.stdout.write('.')
                sys.stdout.flush()
            else:
                sys.stdout.write('x')
                sys.stdout.flush()

        print(f"\n\nValidation complete.")
        print(f"Total input: {len(videos)}")
        print(f"Valid embeddable videos: {len(valid_videos)}")

        # Print valid videos by category
        by_category = {}
        for v in valid_videos:
            cat = v['category']
            if cat not in by_category:
                by_category[cat] = []
            by_category[cat].append(v['title'])
        
        print("\nValid Videos by Category:")
        for cat, titles in by_category.items():
            print(f"{cat}: {len(titles)}")
            for t in titles:
                print(f"  - {t}")

        if len(valid_videos) < 40:
            print("\nWARNING: Valid video count is below 40. Supplementation required.")

        with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
            json.dump(valid_videos, f, indent=4)
        print(f"\nWritten {len(valid_videos)} videos to {OUTPUT_PATH}")

    except Exception as e:
        print(f"Fatal error: {e}")

if __name__ == "__main__":
    process_videos()
