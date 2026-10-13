const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "resources", "equicord");
const JS = path.join(DIR, "renderer.js");
const SUM = path.join(DIR, "renderer.js.nxsum");
const CHECK = process.argv.includes("--check");
const BUMP = process.argv.includes("--bump");

function nxSum(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (((h << 5) + h) ^ s.charCodeAt(i)) | 0;
  return "nx" + (h >>> 0).toString(16) + "-" + s.length;
}

if (!fs.existsSync(JS)) {
  console.error("renderer.js introuvable : " + JS);
  process.exit(2);
}

let src = fs.readFileSync(JS, "utf8");

// Depuis que renderer.js est construit a partir de src/renderer/, monter la
// version ici desynchroniserait les sources : le build l ecraserait.
if (BUMP && fs.existsSync(path.join(__dirname, "src", "renderer"))) {
  console.error("refus : utilise node outils/construire-renderer.js --bump (les sources sont dans src/renderer/)");
  process.exit(2);
}

if (BUMP) {
  const m = src.match(/_NXUP\.VERSION="(\d+)"/);
  if (!m) { console.error("refus : _NXUP.VERSION introuvable"); process.exit(2); }
  const next = String(parseInt(m[1], 10) + 1);
  src = src.replace(m[0], '_NXUP.VERSION="' + next + '"');
  fs.writeFileSync(JS, src);
  console.log("version " + m[1] + " -> " + next);

  // Le badge du readme annonce la version : sans ca il ment des la publication suivante.
  const RM = path.join(__dirname, "readme.md");
  if (fs.existsSync(RM)) {
    const avant = fs.readFileSync(RM, "utf8");
    const apres = avant.replace(/badge\/version-v\d+-/g, "badge/version-v" + next + "-");
    if (apres !== avant) {
      fs.writeFileSync(RM, apres);
      console.log("readme : badge de version mis a jour");
    }
  }
}

let bad = null;
if (src.length < 500000) bad = "taille insuffisante (" + src.length + ")";
else if (!/_NXUP\.VERSION="\d+"/.test(src)) bad = "numero de version absent";
else if ((src.match(/var _NX[A-Za-z]+=window\._NX[A-Za-z]+\|\|/g) || []).length < 20) bad = "modules Nexium incomplets";
else if (src.indexOf("_NXUP.checkRaw") < 0 || src.indexOf("_NXPR.scanUrl") < 0) bad = "modules Nexium absents";
else if (src.indexOf("_NXV.checkOut") < 0 || src.indexOf("_NXGD.bloque") < 0) bad = "gardes de sortie absents";
if (bad) {
  console.error("refus : le fichier ne passerait pas validRenderer() — " + bad);
  process.exit(2);
}

const sum = nxSum(src);
const disk = fs.existsSync(SUM) ? fs.readFileSync(SUM, "utf8").trim() : null;

if (CHECK) {
  if (disk === sum) { console.log("nxsum a jour : " + sum); process.exit(0); }
  console.error("nxsum perime\n  attendu : " + sum + "\n  trouve  : " + (disk || "(absent)"));
  process.exit(1);
}

if (disk === sum) { console.log("nxsum deja a jour : " + sum); process.exit(0); }
fs.writeFileSync(SUM, sum);
console.log("nxsum regenere : " + sum + (disk ? "  (ancien : " + disk + ")" : ""));
