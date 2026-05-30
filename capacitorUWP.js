import UwpBridge from "./uwp.js";

const CAP_ERROR = {
  Unavailable: "UNAVAILABLE",
  Unimplemented: "UNIMPLEMENTED",
};

const CameraSource = {
  Prompt: "PROMPT",
  Camera: "CAMERA",
  Photos: "PHOTOS",
};

const CameraDirection = {
  Rear: "REAR",
  Front: "FRONT",
};

const CameraResultType = {
  Uri: "URI",
  Base64: "BASE64",
  DataUrl: "DATAURL",
};

const MediaType = {
  All: "ALL",
  Videos: "VIDEOS",
  Photos: "PHOTOS",
};

const FilesystemDirectory = {
  Documents: "DOCUMENTS",
  Data: "DATA",
  Library: "LIBRARY",
  Cache: "CACHE",
  External: "EXTERNAL",
  ExternalStorage: "EXTERNAL_STORAGE",
};

const FilesystemEncoding = {
  UTF8: "utf8",
  ASCII: "ascii",
  UTF16: "utf16",
};

const ImpactStyle = {
  Heavy: "HEAVY",
  Medium: "MEDIUM",
  Light: "LIGHT",
};

const NotificationType = {
  Success: "SUCCESS",
  Warning: "WARNING",
  Error: "ERROR",
};

const KeyboardStyle = {
  Dark: "DARK",
  Light: "LIGHT",
  Default: "DEFAULT",
};

const KeyboardResize = {
  Body: "body",
  Ionic: "ionic",
  Native: "native",
  None: "none",
};

const StatusBarStyle = {
  Dark: "DARK",
  Light: "LIGHT",
  Default: "DEFAULT",
};

const StatusBarAnimation = {
  None: "NONE",
  Slide: "SLIDE",
  Fade: "FADE",
};

const ActionSheetButtonStyle = {
  Default: "DEFAULT",
  Destructive: "DESTRUCTIVE",
  Cancel: "CANCEL",
};

const BarcodeCameraDirection = {
  Back: "BACK",
  Front: "FRONT",
};

const BarcodeScanOrientation = {
  Portrait: "PORTRAIT",
  Landscape: "LANDSCAPE",
  Adaptive: "ADAPTIVE",
};

const PLUGIN_METHODS = {
  ActionSheet: ["showActions"],
  App: [
    "exitApp",
    "getInfo",
    "getState",
    "getLaunchUrl",
    "minimizeApp",
    "getAppLanguage",
    "toggleBackButtonHandler",
    "addListener",
    "removeListener",
    "removeAllListeners",
  ],
  AppLauncher: ["canOpenUrl", "openUrl"],
  Browser: ["open", "close", "addListener", "removeListener", "removeAllListeners"],
  Clipboard: ["write", "read"],
  Device: ["getId", "getInfo", "getBatteryInfo", "getLanguageCode", "getLanguageTag"],
  Dialog: ["alert", "prompt", "confirm"],
  LocalNotifications: [
    "schedule",
    "getPending",
    "registerActionTypes",
    "cancel",
    "areEnabled",
    "getDeliveredNotifications",
    "removeDeliveredNotifications",
    "removeAllDeliveredNotifications",
    "createChannel",
    "deleteChannel",
    "listChannels",
    "checkPermissions",
    "requestPermissions",
    "changeExactNotificationSetting",
    "checkExactNotificationSetting",
    "addListener",
    "removeListener",
    "removeAllListeners",
  ],
  Motion: ["addListener", "removeListener", "removeAllListeners"],
  Network: ["getStatus", "addListener", "removeListener", "removeAllListeners"],
  Preferences: ["configure", "get", "set", "remove", "clear", "keys", "migrate", "removeOld"],
  PushNotifications: [
    "register",
    "unregister",
    "getDeliveredNotifications",
    "removeDeliveredNotifications",
    "removeAllDeliveredNotifications",
    "createChannel",
    "deleteChannel",
    "listChannels",
    "checkPermissions",
    "requestPermissions",
    "addListener",
    "removeListener",
    "removeAllListeners",
  ],
  ScreenOrientation: ["orientation", "lock", "unlock", "addListener", "removeListener", "removeAllListeners"],
  ScreenReader: ["isEnabled", "speak", "addListener", "removeListener", "removeAllListeners"],
  Share: ["canShare", "share"],
  SplashScreen: ["show", "hide"],
  StatusBar: [
    "setStyle",
    "setBackgroundColor",
    "show",
    "hide",
    "getInfo",
    "setOverlaysWebView",
    "addListener",
    "removeListener",
    "removeAllListeners",
  ],
  TextZoom: ["get", "getPreferred", "set"],
  Toast: ["show"],
  Camera: [
    "takePhoto",
    "recordVideo",
    "playVideo",
    "chooseFromGallery",
    "editPhoto",
    "editURIPhoto",
    "pickLimitedLibraryPhotos",
    "getLimitedLibraryPhotos",
    "checkPermissions",
    "requestPermissions",
    "getPhoto",
    "pickImages",
  ],
  Filesystem: [
    "checkPermissions",
    "requestPermissions",
    "readFile",
    "readFileInChunks",
    "writeFile",
    "appendFile",
    "deleteFile",
    "mkdir",
    "rmdir",
    "readdir",
    "getUri",
    "stat",
    "rename",
    "copy",
    "downloadFile",
    "addListener",
    "removeListener",
    "removeAllListeners",
  ],
  FileTransfer: ["downloadFile", "uploadFile", "addListener", "removeListener", "removeAllListeners"],
  FileViewer: [
    "openDocumentFromLocalPath",
    "openDocumentFromResources",
    "openDocumentFromUrl",
    "previewMediaContentFromLocalPath",
    "previewMediaContentFromResources",
    "previewMediaContentFromUrl",
  ],
  Geolocation: ["getCurrentPosition", "watchPosition", "clearWatch", "checkPermissions", "requestPermissions"],
  Haptics: ["impact", "notification", "vibrate", "selectionStart", "selectionChanged", "selectionEnd"],
  Keyboard: [
    "show",
    "hide",
    "setAccessoryBarVisible",
    "setScroll",
    "setStyle",
    "setResizeMode",
    "getResizeMode",
    "addListener",
    "removeListener",
    "removeAllListeners",
  ],
  CapacitorBarcodeScanner: ["scanBarcode"],
  CapacitorBackgroundRunner: [
    "checkPermissions",
    "requestPermissions",
    "dispatchEvent",
    "addListener",
    "removeListener",
    "removeNotificationListeners",
  ],
  CapacitorGoogleMaps: [
    "create",
    "destroy",
    "enableTouch",
    "disableTouch",
    "enableClustering",
    "disableClustering",
    "enableCurrentLocation",
    "enableIndoorMaps",
    "enableTrafficLayer",
    "enableAccessibilityElements",
    "setPadding",
    "setMapType",
    "getMapType",
    "setCamera",
    "getMapBounds",
    "fitBounds",
    "mapBoundsContains",
    "mapBoundsExtend",
    "addMarker",
    "addMarkers",
    "removeMarker",
    "removeMarkers",
    "addPolygons",
    "removePolygons",
    "addPolylines",
    "removePolylines",
    "addCircles",
    "removeCircles",
    "addTileOverlay",
    "removeTileOverlay",
    "onResize",
    "onScroll",
    "onDisplay",
    "dispatchMapEvent",
    "addListener",
    "removeListener",
    "removeAllListeners",
  ],
  Watch: ["addListener", "removeListener", "removeAllListeners", "updateWatchUI", "updateWatchData"],
};
PLUGIN_METHODS.BackgroundRunner = PLUGIN_METHODS.CapacitorBackgroundRunner;
PLUGIN_METHODS.GoogleMaps = PLUGIN_METHODS.CapacitorGoogleMaps;

function getWindow() {
  return typeof window !== "undefined" ? window : globalThis;
}

function createCapacitorError(message, code = CAP_ERROR.Unavailable) {
  const win = getWindow();
  const CapException = win.Capacitor && win.Capacitor.Exception;
  if (typeof CapException === "function") {
    return new CapException(message, code);
  }
  const error = new Error(message);
  error.code = code;
  return error;
}

function unavailable(pluginName, methodName, reason) {
  const suffix = reason ? `: ${reason}` : "";
  throw createCapacitorError(`${pluginName}.${methodName}() is not available on UWP/Xbox${suffix}`);
}

function normalizeNativeError(error, pluginName, methodName) {
  const message = String(error && error.message ? error.message : error);
  if (
    /not found|MissingMethod|RPC timeout|not implemented|unavailable/i.test(message)
  ) {
    return createCapacitorError(`${pluginName}.${methodName}() is not available on UWP/Xbox: ${message}`);
  }
  return error;
}

async function callNative(pluginName, methodName, action) {
  try {
    return await action();
  } catch (error) {
    throw normalizeNativeError(error, pluginName, methodName);
  }
}

function unsupported(pluginName, methodName, reason) {
  return async function unsupportedMethod() {
    unavailable(pluginName, methodName, reason);
  };
}

