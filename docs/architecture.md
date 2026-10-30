# Architecture

## MVP boundary

1. Product intake: URL + manual fallback; no unauthorized marketplace scraping.
2. Product brief: user-confirmed product facts.
3. Image composition: templates, typography, crop, overlays, and export.
4. Video composition: FFmpeg vertical timeline, 30/45/60-second presets, subtitles, voice track, CTA.
5. Quality checks: dimensions, duration, audio presence, missing product facts, AI/affiliate disclosure reminders.
6. Provider gateway: capability discovery, cost estimate, explicit consent, timeout, retry, and usage log.

## Deployment boundary

- GitHub Pages: static web client only.
- Neon: PostgreSQL metadata and job state.
- Windows worker: media processing and local asset storage.
- No public backend secret or database connection string in browser code.

## Later phases

- Auth and multi-user access.
- Object storage for optional cloud asset sync.
- Image/video provider adapters.
- Agent orchestration and publishing integrations.
