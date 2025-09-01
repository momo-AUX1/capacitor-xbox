#!/usr/bin/env node
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import os from "os";
import fs from "fs";
import fsp from "fs/promises";
import cp from "child_process";
import readline from "readline";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function logInfo(msg) {
  console.log(msg);
}
function logWarn(msg) {
  console.warn(msg);
}
function logErr(msg) {
  console.error(msg);
}

async function readJson(filePath) {
  const data = await fsp.readFile(filePath, "utf8");
  return JSON.parse(data);
}

function parseCapacitorTs(tsPath) {
  try {
    const content = fs.readFileSync(tsPath, "utf8");
    const match = content.match(/const\s+config:.*?=\s*({[\s\S]*?});/);
    if (!match) return null;
    let jsonish = match[1]
      .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
      .replace(/'/g, '"');
    try {
      return JSON.parse(jsonish);
    } catch (e) {
      logErr(`Error parsing capacitor.config.ts JSON: ${e}`);
      return null;
    }
  } catch {
    return null;
  }
}

async function replaceInFiles(rootDir, search, replace) {
  async function walk(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) {
        await walk(p);
      } else if (ent.isFile()) {
        try {
          const content = await fsp.readFile(p, { encoding: "utf8" });
          if (content.includes(search)) {
            const updated = content.split(search).join(replace);
            if (updated !== content) {
              await fsp.writeFile(p, updated, { encoding: "utf8" });
            }
          }
        } catch {

        }
      }
    }
  }
  await walk(rootDir);
}

function isValidAspectRatio(width, height, targetRatio = 2.067, tolerance = 1.5) {
  if (!height) return false;
  const r = width / height;
  return r >= targetRatio - tolerance && r <= targetRatio + tolerance;
}

function question(rl, q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

function getUserName() {
  try {
    return os.userInfo().username || process.env.USER || process.env.USERNAME || "User";
  } catch {
    return process.env.USER || process.env.USERNAME || "User";
  }
}

function makeGuidLike() {
  const hex = (n) => crypto.randomBytes(n).toString("hex");
  return `${hex(4)}-${hex(2)}-${hex(2)}-${hex(2)}-${hex(6)}`;
}

async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

async function clearDirContents(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const p = join(dir, ent.name);
    try {
      if (ent.isDirectory()) {
        await fsp.rm(p, { recursive: true, force: true });
      } else {
        await fsp.unlink(p);
      }
    } catch {}
  }
}

async function copyRecursive(src, dest) {
  const stat = await fsp.stat(src);
  if (stat.isDirectory()) {
    await ensureDir(dest);
    const entries = await fsp.readdir(src);
    for (const name of entries) {
      await copyRecursive(join(src, name), join(dest, name));
    }
  } else {
    await ensureDir(dirname(dest));
    await fsp.copyFile(src, dest);
  }
}

function unzipWithOS(zipPath, destDir) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    if (platform === "win32") {
      const ps = cp.spawn(
        "powershell",
        [
          "-NoProfile",
          "-Command",
          `Expand-Archive -LiteralPath \"${zipPath}\" -DestinationPath \"${destDir}\" -Force`,
        ],
        { stdio: "inherit" }
      );
      ps.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`Expand-Archive failed: ${code}`))));
    } else {
      const unzip = cp.spawn("unzip", ["-o", zipPath, "-d", destDir], { stdio: "inherit" });
      unzip.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`unzip failed: ${code}`))));
    }
  });
}

