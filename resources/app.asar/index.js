const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");

const equicordDir = path.join(__dirname, "..", "equicord");
const desktopAsar = path.join(equicordDir, "desktop.asar");
const patcherJs = path.join(equicordDir, "patcher.js");
const STATE = path.join(equicordDir, ".nexium-update.json");
const LOG = path.join(equicordDir, ".nexium-update.log");

function loadState() { try { return JSON.parse(fs.readFileSync(STATE, "utf8")) || {}; } catch (_) { return {}; } }
function saveState(s) { try { fs.writeFileSync(STATE, JSON.stringify(s)); } catch (_) {} }
function log(msg) {
    try {
        var line = "[" + new Date().toISOString() + "] " + msg + "\n";
        var prev = "";
        try { prev = fs.readFileSync(LOG, "utf8"); } catch (_) {}
        var all = (prev + line).split("\n");
        if (all.length > 60) all = all.slice(all.length - 60);
        fs.writeFileSync(LOG, all.join("\n"));
    } catch (_) {}
}
function sha256(buf) { try { return crypto.createHash("sha256").update(buf).digest("hex"); } catch (_) { return null; } }

let state = loadState();

(function applyPending() {
    try {
        var appliedRenderer = false;
        ["renderer.js", "renderer.css"].forEach(function (name) {
            var live = path.join(equicordDir, name);
            var pend = live + ".pending";
            if (fs.existsSync(pend)) {
                try {
                    var size = fs.statSync(pend).size;
                    if (name === "renderer.js" && size < 500000) { fs.unlinkSync(pend); log("pending " + name + " rejeté (taille " + size + ")"); return; }
                    fs.renameSync(pend, live);
                    if (name === "renderer.js") appliedRenderer = true;
                    log("APPLIQUÉ " + name + " (" + size + " octets)");
                } catch (e) {
                    try { fs.copyFileSync(pend, live); fs.unlinkSync(pend); if (name === "renderer.js") appliedRenderer = true; log("APPLIQUÉ " + name + " (copie)"); } catch (_) { log("échec application " + name); }
                }
            }
        });
        if (appliedRenderer && state.pendingSha) { state.appliedSha = state.pendingSha; delete state.pendingSha; saveState(state); }
    } catch (_) {}
})();

(function nexiumAutoUpdate() {
    try {
        const RAW = "https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/resources/equicord/";
        const API = "https://api.github.com/repos/Omega-devj/nexium-client/commits?sha=main&per_page=1";

        const get = (url, json) => new Promise((resolve) => {
            let done = false;
            const finish = (v) => { if (!done) { done = true; resolve(v); } };
            const bust = url + (url.indexOf("?") >= 0 ? "&" : "?") + "nx=" + Date.now();
            const headers = { "User-Agent": "Nexium-Updater", "Cache-Control": "no-cache", "Pragma": "no-cache" };
            if (json) headers["Accept"] = "application/vnd.github+json";
            const req = https.get(bust, { headers }, (res) => {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    res.resume();
                    if (res.headers.location) return get(res.headers.location, json).then(finish);
                    return finish(null);
                }
                if (res.statusCode !== 200) { res.resume(); log("HTTP " + res.statusCode + " sur " + url.split("/").pop()); return finish(null); }
                const chunks = [];
                res.on("data", (d) => chunks.push(d));
                res.on("end", () => finish({ body: Buffer.concat(chunks) }));
                res.on("error", () => finish(null));
            });
            req.on("error", (e) => { log("erreur réseau: " + (e && e.message)); finish(null); });
            req.setTimeout(20000, () => { try { req.destroy(); } catch (_) {} log("timeout sur " + url.split("/").pop()); finish(null); });
        });

        (async () => {
            let sha = null;
            try {
                const r = await get(API, true);
                if (r && r.body) {
                    const arr = JSON.parse(r.body.toString("utf8"));
                    if (Array.isArray(arr) && arr[0] && arr[0].sha) sha = arr[0].sha;
                }
            } catch (_) {}

            if (sha && sha === state.appliedSha && !state.pendingSha) { log("à jour (sha " + sha.slice(0, 7) + ")"); return; }
            if (sha && sha === state.pendingSha) { log("mise à jour déjà téléchargée, en attente de redémarrage"); return; }

            let wrote = false;
            try {
                const r = await get(RAW + "renderer.js");
                if (r && r.body && r.body.length > 500000) {
                    const liveFile = path.join(equicordDir, "renderer.js");
                    let liveHash = null;
                    try { liveHash = sha256(fs.readFileSync(liveFile)); } catch (_) {}
                    const dlHash = sha256(r.body);
                    if (liveHash && dlHash && liveHash === dlHash) {
                        log("renderer identique au disque, rien à faire");
                        if (sha) { state.appliedSha = sha; saveState(state); }
                    } else {
                        let txt = r.body.toString("utf8");
                        if (sha) txt = txt.replace(/_NXUP\.APPLIED="[^"]*"/, '_NXUP.APPLIED="' + sha + '"');
                        const tmp = path.join(equicordDir, "renderer.js.pending.tmp");
                        fs.writeFileSync(tmp, txt);
                        fs.renameSync(tmp, path.join(equicordDir, "renderer.js.pending"));
                        state.pendingSha = sha || ("h:" + dlHash.slice(0, 12));
                        wrote = true;
                        log("TÉLÉCHARGÉ renderer.js (" + r.body.length + " octets) → pending");
                    }
                } else {
                    log("renderer.js non téléchargé (réseau ou taille)");
                }
            } catch (_) {}

            try {
                const r = await get(RAW + "renderer.css");
                if (r && r.body && r.body.length > 0) {
                    const liveCss = path.join(equicordDir, "renderer.css");
                    let lh = null; try { lh = sha256(fs.readFileSync(liveCss)); } catch (_) {}
                    const dh = sha256(r.body);
                    if (!(lh && dh && lh === dh)) {
                        const tmp = path.join(equicordDir, "renderer.css.pending.tmp");
                        fs.writeFileSync(tmp, r.body);
                        fs.renameSync(tmp, path.join(equicordDir, "renderer.css.pending"));
                        wrote = true;
                        log("TÉLÉCHARGÉ renderer.css → pending");
                    }
                }
            } catch (_) {}

            if (wrote) saveState(state);
        })();
    } catch (_) {}
})();

if (fs.existsSync(patcherJs)) {
    require(patcherJs);
} else if (fs.existsSync(desktopAsar)) {
    require(desktopAsar);
} else {
    throw new Error("NanoCord mod missing. Re-run pnpm repair:portable.");
}