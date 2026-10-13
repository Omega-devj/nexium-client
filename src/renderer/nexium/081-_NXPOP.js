var _NXPOP=window._NXPOP||(window._NXPOP={});
if(!_NXPOP.boot){try{_NXPOP.boot=true;
// Les annonces.
//
// Une seule regle : jamais au demarrage, et jamais deux fois. L annonce
// attend le moment ou ce qu elle raconte a un sens.
_NXPOP.KEY="nexium_annonces";
// La version pour laquelle on a deja annonce quelque chose.
_NXPOP.KEYV="nexium_annonce_version";
_NXPOP.MODID="nx-pop-modal";
_NXPOP.vus={};
_NXPOP.load=function(){try{
var r=_NXDB.get(_NXPOP.KEY);
var d=r?JSON.parse(r):null;
_NXPOP.vus=(d&&typeof d==="object")?d:{};
return _NXPOP.vus;}catch(_){_NXPOP.vus={};return _NXPOP.vus;}};
_NXPOP.save=function(){try{_NXDB.set(_NXPOP.KEY,JSON.stringify(_NXPOP.vus));}catch(_){}};
_NXPOP.vu=function(k){try{return !!_NXPOP.vus[k];}catch(_){return true;}};
_NXPOP.marque=function(k){try{_NXPOP.vus[k]=Date.now();_NXPOP.save();}catch(_){}};

// L annonce de la v204 : le circuit. Une ouverture en tunnel de vitesse ou le
// numero arrive a toute allure, puis sept chapitres, chacun avec sa scene, et
// une piste a gauche ou un point avance de l un a l autre. Tout est dessine
// ici, en DOM ; les anciennes annonces (le film de la v201, l histoire de la
// v203) ont ete retirees du paquet : une annonce vue ne revient jamais.
_NXPOP.ANNONCES=[
{k:"v204",version:"204",avant:"203",col:"lime",
 titre:"Nexium v204 : Ultra Fast",
 texte:"La carte graphique rendue à Discord, un pilote qui allège tout seul quand ça rame, la frappe mesurée, quatre pages refaites, un écran d’ouverture sobre et un assistant qui voit tout le client.",
 chapitres:[
 {sc:"vitesse",col:"lime",court:"Ultra Fast",kick:"La nouveauté de cette version",titre:"Nexium Ultra Fast",
  texte:"Discord dessiné par ta carte graphique, sur ses meilleurs réglages, avec un pilote qui n’allège que si des images bloquent vraiment. Tout ce que la page affiche est mesuré sur ta machine.",
  points:["La carte graphique dédiée sur les portables à deux cartes","La rastérisation par la carte graphique, sans copie","Un pilote qui lit les images bloquées et s’adapte seul","Les images par seconde mesurées, avant et après"],
  bouton:"Ouvrir Ultra Fast",page:["equicord_ultra","Nexium Ultra Fast"]},
 {sc:"puce",col:"cyan",court:"Carte graphique",kick:"Correction majeure",titre:"La carte graphique dessine de nouveau Discord",
  texte:"Le démarreur de Nexium coupait l’accélération matérielle à chaque lancement : tout Discord était dessiné par le processeur. C’était la cause des images qui tombent et des animations au ralenti.",
  points:["L’accélération est rendue à tout le monde","Un interrupteur pour ceux dont le pilote graphique pose problème","Nexium dit quelle carte dessine Discord, et si elle est active"],
  bouton:"Voir ma carte graphique",page:["equicord_ultra","Nexium Ultra Fast"]},
 {sc:"frappe",col:"warn",court:"La frappe",kick:"Le délai des touches",titre:"Chaque touche lente est mesurée",
  texte:"Le temps entre une touche et la lettre à l’écran est mesuré, puis décomposé : l’attente, le traitement, l’affichage. Nexium te dit d’où vient le délai au lieu de le deviner.",
  points:["Les touches lentes détaillées par Chromium lui-même","La cause dominante dite en une phrase","Les réglages qui alourdissent chaque frappe, corrigeables d’un clic"],
  bouton:"Voir ma frappe",page:["equicord_ultra","Nexium Ultra Fast"]},
 {sc:"pages",col:"rose",court:"Quatre pages",kick:"Refaites de zéro",titre:"Music, Stats, Réseau et Outils changent d’allure",
  texte:"Chaque page a sa propre mise en page et ses propres animations, toutes portées par de vraies valeurs.",
  points:["Music : la pochette, le vinyle et son bras de lecture","Stats : une courbe qui se trace, une horloge de 24 heures, un podium","Réseau : des cadrans, un oscilloscope et un radar des hôtes","Outils : un tableau périodique et un vrai contrat à signer"],
  bouton:"Ouvrir Music",page:["equicord_music","Nexium Music"]},
 {sc:"logo",col:"mauve",court:"Démarrage",kick:"L’écran d’ouverture",titre:"Un démarrage sobre",
  texte:"Le vrai logo, une ligne qui suit les vraies étapes du chargement, une phrase en français. Rien d’autre ne bouge.",
  points:["Plus de nébuleuse ni d’orbites","Une ligne qui n’avance que sur des faits","Des phrases complètes, sans jargon"],
  bouton:"Revoir l’écran",action:"demarrage"},
 {sc:"outils",col:"info",court:"Nexium IA",kick:"Nexium IA",titre:"L’assistant voit tout le client",
  texte:"Douze nouveaux outils de lecture : il peut analyser les performances, l’appel en cours, le son, les plugins, les erreurs, le démarrage, ton abonnement, les menaces arrêtées, le serveur ouvert, et faire un bilan complet en une seule question.",
  points:["« Analyse mon client » fait le tour en un appel","Il peut rallumer la carte graphique, avec ton accord","Jamais ton adresse IP, jamais le nom des gens d’un appel"],
  bouton:"Ouvrir Nexium IA",page:["equicord_ia","Nexium IA"]},
 {sc:"moniteur",col:"ok",court:"Fluidité",kick:"Nexium Données",titre:"Ce que Nexium coûte, mesuré en direct",
  texte:"La carte Fluidité affiche le temps de calcul de chaque partie de Nexium, les images qui ont bloqué et ce qui les a causées.",
  points:["Le coût réel de chaque partie, depuis le démarrage","Les blocages et leur origine, script par script","Moins de travail à chaque message et à chaque touche"],
  bouton:"Ouvrir Données",page:["equicord_data","Nexium Données"]}]}];

_NXPOP.STYLEID="nx-pop-style";
_NXPOP.DUREE=9000;
_NXPOP.esc=function(x){return String(x==null?"":x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");};
_NXPOP.couleur=function(nom){try{return _NXpal[nom]||_NXpal.info;}catch(_){return "#8fb4ea";}};
_NXPOP.teinte=function(c,a){try{return _NXteinte(c,a);}catch(_){return c;}};
_NXPOP.style=function(){try{
var ancien=document.getElementById(_NXPOP.STYLEID);
if(ancien&&ancien.getAttribute("data-v")==="4")return;
if(ancien&&ancien.parentNode)ancien.parentNode.removeChild(ancien);
var s=document.createElement("style");s.id=_NXPOP.STYLEID;s.setAttribute("data-v","4");
var SERIF="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
s.textContent=[
"#nx-pop-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;background:rgba(4,4,6,.84);font-family:'gg sans','Noto Sans',Helvetica,Arial,sans-serif;color:#efe8dc}",
".nxc-anim#nx-pop-modal{animation:nxcVoile .45s ease both}",
"@keyframes nxcVoile{from{opacity:0}to{opacity:1}}",
".nxc-cadre{position:relative;display:flex;width:min(960px,100%);height:min(600px,100%);border-radius:22px;overflow:hidden;background:#0b0b0d;border:1px solid rgba(239,232,220,.1);box-shadow:0 50px 140px rgba(0,0,0,.65)}",
".nxc-anim .nxc-cadre{animation:nxcCadre .65s cubic-bezier(.16,1,.3,1) both}",
"@keyframes nxcCadre{from{transform:scale(.95) translateY(16px);opacity:0}to{transform:none;opacity:1}}",
".nxc-piste{width:236px;flex:0 0 auto;padding:30px 18px 24px 28px;border-right:1px solid rgba(239,232,220,.08);display:flex;flex-direction:column;box-sizing:border-box}",
".nxc-marque{font-size:12.5px;color:#978f83}",
".nxc-marque b{display:block;font-family:"+SERIF+";font-style:italic;font-weight:400;font-size:36px;color:#efe8dc;margin-top:2px;line-height:1.1}",
".nxc-rail{position:relative;margin-top:24px;padding-left:24px}",
".nxc-rail:before{content:'';position:absolute;left:5px;top:14px;bottom:14px;width:1px;background:rgba(239,232,220,.12)}",
".nxc-point{position:absolute;left:0;top:14px;width:11px;height:11px;margin-top:-5px;border-radius:50%;transition:transform .6s cubic-bezier(.34,1.3,.5,1),background-color .4s ease,box-shadow .4s ease}",
".nxc-item{position:relative;height:44px;display:flex;flex-direction:column;justify-content:center;cursor:pointer;color:#6b645a;font-size:13.5px;transition:color .3s ease}",
".nxc-item:hover{color:#b9b1a4}",
".nxc-item.nxc-actif{color:#efe8dc}",
".nxc-avance{height:2px;width:132px;margin-top:6px;background:rgba(239,232,220,.08);border-radius:2px;overflow:hidden;opacity:0;transition:opacity .3s ease}",
".nxc-actif .nxc-avance{opacity:1}",
".nxc-avance i{display:block;height:100%;transform-origin:left center;transform:scaleX(0);border-radius:2px}",
".nxc-droite{flex:1;display:flex;flex-direction:column;min-width:0}",
".nxc-scene{position:relative;flex:0 0 50%;overflow:hidden;border-bottom:1px solid rgba(239,232,220,.08);display:flex;align-items:center;justify-content:center}",
".nxc-texte{padding:24px 34px 0;flex:1;overflow:auto}",
".nxc-kick{font-size:12.5px}",
".nxc-titre{font-family:"+SERIF+";font-size:30px;line-height:1.12;margin-top:6px;color:#efe8dc}",
".nxc-corps{font-size:14px;color:#a39b8e;line-height:1.65;margin-top:10px;max-width:580px}",
".nxc-points{margin-top:10px}",
".nxc-points div{position:relative;font-size:13px;color:#c9c1b4;padding:3px 0 3px 18px}",
".nxc-points div:before{content:'';position:absolute;left:0;top:12px;width:9px;height:1px;background:currentColor;opacity:.6}",
".nxc-anim .nxc-texte>*{animation:nxcTexte .6s cubic-bezier(.16,1,.3,1) both}",
".nxc-anim .nxc-texte>*:nth-child(2){animation-delay:.06s}.nxc-anim .nxc-texte>*:nth-child(3){animation-delay:.12s}.nxc-anim .nxc-texte>*:nth-child(4){animation-delay:.18s}",
"@keyframes nxcTexte{from{transform:translateY(12px);opacity:0}to{transform:none;opacity:1}}",
".nxc-actions{display:flex;gap:10px;padding:14px 34px 22px;justify-content:flex-end;align-items:center}",
".nxc-bouton{padding:10px 18px;border-radius:99px;font-size:13px;font-weight:600;cursor:pointer;transition:transform .2s cubic-bezier(.34,1.5,.6,1)}",
".nxc-bouton:hover{transform:translateY(-2px)}",
".nxc-ferme{position:absolute;top:14px;right:14px;z-index:6;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#978f83;cursor:pointer}",
".nxc-ferme:hover{color:#efe8dc;background:rgba(239,232,220,.06)}",
".nxc-intro{position:absolute;inset:0;z-index:5;background:#060607;display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden;transition:opacity .55s ease;cursor:pointer}",
".nxc-intro.nxc-fin{opacity:0;pointer-events:none}",
".nxc-tunnel{position:absolute;left:50%;top:50%;width:0;height:0}",
".nxc-tunnel i{position:absolute;left:0;top:0;width:420px;height:1.5px;transform-origin:0 50%}",
".nxc-tunnel b{display:block;width:100%;height:100%;transform-origin:0 50%;transform:translateX(20px) scaleX(.04);opacity:0}",
".nxc-anim .nxc-tunnel b{animation:nxcFuite 1.15s cubic-bezier(.55,0,.8,.4) infinite}",
"@keyframes nxcFuite{0%{transform:translateX(20px) scaleX(.04);opacity:0}25%{opacity:1}100%{transform:translateX(440px) scaleX(1);opacity:0}}",
".nxc-num{position:relative;font-family:"+SERIF+";font-style:italic;font-size:132px;line-height:1;color:#efe8dc}",
".nxc-anim .nxc-num{animation:nxcPunch 1s cubic-bezier(.16,1,.3,1) .45s both}",
"@keyframes nxcPunch{from{transform:scale(2.6);opacity:0;letter-spacing:.35em}to{transform:none;opacity:1;letter-spacing:-.02em}}",
".nxc-sous{position:relative;font-size:16px;margin-top:12px;font-weight:700;font-style:italic}",
".nxc-anim .nxc-sous{animation:nxcTexte .7s cubic-bezier(.16,1,.3,1) 1.05s both}",
".nxc-passer{position:absolute;bottom:22px;font-size:12px;color:#5f594f}",
// --- les scenes
".nxc-barres{display:flex;align-items:flex-end;gap:4px;height:150px;width:440px}",
".nxc-barres i{flex:1;border-radius:2px 2px 0 0;transform-origin:bottom center}",
".nxc-anim .nxc-barres i{animation:nxcBarre .45s cubic-bezier(.34,1.4,.6,1) both}",
"@keyframes nxcBarre{from{transform:scaleY(0)}to{transform:scaleY(1)}}",
".nxc-legende{display:flex;justify-content:space-between;width:440px;font-size:12px;color:#978f83;margin-top:10px}",
".nxc-puce{position:relative;width:120px;height:120px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:"+SERIF+";font-size:26px}",
".nxc-broche{position:absolute;width:8px;height:3px;border-radius:2px;opacity:.25}",
".nxc-anim .nxc-broche{animation:nxcBroche 1.6s ease-in-out infinite}",
"@keyframes nxcBroche{0%,100%{opacity:.25}40%{opacity:1}}",
".nxc-fil{position:relative;width:150px;height:2px;overflow:hidden;margin:9px 0}",
".nxc-fil b{position:absolute;left:0;top:0;width:34px;height:100%;transform:translateX(-40px)}",
".nxc-anim .nxc-fil b{animation:nxcCourant 1.3s linear infinite}",
"@keyframes nxcCourant{to{transform:translateX(160px)}}",
".nxc-fenetre{width:170px;height:118px;border-radius:10px;border:1px solid rgba(239,232,220,.2);padding:14px;box-sizing:border-box;display:flex;flex-direction:column;gap:9px}",
".nxc-fenetre i{display:block;height:8px;border-radius:4px;background:rgba(239,232,220,.14);transform-origin:left center}",
".nxc-anim .nxc-fenetre i{animation:nxcBarreH .6s cubic-bezier(.22,1,.36,1) both}",
"@keyframes nxcBarreH{from{transform:scaleX(0)}to{transform:scaleX(1)}}",
".nxc-champ{width:360px;padding:14px 16px;border-radius:12px;border:1px solid rgba(239,232,220,.18);font-size:18px;min-height:24px;color:#efe8dc}",
".nxc-champ span{opacity:1}",
".nxc-anim .nxc-champ span{animation:nxcLettre .12s ease-out both}",
"@keyframes nxcLettre{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}",
".nxc-curseur{display:inline-block;width:2px;height:20px;margin-left:2px;vertical-align:-3px;background:#efe8dc}",
".nxc-anim .nxc-curseur{animation:nxcCurseur 1s steps(2) infinite}",
"@keyframes nxcCurseur{50%{opacity:0}}",
".nxc-touches{display:flex;gap:8px;margin-top:18px}",
".nxc-touche{width:44px;height:40px;border-radius:8px;border:1px solid rgba(239,232,220,.2);display:flex;align-items:center;justify-content:center;font-size:14px;color:#c9c1b4;box-shadow:0 4px 0 rgba(0,0,0,.5)}",
".nxc-anim .nxc-touche{animation:nxcFrappe .28s ease-out both}",
"@keyframes nxcFrappe{0%{transform:none}40%{transform:translateY(3px);box-shadow:0 1px 0 rgba(0,0,0,.5)}100%{transform:none}}",
".nxc-grille{display:grid;grid-template-columns:repeat(2,150px);gap:14px}",
".nxc-case{position:relative;height:96px;border-radius:12px;border:1px solid rgba(239,232,220,.12);display:flex;align-items:center;justify-content:center;overflow:hidden}",
".nxc-anim .nxc-case{animation:nxcCase .6s cubic-bezier(.3,1.3,.6,1) both}",
"@keyframes nxcCase{from{transform:perspective(500px) rotateY(-80deg);opacity:0}to{transform:none;opacity:1}}",
".nxc-tourne{animation:none}",
".nxc-anim .nxc-tourne{animation:nxcTourne 3.2s linear infinite}",
"@keyframes nxcTourne{to{transform:rotate(360deg)}}",
".nxc-trace{stroke-dasharray:1;stroke-dashoffset:0}",
".nxc-anim .nxc-trace{animation:nxcTrace 3s ease-in-out infinite}",
"@keyframes nxcTrace{0%{stroke-dashoffset:1}60%,100%{stroke-dashoffset:0}}",
".nxc-anim .nxc-retourne{animation:nxcRetourne 4s cubic-bezier(.5,0,.3,1) infinite}",
"@keyframes nxcRetourne{0%,70%{transform:perspective(400px) rotateY(0)}85%{transform:perspective(400px) rotateY(180deg)}100%{transform:perspective(400px) rotateY(360deg)}}",
".nxc-logo{position:relative;width:260px;height:169px}",
".nxc-logo img{width:100%;height:100%;display:block}",
".nxc-eclat{position:absolute;inset:0;overflow:hidden;-webkit-mask-size:100% 100%;mask-size:100% 100%}",
".nxc-eclat i{position:absolute;top:-10%;bottom:-10%;left:0;width:30%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);transform:translateX(-130%) skewX(-12deg)}",
".nxc-anim .nxc-eclat i{animation:nxcEclat 3.6s cubic-bezier(.5,0,.3,1) .6s infinite}",
"@keyframes nxcEclat{0%{transform:translateX(-130%) skewX(-12deg)}45%,100%{transform:translateX(430%) skewX(-12deg)}}",
".nxc-liste{display:grid;grid-template-columns:repeat(2,auto);gap:6px 28px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;color:#c9c1b4}",
".nxc-liste div{display:flex;align-items:center;gap:8px}",
".nxc-anim .nxc-liste div{animation:nxcLigne .45s cubic-bezier(.16,1,.3,1) both}",
"@keyframes nxcLigne{from{transform:translateX(-14px);opacity:0}to{transform:none;opacity:1}}",
".nxc-jauges{width:420px}",
".nxc-jauges div{display:flex;align-items:center;gap:12px;margin:9px 0;font-size:12.5px;color:#c9c1b4}",
".nxc-jauges span{width:150px;flex:0 0 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
".nxc-jauges b{display:block;flex:1;height:6px;border-radius:3px;background:rgba(239,232,220,.08);overflow:hidden}",
".nxc-jauges b i{display:block;height:100%;border-radius:3px;transform-origin:left center}",
".nxc-anim .nxc-jauges b i{animation:nxcBarreH 1s cubic-bezier(.22,1,.36,1) both}",
"@media (max-width:720px){.nxc-piste{display:none}}",
"@media (prefers-reduced-motion:reduce){#nx-pop-modal *{animation:none!important}}"].join("\n");
(document.head||document.documentElement).appendChild(s);}catch(_){}};

// ------------------------------------------------------------- les scenes
_NXPOP.CH={};
_NXPOP.alea=function(k){var x=Math.sin(k*12.9898+78.233)*43758.5453;return x-Math.floor(x);};
// Ultra Fast : a gauche des images irregulieres, a droite des images regulieres.
_NXPOP.CH.vitesse=function(col){var P=_NXpal,h="",k;
for(k=0;k<44;k++){var avant=k<22,ht=avant?(32+_NXPOP.alea(k)*62):(20+_NXPOP.alea(k)*6);
var c=avant?(ht>70?P.danger:P.warn):col;
h+='<i style="height:'+ht.toFixed(0)+'%;background:'+c+';animation-delay:'+(k*35)+'ms"></i>';}
return '<div><div class="nxc-barres">'+h+'</div><div class="nxc-legende"><span>'+_NXtr("sans")+'</span><span>'+_NXtr("avec Ultra Fast")+'</span></div></div>';};
// La carte graphique : la puce, ses broches qui s allument, le courant qui part vers la fenetre.
_NXPOP.CH.puce=function(col){var T=_NXPOP.teinte,b="",k;
for(k=0;k<5;k++){var o=(18+k*21)+"px";
b+='<span class="nxc-broche" style="left:-12px;top:'+o+';background:'+col+';animation-delay:'+(k*0.16)+'s"></span>';
b+='<span class="nxc-broche" style="right:-12px;top:'+o+';background:'+col+';animation-delay:'+(0.8+k*0.16)+'s"></span>';}
var fils="";for(k=0;k<3;k++)fils+='<div class="nxc-fil" style="background:'+T(col,14)+'"><b style="background:linear-gradient(90deg,transparent,'+col+');animation-delay:'+(k*0.4)+'s"></b></div>';
var lignes="";for(k=0;k<5;k++)lignes+='<i style="width:'+(40+_NXPOP.alea(k+7)*55).toFixed(0)+'%;animation-delay:'+(0.5+k*0.15)+'s"></i>';
return '<div style="display:flex;align-items:center;gap:26px">'
+'<div class="nxc-puce" style="background:'+T(col,10)+';border:1px solid '+T(col,55)+';color:'+col+';box-shadow:0 0 50px '+T(col,22)+'">'+b+'GPU</div>'
+'<div>'+fils+'</div><div class="nxc-fenetre">'+lignes+'</div></div>';};
// La frappe : chaque lettre apparait avec sa touche.
_NXPOP.CH.frappe=function(col){var mot=_NXtr("on lance une partie"),h="",t="",k,j=0;
for(k=0;k<mot.length;k++)h+='<span style="animation-delay:'+(300+k*95)+'ms">'+_NXPOP.esc(mot.charAt(k))+'</span>';
var touches=["O","N","L","A","C","E"];
for(k=0;k<touches.length;k++){var pos=mot.toUpperCase().indexOf(touches[k]);
t+='<div class="nxc-touche" style="animation-delay:'+(300+Math.max(0,pos)*95)+'ms">'+touches[k]+'</div>';}
return '<div style="display:flex;flex-direction:column;align-items:center"><div class="nxc-champ">'+h+'<span class="nxc-curseur" style="background:'+col+'"></span></div>'
+'<div class="nxc-touches">'+t+'</div></div>';};
// Les quatre pages, chacune avec son geste.
_NXPOP.CH.pages=function(col){var P=_NXpal,T=_NXPOP.teinte;
var vinyle='<div style="display:flex;align-items:center"><div style="width:52px;height:52px;background:'+P.cyan+';border-radius:2px;position:relative;z-index:1"></div>'
+'<div class="nxc-tourne" style="width:50px;height:50px;margin-left:-20px;border-radius:50%;background:repeating-radial-gradient(circle,#141210 0 1.4px,#24211d 1.4px 2.8px);position:relative">'
+'<span style="position:absolute;left:18px;top:18px;width:14px;height:14px;border-radius:50%;background:'+P.cyan+'"></span></div></div>';
var courbe='<svg width="120" height="56" viewBox="0 0 120 56"><path class="nxc-trace" pathLength="1" d="M2 44 C 20 40, 26 14, 42 22 S 66 46, 80 26 S 104 8, 118 12" fill="none" stroke="'+P.info+'" stroke-width="2"/></svg>';
var radar='<div style="position:relative;width:60px;height:60px;border-radius:50%;border:1px solid '+T(P.cyan,40)+';overflow:hidden">'
+'<div class="nxc-tourne" style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 290deg,'+T(P.cyan,60)+' 360deg)"></div>'
+'<span style="position:absolute;left:16px;top:20px;width:5px;height:5px;border-radius:50%;background:'+P.warn+'"></span></div>';
var tuile='<div class="nxc-retourne" style="width:58px;height:58px;border-radius:10px;border:1px solid '+T(P.cyan,60)+';background:'+T(P.cyan,12)+';display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:22px;color:#efe8dc">B64</div>';
var cases=[[vinyle,"Music"],[courbe,"Stats"],[radar,"Réseau"],[tuile,"Outils"]],h="";
for(var k=0;k<4;k++)h+='<div class="nxc-case" style="animation-delay:'+(k*90)+'ms">'+cases[k][0]
+'<span style="position:absolute;left:10px;bottom:7px;font-size:11px;color:#978f83">'+_NXtr(cases[k][1])+'</span></div>';
return '<div class="nxc-grille">'+h+'</div>';};
// Le logo de l ecran d ouverture, et son reflet.
_NXPOP.CH.logo=function(col){
var L=(window._NXBOOT&&_NXBOOT.LOGO)||"";
if(!L)return '<div style="font-family:Georgia,serif;font-size:120px;color:'+col+'">N</div>';
return '<div class="nxc-logo"><img alt="" src="'+L+'"><div class="nxc-eclat" style="-webkit-mask-image:url(\''+L+'\');mask-image:url(\''+L+'\')"><i></i></div></div>';};
// Les douze outils neufs de l assistant, qui arrivent un par un.
_NXPOP.CH.outils=function(col){
var N=["performances","corriger_performance","vocal_en_direct","qualite_du_son","statistiques_detaillees","plugins_equicord",
"erreurs_du_client","demarrage_du_client","abonnement_et_credits","menaces_detaillees","serveur_ouvert","bilan_complet"],h="";
for(var k=0;k<N.length;k++)h+='<div style="animation-delay:'+(k*110)+'ms"><span style="color:'+col+'">✓</span>'+N[k]+'</div>';
return '<div class="nxc-liste">'+h+'</div>';};
// Le moniteur : les vraies parties de Nexium et leur cout, si elles ont deja tourne.
_NXPOP.CH.moniteur=function(col){var r=null;
try{r=(window._NXPERF&&_NXPERF.releve)?_NXPERF.releve():null;}catch(_){}
var M=(r&&r.modules)||[],h="",k;
if(M.length){var mx=M[0].ms||1;
for(k=0;k<Math.min(5,M.length);k++)h+='<div><span>'+_NXPOP.esc(_NXtr(M[k].nom))+'</span><b><i style="width:'+Math.max(4,M[k].ms/mx*100).toFixed(0)+'%;background:'+col+';animation-delay:'+(k*120)+'ms"></i></b></div>';}
else{var noms=["Protect","Privacy","Stats","Réseau","Nexium IA"];
for(k=0;k<5;k++)h+='<div><span>'+_NXtr(noms[k])+'</span><b><i style="width:'+(70-k*12)+'%;background:'+col+';animation-delay:'+(k*120)+'ms"></i></b></div>';}
return '<div class="nxc-jauges">'+h+'</div>';};

// ------------------------------------------------------------- le circuit
_NXPOP.montreCircuit=function(a){try{
if(!a||!a.chapitres||!a.chapitres.length)return false;
if(document.getElementById(_NXPOP.MODID))return false;
if(!document.body)return false;
_NXPOP.marque(a.k);
_NXPOP.style();
var C=a.chapitres,e=_NXPOP.esc,T=_NXPOP.teinte;
var anime=true;try{anime=!!(window._NXFX&&_NXFX.anime&&_NXFX.anime());}catch(_){}
var colA=_NXPOP.couleur(a.col||"lime");
var etat={i:-1,ecoule:0,pause:false,fini:false};
var ov=document.createElement("div");ov.id=_NXPOP.MODID;
if(anime)ov.className="nxc-anim";
ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");
ov.setAttribute("aria-label",_NXtr("Nouveautés de Nexium v")+_NXtr(a.version));
var items="";
for(var n=0;n<C.length;n++)items+='<div class="nxc-item" data-i="'+n+'">'+e(_NXtr(C[n].court))+'<div class="nxc-avance"><i></i></div></div>';
var tunnel="";
for(var r=0;r<36;r++){var ang=r*10+_NXPOP.alea(r)*6;
tunnel+='<i style="transform:rotate('+ang.toFixed(1)+'deg)"><b style="background:linear-gradient(90deg,transparent,'+(r%3===0?"#efe8dc":colA)+');animation-delay:'+(_NXPOP.alea(r+40)*1.1).toFixed(2)+'s"></b></i>';}
ov.innerHTML=_NXtrHtml('<div class="nxc-cadre">'
+'<div class="nxc-piste"><div class="nxc-marque">Nexium<b>v'+e(a.version)+'</b></div>'
+'<div class="nxc-rail"><span class="nxc-point"></span>'+items+'</div></div>'
+'<div class="nxc-droite"><div class="nxc-scene"></div><div class="nxc-texte"></div><div class="nxc-actions"></div></div>'
+'<div class="nxc-ferme nx-fx" role="button" tabindex="0" aria-label="Fermer"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6.6 6.6 17.4 17.4M17.4 6.6 6.6 17.4"/></svg></div>'
+(anime?('<div class="nxc-intro"><div class="nxc-tunnel">'+tunnel+'</div><div class="nxc-num">'+e(a.version)+'</div>'
+'<div class="nxc-sous" style="color:'+colA+'">Nexium Ultra Fast</div><div class="nxc-passer">Clique pour passer</div></div>'):"")
+'</div>');
var $=function(s){return ov.querySelector(s);};
var scene=$(".nxc-scene"),texte=$(".nxc-texte"),actions=$(".nxc-actions"),point=$(".nxc-point"),intro=$(".nxc-intro");
var its=ov.querySelectorAll(".nxc-item");
var minuteur=null;
var clos=function(){if(etat.fini)return;etat.fini=true;
try{clearInterval(minuteur);}catch(_){}
try{document.removeEventListener("keydown",clavier,true);}catch(_){}
try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
_NXPOP._clos=clos;
var bouton=function(txt,plein,col,fn){
var b=document.createElement("div");b.className="nxc-bouton nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=plein?("background:"+col+";color:#16130f"):("border:1px solid rgba(239,232,220,.2);color:#c9c1b4");
b.textContent=_NXtr(txt);
b.onclick=function(ev){try{if(ev&&ev.stopPropagation)ev.stopPropagation();}catch(_){}fn();};
b.onkeydown=function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();fn();}};
return b;};
var agir=function(d){clos();try{
if(d.action==="demarrage"){if(window._NXBOOT&&_NXBOOT.rejoue)_NXBOOT.rejoue();return;}
if(d.page&&window._NXCP&&_NXCP.ouvrir)_NXCP.ouvrir(d.page[0],d.page[1]);}catch(_){}};
var montre=function(idx){
if(idx<0||idx>=C.length||etat.fini)return;
etat.i=idx;etat.ecoule=0;
var d=C[idx],col=_NXPOP.couleur(d.col);
scene.style.background="radial-gradient(70% 90% at 50% 45%,"+T(col,14)+",transparent 72%)";
scene.innerHTML="";var bloc=document.createElement("div");
try{bloc.innerHTML=_NXtrHtml(_NXPOP.CH[d.sc]?_NXPOP.CH[d.sc](col):"");}catch(_){}
scene.appendChild(bloc);
var pts="";for(var p=0;p<(d.points||[]).length;p++)pts+="<div>"+e(_NXtr(d.points[p]))+"</div>";
texte.innerHTML=_NXtrHtml('<div class="nxc-kick" style="color:'+col+'">'+e(d.kick)+'</div>'
+'<div class="nxc-titre">'+e(d.titre)+'</div><div class="nxc-corps">'+e(d.texte)+'</div>'
+(pts?('<div class="nxc-points">'+pts+'</div>'):""));
actions.innerHTML="";
actions.appendChild(bouton(d.bouton,false,col,function(){agir(d);}));
actions.appendChild(bouton(idx<C.length-1?"Suivant":"Terminer",true,col,function(){if(idx<C.length-1)montre(idx+1);else clos();}));
for(var q=0;q<its.length;q++){its[q].className="nxc-item"+(q===idx?" nxc-actif":"");
var bar=its[q].querySelector(".nxc-avance i");if(bar){bar.style.background=_NXPOP.couleur(C[q].col);bar.style.transform=q<idx?"scaleX(1)":"scaleX(0)";}}
point.style.background=col;point.style.boxShadow="0 0 0 4px "+T(col,22);
point.style.transform="translateY("+(idx*44)+"px)";};
var clavier=function(ev){try{
if(ev.key==="Escape"){ev.preventDefault();clos();}
else if(ev.key==="ArrowRight"){ev.preventDefault();if(intro&&!intro.__fini)finIntro();else montre(Math.min(C.length-1,etat.i+1));}
else if(ev.key==="ArrowLeft"){ev.preventDefault();montre(Math.max(0,etat.i-1));}}catch(_){}};
for(var q2=0;q2<its.length;q2++)(function(k){its[k].onclick=function(){montre(k);};})(q2);
$(".nxc-ferme").onclick=clos;
ov.onclick=function(ev){if(ev.target===ov)clos();};
var cadre=$(".nxc-cadre");
cadre.onmouseenter=function(){etat.pause=true;};
cadre.onmouseleave=function(){etat.pause=false;};
var finIntro=function(){if(!intro||intro.__fini)return;intro.__fini=true;
intro.className="nxc-intro nxc-fin";
setTimeout(function(){try{if(intro.parentNode)intro.parentNode.removeChild(intro);}catch(_){}},600);
if(etat.i<0)montre(0);};
if(intro){intro.onclick=finIntro;setTimeout(finIntro,3300);}else montre(0);
document.addEventListener("keydown",clavier,true);
document.body.appendChild(ov);
minuteur=setInterval(function(){try{
if(etat.fini||etat.i<0||etat.pause||document.hidden)return;
etat.ecoule+=100;
var bar=its[etat.i]&&its[etat.i].querySelector(".nxc-avance i");
if(bar)bar.style.transform="scaleX("+Math.min(1,etat.ecoule/_NXPOP.DUREE).toFixed(3)+")";
if(etat.ecoule>=_NXPOP.DUREE&&etat.i<C.length-1)montre(etat.i+1);}catch(_){}},100);
return true;}catch(_){return false;}};

_NXPOP.rejoue=function(k){try{
var a=null,n;
for(n=0;n<_NXPOP.ANNONCES.length;n++)if(_NXPOP.ANNONCES[n].k===(k||("v"+_NXPOP.version())))a=_NXPOP.ANNONCES[n];
if(!a)a=_NXPOP.ANNONCES[0];
if(!a)return false;
try{delete _NXPOP.vus[a.k];}catch(_){}
return _NXPOP.montre(a);}catch(_){return false;}};
_NXPOP.ferme=function(){try{
if(_NXPOP._clos){_NXPOP._clos();return;}
var o=document.getElementById(_NXPOP.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};
_NXPOP.montre=function(a){try{
if(!a||_NXPOP.vu(a.k))return false;
if(a.chapitres)return _NXPOP.montreCircuit(a);
return false;}catch(_){return false;}};

_NXPOP.version=function(){try{
return String((window._NXUP&&_NXUP.VERSION)||"");}catch(_){return "";}};
_NXPOP.versionVue=function(){try{
return String(_NXDB.get(_NXPOP.KEYV)||"");}catch(_){return "";}};
_NXPOP.noteVersion=function(v){try{_NXDB.set(_NXPOP.KEYV,String(v||""));}catch(_){}};

// Vrai une seule fois : au premier demarrage qui suit une mise a jour.
// Un client neuf n est pas une mise a jour -- on note le numero sans rien
// montrer, sinon la premiere ouverture commencerait par une fenetre.
_NXPOP.majFraiche=function(){try{
var v=_NXPOP.version();
if(!v)return false;
var av=_NXPOP.versionVue();
if(av===v)return false;
_NXPOP.noteVersion(v);
return !!av;}catch(_){return false;}};

_NXPOP.pourVersion=function(){try{
var v=_NXPOP.version();
for(var a=0;a<_NXPOP.ANNONCES.length;a++){var x=_NXPOP.ANNONCES[a];if(x.version===v&&!_NXPOP.vu(x.k))return x;}
return null;}catch(_){return null;}};
// Hors mise a jour, seules sortent les annonces qui ne racontent pas une
// version : celles d une version passee sont perimees.
_NXPOP.suivante=function(){try{
for(var a=0;a<_NXPOP.ANNONCES.length;a++){var x=_NXPOP.ANNONCES[a];
if(x.version)continue;
if(!_NXPOP.vu(x.k))return x;}
return null;}catch(_){return null;}};
_NXPOP.solde=function(garde){try{
for(var a=0;a<_NXPOP.ANNONCES.length;a++){var x=_NXPOP.ANNONCES[a];if(x!==garde&&!_NXPOP.vu(x.k))_NXPOP.marque(x.k);}}catch(_){}};

// Le premier demarrage apres une mise a jour : l annonce arrive, une fois.
// On laisse le client se poser avant -- une fenetre pendant le demarrage
// se ferme sans etre lue.
_NXPOP.surVersion=function(){try{
if(!_NXPOP.majFraiche())return false;
var a=_NXPOP.pourVersion();
if(!a)return false;
_NXPOP._fait=true;
_NXPOP.solde(a);
_NXPOP._t0=Date.now();
setTimeout(function essai(){try{
// L ecran d ouverture encore la : on repasse. Au-dela de 25 s, on n attend
// plus -- il s est arrete sans le dire.
if(window._NXBOOT&&_NXBOOT.fini===false&&(Date.now()-_NXPOP._t0)<25000){setTimeout(essai,1000);return;}
if(document.hidden){
// Fenetre en arriere-plan : on attend qu elle revienne plutot que de
// depenser l annonce dans le vide.
var revient=function(){try{
if(document.hidden)return;
document.removeEventListener("visibilitychange",revient);
setTimeout(function(){_NXPOP.montre(a);},1500);}catch(_){}};
document.addEventListener("visibilitychange",revient);
return;}
_NXPOP.montre(a);}catch(_){}},8000);
return true;}catch(_){return false;}};

// A defaut de mise a jour : on vient de raccrocher, ou un quart d heure
// d usage. C est le chemin des annonces qui ne portent pas de numero.
_NXPOP.veille=function(){try{
if(_NXPOP._fait)return;
var a=_NXPOP.suivante();
if(!a)return;
if(document.hidden)return;
var enVocal=false;
try{
var SC=_NXcommon().store("SelectedChannelStore");
enVocal=!!(SC&&SC.getVoiceChannelId&&SC.getVoiceChannelId());}catch(_){}
if(enVocal){_NXPOP._etait=true;return;}
var raccroche=!!_NXPOP._etait;
var assez=(Date.now()-(_NXPOP._depart||Date.now()))>900000;
if(!raccroche&&!assez)return;
_NXPOP._fait=true;
_NXPOP._etait=false;
setTimeout(function(){_NXPOP.montre(a);},raccroche?2500:600);}catch(_){}};

_NXPOP.etat=function(){try{
var n=0,a;
for(a=0;a<_NXPOP.ANNONCES.length;a++)if(!_NXPOP.vu(_NXPOP.ANNONCES[a].k))n++;
return {enAttente:n,total:_NXPOP.ANNONCES.length,
version:_NXPOP.version(),versionVue:_NXPOP.versionVue()};}catch(_){
return {enAttente:0};}};

try{_NXPOP.load();_NXPOP._depart=Date.now();
_NXPOP.surVersion();
setInterval(_NXPOP.veille,20000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXPOP");if(window._NXERR)_NXERR.push("module _NXPOP :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXPOP desactive:",_nxE);}catch(_){}}
}
