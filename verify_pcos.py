import requests

ids = [
    "zIT6Vs1rUGc", # NICHD: Adolescent PCOS (Candidate)
    "rCg4Qx8fK4w", # OWH: Symptoms (Previously failed? Re-checking)
    "w_3L3yZ-580", # Mayo: Demystifying (BROKEN)
    "Hj-VmZYcUhQ", # Mayo: Treatment (BROKEN)
    "1Q12tA-5f90", # Cleveland: What is PCOS (BROKEN)
    "gpxwhUUHSiE", # NHS: Conceive (Working)
    "c3F94M095tM", # Khan: Follicular (Known Working)
    "-SPRPkLoKp8", # TED-Ed: Hormones (Working)
    "QnyS26pGnsc", # NHS: Animation (Working)
    "kMWxuF9YW38"  # TED-Ed: Sex Det (Working)
]

print("Verifying videos...")
for vid in ids:
    url = f"https://www.youtube.com/embed/{vid}"
    try:
        r = requests.get(url)
        content = r.text
        if "UNPLAYABLE" in content or "Video unavailable" in content:
            print(f"{vid}: BROKEN")
        elif "Playback on other websites has been disabled" in content:
             print(f"{vid}: DISABLED")
        else:
            print(f"{vid}: WORKING")
    except Exception as e:
        print(f"{vid}: ERROR - {e}")
