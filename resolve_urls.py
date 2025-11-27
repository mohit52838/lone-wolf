import urllib.request
import urllib.parse

urls = [
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH6vvdLhFER1Ao-GYKTyjnCzeoZdFKWVGtiMHeUJxFeCApmwjiNArsQswOTmeLiyTscwXvnQksImdnyKmoDRJQph5DMTp3JYKh7mVr4-6XQkHV6wDsGB9eMPA0tHtYImvO5BNt0sCg="
]

for url in urls:
    try:
        req = urllib.request.Request(
            url, 
            method='HEAD',
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        )
        with urllib.request.urlopen(req) as response:
            final_url = response.url
            if "v=" in final_url:
                vid_id = final_url.split("v=")[1].split("&")[0]
                print(f"ID: {vid_id}")
            else:
                print(f"Resolved: {final_url}")
    except Exception as e:
        print(f"Error resolving {url}: {e}")
