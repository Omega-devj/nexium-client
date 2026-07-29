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
function nxSum(s) { var h = 5381, a = 0, n = s.length; for (; a < n; a++) h = (((h << 5) + h) ^ s.charCodeAt(a)) | 0; return "nx" + (h >>> 0).toString(16) + "-" + n; }
// Strong validation: size, version marker, expected internal markers, and a clean tail.
function validRenderer(t) {
    try {
        if (typeof t !== "string" || t.length < 500000) return "taille insuffisante";
        if (versionOfText(t) == null) return "numéro de version absent";
        var reg = (t.match(/registrar:"NanoCord"/g) || []).length;
        if (reg < 10) return "marqueurs internes manquants (" + reg + ")";
        if (t.indexOf("_NXUP.checkRaw") < 0 || t.indexOf("_NXPR.scanUrl") < 0) return "modules Nexium absents";
        var tail = t.slice(-400);
        if (tail.indexOf(";") < 0 && tail.indexOf("}") < 0 && tail.indexOf(")") < 0) return "fin de fichier suspecte";
        return null;
    } catch (e) { return "validation impossible"; }
}

let state = loadState();

function loadPatcher() {
    if (fs.existsSync(patcherJs)) { require(patcherJs); }
    else if (fs.existsSync(desktopAsar)) { require(desktopAsar); }
    else { throw new Error("NanoCord mod missing. Re-run pnpm repair:portable."); }
}

// 0a) Manual recovery: create resources/equicord/.nexium-restore to roll back to the previous version.
(function restoreIfAsked() {
    try {
        var trigger = path.join(equicordDir, ".nexium-restore");
        if (!fs.existsSync(trigger)) return;
        var live = path.join(equicordDir, "renderer.js");
        var bak = path.join(equicordDir, "renderer.js.bak");
        var badV = versionOfFile(live);
        if (fs.existsSync(bak)) {
            var btxt = null; try { btxt = fs.readFileSync(bak, "utf8"); } catch (_) {}
            var why = validRenderer(btxt);
            if (!why) {
                fs.writeFileSync(live + ".newtmp", btxt); fs.renameSync(live + ".newtmp", live);
                    var okV = versionOfText(btxt); if (badV != null && badV !== okV) state.blockedVersion = badV;
                state.version = okV; saveState(state);
                log("RESTAURATION : retour à la v" + state.version + " (v" + badV + " bloquée)");
            } else { log("RESTAURATION impossible : sauvegarde invalide (" + why + ")"); }
        } else { log("RESTAURATION impossible : aucune sauvegarde (.bak) disponible"); }
        try { fs.unlinkSync(trigger); } catch (_) {}
    } catch (e) { log("restore exception: " + (e && e.message)); }
})();

// 0) Clean leftover temp files from an interrupted previous run.
(function cleanTemps() {
    try {
        var names = fs.readdirSync(equicordDir);
        var removed = 0;
        for (var a = 0; a < names.length; a++) {
            var n = names[a];
            if (/\.(sync\.tmp|newtmp|pending\.tmp)$/.test(n)) {
                try { fs.unlinkSync(path.join(equicordDir, n)); removed++; } catch (_) {}
            }
        }
        if (removed) log("nettoyage : " + removed + " fichier(s) temporaire(s) supprimé(s)");
    } catch (_) {}
})();

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
                    var fw = validRenderer(d); if (fw) { log("fallback refusé : " + fw); return; }
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
            var ptxt = null; try { ptxt = fs.readFileSync(pend, "utf8"); } catch (_) {}
            var pw = validRenderer(ptxt);
            if (!pw) {
                var liveP = path.join(equicordDir, "renderer.js");
                try { if (fs.existsSync(liveP)) fs.copyFileSync(liveP, path.join(equicordDir, "renderer.js.bak")); } catch (_) {}
                fs.renameSync(pend, liveP);
                log("APPLIQUÉ (pending) renderer.js v" + versionOfFile(liveP) + " (sauvegarde conservée)");
            } else { fs.unlinkSync(pend); log("pending refusé : " + pw); }
        }
    } catch (e) { log("applyPending: " + (e && e.message)); }
})();

