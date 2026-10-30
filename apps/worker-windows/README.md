# Windows local renderer (MVP)

This first worker milestone creates a 1080×1920 H.264 MP4 from one still product image. It validates duration, confines output to `storage/exports`, and verifies the result with ffprobe. It does not yet generate AI imagery, voice-over, captions, transitions, or product claims.

## Run on Windows

From PowerShell in `F:\NUSA-CREATIVE-AI`:

```powershell
New-Item -ItemType Directory -Force .\storage\exports | Out-Null
node .\apps\worker-windows\render.mjs --image "F:\path\to\product.jpg" --duration 30
```

Optional explicit output:

```powershell
node .\apps\worker-windows\render.mjs --image "F:\path\to\product.jpg" --duration 45 --output "F:\NUSA-CREATIVE-AI\storage\exports\sample.mp4"
```

Supported duration values: 30, 45, 60 seconds. Output is 1080×1920 at 30 fps, H.264, silent MP4. The source image is looped and center-cropped to fill a vertical frame.

## Verify

The script calls `ffprobe` after rendering and prints the actual stream dimensions, codec, and duration. If Windows cannot find FFmpeg, confirm `ffmpeg -version` and `ffprobe -version` work in the same PowerShell session.

## Storage safety

Keep source images outside Git. Generated files are ignored by `.gitignore`. With less than 20 GB free on Drive F, test with one image and short 30-second output first; do not download model weights yet.
