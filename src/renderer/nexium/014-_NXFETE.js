var _NXFETE=window._NXFETE||(window._NXFETE={});
if(!_NXFETE.boot){try{_NXFETE.boot=true;
// La celebration d un abonnement qui s ouvre.
//
// Elle se declenche toute seule : a chaque reponse du serveur, on compare les
// offres actives a celles qu on avait deja vues sur ce compte. Une offre qui
// apparait est une offre offerte ou payee a l instant -- c est le seul moment
// ou il y a quelque chose a feter. La toute premiere comparaison ne fete rien
// et se contente d enregistrer : sinon, tout le monde recevrait des confettis
// le jour de la mise a jour, pour quelque chose qui n a pas change.
//
// Meme discipline visuelle que l ecran d ouverture : ce qui bouge est un
// element HTML transforme, jamais un flou ni une couleur animee, et tout le
// mouvement s efface si le systeme demande moins d animation.
_NXFETE.ID="nx-fete";
_NXFETE.KEY="nexium_abo_vu";
_NXFETE.el=null;
_NXFETE.minuteur=null;
// Meme regle que partout ailleurs dans le client : c est _NXFX qui decide,
// et a defaut on relit les memes trois sources.
_NXFETE.anime=function(){try{
if(window._NXFX&&_NXFX.anime)return _NXFX.anime();
if(!window._NXMO)return false;
if(_NXMO.actif)return _NXMO.actif();
return !!_NXMO.on&&!(_NXMO.reduced&&_NXMO.reduced());}catch(_){return false;}};
_NXFETE.grains=function(){try{
if(!_NXFETE.anime())return 0;
if(window._NXECO&&_NXECO.actif&&_NXECO.actif())return 14;
return 34;}catch(_){return 20;}};

// Ce que chaque offre ouvre reellement, dans les mots de la page. Trois
// lignes : au-dela, ce n est plus une bonne nouvelle, c est un contrat.
_NXFETE.APPORTS={
ia:[["Cent demandes par jour, au lieu de trente",
"Le modele rapide et le modele attentif",
"Les reponses gardent le fil de la conversation"],
["Deux cents demandes par jour",
"Le modele soigne s ajoute aux deux autres",
"L analyse d image et de fichier s ouvre"],
["Quatre cents demandes par jour",
"Tous les modeles, y compris la reflexion longue",
"Aucun palier ne se referme avant l echeance"]],
securite:[["Les pieges a jetons et les fausses pages sont bloques",
"La console est gardee contre le collage d un code",
"Les fichiers douteux ne partent plus en telechargement"],
["L analyse avancee des liens raccourcis et des redirections",
"Le bac a sable ouvre une page sans y aller",
"Les pieces jointes sont pesees avant d etre ouvertes"],
["Le controle des sorties reseau du client",
"Le coffre anti-vol et la quarantaine complete",
"Tout Nexium Protect, sans reglage ferme"]],
privacy:[["La telemetrie de Discord est coupee plus loin",
"Les accuses de lecture et de frappe se taisent",
"Les liens de suivi sont nettoyes avant l ouverture"],
["L empreinte du navigateur est brouillee",
"Les identifiants de session ne sont plus rejoues",
"Les images distantes passent par un relais"],
["Le controle complet des donnees qui sortent",
"L export et l effacement de ce qui est garde ici",
"Tout Nexium Privacy, sans reglage ferme"]],
general:[["Nexium IA, Protect et Privacy montent d un cran",
"Cent demandes par jour a l assistant",
"Le socle protecteur s etend aux pieges connus"],
["Les trois domaines au deuxieme palier",
"Deux cents demandes, et l analyse de fichiers",
"Le bac a sable et l empreinte brouillee"],
["Les trois domaines ouverts en entier",
"Quatre cents demandes, tous les modeles",
"Plus aucun reglage ferme dans le client"]]};
_NXFETE.apport=function(fam,rang){try{
var t=_NXFETE.APPORTS[fam]||_NXFETE.APPORTS.general;
var k=Math.max(1,Math.min(3,rang||1))-1;
return t[k]||t[0];}catch(_){return [];}};
// La famille et le rang se lisent dans la cle de l offre : le client n a pas
// besoin du catalogue pour dire ce qu il vient de recevoir.
// Le meme mot ne vaut pas le meme rang partout : "plus" est le premier
// palier du general et de l IA, mais le deuxieme de Privacy et de Security.
// On lit donc une table, on ne devine pas.
_NXFETE.RANGS={plus:1,pro:2,ultra:3,
ia_plus:1,ia_pro:2,ia_ultra:3,
pv_one:1,pv_plus:2,pv_extra:3,
se_one:1,se_plus:2,se_extra:3};
_NXFETE.devine=function(cle){try{
var c=String(cle||"");
var fam=c.indexOf("ia_")===0?"ia":(c.indexOf("pv_")===0?"privacy":
(c.indexOf("se_")===0?"securite":"general"));
return {famille:fam,rang:_NXFETE.RANGS[c]||1};}catch(_){return {famille:"general",rang:1};}};

_NXFETE.css=function(){return ""+
"#nx-fete{position:fixed;inset:0;z-index:2147483644;display:flex;"+
"align-items:center;justify-content:center;padding:24px;"+
"font-family:'gg sans','Noto Sans',Helvetica,Arial,sans-serif;"+
"background:rgba(4,4,6,.74);opacity:1;"+
"transition:opacity .32s cubic-bezier(.32,0,.24,1);}"+
"#nx-fete.nxg-part{opacity:0;pointer-events:none;}"+
"#nx-fete.nxg-part .nxg-carte{transform:translateY(14px) scale(.95);"+
"transition:transform .32s cubic-bezier(.32,0,.24,1);}"+
"#nx-fete *{box-sizing:border-box;}"+
// --- l eclat du premier instant --------------------------------------------
// Une seule nappe blanche, opacite seule : le compositeur ne redessine rien.
"#nx-fete .nxg-flash{position:absolute;inset:0;pointer-events:none;opacity:0;"+
"background:radial-gradient(46% 40% at 50% 46%,rgba(255,255,255,.42),transparent 70%);}"+
// --- la carte --------------------------------------------------------------
"#nx-fete .nxg-cadre{position:relative;width:min(438px,100%);"+
"max-height:calc(100vh - 48px);}"+
// Le liseré : un balayage conique qui tourne derriere la carte, et que la
// carte recouvre partout sauf sur un cheveu de bord.
"#nx-fete .nxg-liseret{position:absolute;inset:-1px;border-radius:21px;"+
"overflow:hidden;pointer-events:none;}"+
"#nx-fete .nxg-liseret i{position:absolute;left:50%;top:50%;width:150%;"+
"padding-bottom:150%;margin:-75% 0 0 -75%;display:block;"+
"background:conic-gradient(from 0deg,transparent 0deg,rgba(255,255,255,.50) 26deg,"+
"transparent 62deg,transparent 180deg,rgba(199,162,238,.42) 208deg,transparent 250deg);"+
"will-change:transform;transform:translateZ(0);}"+
"#nx-fete .nxg-carte{position:relative;"+
"background:linear-gradient(180deg,#141418,#0b0b0d);"+
"border:1px solid rgba(255,255,255,.09);border-radius:20px;"+
"box-shadow:0 34px 96px rgba(0,0,0,.70);padding:32px 28px 24px;"+
"max-height:calc(100vh - 48px);overflow-x:hidden;overflow-y:auto;"+
"text-align:center;color:#f4f4f5;}"+
"#nx-fete .nxg-halo{position:absolute;left:50%;top:-40%;width:150%;"+
"padding-bottom:150%;margin-left:-75%;pointer-events:none;border-radius:50%;"+
"background:conic-gradient(from 0deg,rgba(199,162,238,.22),rgba(127,211,196,.10),"+
"rgba(233,163,193,.20),rgba(195,217,138,.08),rgba(199,162,238,.22));"+
"-webkit-mask-image:radial-gradient(closest-side,#000 22%,transparent 64%);"+
"mask-image:radial-gradient(closest-side,#000 22%,transparent 64%);"+
"will-change:transform;transform:translateZ(0);}"+
"#nx-fete .nxg-dedans{position:relative;}"+
// --- le sceau --------------------------------------------------------------
"#nx-fete .nxg-boite{position:relative;width:92px;height:92px;margin:0 auto 22px;}"+
// Les rayons : une roue de traits fins, masquee en couronne.
"#nx-fete .nxg-rayons{position:absolute;left:50%;top:50%;width:280px;height:280px;"+
"margin:-140px 0 0 -140px;pointer-events:none;opacity:.34;"+
"background:repeating-conic-gradient(from 0deg,rgba(255,255,255,.42) 0deg,"+
"rgba(255,255,255,.42) 1.4deg,transparent 1.4deg,transparent 15deg);"+
"-webkit-mask-image:radial-gradient(closest-side,transparent 28%,#000 46%,transparent 78%);"+
"mask-image:radial-gradient(closest-side,transparent 28%,#000 46%,transparent 78%);"+
"will-change:transform;transform:translateZ(0);}"+
"#nx-fete .nxg-sceau{position:absolute;inset:5px;"+
"border-radius:50%;border:1px solid rgba(255,255,255,.18);"+
"background:radial-gradient(circle at 50% 32%,rgba(255,255,255,.16),rgba(255,255,255,.03));"+
"display:flex;align-items:center;justify-content:center;"+
"will-change:transform;}"+
"#nx-fete .nxg-anneau{position:absolute;inset:-6px;border-radius:50%;"+
"border:1px solid transparent;border-top-color:rgba(255,255,255,.60);"+
"border-right-color:rgba(255,255,255,.15);"+
"will-change:transform;transform:translateZ(0);}"+
// Trois ondes qui s ecartent du sceau, trois fois, puis se taisent.
"#nx-fete .nxg-onde{position:absolute;inset:5px;border-radius:50%;"+
"border:1px solid rgba(255,255,255,.34);pointer-events:none;opacity:0;"+
"will-change:transform,opacity;}"+
"#nx-fete .nxg-sceau svg{position:relative;}"+
// --- le texte --------------------------------------------------------------
"#nx-fete .nxg-sur{font-size:10.5px;font-weight:800;letter-spacing:.22em;"+
"text-transform:uppercase;color:#8a8a92;margin-bottom:10px;}"+
"#nx-fete .nxg-nom{position:relative;overflow:hidden;font-size:28px;font-weight:800;"+
"letter-spacing:-.03em;line-height:1.14;margin-bottom:8px;padding:1px 0;}"+
// Le sillage : une bande claire qui traverse le titre. Elle ne fait que se
// deplacer -- aucun degrade n est recalcule.
"#nx-fete .nxg-nom::after{content:'';position:absolute;top:0;bottom:0;left:0;width:32%;"+
"pointer-events:none;transform:translate3d(-190%,0,0);will-change:transform;"+
"background:linear-gradient(100deg,transparent,rgba(255,255,255,.19),transparent);}"+
"#nx-fete .nxg-sous{font-size:13px;color:#a6a6ac;line-height:1.6;"+
"margin:0 auto 20px;max-width:334px;}"+
"#nx-fete .nxg-liste{text-align:left;border:1px solid rgba(255,255,255,.08);"+
"border-radius:13px;padding:11px 15px;background:rgba(255,255,255,.022);"+
"margin-bottom:18px;}"+
"#nx-fete .nxg-li{display:flex;gap:9px;align-items:flex-start;"+
"font-size:12.5px;color:#c9c9d2;line-height:1.5;padding:5px 0;}"+
"#nx-fete .nxg-li s{flex:0 0 auto;width:5px;height:5px;margin-top:6px;"+
"border-radius:50%;background:rgba(255,255,255,.45);text-decoration:none;}"+
"#nx-fete .nxg-ech{font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;"+
"font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;color:#6c6c74;"+
"margin-bottom:18px;}"+
// --- les boutons -----------------------------------------------------------
"#nx-fete .nxg-actions{display:flex;gap:9px;justify-content:center;flex-wrap:wrap;}"+
"#nx-fete .nxg-b{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.14);"+
"border-radius:10px;padding:10px 18px;font-size:12.5px;font-weight:700;cursor:pointer;"+
"background:transparent;color:#c9c9d2;font-family:inherit;"+
"transition:background .18s ease,color .18s ease,border-color .18s ease,transform .18s ease;}"+
"#nx-fete .nxg-b:hover{background:rgba(255,255,255,.07);color:#f4f4f5;transform:translateY(-1px);}"+
"#nx-fete .nxg-b1{background:#f4f4f5;color:#0a0a0a;border-color:#f4f4f5;}"+
"#nx-fete .nxg-b1:hover{background:#fff;color:#0a0a0a;}"+
"#nx-fete .nxg-b1::after{content:'';position:absolute;top:0;bottom:0;left:0;width:38%;"+
"pointer-events:none;transform:translate3d(-190%,0,0);will-change:transform;"+
"background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);}"+
// --- les particules --------------------------------------------------------
// Deux familles : ce qui tombe, et ce qui monte. Ensemble elles remplissent
// l ecran sans qu aucune des deux n ait besoin d etre nombreuse.
"#nx-fete .nxg-pluie{position:absolute;inset:0;overflow:hidden;pointer-events:none;}"+
"#nx-fete .nxg-g{position:absolute;top:-24px;width:7px;height:11px;border-radius:2px;"+
"will-change:transform;transform:translate3d(0,-60px,0);}"+
"#nx-fete .nxg-e{position:absolute;bottom:-14px;width:4px;height:4px;border-radius:50%;"+
"will-change:transform,opacity;transform:translate3d(0,20px,0);opacity:0;}"+
// --- le mouvement ----------------------------------------------------------
"#nx-fete.nxg-vif .nxg-flash{animation:nxg-eclair .70s cubic-bezier(.2,.8,.3,1) both;}"+
"#nx-fete.nxg-vif .nxg-liseret i{animation:nxg-tourne 7.5s linear infinite;}"+
"#nx-fete.nxg-vif .nxg-carte{animation:nxg-arrive .74s cubic-bezier(.16,1.12,.3,1) both;}"+
"#nx-fete.nxg-vif .nxg-halo{animation:nxg-tourne 16s linear infinite;}"+
"#nx-fete.nxg-vif .nxg-rayons{animation:nxg-jaillit 1.1s cubic-bezier(.16,1,.3,1) .06s both,"+
"nxg-tourne 26s linear 1.1s infinite;}"+
"#nx-fete.nxg-vif .nxg-anneau{animation:nxg-tourne 4.6s linear infinite;}"+
"#nx-fete.nxg-vif .nxg-sceau{animation:nxg-pop .82s cubic-bezier(.16,1.6,.3,1) .10s both,"+
"nxg-flotte 4.4s ease-in-out .92s infinite;}"+
"#nx-fete.nxg-vif .nxg-onde{animation:nxg-onde 2.1s cubic-bezier(.22,.6,.3,1) 3 both;}"+
"#nx-fete.nxg-vif .nxg-o2{animation-delay:.62s;}"+
"#nx-fete.nxg-vif .nxg-o3{animation-delay:1.24s;}"+
"#nx-fete.nxg-vif .nxg-sur{animation:nxg-monte .6s cubic-bezier(.2,.9,.3,1) .20s both;}"+
"#nx-fete.nxg-vif .nxg-nom{animation:nxg-monte .6s cubic-bezier(.2,.9,.3,1) .26s both;}"+
"#nx-fete.nxg-vif .nxg-nom::after{animation:nxg-sillage 4.2s cubic-bezier(.5,0,.5,1) 1s infinite;}"+
"#nx-fete.nxg-vif .nxg-sous{animation:nxg-monte .6s cubic-bezier(.2,.9,.3,1) .32s both;}"+
"#nx-fete.nxg-vif .nxg-liste{animation:nxg-monte .6s cubic-bezier(.2,.9,.3,1) .38s both;}"+
"#nx-fete.nxg-vif .nxg-li{animation:nxg-glisse .55s cubic-bezier(.2,.9,.3,1) both;}"+
"#nx-fete.nxg-vif .nxg-li:nth-child(1){animation-delay:.46s;}"+
"#nx-fete.nxg-vif .nxg-li:nth-child(2){animation-delay:.54s;}"+
"#nx-fete.nxg-vif .nxg-li:nth-child(3){animation-delay:.62s;}"+
"#nx-fete.nxg-vif .nxg-li:nth-child(4){animation-delay:.70s;}"+
"#nx-fete.nxg-vif .nxg-ech{animation:nxg-monte .6s cubic-bezier(.2,.9,.3,1) .70s both;}"+
"#nx-fete.nxg-vif .nxg-actions{animation:nxg-monte .6s cubic-bezier(.2,.9,.3,1) .78s both;}"+
"#nx-fete.nxg-vif .nxg-b1::after{animation:nxg-sillage 3.6s cubic-bezier(.5,0,.5,1) 1.6s infinite;}"+
"#nx-fete.nxg-vif .nxg-g{animation:nxg-chute var(--d,3s) cubic-bezier(.28,.42,.62,1) var(--r,0s) both;}"+
"#nx-fete.nxg-vif .nxg-e{animation:nxg-monte-etincelle var(--d,3s) cubic-bezier(.3,.5,.4,1) var(--r,0s) both;}"+
"@keyframes nxg-eclair{0%{transform:scale(.7);opacity:0}"+
"26%{opacity:.85}100%{transform:scale(1.5);opacity:0}}"+
"@keyframes nxg-arrive{from{transform:translateY(30px) scale(.90)}to{transform:none}}"+
"@keyframes nxg-monte{from{transform:translateY(10px)}to{transform:none}}"+
"@keyframes nxg-glisse{from{transform:translateX(-9px)}to{transform:none}}"+
"@keyframes nxg-pop{from{transform:scale(.58)}to{transform:none}}"+
"@keyframes nxg-flotte{0%{transform:translateY(0)}50%{transform:translateY(-3.5px)}"+
"100%{transform:translateY(0)}}"+
"@keyframes nxg-jaillit{from{transform:scale(.34);opacity:0}to{transform:none;opacity:.34}}"+
"@keyframes nxg-onde{0%{transform:scale(1);opacity:.55}"+
"100%{transform:scale(2.5);opacity:0}}"+
"@keyframes nxg-tourne{to{transform:rotate(360deg)}}"+
"@keyframes nxg-sillage{0%{transform:translate3d(-190%,0,0)}"+
"46%{transform:translate3d(280%,0,0)}100%{transform:translate3d(280%,0,0)}}"+
"@keyframes nxg-chute{0%{transform:translate3d(0,-60px,0) rotate(0)}"+
"52%{transform:translate3d(var(--m,0px),46vh,0) rotate(calc(var(--t,540deg) / 2))}"+
"100%{transform:translate3d(var(--x,0px),108vh,0) rotate(var(--t,540deg))}}"+
"@keyframes nxg-monte-etincelle{0%{transform:translate3d(0,20px,0) scale(.5);opacity:0}"+
"18%{opacity:.9}72%{opacity:.7}"+
"100%{transform:translate3d(var(--x,0px),-84vh,0) scale(1);opacity:0}}"+
"@media (prefers-reduced-motion: reduce){#nx-fete *{animation:none!important;}}";};

_NXFETE.COULEURS=["#c7a2ee","#7fd3c4","#e9a3c1","#c3d98a","#f4f4f5","#8fb4ea"];
// Deux familles : des confettis qui tombent en tournant, et des
// etincelles qui montent. Chacune tire ses chiffres au hasard une seule
// fois, a la pose -- ensuite le compositeur travaille seul.
_NXFETE.pluie=function(){try{
var n=_NXFETE.grains();
if(!n)return "";
var h="",a,al=function(){return Math.random();};
for(a=0;a<n;a++){
var g=al()*100;
var d=(2.6+al()*2.4).toFixed(2);
var r=(al()*1.6).toFixed(2);
var x=Math.round((al()*210)-105);
var m=Math.round(x*(0.25+al()*0.5))+Math.round((al()*60)-30);
var t=Math.round(320+al()*820);
var c=_NXFETE.COULEURS[a%_NXFETE.COULEURS.length];
var w=(5+Math.round(al()*4));
h+='<i class="nxg-g" style="left:'+g.toFixed(1)+'%;background:'+c+';'+
'width:'+w+'px;height:'+(w+4)+'px;'+
'opacity:'+(0.5+al()*0.5).toFixed(2)+';'+
'--d:'+d+'s;--r:'+r+'s;--x:'+x+'px;--m:'+m+'px;--t:'+t+'deg"></i>';}
var e=Math.max(6,Math.round(n*0.42));
for(a=0;a<e;a++){
var g2=al()*100;
var d2=(3.2+al()*2.6).toFixed(2);
var r2=(al()*2.4).toFixed(2);
var x2=Math.round((al()*120)-60);
var c2=_NXFETE.COULEURS[(a+2)%_NXFETE.COULEURS.length];
h+='<i class="nxg-e" style="left:'+g2.toFixed(1)+'%;background:'+c2+';'+
'box-shadow:0 0 8px '+c2+';'+
'--d:'+d2+'s;--r:'+r2+'s;--x:'+x2+'px"></i>';}
return h;}catch(_){return "";}};

_NXFETE.ferme=function(){try{
var d=_NXFETE.el;
if(!d)return;
_NXFETE.el=null;
if(_NXFETE.minuteur){clearTimeout(_NXFETE.minuteur);_NXFETE.minuteur=null;}
try{if(_NXFETE._clav)document.removeEventListener("keydown",_NXFETE._clav,true);}catch(_){}
try{d.className=(d.className+" nxg-part").replace(/^ /,"");}catch(_){}
setTimeout(function(){try{
if(d&&d.parentNode)d.parentNode.removeChild(d);
// La feuille ne part que si plus aucune carte ne s en sert : rouvrir avant
// la fin du fondu laissait la nouvelle carte sans style.
if(!_NXFETE.el){
var s=document.getElementById("nx-fete-style");
if(s&&s.parentNode)s.parentNode.removeChild(s);}}catch(_){}},340);}catch(_){}};

// o : {nom, cle, expire, cadeau, titre}
_NXFETE.montre=function(o){try{
o=o||{};
// La fete attend son tour comme les autres : elle se rejoue de toute facon
// depuis la page Abonnement si elle est passee a cote.
if(!o.force&&window._NXQ&&!_NXQ.libre())return false;
if(window._NXQ)_NXQ.reserve("fete");
if(_NXFETE.el)_NXFETE.ferme();
// Une carte encore en cours de fondu doit partir tout de suite : deux
// elements ne peuvent pas porter le meme identifiant.
try{var _v=document.getElementById(_NXFETE.ID);
if(_v&&_v.parentNode)_v.parentNode.removeChild(_v);}catch(_){}
if(!document.body)return false;
try{if(String(location.pathname||"").indexOf("popout")>=0)return false;}catch(_){}
var g=_NXFETE.devine(o.cle||"");
var lignes=o.lignes||_NXFETE.apport(g.famille,g.rang);
if(!document.getElementById("nx-fete-style")){
var st=document.createElement("style");
st.id="nx-fete-style";st.textContent=_NXFETE.css();
(document.head||document.documentElement).appendChild(st);}
var d=document.createElement("div");
d.id=_NXFETE.ID;
d.setAttribute("role","dialog");
d.setAttribute("aria-label",_NXtr("Abonnement active"));
var li="",a;
for(a=0;a<lignes.length;a++)
li+='<div class="nxg-li"><s></s><span>'+_NXFETE.ech(lignes[a])+'</span></div>';
var ech="";
if(o.expire){var j=null;
try{j=(window._NXABO&&_NXABO.jours)?_NXABO.jours(o.expire):null;}catch(_){}
ech=_NXFETE.dateFr(o.expire);
if(j!==null)ech+="  "+String.fromCharCode(0xB7)+"  "+j+" jour"+(j>1?"s":"")+" restant"+(j>1?"s":"");}
d.innerHTML=
_NXtrHtml('<div class="nxg-flash"></div>'+
'<div class="nxg-pluie">'+_NXFETE.pluie()+'</div>'+
'<div class="nxg-cadre">'+
'<div class="nxg-liseret"><i></i></div>'+
'<div class="nxg-carte"><div class="nxg-halo"></div><div class="nxg-dedans">'+
'<div class="nxg-boite">'+
'<div class="nxg-rayons"></div>'+
'<div class="nxg-onde nxg-o1"></div><div class="nxg-onde nxg-o2"></div>'+
'<div class="nxg-onde nxg-o3"></div>'+
'<div class="nxg-sceau"><div class="nxg-anneau"></div>'+
'<svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="#f4f4f5" '+
'stroke-width="8" stroke-linecap="square"><path d="M28 72 V28 L72 72 V28"/></svg></div></div>'+
'<div class="nxg-sur">'+_NXFETE.ech(o.titre||(o.cadeau?"Un cadeau pour toi":"Abonnement active"))+'</div>'+
'<div class="nxg-nom">'+_NXFETE.ech(o.nom||"Nexium")+'</div>'+
'<div class="nxg-sous">'+_NXFETE.ech(o.sous||
(o.cadeau?"Quelqu un de l equipe vient de te l offrir. Il est deja actif sur ce client.":
"C est actif tout de suite, sur ce client comme sur les autres."))+'</div>'+
(li?('<div class="nxg-liste">'+li+'</div>'):"")+
(ech?('<div class="nxg-ech">'+_NXFETE.ech(ech)+'</div>'):"")+
'<div class="nxg-actions">'+
'<button type="button" class="nxg-b nxg-b1">Voir mon abonnement</button>'+
'<button type="button" class="nxg-b nxg-b2">Plus tard</button>'+
'</div></div></div></div>');
document.body.appendChild(d);
_NXFETE.el=d;
try{
d.querySelector(".nxg-b1").onclick=function(){
try{if(window._NXCP)_NXCP.ouvrir("equicord_abo","Nexium Abonnement");}catch(_){}
_NXFETE.ferme();};
d.querySelector(".nxg-b2").onclick=function(){_NXFETE.ferme();};
d.onclick=function(e){try{if(e.target===d)_NXFETE.ferme();}catch(_){}};
_NXFETE._clav=function(e){try{
if(e.key==="Escape"){e.preventDefault();e.stopPropagation();_NXFETE.ferme();}}catch(_){}};
document.addEventListener("keydown",_NXFETE._clav,true);}catch(_){}
// Le mouvement n arrive qu a la premiere image peinte, comme partout ailleurs.
try{if(typeof requestAnimationFrame==="function")
requestAnimationFrame(function(){requestAnimationFrame(function(){try{
if(_NXFETE.el)_NXFETE.el.className="nxg-vif";}catch(_){}});});
else d.className="nxg-vif";}catch(_){}
// Les particules ont fini leur course : on retire les deux calques. Une carte
// posee longtemps ne doit pas continuer a faire composer soixante elements.
try{_NXFETE.minuteur=setTimeout(function(){try{
if(_NXFETE.el!==d)return;
var p=d.querySelector(".nxg-pluie");if(p&&p.parentNode)p.parentNode.removeChild(p);
var f=d.querySelector(".nxg-flash");if(f&&f.parentNode)f.parentNode.removeChild(f);
}catch(_){}},6200);}catch(_){}
return true;}catch(_){return false;}};

_NXFETE.ech=function(t){try{
return String(t===null||t===undefined?"":t)
.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
.replace(/"/g,"&quot;");}catch(_){return "";}};
_NXFETE.MOIS=["janvier","fevrier","mars","avril","mai","juin","juillet","aout",
"septembre","octobre","novembre","decembre"];
_NXFETE.dateFr=function(iso){try{
var d=new Date(iso);
if(!isFinite(d.getTime()))return "";
return d.getDate()+" "+_NXFETE.MOIS[d.getMonth()]+" "+d.getFullYear();}catch(_){return "";}};

// ------------------------------------------------------- ce qui la declenche
_NXFETE.lis=function(){try{
var r=_NXDB.get(_NXFETE.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object"||!d.o||d.o.length===undefined)return null;
return d;}catch(_){return null;}};
_NXFETE.range=function(cles,id){try{
_NXDB.set(_NXFETE.KEY,JSON.stringify({v:1,id:id||"",o:cles,a:Date.now()}));}catch(_){}};
_NXFETE.cles=function(){try{
var L=(window._NXABO&&_NXABO.offres)?_NXABO.offres():[];
var out=[],a;
for(a=0;a<L.length;a++)if(L[a]&&L[a].offre)out.push(String(L[a].offre));
out.sort();
return out;}catch(_){return [];}};
// La comparaison. Elle ne fete que ce qui vient d apparaitre, une seule fois,
// et jamais la premiere fois qu on regarde -- ce serait feter le passe.
_NXFETE.veille=function(){try{
if(!window._NXABO)return false;
var e=_NXABO.courant();
if(!e)return false;
var id=_NXABO.moi?_NXABO.moi():"";
var maintenant=_NXFETE.cles();
var avant=_NXFETE.lis();
if(!avant||(avant.id&&id&&avant.id!==id)){_NXFETE.range(maintenant,id);return false;}
var neuves=[],a;
for(a=0;a<maintenant.length;a++)
if(avant.o.indexOf(maintenant[a])<0)neuves.push(maintenant[a]);
_NXFETE.range(maintenant,id);
if(!neuves.length)return false;
// Une seule carte, meme si l equipe a pose trois offres d un coup : on
// annonce la plus haute, et la page dit le reste.
var L=_NXABO.offres(),choix=null,rangMax=-1;
for(a=0;a<L.length;a++){
if(neuves.indexOf(String(L[a].offre))<0)continue;
var g=_NXFETE.devine(L[a].offre);
if(g.rang>rangMax){rangMax=g.rang;choix=L[a];}}
if(!choix)return false;
_NXFETE.montre({nom:choix.nom||choix.offre,cle:choix.offre,
expire:choix.expire_le||null,cadeau:true});
return true;}catch(_){return false;}};

try{if(window._NXABO&&_NXABO.listeners)_NXABO.listeners.push(function(){
try{
// On laisse le client finir de s ouvrir : une fete posee sur un ecran de
// chargement passe inapercue.
if(document.getElementById("nx-boot"))return;
if(document.hidden)return;
_NXFETE.veille();}catch(_){}});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXFETE");if(window._NXERR)_NXERR.push("module _NXFETE :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXFETE desactive:",_nxE);}catch(_){}}
}
