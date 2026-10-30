#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdirSync, existsSync, statSync, writeFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { randomUUID } from "node:crypto";

const root = path.resolve(process.cwd());
const exportRoot = path.resolve(root, "storage", "exports");
const cacheRoot = path.resolve(root, "cache", "renderer");

function argsToObject(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--") || !argv[i + 1] || argv[i + 1].startsWith("--")) {
      throw new Error(`Argumen tidak valid di sekitar: ${key}`);
    }
    result[key.slice(2)] = argv[i + 1];
    i += 1;
  }
  return result;
}
function inside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}
function validateText(label, value, maxLength) {
  if (value === undefined) return "";
  const normalized = value.trim();
  if (normalized.length > maxLength) throw new Error(`${label} maksimal ${maxLength} karakter.`);
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u.test(normalized)) {
    throw new Error(`${label} mengandung karakter kontrol yang tidak didukung.`);
  }
  return normalized;
}
function requireFile(label, value, extensions) {
  if (!value) return null;
  const resolved = path.resolve(value);
  if (!existsSync(resolved) || !statSync(resolved).isFile()) throw new Error(`${label} tidak ditemukan: ${resolved}`);
  if (extensions && !extensions.includes(path.extname(resolved).toLowerCase())) {
    throw new Error(`${label} harus berekstensi ${extensions.join(", ")}.`);
  }
  return resolved;
}
function escapeFilterPath(value) {
  return value.replace(/\\/g, "/").replace(/:/g, "\\:").replace(/'/g, "\\'");
}

function run() {
  const options = argsToObject(process.argv.slice(2));
  const images = ["image", "image2", "image3"]
    .map((key) => options[key] ? requireFile(key, options[key], [".jpg", ".jpeg", ".png", ".webp"]) : null)
    .filter(Boolean);
  const music = requireFile("--music", options.music, [".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"]);
  const subtitles = requireFile("--subtitles", options.subtitles, [".srt"]);
  const output = options.output ? path.resolve(options.output) : path.join(exportRoot, `nusa-video-${Date.now()}.mp4`);
  const duration = Number(options.duration ?? 30);
  const title = validateText("Judul", options.title, 90);
  const subtitle = validateText("Deskripsi", options.subtitle, 140);
  const cta = validateText("CTA", options.cta, 48);

  if (images.length === 0) throw new Error("Minimal satu gambar diperlukan melalui --image.");
  if (![30, 45, 60].includes(duration)) throw new Error("Durasi harus 30, 45, atau 60 detik.");
  if (!inside(exportRoot, output) || path.extname(output).toLowerCase() !== ".mp4") {
    throw new Error(`Output harus berupa file .mp4 di dalam ${exportRoot}`);
  }

  mkdirSync(exportRoot, { recursive: true });
  mkdirSync(cacheRoot, { recursive: true });
  const jobId = randomUUID();
  const tempFiles = [];
  const fontCandidates = [
    process.env.NUSA_FONT_FILE,
    path.join(process.env.WINDIR || "C:\\Windows", "Fonts", "arial.ttf"),
    path.join(process.env.WINDIR || "C:\\Windows", "Fonts", "segoeui.ttf")
  ].filter(Boolean);
  const fontFile = fontCandidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
  const args = ["-hide_banner", "-y"];
  for (const image of images) args.push("-loop", "1", "-framerate", "30", "-i", image);
  if (music) args.push("-stream_loop", "-1", "-i", music);

  const transition = images.length > 1 ? 0.7 : 0;
  const sceneDuration = (duration + transition * (images.length - 1)) / images.length;
  const filters = [];
  for (let i = 0; i < images.length; i += 1) {
    const frames = Math.ceil(sceneDuration * 30);
    filters.push(
      `[${i}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,zoompan=z='min(zoom+0.00035,1.06)':d=1:s=1080x1920:fps=30,trim=duration=${sceneDuration.toFixed(3)},setpts=PTS-STARTPTS[v${i}]`
    );
  }
  let videoLabel = "v0";
  for (let i = 1; i < images.length; i += 1) {
    const nextLabel = `vx${i}`;
    const offset = (sceneDuration - transition) * i;
    filters.push(`[${videoLabel}][v${i}]xfade=transition=fade:duration=${transition}:offset=${offset.toFixed(3)}[${nextLabel}]`);
    videoLabel = nextLabel;
  }

  const textLayers = [];
  function addTextLayer(name, value, y, fontSize, boxColor) {
    if (!value) return;
    if (!fontFile) throw new Error("Font Arial/Segoe UI tidak ditemukan. Atur NUSA_FONT_FILE ke file .ttf Windows.");
    const absolutePath = path.join(cacheRoot, `nca-${jobId}-${name}.txt`);
    writeFileSync(absolutePath, value, { encoding: "utf8", flag: "wx" });
    tempFiles.push(absolutePath);
    const fontPath = escapeFilterPath(fontFile);
    const textPath = escapeFilterPath(absolutePath);
    textLayers.push(`drawtext=fontfile='${fontPath}':textfile='${textPath}':expansion=none:fontcolor=white:fontsize=${fontSize}:line_spacing=12:borderw=3:bordercolor=black@0.65:box=1:boxcolor=${boxColor}:boxborderw=22:x=(w-text_w)/2:y=${y}`);
  }
  addTextLayer("title", title, "h*0.20", 66, "black@0.48");
  addTextLayer("subtitle", subtitle, "h*0.31", 38, "black@0.42");
  addTextLayer("cta", cta, "h*0.78", 52, "0x6D28D9@0.88");
  let finalFilters = textLayers;
  if (subtitles) {
    finalFilters = [...finalFilters,
      `subtitles=filename='${escapeFilterPath(subtitles)}':force_style='FontName=Arial,FontSize=20,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,Shadow=1,Alignment=2,MarginV=180'`
    ];
  }
  if (finalFilters.length) {
    const chain = finalFilters.join(",");
    filters.push(`[${videoLabel}]${chain}[vout]`);
    videoLabel = "vout";
  }
  args.push("-filter_complex", filters.join(";"), "-map", `[${videoLabel}]`);
  if (music) {
    const audioIndex = images.length;
    args.push("-map", `${audioIndex}:a:0`, "-af", `volume=0.18,afade=t=in:st=0:d=1,afade=t=out:st=${Math.max(0, duration - 2)}:d=2`, "-c:a", "aac", "-b:a", "128k", "-shortest");
  } else {
    args.push("-an");
  }
  args.push(
    "-t", String(duration), "-r", "30",
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "24",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    "-metadata", "title=NUSA CREATIVE AI - Affiliate Video MVP", output
  );

  try {
    const result = spawnSync(process.env.FFMPEG_PATH || "ffmpeg", args, {
      stdio: "inherit", windowsHide: true, cwd: root
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`FFmpeg gagal dengan exit code ${result.status}`);
    if (!existsSync(output) || statSync(output).size === 0) throw new Error("File output tidak ditemukan atau kosong.");

    const probe = spawnSync(process.env.FFPROBE_PATH || "ffprobe", [
      "-v", "error", "-show_entries", "format=duration:stream=width,height,codec_name,codec_type",
      "-of", "default=noprint_wrappers=1", output
    ], { encoding: "utf8", windowsHide: true });
    if (probe.status !== 0) throw new Error("Video dibuat, tetapi verifikasi ffprobe gagal.");
    process.stdout.write("\\nVideo berhasil dibuat dan diverifikasi:\\n");
    process.stdout.write(`${output}\\n${probe.stdout}`);
  } finally {
    for (const file of tempFiles) {
      try { unlinkSync(file); } catch { /* best-effort cleanup */ }
    }
  }
}
try {
  run();
} catch (error) {
  process.stderr.write(`\\nNUSA local renderer: ${error.message}\\n`);
  process.exitCode = 1;
}
