// Nexium Protect — le bac a sable.
//
// Le client ne peut pas lire une page distante lui-meme : depuis Discord, un
// fetch vers un autre domaine est refuse par le navigateur (CORS) avant meme
// d arriver au site. Le bac a sable ne fonctionnait donc jamais, sauf sur les
// rares sites qui autorisent tout le monde a les lire.
//
// Ce service va chercher la page a la place du client. Il n execute rien : il
// telecharge le texte, suit les redirections en les notant, et rend le tout au
// client qui fait l analyse chez lui. Deux effets de bord utiles : l adresse
// IP de l utilisateur n est jamais exposee au site inspecte, et la chaine de
// redirections devient visible.

const MAX_OCTETS = 400_000;
const MAX_SAUTS = 6;
const DELAI = 12_000;

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(corps: unknown, statut = 200) {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// Une adresse qui pointe vers le reseau local n a rien a faire ici : ce
// service tourne sur une infrastructure partagee, et servir de relais vers
// ses voisins serait une porte ouverte.
const PRIVE = [
  /^localhost$/i, /^127\./, /^0\./, /^10\./, /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./, /^169\.254\./, /^::1$/, /^\[?::1\]?$/,
  /^fc00:/i, /^fd[0-9a-f]{2}:/i, /^fe80:/i,
  /\.local$/i, /\.internal$/i, /^metadata\./i,
];

function hoteRefuse(h: string): string | null {
  const n = h.replace(/^\[|\]$/g, "").toLowerCase();
  if (!n) return "hote absent";
  for (const rx of PRIVE) if (rx.test(n)) return "adresse du reseau local";
  return null;
}

function verifie(brut: string): { u: URL } | { err: string } {
  let u: URL;
  try { u = new URL(brut); } catch { return { err: "adresse illisible" }; }
  if (u.protocol !== "http:" && u.protocol !== "https:") return { err: "seuls http et https sont acceptes" };
  if (u.username || u.password) return { err: "les adresses avec identifiants sont refusees" };
  const mauvais = hoteRefuse(u.hostname);
  if (mauvais) return { err: mauvais };
  return { u };
}

// Un plafond simple, par adresse d appel. Une instance vit peu de temps :
// c est une gene pour l abus repete, pas une barriere absolue.
const vus = new Map<string, number[]>();
function trop(ip: string): boolean {
  const now = Date.now();
  const L = (vus.get(ip) ?? []).filter((t) => now - t < 60_000);
  L.push(now);
  vus.set(ip, L);
  if (vus.size > 500) vus.clear();
  return L.length > 12;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ erreur: "methode" }, 405);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
  if (trop(ip)) return json({ erreur: "trop de demandes", detail: "Attends une minute avant d inspecter une nouvelle page." }, 429);

  let corps: any;
  try { corps = await req.json(); } catch { return json({ erreur: "requete illisible" }, 400); }

  const v = verifie(String(corps?.url ?? ""));
  if ("err" in v) return json({ erreur: v.err }, 400);

  const chaine: { url: string; statut: number }[] = [];
  let courant = v.u;
  const t0 = Date.now();

  try {
    for (let saut = 0; saut < MAX_SAUTS; saut++) {
      const ctrl = new AbortController();
      const minuteur = setTimeout(() => ctrl.abort(), DELAI);
      let r: Response;
      try {
        r = await fetch(courant.toString(), {
          method: "GET",
          redirect: "manual",
          signal: ctrl.signal,
          headers: {
            // Un navigateur ordinaire : on ne cherche pas a se faire passer
            // pour autre chose, seulement a ne pas etre refuse d office.
            "Accept": "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5",
            "Accept-Language": "fr,en;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          },
        });
      } finally { clearTimeout(minuteur); }

      chaine.push({ url: courant.toString(), statut: r.status });

      if (r.status >= 300 && r.status < 400) {
        const suivant = r.headers.get("location");
        if (!suivant) return json({ erreur: "redirection sans destination", chaine }, 200);
        let cible: URL;
        try { cible = new URL(suivant, courant); } catch { return json({ erreur: "redirection illisible", chaine }, 200); }
        const mauvais = hoteRefuse(cible.hostname);
        if (mauvais) return json({ erreur: "redirection vers une " + mauvais, chaine }, 200);
        if (cible.protocol !== "http:" && cible.protocol !== "https:")
          return json({ erreur: "redirection hors http", chaine }, 200);
        courant = cible;
        continue;
      }

      const type = (r.headers.get("content-type") ?? "").split(";")[0].trim();
      if (type && type.indexOf("text/") !== 0 && type.indexOf("application/xhtml") !== 0
        && type.indexOf("application/json") !== 0) {
        return json({
          erreur: "la reponse n est pas une page web (" + type + ")",
          finalUrl: courant.toString(), statut: r.status, type, chaine,
        }, 200);
      }

      // On lit par morceaux : une page de plusieurs mega-octets n a aucune
      // raison d etre chargee en entier pour etre inspectee.
      const lec = r.body?.getReader();
      let recu = new Uint8Array(0);
      if (lec) {
        for (;;) {
          const { done, value } = await lec.read();
          if (done) break;
          if (!value) continue;
          const fusion = new Uint8Array(recu.length + value.length);
          fusion.set(recu); fusion.set(value, recu.length);
          recu = fusion;
          if (recu.length >= MAX_OCTETS) { try { await lec.cancel(); } catch { /* deja ferme */ } break; }
        }
      }
      const html = new TextDecoder("utf-8", { fatal: false }).decode(recu.slice(0, MAX_OCTETS));

      return json({
        ok: true,
        finalUrl: courant.toString(),
        statut: r.status,
        type: type || "inconnu",
        taille: recu.length,
        tronquee: recu.length >= MAX_OCTETS,
        ms: Date.now() - t0,
        chaine,
        entetes: {
          serveur: r.headers.get("server") ?? null,
          csp: r.headers.get("content-security-policy") ? true : false,
          hsts: r.headers.get("strict-transport-security") ? true : false,
          xfo: r.headers.get("x-frame-options") ?? null,
        },
        html,
      });
    }
    return json({ erreur: "trop de redirections", chaine }, 200);
  } catch (e) {
    const m = String((e as Error)?.message ?? e);
    const dit = /abort/i.test(m) ? "le site n a pas repondu a temps"
      : /dns|resolve|name not resolved/i.test(m) ? "domaine introuvable"
        : "page injoignable";
    return json({ erreur: dit, technique: m.slice(0, 200), chaine }, 200);
  }
});
