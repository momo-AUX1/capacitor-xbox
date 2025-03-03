# Capacitor Xbox

<p align="center">
  <img src="https://git.nanodata.cloud/moonpower/uwpjs/raw/branch/main/logo.png" alt="Capacitor Xbox Logo" width="200" />
</p>

A [Capacitor](https://capacitorjs.com/) implementation powered by [UWP.js](https://github.com/momo-AUX1/UWP.js) for Xbox and Windows. This project aims to mirror Capacitor’s APIs and integrate them with native UWP features, providing a bridge to run web content on Microsoft platforms with minimal changes.

---

| Windows | Xbox | Mobile |
|---------|------|--------|
| ![Windows img](https://raw.githubusercontent.com/momo-AUX1/UWP.js/refs/heads/main/githubimg/pc.png) | ![Xbox img](https://raw.githubusercontent.com/momo-AUX1/UWP.js/refs/heads/main/githubimg/xbox.png) | ![Mobile img](https://raw.githubusercontent.com/momo-AUX1/UWP.js/refs/heads/main/githubimg/mobile.png) |
| [capacitor-xbox](https://www.npmjs.com/package/capacitor-xbox) | [capacitor-xbox](https://www.npmjs.com/package/capacitor-xbox) | [capacitorJS](https://capacitorjs.com) |

---

### Disclaimer
Capacitor Xbox and UWP.js are in no way affiliated with Capacitor, Ionic, or Microsoft. This is a personal project intended solely to assist developers in the creation and porting of web applications and games to Xbox/Windows platforms.

---

## Features
- **Seamlessly mirrors Capacitor**: Drop-in usage if you’re already using Capacitor on other platforms.
- **UWP.js Under the Hood**: Extends [UWP.js](https://github.com/momo-AUX1/UWP.js) to talk to native Windows/Xbox APIs, file system, and more.
- **Multi-platform**: Windows desktop and Xbox.
- **“Plug and play”**: Just include the script references and call the same Capacitor methods you already use for iOS/Android in your code.
- **HTML/JS frameworks**: Use your favorite SPA library or plain HTML. The integrated environment can load them straight from the WebView.

## How To Use
1. **Install** this package (once published to npm) with your usual command:

```bash
npm install capacitor-xbox
```

Then use the help function to quickly see what you can do
```bash
npx capacitor-xbox help
```

Here’s an example file structure showing where each piece typically goes:
```
my-capacitor-xbox-project/
├─ package.json
├─ capacitor.config.ts
├─ resources/                // Optional folder for images or icons
├─ uwp_js.config.json        // Generated config used by the Capacitor Xbox CLI
├─ uwp/
│  └─ <YourUWPProjectName>/
│     ├─ MainPage.xaml.cs    // Primary UWP page (acts like your "app delegate")
│     ├─ <YourUWPProjectName>.csproj
│     ├─ Assets/
│     │  └─ WP/              // Dist folder for your built web files
│     └─ ... other UWP project files ...
└─ ...
```

2. **Include the scripts** in your web build:
```js
import { UwpBridge, CapacitorUWP } from "capacitor-xbox";

// Example usage:
const bridge = new UwpBridge();
// Register "CapacitorUWP" plugin so it can initialize
bridge.registerPlugin(CapacitorUWP);

// Then do typical Capacitor calls:
window.Capacitor.Preferences.set({ key: 'myKey', value: 'myVal' });
```
3.	Check for the platform if you need environment-specific logic:
```js
(async () => {
  const platform = await window.Capacitor.getPlatform();
  if (platform === 'xbox' || platform === 'windows') {
    // Additional or restricted logic for these platforms
  }
})();
```
4.	Build/Deploy using your normal web or Capacitor workflow. After building, you can integrate the generated files into the UWP host or rely on the provided scripts to “sync” or “init” the environment.

Current Status / Limitations

Experimental: The Capacitor support layer is still highly experimental, so expect bugs or missing plugins. Some rely on standard web APIs as a fallback, while a few are natively implemented (e.g., Preferences). Over time, more core and community plugins will be added or improved.

Not all file operations are fully supported on Xbox. For instance, file picking is more limited, and .wasm/.zip can fail to load due to a Microsoft Edge bug. Temporarily, rename them or load as base64.

Examples of working pieces:

	•	Capacitor Core (partial)
	•	Preferences (complete)
	•	Some basic file operations via UWP.js
	•	Coming soon: Extended FS plugin

What Can You Do on Capacitor-Xbox?

	•	Use the same codebase for all platforms
	•	If you don’t use Capacitor, you can still just build your HTML/JS and drop it in
	•	Bring your favorite UI frameworks (React, Vue, Angular, etc.)
	•	Port WebGL/Emscripten Games* or other advanced scenarios

* Some extra workarounds may be required for WebGL on Edge WebView2, especially for file serving or .wasm file naming.

Known Limitations

	•	Some plugins won’t work out of the box. They might fail or fall back to web-only logic.
	•	.WASM / .ZIP might need a rename or base64 trick to bypass Edge WebView2 load bugs.
	•	Filesystem is being developed. In the meantime, you can still do advanced file operations using the raw UWP.js calls.

Using and Extending the C# Backend

Inside the uwp folder, you’ll find the UWP C# project which exposes native methods to the WebView. You can install NuGet packages in Visual Studio (or your preferred IDE) and then surface their functionality by:

	1.	Adding your desired code into UwpNativeMethods.
	2.	Creating public Task<string> methods that do the new work you need.
	3.	Calling those methods from your JS by bridge.callNative('yourNewMethodName', args...).

Any extended C# code becomes directly available to your JavaScript via the same bridging mechanism. That way you can map new capabilities (speech recognition, advanced Windows APIs, custom hardware features, etc.) into your web code with minimal overhead.

© 2025. Created by momo-AUX1 and contributed by the open-source community. For issues, discussions, or to submit contributions, please visit:
https://github.com/momo-AUX1/UWP.js
