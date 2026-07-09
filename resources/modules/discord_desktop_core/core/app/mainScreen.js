"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WEBAPP_ENDPOINT = void 0;
exports.getMainWindowId = getMainWindowId;
exports.handleOpenUrl = handleOpenUrl;
exports.init = init;
exports.setMainWindowVisible = setMainWindowVisible;
exports.webContentsSend = webContentsSend;
var _electron = require("electron");
var _path = require("path");
var _url = require("url");
var _Backoff = require("../common/Backoff");
var _securityUtils = require("../common/securityUtils");
var appBadge = require("./appBadge");
var appConfig = require("./appConfig");
var _appSettings = require("./bootstrapModules/appSettings");
var _ipcMain = require("./ipcMain");
var mouse = require("./mouse");
var popoutWindows = require("./popoutWindows");
var systemTray = require("./systemTray");
var thumbarButtons = require("./thumbarButtons");
var _Constants = require("./Constants");

const {
    buildInfo
} = require('./bootstrapModules/buildInfo');
const settings = _appSettings.appSettings.getSettings();
const connectionBackoff = new _Backoff(1000, 20000);
const DISCORD_NAMESPACE = 'DISCORD_';
const envVariables = {
    disableRestart: process.env.DISCORD_DISABLE_RESTART,
    webappEndpoint: process.env.DISCORD_WEBAPP_ENDPOINT,
    test: undefined
};

const WEBAPP_ENDPOINT = 'https://discord.com';
exports.WEBAPP_ENDPOINT = WEBAPP_ENDPOINT;

function getSanitizedPath(path) {
    return new _url.URL(path, WEBAPP_ENDPOINT).pathname;
}

function getSanitizedProtocolUrl(fullUrl) {
    try {
        const parsedURL = _url.parse(fullUrl);
        if (parsedURL.protocol === 'discord:') {
            return {
                path: getSanitizedPath(parsedURL.path ?? ''),
                query: parsedURL.query ?? ''
            };
        }
    } catch (_) {}
    return null;
}
const WEBAPP_PATH = settings === null || settings === void 0 ? void 0 : settings.get('WEBAPP_PATH', `/app?_=${Date.now()}`);
const URL_TO_LOAD = `${WEBAPP_ENDPOINT}${WEBAPP_PATH}`;
const MIN_WIDTH = settings === null || settings === void 0 ? void 0 : settings.get('MIN_WIDTH', 940);
const MIN_HEIGHT = settings === null || settings === void 0 ? void 0 : settings.get('MIN_HEIGHT', 500);
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const MIN_VISIBLE_ON_SCREEN = 32;
const ENABLE_DEVTOOLS = buildInfo.releaseChannel === 'stable' ? settings === null || settings === void 0 ? void 0 : settings.get('DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING', false) : true;
let mainWindow = null;
let mainWindowId = '';
let mainWindowInitialPath = null;
let mainWindowDidFinishLoad = false;
let mainWindowIsVisible = false;
let insideAuthFlow = false;
let lastPageLoadFailed = false;

function getMainWindowId() {
    return mainWindowId;
}

function webContentsSend(...args) {
    if (mainWindow == null || mainWindow.isDestroyed()) {
        console.error('mainScreen.webContentsSend: mainWindow is null or destroyed');
        return;
    }
    if (mainWindow.webContents == null || mainWindow.webContents.isDestroyed()) {
        console.error('mainScreen.webContentsSend: mainWindow.webContents is null or destroyed.');
        return;
    }
    const [event, ...options] = args;
    mainWindow.webContents.send(`${DISCORD_NAMESPACE}${event}`, ...options);
}