function toGrantedPermissions() {
  return {
    publicStorage: "granted",
    camera: "granted",
    photos: "granted",
    location: "granted",
    coarseLocation: "granted",
    display: "granted",
  };
}

function toDeniedPermissions(keys) {
  return keys.reduce((acc, key) => {
    acc[key] = "denied";
    return acc;
  }, {});
}

function hasNativeClipboard() {
  return typeof navigator !== "undefined" && navigator.clipboard;
}

function mapLocalNotification(notification) {
  return {
    Id: String(notification.id ?? notification.identifier ?? Date.now()),
    Title: notification.title || "",
    Message: notification.body || notification.message || "",
    Image: notification.largeIcon || notification.iconColor || notification.image,
    Tag: notification.extra && notification.extra.tag,
    Group: notification.group,
    ExpirationTime: notification.schedule && notification.schedule.at,
  };
}

function getCapacitorPluginConfig(pluginName) {
  const win = getWindow();
  const cap = win.Capacitor || {};
  let config = {};

  if (typeof cap.getConfig === "function") {
    try {
      config = cap.getConfig() || {};
    } catch {}
  }

  config = config || cap.config || win.CapacitorConfig || win.capacitorConfig || {};
  const plugins = config.plugins || {};
  return plugins[pluginName] || plugins[`Capacitor${pluginName}`] || cap[`${pluginName}Config`] || {};
}

async function hydrateCapacitorConfig(cap) {
  if (cap.config || typeof fetch !== "function") {
    return;
  }

  try {
    const response = await fetch("capacitor.config.json", { cache: "no-store" });
    if (response.ok) {
      cap.config = await response.json();
    }
  } catch {}
}

function createListenerManager(bridge, pluginName, routes = {}) {
  let nextId = 1;
  const listeners = new Map();

  const removeById = async (callbackId) => {
    const record = listeners.get(callbackId);
    if (!record) {
      return;
    }
    if (record.remove) {
      record.remove();
    }
    listeners.delete(callbackId);
  };

  return {
    async addListener(eventName, listenerFunc) {
      if (typeof listenerFunc !== "function") {
        throw createCapacitorError(`${pluginName}.addListener() requires a callback`, CAP_ERROR.Unimplemented);
      }

      const route = routes[eventName] || {};
      const nativeEvent = typeof route === "string" ? route : route.event || eventName;
      const transform = typeof route.transform === "function" ? route.transform : (data) => data;
      const callbackId = `${pluginName}:${nextId++}`;
      const nativeCallback = (data) => listenerFunc(transform(data || {}));
      const nativeHandle = bridge.on(nativeEvent, nativeCallback);

      listeners.set(callbackId, {
        eventName,
        remove: () => {
          if (nativeHandle && typeof nativeHandle.remove === "function") {
            nativeHandle.remove();
          } else if (typeof bridge.off === "function") {
            bridge.off(nativeEvent, nativeCallback);
          }
        },
      });

      return {
        _callbackId: callbackId,
        remove: () => removeById(callbackId),
      };
    },

    async removeListener(options = {}) {
      await removeById(options.callbackId);
    },

    async removeAllListeners() {
      await Promise.all(Array.from(listeners.keys()).map(removeById));
    },
  };
}

function createPluginHeaders() {
  return Object.entries(PLUGIN_METHODS).map(([name, methods]) => ({
    name,
    methods: methods.map((method) => ({
      name: method,
      rtype: method === "addListener" ? "callback" : "promise",
    })),
  }));
}

function installCapacitorRuntime(bridge, platform) {
  const win = getWindow();
  win.CapacitorCustomPlatform = {
    name: platform,
  };

  const cap = win.Capacitor || {};
  cap.Plugins = cap.Plugins || {};
  cap._uwpPluginImplementations = cap._uwpPluginImplementations || {};
  cap.PluginHeaders = mergePluginHeaders(cap.PluginHeaders || [], createPluginHeaders());
  cap.getPlatform = () => platform;
  cap.isNativePlatform = () => true;
  cap.convertFileSrc = cap.convertFileSrc || ((filePath) => {
    if (!filePath) {
      return filePath;
    }
    if (/^(https?|file|ms-appx|ms-appdata):/i.test(filePath)) {
      return filePath;
    }
    return `http://localdata/${String(filePath).replace(/^[/\\]+/, "")}`;
  });
  cap.handleError = cap.handleError || ((error) => console.error(error));
  cap.Exception = cap.Exception || class CapacitorException extends Error {
    constructor(message, code, data) {
      super(message);
      this.message = message;
      this.code = code;
      this.data = data;
    }
  };

  cap.nativePromise = async (pluginName, methodName, options) => {
    const plugin = cap._uwpPluginImplementations[pluginName] || cap.Plugins[pluginName];
    if (!plugin || typeof plugin[methodName] !== "function") {
      unavailable(pluginName, methodName, "plugin method is not registered");
    }
    return plugin[methodName](options || {});
  };

  cap.nativeCallback = async (pluginName, methodName, options, callback) => {
    const plugin = cap._uwpPluginImplementations[pluginName] || cap.Plugins[pluginName];
    if (!plugin || typeof plugin[methodName] !== "function") {
      unavailable(pluginName, methodName, "plugin callback is not registered");
    }
    const result = await plugin[methodName](options && options.eventName, callback);
    return result && result._callbackId ? result._callbackId : result;
  };

  if (!cap.registerPlugin) {
    cap.registerPlugin = (pluginName) => {
      if (!cap.Plugins[pluginName]) {
        cap.Plugins[pluginName] = new Proxy({}, {
          get() {
            return () => Promise.reject(
              createCapacitorError(`${pluginName} plugin is not registered`, CAP_ERROR.Unimplemented),
            );
          },
        });
      }
      return cap.Plugins[pluginName];
    };
  }

  win.Capacitor = cap;
  win.capacitor = cap;
  return cap;
}

function mergePluginHeaders(existing, additions) {
  const byName = new Map(existing.map((header) => [header.name, {
    name: header.name,
    methods: [...(header.methods || [])],
  }]));

  for (const header of additions) {
    const current = byName.get(header.name);
    if (!current) {
      byName.set(header.name, header);
      continue;
    }
    const methods = new Map(current.methods.map((method) => [method.name, method]));
    for (const method of header.methods) {
      if (!methods.has(method.name)) {
        current.methods.push(method);
      }
    }
  }

  return Array.from(byName.values());
}

function bootstrapCapacitorHeaders() {
  const win = getWindow();
  const cap = win.Capacitor || {};

  win.CapacitorCustomPlatform = win.CapacitorCustomPlatform || {
    name: "windows",
  };

  cap.Plugins = cap.Plugins || {};
  cap.PluginHeaders = mergePluginHeaders(cap.PluginHeaders || [], createPluginHeaders());
  cap.nativePromise = cap.nativePromise || ((pluginName, methodName) => Promise.reject(
    createCapacitorError(
      `${pluginName}.${methodName}() is not ready. Initialize CapacitorUWP before calling native plugins.`,
      CAP_ERROR.Unavailable,
    ),
  ));
  cap.nativeCallback = cap.nativeCallback || ((pluginName, methodName) => Promise.reject(
    createCapacitorError(
      `${pluginName}.${methodName}() is not ready. Initialize CapacitorUWP before adding listeners.`,
      CAP_ERROR.Unavailable,
    ),
  ));
  win.Capacitor = cap;
  win.capacitor = cap;
}

function registerPluginObject(cap, name, plugin) {
  cap._uwpPluginImplementations = cap._uwpPluginImplementations || {};
  cap._uwpPluginImplementations[name] = plugin;
  cap.Plugins[name] = plugin;
  cap[name] = plugin;
}

function getFilesystemEncoding(options = {}) {
  const encoding = options.encoding;
  if (!encoding) {
    return "base64";
  }
  return String(encoding).toLowerCase() === "utf8" ? "utf8" : encoding;
}

