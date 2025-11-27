# HerHealth Video Library

This directory contains the data and audit logs for the HerHealth curated video library.

## Files

- `videos.json`: The main data file used by the frontend. Contains metadata for 50+ videos.
- `videos_audit.csv`: A CSV file to track the status of each video, specifically whether embedding is allowed and tested.

## Adding/Editing Videos

1.  **Find a Video**: Locate a video from a trusted source (WHO, CDC, NHS, etc.).
2.  **Get Metadata**: Collect the ID, title, source, duration, and publication date.
3.  **Update `videos.json`**: Add a new object to the array. Ensure `official` and `expertVerified` flags are set correctly.
4.  **Update `videos_audit.csv`**: Add a row for the new video.
5.  **Test Embed**: Open the video in the app to ensure it embeds correctly. If blocked, set `embedAllowed` to `false` in the CSV (and potentially handle it in the UI).

## Audit Process

Periodically check the `videos_audit.csv` against the live site to ensure no videos have been taken down or had their embed settings changed.

## Placeholder IDs

**Note**: Some videos in `videos.json` currently use placeholder IDs (e.g., `who_pms_01`). These should be replaced with real YouTube IDs as they are verified. The titles and descriptions are accurate to the content available from these sources.
