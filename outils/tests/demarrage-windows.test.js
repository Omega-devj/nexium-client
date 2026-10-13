// Demarrage avec Windows : l entree Run, le raccourci herite de l installateur,
// et ce que la page affiche. Faux registre, faux dossier Demarrage.
//   node outils/tests/demarrage-windows.test.js [lanceur.js] [lanceur-precedent.js]
// Sans argument : le lanceur du depot, valide par sa propre fonction validIndex().
const fs = require("fs"), path = require("path"), os = require("os");
const LANCEUR = process.argv[2] || path.join(__dirname, "..", "..", "resources", "app.asar", "index.js");
const NEW = fs.readFileSync(LANCEUR, "utf8");
const OLD = fs.readFileSync(process.argv[3] || LANCEUR, "utf8").replace(/\r\n/g, "\n");
const NEWLF = NEW.replace(/\r\n/g, "\n");
let ok = true; const check = (cond, msg) => { console.log((cond ? "  ok   " : "  ECHEC ") + msg); if (!cond) ok = false; };

// 1) Le lanceur v6 deja installe accepte-t-il ce fichier ?
const m = OLD.match(/function indexVersionOf[\s\S]*?\nfunction validIndex[\s\S]*?\n}\n/)[0];
const v6 = new Function(m + "return {validIndex, indexVersionOf};")();
console.log("Propagation :");
check(v6.validIndex(NEW) === null, "validIndex() du lanceur precedent accepte ce lanceur (" + (v6.validIndex(NEW) || "ok") + ")");
check(v6.indexVersionOf(NEW) >= v6.indexVersionOf(OLD), "version du lanceur : " + v6.indexVersionOf(NEW));

// 2) Comportement, sur un faux Windows.
const debut = NEWLF.indexOf("const NX_DEM_CLE");
const fin = NEWLF.indexOf("nxSurveilleDemarrage();\n\nbootPatcher();");
const bloc = NEWLF.slice(debut, fin); if (debut < 0 || fin < 0) throw new Error("bloc introuvable");
function scenario(nom, { veut, runAvant, raccourciAvant, regAddEchoue }) {
  console.log(nom);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "nxdem-"));
  const appdata = path.join(tmp, "Roaming");
  const reglages = path.join(appdata, "NanoCord", "settings");
  fs.mkdirSync(reglages, { recursive: true });
  fs.writeFileSync(path.join(reglages, "settings.json"), JSON.stringify({ plugins: { NexiumDemarrage: { avecWindows: veut, reduit: false } } }));
  const startup = path.join(appdata, "Microsoft", "Windows", "Start Menu", "Programs", "Startup");
  fs.mkdirSync(startup, { recursive: true });
  const lnk = path.join(startup, "Nexium Client.lnk");
  if (raccourciAvant) fs.writeFileSync(lnk, "lnk");
  const registre = {}; if (runAvant) registre["Nexium Client"] = '"C:\\Nexium\\Nexium.exe"';
  const fauxRequire = (n) => {
    if (n === "electron") return { app: { setLoginItemSettings() {}, getLoginItemSettings() { return { openAtLogin: false }; } } };
    if (n === "child_process") return { execFileSync(cmd, a) {
      if (a[0] === "query") { if (!registre[a[3]]) throw new Error("introuvable"); return "    " + a[3] + "    REG_SZ    " + registre[a[3]]; }
      if (a[0] === "add") { if (regAddEchoue) throw new Error("acces refuse"); registre[a[3]] = a[7]; return ""; }
      if (a[0] === "delete") { delete registre[a[3]]; return ""; }
    } };
    return require(n);
  };
  const fauxProcess = { platform: "win32", env: { APPDATA: appdata }, execPath: "C:\\Nexium\\Nexium.exe" };
  const journal = [];
  const f = new Function("require", "fs", "path", "log", "process", bloc + "\nreturn nxAppliqueDemarrage;");
  f(fauxRequire, fs, path, (l) => journal.push(l), fauxProcess)("ouverture");
  const etat = JSON.parse(fs.readFileSync(path.join(reglages, "settings.json"), "utf8")).plugins.NexiumDemarrage.etat;
  const r = { run: !!registre["Nexium Client"], raccourci: fs.existsSync(lnk), etat, journal };
  fs.rmSync(tmp, { recursive: true, force: true });
  return r;
}
let r = scenario("A. option active, ancienne installation (raccourci + rien dans Run) :", { veut: true, runAvant: false, raccourciAvant: true });
check(r.run, "entree Run ecrite"); check(!r.raccourci, "raccourci herite retire (plus de double lancement)"); check(r.etat.applique === true && r.etat.raccourciRetire === true, "etat : applique, raccourci retire");
r = scenario("B. l utilisateur coupe l option (Run + raccourci presents) :", { veut: false, runAvant: true, raccourciAvant: true });
check(!r.run, "entree Run effacee"); check(!r.raccourci, "raccourci retire : Nexium ne demarre plus avec Windows (le bug)"); check(r.etat.applique === false, "etat : rien ne lance Nexium");
r = scenario("C. option active mais Windows refuse l entree Run :", { veut: true, runAvant: false, raccourciAvant: true, regAddEchoue: true });
check(!r.run, "entree Run absente (refusee)"); check(r.raccourci, "raccourci garde : c est le seul moyen qui marche"); check(r.etat.applique === true && r.etat.voie === "raccourci", "etat : applique via raccourci");
r = scenario("D. option active, nouvelle installation (pas de raccourci) :", { veut: true, runAvant: true, raccourciAvant: false });
check(r.run && !r.raccourci && r.etat.raccourciRetire === false, "Run en place, rien d autre touche");
console.log(ok ? "\nTOUT PASSE" : "\nDES ECHECS"); process.exit(ok ? 0 : 1);
