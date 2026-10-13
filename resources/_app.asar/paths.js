// Dossiers de l application : les donnees vivent dans %APPDATA%\NanoCord.
const { join, dirname } = require("path");
const app = require("electron").app;
const fs = require("fs");
let userDataDir;
let exeDir;
let exeName;
exports.getUserData = () => userDataDir;
exports.getExeDir = () => exeDir;
exports.getExeName = () => exeName;
exports.init = () => {
  userDataDir = join(app.getPath("appData"), "NanoCord");
  exeDir = dirname(app.getPath("exe"));
  fs.readdir(exeDir, (err, files) => {
    if (!err) {
      exeName = files.find((name) => name.endsWith(".exe"));
    }
  });
  global.moduleDataPath = join(userDataDir, "modules");
  app.setPath("userData", userDataDir);
};
