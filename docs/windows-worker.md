# Windows local worker — Drive F

## Target layout

- Workspace: `F:\\NUSA-CREATIVE-AI`
- Source media: `F:\\NUSA-CREATIVE-AI\\storage\\products`
- Generated images: `F:\\NUSA-CREATIVE-AI\\storage\\images`
- Rendered videos: `F:\\NUSA-CREATIVE-AI\\storage\\videos`
- Exports: `F:\\NUSA-CREATIVE-AI\\storage\\exports`
- Model cache: `F:\\NUSA-CREATIVE-AI\\models`
- Temporary files: `F:\\NUSA-CREATIVE-AI\\cache`

## Initial setup

1. Confirm Drive F has sufficient free space (recommended at least 20 GB for the first media pipeline; more if models are installed).
2. Install Git, Node.js 20+, and FFmpeg.
3. Clone this repository directly into `F:\\NUSA-CREATIVE-AI`.
4. Keep API keys in a local ignored environment file; never commit secrets.
5. Run the web app with `npm install` then `npm run dev`.

## Important hardware note

An Intel Core i5-4690, 8 GB RAM, and Intel HD Graphics 4600 class machine is suitable for FFmpeg-based composition and lightweight local tasks, not modern diffusion or video-generation models. Start with template-based image composition, FFmpeg, and optional cloud text generation. Do not download large model weights until hardware and free space are checked.

## Worker security

The worker should initiate outbound authenticated polling/streaming to the backend. Do not expose an unauthenticated inbound port on the Windows PC. Store credentials in Windows user environment or a protected local secret store, not in source control.
