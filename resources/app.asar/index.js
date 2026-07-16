const fs = require("fs");
const path = require("path");
const https = require("https");

const equicordDir = path.join(__dirname, "..", "equicord");
const desktopAsar = path.join(equicordDir, "desktop.asar");
const patcherJs = path.join(equicordDir, "patcher.js");
const STATE = path.join(equicordDir, ".nexium-update.json");
const LOG = path.join(equicordDir, ".nexium-update.log");
const DEV = path.join(equicordDir, ".nexium-dev");
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
// Version-based updates: the single source of truth is _NXUP.VERSION inside renderer.js.
// A plain integer, extracted identically here and in the renderer → no hashing, no stamping,
// no fetch-vs-curl fragility, and updates only trigger when the repo version is strictly higher.
function versionOfText(t) { try { var m = String(t).match(/_NXUP\.VERSION="(\d+)"/); return m ? parseInt(m[1], 10) : null; } catch (_) { return null; } }
function versionOfFile(f) { try { return versionOfText(fs.readFileSync(f, "utf8")); } catch (_) { return null; } }

let state = loadState();

function loadPatcher() {
    if (fs.existsSync(patcherJs)) { require(patcherJs); }
    else if (fs.existsSync(desktopAsar)) { require(desktopAsar); }
    else { throw new Error("NanoCord mod missing. Re-run pnpm repair:portable."); }
}

// DEV MODE: create resources/equicord/.nexium-dev to freeze the local renderer for testing.
if (fs.existsSync(DEV)) {
    log("MODE DEV actif (.nexium-dev présent) — auto-update désactivé, modifications locales conservées.");
    loadPatcher();
    return;
}

// Synchronous download (curl → PowerShell). Returns text or null.
function syncDownload(name) {
    try {
        var cp = require("child_process");
        var tmp = path.join(equicordDir, name + ".sync.tmp");
        var url = RAW + name + "?nx=" + Date.now();
        try { if (fs.existsSync(tmp)) fs.unlinkSync(tmp); } catch (_) {}
        var ok = false;
        try {
            cp.execFileSync("curl", ["-fsSL", "--max-time", "20", "-H", "Cache-Control: no-cache", "-o", tmp, url], { timeout: 24000, stdio: "ignore", windowsHide: true });
            ok = fs.existsSync(tmp) && fs.statSync(tmp).size > 0;
        } catch (_) { ok = false; }
        if (!ok) {
            try {
                cp.execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Headers @{'Cache-Control'='no-cache'} -Uri '" + url + "' -OutFile '" + tmp + "'"], { timeout: 24000, stdio: "ignore", windowsHide: true });
                ok = fs.existsSync(tmp) && fs.statSync(tmp).size > 0;
            } catch (_) { ok = false; }
        }
        if (!ok) return null;
        var txt = fs.readFileSync(tmp, "utf8");
        try { fs.unlinkSync(tmp); } catch (_) {}
        return txt;
    } catch (_) { return null; }
}

// Async fallback (pure Node https) → writes a .pending applied next launch.
function asyncFallback() {
    try {
        const bust = RAW + "renderer.js?nx=" + Date.now();
        const req = https.get(bust, { headers: { "User-Agent": "Nexium-Updater", "Cache-Control": "no-cache" } }, (res) => {
            if (res.statusCode !== 200) { res.resume(); log("fallback HTTP " + res.statusCode); return; }
            let d = ""; res.setEncoding("utf8"); res.on("data", c => d += c);
            res.on("end", () => {
                try {
                    if (d.length < 500000) { log("fallback: taille insuffisante"); return; }
                    const rv = versionOfText(d), lv = versionOfFile(path.join(equicordDir, "renderer.js"));
                    if (rv == null) { log("fallback: version repo introuvable"); return; }
                    if (lv != null && rv <= lv) { log("fallback: déjà à jour (v" + lv + ")"); return; }
                    const pend = path.join(equicordDir, "renderer.js.pending");
                    fs.writeFileSync(pend + ".tmp", d); fs.renameSync(pend + ".tmp", pend);
                    log("fallback: v" + rv + " téléchargée → appliquée au prochain démarrage");
                } catch (e) { log("fallback exception: " + (e && e.message)); }
            });
        });
        req.on("error", (e) => log("fallback réseau: " + (e && e.message)));
        req.setTimeout(25000, () => { try { req.destroy(); } catch (_) {} });
    } catch (_) {}
}

// 1) Apply any pending renderer from a previous async fallback (instant, before patcher).
(function applyPending() {
    try {
        var pend = path.join(equicordDir, "renderer.js.pending");
        if (fs.existsSync(pend)) {
            var size = fs.statSync(pend).size;
            if (size >= 500000) { fs.renameSync(pend, path.join(equicordDir, "renderer.js")); log("APPLIQUÉ (pending) renderer.js v" + versionOfFile(path.join(equicordDir, "renderer.js"))); }
            else { fs.unlinkSync(pend); }
        }
    } catch (e) { log("applyPending: " + (e && e.message)); }
})();

// 2) Synchronous version check + apply BEFORE loading the patcher (one restart = applied).
(function syncUpdate() {
    try {
        var live = path.join(equicordDir, "renderer.js");
        var liveV = versionOfFile(live);
        var txt = syncDownload("renderer.js");
        if (txt == null || txt.length < 500000) {
            log("sync indisponible (curl/PowerShell KO) — repli asynchrone");
            asyncFallback();
        } else {
            var repoV = versionOfText(txt);
            if (repoV == null) {
                log("version repo introuvable — aucune action");
            } else if (liveV != null && repoV <= liveV) {
                log("à jour (v" + liveV + ")");
            } else {
                var w = live + ".newtmp";
                fs.writeFileSync(w, txt); fs.renameSync(w, live);
                state.version = repoV; saveState(state);
                log("MIS À JOUR renderer.js v" + (liveV == null ? "?" : liveV) + " → v" + repoV);
            }
        }
        // CSS: simple length-based refresh (rarely changes, non-critical)
        try {
            var ctxt = syncDownload("renderer.css");
            if (ctxt != null && ctxt.length !== state.cssLen) {
                fs.writeFileSync(path.join(equicordDir, "renderer.css"), ctxt);
                state.cssLen = ctxt.length; saveState(state); log("MIS À JOUR renderer.css");
            }
        } catch (_) {}
    } catch (e) { log("syncUpdate exception: " + (e && e.message)); }
})();

loadPatcher();