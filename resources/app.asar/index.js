const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");

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
        var all = (prev + line).split("\n"); if (all.length > 60) all = all.slice(all.length - 60);
        fs.writeFileSync(LOG, all.join("\n"));
    } catch (_) {}
}
function sha256(x) { try { return crypto.createHash("sha256").update(x).digest("hex"); } catch (_) { return null; } }
function appliedOf(file) { try { var t = fs.readFileSync(file, "utf8"); var m = t.match(/_NXUP\.APPLIED="([^"]*)"/); return m ? m[1] : null; } catch (_) { return null; } }

let state = loadState();

(function applyPending() {
    try {
        var did = false;
        ["renderer.js", "renderer.css"].forEach(function (name) {
            var live = path.join(equicordDir, name); var pend = live + ".pending";
            if (fs.existsSync(pend)) {
                try {
                    var size = fs.statSync(pend).size;
                    if (name === "renderer.js" && size < 500000) { fs.unlinkSync(pend); log("pending " + name + " rejeté (taille " + size + ")"); return; }
                    fs.renameSync(pend, live); if (name === "renderer.js") did = true; log("APPLIQUÉ " + name + " (" + size + " o)");
                } catch (e) { try { fs.copyFileSync(pend, live); fs.unlinkSync(pend); if (name === "renderer.js") did = true; log("APPLIQUÉ " + name + " (copie)"); } catch (_) { log("échec application " + name); } }
            }
        });
        if (did && state.pendingSha) { state.appliedSha = state.pendingSha; delete state.pendingSha; saveState(state); }
    } catch (_) {}
})();

(function nexiumAutoUpdate() {
    try {
        const get = (url) => new Promise((resolve) => {
            let done = false; const finish = (v) => { if (!done) { done = true; resolve(v); } };
            const bust = url + (url.indexOf("?") >= 0 ? "&" : "?") + "nx=" + Date.now();
            const headers = { "User-Agent": "Nexium-Updater", "Cache-Control": "no-cache", "Pragma": "no-cache" };
            const req = https.get(bust, { headers }, (res) => {
                if (res.statusCode === 301 || res.statusCode === 302) { res.resume(); if (res.headers.location) return get(res.headers.location).then(finish); return finish(null); }
                if (res.statusCode !== 200) { res.resume(); log("HTTP " + res.statusCode + " sur " + url.split("/").pop()); return finish(null); }
                const chunks = []; res.on("data", (d) => chunks.push(d)); res.on("end", () => finish({ body: Buffer.concat(chunks) })); res.on("error", () => finish(null));
            });
            req.on("error", (e) => { log("erreur réseau: " + (e && e.message)); finish(null); });
            req.setTimeout(20000, () => { try { req.destroy(); } catch (_) {} log("timeout sur " + url.split("/").pop()); finish(null); });
        });

        (async () => {
            let wrote = false;
            try {
                const r = await get(RAW + "renderer.js");
                if (r && r.body && r.body.length > 500000) {
                    const txt = r.body.toString("utf8");
                    const H = sha256(txt);
                    const liveApplied = appliedOf(path.join(equicordDir, "renderer.js"));
                    if (H && liveApplied === H && !fs.existsSync(path.join(equicordDir, "renderer.js.pending"))) {
                        log("à jour (" + H.slice(0, 10) + ")");
                    } else if (H && state.pendingSha === H && fs.existsSync(path.join(equicordDir, "renderer.js.pending"))) {
                        log("mise à jour déjà téléchargée, en attente de redémarrage");
                    } else {
                        const stamped = txt.replace(/_NXUP\.APPLIED="[^"]*"/, '_NXUP.APPLIED="' + H + '"');
                        const tmp = path.join(equicordDir, "renderer.js.pending.tmp");
                        fs.writeFileSync(tmp, stamped);
                        fs.renameSync(tmp, path.join(equicordDir, "renderer.js.pending"));
                        state.pendingSha = H; wrote = true;
                        log("TÉLÉCHARGÉ renderer.js (" + r.body.length + " o) → pending");
                    }
                } else { log("renderer.js non téléchargé (réseau ou taille)"); }
            } catch (_) {}

            try {
                const r = await get(RAW + "renderer.css");
                if (r && r.body && r.body.length > 0) {
                    let lh = null; try { lh = sha256(fs.readFileSync(path.join(equicordDir, "renderer.css"))); } catch (_) {}
                    const dh = sha256(r.body);
                    if (!(lh && dh && lh === dh)) {
                        const tmp = path.join(equicordDir, "renderer.css.pending.tmp");
                        fs.writeFileSync(tmp, r.body); fs.renameSync(tmp, path.join(equicordDir, "renderer.css.pending"));
                        wrote = true; log("TÉLÉCHARGÉ renderer.css → pending");
                    }
                }
            } catch (_) {}

            if (wrote) saveState(state);
        })();
    } catch (_) {}
})();

if (fs.existsSync(patcherJs)) { require(patcherJs); }
else if (fs.existsSync(desktopAsar)) { require(desktopAsar); }
else { throw new Error("NanoCord mod missing. Re-run pnpm repair:portable."); }