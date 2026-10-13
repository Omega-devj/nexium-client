if(!_NXSTATUS.boot){try{_NXSTATUS.boot=true;
_NXSTATUS.URL="https://emcoqnvxriyrchmfpunq.supabase.co";
_NXSTATUS.CLE="sb_publishable_mhLyot9Dv_VCtWpCbYpngg_evMB79C3";
_NXSTATUS.PAGE="https://omega-devj.github.io/status-nexium/";
_NXSTATUS.CHAMPS="id,titre,resume,gravite,etat,composant,versions_touchees,correctif,debut,fin,maj";
_NXSTATUS.alertes=[];_NXSTATUS.listeners=[];_NXSTATUS.busy=false;_NXSTATUS.err=null;_NXSTATUS.at=0;
_NXSTATUS.notify=function(){for(var a=0;a<_NXSTATUS.listeners.length;a++){try{_NXSTATUS.listeners[a]();}catch(_){}}};
_NXSTATUS.NIVEAUX=[
{k:"securite",n:"Alerte de s\u00e9curit\u00e9",c:"#e0426a",p:5,d:"Une faille ou une menace qui vise directement les utilisateurs."},
{k:"critique",n:"Panne critique",c:"#d6484a",p:4,d:"Le client est inutilisable pour tout le monde."},
{k:"majeur",n:"Incident majeur",c:"#d9a441",p:3,d:"Une fonction importante ne marche plus."},
{k:"mineur",n:"Incident mineur",c:"#8a8a94",p:2,d:"Une g\u00eane, sans blocage."},
{k:"maintenance",n:"Maintenance",c:"#6a8fd6",p:1,d:"Une interruption pr\u00e9vue et annonc\u00e9e."},
{k:"info",n:"Information",c:"#5fb37a",p:0,d:"Une annonce, sans incident."}];
_NXSTATUS.niveau=function(g){for(var a=0;a<_NXSTATUS.NIVEAUX.length;a++){if(_NXSTATUS.NIVEAUX[a].k===g)return _NXSTATUS.NIVEAUX[a];}return null;};
_NXSTATUS.gravFr=function(g){var x=_NXSTATUS.niveau(g);return x?x.n:"Incident";};
_NXSTATUS.couleur=function(g){var x=_NXSTATUS.niveau(g);return x?x.c:"#8a8a94";};
_NXSTATUS.poids=function(g){var x=_NXSTATUS.niveau(g);return x?x.p:0;};
// Reporter une alerte : elle disparait, et revient dans deux heures. Ce
// n est pas la meme chose que "j ai compris", qui la retire pour de bon.
_NXSTATUS.PLUSTARD=7200000;
_NXSTATUS.reportees=function(){try{var r=_NXDB.get("nexium_alertes_plus_tard");var d=r?JSON.parse(r):null;return (d&&typeof d==="object")?d:{};}catch(_){return {};}};
_NXSTATUS.reporte=function(id){try{
var v=_NXSTATUS.reportees();v[id]=Date.now()+_NXSTATUS.PLUSTARD;
var ks=Object.keys(v),now=Date.now();
for(var a=0;a<ks.length;a++)if(v[ks[a]]<now)delete v[ks[a]];
_NXDB.set("nexium_alertes_plus_tard",JSON.stringify(v));}catch(_){}};
_NXSTATUS.estReportee=function(id){try{
var v=_NXSTATUS.reportees();return !!(v[id]&&v[id]>Date.now());}catch(_){return false;}};
// Demander a Nexium IA ce que cette panne veut dire, en clair. La question
// part avec ce que l alerte dit, et rien d autre.
_NXSTATUS.expliquer=function(al){try{
if(!al||!window._NXIA)return false;
var q="Une alerte du client Nexium vient de s afficher. Explique-moi en trois phrases simples "+
"ce que cela veut dire pour moi, et ce que je peux faire en attendant.\n\n"+
"Niveau : "+_NXSTATUS.gravFr(al.gravite)+"\n"+
"Titre : "+String(al.titre||"")+"\n"+
"Resume : "+String(al.resume||"")+
(al.composant?("\nComposant : "+al.composant):"")+
(al.versions_touchees?("\nVersions touchees : "+al.versions_touchees):"")+
(al.correctif?("\nCorrige en : "+al.correctif):"");
try{if(window._NXCP)_NXCP.goto("equicord_ia");}catch(_){}
setTimeout(function(){try{_NXIA.envoyer(q);}catch(_){}},260);
return true;}catch(_){return false;}};
_NXSTATUS.vues=function(){try{var r=_NXDB.get("nexium_alertes_vues");var d=r?JSON.parse(r):null;return (d&&typeof d==="object")?d:{};}catch(_){return {};}};
_NXSTATUS.marque=function(id){try{var v=_NXSTATUS.vues();v[id]=Date.now();var ks=Object.keys(v);if(ks.length>40){ks.sort(function(x,y){return v[x]-v[y];});for(var a=0;a<ks.length-30;a++)delete v[ks[a]];}_NXDB.set("nexium_alertes_vues",JSON.stringify(v));}catch(_){}};
_NXSTATUS.charge=function(){try{
if(_NXSTATUS.busy)return;
_NXSTATUS.busy=true;
var u=_NXSTATUS.URL+"/rest/v1/nx_alertes?select="+_NXSTATUS.CHAMPS+"&fin=is.null&order=debut.desc&limit=10";
_NXNETX.go(u,{headers:{apikey:_NXSTATUS.CLE,Accept:"application/json"},cache:"no-store"},20000).then(function(r){
if(!r||!r.ok)throw 0;
return r.json();}).then(function(j){
_NXSTATUS.busy=false;_NXSTATUS.err=null;_NXSTATUS.at=Date.now();
var out=[];
if(j&&j.length){for(var a=0;a<j.length;a++){if(j[a]&&j[a].etat!=="resolu")out.push(j[a]);}}
_NXSTATUS.alertes=out;
try{_NXNETX.ok("statut");}catch(_){}
_NXSTATUS.affiche();_NXSTATUS.notify();}).catch(function(){
_NXSTATUS.busy=false;_NXSTATUS.err=true;
try{_NXNETX.retry("statut",function(){_NXSTATUS.charge();});}catch(_){}
_NXSTATUS.notify();});
}catch(_){_NXSTATUS.busy=false;}};
_NXSTATUS.ouvrePage=function(){try{
if(window._NXP&&_NXP.open){_NXP.open(_NXSTATUS.PAGE);return true;}
if(typeof VencordNative!=="undefined"&&VencordNative.native&&VencordNative.native.openExternal){VencordNative.native.openExternal(_NXSTATUS.PAGE);return true;}
}catch(_){}return false;};
_NXSTATUS.ferme=function(){try{var e=document.getElementById("nx-alerte");if(e&&e.parentNode)e.parentNode.removeChild(e);var p=document.getElementById("nx-alerte-pile");if(p&&p.parentNode)p.parentNode.removeChild(p);}catch(_){}};
_NXSTATUS.JT={
fond:"var(--bg-surface-overlay,var(--background-floating,#111214))",
fond2:"var(--bg-surface-raised,var(--background-secondary,#2b2d31))",
texte:"var(--text-default,var(--text-normal,#dbdee1))",
doux:"var(--text-muted,#949ba4)",
bord:"var(--border-normal,rgba(148,155,164,.2))",
police:"var(--font-primary,'gg sans','Noto Sans',Helvetica,Arial,sans-serif)",
rayon:"var(--radius-sm,8px)",
ombre:"var(--elevation-high,0 8px 16px rgba(0,0,0,.24))"};
_NXSTATUS.styleBandeau=function(){try{
if(document.getElementById("nx-alerte-style"))return;
var T=_NXSTATUS.JT;
var c=document.createElement("style");
c.id="nx-alerte-style";
c.textContent=
_NXtr("@keyframes nxaEntre{from{opacity:0;transform:translate(-50%,-18px) scale(.97)}to{opacity:1;transform:translate(-50%,0) scale(1)}}")+
_NXtr("@keyframes nxaSort{from{opacity:1;transform:translate(-50%,0) scale(1)}to{opacity:0;transform:translate(-50%,-14px) scale(.97)}}")+
_NXtr("@keyframes nxaHalo{0%,100%{opacity:.22;transform:scale(1)}50%{opacity:.55;transform:scale(1.22)}}")+
_NXtr("@keyframes nxaBalaye{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}")+
_NXtr("@keyframes nxaMonte{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}")+
_NXtr("#nx-alerte{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:1000;")+
_NXtr("width:calc(100% - 44px);max-width:620px;box-sizing:border-box;background:")+_NXtr(T.fond)+";"+
_NXtr("border:1px solid ")+_NXtr(T.bord)+_NXtr(";border-radius:14px;padding:0;overflow:hidden;")+
_NXtr("box-shadow:0 18px 44px rgba(0,0,0,.42),0 2px 0 rgba(255,255,255,.03) inset;")+
_NXtr("font-family:")+_NXtr(T.police)+_NXtr(";color:")+_NXtr(T.texte)+_NXtr(";pointer-events:auto;")+
_NXtr("animation:nxaEntre .34s cubic-bezier(.16,1,.3,1) both;}")+
_NXtr("#nx-alerte.nxa-part{animation:nxaSort .24s ease forwards;}")+
_NXtr("#nx-alerte .nxa-liseret{position:absolute;top:0;left:0;right:0;height:2px;}")+
_NXtr("#nx-alerte .nxa-brille{position:absolute;top:0;left:0;height:2px;width:26%;")+
_NXtr("background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent);")+
_NXtr("animation:nxaBalaye 3.2s cubic-bezier(.5,0,.5,1) infinite;}")+
_NXtr("#nx-alerte .nxa-int{display:flex;gap:14px;align-items:flex-start;padding:15px 16px 14px;}")+
_NXtr("#nx-alerte .nxa-past{position:relative;width:38px;height:38px;border-radius:12px;flex:0 0 auto;")+
_NXtr("display:flex;align-items:center;justify-content:center;}")+
_NXtr("#nx-alerte .nxa-halo{position:absolute;inset:-22%;border-radius:50%;pointer-events:none;")+
_NXtr("animation:nxaHalo 3.4s ease-in-out infinite;}")+
_NXtr("#nx-alerte .nxa-past svg{position:relative;width:19px;height:19px;}")+
_NXtr("#nx-alerte .nxa-corps{flex:1;min-width:0;}")+
_NXtr("#nx-alerte .nxa-tete{display:flex;align-items:center;gap:9px;margin-bottom:6px;flex-wrap:wrap;}")+
_NXtr("#nx-alerte .nxa-grav{font-size:9.5px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;}")+
_NXtr("#nx-alerte .nxa-etat{font-size:10px;font-weight:700;color:")+_NXtr(T.doux)+_NXtr(";border:1px solid ")+_NXtr(T.bord)+";"+
_NXtr("border-radius:99px;padding:1px 8px;letter-spacing:.02em;}")+
_NXtr("#nx-alerte .nxa-compte{font-size:10.5px;color:")+_NXtr(T.doux)+_NXtr(";margin-left:auto;font-variant-numeric:tabular-nums;")+
_NXtr("letter-spacing:.04em;}")+
_NXtr("#nx-alerte .nxa-titre{font-size:15.5px;font-weight:700;color:")+_NXtr(T.texte)+_NXtr(";line-height:1.32;letter-spacing:-.01em;}")+
_NXtr("#nx-alerte .nxa-txt{font-size:13px;color:")+_NXtr(T.doux)+_NXtr(";margin-top:6px;line-height:1.5;}")+
_NXtr("#nx-alerte .nxa-meta{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;}")+
_NXtr("#nx-alerte .nxa-et{font-size:10.5px;color:")+_NXtr(T.doux)+_NXtr(";background:rgba(255,255,255,.035);")+
_NXtr("border:1px solid ")+_NXtr(T.bord)+_NXtr(";border-radius:7px;padding:3px 9px;display:inline-flex;align-items:center;gap:5px;}")+
_NXtr("#nx-alerte .nxa-fil{margin-top:11px;padding-left:12px;border-left:1px solid ")+_NXtr(T.bord)+";}"+
_NXtr("#nx-alerte .nxa-fil > div{font-size:11.5px;color:")+_NXtr(T.doux)+_NXtr(";line-height:1.5;margin-bottom:5px;")+
_NXtr("animation:nxaMonte .35s ease both;}")+
_NXtr("#nx-alerte .nxa-fil > div:last-child{margin-bottom:0;}")+
_NXtr("#nx-alerte .nxa-fil b{color:")+_NXtr(T.texte)+_NXtr(";font-weight:600;}")+
_NXtr("#nx-alerte .nxa-actes{display:flex;gap:7px;margin-top:14px;flex-wrap:wrap;}")+
_NXtr("#nx-alerte .nxa-b{height:31px;padding:0 13px;border-radius:9px;font-size:12.5px;font-weight:600;")+
_NXtr("border:1px solid transparent;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:6px;")+
_NXtr("transition:transform .15s cubic-bezier(.22,.8,.28,1),background-color .15s,border-color .15s;}")+
_NXtr("#nx-alerte .nxa-b:hover{transform:translateY(-1px);}")+
_NXtr("#nx-alerte .nxa-b:active{transform:scale(.98);}")+
_NXtr("#nx-alerte .nxa-b svg{width:13px;height:13px;}")+
_NXtr("#nx-alerte .nxa-b1{background:#5865f2;color:#fff;}")+
_NXtr("#nx-alerte .nxa-b1:hover{background:#4752c4;}")+
_NXtr("#nx-alerte .nxa-b2{background:rgba(255,255,255,.055);color:")+_NXtr(T.texte)+_NXtr(";border-color:")+_NXtr(T.bord)+";}"+
_NXtr("#nx-alerte .nxa-b2:hover{background:rgba(255,255,255,.09);}")+
_NXtr("#nx-alerte .nxa-b3{background:transparent;color:")+_NXtr(T.doux)+";}"+
_NXtr("#nx-alerte .nxa-b3:hover{color:")+_NXtr(T.texte)+_NXtr(";background:rgba(255,255,255,.045);}")+
_NXtr("#nx-alerte .nxa-x{position:absolute;top:11px;right:11px;width:24px;height:24px;border-radius:7px;")+
_NXtr("display:flex;align-items:center;justify-content:center;color:")+_NXtr(T.doux)+_NXtr(";cursor:pointer;")+
_NXtr("font-size:16px;line-height:1;transition:background-color .15s,color .15s;}")+
_NXtr("#nx-alerte .nxa-x:hover{background:rgba(255,255,255,.07);color:")+_NXtr(T.texte)+";}"+
_NXtr("#nx-alerte-pile{position:fixed;top:16px;left:50%;z-index:999;pointer-events:none;")+
_NXtr("width:calc(100% - 44px);max-width:620px;transform:translateX(-50%);}")+
_NXtr("#nx-alerte-pile > div{position:absolute;left:0;right:0;height:44px;border-radius:14px;")+
_NXtr("background:")+_NXtr(T.fond)+_NXtr(";border:1px solid ")+_NXtr(T.bord)+";}"+
_NXtr("@media (prefers-reduced-motion: reduce){#nx-alerte,#nx-alerte *{animation:none!important;transition:none!important;}}");
if(document.head)document.head.appendChild(c);}catch(_){}};
_NXSTATUS.TRACES={
securite:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
critique:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
majeur:"M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z",
mineur:"M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
maintenance:"M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z",
info:"M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"};
_NXSTATUS.trace=function(g){return _NXSTATUS.TRACES[g]||_NXSTATUS.TRACES.info;};
_NXSTATUS.teinte=function(col,a){try{
var h=String(col||"").replace("#","");
if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
var n=parseInt(h,16);
return "rgba("+((n>>16)&255)+","+((n>>8)&255)+","+(n&255)+","+a+")";}catch(_){return "rgba(140,140,150,"+a+")";}};
_NXSTATUS.depuis=function(t){try{
if(!t)return "";
var d=Date.now()-(new Date(t)).getTime();
if(d<0||!isFinite(d))return "";
var m=Math.floor(d/60000);
if(m<1)return "a l instant";
if(m<60)return "depuis "+m+" min";
var h=Math.floor(m/60);
if(h<48)return "depuis "+h+" h";
return "depuis "+Math.floor(h/24)+" j";}catch(_){return "";}};
_NXSTATUS.svg=function(d,z){try{
var NS="http://www.w3.org/2000/svg";
var e=document.createElementNS(NS,"svg");
e.setAttribute("viewBox","0 0 24 24");e.setAttribute("fill","currentColor");
e.setAttribute("aria-hidden","true");
if(z){e.setAttribute("width",z);e.setAttribute("height",z);}
var p=document.createElementNS(NS,"path");p.setAttribute("d",d);
e.appendChild(p);return e;}catch(_){return document.createElement("span");}};
_NXSTATUS.restantes=function(){try{
var v=_NXSTATUS.vues(),out=[],a;
for(a=0;a<_NXSTATUS.alertes.length;a++){
var x=_NXSTATUS.alertes[a];
if(v[x.id])continue;
if(_NXSTATUS.estReportee(x.id))continue;
out.push(x);}
// Le plus grave en premier : une panne critique ne doit pas attendre
// derriere une annonce.
out.sort(function(p,q){return _NXSTATUS.poids(q.gravite)-_NXSTATUS.poids(p.gravite);});
return out;}catch(_){return [];}};
_NXSTATUS.affiche=function(){try{
if(!document.body)return;
var restantes=_NXSTATUS.restantes();
var vieux=document.getElementById("nx-alerte");
if(!restantes.length){_NXSTATUS.ferme();return;}
var cible=restantes[0];
if(vieux&&vieux.getAttribute("data-id")===String(cible.id))return;
_NXSTATUS.ferme();
_NXSTATUS.styleBandeau();
var T=_NXSTATUS.JT;
var c=_NXSTATUS.couleur(cible.gravite);
var el=function(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=_NXtr(txt);return e;};

// La pile : deux cartes a peine visibles derriere, quand il y a la suite.
if(restantes.length>1){
var pile=el("div");pile.id="nx-alerte-pile";
var n=Math.min(2,restantes.length-1);
for(var z=n;z>=1;z--){
var f=el("div");
f.style.cssText="top:"+(z*5)+"px;transform:scale("+(1-z*0.022)+");opacity:"+(0.5-z*0.14)+";";
pile.appendChild(f);}
document.body.appendChild(pile);}

var box=el("div");
box.id="nx-alerte";
box.setAttribute("data-id",String(cible.id));
box.setAttribute("role","status");

var lis=el("div","nxa-liseret");
lis.style.background="linear-gradient(90deg,"+c+","+_NXSTATUS.teinte(c,.25)+" 62%,transparent)";
box.appendChild(lis);
if(_NXSTATUS.poids(cible.gravite)>=4){
var br=el("div","nxa-brille");box.appendChild(br);}

var inter=el("div","nxa-int");
var past=el("div","nxa-past");
past.style.background=_NXSTATUS.teinte(c,.13);
past.style.border="1px solid "+_NXSTATUS.teinte(c,.3);
past.style.color=c;
var halo=el("div","nxa-halo");
halo.style.background="radial-gradient(circle,"+_NXSTATUS.teinte(c,.4)+",transparent 68%)";
past.appendChild(halo);
past.appendChild(_NXSTATUS.svg(_NXSTATUS.trace(cible.gravite)));
inter.appendChild(past);

var corps=el("div","nxa-corps");
var tete=el("div","nxa-tete");
var g=el("span","nxa-grav",_NXSTATUS.gravFr(cible.gravite));g.style.color=c;
tete.appendChild(g);
var etats={enquete:"En cours d\u2019analyse",identifie:"Cause identifi\u00e9e",surveille:"Sous surveillance"};
if(etats[cible.etat])tete.appendChild(el("span","nxa-etat",etats[cible.etat]));
if(restantes.length>1)tete.appendChild(el("span","nxa-compte","1 sur "+restantes.length));
corps.appendChild(tete);
corps.appendChild(el("div","nxa-titre",String(cible.titre||"")));
corps.appendChild(el("div","nxa-txt",String(cible.resume||"").slice(0,340)));

var meta=el("div","nxa-meta");
var age=_NXSTATUS.depuis(cible.debut);
if(age)meta.appendChild(el("span","nxa-et",age));
if(cible.composant)meta.appendChild(el("span","nxa-et",String(cible.composant)));
if(cible.versions_touchees)meta.appendChild(el("span","nxa-et","Versions : "+cible.versions_touchees));
if(cible.correctif)meta.appendChild(el("span","nxa-et","Corrig\u00e9 en "+cible.correctif));
if(meta.childNodes.length)corps.appendChild(meta);

// Le fil des mises a jour : les deux dernieres, pas plus.
try{
var M=cible.maj;
if(M&&M.length>1){
var fil=el("div","nxa-fil");
var deb=Math.max(0,M.length-2);
for(var k=deb;k<M.length;k++){
var ligne=el("div");
var quand=el("b",null,_NXSTATUS.depuis(M[k].a)||"");
ligne.appendChild(quand);
ligne.appendChild(document.createTextNode(" \u00b7 "+String(M[k].texte||"").slice(0,160)));
ligne.style.animationDelay=((k-deb)*70)+"ms";
fil.appendChild(ligne);}
corps.appendChild(fil);}}catch(_){}

var actes=el("div","nxa-actes");
var bouton=function(cls,txt,trace,fn){
var b=document.createElement("button");
b.type="button";b.className="nxa-b "+cls;
if(trace)b.appendChild(_NXSTATUS.svg(trace));
b.appendChild(document.createTextNode(_NXtr(txt)));
b.onclick=fn;return b;};
actes.appendChild(bouton("nxa-b1","Voir le statut",
"M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z",
function(){_NXSTATUS.ouvrePage();}));
if(window._NXIA)actes.appendChild(bouton("nxa-b2","Expliquer",
"M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z",
function(){_NXSTATUS.expliquer(cible);_NXSTATUS.retire();}));
actes.appendChild(bouton("nxa-b3","Plus tard",null,function(){
try{_NXSTATUS.reporte(cible.id);}catch(_){}_NXSTATUS.retire(true);}));
actes.appendChild(bouton("nxa-b2",restantes.length>1?"Suivante":"J\u2019ai compris",null,function(){
try{_NXSTATUS.marque(cible.id);}catch(_){}_NXSTATUS.retire(true);}));
corps.appendChild(actes);
inter.appendChild(corps);
box.appendChild(inter);

var x=el("div","nxa-x","\u00d7");
x.setAttribute("role","button");
x.setAttribute("aria-label",_NXtr("Fermer"));
x.onclick=function(){try{_NXSTATUS.marque(cible.id);}catch(_){}_NXSTATUS.retire();};
box.appendChild(x);
document.body.appendChild(box);}catch(_){}};
// Sortir en douceur, puis eventuellement montrer la suivante.
_NXSTATUS.retire=function(suite){try{
var b=document.getElementById("nx-alerte");
if(!b){if(suite)_NXSTATUS.affiche();return;}
b.className="nxa-part";
setTimeout(function(){try{_NXSTATUS.ferme();if(suite)_NXSTATUS.affiche();}catch(_){}},240);
}catch(_){_NXSTATUS.ferme();}};
_NXSTATUS.MIN=12000;
_NXSTATUS.rafraichis=function(force){try{
if(!force&&_NXSTATUS.at&&(Date.now()-_NXSTATUS.at)<_NXSTATUS.MIN)return;
_NXSTATUS.charge();}catch(_){}};

// --------------------------------------------------------------- le direct
// Le sondage seul faisait attendre jusqu a deux minutes. La table des
// alertes est diffusee : une ligne posee arrive ici en une seconde. Si la
// liaison ne s etablit pas -- reseau ferme, proxy, service en panne -- le
// sondage continue de son cote et rien n est perdu.
_NXSTATUS.rt=null;_NXSTATUS.rtEtat="inactif";_NXSTATUS.rtEssais=0;
_NXSTATUS.rtBat=null;_NXSTATUS.rtRef=0;_NXSTATUS.rtAu=0;
_NXSTATUS.rtFerme=function(){try{
if(_NXSTATUS.rtBat){clearInterval(_NXSTATUS.rtBat);_NXSTATUS.rtBat=null;}
if(_NXSTATUS.rt){try{_NXSTATUS.rt.onclose=null;_NXSTATUS.rt.close();}catch(_){}_NXSTATUS.rt=null;}
}catch(_){}};
_NXSTATUS.direct=function(){try{
if(typeof WebSocket!=="function")return false;
if(_NXSTATUS.rt)return true;
if(window._NXECO&&_NXECO.actif&&_NXECO.actif()&&_NXECO.cfg&&_NXECO.cfg.legerReseau)return false;
var u=_NXSTATUS.URL.replace(/^http/,"ws")+"/realtime/v1/websocket?apikey="+
encodeURIComponent(_NXSTATUS.CLE)+"&vsn=1.0.0";
var w=new WebSocket(u);
_NXSTATUS.rt=w;_NXSTATUS.rtEtat="connexion";
w.onopen=function(){try{
_NXSTATUS.rtEtat="ouvert";_NXSTATUS.rtEssais=0;
w.send(JSON.stringify({topic:"realtime:nx-alertes",event:"phx_join",
payload:{config:{postgres_changes:[{event:"*",schema:"public",table:"nx_alertes"}]}},
ref:String(++_NXSTATUS.rtRef)}));
_NXSTATUS.rtBat=setInterval(function(){try{
if(!_NXSTATUS.rt||_NXSTATUS.rt.readyState!==1)return;
_NXSTATUS.rt.send(JSON.stringify({topic:"phoenix",event:"heartbeat",payload:{},ref:String(++_NXSTATUS.rtRef)}));
}catch(_){}},28000);
}catch(_){}};
w.onmessage=function(ev){try{
var m=JSON.parse(ev.data);
if(m&&m.event==="system"&&m.payload&&m.payload.status==="ok")_NXSTATUS.rtEtat="abonne";
if(m&&m.event==="postgres_changes"){
_NXSTATUS.rtAu=Date.now();
// On ne fait pas confiance a la charge utile pour reconstruire l etat :
// on relit la liste, une seule fois, tout de suite.
_NXSTATUS.charge();}
}catch(_){}};
w.onerror=function(){try{_NXSTATUS.rtEtat="erreur";}catch(_){}};
w.onclose=function(){try{
_NXSTATUS.rt=null;_NXSTATUS.rtEtat="ferme";
if(_NXSTATUS.rtBat){clearInterval(_NXSTATUS.rtBat);_NXSTATUS.rtBat=null;}
// Reprise progressive : 5 s, 10 s, 20 s... jusqu a 5 minutes. Au-dela de
// dix essais on abandonne le direct : le sondage suffit.
_NXSTATUS.rtEssais++;
if(_NXSTATUS.rtEssais>10){_NXSTATUS.rtEtat="abandonne";return;}
var d=Math.min(300000,5000*Math.pow(2,_NXSTATUS.rtEssais-1));
setTimeout(function(){if(!document.hidden)_NXSTATUS.direct();},d);
}catch(_){}};
return true;}catch(_){_NXSTATUS.rt=null;_NXSTATUS.rtEtat="indisponible";return false;}};
_NXSTATUS.etatDirect=function(){try{
return {etat:_NXSTATUS.rtEtat,essais:_NXSTATUS.rtEssais,
dernier:_NXSTATUS.rtAu,ouvert:!!(_NXSTATUS.rt&&_NXSTATUS.rt.readyState===1)};}catch(_){return {};}};
try{setTimeout(function(){_NXSTATUS.charge();},4000);
setTimeout(function(){_NXSTATUS.direct();},6000);
setInterval(function(){if(!document.hidden)_NXSTATUS.rafraichis(true);},30000);
document.addEventListener("visibilitychange",function(){if(!document.hidden){_NXSTATUS.rafraichis();_NXSTATUS.direct();}});
window.addEventListener("focus",function(){_NXSTATUS.rafraichis();});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXSTATUS");if(window._NXERR)_NXERR.push("module _NXSTATUS :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXSTATUS desactive:",_nxE);}catch(_){}}
}var _NXADMIN=window._NXADMIN||(window._NXADMIN={});
