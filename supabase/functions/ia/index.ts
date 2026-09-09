// Nexium IA — relais vers les modeles de langage.
//
// Ce service ne fait que relayer. Il ne stocke aucune conversation, ne tient
// aucun journal du contenu, et ne connait rien de l utilisateur : les outils
// que le modele demande sont executes SUR LA MACHINE du client, jamais ici.

const CREDITS_FENETRE = "7 hours";

// ------------------------------------------------------------- les abonnements
// Quatre niveaux. Zero est le niveau de quelqu un arrive apres la bascule et
// sans abonnement : il garde un assistant qui repond, mais sur le palier le
// plus leger et avec une reserve reduite. Les utilisateurs des debuts et les
// administrateurs sont au niveau trois sans rien payer -- c est la base qui
// le dit, pas le client.
const PLAFOND: Record<number, number> = { 0: 30, 1: 100, 2: 200, 3: 400 };
const CREDITS_MAX = 100;                       // la reference d affichage
const OUVERTS: Record<number, string[]> = {
  0: ["B"],
  1: ["B", "A1", "A2"],
  2: ["B", "A1", "A2", "S"],
  3: ["B", "A1", "A2", "S"],
};
const NIV_PROFOND = 3;   // la reflexion en deux temps
const NIV_ANALYSE = 2;   // l analyse d une conversation

// =========================================================== fournisseurs
const GROQ = {
  amont: "https://api.groq.com/openai/v1/chat/completions",
  liste: "https://api.groq.com/openai/v1/models",
};
const GEMINI = {
  amont: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
  liste: "https://generativelanguage.googleapis.com/v1beta/openai/models",
};

type Palier = {
  modele: string; nom: string; rang: string; base: number; role: string;
  maison: "groq" | "gemini"; admin?: boolean;
};

const PALIERS: Record<string, Palier> = {
  G:  { modele: "",                    nom: "Nexium IA 2.0",   rang: "S+", base: 20, role: "Essai administrateur", maison: "gemini", admin: true },
  S:  { modele: "openai/gpt-oss-120b", nom: "Nexium IA 1.2",   rang: "S",  base: 10, role: "Principal",   maison: "groq" },
  A2: { modele: "qwen/qwen3.8-27b",    nom: "Nexium IA 1.0.2", rang: "A",  base: 7,  role: "Repli puissant", maison: "groq" },
  A1: { modele: "qwen/qwen3.6-27b",    nom: "Nexium IA 1.0",   rang: "A",  base: 5,  role: "Repli",       maison: "groq" },
  B:  { modele: "openai/gpt-oss-20b",  nom: "Nexium IA 0.9",   rang: "B",  base: 3,  role: "Rapide",      maison: "groq" },
};
const ORDRE_REPLI = ["S", "A2", "A1", "B"];
const PALIER_DEFAUT = "S";
const EXCLUS = /whisper|tts|guard|vision|embed|orpheus|playai|allam|image|imagen|veo|live|native-audio|aqa/i;

const MAX_MESSAGES = 60;
const MAX_OCTETS = 200_000;

// Ces modeles raisonnent avant de repondre, et leur raisonnement est compte
// dans la meme enveloppe que la reponse. Une enveloppe trop courte coupe la
// reponse au milieu d une phrase -- et quand la reflexion a ete longue, il ne
// reste rien du tout : l utilisateur voit une bulle vide.
const SORTIE: Record<string, number> = { rapide: 3000, normal: 8000, profond: 32000 };
const EFFORT: Record<string, string> = { rapide: "low", normal: "low", profond: "high" };

function niveau(x: unknown): "rapide" | "normal" | "profond" {
  if (x === true || x === "profond") return "profond";
  if (x === "rapide") return "rapide";
  return "normal";
}
const MULT: Record<string, number> = { rapide: 0.5, normal: 1, profond: 3 };

// ---------------------------------------------------------- la deliberation
// "Reflechir" ne peut pas se resumer a un reglage passe au fournisseur : sur
// une question difficile, un effort eleve donne un raisonnement plus long,
// pas forcement une meilleure reponse. Le niveau profond fait donc un vrai
// premier temps -- comprendre, envisager, verifier -- dont le resultat sert
// de matiere a la reponse. Cela prend le temps que cela prend : c est ce qui
// est demande, et c est ce qui est facture.
const CONSIGNE_DELIBERE =
  "Tu prepares une reponse, tu ne la rediges pas encore. Prends le temps. En quinze lignes au " +
  "maximum : ce qui est reellement demande et ce qui est implicite ; les elements dont tu disposes " +
  "et ceux qui te manquent ; au moins deux approches possibles avec ce qui les separe ; les pieges " +
  "et les cas ou ta reponse serait fausse ; et enfin le plan de la reponse. Pas de politesse, pas " +
  "de preambule, pas de reponse finale.";

