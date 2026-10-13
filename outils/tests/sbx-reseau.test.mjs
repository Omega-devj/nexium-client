// Bac a sable : le relais ne doit jamais aller vers une adresse privee.
//   node --experimental-strip-types outils/tests/sbx-reseau.test.mjs
import { ipRefusee, destinationRefusee } from "../../supabase/functions/sbx/reseau.ts";

let echecs = 0;
const ok = (cond, msg) => { console.log((cond ? "  ok    " : "  ECHEC ") + msg); if (!cond) echecs++; };

console.log("Adresses IP :");
for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.169.254",
  "100.64.0.1", "0.0.0.0", "224.0.0.1", "255.255.255.255", "::1", "::", "fe80::1", "fc00::1", "fd12:3456::1",
  "::ffff:127.0.0.1", "::ffff:7f00:1", "::127.0.0.1", "64:ff9b::a9fe:a9fe", "ff02::1", "2001:db8::1"]) {
  ok(ipRefusee(ip) !== null, "refusee  " + ip + "  (" + ipRefusee(ip) + ")");
}
for (const ip of ["8.8.8.8", "1.1.1.1", "172.32.0.1", "172.15.255.255", "2606:4700:4700::1111", "::ffff:8.8.8.8"]) {
  ok(ipRefusee(ip) === null, "acceptee " + ip);
}

console.log("Adresses ecrites autrement (l analyseur d URL les ramene a 127.0.0.1) :");
const sansDns = async () => { throw new Error("aucune resolution ne doit avoir lieu"); };
for (const brut of ["http://2130706433/", "http://0x7f000001/", "http://0177.0.0.1/", "http://127.1/",
  "http://[::1]/", "http://[::ffff:127.0.0.1]/", "http://localhost./", "http://LOCALHOST/", "http://x.localhost/",
  "http://169.254.169.254/latest/meta-data/", "http://metadata.google.internal/", "http://user:pw@exemple.fr/", "file:///etc/passwd"]) {
  const r = await destinationRefusee(new URL(brut), sansDns);
  ok(r !== null, "refusee  " + brut + "  (" + r + ")");
}

console.log("Noms qui pointent vers le reseau interne (le trou d avant) :");
const dns = (table) => async (nom, type) => table[nom + "/" + type] ?? [];
const faux = dns({
  "piege.exemple/A": ["127.0.0.1"],
  "meta.exemple/A": ["169.254.169.254"],
  "mixte.exemple/A": ["93.184.216.34", "10.0.0.5"],
  "v6.exemple/AAAA": ["::1"],
  "public.exemple/A": ["93.184.216.34"],
  "public.exemple/AAAA": ["2606:2800:220:1:248:1893:25c8:1946"],
});
ok((await destinationRefusee(new URL("http://piege.exemple/"), faux))?.includes("127.0.0.1"), "piege.exemple -> 127.0.0.1 refuse");
ok((await destinationRefusee(new URL("https://meta.exemple/x"), faux)) !== null, "meta.exemple -> 169.254.169.254 refuse");
ok((await destinationRefusee(new URL("https://mixte.exemple/"), faux)) !== null, "une seule adresse privee parmi plusieurs suffit a refuser");
ok((await destinationRefusee(new URL("https://v6.exemple/"), faux)) !== null, "AAAA vers ::1 refuse");
ok((await destinationRefusee(new URL("https://inconnu.exemple/"), faux)) === "domaine introuvable", "domaine sans adresse : introuvable");
ok((await destinationRefusee(new URL("https://public.exemple/page"), faux)) === null, "domaine public accepte");
const enPanne = async () => { throw new Error("DNS injoignable"); };
ok((await destinationRefusee(new URL("https://public.exemple/"), enPanne)) !== null, "DNS injoignable : on refuse plutot que d y aller a l aveugle");

console.log(echecs ? "\n" + echecs + " ECHEC(S)" : "\nTOUT PASSE");
process.exit(echecs ? 1 : 0);
