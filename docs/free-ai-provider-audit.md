# Free AI provider audit — 30 October 2026

## Decision

NUSA CREATIVE AI remains Rp0-first. No paid provider, billing account, API key, or paid inference endpoint is enabled by this change.

The application currently opens external provider studios in a new tab. This is an honest hand-off, not an in-app API integration. The providers' own terms do not authorize NUSA to automate their free website sessions.

## Text-to-image

| Provider | Free model / access | Limits and caveats | Decision |
|---|---|---|---|
| AI Horde | Volunteer-operated open image-generation workers; anonymous key is available | Anonymous requests have lowest priority; queue and worker availability vary; no service-level guarantee | Primary free/community option |
| FreeImgGen | Z-Image Turbo; claims no daily generation cap, no account, no credits | Fair-use/rate limiting during heavy use; generated files auto-delete after 24 hours; third-party service claim, not an SLA | Secondary manual option |
| GenFree | FLUX.2 Klein via hosted provider; claims no daily credit allowance | Human verification and anti-abuse controls; service terms may change | Secondary manual option |

## Image-to-video

| Provider | Free path | Limits and caveats | Decision |
|---|---|---|---|
| LoreMotion | LTX-Video 2.3; free account advertises unlimited generations | 720p; 3/5/8 second clips; shared queue; short pre-roll ad; free library retention 48 hours. Use manually in the official website. | Primary I2V option |
| Movoa | MiniMax H3 free lane; free account advertises no daily cap | 480p, 4-second clips, shared queue; terms prohibit scripts, bots, browser automation and API use on free plan. | Secondary I2V option |

## Explicit exclusions

- Hugging Face ZeroGPU: official documentation states 5 minutes/day for free accounts. It is quota-based, so it does not meet the user's requirement.
- FramePack: real image-to-video, but official repository requires a supported NVIDIA RTX 30/40/50 GPU with at least 6 GB VRAM. The user's Intel HD 4600 machine cannot run it.
- ZSky AI: despite unlimited free generation claims, its terms prohibit programmatic access on the free tier and grant a broad license over uploaded images/prompts/outputs; free creations are public by default. Not selected for product or client assets.
- FFmpeg renderer: remains an editor/compositor only. Pan/zoom/fade effects are not AI-generated object motion and must never be labelled as image-to-video generation.

## Product constraints

1. Current NUSA deployment is a static GitHub Pages frontend. There is no trusted backend endpoint for holding provider credentials or brokering jobs.
2. AI Horde may be integrated directly only after browser CORS, API contract, abuse controls, queue polling, output retrieval, and attribution requirements are verified. No API integration is claimed by the current UI.
3. LoreMotion and Movoa free website plans are manual user-operated workflows. Do not automate them or reverse-engineer private endpoints.
4. Free provider access is not a promise of unlimited throughput, uptime, retention, or permanent terms.
5. User must download generated files locally. Neon object storage/content library is not connected.

## Official and provider references

- AI Horde usage and volunteer worker model: https://aihorde.net/
- AI Horde image generation UI: https://api.stablehorde.net/generate/image/
- FreeImgGen: https://freeimggen.com/
- GenFree terms: https://genfree.app/terms
- LoreMotion generator: https://loremotion.com/generate/
- LoreMotion terms: https://loremotion.com/terms/
- Movoa free video: https://movoa.ai/video
- Movoa terms: https://movoa.ai/terms-of-service
- Hugging Face ZeroGPU quotas: https://huggingface.co/docs/hub/en/spaces-zerogpu
- FramePack official hardware requirements: https://github.com/lllyasviel/FramePack
- ZSky terms: https://zsky.ai/terms

Last reviewed: 2026-10-30.