async function initializeUWPJS() {
  const cwd = process.cwd();
  const files = await fsp.readdir(cwd);

  let isSPA = false;
  let capDATA = null;
  let spaDATA = null;
  let currentWebDir = null;
  let resourcesDir = null;

  if (files.includes("package.json")) {
    isSPA = true; 
    spaDATA = await readJson(join(cwd, "package.json"));
  } else {
    logErr("No valid project found. exiting...");
    logWarn("If you don't use a JS framework, try `npm init` to create a package.json.");
    process.exit(1);
  }

  if (files.includes("capacitor.config.ts")) {
    capDATA = parseCapacitorTs(join(cwd, "capacitor.config.ts"));
  }

  if (capDATA && capDATA.webDir) currentWebDir = capDATA.webDir;
  else if (!capDATA && files.includes("dist")) currentWebDir = "dist";
  else if (!capDATA && files.includes("build")) currentWebDir = "build";
  else currentWebDir = null;

  if (files.includes("resources")) resourcesDir = "resources";
  else if (files.includes("assets")) resourcesDir = "assets";
  else resourcesDir = null;

  const suggestedName = (capDATA && capDATA.appName) || (spaDATA && spaDATA.name) || "MyApp";
  const suggestedBuildDir = currentWebDir || "dist";
  const suggestedResourcesDir = resourcesDir || "assets";

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const projectName = (await question(rl, `What should we call your app? (${suggestedName}): `)) || suggestedName;
  const buildDirName = (await question(rl, `What is the name of your build directory? (${suggestedBuildDir}): `)) || suggestedBuildDir;
  const resourcesDirName = (await question(rl, `What is the name of your resources directory? (${suggestedResourcesDir}): `)) || suggestedResourcesDir;
  rl.close();

  const userName = getUserName();

  const cfgPath = join(cwd, "uwp_js.config.json");
  const cfg = {
    name: projectName,
    buildDir: buildDirName,
    resourcesDir: resourcesDirName,
    user: userName,
    version: "0.0.2",
    platforms: { uwp: { config: "uwp_js.config.json" } },
  };
  await fsp.writeFile(cfgPath, JSON.stringify(cfg, null, 2));

  logInfo("Downloading Capacitor Xbox template...");
  const uwpDir = join(cwd, "uwp");
  await fsp.mkdir(uwpDir);

  const localZip = join(__dirname, "bin", "capacitor-xbox.zip");
  const targetZip = join(uwpDir, "UWP.js.zip");
  await fsp.copyFile(localZip, targetZip);
  logInfo("Download complete!");

  logInfo("Extracting Capacitor Xbox template...");
  await unzipWithOS(targetZip, uwpDir);
  await fsp.unlink(targetZip);

  const defaultFolder = join(uwpDir, "UWP.js");
  const projectFolder = join(uwpDir, projectName);
  if (fs.existsSync(defaultFolder) && fs.statSync(defaultFolder).isDirectory()) {
    await fsp.rename(defaultFolder, projectFolder);
  }

  const rootSln = join(uwpDir, "UWP.js.sln");
  const newRootSln = join(uwpDir, `${projectName}.sln`);
  if (fs.existsSync(rootSln)) {
    await fsp.rename(rootSln, newRootSln);
  }

  const oldCsproj = join(projectFolder, "UWP.js.csproj");
  const newCsproj = join(projectFolder, `${projectName}.csproj`);
  if (fs.existsSync(oldCsproj)) {
    await fsp.rename(oldCsproj, newCsproj);
  }

  if (fs.existsSync(newRootSln)) {
    let sln = await fsp.readFile(newRootSln, "utf8");
    sln = sln.replaceAll("UWP.js\\\\UWP.js.csproj", `${projectName}\\\\${projectName}.csproj`);
    sln = sln.replaceAll("UWP.js.sln", `${projectName}.sln`);
    sln = sln.split("UWP.js").join(projectName);
    await fsp.writeFile(newRootSln, sln, "utf8");
  }

  logInfo("Replacing placeholders...");
  await replaceInFiles(projectFolder, "UWP.js", projectName);
  await replaceInFiles(projectFolder, "Naalf", userName);
  await replaceInFiles(projectFolder, "4e34859b-2064-4d01-a9c6-f43ce8241ecd", makeGuidLike());

  logInfo("Initialization complete! Run sync next to prepare your Capacitor Xbox project.");
}

