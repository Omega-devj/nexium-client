// Reconstruit resources/equicord/renderer.js a partir de src/renderer/.
//
//   node outils/construire-renderer.js             reconstruit, puis regenere la somme
//   node outils/construire-renderer.js --bump      monte la version, reconstruit, somme, badge
//   node outils/construire-renderer.js --verifier  echoue si renderer.js ne correspond pas aux sources
//
// Les morceaux sont concatenes tels quels, dans l ordre de leur nom :
// 000-equicord-tete.js, nexium/*.js, 999-equicord-queue.js. Aucune
// transformation : le fichier produit est exactement ce que recoivent les
// clients, et le lanceur (validRenderer) exige ses marqueurs a l identique,
// par exemple _NXUP.VERSION="204" sans espace.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const RACINE = path.join(__dirname, "..");
const SRC = path.join(RACINE, "src", "renderer");
const SORTIE = path.join(RACINE, "resources", "equicord", "renderer.js");
const VERIFIER = process.argv.includes("--verifier");
const BUMP = process.argv.includes("--bump");

function morceaux() {
  const nexium = fs.readdirSync(path.join(SRC, "nexium"))
    .filter((n) => n.endsWith(".js"))
    .sort()
    .map((n) => path.join(SRC, "nexium", n));
  return [path.join(SRC, "000-equicord-tete.js"), ...nexium, path.join(SRC, "999-equicord-queue.js")];
}

function assemble() {
  return Buffer.concat(morceaux().map((f) => fs.readFileSync(f)));
}

if (VERIFIER) {
  const attendu = assemble();
  const present = fs.readFileSync(SORTIE);
  if (!attendu.equals(present)) {
    console.error("renderer.js ne correspond pas a src/renderer/ : lance node outils/construire-renderer.js");
    process.exit(1);
  }
  console.log("renderer.js correspond aux sources (" + morceaux().length + " morceaux)");
  execFileSync(process.execPath, [path.join(RACINE, "gen-nxsum.js"), "--check"], { stdio: "inherit" });
  process.exit(0);
}

if (BUMP) {
  const RX = /_NXUP\.VERSION="(\d+)"/;
  const fichier = morceaux().find((f) => RX.test(fs.readFileSync(f, "utf8")));
  if (!fichier) { console.error("refus : _NXUP.VERSION introuvable dans src/renderer/"); process.exit(2); }
  const txt = fs.readFileSync(fichier, "utf8");
  const avant = txt.match(RX)[1];
  const apres = String(parseInt(avant, 10) + 1);
  fs.writeFileSync(fichier, txt.replace(RX, '_NXUP.VERSION="' + apres + '"'));
  console.log("version " + avant + " -> " + apres + " (" + path.relative(RACINE, fichier) + ")");

  // Le badge du readme annonce la version : sans ca il ment des la publication suivante.
  const RM = path.join(RACINE, "readme.md");
  if (fs.existsSync(RM)) {
    const r1 = fs.readFileSync(RM, "utf8");
    const r2 = r1.replace(/badge\/version-v\d+-/g, "badge/version-v" + apres + "-");
    if (r2 !== r1) { fs.writeFileSync(RM, r2); console.log("readme : badge de version mis a jour"); }
  }
}

const tmp = SORTIE + ".construction";
fs.writeFileSync(tmp, assemble());
fs.renameSync(tmp, SORTIE);
console.log("renderer.js reconstruit (" + morceaux().length + " morceaux, " + fs.statSync(SORTIE).size + " octets)");

// La somme publiee, et les memes controles que validRenderer() du lanceur.
execFileSync(process.execPath, [path.join(RACINE, "gen-nxsum.js")], { stdio: "inherit" });