const CONSIGNE_PROFOND =
  "NIVEAU PROFOND : l utilisateur a demande -- et paye -- une reflexion approfondie. Ne te contente " +
  "pas d une reponse rapide. Deroule ton raisonnement etape par etape, envisage les alternatives, " +
  "verifie tes conclusions avant de les donner, et signale ce dont tu n es pas sur. Une reponse " +
  "courte et generique serait un echec a ce niveau.";

// ------------------------------------------------------- fil de conversation
const ROLES = new Set(["system", "user", "assistant", "tool"]);

function filtrer(L: any[]): any[] {
  const out: any[] = [];
  let outilsOuverts = false;
  for (const m of L) {
    if (!m || typeof m !== "object") continue;
    const r = String(m.role ?? "");
    if (!ROLES.has(r)) continue;
    const texte = typeof m.content === "string" ? m.content : "";
    const appels = Array.isArray(m.tool_calls) && m.tool_calls.length > 0;
    if (r === "tool" && !outilsOuverts) continue;
    if (!texte.trim() && !appels) continue;
    if (r === "assistant") outilsOuverts = appels;
    out.push(m);
  }
  return out;
}

// ------------------------------------------------------------ routage auto
const LOURD = /\b(compare|analyse|explique en detail|redige|ecris moi|strategie|pourquoi|diagnosti|optimis|resume|plan|etape|conception|architecture)/i;
function router(messages: any[], outils: boolean, n: "rapide" | "normal" | "profond"): string {
  if (n === "profond") return "S";
  const derniers = messages.filter((m) => m?.role === "user");
  const q = String(derniers[derniers.length - 1]?.content ?? "");
  const total = JSON.stringify(messages).length;
  if (LOURD.test(q) || q.length > 400 || total > 12_000) return "S";
  if (outils || q.length > 120) return "A1";
  return "B";
}

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-nexium",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