async function renameWasmFiles(projectName) {
  const base = join(process.cwd(), "uwp", projectName);
  const wasmRenames = [];
  async function walk(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) await walk(p);
      else if (ent.isFile() && p.endsWith(".wasm")) {
        const newPath = p.slice(0, -5) + ".txt";
        await fsp.rename(p, newPath);
        wasmRenames.push({ from: ent.name, to: `${ent.name.slice(0, -5)}.txt` });
        logInfo(`Renamed: ${p} -> ${newPath}`);
      }
    }
  }
  await walk(base);
  async function updateRefs(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) await updateRefs(p);
      else if (ent.isFile()) {
        try {
          let content = await fsp.readFile(p, "utf8");
          let changed = false;
          for (const { from, to } of wasmRenames) {
            if (content.includes(from)) {
              content = content.split(from).join(to);
              changed = true;
            }
          }
          if (changed) {
            await fsp.writeFile(p, content, "utf8");
            logInfo(`Updated reference in ${p}`);
          }
        } catch {
          
        }
      }
    }
  }
  await updateRefs(base);
}

async function findHtmlTarget(projectName) {
  const wpDir = join("uwp", projectName, "Assets", "WP");
  if (!fs.existsSync(wpDir)) return null;
  const indexHtml = join(wpDir, "index.html");
  if (fs.existsSync(indexHtml)) return indexHtml;
  try {
    const files = await fsp.readdir(wpDir);
    const htmls = files.filter((f) => f.toLowerCase().endsWith(".html"));
    if (!htmls.length) return null;
    const idx = htmls.find((f) => f.toLowerCase() === "index.html") || htmls[0];
    return join(wpDir, idx);
  } catch {
    return null;
  }
}

async function applyCssPatch(projectName) {
  logInfo("Patching CSS for canvas to full screen...");
  const targetFile = await findHtmlTarget(projectName);
  if (!targetFile) {
    logWarn(`No HTML file found in uwp/${projectName}/Assets/WP`);
    return;
  }
  let html;
  try {
    html = await fsp.readFile(targetFile, "utf8");
  } catch (e) {
    logErr(`Error reading HTML file ${targetFile}: ${e}`);
    return;
  }
  const stylePatch = "position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 99999999;";
  const canvasRe = /<canvas\b([^>]*)>/i;
  const m = html.match(canvasRe);
  if (!m) {
    logWarn(`No canvas element found in ${targetFile}.`);
    return;
  }
  let attrs = m[1] || "";
  const styleAttrRe = /\bstyle\s*=\s*("([^"]*)"|'([^']*)')/i;
  const sm = attrs.match(styleAttrRe);
  if (sm) {
    const quote = sm[1].startsWith("\"") ? '"' : "'";
    const current = sm[2] ?? sm[3] ?? "";
    if (!current.includes("width: 100vw") || !current.includes("height: 100vh")) {
      const needsSemi = current.trim() && !current.trim().endsWith(";");
      const updated = (current + (needsSemi ? ";" : "") + " " + stylePatch).trim();
      attrs = attrs.replace(styleAttrRe, `style=${quote}${updated}${quote}`);
    }
  } else {
    attrs = ` ${attrs.trim()} style="${stylePatch}"`.replace(/\s+$/, " ");
  }
  const newCanvas = `<canvas${attrs}>`;
  const newHtml = html.replace(canvasRe, newCanvas);
  try {
    await fsp.writeFile(targetFile, newHtml, "utf8");
    logInfo(`Patched canvas CSS in ${targetFile}`);
  } catch (e) {
    logErr(`Error writing patched HTML to ${targetFile}: ${e}`);
  }
}

async function applyControllerPatch(projectName) {
  logWarn("--patch-controller recognized but not implemented, skipping.");
}

