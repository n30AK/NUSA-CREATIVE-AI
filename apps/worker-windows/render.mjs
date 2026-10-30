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
  if (normalized.length > maxLength) {
    throw new Error(`${label} maksimal ${maxLength} karakter.`);
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u.test(normalized)) {
    throw new Error(`${label} mengandung karakter kontrol yang tidak didukung.`);
  }
  return normalized;
}

function run() {
  const options = argsToObject(process.argv.slice(2));
  const image = options.image ? path.resolve(options.image) : "";
  const output = options.output
    ? path.resolve(options.output)
    : path.join(exportRoot, `nusa-video-${Date.now()}.mp4`);
  const duration = Number(options.duration ?? 30);
  const title = validateText("Judul", options.title, 90);
  const subtitle = validateText("Deskripsi", options.subtitle, 140);
  const cta = validateText("CTA", options.cta, 48);

  if (!image || !existsSync(image) || !statSync(image).isFile()) {
    throw new Error("Input image tidak ditemukan. Gunakan --image <path-gambar>.");
  }
  if (![30, 45, 60].includes(duration)) {
    throw new Error("Durasi harus 30, 45, atau 60 detik.");
  }
  if (!inside(exportRoot, output) || path.extname(output).toLowerCase() !== ".mp4") {
    throw new Error(`Output harus berupa file .mp4 di dalam ${exportRoot}`);
  }

  mkdirSync(exportRoot, { recursive: true });
  mkdirSync(cacheRoot, { recursive: true });
  const jobId = randomUUID();
  const tempFiles = [];
  const drawTextFilters = [];
  const fontCandidates = [
    process.env.NUSA_FONT_FILE,
    path.join(process.env.WINDIR || "C:\\Windows", "Fonts", "arial.ttf"),
    path.join(process.env.WINDIR || "C:\\Windows", "Fonts", "segoeui.ttf")
  ].filter(Boolean);
  const fontFile = fontCandidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());

  function addTextLayer(name, value, y, fontSize, boxColor) {
    if (!value) return;
    const fileName = `nca-${jobId}-${name}.txt`;
    const absolutePath = path.join(cacheRoot, fileName);
    writeFileSync(absolutePath, value, { encoding: "utf8", flag: "wx" });
    tempFiles.push(absolutePath);
    const relativePath = path.relative(root, absolutePath).split(path.sep).join("/");
    if (!fontFile) {
      throw new Error("Font Arial/Segoe UI tidak ditemukan. Atur NUSA_FONT_FILE ke file .ttf Windows.");
    }
    // An explicit font file bypasses Fontconfig's missing default config.
    const ffmpegFontPath = fontFile.replace(/\\/g, "/").replace(/:/g, "\\:");
    drawTextFilters.push(
      `drawtext=fontfile='${ffmpegFontPath}':textfile='${relativePath}':expansion=none:fontcolor=white:fontsize=${fontSize}:line_spacing=12:borderw=3:bordercolor=black@0.65:box=1:boxcolor=${boxColor}:boxborderw=22:x=(w-text_w)/2:y=${y}`
    );
  }

  addTextLayer("title", title, "h*0.20", 66, "black@0.48");
  addTextLayer("subtitle", subtitle, "h*0.31", 38, "black@0.42");
  addTextLayer("cta", cta, "h*0.78", 52, "0x6D28D9@0.88");

  const baseFilter = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1";
  const filter = [baseFilter, ...drawTextFilters].join(",");
  const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";

  try {
    const result = spawnSync(ffmpeg, [
      "-hide_banner", "-y",
      "-loop", "1", "-framerate", "30", "-i", image,
      "-t", String(duration),
      "-vf", filter,
      "-r", "30",
      "-c:v", "libx264", "-preset", "veryfast", "-crf", "24",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "-metadata", "title=NUSA CREATIVE AI - Affiliate Video MVP",
      output
    ], { stdio: "inherit", windowsHide: true, cwd: root });

    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`FFmpeg gagal dengan exit code ${result.status}`);
    if (!existsSync(output) || statSync(output).size === 0) {
      throw new Error("FFmpeg selesai tetapi file output tidak ditemukan atau kosong.");
    }

    const probe = spawnSync(process.env.FFPROBE_PATH || "ffprobe", [
      "-v", "error", "-show_entries", "format=duration:stream=width,height,codec_name",
      "-of", "default=noprint_wrappers=1", output
    ], { encoding: "utf8", windowsHide: true });

    if (probe.status !== 0) throw new Error("Video dibuat, tetapi verifikasi ffprobe gagal.");
    process.stdout.write("\nVideo berhasil dibuat dan diverifikasi:\n");
    process.stdout.write(`${output}\n${probe.stdout}`);
  } finally {
    for (const file of tempFiles) {
      try { unlinkSync(file); } catch { /* best-effort cleanup */ }
    }
  }
}

try {
  run();
} catch (error) {
  process.stderr.write(`\nNUSA local renderer: ${error.message}\n`);
  process.exitCode = 1;
}
