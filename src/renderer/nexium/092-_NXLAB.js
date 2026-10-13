var _NXLAB=window._NXLAB||(window._NXLAB={});
if(!_NXLAB.boot){try{_NXLAB.boot=true;
// Le laboratoire.
//
// On n execute JAMAIS ce qu on analyse : on lit des octets et on reconnait
// des formes. La seule menace qui reste est un parseur qui s emballe ou une
// archive-bombe -- d ou les bornes et les delais.
//
// L isolement se constate. Si le navigateur refuse le Worker, l analyse
// tourne sur le fil principal et la page l affiche. Annoncer un isolement
// qu on n a pas obtenu serait le mensonge que ce client refuse partout.
_NXLAB.KEY="nexium_labo";
_NXLAB.MAXOCTETS=33554432;
_NXLAB.MAXMODULE=6000;
_NXLAB.MAXTOTAL=30000;
_NXLAB.MAXHISTO=40;
_NXLAB.MAXCHAINES=4000;
_NXLAB.histo=[];
_NXLAB.encours=null;
_NXLAB._ecoute=[];

_NXLAB.notify=function(){try{
for(var a=0;a<_NXLAB._ecoute.length;a++){try{_NXLAB._ecoute[a]();}catch(_){}}}catch(_){}};

_NXLAB.load=function(){try{
var r=_NXDB.get(_NXLAB.KEY);
var d=r?JSON.parse(r):null;
_NXLAB.histo=(d&&d.histo&&d.histo.length)?d.histo:[];
return d;}catch(_){return null;}};
_NXLAB.save=function(){try{
_NXDB.set(_NXLAB.KEY,JSON.stringify({histo:_NXLAB.histo.slice(0,_NXLAB.MAXHISTO)}));}catch(_){}};

_NXLAB.ident=function(){try{
var u=new Uint8Array(4);window.crypto.getRandomValues(u);
var h="",a;
for(a=0;a<u.length;a++)h+=("0"+u[a].toString(16)).slice(-2);
return "lab-"+Date.now().toString(36)+"-"+h;}catch(_){return "lab-"+Date.now().toString(36);}};

// --- le noyau : les fonctions d analyse, ecrites UNE fois -------------------
// Elles ne doivent rien fermer sur l exterieur : elles sont recopiees telles
// quelles dans le Worker.
_NXLAB.N={};

_NXLAB.N.hex=function(u8,a,n){
var s2="",k;
for(k=a;k<a+n&&k<u8.length;k++)s2+=("0"+u8[k].toString(16)).slice(-2);
return s2;};

_NXLAB.N.ascii=function(u8,a,n){
var s2="",k,c;
for(k=a;k<a+n&&k<u8.length;k++){c=u8[k];s2+=(c>=32&&c<127)?String.fromCharCode(c):".";}
return s2;};

_NXLAB.N.u16=function(u8,a){return u8[a]|(u8[a+1]<<8);};
_NXLAB.N.u32=function(u8,a){return (u8[a]|(u8[a+1]<<8)|(u8[a+2]<<16)|(u8[a+3]<<24))>>>0;};

// L entropie de Shannon, en bits par octet. Au-dela de 7,2 le contenu est
// compresse ou chiffre : ca ne dit pas que c est malveillant, ca dit que ce
// n est pas lisible tel quel.
_NXLAB.N.entropie=function(u8,a,b){
var n=Math.min(b,u8.length)-a;
if(n<=0)return 0;
var c=new Array(256),k;
for(k=0;k<256;k++)c[k]=0;
for(k=a;k<a+n;k++)c[u8[k]]++;
var e=0,p;
for(k=0;k<256;k++){if(!c[k])continue;p=c[k]/n;e-=p*(Math.log(p)/Math.LN2);}
return e;};

// Les nombres magiques : le type REEL, pas l extension.
_NXLAB.N.TYPES=[
{m:"4d5a",t:"executable Windows (PE)",e:"exe",risque:2},
{m:"7f454c46",t:"executable Linux (ELF)",e:"elf",risque:2},
{m:"cafebabe",t:"classe Java",e:"class",risque:1},
{m:"504b0304",t:"archive ZIP (ou docx/xlsx/jar/apk)",e:"zip",risque:1},
{m:"526172211a07",t:"archive RAR",e:"rar",risque:1},
{m:"377abcaf271c",t:"archive 7z",e:"7z",risque:1},
{m:"1f8b08",t:"archive gzip",e:"gz",risque:1},
{m:"255044462d",t:"document PDF",e:"pdf",risque:1},
{m:"89504e470d0a1a0a",t:"image PNG",e:"png",risque:0},
{m:"ffd8ff",t:"image JPEG",e:"jpg",risque:0},
{m:"47494638",t:"image GIF",e:"gif",risque:0},
{m:"52494646",t:"conteneur RIFF (wav/avi/webp)",e:"riff",risque:0},
{m:"1a45dfa3",t:"conteneur Matroska (webm/mkv)",e:"webm",risque:0},
{m:"4f676753",t:"conteneur Ogg",e:"ogg",risque:0},
{m:"49443303",t:"audio MP3",e:"mp3",risque:0},
{m:"d0cf11e0a1b11ae1",t:"document Office ancien (OLE)",e:"doc",risque:2},
{m:"3c3f786d6c",t:"XML",e:"xml",risque:0},
{m:"7b5c727466",t:"document RTF",e:"rtf",risque:1},
{m:"00000100",t:"icone Windows",e:"ico",risque:0},
{m:"4d534346",t:"archive CAB",e:"cab",risque:1},
{m:"edabeedb",t:"paquet RPM",e:"rpm",risque:1},
{m:"213c617263683e",t:"paquet Debian",e:"deb",risque:1}];

_NXLAB.N.magie=function(u8,N){
var t=N.hex(u8,0,8),a;
for(a=0;a<N.TYPES.length;a++)if(t.indexOf(N.TYPES[a].m)===0)return N.TYPES[a];
return null;};

// Les chaines lisibles, ASCII et UTF-16LE. C est le premier endroit ou un
// script ou un binaire trahit ce qu il fait.
_NXLAB.N.chaines=function(u8,mini,max){
var out=[],cur="",k,c;
for(k=0;k<u8.length;k++){
c=u8[k];
if(c>=32&&c<127){cur+=String.fromCharCode(c);continue;}
if(cur.length>=mini){out.push(cur);if(out.length>=max)return out;}
cur="";}
if(cur.length>=mini&&out.length<max)out.push(cur);
// UTF-16LE : un octet lisible, un zero.
cur="";
for(k=0;k+1<u8.length;k+=2){
c=u8[k];
if(c>=32&&c<127&&u8[k+1]===0){cur+=String.fromCharCode(c);continue;}
if(cur.length>=mini){out.push(cur);if(out.length>=max)return out;}
cur="";}
if(cur.length>=mini&&out.length<max)out.push(cur);
return out;};

// Les indicateurs : ce qui, dans du texte, designe une infrastructure.
_NXLAB.N.IOC=[
{k:"url",r:/https?:\/\/[A-Za-z0-9._~:\/?#\[\]@!$&'()*+,;=%-]{4,180}/g,n:"adresses web"},
{k:"ip4",r:/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,n:"adresses IPv4"},
{k:"mail",r:/\b[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{2,60}\.[A-Za-z]{2,12}\b/g,n:"adresses e-mail"},
{k:"webhook",r:/https?:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/api\/webhooks\/\d{5,25}\/[A-Za-z0-9_-]{20,90}/g,n:"webhooks Discord"},
{k:"btc",r:/\b(?:bc1[a-z0-9]{20,60}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b/g,n:"adresses Bitcoin"},
{k:"chemin",r:/[A-Za-z]:\\(?:[^\\\/:*?"<>|\r\n]{1,40}\\?){1,8}/g,n:"chemins Windows"},
{k:"registre",r:/HKEY_[A-Z_]{4,30}\\[^\s"']{4,120}/g,n:"clefs de registre"},
{k:"b64",r:/[A-Za-z0-9+\/]{60,}={0,2}/g,n:"blocs encodes en base64"}];

// Les regles : un constat, sa raison, son poids. Rien n est cache.
_NXLAB.N.REGLES=[
{k:"ps-encode",n:"PowerShell encode",p:26,
 d:"Une commande PowerShell passee en base64 : la facon habituelle de cacher ce qu un script fait vraiment.",
 t:function(c){return /powershell[^\n]{0,60}(-e|-enc|-encodedcommand)\b/i.test(c.texte);}},
{k:"ps-hidden",n:"Fenetre masquee",p:18,
 d:"Le script demande a s executer sans fenetre visible.",
 t:function(c){return /-w(indowstyle)?\s+hidden|-nop\b|-noprofile/i.test(c.texte);}},
{k:"telecharge-execute",n:"Telecharge puis execute",p:32,
 d:"Le contenu recupere un fichier sur Internet et le lance dans la foulee.",
 t:function(c){return /(invoke-webrequest|downloadstring|downloadfile|curl|wget|bitsadmin)[\s\S]{0,120}(iex|invoke-expression|start-process|cmd\s*\/c|\.run|system\()/i.test(c.texte);}},
{k:"eval",n:"Code fabrique a l execution",p:20,
 d:"eval, Function() ou equivalent : le programme construit son propre code en marchant. Legitime parfois, mais c est aussi la facon la plus courante de se rendre illisible.",
 t:function(c){return /\b(eval|Function\s*\(\s*["']|atob\s*\(|unescape\s*\()/.test(c.texte);}},
{k:"vbs-macro",n:"Macro de document",p:28,
 d:"Un document Office qui contient du code executable.",
 t:function(c){return /vbaProject\.bin|Auto_?Open|Document_?Open|Workbook_?Open/i.test(c.texte);}},
{k:"pdf-action",n:"PDF qui agit a l ouverture",p:26,
 d:"Ce PDF declenche quelque chose des qu on l ouvre, au lieu d etre un simple document.",
 t:function(c){return /\/(OpenAction|AA|Launch|JavaScript|JS)\b/.test(c.texte);}},
{k:"anti-analyse",n:"Cherche a savoir s il est observe",p:30,
 d:"Le contenu teste la presence d un debogueur, d une machine virtuelle ou d un outil d analyse. Un programme honnete n a aucune raison de faire ca.",
 t:function(c){return /(IsDebuggerPresent|CheckRemoteDebugger|vmware|virtualbox|sandboxie|wireshark|procmon|ollydbg|x64dbg)/i.test(c.texte);}},
{k:"persistance",n:"Cherche a rester apres le redemarrage",p:24,
 d:"Le contenu touche au demarrage automatique, aux taches planifiees ou aux services.",
 t:function(c){return /(CurrentVersion\\Run|schtasks|New-ScheduledTask|sc\s+create|systemctl\s+enable|crontab)/i.test(c.texte);}},
{k:"jeton",n:"Va chercher des jetons",p:36,
 d:"Le contenu vise les fichiers ou Discord, les navigateurs ou les portefeuilles gardent des identifiants.",
 t:function(c){return /(Local Storage\\leveldb|leveldb|Login Data|cookies\.sqlite|wallet\.dat|discord[\s\S]{0,20}token)/i.test(c.texte);}},
{k:"exfil",n:"Renvoie des donnees ailleurs",p:30,
 d:"Le contenu contient une adresse de destination et de quoi y poster.",
 t:function(c){return /(api\/webhooks\/|pastebin\.com\/api|transfer\.sh|anonfiles|telegram\.org\/bot)/i.test(c.texte);}},
{k:"obfusque",n:"Volontairement illisible",p:16,
 d:"Longues suites sans espace, noms d une lettre, concatenations a rallonge : ce contenu est ecrit pour ne pas etre lu.",
 t:function(c){return c.texte.length>400&&/[A-Za-z0-9+\/]{200,}/.test(c.texte);}},
{k:"invisible",n:"Caracteres invisibles",p:14,
 d:"Des caracteres sans largeur sont glisses dans le texte. Ils servent a marquer un document ou a tromper une lecture.",
 t:function(c){return /[\u200b\u200c\u200d\u2060\ufeff]/.test(c.texte);}}];

// --- les modules ------------------------------------------------------------
// Chacun recoit (c, N) et rend une liste de constats. Rien d autre.
_NXLAB.MODS={};

_NXLAB.MODS.type=function(c,N){
var out=[];
var m=N.magie(c.octets,N);
var ext=(c.nom.split(".").pop()||"").toLowerCase();
out.push({t:"Type reel",d:m?m.t:"inconnu (aucun nombre magique reconnu)",n:0,p:0});
out.push({t:"Premiers octets",d:N.hex(c.octets,0,12)+"   "+N.ascii(c.octets,0,12),n:0,p:0});
if(m){
c.type=m.e;
if(m.risque>=2)out.push({t:"Format executable",
d:"Ce fichier peut s executer. Ce n est pas un defaut en soi, mais ca change ce qu il faut verifier avant de l ouvrir.",n:1,p:10});
// Le cas le plus parlant de toute la page.
if(ext&&ext!==m.e&&!(m.e==="zip"&&/^(docx|xlsx|pptx|jar|apk|odt|epub)$/.test(ext))
   &&!(m.e==="riff"&&/^(wav|avi|webp)$/.test(ext))){
out.push({t:"L extension ne correspond pas au contenu",
d:"Le nom annonce ."+ext+", le contenu est "+m.t+". C est la signature la plus frequente d un fichier deguise.",n:2,p:34});}}
return out;};

_NXLAB.MODS.taille=function(c,N){
var out=[];
out.push({t:"Taille",d:c.taille+" octets",n:0,p:0});
if(c.taille===0)out.push({t:"Fichier vide",d:"Aucun octet a analyser.",n:1,p:0});
return out;};

_NXLAB.MODS.entropie=function(c,N){
var out=[];
var e=N.entropie(c.octets,0,c.octets.length);
out.push({t:"Entropie globale",d:e.toFixed(2)+" bits sur 8",n:0,p:0,
mesure:{k:"entropie",v:e}});
if(e>7.2)out.push({t:"Contenu compresse ou chiffre",
d:"Une entropie de "+e.toFixed(2)+" veut dire que le contenu n est pas lisible tel quel. Normal pour une archive ou une image ; inhabituel pour un executable ou un script.",
n:(c.type==="exe"||c.type==="elf")?2:0,p:(c.type==="exe"||c.type==="elf")?22:0});
// Par blocs : un executable normal a des zones de code lisibles. Un
// executable entierement a 7,5 est empaquete.
var n=c.octets.length,pas=Math.max(4096,Math.floor(n/24)),k,haut=0,tot=0,prof=[];
for(k=0;k+pas<=n&&prof.length<32;k+=pas){
var v=N.entropie(c.octets,k,k+pas);
prof.push(Math.round(v*100)/100);
tot++;if(v>7.4)haut++;}
if(prof.length)out.push({t:"Profil d entropie",d:prof.length+" blocs mesures",n:0,p:0,profil:prof});
if(tot>3&&haut/tot>0.85&&(c.type==="exe"||c.type==="elf"))
out.push({t:"Executable entierement opaque",
d:Math.round(haut*100/tot)+" % des blocs sont au-dessus de 7,4. Un executable normal garde des zones lisibles ; celui-ci n en a pas, ce qui va avec un empaquetage.",n:2,p:26});
return out;};

_NXLAB.MODS.chaines=function(c,N){
var out=[];
var L=N.chaines(c.octets,5,4000);
var vus={},uniq=[],a;
for(a=0;a<L.length;a++){if(vus[L[a]])continue;vus[L[a]]=1;uniq.push(L[a]);}
out.push({t:"Chaines lisibles",d:uniq.length+" chaines distinctes d au moins 5 caracteres",n:0,p:0,
chaines:uniq.slice(0,600)});
c.texte=(c.texte||"")+"\n"+uniq.join("\n");
return out;};

_NXLAB.MODS.ioc=function(c,N){
var out=[],a,b,m,vus,liste;
for(a=0;a<N.IOC.length;a++){
var d=N.IOC[a];
d.r.lastIndex=0;
vus={};liste=[];
while((m=d.r.exec(c.texte))!==null){
if(!vus[m[0]]){vus[m[0]]=1;liste.push(m[0]);}
if(liste.length>=120)break;
if(d.r.lastIndex===m.index)d.r.lastIndex++;}
if(!liste.length)continue;
var grave=(d.k==="webhook")?2:((d.k==="btc"||d.k==="registre")?1:0);
out.push({t:liste.length+" "+d.n,d:liste.slice(0,12).join("\n"),
n:grave,p:(d.k==="webhook")?30:((d.k==="btc")?16:0),
indicateurs:{genre:d.k,liste:liste}});}
return out;};

_NXLAB.MODS.regles=function(c,N){
var out=[],a;
for(a=0;a<N.REGLES.length;a++){
var r=N.REGLES[a];
var touche=false;
try{touche=!!r.t(c);}catch(_){touche=false;}
if(touche)out.push({t:r.n,d:r.d,n:2,p:r.p,regle:r.k});}
if(!out.length)out.push({t:"Aucune regle declenchee",
d:N.REGLES.length+" regles ont ete passees sur ce contenu, aucune ne correspond.",n:0,p:0});
return out;};

// La structure : ce qu on sait lire d un format, sans rien executer.
_NXLAB.MODS.structure=function(c,N){
var out=[],u=c.octets;
if(c.type==="zip"){
// On lit le repertoire central : la liste des entrees et leur taille
// annoncee. Ca permet de reperer une archive-bombe AVANT de decompresser.
var n=0,brut=0,comp=0,noms=[],k;
for(k=0;k+4<u.length&&n<600;k++){
if(u[k]===0x50&&u[k+1]===0x4b&&u[k+2]===0x01&&u[k+3]===0x02){
var tc=N.u32(u,k+20),tb=N.u32(u,k+24),ln=N.u16(u,k+28);
comp+=tc;brut+=tb;
if(ln>0&&ln<200)noms.push(N.ascii(u,k+46,Math.min(ln,90)));
n++;k+=45;}}
out.push({t:"Archive",d:n+" entree(s) declaree(s)",n:0,p:0});
if(noms.length)out.push({t:"Contenu",d:noms.slice(0,25).join("\n"),n:0,p:0,chaines:noms.slice(0,120)});
if(comp>0&&brut/comp>120)out.push({t:"Taux de compression anormal",
d:"Cette archive annonce "+Math.round(brut/comp)+" fois sa taille une fois decompressee. Au-dela de 100, c est le profil d une archive-bombe.",n:2,p:30});
var dang=0;
for(k=0;k<noms.length;k++)if(/\.(exe|scr|bat|cmd|ps1|vbs|js|jar|msi|lnk|hta)$/i.test(noms[k]))dang++;
if(dang)out.push({t:dang+" fichier(s) executable(s) dans l archive",
d:"Une archive qui contient de quoi s executer merite qu on regarde avant d ouvrir.",n:2,p:20});
var trav=0;
for(k=0;k<noms.length;k++)if(noms[k].indexOf("..")>=0)trav++;
if(trav)out.push({t:"Chemin qui remonte hors du dossier",
d:trav+" entree(s) contiennent '..'. A la decompression, ca ecrit ailleurs que dans le dossier prevu.",n:2,p:34});
return out;}

if(c.type==="exe"){
var pe=N.u32(u,60);
if(pe>0&&pe+24<u.length&&u[pe]===0x50&&u[pe+1]===0x45){
var mach=N.u16(u,pe+4),nsec=N.u16(u,pe+6),horo=N.u32(u,pe+8);
out.push({t:"En-tete PE",d:"machine 0x"+mach.toString(16)+" \u00b7 "+nsec+" section(s)",n:0,p:0});
if(horo>946684800&&horo<2000000000){
var dt=new Date(horo*1000);
out.push({t:"Compile le",d:dt.toISOString().slice(0,10)+" (date declaree dans le fichier)",n:0,p:0});
if(horo*1000>Date.now()+86400000)out.push({t:"Date de compilation dans le futur",
d:"La date annoncee n existe pas encore : elle a ete falsifiee.",n:2,p:18});}
var opt=pe+24,noms2=[],k2,off=opt+N.u16(u,pe+20);
for(k2=0;k2<nsec&&k2<24;k2++){
var so=off+k2*40;
if(so+8>u.length)break;
noms2.push(N.ascii(u,so,8).replace(/\.+$/,""));}
if(noms2.length)out.push({t:"Sections",d:noms2.join("  "),n:0,p:0});
var sus=0;
for(k2=0;k2<noms2.length;k2++)if(/UPX|\.themida|\.vmp|\.aspack|\.petite|\.enigma/i.test(noms2[k2]))sus++;
if(sus)out.push({t:"Empaqueteur reconnu",
d:"Les noms de sections trahissent un empaqueteur. Ce n est pas illegal, mais c est rare en dehors des logiciels qui veulent cacher leur contenu.",n:2,p:24});}
else out.push({t:"En-tete PE illisible",d:"Le fichier commence par MZ mais l en-tete PE ne suit pas.",n:1,p:12});
return out;}

if(c.type==="pdf"){
var t2=c.texte||"";
var obj=(t2.match(/\bobj\b/g)||[]).length;
out.push({t:"Document PDF",d:obj+" objet(s) reperes",n:0,p:0});
if(/\/Encrypt\b/.test(t2))out.push({t:"PDF chiffre",d:"Le contenu est protege : l analyse ne peut pas aller plus loin.",n:1,p:0});
if(/\/EmbeddedFile\b/.test(t2))out.push({t:"Fichier embarque",d:"Ce PDF transporte un autre fichier a l interieur.",n:2,p:22});
return out;}

out.push({t:"Structure",d:"Aucun lecteur de structure pour ce format. Les autres modules s appliquent quand meme.",n:0,p:0});
return out;};

// --- l enchainement ---------------------------------------------------------
_NXLAB.ORDRE=["taille","type","entropie","chaines","ioc","regles","structure"];
_NXLAB.PROFILS={
rapide:["taille","type","entropie","ioc"],
complet:["taille","type","entropie","chaines","ioc","regles","structure"]};
_NXLAB.NOMS={taille:"Taille",type:"Type reel",entropie:"Entropie",
chaines:"Chaines lisibles",ioc:"Indicateurs",regles:"Regles de detection",
structure:"Structure"};
_NXLAB.COUTS={taille:1,type:1,entropie:3,chaines:4,ioc:3,regles:2,structure:3};

// La source du Worker est fabriquee a partir des memes fonctions : les deux
// chemins ne peuvent pas diverger.
_NXLAB.BOUCLE=[
"self.onmessage=function(ev){",
"var d=ev.data;",
"var c={octets:new Uint8Array(d.octets),nom:d.nom,taille:d.taille,type:'',texte:''};",
"var a,k,res;",
"for(a=0;a<d.modules.length;a++){",
"k=d.modules[a];",
"var t0=Date.now();",
"try{res=M[k](c,N);}catch(e){res=[{t:'Module interrompu',d:String((e&&e.message)||e),n:1,p:0}];}",
"self.postMessage({phase:'module',k:k,res:res,ms:Date.now()-t0});}",
"self.postMessage({phase:'fin'});};"].join("\n");

_NXLAB.source=function(){try{
var s2="var N={};\n",k;
for(k in _NXLAB.N)s2+="N."+k+"="+((typeof _NXLAB.N[k]==="function")?_NXLAB.N[k].toString():JSON.stringify(_NXLAB.N[k]))+";\n";
// Les tables portent des expressions regulieres et des fonctions : on les
// recopie telles quelles plutot que par JSON, qui les perdrait.
s2="var N={};\n";
s2+="N.hex="+_NXLAB.N.hex.toString()+";\n";
s2+="N.ascii="+_NXLAB.N.ascii.toString()+";\n";
s2+="N.u16="+_NXLAB.N.u16.toString()+";\n";
s2+="N.u32="+_NXLAB.N.u32.toString()+";\n";
s2+="N.entropie="+_NXLAB.N.entropie.toString()+";\n";
s2+="N.chaines="+_NXLAB.N.chaines.toString()+";\n";
s2+="N.magie="+_NXLAB.N.magie.toString()+";\n";
s2+="N.TYPES="+JSON.stringify(_NXLAB.N.TYPES)+";\n";
s2+="N.IOC=["+(function(){var L=[],a;
for(a=0;a<_NXLAB.N.IOC.length;a++){var d=_NXLAB.N.IOC[a];
L.push("{k:"+JSON.stringify(d.k)+",r:"+d.r.toString()+",n:"+JSON.stringify(d.n)+"}");}
return L.join(",");})()+"];\n";
s2+="N.REGLES=["+(function(){var L=[],a;
for(a=0;a<_NXLAB.N.REGLES.length;a++){var r=_NXLAB.N.REGLES[a];
L.push("{k:"+JSON.stringify(r.k)+",n:"+JSON.stringify(r.n)+",p:"+r.p+
",d:"+JSON.stringify(r.d)+",t:"+r.t.toString()+"}");}
return L.join(",");})()+"];\n";
s2+="var M={};\n";
for(k in _NXLAB.MODS)s2+="M."+k+"="+_NXLAB.MODS[k].toString()+";\n";
s2+=_NXLAB.BOUCLE;
return s2;}catch(_){return "";}};

// Le score : la somme des poids constates, plafonnee. Jamais autre chose.
_NXLAB.score=function(cons){try{
var t=0,a;
for(a=0;a<cons.length;a++)t+=(cons[a].p||0);
return Math.max(0,Math.min(100,t));}catch(_){return 0;}};

_NXLAB.niveau=function(sc){try{
if(sc>=60)return {k:"danger",n:"dangereux"};
if(sc>=30)return {k:"attention",n:"a verifier"};
if(sc>=10)return {k:"tiede",n:"quelques signaux"};
return {k:"calme",n:"rien de notable"};}catch(_){return {k:"calme",n:""};}};

// --- lancer une analyse -----------------------------------------------------
_NXLAB.analyse=function(nom,tampon,profil,surEtape){try{
if(_NXLAB.encours)return Promise.reject(new Error("une analyse est deja en cours"));
var u=new Uint8Array(tampon);
if(u.length>_NXLAB.MAXOCTETS)
return Promise.reject(new Error("fichier trop gros : la borne est "+Math.round(_NXLAB.MAXOCTETS/1048576)+" Mo"));
var mods=_NXLAB.PROFILS[profil]||_NXLAB.PROFILS.rapide;
var dossier={id:_NXLAB.ident(),nom:String(nom||"sans nom"),taille:u.length,
profil:profil,debut:Date.now(),etapes:[],constats:[],isole:false,
interrompu:false,mesures:{}};
_NXLAB.encours=dossier;
_NXLAB.notify();

return new Promise(function(res){
var fini=false;
var w=null,minuteur=null;

function termine(){
if(fini)return;
fini=true;
try{if(minuteur)clearTimeout(minuteur);}catch(_){}
try{if(w)w.terminate();}catch(_){}
dossier.fin=Date.now();
dossier.duree=dossier.fin-dossier.debut;
dossier.score=_NXLAB.score(dossier.constats);
dossier.niveau=_NXLAB.niveau(dossier.score).k;
_NXLAB.encours=null;
// Le dernier dossier reste en memoire : revenir sur la page le retrouve.
// Il disparait au redemarrage, comme tout le reste de l analyse.
_NXLAB.dernier=dossier;
_NXLAB.histo.unshift(_NXLAB.resume(dossier));
if(_NXLAB.histo.length>_NXLAB.MAXHISTO)_NXLAB.histo.length=_NXLAB.MAXHISTO;
_NXLAB.save();_NXLAB.notify();
res(dossier);}

function etape(k,r,ms){
var a;
for(a=0;a<r.length;a++){r[a].m=k;dossier.constats.push(r[a]);}
dossier.etapes.push({k:k,n:_NXLAB.NOMS[k]||k,ms:ms,trouves:r.length});
try{if(surEtape)surEtape(dossier,k);}catch(_){}
_NXLAB.notify();}

// On tente l isolement. S il est refuse, on le DIT.
try{
if(typeof Worker==="function"&&typeof Blob==="function"&&window.URL&&URL.createObjectURL){
var src=_NXLAB.source();
var b=new Blob([src],{type:"application/javascript"});
var lien=URL.createObjectURL(b);
w=new Worker(lien);
dossier.isole=true;
w.onmessage=function(ev){
var d=ev.data||{};
if(d.phase==="module")etape(d.k,d.res||[],d.ms||0);
else if(d.phase==="fin"){try{URL.revokeObjectURL(lien);}catch(_){}termine();}};
w.onerror=function(){
// Le Worker a echoue : on retombe sur le fil principal, et le dossier
// gardera la trace que l isolement n a pas eu lieu.
try{w.terminate();}catch(_){}
w=null;dossier.isole=false;
dossier.note="l isolement a echoue, l analyse a tourne sur le fil principal";
_NXLAB.filPrincipal(dossier,u,mods,etape,termine);};
minuteur=setTimeout(function(){
dossier.interrompu=true;
dossier.note="analyse interrompue : delai de "+Math.round(_NXLAB.MAXTOTAL/1000)+" s depasse";
termine();},_NXLAB.MAXTOTAL);
w.postMessage({octets:u.buffer.slice(0),nom:dossier.nom,taille:u.length,modules:mods});
return;}}catch(_){w=null;}

dossier.isole=false;
dossier.note="ce client ne permet pas l isolement, l analyse a tourne sur le fil principal";
_NXLAB.filPrincipal(dossier,u,mods,etape,termine);});
}catch(e){_NXLAB.encours=null;return Promise.reject(e);}};

// Le repli : meme code, meme resultats, mais sans isolement -- et le dossier
// le dit.
_NXLAB.filPrincipal=function(dossier,u,mods,etape,termine){try{
var c={octets:u,nom:dossier.nom,taille:u.length,type:"",texte:""};
var a=0;
function pas(){
if(a>=mods.length){termine();return;}
var k=mods[a++],t0=Date.now(),r;
try{r=_NXLAB.MODS[k](c,_NXLAB.N);}
catch(e){r=[{t:"Module interrompu",d:String((e&&e.message)||e),n:1,p:0}];}
etape(k,r,Date.now()-t0);
setTimeout(pas,0);}
pas();}catch(_){termine();}};

_NXLAB.resume=function(d){try{
return {id:d.id,nom:d.nom,taille:d.taille,profil:d.profil,
quand:d.debut,duree:d.duree,score:d.score,niveau:d.niveau,
isole:!!d.isole,interrompu:!!d.interrompu,
constats:d.constats.length,
alertes:(function(){var n=0,a;
for(a=0;a<d.constats.length;a++)if(d.constats[a].n===2)n++;return n;})()};}catch(_){return {};}};

_NXLAB.oublie=function(){try{
_NXLAB.histo=[];_NXLAB.save();_NXLAB.notify();return true;}catch(_){return false;}};

// Le rapport : du texte, lisible par un humain et collable ailleurs.
_NXLAB.rapport=function(d){try{
var L=[],a;
L.push("NEXIUM \u00b7 rapport d analyse");
L.push("identifiant   : "+d.id);
L.push("fichier       : "+d.nom);
L.push("taille        : "+d.taille+" octets");
L.push("profil        : "+d.profil);
L.push("duree         : "+d.duree+" ms");
L.push("isolement     : "+(d.isole?"oui (Worker)":"NON \u2014 fil principal"));
if(d.note)L.push("note          : "+d.note);
L.push("score         : "+d.score+"/100 \u2014 "+_NXLAB.niveau(d.score).n);
L.push("");
L.push("-- ce qui compte dans ce score --");
var eu=false;
for(a=0;a<d.constats.length;a++){
var c=d.constats[a];
if(!c.p)continue;
eu=true;
L.push("  +"+c.p+"  "+c.t);
L.push("        "+String(c.d||"").split("\n")[0]);}
if(!eu)L.push("  (aucun constat ne pese : le score est de 0)");
L.push("");
L.push("-- tout ce qui a ete constate --");
for(a=0;a<d.constats.length;a++){
var c2=d.constats[a];
L.push("  ["+(_NXLAB.NOMS[c2.m]||c2.m)+"] "+c2.t);
if(c2.d)L.push("        "+String(c2.d).split("\n").slice(0,4).join("\n        "));}
L.push("");
L.push("Nexium n a rien execute : ce rapport vient de la lecture des octets.");
return L.join("\n");}catch(_){return "rapport indisponible";}};

// Les recommandations decoulent des constats, pas d une liste generique.
_NXLAB.CONSEILS=[
{q:function(d){return d.constats.some(function(c){return /extension ne correspond/i.test(c.t);});},
 t:"Ne l ouvre pas depuis l explorateur",
 d:"Un fichier dont le contenu ne correspond pas a son nom a ete prepare pour etre ouvert par megarde. Si tu dois savoir ce qu il fait, garde-le ici."},
{q:function(d){return d.constats.some(function(c){return /webhook/i.test(c.t);});},
 t:"Ce webhook peut etre coupe",
 d:"Un webhook trouve dans un fichier sert souvent a renvoyer des donnees. Le proprietaire du salon peut le supprimer dans les reglages d integration, et il cesse de fonctionner immediatement."},
{q:function(d){return d.constats.some(function(c){return c.regle==="jeton";});},
 t:"Change ton mot de passe Discord, puis active la double authentification",
 d:"Ce contenu vise les endroits ou les identifiants sont gardes. Changer le mot de passe invalide les jetons existants."},
{q:function(d){return d.constats.some(function(c){return /archive-bombe|compression anormal/i.test(c.t);});},
 t:"Ne decompresse pas cette archive",
 d:"Elle est faite pour saturer le disque a l ouverture."},
{q:function(d){return d.constats.some(function(c){return /remonte hors du dossier/i.test(c.t);});},
 t:"Decompresse-la uniquement avec un outil qui refuse les chemins relatifs",
 d:"Telle quelle, elle ecrit ailleurs que dans le dossier que tu as choisi."},
{q:function(d){return d.constats.some(function(c){return c.regle==="anti-analyse";});},
 t:"Traite-le comme malveillant",
 d:"Un programme qui cherche a savoir s il est observe n a aucune raison honnete de le faire."},
{q:function(d){return d.score===0;},
 t:"Rien ne ressort, et ca ne prouve rien",
 d:"Cette analyse lit des formes connues. Elle ne remplace pas un antivirus, et un contenu neuf peut passer sans bruit. L absence de signal n est pas une garantie."},
{q:function(d){return !d.isole;},
 t:"Cette analyse n a pas eu lieu dans un espace isole",
 d:"Le navigateur a refuse le Worker : tout a tourne sur le fil principal. Rien n a ete execute pour autant -- seule la lecture des octets a eu lieu."}];

_NXLAB.conseils=function(d){try{
var out=[],a;
for(a=0;a<_NXLAB.CONSEILS.length;a++){
var c=_NXLAB.CONSEILS[a];
var vrai=false;
try{vrai=!!c.q(d);}catch(_){vrai=false;}
if(vrai)out.push({t:c.t,d:c.d});}
return out;}catch(_){return [];}};

_NXLAB.etat=function(){try{
return {analyses:_NXLAB.histo.length,encours:!!_NXLAB.encours,
modules:_NXLAB.ORDRE.length,regles:_NXLAB.N.REGLES.length};}catch(_){return {analyses:0};}};

try{_NXLAB.load();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXLAB");if(window._NXERR)_NXERR.push("module _NXLAB :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXLAB desactive:",_nxE);}catch(_){}}
}
