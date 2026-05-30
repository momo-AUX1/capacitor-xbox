class UwpBridge {
  constructor() {
    this.eventListeners = {};
    this.plugins = [];
    this._pending = new Map();
    this._nextId = 1;

    window.chrome.webview.addEventListener("message", (event) => {
      const raw = event.data;
      let payload;
      try {
        payload = JSON.parse(raw);
      } catch (e) {
        console.warn("UwpBridge: received non-JSON message", raw);
        return;
      }

      if (payload && payload.event) {
        this.emit(payload.event, payload.data);
        return;
      }

      if (payload && payload.id) {
        const entry = this._pending.get(payload.id);
        if (!entry) {
          return;
        }

        const { resolve, reject, timeout } = entry;
        clearTimeout(timeout);
        this._pending.delete(payload.id);

        if (payload.error) {
          reject(new Error(payload.error));
        } else {
          resolve(payload.result);
        }
      }
    });
  }

  async callNative(methodName, ...args) {
    const id = String(this._nextId++);
    const message = { id, method: methodName, args };

    const promise = new Promise((resolve, reject) => {
       const timeout = setTimeout(() => {
        this._pending.delete(id);
        reject(new Error(`RPC timeout for ${methodName} (id=${id})`));
      }, 30000);

      this._pending.set(id, { resolve, reject, timeout });
    });

    window.chrome.webview.postMessage(JSON.stringify(message));
    return promise;
  }

  registerPlugin(plugin) {
    this.plugins.push(plugin);
    if (plugin.init) {
      plugin.init(this);
    }
  }

  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
    return {
      remove: () => this.off(event, callback),
    };
  }

  off(event, callback) {
    if (!this.eventListeners[event]) {
      return;
    }

    this.eventListeners[event] = this.eventListeners[event].filter(
      (listener) => listener !== callback,
    );

    if (!this.eventListeners[event].length) {
      delete this.eventListeners[event];
    }
  }

  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach((callback) => callback(data));
    }
  }

  _handleStructuredResponse(result) {
    const response = JSON.parse(result);
    if (!response.completed) {
      throw new Error(response.error || 'Operation failed');
    }
    return response.data;
  }

  async _callStructured(methodName, ...args) {
    const result = await this.callNative(methodName, ...args);
    return this._handleStructuredResponse(result);
  }

  _json(value) {
    return value == null ? null : JSON.stringify(value);
  }

  async readFile(fileName, codec = null) {
    const result = await this.callNative("read", fileName, codec);
    return this._handleStructuredResponse(result);
  }

  async writeFile(fileName, data) {
    const result = await this.callNative("write", fileName, data);
    return this._handleStructuredResponse(result);
  }

  async readDir(folderPath) {
    const result = await this.callNative("readDir", folderPath);
    return this._handleStructuredResponse(result);
  }

  async readLocalDir() {
    const result = await this.callNative("readLocalDir");
    return this._handleStructuredResponse(result);
  }

  async showAlert(title, text) {
    const result = await this.callNative("showAlert", title, text);
    return this._handleStructuredResponse(result);
  }

  async showDialog(title, body, yesButtonText = "Yes", noButtonText = "No") {
    const result = await this.callNative(
      "showDialog",
      title,
      body,
      yesButtonText,
      noButtonText,
    );
    return this._handleStructuredResponse(result);
  }

  async downloadFile(fileUrlOrData, encoding = "url", name = null) {
    const result = await this.callNative("downloadFile", fileUrlOrData, encoding, name);
    return this._handleStructuredResponse(result);
  }

  async selectFile() {
    const result = await this.callNative("selectFile");
    return this._handleStructuredResponse(result);
  }

  async setDownloadLocation(path) {
    const result = await this.callNative("setDownloadLocation", path);
    return this._handleStructuredResponse(result);
  }

  async createFolder(folderPathOrName) {
    const result = await this.callNative("createFolder", folderPathOrName);
    return this._handleStructuredResponse(result);
  }

  async pickFolder() {
    const result = await this.callNative("pickFolder");
    return this._handleStructuredResponse(result);
  }

  async redirect(url) {
    const result = await this.callNative("redirect", url);
    return this._handleStructuredResponse(result);
  }

  async zipFolder(folderPath, outputPath = null) {
    const result = await this.callNative("zipFolder", folderPath, outputPath);
    return this._handleStructuredResponse(result);
  }

  async unzip(zipPath, outputPath = null) {
    const result = await this.callNative("unzip", zipPath, outputPath);
    return this._handleStructuredResponse(result);
  }

  async deleteFile(filePath) {
    const result = await this.callNative("deleteFile", filePath);
    return this._handleStructuredResponse(result);
  }

  async deleteFolder(folderPath) {
    const result = await this.callNative("deleteFolder", folderPath);
    return this._handleStructuredResponse(result);
  }

  async getMachineStatus() {
    const result = await this.callNative("GetMachineStatus");
    return this._handleStructuredResponse(result);
  }

  async getPlatform() {
    const result = await this.callNative("GetPlatform");
    return this._handleStructuredResponse(result);
  }

  async quitApp() {
    const result = await this.callNative("quitApp");
    return this._handleStructuredResponse(result);
  }

  async hideCursor() {
    const result = await this.callNative("HideCursor");
    return this._handleStructuredResponse(result);
  }

  async showCursor() {
    const result = await this.callNative("ShowCursor");
    return this._handleStructuredResponse(result);
  }

  async setHeaders(headersObject) {
    const headersJson = JSON.stringify(headersObject);
    const result = await this.callNative("setheaders", headersJson);
    return this._handleStructuredResponse(result);
  }

  async clearHeaders() {
    const result = await this.callNative("clearheaders");
    return this._handleStructuredResponse(result);
  }

  /**
   * Shows a toast notification with the specified details.
   *
   * The `notificationData` object should contain the following properties:
   *
   * @param {Object} notificationData - The notification details.
   * @param {string} notificationData.Id - A unique identifier for the notification.
   * @param {string} notificationData.Title - The title text of the notification.
   * @param {string} notificationData.Message - The main message body of the notification.
   * @param {string} [notificationData.Image] -
   *        The image name or relative path (e.g., "cat.jpeg" or "/images/cat.jpg").
   *        If no URI scheme is provided, the image is searched in the `Assets/WP/` directory.
   * @param {string} [notificationData.AppLogoOverride] -
   *        The app logo image name or relative path.
   *        If no URI scheme is provided, the image is searched in the `Assets/WP/` directory.
   * @param {Array<Object>} [notificationData.Buttons] -
   *        An array of button objects to include in the notification.
   *        Each button can have the following properties:
   *        - `Content` (string): The text displayed on the button.
   *        - `Action` (string): The action identifier for the button.
   *        - `ArgName` (string, optional): The name of the argument to pass when the button is clicked.
   *        - `Arg` (string, optional): The value of the argument to pass.
   * @param {string} [notificationData.Tag] -
   *        A tag to uniquely identify the notification for future reference.
   * @param {string} [notificationData.Group] -
   *        A group identifier to categorize notifications.
   * @param {Date} [notificationData.ExpirationTime] -
   *        The time after which the notification expires. Defaults to a maximum of 3 days.
   *
   * @example
   * const notification = {
   *     Id: "12345",
   *     Title: "New Message",
   *     Message: "You have received a new message.",
   *     Image: "cat.jpeg", // Searches in Assets/WP/cat.jpeg
   *     AppLogoOverride: "https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
   *     Buttons: [
   *         {
   *             Content: "Reply",
   *             Action: "reply",
   *             ArgName: "replyText",
   *             Arg: "userReply"
   *         },
   *         {
   *             Content: "Like",
   *             Action: "like"
   *         }
   *     ],
   *     Tag: "message_12345",
   *     Group: "messages",
   *     ExpirationTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
   * };
   */

  async showNotification(notificationData) {
    const result = await this.callNative(
      "ShowNotification",
      JSON.stringify(notificationData),
    );
    return this._handleStructuredResponse(result);
  }

  async clearNotification() {
    const result = await this.callNative("ClearNotifications");
    return this._handleStructuredResponse(result);
  }

  async vibrateController(durationMs = "300", strength = "0.5") {
    const result = await this.callNative("VibrateController", durationMs, strength);
    return this._handleStructuredResponse(result);
  }

  // App Launcher API methods
  async canOpenUrl(url) {
    const result = await this.callNative("canOpenUrl", url);
    return this._handleStructuredResponse(result);
  }

  async openUrl(url) {
    const result = await this.callNative("openUrl", url);
    return this._handleStructuredResponse(result);
  }

  async showActionSheet(options = {}) {
    return this._callStructured("showActionSheet", this._json(options));
  }

  async getAppInfo() {
    return this._callStructured("getAppInfo");
  }

  async getAppState() {
    return this._callStructured("getAppState");
  }

  async getLaunchUrl() {
    return this._callStructured("getLaunchUrl");
  }

  async minimizeApp() {
    return this._callStructured("minimizeApp");
  }

  async getAppLanguage() {
    return this._callStructured("getAppLanguage");
  }

  async toggleBackButtonHandler(options = {}) {
    return this._callStructured("toggleBackButtonHandler", this._json(options));
  }

  async openBrowser(options = {}) {
    return this._callStructured("openBrowser", this._json(options));
  }

  async closeBrowser() {
    return this._callStructured("closeBrowser");
  }

  async writeClipboard(options = {}) {
    return this._callStructured("writeClipboard", this._json(options));
  }

  async readClipboard() {
    return this._callStructured("readClipboard");
  }

  async getDeviceId() {
    return this._callStructured("getDeviceId");
  }

  async getDeviceInfo() {
    return this._callStructured("getDeviceInfo");
  }

  async getBatteryInfo() {
    return this._callStructured("getBatteryInfo");
  }

  async getLanguageCode() {
    return this._callStructured("getLanguageCode");
  }

  async getLanguageTag() {
    return this._callStructured("getLanguageTag");
  }

  async promptDialog(options = {}) {
    return this._callStructured("promptDialog", this._json(options));
  }

  async scheduleLocalNotifications(options = {}) {
    return this._callStructured("scheduleLocalNotifications", this._json(options));
  }

  async getPendingLocalNotifications() {
    return this._callStructured("getPendingLocalNotifications");
  }

  async registerLocalNotificationActionTypes(options = {}) {
    return this._callStructured("registerLocalNotificationActionTypes", this._json(options));
  }

  async cancelLocalNotifications(options = {}) {
    return this._callStructured("cancelLocalNotifications", this._json(options));
  }

  async areLocalNotificationsEnabled() {
    return this._callStructured("areLocalNotificationsEnabled");
  }

  async getDeliveredNotifications() {
    return this._callStructured("getDeliveredNotifications");
  }

  async removeDeliveredNotifications(options = {}) {
    return this._callStructured("removeDeliveredNotifications", this._json(options));
  }

  async removeAllDeliveredNotifications() {
    return this._callStructured("removeAllDeliveredNotifications");
  }

  async createNotificationChannel(channel = {}) {
    return this._callStructured("createNotificationChannel", this._json(channel));
  }

  async deleteNotificationChannel(options = {}) {
    return this._callStructured("deleteNotificationChannel", this._json(options));
  }

  async listNotificationChannels() {
    return this._callStructured("listNotificationChannels");
  }

  async checkNotificationPermissions() {
    return this._callStructured("checkNotificationPermissions");
  }

  async requestNotificationPermissions() {
    return this._callStructured("requestNotificationPermissions");
  }

  async checkExactNotificationSetting() {
    return this._callStructured("checkExactNotificationSetting");
  }

  async changeExactNotificationSetting() {
    return this._callStructured("changeExactNotificationSetting");
  }

  async startMotionUpdates(options = {}) {
    return this._callStructured("startMotionUpdates", this._json(options));
  }

  async stopMotionUpdates() {
    return this._callStructured("stopMotionUpdates");
  }

  async getNetworkStatus() {
    return this._callStructured("getNetworkStatus");
  }

  async registerPushNotifications(options = {}) {
    return this._callStructured("registerPushNotifications", this._json(options));
  }

  async unregisterPushNotifications() {
    return this._callStructured("unregisterPushNotifications");
  }

  async getScreenOrientation() {
    return this._callStructured("getScreenOrientation");
  }

  async lockScreenOrientation(options = {}) {
    return this._callStructured("lockScreenOrientation", this._json(options));
  }

  async unlockScreenOrientation() {
    return this._callStructured("unlockScreenOrientation");
  }

  async isScreenReaderEnabled() {
    return this._callStructured("isScreenReaderEnabled");
  }

  async speak(options = {}) {
    return this._callStructured("speak", this._json(options));
  }

  async canShare(options = {}) {
    return this._callStructured("canShare", this._json(options));
  }

  async share(options = {}) {
    return this._callStructured("share", this._json(options));
  }

  async showSplashScreen(options = {}) {
    return this._callStructured("showSplashScreen", this._json(options));
  }

  async hideSplashScreen(options = {}) {
    return this._callStructured("hideSplashScreen", this._json(options));
  }

  async setStatusBarStyle(options = {}) {
    return this._callStructured("setStatusBarStyle", this._json(options));
  }

  async setStatusBarBackgroundColor(options = {}) {
    return this._callStructured("setStatusBarBackgroundColor", this._json(options));
  }

  async showStatusBar(options = {}) {
    return this._callStructured("showStatusBar", this._json(options));
  }

  async hideStatusBar(options = {}) {
    return this._callStructured("hideStatusBar", this._json(options));
  }

  async getStatusBarInfo() {
    return this._callStructured("getStatusBarInfo");
  }

  async setStatusBarOverlaysWebView(options = {}) {
    return this._callStructured("setStatusBarOverlaysWebView", this._json(options));
  }

  async showToast(options = {}) {
    return this._callStructured("showToast", this._json(options));
  }

  async takePhoto(options = {}) {
    return this._callStructured("takePhoto", this._json(options));
  }

  async recordVideo(options = {}) {
    return this._callStructured("recordVideo", this._json(options));
  }

  async playVideo(options = {}) {
    return this._callStructured("playVideo", this._json(options));
  }

  async chooseMediaFromGallery(options = {}) {
    return this._callStructured("chooseMediaFromGallery", this._json(options));
  }

  async checkCameraPermissions(options = {}) {
    return this._callStructured("checkCameraPermissions", this._json(options));
  }

  async requestCameraPermissions(options = {}) {
    return this._callStructured("requestCameraPermissions", this._json(options));
  }

  async filesystemReadFile(options = {}) {
    return this._callStructured("filesystemReadFile", this._json(options));
  }

  async filesystemReadFileInChunks(options = {}) {
    return this._callStructured("filesystemReadFileInChunks", this._json(options));
  }

  async filesystemWriteFile(options = {}) {
    return this._callStructured("filesystemWriteFile", this._json(options));
  }

  async filesystemAppendFile(options = {}) {
    return this._callStructured("filesystemAppendFile", this._json(options));
  }

  async filesystemDeleteFile(options = {}) {
    return this._callStructured("filesystemDeleteFile", this._json(options));
  }

  async filesystemMkdir(options = {}) {
    return this._callStructured("filesystemMkdir", this._json(options));
  }

  async filesystemRmdir(options = {}) {
    return this._callStructured("filesystemRmdir", this._json(options));
  }

  async filesystemReaddir(options = {}) {
    return this._callStructured("filesystemReaddir", this._json(options));
  }

  async filesystemGetUri(options = {}) {
    return this._callStructured("filesystemGetUri", this._json(options));
  }

  async filesystemStat(options = {}) {
    return this._callStructured("filesystemStat", this._json(options));
  }

  async filesystemRename(options = {}) {
    return this._callStructured("filesystemRename", this._json(options));
  }

  async filesystemCopy(options = {}) {
    return this._callStructured("filesystemCopy", this._json(options));
  }

  async fileTransferDownload(options = {}) {
    return this._callStructured("fileTransferDownload", this._json(options));
  }

  async fileTransferUpload(options = {}) {
    return this._callStructured("fileTransferUpload", this._json(options));
  }

  async openDocumentFromLocalPath(options = {}) {
    return this._callStructured("openDocumentFromLocalPath", this._json(options));
  }

  async openDocumentFromResources(options = {}) {
    return this._callStructured("openDocumentFromResources", this._json(options));
  }

  async openDocumentFromUrl(options = {}) {
    return this._callStructured("openDocumentFromUrl", this._json(options));
  }

  async getCurrentPosition(options = {}) {
    return this._callStructured("getCurrentPosition", this._json(options));
  }

  async watchPosition(options = {}) {
    return this._callStructured("watchPosition", this._json(options));
  }

  async clearPositionWatch(options = {}) {
    return this._callStructured("clearPositionWatch", this._json(options));
  }

  async checkGeolocationPermissions(options = {}) {
    return this._callStructured("checkGeolocationPermissions", this._json(options));
  }

  async requestGeolocationPermissions(options = {}) {
    return this._callStructured("requestGeolocationPermissions", this._json(options));
  }

  async keyboardShow() {
    return this._callStructured("keyboardShow");
  }

  async keyboardHide() {
    return this._callStructured("keyboardHide");
  }

  async keyboardSetResizeMode(options = {}) {
    return this._callStructured("keyboardSetResizeMode", this._json(options));
  }

  async keyboardGetResizeMode() {
    return this._callStructured("keyboardGetResizeMode");
  }

  async keyboardSetStyle(options = {}) {
    return this._callStructured("keyboardSetStyle", this._json(options));
  }

  async scanBarcode(options = {}) {
    return this._callStructured("scanBarcode", this._json(options));
  }

  async secureSet(options = {}) {
    return this._callStructured("secureSet", this._json(options));
  }

  async secureGet(options = {}) {
    return this._callStructured("secureGet", this._json(options));
  }

  async secureRemove(options = {}) {
    return this._callStructured("secureRemove", this._json(options));
  }

  async secureClear(options = {}) {
    return this._callStructured("secureClear", this._json(options));
  }

  async secureKeys(options = {}) {
    return this._callStructured("secureKeys", this._json(options));
  }

  async checkUserVerificationAvailability() {
    return this._callStructured("checkUserVerificationAvailability");
  }

  async requestUserVerification(options = {}) {
    return this._callStructured("requestUserVerification", this._json(options));
  }

  async checkBackgroundScriptPermissions() {
    return this._callStructured("checkBackgroundScriptPermissions");
  }

  async requestBackgroundScriptPermissions(options = {}) {
    return this._callStructured("requestBackgroundScriptPermissions", this._json(options));
  }

  async configureBackgroundScriptRunner(options = {}) {
    return this._callStructured("configureBackgroundScriptRunner", this._json(options));
  }

  async dispatchBackgroundScriptEvent(options = {}) {
    return this._callStructured("dispatchBackgroundScriptEvent", this._json(options));
  }

  /**
   * // Listen for deep link events forwarded from C#
    uwp.on('protocolActivated', ({ uri, scheme, host, path, query }) => {
        console.log('Deep link received:', { uri, scheme, host, path, query });
    });
   */
}

export default UwpBridge;