function saveWindowConfig(browserWindow) {
    try {
        if (browserWindow == null || browserWindow.isDestroyed()) {
            return;
        }
        settings === null || settings === void 0 ? void 0 : settings.set('IS_MAXIMIZED', browserWindow.isMaximized());
        settings === null || settings === void 0 ? void 0 : settings.set('IS_MINIMIZED', browserWindow.isMinimized());
        if (!(settings === null || settings === void 0 ? void 0 : settings.get('IS_MAXIMIZED')) && !(settings === null || settings === void 0 ? void 0 : settings.get('IS_MINIMIZED'))) {
            settings === null || settings === void 0 ? void 0 : settings.set('WINDOW_BOUNDS', browserWindow.getBounds());
        }
        settings === null || settings === void 0 ? void 0 : settings.save();
    } catch (e) {
        console.error(e);
    }
}

function setWindowVisible(isVisible, andUnminimize) {
    if (mainWindow == null) {
        console.error('mainScreen.setWindowVisible: mainWindow is null.');
        return;
    }
    if (mainWindow.isDestroyed()) {
        console.error('mainScreen.setWindowVisible: mainWindow isDestroyed.');
        return;
    }
    if (isVisible) {
        const isMinimized = mainWindow.isMinimized();
        if (andUnminimize || !isMinimized) {
            mainWindow.show();
            webContentsSend('MAIN_WINDOW_FOCUS');
        } else {
            console.log(`mainScreen.setWindowVisible: didn't show. andUnminimize: ${andUnminimize}, isMinimized: ${isMinimized}.`);
        }
    } else {
        webContentsSend('MAIN_WINDOW_BLUR');
        mainWindow.hide();
        if (systemTray.hasInit) {
            systemTray.displayHowToCloseHint();
        }
    }
    mainWindow.setSkipTaskbar(!isVisible);
    mainWindowIsVisible = isVisible;
}

function doAABBsOverlap(a, b) {
    const ax1 = a.x + a.width;
    const bx1 = b.x + b.width;
    const ay1 = a.y + a.height;
    const by1 = b.y + b.height;
    const cx0 = a.x < b.x ? b.x : a.x;
    const cx1 = ax1 < bx1 ? ax1 : bx1;
    if (cx1 - cx0 > 0) {
        const cy0 = a.y < b.y ? b.y : a.y;
        const cy1 = ay1 < by1 ? ay1 : by1;
        if (cy1 - cy0 > 0) {
            return true;
        }
    }
    return false;
}

function getDisplayForBounds(displays, bounds) {
    return displays.find(display => {
        const displayBound = display.workArea;
        displayBound.x += MIN_VISIBLE_ON_SCREEN;
        displayBound.y += MIN_VISIBLE_ON_SCREEN;
        displayBound.width -= 2 * MIN_VISIBLE_ON_SCREEN;
        displayBound.height -= 2 * MIN_VISIBLE_ON_SCREEN;
        return doAABBsOverlap(bounds, displayBound);
    });
}

function getSavedWindowBounds() {
    if (!(settings === null || settings === void 0 ? void 0 : settings.get('WINDOW_BOUNDS'))) {
        return null;
    }
    const bounds = settings.get('WINDOW_BOUNDS');
    bounds.width = Math.max(MIN_WIDTH, bounds.width);
    bounds.height = Math.max(MIN_HEIGHT, bounds.height);
    const displays = _electron.screen.getAllDisplays();
    const display = getDisplayForBounds(displays, bounds);
    return display != null ? bounds : null;
}

function applyWindowBoundsToConfig(mainWindowOptions) {
    const bounds = getSavedWindowBounds();
    if (bounds == null) {
        mainWindowOptions.center = true;
        return;
    }
    mainWindowOptions.width = bounds.width;
    mainWindowOptions.height = bounds.height;
    mainWindowOptions.x = bounds.x;
    mainWindowOptions.y = bounds.y;
}

function restoreMainWindowBounds(mainWindow) {
    const savedWindowBounds = getSavedWindowBounds();
    const currentBounds = mainWindow.getBounds();
    if (savedWindowBounds != null && (currentBounds.height !== savedWindowBounds.height || currentBounds.width !== savedWindowBounds.width)) {
        mainWindow.setBounds(savedWindowBounds);
    }
}

