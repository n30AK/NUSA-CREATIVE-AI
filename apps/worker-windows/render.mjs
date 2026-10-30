#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd());
const exportRoot = path.resolve(root, "storage", "exports");

function argsToObject(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) throw new Error(`Unexpected argument: ${key}`);
    result[key.slice(2)] = argv[i + 1];
    i += 1;
  }
  return result;
}

function inside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function run() {
  const options = argsToObject(process.argv.slice(2));
  const image = options.image ? path.resolve(options.image) : "";
  const output = options.output
    ? path.resolve(options.output)
    : path.join(exportRoot, `nusa-video-${Date.now()}.mp4`);
  const duration = Number(options.duration ?? 30);

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
  const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
  const filter = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1";

  const result = spawnSync(ffmpeg, [
    "-hide_banner", "-y",
    "-loop", "1", "-framerate", "30", "-i", image,
    "-t", String(duration),
    "-vf", filter,
    "-r", "30",
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "24",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-metadata", "title=NUSA CREATIVE AI - Local Video MVP",
    output
  ], { stdio: "inherit", windowsHide: true });

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
}

try {
  run();
} catch (error) {
  process.stderr.write(`\nNUSA local renderer: ${error.message}\n`);
  process.exitCode = 1;
}
