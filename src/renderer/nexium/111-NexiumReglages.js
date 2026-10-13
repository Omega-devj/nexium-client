var NexiumReglagesIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("reglages",z):null;};
function NexiumReglagesComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _s0=F.useState("general");var tab=_s0[0];var setTab=_s0[1];
var _s1=F.useState("");var attente=_s1[0];var setAttente=_s1[1];
var _s2=F.useState(false);var part=_s2[0];var setPart=_s2[1];
var _s3=F.useState("");var colle=_s3[0];var setColle=_s3[1];
var _s4=F.useState(null);var verdict=_s4[0];var setVerdict=_s4[1];
var _s5=F.useState(false);var raz=_s5[0];var setRaz=_s5[1];
var _s6=F.useState(false);var voirDiag=_s6[0];var setVoirDiag=_s6[1];
F.useEffect(function(){
var vivant=true;
var maj=function(){if(vivant)force();};
var M=["_NXREG","_NXDEM","_NXECO","_NXSKIN","_NXBG","_NXDATA"];
for(var a=0;a<M.length;a++){try{var o=window[M[a]];if(o&&o.listeners)o.listeners.push(maj);}catch(_){}}
// Le compte a rebours des icones : seulement quand il y en a un.
var iv=setInterval(function(){try{if(window._NXUA&&_NXUA.status().reprise>0)maj();}catch(_){}},1000);
return function(){vivant=false;try{clearInterval(iv);}catch(_){}
for(var b=0;b<M.length;b++){try{var o2=window[M[b]];
if(o2&&o2.listeners)o2.listeners=o2.listeners.filter(function(f){return f!==maj;});}catch(_){}}};},[]);
var P=_NXpal;
if(!window._NXREG||!_NXREG.boot)return i(Kr,null,i("div",{style:{maxWidth:"700px",margin:"0 auto"}},
_NXhead(_T("Le client"),_NXtr("Nexium Réglages"),_T("Le module des reglages n a pas demarre sur ce client."))));
var lg=_NXREG.langue();
var ver=(window._NXUP&&_NXUP.VERSION)||"?";
var ua=null;try{ua=(window._NXUA&&_NXUA.status)?_NXUA.status():null;}catch(_){}
var safe={actif:false,coupes:[]};try{if(window._NXSAFE)safe=_NXSAFE.etat();}catch(_){}
var sante={total:0,vivants:0};try{if(window._NXDATA&&_NXDATA.sante)sante=_NXDATA.sante();}catch(_){}
var NOMS={auto:_T("Automatique"),fr:"Français",en:"English"};
function nomL(l){return NOMS[l]||l;}
function avis(t,ty){try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(t),ty===undefined?1:ty);}catch(_){}}
function bascule(on,fn,danger){return _NXtoggle(!!on,function(){try{fn();}catch(_){}force();},danger);}
function pastille(label,on,fn){return _NXpill(_NXtr(label),on,function(){try{fn();}catch(_){}force();});}
function aller(k){try{if(window._NXCP&&_NXCP.goto&&_NXCP.goto(k))return;}catch(_){}
avis(_T("Ouvre cette page dans la colonne de gauche."),2);}
function rangee(o){return _NXFX.rangee(o);}
function btn(o){return i("div",{key:o.key||o.t},_NXFX.bouton(o));}
function rang(enfants){return i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},_NXtr(enfants));}
function encadre(col,titre,texte,actions){
return i("div",{style:{marginTop:"14px",padding:"15px 16px",borderRadius:"14px",
background:_NXteinte(col,8),border:"1px solid "+_NXteinte(col,26)}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",color:col,fontSize:"12.5px",fontWeight:"800",marginBottom:"6px"}},
_NXFX.svg("alerte",15),_NXtr(titre)),
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.65,marginBottom:actions?"12px":"0"}},_NXtr(texte)),
_NXtr(actions)||null);}