function getFilenameFromPath(path) {
  const cleanPath = String(path || "download").split(/[?#]/)[0];
  return cleanPath.substring(cleanPath.lastIndexOf("/") + 1) || "download";
}

function createActionSheetPlugin(bridge) {
  return {
    ActionSheetButtonStyle,
    showActions: (options = {}) => callNative("ActionSheet", "showActions", () => bridge.showActionSheet(options)),
  };
}

function createAppPlugin(bridge, platform) {
  const listeners = createListenerManager(bridge, "App", {
    appUrlOpen: {
      event: "protocolActivated",
      transform: (data) => ({
        url: data.uri || data.url,
        ...data,
      }),
    },
    appStateChange: "appStateChange",
    pause: "pause",
    resume: "resume",
    backButton: "backButton",
    appRestoredResult: "appRestoredResult",
  });

  return {
    exitApp: async () => {
      await bridge.quitApp();
    },
    getInfo: () => callNative("App", "getInfo", () => bridge.getAppInfo()),
    getState: async () => ({ isActive: typeof document === "undefined" ? true : !document.hidden }),
    getLaunchUrl: () => callNative("App", "getLaunchUrl", () => bridge.getLaunchUrl()),
    minimizeApp: () => callNative("App", "minimizeApp", () => bridge.minimizeApp()),
    getAppLanguage: async () => {
      try {
        return await bridge.getAppLanguage();
      } catch {
        return { code: (typeof navigator !== "undefined" && navigator.language) || "en-US" };
      }
    },
    toggleBackButtonHandler: (options = {}) => callNative(
      "App",
      "toggleBackButtonHandler",
      () => bridge.toggleBackButtonHandler(options),
    ),
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
    platform,
  };
}

function createAppLauncherPlugin(bridge) {
  return {
    canOpenUrl: async (options = {}) => {
      if (!options.url) {
        throw createCapacitorError("AppLauncher.canOpenUrl() requires a url", CAP_ERROR.Unimplemented);
      }
      const value = await bridge.canOpenUrl(options.url);
      return { value: !!value };
    },
    openUrl: async (options = {}) => {
      if (!options.url) {
        throw createCapacitorError("AppLauncher.openUrl() requires a url", CAP_ERROR.Unimplemented);
      }
      const completed = await bridge.openUrl(options.url);
      return { completed: !!completed };
    },
  };
}

function createBrowserPlugin(bridge) {
  const listeners = createListenerManager(bridge, "Browser", {
    browserFinished: "browserFinished",
    browserPageLoaded: "browserPageLoaded",
  });

  return {
    open: async (options = {}) => {
      if (bridge.openBrowser) {
        await callNative("Browser", "open", () => bridge.openBrowser(options));
        return;
      }
      if (options.url) {
        await bridge.openUrl(options.url);
        return;
      }
      unavailable("Browser", "open", "url is required");
    },
    close: () => callNative("Browser", "close", () => bridge.closeBrowser()),
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createClipboardPlugin(bridge) {
  return {
    write: async (options = {}) => {
      try {
        await bridge.writeClipboard(options);
      } catch (error) {
        if (hasNativeClipboard() && typeof navigator.clipboard.writeText === "function") {
          await navigator.clipboard.writeText(options.string || options.url || options.image || "");
          return;
        }
        throw normalizeNativeError(error, "Clipboard", "write");
      }
    },
    read: async () => {
      try {
        return await bridge.readClipboard();
      } catch (error) {
        if (hasNativeClipboard() && typeof navigator.clipboard.readText === "function") {
          return { type: "text/plain", value: await navigator.clipboard.readText() };
        }
        throw normalizeNativeError(error, "Clipboard", "read");
      }
    },
  };
}

function createDevicePlugin(bridge) {
  return {
    getId: () => callNative("Device", "getId", () => bridge.getDeviceId()),
    getInfo: async () => {
      try {
        return await bridge.getDeviceInfo();
      } catch (error) {
        if (typeof navigator !== "undefined") {
          return {
            platform: "web",
            operatingSystem: "windows",
            osVersion: "",
            manufacturer: "Microsoft",
            model: navigator.userAgent,
            webViewVersion: navigator.userAgent,
            isVirtual: false,
          };
        }
        throw normalizeNativeError(error, "Device", "getInfo");
      }
    },
    getBatteryInfo: async () => {
      try {
        return await bridge.getBatteryInfo();
      } catch (error) {
        if (typeof navigator !== "undefined" && navigator.getBattery) {
          const battery = await navigator.getBattery();
          return {
            batteryLevel: battery.level,
            isCharging: battery.charging,
          };
        }
        throw normalizeNativeError(error, "Device", "getBatteryInfo");
      }
    },
    getLanguageCode: async () => {
      try {
        return await bridge.getLanguageCode();
      } catch {
        return { value: ((typeof navigator !== "undefined" && navigator.language) || "en").split("-")[0] };
      }
    },
    getLanguageTag: async () => {
      try {
        return await bridge.getLanguageTag();
      } catch {
        return { value: (typeof navigator !== "undefined" && navigator.language) || "en-US" };
      }
    },
  };
}

function createDialogPlugin(bridge) {
  return {
    alert: async (options = {}) => {
      await bridge.showAlert(options.title || "Alert", options.message || "");
    },
    prompt: (options = {}) => callNative("Dialog", "prompt", () => bridge.promptDialog(options)),
    confirm: async (options = {}) => {
      const result = await bridge.showDialog(
        options.title || "Confirm",
        options.message || "",
        options.okButtonTitle || "OK",
        options.cancelButtonTitle || "Cancel",
      );
      return { value: result === "0" || result.buttonPressed === (options.okButtonTitle || "OK") };
    },
  };
}

function createLocalNotificationsPlugin(bridge) {
  const listeners = createListenerManager(bridge, "LocalNotifications", {
    localNotificationReceived: "localNotificationReceived",
    localNotificationActionPerformed: "localNotificationActionPerformed",
  });

  return {
    schedule: async (options = {}) => {
      if (bridge.scheduleLocalNotifications) {
        try {
          return await bridge.scheduleLocalNotifications(options);
        } catch (error) {
          if (!/not found|MissingMethod|not implemented/i.test(String(error && error.message))) {
            throw normalizeNativeError(error, "LocalNotifications", "schedule");
          }
        }
      }

      const notifications = options.notifications || [];
      const ids = [];
      for (const notification of notifications) {
        const mapped = mapLocalNotification(notification);
        await bridge.showNotification(mapped);
        ids.push(Number(mapped.Id));
      }
      return { notifications: ids.map((id) => ({ id })) };
    },
    getPending: () => callNative("LocalNotifications", "getPending", () => bridge.getPendingLocalNotifications()),
    registerActionTypes: (options = {}) => callNative(
      "LocalNotifications",
      "registerActionTypes",
      () => bridge.registerLocalNotificationActionTypes(options),
    ),
    cancel: (options = {}) => callNative("LocalNotifications", "cancel", () => bridge.cancelLocalNotifications(options)),
    areEnabled: async () => {
      try {
        return await bridge.areLocalNotificationsEnabled();
      } catch {
        return { value: true };
      }
    },
    getDeliveredNotifications: () => callNative(
      "LocalNotifications",
      "getDeliveredNotifications",
      () => bridge.getDeliveredNotifications(),
    ),
    removeDeliveredNotifications: (options = {}) => callNative(
      "LocalNotifications",
      "removeDeliveredNotifications",
      () => bridge.removeDeliveredNotifications(options),
    ),
    removeAllDeliveredNotifications: async () => {
      if (bridge.removeAllDeliveredNotifications) {
        try {
          await bridge.removeAllDeliveredNotifications();
          return;
        } catch (error) {
          if (!/not found|MissingMethod|not implemented/i.test(String(error && error.message))) {
            throw normalizeNativeError(error, "LocalNotifications", "removeAllDeliveredNotifications");
          }
        }
      }
      await bridge.clearNotification();
    },
    createChannel: (channel = {}) => callNative("LocalNotifications", "createChannel", () => bridge.createNotificationChannel(channel)),
    deleteChannel: (options = {}) => callNative("LocalNotifications", "deleteChannel", () => bridge.deleteNotificationChannel(options)),
    listChannels: () => callNative("LocalNotifications", "listChannels", () => bridge.listNotificationChannels()),
    checkPermissions: async () => ({ display: "granted" }),
    requestPermissions: async () => ({ display: "granted" }),
    changeExactNotificationSetting: () => callNative(
      "LocalNotifications",
      "changeExactNotificationSetting",
      () => bridge.changeExactNotificationSetting(),
    ),
    checkExactNotificationSetting: () => callNative(
      "LocalNotifications",
      "checkExactNotificationSetting",
      () => bridge.checkExactNotificationSetting(),
    ),
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createMotionPlugin(bridge) {
  const listeners = createListenerManager(bridge, "Motion", {
    accel: "motionAccel",
    orientation: "motionOrientation",
  });

  return {
    addListener: async (eventName, listenerFunc) => {
      await callNative("Motion", "addListener", () => bridge.startMotionUpdates({ eventName }));
      return listeners.addListener(eventName, listenerFunc);
    },
    removeListener: listeners.removeListener,
    removeAllListeners: async () => {
      await listeners.removeAllListeners();
      try {
        await bridge.stopMotionUpdates();
      } catch {}
    },
  };
}

function createNetworkPlugin(bridge) {
  const listeners = createListenerManager(bridge, "Network", {
    networkStatusChange: "networkStatusChange",
  });

  if (typeof window !== "undefined") {
    const notify = () => bridge.emit("networkStatusChange", {
      connected: typeof navigator === "undefined" ? true : navigator.onLine,
      connectionType: typeof navigator !== "undefined" && navigator.onLine ? "unknown" : "none",
    });
    window.addEventListener("online", notify);
    window.addEventListener("offline", notify);
  }

  return {
    getStatus: async () => {
      try {
        return await bridge.getNetworkStatus();
      } catch {
        return {
          connected: typeof navigator === "undefined" ? true : navigator.onLine,
          connectionType: typeof navigator !== "undefined" && navigator.onLine ? "unknown" : "none",
        };
      }
    },
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createPreferencesPlugin(bridge) {
  let store = {};
  let dbFile = "db.json";
  let loaded = false;

  const safeGroupFile = (group) => {
    if (!group) {
      return "db.json";
    }
    return `${String(group).replace(/[^a-z0-9._-]/gi, "_")}.preferences.json`;
  };

  const loadStore = async () => {
    if (loaded) {
      return;
    }
    try {
      const fileContent = await bridge.readFile(dbFile);
      store = JSON.parse(fileContent);
    } catch {
      store = {};
      try {
        await bridge.writeFile(dbFile, JSON.stringify(store));
      } catch {}
    }
    loaded = true;
  };

  const saveStore = async () => {
    await bridge.writeFile(dbFile, JSON.stringify(store));
  };

  return {
    configure: async (options = {}) => {
      dbFile = safeGroupFile(options.group);
      loaded = false;
      await loadStore();
    },
    get: async (options = {}) => {
      await loadStore();
      const value = Object.prototype.hasOwnProperty.call(store, options.key) ? store[options.key] : null;
      return { value };
    },
    set: async (options = {}) => {
      await loadStore();
      store[options.key] = options.value;
      await saveStore();
    },
    remove: async (options = {}) => {
      await loadStore();
      delete store[options.key];
      await saveStore();
    },
    clear: async () => {
      store = {};
      loaded = true;
      await saveStore();
    },
    keys: async () => {
      await loadStore();
      return { keys: Object.keys(store) };
    },
    migrate: async () => {
      await loadStore();
      return { migrated: [], existing: Object.keys(store) };
    },
    removeOld: async () => {
      await loadStore();
      for (const key of Object.keys(store)) {
        if (key.startsWith("_cap_")) {
          delete store[key];
        }
      }
      await saveStore();
    },
  };
}

function createPushNotificationsPlugin(bridge) {
  const listeners = createListenerManager(bridge, "PushNotifications", {
    registration: "pushRegistration",
    registrationError: "pushRegistrationError",
    pushNotificationReceived: "pushNotificationReceived",
    pushNotificationActionPerformed: "pushNotificationActionPerformed",
  });

  return {
    register: () => callNative("PushNotifications", "register", () => bridge.registerPushNotifications()),
    unregister: () => callNative("PushNotifications", "unregister", () => bridge.unregisterPushNotifications()),
    getDeliveredNotifications: () => callNative(
      "PushNotifications",
      "getDeliveredNotifications",
      () => bridge.getDeliveredNotifications(),
    ),
    removeDeliveredNotifications: (options = {}) => callNative(
      "PushNotifications",
      "removeDeliveredNotifications",
      () => bridge.removeDeliveredNotifications(options),
    ),
    removeAllDeliveredNotifications: () => callNative(
      "PushNotifications",
      "removeAllDeliveredNotifications",
      () => bridge.removeAllDeliveredNotifications(),
    ),
    createChannel: (channel = {}) => callNative("PushNotifications", "createChannel", () => bridge.createNotificationChannel(channel)),
    deleteChannel: (options = {}) => callNative("PushNotifications", "deleteChannel", () => bridge.deleteNotificationChannel(options)),
    listChannels: () => callNative("PushNotifications", "listChannels", () => bridge.listNotificationChannels()),
    checkPermissions: () => callNative("PushNotifications", "checkPermissions", () => bridge.checkNotificationPermissions()),
    requestPermissions: () => callNative("PushNotifications", "requestPermissions", () => bridge.requestNotificationPermissions()),
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createScreenOrientationPlugin(bridge) {
  const listeners = createListenerManager(bridge, "ScreenOrientation", {
    screenOrientationChange: "screenOrientationChange",
  });

  if (typeof window !== "undefined" && window.screen && window.screen.orientation) {
    window.screen.orientation.addEventListener("change", () => {
      bridge.emit("screenOrientationChange", {
        type: window.screen.orientation.type,
      });
    });
  }

  return {
    orientation: async () => {
      try {
        return await bridge.getScreenOrientation();
      } catch {
        return {
          type: typeof screen !== "undefined" && screen.orientation ? screen.orientation.type : "landscape-primary",
        };
      }
    },
    lock: async (options = {}) => {
      try {
        await bridge.lockScreenOrientation(options);
        return;
      } catch (error) {
        if (typeof screen !== "undefined" && screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock(options.orientation || options.type);
          return;
        }
        throw normalizeNativeError(error, "ScreenOrientation", "lock");
      }
    },
    unlock: async () => {
      try {
        await bridge.unlockScreenOrientation();
        return;
      } catch (error) {
        if (typeof screen !== "undefined" && screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
          return;
        }
        throw normalizeNativeError(error, "ScreenOrientation", "unlock");
      }
    },
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createScreenReaderPlugin(bridge) {
  const listeners = createListenerManager(bridge, "ScreenReader", {
    stateChange: "screenReaderStateChange",
  });

  return {
    isEnabled: () => callNative("ScreenReader", "isEnabled", () => bridge.isScreenReaderEnabled()),
    speak: (options = {}) => callNative("ScreenReader", "speak", () => bridge.speak(options)),
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createSharePlugin(bridge) {
  return {
    canShare: async (options = {}) => {
      try {
        return await bridge.canShare(options);
      } catch {
        return { value: !!(typeof navigator !== "undefined" && navigator.share) };
      }
    },
    share: async (options = {}) => {
      try {
        return await bridge.share(options);
      } catch (error) {
        if (typeof navigator !== "undefined" && navigator.share) {
          await navigator.share({
            title: options.title,
            text: options.text,
            url: options.url,
          });
          return { activityType: "" };
        }
        throw normalizeNativeError(error, "Share", "share");
      }
    },
  };
}

function createSplashScreenPlugin(bridge) {
  return {
    show: async (options = {}) => {
      try {
        await bridge.showSplashScreen(options);
      } catch {}
    },
    hide: async (options = {}) => {
      try {
        await bridge.hideSplashScreen(options);
      } catch {}
    },
  };
}

function createStatusBarPlugin() {
  return {
    Style: StatusBarStyle,
    Animation: StatusBarAnimation,
    setStyle: unsupported("StatusBar", "setStyle", "desktop UWP and Xbox do not expose a Capacitor status bar"),
    setBackgroundColor: unsupported("StatusBar", "setBackgroundColor", "desktop UWP and Xbox do not expose a Capacitor status bar"),
    show: unsupported("StatusBar", "show", "desktop UWP and Xbox do not expose a Capacitor status bar"),
    hide: unsupported("StatusBar", "hide", "desktop UWP and Xbox do not expose a Capacitor status bar"),
    getInfo: unsupported("StatusBar", "getInfo", "desktop UWP and Xbox do not expose a Capacitor status bar"),
    setOverlaysWebView: unsupported("StatusBar", "setOverlaysWebView", "desktop UWP and Xbox do not expose a Capacitor status bar"),
    addListener: unsupported("StatusBar", "addListener", "desktop UWP and Xbox do not expose a Capacitor status bar"),
    removeListener: async () => {},
    removeAllListeners: async () => {},
  };
}

function createTextZoomPlugin() {
  let zoom = 1;
  const preferred = 1;

  return {
    get: async () => ({ value: zoom }),
    getPreferred: async () => ({ value: preferred }),
    set: async (options = {}) => {
      zoom = Number(options.value || 1);
      if (typeof document !== "undefined") {
        document.documentElement.style.fontSize = `${zoom * 100}%`;
      }
    },
  };
}

function createToastPlugin(bridge) {
  return {
    show: async (options = {}) => {
      try {
        await bridge.showToast(options);
      } catch (error) {
        if (/not found|MissingMethod|not implemented/i.test(String(error && error.message))) {
          await bridge.showNotification({
            Id: `toast-${Date.now()}`,
            Title: options.title || "",
            Message: options.text || "",
          });
          return;
        }
        throw normalizeNativeError(error, "Toast", "show");
      }
    },
  };
}

function createCameraPlugin(bridge) {
  const permissions = ["camera", "photos"];

  const take = (options = {}) => callNative("Camera", "takePhoto", () => bridge.takePhoto(options));
  const choose = (options = {}) => callNative("Camera", "chooseFromGallery", () => bridge.chooseMediaFromGallery(options));

  return {
    CameraSource,
    CameraDirection,
    CameraResultType,
    MediaType,
    takePhoto: take,
    recordVideo: (options = {}) => callNative("Camera", "recordVideo", () => bridge.recordVideo(options)),
    playVideo: (options = {}) => callNative("Camera", "playVideo", () => bridge.playVideo(options)),
    chooseFromGallery: choose,
    editPhoto: unsupported("Camera", "editPhoto", "UWP has no built-in Capacitor-compatible photo editor"),
    editURIPhoto: unsupported("Camera", "editURIPhoto", "UWP has no built-in Capacitor-compatible photo editor"),
    pickLimitedLibraryPhotos: async () => ({ photos: [] }),
    getLimitedLibraryPhotos: async () => ({ photos: [] }),
    checkPermissions: async (options = {}) => {
      try {
        return await bridge.checkCameraPermissions(options);
      } catch {
        return toDeniedPermissions(permissions);
      }
    },
    requestPermissions: (options = {}) => callNative("Camera", "requestPermissions", () => bridge.requestCameraPermissions(options)),
    getPhoto: async (options = {}) => {
      if (String(options.source || "").toUpperCase() === CameraSource.Photos) {
        const result = await choose(options);
        return result.photos && result.photos[0] ? result.photos[0] : result;
      }
      return take(options);
    },
    pickImages: async (options = {}) => {
      const result = await choose({ ...options, mediaType: MediaType.Photos });
      return result.photos ? result : { photos: result.items || [] };
    },
  };
}

function createFilesystemPlugin(bridge) {
  const listeners = createListenerManager(bridge, "Filesystem", {
    progress: "filesystemProgress",
  });

  return {
    Directory: FilesystemDirectory,
    Encoding: FilesystemEncoding,
    checkPermissions: async () => ({ publicStorage: "granted" }),
    requestPermissions: async () => ({ publicStorage: "granted" }),
    readFile: async (options = {}) => {
      try {
        return await bridge.filesystemReadFile(options);
      } catch (error) {
        try {
          return {
            data: await bridge.readFile(options.path, getFilesystemEncoding(options) === "base64" ? "base64" : null),
          };
        } catch {
          throw normalizeNativeError(error, "Filesystem", "readFile");
        }
      }
    },
    readFileInChunks: async (options = {}, callback) => {
      if (typeof callback !== "function") {
        throw createCapacitorError("Filesystem.readFileInChunks() requires a callback", CAP_ERROR.Unimplemented);
      }
      const callbackId = `filesystem-read-${Date.now()}`;
      const result = await callNative("Filesystem", "readFileInChunks", () => bridge.filesystemReadFileInChunks(options));
      const chunks = Array.isArray(result && result.chunks) ? result.chunks : [];
      for (const chunk of chunks) {
        callback(chunk);
      }
      callback({ data: "" });
      return callbackId;
    },
    writeFile: async (options = {}) => {
      try {
        return await bridge.filesystemWriteFile(options);
      } catch (error) {
        try {
          const uri = await bridge.writeFile(options.path, options.data || "");
          return { uri };
        } catch {
          throw normalizeNativeError(error, "Filesystem", "writeFile");
        }
      }
    },
    appendFile: (options = {}) => callNative("Filesystem", "appendFile", () => bridge.filesystemAppendFile(options)),
    deleteFile: async (options = {}) => {
      try {
        await bridge.filesystemDeleteFile(options);
      } catch (error) {
        try {
          await bridge.deleteFile(options.path);
        } catch {
          throw normalizeNativeError(error, "Filesystem", "deleteFile");
        }
      }
    },
    mkdir: async (options = {}) => {
      try {
        await bridge.filesystemMkdir(options);
      } catch (error) {
        try {
          await bridge.createFolder(options.path);
        } catch {
          throw normalizeNativeError(error, "Filesystem", "mkdir");
        }
      }
    },
    rmdir: async (options = {}) => {
      try {
        await bridge.filesystemRmdir(options);
      } catch (error) {
        try {
          await bridge.deleteFolder(options.path);
        } catch {
          throw normalizeNativeError(error, "Filesystem", "rmdir");
        }
      }
    },
    readdir: async (options = {}) => {
      try {
        return await bridge.filesystemReaddir(options);
      } catch (error) {
        try {
          const items = options.path ? await bridge.readDir(options.path) : await bridge.readLocalDir();
          return {
            files: items.map((item) => typeof item === "string" ? { name: item, type: "file" } : {
              name: item.name,
              uri: item.path,
              type: item.isFolder ? "directory" : "file",
            }),
          };
        } catch {
          throw normalizeNativeError(error, "Filesystem", "readdir");
        }
      }
    },
    getUri: async (options = {}) => {
      try {
        return await bridge.filesystemGetUri(options);
      } catch {
        return { uri: options.path };
      }
    },
    stat: (options = {}) => callNative("Filesystem", "stat", () => bridge.filesystemStat(options)),
    rename: (options = {}) => callNative("Filesystem", "rename", () => bridge.filesystemRename(options)),
    copy: (options = {}) => callNative("Filesystem", "copy", () => bridge.filesystemCopy(options)),
    downloadFile: async (options = {}) => {
      try {
        return await bridge.fileTransferDownload(options);
      } catch {
        const url = options.url || options.source;
        const path = options.path || getFilenameFromPath(url);
        const result = await bridge.downloadFile(url, "url", path);
        return {
          path: result.path || result,
          blob: result.blob,
        };
      }
    },
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createFileTransferPlugin(bridge) {
  const listeners = createListenerManager(bridge, "FileTransfer", {
    progress: "fileTransferProgress",
  });

  return {
    downloadFile: async (options = {}) => {
      try {
        return await bridge.fileTransferDownload(options);
      } catch {
        const url = options.url || options.source;
        const path = options.path || getFilenameFromPath(url);
        const result = await bridge.downloadFile(url, "url", path);
        return { path: result.path || result };
      }
    },
    uploadFile: (options = {}) => callNative("FileTransfer", "uploadFile", () => bridge.fileTransferUpload(options)),
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createFileViewerPlugin(bridge) {
  return {
    openDocumentFromLocalPath: (options = {}) => callNative(
      "FileViewer",
      "openDocumentFromLocalPath",
      () => bridge.openDocumentFromLocalPath(options),
    ),
    openDocumentFromResources: (options = {}) => callNative(
      "FileViewer",
      "openDocumentFromResources",
      () => bridge.openDocumentFromResources(options),
    ),
    openDocumentFromUrl: async (options = {}) => {
      try {
        await bridge.openDocumentFromUrl(options);
      } catch (error) {
        if (options.url) {
          await bridge.openUrl(options.url);
          return;
        }
        throw normalizeNativeError(error, "FileViewer", "openDocumentFromUrl");
      }
    },
    previewMediaContentFromLocalPath: (options = {}) => callNative(
      "FileViewer",
      "previewMediaContentFromLocalPath",
      () => bridge.openDocumentFromLocalPath(options),
    ),
    previewMediaContentFromResources: (options = {}) => callNative(
      "FileViewer",
      "previewMediaContentFromResources",
      () => bridge.openDocumentFromResources(options),
    ),
    previewMediaContentFromUrl: async (options = {}) => {
      if (options.url) {
        await bridge.openUrl(options.url);
        return;
      }
      unavailable("FileViewer", "previewMediaContentFromUrl", "url is required");
    },
  };
}

function createGeolocationPlugin(bridge) {
  const watches = new Map();

  return {
    getCurrentPosition: (options = {}) => callNative("Geolocation", "getCurrentPosition", () => bridge.getCurrentPosition(options)),
    watchPosition: async (options = {}, callback) => {
      if (typeof callback !== "function") {
        throw createCapacitorError("Geolocation.watchPosition() requires a callback", CAP_ERROR.Unimplemented);
      }
      const watch = await callNative("Geolocation", "watchPosition", () => bridge.watchPosition(options));
      const id = String(watch && (watch.id || watch.callbackId || watch));
      const eventName = `geolocationWatch:${id}`;
      const handle = bridge.on(eventName, callback);
      watches.set(id, handle);
      return id;
    },
    clearWatch: async (options = {}) => {
      const id = String(options.id);
      const handle = watches.get(id);
      if (handle && handle.remove) {
        handle.remove();
      }
      watches.delete(id);
      await callNative("Geolocation", "clearWatch", () => bridge.clearPositionWatch(options));
    },
    checkPermissions: async (options = {}) => {
      try {
        return await bridge.checkGeolocationPermissions(options);
      } catch {
        return { location: "prompt", coarseLocation: "prompt" };
      }
    },
    requestPermissions: (options = {}) => callNative(
      "Geolocation",
      "requestPermissions",
      () => bridge.requestGeolocationPermissions(options),
    ),
  };
}

function createHapticsPlugin(bridge) {
  let selectionActive = false;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const pulse = async (durationMs, strength) => {
    const dur = Math.max(0, Math.round(Number(durationMs || 0)));
    const pow = Math.max(0.1, Math.min(1.0, Number(strength || 1)));
    await bridge.vibrateController(String(dur), String(pow));
  };

  return {
    ImpactStyle,
    NotificationType,
    impact: async (options = {}) => {
      const style = String(options.style || ImpactStyle.Heavy).toUpperCase();
      await pulse(300, style === ImpactStyle.Light ? 0.35 : style === ImpactStyle.Medium ? 0.6 : 1.0);
    },
    notification: async (options = {}) => {
      const type = String(options.type || NotificationType.Success).toUpperCase();
      if (type === NotificationType.Success) {
        await pulse(40, 0.7);
        await sleep(30);
        await pulse(40, 0.7);
      } else if (type === NotificationType.Warning) {
        for (let i = 0; i < 3; i += 1) {
          await pulse(30, 0.5);
          if (i < 2) {
            await sleep(30);
          }
        }
      } else {
        await pulse(60, 1.0);
        await sleep(40);
        await pulse(60, 1.0);
      }
    },
    vibrate: async (options = {}) => {
      await pulse(typeof options.duration === "number" ? options.duration : 300, 1.0);
    },
    selectionStart: async () => {
      selectionActive = true;
      await pulse(20, 0.3);
    },
    selectionChanged: async () => {
      if (selectionActive) {
        await pulse(18, 0.35);
      }
    },
    selectionEnd: async () => {
      if (selectionActive) {
        selectionActive = false;
        await pulse(22, 0.4);
      }
    },
  };
}

function createKeyboardPlugin(bridge) {
  const listeners = createListenerManager(bridge, "Keyboard", {
    keyboardWillShow: "keyboardWillShow",
    keyboardDidShow: "keyboardDidShow",
    keyboardWillHide: "keyboardWillHide",
    keyboardDidHide: "keyboardDidHide",
  });

  return {
    KeyboardStyle,
    KeyboardResize,
    show: () => callNative("Keyboard", "show", () => bridge.keyboardShow()),
    hide: () => callNative("Keyboard", "hide", () => bridge.keyboardHide()),
    setAccessoryBarVisible: unsupported("Keyboard", "setAccessoryBarVisible", "iOS accessory bar has no UWP equivalent"),
    setScroll: unsupported("Keyboard", "setScroll", "iOS scroll control has no UWP equivalent"),
    setStyle: (options = {}) => callNative("Keyboard", "setStyle", () => bridge.keyboardSetStyle(options)),
    setResizeMode: (options = {}) => callNative("Keyboard", "setResizeMode", () => bridge.keyboardSetResizeMode(options)),
    getResizeMode: async () => {
      try {
        return await bridge.keyboardGetResizeMode();
      } catch {
        return { mode: KeyboardResize.Native };
      }
    },
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeAllListeners: listeners.removeAllListeners,
  };
}

function createBarcodeScannerPlugin(bridge) {
  return {
    CapacitorBarcodeScannerCameraDirection: BarcodeCameraDirection,
    CapacitorBarcodeScannerScanOrientation: BarcodeScanOrientation,
    scanBarcode: (options = {}) => callNative("CapacitorBarcodeScanner", "scanBarcode", () => bridge.scanBarcode(options)),
  };
}

function createSecureStoragePlugin(bridge) {
  return {
    set: (options = {}) => callNative("SecureStorage", "set", () => bridge.secureSet(options)),
    get: (options = {}) => callNative("SecureStorage", "get", () => bridge.secureGet(options)),
    remove: (options = {}) => callNative("SecureStorage", "remove", () => bridge.secureRemove(options)),
    clear: (options = {}) => callNative("SecureStorage", "clear", () => bridge.secureClear(options)),
    keys: (options = {}) => callNative("SecureStorage", "keys", () => bridge.secureKeys(options)),
  };
}

function createUserVerificationPlugin(bridge) {
  return {
    isAvailable: () => callNative(
      "UserVerification",
      "isAvailable",
      () => bridge.checkUserVerificationAvailability(),
    ),
    verify: (options = {}) => callNative(
      "UserVerification",
      "verify",
      () => bridge.requestUserVerification(options),
    ),
  };
}

function createBackgroundRunnerBridgeScript() {
  return `
(() => {
  const storage = window.UwpScriptStorage || {};
  const device = window.UwpScriptDevice || {};
  const notifications = window.UwpScriptNotifications || {};
  window.CapacitorKV = {
    set: async (key, value) => storage.set && storage.set(key, value),
    get: async (key) => storage.get ? storage.get(key) : ({ value: null }),
    remove: async (key) => storage.remove && storage.remove(key),
  };
  window.CapacitorDevice = {
    getNetworkStatus: async () => device.getNetworkStatus ? device.getNetworkStatus() : ({ connected: navigator.onLine, connectionType: navigator.onLine ? 'unknown' : 'none' }),
    getBatteryStatus: async () => device.getBatteryStatus ? device.getBatteryStatus() : ({ batteryLevel: null, isCharging: false }),
  };
  window.CapacitorNotifications = {
    schedule: async (options) => notifications.schedule && notifications.schedule(options && options.notifications ? options.notifications : options),
    setBadge: async (options) => notifications.setBadge && notifications.setBadge(options),
    clearBadge: async () => notifications.clearBadge && notifications.clearBadge(),
  };
})();
`;
}

function createBackgroundRunnerPlugin(bridge) {
  const listeners = createListenerManager(bridge, "CapacitorBackgroundRunner", {
    backgroundRunnerNotificationReceived: "backgroundRunnerNotificationReceived",
  });
  const config = getCapacitorPluginConfig("BackgroundRunner");
  const configureRunner = bridge.configureBackgroundScriptRunner || bridge.configureBackgroundRunner;
  const checkRunnerPermissions = bridge.checkBackgroundScriptPermissions || bridge.checkBackgroundRunnerPermissions;
  const requestRunnerPermissions = bridge.requestBackgroundScriptPermissions || bridge.requestBackgroundRunnerPermissions;
  const dispatchRunnerEvent = bridge.dispatchBackgroundScriptEvent || bridge.dispatchBackgroundRunnerEvent;

  if (config && config.autoStart !== false && (config.label || config.event || config.src) && configureRunner) {
    Promise.resolve(configureRunner.call(bridge, config)).catch((error) => {
      console.warn("CapacitorBackgroundRunner: autoStart registration failed", error);
    });
  }

  return {
    checkPermissions: () => callNative(
      "CapacitorBackgroundRunner",
      "checkPermissions",
      () => checkRunnerPermissions.call(bridge),
    ),
    requestPermissions: (options = {}) => callNative(
      "CapacitorBackgroundRunner",
      "requestPermissions",
      () => requestRunnerPermissions.call(bridge, options),
    ),
    dispatchEvent: (options = {}) => callNative(
      "CapacitorBackgroundRunner",
      "dispatchEvent",
      () => dispatchRunnerEvent.call(bridge, {
        ...config,
        ...options,
        bootstrap: createBackgroundRunnerBridgeScript(),
      }),
    ),
    addListener: listeners.addListener,
    removeListener: listeners.removeListener,
    removeNotificationListeners: listeners.removeAllListeners,
  };
}

const LEAFLET_CSS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
let leafletLoadPromise;

function loadStylesheetOnce(href) {
  const win = getWindow();
  const doc = win.document;
  if (!doc || doc.querySelector(`link[href="${href}"]`)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = resolve;
    link.onerror = () => reject(createCapacitorError(`Failed to load ${href}`, CAP_ERROR.Unavailable));
    doc.head.appendChild(link);
  });
}

function loadScriptOnce(src) {
  const win = getWindow();
  const doc = win.document;
  if (!doc || doc.querySelector(`script[src="${src}"]`)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = doc.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(createCapacitorError(`Failed to load ${src}`, CAP_ERROR.Unavailable));
    doc.head.appendChild(script);
  });
}

async function ensureLeaflet() {
  const win = getWindow();
  if (win.L && typeof win.L.map === "function") {
    return win.L;
  }
  if (!leafletLoadPromise) {
    leafletLoadPromise = Promise.all([
      loadStylesheetOnce(LEAFLET_CSS_URL),
      loadScriptOnce(LEAFLET_JS_URL),
    ]).then(() => {
      if (!win.L || typeof win.L.map !== "function") {
        unavailable("CapacitorGoogleMaps", "create", "Leaflet failed to initialize");
      }
      return win.L;
    });
  }
  return leafletLoadPromise;
}

function normalizeMapId(options = {}) {
  return String(options.id || options.mapId || (options.element && options.element.id) || "default");
}

function normalizeLatLng(value, fallback = { lat: 0, lng: 0 }) {
  if (!value) return fallback;
  if (Array.isArray(value)) {
    return { lat: Number(value[0] ?? fallback.lat), lng: Number(value[1] ?? fallback.lng) };
  }
  return {
    lat: Number(value.lat ?? value.latitude ?? fallback.lat),
    lng: Number(value.lng ?? value.longitude ?? fallback.lng),
  };
}

function normalizeBounds(bounds) {
  if (!bounds) {
    return null;
  }
  if (Array.isArray(bounds)) {
    return bounds.map((point) => normalizeLatLng(point));
  }
  const southWest = bounds.southwest || bounds.southWest || bounds.sw;
  const northEast = bounds.northeast || bounds.northEast || bounds.ne;
  if (southWest && northEast) {
    return [normalizeLatLng(southWest), normalizeLatLng(northEast)];
  }
  return null;
}

function createGoogleMapsPlugin() {
  const maps = new Map();
  const listeners = new Map();
  let nextListenerId = 1;

  const emit = (eventName, data) => {
    for (const record of listeners.values()) {
      if (record.eventName === eventName || record.eventName === "*") {
        record.callback(data);
      }
    }
  };

  const getRecord = (options = {}) => {
    const id = normalizeMapId(options);
    const record = maps.get(id);
    if (!record) {
      unavailable("CapacitorGoogleMaps", "map", `map '${id}' has not been created`);
    }
    return record;
  };

  const createOverlayElement = (id) => {
    const win = getWindow();
    const doc = win.document;
    if (!doc) {
      unavailable("CapacitorGoogleMaps", "create", "document is not available");
    }

    const shell = doc.createElement("div");
    shell.className = "capacitor-uwp-leaflet-popup";
    shell.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:2147483000",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "background:rgba(0,0,0,.28)",
    ].join(";");

    const panel = doc.createElement("div");
    panel.style.cssText = [
      "width:min(640px,calc(100vw - 32px))",
      "height:min(640px,calc(100vh - 32px))",
      "background:#fff",
      "box-shadow:0 16px 48px rgba(0,0,0,.35)",
    ].join(";");

    const mapEl = doc.createElement("div");
    mapEl.id = `capacitor-google-map-${id}`;
    mapEl.style.cssText = "width:100%;height:100%;";
    panel.appendChild(mapEl);
    shell.appendChild(panel);
    doc.body.appendChild(shell);
    return { element: mapEl, shell };
  };

  const resolveElement = (options = {}) => {
    const win = getWindow();
    const doc = win.document;
    if (options.element && typeof options.element === "object" && options.element.nodeType === 1) {
      return { element: options.element, shell: null };
    }
    if (typeof options.element === "string" && doc) {
      const element = doc.querySelector(options.element) || doc.getElementById(options.element.replace(/^#/, ""));
      if (element) {
        return { element, shell: null };
      }
    }
    return createOverlayElement(normalizeMapId(options));
  };

  return {
    async create(options = {}) {
      const L = await ensureLeaflet();
      const id = normalizeMapId(options);
      if (maps.has(id)) {
        await this.destroy({ id });
      }

      const config = options.config || options;
      const { element, shell } = resolveElement(options);
      const center = normalizeLatLng(config.center || config.coordinate, { lat: 0, lng: 0 });
      const zoom = Number(config.zoom ?? 12);
      const map = L.map(element, {
        zoomControl: config.zoomControl !== false,
        attributionControl: config.attributionControl !== false,
        dragging: config.touchEnabled !== false,
      }).setView([center.lat, center.lng], zoom);

      L.tileLayer(config.tileUrl || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: Number(config.maxZoom ?? 19),
        attribution: config.attribution || "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const record = {
        id,
        element,
        shell,
        map,
        mapType: config.mapType || "normal",
        markers: new Map(),
        shapes: new Map(),
        tileOverlays: new Map(),
        currentLocationMarker: null,
      };
      maps.set(id, record);
      setTimeout(() => map.invalidateSize(), 0);
      emit("mapReady", { mapId: id });
      return { mapId: id };
    },

    async destroy(options = {}) {
      const record = getRecord(options);
      record.map.remove();
      if (record.shell && record.shell.parentNode) {
        record.shell.parentNode.removeChild(record.shell);
      }
      maps.delete(record.id);
      return { mapId: record.id };
    },

    async enableTouch(options = {}) {
      const { map } = getRecord(options);
      map.dragging.enable();
      map.touchZoom.enable();
      map.scrollWheelZoom.enable();
    },

    async disableTouch(options = {}) {
      const { map } = getRecord(options);
      map.dragging.disable();
      map.touchZoom.disable();
      map.scrollWheelZoom.disable();
    },

    async enableClustering() {
      return { enabled: false, reason: "Leaflet marker clustering is not bundled by default." };
    },

    async disableClustering() {
      return { enabled: false };
    },

    async enableCurrentLocation(options = {}) {
      const record = getRecord(options);
      const enabled = options.enabled !== false;
      if (!enabled) {
        if (record.currentLocationMarker) {
          record.currentLocationMarker.remove();
          record.currentLocationMarker = null;
        }
        return { enabled: false };
      }

      if (typeof navigator === "undefined" || !navigator.geolocation) {
        return { enabled: false, reason: "Geolocation is not available in this WebView." };
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: !!options.enableHighAccuracy,
          timeout: options.timeout || 10000,
        });
      });
      const coordinate = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const L = await ensureLeaflet();
      if (record.currentLocationMarker) {
        record.currentLocationMarker.setLatLng([coordinate.lat, coordinate.lng]);
      } else {
        record.currentLocationMarker = L.circleMarker([coordinate.lat, coordinate.lng], {
          radius: 7,
          color: "#2563eb",
          fillColor: "#2563eb",
          fillOpacity: 0.8,
        }).addTo(record.map);
      }
      return { enabled: true, coordinate };
    },

    async enableIndoorMaps(options = {}) {
      return { enabled: !!options.enabled, reason: "Leaflet/OpenStreetMap has no native indoor-map layer equivalent." };
    },

    async enableTrafficLayer(options = {}) {
      return { enabled: !!options.enabled, reason: "Leaflet/OpenStreetMap has no native traffic-layer equivalent." };
    },

    async enableAccessibilityElements(options = {}) {
      return { enabled: options.enabled !== false };
    },

    async setPadding(options = {}) {
      const record = getRecord(options);
      record.padding = {
        top: Number(options.top ?? 0),
        left: Number(options.left ?? 0),
        right: Number(options.right ?? 0),
        bottom: Number(options.bottom ?? 0),
      };
      record.map.invalidateSize();
    },

    async setMapType(options = {}) {
      const record = getRecord(options);
      record.mapType = options.mapType || options.type || "normal";
    },

    async getMapType(options = {}) {
      return { mapType: getRecord(options).mapType };
    },

    async setCamera(options = {}) {
      const { map } = getRecord(options);
      const coordinate = normalizeLatLng(options.coordinate || options.center || options.target, null);
      const zoom = options.zoom == null ? map.getZoom() : Number(options.zoom);
      if (coordinate) {
        const method = options.animate === false ? "setView" : "flyTo";
        map[method]([coordinate.lat, coordinate.lng], zoom);
      } else {
        map.setZoom(zoom);
      }
    },

    async getMapBounds(options = {}) {
      const bounds = getRecord(options).map.getBounds();
      return {
        southwest: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
        northeast: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
      };
    },

    async fitBounds(options = {}) {
      const bounds = normalizeBounds(options.bounds || options);
      if (!bounds) {
        unavailable("CapacitorGoogleMaps", "fitBounds", "bounds are required");
      }
      getRecord(options).map.fitBounds(bounds.map((point) => [point.lat, point.lng]), {
        padding: [Number(options.padding ?? 0), Number(options.padding ?? 0)],
      });
    },

    async mapBoundsContains(options = {}) {
      const record = getRecord(options);
      const point = normalizeLatLng(options.point || options.coordinate);
      return { contains: record.map.getBounds().contains([point.lat, point.lng]) };
    },

    async mapBoundsExtend(options = {}) {
      const record = getRecord(options);
      const point = normalizeLatLng(options.point || options.coordinate);
      const bounds = record.map.getBounds().extend([point.lat, point.lng]);
      return {
        southwest: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
        northeast: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
      };
    },

    async addMarker(options = {}) {
      const record = getRecord(options);
      const L = await ensureLeaflet();
      const markerOptions = options.marker || options;
      const id = String(markerOptions.id || markerOptions.markerId || `marker-${Date.now()}-${record.markers.size}`);
      const coordinate = normalizeLatLng(markerOptions.coordinate || markerOptions.position);
      const marker = L.marker([coordinate.lat, coordinate.lng], {
        title: markerOptions.title || "",
        draggable: !!markerOptions.draggable,
      }).addTo(record.map);
      const text = markerOptions.snippet || markerOptions.description || markerOptions.title;
      if (text) {
        marker.bindPopup(text);
      }
      marker.on("click", () => emit("markerClick", { mapId: record.id, markerId: id }));
      record.markers.set(id, marker);
      return { id, markerId: id };
    },

    async addMarkers(options = {}) {
      const markers = options.markers || [];
      const ids = [];
      for (const marker of markers) {
        const result = await this.addMarker({ ...options, marker });
        ids.push(result.id);
      }
      return { ids };
    },

    async removeMarker(options = {}) {
      const record = getRecord(options);
      const id = String(options.id || options.markerId);
      const marker = record.markers.get(id);
      if (marker) {
        marker.remove();
        record.markers.delete(id);
      }
    },

    async removeMarkers(options = {}) {
      for (const id of options.ids || options.markerIds || []) {
        await this.removeMarker({ ...options, id });
      }
    },

    async addPolygons(options = {}) {
      const record = getRecord(options);
      const L = await ensureLeaflet();
      const ids = [];
      for (const polygon of options.polygons || []) {
        const id = String(polygon.id || `polygon-${Date.now()}-${record.shapes.size}`);
        const paths = (polygon.paths || polygon.points || []).map((point) => {
          const coordinate = normalizeLatLng(point);
          return [coordinate.lat, coordinate.lng];
        });
        const layer = L.polygon(paths, polygon).addTo(record.map);
        record.shapes.set(id, layer);
        ids.push(id);
      }
      return { ids };
    },

    async removePolygons(options = {}) {
      const record = getRecord(options);
      for (const id of options.ids || options.polygonIds || []) {
        const layer = record.shapes.get(String(id));
        if (layer) {
          layer.remove();
          record.shapes.delete(String(id));
        }
      }
    },

    async addPolylines(options = {}) {
      const record = getRecord(options);
      const L = await ensureLeaflet();
      const ids = [];
      for (const polyline of options.polylines || []) {
        const id = String(polyline.id || `polyline-${Date.now()}-${record.shapes.size}`);
        const path = (polyline.path || polyline.points || []).map((point) => {
          const coordinate = normalizeLatLng(point);
          return [coordinate.lat, coordinate.lng];
        });
        const layer = L.polyline(path, polyline).addTo(record.map);
        record.shapes.set(id, layer);
        ids.push(id);
      }
      return { ids };
    },

    async removePolylines(options = {}) {
      return this.removePolygons({ ...options, polygonIds: options.ids || options.polylineIds });
    },

    async addCircles(options = {}) {
      const record = getRecord(options);
      const L = await ensureLeaflet();
      const ids = [];
      for (const circle of options.circles || []) {
        const id = String(circle.id || `circle-${Date.now()}-${record.shapes.size}`);
        const center = normalizeLatLng(circle.center || circle.coordinate);
        const layer = L.circle([center.lat, center.lng], {
          ...circle,
          radius: Number(circle.radius ?? 100),
        }).addTo(record.map);
        record.shapes.set(id, layer);
        ids.push(id);
      }
      return { ids };
    },

    async removeCircles(options = {}) {
      return this.removePolygons({ ...options, polygonIds: options.ids || options.circleIds });
    },

    async addTileOverlay(options = {}) {
      const record = getRecord(options);
      const L = await ensureLeaflet();
      const id = String(options.id || options.tileOverlayId || `tile-${Date.now()}-${record.tileOverlays.size}`);
      const url = options.url || options.urlTemplate;
      if (!url) {
        unavailable("CapacitorGoogleMaps", "addTileOverlay", "url or urlTemplate is required");
      }
      const layer = L.tileLayer(url, options).addTo(record.map);
      record.tileOverlays.set(id, layer);
      return { id };
    },

    async removeTileOverlay(options = {}) {
      const record = getRecord(options);
      const id = String(options.id || options.tileOverlayId);
      const layer = record.tileOverlays.get(id);
      if (layer) {
        layer.remove();
        record.tileOverlays.delete(id);
      }
    },

    async onResize(options = {}) {
      getRecord(options).map.invalidateSize();
    },

    async onScroll(options = {}) {
      getRecord(options).map.invalidateSize();
    },

    async onDisplay(options = {}) {
      const record = getRecord(options);
      if (record.shell) {
        record.shell.style.display = "flex";
      }
      record.map.invalidateSize();
    },

    async dispatchMapEvent(options = {}) {
      emit(options.eventName || options.event || "mapEvent", {
        mapId: normalizeMapId(options),
        ...(options.data || options.details || {}),
      });
    },

    async addListener(eventName, callback) {
      if (typeof callback !== "function") {
        throw createCapacitorError("CapacitorGoogleMaps.addListener() requires a callback", CAP_ERROR.Unimplemented);
      }
      const id = `CapacitorGoogleMaps:${nextListenerId++}`;
      listeners.set(id, { eventName, callback });
      return {
        _callbackId: id,
        remove: async () => {
          listeners.delete(id);
        },
      };
    },

    async removeListener(options = {}) {
      listeners.delete(options.callbackId);
    },

    async removeAllListeners() {
      listeners.clear();
    },
  };
}

function createWatchPlugin() {
  return {
    addListener: unsupported("Watch", "addListener", "Capacitor Watch targets watchOS and has no UWP/Xbox equivalent"),
    removeListener: async () => {},
    removeAllListeners: async () => {},
    updateWatchUI: unsupported("Watch", "updateWatchUI", "Capacitor Watch targets watchOS and has no UWP/Xbox equivalent"),
    updateWatchData: unsupported("Watch", "updateWatchData", "Capacitor Watch targets watchOS and has no UWP/Xbox equivalent"),
  };
}

function buildPlugins(bridge, platform) {
  const backgroundRunner = createBackgroundRunnerPlugin(bridge);
  const googleMaps = createGoogleMapsPlugin();

  return {
    ActionSheet: createActionSheetPlugin(bridge),
    App: createAppPlugin(bridge, platform),
    AppLauncher: createAppLauncherPlugin(bridge),
    Browser: createBrowserPlugin(bridge),
    Clipboard: createClipboardPlugin(bridge),
    Device: createDevicePlugin(bridge),
    Dialog: createDialogPlugin(bridge),
    LocalNotifications: createLocalNotificationsPlugin(bridge),
    Motion: createMotionPlugin(bridge),
    Network: createNetworkPlugin(bridge),
    Preferences: createPreferencesPlugin(bridge),
    PushNotifications: createPushNotificationsPlugin(bridge),
    ScreenOrientation: createScreenOrientationPlugin(bridge),
    ScreenReader: createScreenReaderPlugin(bridge),
    Share: createSharePlugin(bridge),
    SplashScreen: createSplashScreenPlugin(bridge),
    StatusBar: createStatusBarPlugin(bridge),
    TextZoom: createTextZoomPlugin(bridge),
    Toast: createToastPlugin(bridge),
    Camera: createCameraPlugin(bridge),
    Filesystem: createFilesystemPlugin(bridge),
    FileTransfer: createFileTransferPlugin(bridge),
    FileViewer: createFileViewerPlugin(bridge),
    Geolocation: createGeolocationPlugin(bridge),
    Haptics: createHapticsPlugin(bridge),
    Keyboard: createKeyboardPlugin(bridge),
    CapacitorBarcodeScanner: createBarcodeScannerPlugin(bridge),
    CapacitorBackgroundRunner: backgroundRunner,
    BackgroundRunner: backgroundRunner,
    CapacitorGoogleMaps: googleMaps,
    GoogleMaps: googleMaps,
    Watch: createWatchPlugin(),
  };
}

const CapacitorUWP = {
  init: async function init(bridge) {
    const win = getWindow();
    let platform = "windows";

    if (!bridge) {
      bridge = win.__uwpBridge || (win.chrome && win.chrome.webview ? new UwpBridge() : null);
    }
    if (!bridge) {
      unavailable("CapacitorUWP", "init", "UwpBridge is required outside the UWP WebView host");
    }
    if (win.CapacitorUWP && win.CapacitorUWP.initialized && win.CapacitorUWP.bridge === bridge) {
      return win.Capacitor;
    }
    win.__uwpBridge = bridge;

    try {
      platform = await bridge.getPlatform();
    } catch {}

    const cap = installCapacitorRuntime(bridge, platform);
    await hydrateCapacitorConfig(cap);
    const plugins = buildPlugins(bridge, platform);
    for (const [name, plugin] of Object.entries(plugins)) {
      registerPluginObject(cap, name, plugin);
    }

    win.alert = function alertShim(message) {
      bridge.showAlert("Alert", String(message));
    };

    const existingApi = win.CapacitorUWP || {};
    win.CapacitorUWP = {
      ...existingApi,
      init: CapacitorUWP.init.bind(CapacitorUWP),
      autoInit: CapacitorUWP.autoInit,
      bridge,
      initialized: true,
      ready: Promise.resolve(cap),
      SecureStorage: createSecureStoragePlugin(bridge),
      UserVerification: createUserVerificationPlugin(bridge),
    };

    cap.SecureStorage = win.CapacitorUWP.SecureStorage;
    cap.UserVerification = win.CapacitorUWP.UserVerification;
    cap.Plugins.SecureStorage = win.CapacitorUWP.SecureStorage;
    cap.Plugins.UserVerification = win.CapacitorUWP.UserVerification;
    cap._uwpPluginImplementations.SecureStorage = win.CapacitorUWP.SecureStorage;
    cap._uwpPluginImplementations.UserVerification = win.CapacitorUWP.UserVerification;

    return cap;
  },
};

function autoInstallCapacitorRuntime() {
  const win = getWindow();
  const existingApi = win.CapacitorUWP || {};
  if (existingApi.ready) {
    return existingApi.ready;
  }
  if (!win.chrome || !win.chrome.webview) {
    win.CapacitorUWP = {
      ...existingApi,
      init: CapacitorUWP.init.bind(CapacitorUWP),
      autoInit: autoInstallCapacitorRuntime,
    };
    return null;
  }

  const ready = CapacitorUWP.init(win.__uwpBridge || new UwpBridge()).catch((error) => {
    console.error("CapacitorUWP auto-init failed", error);
    throw error;
  });
  win.CapacitorUWP = {
    ...existingApi,
    init: CapacitorUWP.init.bind(CapacitorUWP),
    autoInit: autoInstallCapacitorRuntime,
    ready,
  };
  return ready;
}

CapacitorUWP.autoInit = autoInstallCapacitorRuntime;

bootstrapCapacitorHeaders();
autoInstallCapacitorRuntime();

export default CapacitorUWP;