function adjustWindowBounds(window) {
    const bounds = window.getBounds();
    const displays = _electron.screen.getAllDisplays();
    const display = getDisplayForBounds(displays, bounds);
    if (!display && displays.length > 0) {
        const displayBounds = displays[0].bounds;
        bounds.x = displayBounds.x;
        bounds.y = displayBounds.y;
        bounds.width = Math.min(bounds.width, displayBounds.width);
        bounds.height = Math.min(bounds.height, displayBounds.height);
        window.setBounds(bounds);
    }
}

function setupSystemTray() {
    if (!systemTray.hasInit) {
        systemTray.init({
            onCheckForUpdates: () => {},
            onTrayClicked: () => setWindowVisible(true, true),
            onOpenVoiceSettings: openVoiceSettings,
            onToggleMute: toggleMute,
            onToggleDeafen: toggleDeafen,
            onLaunchApplication: launchApplication
        });
    }
}

function setupAppBadge() {
    if (!appBadge.hasInit) {
        appBadge.init();
    }
}

function setupAppConfig() {
    if (!appConfig.hasInit) {
        appConfig.init();
    }
}

function setupPopouts() {
    if (!popoutWindows.hasInit) {
        popoutWindows.init();
    }
}

function openVoiceSettings() {
    setWindowVisible(true, true);
    webContentsSend('SYSTEM_TRAY_OPEN_VOICE_SETTINGS');
}

function toggleMute() {
    webContentsSend('SYSTEM_TRAY_TOGGLE_MUTE');
}

function toggleDeafen() {
    webContentsSend('SYSTEM_TRAY_TOGGLE_DEAFEN');
}

function launchApplication(applicationId) {
    webContentsSend('LAUNCH_APPLICATION', applicationId);
}
const loadMainPage = () => {
    lastPageLoadFailed = false;
    mainWindow.loadURL(URL_TO_LOAD);
};

function getBackgroundColor() {
    return (settings === null || settings === void 0 ? void 0 : settings.get('BACKGROUND_COLOR', '#2f3136')) ?? '#2f3136';
}

function setBackgroundColor(color) {
    settings === null || settings === void 0 ? void 0 : settings.set('BACKGROUND_COLOR', color);
    mainWindow.setBackgroundColor(color);
    settings === null || settings === void 0 ? void 0 : settings.save();
}