// ---------------------------------------------------------------- general
function carteLangue(){
var OPTS=[
{k:"auto",sigle:"AUTO",titre:_T("Automatique"),sous:_T("Suit la langue de Discord")+" · "+nomL(lg.discord)},
{k:"fr",sigle:"FR",titre:"Français",sous:_T("Tout Nexium en francais")},
{k:"en",sigle:"EN",titre:"English",sous:_T("Tout Nexium en anglais")}];
var cible=attente?_NXREG.effective(attente):"";
var cov=(_NXI.COUVERTURE&&typeof _NXI.COUVERTURE.en==="number")?_NXI.COUVERTURE.en:null;
return _NXcard(i("div",null,
_NXch(_T("Langue"),_T("La langue de toutes les pages Nexium. Changer de langue redemarre Nexium : beaucoup de textes sont poses au chargement, c est la seule facon de tous les traduire.")),
i("div",{role:"radiogroup","aria-label":_T("Langue"),
style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))",gap:"10px"}},
OPTS.map(function(o,k){
var sel=(attente||lg.choix)===o.k;
var actuel=lg.choix===o.k;
return i("div",{key:o.k,className:"nx-fx",role:"radio","aria-checked":sel?"true":"false",tabIndex:0,onKeyDown:_NXkey,
"data-nx-rise":String(k+1),
onClick:function(){
if(part)return;
if(o.k===lg.choix){setAttente("");return;}
if(_NXREG.effective(o.k)===lg.active){
_NXREG.changeLangue(o.k);setAttente("");
avis(_T("Enregistre. La langue affichee reste la meme : pas besoin de redemarrer."));return;}
setAttente(o.k);},
style:{position:"relative",overflow:"hidden",padding:"16px",borderRadius:"16px",cursor:"pointer",
background:sel?"linear-gradient(160deg,"+_NXteinte(P.acc,13)+","+_NXteinte(P.acc,4)+")":P.inset,
border:"1px solid "+(sel?_NXteinte(P.acc,48):P.line),
boxShadow:sel?"0 8px 26px "+_NXteinte(P.acc,14):"none",
transition:"background .22s,border-color .22s,box-shadow .22s"}},
i("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",fontWeight:"800",letterSpacing:".14em",
color:sel?P.acc:P.dim,border:"1px solid "+(sel?_NXteinte(P.acc,42):P.hair),borderRadius:"7px",padding:"3px 8px"}},_NXtr(o.sigle)),
actuel?_NXFX.badge(_T("actuelle"),P.ok,{point:true}):
(sel?_NXFX.badge(_T("choisie"),P.warn,{}):null)),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"16px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em"}},_NXtr(o.titre)),
i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"5px",lineHeight:1.5}},_NXtr(o.sous)));})),
attente?_NXtr(encadre(P.warn,
part?_T("Redemarrage en cours…"):_T("Nexium va redemarrer"),
part?_T("Nexium se ferme et se relance dans la nouvelle langue."):
(_T("Passer en")+" "+nomL(cible)+" "+_T("demande de redemarrer Nexium. Ce que tu fais dans Discord sera interrompu quelques secondes.")),
part?null:rang([
btn({key:"go",t:_T("Redemarrer maintenant"),icone:"maj",col:P.warn,plein:true,petit:true,
onClick:function(){setPart(true);var r=_NXREG.changeLangue(attente);
if(!r||!r.ok){setPart(false);avis(_T("La langue n a pas pu etre enregistree."),0);}}}),
btn({key:"non",t:_T("Annuler"),col:P.sub,creux:true,petit:true,onClick:function(){setAttente("");}})]))):null,
cov!==null?i("div",{style:{marginTop:"14px",display:"flex",alignItems:"center",gap:"12px"}},
i("div",{style:{flex:1}},_NXFX.barre(cov,P.acc,4)),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.dim,whiteSpace:"nowrap"}},
_NXtr("English · ")+_NXtr(cov)+" % "+_T("des textes"))):null,
i("div",{style:{marginTop:"12px",fontSize:"11px",color:P.faint,lineHeight:1.6}},
_T("Discord garde sa propre langue : Parametres utilisateur, puis Langue."))),{mb:12});}