function json(corps: unknown, statut = 200) {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// =========================================================== les cles
function lireCles(): string[] {
  const out: string[] = [];
  for (const nom of ["GROQ_API_KEY", "GROQ_API_KEY_2", "GROQ_API_KEY_3", "GROQ_API_KEY_4", "GROQ_API_KEY_5"]) {
    const v = Deno.env.get(nom);
    if (v && v.trim()) out.push(v.trim());
  }
  const groupe = Deno.env.get("GROQ_API_KEYS");
  if (groupe) for (const v of groupe.split(/[,;\s]+/)) if (v.trim()) out.push(v.trim());
  return [...new Set(out)];
}
function cleGemini(): string {
  return (Deno.env.get("GEMINI_API") ?? Deno.env.get("GEMINI_API_KEY") ?? "").trim();
}

const reposJusqu = new Map<number, number>();
const usage = new Map<number, number>();
let dernierIndex = -1;

function cleLibre(cles: string[], evitees: Set<number>): number {
  const now = Date.now();
  const libres: number[] = [];
  for (let i = 0; i < cles.length; i++) {
    if (evitees.has(i)) continue;
    if ((reposJusqu.get(i) ?? 0) > now) continue;
    libres.push(i);
  }
  if (libres.length) {
    for (let d = 1; d <= libres.length; d++) {
      const cand = libres[(libres.indexOf(dernierIndex) + d) % libres.length];
      if (cand !== undefined) return cand;
    }
    return libres[0];
  }
  let meilleur = -1, quand = Infinity;
  for (let i = 0; i < cles.length; i++) {
    if (evitees.has(i)) continue;
    const t = reposJusqu.get(i) ?? 0;
    if (t < quand) { quand = t; meilleur = i; }
  }
  return meilleur;
}

function secondesAvant(detail: string): number | null {
  const m = detail.match(/try again in ([\d.]+)\s*s/i);
  if (m) return Math.ceil(parseFloat(m[1]));
  const m2 = detail.match(/try again in (\d+)m([\d.]+)s/i);
  if (m2) return Math.ceil(parseInt(m2[1], 10) * 60 + parseFloat(m2[2]));
  const m3 = detail.match(/retry.{0,12}?(\d+)\s*s/i);
  if (m3) return Math.ceil(parseInt(m3[1], 10));
  return null;
}

function mettreAuRepos(i: number, detail: string) {
  const s = secondesAvant(detail) ?? 20;
  reposJusqu.set(i, Date.now() + Math.min(120, Math.max(2, s)) * 1000);
}

// ------------------------------------------------------- messages d erreur
function messageClair(statut: number, detail: string, nomModele: string): string {
  const d = String(detail ?? "");
  if (/rate limit|too many requests|quota|resource_exhausted/i.test(d) || statut === 429) {
    const s = secondesAvant(d);
    return s
      ? `Toutes les voies sont saturees pour le moment. Reessaie dans ${s} seconde${s > 1 ? "s" : ""}.`
      : "Toutes les voies sont saturees pour le moment. Reessaie dans un instant.";
  }
  if (/tool call validation|tool_use_failed/i.test(d))
    return "L assistant a mal forme son appel d outil. Reformule ta demande, ou reessaie.";
  if (/blocked|do not have access|not authorized|permission/i.test(d))
    return `${nomModele} n est pas disponible sur ce compte.`;
  if (/not exist|decommissioned|unsupported model|not found|no longer available/i.test(d))
    return `${nomModele} n est plus disponible. Choisis un autre modele.`;
  if (/context|too long|maximum.*token|reduce the length/i.test(d))
    return "La conversation est devenue trop longue. Efface-la pour repartir sur une base propre.";
  if (/invalid api key|unauthorized|authentication|api key not valid/i.test(d) || statut === 401)
    return "Le service n est pas correctement configure. Previens un administrateur du client.";
  if (statut >= 500)
    return "Le service est momentanement indisponible. Reessaie dans un instant.";
  return "L assistant n a pas pu repondre. Reessaie, ou choisis un autre modele.";
}

const URL_SB = () => Deno.env.get("SUPABASE_URL");
const CLE_SB = () => Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

async function rpc(nom: string, corps: unknown) {
  const u = URL_SB(), c = CLE_SB();
  if (!u || !c) return null;
  try {
    const r = await fetch(`${u}/rest/v1/rpc/${nom}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: c, Authorization: `Bearer ${c}` },
      body: JSON.stringify(corps ?? {}),
    });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

function tarif(o: { palier: string; niveau: string; caracteres: number; outils: boolean; analyse: boolean; }) {
  const base = PALIERS[o.palier]?.base ?? 5;
  let c = base * (MULT[o.niveau] ?? 1);
  c += Math.floor(Math.max(0, o.caracteres) / 2500);
  if (o.outils) c += 1;
  if (o.analyse) c *= 2;
  return Math.max(1, Math.min(CREDITS_MAX - 1, Math.round(c)));
}

async function empreinte(req: Request): Promise<string> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "inconnu";
  const sel = CLE_SB()?.slice(-24) ?? "nexium";
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip + "|" + sel));
  return Array.from(new Uint8Array(h)).slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function estAdmin(id: unknown): Promise<boolean> {
  const s = String(id ?? "").replace(/[^0-9]/g, "");
  if (!s || s.length < 15) return false;
  return (await rpc("ia_est_admin", { p_id: s })) === true;
}

// Le niveau d abonnement du demandeur. Sans identifiant, ou si la base ne
// repond pas, on ne punit personne : on retient le niveau un, qui laisse
// l assistant utilisable sans ouvrir les paliers les plus couteux.
async function niveauAbo(id: string): Promise<{ n: number; pionnier: boolean; admin: boolean }> {
  if (!id) return { n: 1, pionnier: false, admin: false };
  const j = await rpc("nx_abo_etat", { p_id: id });
  if (!j || typeof j !== "object") return { n: 1, pionnier: false, admin: false };
  const n = Number((j as any)?.niveaux?.ia ?? 1);
  return {
    n: Number.isFinite(n) ? Math.max(0, Math.min(3, n)) : 1,
    pionnier: !!(j as any)?.pionnier,
    admin: !!(j as any)?.admin,
  };
}

async function consommePlafond(emp: string, cout: number, max: number) {
  if (!URL_SB() || !CLE_SB()) return { autorise: true, restant: -1, reprise: null as string | null };
  const j = await rpc("ia_quota_consomme", {
    p_empreinte: emp, p_max: max, p_fenetre: CREDITS_FENETRE, p_cout: cout,
  });
  if (!j) return { autorise: true, restant: -1, reprise: null };
  const l = Array.isArray(j) ? j[0] : j;
  return {
    autorise: l?.autorise !== false,
    restant: typeof l?.restant === "number" ? l.restant : -1,
    reprise: l?.reprise ?? null,
  };
}

// ------------------------------------------------------- les credits offerts
// Un administrateur peut offrir des credits a un compte. Ils sont pris AVANT
// le quota de la fenetre, et rendus en premier si la demande echoue : ce qui
// a ete offert ne doit jamais servir a payer une reponse qui n est pas venue.
async function bonusPrend(id: string, cout: number): Promise<number> {
  if (!id || cout <= 0) return 0;
  const j = await rpc("ia_bonus_prend", { p_id: id, p_cout: cout });
  return typeof j === "number" ? j : 0;
}
async function bonusVoir(id: string): Promise<number> {
  if (!id) return 0;
  const j = await rpc("ia_bonus_voir", { p_id: id });
  return typeof j === "number" ? j : 0;
}
async function bonusRend(id: string, n: number): Promise<void> {
  if (!id || n <= 0) return;
  await rpc("ia_bonus_rend", { p_id: id, p_n: n });
}

// Un remboursement de zero n en est pas un : c est une simple lecture du
// restant. On l autorise, sinon la jauge de credits s eteint des qu une
// demande est payee entierement par les credits offerts.
async function rembourse(emp: string, combien: number, max = CREDITS_MAX): Promise<number | null> {
  if (combien < 0 || !URL_SB() || !CLE_SB()) return null;
  const j = await rpc("ia_quota_ajuste", { p_empreinte: emp, p_delta: -combien, p_max: max });
  const l = Array.isArray(j) ? j[0] : j;
  return typeof l?.restant === "number" ? l.restant : null;
}

// ------------------------------------------------------------- modeles
const dispoParCle = new Map<string, string[]>();
const hsParCle = new Map<string, Map<string, string>>();

function hsDe(k: string): Map<string, string> {
  let m = hsParCle.get(k);
  if (!m) { m = new Map(); hsParCle.set(k, m); }
  return m;
}

async function modeles(k: string, url: string, cle: string): Promise<string[]> {
  const cache = dispoParCle.get(k);
  if (cache) return cache;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${cle}` } });
  if (!r.ok) throw new Error(`liste indisponible (HTTP ${r.status})`);
  const j = await r.json();
  const L = (j?.data ?? []).map((m: any) => String(m?.id ?? "").replace(/^models\//, ""))
    .filter((id: string) => id && !EXCLUS.test(id));
  dispoParCle.set(k, L);
  return L;
}

async function listeGemini(): Promise<string[]> {
  const c = cleGemini();
  if (!c) return [];
  try { return await modeles("gemini", GEMINI.liste, c); } catch { return []; }
}

// Le meilleur modele de conversation du compte : la generation la plus haute,
// et parmi elles, "pro" avant "flash". Coder un nom en dur condamne le palier
// le jour ou la generation est retiree.
function meilleurGemini(L: string[]): string {
  const bons = L.filter((x) => /^gemini-[\d.]+/.test(x) && !/-(lite|thinking|exp|tuning)\b/.test(x));
  if (!bons.length) return "";
  const note = (x: string) => {
    const g = parseFloat((x.match(/^gemini-([\d.]+)/) ?? [])[1] ?? "0");
    const pro = /\bpro\b/.test(x) ? 2 : (/flash/.test(x) ? 1 : 0);
    const stable = /(preview|latest|\d{2}-\d{2})/.test(x) ? 0 : 1;
    return g * 100 + pro * 10 + stable;
  };
  return bons.sort((a, b) => note(b) - note(a))[0];
}

async function paliersVivants(i: number, cle: string, admin: boolean) {
  const L = await modeles("groq:" + i, GROQ.liste, cle);
  const G = admin ? await listeGemini() : [];
  const gm = admin ? meilleurGemini(G) : "";
  const out = [];
  for (const [k, p] of Object.entries(PALIERS)) {
    if (p.admin && !admin) continue;
    const gemini = p.maison === "gemini";
    const maison = gemini ? "gemini" : "groq:" + i;
    const modele = gemini ? (p.modele || gm) : p.modele;
    const dispo = gemini ? G : L;
    const KO = hsDe(maison);
    const present = !!modele && dispo.some((x) => x === modele || x.startsWith(modele));
    out.push({
      cle: k, modele, nom: p.nom, rang: p.rang, base: p.base, role: p.role,
      maison: p.maison, reserve: !!p.admin,
      present, bloque: KO.get(modele) ?? null,
      utilisable: present && !KO.has(modele),
    });
  }
  return out;
}

function ouverts(niveau: number, admin: boolean): string[] {
  if (admin) return ["G", "S", "A2", "A1", "B"];
  return OUVERTS[Math.max(0, Math.min(3, niveau))] ?? OUVERTS[1];
}

async function choisirPalier(i: number, cle: string, demande: unknown, admin: boolean, niveau = 3) {
  const permis = new Set(ouverts(niveau, admin));
  const bons = (await paliersVivants(i, cle, admin)).filter((p) => p.utilisable && permis.has(p.cle));
  const k = String(demande ?? "").toUpperCase();
  if (!bons.length) return null;
  // Un palier demande mais non ouvert n est pas une erreur : on rend le
  // meilleur palier auquel la personne a droit, et on le dit dans la reponse.
  return bons.find((p) => p.cle === k)
    ?? bons.find((p) => p.cle === PALIER_DEFAUT)
    ?? bons[0];
}

async function suivantPalier(i: number, cle: string, essayes: Set<string>, admin: boolean, niveau = 3) {
  const permis = new Set(ouverts(niveau, admin));
  const bons = (await paliersVivants(i, cle, admin))
    .filter((p) => p.utilisable && !essayes.has(p.cle) && permis.has(p.cle));
  for (const k of ORDRE_REPLI) {
    const p = bons.find((x) => x.cle === k);
    if (p) return p;
  }
  return bons.find((x) => !x.reserve) ?? null;
}

function refusDefinitif(statut: number, detail: string) {
  if (statut === 404) return true;
  if (statut < 400 || statut >= 500) return false;
  if (/rate limit|quota|resource_exhausted/i.test(detail)) return false;
  return /blocked|not exist|do not have access|decommissioned|not authorized|unsupported model|permission|not found|no longer available/i.test(detail);
}

async function sonder(cles: string[]) {
  const out: any[] = [];
  const gem = cleGemini();
  const G = await listeGemini();
  const gm = meilleurGemini(G);
  for (const [k, p] of Object.entries(PALIERS)) {
    const gemini = p.maison === "gemini";
    const modele = gemini ? (p.modele || gm) : p.modele;
    const voies = gemini ? (gem ? [gem] : []) : cles;
    const url = gemini ? GEMINI.amont : GROQ.amont;
    if (!voies.length || !modele) {
      out.push({ maison: p.maison, cle: k, nom: p.nom, modele, repond: false, detail: modele ? "aucune cle configuree" : "aucun modele au catalogue" });
      continue;
    }
    for (let i = 0; i < voies.length; i++) {
      const t0 = Date.now();
      try {
        const r = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${voies[i]}` },
          body: JSON.stringify({ model: modele, max_tokens: 8, temperature: 0, messages: [{ role: "user", content: "ok" }] }),
        });
        const texte = await r.text();
        if (r.ok) out.push({ maison: p.maison, voie: i + 1, cle: k, nom: p.nom, modele, repond: true, ms: Date.now() - t0 });
        else {
          let detail = texte.slice(0, 200);
          try { detail = JSON.parse(texte)?.error?.message ?? detail; } catch { /* brut */ }
          out.push({ maison: p.maison, voie: i + 1, cle: k, nom: p.nom, modele, repond: false, statut: r.status, detail });
        }
      } catch (e) {
        out.push({ maison: p.maison, voie: i + 1, cle: k, nom: p.nom, modele, repond: false, detail: String((e as Error)?.message ?? e) });
      }
      if (gemini) break;
    }
  }
  return { sonde: out, catalogue_gemini: G };
}

function sansPensee(t: string) {
  let x = String(t ?? "").replace(/<think>[\s\S]*?<\/think>/gi, "");
  const o = x.toLowerCase().lastIndexOf("<think>");
  if (o >= 0) x = x.slice(0, o);
  return x.replace(/^\s+/, "");
}

const COUPEE = "La reponse a ete coupee : elle atteignait la longueur maximale. Demande la suite, ou une question plus etroite.";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const cles = lireCles();
  if (!cles.length) {
    return json({ erreur: "config", detail: "Le service n est pas correctement configure. Previens un administrateur du client." }, 503);
  }

  if (req.method === "GET") {
    try {
      const u = new URL(req.url);
      if (u.searchParams.has("sonde")) return json({ voies: cles.length, gemini: !!cleGemini(), ...(await sonder(cles)) });
      const qui = String(u.searchParams.get("moi") ?? "").replace(/[^0-9]/g, "").slice(0, 25);
      const admin = await estAdmin(qui);
      const abo = await niveauAbo(qui);
      const permis = new Set(ouverts(abo.n, admin));
      const i0 = Math.max(0, cleLibre(cles, new Set()));
      const tous = await paliersVivants(i0, cles[i0], admin);
      return json({
        paliers: tous.map((p) => ({ ...p, ouvert: permis.has(p.cle) })),
        defaut: permis.has(PALIER_DEFAUT) ? PALIER_DEFAUT : "B",
        admin,
        abonnement: { niveau: abo.n, pionnier: abo.pionnier, plafond: PLAFOND[abo.n] ?? 100,
                      profond: admin || abo.n >= NIV_PROFOND, analyse: admin || abo.n >= NIV_ANALYSE },
        offert: qui ? await bonusVoir(qui) : 0,
        voies: cles.length,
        voies_au_repos: [...reposJusqu.entries()].filter(([, t]) => t > Date.now()).length,
        credits: { max: admin ? CREDITS_MAX : (PLAFOND[abo.n] ?? 100), reference: CREDITS_MAX,
                   fenetre: CREDITS_FENETRE, niveaux: MULT, analyse: 2, parContexte: 2500, outils: 1 },
      });
    } catch (e) {
      return json({ erreur: "service", detail: "Impossible de lire la liste des modeles pour l instant.", technique: String((e as Error)?.message ?? e) }, 502);
    }
  }
  if (req.method !== "POST") return json({ erreur: "methode" }, 405);

  let corps: any;
  try {
    const brut = await req.text();
    if (brut.length > MAX_OCTETS) return json({ erreur: "taille", detail: "La conversation est devenue trop longue. Efface-la pour repartir sur une base propre." }, 413);
    corps = JSON.parse(brut);
  } catch {
    return json({ erreur: "requete", detail: "Demande illisible." }, 400);
  }

  const bruts = Array.isArray(corps?.messages) ? corps.messages : null;
  if (!bruts || !bruts.length) return json({ erreur: "requete", detail: "Demande vide." }, 400);
  const messages = filtrer(bruts);
  if (!messages.length) return json({ erreur: "requete", detail: "Demande vide." }, 400);
  if (messages.length > MAX_MESSAGES) return json({ erreur: "taille", detail: "La conversation est devenue trop longue. Efface-la pour repartir sur une base propre." }, 413);

  const simule = corps?.simule === true;
  const suite = messages.some((m: any) => m?.role === "tool");
  let nv = niveau(corps?.reflexion);
  let analyse = corps?.analyse === true;
  const outils = Array.isArray(corps?.tools) && corps.tools.length > 0;
  const caracteres = JSON.stringify(messages).length;

  const admin = await estAdmin(corps?.moi);
  const moiId = String(corps?.moi ?? "").replace(/[^0-9]/g, "").slice(0, 25);
  const abo = await niveauAbo(moiId);
  const plafond = admin ? CREDITS_MAX : (PLAFOND[abo.n] ?? 100);

  // Ce que l abonnement n ouvre pas est ramene, pas refuse : la demande passe,
  // simplement au niveau auquel la personne a droit. Le client l apprend dans
  // la reponse et peut le dire clairement.
  const bride: string[] = [];
  if (!admin && nv === "profond" && abo.n < NIV_PROFOND) { nv = "normal"; bride.push("profond"); }
  if (!admin && analyse && abo.n < NIV_ANALYSE) { analyse = false; bride.push("analyse"); }

  let idx = cleLibre(cles, new Set());
  if (idx < 0) idx = 0;

  const demande = String(corps?.palier ?? "").toUpperCase();
  const auto = demande === "AUTO" || !demande;
  const permis = new Set(ouverts(abo.n, admin));
  let vise = auto ? router(messages, outils, nv) : demande;
  if (!permis.has(vise) && vise !== "AUTO") { if (!auto) bride.push("palier"); vise = "B"; }
  let choix = await choisirPalier(idx, cles[idx], vise, admin, abo.n).catch(() => null);
  if (!choix) return json({ erreur: "service", detail: "Aucun modele n est disponible pour l instant." }, 502);

  const cout = Math.min(
    tarif({ palier: choix.cle, niveau: nv, caracteres, outils, analyse }),
    Math.max(1, plafond - 1));
  if (simule) {
    const dispo = await bonusVoir(moiId);
    return json({ simulation: true, cout, palier: choix.cle, nom: choix.nom, admin, voies: cles.length, auto,
                  offert: dispo, niveau_abo: abo.n, plafond, bride });
  }

  const emp = await empreinte(req);
  const facture = !(suite || admin);
  let prisOffert = 0;
  let q: { autorise: boolean; restant: number; reprise: string | null };
  if (!facture) {
    q = { autorise: true, restant: admin ? -2 : -1, reprise: null };
  } else {
    prisOffert = await bonusPrend(moiId, cout);
    const reste = cout - prisOffert;
    q = reste > 0
      ? await consommePlafond(emp, reste, plafond)
      : { autorise: true, restant: (await rembourse(emp, 0, plafond)) ?? -1, reprise: null };
    // Refuse faute de quota : ce qui venait des credits offerts leur revient.
    if (!q.autorise && prisOffert > 0) { await bonusRend(moiId, prisOffert); prisOffert = 0; }
  }
  const offert = await bonusVoir(moiId);

  if (!q.autorise) {
    return json({
      erreur: "credits",
      detail: `Tes credits sont epuises. Ils reviennent par tranche de ${plafond} toutes les 7 heures ; cette demande en coutait ${cout}.`
        + (abo.n < 3 && !admin ? " Un abonnement Nexium IA releve ce plafond." : ""),
      reprise: q.reprise, restant: 0, cout, offert,
      niveau_abo: abo.n, plafond,
    }, 429);
  }

  // Rendre `n` credits : d abord sur ce qui avait ete pris a l offert, le
  // solde sur la fenetre. Retourne le restant de la fenetre, ou null.
  const rendre = async (n: number): Promise<number | null> => {
    if (n <= 0) return null;
    const surOffert = Math.min(prisOffert, n);
    if (surOffert > 0) { await bonusRend(moiId, surOffert); prisOffert -= surOffert; }
    const surFenetre = n - surOffert;
    return surFenetre > 0 ? await rembourse(emp, surFenetre, plafond) : null;
  };

  const flux = corps?.flux === true;
  const base: Record<string, unknown> = {
    messages,
    temperature: nv === "profond" ? 0.4 : (typeof corps?.temperature === "number" ? corps.temperature : 0.6),
    stream: flux,
  };
  if (flux) base.stream_options = { include_usage: true };
  if (outils) { base.tools = corps.tools; base.tool_choice = corps?.tool_choice ?? "auto"; }

  let opts: Record<string, unknown> = { max_tokens: SORTIE[nv], reasoning_effort: EFFORT[nv] };

  const gem = cleGemini();
  const appel = (p: { modele: string; maison: string }, corpsAlt?: Record<string, unknown>) => {
    const gemini = p.maison === "gemini";
    return fetch(gemini ? GEMINI.amont : GROQ.amont, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${gemini ? gem : cles[idx]}` },
      body: JSON.stringify(corpsAlt ?? { ...base, ...opts, model: p.modele }),
    });
  };

  const lireErreur = async (r: Response) => {
    const texte = await r.clone().text();
    try { return String(JSON.parse(texte)?.error?.message ?? texte.slice(0, 400)); }
    catch { return texte.slice(0, 400); }
  };

  // ---------------------------------------------------- le premier temps
  // En niveau profond, on fait d abord travailler le modele sur la question
  // sans lui demander de repondre. Ce temps-la n est pas du decor : son
  // resultat est verse dans la demande finale.
  let delibere = "";
  if (nv === "profond" && !suite) {
    try {
      const r0 = await appel(choix, {
        model: choix.modele,
        messages: [...messages, { role: "user", content: CONSIGNE_DELIBERE }],
        temperature: 0.3,
        max_tokens: 4000,
        reasoning_effort: "high",
        stream: false,
      });
      if (r0.ok) {
        const d0 = await r0.json();
        delibere = sansPensee(String(d0?.choices?.[0]?.message?.content ?? "")).trim();
      }
    } catch { /* la deliberation est un plus, jamais un passage oblige */ }
  }

  if (nv === "profond") {
    const ajout = delibere
      ? `${CONSIGNE_PROFOND}\n\nTU AS DEJA PREPARE CE TRAVAIL. Appuie-toi dessus, ne le repete pas tel quel :\n${delibere}`
      : CONSIGNE_PROFOND;
    base.messages = [...messages, { role: "system", content: ajout }];
  }

  try {
    let r = await appel(choix);
    let repli: string | null = delibere ? "Reponse preparee en deux temps : analyse, puis redaction." : null;
    const clesEvitees = new Set<number>();
    const paliersEssayes = new Set<string>([choix.cle]);
    let dernier = "";

    for (let essai = 0; essai < 4 && !r.ok; essai++) {
      const detail = await lireErreur(r);
      dernier = detail;

      if (opts.reasoning_effort && /reasoning_effort|unrecognized|unknown (field|parameter)|invalid argument/i.test(detail)) {
        opts = { max_tokens: SORTIE[nv] };
        r = await appel(choix);
        continue;
      }

      const sature = r.status === 429 || /rate limit|too many requests|quota|resource_exhausted/i.test(detail);
      if (sature) {
        if (choix.maison === "groq") {
          mettreAuRepos(idx, detail);
          clesEvitees.add(idx);
          const autre = cleLibre(cles, clesEvitees);
          if (autre >= 0) {
            idx = autre;
            const p = await choisirPalier(idx, cles[idx], choix.cle, admin, abo.n).catch(() => null);
            if (p) { choix = p; r = await appel(choix); continue; }
          }
        }
        const s2 = await suivantPalier(idx, cles[idx], paliersEssayes, admin, abo.n).catch(() => null);
        if (s2) {
          paliersEssayes.add(s2.cle);
          const avant = choix.nom; choix = s2;
          repli = `${avant} etait sature. Reponse par ${choix.nom}.`;
          r = await appel(choix);
          continue;
        }
        break;
      }

      if (refusDefinitif(r.status, detail)) {
        hsDe(choix.maison === "gemini" ? "gemini" : "groq:" + idx).set(choix.modele, detail);
        const s2 = await suivantPalier(idx, cles[idx], paliersEssayes, admin, abo.n).catch(() => null);
        if (!s2) break;
        paliersEssayes.add(s2.cle);
        const avant = choix.nom; choix = s2;
        repli = `${avant} n est pas disponible. Reponse par ${choix.nom}.`;
        r = await appel(choix);
        continue;
      }
      break;
    }

    if (!r.ok) {
      const restant = facture ? await rendre(cout) : q.restant;
      return json({
        erreur: "amont",
        detail: messageClair(r.status, dernier || "", choix.nom),
        restant: restant ?? q.restant, cout: 0, rembourse: facture ? cout : 0,
        offert: await bonusVoir(moiId),
        reprise: secondesAvant(dernier || ""),
      }, r.status === 429 ? 429 : 502);
    }

    dernierIndex = idx;
    usage.set(idx, (usage.get(idx) ?? 0) + 1);

    const entete = {
      nexium: true, restant: q.restant, reprise: q.reprise, cout,
      palier: choix.cle, nom: choix.nom, admin, niveau: nv, voie: idx + 1, auto,
      offert, offertPris: prisOffert,
      niveau_abo: abo.n, plafond, bride: bride.length ? bride : null,
      delibere: delibere ? delibere.slice(0, 4000) : null,
    };

    if (flux && r.body) {
      const tete = new TextEncoder().encode(`data: ${JSON.stringify({ ...entete, repli })}\n\n`);
      const source = r.body;
      const sortie = new ReadableStream({
        async start(ctrl) {
          ctrl.enqueue(tete);
          const lec = source.getReader();
          const dec = new TextDecoder();
          let coupee = false, jetons = 0;
          try {
            for (;;) {
              const { done, value } = await lec.read();
              if (done) break;
              const vu = dec.decode(value, { stream: true });
              if (!coupee && /"finish_reason"\s*:\s*"length"/.test(vu)) coupee = true;
              const mj = vu.match(/"total_tokens"\s*:\s*(\d+)/);
              if (mj) jetons = Math.max(jetons, parseInt(mj[1], 10));
              ctrl.enqueue(value);
            }
            if (coupee) ctrl.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ nexium: true, repli: COUPEE, coupee: true })}\n\n`));
            if (facture && jetons > 0) {
              const juste = Math.max(1, Math.min(cout, Math.round(cout * Math.min(1, jetons / 3000))));
              const rendu = cout - juste;
              if (rendu > 0) {
                const restant = await rendre(rendu);
                ctrl.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ nexium: true, cout: juste, rembourse: rendu, restant: restant ?? undefined, offert: await bonusVoir(moiId) })}\n\n`));
              }
            }
          } catch { /* le client a coupe */ }
          finally { try { lec.releaseLock(); } catch { /* deja libere */ } ctrl.close(); }
        },
        cancel() { try { source.cancel(); } catch { /* deja annule */ } },
      });
      return new Response(sortie, {
        headers: { ...CORS, "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache", "Connection": "keep-alive" },
      });
    }

    let data = JSON.parse(await r.text());
    let m = data?.choices?.[0]?.message ?? {};
    let fin = data?.choices?.[0]?.finish_reason ?? "";

    if (!sansPensee(String(m.content ?? "")).trim() && !m.tool_calls) {
      opts = { max_tokens: SORTIE[nv] };
      const r2 = await appel(choix);
      if (r2.ok) {
        const d2 = JSON.parse(await r2.text());
        const m2 = d2?.choices?.[0]?.message ?? {};
        if (sansPensee(String(m2.content ?? "")).trim()) {
          data = d2; m = m2; fin = d2?.choices?.[0]?.finish_reason ?? "";
          repli = "Le modele avait tout depense en reflexion : reponse produite sans raisonnement prealable.";
        }
      }
    }
    if (fin === "length") repli = COUPEE;

    let cf = cout, rendu = 0, restant = q.restant;
    const jetons = Number(data?.usage?.total_tokens ?? 0);
    if (facture && jetons > 0) {
      cf = Math.max(1, Math.min(cout, Math.round(cout * Math.min(1, jetons / 3000))));
      rendu = cout - cf;
      if (rendu > 0) restant = (await rendre(rendu)) ?? restant;
    }

    return json({
      role: "assistant", content: sansPensee(String(m.content ?? "")), tool_calls: m.tool_calls ?? null,
      raisonnement: m.reasoning ?? null, ...entete, cout: cf, rembourse: rendu, restant, repli, coupee: fin === "length",
      offert: await bonusVoir(moiId),
    });
  } catch {
    if (facture) await rendre(cout);
    return json({ erreur: "service", detail: "Le service est momentanement indisponible. Reessaie dans un instant." }, 502);
  }
});
