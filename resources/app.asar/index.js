const fs = require("fs");
const path = require("path");

const equicordDir = path.join(__dirname, "..", "equicord");
const desktopAsar = path.join(equicordDir, "desktop.asar");
const patcherJs = path.join(equicordDir, "patcher.js");

if (fs.existsSync(patcherJs)) {
    require(patcherJs);
} else if (fs.existsSync(desktopAsar)) {
    require(desktopAsar);
} else {
    throw new Error("NanoCord mod missing. Re-run pnpm repair:portable.");
}
