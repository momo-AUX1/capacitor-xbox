#!/usr/bin/env node
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import os from "os";
import cp from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const platform = os.platform();
let binPath = null;

if (platform === "win32") {
  binPath = join(__dirname, "bin", "capacitor-xbox.exe");
} else if (platform === "darwin") {
  binPath = join(__dirname, "bin", "capacitor-xbox-mac");
} else if (platform === "linux") {
  binPath = join(__dirname, "bin", "capacitor-xbox");
} else {
  console.log(`Unknown platform: ${platform}. Supported: Windows (x64), Linux (x64), MacOS (arm64).`);
}

const args = process.argv.slice(2);
const child = cp.spawn(binPath, args, { stdio: "inherit" });

child.on("close", (code) => {
  process.exit(code);
});