async function syncProject(modifiers) {
  let data;
  try {
    data = await readJson(join(process.cwd(), "uwp_js.config.json"));
  } catch (e) {
    logErr("Configuration file 'uwp_js.config.json' not found or invalid. Please initialize the project first.");
    process.exit(1);
  }

  const projectName = data.name;
  const buildDir = data.buildDir;
  const resourcesDir = data.resourcesDir;

  if (!projectName || !buildDir || !resourcesDir || !data.user) {
    logErr("Invalid configuration data. Please re-initialize the project.");
    process.exit(1);
  }

  if (!fs.existsSync(buildDir)) {
    logErr(`Build directory '${buildDir}' does not exist. Please build your project first.`);
    process.exit(1);
  }

  const uwpAssetsWP = join("uwp", projectName, "Assets", "WP");
  await ensureDir(uwpAssetsWP);
  logInfo(`Syncing build directory '${buildDir}' to '${uwpAssetsWP}'...`);

  await clearDirContents(uwpAssetsWP);

  const buildStat = await fsp.stat(buildDir);
  if (!buildStat.isDirectory()) {
    logErr(`'${buildDir}' is not a directory.`);
    process.exit(1);
  }
  const items = await fsp.readdir(buildDir);
  for (const item of items) {
    try {
      await copyRecursive(join(buildDir, item), join(uwpAssetsWP, item));
    } catch (e) {
      logWarn(`Could not copy '${join(buildDir, item)}': ${e}`);
    }
  }

  const images = {
    "LockScreenLogo.scale-200.png": [48, 48],
    "Square44x44Logo.scale-200.png": [88, 88],
    "Square44x44Logo.targetsize-24_altform-unplated.png": [24, 24],
    "Square150x150Logo.scale-200.png": [300, 300],
    "StoreLogo.png": [50, 50],
  };
  const banners = {
    "SplashScreen.scale-200.png": [1240, 600],
    "Wide310x150Logo.scale-200.png": [620, 300],
  };

  const resDir = resourcesDir && fs.existsSync(resourcesDir) ? resourcesDir : null;
  if (resDir) {
    const iconCandidates = [
      "icon.png",
      "icon.jpg",
      "icon.jpeg",
      "logo.png",
      "logo.jpg",
      "logo.jpeg",
      "icon-only.png",
      "icon-only.jpg",
    ].map((n) => join(resDir, n));
    const bannerCandidates = [
      "banner.png",
      "banner.jpg",
      "banner.jpeg",
    ].map((n) => join(resDir, n));

    logInfo(`Resources directory: ${resDir}`);

    const firstExisting = (arr) => arr.find((p) => fs.existsSync(p));
    const chosenLogo = firstExisting(iconCandidates) || null;
    const chosenBanner = firstExisting(bannerCandidates) || null;

    let sharp = null;
    try {
      const mod = await import('sharp');
      sharp = mod.default || mod;
    } catch {
      
    }

    if (chosenLogo && sharp) {
      try {
        const meta = await sharp(chosenLogo).metadata();
        if (meta.width === meta.height) {
          logInfo("Found a square icon. Resizing for UWP...");
          for (const [name, [tw, th]] of Object.entries(images)) {
            const dest = join("uwp", projectName, "Assets", name);
            await sharp(chosenLogo).resize(tw, th, { fit: 'fill' }).toFile(dest);
            logInfo(`Saved resized icon: ${dest}`);
          }
        } else {
          logWarn("The found icon is not square. Skipping UWP icon generation.");
        }
      } catch (e) {
        logErr(`Error processing icon '${chosenLogo}': ${e}`);
      }
    } else if (!sharp) {
      logWarn("Image resizing skipped (optional dependency 'sharp' not installed).");
    } else {
      logWarn("No valid icon found (icon.png/.jpg, logo.png/.jpg, icon-only.png/.jpg).");
    }

    if (chosenBanner && sharp) {
      try {
        const meta = await sharp(chosenBanner).metadata();
        if (isValidAspectRatio(meta.width || 0, meta.height || 0)) {
          const r = (meta.width || 0) / (meta.height || 0);
          logInfo(`Valid banner found with aspect ratio ${r.toFixed(2)}. Resizing for UWP...`);
          for (const [name, [tw, th]] of Object.entries(banners)) {
            const dest = join("uwp", projectName, "Assets", name);
            await sharp(chosenBanner).resize(tw, th, { fit: 'fill' }).toFile(dest);
            logInfo(`Saved resized banner: ${dest}`);
          }
        } else {
          const r = (meta.width || 0) / (meta.height || 1);
          logWarn(`Banner aspect ratio ${r.toFixed(2)} is out of the valid range. Skipping UWP banner generation.`);
        }
      } catch (e) {
        logErr(`Error processing banner '${chosenBanner}': ${e}`);
      }
    } else if (chosenBanner && !sharp) {
      logWarn("Banner resizing skipped (optional dependency 'sharp' not installed).");
    } else {
      logWarn("No valid banner named banner.png or banner.jpg found.");
    }
  } else {
    logWarn("Resources directory not found or not specified. No images synced.");
  }

  const mods = Array.isArray(modifiers) ? modifiers : (modifiers ? [modifiers] : []);
  if (mods.includes("--patch-wasm")) {
    logInfo("Patching WASM files...");
    await renameWasmFiles(projectName);
  }
  if (mods.includes("--patch-css")) {
    logInfo("Patching CSS files...");
    await applyCssPatch(projectName);
  }
  if (mods.includes("--patch-controller")) {
    await applyControllerPatch(projectName);
  }

  logInfo(`Sync complete! Your Capacitor Xbox project '${projectName}' is now up-to-date.`);
}