function launchMainAppWindow(isVisible) {
    if (mainWindow) {
      mainWindow.destroy();
    }
    const mainWindowOptions = {
      title: 'NanoCord',
      backgroundColor: getBackgroundColor(),
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      minWidth: MIN_WIDTH,
      minHeight: MIN_HEIGHT,
      transparent: false,
      frame: false,
      resizable: true,
      show: isVisible,
      webPreferences: {
        enableBlinkFeatures: 'EnumerateDevices,AudioOutputDevices',
        nodeIntegration: false,
        sandbox: false,
        preload: _path.join(__dirname, 'mainScreenPreload.js'),
        spellcheck: true,
        contextIsolation: true,
        additionalArguments: ['--enable-node-leakage-in-renderers'],
        devTools: ENABLE_DEVTOOLS
      }
    };
    if (process.platform === 'linux') {
      mainWindowOptions.icon = _path.join(_path.dirname(_electron.app.getPath('exe')), 'discord.png');
      mainWindowOptions.frame = true;
    }
    if (process.platform === 'darwin') {
      mainWindowOptions.titleBarStyle = 'hidden';
      mainWindowOptions.trafficLightPosition = {
        x: 10,
        y: 10
      };
    }
    applyWindowBoundsToConfig(mainWindowOptions);
    mainWindow = new _electron.BrowserWindow(mainWindowOptions);
    mainWindowId = mainWindow.id;
    global.mainWindowId = mainWindowId;
    restoreMainWindowBounds(mainWindow);
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback, details) => {
      switch (permission) {
        case 'accessibility-events':
          callback(true);
          return;
        case 'notifications':
        case 'pointerLock':
          callback((0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, WEBAPP_ENDPOINT));
          return;
        case 'fullscreen':
          let result = false;
          if (details.isMainFrame) {
            result = (0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, WEBAPP_ENDPOINT);
          } else {
            result = true;
          }
          callback(result);
          return;
        case 'media':
          callback((0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, _Constants.AllowedMediaOrigins.K_ID));
          return;
      }
      callback(false);
    });
    mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
      switch (permission) {
        case 'notifications':
        case 'fullscreen':
        case 'pointerLock':
          if (details.isMainFrame || details.embeddingOrigin == null) {
            return (0, _securityUtils.checkUrlOriginMatches)(requestingOrigin, WEBAPP_ENDPOINT);
          } else {
            return (0, _securityUtils.checkUrlOriginMatches)(details.embeddingOrigin, WEBAPP_ENDPOINT);
          }
        case 'media':
          return (0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, _Constants.AllowedMediaOrigins.K_ID);
      }
      return false;
    });
    mainWindow.setMenuBarVisibility(false);
    if (settings === null || settings === void 0 ? void 0 : settings.get('IS_MAXIMIZED')) {
      mainWindow.maximize();
    }
    if (settings === null || settings === void 0 ? void 0 : settings.get('IS_MINIMIZED')) {
      mainWindow.minimize();
    }
    mainWindow.webContents.setWindowOpenHandler(({
      url,
      frameName,
      features
    }) => {
      if (frameName.startsWith(DISCORD_NAMESPACE) && (0, _securityUtils.checkUrlOriginMatches)(url, WEBAPP_ENDPOINT) && getSanitizedPath(url) === '/popout') {
        return popoutWindows.openOrFocusWindow(url, frameName, features);
      } else if ((0, _securityUtils.shouldOpenExternalUrl)(url)) {
        void (0, _securityUtils.saferShellOpenExternal)(url);
      }
      return {
        action: 'deny'
      };
    });
    mainWindow.webContents.on('did-fail-load', (e, errCode, errDesc, validatedUrl) => {
      if (insideAuthFlow) {
        return;
      }
      if (validatedUrl !== URL_TO_LOAD) {
        return;
      }
      if (errCode === -3 || errCode === 0) return;
      lastPageLoadFailed = true;
      console.error('[WebContents] did-fail-load', errCode, errDesc, `retry in ${connectionBackoff.current} ms`);
      connectionBackoff.fail(() => {
        console.log('[WebContents] retrying load', URL_TO_LOAD);
        loadMainPage();
      });
    });
    mainWindow.webContents.on('did-create-window', (childWindow, {
      options,
      frameName
    }) => {
      popoutWindows.setupPopout(childWindow, frameName, options, WEBAPP_ENDPOINT);
      adjustWindowBounds(childWindow);
    });
    mainWindow.webContents.on('did-finish-load', () => {
      var _mainWindow;
      console.log(`mainScreen.on(did-finish-load) ${lastPageLoadFailed} ${mainWindowDidFinishLoad}`);
      if (insideAuthFlow && mainWindow.webContents && (0, _securityUtils.checkUrlOriginMatches)(mainWindow.webContents.getURL(), WEBAPP_ENDPOINT)) {
        insideAuthFlow = false;
      }
      mainWindowDidFinishLoad = true;
      if (mainWindowInitialPath != null) {
        webContentsSend('MAIN_WINDOW_PATH', mainWindowInitialPath.path, mainWindowInitialPath.query);
        mainWindowInitialPath = null;
      }
      webContentsSend(((_mainWindow = mainWindow) === null || _mainWindow === void 0 ? void 0 : _mainWindow.isFocused()) ? 'MAIN_WINDOW_FOCUS' : 'MAIN_WINDOW_BLUR');
      if (!lastPageLoadFailed) {
        connectionBackoff.succeed();
      }
    });
    mainWindow.webContents.on('render-process-gone', (e, details) => {
      const reason = (details === null || details === void 0 ? void 0 : details.reason) ?? 'Unknown';
      _processUtils.processUtilsSettings.rendererCrashReason = reason;
      _processUtils.processUtilsSettings.rendererCrashExitCode = (details === null || details === void 0 ? void 0 : details.exitCode) ?? null;
      _processUtils.processUtilsSettings.lastRunsStoredInformation = _processUtils.processUtilsSettings.currentStoredInformation;
      _processUtils.processUtilsSettings.currentStoredInformation = {};
      if (reason === 'killed') {
        _electron.app.quit();
        return;
      }
      const crashTime = Date.now();
      if (crashTime - lastCrashed < 5 * 1000) {
        console.error(`[WebContents] double crashed (reason: ${reason}, exitCode: ${details === null || details === void 0 ? void 0 : details.exitCode})... RIP =(`);
        _electron.app.quit();
        return;
      }
      lastCrashed = crashTime;
      console.error(`[WebContents] crashed (reason: ${reason}, exitCode: ${details === null || details === void 0 ? void 0 : details.exitCode})... reloading`);
      if (envVariables.disableRestart != null) {
        _electron.app.quit();
        return;
      }
      launchMainAppWindow(true);
    });
    mainWindow.webContents.on('will-navigate', (evt, url) => {
      if (!insideAuthFlow && !(0, _securityUtils.checkUrlOriginMatches)(url, WEBAPP_ENDPOINT)) {
        evt.preventDefault();
      }
    });
    mainWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      if ((0, _securityUtils.checkUrlOriginMatches)(oldUrl, WEBAPP_ENDPOINT) && (0, _securityUtils.checkUrlOriginMatches)(newUrl, 'https://accounts.google.com/')) {
        insideAuthFlow = true;
      }
    });
    mainWindow.webContents.on('context-menu', (_, params) => {
      webContentsSend('SPELLCHECK_RESULT', params.misspelledWord, params.dictionarySuggestions);
    });
    mainWindow.webContents.on('devtools-opened', () => {
      webContentsSend('WINDOW_DEVTOOLS_OPENED');
    });
    mainWindow.webContents.on('devtools-closed', () => {
      webContentsSend('WINDOW_DEVTOOLS_CLOSED');
    });
    mainWindow.on('focus', () => {
      webContentsSend('MAIN_WINDOW_FOCUS');
    });
    mainWindow.on('blur', () => {
      webContentsSend('MAIN_WINDOW_BLUR');
    });
    mainWindow.on('page-title-updated', (e, title) => {
      if (mainWindow == null) {
        return;
      }
      e.preventDefault();
      setMainWindowTitle(title);
    });
    mainWindow.on('leave-html-full-screen', () => {
      if (mainWindow == null) {
        return;
      }
      mainWindow.setMenuBarVisibility(false);
    });
    mainWindow.on('show', () => {
      setTimeout(() => appBadge.refreshAppBadge(), 500);
    });
    mainWindow.webContents.on('did-navigate-in-page', (_, eventUrl) => {
      var _parsedUrl;
      if (mainWindow == null) {
        return;
      }
      let parsedUrl;
      try {
        parsedUrl = _url.parse(eventUrl);
      } catch (_) {
        return;
      }
      if (((_parsedUrl = parsedUrl) === null || _parsedUrl === void 0 ? void 0 : _parsedUrl.pathname) === '/login') {
        mainWindow.webContents.clearHistory();
      }
      setMainWindowTitle(mainWindow.webContents.getTitle());
    });
    mainWindow.on('swipe', (_, direction) => {
      switch (direction) {
        case 'left':
          webContentsSend('NAVIGATE_BACK', 'SWIPE');
          break;
        case 'right':
          webContentsSend('NAVIGATE_FORWARD', 'SWIPE');
          break;
      }
    });
    if (process.platform === 'win32') {
      mainWindow.on('app-command', (_, cmd) => {
        switch (cmd) {
          case 'browser-backward':
            webContentsSend('NAVIGATE_BACK', 'BROWSER');
            break;
          case 'browser-forward':
            webContentsSend('NAVIGATE_FORWARD', 'BROWSER');
            break;
        }
      });
    }
    if (process.platform === 'darwin') {
      mainWindow.on('close', e => {
        if (mainWindow != null) {
          if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(false);
          } else {
            webContentsSend('MAIN_WINDOW_HIDDEN');
            _electron.Menu.sendActionToFirstResponder('hide:');
          }
          e.preventDefault();
        }
        return false;
      });
    }
    setupSystemTray();
    setupAppBadge();
    setupAppConfig();
    setupPopouts();
    thumbarButtons.init();
    mouse.init();
    if (process.platform === 'linux' || process.platform === 'win32') {
      systemTray.show();
      mainWindow.on('close', e => {
        if (mainWindow == null) {
          popoutWindows.closePopouts();
          return;
        }
        webContentsSend('MAIN_WINDOW_BLUR');
        saveWindowConfig(mainWindow);
        if (!(settings === null || settings === void 0 ? void 0 : settings.get('MINIMIZE_TO_TRAY', true))) {
          _electron.app.quit();
          return;
        }
        webContentsSend('MAIN_WINDOW_HIDDEN');
        setWindowVisible(false, false);
        e.preventDefault();
      });
    }
    loadMainPage();
  }

