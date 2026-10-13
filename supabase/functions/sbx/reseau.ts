// Nexium Protect — le bac a sable : ou le relais a le droit d aller.
//
// Le relais tourne sur une infrastructure partagee. S il suivait n importe
// quelle adresse, on pourrait lui faire lire ses voisins : le reseau interne,
// l adresse de metadonnees du fournisseur (169.254.169.254), sa propre
// machine. Filtrer le NOM ne suffit pas : "piege.exemple" peut tres bien
// pointer vers 127.0.0.1. On resout donc le nom, et on refuse si UNE SEULE
// des adresses obtenues est privee ou reservee -- a chaque saut de
// redirection, pas seulement au premier.
//
// Limite connue : entre cette resolution et celle que fait fetch() juste
// apres, un serveur DNS malveillant peut changer de reponse (rebinding). La
// fenetre est de quelques millisecondes et suppose un domaine prepare pour ca ;
// la fermer completement demanderait de se connecter a l adresse verifiee
// elle-meme, ce que fetch() ne permet pas en gardant le TLS.

const NOMS_INTERDITS = [/^localhost$/i, /\.localhost$/i, /\.local$/i, /\.internal$/i, /^metadata\./i];

// ------------------------------------------------------------------ IPv4
function ipv4(ip: string): number[] | null {
  const p = ip.split(".");
  if (p.length !== 4) return null;
  const n = p.map((x) => (/^\d{1,3}$/.test(x) ? Number(x) : NaN));
  return n.every((x) => x >= 0 && x <= 255) ? n : null;
}

// [debut, longueur du prefixe, raison]
const PLAGES_V4: [string, number, string][] = [
  ["0.0.0.0", 8, "adresse reservee"],
  ["10.0.0.0", 8, "adresse du reseau local"],
  ["100.64.0.0", 10, "adresse du reseau de l operateur"],
  ["127.0.0.0", 8, "adresse de la machine elle-meme"],
  ["169.254.0.0", 16, "adresse de lien local (metadonnees)"],
  ["172.16.0.0", 12, "adresse du reseau local"],
  ["192.0.0.0", 24, "adresse reservee"],
  ["192.0.2.0", 24, "adresse de documentation"],
  ["192.168.0.0", 16, "adresse du reseau local"],
  ["198.18.0.0", 15, "adresse de test"],
  ["198.51.100.0", 24, "adresse de documentation"],
  ["203.0.113.0", 24, "adresse de documentation"],
  ["224.0.0.0", 4, "adresse de multidiffusion"],
  ["240.0.0.0", 4, "adresse reservee"],
];

function versEntier(o: number[]): number {
  return ((o[0] << 24) >>> 0) + (o[1] << 16) + (o[2] << 8) + o[3];
}

function v4Refusee(o: number[]): string | null {
  const ip = versEntier(o);
  for (const [debut, long, raison] of PLAGES_V4) {
    const masque = long === 0 ? 0 : (0xffffffff << (32 - long)) >>> 0;
    if (((ip & masque) >>> 0) === ((versEntier(ipv4(debut)!) & masque) >>> 0)) return raison;
  }
  return null;
}

// ------------------------------------------------------------------ IPv6
// Rend les huit groupes de 16 bits, ou null si l adresse est illisible.
function ipv6(brut: string): number[] | null {
  let s = brut.replace(/^\[|\]$/g, "").toLowerCase();
  const zone = s.indexOf("%");
  if (zone >= 0) s = s.slice(0, zone);
  if (!s.includes(":")) return null;
  // Une fin en notation IPv4 (::ffff:127.0.0.1) devient deux groupes.
  const fin = s.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (fin) {
    const o = ipv4(fin[1]);
    if (!o) return null;
    s = s.slice(0, -fin[1].length) + ((o[0] << 8) | o[1]).toString(16) + ":" + ((o[2] << 8) | o[3]).toString(16);
  }
  const moities = s.split("::");
  if (moities.length > 2) return null;
  const lire = (x: string) => (x ? x.split(":") : []);
  const g = lire(moities[0]), d = moities.length === 2 ? lire(moities[1]) : [];
  const manque = 8 - g.length - d.length;
  if ((moities.length === 2 && manque < 1) || (moities.length === 1 && manque !== 0)) return null;
  const tout = [...g, ...Array(moities.length === 2 ? manque : 0).fill("0"), ...d];
  if (tout.length !== 8 || !tout.every((x) => /^[0-9a-f]{1,4}$/.test(x))) return null;
  return tout.map((x) => parseInt(x, 16));
}

