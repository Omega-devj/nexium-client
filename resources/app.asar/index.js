const fs = require("fs");
const path = require("path");
const https = require("https");

const equicordDir = path.join(__dirname, "..", "equicord");
const desktopAsar = path.join(equicordDir, "desktop.asar");
const patcherJs = path.join(equicordDir, "patcher.js");

(function applyPending() {
    try {
        ["renderer.js", "renderer.css"].forEach(function (name) {
            var live = path.join(equicordDir, name);
            var pend = live + ".pending";
            if (fs.existsSync(pend)) {
                try {
                    var size = fs.statSync(pend).size;
                    if (name === "renderer.js" && size < 500000) { fs.unlinkSync(pend); return; }
                    fs.renameSync(pend, live);
                } catch (e) {
                    try { fs.copyFileSync(pend, live); fs.unlinkSync(pend); } catch (_) {}
                }
            }
        });
    } catch (_) {}
})();

(function nexiumAutoUpdate() {
    try {
        const RAW = "https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/resources/equicord/";
        const API = "https://api.github.com/repos/Omega-devj/nexium-client/commits?sha=main&per_page=1";
        const STATE = path.join(equicordDir, ".nexium-update.json");

        let state = {};
        try { state = JSON.parse(fs.readFileSync(STATE, "utf8")) || {}; } catch (_) { state = {}; }

        const get = (url, etag, json) => new Promise((resolve) => {
            let done = false;
            const finish = (v) => { if (!done) { done = true; resolve(v); } };
            const headers = { "User-Agent": "Nexium-Updater" };
            if (etag) headers["If-None-Match"] = etag;
            if (json) headers["Accept"] = "application/vnd.github+json";
            const req = https.get(url, { headers }, (res) => {
                if (res.statusCode === 304) { res.resume(); return finish({ notModified: true }); }
                if (res.statusCode === 301 || res.statusCode === 302) {
                    res.resume();
                    if (res.headers.location) return get(res.headers.location, etag, json).then(finish);
                    return finish(null);
                }
                if (res.statusCode !== 200) { res.resume(); return finish(null); }
                const chunks = [];
                res.on("data", (d) => chunks.push(d));
                res.on("end", () => finish({ body: Buffer.concat(chunks), etag: res.headers.etag || "" }));
                res.on("error", () => finish(null));
            });
            req.on("error", () => finish(null));
            req.setTimeout(20000, () => { try { req.destroy(); } catch (_) {} finish(null); });
        });

        (async () => {
            let sha = null;
            try {
                const r = await get(API, null, true);
                if (r && r.body) {
                    const arr = JSON.parse(r.body.toString("utf8"));
                    if (Array.isArray(arr) && arr[0] && arr[0].sha) sha = arr[0].sha;
                }
            } catch (_) {}
            if (!sha) return;

            let wrote = false;
            try {
                const r = await get(RAW + "renderer.js", state.rjs && state.rjs.etag);
                if (r && !r.notModified && r.body && r.body.length > 500000) {
                    let txt = r.body.toString("utf8");
                    txt = txt.replace(/_NXUP\.APPLIED="[^"]*"/, '_NXUP.APPLIED="' + sha + '"');
                    const tmp = path.join(equicordDir, "renderer.js.pending.tmp");
                    fs.writeFileSync(tmp, txt);
                    fs.renameSync(tmp, path.join(equicordDir, "renderer.js.pending"));
                    state.rjs = { etag: r.etag, sha: sha };
                    wrote = true;
                }
            } catch (_) {}

            try {
                const r = await get(RAW + "renderer.css", state.rcss && state.rcss.etag);
                if (r && !r.notModified && r.body && r.body.length > 0) {
                    const tmp = path.join(equicordDir, "renderer.css.pending.tmp");
                    fs.writeFileSync(tmp, r.body);
                    fs.renameSync(tmp, path.join(equicordDir, "renderer.css.pending"));
                    state.rcss = { etag: r.etag };
                    wrote = true;
                }
            } catch (_) {}

            if (wrote) { try { fs.writeFileSync(STATE, JSON.stringify(state)); } catch (_) {} }
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