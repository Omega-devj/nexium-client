// Processus principal : le patcher d Equicord 1.14.13.1, renomme NanoCord.
// Desobfusque depuis la version distribuee jusqu a la v204 ; comportement verifie
// identique a l original (trace des appels Electron au demarrage, 99 gestionnaires
// IPC, fenetre principale, preload). Source amont : github.com/Equicord/Equicord (GPL-3.0).

"use strict";

var Ji = Object.create;
var xt = Object.defineProperty;
var Ki = Object.getOwnPropertyDescriptor;
var Xi = Object.getOwnPropertyNames;
var Qi = Object.getPrototypeOf;
var ea = Object.prototype.hasOwnProperty;
var q = (p2, p3) => () => {
  if (p2) {
    p3 = p2((p2 = 0));
  }
  return p3;
};
var F = (p4, p5) => () => {
  if (!p5) {
    p4(
      (p5 = {
        exports: {},
      }).exports,
      p5,
    );
  }
  return p5.exports;
};
var O = (p6, p7) => {
  for (var v in p7) {
    xt(p6, v, {
      get: p7[v],
      enumerable: true,
    });
  }
};
var En = (p8, p9, p10, p11) => {
  if ((p9 && typeof p9 == "object") || typeof p9 == "function") {
    for (let v2 of Xi(p9)) {
      if (!ea.call(p8, v2) && v2 !== p10) {
        xt(p8, v2, {
          get: () => p9[v2],
          enumerable: !(p11 = Ki(p9, v2)) || p11.enumerable,
        });
      }
    }
  }
  return p8;
};
var Ee = (p12, p13, p14) => {
  p14 = p12 != null ? Ji(Qi(p12)) : {};
  return En(
    p13 || !p12 || !p12.__esModule
      ? xt(p14, "default", {
          value: p12,
          enumerable: true,
        })
      : p14,
    p12,
  );
};
var Et = (p15) =>
  En(
    xt({}, "__esModule", {
      value: true,
    }),
    p15,
  );
var w = q(() => {
  "use strict";
});
var Se = q(() => {
  "use strict";

  w();
});
var Qt;
var Sn;
var at;
var Tn = q(() => {
  "use strict";

  w();
  Qt = Symbol("SettingsStore.isProxy");
  Sn = Symbol("SettingsStore.getRawTarget");
  at = class {
    pathListeners = new Map();
    prefixListeners = new Map();
    globalListeners = new Set();
    proxyContexts = new WeakMap();
    proxyHandler = (() => {
      let e = this;
      return {
        get(r, s, n) {
          if (s === Qt) {
            return true;
          }
          if (s === Sn) {
            return r;
          }
          let i = Reflect.get(r, s, n);
          let o = e.proxyContexts.get(r);
          if (o == null) {
            return i;
          }
          let { root: c, path: p } = o;
          if (!(s in r) && e.getDefaultValue != null) {
            i = e.getDefaultValue({
              target: r,
              key: s,
              root: c,
              path: p,
            });
          }
          if (typeof i == "object" && i !== null && !i[Qt]) {
            let f = "" + p + (p && ".") + s;
            return e.makeProxy(i, c, f);
          }
          return i;
        },
        set(r, s, n) {
          if (n?.[Qt]) {
            n = n[Sn];
          }
          if (r[s] === n) {
            return true;
          }
          if (!Reflect.set(r, s, n)) {
            return false;
          }
          let i = e.proxyContexts.get(r);
          if (i == null) {
            return true;
          }
          let { root: o, path: c } = i;
          let p = "" + c + (c && ".") + s;
          e.notifyListeners(p, n, o);
          return true;
        },
        deleteProperty(r, s) {
          if (!Reflect.deleteProperty(r, s)) {
            return false;
          }
          let n = e.proxyContexts.get(r);
          if (n == null) {
            return true;
          }
          let { root: i, path: o } = n;
          let c = "" + o + (o && ".") + s;
          e.notifyListeners(c, undefined, i);
          return true;
        },
      };
    })();
    constructor(p16, p17 = {}) {
      this.plain = p16;
      this.store = this.makeProxy(p16);
      Object.assign(this, p17);
    }
    makeProxy(p18, p19 = p18, p20 = "") {
      this.proxyContexts.set(p18, {
        root: p19,
        path: p20,
      });
      return new Proxy(p18, this.proxyHandler);
    }
    notifyPrefixListeners(p21, p22, p23) {
      for (let v3 = 1; v3 <= p22.length; v3++) {
        let v4 = p22.slice(0, v3).join(".");
        this.prefixListeners.get(v4)?.forEach((p24) => p24(p23, p21));
      }
    }
    notifyListeners(p25, p26, p27) {
      let v5 = p25.split(".");
      if (v5.length > 3 && v5[0] === "plugins") {
        let v6 = v5.slice(0, 3);
        let v7 = v6.join(".");
        let v8 = v6.reduce((p28, p29) => p28[p29], p27);
        this.globalListeners.forEach((p30) => p30(p27, v7));
        this.pathListeners.get(v7)?.forEach((p31) => p31(v8));
      } else {
        this.globalListeners.forEach((p32) => p32(p27, p25));
      }
      this.pathListeners.get(p25)?.forEach((p33) => p33(p26));
      this.notifyPrefixListeners(p25, v5, p26);
    }
    setData(p34, p35) {
      if (this.readOnly) {
        throw new Error("SettingsStore is read-only");
      }
      this.plain = p34;
      this.store = this.makeProxy(p34);
      if (p35) {
        let vP34 = p34;
        let v9 = p35.split(".");
        for (let v10 of v9) {
          if (!vP34) {
            console.warn(
              "Settings#setData: Path " +
                p35 +
                " does not exist in new data. Not dispatching update",
            );
            return;
          }
          vP34 = vP34[v10];
        }
        this.pathListeners.get(p35)?.forEach((p36) => p36(vP34));
        this.notifyPrefixListeners(p35, v9, vP34);
      }
      this.markAsChanged();
    }
    addGlobalChangeListener(p37) {
      this.globalListeners.add(p37);
    }
    addChangeListener(p38, p39) {
      let v11 = this.pathListeners.get(p38) ?? new Set();
      v11.add(p39);
      this.pathListeners.set(p38, v11);
    }
    addPrefixChangeListener(p40, p41) {
      let v12 = this.prefixListeners.get(p40) ?? new Set();
      v12.add(p41);
      this.prefixListeners.set(p40, v12);
    }
    removeGlobalChangeListener(p42) {
      this.globalListeners.delete(p42);
    }
    removeChangeListener(p43, p44) {
      let v13 = this.pathListeners.get(p43);
      if (v13) {
        v13.delete(p44);
        if (!v13.size) {
          this.pathListeners.delete(p43);
        }
      }
    }
    removePrefixChangeListener(p45, p46) {
      let v14 = this.prefixListeners.get(p45);
      if (v14) {
        v14.delete(p46);
        if (!v14.size) {
          this.prefixListeners.delete(p45);
        }
      }
    }
    markAsChanged() {
      this.globalListeners.forEach((p47) => p47(this.plain, ""));
    }
  };
});
function er(p48, p49) {
  for (let v15 in p49) {
    let v16 = p49[v15];
    if (typeof v16 == "object" && !Array.isArray(v16)) {
      p48[v15] ??= {};
      er(p48[v15], v16);
    } else {
      p48[v15] ??= v16;
    }
  }
  return p48;
}
var In = q(() => {
  "use strict";

  w();
});
var Dn;
var ve;
var Cn;
var We;
var oe;
var X;
var He;
var tr;
var rr;
var Yl;
var Pn;
var St;
var Te = q(() => {
  "use strict";

  w();
  Dn = require("electron");
  ve = require("path");
  Cn = "";
  We =
    process.env.EQUICORD_USER_DATA_DIR ??
    (process.env.DISCORD_USER_DATA_DIR
      ? (0, ve.join)(process.env.DISCORD_USER_DATA_DIR, "..", "EquicordData", Cn)
      : (0, ve.join)(Dn.app.getPath("userData"), "..", "NanoCord", Cn));
  oe = (0, ve.join)(We, "settings");
  X = (0, ve.join)(We, "themes");
  He = (0, ve.join)(oe, "quickCss.css");
  tr = (0, ve.join)(oe, "settings.json");
  rr = (0, ve.join)(oe, "native-settings.json");
  Yl = (0, ve.join)(oe, "migration");
  Pn = [
    "https:",
    "http:",
    "steam:",
    "spotify:",
    "com.epicgames.launcher:",
    "tidal:",
    "itunes:",
    "vrcx:",
  ];
  St = process.argv.includes("--vanilla");
});
function Rn(p50, p51) {
  try {
    return JSON.parse((0, qe.readFileSync)(p51, "utf-8"));
  } catch (err) {
    if (err?.code !== "ENOENT") {
      console.error("Failed to read " + p50 + " settings", err);
    }
    return {};
  }
}
var Tt;
var qe;
var j;
var ta;
var An;
var z;
var le = q(() => {
  "use strict";

  w();
  Se();
  Tn();
  In();
  Tt = require("electron");
  qe = require("fs");
  Te();
  (0, qe.mkdirSync)(oe, {
    recursive: true,
  });
  j = new at(Rn("renderer", tr));
  j.addGlobalChangeListener(() => {
    try {
      (0, qe.writeFileSync)(tr, JSON.stringify(j.plain, null, 4));
    } catch (err) {
      console.error("Failed to write renderer settings", err);
    }
  });
  Tt.ipcMain.handle("VencordGetSettingsDir", () => oe);
  Tt.ipcMain.on("VencordGetSettings", (p52) => (p52.returnValue = j.plain));
  Tt.ipcMain.handle("VencordSetSettings", (p53, p54, p55) => {
    j.setData(p54, p55);
  });
  ta = {
    plugins: {},
    customCspRules: {},
  };
  An = Rn("native", rr);
  er(An, ta);
  z = new at(An);
  z.addGlobalChangeListener(() => {
    try {
      (0, qe.writeFileSync)(rr, JSON.stringify(z.plain, null, 4));
    } catch (err) {
      console.error("Failed to write native settings", err);
    }
  });
});
var ct;
var ir = q(() => {
  w();
  ct = "NanoCord/NanoCord";
});
function ut(p56) {
  return async function () {
    try {
      return {
        ok: true,
        value: await p56(...arguments),
      };
    } catch (err) {
      return {
        ok: false,
        error:
          err instanceof Error
            ? {
                ...err,
                message: err.message,
                name: err.name,
                stack: err.stack,
              }
            : err,
      };
    }
  };
}
var ar = q(() => {
  "use strict";

  w();
});
var ha = {};
function Ye(...args) {
  let v17 = {
    cwd: ia,
  };
  if (lr) {
    return or("flatpak-spawn", ["--host", "git", ...args], v17);
  } else {
    return or("git", args, v17);
  }
}
async function oa() {
  return (await Ye("remote", "get-url", "origin")).stdout
    .trim()
    .replace(/git@(.+):/, "https://$1/")
    .replace(/\.git$/, "");
}
async function la() {
  await Ye("fetch");
  let v18 = (await Ye("branch", "--show-current")).stdout.trim();
  if (!((await Ye("ls-remote", "origin", v18)).stdout.length > 0)) {
    return [];
  }
  let v19 = (await Ye("log", "HEAD...origin/" + v18, "--pretty=format:%an/%h/%s")).stdout.trim();
  if (v19) {
    return v19.split("\n").map((p57) => {
      let [v20, v21, ...v] = p57.split("/");
      return {
        hash: v21,
        author: v20,
        message: v.join("/").split("\n")[0],
      };
    });
  } else {
    return [];
  }
}
async function ca() {
  return (await Ye("pull")).stdout.includes("Fast-forward");
}
async function ua() {
  return !(
    await or(
      lr ? "flatpak-spawn" : "node",
      lr ? ["--host", "node", "scripts/build/build.mjs"] : ["scripts/build/build.mjs"],
      {
        cwd: aa,
      },
    )
  ).stderr.includes("Build failed");
}
var Ln;
var ht;
var cr;
var On;
var ia;
var aa;
var or;
var lr;
var qn = q(() => {
  "use strict";

  w();
  Se();
  Ln = require("child_process");
  ht = require("electron");
  cr = require("path");
  On = require("util");
  ar();
  ia = (0, cr.join)(__dirname, "..");
  aa = (0, cr.join)(__dirname, "../../");
  or = (0, On.promisify)(Ln.execFile);
  lr = false;
  ht.ipcMain.handle("VencordGetRepo", ut(oa));
  ht.ipcMain.handle("VencordGetUpdates", ut(la));
  ht.ipcMain.handle("VencordUpdate", ut(ca));
  ht.ipcMain.handle("VencordBuild", ut(ua));
});
var ur;
var $n = q(() => {
  w();
  ur = "nanocord-local";
});
var Fn;
var jn;
var Ic;
var hr = q(() => {
  "use strict";

  w();
  $n();
  ir();
  Fn = ur.slice(0, 7);
  jn = "NanoCord/" + ur + (ct ? " (https://github.com/" + ct + ")" : "");
  Ic = "NanoCord" + (ct ? " (https://github.com/" + ct + ")" : "");
});
var et = F((p58) => {
  w();
  (function () {
    this.Event = class {
      constructor(p59, p60) {
        this.start_mark = p59;
        this.end_mark = p60;
      }
    };
    this.NodeEvent = class extends this.Event {
      constructor(p61, p62, p63) {
        super(p62, p63);
        this.anchor = p61;
      }
    };
    this.CollectionStartEvent = class extends this.NodeEvent {
      constructor(p64, p65, p66, p67, p68, p69) {
        super(p64, p67, p68);
        this.tag = p65;
        this.implicit = p66;
        this.flow_style = p69;
      }
    };
    this.CollectionEndEvent = class extends this.Event {};
    this.StreamStartEvent = class extends this.Event {
      constructor(p70, p71, p72) {
        super(p70, p71);
        this.encoding = p72;
      }
    };
    this.StreamEndEvent = class extends this.Event {};
    this.DocumentStartEvent = class extends this.Event {
      constructor(p73, p74, p75, p76, p77) {
        super(p73, p74);
        this.explicit = p75;
        this.version = p76;
        this.tags = p77;
      }
    };
    this.DocumentEndEvent = class extends this.Event {
      constructor(p78, p79, p80) {
        super(p78, p79);
        this.explicit = p80;
      }
    };
    this.AliasEvent = class extends this.NodeEvent {};
    this.ScalarEvent = class extends this.NodeEvent {
      constructor(p81, p82, p83, p84, p85, p86, p87) {
        super(p81, p85, p86);
        this.tag = p82;
        this.implicit = p83;
        this.value = p84;
        this.style = p87;
      }
    };
    this.SequenceStartEvent = class extends this.CollectionStartEvent {};
    this.SequenceEndEvent = class extends this.CollectionEndEvent {};
    this.MappingStartEvent = class extends this.CollectionStartEvent {};
    this.MappingEndEvent = class extends this.CollectionEndEvent {};
  }).call(p58);
});
var he = F((p88) => {
  w();
  (function () {
    var v22 = [].indexOf;
    this.Mark = class {
      constructor(p89, p90, p91, p92) {
        this.line = p89;
        this.column = p90;
        this.buffer = p91;
        this.pointer = p92;
      }
      get_snippet(p93 = 4, p94 = 75) {
        var v23;
        var v24;
        var v25;
        var v26;
        var v27;
        var v28;
        var v29;
        if (this.buffer == null) {
          return null;
        }
        v23 = "\0\r\n\u2028\u2029";
        v25 = "";
        v28 = this.pointer;
        while (v28 > 0 && ((v26 = this.buffer[v28 - 1]), v22.call(v23, v26) < 0)) {
          v28--;
          if (this.pointer - v28 > p94 / 2 - 1) {
            v25 = " ... ";
            v28 += 5;
            break;
          }
        }
        v29 = "";
        v24 = this.pointer;
        while (v24 < this.buffer.length && ((v27 = this.buffer[v24]), v22.call(v23, v27) < 0)) {
          v24++;
          if (v24 - this.pointer > p94 / 2 - 1) {
            v29 = " ... ";
            v24 -= 5;
            break;
          }
        }
        return (
          "" +
          new Array(p93).join(" ") +
          v25 +
          this.buffer.slice(v28, v24) +
          v29 +
          "\n" +
          new Array(p93 + this.pointer - v28 + v25.length).join(" ") +
          "^"
        );
      }
      toString() {
        var v30;
        var v31;
        v30 = this.get_snippet();
        v31 = "  on line " + (this.line + 1) + ", column " + (this.column + 1);
        if (v30) {
          return v31;
        } else {
          return v31 + ":\n" + v30;
        }
      }
    };
    this.YAMLError = class extends Error {
      constructor(p95) {
        super(p95);
        Object.defineProperty(this, "stack", {
          get: function () {
            return this.toString() + "\n" + new Error().stack.split("\n").slice(1).join("\n");
          },
        });
      }
      toString() {
        return this.message;
      }
    };
    this.MarkedYAMLError = class extends this.YAMLError {
      constructor(p96, p97, p98, p99, p100) {
        super();
        this.context = p96;
        this.context_mark = p97;
        this.problem = p98;
        this.problem_mark = p99;
        this.note = p100;
      }
      toString() {
        var v32;
        v32 = [];
        if (this.context != null) {
          v32.push(this.context);
        }
        if (
          this.context_mark != null &&
          (this.problem == null ||
            this.problem_mark == null ||
            this.context_mark.line !== this.problem_mark.line ||
            this.context_mark.column !== this.problem_mark.column)
        ) {
          v32.push(this.context_mark.toString());
        }
        if (this.problem != null) {
          v32.push(this.problem);
        }
        if (this.problem_mark != null) {
          v32.push(this.problem_mark.toString());
        }
        if (this.note != null) {
          v32.push(this.note);
        }
        return v32.join("\n");
      }
    };
  }).call(p88);
});
var Fe = F((p101) => {
  w();
  (function () {
    var v33;
    v33 = 0;
    this.Node = class {
      constructor(p102, p103, p104, p105) {
        this.tag = p102;
        this.value = p103;
        this.start_mark = p104;
        this.end_mark = p105;
        this.unique_id = "node_" + v33++;
      }
    };
    this.ScalarNode = function () {
      class C extends this.Node {
        constructor(p106, p107, p108, p109, p110) {
          super(p106, p107, p108, p109);
          this.style = p110;
        }
      }
      C.prototype.id = "scalar";
      return C;
    }.call(this);
    this.CollectionNode = class extends this.Node {
      constructor(p111, p112, p113, p114, p115) {
        super(p111, p112, p113, p114);
        this.flow_style = p115;
      }
    };
    this.SequenceNode = function () {
      class C2 extends this.CollectionNode {}
      C2.prototype.id = "sequence";
      return C2;
    }.call(this);
    this.MappingNode = function () {
      class C3 extends this.CollectionNode {}
      C3.prototype.id = "mapping";
      return C3;
    }.call(this);
  }).call(p101);
});
var Vr = F((p116) => {
  w();
  (function () {
    var v34;
    var v35;
    var v36;
    v35 = et();
    ({ MarkedYAMLError: v34 } = he());
    v36 = Fe();
    this.ComposerError = class extends v34 {};
    this.Composer = function () {
      var v37;
      class C4 {
        constructor() {
          return v37.apply(this, arguments);
        }
        initialise() {
          return (this.anchors = {});
        }
        check_node() {
          if (this.check_event(v35.StreamStartEvent)) {
            this.get_event();
          }
          return !this.check_event(v35.StreamEndEvent);
        }
        get_node() {
          if (!this.check_event(v35.StreamEndEvent)) {
            return this.compose_document();
          }
        }
        get_single_node() {
          var v38;
          var v39;
          this.get_event();
          v38 = null;
          if (!this.check_event(v35.StreamEndEvent)) {
            v38 = this.compose_document();
          }
          if (!this.check_event(v35.StreamEndEvent)) {
            v39 = this.get_event();
            throw new p116.ComposerError(
              "expected a single document in the stream",
              v38.start_mark,
              "but found another document",
              v39.start_mark,
            );
          }
          this.get_event();
          return v38;
        }
        compose_document() {
          var v40;
          this.get_event();
          v40 = this.compose_node();
          this.get_event();
          this.anchors = {};
          return v40;
        }
        compose_node(p117, p118) {
          var v41;
          var v42;
          var v43;
          if (this.check_event(v35.AliasEvent)) {
            v42 = this.get_event();
            v41 = v42.anchor;
            if (!(v41 in this.anchors)) {
              throw new p116.ComposerError(
                null,
                null,
                "found undefined alias " + v41,
                v42.start_mark,
              );
            }
            return this.anchors[v41];
          }
          v42 = this.peek_event();
          v41 = v42.anchor;
          if (v41 !== null && v41 in this.anchors) {
            throw new p116.ComposerError(
              "found duplicate anchor " + v41 + "; first occurence",
              this.anchors[v41].start_mark,
              "second occurrence",
              v42.start_mark,
            );
          }
          this.descend_resolver(p117, p118);
          if (this.check_event(v35.ScalarEvent)) {
            v43 = this.compose_scalar_node(v41);
          } else if (this.check_event(v35.SequenceStartEvent)) {
            v43 = this.compose_sequence_node(v41);
          } else if (this.check_event(v35.MappingStartEvent)) {
            v43 = this.compose_mapping_node(v41);
          }
          this.ascend_resolver();
          return v43;
        }
        compose_scalar_node(p119) {
          var v44;
          var v45;
          var v46;
          v44 = this.get_event();
          v46 = v44.tag;
          if (v46 === null || v46 === "!") {
            v46 = this.resolve(v36.ScalarNode, v44.value, v44.implicit);
          }
          v45 = new v36.ScalarNode(v46, v44.value, v44.start_mark, v44.end_mark, v44.style);
          if (p119 !== null) {
            this.anchors[p119] = v45;
          }
          return v45;
        }
        compose_sequence_node(p120) {
          var v47;
          var v48;
          var v49;
          var v50;
          var v51;
          v50 = this.get_event();
          v51 = v50.tag;
          if (v51 === null || v51 === "!") {
            v51 = this.resolve(v36.SequenceNode, null, v50.implicit);
          }
          v49 = new v36.SequenceNode(v51, [], v50.start_mark, null, v50.flow_style);
          if (p120 !== null) {
            this.anchors[p120] = v49;
          }
          v48 = 0;
          while (!this.check_event(v35.SequenceEndEvent)) {
            v49.value.push(this.compose_node(v49, v48));
            v48++;
          }
          v47 = this.get_event();
          v49.end_mark = v47.end_mark;
          return v49;
        }
        compose_mapping_node(p121) {
          var v52;
          var v53;
          var v54;
          var v55;
          var v56;
          var v57;
          v56 = this.get_event();
          v57 = v56.tag;
          if (v57 === null || v57 === "!") {
            v57 = this.resolve(v36.MappingNode, null, v56.implicit);
          }
          v55 = new v36.MappingNode(v57, [], v56.start_mark, null, v56.flow_style);
          if (p121 !== null) {
            this.anchors[p121] = v55;
          }
          while (!this.check_event(v35.MappingEndEvent)) {
            v53 = this.compose_node(v55);
            v54 = this.compose_node(v55, v53);
            v55.value.push([v53, v54]);
          }
          v52 = this.get_event();
          v55.end_mark = v52.end_mark;
          return v55;
        }
      }
      v37 = C4.prototype.initialise;
      return C4;
    }.call(this);
  }).call(p116);
});
var we = F((p122) => {
  w();
  (function () {
    var v58;
    var v59 = {}.hasOwnProperty;
    this.StringStream = class {
      constructor() {
        this.string = "";
      }
      write(p123) {
        return (this.string += p123);
      }
    };
    this.clone = (p124) => Object.assign({}, p124);
    this.extend = function (p125, ...args) {
      var v60;
      var v61;
      var v62;
      var v63;
      var v64;
      var v65;
      var v66;
      v60 = 0;
      v62 = args.length;
      for (; v60 < v62; v60++) {
        for (v66 = args[v60]; v66 !== Object.prototype; ) {
          v65 = Object.getOwnPropertyNames(v66);
          v61 = 0;
          v63 = v65.length;
          for (; v61 < v63; v61++) {
            v64 = v65[v61];
            if (p125[v64] == null) {
              p125[v64] = v66[v64];
            }
          }
          v66 = Object.getPrototypeOf(v66);
        }
      }
      return p125;
    };
    this.is_empty = function (p126) {
      var v67;
      if (Array.isArray(p126) || typeof p126 == "string") {
        return p126.length === 0;
      }
      for (v67 in p126) {
        if (v59.call(p126, v67)) {
          return false;
        }
      }
      return true;
    };
    this.inspect =
      ((v58 = require("util")) != null ? v58.inspect : undefined) ??
      global.inspect ??
      function (p127) {
        return "" + p127;
      };
    this.pad_left = function (p128, p129, p130) {
      p128 = String(p128);
      if (p128.length >= p130) {
        return p128;
      } else if (p128.length + 1 === p130) {
        return "" + p129 + p128;
      } else {
        return "" + new Array(p130 - p128.length + 1).join(p129) + p128;
      }
    };
    this.to_hex = function (p131) {
      if (typeof p131 == "string") {
        p131 = p131.charCodeAt(0);
      }
      return p131.toString(16);
    };
  }).call(p122);
});
var Br = F((p132) => {
  w();
  (function () {
    var v68;
    var v69;
    var v70;
    var v71 = [].indexOf;
    ({ MarkedYAMLError: v68 } = he());
    v69 = Fe();
    v70 = we();
    this.ConstructorError = class extends v68 {};
    this.BaseConstructor = function () {
      var v72;
      class C5 {
        constructor() {
          return v72.apply(this, arguments);
        }
        static add_constructor(p133, p134) {
          if (!this.prototype.hasOwnProperty("yaml_constructors")) {
            this.prototype.yaml_constructors = v70.extend({}, this.prototype.yaml_constructors);
          }
          return (this.prototype.yaml_constructors[p133] = p134);
        }
        static add_multi_constructor(p135, p136) {
          if (!this.prototype.hasOwnProperty("yaml_multi_constructors")) {
            this.prototype.yaml_multi_constructors = v70.extend(
              {},
              this.prototype.yaml_multi_constructors,
            );
          }
          return (this.prototype.yaml_multi_constructors[p135] = p136);
        }
        initialise() {
          this.constructed_objects = {};
          this.constructing_nodes = [];
          return (this.deferred_constructors = []);
        }
        check_data() {
          return this.check_node();
        }
        get_data() {
          if (this.check_node()) {
            return this.construct_document(this.get_node());
          }
        }
        get_single_data() {
          var v73;
          v73 = this.get_single_node();
          if (v73 != null) {
            return this.construct_document(v73);
          } else {
            return null;
          }
        }
        construct_document(p137) {
          var v74;
          for (v74 = this.construct_object(p137); !v70.is_empty(this.deferred_constructors); ) {
            this.deferred_constructors.pop()();
          }
          return v74;
        }
        defer(p138) {
          return this.deferred_constructors.push(p138);
        }
        construct_object(p139) {
          var v75;
          var v76;
          var v77;
          var v78;
          var v79;
          if (p139.unique_id in this.constructed_objects) {
            return this.constructed_objects[p139.unique_id];
          }
          v77 = p139.unique_id;
          if (v71.call(this.constructing_nodes, v77) >= 0) {
            throw new p132.ConstructorError(
              null,
              null,
              "found unconstructable recursive node",
              p139.start_mark,
            );
          }
          this.constructing_nodes.push(p139.unique_id);
          v75 = null;
          v79 = null;
          if (p139.tag in this.yaml_constructors) {
            v75 = this.yaml_constructors[p139.tag];
          } else {
            for (v78 in this.yaml_multi_constructors) {
              if (p139.tag.indexOf(v78 === 0)) {
                v79 = p139.tag.slice(v78.length);
                v75 = this.yaml_multi_constructors[v78];
                break;
              }
            }
            if (v75 == null) {
              if (null in this.yaml_multi_constructors) {
                v79 = p139.tag;
                v75 = this.yaml_multi_constructors[null];
              } else if (null in this.yaml_constructors) {
                v75 = this.yaml_constructors[null];
              } else if (p139 instanceof v69.ScalarNode) {
                v75 = this.construct_scalar;
              } else if (p139 instanceof v69.SequenceNode) {
                v75 = this.construct_sequence;
              } else if (p139 instanceof v69.MappingNode) {
                v75 = this.construct_mapping;
              }
            }
          }
          v76 = v75.call(this, v79 ?? p139, p139);
          this.constructed_objects[p139.unique_id] = v76;
          this.constructing_nodes.pop();
          return v76;
        }
        construct_scalar(p140) {
          if (!(p140 instanceof v69.ScalarNode)) {
            throw new p132.ConstructorError(
              null,
              null,
              "expected a scalar node but found " + p140.id,
              p140.start_mark,
            );
          }
          return p140.value;
        }
        construct_sequence(p141) {
          var v80;
          var v81;
          var v82;
          var v83;
          var v84;
          if (!(p141 instanceof v69.SequenceNode)) {
            throw new p132.ConstructorError(
              null,
              null,
              "expected a sequence node but found " + p141.id,
              p141.start_mark,
            );
          }
          v83 = p141.value;
          v84 = [];
          v81 = 0;
          v82 = v83.length;
          for (; v81 < v82; v81++) {
            v80 = v83[v81];
            v84.push(this.construct_object(v80));
          }
          return v84;
        }
        construct_mapping(p142) {
          var v85;
          var v86;
          var v87;
          var v88;
          var v89;
          var v90;
          var v91;
          var v92;
          if (!(p142 instanceof v69.MappingNode)) {
            throw new ConstructorError(
              null,
              null,
              "expected a mapping node but found " + p142.id,
              p142.start_mark,
            );
          }
          v89 = {};
          v90 = p142.value;
          v85 = 0;
          v88 = v90.length;
          for (; v85 < v88; v85++) {
            [v87, v92] = v90[v85];
            v86 = this.construct_object(v87);
            if (typeof v86 == "object") {
              throw new p132.ConstructorError(
                "while constructing a mapping",
                p142.start_mark,
                "found unhashable key",
                v87.start_mark,
              );
            }
            v91 = this.construct_object(v92);
            v89[v86] = v91;
          }
          return v89;
        }
        construct_pairs(p143) {
          var v93;
          var v94;
          var v95;
          var v96;
          var v97;
          var v98;
          var v99;
          var v100;
          if (!(p143 instanceof v69.MappingNode)) {
            throw new p132.ConstructorError(
              null,
              null,
              "expected a mapping node but found " + p143.id,
              p143.start_mark,
            );
          }
          v97 = [];
          v98 = p143.value;
          v93 = 0;
          v96 = v98.length;
          for (; v93 < v96; v93++) {
            [v95, v100] = v98[v93];
            v94 = this.construct_object(v95);
            v99 = this.construct_object(v100);
            v97.push([v94, v99]);
          }
          return v97;
        }
      }
      C5.prototype.yaml_constructors = {};
      C5.prototype.yaml_multi_constructors = {};
      v72 = C5.prototype.initialise;
      return C5;
    }.call(this);
    this.Constructor = function () {
      var v101;
      var v102;
      var v103;
      class C6 extends this.BaseConstructor {
        construct_scalar(p144) {
          var v104;
          var v105;
          var v106;
          var v107;
          var v108;
          if (p144 instanceof v69.MappingNode) {
            v107 = p144.value;
            v104 = 0;
            v106 = v107.length;
            for (; v104 < v106; v104++) {
              [v105, v108] = v107[v104];
              if (v105.tag === "tag:yaml.org,2002:value") {
                return this.construct_scalar(v108);
              }
            }
          }
          return super.construct_scalar(p144);
        }
        flatten_mapping(p145) {
          var v109;
          var v110;
          var v111;
          var v112;
          var v113;
          var v114;
          var v115;
          var v116;
          var v117;
          var v118;
          var v119;
          var v120;
          v115 = [];
          v110 = 0;
          while (v110 < p145.value.length) {
            [v112, v120] = p145.value[v110];
            if (v112.tag === "tag:yaml.org,2002:merge") {
              p145.value.splice(v110, 1);
              if (v120 instanceof v69.MappingNode) {
                this.flatten_mapping(v120);
                v115 = v115.concat(v120.value);
              } else if (v120 instanceof v69.SequenceNode) {
                v117 = [];
                v116 = v120.value;
                v109 = 0;
                v113 = v116.length;
                for (; v109 < v113; v109++) {
                  v118 = v116[v109];
                  if (!(v118 instanceof v69.MappingNode)) {
                    throw new p132.ConstructorError(
                      "while constructing a mapping",
                      p145.start_mark,
                      "expected a mapping for merging, but found " + v118.id,
                      v118.start_mark,
                    );
                  }
                  this.flatten_mapping(v118);
                  v117.push(v118.value);
                }
                v117.reverse();
                v111 = 0;
                v114 = v117.length;
                for (; v111 < v114; v111++) {
                  v119 = v117[v111];
                  v115 = v115.concat(v119);
                }
              } else {
                throw new p132.ConstructorError(
                  "while constructing a mapping",
                  p145.start_mark,
                  "expected a mapping or list of mappings for merging but found " + v120.id,
                  v120.start_mark,
                );
              }
            } else {
              if (v112.tag === "tag:yaml.org,2002:value") {
                v112.tag = "tag:yaml.org,2002:str";
              }
              v110++;
            }
          }
          if (v115.length) {
            return (p145.value = v115.concat(p145.value));
          }
        }
        construct_mapping(p146) {
          if (p146 instanceof v69.MappingNode) {
            this.flatten_mapping(p146);
          }
          return super.construct_mapping(p146);
        }
        construct_yaml_null(p147) {
          this.construct_scalar(p147);
          return null;
        }
        construct_yaml_bool(p148) {
          var v121;
          v121 = this.construct_scalar(p148);
          return v101[v121.toLowerCase()];
        }
        construct_yaml_int(p149) {
          var v122;
          var v123;
          var v124;
          var v125;
          var v126;
          var v127;
          var v128;
          var v129;
          var v130;
          v130 = this.construct_scalar(p149);
          v130 = v130.replace(/_/g, "");
          v129 = v130[0] === "-" ? -1 : 1;
          v128 = v130[0];
          if (v71.call("+-", v128) >= 0) {
            v130 = v130.slice(1);
          }
          if (v130 === "0") {
            return 0;
          }
          if (v130.indexOf("0b") === 0) {
            return v129 * parseInt(v130.slice(2), 2);
          }
          if (v130.indexOf("0x") === 0) {
            return v129 * parseInt(v130.slice(2), 16);
          }
          if (v130.indexOf("0o") === 0) {
            return v129 * parseInt(v130.slice(2), 8);
          }
          if (v130[0] === "0") {
            return v129 * parseInt(v130, 8);
          }
          if (v71.call(v130, ":") >= 0) {
            v124 = (function () {
              var v131;
              var v132;
              var v133;
              var v134;
              v133 = v130.split(/:/g);
              v134 = [];
              v131 = 0;
              v132 = v133.length;
              for (; v131 < v132; v131++) {
                v127 = v133[v131];
                v134.push(parseInt(v127));
              }
              return v134;
            })();
            v124.reverse();
            v122 = 1;
            v130 = 0;
            v125 = 0;
            v126 = v124.length;
            for (; v125 < v126; v125++) {
              v123 = v124[v125];
              v130 += v123 * v122;
              v122 *= 60;
            }
            return v129 * v130;
          } else {
            return v129 * parseInt(v130);
          }
        }
        construct_yaml_float(p150) {
          var v135;
          var v136;
          var v137;
          var v138;
          var v139;
          var v140;
          var v141;
          var v142;
          var v143;
          v143 = this.construct_scalar(p150);
          v143 = v143.replace(/_/g, "").toLowerCase();
          v142 = v143[0] === "-" ? -1 : 1;
          v141 = v143[0];
          if (v71.call("+-", v141) >= 0) {
            v143 = v143.slice(1);
          }
          if (v143 === ".inf") {
            return v142 * Infinity;
          }
          if (v143 === ".nan") {
            return NaN;
          }
          if (v71.call(v143, ":") >= 0) {
            v137 = (function () {
              var v144;
              var v145;
              var v146;
              var v147;
              v146 = v143.split(/:/g);
              v147 = [];
              v144 = 0;
              v145 = v146.length;
              for (; v144 < v145; v144++) {
                v140 = v146[v144];
                v147.push(parseFloat(v140));
              }
              return v147;
            })();
            v137.reverse();
            v135 = 1;
            v143 = 0;
            v138 = 0;
            v139 = v137.length;
            for (; v138 < v139; v138++) {
              v136 = v137[v138];
              v143 += v136 * v135;
              v135 *= 60;
            }
            return v142 * v143;
          } else {
            return v142 * parseFloat(v143);
          }
        }
        construct_yaml_binary(p151) {
          var v148;
          var v149;
          v149 = this.construct_scalar(p151);
          try {
            if (typeof window !== "undefined" && window !== null) {
              return atob(v149);
            } else {
              return new Buffer(v149, "base64").toString("ascii");
            }
          } catch (err) {
            v148 = err;
            throw new p132.ConstructorError(
              null,
              null,
              "failed to decode base64 data: " + v148,
              p151.start_mark,
            );
          }
        }
        construct_yaml_timestamp(p152) {
          var v150;
          var v151;
          var v152;
          var v153;
          var v154;
          var v155;
          var v156;
          var v157;
          var v158;
          var v159;
          var v160;
          var v161;
          var v162;
          var v163;
          var v164;
          var v165;
          var v166;
          v164 = this.construct_scalar(p152);
          v156 = p152.value.match(v103);
          v165 = {};
          for (v155 in v102) {
            v154 = v102[v155];
            v165[v155] = v156[v154];
          }
          v166 = parseInt(v165.year);
          v159 = parseInt(v165.month) - 1;
          v151 = parseInt(v165.day);
          if (!v165.hour) {
            return new Date(Date.UTC(v166, v159, v151));
          }
          v153 = parseInt(v165.hour);
          v158 = parseInt(v165.minute);
          v160 = parseInt(v165.second);
          v157 = 0;
          if (v165.fraction) {
            for (v152 = v165.fraction.slice(0, 6); v152.length < 6; ) {
              v152 += "0";
            }
            v152 = parseInt(v152);
            v157 = Math.round(v152 / 1000);
          }
          if (v165.tz_sign) {
            v163 = v165.tz_sign === "-" ? 1 : -1;
            if ((v161 = parseInt(v165.tz_hour))) {
              v153 += v163 * v161;
            }
            if ((v162 = parseInt(v165.tz_minute))) {
              v158 += v163 * v162;
            }
          }
          v150 = new Date(Date.UTC(v166, v159, v151, v153, v158, v160, v157));
          return v150;
        }
        construct_yaml_pair_list(p153, p154) {
          var v167;
          v167 = [];
          if (!(p154 instanceof v69.SequenceNode)) {
            throw new p132.ConstructorError(
              "while constructing " + p153,
              p154.start_mark,
              "expected a sequence but found " + p154.id,
              p154.start_mark,
            );
          }
          this.defer(() => {
            var v168;
            var v169;
            var v170;
            var v171;
            var v172;
            var v173;
            var v174;
            var v175;
            var v176;
            v172 = p154.value;
            v173 = [];
            v168 = 0;
            v171 = v172.length;
            for (; v168 < v171; v168++) {
              v174 = v172[v168];
              if (!(v174 instanceof v69.MappingNode)) {
                throw new p132.ConstructorError(
                  "while constructing " + p153,
                  p154.start_mark,
                  "expected a mapping of length 1 but found " + v174.id,
                  v174.start_mark,
                );
              }
              if (v174.value.length !== 1) {
                throw new p132.ConstructorError(
                  "while constructing " + p153,
                  p154.start_mark,
                  "expected a mapping of length 1 but found " + v174.id,
                  v174.start_mark,
                );
              }
              [v170, v176] = v174.value[0];
              v169 = this.construct_object(v170);
              v175 = this.construct_object(v176);
              v173.push(v167.push([v169, v175]));
            }
            return v173;
          });
          return v167;
        }
        construct_yaml_omap(p155) {
          return this.construct_yaml_pair_list("an ordered map", p155);
        }
        construct_yaml_pairs(p156) {
          return this.construct_yaml_pair_list("pairs", p156);
        }
        construct_yaml_set(p157) {
          var v177;
          v177 = [];
          this.defer(() => {
            var v178;
            var v179;
            v179 = [];
            for (v178 in this.construct_mapping(p157)) {
              v179.push(v177.push(v178));
            }
            return v179;
          });
          return v177;
        }
        construct_yaml_str(p158) {
          return this.construct_scalar(p158);
        }
        construct_yaml_seq(p159) {
          var v180;
          v180 = [];
          this.defer(() => {
            var v181;
            var v182;
            var v183;
            var v184;
            var v185;
            v184 = this.construct_sequence(p159);
            v185 = [];
            v181 = 0;
            v183 = v184.length;
            for (; v181 < v183; v181++) {
              v182 = v184[v181];
              v185.push(v180.push(v182));
            }
            return v185;
          });
          return v180;
        }
        construct_yaml_map(p160) {
          var v186;
          v186 = {};
          this.defer(() => {
            var v187;
            var v188;
            var v189;
            var v190;
            v188 = this.construct_mapping(p160);
            v189 = [];
            for (v187 in v188) {
              v190 = v188[v187];
              v189.push((v186[v187] = v190));
            }
            return v189;
          });
          return v186;
        }
        construct_yaml_object(p161, p162) {
          var v191;
          v191 = new p162();
          this.defer(() => {
            var v192;
            var v193;
            var v194;
            var v195;
            v193 = this.construct_mapping(p161, true);
            v194 = [];
            for (v192 in v193) {
              v195 = v193[v192];
              v194.push((v191[v192] = v195));
            }
            return v194;
          });
          return v191;
        }
        construct_undefined(p163) {
          throw new p132.ConstructorError(
            null,
            null,
            "could not determine a constructor for the tag " + p163.tag,
            p163.start_mark,
          );
        }
      }
      v101 = {
        on: true,
        off: false,
        true: true,
        false: false,
        yes: true,
        no: false,
      };
      v103 =
        /^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[\x20\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\.([0-9]*))?(?:[\x20\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$/;
      v102 = {
        year: 1,
        month: 2,
        day: 3,
        hour: 4,
        minute: 5,
        second: 6,
        fraction: 7,
        tz: 8,
        tz_sign: 9,
        tz_hour: 10,
        tz_minute: 11,
      };
      return C6;
    }.call(this);
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:null",
      this.Constructor.prototype.construct_yaml_null,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:bool",
      this.Constructor.prototype.construct_yaml_bool,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:int",
      this.Constructor.prototype.construct_yaml_int,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:float",
      this.Constructor.prototype.construct_yaml_float,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:binary",
      this.Constructor.prototype.construct_yaml_binary,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:timestamp",
      this.Constructor.prototype.construct_yaml_timestamp,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:omap",
      this.Constructor.prototype.construct_yaml_omap,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:pairs",
      this.Constructor.prototype.construct_yaml_pairs,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:set",
      this.Constructor.prototype.construct_yaml_set,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:str",
      this.Constructor.prototype.construct_yaml_str,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:seq",
      this.Constructor.prototype.construct_yaml_seq,
    );
    this.Constructor.add_constructor(
      "tag:yaml.org,2002:map",
      this.Constructor.prototype.construct_yaml_map,
    );
    this.Constructor.add_constructor(null, this.Constructor.prototype.construct_undefined);
  }).call(p132);
});
var Ls = F((p164) => {
  w();
  (function () {
    var v196;
    var v197;
    var v198;
    var v199;
    var v200 = {}.hasOwnProperty;
    var v201 = [].indexOf;
    v198 = et();
    v199 = we();
    ({ YAMLError: v197 } = he());
    this.EmitterError = class extends v197 {};
    this.Emitter = function () {
      var v202;
      var v203;
      var v204;
      var v205;
      class C7 {
        constructor() {
          return v205.apply(this, arguments);
        }
        initialise(p165, p166) {
          var v206;
          this.stream = p165;
          this.encoding = null;
          this.states = [];
          this.state = this.expect_stream_start;
          this.events = [];
          this.event = null;
          this.indents = [];
          this.indent = null;
          this.flow_level = 0;
          this.root_context = false;
          this.sequence_context = false;
          this.mapping_context = false;
          this.simple_key_context = false;
          this.line = 0;
          this.column = 0;
          this.whitespace = true;
          this.indentation = true;
          this.open_ended = false;
          ({ canonical: this.canonical, allow_unicode: this.allow_unicode } = p166);
          if (this.canonical == null) {
            this.canonical = false;
          }
          if (this.allow_unicode == null) {
            this.allow_unicode = true;
          }
          this.best_indent = p166.indent > 1 && p166.indent < 10 ? p166.indent : 2;
          this.best_width = p166.width > this.indent * 2 ? p166.width : 80;
          this.best_line_break =
            (v206 = p166.line_break) === "\r" || v206 === "\n" || v206 === "\r\n"
              ? p166.line_break
              : "\n";
          this.tag_prefixes = null;
          this.prepared_anchor = null;
          this.prepared_tag = null;
          this.analysis = null;
          return (this.style = null);
        }
        dispose() {
          this.states = [];
          return (this.state = null);
        }
        emit(p167) {
          var v207;
          this.events.push(p167);
          v207 = [];
          while (!this.need_more_events()) {
            this.event = this.events.shift();
            this.state();
            v207.push((this.event = null));
          }
          return v207;
        }
        need_more_events() {
          var v208;
          if (this.events.length === 0) {
            return true;
          } else {
            v208 = this.events[0];
            if (v208 instanceof v198.DocumentStartEvent) {
              return this.need_events(1);
            } else if (v208 instanceof v198.SequenceStartEvent) {
              return this.need_events(2);
            } else if (v208 instanceof v198.MappingStartEvent) {
              return this.need_events(3);
            } else {
              return false;
            }
          }
        }
        need_events(p168) {
          var v209;
          var v210;
          var v211;
          var v212;
          var v213;
          v212 = 0;
          v213 = this.events.slice(1);
          v210 = 0;
          v211 = v213.length;
          for (; v210 < v211; v210++) {
            v209 = v213[v210];
            if (
              v209 instanceof v198.DocumentStartEvent ||
              v209 instanceof v198.CollectionStartEvent
            ) {
              v212++;
            } else if (
              v209 instanceof v198.DocumentEndEvent ||
              v209 instanceof v198.CollectionEndEvent
            ) {
              v212--;
            } else if (v209 instanceof v198.StreamEndEvent) {
              v212 = -1;
            }
            if (v212 < 0) {
              return false;
            }
          }
          return this.events.length < p168 + 1;
        }
        increase_indent(p169 = {}) {
          this.indents.push(this.indent);
          if (this.indent == null) {
            return (this.indent = p169.flow ? this.best_indent : 0);
          }
          if (!p169.indentless) {
            return (this.indent += this.best_indent);
          }
        }
        expect_stream_start() {
          if (this.event instanceof v198.StreamStartEvent) {
            if (this.event.encoding && !("encoding" in this.stream)) {
              this.encoding = this.event.encoding;
            }
            this.write_stream_start();
            return (this.state = this.expect_first_document_start);
          } else {
            return this.error("expected StreamStartEvent, but got", this.event);
          }
        }
        expect_nothing() {
          return this.error("expected nothing, but got", this.event);
        }
        expect_first_document_start() {
          return this.expect_document_start(true);
        }
        expect_document_start(p170 = false) {
          var v214;
          var v215;
          var v216;
          var v217;
          var v218;
          var v219;
          var v220;
          if (this.event instanceof v198.DocumentStartEvent) {
            if ((this.event.version || this.event.tags) && this.open_ended) {
              this.write_indicator("...", true);
              this.write_indent();
            }
            if (this.event.version) {
              this.write_version_directive(this.prepare_version(this.event.version));
            }
            this.tag_prefixes = v199.clone(v203);
            if (this.event.tags) {
              v220 = function () {
                var v221;
                var v222;
                v221 = this.event.tags;
                v222 = [];
                for (v217 in v221) {
                  if (v200.call(v221, v217)) {
                    v222.push(v217);
                  }
                }
                return v222;
              }
                .call(this)
                .sort();
              v216 = 0;
              v218 = v220.length;
              for (; v216 < v218; v216++) {
                v215 = v220[v216];
                v219 = this.event.tags[v215];
                this.tag_prefixes[v219] = v215;
                this.write_tag_directive(
                  this.prepare_tag_handle(v215),
                  this.prepare_tag_prefix(v219),
                );
              }
            }
            v214 =
              !p170 ||
              this.event.explicit ||
              this.canonical ||
              this.event.version ||
              this.event.tags ||
              this.check_empty_document();
            if (v214) {
              this.write_indent();
              this.write_indicator("---", true);
              if (this.canonical) {
                this.write_indent();
              }
            }
            return (this.state = this.expect_document_root);
          } else if (this.event instanceof v198.StreamEndEvent) {
            if (this.open_ended) {
              this.write_indicator("...", true);
              this.write_indent();
            }
            this.write_stream_end();
            return (this.state = this.expect_nothing);
          } else {
            return this.error("expected DocumentStartEvent, but got", this.event);
          }
        }
        expect_document_end() {
          if (this.event instanceof v198.DocumentEndEvent) {
            this.write_indent();
            if (this.event.explicit) {
              this.write_indicator("...", true);
              this.write_indent();
            }
            this.flush_stream();
            return (this.state = this.expect_document_start);
          } else {
            return this.error("expected DocumentEndEvent, but got", this.event);
          }
        }
        expect_document_root() {
          this.states.push(this.expect_document_end);
          return this.expect_node({
            root: true,
          });
        }
        expect_node(p171 = {}) {
          this.root_context = !!p171.root;
          this.sequence_context = !!p171.sequence;
          this.mapping_context = !!p171.mapping;
          this.simple_key_context = !!p171.simple_key;
          if (this.event instanceof v198.AliasEvent) {
            return this.expect_alias();
          }
          if (
            this.event instanceof v198.ScalarEvent ||
            this.event instanceof v198.CollectionStartEvent
          ) {
            this.process_anchor("&");
            this.process_tag();
            if (this.event instanceof v198.ScalarEvent) {
              return this.expect_scalar();
            }
            if (this.event instanceof v198.SequenceStartEvent) {
              if (
                this.flow_level ||
                this.canonical ||
                this.event.flow_style ||
                this.check_empty_sequence()
              ) {
                return this.expect_flow_sequence();
              } else {
                return this.expect_block_sequence();
              }
            }
            if (this.event instanceof v198.MappingStartEvent) {
              if (
                this.flow_level ||
                this.canonical ||
                this.event.flow_style ||
                this.check_empty_mapping()
              ) {
                return this.expect_flow_mapping();
              } else {
                return this.expect_block_mapping();
              }
            }
          } else {
            return this.error("expected NodeEvent, but got", this.event);
          }
        }
        expect_alias() {
          if (!this.event.anchor) {
            this.error("anchor is not specified for alias");
          }
          this.process_anchor("*");
          return (this.state = this.states.pop());
        }
        expect_scalar() {
          this.increase_indent({
            flow: true,
          });
          this.process_scalar();
          this.indent = this.indents.pop();
          return (this.state = this.states.pop());
        }
        expect_flow_sequence() {
          this.write_indicator("[", true, {
            whitespace: true,
          });
          this.flow_level++;
          this.increase_indent({
            flow: true,
          });
          return (this.state = this.expect_first_flow_sequence_item);
        }
        expect_first_flow_sequence_item() {
          if (this.event instanceof v198.SequenceEndEvent) {
            this.indent = this.indents.pop();
            this.flow_level--;
            this.write_indicator("]", false);
            return (this.state = this.states.pop());
          } else {
            if (this.canonical || this.column > this.best_width) {
              this.write_indent();
            }
            this.states.push(this.expect_flow_sequence_item);
            return this.expect_node({
              sequence: true,
            });
          }
        }
        expect_flow_sequence_item() {
          if (this.event instanceof v198.SequenceEndEvent) {
            this.indent = this.indents.pop();
            this.flow_level--;
            if (this.canonical) {
              this.write_indicator(",", false);
              this.write_indent();
            }
            this.write_indicator("]", false);
            return (this.state = this.states.pop());
          } else {
            this.write_indicator(",", false);
            if (this.canonical || this.column > this.best_width) {
              this.write_indent();
            }
            this.states.push(this.expect_flow_sequence_item);
            return this.expect_node({
              sequence: true,
            });
          }
        }
        expect_flow_mapping() {
          this.write_indicator("{", true, {
            whitespace: true,
          });
          this.flow_level++;
          this.increase_indent({
            flow: true,
          });
          return (this.state = this.expect_first_flow_mapping_key);
        }
        expect_first_flow_mapping_key() {
          if (this.event instanceof v198.MappingEndEvent) {
            this.indent = this.indents.pop();
            this.flow_level--;
            this.write_indicator("}", false);
            return (this.state = this.states.pop());
          } else {
            if (this.canonical || this.column > this.best_width) {
              this.write_indent();
            }
            if (!this.canonical && this.check_simple_key()) {
              this.states.push(this.expect_flow_mapping_simple_value);
              return this.expect_node({
                mapping: true,
                simple_key: true,
              });
            } else {
              this.write_indicator("?", true);
              this.states.push(this.expect_flow_mapping_value);
              return this.expect_node({
                mapping: true,
              });
            }
          }
        }
        expect_flow_mapping_key() {
          if (this.event instanceof v198.MappingEndEvent) {
            this.indent = this.indents.pop();
            this.flow_level--;
            if (this.canonical) {
              this.write_indicator(",", false);
              this.write_indent();
            }
            this.write_indicator("}", false);
            return (this.state = this.states.pop());
          } else {
            this.write_indicator(",", false);
            if (this.canonical || this.column > this.best_width) {
              this.write_indent();
            }
            if (!this.canonical && this.check_simple_key()) {
              this.states.push(this.expect_flow_mapping_simple_value);
              return this.expect_node({
                mapping: true,
                simple_key: true,
              });
            } else {
              this.write_indicator("?", true);
              this.states.push(this.expect_flow_mapping_value);
              return this.expect_node({
                mapping: true,
              });
            }
          }
        }
        expect_flow_mapping_simple_value() {
          this.write_indicator(":", false);
          this.states.push(this.expect_flow_mapping_key);
          return this.expect_node({
            mapping: true,
          });
        }
        expect_flow_mapping_value() {
          if (this.canonical || this.column > this.best_width) {
            this.write_indent();
          }
          this.write_indicator(":", true);
          this.states.push(this.expect_flow_mapping_key);
          return this.expect_node({
            mapping: true,
          });
        }
        expect_block_sequence() {
          var v223;
          v223 = this.mapping_context && !this.indentation;
          this.increase_indent({
            indentless: v223,
          });
          return (this.state = this.expect_first_block_sequence_item);
        }
        expect_first_block_sequence_item() {
          return this.expect_block_sequence_item(true);
        }
        expect_block_sequence_item(p172 = false) {
          if (!p172 && this.event instanceof v198.SequenceEndEvent) {
            this.indent = this.indents.pop();
            return (this.state = this.states.pop());
          } else {
            this.write_indent();
            this.write_indicator("-", true, {
              indentation: true,
            });
            this.states.push(this.expect_block_sequence_item);
            return this.expect_node({
              sequence: true,
            });
          }
        }
        expect_block_mapping() {
          this.increase_indent();
          return (this.state = this.expect_first_block_mapping_key);
        }
        expect_first_block_mapping_key() {
          return this.expect_block_mapping_key(true);
        }
        expect_block_mapping_key(p173 = false) {
          if (!p173 && this.event instanceof v198.MappingEndEvent) {
            this.indent = this.indents.pop();
            return (this.state = this.states.pop());
          } else {
            this.write_indent();
            if (this.check_simple_key()) {
              this.states.push(this.expect_block_mapping_simple_value);
              return this.expect_node({
                mapping: true,
                simple_key: true,
              });
            } else {
              this.write_indicator("?", true, {
                indentation: true,
              });
              this.states.push(this.expect_block_mapping_value);
              return this.expect_node({
                mapping: true,
              });
            }
          }
        }
        expect_block_mapping_simple_value() {
          this.write_indicator(":", false);
          this.states.push(this.expect_block_mapping_key);
          return this.expect_node({
            mapping: true,
          });
        }
        expect_block_mapping_value() {
          this.write_indent();
          this.write_indicator(":", true, {
            indentation: true,
          });
          this.states.push(this.expect_block_mapping_key);
          return this.expect_node({
            mapping: true,
          });
        }
        check_empty_document() {
          var v224;
          if (!(this.event instanceof v198.DocumentStartEvent) || this.events.length === 0) {
            return false;
          } else {
            v224 = this.events[0];
            return (
              v224 instanceof v198.ScalarEvent &&
              v224.anchor == null &&
              v224.tag == null &&
              v224.implicit &&
              v224.value === ""
            );
          }
        }
        check_empty_sequence() {
          return (
            this.event instanceof v198.SequenceStartEvent &&
            this.events[0] instanceof v198.SequenceEndEvent
          );
        }
        check_empty_mapping() {
          return (
            this.event instanceof v198.MappingStartEvent &&
            this.events[0] instanceof v198.MappingEndEvent
          );
        }
        check_simple_key() {
          var v225;
          v225 = 0;
          if (this.event instanceof v198.NodeEvent && this.event.anchor != null) {
            if (this.prepared_anchor == null) {
              this.prepared_anchor = this.prepare_anchor(this.event.anchor);
            }
            v225 += this.prepared_anchor.length;
          }
          if (
            this.event.tag != null &&
            (this.event instanceof v198.ScalarEvent ||
              this.event instanceof v198.CollectionStartEvent)
          ) {
            if (this.prepared_tag == null) {
              this.prepared_tag = this.prepare_tag(this.event.tag);
            }
            v225 += this.prepared_tag.length;
          }
          if (this.event instanceof v198.ScalarEvent) {
            if (this.analysis == null) {
              this.analysis = this.analyze_scalar(this.event.value);
            }
            v225 += this.analysis.scalar.length;
          }
          return (
            v225 < 128 &&
            (this.event instanceof v198.AliasEvent ||
              (this.event instanceof v198.ScalarEvent &&
                !this.analysis.empty &&
                !this.analysis.multiline) ||
              this.check_empty_sequence() ||
              this.check_empty_mapping())
          );
        }
        process_anchor(p174) {
          if (this.event.anchor == null) {
            this.prepared_anchor = null;
            return;
          }
          if (this.prepared_anchor == null) {
            this.prepared_anchor = this.prepare_anchor(this.event.anchor);
          }
          if (this.prepared_anchor) {
            this.write_indicator("" + p174 + this.prepared_anchor, true);
          }
          return (this.prepared_anchor = null);
        }
        process_tag() {
          var v226;
          v226 = this.event.tag;
          if (this.event instanceof v198.ScalarEvent) {
            if (this.style == null) {
              this.style = this.choose_scalar_style();
            }
            if (
              (!this.canonical || v226 == null) &&
              ((this.style === "" && this.event.implicit[0]) ||
                (this.style !== "" && this.event.implicit[1]))
            ) {
              this.prepared_tag = null;
              return;
            }
            if (this.event.implicit[0] && v226 == null) {
              v226 = "!";
              this.prepared_tag = null;
            }
          } else if ((!this.canonical || v226 == null) && this.event.implicit) {
            this.prepared_tag = null;
            return;
          }
          if (v226 == null) {
            this.error("tag is not specified");
          }
          if (this.prepared_tag == null) {
            this.prepared_tag = this.prepare_tag(v226);
          }
          this.write_indicator(this.prepared_tag, true);
          return (this.prepared_tag = null);
        }
        process_scalar() {
          var v227;
          if (this.analysis == null) {
            this.analysis = this.analyze_scalar(this.event.value);
          }
          if (this.style == null) {
            this.style = this.choose_scalar_style();
          }
          v227 = !this.simple_key_context;
          switch (this.style) {
            case '"':
              this.write_double_quoted(this.analysis.scalar, v227);
              break;
            case "'":
              this.write_single_quoted(this.analysis.scalar, v227);
              break;
            case ">":
              this.write_folded(this.analysis.scalar);
              break;
            case "|":
              this.write_literal(this.analysis.scalar);
              break;
            default:
              this.write_plain(this.analysis.scalar, v227);
          }
          this.analysis = null;
          return (this.style = null);
        }
        choose_scalar_style() {
          var v228;
          if (this.analysis == null) {
            this.analysis = this.analyze_scalar(this.event.value);
          }
          if (this.event.style === '"' || this.canonical) {
            return '"';
          } else if (
            !this.event.style &&
            this.event.implicit[0] &&
            (!this.simple_key_context || (!this.analysis.empty && !this.analysis.multiline)) &&
            ((this.flow_level && this.analysis.allow_flow_plain) ||
              (!this.flow_level && this.analysis.allow_block_plain))
          ) {
            return "";
          } else if (
            this.event.style &&
            ((v228 = this.event.style), v201.call("|>", v228) >= 0) &&
            !this.flow_level &&
            !this.simple_key_context &&
            this.analysis.allow_block
          ) {
            return this.event.style;
          } else if (
            (!this.event.style || this.event.style === "'") &&
            this.analysis.allow_single_quoted &&
            (!this.simple_key_context || !this.analysis.multiline)
          ) {
            return "'";
          } else {
            return '"';
          }
        }
        prepare_version([v229, v230]) {
          var v231;
          v231 = v229 + "." + v230;
          if (v229 === 1) {
            return v231;
          } else {
            return this.error("unsupported YAML version", v231);
          }
        }
        prepare_tag_handle(p175) {
          var v232;
          var v233;
          var v234;
          var v235;
          if (!p175) {
            this.error("tag handle must not be empty");
          }
          if (p175[0] !== "!" || p175.slice(-1) !== "!") {
            this.error("tag handle must start and end with '!':", p175);
          }
          v235 = p175.slice(1, -1);
          v233 = 0;
          v234 = v235.length;
          for (; v233 < v234; v233++) {
            v232 = v235[v233];
            if (
              (!(v232 >= "0") || !(v232 <= "9")) &&
              (!(v232 >= "A") || !(v232 <= "Z")) &&
              (!(v232 >= "a") || !(v232 <= "z")) &&
              !(v201.call("-_", v232) >= 0)
            ) {
              this.error("invalid character '" + v232 + "' in the tag handle:", p175);
            }
          }
          return p175;
        }
        prepare_tag_prefix(p176) {
          var v236;
          var v237;
          var v238;
          var v239;
          if (!p176) {
            this.error("tag prefix must not be empty");
          }
          v237 = [];
          v239 = 0;
          v238 = +(p176[0] === "!");
          while (v238 < p176.length) {
            v236 = p176[v238];
            if (
              (v236 >= "0" && v236 <= "9") ||
              (v236 >= "A" && v236 <= "Z") ||
              (v236 >= "a" && v236 <= "z") ||
              v201.call("-;/?!:@&=+$,_.~*'()[]", v236) >= 0
            ) {
              v238++;
            } else {
              if (v239 < v238) {
                v237.push(p176.slice(v239, v238));
              }
              v239 = v238 = v238 + 1;
              v237.push(v236);
            }
          }
          if (v239 < v238) {
            v237.push(p176.slice(v239, v238));
          }
          return v237.join("");
        }
        prepare_tag(p177) {
          var v240;
          var v241;
          var v242;
          var v243;
          var v244;
          var v245;
          var v246;
          var v247;
          var v248;
          var v249;
          var v250;
          var v251;
          if (!p177) {
            this.error("tag must not be empty");
          }
          if (p177 === "!") {
            return p177;
          }
          v243 = null;
          v250 = p177;
          v248 = function () {
            var v252;
            var v253;
            v252 = this.tag_prefixes;
            v253 = [];
            for (v245 in v252) {
              if (v200.call(v252, v245)) {
                v253.push(v245);
              }
            }
            return v253;
          }
            .call(this)
            .sort();
          v244 = 0;
          v246 = v248.length;
          for (; v244 < v246; v244++) {
            v247 = v248[v244];
            if (p177.indexOf(v247) === 0 && (v247 === "!" || v247.length < p177.length)) {
              v243 = this.tag_prefixes[v247];
              v250 = p177.slice(v247.length);
            }
          }
          v241 = [];
          v249 = v242 = 0;
          while (v242 < v250.length) {
            v240 = v250[v242];
            if (
              (v240 >= "0" && v240 <= "9") ||
              (v240 >= "A" && v240 <= "Z") ||
              (v240 >= "a" && v240 <= "z") ||
              v201.call("-;/?!:@&=+$,_.~*'()[]", v240) >= 0 ||
              (v240 === "!" && v243 !== "!")
            ) {
              v242++;
            } else {
              if (v249 < v242) {
                v241.push(v250.slice(v249, v242));
              }
              v249 = v242 = v242 + 1;
              v241.push(v240);
            }
          }
          if (v249 < v242) {
            v241.push(v250.slice(v249, v242));
          }
          v251 = v241.join("");
          if (v243) {
            return "" + v243 + v251;
          } else {
            return "!<" + v251 + ">";
          }
        }
        prepare_anchor(p178) {
          var v254;
          var v255;
          var v256;
          if (!p178) {
            this.error("anchor must not be empty");
          }
          v255 = 0;
          v256 = p178.length;
          for (; v255 < v256; v255++) {
            v254 = p178[v255];
            if (
              (!(v254 >= "0") || !(v254 <= "9")) &&
              (!(v254 >= "A") || !(v254 <= "Z")) &&
              (!(v254 >= "a") || !(v254 <= "z")) &&
              !(v201.call("-_", v254) >= 0)
            ) {
              this.error("invalid character '" + v254 + "' in the anchor:", p178);
            }
          }
          return p178;
        }
        analyze_scalar(p179) {
          var v257;
          var v258;
          var v259;
          var v260;
          var v261;
          var v262;
          var v263;
          var v264;
          var v265;
          var v266;
          var v267;
          var v268;
          var v269;
          var v270;
          var v271;
          var v272;
          var v273;
          var v274;
          var v275;
          var v276;
          var v277;
          var v278;
          var v279;
          var v280;
          var v281;
          var v282;
          if (!p179) {
            new v196(p179, true, false, false, true, true, true, false);
          }
          v262 = false;
          v265 = false;
          v272 = false;
          v279 = false;
          v282 = false;
          v270 = false;
          v269 = false;
          v281 = false;
          v280 = false;
          v263 = false;
          v278 = false;
          if (p179.indexOf("---") === 0 || p179.indexOf("...") === 0) {
            v262 = true;
            v265 = true;
          }
          v273 = true;
          v266 =
            p179.length === 1 || ((v276 = p179[1]), v201.call("\0 \t\r\n\u2028\u2029", v276) >= 0);
          v275 = false;
          v274 = false;
          v268 = 0;
          v268 = v267 = 0;
          v271 = p179.length;
          for (; v267 < v271; v268 = ++v267) {
            v264 = p179[v268];
            if (v268 === 0) {
              if (v201.call("#,[]{}&*!|>'\"%@`", v264) >= 0 || (v264 === "-" && v266)) {
                v265 = true;
                v262 = true;
              } else if (v201.call("?:", v264) >= 0) {
                v265 = true;
                if (v266) {
                  v262 = true;
                }
              }
            } else if (v201.call(",?[]{}", v264) >= 0) {
              v265 = true;
            } else if (v264 === ":") {
              v265 = true;
              if (v266) {
                v262 = true;
              }
            } else if (v264 === "#" && v273) {
              v265 = true;
              v262 = true;
            }
            if (v201.call("\n\u2028\u2029", v264) >= 0) {
              v272 = true;
            }
            if (v264 !== "\n" && (!(v264 >= " ") || !(v264 <= "~"))) {
              if (
                v264 !== "﻿" &&
                (v264 === "" || (v264 >= "\xA0" && v264 <= "퟿") || (v264 >= "" && v264 <= "�"))
              ) {
                v282 = true;
                if (!this.allow_unicode) {
                  v279 = true;
                }
              } else {
                v279 = true;
              }
            }
            if (v264 === " ") {
              if (v268 === 0) {
                v270 = true;
              }
              if (v268 === p179.length - 1) {
                v281 = true;
              }
              if (v274) {
                v263 = true;
              }
              v274 = false;
              v275 = true;
            } else if (v201.call("\n\u2028\u2029", v264) >= 0) {
              if (v268 === 0) {
                v269 = true;
              }
              if (v268 === p179.length - 1) {
                v280 = true;
              }
              if (v275) {
                v278 = true;
              }
              v274 = true;
              v275 = false;
            } else {
              v274 = false;
              v275 = false;
            }
            v273 = v201.call(v202, v264) >= 0;
            v266 = v268 + 2 >= p179.length || ((v277 = p179[v268 + 2]), v201.call(v202, v277) >= 0);
          }
          v260 = true;
          v258 = true;
          v261 = true;
          v259 = true;
          v257 = true;
          if (v270 || v269 || v281 || v280) {
            v260 = v258 = false;
          }
          if (v281) {
            v257 = false;
          }
          if (v263) {
            v260 = v258 = v261 = false;
          }
          if (v278 || v279) {
            v260 = v258 = v261 = v257 = false;
          }
          if (v272) {
            v260 = v258 = false;
          }
          if (v265) {
            v260 = false;
          }
          if (v262) {
            v258 = false;
          }
          return new v196(p179, false, v272, v260, v258, v261, v259, v257);
        }
        write_stream_start() {
          if (this.encoding && this.encoding.indexOf("utf-16") === 0) {
            return this.stream.write("﻿", this.encoding);
          }
        }
        write_stream_end() {
          return this.flush_stream();
        }
        write_indicator(p180, p181, p182 = {}) {
          var v283;
          v283 = this.whitespace || !p181 ? p180 : " " + p180;
          this.whitespace = !!p182.whitespace;
          this.indentation &&= !!p182.indentation;
          this.column += v283.length;
          this.open_ended = false;
          return this.stream.write(v283, this.encoding);
        }
        write_indent() {
          var v284;
          var v285;
          v285 = this.indent ?? 0;
          if (
            !this.indentation ||
            this.column > v285 ||
            (this.column === v285 && !this.whitespace)
          ) {
            this.write_line_break();
          }
          if (this.column < v285) {
            this.whitespace = true;
            v284 = new Array(v285 - this.column + 1).join(" ");
            this.column = v285;
            return this.stream.write(v284, this.encoding);
          }
        }
        write_line_break(p183) {
          this.whitespace = true;
          this.indentation = true;
          this.line += 1;
          this.column = 0;
          return this.stream.write(p183 ?? this.best_line_break, this.encoding);
        }
        write_version_directive(p184) {
          this.stream.write("%YAML " + p184, this.encoding);
          return this.write_line_break();
        }
        write_tag_directive(p185, p186) {
          this.stream.write("%TAG " + p185 + " " + p186, this.encoding);
          return this.write_line_break();
        }
        write_single_quoted(p187, p188 = true) {
          var v286;
          var v287;
          var v288;
          var v289;
          var v290;
          var v291;
          var v292;
          var v293;
          var v294;
          var v295;
          this.write_indicator("'", true);
          v294 = false;
          v287 = false;
          v295 = v290 = 0;
          while (v290 <= p187.length) {
            v288 = p187[v290];
            if (v294) {
              if (v288 == null || v288 !== " ") {
                if (
                  v295 + 1 === v290 &&
                  this.column > this.best_width &&
                  p188 &&
                  v295 !== 0 &&
                  v290 !== p187.length
                ) {
                  this.write_indent();
                } else {
                  v289 = p187.slice(v295, v290);
                  this.column += v289.length;
                  this.stream.write(v289, this.encoding);
                }
                v295 = v290;
              }
            } else if (v287) {
              if (v288 == null || v201.call("\n\u2028\u2029", v288) < 0) {
                if (p187[v295] === "\n") {
                  this.write_line_break();
                }
                v293 = p187.slice(v295, v290);
                v291 = 0;
                v292 = v293.length;
                for (; v291 < v292; v291++) {
                  v286 = v293[v291];
                  if (v286 === "\n") {
                    this.write_line_break();
                  } else {
                    this.write_line_break(v286);
                  }
                }
                this.write_indent();
                v295 = v290;
              }
            } else if (
              (v288 == null || v201.call(" \n\u2028\u2029", v288) >= 0 || v288 === "'") &&
              v295 < v290
            ) {
              v289 = p187.slice(v295, v290);
              this.column += v289.length;
              this.stream.write(v289, this.encoding);
              v295 = v290;
            }
            if (v288 === "'") {
              this.column += 2;
              this.stream.write("''", this.encoding);
              v295 = v290 + 1;
            }
            if (v288 != null) {
              v294 = v288 === " ";
              v287 = v201.call("\n\u2028\u2029", v288) >= 0;
            }
            v290++;
          }
          return this.write_indicator("'", false);
        }
        write_double_quoted(p189, p190 = true) {
          var v296;
          var v297;
          var v298;
          var v299;
          this.write_indicator('"', true);
          v299 = v298 = 0;
          while (v298 <= p189.length) {
            v296 = p189[v298];
            if (
              v296 == null ||
              v201.call('"\\\u2028\u2029﻿', v296) >= 0 ||
              ((!(v296 >= " ") || !(v296 <= "~")) &&
                (!this.allow_unicode ||
                  ((!(v296 >= "\xA0") || !(v296 <= "퟿")) && (!(v296 >= "") || !(v296 <= "�")))))
            ) {
              if (v299 < v298) {
                v297 = p189.slice(v299, v298);
                this.column += v297.length;
                this.stream.write(v297, this.encoding);
                v299 = v298;
              }
              if (v296 != null) {
                v297 =
                  v296 in v204
                    ? "\\" + v204[v296]
                    : v296 <= "ÿ"
                      ? "\\x" + v199.pad_left(v199.to_hex(v296), "0", 2)
                      : v296 <= "￿"
                        ? "\\u" + v199.pad_left(v199.to_hex(v296), "0", 4)
                        : "\\U" + v199.pad_left(v199.to_hex(v296), "0", 16);
                this.column += v297.length;
                this.stream.write(v297, this.encoding);
                v299 = v298 + 1;
              }
            }
            if (
              p190 &&
              v298 > 0 &&
              v298 < p189.length - 1 &&
              (v296 === " " || v299 >= v298) &&
              this.column + (v298 - v299) > this.best_width
            ) {
              v297 = p189.slice(v299, v298) + "\\";
              if (v299 < v298) {
                v299 = v298;
              }
              this.column += v297.length;
              this.stream.write(v297, this.encoding);
              this.write_indent();
              this.whitespace = false;
              this.indentation = false;
              if (p189[v299] === " ") {
                v297 = "\\";
                this.column += v297.length;
                this.stream.write(v297, this.encoding);
              }
            }
            v298++;
          }
          return this.write_indicator('"', false);
        }
        write_folded(p191) {
          var v300;
          var v301;
          var v302;
          var v303;
          var v304;
          var v305;
          var v306;
          var v307;
          var v308;
          var v309;
          var v310;
          var v311;
          var v312;
          v305 = this.determine_block_hints(p191);
          this.write_indicator(">" + v305, true);
          if (v305.slice(-1) === "+") {
            this.open_ended = true;
          }
          this.write_line_break();
          v307 = true;
          v301 = true;
          v311 = false;
          v312 = v304 = 0;
          v310 = [];
          while (v304 <= p191.length) {
            v302 = p191[v304];
            if (v301) {
              if (v302 == null || v201.call("\n\u2028\u2029", v302) < 0) {
                if (!v307 && v302 != null && v302 !== " " && p191[v312] === "\n") {
                  this.write_line_break();
                }
                v307 = v302 === " ";
                v309 = p191.slice(v312, v304);
                v306 = 0;
                v308 = v309.length;
                for (; v306 < v308; v306++) {
                  v300 = v309[v306];
                  if (v300 === "\n") {
                    this.write_line_break();
                  } else {
                    this.write_line_break(v300);
                  }
                }
                if (v302 != null) {
                  this.write_indent();
                }
                v312 = v304;
              }
            } else if (v311) {
              if (v302 !== " ") {
                if (v312 + 1 === v304 && this.column > this.best_width) {
                  this.write_indent();
                } else {
                  v303 = p191.slice(v312, v304);
                  this.column += v303.length;
                  this.stream.write(v303, this.encoding);
                }
                v312 = v304;
              }
            } else if (v302 == null || v201.call(" \n\u2028\u2029", v302) >= 0) {
              v303 = p191.slice(v312, v304);
              this.column += v303.length;
              this.stream.write(v303, this.encoding);
              if (v302 == null) {
                this.write_line_break();
              }
              v312 = v304;
            }
            if (v302 != null) {
              v301 = v201.call("\n\u2028\u2029", v302) >= 0;
              v311 = v302 === " ";
            }
            v310.push(v304++);
          }
          return v310;
        }
        write_literal(p192) {
          var v313;
          var v314;
          var v315;
          var v316;
          var v317;
          var v318;
          var v319;
          var v320;
          var v321;
          var v322;
          var v323;
          v318 = this.determine_block_hints(p192);
          this.write_indicator("|" + v318, true);
          if (v318.slice(-1) === "+") {
            this.open_ended = true;
          }
          this.write_line_break();
          v314 = true;
          v323 = v317 = 0;
          v322 = [];
          while (v317 <= p192.length) {
            v315 = p192[v317];
            if (v314) {
              if (v315 == null || v201.call("\n\u2028\u2029", v315) < 0) {
                v321 = p192.slice(v323, v317);
                v319 = 0;
                v320 = v321.length;
                for (; v319 < v320; v319++) {
                  v313 = v321[v319];
                  if (v313 === "\n") {
                    this.write_line_break();
                  } else {
                    this.write_line_break(v313);
                  }
                }
                if (v315 != null) {
                  this.write_indent();
                }
                v323 = v317;
              }
            } else if (v315 == null || v201.call("\n\u2028\u2029", v315) >= 0) {
              v316 = p192.slice(v323, v317);
              this.stream.write(v316, this.encoding);
              if (v315 == null) {
                this.write_line_break();
              }
              v323 = v317;
            }
            if (v315 != null) {
              v314 = v201.call("\n\u2028\u2029", v315) >= 0;
            }
            v322.push(v317++);
          }
          return v322;
        }
        write_plain(p193, p194 = true) {
          var v324;
          var v325;
          var v326;
          var v327;
          var v328;
          var v329;
          var v330;
          var v331;
          var v332;
          var v333;
          var v334;
          if (p193) {
            if (this.root_context) {
              this.open_ended = true;
            }
            if (!this.whitespace) {
              v327 = " ";
              this.column += v327.length;
              this.stream.write(v327, this.encoding);
            }
            this.whitespace = false;
            this.indentation = false;
            v333 = false;
            v325 = false;
            v334 = v328 = 0;
            v332 = [];
            while (v328 <= p193.length) {
              v326 = p193[v328];
              if (v333) {
                if (v326 !== " ") {
                  if (v334 + 1 === v328 && this.column > this.best_width && p194) {
                    this.write_indent();
                    this.whitespace = false;
                    this.indentation = false;
                  } else {
                    v327 = p193.slice(v334, v328);
                    this.column += v327.length;
                    this.stream.write(v327, this.encoding);
                  }
                  v334 = v328;
                }
              } else if (v325) {
                if (v201.call("\n\u2028\u2029", v326) < 0) {
                  if (p193[v334] === "\n") {
                    this.write_line_break();
                  }
                  v331 = p193.slice(v334, v328);
                  v329 = 0;
                  v330 = v331.length;
                  for (; v329 < v330; v329++) {
                    v324 = v331[v329];
                    if (v324 === "\n") {
                      this.write_line_break();
                    } else {
                      this.write_line_break(v324);
                    }
                  }
                  this.write_indent();
                  this.whitespace = false;
                  this.indentation = false;
                  v334 = v328;
                }
              } else if (v326 == null || v201.call(" \n\u2028\u2029", v326) >= 0) {
                v327 = p193.slice(v334, v328);
                this.column += v327.length;
                this.stream.write(v327, this.encoding);
                v334 = v328;
              }
              if (v326 != null) {
                v333 = v326 === " ";
                v325 = v201.call("\n\u2028\u2029", v326) >= 0;
              }
              v332.push(v328++);
            }
            return v332;
          }
        }
        determine_block_hints(p195) {
          var v335;
          var v336;
          var v337;
          var v338;
          var v339;
          v336 = "";
          v335 = p195[0];
          v337 = p195.length - 2;
          v339 = p195[v337++];
          v338 = p195[v337++];
          if (v201.call(" \n\u2028\u2029", v335) >= 0) {
            v336 += this.best_indent;
          }
          if (v201.call("\n\u2028\u2029", v338) < 0) {
            v336 += "-";
          } else if (p195.length === 1 || v201.call("\n\u2028\u2029", v339) >= 0) {
            v336 += "+";
          }
          return v336;
        }
        flush_stream() {
          var v340;
          if (typeof (v340 = this.stream).flush == "function") {
            return v340.flush();
          } else {
            return undefined;
          }
        }
        error(p196, p197) {
          var v341;
          p197 &&=
            (p197 != null && (v341 = p197.constructor) != null ? v341.name : undefined) ??
            v199.inspect(p197);
          throw new p164.EmitterError("" + p196 + (p197 ? " " + p197 : ""));
        }
      }
      v202 = "\0 \t\r\n\u2028\u2029";
      v203 = {
        "!": "!",
        "tag:yaml.org,2002:": "!!",
      };
      v204 = {
        "\0": "0",
        "": "a",
        "\b": "b",
        "\t": "t",
        "\n": "n",
        "": "v",
        "\f": "f",
        "\r": "r",
        "": "e",
        '"': '"',
        "\\": "\\",
        "": "N",
        "\xA0": "_",
        "\u2028": "L",
        "\u2029": "P",
      };
      v205 = C7.prototype.initialise;
      return C7;
    }.call(this);
    v196 = class {
      constructor(p198, p199, p200, p201, p202, p203, p204, p205) {
        this.scalar = p198;
        this.empty = p199;
        this.multiline = p200;
        this.allow_flow_plain = p201;
        this.allow_block_plain = p202;
        this.allow_single_quoted = p203;
        this.allow_double_quoted = p204;
        this.allow_block = p205;
      }
    };
  }).call(p164);
});
var qs = F((p206) => {
  w();
  (function () {
    var v342;
    var v343;
    var v344;
    var v345;
    v343 = et();
    v344 = Fe();
    v345 = we();
    ({ YAMLError: v342 } = he());
    this.SerializerError = class extends v342 {};
    this.Serializer = function () {
      var v346;
      class C8 {
        constructor() {
          return v346.apply(this, arguments);
        }
        initialise({
          encoding: arg,
          explicit_start: arg2,
          explicit_end: arg3,
          version: arg4,
          tags: arg5,
        } = {}) {
          this.encoding = arg;
          this.explicit_start = arg2;
          this.explicit_end = arg3;
          this.version = arg4;
          this.tags = arg5;
          this.serialized_nodes = {};
          this.anchors = {};
          this.last_anchor_id = 0;
          return (this.closed = null);
        }
        open() {
          if (this.closed === null) {
            this.emit(new v343.StreamStartEvent(this.encoding));
            return (this.closed = false);
          }
          throw this.closed
            ? new SerializerError("serializer is closed")
            : new SerializerError("serializer is already open");
        }
        close() {
          if (this.closed === null) {
            throw new SerializerError("serializer is not opened");
          }
          if (!this.closed) {
            this.emit(new v343.StreamEndEvent());
            return (this.closed = true);
          }
        }
        serialize(p207) {
          if (this.closed === null) {
            throw new SerializerError("serializer is not opened");
          }
          if (this.closed) {
            throw new SerializerError("serializer is closed");
          }
          if (p207 != null) {
            this.emit(
              new v343.DocumentStartEvent(
                undefined,
                undefined,
                this.explicit_start,
                this.version,
                this.tags,
              ),
            );
            this.anchor_node(p207);
            this.serialize_node(p207);
            this.emit(new v343.DocumentEndEvent(undefined, undefined, this.explicit_end));
          }
          this.serialized_nodes = {};
          this.anchors = {};
          return (this.last_anchor_id = 0);
        }
        anchor_node(p208) {
          var v347;
          var v348;
          var v349;
          var v350;
          var v351;
          var v352;
          var v353;
          var v354;
          var v355;
          var v356;
          var v357;
          var v358;
          var v359;
          if (p208.unique_id in this.anchors) {
            if ((v347 = this.anchors)[(v354 = p208.unique_id)] != null) {
              return v347[v354];
            } else {
              return (v347[v354] = this.generate_anchor(p208));
            }
          }
          this.anchors[p208.unique_id] = null;
          if (p208 instanceof v344.SequenceNode) {
            v355 = p208.value;
            v357 = [];
            v348 = 0;
            v352 = v355.length;
            for (; v348 < v352; v348++) {
              v349 = v355[v348];
              v357.push(this.anchor_node(v349));
            }
            return v357;
          } else if (p208 instanceof v344.MappingNode) {
            v356 = p208.value;
            v358 = [];
            v350 = 0;
            v353 = v356.length;
            for (; v350 < v353; v350++) {
              [v351, v359] = v356[v350];
              this.anchor_node(v351);
              v358.push(this.anchor_node(v359));
            }
            return v358;
          }
        }
        generate_anchor(p209) {
          return "id" + v345.pad_left(++this.last_anchor_id, "0", 4);
        }
        serialize_node(p210, p211, p212) {
          var v360;
          var v361;
          var v362;
          var v363;
          var v364;
          var v365;
          var v366;
          var v367;
          var v368;
          var v369;
          var v370;
          var v371;
          var v372;
          v360 = this.anchors[p210.unique_id];
          if (p210.unique_id in this.serialized_nodes) {
            return this.emit(new v343.AliasEvent(v360));
          }
          this.serialized_nodes[p210.unique_id] = true;
          this.descend_resolver(p211, p212);
          if (p210 instanceof v344.ScalarNode) {
            v362 = this.resolve(v344.ScalarNode, p210.value, [true, false]);
            v361 = this.resolve(v344.ScalarNode, p210.value, [false, true]);
            v364 = [p210.tag === v362, p210.tag === v361];
            this.emit(
              new v343.ScalarEvent(
                v360,
                p210.tag,
                v364,
                p210.value,
                undefined,
                undefined,
                p210.style,
              ),
            );
          } else if (p210 instanceof v344.SequenceNode) {
            v364 = p210.tag === this.resolve(v344.SequenceNode, p210.value, true);
            this.emit(
              new v343.SequenceStartEvent(
                v360,
                p210.tag,
                v364,
                undefined,
                undefined,
                p210.flow_style,
              ),
            );
            v370 = p210.value;
            p212 = v363 = 0;
            v368 = v370.length;
            for (; v363 < v368; p212 = ++v363) {
              v365 = v370[p212];
              this.serialize_node(v365, p210, p212);
            }
            this.emit(new v343.SequenceEndEvent());
          } else if (p210 instanceof v344.MappingNode) {
            v364 = p210.tag === this.resolve(v344.MappingNode, p210.value, true);
            this.emit(
              new v343.MappingStartEvent(
                v360,
                p210.tag,
                v364,
                undefined,
                undefined,
                p210.flow_style,
              ),
            );
            v371 = p210.value;
            v366 = 0;
            v369 = v371.length;
            for (; v366 < v369; v366++) {
              [v367, v372] = v371[v366];
              this.serialize_node(v367, p210, null);
              this.serialize_node(v372, p210, v367);
            }
            this.emit(new v343.MappingEndEvent());
          }
          return this.ascend_resolver();
        }
      }
      v346 = C8.prototype.initialise;
      return C8;
    }.call(this);
  }).call(p206);
});
var $s = F((p213) => {
  w();
  (function () {
    var v373;
    var v374;
    var v375 = {}.hasOwnProperty;
    v374 = Fe();
    ({ YAMLError: v373 } = he());
    this.RepresenterError = class extends v373 {};
    this.BaseRepresenter = function () {
      var v376;
      class C9 {
        constructor() {
          return v376.apply(this, arguments);
        }
        static add_representer(p214, p215) {
          if (!this.prototype.hasOwnProperty("yaml_representers_types")) {
            this.prototype.yaml_representers_types = [].concat(
              this.prototype.yaml_representers_types,
            );
          }
          if (!this.prototype.hasOwnProperty("yaml_representers_handlers")) {
            this.prototype.yaml_representers_handlers = [].concat(
              this.prototype.yaml_representers_handlers,
            );
          }
          this.prototype.yaml_representers_types.push(p214);
          return this.prototype.yaml_representers_handlers.push(p215);
        }
        static add_multi_representer(p216, p217) {
          if (!this.prototype.hasOwnProperty("yaml_multi_representers_types")) {
            this.prototype.yaml_multi_representers_types = [].concat(
              this.prototype.yaml_multi_representers_types,
            );
          }
          if (!this.prototype.hasOwnProperty("yaml_multi_representers_handlers")) {
            this.prototype.yaml_multi_representers_handlers = [].concat(
              this.prototype.yaml_multi_representers_handlers,
            );
          }
          this.prototype.yaml_multi_representers_types.push(p216);
          return this.prototype.yaml_multi_representers_handlers.push(p217);
        }
        initialise({ default_style: arg, default_flow_style: arg2 } = {}) {
          this.default_style = arg;
          this.default_flow_style = arg2;
          this.represented_objects = {};
          this.object_keeper = [];
          return (this.alias_key = null);
        }
        represent(p218) {
          var v377;
          v377 = this.represent_data(p218);
          this.serialize(v377);
          this.represented_objects = {};
          this.object_keeper = [];
          return (this.alias_key = null);
        }
        represent_data(p219) {
          var v378;
          var v379;
          var v380;
          var v381;
          var v382;
          var v383;
          var v384;
          if (this.ignore_aliases(p219)) {
            this.alias_key = null;
          } else if ((v379 = this.object_keeper.indexOf(p219)) !== -1) {
            this.alias_key = v379;
            if (this.alias_key in this.represented_objects) {
              return this.represented_objects[this.alias_key];
            }
          } else {
            this.alias_key = this.object_keeper.length;
            this.object_keeper.push(p219);
          }
          v383 = null;
          v378 = p219 === null ? "null" : typeof p219;
          if (v378 === "object") {
            v378 = p219.constructor;
          }
          if ((v379 = this.yaml_representers_types.lastIndexOf(v378)) !== -1) {
            v383 = this.yaml_representers_handlers[v379];
          }
          if (v383 == null) {
            v382 = this.yaml_multi_representers_types;
            v379 = v380 = 0;
            v381 = v382.length;
            for (; v380 < v381; v379 = ++v380) {
              v384 = v382[v379];
              if (p219 instanceof v384) {
                v383 = this.yaml_multi_representers_handlers[v379];
                break;
              }
            }
          }
          if (v383 == null) {
            if ((v379 = this.yaml_multi_representers_types.lastIndexOf(undefined)) !== -1) {
              v383 = this.yaml_multi_representers_handlers[v379];
            } else if ((v379 = this.yaml_representers_types.lastIndexOf(undefined)) !== -1) {
              v383 = this.yaml_representers_handlers[v379];
            }
          }
          if (v383 != null) {
            return v383.call(this, p219);
          } else {
            return new v374.ScalarNode(null, "" + p219);
          }
        }
        represent_scalar(p220, p221, p222 = this.default_style) {
          var v385;
          v385 = new v374.ScalarNode(p220, p221, null, null, p222);
          if (this.alias_key != null) {
            this.represented_objects[this.alias_key] = v385;
          }
          return v385;
        }
        represent_sequence(p223, p224, p225) {
          var v386;
          var v387;
          var v388;
          var v389;
          var v390;
          var v391;
          var v392;
          v392 = [];
          v390 = new v374.SequenceNode(p223, v392, null, null, p225);
          if (this.alias_key != null) {
            this.represented_objects[this.alias_key] = v390;
          }
          v386 = true;
          v388 = 0;
          v389 = p224.length;
          for (; v388 < v389; v388++) {
            v387 = p224[v388];
            v391 = this.represent_data(v387);
            if (!(v391 instanceof v374.ScalarNode) && !v391.style) {
              v386 = false;
            }
            v392.push(v391);
          }
          if (p225 == null) {
            v390.flow_style = this.default_flow_style ?? v386;
          }
          return v390;
        }
        represent_mapping(p226, p227, p228) {
          var v393;
          var v394;
          var v395;
          var v396;
          var v397;
          var v398;
          var v399;
          v399 = [];
          v396 = new v374.MappingNode(p226, v399, p228);
          if (this.alias_key) {
            this.represented_objects[this.alias_key] = v396;
          }
          v393 = true;
          for (v394 in p227) {
            if (v375.call(p227, v394)) {
              v395 = p227[v394];
              v397 = this.represent_data(v394);
              v398 = this.represent_data(v395);
              if (!(v397 instanceof v374.ScalarNode) && !v397.style) {
                v393 = false;
              }
              if (!(v398 instanceof v374.ScalarNode) && !v398.style) {
                v393 = false;
              }
              v399.push([v397, v398]);
            }
          }
          if (!p228) {
            v396.flow_style = this.default_flow_style ?? v393;
          }
          return v396;
        }
        ignore_aliases(p229) {
          return false;
        }
      }
      C9.prototype.yaml_representers_types = [];
      C9.prototype.yaml_representers_handlers = [];
      C9.prototype.yaml_multi_representers_types = [];
      C9.prototype.yaml_multi_representers_handlers = [];
      v376 = C9.prototype.initialise;
      return C9;
    }.call(this);
    this.Representer = class extends this.BaseRepresenter {
      represent_boolean(p230) {
        return this.represent_scalar("tag:yaml.org,2002:bool", p230 ? "true" : "false");
      }
      represent_null(p231) {
        return this.represent_scalar("tag:yaml.org,2002:null", "null");
      }
      represent_number(p232) {
        var v400;
        var v401;
        v400 = "tag:yaml.org,2002:" + (p232 % 1 === 0 ? "int" : "float");
        v401 =
          p232 !== p232
            ? ".nan"
            : p232 === Infinity
              ? ".inf"
              : p232 === -Infinity
                ? "-.inf"
                : p232.toString();
        return this.represent_scalar(v400, v401);
      }
      represent_string(p233) {
        return this.represent_scalar("tag:yaml.org,2002:str", p233);
      }
      represent_array(p234) {
        return this.represent_sequence("tag:yaml.org,2002:seq", p234);
      }
      represent_date(p235) {
        return this.represent_scalar("tag:yaml.org,2002:timestamp", p235.toISOString());
      }
      represent_object(p236) {
        return this.represent_mapping("tag:yaml.org,2002:map", p236);
      }
      represent_undefined(p237) {
        throw new p213.RepresenterError("cannot represent an onbject: " + p237);
      }
      ignore_aliases(p238) {
        var v402;
        return (
          p238 == null ||
          (v402 = typeof p238) == "boolean" ||
          v402 === "number" ||
          v402 === "string"
        );
      }
    };
    this.Representer.add_representer("boolean", this.Representer.prototype.represent_boolean);
    this.Representer.add_representer("null", this.Representer.prototype.represent_null);
    this.Representer.add_representer("number", this.Representer.prototype.represent_number);
    this.Representer.add_representer("string", this.Representer.prototype.represent_string);
    this.Representer.add_representer(Array, this.Representer.prototype.represent_array);
    this.Representer.add_representer(Date, this.Representer.prototype.represent_date);
    this.Representer.add_representer(Object, this.Representer.prototype.represent_object);
    this.Representer.add_representer(null, this.Representer.prototype.represent_undefined);
  }).call(p213);
});
var qt = F((p239) => {
  w();
  (function () {
    var v403;
    var v404;
    var v405;
    var v406 = [].indexOf;
    v404 = Fe();
    v405 = we();
    ({ YAMLError: v403 } = he());
    this.ResolverError = class extends v403 {};
    this.BaseResolver = function () {
      var v407;
      var v408;
      var v409;
      var v410;
      class C10 {
        constructor() {
          return v410.apply(this, arguments);
        }
        static add_implicit_resolver(p240, p241, p242 = [null]) {
          var v411;
          var v412;
          var v413;
          var v414;
          var v415;
          if (!this.prototype.hasOwnProperty("yaml_implicit_resolvers")) {
            this.prototype.yaml_implicit_resolvers = v405.extend(
              {},
              this.prototype.yaml_implicit_resolvers,
            );
          }
          v415 = [];
          v413 = 0;
          v414 = p242.length;
          for (; v413 < v414; v413++) {
            v412 = p242[v413];
            v415.push(
              ((v411 = this.prototype.yaml_implicit_resolvers)[v412] != null
                ? v411[v412]
                : (v411[v412] = [])
              ).push([p240, p241]),
            );
          }
          return v415;
        }
        initialise() {
          this.resolver_exact_paths = [];
          return (this.resolver_prefix_paths = []);
        }
        descend_resolver(p243, p244) {
          var v416;
          var v417;
          var v418;
          var v419;
          var v420;
          var v421;
          var v422;
          var v423;
          var v424;
          var v425;
          var v426;
          if (!v405.is_empty(this.yaml_path_resolvers)) {
            v417 = {};
            v424 = [];
            if (p243) {
              v416 = this.resolver_prefix_paths.length;
              v425 = this.resolver_prefix_paths.slice(-1)[0];
              v418 = 0;
              v421 = v425.length;
              for (; v418 < v421; v418++) {
                [v423, v420] = v425[v418];
                if (this.check_resolver_prefix(v416, v423, v420, p243, p244)) {
                  if (v423.length > v416) {
                    v424.push([v423, v420]);
                  } else {
                    v417[v420] = this.yaml_path_resolvers[v423][v420];
                  }
                }
              }
            } else {
              v426 = this.yaml_path_resolvers;
              v419 = 0;
              v422 = v426.length;
              for (; v419 < v422; v419++) {
                [v423, v420] = v426[v419];
                if (v423) {
                  v424.push([v423, v420]);
                } else {
                  v417[v420] = this.yaml_path_resolvers[v423][v420];
                }
              }
            }
            this.resolver_exact_paths.push(v417);
            return this.resolver_prefix_paths.push(v424);
          }
        }
        ascend_resolver() {
          if (!v405.is_empty(this.yaml_path_resolvers)) {
            this.resolver_exact_paths.pop();
            return this.resolver_prefix_paths.pop();
          }
        }
        check_resolver_prefix(p245, p246, p247, p248, p249) {
          var v427;
          var v428;
          [v428, v427] = p246[p245 - 1];
          if (typeof v428 == "string") {
            if (p248.tag !== v428) {
              return;
            }
          } else if (v428 !== null && !(p248 instanceof v428)) {
            return;
          }
          if (
            (v427 !== true || p249 === null) &&
            ((v427 !== false && v427 !== null) || p249 !== null)
          ) {
            if (typeof v427 == "string") {
              if (!(p249 instanceof v404.ScalarNode) && v427 === p249.value) {
                return;
              }
            } else if (typeof v427 == "number" && v427 !== p249) {
              return;
            }
            return true;
          }
        }
        resolve(p250, p251, p252) {
          var v429;
          var v430;
          var v431;
          var v432;
          var v433;
          var v434;
          var v435;
          var v436;
          if (p250 === v404.ScalarNode && p252[0]) {
            if (p251 === "") {
              v435 = this.yaml_implicit_resolvers[""] ?? [];
            } else {
              v435 = this.yaml_implicit_resolvers[p251[0]] ?? [];
            }
            v435 = v435.concat(this.yaml_implicit_resolvers[null] ?? []);
            v431 = 0;
            v433 = v435.length;
            for (; v431 < v433; v431++) {
              [v436, v434] = v435[v431];
              if (p251.match(v434)) {
                return v436;
              }
            }
            p252 = p252[1];
          }
          v429 = true;
          for (v432 in this.yaml_path_resolvers) {
            if ({}[v432] == null) {
              v429 = false;
            }
          }
          if (!v429) {
            v430 = this.resolver_exact_paths.slice(-1)[0];
            if (v406.call(v430, p250) >= 0) {
              return v430[p250];
            }
            if (v406.call(v430, null) >= 0) {
              return v430[null];
            }
          }
          if (p250 === v404.ScalarNode) {
            return v408;
          }
          if (p250 === v404.SequenceNode) {
            return v409;
          }
          if (p250 === v404.MappingNode) {
            return v407;
          }
        }
      }
      v408 = "tag:yaml.org,2002:str";
      v409 = "tag:yaml.org,2002:seq";
      v407 = "tag:yaml.org,2002:map";
      C10.prototype.yaml_implicit_resolvers = {};
      C10.prototype.yaml_path_resolvers = {};
      v410 = C10.prototype.initialise;
      return C10;
    }.call(this);
    this.Resolver = class extends this.BaseResolver {};
    this.Resolver.add_implicit_resolver(
      "tag:yaml.org,2002:bool",
      /^(?:yes|Yes|YES|true|True|TRUE|on|On|ON|no|No|NO|false|False|FALSE|off|Off|OFF)$/,
      "yYnNtTfFoO",
    );
    this.Resolver.add_implicit_resolver(
      "tag:yaml.org,2002:float",
      /^(?:[-+]?(?:[0-9][0-9_]*)\.[0-9_]*(?:[eE][-+][0-9]+)?|\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*|[-+]?\.(?:inf|Inf|INF)|\.(?:nan|NaN|NAN))$/,
      "-+0123456789.",
    );
    this.Resolver.add_implicit_resolver(
      "tag:yaml.org,2002:int",
      /^(?:[-+]?0b[01_]+|[-+]?0[0-7_]+|[-+]?(?:0|[1-9][0-9_]*)|[-+]?0x[0-9a-fA-F_]+|[-+]?0o[0-7_]+|[-+]?[1-9][0-9_]*(?::[0-5]?[0-9])+)$/,
      "-+0123456789",
    );
    this.Resolver.add_implicit_resolver("tag:yaml.org,2002:merge", /^(?:<<)$/, "<");
    this.Resolver.add_implicit_resolver("tag:yaml.org,2002:null", /^(?:~|null|Null|NULL|)$/, [
      "~",
      "n",
      "N",
      "",
    ]);
    this.Resolver.add_implicit_resolver(
      "tag:yaml.org,2002:timestamp",
      /^(?:[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]|[0-9][0-9][0-9][0-9]-[0-9][0-9]?-[0-9][0-9]?(?:[Tt]|[\x20\t]+)[0-9][0-9]?:[0-9][0-9]:[0-9][0-9](?:\.[0-9]*)?(?:[\x20\t]*(?:Z|[-+][0-9][0-9]?(?::[0-9][0-9])?))?)$/,
      "0123456789",
    );
    this.Resolver.add_implicit_resolver("tag:yaml.org,2002:value", /^(?:=)$/, "=");
    this.Resolver.add_implicit_resolver("tag:yaml.org,2002:yaml", /^(?:!|&|\*)$/, "!&*");
  }).call(p239);
});
var zs = F((p253) => {
  w();
  (function () {
    var v437;
    var v438;
    var v439;
    var v440;
    var v441;
    v441 = we();
    v437 = Ls();
    v440 = qs();
    v438 = $s();
    v439 = qt();
    this.make_dumper = function (
      p254 = v437.Emitter,
      p255 = v440.Serializer,
      p256 = v438.Representer,
      p257 = v439.Resolver,
    ) {
      var v442;
      var v443;
      v443 = [p254, p255, p256, p257];
      return (v442 = function () {
        var v444;
        class C11 {
          constructor(p258, p259 = {}) {
            var v445;
            var v446;
            var v447;
            v443[0].prototype.initialise.call(this, p258, p259);
            v447 = v443.slice(1);
            v445 = 0;
            v446 = v447.length;
            for (; v445 < v446; v445++) {
              v444 = v447[v445];
              v444.prototype.initialise.call(this, p259);
            }
          }
        }
        v441.extend(
          C11.prototype,
          ...(function () {
            var v448;
            var v449;
            var v450;
            v450 = [];
            v448 = 0;
            v449 = v443.length;
            for (; v448 < v449; v448++) {
              v444 = v443[v448];
              v450.push(v444.prototype);
            }
            return v450;
          })(),
        );
        return C11;
      }.call(this));
    };
    this.Dumper = this.make_dumper();
  }).call(p253);
});
var Zr = F((p260) => {
  w();
  (function () {
    var v451;
    var v452;
    var v453 = [].indexOf;
    ({ Mark: v451, YAMLError: v452 } = he());
    this.ReaderError = class extends v452 {
      constructor(p261, p262, p263) {
        super();
        this.position = p261;
        this.character = p262;
        this.reason = p263;
      }
      toString() {
        return (
          "unacceptable character #" +
          this.character.charCodeAt(0).toString(16) +
          ": " +
          this.reason +
          "\n  position " +
          this.position
        );
      }
    };
    this.Reader = function () {
      var v454;
      var v455;
      class C12 {
        constructor() {
          return v455.apply(this, arguments);
        }
        initialise(p264) {
          this.string = p264;
          this.line = 0;
          this.column = 0;
          this.index = 0;
          this.check_printable();
          return (this.string += "\0");
        }
        peek(p265 = 0) {
          return this.string[this.index + p265];
        }
        prefix(p266 = 1) {
          return this.string.slice(this.index, this.index + p266);
        }
        forward(p267 = 1) {
          var v456;
          var v457;
          for (v457 = []; p267; ) {
            v456 = this.string[this.index];
            this.index++;
            if (
              v453.call("\n₂\u2029", v456) >= 0 ||
              (v456 === "\r" && this.string[this.index] !== "\n")
            ) {
              this.line++;
              this.column = 0;
            } else {
              this.column++;
            }
            v457.push(p267--);
          }
          return v457;
        }
        get_mark() {
          return new v451(this.line, this.column, this.string, this.index);
        }
        check_printable() {
          var v458;
          var v459;
          var v460;
          v459 = v454.exec(this.string);
          if (v459) {
            v458 = v459[0];
            v460 = this.string.length - this.index + v459.index;
            throw new p260.ReaderError(v460, v458, "special characters are not allowed");
          }
        }
      }
      v454 =
        /[^\x09\x0A\x0D\x20-\x7E\x85\xA0-\uFFFD]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
      v455 = C12.prototype.initialise;
      return C12;
    }.call(this);
  }).call(p260);
});
var $t = F((p268) => {
  w();
  (function () {
    this.Token = class {
      constructor(p269, p270) {
        this.start_mark = p269;
        this.end_mark = p270;
      }
    };
    this.DirectiveToken = function () {
      class C13 extends this.Token {
        constructor(p271, p272, p273, p274) {
          super(p273, p274);
          this.name = p271;
          this.value = p272;
        }
      }
      C13.prototype.id = "<directive>";
      return C13;
    }.call(this);
    this.DocumentStartToken = function () {
      class C14 extends this.Token {}
      C14.prototype.id = "<document start>";
      return C14;
    }.call(this);
    this.DocumentEndToken = function () {
      class C15 extends this.Token {}
      C15.prototype.id = "<document end>";
      return C15;
    }.call(this);
    this.StreamStartToken = function () {
      class C16 extends this.Token {
        constructor(p275, p276, p277) {
          super(p275, p276);
          this.encoding = p277;
        }
      }
      C16.prototype.id = "<stream start>";
      return C16;
    }.call(this);
    this.StreamEndToken = function () {
      class C17 extends this.Token {}
      C17.prototype.id = "<stream end>";
      return C17;
    }.call(this);
    this.BlockSequenceStartToken = function () {
      class C18 extends this.Token {}
      C18.prototype.id = "<block sequence start>";
      return C18;
    }.call(this);
    this.BlockMappingStartToken = function () {
      class C19 extends this.Token {}
      C19.prototype.id = "<block mapping end>";
      return C19;
    }.call(this);
    this.BlockEndToken = function () {
      class C20 extends this.Token {}
      C20.prototype.id = "<block end>";
      return C20;
    }.call(this);
    this.FlowSequenceStartToken = function () {
      class C21 extends this.Token {}
      C21.prototype.id = "[";
      return C21;
    }.call(this);
    this.FlowMappingStartToken = function () {
      class C22 extends this.Token {}
      C22.prototype.id = "{";
      return C22;
    }.call(this);
    this.FlowSequenceEndToken = function () {
      class C23 extends this.Token {}
      C23.prototype.id = "]";
      return C23;
    }.call(this);
    this.FlowMappingEndToken = function () {
      class C24 extends this.Token {}
      C24.prototype.id = "}";
      return C24;
    }.call(this);
    this.KeyToken = function () {
      class C25 extends this.Token {}
      C25.prototype.id = "?";
      return C25;
    }.call(this);
    this.ValueToken = function () {
      class C26 extends this.Token {}
      C26.prototype.id = ":";
      return C26;
    }.call(this);
    this.BlockEntryToken = function () {
      class C27 extends this.Token {}
      C27.prototype.id = "-";
      return C27;
    }.call(this);
    this.FlowEntryToken = function () {
      class C28 extends this.Token {}
      C28.prototype.id = ",";
      return C28;
    }.call(this);
    this.AliasToken = function () {
      class C29 extends this.Token {
        constructor(p278, p279, p280) {
          super(p279, p280);
          this.value = p278;
        }
      }
      C29.prototype.id = "<alias>";
      return C29;
    }.call(this);
    this.AnchorToken = function () {
      class C30 extends this.Token {
        constructor(p281, p282, p283) {
          super(p282, p283);
          this.value = p281;
        }
      }
      C30.prototype.id = "<anchor>";
      return C30;
    }.call(this);
    this.TagToken = function () {
      class C31 extends this.Token {
        constructor(p284, p285, p286) {
          super(p285, p286);
          this.value = p284;
        }
      }
      C31.prototype.id = "<tag>";
      return C31;
    }.call(this);
    this.ScalarToken = function () {
      class C32 extends this.Token {
        constructor(p287, p288, p289, p290, p291) {
          super(p289, p290);
          this.value = p287;
          this.plain = p288;
          this.style = p291;
        }
      }
      C32.prototype.id = "<scalar>";
      return C32;
    }.call(this);
  }).call(p268);
});
var Yr = F((p292) => {
  w();
  (function () {
    var v461;
    var v462;
    var v463;
    var v464;
    var v465 = {}.hasOwnProperty;
    var v466 = [].indexOf;
    ({ MarkedYAMLError: v461 } = he());
    v463 = $t();
    v464 = we();
    this.ScannerError = class extends v461 {};
    v462 = class {
      constructor(p293, p294, p295, p296, p297, p298) {
        this.token_number = p293;
        this.required = p294;
        this.index = p295;
        this.line = p296;
        this.column = p297;
        this.mark = p298;
      }
    };
    this.Scanner = function () {
      var v467;
      var v468;
      var v469;
      var v470;
      var v471;
      var v472;
      class C33 {
        constructor() {
          return v472.apply(this, arguments);
        }
        initialise() {
          this.done = false;
          this.flow_level = 0;
          this.tokens = [];
          this.fetch_stream_start();
          this.tokens_taken = 0;
          this.indent = -1;
          this.indents = [];
          this.allow_simple_key = true;
          return (this.possible_simple_keys = {});
        }
        check_token(...args) {
          var v473;
          var v474;
          var v475;
          for (; this.need_more_tokens(); ) {
            this.fetch_more_tokens();
          }
          if (this.tokens.length !== 0) {
            if (args.length === 0) {
              return true;
            }
            v474 = 0;
            v475 = args.length;
            for (; v474 < v475; v474++) {
              v473 = args[v474];
              if (this.tokens[0] instanceof v473) {
                return true;
              }
            }
          }
          return false;
        }
        peek_token() {
          while (this.need_more_tokens()) {
            this.fetch_more_tokens();
          }
          if (this.tokens.length !== 0) {
            return this.tokens[0];
          }
        }
        get_token() {
          while (this.need_more_tokens()) {
            this.fetch_more_tokens();
          }
          if (this.tokens.length !== 0) {
            this.tokens_taken++;
            return this.tokens.shift();
          }
        }
        need_more_tokens() {
          if (this.done) {
            return false;
          } else {
            return (
              this.tokens.length === 0 ||
              (this.stale_possible_simple_keys(),
              this.next_possible_simple_key() === this.tokens_taken)
            );
          }
        }
        fetch_more_tokens() {
          var v476;
          this.scan_to_next_token();
          this.stale_possible_simple_keys();
          this.unwind_indent(this.column);
          v476 = this.peek();
          if (v476 === "\0") {
            return this.fetch_stream_end();
          }
          if (v476 === "%" && this.check_directive()) {
            return this.fetch_directive();
          }
          if (v476 === "-" && this.check_document_start()) {
            return this.fetch_document_start();
          }
          if (v476 === "." && this.check_document_end()) {
            return this.fetch_document_end();
          }
          if (v476 === "[") {
            return this.fetch_flow_sequence_start();
          }
          if (v476 === "{") {
            return this.fetch_flow_mapping_start();
          }
          if (v476 === "]") {
            return this.fetch_flow_sequence_end();
          }
          if (v476 === "}") {
            return this.fetch_flow_mapping_end();
          }
          if (v476 === ",") {
            return this.fetch_flow_entry();
          }
          if (v476 === "-" && this.check_block_entry()) {
            return this.fetch_block_entry();
          }
          if (v476 === "?" && this.check_key()) {
            return this.fetch_key();
          }
          if (v476 === ":" && this.check_value()) {
            return this.fetch_value();
          }
          if (v476 === "*") {
            return this.fetch_alias();
          }
          if (v476 === "&") {
            return this.fetch_anchor();
          }
          if (v476 === "!") {
            return this.fetch_tag();
          }
          if (v476 === "|" && this.flow_level === 0) {
            return this.fetch_literal();
          }
          if (v476 === ">" && this.flow_level === 0) {
            return this.fetch_folded();
          }
          if (v476 === "'") {
            return this.fetch_single();
          }
          if (v476 === '"') {
            return this.fetch_double();
          }
          if (this.check_plain()) {
            return this.fetch_plain();
          }
          throw new p292.ScannerError(
            "while scanning for the next token",
            null,
            "found character " + v476 + " that cannot start any token",
            this.get_mark(),
          );
        }
        next_possible_simple_key() {
          var v477;
          var v478;
          var v479;
          var v480;
          v479 = null;
          v480 = this.possible_simple_keys;
          for (v478 in v480) {
            if (v465.call(v480, v478)) {
              v477 = v480[v478];
              if (v479 === null || v477.token_number < v479) {
                v479 = v477.token_number;
              }
            }
          }
          return v479;
        }
        stale_possible_simple_keys() {
          var v481;
          var v482;
          var v483;
          var v484;
          v483 = this.possible_simple_keys;
          v484 = [];
          for (v482 in v483) {
            if (
              v465.call(v483, v482) &&
              ((v481 = v483[v482]), v481.line !== this.line || !(this.index - v481.index <= 1024))
            ) {
              if (!v481.required) {
                v484.push(delete this.possible_simple_keys[v482]);
              } else {
                throw new p292.ScannerError(
                  "while scanning a simple key",
                  v481.mark,
                  "could not find expected ':'",
                  this.get_mark(),
                );
              }
            }
          }
          return v484;
        }
        save_possible_simple_key() {
          var v485;
          var v486;
          v485 = this.flow_level === 0 && this.indent === this.column;
          if (v485 && !this.allow_simple_key) {
            throw new Error("logic failure");
          }
          if (this.allow_simple_key) {
            this.remove_possible_simple_key();
            v486 = this.tokens_taken + this.tokens.length;
            return (this.possible_simple_keys[this.flow_level] = new v462(
              v486,
              v485,
              this.index,
              this.line,
              this.column,
              this.get_mark(),
            ));
          }
        }
        remove_possible_simple_key() {
          var v487;
          if ((v487 = this.possible_simple_keys[this.flow_level])) {
            if (v487.required) {
              throw new p292.ScannerError(
                "while scanning a simple key",
                v487.mark,
                "could not find expected ':'",
                this.get_mark(),
              );
            }
            return delete this.possible_simple_keys[this.flow_level];
          }
        }
        unwind_indent(p299) {
          var v488;
          var v489;
          if (this.flow_level === 0) {
            for (v489 = []; this.indent > p299; ) {
              v488 = this.get_mark();
              this.indent = this.indents.pop();
              v489.push(this.tokens.push(new v463.BlockEndToken(v488, v488)));
            }
            return v489;
          }
        }
        add_indent(p300) {
          if (p300 > this.indent) {
            this.indents.push(this.indent);
            this.indent = p300;
            return true;
          } else {
            return false;
          }
        }
        fetch_stream_start() {
          var v490;
          v490 = this.get_mark();
          return this.tokens.push(new v463.StreamStartToken(v490, v490, this.encoding));
        }
        fetch_stream_end() {
          var v491;
          this.unwind_indent(-1);
          this.remove_possible_simple_key();
          this.allow_possible_simple_key = false;
          this.possible_simple_keys = {};
          v491 = this.get_mark();
          this.tokens.push(new v463.StreamEndToken(v491, v491));
          return (this.done = true);
        }
        fetch_directive() {
          this.unwind_indent(-1);
          this.remove_possible_simple_key();
          this.allow_simple_key = false;
          return this.tokens.push(this.scan_directive());
        }
        fetch_document_start() {
          return this.fetch_document_indicator(v463.DocumentStartToken);
        }
        fetch_document_end() {
          return this.fetch_document_indicator(v463.DocumentEndToken);
        }
        fetch_document_indicator(p301) {
          var v492;
          this.unwind_indent(-1);
          this.remove_possible_simple_key();
          this.allow_simple_key = false;
          v492 = this.get_mark();
          this.forward(3);
          return this.tokens.push(new p301(v492, this.get_mark()));
        }
        fetch_flow_sequence_start() {
          return this.fetch_flow_collection_start(v463.FlowSequenceStartToken);
        }
        fetch_flow_mapping_start() {
          return this.fetch_flow_collection_start(v463.FlowMappingStartToken);
        }
        fetch_flow_collection_start(p302) {
          var v493;
          this.save_possible_simple_key();
          this.flow_level++;
          this.allow_simple_key = true;
          v493 = this.get_mark();
          this.forward();
          return this.tokens.push(new p302(v493, this.get_mark()));
        }
        fetch_flow_sequence_end() {
          return this.fetch_flow_collection_end(v463.FlowSequenceEndToken);
        }
        fetch_flow_mapping_end() {
          return this.fetch_flow_collection_end(v463.FlowMappingEndToken);
        }
        fetch_flow_collection_end(p303) {
          var v494;
          this.remove_possible_simple_key();
          this.flow_level--;
          this.allow_simple_key = false;
          v494 = this.get_mark();
          this.forward();
          return this.tokens.push(new p303(v494, this.get_mark()));
        }
        fetch_flow_entry() {
          var v495;
          this.allow_simple_key = true;
          this.remove_possible_simple_key();
          v495 = this.get_mark();
          this.forward();
          return this.tokens.push(new v463.FlowEntryToken(v495, this.get_mark()));
        }
        fetch_block_entry() {
          var v496;
          var v497;
          if (this.flow_level === 0) {
            if (!this.allow_simple_key) {
              throw new p292.ScannerError(
                null,
                null,
                "sequence entries are not allowed here",
                this.get_mark(),
              );
            }
            if (this.add_indent(this.column)) {
              v496 = this.get_mark();
              this.tokens.push(new v463.BlockSequenceStartToken(v496, v496));
            }
          }
          this.allow_simple_key = true;
          this.remove_possible_simple_key();
          v497 = this.get_mark();
          this.forward();
          return this.tokens.push(new v463.BlockEntryToken(v497, this.get_mark()));
        }
        fetch_key() {
          var v498;
          var v499;
          if (this.flow_level === 0) {
            if (!this.allow_simple_key) {
              throw new p292.ScannerError(
                null,
                null,
                "mapping keys are not allowed here",
                this.get_mark(),
              );
            }
            if (this.add_indent(this.column)) {
              v498 = this.get_mark();
              this.tokens.push(new v463.BlockMappingStartToken(v498, v498));
            }
          }
          this.allow_simple_key = !this.flow_level;
          this.remove_possible_simple_key();
          v499 = this.get_mark();
          this.forward();
          return this.tokens.push(new v463.KeyToken(v499, this.get_mark()));
        }
        fetch_value() {
          var v500;
          var v501;
          var v502;
          if ((v500 = this.possible_simple_keys[this.flow_level])) {
            delete this.possible_simple_keys[this.flow_level];
            this.tokens.splice(
              v500.token_number - this.tokens_taken,
              0,
              new v463.KeyToken(v500.mark, v500.mark),
            );
            if (this.flow_level === 0 && this.add_indent(v500.column)) {
              this.tokens.splice(
                v500.token_number - this.tokens_taken,
                0,
                new v463.BlockMappingStartToken(v500.mark, v500.mark),
              );
            }
            this.allow_simple_key = false;
          } else {
            if (this.flow_level === 0) {
              if (!this.allow_simple_key) {
                throw new p292.ScannerError(
                  null,
                  null,
                  "mapping values are not allowed here",
                  this.get_mark(),
                );
              }
              if (this.add_indent(this.column)) {
                v501 = this.get_mark();
                this.tokens.push(new v463.BlockMappingStartToken(v501, v501));
              }
            }
            this.allow_simple_key = !this.flow_level;
            this.remove_possible_simple_key();
          }
          v502 = this.get_mark();
          this.forward();
          return this.tokens.push(new v463.ValueToken(v502, this.get_mark()));
        }
        fetch_alias() {
          this.save_possible_simple_key();
          this.allow_simple_key = false;
          return this.tokens.push(this.scan_anchor(v463.AliasToken));
        }
        fetch_anchor() {
          this.save_possible_simple_key();
          this.allow_simple_key = false;
          return this.tokens.push(this.scan_anchor(v463.AnchorToken));
        }
        fetch_tag() {
          this.save_possible_simple_key();
          this.allow_simple_key = false;
          return this.tokens.push(this.scan_tag());
        }
        fetch_literal() {
          return this.fetch_block_scalar("|");
        }
        fetch_folded() {
          return this.fetch_block_scalar(">");
        }
        fetch_block_scalar(p304) {
          this.allow_simple_key = true;
          this.remove_possible_simple_key();
          return this.tokens.push(this.scan_block_scalar(p304));
        }
        fetch_single() {
          return this.fetch_flow_scalar("'");
        }
        fetch_double() {
          return this.fetch_flow_scalar('"');
        }
        fetch_flow_scalar(p305) {
          this.save_possible_simple_key();
          this.allow_simple_key = false;
          return this.tokens.push(this.scan_flow_scalar(p305));
        }
        fetch_plain() {
          this.save_possible_simple_key();
          this.allow_simple_key = false;
          return this.tokens.push(this.scan_plain());
        }
        check_directive() {
          return this.column === 0;
        }
        check_document_start() {
          var v503;
          return (
            this.column === 0 &&
            this.prefix(3) === "---" &&
            ((v503 = this.peek(3)), v466.call(v467 + v469 + "\0", v503) >= 0)
          );
        }
        check_document_end() {
          var v504;
          return (
            this.column === 0 &&
            this.prefix(3) === "..." &&
            ((v504 = this.peek(3)), v466.call(v467 + v469 + "\0", v504) >= 0)
          );
        }
        check_block_entry() {
          var v505;
          v505 = this.peek(1);
          return v466.call(v467 + v469 + "\0", v505) >= 0;
        }
        check_key() {
          var v506;
          if (this.flow_level !== 0) {
            return true;
          } else {
            v506 = this.peek(1);
            return v466.call(v467 + v469 + "\0", v506) >= 0;
          }
        }
        check_value() {
          var v507;
          if (this.flow_level !== 0) {
            return true;
          } else {
            v507 = this.peek(1);
            return v466.call(v467 + v469 + "\0", v507) >= 0;
          }
        }
        check_plain() {
          var v508;
          var v509;
          v508 = this.peek();
          return (
            v466.call(v467 + v469 + "\0-?:,[]{}#&*!|>'\"%@`", v508) < 0 ||
            ((v509 = this.peek(1)),
            v466.call(v467 + v469 + "\0", v509) < 0 &&
              (v508 === "-" || (this.flow_level === 0 && v466.call("?:", v508) >= 0)))
          );
        }
        scan_to_next_token() {
          var v510;
          var v511;
          var v512;
          if (this.index === 0 && this.peek() === "﻿") {
            this.forward();
          }
          v510 = false;
          v512 = [];
          while (!v510) {
            while (this.peek() === " ") {
              this.forward();
            }
            if (this.peek() === "#") {
              while (((v511 = this.peek()), v466.call(v467 + "\0", v511) < 0)) {
                this.forward();
              }
            }
            if (this.scan_line_break()) {
              if (this.flow_level === 0) {
                v512.push((this.allow_simple_key = true));
              } else {
                v512.push(undefined);
              }
            } else {
              v512.push((v510 = true));
            }
          }
          return v512;
        }
        scan_directive() {
          var v513;
          var v514;
          var v515;
          var v516;
          var v517;
          v516 = this.get_mark();
          this.forward();
          v514 = this.scan_directive_name(v516);
          v517 = null;
          if (v514 === "YAML") {
            v517 = this.scan_yaml_directive_value(v516);
            v513 = this.get_mark();
          } else if (v514 === "TAG") {
            v517 = this.scan_tag_directive_value(v516);
            v513 = this.get_mark();
          } else {
            for (v513 = this.get_mark(); (v515 = this.peek()), v466.call(v467 + "\0", v515) < 0; ) {
              this.forward();
            }
          }
          this.scan_directive_ignored_line(v516);
          return new v463.DirectiveToken(v514, v517, v516, v513);
        }
        scan_directive_name(p306) {
          var v518;
          var v519;
          var v520;
          v519 = 0;
          v518 = this.peek(v519);
          while (
            (v518 >= "0" && v518 <= "9") ||
            (v518 >= "A" && v518 <= "Z") ||
            (v518 >= "a" && v518 <= "z") ||
            v466.call("-_", v518) >= 0
          ) {
            v519++;
            v518 = this.peek(v519);
          }
          if (v519 === 0) {
            throw new p292.ScannerError(
              "while scanning a directive",
              p306,
              "expected alphanumeric or numeric character but found " + v518,
              this.get_mark(),
            );
          }
          v520 = this.prefix(v519);
          this.forward(v519);
          v518 = this.peek();
          if (v466.call(v467 + "\0 ", v518) < 0) {
            throw new p292.ScannerError(
              "while scanning a directive",
              p306,
              "expected alphanumeric or numeric character but found " + v518,
              this.get_mark(),
            );
          }
          return v520;
        }
        scan_yaml_directive_value(p307) {
          var v521;
          var v522;
          var v523;
          for (; this.peek() === " "; ) {
            this.forward();
          }
          v521 = this.scan_yaml_directive_number(p307);
          if (this.peek() !== ".") {
            throw new p292.ScannerError(
              "while scanning a directive",
              p307,
              "expected a digit or '.' but found " + this.peek(),
              this.get_mark(),
            );
          }
          this.forward();
          v522 = this.scan_yaml_directive_number(p307);
          v523 = this.peek();
          if (v466.call(v467 + "\0 ", v523) < 0) {
            throw new p292.ScannerError(
              "while scanning a directive",
              p307,
              "expected a digit or ' ' but found " + this.peek(),
              this.get_mark(),
            );
          }
          return [v521, v522];
        }
        scan_yaml_directive_number(p308) {
          var v524;
          var v525;
          var v526;
          var v527;
          v524 = this.peek();
          if (!(v524 >= "0") || !(v524 <= "9")) {
            throw new p292.ScannerError(
              "while scanning a directive",
              p308,
              "expected a digit but found " + v524,
              this.get_mark(),
            );
          }
          for (v525 = 0; (v526 = this.peek(v525)) >= "0" && v526 <= "9"; ) {
            v525++;
          }
          v527 = parseInt(this.prefix(v525));
          this.forward(v525);
          return v527;
        }
        scan_tag_directive_value(p309) {
          var v528;
          var v529;
          for (; this.peek() === " "; ) {
            this.forward();
          }
          for (v528 = this.scan_tag_directive_handle(p309); this.peek() === " "; ) {
            this.forward();
          }
          v529 = this.scan_tag_directive_prefix(p309);
          return [v528, v529];
        }
        scan_tag_directive_handle(p310) {
          var v530;
          var v531;
          v531 = this.scan_tag_handle("directive", p310);
          v530 = this.peek();
          if (v530 !== " ") {
            throw new p292.ScannerError(
              "while scanning a directive",
              p310,
              "expected ' ' but found " + v530,
              this.get_mark(),
            );
          }
          return v531;
        }
        scan_tag_directive_prefix(p311) {
          var v532;
          var v533;
          v533 = this.scan_tag_uri("directive", p311);
          v532 = this.peek();
          if (v466.call(v467 + "\0 ", v532) < 0) {
            throw new p292.ScannerError(
              "while scanning a directive",
              p311,
              "expected ' ' but found " + v532,
              this.get_mark(),
            );
          }
          return v533;
        }
        scan_directive_ignored_line(p312) {
          var v534;
          var v535;
          for (; this.peek() === " "; ) {
            this.forward();
          }
          if (this.peek() === "#") {
            while (((v535 = this.peek()), v466.call(v467 + "\0", v535) < 0)) {
              this.forward();
            }
          }
          v534 = this.peek();
          if (v466.call(v467 + "\0", v534) < 0) {
            throw new p292.ScannerError(
              "while scanning a directive",
              p312,
              "expected a comment or a line break but found " + v534,
              this.get_mark(),
            );
          }
          return this.scan_line_break();
        }
        scan_anchor(p313) {
          var v536;
          var v537;
          var v538;
          var v539;
          var v540;
          var v541;
          v540 = this.get_mark();
          v537 = this.peek();
          if (v537 === "*") {
            v539 = "alias";
          } else {
            v539 = "anchor";
          }
          this.forward();
          v538 = 0;
          v536 = this.peek(v538);
          while (
            (v536 >= "0" && v536 <= "9") ||
            (v536 >= "A" && v536 <= "Z") ||
            (v536 >= "a" && v536 <= "z") ||
            v466.call("-_", v536) >= 0
          ) {
            v538++;
            v536 = this.peek(v538);
          }
          if (v538 === 0) {
            throw new p292.ScannerError(
              "while scanning an " + v539,
              v540,
              "expected alphabetic or numeric character but found '" + v536 + "'",
              this.get_mark(),
            );
          }
          v541 = this.prefix(v538);
          this.forward(v538);
          v536 = this.peek();
          if (v466.call(v467 + v469 + "\0?:,]}%@`", v536) < 0) {
            throw new p292.ScannerError(
              "while scanning an " + v539,
              v540,
              "expected alphabetic or numeric character but found '" + v536 + "'",
              this.get_mark(),
            );
          }
          return new p313(v541, v540, this.get_mark());
        }
        scan_tag() {
          var v542;
          var v543;
          var v544;
          var v545;
          var v546;
          var v547;
          v545 = this.get_mark();
          v542 = this.peek(1);
          if (v542 === "<") {
            v543 = null;
            this.forward(2);
            v546 = this.scan_tag_uri("tag", v545);
            if (this.peek() !== ">") {
              throw new p292.ScannerError(
                "while parsing a tag",
                v545,
                "expected '>' but found " + this.peek(),
                this.get_mark(),
              );
            }
            this.forward();
          } else if (v466.call(v467 + v469 + "\0", v542) >= 0) {
            v543 = null;
            v546 = "!";
            this.forward();
          } else {
            v544 = 1;
            v547 = false;
            while (v466.call(v467 + "\0 ", v542) < 0) {
              if (v542 === "!") {
                v547 = true;
                break;
              }
              v544++;
              v542 = this.peek(v544);
            }
            if (v547) {
              v543 = this.scan_tag_handle("tag", v545);
            } else {
              v543 = "!";
              this.forward();
            }
            v546 = this.scan_tag_uri("tag", v545);
          }
          v542 = this.peek();
          if (v466.call(v467 + "\0 ", v542) < 0) {
            throw new p292.ScannerError(
              "while scanning a tag",
              v545,
              "expected ' ' but found " + v542,
              this.get_mark(),
            );
          }
          return new v463.TagToken([v543, v546], v545, this.get_mark());
        }
        scan_block_scalar(p314) {
          var v548;
          var v549;
          var v550;
          var v551;
          var v552;
          var v553;
          var v554;
          var v555;
          var v556;
          var v557;
          var v558;
          var v559;
          var v560;
          var v561;
          var v562;
          var v563;
          v552 = p314 === ">";
          v550 = [];
          v563 = this.get_mark();
          this.forward();
          [v549, v553] = this.scan_block_scalar_indicators(v563);
          this.scan_block_scalar_ignored_line(v563);
          v559 = this.indent + 1;
          if (v559 < 1) {
            v559 = 1;
          }
          if (v553 == null) {
            [v548, v558, v551] = this.scan_block_scalar_indentation();
            v554 = Math.max(v559, v558);
          } else {
            v554 = v559 + v553 - 1;
            [v548, v551] = this.scan_block_scalar_breaks(v554);
          }
          v557 = "";
          while (this.column === v554 && this.peek() !== "\0") {
            v550 = v550.concat(v548);
            v560 = this.peek();
            v555 = v466.call(" \t", v560) < 0;
            v556 = 0;
            while (((v561 = this.peek(v556)), v466.call(v467 + "\0", v561) < 0)) {
              v556++;
            }
            v550.push(this.prefix(v556));
            this.forward(v556);
            v557 = this.scan_line_break();
            [v548, v551] = this.scan_block_scalar_breaks(v554);
            if (this.column === v554 && this.peek() !== "\0") {
              if (
                v552 &&
                v557 === "\n" &&
                v555 &&
                ((v562 = this.peek()), v466.call(" \t", v562) < 0)
              ) {
                if (v464.is_empty(v548)) {
                  v550.push(" ");
                }
              } else {
                v550.push(v557);
              }
            } else {
              break;
            }
          }
          if (v549 !== false) {
            v550.push(v557);
          }
          if (v549 === true) {
            v550 = v550.concat(v548);
          }
          return new v463.ScalarToken(v550.join(""), false, v563, v551, p314);
        }
        scan_block_scalar_indicators(p315) {
          var v564;
          var v565;
          var v566;
          v565 = null;
          v566 = null;
          v564 = this.peek();
          if (v466.call("+-", v564) >= 0) {
            v565 = v564 === "+";
            this.forward();
            v564 = this.peek();
            if (v466.call(v468, v564) >= 0) {
              v566 = parseInt(v564);
              if (v566 === 0) {
                throw new p292.ScannerError(
                  "while scanning a block scalar",
                  p315,
                  "expected indentation indicator in the range 1-9 but found 0",
                  this.get_mark(),
                );
              }
              this.forward();
            }
          } else if (v466.call(v468, v564) >= 0) {
            v566 = parseInt(v564);
            if (v566 === 0) {
              throw new p292.ScannerError(
                "while scanning a block scalar",
                p315,
                "expected indentation indicator in the range 1-9 but found 0",
                this.get_mark(),
              );
            }
            this.forward();
            v564 = this.peek();
            if (v466.call("+-", v564) >= 0) {
              v565 = v564 === "+";
              this.forward();
            }
          }
          v564 = this.peek();
          if (v466.call(v467 + "\0 ", v564) < 0) {
            throw new p292.ScannerError(
              "while scanning a block scalar",
              p315,
              "expected chomping or indentation indicators, but found " + v564,
              this.get_mark(),
            );
          }
          return [v565, v566];
        }
        scan_block_scalar_ignored_line(p316) {
          var v567;
          var v568;
          for (; this.peek() === " "; ) {
            this.forward();
          }
          if (this.peek() === "#") {
            while (((v568 = this.peek()), v466.call(v467 + "\0", v568) < 0)) {
              this.forward();
            }
          }
          v567 = this.peek();
          if (v466.call(v467 + "\0", v567) < 0) {
            throw new p292.ScannerError(
              "while scanning a block scalar",
              p316,
              "expected a comment or a line break but found " + v567,
              this.get_mark(),
            );
          }
          return this.scan_line_break();
        }
        scan_block_scalar_indentation() {
          var v569;
          var v570;
          var v571;
          var v572;
          v569 = [];
          v571 = 0;
          v570 = this.get_mark();
          while (((v572 = this.peek()), v466.call(v467 + " ", v572) >= 0)) {
            if (this.peek() !== " ") {
              v569.push(this.scan_line_break());
              v570 = this.get_mark();
            } else {
              this.forward();
              if (this.column > v571) {
                v571 = this.column;
              }
            }
          }
          return [v569, v571, v570];
        }
        scan_block_scalar_breaks(p317) {
          var v573;
          var v574;
          var v575;
          v573 = [];
          v574 = this.get_mark();
          while (this.column < p317 && this.peek() === " ") {
            this.forward();
          }
          while (((v575 = this.peek()), v466.call(v467, v575) >= 0)) {
            v573.push(this.scan_line_break());
            v574 = this.get_mark();
            while (this.column < p317 && this.peek() === " ") {
              this.forward();
            }
          }
          return [v573, v574];
        }
        scan_flow_scalar(p318) {
          var v576;
          var v577;
          var v578;
          var v579;
          v577 = p318 === '"';
          v576 = [];
          v579 = this.get_mark();
          v578 = this.peek();
          this.forward();
          v576 = v576.concat(this.scan_flow_scalar_non_spaces(v577, v579));
          while (this.peek() !== v578) {
            v576 = v576.concat(this.scan_flow_scalar_spaces(v577, v579));
            v576 = v576.concat(this.scan_flow_scalar_non_spaces(v577, v579));
          }
          this.forward();
          return new v463.ScalarToken(v576.join(""), false, v579, this.get_mark(), p318);
        }
        scan_flow_scalar_non_spaces(p319, p320) {
          var v580;
          var v581;
          var v582;
          var v583;
          var v584;
          var v585;
          var v586;
          var v587;
          var v588;
          for (v581 = []; ; ) {
            for (
              v585 = 0;
              (v586 = this.peek(v585)), v466.call(v467 + v469 + "'\"\\\0", v586) < 0;

            ) {
              v585++;
            }
            if (v585 !== 0) {
              v581.push(this.prefix(v585));
              this.forward(v585);
            }
            v580 = this.peek();
            if (!p319 && v580 === "'" && this.peek(1) === "'") {
              v581.push("'");
              this.forward(2);
            } else if ((p319 && v580 === "'") || (!p319 && v466.call('"\\', v580) >= 0)) {
              v581.push(v580);
              this.forward();
            } else if (p319 && v580 === "\\") {
              this.forward();
              v580 = this.peek();
              if (v580 in v471) {
                v581.push(v471[v580]);
                this.forward();
              } else if (v580 in v470) {
                v585 = v470[v580];
                this.forward();
                v584 = v583 = 0;
                v587 = v585;
                for (; v587 >= 0 ? v583 < v587 : v583 > v587; v584 = v587 >= 0 ? ++v583 : --v583) {
                  v588 = this.peek(v584);
                  if (v466.call(v468 + "ABCDEFabcdef", v588) < 0) {
                    throw new p292.ScannerError(
                      "while scanning a double-quoted scalar",
                      p320,
                      "expected escape sequence of " +
                        v585 +
                        " hexadecimal numbers, but found " +
                        this.peek(v584),
                      this.get_mark(),
                    );
                  }
                }
                v582 = parseInt(this.prefix(v585), 16);
                v581.push(String.fromCharCode(v582));
                this.forward(v585);
              } else if (v466.call(v467, v580) >= 0) {
                this.scan_line_break();
                v581 = v581.concat(this.scan_flow_scalar_breaks(p319, p320));
              } else {
                throw new p292.ScannerError(
                  "while scanning a double-quoted scalar",
                  p320,
                  "found unknown escape character " + v580,
                  this.get_mark(),
                );
              }
            } else {
              return v581;
            }
          }
        }
        scan_flow_scalar_spaces(p321, p322) {
          var v589;
          var v590;
          var v591;
          var v592;
          var v593;
          var v594;
          var v595;
          v591 = [];
          v592 = 0;
          while (((v594 = this.peek(v592)), v466.call(v469, v594) >= 0)) {
            v592++;
          }
          v595 = this.prefix(v592);
          this.forward(v592);
          v590 = this.peek();
          if (v590 === "\0") {
            throw new p292.ScannerError(
              "while scanning a quoted scalar",
              p322,
              "found unexpected end of stream",
              this.get_mark(),
            );
          }
          if (v466.call(v467, v590) >= 0) {
            v593 = this.scan_line_break();
            v589 = this.scan_flow_scalar_breaks(p321, p322);
            if (v593 !== "\n") {
              v591.push(v593);
            } else if (v589.length === 0) {
              v591.push(" ");
            }
            v591 = v591.concat(v589);
          } else {
            v591.push(v595);
          }
          return v591;
        }
        scan_flow_scalar_breaks(p323, p324) {
          var v596;
          var v597;
          var v598;
          var v599;
          var v600;
          for (v596 = []; ; ) {
            v597 = this.prefix(3);
            if (
              v597 === "---" ||
              (v597 === "..." && ((v598 = this.peek(3)), v466.call(v467 + v469 + "\0", v598) >= 0))
            ) {
              throw new p292.ScannerError(
                "while scanning a quoted scalar",
                p324,
                "found unexpected document separator",
                this.get_mark(),
              );
            }
            while (((v599 = this.peek()), v466.call(v469, v599) >= 0)) {
              this.forward();
            }
            v600 = this.peek();
            if (v466.call(v467, v600) >= 0) {
              v596.push(this.scan_line_break());
            } else {
              return v596;
            }
          }
        }
        scan_plain() {
          var v601;
          var v602;
          var v603;
          var v604;
          var v605;
          var v606;
          var v607;
          var v608;
          var v609;
          v602 = [];
          v609 = v603 = this.get_mark();
          v604 = this.indent + 1;
          v608 = [];
          while (((v605 = 0), this.peek() !== "#")) {
            while (
              ((v601 = this.peek(v605)),
              !(v466.call(v467 + v469 + "\0", v601) >= 0) &&
                (this.flow_level !== 0 ||
                  v601 !== ":" ||
                  !((v606 = this.peek(v605 + 1)), v466.call(v467 + v469 + "\0", v606) >= 0)) &&
                (this.flow_level === 0 || !(v466.call(",:?[]{}", v601) >= 0)))
            ) {
              v605++;
            }
            if (
              this.flow_level !== 0 &&
              v601 === ":" &&
              ((v607 = this.peek(v605 + 1)), v466.call(v467 + v469 + "\0,[]{}", v607) < 0)
            ) {
              this.forward(v605);
              throw new p292.ScannerError(
                "while scanning a plain scalar",
                v609,
                "found unexpected ':'",
                this.get_mark(),
                "Please check http://pyyaml.org/wiki/YAMLColonInFlowContext",
              );
            }
            if (
              v605 === 0 ||
              ((this.allow_simple_key = false),
              (v602 = v602.concat(v608)),
              v602.push(this.prefix(v605)),
              this.forward(v605),
              (v603 = this.get_mark()),
              (v608 = this.scan_plain_spaces(v604, v609)),
              v608 == null ||
                v608.length === 0 ||
                this.peek() === "#" ||
                (this.flow_level === 0 && this.column < v604))
            ) {
              break;
            }
          }
          return new v463.ScalarToken(v602.join(""), true, v609, v603);
        }
        scan_plain_spaces(p325, p326) {
          var v610;
          var v611;
          var v612;
          var v613;
          var v614;
          var v615;
          var v616;
          var v617;
          var v618;
          var v619;
          var v620;
          v612 = [];
          v613 = 0;
          while (((v616 = this.peek(v613)), v466.call(" ", v616) >= 0)) {
            v613++;
          }
          v620 = this.prefix(v613);
          this.forward(v613);
          v611 = this.peek();
          if (v466.call(v467, v611) >= 0) {
            v614 = this.scan_line_break();
            this.allow_simple_key = true;
            v615 = this.prefix(3);
            if (
              v615 === "---" ||
              (v615 === "..." && ((v617 = this.peek(3)), v466.call(v467 + v469 + "\0", v617) >= 0))
            ) {
              return;
            }
            for (v610 = []; (v619 = this.peek()), v466.call(v467 + " ", v619) >= 0; ) {
              if (this.peek() === " ") {
                this.forward();
              } else {
                v610.push(this.scan_line_break());
                v615 = this.prefix(3);
                if (
                  v615 === "---" ||
                  (v615 === "..." &&
                    ((v618 = this.peek(3)), v466.call(v467 + v469 + "\0", v618) >= 0))
                ) {
                  return;
                }
              }
            }
            if (v614 !== "\n") {
              v612.push(v614);
            } else if (v610.length === 0) {
              v612.push(" ");
            }
            v612 = v612.concat(v610);
          } else if (v620) {
            v612.push(v620);
          }
          return v612;
        }
        scan_tag_handle(p327, p328) {
          var v621;
          var v622;
          var v623;
          v621 = this.peek();
          if (v621 !== "!") {
            throw new p292.ScannerError(
              "while scanning a " + p327,
              p328,
              "expected '!' but found " + v621,
              this.get_mark(),
            );
          }
          v622 = 1;
          v621 = this.peek(v622);
          if (v621 !== " ") {
            while (
              (v621 >= "0" && v621 <= "9") ||
              (v621 >= "A" && v621 <= "Z") ||
              (v621 >= "a" && v621 <= "z") ||
              v466.call("-_", v621) >= 0
            ) {
              v622++;
              v621 = this.peek(v622);
            }
            if (v621 !== "!") {
              this.forward(v622);
              throw new p292.ScannerError(
                "while scanning a " + p327,
                p328,
                "expected '!' but found " + v621,
                this.get_mark(),
              );
            }
            v622++;
          }
          v623 = this.prefix(v622);
          this.forward(v622);
          return v623;
        }
        scan_tag_uri(p329, p330) {
          var v624;
          var v625;
          var v626;
          v625 = [];
          v626 = 0;
          v624 = this.peek(v626);
          while (
            (v624 >= "0" && v624 <= "9") ||
            (v624 >= "A" && v624 <= "Z") ||
            (v624 >= "a" && v624 <= "z") ||
            v466.call("-;/?:@&=+$,_.!~*'()[]%", v624) >= 0
          ) {
            if (v624 === "%") {
              v625.push(this.prefix(v626));
              this.forward(v626);
              v626 = 0;
              v625.push(this.scan_uri_escapes(p329, p330));
            } else {
              v626++;
            }
            v624 = this.peek(v626);
          }
          if (v626 !== 0) {
            v625.push(this.prefix(v626));
            this.forward(v626);
            v626 = 0;
          }
          if (v625.length === 0) {
            throw new p292.ScannerError(
              "while parsing a " + p329,
              p330,
              "expected URI but found " + v624,
              this.get_mark(),
            );
          }
          return v625.join("");
        }
        scan_uri_escapes(p331, p332) {
          var v627;
          var v628;
          var v629;
          var v630;
          v627 = [];
          v630 = this.get_mark();
          while (this.peek() === "%") {
            this.forward();
            v629 = v628 = 0;
            for (; v628 <= 2; v629 = ++v628) {
              throw new p292.ScannerError(
                "while scanning a " + p331,
                p332,
                "expected URI escape sequence of 2 hexadecimal numbers but found " +
                  this.peek(v629),
                this.get_mark(),
              );
            }
            v627.push(String.fromCharCode(parseInt(this.prefix(2), 16)));
            this.forward(2);
          }
          return v627.join("");
        }
        scan_line_break() {
          var v631;
          v631 = this.peek();
          if (v466.call("\r\n", v631) >= 0) {
            if (this.prefix(2) === "\r\n") {
              this.forward(2);
            } else {
              this.forward();
            }
            return "\n";
          } else if (v466.call("\u2028\u2029", v631) >= 0) {
            this.forward();
            return v631;
          } else {
            return "";
          }
        }
      }
      v467 = "\r\n\u2028\u2029";
      v469 = "\t ";
      v468 = "0123456789";
      v471 = {
        0: "\0",
        a: "",
        b: "\b",
        t: "\t",
        "\t": "\t",
        n: "\n",
        v: "",
        f: "\f",
        r: "\r",
        e: "",
        " ": " ",
        '"': '"',
        "\\": "\\",
        N: "",
        _: "\xA0",
        L: "\u2028",
        P: "\u2029",
      };
      v470 = {
        x: 2,
        u: 4,
        U: 8,
      };
      v472 = C33.prototype.initialise;
      return C33;
    }.call(this);
  }).call(p292);
});
var Jr = F((p333) => {
  w();
  (function () {
    var v632;
    var v633;
    var v634;
    var v635 = {}.hasOwnProperty;
    v633 = et();
    ({ MarkedYAMLError: v632 } = he());
    v634 = $t();
    this.ParserError = class extends v632 {};
    this.Parser = function () {
      var v636;
      var v637;
      class C34 {
        constructor() {
          return v637.apply(this, arguments);
        }
        initialise() {
          this.current_event = null;
          this.yaml_version = null;
          this.tag_handles = {};
          this.states = [];
          this.marks = [];
          return (this.state = "parse_stream_start");
        }
        dispose() {
          this.states = [];
          return (this.state = null);
        }
        check_event(...args) {
          var v638;
          var v639;
          var v640;
          if (this.current_event === null && this.state != null) {
            this.current_event = this[this.state]();
          }
          if (this.current_event !== null) {
            if (args.length === 0) {
              return true;
            }
            v639 = 0;
            v640 = args.length;
            for (; v639 < v640; v639++) {
              v638 = args[v639];
              if (this.current_event instanceof v638) {
                return true;
              }
            }
          }
          return false;
        }
        peek_event() {
          if (this.current_event === null && this.state != null) {
            this.current_event = this[this.state]();
          }
          return this.current_event;
        }
        get_event() {
          var v641;
          if (this.current_event === null && this.state != null) {
            this.current_event = this[this.state]();
          }
          v641 = this.current_event;
          this.current_event = null;
          return v641;
        }
        parse_stream_start() {
          var v642;
          var v643;
          v643 = this.get_token();
          v642 = new v633.StreamStartEvent(v643.start_mark, v643.end_mark);
          this.state = "parse_implicit_document_start";
          return v642;
        }
        parse_implicit_document_start() {
          var v644;
          var v645;
          var v646;
          var v647;
          if (this.check_token(v634.DirectiveToken, v634.DocumentStartToken, v634.StreamEndToken)) {
            return this.parse_document_start();
          } else {
            this.tag_handles = v636;
            v647 = this.peek_token();
            v646 = v644 = v647.start_mark;
            v645 = new v633.DocumentStartEvent(v646, v644, false);
            this.states.push("parse_document_end");
            this.state = "parse_block_node";
            return v645;
          }
        }
        parse_document_start() {
          var v648;
          var v649;
          var v650;
          var v651;
          var v652;
          var v653;
          for (; this.check_token(v634.DocumentEndToken); ) {
            this.get_token();
          }
          if (this.check_token(v634.StreamEndToken)) {
            v652 = this.get_token();
            v649 = new v633.StreamEndEvent(v652.start_mark, v652.end_mark);
            if (this.states.length !== 0) {
              throw new Error("assertion error, states should be empty");
            }
            if (this.marks.length !== 0) {
              throw new Error("assertion error, marks should be empty");
            }
            this.state = null;
          } else {
            v650 = this.peek_token().start_mark;
            [v653, v651] = this.process_directives();
            if (!this.check_token(v634.DocumentStartToken)) {
              throw new p333.ParserError(
                "expected '<document start>', but found " + this.peek_token().id,
                this.peek_token().start_mark,
              );
            }
            v652 = this.get_token();
            v648 = v652.end_mark;
            v649 = new v633.DocumentStartEvent(v650, v648, true, v653, v651);
            this.states.push("parse_document_end");
            this.state = "parse_document_content";
          }
          return v649;
        }
        parse_document_end() {
          var v654;
          var v655;
          var v656;
          var v657;
          var v658;
          v658 = this.peek_token();
          v657 = v654 = v658.start_mark;
          v656 = false;
          if (this.check_token(v634.DocumentEndToken)) {
            v658 = this.get_token();
            v654 = v658.end_mark;
            v656 = true;
          }
          v655 = new v633.DocumentEndEvent(v657, v654, v656);
          this.state = "parse_document_start";
          return v655;
        }
        parse_document_content() {
          var v659;
          if (
            this.check_token(
              v634.DirectiveToken,
              v634.DocumentStartToken,
              v634.DocumentEndToken,
              v634.StreamEndToken,
            )
          ) {
            v659 = this.process_empty_scalar(this.peek_token().start_mark);
            this.state = this.states.pop();
            return v659;
          } else {
            return this.parse_block_node();
          }
        }
        process_directives() {
          var v660;
          var v661;
          var v662;
          var v663;
          var v664;
          var v665;
          var v666;
          var v667;
          this.yaml_version = null;
          this.tag_handles = {};
          while (this.check_token(v634.DirectiveToken)) {
            v666 = this.get_token();
            if (v666.name === "YAML") {
              if (this.yaml_version !== null) {
                throw new p333.ParserError(
                  null,
                  null,
                  "found duplicate YAML directive",
                  v666.start_mark,
                );
              }
              [v661, v662] = v666.value;
              if (v661 !== 1) {
                throw new p333.ParserError(
                  null,
                  null,
                  "found incompatible YAML document (version 1.* is required)",
                  v666.start_mark,
                );
              }
              this.yaml_version = v666.value;
            } else if (v666.name === "TAG") {
              [v660, v663] = v666.value;
              if (v660 in this.tag_handles) {
                throw new p333.ParserError(
                  null,
                  null,
                  "duplicate tag handle " + v660,
                  v666.start_mark,
                );
              }
              this.tag_handles[v660] = v663;
            }
          }
          v665 = null;
          v664 = this.tag_handles;
          for (v660 in v664) {
            if (v635.call(v664, v660)) {
              v663 = v664[v660];
              if (v665 == null) {
                v665 = {};
              }
              v665[v660] = v663;
            }
          }
          v667 = [this.yaml_version, v665];
          for (v660 in v636) {
            if (v635.call(v636, v660)) {
              v663 = v636[v660];
              if (!(v663 in this.tag_handles)) {
                this.tag_handles[v660] = v663;
              }
            }
          }
          return v667;
        }
        parse_block_node() {
          return this.parse_node(true);
        }
        parse_flow_node() {
          return this.parse_node();
        }
        parse_block_node_or_indentless_sequence() {
          return this.parse_node(true, true);
        }
        parse_node(p334 = false, p335 = false) {
          var v668;
          var v669;
          var v670;
          var v671;
          var v672;
          var v673;
          var v674;
          var v675;
          var v676;
          var v677;
          var v678;
          if (this.check_token(v634.AliasToken)) {
            v678 = this.get_token();
            v670 = new v633.AliasEvent(v678.value, v678.start_mark, v678.end_mark);
            this.state = this.states.pop();
          } else {
            v668 = null;
            v676 = null;
            v674 = v669 = v677 = null;
            if (this.check_token(v634.AnchorToken)) {
              v678 = this.get_token();
              v674 = v678.start_mark;
              v669 = v678.end_mark;
              v668 = v678.value;
              if (this.check_token(v634.TagToken)) {
                v678 = this.get_token();
                v677 = v678.start_mark;
                v669 = v678.end_mark;
                v676 = v678.value;
              }
            } else if (this.check_token(v634.TagToken)) {
              v678 = this.get_token();
              v674 = v677 = v678.start_mark;
              v669 = v678.end_mark;
              v676 = v678.value;
              if (this.check_token(v634.AnchorToken)) {
                v678 = this.get_token();
                v669 = v678.end_mark;
                v668 = v678.value;
              }
            }
            if (v676 !== null) {
              [v671, v675] = v676;
              if (v671 !== null) {
                if (!(v671 in this.tag_handles)) {
                  throw new p333.ParserError(
                    "while parsing a node",
                    v674,
                    "found undefined tag handle " + v671,
                    v677,
                  );
                }
                v676 = this.tag_handles[v671] + v675;
              } else {
                v676 = v675;
              }
            }
            if (v674 === null) {
              v674 = v669 = this.peek_token().start_mark;
            }
            v670 = null;
            v672 = v676 === null || v676 === "!";
            if (p335 && this.check_token(v634.BlockEntryToken)) {
              v669 = this.peek_token().end_mark;
              v670 = new v633.SequenceStartEvent(v668, v676, v672, v674, v669);
              this.state = "parse_indentless_sequence_entry";
            } else if (this.check_token(v634.ScalarToken)) {
              v678 = this.get_token();
              v669 = v678.end_mark;
              if ((v678.plain && v676 === null) || v676 === "!") {
                v672 = [true, false];
              } else if (v676 === null) {
                v672 = [false, true];
              } else {
                v672 = [false, false];
              }
              v670 = new v633.ScalarEvent(v668, v676, v672, v678.value, v674, v669, v678.style);
              this.state = this.states.pop();
            } else if (this.check_token(v634.FlowSequenceStartToken)) {
              v669 = this.peek_token().end_mark;
              v670 = new v633.SequenceStartEvent(v668, v676, v672, v674, v669, true);
              this.state = "parse_flow_sequence_first_entry";
            } else if (this.check_token(v634.FlowMappingStartToken)) {
              v669 = this.peek_token().end_mark;
              v670 = new v633.MappingStartEvent(v668, v676, v672, v674, v669, true);
              this.state = "parse_flow_mapping_first_key";
            } else if (p334 && this.check_token(v634.BlockSequenceStartToken)) {
              v669 = this.peek_token().end_mark;
              v670 = new v633.SequenceStartEvent(v668, v676, v672, v674, v669, false);
              this.state = "parse_block_sequence_first_entry";
            } else if (p334 && this.check_token(v634.BlockMappingStartToken)) {
              v669 = this.peek_token().end_mark;
              v670 = new v633.MappingStartEvent(v668, v676, v672, v674, v669, false);
              this.state = "parse_block_mapping_first_key";
            } else if (v668 !== null || v676 !== null) {
              v670 = new v633.ScalarEvent(v668, v676, [v672, false], "", v674, v669);
              this.state = this.states.pop();
            } else {
              if (p334) {
                v673 = "block";
              } else {
                v673 = "flow";
              }
              v678 = this.peek_token();
              throw new p333.ParserError(
                "while parsing a " + v673 + " node",
                v674,
                "expected the node content, but found " + v678.id,
                v678.start_mark,
              );
            }
          }
          return v670;
        }
        parse_block_sequence_first_entry() {
          var v679;
          v679 = this.get_token();
          this.marks.push(v679.start_mark);
          return this.parse_block_sequence_entry();
        }
        parse_block_sequence_entry() {
          var v680;
          var v681;
          if (this.check_token(v634.BlockEntryToken)) {
            v681 = this.get_token();
            if (this.check_token(v634.BlockEntryToken, v634.BlockEndToken)) {
              this.state = "parse_block_sequence_entry";
              return this.process_empty_scalar(v681.end_mark);
            } else {
              this.states.push("parse_block_sequence_entry");
              return this.parse_block_node();
            }
          }
          if (!this.check_token(v634.BlockEndToken)) {
            v681 = this.peek_token();
            throw new p333.ParserError(
              "while parsing a block collection",
              this.marks.slice(-1)[0],
              "expected <block end>, but found " + v681.id,
              v681.start_mark,
            );
          }
          v681 = this.get_token();
          v680 = new v633.SequenceEndEvent(v681.start_mark, v681.end_mark);
          this.state = this.states.pop();
          this.marks.pop();
          return v680;
        }
        parse_indentless_sequence_entry() {
          var v682;
          var v683;
          if (this.check_token(v634.BlockEntryToken)) {
            v683 = this.get_token();
            if (
              this.check_token(
                v634.BlockEntryToken,
                v634.KeyToken,
                v634.ValueToken,
                v634.BlockEndToken,
              )
            ) {
              this.state = "parse_indentless_sequence_entry";
              return this.process_empty_scalar(v683.end_mark);
            } else {
              this.states.push("parse_indentless_sequence_entry");
              return this.parse_block_node();
            }
          } else {
            v683 = this.peek_token();
            v682 = new v633.SequenceEndEvent(v683.start_mark, v683.start_mark);
            this.state = this.states.pop();
            return v682;
          }
        }
        parse_block_mapping_first_key() {
          var v684;
          v684 = this.get_token();
          this.marks.push(v684.start_mark);
          return this.parse_block_mapping_key();
        }
        parse_block_mapping_key() {
          var v685;
          var v686;
          if (this.check_token(v634.KeyToken)) {
            v686 = this.get_token();
            if (this.check_token(v634.KeyToken, v634.ValueToken, v634.BlockEndToken)) {
              this.state = "parse_block_mapping_value";
              return this.process_empty_scalar(v686.end_mark);
            } else {
              this.states.push("parse_block_mapping_value");
              return this.parse_block_node_or_indentless_sequence();
            }
          }
          if (!this.check_token(v634.BlockEndToken)) {
            v686 = this.peek_token();
            throw new p333.ParserError(
              "while parsing a block mapping",
              this.marks.slice(-1)[0],
              "expected <block end>, but found " + v686.id,
              v686.start_mark,
            );
          }
          v686 = this.get_token();
          v685 = new v633.MappingEndEvent(v686.start_mark, v686.end_mark);
          this.state = this.states.pop();
          this.marks.pop();
          return v685;
        }
        parse_block_mapping_value() {
          var v687;
          if (this.check_token(v634.ValueToken)) {
            v687 = this.get_token();
            if (this.check_token(v634.KeyToken, v634.ValueToken, v634.BlockEndToken)) {
              this.state = "parse_block_mapping_key";
              return this.process_empty_scalar(v687.end_mark);
            } else {
              this.states.push("parse_block_mapping_key");
              return this.parse_block_node_or_indentless_sequence();
            }
          } else {
            this.state = "parse_block_mapping_key";
            v687 = this.peek_token();
            return this.process_empty_scalar(v687.start_mark);
          }
        }
        parse_flow_sequence_first_entry() {
          var v688;
          v688 = this.get_token();
          this.marks.push(v688.start_mark);
          return this.parse_flow_sequence_entry(true);
        }
        parse_flow_sequence_entry(p336 = false) {
          var v689;
          var v690;
          if (!this.check_token(v634.FlowSequenceEndToken)) {
            if (!p336) {
              if (this.check_token(v634.FlowEntryToken)) {
                this.get_token();
              } else {
                v690 = this.peek_token();
                throw new p333.ParserError(
                  "while parsing a flow sequence",
                  this.marks.slice(-1)[0],
                  "expected ',' or ']', but got " + v690.id,
                  v690.start_mark,
                );
              }
            }
            if (this.check_token(v634.KeyToken)) {
              v690 = this.peek_token();
              v689 = new v633.MappingStartEvent(
                null,
                null,
                true,
                v690.start_mark,
                v690.end_mark,
                true,
              );
              this.state = "parse_flow_sequence_entry_mapping_key";
              return v689;
            }
            if (!this.check_token(v634.FlowSequenceEndToken)) {
              this.states.push("parse_flow_sequence_entry");
              return this.parse_flow_node();
            }
          }
          v690 = this.get_token();
          v689 = new v633.SequenceEndEvent(v690.start_mark, v690.end_mark);
          this.state = this.states.pop();
          this.marks.pop();
          return v689;
        }
        parse_flow_sequence_entry_mapping_key() {
          var v691;
          v691 = this.get_token();
          if (this.check_token(v634.ValueToken, v634.FlowEntryToken, v634.FlowSequenceEndToken)) {
            this.state = "parse_flow_sequence_entry_mapping_value";
            return this.process_empty_scalar(v691.end_mark);
          } else {
            this.states.push("parse_flow_sequence_entry_mapping_value");
            return this.parse_flow_node();
          }
        }
        parse_flow_sequence_entry_mapping_value() {
          var v692;
          if (this.check_token(v634.ValueToken)) {
            v692 = this.get_token();
            if (this.check_token(v634.FlowEntryToken, v634.FlowSequenceEndToken)) {
              this.state = "parse_flow_sequence_entry_mapping_end";
              return this.process_empty_scalar(v692.end_mark);
            } else {
              this.states.push("parse_flow_sequence_entry_mapping_end");
              return this.parse_flow_node();
            }
          } else {
            this.state = "parse_flow_sequence_entry_mapping_end";
            v692 = this.peek_token();
            return this.process_empty_scalar(v692.start_mark);
          }
        }
        parse_flow_sequence_entry_mapping_end() {
          var v693;
          this.state = "parse_flow_sequence_entry";
          v693 = this.peek_token();
          return new v633.MappingEndEvent(v693.start_mark, v693.start_mark);
        }
        parse_flow_mapping_first_key() {
          var v694;
          v694 = this.get_token();
          this.marks.push(v694.start_mark);
          return this.parse_flow_mapping_key(true);
        }
        parse_flow_mapping_key(p337 = false) {
          var v695;
          var v696;
          if (!this.check_token(v634.FlowMappingEndToken)) {
            if (!p337) {
              if (this.check_token(v634.FlowEntryToken)) {
                this.get_token();
              } else {
                v696 = this.peek_token();
                throw new p333.ParserError(
                  "while parsing a flow mapping",
                  this.marks.slice(-1)[0],
                  "expected ',' or '}', but got " + v696.id,
                  v696.start_mark,
                );
              }
            }
            if (this.check_token(v634.KeyToken)) {
              v696 = this.get_token();
              if (
                this.check_token(v634.ValueToken, v634.FlowEntryToken, v634.FlowMappingEndToken)
              ) {
                this.state = "parse_flow_mapping_value";
                return this.process_empty_scalar(v696.end_mark);
              } else {
                this.states.push("parse_flow_mapping_value");
                return this.parse_flow_node();
              }
            }
            if (!this.check_token(v634.FlowMappingEndToken)) {
              this.states.push("parse_flow_mapping_empty_value");
              return this.parse_flow_node();
            }
          }
          v696 = this.get_token();
          v695 = new v633.MappingEndEvent(v696.start_mark, v696.end_mark);
          this.state = this.states.pop();
          this.marks.pop();
          return v695;
        }
        parse_flow_mapping_value() {
          var v697;
          if (this.check_token(v634.ValueToken)) {
            v697 = this.get_token();
            if (this.check_token(v634.FlowEntryToken, v634.FlowMappingEndToken)) {
              this.state = "parse_flow_mapping_key";
              return this.process_empty_scalar(v697.end_mark);
            } else {
              this.states.push("parse_flow_mapping_key");
              return this.parse_flow_node();
            }
          } else {
            this.state = "parse_flow_mapping_key";
            v697 = this.peek_token();
            return this.process_empty_scalar(v697.start_mark);
          }
        }
        parse_flow_mapping_empty_value() {
          this.state = "parse_flow_mapping_key";
          return this.process_empty_scalar(this.peek_token().start_mark);
        }
        process_empty_scalar(p338) {
          return new v633.ScalarEvent(null, null, [true, false], "", p338, p338);
        }
      }
      v636 = {
        "!": "!",
        "!!": "tag:yaml.org,2002:",
      };
      v637 = C34.prototype.initialise;
      return C34;
    }.call(this);
  }).call(p333);
});
var Gs = F((p339) => {
  w();
  (function () {
    var v698;
    var v699;
    var v700;
    var v701;
    var v702;
    var v703;
    var v704;
    v704 = we();
    v701 = Zr();
    v703 = Yr();
    v700 = Jr();
    v698 = Vr();
    v702 = qt();
    v699 = Br();
    this.make_loader = function (
      p340 = v701.Reader,
      p341 = v703.Scanner,
      p342 = v700.Parser,
      p343 = v698.Composer,
      p344 = v702.Resolver,
      p345 = v699.Constructor,
    ) {
      var v705;
      var v706;
      v706 = [p340, p341, p342, p343, p344, p345];
      return (v705 = function () {
        var v707;
        class C35 {
          constructor(p346) {
            var v708;
            var v709;
            var v710;
            v706[0].prototype.initialise.call(this, p346);
            v710 = v706.slice(1);
            v708 = 0;
            v709 = v710.length;
            for (; v708 < v709; v708++) {
              v707 = v710[v708];
              v707.prototype.initialise.call(this);
            }
          }
        }
        v704.extend(
          C35.prototype,
          ...(function () {
            var v711;
            var v712;
            var v713;
            v713 = [];
            v711 = 0;
            v712 = v706.length;
            for (; v711 < v712; v711++) {
              v707 = v706[v711];
              v713.push(v707.prototype);
            }
            return v713;
          })(),
        );
        return C35;
      }.call(this));
    };
    this.Loader = this.make_loader();
  }).call(p339);
});
var Ws = F((p347) => {
  w();
  (function () {
    var v714;
    var v715;
    var v716;
    var v717;
    var v718;
    var v719;
    var v720;
    var v721;
    var v722;
    var v723;
    var v724;
    var v725;
    var v726;
    v714 = this.composer = Vr();
    v715 = this.constructor = Br();
    v716 = this.dumper = zs();
    v717 = this.errors = he();
    v718 = this.events = et();
    v719 = this.loader = Gs();
    v720 = this.nodes = Fe();
    v721 = this.parser = Jr();
    v722 = this.reader = Zr();
    v723 = this.resolver = qt();
    v724 = this.scanner = Yr();
    v725 = this.tokens = $t();
    v726 = we();
    this.scan = function (p348, p349 = v719.Loader) {
      var v727;
      var v728;
      v727 = new p349(p348);
      v728 = [];
      while (v727.check_token()) {
        v728.push(v727.get_token());
      }
      return v728;
    };
    this.parse = function (p350, p351 = v719.Loader) {
      var v729;
      var v730;
      v729 = new p351(p350);
      v730 = [];
      while (v729.check_event()) {
        v730.push(v729.get_event());
      }
      return v730;
    };
    this.compose = function (p352, p353 = v719.Loader) {
      var v731;
      v731 = new p353(p352);
      return v731.get_single_node();
    };
    this.compose_all = function (p354, p355 = v719.Loader) {
      var v732;
      var v733;
      v732 = new p355(p354);
      v733 = [];
      while (v732.check_node()) {
        v733.push(v732.get_node());
      }
      return v733;
    };
    this.load = function (p356, p357 = v719.Loader) {
      var v734;
      v734 = new p357(p356);
      return v734.get_single_data();
    };
    this.load_all = function (p358, p359 = v719.Loader) {
      var v735;
      var v736;
      v735 = new p359(p358);
      v736 = [];
      while (v735.check_data()) {
        v736.push(v735.get_data());
      }
      return v736;
    };
    this.emit = function (p360, p361, p362 = v716.Dumper, p363 = {}) {
      var v737;
      var v738;
      var v739;
      var v740;
      var v741;
      v738 = p361 || new v726.StringStream();
      v737 = new p362(v738, p363);
      try {
        v740 = 0;
        v741 = p360.length;
        for (; v740 < v741; v740++) {
          v739 = p360[v740];
          v737.emit(v739);
        }
      } finally {
        v737.dispose();
      }
      return p361 || v738.string;
    };
    this.serialize = function (p364, p365, p366 = v716.Dumper, p367 = {}) {
      return p347.serialize_all([p364], p365, p366, p367);
    };
    this.serialize_all = function (p368, p369, p370 = v716.Dumper, p371 = {}) {
      var v742;
      var v743;
      var v744;
      var v745;
      var v746;
      v743 = p369 || new v726.StringStream();
      v742 = new p370(v743, p371);
      try {
        v742.open();
        v744 = 0;
        v745 = p368.length;
        for (; v744 < v745; v744++) {
          v746 = p368[v744];
          v742.serialize(v746);
        }
        v742.close();
      } finally {
        v742.dispose();
      }
      return p369 || v743.string;
    };
    this.dump = function (p372, p373, p374 = v716.Dumper, p375 = {}) {
      return p347.dump_all([p372], p373, p374, p375);
    };
    this.dump_all = function (p376, p377, p378 = v716.Dumper, p379 = {}) {
      var v747;
      var v748;
      var v749;
      var v750;
      var v751;
      v748 = p377 || new v726.StringStream();
      v747 = new p378(v748, p379);
      try {
        v747.open();
        v750 = 0;
        v751 = p376.length;
        for (; v750 < v751; v750++) {
          v749 = p376[v750];
          v747.represent(v749);
        }
        v747.close();
      } finally {
        v747.dispose();
      }
      return p377 || v748.string;
    };
  }).call(p347);
});
function Pi(p380, p381, p382) {
  let vP381 = p381;
  if (p381 in p380) {
    p382(p380[vP381]);
    return;
  }
  Object.defineProperty(p380, p381, {
    set(p383) {
      delete p380[vP381];
      p380[vP381] = p383;
      p382(p383);
    },
    configurable: true,
    enumerable: false,
  });
}
var Ri = q(() => {
  "use strict";

  w();
});
var Ai;
var Ni = q(() => {
  w();
  Ai =
    '<!doctype html><meta charset="utf-8"><head><title>About NanoCord</title><style>body{padding:2em;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;margin:0}:root{--bg:#0d0d0d;--fg:#ffffff;--fg-secondary:#a1a1a1}body,html{background:var(--bg);color:var(--fg)}.header{display:flex;align-items:center;gap:1.25em;margin-bottom:2em}.header img{width:48px;height:48px;border-radius:8px}.header-text{display:flex;flex-direction:column;gap:.25em}.header-top{display:flex;align-items:baseline;gap:.5em}.header-text h1{margin:0;font-size:1.75em;font-weight:700;color:var(--fg)}.header-text .version{color:var(--fg-secondary);font-size:.875em}.header-text .tagline{color:var(--fg-secondary);margin:0}h2{color:var(--fg);margin-top:1.5em;margin-bottom:.5em}p{color:var(--fg-secondary)}ul{display:flex;flex-direction:column;gap:.5em;padding-left:1.5em}li{color:var(--fg-secondary)}a{color:var(--fg-secondary);text-decoration:underline;transition:color .2s linear}a:hover{color:var(--fg)}section{margin-bottom:1.5em}</style></head><body><header class="header"><img src="https://equicord.org/assets/favicon.png" alt="NanoCord"><div class="header-text"><div class="header-top"><h1>NanoCord</h1><span class="version"><a href="https://github.com/Equicord/Equicord/releases/tag/v{{VERSION}}">v{{VERSION}} </a>(<a href="https://github.com/Equicord/Equicord/commit/{{GIT_HASH}}">{{GIT_HASH}}</a>)</span></div><p class="tagline">An enhanced version of Vencord. A fork that offers a wider selection of plugins from the community.</p></div></header><section><h2>Links</h2><ul><li><a href="https://equicord.org" target="_blank">NanoCord Website</a></li><li><a href="https://docs.equicord.org" target="_blank">NanoCord Docs</a></li><li><a href="https://github.com/Equicord/Equicord" target="_blank">Source Code</a></li><li><a href="https://equicord.org/discord" target="_blank">Support Server</a></li></ul></section><section><h2>License</h2><p>NanoCord is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.txt" target="_blank">GNU General Public License v3.0</a>.<br>This is free software, and you are welcome to redistribute it under certain conditions; see the license for details.</p></section><section><h2>Acknowledgements</h2><p>These awesome libraries/projects empower NanoCord</p><ul><li><a href="https://github.com/Vendicated/Vencord" target="_blank">Vencord</a> - Vencord is a modification for Discord that adds plugins and custom styles, blocks Discord\'s tracking and what we are a fork of!</li><li><a href="https://github.com/verticalsync/Suncord" target="_blank">Suncord</a> - Suncord was a newer fork of Vencord which eventually merged into NanoCord and brought many new users!</li></ul></section></body><script>const data=new URLSearchParams(location.search);function walk(e){if(e.nodeType!==Node.TEXT_NODE){if(e.nodeType===Node.ELEMENT_NODE&&"SCRIPT"!==e.nodeName)for(const o of e.childNodes)walk(o)}else e.textContent=e.textContent.replace(/{{(\\w+)}}/g,((e,o)=>data.get(o)||e))}walk(document.body)</script>';
});
function xl() {
  return Z.BrowserWindow.getFocusedWindow() ?? Z.BrowserWindow.getAllWindows()[0];
}
function Mi(p384) {
  xl()?.webContents.send(p384);
}
function El(p385) {
  let v752 = p385.findIndex((p386) => {
    let v753 = p386.label?.toLowerCase() ?? "";
    return v753.includes("open") || v753.includes("show");
  });
  if (v752 !== -1) {
    return v752 + 1;
  } else {
    return 0;
  }
}
function Sl(p387) {
  if (!p387.length) {
    return false;
  }
  let v754 = p387.some((p388) => {
    let v755 = p388.label?.toLowerCase() ?? "";
    return v755.includes("open") || v755.includes("show");
  });
  let v756 = p387.some(
    (p389) => p389.label?.toLowerCase().includes("quit") || p389.role === "quit",
  );
  let v757 = !p387.some(
    (p390) =>
      p390.label === "&File" ||
      p390.label === "File" ||
      p390.label === "&Edit" ||
      p390.label === "Edit",
  );
  return v754 && v756 && v757;
}
function Tl() {
  if (Me) {
    Me.focus();
    return;
  }
  let v758 = 750;
  let v759 = v758 * (4 / 3);
  Me = new Z.BrowserWindow({
    center: true,
    autoHideMenuBar: true,
    height: v758,
    width: v759,
  });
  Me.webContents.setWindowOpenHandler(({ url: arg }) => {
    Z.shell.openExternal(arg);
    return {
      action: "deny",
    };
  });
  Me.webContents.on("will-navigate", (p391, p392) => {
    p391.preventDefault();
    Z.shell.openExternal(p392);
  });
  let v760 = Ai.replaceAll("{{VERSION}}", "1.14.13.1").replaceAll("{{GIT_HASH}}", Fn);
  let v761 = Buffer.from(v760).toString("base64");
  Me.loadURL("data:text/html;base64," + v761);
  Me.on("closed", () => {
    Me = null;
  });
}
function Il() {
  return [
    {
      label: "NanoCord",
      submenu: [
        {
          label: "About NanoCord",
          click: () => Tl(),
        },
        {
          label: Ui ? "Update NanoCord" : "Check for Updates",
          click: () => Mi("VencordTrayCheckUpdates"),
        },
        {
          label: "Repair NanoCord",
          click: () => Mi("VencordTrayRepair"),
        },
        {
          type: "separator",
        },
        {
          label: "Open Settings Folder",
          click: () => Z.shell.openPath(oe),
        },
        {
          label: "Open Themes Folder",
          click: () => Z.shell.openPath(X),
        },
      ],
    },
    {
      type: "separator",
    },
  ];
}
function Li(p393) {
  for (let v762 of p393) {
    if (v762.label === "NANOCORD" || v762.label === "EchoCord" || v762.label === "Equicord") {
      v762.label = "NanoCord";
    }
    if (v762.submenu) {
      Li(v762.submenu);
    }
  }
}
function Oi() {
  let v763 = Z.Menu.buildFromTemplate;
  Z.Menu.buildFromTemplate = function (p394) {
    Li(p394);
    let v764 = p394.some((p395) => p395.label === "NanoCord");
    if (Sl(p394) && !v764) {
      let vEl = El(p394);
      let vIl = Il();
      p394.splice(vEl, 0, ...vIl);
    }
    return v763.call(this, p394);
  };
}
var Z;
var Ui;
var Me;
var qi = q(() => {
  "use strict";

  w();
  Se();
  hr();
  Z = require("electron");
  Ni();
  Te();
  Ui = false;
  Z.ipcMain.on("VencordSetTrayUpdateState", (p396, p397) => {
    Ui = p397;
  });
  Me = null;
});
var N;
var Y;
var Cl;
var fn;
var Dl;
var Pl;
var kt;
var $i;
var Rl;
var Zt;
var dn = q(() => {
  "use strict";

  w();
  N = require("original-fs");
  Y = require("path");
  Cl = JSON.stringify({
    name: "discord",
    main: "index.js",
  });
  fn = "app-";
  Dl = (p398) => "require(" + JSON.stringify(p398) + ");";
  Pl = (p399) => (0, N.existsSync)((0, Y.join)(p399, "_app.asar"));
  kt = (p400, p401) => {
    let v765 = (0, Y.join)(p400, "app.asar");
    let v766 = (0, Y.join)(p400, "_app.asar");
    if (Pl(p400) || !(0, N.existsSync)(v765)) {
      return false;
    }
    try {
      if ((0, N.lstatSync)(v765).isDirectory()) {
        return false;
      }
    } catch {
      return false;
    }
    let v767 = [];
    try {
      (0, N.renameSync)(v765, v766);
      v767.push(() => (0, N.renameSync)(v766, v765));
      (0, N.mkdirSync)(v765);
      v767.push(() => {
        let v768 = (0, Y.join)(v765, "index.js");
        let v769 = (0, Y.join)(v765, "package.json");
        if ((0, N.existsSync)(v768)) {
          (0, N.unlinkSync)(v768);
        }
        if ((0, N.existsSync)(v769)) {
          (0, N.unlinkSync)(v769);
        }
        (0, N.rmdirSync)(v765);
      });
      (0, N.writeFileSync)((0, Y.join)(v765, "package.json"), Cl);
      (0, N.writeFileSync)((0, Y.join)(v765, "index.js"), Dl(p401));
      return true;
    } catch (err) {
      for (let v770 = v767.length - 1; v770 >= 0; v770--) {
        try {
          v767[v770]();
        } catch (err2) {
          console.error("[NanoCord] Rollback step failed", err2);
        }
      }
      throw err;
    }
  };
  $i = (p402) => parseInt(p402, 10) || 0;
  Rl = (p403, p404) => {
    let v771 = p403.slice(fn.length).split(".").map($i);
    let v772 = p404.slice(fn.length).split(".").map($i);
    let v773 = Math.max(v771.length, v772.length);
    for (let v774 = 0; v774 < v773; v774++) {
      let v775 = v771[v774] ?? 0;
      let v776 = v772[v774] ?? 0;
      if (v775 > v776) {
        return true;
      }
      if (v775 < v776) {
        return false;
      }
    }
    return false;
  };
  Zt = (p405) => {
    let v777 = (0, Y.dirname)(p405);
    let v778 = (0, Y.basename)(p405);
    let vV778 = v778;
    try {
      for (let v779 of (0, N.readdirSync)(v777)) {
        if (!v779.startsWith(fn)) {
          continue;
        }
        let v780 = false;
        try {
          v780 = (0, N.statSync)((0, Y.join)(v777, v779)).isDirectory();
        } catch (err) {
          console.error("[NanoCord] Skipping unreadable sibling", v779, err);
          continue;
        }
        if (v780 && Rl(v779, vV778)) {
          vV778 = v779;
        }
      }
    } catch (err) {
      console.error("[NanoCord] Failed to scan for sibling versions", err);
      return null;
    }
    if (vV778 === v778) {
      return null;
    } else {
      return (0, Y.join)(v777, vV778, "resources");
    }
  };
});
var Bi = {};
O(Bi, {
  installHostUpdateHook: () => Ll,
});
var Yt;
var V;
var Ue;
var Fi;
var ji;
var zi;
var Al;
var Nl;
var Ml;
var mn;
var Vi;
var Ul;
var Ll;
var Gi = q(() => {
  "use strict";

  w();
  Yt = Ee(require("module"));
  V = require("path");
  dn();
  Ue = (...args) => console.error("[NanoCord:HostUpdate]", ...args);
  Fi = new WeakSet();
  ji = false;
  zi = () => (0, V.join)(__dirname, "patcher.js");
  Al = (p406) => (0, V.join)(p406, "resources");
  Nl = () => (0, V.dirname)(process.execPath);
  Ml = (p407) => {
    if (Array.isArray(p407.committedHostVersion)) {
      return p407.committedHostVersion;
    }
    try {
      let v781 = p407.queryCurrentVersionsSync?.();
      if (Array.isArray(v781?.current_host)) {
        return v781.current_host;
      }
    } catch (err) {
      Ue("queryCurrentVersionsSync failed", err);
    }
  };
  mn = (p408, p409) => {
    try {
      let vMl = Ml(p408);
      let { rootPath: v } = p408;
      if (!vMl || !v) {
        let vZt = Zt((0, V.dirname)(process.execPath));
        if (vZt) {
          kt(vZt, zi());
        }
        return;
      }
      let v782 = (0, V.join)(v, "app-" + vMl.join("."));
      if ((0, V.resolve)(v782) === (0, V.resolve)(Nl())) {
        return;
      }
      kt(Al(v782), zi());
    } catch (err) {
      Ue("[" + p409 + "] retain failed:", err);
    }
  };
  Vi = (p410) => {
    if (!p410 || Fi.has(p410)) {
      return;
    }
    try {
      Fi.add(p410);
    } catch (err) {
      Ue("Failed to track updater instance", err);
      return;
    }
    p410.on?.("host-updated", () => mn(p410, "host-updated"));
    let v783 = p410.startCurrentVersionSync;
    if (typeof v783 == "function") {
      let v784 = v783.bind(p410);
      p410.startCurrentVersionSync = (p411) => {
        v784(p411);
        try {
          mn(p410, "startCurrentVersionSync");
        } catch (err) {
          Ue(err);
        }
      };
    }
    let v785 = p410.startCurrentVersion;
    if (typeof v785 == "function") {
      let v786 = v785.bind(p410);
      p410.startCurrentVersion = async (p412, p413) => {
        await v786(p412, p413);
        try {
          mn(p410, "startCurrentVersion");
        } catch (err) {
          Ue(err);
        }
      };
    }
  };
  Ul = (p414) => {
    if (!p414?.startup || p414.__equicordStartupWrapped) {
      return;
    }
    p414.__equicordStartupWrapped = true;
    let v787 = p414.startup;
    p414.startup = function (p415, ...args) {
      try {
        let v788 = p415?.updater;
        let v789 = v788?.getUpdater?.();
        if (v789) {
          Vi(v789);
        } else if (typeof v788?.tryInitUpdater == "function" && !v788.__equicordTryInitWrapped) {
          v788.__equicordTryInitWrapped = true;
          let v790 = v788.tryInitUpdater.bind(v788);
          v788.tryInitUpdater = (p416, p417, p418) => {
            let vV790 = v790(p416, p417, p418);
            try {
              Vi(v788.getUpdater?.());
            } catch (err) {
              Ue(err);
            }
            return vV790;
          };
        }
      } catch (err) {
        Ue("wrap updater failed:", err);
      }
      return v787.call(this, p415, ...args);
    };
  };
  Ll = () => {
    if (ji) {
      return;
    }
    ji = true;
    let v791 = Yt.default.prototype.require;
    Yt.default.prototype.require = function (p419) {
      let v792 = v791.call(this, p419);
      if (!p419.includes("discord_desktop_core")) {
        return v792;
      }
      if ((0, V.basename)(p419.replace(/\\/g, "/")) === "discord_desktop_core") {
        try {
          Ul(v792?.default ?? v792);
        } catch (err) {
          Ue(err);
        }
        Yt.default.prototype.require = v791;
      }
      return v792;
    };
  };
});
var Ol = {};
var Wi;
var Jt;
var Hi = q(() => {
  "use strict";

  w();
  Wi = require("electron");
  Jt = require("path");
  dn();
  Wi.app.on("before-quit", () => {
    try {
      let vZt2 = Zt((0, Jt.dirname)(process.execPath));
      if (vZt2) {
        kt(vZt2, (0, Jt.join)(__dirname, "patcher.js"));
      }
    } catch (err) {
      console.error("[NanoCord] Failed to repatch latest host update", err);
    }
  });
});
var Fl = {};
var B;
var Le;
var ql;
var _n;
var $l;
var Zi = q(() => {
  "use strict";

  w();
  Ri();
  B = Ee(require("electron"));
  Le = require("path");
  le();
  qi();
  Te();
  console.log("[NanoCord] Starting up...");
  ql = require.main.filename;
  _n = (0, Le.join)((0, Le.dirname)(ql), "..", "_app.asar");
  $l = require((0, Le.join)(_n, "package.json"));
  require.main.filename = (0, Le.join)(_n, $l.main);
  B.app.setAppPath(_n);
  if (St) {
    console.log("[NanoCord] Running in vanilla mode. Not loading NanoCord");
  } else {
    let v793 = j.store;
    Oi();
    try {
      (Gi(), Et(Bi)).installHostUpdateHook();
    } catch (err) {
      console.error("[NanoCord] Failed to install host update hook", err);
    }
    Hi();
    if (v793.winCtrlQ) {
      let v794 = B.Menu.buildFromTemplate;
      B.Menu.buildFromTemplate = function (p420) {
        if (p420[0]?.label === "&File") {
          let { submenu: v } = p420[0];
          if (Array.isArray(v)) {
            v.push({
              label: "Quit (Hidden)",
              visible: false,
              acceleratorWorksWhenHidden: true,
              accelerator: "Control+Q",
              click: () => B.app.quit(),
            });
          }
        }
        return v794.call(this, p420);
      };
    }
    class C36 extends B.default.BrowserWindow {
      constructor(p421) {
        if (!p421?.webPreferences?.preload || !p421.title) {
          super(p421);
          return;
        }
        let {
          frameless: v,
          mainWindowFrameless: v2,
          winNativeTitleBar: v3,
          disableMinSize: v4,
          transparent: v5,
          macosVibrancyStyle: v6,
          windowsMaterial: v7,
        } = v793;
        let v795 = p421.webPreferences.preload;
        let v796 = p421.title === "Discord";
        p421.webPreferences.preload = (0, Le.join)(__dirname, "preload.js");
        p421.webPreferences.sandbox = false;
        p421.webPreferences.backgroundThrottling = false;
        if ((v2 && v796) || v) {
          p421.frame = false;
        } else if (v3) {
          delete p421.frame;
        }
        if (v4) {
          p421.minWidth = 0;
          p421.minHeight = 0;
        }
        if (v5) {
          p421.transparent = true;
          p421.backgroundColor = "#00000000";
        }
        if (v7 && v7 !== "none") {
          p421.backgroundMaterial = v7;
          p421.backgroundColor = "#00000000";
        }
        process.env.DISCORD_PRELOAD = v795;
        super(p421);
        if (v4) {
          this.setMinimumSize = (p422, p423) => {};
        }
      }
    }
    Object.assign(C36, B.default.BrowserWindow);
    Object.defineProperty(C36, "name", {
      value: "BrowserWindow",
      configurable: true,
    });
    let v797 = require.resolve("electron");
    delete require.cache[v797].exports;
    require.cache[v797].exports = {
      ...B.default,
      BrowserWindow: C36,
    };
    Pi(global, "appSettings", (p424) => {
      p424.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING", true);
    });
    process.env.DATA_DIR = (0, Le.join)(B.app.getPath("userData"), "..", "NanoCord");
    let v798 = B.app.commandLine.appendSwitch;
    B.app.commandLine.appendSwitch = function (...args) {
      if (args[0] === "disable-features") {
        let v799 = new Set((args[1] ?? "").split(","));
        v799.add("WidgetLayering");
        v799.add("UseEcoQoSForBackgroundProcess");
        args[1] += [...v799].join(",");
      }
      return v798.apply(this, args);
    };
    B.app.commandLine.appendSwitch("disable-renderer-backgrounding");
    B.app.commandLine.appendSwitch("disable-background-timer-throttling");
    B.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows");
  }
  console.log("[NanoCord] Loading original Discord app.asar");
  require(require.main.filename);
});
w();
var _e = require("electron");
var gn = require("path");
var bt = require("url");
w();
le();
var nr = require("electron");
var Ze = ["connect-src"];
var re = [...Ze, "img-src"];
var Mn = ["style-src", "font-src"];
var $ = [...re, ...Mn];
var Nn = [...$, "script-src", "worker-src"];
var Ie = [
  "style-src",
  "connect-src",
  "img-src",
  "frame-src",
  "font-src",
  "media-src",
  "worker-src",
];
var lt = {
  "http://localhost:*": $,
  "http://127.0.0.1:*": $,
  "localhost:*": $,
  "127.0.0.1:*": $,
  "*.github.io": $,
  "github.com": $,
  "raw.githubusercontent.com": $,
  "*.gitlab.io": $,
  "gitlab.com": $,
  "*.codeberg.page": $,
  "codeberg.org": $,
  "*.githack.com": $,
  "jsdelivr.net": $,
  "fonts.googleapis.com": Mn,
  "i.imgur.com": re,
  "i.ibb.co": re,
  "i.pinimg.com": re,
  "*.tenor.com": re,
  "files.catbox.moe": $,
  "cdn.discordapp.com": $,
  "media.discordapp.net": re,
  "cdnjs.cloudflare.com": Nn,
  "cdn.jsdelivr.net": Nn,
  "api.github.com": Ze,
  "ws.audioscrobbler.com": Ze,
  "translate-pa.googleapis.com": Ze,
  "*.vencord.dev": re,
  "manti.vendicated.dev": re,
  "decor.fieryflames.dev": Ze,
  "ugc.decor.fieryflames.dev": re,
  "sponsor.ajay.app": Ze,
  "dearrow-thumb.ajay.app": re,
  "usrbg.is-hardly.online": re,
  "icons.duckduckgo.com": re,
  "hcaptcha.com": Ie,
  "*.hcaptcha.com": Ie,
  "newassets.hcaptcha.com": Ie,
  "challenges.cloudflare.com": Ie,
  "*.google.com": Ie,
  "www.gstatic.com": Ie,
};
var sr = (p425, p426) => Object.keys(p425).find((p427) => p427.toLowerCase() === p426);
var ra = (p428) => {
  let v800 = {};
  p428.split(";").forEach((p429) => {
    let [v801, ...v] = p429.trim().split(/\s+/g);
    if (v801 && !Object.prototype.hasOwnProperty.call(v800, v801)) {
      v800[v801] = v;
    }
  });
  return v800;
};
var na = (p430) =>
  Object.entries(p430)
    .filter(([, v802]) => v802?.length)
    .map((p431) => p431.flat().join(" "))
    .join("; ");
var sa = (p432) => {
  let vSr = sr(p432, "content-security-policy-report-only");
  if (vSr) {
    delete p432[vSr];
  }
  let vSr2 = sr(p432, "content-security-policy");
  if (vSr2) {
    let vRa = ra(p432[vSr2][0]);
    let vF = (p433, ...args) => {
      vRa[p433] ??= [...(vRa["default-src"] ?? [])];
      vRa[p433].push(...args);
    };
    vF("style-src", "'unsafe-inline'");
    vF("script-src", "'unsafe-inline'", "'unsafe-eval'");
    for (let v803 of [
      "style-src",
      "connect-src",
      "img-src",
      "font-src",
      "media-src",
      "worker-src",
    ]) {
      vF(v803, "blob:", "data:", "vencord:", "vesktop:", "equicord:", "equibop:");
    }
    for (let [v804, v805] of Object.entries(z.store.customCspRules)) {
      for (let v806 of v805) {
        vF(v806, v804);
      }
    }
    for (let [v807, v808] of Object.entries(lt)) {
      for (let v809 of v808) {
        vF(v809, v807);
      }
    }
    p432[vSr2] = [na(vRa)];
  }
};
function Un() {
  nr.session.defaultSession.webRequest.onHeadersReceived(
    ({ responseHeaders: arg, resourceType: arg2 }, p434) => {
      if (arg && (arg2 === "mainFrame" && sa(arg), arg2 === "stylesheet")) {
        let vSr3 = sr(arg, "content-type");
        if (vSr3) {
          arg[vSr3] = ["text/css"];
        }
      }
      p434({
        cancel: false,
        responseHeaders: arg,
      });
    },
  );
  nr.session.defaultSession.webRequest.onHeadersReceived = () => {};
}
w();
w();
Se();
var _c = require("electron");
ir();
ar();
qn();
w();
Se();
var sn = require("electron");
w();
var fr = {};
O(fr, {
  fetchTrackData: () => fa,
});
w();
hr();
var zn = require("child_process");
var Vn = require("util");
var Bn = (0, Vn.promisify)(zn.execFile);
async function pr(p435) {
  let { stdout: v } = await Bn("osascript", p435.map((p436) => ["-e", p436]).flat());
  return v;
}
var ce = null;
async function pa({ id: arg, name: arg2, artist: arg3, album: arg4 }) {
  if (arg === ce?.id) {
    if ("data" in ce) {
      return ce.data;
    }
    if ("failures" in ce && ce.failures >= 5) {
      return null;
    }
  }
  try {
    let v810 = new URL("https://itunes.apple.com/search");
    v810.searchParams.set("term", arg2 + " " + arg3 + " " + arg4);
    v810.searchParams.set("media", "music");
    v810.searchParams.set("entity", "song");
    let vF2 = () =>
      fetch(v810, {
        headers: {
          "user-agent": jn,
        },
      }).then((p437) => p437.json());
    let v811 = await vF2();
    if (v811.resultCount === 0) {
      v810.searchParams.set("term", arg2 + " " + arg3);
      v811 = await vF2();
    }
    let v812 = v811.results.find((p438) => p438.collectionName === arg4) || v811.results[0];
    let v813 = await fetch(v812.artistViewUrl)
      .then((p439) => p439.text())
      .then((p440) => {
        let v814 = p440.match(/<meta property="og:image" content="(.+?)">/);
        if (v814) {
          return v814[1].replace(/[0-9]+x.+/, "220x220bb-60.png");
        } else {
          return undefined;
        }
      })
      .catch(() => {});
    ce = {
      id: arg,
      data: {
        appleMusicLink: v812.trackViewUrl,
        songLink: "https://song.link/i/" + new URL(v812.trackViewUrl).searchParams.get("i"),
        albumArtwork: v812.artworkUrl100.replace("100x100", "512x512"),
        artistArtwork: v813,
      },
    };
    return ce.data;
  } catch (err) {
    console.error("[AppleMusicRichPresence] Failed to fetch remote data:", err);
    ce = {
      id: arg,
      failures: (arg === ce?.id && "failures" in ce ? ce.failures : 0) + 1,
    };
    return null;
  }
}
async function fa() {
  try {
    await Bn("pgrep", ["^Music$"]);
  } catch {
    return null;
  }
  if (
    (await pr(['tell application "Music"', "get player state", "end tell"]).then((p441) =>
      p441.trim(),
    )) !== "playing"
  ) {
    return null;
  }
  let v815 = await pr(['tell application "Music"', "get player position", "end tell"]).then(
    (p442) => Number.parseFloat(p442.trim()),
  );
  let v816 = await pr([
    'set output to ""',
    'tell application "Music"',
    "set t_id to database id of current track",
    "set t_name to name of current track",
    "set t_album to album of current track",
    "set t_artist to artist of current track",
    "set t_duration to duration of current track",
    'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',
    "end tell",
    "return output",
  ]);
  let [v817, v818, v819, v820, v821] = v816.split("\n").filter((p443) => !!p443);
  let v822 = Number.parseFloat(v821);
  let v823 = await pa({
    id: v817,
    name: v818,
    artist: v820,
    album: v819,
  });
  return {
    name: v818,
    album: v819,
    artist: v820,
    playerPosition: v815,
    duration: v822,
    ...v823,
  };
}
var dr = {};
O(dr, {
  initDevtoolsOpenEagerLoad: () => da,
});
w();
function da(p444) {
  let vF3 = () =>
    p444.sender.executeJavaScript("Vencord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");
  if (p444.sender.isDevToolsOpened()) {
    vF3();
  } else {
    p444.sender.once("devtools-opened", () => vF3());
  }
}
var Wn = {};
w();
le();
var Ct = require("electron");
var It = [];
function Gn() {
  let v824 = [];
  for (let v825 = It.length - 1; v825 >= 0; v825--) {
    let { processId: v, routingId: v2 } = It[v825];
    let v826 = Ct.webFrameMain.fromId(v, v2);
    if (!v826) {
      It.splice(v825, 1);
      continue;
    }
    v824.push(v826);
  }
  return v824;
}
Ct.app.on("browser-window-created", (p445, p446) => {
  p446.webContents.on("frame-created", (p447, { frame: arg }) => {
    arg?.once("dom-ready", () => {
      if (arg.url.startsWith("https://open.spotify.com/embed/")) {
        Gn();
        let { routingId: v, processId: v2 } = arg;
        It.push({
          routingId: v,
          processId: v2,
        });
        let v827 = j.store.plugins?.FixSpotifyEmbeds;
        if (!v827?.enabled) {
          return;
        }
        arg.executeJavaScript(
          "\n                    globalThis._vcVolume = " +
            v827.volume / 100 +
            ";\n                    const original = Audio.prototype.play;\n                    Audio.prototype.play = function() {\n                        this.volume = _vcVolume;\n                        return original.apply(this, arguments);\n                    }\n                ",
        );
      }
    });
  });
  j.addChangeListener("plugins.FixSpotifyEmbeds.volume", (p448) => {
    try {
      Gn().forEach((p449) => p449.executeJavaScript("globalThis._vcVolume = " + p448 / 100));
    } catch (err) {
      console.error("FixSpotifyEmbeds: Failed to update volume", err);
    }
  });
});
var Zn = {};
w();
le();
var Hn = require("electron");
Hn.app.on("browser-window-created", (p450, p451) => {
  p451.webContents.on("frame-created", (p452, { frame: arg }) => {
    arg?.once("dom-ready", () => {
      if (arg.url.startsWith("https://www.youtube.com/")) {
        if (!j.store.plugins?.FixYoutubeEmbeds?.enabled) {
          return;
        }
        arg.executeJavaScript(
          "\n                new MutationObserver(() => {\n                    if(\n                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*=\"www.youtube.com/watch?v=\"]')\n                    ) location.reload()\n                }).observe(document.body, { childList: true, subtree:true });\n                ",
        );
      }
    });
  });
});
var mr = {};
O(mr, {
  resolveRedirect: () => _a,
});
w();
var Yn = require("https");
var ma = /^https:\/\/(spotify\.link|s\.team)\/.+$/;
function Jn(p453) {
  return new Promise((p454, p455) => {
    let v828 = (0, Yn.request)(
      new URL(p453),
      {
        method: "HEAD",
      },
      (p456) => {
        p454(p456.headers.location ? Jn(p456.headers.location) : p453);
      },
    );
    v828.on("error", p455);
    v828.end();
  });
}
async function _a(p457, p458) {
  if (ma.test(p458)) {
    return Jn(p458);
  } else {
    return p458;
  }
}
var _r = {};
O(_r, {
  makeDeeplTranslateRequest: () => ga,
  makeKagiTranslateRequest: () => va,
});
w();
async function ga(p459, p460, p461, p462) {
  let v829 = p460
    ? "https://api.deepl.com/v2/translate"
    : "https://api-free.deepl.com/v2/translate";
  try {
    let v830 = await fetch(v829, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "DeepL-Auth-Key " + p461,
      },
      body: p462,
    });
    let v831 = await v830.text();
    return {
      status: v830.status,
      data: v831,
    };
  } catch (err) {
    return {
      status: -1,
      data: String(err),
    };
  }
}
async function va(p463, p464, p465, p466, p467) {
  let v832 = "https://translate.kagi.com/api/translate";
  try {
    let v833 = await fetch(v832, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: "kagi_session=" + p464,
      },
      body: JSON.stringify({
        text: p465,
        from: p466,
        to: p467,
        model: "standard",
      }),
    });
    let v834 = await v833.json();
    return {
      status: v833.status,
      data: v834,
    };
  } catch (err) {
    return {
      status: -1,
      data: String(err),
    };
  }
}
var gr = {};
O(gr, {
  readRecording: () => wa,
});
w();
var Kn = require("electron");
var Dt = require("fs/promises");
var pt = require("path");
async function wa(p468, p469) {
  p469 = (0, pt.normalize)(p469);
  let v835 = (0, pt.basename)(p469);
  let v836 = (0, pt.normalize)(Kn.app.getPath("userData") + "/");
  if (!/^\d*recording\.ogg$/.test(v835) || !p469.startsWith(v836)) {
    return null;
  }
  try {
    let v837 = await (0, Dt.readFile)(p469);
    (0, Dt.rm)(p469).catch(() => {});
    return new Uint8Array(v837.buffer);
  } catch {
    return null;
  }
}
var vr = {};
O(vr, {
  sendToOverlay: () => ya,
});
w();
var Qn = require("dgram");
var Xn;
function ya(p470, p471) {
  p471.messageType = p471.type;
  let v838 = JSON.stringify(p471);
  Xn ??= (0, Qn.createSocket)("udp4");
  Xn.send(v838, 42069, "127.0.0.1");
}
var ts = {};
w();
le();
var es = require("electron");
w();
var wr =
  '"use strict";const hiddenCSS=["#__ffYoutube1","#__ffYoutube2","#__ffYoutube3","#__ffYoutube4","#feed-pyv-container","#feedmodule-PRO","#homepage-chrome-side-promo","#merch-shelf","#offer-module",\'#pla-shelf > ytd-pla-shelf-renderer[class="style-scope ytd-watch"]\',"#pla-shelf","#premium-yva","#promo-info","#promo-list","#promotion-shelf","#related > ytd-watch-next-secondary-results-renderer > #items > ytd-compact-promoted-video-renderer.ytd-watch-next-secondary-results-renderer","#search-pva","#shelf-pyv-container","#video-masthead","#watch-branded-actions","#watch-buy-urls","#watch-channel-brand-div","#watch7-branded-banner","#YtKevlarVisibilityIdentifier","#YtSparklesVisibilityIdentifier",".carousel-offer-url-container",".companion-ad-container",".GoogleActiveViewElement",\'.list-view[style="margin: 7px 0pt;"]\',".promoted-sparkles-text-search-root-container",".promoted-videos",".searchView.list-view",".sparkles-light-cta",".watch-extra-info-column",".watch-extra-info-right",".ytd-carousel-ad-renderer",".ytd-compact-promoted-video-renderer",".ytd-companion-slot-renderer",".ytd-merch-shelf-renderer",".ytd-player-legacy-desktop-watch-ads-renderer",".ytd-promoted-sparkles-text-search-renderer",".ytd-promoted-video-renderer",".ytd-search-pyv-renderer",".ytd-video-masthead-ad-v3-renderer",".ytp-ad-action-interstitial-background-container",".ytp-ad-action-interstitial-slot",".ytp-ad-image-overlay",".ytp-ad-overlay-container",".ytp-ad-progress",".ytp-ad-progress-list",\'[class*="ytd-display-ad-"]\',\'[layout*="display-ad-"]\',\'a[href^="http://www.youtube.com/cthru?"]\',\'a[href^="https://www.youtube.com/cthru?"]\',"ytd-action-companion-ad-renderer","ytd-banner-promo-renderer","ytd-compact-promoted-video-renderer","ytd-companion-slot-renderer","ytd-display-ad-renderer","ytd-promoted-sparkles-text-search-renderer","ytd-promoted-sparkles-web-renderer","ytd-search-pyv-renderer","ytd-single-option-survey-renderer","ytd-video-masthead-ad-advertiser-info-renderer","ytd-video-masthead-ad-v3-renderer","YTM-PROMOTED-VIDEO-RENDERER"],hideElements=()=>{const e=hiddenCSS;if(!e)return;const t=e.join(", ")+" { display: none!important; }",r=document.createElement("style");r.textContent=t,document.head.appendChild(r)},observeDomChanges=e=>{new MutationObserver(r=>{e(r)}).observe(document.documentElement,{childList:!0,subtree:!0})},hideDynamicAds=()=>{const e=document.querySelectorAll("#contents > ytd-rich-item-renderer ytd-display-ad-renderer");e.length!==0&&e.forEach(t=>{if(t.parentNode&&t.parentNode.parentNode){const r=t.parentNode.parentNode;r.localName==="ytd-rich-item-renderer"&&(r.style.display="none")}})},autoSkipAds=()=>{if(document.querySelector(".ad-showing")){const e=document.querySelector("video");e&&e.duration&&(e.currentTime=e.duration,setTimeout(()=>{const t=document.querySelector("button.ytp-ad-skip-button");t&&t.click()},100))}},overrideObject=(e,t,r)=>{if(!e)return!1;let n=!1;for(const o in e)e.hasOwnProperty(o)&&o===t?(e[o]=r,n=!0):e.hasOwnProperty(o)&&typeof e[o]=="object"&&overrideObject(e[o],t,r)&&(n=!0);return n},jsonOverride=(e,t)=>{const r=JSON.parse;JSON.parse=(...n)=>{const o=r.apply(this,n);return overrideObject(o,e,t),o},Response.prototype.json=new Proxy(Response.prototype.json,{async apply(...n){const o=await Reflect.apply(...n);return overrideObject(o,e,t),o}})};jsonOverride("adPlacements",[]),jsonOverride("playerAds",[]),hideElements(),hideDynamicAds(),autoSkipAds(),observeDomChanges(()=>{hideDynamicAds(),autoSkipAds()});\n';
es.app.on("browser-window-created", (p472, p473) => {
  p473.webContents.on("frame-created", (p474, { frame: arg }) => {
    arg?.once("dom-ready", () => {
      if (j.store.plugins?.YoutubeAdblock?.enabled) {
        if (arg.url.includes("youtube.com/embed/")) {
          arg.executeJavaScript(wr);
        } else if (arg.parent?.url.includes("youtube.com/embed/")) {
          arg.parent.executeJavaScript(wr);
        }
      }
    });
  });
});
var rs = {};
w();
lt["*"] = Ie;
var yr = {};
O(yr, {
  fetchAttachment: () => ba,
});
w();
var ka = new Set([
  "cdn.discordapp.com",
  "images-ext-1.discordapp.net",
  "images-ext-2.discordapp.net",
  "media.discordapp.net",
]);
async function ba(p475, p476) {
  let { content_type: v, filename: v2 } = p476;
  let v839 = URL.parse(p476.url);
  if (!v839 || !ka.has(v839.hostname)) {
    throw new Error("Invalid URL");
  }
  let v840 = await fetch(v839, {
    headers: {
      Accept: "*/*",
    },
  });
  if (!v840.ok) {
    throw new Error("Server error");
  }
  let v841 = await v840.blob();
  let v842 = v841.type || v || "application/octet-stream";
  let v843 = await v841.arrayBuffer();
  return {
    type: v842,
    data: v843,
    filename: v2,
  };
}
var kr = {};
O(kr, {
  fetchFile: () => La,
  uploadTo0x0: () => Sa,
  uploadToBuzzheavier: () => Ra,
  uploadToCatbox: () => Ia,
  uploadToEzHost: () => Ea,
  uploadToFilebin: () => Na,
  uploadToGofile: () => Da,
  uploadToLitterbox: () => Ca,
  uploadToNest: () => xa,
  uploadToPixelDrain: () => Ua,
  uploadToPixelVault: () => Ma,
  uploadToS3: () => Ta,
  uploadToTempSh: () => Aa,
  uploadToTmpfiles: () => Pa,
});
w();
async function xa(p477, p478, p479, p480) {
  try {
    let v844 = new FormData();
    v844.append("file", new Blob([p478]), p479);
    let v845 = await fetch("https://nest.rip/api/files/upload", {
      method: "POST",
      headers: {
        Authorization: p480,
      },
      body: v844,
    });
    if (!v845.ok) {
      let v846 = await v845.text();
      return {
        success: false,
        error: "Upload failed: " + v845.status + " " + v846,
      };
    }
    let v847 = await v845.json();
    if (v847.fileURL) {
      return {
        success: true,
        url: v847.fileURL,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Ea(p481, p482, p483, p484) {
  try {
    let v848 = new FormData();
    v848.append("file", new Blob([p482]), p483);
    let v849 = await fetch("https://api.e-z.host/files", {
      method: "POST",
      headers: {
        key: p484,
      },
      body: v848,
    });
    if (!v849.ok) {
      let v850 = await v849.text();
      return {
        success: false,
        error: "Upload failed: " + v849.status + " " + v850,
      };
    }
    let v851 = await v849.json();
    if (!v851 || !v851.success) {
      return {
        success: false,
        error: v851?.error || "Upload failed",
      };
    } else if (v851.imageUrl || v851.rawUrl) {
      return {
        success: true,
        url: v851.imageUrl || v851.rawUrl,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Sa(p485, p486, p487) {
  try {
    let v852 = new FormData();
    v852.append("file", new Blob([p486]), p487);
    let v853 = await fetch("https://0x0.st", {
      method: "POST",
      body: v852,
    });
    if (!v853.ok) {
      let v854 = await v853.text();
      return {
        success: false,
        error: "Upload failed: " + v853.status + " " + v854,
      };
    }
    let v855 = (await v853.text()).trim();
    if (v855) {
      return {
        success: true,
        url: v855,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Ta(p488, p489, p490, p491) {
  try {
    let v856 = await fetch(p490, {
      method: "PUT",
      headers: p491,
      body: new Blob([p489]),
    });
    if (!v856.ok) {
      let v857 = await v856.text();
      return {
        success: false,
        error: "Upload failed: " + v856.status + " " + v857,
      };
    }
    return {
      success: true,
      url: p490,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Ia(p492, p493, p494, p495) {
  try {
    let v858 = new FormData();
    v858.append("reqtype", "fileupload");
    if (p495) {
      v858.append("userhash", p495);
    }
    v858.append("fileToUpload", new Blob([p493]), p494);
    let v859 = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: v858,
    });
    if (!v859.ok) {
      let v860 = await v859.text();
      return {
        success: false,
        error: "Upload failed: " + v859.status + " " + v860,
      };
    }
    let v861 = (await v859.text()).trim();
    if (v861) {
      return {
        success: true,
        url: v861,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Ca(p496, p497, p498, p499) {
  try {
    let v862 = new FormData();
    v862.append("reqtype", "fileupload");
    v862.append("time", p499);
    v862.append("fileToUpload", new Blob([p497]), p498);
    let v863 = await fetch("https://litterbox.catbox.moe/resources/internals/api.php", {
      method: "POST",
      body: v862,
    });
    if (!v863.ok) {
      let v864 = await v863.text();
      return {
        success: false,
        error: "Upload failed: " + v863.status + " " + v864,
      };
    }
    let v865 = (await v863.text()).trim();
    if (v865) {
      return {
        success: true,
        url: v865,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Da(p500, p501, p502, p503) {
  try {
    let v866 = new FormData();
    if (p503?.trim()) {
      v866.append("token", p503.trim());
    }
    v866.append("file", new Blob([p501]), p502);
    let v867 = await fetch("https://upload.gofile.io/uploadfile", {
      method: "POST",
      body: v866,
    });
    if (!v867.ok) {
      let v868 = await v867.text();
      return {
        success: false,
        error: "Upload failed: " + v867.status + " " + v868,
      };
    }
    let v869 = await v867.json();
    if (v869.status !== "ok") {
      return {
        success: false,
        error: v869.error || "Upload failed",
      };
    }
    let v870 =
      v869.data?.downloadPage || (v869.data?.code ? "https://gofile.io/d/" + v869.data.code : "");
    if (v870) {
      return {
        success: true,
        url: v870,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Pa(p504, p505, p506) {
  try {
    let v871 = new FormData();
    v871.append("file", new Blob([p505]), p506);
    let v872 = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: v871,
    });
    if (!v872.ok) {
      let v873 = await v872.text();
      return {
        success: false,
        error: "Upload failed: " + v872.status + " " + v873,
      };
    }
    let v874 = await v872.json();
    let v875 = v874.data?.url || "";
    if (!v875 || v874.status !== "success") {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    } else {
      return {
        success: true,
        url:
          v875.includes("tmpfiles.org/") && !v875.includes("/dl/")
            ? v875.replace(/tmpfiles\.org\/(\d+)/, "tmpfiles.org/dl/$1")
            : v875,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Ra(p507, p508, p509) {
  try {
    let v876 = await fetch("https://w.buzzheavier.com/" + encodeURIComponent(p509), {
      method: "PUT",
      body: new Blob([p508]),
    });
    let v877 = await v876.text();
    if (!v876.ok) {
      return {
        success: false,
        error: "Upload failed: " + v876.status + " " + v877,
      };
    }
    try {
      let v878 = JSON.parse(v877);
      if (v878.code === 201 && v878.data?.id) {
        return {
          success: true,
          url: "https://buzzheavier.com/" + v878.data.id,
        };
      }
    } catch {}
    let v879 = v877.trim();
    if (v879) {
      return {
        success: true,
        url: v879,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Aa(p510, p511, p512) {
  try {
    let v880 = new FormData();
    v880.append("file", new Blob([p511]), p512);
    let v881 = await fetch("https://temp.sh/upload", {
      method: "POST",
      body: v880,
    });
    if (!v881.ok) {
      let v882 = await v881.text();
      return {
        success: false,
        error: "Upload failed: " + v881.status + " " + v882,
      };
    }
    let v883 = (await v881.text()).trim();
    if (v883) {
      return {
        success: true,
        url: v883,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Na(p513, p514, p515) {
  try {
    let v884 = "" + Date.now().toString(16) + Math.random().toString(16).slice(2, 10);
    let v885 = "https://filebin.net/" + v884 + "/" + encodeURIComponent(p515);
    let v886 = new FormData();
    v886.append("file", new Blob([p514]), p515);
    let v887 = await fetch(v885, {
      method: "POST",
      body: v886,
    });
    if (!v887.ok) {
      let v888 = await v887.text();
      return {
        success: false,
        error: "Upload failed: " + v887.status + " " + v888,
      };
    }
    return {
      success: true,
      url: "https://filebin.net/" + v884 + "/" + encodeURIComponent(p515),
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Ma(p516, p517, p518, p519) {
  try {
    let v889 = new FormData();
    v889.append("file", new Blob([p517]), p518);
    let v890 = await fetch("https://pixelvault.co/", {
      method: "POST",
      headers: {
        Authorization: p519,
      },
      body: v889,
    });
    let v891 = await v890.text();
    let v892 = null;
    try {
      v892 = v891 ? JSON.parse(v891) : null;
    } catch {
      v892 = null;
    }
    if (!v890.ok) {
      return {
        success: false,
        error: "Upload failed: " + v890.status + " " + v891,
      };
    }
    let v893 = v892?.resource || v892?.url || v891.trim();
    if (v893) {
      return {
        success: true,
        url: v893,
      };
    } else {
      return {
        success: false,
        error: "No URL returned from upload",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Ua(p520, p521, p522, p523) {
  try {
    let v894 = {};
    if (p523?.trim()) {
      v894.Authorization = "Basic " + Buffer.from(":" + p523.trim()).toString("base64");
    }
    let v895 = await fetch("https://pixeldrain.com/api/file/" + encodeURIComponent(p522), {
      method: "PUT",
      headers: v894,
      body: new Blob([p521]),
    });
    let v896 = await v895.text();
    let v897 = null;
    try {
      v897 = v896 ? JSON.parse(v896) : null;
    } catch {
      v897 = null;
    }
    if (v895.ok) {
      if (v897?.id) {
        return {
          success: true,
          url: "https://pixeldrain.com/u/" + v897.id,
        };
      } else {
        return {
          success: false,
          error: v897?.message || "No URL returned from upload",
        };
      }
    } else {
      return {
        success: false,
        error: v897?.message || "Upload failed: " + v895.status + " " + v896,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function La(p524, p525) {
  try {
    let v898 = await fetch(p525);
    if (!v898.ok) {
      return {
        success: false,
        error: "Fetch failed: " + v898.status + " " + v898.statusText,
      };
    }
    let v899 = await v898.arrayBuffer();
    let v900 = v898.headers.get("content-type") || "";
    return {
      success: true,
      data: v899,
      contentType: v900,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
var Cr = {};
O(Cr, {
  chooseDir: () => Ka,
  chooseFile: () => Qa,
  closeNativeLogImport: () => Va,
  deleteFileNative: () => Ya,
  downloadAttachment: () => _s,
  finishNativeLogExport: () => Fa,
  getDefaultNativeDataDir: () => Ce,
  getDefaultNativeImageDir: () => ft,
  getImageNative: () => Ha,
  getNativeSavedImages: () => Ga,
  getSettings: () => Rt,
  init: () => ms,
  initDirs: () => ds,
  messageLoggerEnhancedUniqueIdThingyIdkMan: () => Ba,
  readNativeLogChunk: () => za,
  showItemInFolder: () => Xa,
  startNativeLogExport: () => qa,
  startNativeLogImport: () => ja,
  writeImageNative: () => Za,
  writeLogs: () => Ja,
  writeNativeLogChunk: () => $a,
});
w();
var ue = require("node:fs/promises");
var $e = Ee(require("node:path"));
Te();
var _t = require("electron");
w();
var xr = Ee(require("fs/promises"));
var is = Ee(require("path"));
w();
var Pt = require("fs/promises");
var ns = Ee(require("path"));
async function Oa(p526) {
  try {
    await (0, Pt.access)(p526);
    return true;
  } catch {
    return false;
  }
}
async function Je(p527) {
  if (!(await Oa(p527))) {
    await (0, Pt.mkdir)(p527);
  }
}
function br(p528) {
  return ns.default.parse(p528).name;
}
var ss = (p529) => new Promise((p530) => setTimeout(p530, p529));
async function Rt() {
  try {
    let v901 = await xr.default.readFile(await as(), "utf8");
    return JSON.parse(v901);
  } catch {
    let v902 = {
      logsDir: await Ce(),
      imageCacheDir: await ft(),
    };
    try {
      await Er(v902);
    } catch {}
    return v902;
  }
}
async function Er(p531) {
  if (p531) {
    await xr.default.writeFile(await as(), JSON.stringify(p531, null, 4), "utf8");
  }
}
async function as() {
  let v903 = await Ce();
  await Je(v903);
  return is.default.join(v903, "mlSettings.json");
}
w();
var os = require("node:crypto");
var ls = require("node:fs");
var cs = require("electron");
var dt = new Map();
async function qa(p532, p533) {
  let { filePath: v, canceled: v2 } = await cs.dialog.showSaveDialog({
    defaultPath: p533 ?? "message-logger-logs-idb.json",
    filters: [
      {
        name: "JSON",
        extensions: ["json"],
      },
    ],
  });
  if (v2 || !v) {
    throw new Error("No file path selected");
  }
  let v904 = (0, ls.createWriteStream)(v, {
    flags: "w",
    encoding: "utf-8",
  });
  let v905 = (0, os.randomUUID)();
  dt.set(v905, v904);
  v904.on("error", (p534) => {
    console.error("Stream error", p534);
    dt.delete(v905);
  });
  return v905;
}
async function $a(p535, p536, p537) {
  let v906 = dt.get(p536);
  if (!v906) {
    throw new Error("Stream not found or closed");
  }
  if (!v906.write(p537)) {
    await new Promise((p538) => v906.once("drain", p538));
  }
}
async function Fa(p539, p540) {
  let v907 = dt.get(p540);
  if (v907) {
    return new Promise((p541) => {
      v907.end(() => {
        dt.delete(p540);
        p541();
      });
    });
  }
}
w();
var us = require("node:crypto");
var hs = require("node:fs/promises");
var ps = require("electron");
var mt = new Map();
async function ja(p542, p543) {
  let v908 = await ps.dialog.showOpenDialog({
    title: "Import Logs",
    filters: [
      {
        name: "Logs",
        extensions: ["json"],
      },
    ],
    properties: ["openFile"],
    defaultPath: p543,
  });
  let [v909] = v908.filePaths;
  if (!v909) {
    throw Error("No file selected");
  }
  let v910 = await (0, hs.open)(v909, "r");
  let v911 = (0, us.randomUUID)();
  mt.set(v911, v910);
  return v911;
}
async function za(p544, p545, p546 = 65536) {
  let v912 = mt.get(p545);
  if (!v912) {
    return null;
  }
  let v913 = Buffer.alloc(p546);
  let { bytesRead: v } = await v912.read(v913, 0, p546);
  if (v === 0) {
    await v912.close();
    mt.delete(p545);
    return null;
  } else {
    return v913.toString("utf-8", 0, v);
  }
}
async function Va(p547, p548) {
  let v914 = mt.get(p548);
  if (v914) {
    await v914.close();
    mt.delete(p548);
  }
}
w();
var fs = "message-logger-logs.json";
function Ba() {}
var De = new Map();
var Ga = () => De;
var Sr;
var Tr;
var Ir = async () => Tr ?? (await ft());
var Wa = async () => Sr ?? (await Ce());
async function ds() {
  let { logsDir: v, imageCacheDir: v2 } = await Rt();
  Sr = v || (await Ce());
  Tr = v2 || (await ft());
}
ds();
async function ms(p549) {
  let v915 = await Ir();
  await Je(v915);
  let v916 = await (0, ue.readdir)(v915);
  for (let v917 of v916) {
    let vBr = br(v917);
    De.set(vBr, $e.default.join(v915, v917));
  }
}
async function Ha(p550, p551) {
  let v918 = De.get(p551);
  if (!v918) {
    return null;
  }
  try {
    return await (0, ue.readFile)(v918);
  } catch (err) {
    console.error(err);
    return null;
  }
}
async function Za(p552, p553, p554) {
  if (!p553 || !p554) {
    return;
  }
  let v919 = await Ir();
  let vBr2 = br(p553);
  if (De.get(vBr2)) {
    return;
  }
  let v920 = $e.default.join(v919, p553);
  await Je(v919);
  await (0, ue.writeFile)(v920, p554);
  De.set(vBr2, v920);
}
async function Ya(p555, p556) {
  let v921 = De.get(p556);
  if (v921) {
    await (0, ue.unlink)(v921);
  }
}
async function Ja(p557, p558) {
  let v922 = await Wa();
  (0, ue.writeFile)($e.default.join(v922, fs), p558);
}
async function ft() {
  return $e.default.join(await Ce(), "savedImages");
}
async function Ce() {
  return $e.default.join(We, "MessageLoggerData");
}
async function Ka(p559, p560) {
  let v923 = await Rt();
  let v924 = v923[p560] || (await Ce());
  let v925 = (
    await _t.dialog.showOpenDialog({
      properties: ["openDirectory"],
      defaultPath: v924,
    })
  ).filePaths[0];
  if (!v925) {
    throw Error("Invalid Directory");
  }
  v923[p560] = v925;
  await Er(v923);
  switch (p560) {
    case "logsDir":
      Sr = v925;
      break;
    case "imageCacheDir":
      Tr = v925;
      break;
  }
  if (p560 === "imageCacheDir") {
    await ms(p559);
  }
  return v925;
}
async function Xa(p561, p562) {
  _t.shell.showItemInFolder(p562);
}
async function Qa(p563, p564, p565, p566) {
  let v926 = await _t.dialog.showOpenDialog({
    title: p564,
    filters: p565,
    properties: ["openFile"],
    defaultPath: p566,
  });
  let [v927] = v926.filePaths;
  if (!v927) {
    throw Error("Invalid file");
  }
  return await (0, ue.readFile)(v927, "utf-8");
}
async function _s(p567, p568, p569 = 0, p570 = false) {
  try {
    if (!p568?.url || !p568.oldUrl || !p568?.id) {
      return {
        error: "Invalid Attachment",
        path: null,
      };
    }
    if (p568.id.match(/[\\/.]/)) {
      return {
        error: "Invalid Attachment ID",
        path: null,
      };
    }
    let v928 = De.get(p568.id);
    if (v928) {
      return {
        error: null,
        path: v928,
      };
    }
    let v929 = await fetch(p570 ? p568.oldUrl : p568.url);
    if (v929.status !== 200) {
      if (v929.status === 404 || v929.status === 403 || v929.status === 415) {
        p570 = true;
      }
      p569++;
      if (p569 > 3) {
        return {
          error:
            "Failed to get attachment " +
            p568.id +
            " for caching. too many attempts, error code " +
            v929.status,
          path: null,
        };
      } else {
        await ss(1000);
        return _s(p567, p568, p569, p570);
      }
    }
    let v930 = await v929.arrayBuffer();
    let v931 = await Ir();
    await Je(v931);
    let v932 = $e.default.join(v931, "" + p568.id + p568.fileExtension);
    await (0, ue.writeFile)(v932, Buffer.from(v930));
    De.set(p568.id, v932);
    return {
      error: null,
      path: v932,
    };
  } catch (err) {
    console.error(err);
    return {
      error: err.message,
      path: null,
    };
  }
}
var Dr = {};
O(Dr, {
  canOpenDevTools: () => vs,
  complete: () => to,
  openDevTools: () => eo,
});
w();
var gs = require("electron");
function vs(p571) {
  return !p571.sender.isDestroyed();
}
function eo(p572) {
  if (!vs(p572)) {
    return false;
  }
  let v933 = gs.BrowserWindow.fromWebContents(p572.sender);
  if (p572.sender.isDevToolsOpened()) {
    v933?.focus();
    return true;
  } else {
    p572.sender.openDevTools();
    return true;
  }
}
async function to(p573, p574, p575, p576, p577, p578) {
  let v934 = await so(p574, p575, p577, p578);
  if (v934.error || !v934.token) {
    return {
      success: false,
      error: "AUTH: " + JSON.stringify(v934.error),
    };
  }
  let v935 = await io(p574, v934.token, p576, p577, p578);
  if (v935.error || !v935.success) {
    return {
      success: false,
      error: "PROGRESS: " + JSON.stringify(v935.error),
    };
  } else {
    return {
      success: true,
      error: null,
    };
  }
}
function ws(p579, p580 = "", p581) {
  let v936 = {
    "Content-Type": "application/json",
    "X-Auth-Token": p580,
    "X-Discord-Quest-ID": p579,
  };
  if (p581) {
    v936.Referer = p581;
  }
  return v936;
}
async function ro(p582) {
  try {
    return await p582.json();
  } catch {
    return null;
  }
}
function no(p583) {
  if (p583 != null && typeof p583 == "object" && "token" in p583 && typeof p583.token == "string") {
    return p583.token;
  } else {
    return false;
  }
}
async function so(p584, p585, p586, p587) {
  let v937 = null;
  return {
    token: await fetch("https://" + p584 + ".discordsays.com/.proxy/acf/authorize", {
      headers: ws(p586, "", p587),
      body: JSON.stringify({
        code: p585,
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then(async (p588) => {
        let v938 = await ro(p588);
        let vNo = no(v938);
        if (!p588.ok || !vNo) {
          v937 = {
            status: p588.status,
            body: v938,
          };
          return false;
        } else {
          return vNo;
        }
      })
      .catch((p589) => {
        v937 = p589;
        return false;
      }),
    error: v937,
  };
}
async function io(p590, p591, p592, p593, p594) {
  let v939 = null;
  return {
    success: await fetch("https://" + p590 + ".discordsays.com/.proxy/acf/quest/progress", {
      headers: ws(p593, p591, p594),
      body: JSON.stringify({
        progress: p592,
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((p595) => p595.ok)
      .catch((p596) => {
        v939 = p596;
        return false;
      }),
    error: v939,
  };
}
var Pr = {};
O(Pr, {
  fetchTrackData: () => ao,
});
w();
async function ao() {
  let v940 = await (await fetch("https://gensokyoradio.net/api/station/playing/")).json();
  return {
    title: v940.SONGINFO.TITLE,
    album: v940.SONGINFO.ALBUM,
    artist: v940.SONGINFO.ARTIST,
    position: v940.SONGTIMES.SONGSTART,
    duration: v940.SONGTIMES.SONGEND,
    artwork: v940.MISC.ALBUMART
      ? "https://gensokyoradio.net/images/albums/500/" + v940.MISC.ALBUMART
      : "",
  };
}
var Rr = {};
O(Rr, {
  fetchTopAlbum: () => oo,
});
w();
async function oo(p597, p598) {
  let { apiKey: v, user: v2, period: v3 } = p598;
  let v941 =
    "http://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=" +
    v2 +
    "&api_key=" +
    v +
    "&period=" +
    v3 +
    "&format=json&limit=1";
  let v942 = await (await fetch(v941)).json();
  if (v942.topalbums && v942.topalbums.album.length > 0) {
    let v943 = v942.topalbums.album[0];
    let v944 = v943.name;
    let v945 = v943.artist.name;
    let v946 = v943.image[v943.image.length - 1]["#text"];
    return JSON.stringify({
      albumName: v944,
      artistName: v945,
      albumCoverUrl: v946,
    });
  } else {
    return null;
  }
}
var Ar = {};
O(Ar, {
  getTrackData: () => lo,
});
w();
le();
async function lo(p599, p600) {
  let v947 = new URL("https://api.song.link/v1-alpha.1/links");
  v947.searchParams.set("url", p600);
  v947.searchParams.set("userCountry", j.store.plugins?.SongLink.userCountry || "US");
  let v948 = await fetch(v947.toString()).then((p601) => p601.json());
  let [, v949] =
    Object.entries(v948.entitiesByUniqueId).find(([v950]) => !v950.includes("YOUTUBE")) || [];
  return {
    info: v949
      ? {
          title: v949.title,
          artist: v949.artistName,
        }
      : null,
    links: Object.fromEntries(
      Object.entries(v948.linksByPlatform).map(([v951, v952]) => [
        v951,
        {
          url: v952.url,
          nativeUri: v952.nativeAppUriDesktop,
        },
      ]),
    ),
  };
}
var jr = {};
O(jr, {
  clearCache: () => Eo,
  parseLink: () => ko,
  renderSong: () => bo,
  validateSong: () => xo,
});
w();
w();
w();
w();
function gt(p602) {
  return [p602.service, p602.type, p602.id].join(":");
}
var co = "2.1.3";
function uo(p603) {
  let v953 = new URL(p603);
  v953.protocol = "https";
  v953.username = v953.password = v953.port = v953.search = v953.hash = "";
  return v953.toString().replace(/\/?$/, "");
}
var ys = fetch;
function Nr(p604) {
  ys = p604;
}
async function Q(p605) {
  if (p605.body) {
    let v954 = JSON.stringify(p605.body);
    p605.body = v954;
    p605.headers ??= {};
    p605.headers["content-type"] ??= "application/json";
    p605.headers["content-length"] ??= String(v954.length);
  }
  let v955 = new URL(p605.url);
  for (let [v956, v957] of Object.entries(p605.query ?? {})) {
    v955.searchParams.set(v956, v957);
  }
  let v958 = await ys(v955, {
    method: p605.method,
    redirect: "follow",
    headers: {
      accept: "*/*",
      "user-agent": "SongSpotlight/" + co,
      "cache-control": "public, max-age=3600",
      ...(p605.headers ?? {}),
    },
    cf: {
      cacheTtl: 3600,
      cacheEverything: true,
    },
    body: p605.body,
  });
  let v959 = await v958.text();
  let v960;
  try {
    v960 = JSON.parse(v959);
  } catch {
    v960 = null;
  }
  return {
    ok: v958.ok,
    redirected: v958.redirected,
    url: v958.url,
    status: v958.status,
    headers: v958.headers,
    text: v959,
    json: v960,
  };
}
function Mr(p606) {
  let v961 = p606.match(/id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)?.[1];
  if (v961) {
    try {
      return JSON.parse(v961);
    } catch {
      return;
    }
  }
}
var Xe = 15;
var Pe = {
  services: [],
  parsers: [],
};
var At = new Map();
var Ke = new Map();
async function Qe(p607) {
  let vUo = uo(p607);
  if (At.has(vUo)) {
    return At.get(vUo);
  }
  let { hostname: v, pathname: v2 } = new URL(vUo);
  let v962 = v2.slice(1).split(/\/+/);
  let v963 = null;
  for (let v964 of Pe.parsers) {
    if (v964.hosts.includes(v) && ((v963 = await v964.parse(vUo, v, v962)), v963)) {
      break;
    }
  }
  At.set(vUo, v963);
  if (v963) {
    Ke.set(gt(v963), true);
  }
  return v963;
}
var Nt = new Map();
async function Ur(p608) {
  let vGt = gt(p608);
  if (Nt.has(vGt)) {
    return Nt.get(vGt);
  }
  let v965 = null;
  let v966 = Pe.services.find((p609) => p609.name === p608.service);
  if (v966?.types.includes(p608.type)) {
    v965 = await v966.render(p608.type, p608.id);
  }
  Nt.set(vGt, v965);
  if (p608) {
    Ke.set(gt(p608), true);
  }
  return v965;
}
async function Lr(p610) {
  let vGt2 = gt(p610);
  if (Ke.has(vGt2)) {
    return Ke.get(vGt2);
  }
  let v967 = false;
  let v968 = Pe.services.find((p611) => p611.name === p610.service);
  if (v968?.types.includes(p610.type)) {
    v967 = await v968.validate(p610.type, p610.id);
  }
  Ke.set(vGt2, v967);
  return v967;
}
function Or() {
  At.clear();
  Nt.clear();
  Ke.clear();
}
w();
var ks = /^[^-_][a-z0-9-_]+[^-_]$/i;
var ho = {
  name: "song.link",
  label: "song.link",
  hosts: [
    "song.link",
    "album.link",
    "artist.link",
    "pods.link",
    "playlist.link",
    "mylink.page",
    "odesli.co",
  ],
  async parse(p612, p613, p614) {
    let [v969, v970, v971] = p614;
    if (!v969 || v971 || (v970 && !ks.test(v970))) {
      return null;
    }
    if (!v970 && !ks.test(v969)) {
      return null;
    }
    let v972 = (
      await Q({
        url: p612,
      })
    ).text;
    let v973 = Mr(v972)?.props?.pageProps?.pageData?.sections;
    if (!v973) {
      return null;
    }
    let v974 = v973.flatMap((p615) => p615.links ?? []).filter((p616) => p616.url && p616.platform);
    let v975 =
      v974.find((p617) => p617.platform === "spotify") ??
      v974.find((p618) => p618.platform === "soundcloud") ??
      v974.find((p619) => p619.platform === "appleMusic") ??
      v974.find((p620) => p620.platform === "tidal");
    if (v975) {
      return await Qe(v975.url);
    } else {
      return null;
    }
  },
};
var Mt = new Map();
function po(p621, p622) {
  return {
    retrieve(...args) {
      if (Mt.has(p621)) {
        return Mt.get(p621);
      }
      let vP622 = p622(...args);
      if (vP622 instanceof Promise) {
        return vP622.then((p623) => {
          Mt.set(p621, p623);
          return p623;
        });
      } else {
        Mt.set(p621, vP622);
        return vP622;
      }
    },
  };
}
var $r = "us";
var fo = "songspotlight";
function bs(p624, p625) {
  return "https://music.apple.com/" + $r + "/" + p624 + "/" + fo + "/" + p625;
}
var xs = po("applemusicToken", async (p626) => {
  p626 ??= (
    await Q({
      url: "https://music.apple.com/" + $r + "/new",
    })
  ).text;
  let v976 = p626.match(/src="(\/assets\/index~\w+\.js)"/i)?.[1];
  if (v976) {
    return (
      await Q({
        url: "https://music.apple.com" + v976,
      })
    ).text.match(/\w+="(ey.*?)"/i)?.[1];
  }
});
var mo = {
  name: "applemusic",
  label: "Apple Music",
  hosts: ["music.apple.com", "geo.music.apple.com"],
  types: ["artist", "album", "playlist", "song"],
  async parse(p627, p628, p629) {
    let [v977, v978, v979, v980, v981] = p629;
    if (!v977 || !v978 || !this.types.includes(v978) || !v979 || !v980 || v981) {
      return null;
    }
    let v982 = await Q({
      url: bs(v978, v980),
    });
    if (v982.status !== 200) {
      return null;
    } else {
      await xs.retrieve(v982.text);
      return {
        service: this.name,
        type: v978,
        id: v980,
      };
    }
  },
  async render(p630, p631) {
    let v983 = await xs.retrieve();
    if (!v983) {
      return null;
    }
    let v984 = await Q({
      url: "https://amp-api.music.apple.com/v1/catalog/" + $r + "/" + p630 + "s",
      query: {
        include: "songs",
        ids: p631,
      },
      headers: {
        authorization: "Bearer " + v983,
        origin: "https://music.apple.com",
      },
    });
    if (v984.status !== 200) {
      return null;
    }
    let { attributes: v, relationships: v2 } = v984.json.data[0];
    let v985 = {
      label: v.name,
      sublabel: v.artistName ?? "Top songs",
      link: v.url,
      explicit: v.contentRating === "explicit",
    };
    let v986 = v.artwork?.url?.replace(/{[wh]}/g, "128");
    if (p630 === "song") {
      let v987 = v.durationInMillis;
      let v988 = v.previews?.[0]?.url;
      return {
        form: "single",
        ...v985,
        thumbnailUrl: v986,
        single: {
          audio:
            v988 && v987
              ? {
                  previewUrl: v988,
                  duration: v987,
                }
              : undefined,
        },
      };
    } else {
      return {
        form: "list",
        ...v985,
        thumbnailUrl: v986,
        list: (v2.tracks?.data ?? v2.songs?.data ?? []).slice(0, Xe).map(({ attributes: arg }) => {
          let v989 = arg.durationInMillis;
          let v990 = arg.previews?.[0]?.url;
          return {
            label: arg.name,
            sublabel: arg.artistName,
            link: arg.url,
            explicit: arg.contentRating === "explicit",
            audio:
              v990 && v989
                ? {
                    previewUrl: v990,
                    duration: v989,
                  }
                : undefined,
          };
        }),
      };
    }
  },
  async validate(p632, p633) {
    return (
      (
        await Q({
          url: bs(p632, p633),
        })
      ).status === 200
    );
  },
};
var Ds = "nIjtjiYnjkOhMyh5xrbqEW12DxeJVnic";
async function qr(p634, p635, p636) {
  return (
    await Q({
      url: "https://api-widget.soundcloud.com/" + p634 + "s/" + p635 + (p636 ? "/tracks" : ""),
      query: {
        format: "json",
        client_id: Ds,
        app_version: "1768986291",
        limit: "20",
      },
    })
  ).json;
}
async function Es(p637) {
  let v991 = p637.sort((p638, p639) => {
    let v992 = p638.format.protocol === "progressive";
    let v993 = p639.format.protocol === "progressive";
    if (v992 && !v993) {
      return -1;
    } else if (v993 && !v992) {
      return 1;
    } else {
      return 0;
    }
  })?.[0];
  if (v991?.url && v991?.duration) {
    let v994 = (
      await Q({
        url: v991.url,
        query: {
          client_id: Ds,
        },
      })
    ).json;
    if (v994?.url) {
      return {
        duration: v991.duration,
        previewUrl: v994.url,
      };
    } else {
      return undefined;
    }
  }
}
var _o = {
  name: "soundcloud",
  label: "Soundcloud",
  hosts: ["soundcloud.com", "m.soundcloud.com", "on.soundcloud.com"],
  types: ["user", "track", "playlist"],
  async parse(p640, p641, p642) {
    if (p641 === "on.soundcloud.com") {
      if (!p642[0] || p642[1]) {
        return null;
      }
      let { url: v, status: v2 } = await Q({
        url: p640,
      });
      if (v2 === 200) {
        return await Qe(v);
      } else {
        return null;
      }
    } else {
      let [v995, v996, v997, v998] = p642;
      let v999 = false;
      if (
        (v995 && !v996) ||
        (v995 && v996 && v996 !== "sets" && !v997) ||
        (v995 && v996 === "sets" && v997 && !v998)
      ) {
        v999 = true;
      }
      if (!v999) {
        return null;
      }
      let v1000 = (
        await Q({
          url: "https://soundcloud.com/oembed",
          query: {
            format: "json",
            url: p640,
          },
        })
      ).json;
      if (!v1000?.html) {
        return null;
      }
      let v1001 = v1000.html.match(/w\.soundcloud\.com.*?url=(.*?)[&"]/)?.[1];
      if (!v1001) {
        return null;
      }
      let v1002 = decodeURIComponent(v1001).split(/\/+/);
      let v1003 = v1002[2];
      let v1004 = v1002[3];
      if (!v1003 || !v1004) {
        return null;
      } else {
        return {
          service: this.name,
          type: v1003.slice(0, -1),
          id: v1004,
        };
      }
    }
  },
  async render(p643, p644) {
    let v1005 = await qr(p643, p644, false);
    if (!v1005?.id) {
      return null;
    }
    let v1006 = {
      label: v1005.title ?? v1005.username,
      sublabel: v1005.user?.username ?? "Top tracks",
      link: v1005.permalink_url,
      explicit: !!v1005.publisher_metadata?.explicit,
    };
    let v1007 = v1005.artwork_url ?? v1005.avatar_url;
    if (p643 === "track") {
      let v1008 = await Es(v1005.media?.transcodings ?? []).catch(() => {});
      return {
        form: "single",
        ...v1006,
        thumbnailUrl: v1007,
        single: {
          audio: v1008,
        },
      };
    } else {
      let v1009 = [];
      if (p643 === "user") {
        let v1010 = await qr(p643, p644, true).catch(() => {});
        if (v1010?.collection) {
          v1009 = v1010.collection;
        }
      } else if (v1005.tracks) {
        v1009 = v1005.tracks;
      }
      return {
        form: "list",
        ...v1006,
        thumbnailUrl: v1007,
        list: await Promise.all(
          v1009
            .filter((p645) => p645.title)
            .slice(0, Xe)
            .map(async (p646) => ({
              label: p646.title,
              sublabel: p646.user?.username ?? "unknown",
              link: p646.permalink_url,
              explicit: !!p646.publisher_metadata.explicit,
              audio: await Es(p646.media?.transcodings ?? []).catch(() => {}),
            })),
        ),
      };
    }
  },
  async validate(p647, p648) {
    return (await qr(p647, p648, false))?.id !== undefined;
  },
};
async function Ss(p649, p650) {
  return Mr(
    (
      await Q({
        url: "https://open.spotify.com/embed/" + p649 + "/" + p650,
      })
    ).text,
  );
}
function Ts(p651) {
  let [v1011, v1012, v1013] = p651.split(":");
  if (v1011 === "spotify" && v1012 && v1013) {
    return "https://open.spotify.com/" + v1012 + "/" + v1013;
  } else {
    return null;
  }
}
var go = {
  name: "spotify",
  label: "Spotify",
  hosts: ["open.spotify.com"],
  types: ["track", "album", "playlist", "artist"],
  async parse(p652, p653, p654) {
    let [v1014, v1015, v1016] = p654;
    if (
      !v1014 ||
      !this.types.includes(v1014) ||
      !v1015 ||
      v1016 ||
      !(await this.validate(v1014, v1015))
    ) {
      return null;
    } else {
      return {
        service: this.name,
        type: v1014,
        id: v1015,
      };
    }
  },
  async render(p655, p656) {
    let v1017 = (await Ss(p655, p656))?.props?.pageProps?.state?.data?.entity;
    if (!v1017) {
      return null;
    }
    let v1018 = {
      label: v1017.title,
      sublabel: v1017.subtitle ?? v1017.artists?.map((p657) => p657.name).join(", "),
      link: Ts(v1017.uri),
      explicit: !!v1017.isExplicit,
    };
    let v1019 = v1017.visualIdentity.image
      .sort((p658, p659) => p658.maxWidth - p659.maxWidth)[0]
      ?.url.replace(/:\/\/.*?\.spotifycdn\.com\/image/, "://i.scdn.co/image");
    if (p655 === "track") {
      return {
        form: "single",
        ...v1018,
        thumbnailUrl: v1019,
        single: {
          audio:
            v1017.audioPreview && v1017.duration
              ? {
                  duration: v1017.duration,
                  previewUrl: v1017.audioPreview.url,
                }
              : undefined,
        },
      };
    } else {
      return {
        form: "list",
        ...v1018,
        thumbnailUrl: v1019,
        list: (v1017.trackList ?? []).slice(0, Xe).map((p660) => ({
          label: p660.title,
          sublabel: p660.subtitle ?? p660.artists?.map((p661) => p661.name).join(", "),
          link: Ts(p660.uri),
          explicit: !!p660.isExplicit,
          audio:
            p660.audioPreview && p660.duration
              ? {
                  duration: p660.duration,
                  previewUrl: p660.audioPreview.url,
                }
              : undefined,
        })),
      };
    }
  },
  async validate(p662, p663) {
    return !(await Ss(p662, p663))?.props?.pageProps?.title;
  },
};
var vo = "vNVdglQOjFJJGG2U";
async function Ut(p664, p665, p666 = "", p667 = {}) {
  return await Q({
    url: "https://api.tidal.com/v1/" + p664 + "s/" + p665 + "/" + p666,
    query: {
      countryCode: "US",
      ...p667,
    },
    headers: {
      "X-Tidal-Token": vo,
    },
  }).then((p668) => (p668.ok ? p668.json : undefined));
}
async function Is(p669) {
  let v1020 = await Ut("track", p669, "playbackinfo", {
    audioquality: "HIGH",
    playbackmode: "STREAM",
    assetpresentation: "FULL",
  });
  if (v1020?.manifest) {
    return JSON.parse(atob(v1020.manifest)).urls[0];
  }
}
function Cs(p670) {
  try {
    let v1021 = new URL(p670);
    v1021.protocol = "https://";
    return v1021.toString();
  } catch {
    return p670;
  }
}
var wo = {
  name: "tidal",
  label: "Tidal",
  hosts: ["tidal.com", "www.tidal.com", "listen.tidal.com"],
  types: ["artist", "album", "playlist", "track"],
  async parse(p671, p672, p673) {
    let [v1022, v1023, v1024, v1025] = p673;
    let v1026 = v1024 && v1025 ? v1024 : v1022;
    let v1027 = v1024 && v1025 ? v1025 : v1023;
    if (
      !v1026 ||
      !this.types.includes(v1026) ||
      !v1027 ||
      (v1026 === "playlist" && !/^[-a-f0-9]+$/.test(v1027)) ||
      (v1026 !== "playlist" && Number.isNaN(Number(v1027))) ||
      !(await this.validate(v1026, v1027))
    ) {
      return null;
    } else {
      return {
        service: this.name,
        type: v1026,
        id: v1027,
      };
    }
  },
  async render(p674, p675) {
    let v1028 = await Ut(p674, p675);
    if (!v1028) {
      return null;
    }
    let v1029 = v1028.type === "playlist" ? "TIDAL" : "Top tracks";
    let v1030 = {
      label: v1028.title || v1028.name || "Unknown",
      sublabel: v1028.artists?.map((p676) => p676.name).join(", ") || v1028.creator?.name || v1029,
      link: Cs(v1028.url),
      explicit: !!v1028.explicit,
    };
    let v1031 = v1028.picture ?? v1028.squareImage ?? v1028.album?.cover;
    let v1032 = v1031
      ? "https://resources.tidal.com/images/" + v1031.replace(/-/g, "/") + "/160x160.jpg"
      : undefined;
    if (p674 === "track") {
      let v1033 = v1028.duration && (await Is(p675).catch(() => {}));
      return {
        form: "single",
        ...v1030,
        thumbnailUrl: v1032,
        single: {
          audio:
            v1033 && v1028.duration
              ? {
                  previewUrl: v1033,
                  duration: v1028.duration * 1000,
                }
              : undefined,
        },
      };
    } else {
      let v1034 = await Ut(p674, p675, p674 === "artist" ? "toptracks" : "tracks", {
        limit: String(Xe),
      });
      return {
        form: "list",
        ...v1030,
        thumbnailUrl: v1032,
        list: await Promise.all(
          v1034?.items.slice(0, Xe).map(async (p677) => {
            let v1035 = p677.duration && (await Is(p677.id).catch(() => {}));
            return {
              label: p677.title,
              sublabel: p677.artists.map((p678) => p678.name).join(", "),
              link: Cs(p677.url),
              explicit: !!p677.explicit,
              audio:
                v1035 && p677.duration
                  ? {
                      previewUrl: v1035,
                      duration: p677.duration * 1000,
                    }
                  : undefined,
            };
          }) ?? [],
        ),
      };
    }
  },
  async validate(p679, p680) {
    return !!(await Ut(p679, p680));
  },
};
var Fr = [mo, _o, go, wo];
Pe.services = Fr;
var Ps = [ho, ...Fr];
Pe.parsers = Ps;
var Rs = require("electron");
Nr(Rs.net.fetch);
async function ko(p681, p682) {
  return Qe(p682);
}
async function bo(p683, p684) {
  return Ur(p684);
}
async function xo(p685, p686) {
  return Lr(p686);
}
function Eo() {
  return Or();
}
var zr = {};
O(zr, {
  downloadTheme: () => Co,
  getThemesDir: () => Io,
  themeExists: () => To,
});
w();
var Lt = require("fs");
var Ot = require("path");
w();
async function To(p687, p688, p689) {
  return (0, Lt.existsSync)((0, Ot.join)(p688.toString(), p689.name + ".theme.css"));
}
function Io(p690, p691, p692) {
  return (0, Ot.join)(p691.toString(), p692.name + ".theme.css");
}
async function Co(p693, p694, p695) {
  if (true || !p695.content || !p695.name) {
    return;
  }
  let v1036 = (0, Ot.join)(p694.toString(), p695.name + ".theme.css");
  let v1037 = await (await fetch("https://themes.equicord.org/api/download/" + p695.id)).text();
  (0, Lt.writeFileSync)(v1036, v1037);
}
var en = {};
O(en, {
  ensurePluginsDirectory: () => Mo,
  getUserplugins: () => Ks,
  initPluginInstall: () => Oo,
  isUpdateAvailableForPlugin: () => Lo,
  openGitPathModal: () => jo,
  rmPlugin: () => Uo,
  updatePlugin: () => Fo,
});
w();
le();
var Ae = require("child_process");
var L = require("electron");
var Re = require("fs");
var ee = require("fs/promises");
var U = require("path");
var Kr = Ee(Ws());
var Hs =
  '<!DOCTYPE html>\n<html lang="en">\n    <head>\n        <meta charset="UTF-8" />\n        <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n        <title>Review userplugin</title>\n        <script>\n            document.addEventListener("DOMContentLoaded", () => {\n                document\n                    .querySelector("#abort")\n                    .addEventListener("click", () => {\n                        document.title = "abortInstall";\n                    });\n                document\n                    .querySelector("#install")\n                    .addEventListener("click", () => {\n                        if (\n                            !document\n                                .querySelector("style")\n                                .innerHTML.includes(\n                                    "#native-ts-warning { display: none !important; }"\n                                ) &&\n                            !document.querySelector("input[type=\'checkbox\']")\n                                .checked\n                        )\n                            return alert(\n                                "Make sure to acknowledge all warnings before installing."\n                            );\n                        document.title = "install";\n                    });\n\n                document.querySelector("style").innerHTML +=\n                    document.querySelector("addAtRuntimeStyle").innerHTML;\n            });\n        </script>\n        <style>\n            addAtRuntimeStyle {\n                display: none !important;\n            }\n            * {\n                font-family: sans-serif;\n                color: #cdd6f4;\n            }\n            body {\n                background-color: #1e1e2e;\n                padding: 10px;\n                display: flex;\n                flex-direction: column;\n            }\n            .card {\n                padding: 10px 12px;\n                border: 1px solid #9399b2;\n                border-radius: 10px;\n                margin-bottom: 10px; /* Added margin for better spacing */\n            }\n            .warn-card {\n                border-color: #f38ba8;\n                background-color: #313244;\n            }\n            .danger-card {\n                border-color: #f38ba8;\n                background-color: #313244;\n                h3 {\n                    color: #cdd6f4;\n                }\n            }\n            .card * {\n                margin: 0;\n            }\n            .card h3 {\n                margin-bottom: 5px;\n            }\n            input[type="checkbox"] {\n                margin-right: 5px;\n            }\n            #validate {\n                color: #f38ba8;\n            }\n            #btn-row {\n                display: flex;\n                flex: 1;\n            }\n            #btn-row * {\n                flex: 1;\n                margin: 5px;\n                padding: 10px 5px;\n                border: 1px solid #cdd6f4;\n                border-radius: 5px;\n            }\n            #abort {\n                background-color: #f38ba8;\n                color: #11111b;\n            }\n            #install {\n                color: #a6e3a1;\n                border-color: #a6e3a1;\n                background-color: #00000000;\n            }\n            #abort:hover {\n                background-color: #ec9393;\n                font-weight: bold;\n            }\n            #install:hover {\n                background-color: #425040;\n                font-weight: bold;\n            }\n        </style>\n        <addAtRuntimeStyle>\n            %WARNINGHIDER% %NATIVETSHIDER% %PRESENDHIDER%\n        </addAtRuntimeStyle>\n    </head>\n    <body>\n        <h2>Plugin info</h2>\n        <div class="card" id="plugin-info-card">\n            <h3>%PLUGINNAME%</h3>\n            <p>%PLUGINDESC%</p>\n        </div>\n\n        <h2 data-useless="warning">Warnings</h2>\n        <div\n            data-useless="warning"\n            class="card danger-card"\n            id="native-ts-warning"\n        >\n            <h3>Uses a native.ts file</h3>\n            <p>\n                Use of this file allows the plugin to escape the browser sandbox\n                and potentially do anything to your system and data.\n                <b\n                    >ONLY INSTALL THIS PLUGIN AFTER REVIEWING THE CODE AND BEING\n                    100% SURE THAT NOTHING BAD CAN BE DONE!</b\n                >\n            </p>\n            <br />\n            <input type="checkbox" /> Acknowledge warning (required to allow\n            install)\n        </div>\n        <div\n            data-useless="warning"\n            class="card warn-card"\n            id="pre-send-warning"\n        >\n            <h3>Has pre-send listeners</h3>\n            <p>\n                This allows the plugin to edit your messages before they are\n                sent.\n            </p>\n        </div>\n        <p id="validate">\n            Reminder: installing a userplugin can be a destructive action. Make\n            sure that you know and trust the developer before installing any.\n        </p>\n        <div id="btn-row">\n            <button id="abort">Cancel installation</button>\n            <button id="install">Install plugin</button>\n        </div>\n    </body>\n</html>\n';
var Zs =
  '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Git Path</title>\n    <script>\n        document.addEventListener("DOMContentLoaded", () => {\n            document.title\n            document.querySelector("#abort").addEventListener("click", () => {document.title = "abort";})\n            document.querySelector("#check").addEventListener("click", () => {document.title = `check-${document.querySelector("input").value.trim()}`; setTimeout(() => {document.title = "git";}, 1000)})\n            document.querySelector("#install").addEventListener("click", () => {document.title = `ok-${document.querySelector("input").value.trim()}`;})\n        });\n    </script>\n    <style>\n        * {\n            font-family: sans-serif;\n            color: #cdd6f4;\n        }\n\n        body {\n            background-color: #1e1e2e;\n            padding: 10px;\n            display: flex;\n            flex-direction: column;\n        }\n\n        #btn-row {\n            display: flex;\n            flex: 1;\n        }\n\n        #btn-row * {\n            flex: 1;\n            margin: 5px;\n            padding: 10px 5px;\n            border: 1px solid #cdd6f4;\n            border-radius: 5px;\n        }\n\n        #abort {\n            border-color: #f38ba8;\n            color: #f38ba8;\n            background-color: #00000000;\n        }\n\n        #install {\n            color: #a6e3a1;\n            border-color: #a6e3a1;\n            background-color: #00000000;\n        }\n\n        #check {\n            color: #a1afe3;\n            border-color: #a1afe3;\n            background-color: #00000000;\n        }\n\n        #abort:hover {\n            background-color: #504040;\n            font-weight: bold;\n        }\n\n        #check:hover {\n            background-color: #404550;\n            font-weight: bold;\n        }\n\n        #install:hover {\n            background-color: #425040;\n            font-weight: bold;\n        }\n\n        input {\n            background-color: #313244;\n            color: #cdd6f4;\n            padding: 5px 10px;\n            margin-bottom: 15px;\n            border: 1px solid #6c7086;\n            border-radius: 5px;\n\n            &:focus {\n                outline: none;\n                border: 2px solid #cdd6f4;\n                padding: 4px 9px;\n            }\n\n            &::placeholder {\n                color: #6c7086;\n            }\n        }\n    </style>\n</head>\n\n<body>\n    <h2>Git path</h2>\n    <p>\n        If you\'re having issues downloading userplugins because Git isn\'t properly detected, you can manually set a Git\n        path\n        that\'ll be used instead of\n        simply looking in PATH.\n        <br />\n        If you do not specify anything, Git will be called from the PATH variable. Do not set this setting unless you\n        have issues.\n        <br />\n        <br />\n        On Linux, Flatpak still isn\'t supported.\n    </p>\n    <input type="text" id="git-path" placeholder="Full, absolute path to Git" />\n    <div id="btn-row">\n        <button id="abort">Cancel</button>\n        <button id="check">Check</button>\n        <button id="install">Set</button>\n    </div>\n</body>\n\n</html>\n';
var Ys =
  '<!DOCTYPE html>\n<html lang="en">\n    <head>\n        <meta charset="UTF-8" />\n        <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n        <title>Review userplugin</title>\n        <script>\n            document.addEventListener("DOMContentLoaded", () => {\n                document\n                    .querySelector("#abort")\n                    .addEventListener("click", () => {\n                        document.title = "abortInstall";\n                    });\n                document\n                    .querySelector("#install")\n                    .addEventListener("click", () => {\n                        document.title = "install";\n                    });\n\n                for (const aEl of document.querySelectorAll("a")) {\n                    aEl.addEventListener("click", (e) => {\n                        e.preventDefault();\n                        document.title = `openLink:${aEl.href}`;\n                    });\n                }\n            });\n        </script>\n        <style>\n            addAtRuntimeStyle {\n                display: none !important;\n            }\n            * {\n                font-family: sans-serif;\n                color: #cdd6f4;\n            }\n            body {\n                background-color: #1e1e2e;\n                padding: 10px;\n                display: flex;\n                flex-direction: column;\n            }\n            .card {\n                padding: 10px 12px;\n                border: 1px solid #9399b2;\n                border-radius: 10px;\n                margin-bottom: 10px; /* Added margin for better spacing */\n            }\n            .warn-card {\n                border-color: #f38ba8;\n                background-color: #313244;\n            }\n            .danger-card {\n                border-color: #f38ba8;\n                background-color: #313244;\n                h3 {\n                    color: #cdd6f4;\n                }\n            }\n            .card * {\n                margin: 0;\n            }\n            .card h3 {\n                margin-bottom: 5px;\n            }\n            input[type="checkbox"] {\n                margin-right: 5px;\n            }\n            #validate {\n                color: #f38ba8;\n            }\n            #btn-row {\n                display: flex;\n                flex: 1;\n            }\n            #btn-row * {\n                flex: 1;\n                margin: 5px;\n                padding: 10px 5px;\n                border: 1px solid #cdd6f4;\n                border-radius: 5px;\n            }\n            #abort {\n                background-color: #f38ba8;\n                color: #11111b;\n            }\n            #install {\n                color: #a6e3a1;\n                border-color: #a6e3a1;\n                background-color: #00000000;\n            }\n            #abort:hover {\n                background-color: #ec9393;\n                font-weight: bold;\n            }\n            #install:hover {\n                background-color: #425040;\n                font-weight: bold;\n            }\n            a {\n                color: #89b4fa;\n            }\n        </style>\n    </head>\n    <body>\n        <h2>Plugin info</h2>\n        <div class="card" id="plugin-info-card">\n            <h3>%PLUGINNAME%</h3>\n            <p>%PLUGINDESC%</p>\n        </div>\n        <h2>Update info</h2>\n        <div class="card" id="update-info-card">\n            <p>%COMMITMESSAGE%</p>\n            <br />\n            <p>\n                You may want to review the\n                <a href="%REMOTE%">source code</a> that will be applied.\n            </p>\n        </div>\n\n        <p id="validate">\n            Reminder: installing a userplugin can be a destructive action. Make\n            sure that you know and trust the developer before installing any.\n        </p>\n        <div id="btn-row">\n            <button id="abort">Cancel update</button>\n            <button id="install">Apply update</button>\n        </div>\n    </body>\n</html>\n';
var Ao =
  /export default definePlugin\((?:\s|\/(?:\/|\*).*)*{\s*(?:\s|\/(?:\/|\*).*)*name:\s*(?:"|'|`)(.*)(?:"|'|`)(?:\s|\/(?:\/|\*).*)*,(?:\s|\/(?:\/|\*).*)*.+(?:\s|\/(?:\/|\*).*)*description:\s*(?:"|'|`)(.*)(?:"|'|`)(?:\s|\/(?:\/|\*).*)*/;
var No =
  /https:\/\/(?:((?:git(?:hub|lab)\.com|git\.(?:[a-zA-Z0-9]|\.)+|codeberg\.org))\/(?!user-attachments)((?:[a-zA-Z0-9]|-)+)\/((?:[a-zA-Z0-9]|-|\.)+)(?:\.git)?|(plugins\.(nin0)\.dev)\/((?:[a-zA-Z0-9]|-|\.)+))(?:\/)?/;
var se = ["desktop", "equibop"].includes((0, U.basename)(__dirname))
  ? (0, U.join)(__dirname, "../")
  : __dirname;
async function Mo(p696) {}
async function Uo(p697, p698) {
  return new Promise(async (p699, p700) => {
    let v1038 = (await Ks()).find((p701) => p701.directory === p698);
    if (!v1038) {
      return;
    }
    if (
      (
        await L.dialog.showMessageBox({
          title: "Uninstall plugin",
          message: "Uninstall " + v1038.name,
          type: "error",
          detail:
            "The uninstall of the userplugin " +
            v1038.name +
            " has been requested. Would you like to do so?\n\nIf you did not initiate this, press No.",
          buttons: ["No", "Yes"],
        })
      ).response !== 1
    ) {
      return p700("User rejected");
    }
    await (0, ee.rm)((0, U.join)(se, "../src/userplugins", p698), {
      recursive: true,
    });
    await Xr();
    p699("Done");
  });
}
async function Lo(p702, p703) {
  return new Promise((p704) => {
    let v1039 = (0, U.join)(se, "../src/userplugins", p703);
    (0, Ae.exec)("git fetch", {
      cwd: v1039,
    }).once("close", () => {
      async function f2() {
        try {
          let v1040 = (await (0, ee.readFile)((0, U.join)(v1039, ".git/HEAD"), "utf8")).match(
            /^ref: (.+)/,
          )[1];
          let v1041 = (
            await (0, ee.readFile)((0, U.join)(v1039, ".git/refs/remotes/origin/HEAD"), "utf8")
          ).match(/^ref: (.+)/)[1];
          let v1042 = await (0, ee.readFile)((0, U.join)(v1039, ".git", v1040), "utf8");
          let v1043 = await (0, ee.readFile)((0, U.join)(v1039, ".git", v1041), "utf8");
          p704(v1042 !== v1043);
        } catch {
          p704(false);
        }
      }
      f2();
    });
  });
}
function Oo(p705, p706, p707, p708, p709) {
  return new Promise(async (p710, p711) => {
    let v1044 = p706.match(No);
    let v1045 = p707 === "plugins.nin0.dev" ? 1 : 0;
    if (
      ![4, 7].includes(v1044.length) ||
      v1044[0] !== p706 ||
      v1044[[1, 4][v1045]] !== p707 ||
      v1044[[2, 5][v1045]] !== p708 ||
      v1044[[3, 6][v1045]] !== p709
    ) {
      return p711("Invalid link");
    }
    switch (
      (
        await L.dialog.showMessageBox({
          title: "Clone userplugin",
          message: "You are about to clone a userplugin from " + p707 + ".",
          type: "question",
          detail:
            'The repository name is "' +
            p709 +
            '" and it is owned by "' +
            p708 +
            '".\nThe repository URL is ' +
            p706 +
            "\n\n(If you did not request this intentionally, choose Cancel)",
          buttons: [
            "Cancel",
            "Clone repository and continue install",
            "Open repository in browser",
          ],
        })
      ).response
    ) {
      case 0:
        return p711("Rejected by user");
      case 1: {
        await Js(p706, p709);
        break;
      }
      case 2:
        await L.shell.openExternal(p706);
        return p711("silentStop");
    }
    let v1046 = await Qr((0, U.join)(se, "..", "src", "userplugins", p709));
    let v1047 = new L.BrowserWindow({
      maximizable: false,
      minimizable: false,
      width: 560,
      height: v1046.usesNative || v1046.usesPreSend ? 650 : 360,
      resizable: false,
      webPreferences: {
        devTools: true,
      },
      title: "Review userplugin",
      modal: true,
      parent: L.BrowserWindow.getAllWindows()[0],
      show: false,
      autoHideMenuBar: true,
    });
    let v1048 = new L.WebContentsView({
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
      },
    });
    v1047.contentView.addChildView(v1048);
    v1047.loadURL(qo(v1046));
    v1047.on("page-title-updated", async (p712) => {
      switch (v1047.webContents.getTitle()) {
        case "abortInstall":
          v1047.close();
          await (0, ee.rm)((0, U.join)(se, "..", "src", "userplugins", p709), {
            recursive: true,
          });
          return p711("Rejected by user");
        case "install": {
          v1047.close();
          try {
            await Xr();
          } catch (err) {
            p711(err.toString());
          }
          p710(
            JSON.stringify({
              name: v1046.name,
              native: v1046.usesNative,
            }),
          );
          break;
        }
      }
    });
    v1047.show();
  });
}
async function Xr() {
  return new Promise((p713, p714) => {
    let v1049 = (0, Ae.exec)("pnpm build --dev", {
      cwd: (0, U.join)(se, ".."),
      shell: process.env.SHELL || process.env.ComSpec || "/bin/sh",
    });
    v1049.once("close", () => {
      if (v1049.exitCode !== 0) {
        p714("Failed to build Vencord, try building from console");
      }
      p713("Success");
    });
  });
}
async function Qr(p715, p716 = {}) {
  return new Promise((p717, p718) => {
    let v1050 = (0, Re.readdirSync)(p715);
    let v1051;
    v1050.forEach((p719) => {
      if (p719 === "index.ts") {
        v1051 = "index.ts";
      }
      if (p719 === "index.tsx") {
        v1051 = "index.tsx";
      }
      if (p719 === "index.js") {
        v1051 = "index.js";
      }
      if (p719 === "index.jsx") {
        v1051 = "index.jsx";
      }
    });
    if (!v1051) {
      p718("Invalid plugin");
    }
    let v1052 = (0, Re.readFileSync)(p715 + "/" + v1051, "utf8");
    let v1053;
    try {
      v1053 = (0, Re.readFileSync)((0, U.join)(p715, ".git/config"), "utf8").match(
        /\[remote "origin"]\s+url = (https:\/\/(?:(?:git(?:hub|lab)\.com|git\.(?:[a-zA-Z0-9]|\.)+|codeberg\.org)\/(?!user-attachments)(?:[a-zA-Z0-9]|-)+\/(?:[a-zA-Z0-9]|-|\.)+(?:\.git)?|(plugins\.(nin0)\.dev)\/((?:[a-zA-Z0-9]|-|\.)+))(?:\/)?)\n/,
      );
    } catch {
      v1053 = null;
    }
    let v1054;
    try {
      let v1055 = (0, Re.readFileSync)((0, U.join)(p715, "meta.yml"), "utf8");
      console.log(v1055);
      let v1056 = Kr.default.load(v1055);
      if (v1056.thread && typeof v1056.thread == "string" && /^\d+$/.test(v1056.thread)) {
        v1054 = v1056.thread;
      }
    } catch {
      v1054 = null;
    }
    let v1057 = v1052.match(Ao);
    p717({
      name: v1057[1],
      description: v1057[2],
      usesPreSend: v1052.includes("PreSendListener") || v1052.includes("onBeforeMessage"),
      usesNative: v1050.includes("native.ts") || v1050.includes("native.js"),
      remote: v1053 ? v1053[1] : "",
      supportChannelID: v1054,
      ...p716,
    });
  });
}
async function Js(p720, p721) {
  return new Promise((p722, p723) => {
    let v1058 = (0, Ae.spawn)("git", ["clone", p720], {
      cwd: (0, U.join)(se, "..", "src", "userplugins"),
    });
    v1058.once("close", async () => {
      if (v1058.exitCode !== 0) {
        if (!(0, Re.existsSync)((0, U.join)(se, "..", "src", "userplugins", p721))) {
          return p723("Failed to clone");
        }
        if (
          (
            await L.dialog.showMessageBox({
              title: "Error",
              message: "Plugin already exists",
              type: "error",
              detail:
                "The plugin that you tried to clone already exists at " +
                (0, U.join)(se, "..", "src", "userplugins") +
                ".\nWould you like to reclone it? Only do this if you want to reinstall or update the plugin.",
              buttons: ["No", "Yes"],
            })
          ).response !== 1
        ) {
          return p723("User rejected");
        }
        await (0, ee.rm)((0, U.join)(se, "..", "src", "userplugins", p721), {
          recursive: true,
        });
        await Js(p720, p721);
      }
      p722();
    });
  });
}
function qo(p724) {
  let v1059 = Hs.replace("%PLUGINNAME%", p724.name.replaceAll("<", "&lt;"))
    .replace("%PLUGINDESC%", p724.description.replaceAll("<", "&lt;"))
    .replace(
      "%WARNINGHIDER%",
      !p724.usesNative && !p724.usesPreSend
        ? '[data-useless="warning"] { display: none !important; }'
        : "",
    )
    .replace(
      "%NATIVETSHIDER%",
      p724.usesNative ? "" : "#native-ts-warning { display: none !important; }",
    )
    .replace(
      "%PRESENDHIDER%",
      p724.usesPreSend ? "" : "#pre-send-warning { display: none !important; }",
    );
  return "data:text/html;base64," + Buffer.from(v1059).toString("base64");
}
function $o(p725) {
  let v1060 = Ys.replace("%PLUGINNAME%", p725.name.replaceAll("<", "&lt;"))
    .replace("%PLUGINDESC%", p725.description.replaceAll("<", "&lt;"))
    .replace("%REMOTE%", p725.remote)
    .replace("%COMMITMESSAGE%", p725.commit.replaceAll("\n", "<br />"));
  return "data:text/html;base64," + Buffer.from(v1060).toString("base64");
}
async function Ks() {
  let v1061 = await (0, ee.readdir)((0, U.join)(se, "..", "src", "userplugins"), {
    withFileTypes: true,
  });
  return (
    await Promise.allSettled(
      v1061
        .filter((p726) => p726.isDirectory())
        .map((p727) => ({
          path: (0, U.join)(p727.parentPath, p727.name),
          directory: p727.name,
        }))
        .map(({ path: arg, directory: arg2 }) =>
          Qr(arg, {
            directory: arg2,
          }),
        ),
    )
  )
    .filter((p728) => p728.status === "fulfilled")
    .map((p729) => p729.value);
}
async function Fo(p730, p731) {
  return new Promise((p732, p733) => {
    let v1062 = (0, U.join)(se, "../src/userplugins", p731);
    async function f3() {
      let v1063 = await Qr(v1062);
      let v1064 = new L.BrowserWindow({
        maximizable: false,
        minimizable: false,
        width: 560,
        height: 600,
        resizable: false,
        webPreferences: {
          devTools: true,
        },
        title: "Review userplugin",
        modal: true,
        parent: L.BrowserWindow.getAllWindows()[0],
        show: false,
        autoHideMenuBar: true,
      });
      let v1065 = new L.WebContentsView({
        webPreferences: {
          devTools: true,
          nodeIntegration: true,
        },
      });
      v1064.contentView.addChildView(v1065);
      let v1066 = (0, Ae.exec)(
        "git log origin/HEAD...HEAD --oneline --pretty=format:%an////////%h////////%H////////%s",
        {
          cwd: v1062,
        },
      );
      let v1067 = "";
      v1066.stdout?.on("data", (p734) => {
        v1067 += String(p734);
      });
      v1066.once("close", () => {
        v1064.loadURL(
          $o({
            name: v1063.name,
            description: v1063.description,
            remote: v1063.remote,
            commit: v1067
              .split("\n")
              .map((p735) => p735.split("////////"))
              .map(
                ([v1068, v1069, v1070, v1071]) =>
                  v1068 +
                  ' (<a href="' +
                  v1063.remote.replace("plugins.nin0.dev", "git.nin0.dev/userplugins") +
                  "/commit/" +
                  v1070 +
                  '" style="font-family: monospace;">' +
                  v1069 +
                  "</a>) ~ " +
                  v1071,
              )
              .join("\n"),
          }),
        );
        v1064.on("page-title-updated", async (p736) => {
          if (v1064.webContents.getTitle().startsWith("openLink:")) {
            await L.shell.openExternal(v1064.webContents.getTitle().replace("openLink:", ""));
          }
          switch (v1064.webContents.getTitle()) {
            case "abortInstall":
              v1064.close();
              return p733("Rejected by user");
            case "install": {
              v1064.close();
              try {
                let v1072 = (0, Ae.exec)("git rebase origin/HEAD", {
                  cwd: v1062,
                });
                let v1073 = "";
                v1072.stderr?.on("data", (p737) => {
                  if (!String(p737).includes("Success")) {
                    v1073 += String(p737);
                  }
                });
                v1072.once("close", () => {
                  if (v1073 && !v1073.includes("Success")) {
                    return p733(
                      "Failed to apply the update, chances are you have local changes that conflict with your remote. Git errors:\n\n" +
                        v1073,
                    );
                  }
                  Xr().then(() =>
                    p732(
                      JSON.stringify({
                        name: v1063.name,
                        native: v1063.usesNative,
                      }),
                    ),
                  );
                });
              } catch (err) {
                p733(err.toString());
              }
              break;
            }
          }
        });
      });
      v1064.show();
    }
    f3();
  });
}
async function jo(p738) {
  let v1074 = z.store.plugins.UserpluginInstaller?.gitPath;
  let v1075 = new L.BrowserWindow({
    maximizable: false,
    minimizable: false,
    width: 560,
    height: 400,
    resizable: false,
    webPreferences: {
      devTools: true,
    },
    title: "Set Git path",
    modal: true,
    parent: L.BrowserWindow.getAllWindows()[0],
    show: false,
    autoHideMenuBar: true,
  });
  let v1076 = new L.WebContentsView({
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
    },
  });
  v1075.contentView.addChildView(v1076);
  v1075.loadURL("data:text/html;base64," + Buffer.from(Zs).toString("base64"));
  v1075.on("page-title-updated", async (p739) => {
    let v1077 = v1075.webContents.getTitle();
    if (v1077 === "abort") {
      v1075.close();
    }
    if (v1077.startsWith("ok")) {
      z.store.plugins.UserpluginInstaller ||= {
        gitPath: undefined,
      };
      if (v1077 === "ok-") {
        z.store.plugins.UserpluginInstaller.gitPath = undefined;
      } else {
        let v1078 = v1077.split("-").toSpliced(0, 1).join("-");
        z.store.plugins.UserpluginInstaller.gitPath = v1078;
      }
      v1075.close();
    }
    if (v1077.startsWith("check")) {
      try {
        let v1079 = (0, Ae.spawn)(
          v1077 === "check-" ? "git" : v1077.split("-").toSpliced(0, 1).join("-"),
          ["--version"],
        );
        let v1080 = "";
        v1079.stdout?.on("data", (p740) => {
          v1080 += String(p740);
        });
        v1079.on("error", (p741) => {
          L.dialog.showMessageBox({
            title: "Error",
            message: "Git error",
            type: "error",
            detail: p741 + "\n\nDouble-check the path you entered.",
            buttons: ["OK"],
          });
        });
        v1079.once("close", () => {
          if (v1079.exitCode === 0) {
            L.dialog.showMessageBox({
              title: "Success",
              message: "Git works!",
              type: "info",
              detail: "Successfully called " + v1080.trim(),
              buttons: ["OK"],
            });
          }
        });
      } catch (err) {
        L.dialog.showMessageBox({
          title: "Error",
          message: "Git error",
          type: "error",
          detail: err + "\n\nDouble-check the path you entered.",
          buttons: ["OK"],
        });
      }
    }
  });
  v1075.show();
  if (v1074) {
    v1075.webContents.executeJavaScript(
      'document.querySelector("input").value = ' + JSON.stringify(v1074) + ";",
    );
  }
  console.log(Kr.default.load("\n    name: test\n    items:\n      - a\n      - b\n    "));
}
var tn = {};
O(tn, {
  fetchAudio: () => zo,
});
w();
async function zo(p742, p743) {
  if (!p743.startsWith("https://cdn.discordapp.com")) {
    throw new Error("Unknown URL");
  }
  let v1081 = await fetch(p743);
  if (!v1081.ok) {
    throw new Error("Failed to fetch " + p743 + ": " + v1081.statusText);
  }
  if (!v1081.headers.get("Content-Type")?.startsWith("audio/")) {
    throw new Error(p743 + " is not an audio file");
  }
  return new Uint8Array(await v1081.arrayBuffer());
}
var nn = {};
O(nn, {
  fetchDiscordAttachment: () => Bo,
});
w();
var Xs = require("electron");
var Vo = "https://cdn.discordapp.com/attachments/";
var rn = 52428800;
async function Bo(p744, p745) {
  try {
    let vHo = Ho(p745);
    if (!vHo) {
      return {
        success: false,
        error: "Invalid Discord attachment path",
      };
    }
    if (
      (
        await Xs.dialog.showMessageBox({
          title: "Preview ZIP attachment",
          message: "Discord is about to fetch this ZIP attachment for preview.",
          type: "question",
          detail:
            "Attachment: " +
            Wo(p745) +
            "\n\nIf you did not request this intentionally, choose Cancel.",
          buttons: ["Cancel", "Preview ZIP"],
        })
      ).response !== 1
    ) {
      return {
        success: false,
        error: "ZIP preview was cancelled.",
      };
    }
    let v1082 = await fetch(vHo);
    if (v1082.ok) {
      return {
        success: true,
        data: await Go(v1082),
      };
    } else {
      return {
        success: false,
        error: "Fetch failed: " + v1082.status + " " + v1082.statusText,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
async function Go(p746) {
  let vNumber = Number(p746.headers.get("content-length"));
  if (Number.isFinite(vNumber) && vNumber > rn) {
    throw new Error("ZIP is too large to preview.");
  }
  if (!p746.body) {
    let v1083 = await p746.arrayBuffer();
    if (v1083.byteLength > rn) {
      throw new Error("ZIP is too large to preview.");
    }
    return v1083;
  }
  let v1084 = p746.body.getReader();
  let v1085 = [];
  let v1086 = 0;
  while (true) {
    let { done: v, value: v2 } = await v1084.read();
    if (v) {
      break;
    }
    if (v2) {
      v1086 += v2.byteLength;
      if (v1086 > rn) {
        await v1084.cancel();
        throw new Error("ZIP is too large to preview.");
      }
      v1085.push(v2);
    }
  }
  let v1087 = new Uint8Array(v1086);
  let v1088 = 0;
  for (let v1089 of v1085) {
    v1087.set(v1089, v1088);
    v1088 += v1089.byteLength;
  }
  return v1087.buffer;
}
function Wo(p747) {
  let v1090 = p747.split("?", 1)[0].split("/").at(-1);
  if (v1090) {
    return decodeURIComponent(v1090);
  } else {
    return "Unknown attachment";
  }
}
function Ho(p748) {
  if (!Zo(p748)) {
    return null;
  }
  let v1091 = new URL(p748, Vo);
  if (v1091.origin === "https://cdn.discordapp.com" && v1091.pathname.startsWith("/attachments/")) {
    return v1091;
  } else {
    return null;
  }
}
function Zo(p749) {
  if (
    p749.includes("\\") ||
    p749.includes("..") ||
    p749.includes("://") ||
    p749.startsWith("/") ||
    p749.startsWith("//")
  ) {
    return false;
  }
  let v1092 = p749.split("?", 1)[0].split("/");
  return (
    v1092.length >= 3 &&
    /^\d+$/.test(v1092[0]) &&
    /^\d+$/.test(v1092[1]) &&
    v1092.slice(2).every((p750) => p750.length > 0)
  );
}
var Qs = {
  AppleMusicRichPresence: fr,
  ConsoleShortcuts: dr,
  FixSpotifyEmbeds: Wn,
  FixYoutubeEmbeds: Zn,
  OpenInApp: mr,
  Translate: _r,
  VoiceMessages: gr,
  XSOverlay: vr,
  YoutubeAdblock: ts,
  EquicordHelper: rs,
  FavouriteAnything: yr,
  FileUpload: kr,
  MessageLoggerEnhanced: Cr,
  Questify: Dr,
  RichPresence: Pr,
  RPCStats: Rr,
  SongLink: Ar,
  SongSpotlight: jr,
  ThemeLibrary: zr,
  UserpluginInstaller: en,
  VoiceMessageTranscriber: tn,
  ZipPreview: nn,
};
var ei = {};
for (let [t, e] of Object.entries(Qs)) {
  let r = Object.entries(e);
  if (!r.length) {
    continue;
  }
  let s = (ei[t] = {});
  for (let [n, i] of r) {
    let o = "VencordPluginNative_" + t + "_" + n;
    sn.ipcMain.handle(o, i);
    s[n] = o;
  }
}
sn.ipcMain.on("VencordGetPluginIpcMethodMap", (p751) => {
  p751.returnValue = ei;
});
le();
w();
function an(p752, p753 = 300) {
  let v1093;
  return function (...args) {
    clearTimeout(v1093);
    v1093 = setTimeout(() => {
      p752(...args);
    }, p753);
  };
}
Se();
var D = require("electron");
w();
var ti =
  "PCFkb2N0eXBlIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9InV0Zi04Ij48dGl0bGU+TmFub0NvcmQgUXVpY2tDU1MgRWRpdG9yPC90aXRsZT48bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiIGludGVncml0eT0ic2hhMjU2LXRpSlBRMk8wNHovcFovQXdkeUlnaHJPTXpld2YrUEl2RWwxWUtiUXZzWms9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIiByZWZlcnJlcnBvbGljeT0ibm8tcmVmZXJyZXIiPjxzdHlsZT4jY29udGFpbmVyLGJvZHksaHRtbHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTttYXJnaW46MDtwYWRkaW5nOjA7b3ZlcmZsb3c6aGlkZGVufTwvc3R5bGU+PC9oZWFkPjxib2R5PjxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+PHNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2xvYWRlci5qcyIgaW50ZWdyaXR5PSJzaGEyNTYtS2NVNDhUR3I4NHI3dW5GN0o1SWdCbzk1YWVWckVickdlMDRTN1RjRlVqcz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+PHNjcmlwdD5yZXF1aXJlLmNvbmZpZyh7cGF0aHM6e3ZzOiJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cyJ9fSkscmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCgoKT0+e2dldEN1cnJlbnRDc3MoKS50aGVuKChlPT57dmFyIHQ9bW9uYWNvLmVkaXRvci5jcmVhdGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImNvbnRhaW5lciIpLHt2YWx1ZTplLGxhbmd1YWdlOiJjc3MiLHRoZW1lOmdldFRoZW1lKCl9KTt0Lm9uRGlkQ2hhbmdlTW9kZWxDb250ZW50KCgoKT0+c2V0Q3NzKHQuZ2V0VmFsdWUoKSkpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigicmVzaXplIiwoKCk9Pnt0LmxheW91dCgpfSkpfSkpfSkpPC9zY3JpcHQ+PC9ib2R5PjwvaHRtbD4=";
var ye = require("fs");
var fe = require("fs/promises");
var ii = require("os");
var Ne = require("path");
w();
le();
Se();
var tt = require("electron");
function ri() {
  tt.ipcMain.handle("VencordCspRemoveOverride", Xo);
  tt.ipcMain.handle("VencordCspRequestAddOverride", Ko);
  tt.ipcMain.handle("VencordCspIsDomainAllowed", Qo);
}
function Yo(p754, p755) {
  try {
    let { host: v } = new URL(p754);
    if (/[;'"\\]/.test(v)) {
      return false;
    }
  } catch {
    return false;
  }
  return p755.length !== 0 && !p755.some((p756) => !$.includes(p756));
}
function Jo(p757, p758, p759) {
  let v1094 = new URL(p757).host;
  let v1095 = p759 + " wants to allow connections to " + v1094;
  let v1096 =
    "Unless you recognise and fully trust " +
    v1094 +
    ", you should cancel this request!\n\nYou will have to fully close and restart Discord for the changes to take effect.";
  if (p758.length === 1 && p758[0] === "connect-src") {
    return {
      message: v1095,
      detail: v1096,
    };
  }
  let v1097 = p758
    .filter((p760) => p760 !== "connect-src")
    .map((p761) => {
      switch (p761) {
        case "img-src":
          return "Images";
        case "style-src":
          return "CSS & Themes";
        case "font-src":
          return "Fonts";
        default:
          throw new Error("Illegal CSP directive: " + p761);
      }
    })
    .sort()
    .join(", ");
  v1096 =
    "The following types of content will be allowed to load from " +
    v1094 +
    ":\n" +
    v1097 +
    "\n\n" +
    v1096;
  return {
    message: v1095,
    detail: v1096,
  };
}
async function Ko(p762, p763, p764, p765) {
  if (!Yo(p763, p764)) {
    return "invalid";
  }
  let v1098 = new URL(p763).host;
  if (v1098 in z.store.customCspRules) {
    return "conflict";
  }
  let { checkboxChecked: v, response: v2 } = await tt.dialog.showMessageBox({
    ...Jo(p763, p764, p765),
    type: p765 ? "info" : "warning",
    title: "NanoCord Host Permissions",
    buttons: ["Cancel", "Allow"],
    defaultId: 0,
    cancelId: 0,
    checkboxLabel:
      "I fully trust " + v1098 + " and understand the risks of allowing connections to it.",
    checkboxChecked: false,
  });
  if (v2 !== 1) {
    return "cancelled";
  } else if (v) {
    z.store.customCspRules[v1098] = p764;
    return "ok";
  } else {
    return "unchecked";
  }
}
function Xo(p766, p767) {
  if (p767 in z.store.customCspRules) {
    delete z.store.customCspRules[p767];
    return true;
  } else {
    return false;
  }
}
function Qo(p768, p769, p770) {
  try {
    let v1099 = new URL(p769).host;
    let v1100 = lt[v1099] ?? z.store.customCspRules[v1099];
    if (v1100) {
      return p770.every((p771) => v1100.includes(p771));
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
Te();
w();
var ni = require("electron");
function si(p772) {
  p772.webContents.setWindowOpenHandler(({ url: arg }) => {
    switch (arg) {
      case "about:blank":
      case "https://discord.com/popout":
      case "https://ptb.discord.com/popout":
      case "https://canary.discord.com/popout":
        return {
          action: "allow",
        };
    }
    try {
      var { protocol: v } = new URL(arg);
    } catch {
      return {
        action: "deny",
      };
    }
    switch (v) {
      case "http:":
      case "https:":
      case "mailto:":
      case "steam:":
      case "spotify:":
        ni.shell.openExternal(arg);
    }
    return {
      action: "deny",
    };
  });
}
var el = (0, Ne.join)(__dirname, "renderer.css");
(0, ye.mkdirSync)(X, {
  recursive: true,
});
ri();
function wt(p773, p774) {
  let v1101 = (0, Ne.normalize)(p773 + "/");
  let v1102 = (0, Ne.join)(p773, p774);
  let v1103 = (0, Ne.normalize)(v1102);
  if (v1103.startsWith(v1101)) {
    return v1103;
  } else {
    return null;
  }
}
function ai() {
  return (0, fe.readFile)(He, "utf-8").catch(() => "");
}
async function tl() {
  try {
    let v1104 = await (0, fe.readdir)(X);
    return await Promise.all(
      v1104.map(async (p775) => ({
        fileName: p775,
        content: await oi(p775),
      })),
    );
  } catch {
    return [];
  }
}
function oi(p776) {
  p776 = p776.replace(/\?v=\d+$/, "");
  let vWt = wt(X, p776);
  if (vWt) {
    return (0, fe.readFile)(vWt, "utf-8");
  } else {
    return Promise.reject("Unsafe path " + p776);
  }
}
D.ipcMain.handle("VencordOpenQuickCss", () => D.shell.openPath(He));
D.ipcMain.handle("VencordOpenExternal", (p777, p778) => {
  try {
    var { protocol: v } = new URL(p778);
  } catch {
    throw "Malformed URL";
  }
  if (!Pn.includes(v)) {
    throw "Disallowed protocol.";
  }
  D.shell.openExternal(p778);
});
D.ipcMain.handle("VencordGetQuickCss", () => ai());
D.ipcMain.handle("VencordSetQuickCss", (p779, p780) => (0, ye.writeFileSync)(He, p780));
D.ipcMain.handle("VencordGetThemesDir", () => X);
D.ipcMain.handle("VencordGetThemesList", () => tl());
D.ipcMain.handle("VencordGetThemeData", (p781, p782) => oi(p782));
D.ipcMain.handle("VencordDeleteTheme", (p783, p784) => {
  let vWt2 = wt(X, p784);
  if (vWt2) {
    return (0, fe.unlink)(vWt2);
  } else {
    return Promise.reject("Unsafe path " + p784);
  }
});
D.ipcMain.handle("VencordGetThemeSystemValues", () => {
  let v1105 = D.systemPreferences.getAccentColor?.() ?? "";
  if (v1105.length && v1105[0] !== "#") {
    v1105 = "#" + v1105;
  }
  return {
    "os-accent-color": v1105,
  };
});
D.ipcMain.handle("VencordOpenThemesFolder", () => D.shell.openPath(X));
D.ipcMain.handle("VencordOpenSettingsFolder", () => D.shell.openPath(oe));
D.ipcMain.handle("VencordInitFileWatchers", ({ sender: arg }) => {
  let v1106;
  let v1107;
  (0, fe.open)(He, "a+")
    .then((p785) => {
      p785.close();
      v1106 = (0, ye.watch)(
        He,
        {
          persistent: false,
        },
        an(async () => {
          arg.postMessage("VencordQuickCssUpdate", await ai());
        }, 50),
      );
    })
    .catch(() => {});
  let v1108 = (0, ye.watch)(
    X,
    {
      persistent: false,
    },
    an(() => {
      arg.postMessage("VencordThemeUpdate", undefined);
    }),
  );
  arg.once("destroyed", () => {
    v1106?.close();
    v1108.close();
    v1107?.close();
  });
});
D.ipcMain.on("VencordGetMonacoTheme", (p786) => {
  p786.returnValue = D.nativeTheme.shouldUseDarkColors ? "vs-dark" : "vs-light";
});
var ie = null;
D.ipcMain.handle("VencordOpenMonacoEditor", async () => {
  if (ie && !ie.isDestroyed()) {
    ie.show();
    ie.focus();
    return;
  }
  ie = new D.BrowserWindow({
    title: "NanoCord QuickCSS Editor",
    autoHideMenuBar: true,
    darkTheme: true,
    backgroundColor: D.nativeTheme.shouldUseDarkColors ? "#1e1e1e" : "white",
    webPreferences: {
      preload: (0, Ne.join)(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  ie.once("closed", () => {
    ie = null;
  });
  si(ie);
  await ie.loadURL("data:text/html;base64," + ti);
});
D.app.on("before-quit", async (p787) => {
  if (
    ie &&
    !ie.isDestroyed() &&
    !ie.isVisible() &&
    (
      await D.dialog.showMessageBox({
        type: "question",
        buttons: ["Cancel", "Close Anyway"],
        defaultId: 0,
        title: "QuickCSS Editor Open",
        message: "QuickCSS editor is still open in the background.",
        detail: "Do you want to close Discord anyway? This will also close the QuickCSS editor.",
      })
    ).response === 1
  ) {
    D.app.exit();
  }
});
D.ipcMain.handle("VencordGetRendererCss", () => (0, fe.readFile)(el, "utf-8"));
D.ipcMain.on("VencordPreloadGetRendererJs", (p788) => {
  p788.returnValue = (0, ye.readFileSync)((0, Ne.join)(__dirname, "renderer.js"), "utf-8");
});
D.ipcMain.on("VencordSupportsWindowsMaterial", (p789) => {
  p789.returnValue = Number((0, ii.release)().split(".")[2]) >= 22621;
});
le();
Te();
w();
var Ht = require("electron");
w();
var ui = require("module");
var rl = (0, ui.createRequire)("/");
var zt;
var nl =
  ";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";
try {
  zt = rl("worker_threads").Worker;
} catch {}
var sl = zt
  ? function (p790, p791, p792, p793, p794) {
      var v1109 = false;
      var v1110 = new zt(p790 + nl, {
        eval: true,
      })
        .on("error", function (p795) {
          return p794(p795, null);
        })
        .on("message", function (p796) {
          return p794(null, p796);
        })
        .on("exit", function (p797) {
          if (p797 && !v1109) {
            p794(new Error("exited with code " + p797), null);
          }
        });
      v1110.postMessage(p792, p793);
      v1110.terminate = function () {
        v1109 = true;
        return zt.prototype.terminate.call(v1110);
      };
      return v1110;
    }
  : function (p798, p799, p800, p801, p802) {
      setImmediate(function () {
        return p802(
          new Error(
            "async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)",
          ),
          null,
        );
      });
      function f4() {}
      return {
        terminate: f4,
        postMessage: f4,
      };
    };
var W = Uint8Array;
var je = Uint16Array;
var hi = Int32Array;
var cn = new W([
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0,
]);
var un = new W([
  0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13,
  0, 0,
]);
var pi = new W([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
function fi(p803, p804) {
  var v1111 = new je(31);
  for (var v1112 = 0; v1112 < 31; ++v1112) {
    v1111[v1112] = p804 += 1 << p803[v1112 - 1];
  }
  var v1113 = new hi(v1111[30]);
  for (var v1112 = 1; v1112 < 30; ++v1112) {
    for (var v1114 = v1111[v1112]; v1114 < v1111[v1112 + 1]; ++v1114) {
      v1113[v1114] = ((v1114 - v1111[v1112]) << 5) | v1112;
    }
  }
  return {
    b: v1111,
    r: v1113,
  };
}
var di = fi(cn, 2);
var hn = di.b;
var il = di.r;
hn[28] = 258;
il[258] = 28;
var mi = fi(un, 0);
var _i = mi.b;
var Gp = mi.r;
var Gt = new je(32768);
for (R = 0; R < 32768; ++R) {
  ke = ((R & 43690) >> 1) | ((R & 21845) << 1);
  ke = ((ke & 52428) >> 2) | ((ke & 13107) << 2);
  ke = ((ke & 61680) >> 4) | ((ke & 3855) << 4);
  Gt[R] = (((ke & 65280) >> 8) | ((ke & 255) << 8)) >> 1;
}
var ke;
var R;
function rt(p805, p806, p807) {
  for (var v1115 = p805.length, v1116 = 0, v1117 = new je(p806); v1116 < v1115; ++v1116) {
    if (p805[v1116]) {
      ++v1117[p805[v1116] - 1];
    }
  }
  var v1118 = new je(p806);
  for (v1116 = 1; v1116 < p806; ++v1116) {
    v1118[v1116] = (v1118[v1116 - 1] + v1117[v1116 - 1]) << 1;
  }
  var v1119;
  if (p807) {
    v1119 = new je(1 << p806);
    var v1120 = 15 - p806;
    for (v1116 = 0; v1116 < v1115; ++v1116) {
      if (p805[v1116]) {
        var v1121 = (v1116 << 4) | p805[v1116];
        var v1122 = p806 - p805[v1116];
        for (
          var v1123 = v1118[p805[v1116] - 1]++ << v1122, v1124 = v1123 | ((1 << v1122) - 1);
          v1123 <= v1124;
          ++v1123
        ) {
          v1119[Gt[v1123] >> v1120] = v1121;
        }
      }
    }
  } else {
    v1119 = new je(v1115);
    v1116 = 0;
    for (; v1116 < v1115; ++v1116) {
      if (p805[v1116]) {
        v1119[v1116] = Gt[v1118[p805[v1116] - 1]++] >> (15 - p805[v1116]);
      }
    }
  }
  return v1119;
}
var yt = new W(288);
for (R = 0; R < 144; ++R) {
  yt[R] = 8;
}
var R;
for (R = 144; R < 256; ++R) {
  yt[R] = 9;
}
var R;
for (R = 256; R < 280; ++R) {
  yt[R] = 7;
}
var R;
for (R = 280; R < 288; ++R) {
  yt[R] = 8;
}
var R;
var gi = new W(32);
for (R = 0; R < 32; ++R) {
  gi[R] = 5;
}
var R;
var vi = rt(yt, 9, 1);
var wi = rt(gi, 5, 1);
function Vt(p808) {
  var v1125 = p808[0];
  for (var v1126 = 1; v1126 < p808.length; ++v1126) {
    if (p808[v1126] > v1125) {
      v1125 = p808[v1126];
    }
  }
  return v1125;
}
function ae(p809, p810, p811) {
  var v1127 = (p810 / 8) | 0;
  return ((p809[v1127] | (p809[v1127 + 1] << 8)) >> (p810 & 7)) & p811;
}
function Bt(p812, p813) {
  var v1128 = (p813 / 8) | 0;
  return (p812[v1128] | (p812[v1128 + 1] << 8) | (p812[v1128 + 2] << 16)) >> (p813 & 7);
}
function yi(p814) {
  return ((p814 + 7) / 8) | 0;
}
function Wt(p815, p816, p817) {
  if (p816 == null || p816 < 0) {
    p816 = 0;
  }
  if (p817 == null || p817 > p815.length) {
    p817 = p815.length;
  }
  return new W(p815.subarray(p816, p817));
}
var ki = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data",
];
function G(p818, p819, p820) {
  var v1129 = new Error(p819 || ki[p818]);
  v1129.code = p818;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(v1129, G);
  }
  if (!p820) {
    throw v1129;
  }
  return v1129;
}
function bi(p821, p822, p823, p824) {
  var v1130 = p821.length;
  var v1131 = p824 ? p824.length : 0;
  if (!v1130 || (p822.f && !p822.l)) {
    return p823 || new W(0);
  }
  var v1132 = !p823;
  var v1133 = v1132 || p822.i != 2;
  var v1134 = p822.i;
  if (v1132) {
    p823 = new W(v1130 * 3);
  }
  function f5(p825) {
    var v1135 = p823.length;
    if (p825 > v1135) {
      var v1136 = new W(Math.max(v1135 * 2, p825));
      v1136.set(p823);
      p823 = v1136;
    }
  }
  var v1137 = p822.f || 0;
  var v1138 = p822.p || 0;
  var v1139 = p822.b || 0;
  var v1140 = p822.l;
  var v1141 = p822.d;
  var v1142 = p822.m;
  var v1143 = p822.n;
  var v1144 = v1130 * 8;
  do {
    if (!v1140) {
      v1137 = ae(p821, v1138, 1);
      var vAe = ae(p821, v1138 + 1, 3);
      v1138 += 3;
      if (vAe) {
        if (vAe == 1) {
          v1140 = vi;
          v1141 = wi;
          v1142 = 9;
          v1143 = 5;
        } else if (vAe == 2) {
          var v1145 = ae(p821, v1138, 31) + 257;
          var v1146 = ae(p821, v1138 + 10, 15) + 4;
          var v1147 = v1145 + ae(p821, v1138 + 5, 31) + 1;
          v1138 += 14;
          var v1148 = new W(v1147);
          var v1149 = new W(19);
          for (var v1150 = 0; v1150 < v1146; ++v1150) {
            v1149[pi[v1150]] = ae(p821, v1138 + v1150 * 3, 7);
          }
          v1138 += v1146 * 3;
          var vVt = Vt(v1149);
          var v1151 = (1 << vVt) - 1;
          var vRt = rt(v1149, vVt, 1);
          for (var v1150 = 0; v1150 < v1147; ) {
            var v1152 = vRt[ae(p821, v1138, v1151)];
            v1138 += v1152 & 15;
            var v1153 = v1152 >> 4;
            if (v1153 < 16) {
              v1148[v1150++] = v1153;
            } else {
              var v1154 = 0;
              var v1155 = 0;
              for (
                v1153 == 16
                  ? ((v1155 = 3 + ae(p821, v1138, 3)), (v1138 += 2), (v1154 = v1148[v1150 - 1]))
                  : v1153 == 17
                    ? ((v1155 = 3 + ae(p821, v1138, 7)), (v1138 += 3))
                    : v1153 == 18 && ((v1155 = 11 + ae(p821, v1138, 127)), (v1138 += 7));
                v1155--;

              ) {
                v1148[v1150++] = v1154;
              }
            }
          }
          var v1156 = v1148.subarray(0, v1145);
          var v1157 = v1148.subarray(v1145);
          v1142 = Vt(v1156);
          v1143 = Vt(v1157);
          v1140 = rt(v1156, v1142, 1);
          v1141 = rt(v1157, v1143, 1);
        } else {
          G(1);
        }
      } else {
        var v1153 = yi(v1138) + 4;
        var v1158 = p821[v1153 - 4] | (p821[v1153 - 3] << 8);
        var v1159 = v1153 + v1158;
        if (v1159 > v1130) {
          if (v1134) {
            G(0);
          }
          break;
        }
        if (v1133) {
          f5(v1139 + v1158);
        }
        p823.set(p821.subarray(v1153, v1159), v1139);
        p822.b = v1139 += v1158;
        p822.p = v1138 = v1159 * 8;
        p822.f = v1137;
        continue;
      }
      if (v1138 > v1144) {
        if (v1134) {
          G(0);
        }
        break;
      }
    }
    if (v1133) {
      f5(v1139 + 131072);
    }
    var v1160 = (1 << v1142) - 1;
    var v1161 = (1 << v1143) - 1;
    for (var vV1138 = v1138; ; vV1138 = v1138) {
      var v1154 = v1140[Bt(p821, v1138) & v1160];
      var v1162 = v1154 >> 4;
      v1138 += v1154 & 15;
      if (v1138 > v1144) {
        if (v1134) {
          G(0);
        }
        break;
      }
      if (!v1154) {
        G(2);
      }
      if (v1162 < 256) {
        p823[v1139++] = v1162;
      } else if (v1162 == 256) {
        vV1138 = v1138;
        v1140 = null;
        break;
      } else {
        var v1163 = v1162 - 254;
        if (v1162 > 264) {
          var v1150 = v1162 - 257;
          var v1164 = cn[v1150];
          v1163 = ae(p821, v1138, (1 << v1164) - 1) + hn[v1150];
          v1138 += v1164;
        }
        var v1165 = v1141[Bt(p821, v1138) & v1161];
        var v1166 = v1165 >> 4;
        if (!v1165) {
          G(3);
        }
        v1138 += v1165 & 15;
        var v1157 = _i[v1166];
        if (v1166 > 3) {
          var v1164 = un[v1166];
          v1157 += Bt(p821, v1138) & ((1 << v1164) - 1);
          v1138 += v1164;
        }
        if (v1138 > v1144) {
          if (v1134) {
            G(0);
          }
          break;
        }
        if (v1133) {
          f5(v1139 + 131072);
        }
        var v1167 = v1139 + v1163;
        if (v1139 < v1157) {
          var v1168 = v1131 - v1157;
          var v1169 = Math.min(v1157, v1167);
          for (v1168 + v1139 < 0 && G(3); v1139 < v1169; ++v1139) {
            p823[v1139] = p824[v1168 + v1139];
          }
        }
        for (; v1139 < v1167; ++v1139) {
          p823[v1139] = p823[v1139 - v1157];
        }
      }
    }
    p822.l = v1140;
    p822.p = vV1138;
    p822.b = v1139;
    p822.f = v1137;
    if (v1140) {
      v1137 = 1;
      p822.m = v1142;
      p822.d = v1141;
      p822.n = v1143;
    }
  } while (!v1137);
  if (v1139 != p823.length && v1132) {
    return Wt(p823, 0, v1139);
  } else {
    return p823.subarray(0, v1139);
  }
}
var al = new W(0);
function ol(p826, p827) {
  var v1170 = {};
  for (var v1171 in p826) {
    v1170[v1171] = p826[v1171];
  }
  for (var v1171 in p827) {
    v1170[v1171] = p827[v1171];
  }
  return v1170;
}
function li(p828, p829, p830) {
  for (
    var vP828 = p828(),
      v1172 = p828.toString(),
      v1173 = v1172
        .slice(v1172.indexOf("[") + 1, v1172.lastIndexOf("]"))
        .replace(/\s+/g, "")
        .split(","),
      v1174 = 0;
    v1174 < vP828.length;
    ++v1174
  ) {
    var v1175 = vP828[v1174];
    var v1176 = v1173[v1174];
    if (typeof v1175 == "function") {
      p829 += ";" + v1176 + "=";
      var v1177 = v1175.toString();
      if (v1175.prototype) {
        if (v1177.indexOf("[native code]") != -1) {
          var v1178 = v1177.indexOf(" ", 8) + 1;
          p829 += v1177.slice(v1178, v1177.indexOf("(", v1178));
        } else {
          p829 += v1177;
          for (var v1179 in v1175.prototype) {
            p829 += ";" + v1176 + ".prototype." + v1179 + "=" + v1175.prototype[v1179].toString();
          }
        }
      } else {
        p829 += v1177;
      }
    } else {
      p830[v1176] = v1175;
    }
  }
  return p829;
}
var jt = [];
function ll(p831) {
  var v1180 = [];
  for (var v1181 in p831) {
    if (p831[v1181].buffer) {
      v1180.push((p831[v1181] = new p831[v1181].constructor(p831[v1181])).buffer);
    }
  }
  return v1180;
}
function cl(p832, p833, p834, p835) {
  if (!jt[p834]) {
    var v1182 = "";
    var v1183 = {};
    for (var v1184 = p832.length - 1, v1185 = 0; v1185 < v1184; ++v1185) {
      v1182 = li(p832[v1185], v1182, v1183);
    }
    jt[p834] = {
      c: li(p832[v1184], v1182, v1183),
      e: v1183,
    };
  }
  var vOl = ol({}, jt[p834].e);
  return sl(
    jt[p834].c +
      ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" +
      p833.toString() +
      "}",
    p834,
    vOl,
    ll(vOl),
    p835,
  );
}
function ul() {
  return [W, je, hi, cn, un, pi, hn, _i, vi, wi, Gt, ki, rt, Vt, ae, Bt, yi, Wt, G, bi, pn, xi, Ei];
}
function xi(p836) {
  return postMessage(p836, [p836.buffer]);
}
function Ei(p837) {
  return (
    p837 && {
      out: p837.size && new W(p837.size),
      dictionary: p837.dictionary,
    }
  );
}
function hl(p838, p839, p840, p841, p842, p843) {
  var vCl = cl(p840, p841, p842, function (p844, p845) {
    vCl.terminate();
    p843(p844, p845);
  });
  vCl.postMessage([p838, p839], p839.consume ? [p838.buffer] : []);
  return function () {
    vCl.terminate();
  };
}
function de(p846, p847) {
  return p846[p847] | (p846[p847 + 1] << 8);
}
function pe(p848, p849) {
  return (
    (p848[p849] | (p848[p849 + 1] << 8) | (p848[p849 + 2] << 16) | (p848[p849 + 3] << 24)) >>> 0
  );
}
function on(p850, p851) {
  return pe(p850, p851) + pe(p850, p851 + 4) * 4294967296;
}
function pl(p852, p853, p854) {
  if (!p854) {
    p854 = p853;
    p853 = {};
  }
  if (typeof p854 != "function") {
    G(7);
  }
  return hl(
    p852,
    p853,
    [ul],
    function (p855) {
      return xi(pn(p855.data[0], Ei(p855.data[1])));
    },
    1,
    p854,
  );
}
function pn(p856, p857) {
  return bi(
    p856,
    {
      i: 2,
    },
    p857 && p857.out,
    p857 && p857.dictionary,
  );
}
var ln = typeof TextDecoder !== "undefined" && new TextDecoder();
var fl = 0;
try {
  ln.decode(al, {
    stream: true,
  });
  fl = 1;
} catch {}
function dl(p858) {
  var v1186 = "";
  var v1187 = 0;
  while (true) {
    var v1188 = p858[v1187++];
    var v1189 = (v1188 > 127) + (v1188 > 223) + (v1188 > 239);
    if (v1187 + v1189 > p858.length) {
      return {
        s: v1186,
        r: Wt(p858, v1187 - 1),
      };
    }
    if (v1189) {
      if (v1189 == 3) {
        v1188 =
          (((v1188 & 15) << 18) |
            ((p858[v1187++] & 63) << 12) |
            ((p858[v1187++] & 63) << 6) |
            (p858[v1187++] & 63)) -
          65536;
        v1186 += String.fromCharCode((v1188 >> 10) | 55296, (v1188 & 1023) | 56320);
      } else if (v1189 & 1) {
        v1186 += String.fromCharCode(((v1188 & 31) << 6) | (p858[v1187++] & 63));
      } else {
        v1186 += String.fromCharCode(
          ((v1188 & 15) << 12) | ((p858[v1187++] & 63) << 6) | (p858[v1187++] & 63),
        );
      }
    } else {
      v1186 += String.fromCharCode(v1188);
    }
  }
}
function ml(p859, p860) {
  if (p860) {
    var v1190 = "";
    for (var v1191 = 0; v1191 < p859.length; v1191 += 16384) {
      v1190 += String.fromCharCode.apply(null, p859.subarray(v1191, v1191 + 16384));
    }
    return v1190;
  } else {
    if (ln) {
      return ln.decode(p859);
    }
    var vDl = dl(p859);
    var v1192 = vDl.s;
    var v1190 = vDl.r;
    if (v1190.length) {
      G(8);
    }
    return v1192;
  }
}
function _l(p861, p862) {
  return p862 + 30 + de(p861, p862 + 26) + de(p861, p862 + 28);
}
function gl(p863, p864, p865) {
  var vDe = de(p863, p864 + 28);
  var vMl2 = ml(p863.subarray(p864 + 46, p864 + 46 + vDe), !(de(p863, p864 + 8) & 2048));
  var v1193 = p864 + 46 + vDe;
  var vPe = pe(p863, p864 + 20);
  var v1194 =
    p865 && vPe == 4294967295 ? vl(p863, v1193) : [vPe, pe(p863, p864 + 24), pe(p863, p864 + 42)];
  var v1195 = v1194[0];
  var v1196 = v1194[1];
  var v1197 = v1194[2];
  return [
    de(p863, p864 + 10),
    v1195,
    v1196,
    vMl2,
    v1193 + de(p863, p864 + 30) + de(p863, p864 + 32),
    v1197,
  ];
}
function vl(p866, p867) {
  for (; de(p866, p867) != 1; p867 += 4 + de(p866, p867 + 2));
  return [on(p866, p867 + 12), on(p866, p867 + 4), on(p866, p867 + 20)];
}
var ci =
  typeof queueMicrotask == "function"
    ? queueMicrotask
    : typeof setTimeout == "function"
      ? setTimeout
      : function (p868) {
          p868();
        };
function Si(p869, p870, p871) {
  if (!p871) {
    p871 = p870;
    p870 = {};
  }
  if (typeof p871 != "function") {
    G(7);
  }
  var v1198 = [];
  function f6() {
    for (var v1199 = 0; v1199 < v1198.length; ++v1199) {
      v1198[v1199]();
    }
  }
  var v1200 = {};
  function f7(p872, p873) {
    ci(function () {
      p871(p872, p873);
    });
  }
  ci(function () {
    f7 = p871;
  });
  for (var v1201 = p869.length - 22; pe(p869, v1201) != 101010256; --v1201) {
    if (!v1201 || p869.length - v1201 > 65558) {
      f7(G(13, 0, 1), null);
      return f6;
    }
  }
  var vDe2 = de(p869, v1201 + 8);
  if (vDe2) {
    var vVDe2 = vDe2;
    var vPe2 = pe(p869, v1201 + 16);
    var v1202 = vPe2 == 4294967295 || vVDe2 == 65535;
    if (v1202) {
      var vPe3 = pe(p869, v1201 - 12);
      v1202 = pe(p869, vPe3) == 101075792;
      if (v1202) {
        vVDe2 = vDe2 = pe(p869, vPe3 + 32);
        vPe2 = pe(p869, vPe3 + 48);
      }
    }
    var v1203 = p870 && p870.filter;
    var vF4 = function (p874) {
      var vGl = gl(p869, vPe2, v1202);
      var v1204 = vGl[0];
      var v1205 = vGl[1];
      var v1206 = vGl[2];
      var v1207 = vGl[3];
      var v1208 = vGl[4];
      var v1209 = vGl[5];
      var v_l = _l(p869, v1209);
      vPe2 = v1208;
      function f8(p875, p876) {
        if (p875) {
          f6();
          f7(p875, null);
        } else {
          if (p876) {
            v1200[v1207] = p876;
          }
          if (!--vDe2) {
            f7(null, v1200);
          }
        }
      }
      if (
        !v1203 ||
        v1203({
          name: v1207,
          size: v1205,
          originalSize: v1206,
          compression: v1204,
        })
      ) {
        if (!v1204) {
          f8(null, Wt(p869, v_l, v_l + v1205));
        } else if (v1204 == 8) {
          var v1210 = p869.subarray(v_l, v_l + v1205);
          if (v1206 < 524288 || v1205 > v1206 * 0.8) {
            try {
              f8(
                null,
                pn(v1210, {
                  out: new W(v1206),
                }),
              );
            } catch (err) {
              f8(err, null);
            }
          } else {
            v1198.push(
              pl(
                v1210,
                {
                  size: v1206,
                },
                f8,
              ),
            );
          }
        } else {
          f8(G(14, "unknown compression type " + v1204, 1), null);
        }
      } else {
        f8(null, null);
      }
    };
    for (var v1211 = 0; v1211 < vVDe2; ++v1211) {
      vF4(v1211);
    }
  } else {
    f7(null, {});
  }
  return f6;
}
var Ci = require("fs");
var me = require("fs/promises");
var nt = require("path");
Te();
w();
function Ti(p877) {
  function f9(p878, p879, p880, p881) {
    let v1212 = 0;
    v1212 += p878 << 0;
    v1212 += p879 << 8;
    v1212 += p880 << 16;
    v1212 += (p881 << 24) >>> 0;
    return v1212;
  }
  if (p877[0] === 80 && p877[1] === 75 && p877[2] === 3 && p877[3] === 4) {
    return p877;
  }
  if (p877[0] !== 67 || p877[1] !== 114 || p877[2] !== 50 || p877[3] !== 52) {
    throw new Error("Invalid header: Does not start with Cr24");
  }
  let v1213 = p877[4] === 3;
  let v1214 = p877[4] === 2;
  if ((!v1214 && !v1213) || p877[5] || p877[6] || p877[7]) {
    throw new Error("Unexpected crx format version number.");
  }
  if (v1214) {
    let vF9 = f9(p877[8], p877[9], p877[10], p877[11]);
    let vF92 = f9(p877[12], p877[13], p877[14], p877[15]);
    let v1215 = 16 + vF9 + vF92;
    return p877.subarray(v1215, p877.length);
  }
  let v1216 = 12 + f9(p877[8], p877[9], p877[10], p877[11]);
  return p877.subarray(v1216, p877.length);
}
w();
var wl = require("original-fs");
async function yl(p882, p883) {
  try {
    var v1217 = await fetch(p882, p883);
  } catch (err) {
    if (err instanceof Error && err.cause) {
      err = err.cause;
    }
    throw new Error((p883?.method ?? "GET") + " " + p882 + " failed: " + err);
  }
  if (v1217.ok) {
    return v1217;
  }
  let v1218 = (p883?.method ?? "GET") + " " + p882 + ": " + v1217.status + " " + v1217.statusText;
  try {
    let v1219 = await v1217.text();
    v1218 += "\n" + v1219;
  } catch {}
  throw new Error(v1218);
}
async function Ii(p884, p885) {
  let v1220 = await (await yl(p884, p885)).arrayBuffer();
  return Buffer.from(v1220);
}
var kl = (0, nt.join)(We, "ExtensionCache");
async function bl(p886, p887) {
  await (0, me.mkdir)(p887, {
    recursive: true,
  });
  return new Promise((p888, p889) => {
    Si(p886, (p890, p891) => {
      if (p890) {
        p889(p890);
        return;
      }
      Promise.all(
        Object.keys(p891).map(async (p892) => {
          if (p892.startsWith("_metadata/")) {
            return;
          }
          if (p892.endsWith("/")) {
            (0, me.mkdir)((0, nt.join)(p887, p892), {
              recursive: true,
            });
            return;
          }
          let v1221 = p892.split("/");
          let v1222 = v1221.pop();
          let v1223 = v1221.join("/");
          let v1224 = (0, nt.join)(p887, v1223);
          if (v1223) {
            await (0, me.mkdir)(v1224, {
              recursive: true,
            });
          }
          await (0, me.writeFile)((0, nt.join)(v1224, v1222), p891[p892]);
        }),
      )
        .then(() => p888())
        .catch((p893) => {
          (0, me.rm)(p887, {
            recursive: true,
            force: true,
          });
          p889(p893);
        });
    });
  });
}
async function Di(p894) {
  let v1225 = (0, nt.join)(kl, "" + p894);
  try {
    await (0, me.access)(v1225, Ci.constants.F_OK);
  } catch {
    let v1226 =
      "https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D" +
      p894 +
      "%26uc&prodversion=" +
      process.versions.chrome;
    let v1227 = await Ii(v1226, {
      headers: {
        "User-Agent":
          "Electron " +
          process.versions.electron +
          " ~ NanoCord (https://github.com/Equicord/Equicord)",
      },
    });
    await bl(Ti(v1227), v1225).catch((p895) =>
      console.error("Failed to extract extension " + p894, p895),
    );
  }
  if (Ht.session.defaultSession.extensions) {
    Ht.session.defaultSession.extensions.loadExtension(v1225);
  } else {
    Ht.session.defaultSession.loadExtension(v1225);
  }
}
if (!St) {
  _e.app.whenReady().then(() => {
    _e.protocol.handle("vencord", ({ url: arg }) => {
      let v1228 = decodeURI(arg)
        .slice(10)
        .replace(/\?v=\d+$/, "");
      if (v1228.endsWith("/")) {
        v1228 = v1228.slice(0, -1);
      }
      if (v1228.startsWith("/themes/")) {
        let v1229 = v1228.slice(8);
        let vWt3 = wt(X, v1229);
        if (vWt3) {
          return _e.net.fetch((0, bt.pathToFileURL)(vWt3).toString());
        } else {
          return new Response(null, {
            status: 404,
          });
        }
      }
      switch (v1228) {
        case "renderer.js.map":
        case "preload.js.map":
        case "patcher.js.map":
        case "main.js.map":
          return _e.net.fetch((0, bt.pathToFileURL)((0, gn.join)(__dirname, v1228)).toString());
        default:
          return new Response(null, {
            status: 404,
          });
      }
    });
    _e.protocol.handle("equicord", ({ url: arg }) => {
      let v1230 = decodeURI(arg)
        .slice(11)
        .replace(/\?v=\d+$/, "");
      if (v1230.endsWith("/")) {
        v1230 = v1230.slice(0, -1);
      }
      if (v1230.startsWith("/themes/")) {
        let v1231 = v1230.slice(8);
        let vWt4 = wt(X, v1231);
        if (vWt4) {
          return _e.net.fetch((0, bt.pathToFileURL)(vWt4).toString());
        } else {
          return new Response(null, {
            status: 404,
          });
        }
      }
      switch (v1230) {
        case "renderer.js.map":
        case "preload.js.map":
        case "patcher.js.map":
        case "main.js.map":
          return _e.net.fetch((0, bt.pathToFileURL)((0, gn.join)(__dirname, v1230)).toString());
        default:
          return new Response(null, {
            status: 404,
          });
      }
    });
    try {
      if (j.store.enableReactDevtools) {
        Di("fmkadmapgofadopljbjfkapdkoienihi")
          .then(() => console.info("[NanoCord] Installed React Developer Tools"))
          .catch((p896) =>
            console.error("[NanoCord] Failed to install React Developer Tools", p896),
          );
      }
    } catch {}
    Un();
  });
}
Zi();