function carteDemarrage(){
var D=window._NXDEM,B=window._NXBOOT,W=window._NXWEL;
var L=[];
try{if(D&&D.windows&&D.windows()&&D.dispo&&D.dispo()){
var c=D.lis()||{avecWindows:false,reduit:true};
var dg=D.diagnostic()||{};
L.push(rangee({key:"win",premier:true,icone:"eclair",col:P.info,titre:_T("Lancer Nexium avec Windows"),
texte:dg.texte?_T(dg.texte):_T("A l ouverture de ta session."),
droite:bascule(c.avecWindows,function(){D.set(!c.avecWindows,c.reduit);})}));
if(c.avecWindows)L.push(rangee({key:"red",icone:"moins",col:P.sub,titre:_T("Demarrer reduit"),
texte:_T("Nexium s ouvre dans la barre des taches, sans fenetre au premier plan."),
droite:bascule(c.reduit,function(){D.set(c.avecWindows,!c.reduit);})}));}}catch(_){}
if(B&&B.veut)L.push(rangee({key:"boot",premier:!L.length,icone:"etincelle",col:P.mauve,titre:_T("Animation d ouverture"),
texte:_T("L ecran Nexium pendant que Discord se charge. Coupee, Discord s affiche directement."),
droite:bascule(B.veut(),function(){B.set(!B.veut());})}));
if(W&&W.rejouer)L.push(rangee({key:"acc",premier:!L.length,icone:"accueil",col:P.acc,titre:_T("Ecran d accueil"),
texte:_T("La presentation du premier lancement, a revoir quand tu veux."),
droite:_NXFX.bouton({t:_T("Revoir"),petit:true,creux:true,col:P.sub,onClick:function(){try{W.rejouer();}catch(_){}}})}));
if(!L.length)return null;
return _NXcard(i("div",null,_NXch(_T("Demarrage"),_T("Ce qui se passe quand tu ouvres Nexium.")),_NXtr(L)),{mb:12});}

function carteAvis(){
var v=_NXREG.cfg.toasts;
return _NXcard(i("div",null,
_NXch(_T("Notifications Nexium"),_T("Les petits avis en bas de l ecran. Les avertissements et les alertes de danger passent toujours.")),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"}},
_NXtr(pastille(_T("Toutes"),v==="tout",function(){_NXREG.set("toasts","tout");})),
_NXtr(pastille(_T("Importantes seulement"),v==="importants",function(){_NXREG.set("toasts","importants");}))),
i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.6,marginBottom:"12px"}},
v==="importants"?_T("Les confirmations (copie, enregistre, envoye…) se taisent. Les avertissements et les dangers restent."):
_T("Tout s affiche : confirmations, avertissements et dangers.")),
_NXtr(rang([btn({key:"essai",t:_T("Essayer"),icone:"cloche",petit:true,creux:true,col:P.sub,onClick:function(){
avis(_T("Essai : une confirmation."),1);
setTimeout(function(){avis(_T("Essai : un avertissement."),2);},450);}})]))),{mb:12});}

function carteIcones(){
var U=window._NXUA;if(!U||!ua)return null;
var etat,col;
if(!ua.choix){etat=_T("Desactivees");col=P.faint;}
else if(ua.coupe){etat=_T("Suspendues pour cette session")+" · "+ua.coupe;col=P.warn;}
else if(ua.reprise>0){etat=_T("Nouvel essai dans")+" "+ua.reprise+" s"+(ua.raison?" · "+ua.raison:"");col=P.warn;}
else if(ua.natif){etat=_T("Affichees par Equicord lui-meme")+" · "+ua.registered+" "+_T("bouton(s) de plugin");col=P.ok;}
else if(ua.mounted&&ua.visible){etat=_T(ua.mode==="menu"?"Dans le menu a cote du micro":(ua.mode==="ligne"?"A cote du micro":"Sur une rangee sous ton compte"))+" · "+ua.registered+" "+_T("bouton(s) de plugin");col=P.ok;}
else {etat=_T("En attente de la barre de saisie")+" · "+ua.registered+" "+_T("bouton(s) de plugin");col=P.sub;}
return _NXcard(i("div",null,
_NXch(_T("Icones des plugins"),_T("Les boutons que les plugins ajoutent au panneau de ton compte. Nexium les range sans jamais rien recouvrir : sur une rangee, a cote du micro, ou dans un menu s il manque de place.")),
_NXtr(rangee({premier:true,icone:"grille",col:col,titre:_T("Afficher les icones des plugins"),texte:etat,
droite:bascule(ua.choix,function(){U.setEnabled(!ua.choix);})})),
i("div",{style:{marginTop:"8px"}},_NXtr(rang([
btn({key:"rep",t:_T("Reparer maintenant"),icone:"maj",petit:true,col:P.acc,
onClick:function(){var r=null;try{r=U.repare();}catch(_){}
avis(r&&r.mounted?_T("Icones relancees."):_T("Relance demandee : elles apparaissent des que la barre de saisie est la."));force();}})])))),{mb:12});}

