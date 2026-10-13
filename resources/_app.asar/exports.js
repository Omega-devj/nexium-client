// Remplacants minimaux de ce que fournit normalement l installateur de Discord.
class SettingsStub {
  getMod() {}
  set() {}
  save() {}
  get(key, fallback) {
    return fallback;
  }
}
exports.GpuSettings = {
  replace: () => {},
};
exports.Constants = {
  APP_COMPANY: "",
  APP_DESCRIPTION: "",
  APP_NAME: "",
  APP_NAME_FOR_HUMANS: "",
  APP_ID: "",
  APP_PROTOCOL: "",
  API_ENDPOINT: "",
  NEW_UPDATE_ENDPOINT: "",
  UPDATE_ENDPOINT: "",
};
exports.BuildInfo = {
  newUpdater: null,
  releaseChannel: "stable",
  version: "0.1.0",
};
exports.AutoStart = {
  update: () => {},
};
exports.AppSettings = {
  getSettings: () => new SettingsStub(require("path").join(require("./paths").getUserData(), "settings.json")),
};
exports.Relaunch = () => require("electron").app.relaunch();
exports.SetVisible = () => require("discord_desktop_core").setMainWindowVisible(true);