// 2) Auto-repair + synchronous version check + apply BEFORE loading the patcher.
(function syncUpdate() {
    try {
        var live = path.join(equicordDir, "renderer.js");
        var bak = path.join(equicordDir, "renderer.js.bak");

        // Auto-repair: if the installed renderer is broken, restore the backup immediately.
        try {
            var liveTxt = null; try { liveTxt = fs.readFileSync(live, "utf8"); } catch (_) {}
            var badWhy = validRenderer(liveTxt);
            if (badWhy && fs.existsSync(bak)) {
                var btxt2 = fs.readFileSync(bak, "utf8");
                if (!validRenderer(btxt2)) {
                    fs.writeFileSync(live + ".newtmp", btxt2); fs.renameSync(live + ".newtmp", live);
                    var badV2 = versionOfText(liveTxt), okV2 = versionOfText(btxt2); if (badV2 != null && badV2 !== okV2) state.blockedVersion = badV2; state.version = okV2; saveState(state);
                    log("AUTO-RÉPARATION : fichier installé invalide (" + badWhy + ") → sauvegarde restaurée (v" + state.version + ")");
                }
            }
        } catch (_) {}

        var liveV = versionOfFile(live);
        var txt = syncDownload("renderer.js");
        if (txt == null) {
            log("sync indisponible (curl/PowerShell KO) — repli asynchrone");
            asyncFallback();
        } else {
            var why = validRenderer(txt);
            if (why) {
                log("TÉLÉCHARGEMENT REFUSÉ : " + why + " — fichier actuel conservé");
            } else {
                var repoV = versionOfText(txt);
                if (liveV != null && repoV <= liveV) {
                    log("à jour (v" + liveV + ")");
                    repoV = null; // rien à appliquer
                }
                var sumOk = true, sumInfo = "";
                if (repoV != null) {
                    // Checksum fetched only when an update is about to be applied.
                    try {
                        var pub = syncDownload("renderer.js.nxsum");
                        if (pub != null && /^nx[0-9a-f]+-\d+$/.test(pub.trim())) {
                            sumOk = (nxSum(txt) === pub.trim());
                            sumInfo = sumOk ? " (somme vérifiée)" : "";
                            if (!sumOk) log("SOMME DE CONTRÔLE INVALIDE : attendu " + pub.trim() + ", obtenu " + nxSum(txt));
                        }
                    } catch (_) {}
                }
                if (repoV == null) {
                    // déjà à jour, rien à faire
                } else if (!sumOk) {
                    log("TÉLÉCHARGEMENT REFUSÉ : somme de contrôle incorrecte — fichier actuel conservé");
                } else if (state.blockedVersion != null && repoV === state.blockedVersion) {
                    log("v" + repoV + " ignorée (bloquée après restauration) — publie une version supérieure pour débloquer");
                } else {
                    try { if (liveV != null) fs.copyFileSync(live, bak); } catch (_) {}
                    var w = live + ".newtmp";
                    fs.writeFileSync(w, txt); fs.renameSync(w, live);
                    state.version = repoV; if (state.blockedVersion != null && repoV > state.blockedVersion) delete state.blockedVersion;
                    saveState(state);
                    log("MIS À JOUR renderer.js v" + (liveV == null ? "?" : liveV) + " → v" + repoV + sumInfo + " (sauvegarde conservée)");
                }
            }
        }
        // CSS
        try {
            var ctxt = syncDownload("renderer.css");
            if (ctxt != null && ctxt.length > 0) {
                var cssPath = path.join(equicordDir, "renderer.css");
                var localCss = null; try { localCss = fs.readFileSync(cssPath, "utf8"); } catch (_) { localCss = null; }
                if (localCss !== ctxt) {
                    var ctmp = cssPath + ".newtmp";
                    fs.writeFileSync(ctmp, ctxt); fs.renameSync(ctmp, cssPath);
                    log("MIS À JOUR renderer.css");
                }
            }
        } catch (_) {}
    } catch (e) { log("syncUpdate exception: " + (e && e.message)); }
})();

loadPatcher();