// -------------------------------------------------------------- apparence
function tApparence(){
var S=window._NXSKIN,E=window._NXECO,BG=window._NXBG,MO=window._NXMO;
var L=[];
if(MO)L.push(rangee({key:"mo",premier:true,icone:"etincelle",col:P.mauve,titre:_T("Animer les pages Nexium"),
texte:_T("Cascades, jauges et compteurs. Le reglage systeme de mouvement reduit reste prioritaire."),
droite:bascule(MO.on,function(){MO.set(!MO.on);})}));
if(S&&S.cfg)L.push(rangee({key:"sk",premier:!L.length,icone:"baguette",col:P.acc,titre:_T("Habillage Nexium"),
texte:_T("Les couleurs, la police et les coins du client entier."),
droite:i("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},
_NXFX.bouton({t:_T("Personnaliser"),petit:true,creux:true,col:P.sub,onClick:function(){aller("equicord_themes");}}),
_NXtr(bascule(S.cfg.on,function(){S.toggle();})))}));
var cur=(BG&&BG.cfg&&BG.cfg.on)?String(BG.cfg.color||"").toLowerCase():"";
return i("div",null,
L.length?_NXcard(i("div",null,_NXch(_T("Affichage"),_T("L allure du client.")),_NXtr(L)),{mb:12}):null,
(BG&&BG.SWATCHES)?_NXcard(i("div",null,
_NXch(_T("Fond"),_T("La couleur de fond de Discord. Les textes s ajustent pour rester lisibles.")),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(92px,1fr))",gap:"9px"}},
BG.SWATCHES.map(function(sw,k){
var on=sw.v?(cur===String(sw.v).toLowerCase()):!cur;
return i("div",{key:k,className:"nx-fx",role:"radio","aria-checked":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){try{BG.set(sw.v);}catch(_){}force();},
style:{cursor:"pointer",borderRadius:"13px",padding:"8px",background:P.inset,
border:"1px solid "+(on?_NXteinte(P.acc,55):P.line)}},
i("div",{style:{height:"38px",borderRadius:"9px",border:"1px solid "+P.hair,
background:sw.v||"repeating-linear-gradient(45deg,"+P.panel+" 0 6px,"+P.bg+" 6px 12px)"}}),
i("div",{style:{fontSize:"10.5px",fontWeight:on?"800":"600",color:on?P.txt:P.sub,marginTop:"7px",
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_T(sw.n)));}))),{mb:12}):null,
(E&&E.cfg)?_NXtr((function(){var st=E.status()||{};
return _NXcard(i("div",null,
_NXch(_T("Performances"),_T("Le mode economie allege Nexium sur les machines modestes : moins d animations, reseau en pause, images plus legeres.")),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"}},
_NXtr(pastille(_T("Automatique"),E.cfg.mode==="auto",function(){E.set("mode","auto");})),
_NXtr(pastille(_T("Toujours"),E.cfg.mode==="on",function(){E.set("mode","on");})),
_NXtr(pastille(_T("Jamais"),E.cfg.mode==="off",function(){E.set("mode","off");}))),
i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.6}},
(st.actif?_T("Actif en ce moment."):_T("Inactif en ce moment."))+" "+
_T("Cette machine")+" : "+(_NXtr(st.coeurs)||"?")+" "+_T("coeurs")+(st.memoire?(", "+_NXtr(st.memoire)+_NXtr(" Go")):"")+
(E.cfg.mode==="auto"?(" · "+(st.detecteFaible?_T("jugee modeste"):_T("jugee suffisante"))):""))),{mb:0});})()):null);}