async function openSolution() {
  if (!fs.existsSync("uwp_js.config.json")) {
    logErr("UWPJS project not initialized. exiting...");
    process.exit(1);
  }
  const data = await readJson("uwp_js.config.json");
  const slnPath = resolve(`uwp/${data.name}.sln`);
  const platform = os.platform();
  if (platform === "darwin") {
    cp.spawn("open", [slnPath], { stdio: "inherit" });
  } else if (platform === "linux") {
    cp.spawn("xdg-open", [slnPath], { stdio: "inherit" });
  } else if (platform === "win32") {
    cp.spawn("powershell", ["-NoProfile", "-Command", `Start-Process -FilePath \"${slnPath}\"`], { stdio: "inherit" });
  } else {
    logErr("Unsupported platform. Please open the solution manually.");
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    logErr("No command provided. Use help or -h for help.");
    process.exit(1);
  }
  if (args.length > 6) {
    logErr("Too many arguments provided. Use help or -h for help.");
    process.exit(1);
  }

  const cmd = args[0];

  const c = args[0];
  if (c === "help" || c === "-h") {
    console.log("Available commands:");
    console.log("  init, -i   : Initialize Capacitor Xbox for your project");
    console.log("  sync, -s   : Sync your project build and images to Capacitor Xbox environment");
    console.log("               Optional: --patch-wasm --patch-css --patch-controller");
    console.log("  open, -o   : Open the UWP project in Visual Studio");
    process.exit(0);
  }

  if (c === "open" || c === "-o") {
    await openSolution();
    return;
  }

  if (c === "init" || c === "-i") {
    if (fs.existsSync("uwp_js.config.json")) {
      logErr("Capacitor Xbox already initialized. exiting...");
      process.exit(1);
    }
    if (fs.existsSync("uwp")) {
      logErr("Capacitor Xbox already exists. Please remove it first. exiting...");
      process.exit(1);
    }
    logInfo("Initializing Capacitor Xbox project...");
    await initializeUWPJS();
    return;
  }

  if (c === "sync" || c === "-s") {
    if (!fs.existsSync("uwp_js.config.json")) {
      logErr("Capacitor Xbox project not initialized. exiting...");
      process.exit(1);
    }
    logInfo("Syncing Capacitor Xbox project...");
    const modifiers = args.slice(1);
    await syncProject(modifiers);
    return;
  }

  logErr(`Unknown command: ${c}. Use help or -h for help.`);
}


main().catch((e) => {
  logErr(String(e?.stack || e));
  process.exit(1);
});
