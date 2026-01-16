import json

TARGET_FILE = r"c:\Users\MOHIT PATIL\Desktop\HerHealth - Copy\src\data\videos.json"

# 7 NEW Verified Videos
new_videos = [
    {
        "id": "2ghr0ZEPGT0",
        "title": "ObGyn Explains: Prenatal Genetic Testing",
        "source": "ACOG",
        "embedUrl": "https://www.youtube.com/embed/2ghr0ZEPGT0",
        "thumbnail": "https://img.youtube.com/vi/2ghr0ZEPGT0/hqdefault.jpg",
        "duration": "03:45",
        "published": "2024-01-01",
        "category": "Maternal Health",
        "tags": ["maternal health", "acog", "prenatal", "genetic"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": "ACOG guide on prenatal genetic screening options.",
        "transcriptUrl": None,
        "openOnYoutube": False
    },
    {
        "id": "uxlA4MEaRMw",
        "title": "Baby Blues or Postnatal Depression?",
        "source": "NHS",
        "embedUrl": "https://www.youtube.com/embed/uxlA4MEaRMw",
        "thumbnail": "https://img.youtube.com/vi/uxlA4MEaRMw/hqdefault.jpg",
        "duration": "04:20",
        "published": "2024-01-01",
        "category": "Maternal Health",
        "tags": ["maternal health", "nhs", "postnatal", "depression"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": "NHS guide to distinguishing baby blues from postnatal depression.",
        "transcriptUrl": None,
        "openOnYoutube": False
    },
    {
        "id": "NGjs6LvaV4k",
        "title": "Breastfeeding Teaching Resources",
        "source": "NHS (Leeds Community Healthcare)",
        "embedUrl": "https://www.youtube.com/embed/NGjs6LvaV4k",
        "thumbnail": "https://img.youtube.com/vi/NGjs6LvaV4k/hqdefault.jpg",
        "duration": "03:50",
        "published": "2024-01-01",
        "category": "Maternal Health",
        "tags": ["maternal health", "nhs", "breastfeeding"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": "Educational animation on breastfeeding from NHS sources.",
        "transcriptUrl": None,
        "openOnYoutube": False
    },
    {
        "id": "B8Mb-zPltG8",
        "title": "Science in 5: Breastfeeding & Vaccines",
        "source": "World Health Organization (WHO)",
        "embedUrl": "https://www.youtube.com/embed/B8Mb-zPltG8",
        "thumbnail": "https://img.youtube.com/vi/B8Mb-zPltG8/hqdefault.jpg",
        "duration": "05:00",
        "published": "2024-01-01",
        "category": "Maternal Health",
        "tags": ["maternal health", "who", "breastfeeding", "science in 5"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": "WHO experts discuss breastfeeding, vaccines, and maternal safety.",
        "transcriptUrl": None,
        "openOnYoutube": False
    },
    {
        "id": "roYWXENw4mM",
        "title": "How the US Medical Community Fails Black Mothers",
        "source": "TED (Wanda Irving)",
        "embedUrl": "https://www.youtube.com/embed/roYWXENw4mM",
        "thumbnail": "https://img.youtube.com/vi/roYWXENw4mM/hqdefault.jpg",
        "duration": "13:00",
        "published": "2024-01-01",
        "category": "Maternal Health",
        "tags": ["maternal health", "ted", "black maternal health", "advocacy"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": "Wanda Irving's powerful TED talk on disparities in maternal healthcare.",
        "transcriptUrl": None,
        "openOnYoutube": False
    },
    {
        "id": "fKyljukBE70",
        "title": "Conception to Birth - Visualized",
        "source": "TED (Alexander Tsiaras)",
        "embedUrl": "https://www.youtube.com/embed/fKyljukBE70",
        "thumbnail": "https://img.youtube.com/vi/fKyljukBE70/hqdefault.jpg",
        "duration": "10:00",
        "published": "2024-01-01",
        "category": "Maternal Health",
        "tags": ["maternal health", "ted", "pregnancy", "visualization"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": "Alexander Tsiaras shares a stunning visualization of fetal development.",
        "transcriptUrl": None,
        "openOnYoutube": False
    },
    {
        "id": "3pa-hPJi83c",
        "title": "Fetal Alcohol Spectrum Disorders (Maternal Health)",
        "source": "CDC / ACF",
        "embedUrl": "https://www.youtube.com/embed/3pa-hPJi83c",
        "thumbnail": "https://img.youtube.com/vi/3pa-hPJi83c/hqdefault.jpg",
        "duration": "15:00",
        "published": "2024-01-01",
        "category": "Maternal Health",
        "tags": ["maternal health", "cdc", "alcohol", "pregnancy"],
        "language": "en",
        "official": True,
        "expertVerified": True,
        "description": "In-depth discussion on the effects of alcohol usage during pregnancy.",
        "transcriptUrl": None,
        "openOnYoutube": False
    }
]

def update_library():
    try:
        with open(TARGET_FILE, 'r', encoding='utf-8') as f:
            videos = json.load(f)
        
        # 1. Update the broken "Healthy Births" ID if present
        updated_count = 0
        for video in videos:
            if video['id'] == "CHsrz1VV--g":
                video['id'] = "6lvhAPOcoMk"
                video['embedUrl'] = "https://www.youtube.com/embed/6lvhAPOcoMk"
                video['thumbnail'] = "https://img.youtube.com/vi/6lvhAPOcoMk/hqdefault.jpg"
                print("Fixed broken 'Healthy Births' video ID.")
                updated_count += 1
                
        # 2. Append the 7 NEW videos (ensuring no dupes)
        initial_len = len(videos)
        existing_ids = {v['id'] for v in videos}
        
        added_count = 0
        for new_v in new_videos:
            if new_v['id'] not in existing_ids:
                videos.append(new_v)
                existing_ids.add(new_v['id'])
                added_count += 1
            else:
                print(f"Skipping duplicate ID: {new_v['id']}")
                
        print(f"Total videos before: {initial_len}")
        print(f"Added: {added_count} new videos")
        print(f"Total videos after: {len(videos)}")
        
        with open(TARGET_FILE, 'w', encoding='utf-8') as f:
            json.dump(videos, f, indent=4)
            
        print("Successfully updated Maternal Health library.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_library()