// ----------------------------------------------------------------- client
function tClient(){
var PA=window._NXPATCH;
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Securite du client"),_T("Les mecanismes qui tournent en permanence.")),
PA?_NXtr(rangee({premier:true,icone:"bouclier",col:PA.on?P.ok:P.danger,titre:_T("Interceptions reseau"),
texte:PA.on?_T("Actives : la telemetrie et les fuites sont bloquees avant de partir."):
_T("Coupees : plus rien n est filtre. A reserver a un conflit avec un autre outil."),
droite:bascule(PA.on,function(){PA.set(!PA.on);avis(PA.on?_T("Interceptions reactivees."):_T("Interceptions coupees."),PA.on?1:2);},!PA.on)})):null,
_NXtr(rangee({premier:!PA,icone:safe.actif?"alerte":"bouclierOk",col:safe.actif?P.warn:P.ok,titre:_T("Mode securise"),
texte:safe.actif?(_T("Actif : Discord a redemarre plusieurs fois de suite. Coupe pour cette session")+" : "+(safe.coupes.join(", ")||"—")):
_T("Inactif. Il s enclenche seul si Discord redemarre plusieurs fois de suite, et coupe ce qui touche a l affichage."),
droite:safe.actif?_NXFX.bouton({t:_T("En sortir"),petit:true,col:P.warn,
onClick:function(){try{_NXSAFE.leve();}catch(_){}avis(_T("Mode securise leve. Nexium redemarre."),1);
setTimeout(function(){_NXREG.redemarre();},900);}}):null}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Raccourcis clavier"),_T("Ils marchent partout dans Discord.")),
[["Ctrl + Maj + N",_T("Recherche rapide : pages, actions et reglages Nexium")],
["Ctrl + Maj + M",_T("Masquer ou afficher les zones sensibles avant un partage d ecran")]].map(function(r,k){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"14px",padding:"11px 0",
borderTop:k?"1px solid "+P.line:"none"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",fontWeight:"700",color:P.txt,background:P.inset,
border:"1px solid "+P.hair,borderBottomWidth:"2px",borderRadius:"8px",padding:"5px 9px",whiteSpace:"nowrap"}},_NXtr(r[0])),
i("span",{style:{fontSize:"12px",color:P.sub,lineHeight:1.5}},_NXtr(r[1])));})),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Aller plus loin"),_T("Les reglages detailles vivent dans leurs pages.")),
_NXFX.grille([
["equicord_protect","Nexium Protect",_T("Liens, fichiers, menaces"),"bouclier",P.danger],
["equicord_privacy","Nexium Privacy",_T("Telemetrie et anonymat"),"oeilBarre",P.mauve],
["equicord_network","Nexium Réseau",_T("Latence et stabilite"),"reseau",P.info],
["equicord_data","Nexium Données",_T("Stockage et sauvegardes"),"base",P.lime]].map(function(t,k){
return _NXFX.tuile({key:t[0],icone:t[3],col:t[4],rang:k+1,titre:_NXtr(t[1]),sous:_NXtr(t[2]),onClick:function(){aller(t[0]);}});}),180)),{mb:0}));}

