const e = require("electron"),
    t = e.app,
    r = require("discord_desktop_core"),
    {
        Constants: n,
        ModuleUpdater: s,
        Updater: o,
        BuildInfo: p,
        SplashScreen: u,
        AutoStart: a,
        AppSettings: i,
        CrashReporterSetup: d,
        GpuSettings: c,
        SetVisible: l
    } = require("./exports");

function S(e, t) {
    r?.handleOpenUrl?.(t.includes("--url") && t[t.indexOf("--") + 1])
}

function h() {
    r.startup({
        splashScreen: u,
        moduleUpdater: s,
        buildInfo: p,
        Constants: n,
        updater: o,
        autoStart: a,
        appSettings: i,
        paths: require("./paths"),
        GPUSettings: c,
        crashReporterSetup: d
    }), l()
}
module.exports = () => {
    if (!t.requestSingleInstanceLock() && !process.argv?.includes?.("--multi-instance")) return t.quit();
    t.disableHardwareAcceleration();
    t.on("second-instance", (e, t) => S(e, t)), t.on("ready", () => h())
};