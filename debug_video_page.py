import urllib.request
import urllib.error

url = "https://www.youtube.com/watch?v=_LqB4lq0Yv4"
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
)

try:
    with urllib.request.urlopen(req) as response:
        print(f"Video Page Status: {response.getcode()}")
        # Check if "Video unavailable" is in the text (simple check)
        content = response.read().decode('utf-8')
        if "Video unavailable" in content:
            print("Content says: Video unavailable")
        else:
            print("Video page seems live.")
            
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
except Exception as e:
    print(f"Error: {e}")