// -------------------------------------------------------------- sauvegarde
function tSauvegarde(){
var D=window._NXDATA;
var pts=[];try{pts=(D&&D.sauvegardes)?D.sauvegardes():[];}catch(_){}
function fin(r){if(!r)return;setVerdict(r);
if(r.ok){avis(r.n+" "+_T("reglage(s) importe(s). Nexium redemarre pour les appliquer."),1);
setTimeout(function(){_NXREG.redemarre();},1600);}}
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Transferer mes reglages"),_T("Emporte ta configuration sur une autre machine. L identite de cette installation, ses sessions et ses caches ne voyagent jamais.")),
_NXtr(rang([
btn({key:"f",t:_T("Enregistrer un fichier"),icone:"telecharge",col:P.acc,plein:true,
onClick:function(){if(!_NXREG.enregistre()){
avis(_NXpresse(_NXREG.exporte())?_T("Enregistrement indisponible : reglages copies a la place."):_T("Export impossible."),2);}}}),
btn({key:"c",t:_T("Copier"),icone:"copie",col:P.sub,creux:true,
onClick:function(){avis(_NXpresse(_NXREG.exporte())?_T("Reglages copies dans le presse-papiers."):_T("Copie impossible."),1);}}),
btn({key:"o",t:_T("Importer un fichier"),icone:"televerse",col:P.sub,creux:true,
onClick:function(){_NXREG.fichier(fin);}})])),
i("div",{style:{marginTop:"16px"}},
_NXFX.champ({k:_T("Ou colle un export"),v:colle,multi:true,lignes:3,mono:true,ph:_NXtr("{\"nexium\":true,…}"),
onChange:function(e){setColle(e.target.value);setVerdict(null);}}),
_NXtr(rang([btn({key:"i",t:_T("Importer ce texte"),icone:"check",petit:true,col:P.acc,off:!colle.trim(),
onClick:function(){fin(_NXREG.importe(colle));}})]))),
verdict?(verdict.ok?_NXtr(encadre(P.ok,_T("Import reussi"),
verdict.n+" "+_T("reglage(s) repris")+(verdict.ignores?(", "+verdict.ignores+" "+_T("ignore(s)")):"")+". "+
(verdict.sauve?_T("Un point de restauration a ete pose juste avant : l import se defait depuis la liste ci-dessous."):"")+" "+
_T("Nexium redemarre…"),null)):
_NXtr(encadre(P.danger,_T("Import refuse"),_T(verdict.err||"Import impossible."),null))):null),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Points de restauration"),_T("Une photo de tes reglages. Nexium en pose une avant chaque import et chaque reinitialisation."),
D&&D.sauvegarder?_NXFX.bouton({t:_T("Creer maintenant"),icone:"plus",petit:true,creux:true,col:P.sub,
onClick:function(){var e=D.sauvegarder(false);avis(e?_T("Point de restauration cree."):_T("Echec : reglages trop volumineux."),e?1:0);force();}}):null),
pts.length?pts.map(function(p,k){
return rangee({key:"p"+k,premier:!k,icone:p.auto?"horloge":"boite",col:p.auto?P.sub:P.acc,
titre:new Date(p.t).toLocaleString(),
texte:p.n+" "+_T("reglage(s)")+" · "+(D.fmtTaille?D.fmtTaille(p.taille||0):"")+" · "+(p.auto?_T("automatique"):_T("manuel")),
droite:_NXFX.bouton({t:_T("Restaurer"),petit:true,creux:true,col:P.sub,onClick:function(){
if(!window.confirm(_T("Revenir a ce point de restauration ? Nexium redemarrera.")))return;
var nn=D.restaurer(k);avis(nn+" "+_T("reglage(s) restaure(s). Nexium redemarre."),1);
setTimeout(function(){_NXREG.redemarre();},1300);}})});}):
_NXFX.vide({icone:"boite",titre:_T("Aucun point de restauration"),texte:_T("Cree le premier maintenant : il ne prend que quelques kilo-octets.")})),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Repartir de zero"),_T("Remet chaque reglage Nexium a sa valeur d origine. Tes statistiques, ton historique, tes comptes et tes repaires ne sont pas touches.")),
raz?_NXtr(encadre(P.danger,_T("Tu es sur ?"),
_T("Un point de restauration est cree juste avant : tu pourras revenir en arriere. Nexium redemarre ensuite."),
rang([btn({key:"oui",t:_T("Reinitialiser"),icone:"poubelle",col:P.danger,plein:true,petit:true,onClick:function(){
var r=_NXREG.reinitialise();setRaz(false);
if(r.ok){avis(r.n+" "+_T("reglage(s) remis a zero. Nexium redemarre."),1);setTimeout(function(){_NXREG.redemarre();},1300);}
else avis(_T(r.err||"Echec."),0);}}),
btn({key:"non",t:_T("Annuler"),col:P.sub,creux:true,petit:true,onClick:function(){setRaz(false);}})]))):
_NXtr(rang([btn({key:"raz",t:_T("Reinitialiser les reglages"),icone:"poubelle",col:P.danger,creux:true,onClick:function(){setRaz(true);}})]))),{mb:0}));}

