import json

TARGET_FILE = r"c:\Users\MOHIT PATIL\Desktop\HerHealth - Copy\src\data\videos.json"

def audit():
    try:
        with open(TARGET_FILE, 'r', encoding='utf-8') as f:
            videos = json.load(f)
            
        mh_videos = [v for v in videos if v['category'] == "Mental Health & Hormones"]
        
        print(f"Found {len(mh_videos)} videos in 'Mental Health & Hormones':")
        for v in mh_videos:
            print(f"- {v['title']} ({v['id']}) Source: {v['source']}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    audit()
