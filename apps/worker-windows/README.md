# Windows local renderer (MVP)

This local FFmpeg worker creates a vertical 1080×1920 H.264 MP4 from one to three product images. It supports a slow Ken Burns zoom, fade transitions between images, optional title/description/CTA overlays, optional background music, and optional SRT subtitles. It validates the output with ffprobe.

## Run on Windows

From PowerShell in `F:\NUSA-CREATIVE-AI`:

```powershell
git pull origin main
New-Item -ItemType Directory -Force .\storage\exports | Out-Null
node .\apps\worker-windows\render.mjs `
  --image "C:\path\to\product-front.jpg" `
  --image2 "C:\path\to\product-detail.jpg" `
  --image3 "C:\path\to\product-use.jpg" `
  --duration 30 `
  --title "Botol Minum Stainless 1 Liter" `
  --subtitle "Praktis untuk aktivitas harian" `
  --cta "Cek produknya sekarang" `
  --music "C:\path\to\royalty-free-music.mp3" `
  --subtitles "C:\path\to\captions.srt"
```

Only `--image` is required. `--image2` and `--image3` are optional; use one, two, or three distinct images. When multiple images are supplied, the renderer divides the selected duration between scenes and applies a 0.7-second fade transition. A slow zoom effect is applied to each scene.

Supported duration values: 30, 45, 60 seconds. Output is 1080×1920 at 30 fps, H.264. Audio is omitted unless `--music` is supplied. Music is looped if shorter than the video, reduced to 18% volume, and faded at the beginning/end. Use music you own or are licensed to use.

Optional text:
- `--title`: maximum 90 characters
- `--subtitle`: maximum 140 characters
- `--cta`: maximum 48 characters

Optional `--subtitles` accepts an existing SubRip `.srt` file and burns it into the video. Subtitle timing and wording must be prepared in that file; the worker does not transcribe audio or generate captions automatically.

Text is written to unique temporary files under `cache/renderer` and removed after rendering. Windows Arial or Segoe UI is used through an explicit font file to avoid reliance on Fontconfig. If needed, set `NUSA_FONT_FILE` to a valid local `.ttf` path.

## Verify

The script calls `ffprobe` after rendering and prints actual stream dimensions, codecs, and duration. If Windows cannot find FFmpeg, confirm `ffmpeg -version` and `ffprobe -version` work in the same PowerShell session.

## Current limits

This is a local editing/compositing worker, not an AI image/video generator. It does not create product imagery, voice-over, music, or automatic transcription. It does not publish to marketplaces or social networks. AI generation and publishing integrations remain separate work.

## Storage safety

Keep source images, music, SRT files, and generated exports outside Git. Generated files are ignored by `.gitignore`. With less than 20 GB free on Drive F, test one short render first; do not download model weights yet.