function setMainWindowTitle(title) {
    if (!title.endsWith('Discord')) {
        title += ' - Discord';
    }
    if (mainWindow) {
        mainWindow.setTitle(title);
    }
}

function handleDisplayChange() {
    if (!mainWindowIsVisible && mainWindow == null) {
        setWindowVisible(mainWindowIsVisible, false);
    }
}

function init() {
    _electron.screen.on('display-added', handleDisplayChange);
    _electron.screen.on('display-removed', handleDisplayChange);
    _electron.screen.on('display-metrics-changed', handleDisplayChange);
    _electron.app.on('window-all-closed', () => {
        if (envVariables.test != null) {
            _electron.app.quit();
        }
    });
    _electron.app.on('before-quit', () => {
        saveWindowConfig(mainWindow);
        mainWindow = null;
    });
    _electron.app.on(_Constants.MenuEvents.OPEN_HELP, () => webContentsSend('HELP_OPEN'));
    _electron.app.on(_Constants.MenuEvents.OPEN_SETTINGS, () => webContentsSend('USER_SETTINGS_OPEN'));
    _electron.app.on('second-instance', (_event, args) => {
        var _process$argv;
        if ((args === null || args === void 0 ? void 0 : args.indexOf('--squirrel-uninstall')) > -1) {
            return;
        }
        if ((_process$argv = process.argv) === null || _process$argv === void 0 ? void 0 : _process$argv.slice(1).includes('--multi-instance')) {
            return;
        }
        if (mainWindow == null) {
            return;
        }
        setWindowVisible(true, false);
        mainWindow.focus();
    });
    _ipcMain.on('SETTINGS_UPDATE_BACKGROUND_COLOR', (_event, backgroundColor) => {
        if (getBackgroundColor() !== backgroundColor) {
            setBackgroundColor(backgroundColor);
        }
    });
    launchMainAppWindow(false);
}

function handleOpenUrl(url) {
    const sanitizedUrl = getSanitizedProtocolUrl(url);
    if (sanitizedUrl != null) {
        if (!mainWindowDidFinishLoad) {
            mainWindowInitialPath = {
                path: sanitizedUrl.path,
                query: sanitizedUrl.query
            };
        }
        webContentsSend('MAIN_WINDOW_PATH', sanitizedUrl.path, sanitizedUrl.query);
    }
    if (mainWindow == null) {
        return;
    }
    setWindowVisible(true, false);
    mainWindow.focus();
}

function setMainWindowVisible(visible) {
    setWindowVisible(visible, false);
}