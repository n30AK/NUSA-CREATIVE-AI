# Windows local renderer (MVP)

This local worker creates a 1080×1920 H.264 MP4 from one product image, with optional promotional title, supporting copy, and call-to-action text. It validates duration, confines output to `storage/exports`, and verifies the result with ffprobe. It does not generate AI imagery, voice-over, music, subtitles, transitions, or product claims.

## Run on Windows

From PowerShell in `F:\NUSA-CREATIVE-AI`:

```powershell
New-Item -ItemType Directory -Force .\storage\exports | Out-Null
node .\apps\worker-windows\render.mjs --image "F:\path\to\product.jpg" --duration 30 --title "Botol Minum 1 Liter" --subtitle "Praktis untuk aktivitas harian" --cta "Cek produknya sekarang"
```

Optional explicit output:

```powershell
node .\apps\worker-windows\render.mjs --image "F:\path\to\product.jpg" --duration 45 --title "Nama Produk" --cta "Lihat detail produk" --output "F:\NUSA-CREATIVE-AI\storage\exports\sample.mp4"
```

Supported duration values: 30, 45, 60 seconds. Output is 1080×1920 at 30 fps, H.264, silent MP4. The source image is looped and center-cropped to fill a vertical frame. Text layers are optional:
- `--title`: maximum 90 characters
- `--subtitle`: maximum 140 characters
- `--cta`: maximum 48 characters

Text is written to unique temporary files under `cache/renderer` and removed after rendering. Do not use unverified product claims in promotional copy.

## Verify

The script calls `ffprobe` after rendering and prints the actual stream dimensions, codec, and duration. If Windows cannot find FFmpeg, confirm `ffmpeg -version` and `ffprobe -version` work in the same PowerShell session.

## Storage safety

Keep source images outside Git. Generated files are ignored by `.gitignore`. With less than 20 GB free on Drive F, test with one image and short 30-second output first; do not download model weights yet.
