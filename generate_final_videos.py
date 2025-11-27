import json
import os

OUTPUT_PATH = 'src/data/videos.json'

# 1. Load existing valid videos
try:
    with open(OUTPUT_PATH, 'r', encoding='utf-8') as f:
        existing_videos = json.load(f)
except:
    existing_videos = []

print(f"Loaded {len(existing_videos)} existing valid videos.")

# 2. Define new videos
new_videos_data = [
    {
        "id": "gpxwhUUHSiE",
        "title": "Conceive with Confidence | PCOS Strategies",
        "source": "NHS Hospital",
        "category": "PCOS & PCOD",
        "description": "Strategies for success when trying to conceive with PCOS."
    },
    {
        "id": "f0G3397l32o",
        "title": "Demystifying Polycystic Ovary Syndrome",
        "source": "Mayo Clinic",
        "category": "PCOS & PCOD",
        "description": "Mayo Clinic expert explains the symptoms and treatment of PCOS."
    },
    {
        "id": "TVc3KKPJwuE",
        "title": "How to Thrive During Your Menopause",
        "source": "NHS Somerset",
        "category": "Menopause & Perimenopause",
        "description": "Webinar on thriving during menopause with Dr. Juliet Balfour."
    },
    {
        "id": "81_47orh618",
        "title": "Does Menopause Only Happen in Your 50's?",
        "source": "NHS 24",
        "category": "Menopause & Perimenopause",
        "description": "Addressing misconceptions about the age of menopause onset."
    },
    {
        "id": "6lvhAPOcoMk",
        "title": "Science in 5 - Healthy births, saving mothers",
        "source": "WHO",
        "category": "Maternal Health",
        "description": "WHO experts discuss how to ensure healthy births and save mothers' lives."
    },
    {
        "id": "DGADyDvQj44",
        "title": "Hear Her Campaign PSA",
        "source": "CDC",
        "category": "Maternal Health",
        "description": "CDC campaign to raise awareness of urgent maternal warning signs."
    },
    {
        "id": "1rI-H9h8L00",
        "title": "NBCCEDP 30th Anniversary",
        "source": "CDC",
        "category": "Cancer Awareness & Screening",
        "description": "Celebrating 30 years of the National Breast and Cervical Cancer Early Detection Program."
    },
    {
        "id": "7M71yN-N1pM",
        "title": "Cancer Early Detection: Karen Hacker, MD",
        "source": "CDC",
        "category": "Cancer Awareness & Screening",
        "description": "Dr. Karen Hacker discusses the importance of early detection programs."
    },
    {
        "id": "i5g2J1rF5yA",
        "title": "NBCCEDP 30th Anniversary: Opening Video",
        "source": "CDC",
        "category": "Cancer Awareness & Screening",
        "description": "Opening video for the 30th anniversary of the screening program."
    },
    {
        "id": "nrlqMBQ44JQ",
        "title": "Nutrition Essentials | Food as Medicine",
        "source": "Cleveland Clinic",
        "category": "Nutrition",
        "description": "Exploring the concept of food as medicine for better health."
    },
    {
        "id": "ogvbNLLL4WQ",
        "title": "Mental Health is as Important as Physical Health",
        "source": "WHO",
        "category": "Mental Health & Hormones",
        "description": "WHO Director-General emphasizes the importance of mental health."
    },
    {
        "id": "vTOcI0TFzXg",
        "title": "Breast Cancer Screening: The Right To Know",
        "source": "CDC",
        "category": "Cancer Awareness & Screening",
        "description": "Raising awareness about breast cancer screening for all women."
    },
    {
        "id": "tb3vZ4WgSwU",
        "title": "CDC Vital Signs: Mammograms",
        "source": "CDC",
        "category": "Cancer Awareness & Screening",
        "description": "Discussing how social needs can impact access to mammograms."
    },
    {
        "id": "87ckXU7lUfE",
        "title": "Bring Your Brave Campaign",
        "source": "CDC",
        "category": "Cancer Awareness & Screening",
        "description": "Sharing stories of young women affected by breast cancer."
    },
    {
        "id": "GVZGq4bFRAk",
        "title": "Diet Tips from Heart Experts",
        "source": "Cleveland Clinic",
        "category": "Nutrition",
        "description": "Heart experts share their top diet tips for cardiovascular health."
    },
    {
        "id": "adxhtHgzRcs",
        "title": "Is Your Diet Stressing You Out?",
        "source": "Cleveland Clinic",
        "category": "Nutrition",
        "description": "How your diet can impact your stress levels and mental well-being."
    },
    {
        "id": "2cL7HE_3Fjk",
        "title": "Mental Health & Women",
        "source": "WHO",
        "category": "Mental Health & Hormones",
        "description": "Discussion on the specific mental health challenges faced by women."
    }
]

# 3. Convert new videos to full objects
final_videos = existing_videos.copy()
seen_ids = set(v['id'] for v in existing_videos)

for nv in new_videos_data:
    if nv['id'] in seen_ids:
        continue
    
    video_obj = {
        "id": nv['id'],
        "title": nv['title'],
        "source": nv['source'],
        "sourceUrl": f"https://www.youtube.com/watch?v={nv['id']}",
        "embedUrl": f"https://www.youtube.com/embed/{nv['id']}",
        "thumbnail": f"https://img.youtube.com/vi/{nv['id']}/hqdefault.jpg",
        "duration": "05:00", # Fallback
        "published": "2023-01-01", # Fallback
        "category": nv['category'],
        "tags": [nv['category'].split(' ')[0].lower(), "health", "official"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": nv['description'],
        "transcriptUrl": None,
        "openOnYoutube": False
    }
    final_videos.append(video_obj)
    seen_ids.add(nv['id'])

print(f"Total videos after merging: {len(final_videos)}")

# 4. Write to file
with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(final_videos, f, indent=4)

print(f"Written to {OUTPUT_PATH}")
