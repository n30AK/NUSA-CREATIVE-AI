# NUSA CREATIVE AI

Gratis-first affiliate content production studio for Shopee, TikTok Shop, Tokopedia, Lazada, and other marketplaces.

## Product direction

Create a reviewable content pack from a product URL or manual product entry:
- product brief and verified facts
- promotional image layouts
- 9:16 video (30–60 seconds)
- Indonesian voice-over and subtitles
- captions, hashtags, and CTA
- quality and disclosure checks

## Architecture

- `apps/web`: React + TypeScript + Vite web studio.
- `apps/worker-windows`: Windows local worker for media processing.
- `services`: provider adapters and processing services.
- `database/migrations`: additive PostgreSQL migrations for Neon.
- GitHub Pages hosts the static web app; Neon stores structured data.
- Large source/output media stays on the local worker drive initially.

## Local-first storage

Recommended Windows workspace: `F:\\NUSA-CREATIVE-AI`.

Do not commit generated media, model weights, API keys, or local environment files.

## Development

Requirements: Node.js 20+, npm, Git. FFmpeg is required for local video rendering.

```powershell
git clone https://github.com/n30AK/NUSA-CREATIVE-AI.git F:\NUSA-CREATIVE-AI
cd F:\NUSA-CREATIVE-AI
npm install
npm run dev
```

The worker setup guide will be maintained in `docs/windows-worker.md`.

## Cost policy

- Local FFmpeg and local media composition are the default.
- Paid AI providers are disabled until explicitly configured.
- Every external generation must support availability checks and cost estimates.
- Free-tier availability and limits are never represented as unlimited.

## Status

Foundation scaffold. This is not yet a production-ready generator; image/video generation, provider integrations, database-backed jobs, and end-to-end tests are staged work.

## License

Project-specific license will be selected before external distribution. Third-party components retain their own licenses.