function v6Refusee(h: number[]): string | null {
  const zero = (de: number, a: number) => h.slice(de, a).every((x) => x === 0);
  if (zero(0, 8)) return "adresse non specifiee";
  if (zero(0, 7) && h[7] === 1) return "adresse de la machine elle-meme";
  // Une IPv4 cachee dans une IPv6 : ::ffff:a.b.c.d, ::a.b.c.d, 64:ff9b::a.b.c.d (NAT64).
  const v4 = [h[6] >> 8, h[6] & 255, h[7] >> 8, h[7] & 255];
  if (zero(0, 5) && (h[5] === 0xffff || h[5] === 0)) return v4Refusee(v4);
  if (h[0] === 0x64 && h[1] === 0xff9b && zero(2, 6)) return v4Refusee(v4);
  if ((h[0] & 0xfe00) === 0xfc00) return "adresse du reseau local";
  if ((h[0] & 0xffc0) === 0xfe80) return "adresse de lien local";
  if ((h[0] & 0xff00) === 0xff00) return "adresse de multidiffusion";
  if (h[0] === 0x2001 && h[1] === 0x0db8) return "adresse de documentation";
  if (h[0] === 0x0100 && zero(1, 4)) return "adresse reservee";
  return null;
}

/** Raison du refus d une adresse IP, ou null si elle est publique. */
export function ipRefusee(ip: string): string | null {
  const o = ipv4(ip);
  if (o) return v4Refusee(o);
  const h = ipv6(ip);
  if (h) return v6Refusee(h);
  return "adresse illisible";
}

function estIp(hote: string): boolean {
  return ipv4(hote) !== null || ipv6(hote) !== null;
}

// ------------------------------------------------------------- resolution
type Resolveur = (nom: string, type: "A" | "AAAA") => Promise<string[]>;

// Le resolveur de Deno quand il existe ; sinon DNS sur HTTPS, qui marche
// partout ou fetch() marche.
const parDeno: Resolveur = async (nom, type) => {
  try {
    return await (globalThis as any).Deno.resolveDns(nom, type);
  } catch (e) {
    if ((e as Error)?.name === "NotFound") return [];
    throw e;
  }
};

const parDoh: Resolveur = async (nom, type) => {
  const ctrl = new AbortController();
  const mt = setTimeout(() => ctrl.abort(), 4000);
  try {
    const r = await fetch("https://cloudflare-dns.com/dns-query?name=" + encodeURIComponent(nom) + "&type=" + type, {
      headers: { "Accept": "application/dns-json" },
      signal: ctrl.signal,
    });
    if (!r.ok) throw new Error("DNS sur HTTPS : " + r.status);
    const j = await r.json();
    const code = type === "A" ? 1 : 28;
    return (j?.Answer ?? []).filter((a: any) => a?.type === code).map((a: any) => String(a.data));
  } finally {
    clearTimeout(mt);
  }
};

function resolveurParDefaut(): Resolveur {
  const D = (globalThis as any).Deno;
  if (D && typeof D.resolveDns === "function") {
    return async (nom, type) => {
      try { return await parDeno(nom, type); } catch { return await parDoh(nom, type); }
    };
  }
  return parDoh;
}

/**
 * Peut-on aller a cette adresse ? Rend la raison du refus, ou null.
 * Verifie le nom, puis CHAQUE adresse vers laquelle il pointe.
 */
export async function destinationRefusee(u: URL, resoudre: Resolveur = resolveurParDefaut()): Promise<string | null> {
  if (u.protocol !== "http:" && u.protocol !== "https:") return "seuls http et https sont acceptes";
  if (u.username || u.password) return "les adresses avec identifiants sont refusees";
  const hote = u.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  if (!hote) return "hote absent";
  for (const rx of NOMS_INTERDITS) if (rx.test(hote)) return "adresse du reseau local";
  if (estIp(hote)) return ipRefusee(hote);
  let adresses: string[] = [];
  try {
    const [a, aaaa] = await Promise.all([resoudre(hote, "A"), resoudre(hote, "AAAA").catch(() => [])]);
    adresses = [...a, ...aaaa];
  } catch {
    // Sans resolution, on ne sait pas ou l on irait : on n y va pas.
    return "verification de l adresse impossible";
  }
  if (!adresses.length) return "domaine introuvable";
  for (const ip of adresses) {
    const raison = ipRefusee(ip);
    if (raison) return raison + " (" + hote + " pointe vers " + ip + ")";
  }
  return null;
}