// --------------------------------------------------------------- a propos
function tAPropos(){
var diag=voirDiag?_NXREG.diagnostic():"";
var ko=[];try{ko=(window._NXHEALTH&&_NXHEALTH.failed)||[];}catch(_){}
return i("div",null,
i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",border:"1px solid "+P.hair,borderRadius:"22px",
background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",padding:"24px",marginBottom:"14px"}},
i("div",{"aria-hidden":"true",style:{position:"absolute",right:"-80px",top:"-90px",width:"260px",height:"260px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(P.acc,16)+",transparent 70%)",pointerEvents:"none"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"18px",flexWrap:"wrap"}},
_NXFX.blason("reglages",P.acc,64),
i("div",{style:{flex:1,minWidth:"180px"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"26px",fontWeight:"800",color:P.txt,letterSpacing:"-.035em"}},_NXtr("Nexium Client")),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11.5px",color:P.dim,marginTop:"5px"}},_NXtr("v")+_NXtr(ver)+" · "+_NXtr(nomL(lg.active))))),
i("div",{style:{position:"relative",display:"flex",gap:"20px",flexWrap:"wrap",marginTop:"20px",paddingTop:"18px",borderTop:"1px solid "+P.line}},
_NXFX.chiffre({k:_T("Modules"),v:sante.total?(sante.vivants+"/"+sante.total):"—",col:ko.length?P.warn:P.ok}),
_NXFX.chiffre({k:_T("Mode securise"),v:safe.actif?_T("oui"):_T("non"),col:safe.actif?P.warn:P.ok}),
_NXFX.chiffre({k:_T("Stockage"),v:(window._NXDB&&_NXDB.mode==="mem")?_T("volatile"):_T("persistant"),
col:(window._NXDB&&_NXDB.mode==="mem")?P.warn:P.ok}),
_NXFX.chiffre({k:_T("Erreurs recentes"),v:String((window._NXERR||[]).length),col:(window._NXERR||[]).length?P.warn:P.ok}))),
_NXcard(i("div",null,
_NXch(_T("Actions"),null),
_NXtr(rang([
btn({key:"maj",t:_T("Verifier les mises a jour"),icone:"maj",col:P.acc,plein:true,
onClick:function(){try{_NXUP.check();avis(_T("Verification en cours…"),1);}catch(_){avis(_T("Verification impossible."),0);}}}),
btn({key:"rd",t:_T("Redemarrer Nexium"),icone:"lecture",col:P.sub,creux:true,
onClick:function(){if(!_NXREG.redemarre())avis(_T("Ferme completement Discord puis rouvre-le."),2);}}),
btn({key:"cl",t:_T("Journal des versions"),icone:"liste",col:P.sub,creux:true,onClick:function(){aller("equicord_changelog");}})]))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Un probleme ?"),_T("Le diagnostic resume l etat du client, sans aucun identifiant ni pseudo. Colle-le dans ton message a ryukuro.")),
_NXtr(rang([
btn({key:"dg",t:voirDiag?_T("Masquer le diagnostic"):_T("Voir le diagnostic"),icone:"pouls",col:P.sub,creux:true,
onClick:function(){setVoirDiag(!voirDiag);}}),
btn({key:"cp",t:_T("Copier le diagnostic"),icone:"copie",col:P.sub,creux:true,
onClick:function(){avis(_NXpresse(_NXREG.diagnostic())?_T("Diagnostic copie."):_T("Copie impossible."),1);}}),
btn({key:"ry",t:_T("Ecrire a ryukuro"),icone:"courrier",col:P.warn,
onClick:function(){try{var r=_NXcontact("ryukuro");
avis(r.ouvert?_T("Conversation ouverte."):_T("Pseudo copie : ajoute ryukuro en ami, puis ecris-lui."),1);}catch(_){}}})])),
voirDiag?i("pre",{style:{margin:"14px 0 0",padding:"13px 14px",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",fontFamily:_NXf.mono,fontSize:"10.5px",color:P.sub,lineHeight:1.65,
whiteSpace:"pre-wrap",wordBreak:"break-word",maxHeight:"280px",overflow:"auto"}},diag):null),{mb:0}));}

var TABS=[["general",_T("General"),"reglages",""],["apparence",_T("Apparence"),"baguette",""],
["client",_T("Client"),"bouclier",safe.actif?"!":""],["sauvegarde",_T("Sauvegarde"),"boite",""],
["apropos",_T("A propos"),"info",""]];
return i(Kr,null,i("div",{style:{maxWidth:"720px",margin:"0 auto"}},
_NXFX.entete({cle:_T("Le client"),titre:_T("Nexium Réglages"),icone:"reglages",col:P.acc,
texte:_T("Tout ce qui regle Nexium lui-meme, au meme endroit : la langue, le demarrage, l allure, la securite et tes sauvegardes."),
marque:_NXtr("v")+_NXtr(ver),
chiffres:[{k:_T("Langue"),v:lg.active.toUpperCase(),col:P.acc},
{k:_T("Modules"),v:sante.total?(sante.vivants+"/"+sante.total):"—",col:P.ok},
{k:_T("Icones"),v:ua?(ua.enabled?_T("oui"):_T("non")):"—",col:ua&&ua.enabled?P.ok:P.warn},
{k:_T("Securise"),v:safe.actif?_T("oui"):_T("non"),col:safe.actif?P.warn:P.ok}]}),
_NXFX.onglets(TABS,tab,function(k){if(k!==tab){setTab(k);setVerdict(null);setRaz(false);}},{col:P.acc}),
tab==="general"?i("div",null,_NXtr(carteLangue()),_NXtr(carteDemarrage()),_NXtr(carteAvis()),_NXtr(carteIcones())):null,
tab==="apparence"?_NXtr(tApparence()):null,
tab==="client"?_NXtr(tClient()):null,
tab==="sauvegarde"?_NXtr(tSauvegarde()):null,
tab==="apropos"?_NXtr(tAPropos()):null));}
