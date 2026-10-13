// Preload de la fenetre Discord : expose VencordNative et injecte renderer.js.
// Desobfusque ; comportement verifie identique a l original. Source amont :
// github.com/Equicord/Equicord (GPL-3.0).

"use strict";

function S(p, p2 = 300) {
  let v;
  return function (...args) {
    clearTimeout(v);
    v = setTimeout(() => {
      p(...args);
    }, p2);
  };
}
var i = require("electron/renderer");
var n = require("electron/renderer");
function r(p3, ...args) {
  return n.ipcRenderer.invoke(p3, ...args);
}
function E(p4, ...args) {
  return n.ipcRenderer.sendSync(p4, ...args);
}
var a = {};
var m = E("VencordGetPluginIpcMethodMap");
for (let [e, o] of Object.entries(m)) {
  let t = (a[e] = {});
  for (let [s, R] of Object.entries(o)) {
    t[s] = (...args) => r(R, ...args);
  }
}
var T = {
  themes: {
    uploadTheme: async (p5, p6) => {
      throw new Error("uploadTheme is WEB only");
    },
    deleteTheme: (p7) => r("VencordDeleteTheme", p7),
    getThemesDir: () => r("VencordGetThemesDir"),
    getThemesList: () => r("VencordGetThemesList"),
    getThemeData: (p8) => r("VencordGetThemeData", p8),
    getSystemValues: () => r("VencordGetThemeSystemValues"),
    openFolder: () => r("VencordOpenThemesFolder"),
  },
  updater: {
    getUpdates: () => r("VencordGetUpdates"),
    update: () => r("VencordUpdate"),
    rebuild: () => r("VencordBuild"),
    getRepo: () => r("VencordGetRepo"),
  },
  settings: {
    get: () => E("VencordGetSettings"),
    set: (p9, p10) => r("VencordSetSettings", p9, p10),
    getSettingsDir: () => r("VencordGetSettingsDir"),
    openFolder: () => r("VencordOpenSettingsFolder"),
  },
  quickCss: {
    get: () => r("VencordGetQuickCss"),
    set: (p11) => r("VencordSetQuickCss", p11),
    addChangeListener(p12) {
      n.ipcRenderer.on("VencordQuickCssUpdate", (p13, p14) => p12(p14));
    },
    addThemeChangeListener(p15) {
      n.ipcRenderer.on("VencordThemeUpdate", () => p15());
    },
    openFile: () => r("VencordOpenQuickCss"),
    openEditor: () => r("VencordOpenMonacoEditor"),
    getEditorTheme: () => E("VencordGetMonacoTheme"),
  },
  native: {
    getVersions: () => process.versions,
    supportsWindowsMaterial: () => E("VencordSupportsWindowsMaterial"),
    openExternal: (p16) => r("VencordOpenExternal", p16),
    getRendererCss: () => r("VencordGetRendererCss"),
    onRendererCssUpdate: (p17) => {},
  },
  csp: {
    isDomainAllowed: (p18, p19) => r("VencordCspIsDomainAllowed", p18, p19),
    removeOverride: (p20) => r("VencordCspRemoveOverride", p20),
    requestAddOverride: (p21, p22, p23) => r("VencordCspRequestAddOverride", p21, p22, p23),
  },
  tray: {
    setUpdateState: (p24) => n.ipcRenderer.send("VencordSetTrayUpdateState", p24),
    onCheckUpdates: (p25) => {
      n.ipcRenderer.on("VencordTrayCheckUpdates", p25);
    },
    onRepair: (p26) => {
      n.ipcRenderer.on("VencordTrayRepair", p26);
    },
  },
  pluginHelpers: a,
};
i.contextBridge.exposeInMainWorld("VencordNative", T);
if (location.protocol !== "data:") {
  r("VencordInitFileWatchers");
  i.webFrame.executeJavaScript(E("VencordPreloadGetRendererJs"));
  require(process.env.DISCORD_PRELOAD);
} else {
  i.contextBridge.exposeInMainWorld("setCss", S(T.quickCss.set));
  i.contextBridge.exposeInMainWorld("getCurrentCss", T.quickCss.get);
  i.contextBridge.exposeInMainWorld("getTheme", T.quickCss.getEditorTheme);
}
