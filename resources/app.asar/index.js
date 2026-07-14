const fs = require("fs");
const path = require("path");
const https = require("https");

const equicordDir = path.join(__dirname, "..", "equicord");
const desktopAsar = path.join(equicordDir, "desktop.asar");
const patcherJs = path.join(equicordDir, "patcher.js");

(function nexiumAutoUpdate() {
    try {
        const RAW = "https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/resources/equicord/";
        const STATE = path.join(equicordDir, ".nexium-update.json");
        const TARGETS = [
            { name: "renderer.js", min: 500000 },
            { name: "renderer.css", min: 0 }
        ];

        let state = {};
        try { state = JSON.parse(fs.readFileSync(STATE, "utf8")) || {}; } catch (_) { state = {}; }

        const get = (url, etag) => new Promise((resolve) => {
            let done = false;
            const finish = (v) => { if (!done) { done = true; resolve(v); } };
            const headers = { "User-Agent": "Nexium-Updater" };
            if (etag) headers["If-None-Match"] = etag;
            const req = https.get(url, { headers }, (res) => {
                if (res.statusCode === 304) { res.resume(); return finish({ notModified: true }); }
                if (res.statusCode === 301 || res.statusCode === 302) {
                    res.resume();
                    if (res.headers.location) return get(res.headers.location, etag).then(finish);
                    return finish(null);
                }
                if (res.statusCode !== 200) { res.resume(); return finish(null); }
                const chunks = [];
                res.on("data", (d) => chunks.push(d));
                res.on("end", () => finish({ body: Buffer.concat(chunks), etag: res.headers.etag || "" }));
                res.on("error", () => finish(null));
            });
            req.on("error", () => finish(null));
            req.setTimeout(15000, () => { try { req.destroy(); } catch (_) {} finish(null); });
        });

        (async () => {
            let changed = false;
            for (const t of TARGETS) {
                try {
                    const r = await get(RAW + t.name, state[t.name]);
                    if (!r || r.notModified) continue;
                    if (!r.body || r.body.length < t.min) continue;
                    const dest = path.join(equicordDir, t.name);
                    const tmp = dest + ".nxtmp";
                    fs.writeFileSync(tmp, r.body);
                    fs.renameSync(tmp, dest);
                    state[t.name] = r.etag;
                    changed = true;
                } catch (_) {}
            }
            if (changed) { try { fs.writeFileSync(STATE, JSON.stringify(state)); } catch (_) {} }
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
