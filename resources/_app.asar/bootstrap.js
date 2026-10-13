// Demarre le coeur de Discord (discord_desktop_core) avec des remplacants
// minimaux pour le module de mise a jour, l ecran de chargement, etc.
const electron = require("electron");
const app = electron.app;
const desktopCore = require("discord_desktop_core");
const {
  Constants,
  ModuleUpdater,
  Updater,
  BuildInfo,
  SplashScreen,
  AutoStart,
  AppSettings,
  CrashReporterSetup,
  GpuSettings,
  SetVisible,
} = require("./exports");
function onSecondInstance(event, argv) {
  desktopCore?.handleOpenUrl?.(argv.includes("--url") && argv[argv.indexOf("--") + 1]);
}
function startDiscord() {
  desktopCore.startup({
    splashScreen: SplashScreen,
    moduleUpdater: ModuleUpdater,
    buildInfo: BuildInfo,
    Constants,
    updater: Updater,
    autoStart: AutoStart,
    appSettings: AppSettings,
    paths: require("./paths"),
    GPUSettings: GpuSettings,
    crashReporterSetup: CrashReporterSetup,
  });
  SetVisible();
}
module.exports = () => {
  if (!app.requestSingleInstanceLock() && !process.argv?.includes?.("--multi-instance")) {
    return app.quit();
  }
  // Le lanceur Nexium (app.asar/index.js) intercepte cet appel et ne coupe
  // l acceleration materielle que si l utilisateur l a demande.
  app.disableHardwareAcceleration();
  app.on("second-instance", (event, argv) => onSecondInstance(event, argv));
  app.on("ready", () => startDiscord());
};
