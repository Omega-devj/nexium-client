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
// djb2 — MUST match _NXUP.hash in renderer.js exactly
function nxHash(s) { var h = 5381, a = 0, n = s.length; for (; a < n; a++) h = (((h << 5) + h) ^ s.charCodeAt(a)) | 0; return "raw" + (h >>> 0).toString(16); }
function appliedOf(file) { try { var t = fs.readFileSync(file, "utf8"); var m = t.match(/_NXUP\.APPLIED="([^"]*)"/); return m ? m[1] : null; } catch (_) { return null; } }

let state = loadState();

function loadPatcher() {
    if (fs.existsSync(patcherJs)) { require(patcherJs); }
    else if (fs.existsSync(desktopAsar)) { require(desktopAsar); }
    else { throw new Error("NanoCord mod missing. Re-run pnpm repair:portable."); }
}

// DEV MODE: if resources/equicord/.nexium-dev exists, DISABLE all auto-update so local edits persist for testing.
if (fs.existsSync(DEV)) {
    log("MODE DEV actif (.nexium-dev présent) — auto-update désactivé, tes modifications locales sont conservées.");
    loadPatcher();
    return;
}

// Synchronous download helper (curl, then PowerShell). Returns the file text, or null.
function syncDownload(name) {
    try {
        var cp = require("child_process");
        var tmp = path.join(equicordDir, name + ".sync.tmp");
        var url = RAW + name + "?nx=" + Date.now();
        try { if (fs.existsSync(tmp)) fs.unlinkSync(tmp); } catch (_) {}
        var ok = false;
        try {
            cp.execFileSync("curl", ["-fsSL", "--max-time", "20", "-H", "Cache-Control: no-cache", "-H", "Pragma: no-cache", "-o", tmp, url], { timeout: 24000, stdio: "ignore", windowsHide: true });
            ok = fs.existsSync(tmp);
        } catch (_) { ok = false; }
        if (!ok) {
            try {
                cp.execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Headers @{'Cache-Control'='no-cache'} -Uri '" + url + "' -OutFile '" + tmp + "'"], { timeout: 24000, stdio: "ignore", windowsHide: true });
                ok = fs.existsSync(tmp);
            } catch (_) { ok = false; }
        }
        if (!ok) return null;
        var txt = fs.readFileSync(tmp, "utf8");
        try { fs.unlinkSync(tmp); } catch (_) {}
        return txt;
    } catch (_) { return null; }
}

// Async fallback download (pure Node) for environments without curl/PowerShell.
function asyncFallback() {
    try {
        const bust = RAW + "renderer.js?nx=" + Date.now();
        const req = https.get(bust, { headers: { "User-Agent": "Nexium-Updater", "Cache-Control": "no-cache" } }, (res) => {
            if (res.statusCode !== 200) { res.resume(); log("fallback HTTP " + res.statusCode); return; }
            const chunks = []; res.on("data", d => chunks.push(d));
            res.on("end", () => {
                try {
                    const txt = Buffer.concat(chunks).toString("utf8");
                    if (txt.length < 500000) { log("fallback: taille insuffisante"); return; }
                    const H = nxHash(txt);
                    if (appliedOf(path.join(equicordDir, "renderer.js")) === H) { log("fallback: déjà à jour"); return; }
                    const stamped = txt.replace(/_NXUP\.APPLIED="[^"]*"/, '_NXUP.APPLIED="' + H + '"');
                    const pend = path.join(equicordDir, "renderer.js.pending");
                    fs.writeFileSync(pend + ".tmp", stamped); fs.renameSync(pend + ".tmp", pend);
                    state.pendingHash = H; saveState(state);
                    log("fallback: renderer téléchargé → sera appliqué au prochain démarrage [" + H + "]");
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
            if (size >= 500000) { fs.renameSync(pend, path.join(equicordDir, "renderer.js")); log("APPLIQUÉ (pending) renderer.js"); }
            else { fs.unlinkSync(pend); }
        }
    } catch (e) { log("applyPending: " + (e && e.message)); }
})();

// 2) Synchronous download + apply the latest renderer/css BEFORE loading the patcher (one restart = applied).
(function syncUpdate() {
    try {
        var live = path.join(equicordDir, "renderer.js");
        var liveH = appliedOf(live);
        var txt = syncDownload("renderer.js");
        if (txt == null || txt.length < 500000) {
            log("sync indisponible (curl/PowerShell KO) — repli asynchrone");
            asyncFallback();
            return;
        }
        var H = nxHash(txt);
        if (H === liveH) {
            log("à jour (" + H + ")");
        } else {
            var stamped = txt.replace(/_NXUP\.APPLIED="[^"]*"/, '_NXUP.APPLIED="' + H + '"');
            var w = live + ".newtmp";
            fs.writeFileSync(w, stamped); fs.renameSync(w, live);
            state.appliedHash = H; saveState(state);
            log("MIS À JOUR renderer.js au démarrage (" + H + ", avant=" + liveH + ")");
        }
        // CSS (optional)
        try {
            var ctxt = syncDownload("renderer.css");
            if (ctxt != null) {
                var CH = nxHash(ctxt);
                if (state.cssHash !== CH) { fs.writeFileSync(path.join(equicordDir, "renderer.css"), ctxt); state.cssHash = CH; saveState(state); log("MIS À JOUR renderer.css"); }
            }
        } catch (_) {}
    } catch (e) { log("syncUpdate exception: " + (e && e.message)); }
})();

loadPatcher();