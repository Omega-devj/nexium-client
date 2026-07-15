const fs = require("fs");
const path = require("path");
const https = require("https");

const equicordDir = path.join(__dirname, "..", "equicord");
const desktopAsar = path.join(equicordDir, "desktop.asar");
const patcherJs = path.join(equicordDir, "patcher.js");
const STATE = path.join(equicordDir, ".nexium-update.json");
const LOG = path.join(equicordDir, ".nexium-update.log");
const RAW = "https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/resources/equicord/";

function loadState() { try { return JSON.parse(fs.readFileSync(STATE, "utf8")) || {}; } catch (_) { return {}; } }
function saveState(s) { try { fs.writeFileSync(STATE, JSON.stringify(s)); } catch (_) {} }
function log(msg) {
    try {
        var line = "[" + new Date().toISOString() + "] " + msg + "\n";
        var prev = ""; try { prev = fs.readFileSync(LOG, "utf8"); } catch (_) {}
        var all = (prev + line).split("\n"); if (all.length > 80) all = all.slice(all.length - 80);
        fs.writeFileSync(LOG, all.join("\n"));
    } catch (_) {}
}
// djb2 — MUST match _NXUP.hash in renderer.js exactly
function nxHash(s) { var h = 5381, a = 0, n = s.length; for (; a < n; a++) h = (((h << 5) + h) ^ s.charCodeAt(a)) | 0; return "raw" + (h >>> 0).toString(16); }
function appliedOf(file) { try { var t = fs.readFileSync(file, "utf8"); var m = t.match(/_NXUP\.APPLIED="([^"]*)"/); return m ? m[1] : null; } catch (_) { return null; } }

let state = loadState();

// 1) Apply any pending update downloaded in a previous session (sync, before patcher loads)
(function applyPending() {
    try {
        var didRenderer = false;
        ["renderer.js", "renderer.css"].forEach(function (name) {
            var live = path.join(equicordDir, name);
            var pend = live + ".pending";
            if (!fs.existsSync(pend)) return;
            try {
                var size = fs.statSync(pend).size;
                if (name === "renderer.js" && size < 500000) { fs.unlinkSync(pend); log("pending " + name + " rejeté (taille " + size + ")"); return; }
                fs.renameSync(pend, live);
                if (name === "renderer.js") didRenderer = true;
                log("APPLIQUÉ " + name + " (" + size + " o)");
            } catch (e) {
                try { fs.copyFileSync(pend, live); fs.unlinkSync(pend); if (name === "renderer.js") didRenderer = true; log("APPLIQUÉ " + name + " (copie)"); }
                catch (_) { log("ÉCHEC application " + name + " : " + (e && e.message)); }
            }
        });
        if (didRenderer) { state.appliedHash = appliedOf(path.join(equicordDir, "renderer.js")); saveState(state); }
    } catch (e) { log("applyPending exception: " + (e && e.message)); }
})();

// 2) Download the latest version into .pending for next launch (async, cache-busted, no rate-limited API)
(function nexiumAutoUpdate() {
    try {
        const get = (url) => new Promise((resolve) => {
            let done = false; const finish = (v) => { if (!done) { done = true; resolve(v); } };
            const bust = url + (url.indexOf("?") >= 0 ? "&" : "?") + "nx=" + Date.now();
            const headers = { "User-Agent": "Nexium-Updater", "Cache-Control": "no-cache", "Pragma": "no-cache" };
            const req = https.get(bust, { headers }, (res) => {
                if (res.statusCode === 301 || res.statusCode === 302) { res.resume(); if (res.headers.location) return get(res.headers.location).then(finish); return finish(null); }
                if (res.statusCode !== 200) { res.resume(); log("HTTP " + res.statusCode + " sur " + url.split("/").pop().split("?")[0]); return finish(null); }
                const chunks = []; res.on("data", (d) => chunks.push(d)); res.on("end", () => finish({ body: Buffer.concat(chunks) })); res.on("error", () => finish(null));
            });
            req.on("error", (e) => { log("erreur réseau: " + (e && e.message)); finish(null); });
            req.setTimeout(25000, () => { try { req.destroy(); } catch (_) {} log("timeout sur " + url.split("/").pop().split("?")[0]); finish(null); });
        });

        (async () => {
            let wrote = false;
            try {
                const r = await get(RAW + "renderer.js");
                if (r && r.body && r.body.length > 500000) {
                    const txt = r.body.toString("utf8");
                    const H = nxHash(txt);
                    const live = appliedOf(path.join(equicordDir, "renderer.js"));
                    const pendPath = path.join(equicordDir, "renderer.js.pending");
                    if (live === H && !fs.existsSync(pendPath)) {
                        log("à jour (" + H + ")");
                    } else if (fs.existsSync(pendPath) && appliedOf(pendPath) === H) {
                        log("déjà téléchargé (" + H + "), en attente de redémarrage");
                    } else {
                        const stamped = txt.replace(/_NXUP\.APPLIED="[^"]*"/, '_NXUP.APPLIED="' + H + '"');
                        const tmp = pendPath + ".tmp";
                        fs.writeFileSync(tmp, stamped);
                        fs.renameSync(tmp, pendPath);
                        state.pendingHash = H; wrote = true;
                        log("TÉLÉCHARGÉ renderer.js (" + r.body.length + " o) → pending [" + H + "] (installé=" + live + ")");
                    }
                } else { log("renderer.js NON téléchargé (réseau ou taille insuffisante)"); }
            } catch (e) { log("dl renderer exception: " + (e && e.message)); }

            try {
                const r = await get(RAW + "renderer.css");
                if (r && r.body && r.body.length > 0) {
                    const H = nxHash(r.body.toString("utf8"));
                    if (state.cssHash !== H) {
                        const tmp = path.join(equicordDir, "renderer.css.pending.tmp");
                        fs.writeFileSync(tmp, r.body); fs.renameSync(tmp, path.join(equicordDir, "renderer.css.pending"));
                        state.cssHash = H; wrote = true; log("TÉLÉCHARGÉ renderer.css → pending");
                    }
                }
            } catch (_) {}

            if (wrote) saveState(state);
        })();
    } catch (e) { log("autoUpdate exception: " + (e && e.message)); }
})();

if (fs.existsSync(patcherJs)) { require(patcherJs); }
else if (fs.existsSync(desktopAsar)) { require(desktopAsar); }
else { throw new Error("NanoCord mod missing. Re-run pnpm repair:portable."); }