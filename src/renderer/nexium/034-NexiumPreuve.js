function NexiumPreuveComp(p){
var g=(p&&p.g)||null;
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){
var vivant=true;
var maj=function(){try{if(vivant)force();}catch(_){}};
_NXPRV.listeners.push(maj);
return function(){vivant=false;
try{_NXPRV.listeners=_NXPRV.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var P=_NXpal;
var L=[];
for(var a=0;a<_NXPRV.T.length;a++){if(!g||_NXPRV.T[a].g===g)L.push(_NXPRV.T[a]);}
var n=_NXPRV.compte(g);
var lance=_NXPRV.encours;
var jamais=(n.agit+n.echec+n.coupe+n.na)===0;
var TON={agit:{c:P.ok,l:_T("agit")},echec:{c:_NXpal.red,l:_T("n agit pas")},coupe:{c:P.sub,l:_T("eteint")},na:{c:P.faint,l:_T("hors sujet")}};
function pastille(etat){
var t=TON[etat];
if(!t)return i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:P.faint,whiteSpace:"nowrap"}},lance?_T("en cours"):_T("non teste"));
return i("div",{style:{display:"flex",alignItems:"center",gap:"6px",whiteSpace:"nowrap"}},
i("div",{"aria-hidden":"true",style:{width:"7px",height:"7px",borderRadius:"50%",background:t.c,boxShadow:"0 0 8px "+t.c+"55"}}),
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:t.c}},_NXtr(t.l)));}
function ligne(e,dernier){
var r=_NXPRV.res[e.id];
var etat=r&&r.etat;
return i("div",{key:e.id,style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"14px",
padding:"13px 0",borderBottom:dernier?"none":"1px solid "+P.line}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"700",color:etat==="echec"?_NXpal.danger:P.pale,letterSpacing:"-.01em"}},_T(e.t)),
i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.6,marginTop:"4px"}},_T(e.d)),
r&&r.det?i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:etat==="echec"?_NXpal.dangerSoft:P.sub,
lineHeight:1.6,marginTop:"7px",padding:"8px 10px",borderRadius:"8px",background:P.inset,
border:"1px solid "+(etat==="echec"?"#3a2626":P.line),wordBreak:"break-word"}},_NXtr(r.det)):null),
_NXtr(pastille(etat)));}
var resume;
if(jamais&&!lance)resume=_T("Rien n est affiche tant que rien n a ete verifie. Appuie sur le bouton : chaque ligne execute la vraie protection sur du vrai contenu, et affiche ce qui s est reellement passe.");
else if(lance)resume=_T("Verification en cours")+" "+_NXPRV.fini+"/"+(_NXPRV.total||L.length);
else{
var bouts=[];
if(n.agit)bouts.push(n.agit+" "+_T("agissent"));
if(n.echec)bouts.push(n.echec+" "+_T("n agissent pas"));
if(n.coupe)bouts.push(n.coupe+" "+_T("eteintes dans tes reglages"));
if(n.na)bouts.push(n.na+" "+_T("hors sujet ici"));
resume=bouts.join(" - ")+(_NXPRV.duree?(" - "+_T("verifie en")+" "+(Math.round(_NXPRV.duree/100)/10)+" s"):"");}
var barre=null;
if(!jamais||lance){
var tot=L.length||1;
var seg=function(v,c,k){return v?i("div",{key:k,"aria-hidden":"true",style:{width:(v/tot*100)+"%",background:c,transition:"width .5s cubic-bezier(.22,.8,.28,1)"}}):null;};
barre=i("div",{style:{display:"flex",height:"8px",borderRadius:"99px",overflow:"hidden",background:P.line,marginBottom:"16px"}},
_NXtr(seg(n.agit,P.ok,"a")),_NXtr(seg(n.echec,_NXpal.red,"e")),_NXtr(seg(n.coupe,P.mute,"c")),_NXtr(seg(n.na,P.faint,"n")));}
return _NXcard(i("div",null,
_NXch(_T("Banc de preuve"),
_T("Nexium ne se contente pas de dire qu il protege : il le fait devant toi. Aucun de ces resultats n est simule."),
_NXbtn(lance?_T("Verification en cours"):(jamais?_T("Verifier maintenant"):_T("Relancer")),function(){
if(_NXPRV.encours)return;
_NXPRV.lance(g,function(c){try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(c.echec?(_NXtr(c.echec)+" "+_T("protection(s) ne repondent pas. Ouvre le banc de preuve.")):_T("Toutes les protections actives ont repondu."),c.echec?0:1);}catch(_){}});
force();})),
_NXtr(barre),
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.65,marginBottom:jamais&&!lance?"0":"6px"}},_NXtr(resume)),
i("div",null,L.map(function(e,k){return ligne(e,k===L.length-1);}))),{mb:14});
}
// Le catalogue de Privacy, une carte par idee.
//
// Trois reglages nettoyaient les liens (ouverts, copies, envoyes), deux
// coupaient les rapports d erreurs, deux fermaient l adresse pendant les
// appels, deux anonymisaient les fichiers, deux gardaient ton activite pour
// toi. Chaque paire devient une carte ; le moteur, lui, ne change pas.
var _NXPRIVFAM=[
["tele","Telemetrie","graphe","ok","Ce que Discord mesure sur ton usage et renvoie a ses serveurs."],
["social","Signaux sociaux","comptes","info","Ce que les autres, et Discord, apprennent de ton comportement."],
["empreinte","Empreinte","cible","mauve","Ce qui permet de reconnaitre ta machine d une session a l autre."],
["traces","Donnees et traces","dossier","warn","Ce que tu envoies sans le savoir, et ce que tu laisses derriere toi."]];
var _NXPRIVCAT=[
{id:"telemetrie",f:"tele",ic:"graphe",t:"Telemetrie d usage",
d:"Les requetes /science, /track et les mesures internes sont annulees. Discord les envoie sans attendre de reponse : rien ne casse.",
k:[["p","blockTel"]],cpt:[["p","science"],["p","track"],["p","metrics"],["p","event"]],pv:["pv_fetch","pv_xhr","pv_balise","pv_ws","pv_flux"]},
{id:"plantages",f:"tele",ic:"alerte",t:"Rapports de plantage et d erreurs",
d:"Les rapports envoyes a Sentry et le second canal d erreurs embarquent l etat de ton client au moment du probleme. Ils ne partent plus.",
k:[["p","blockSentry"],["p","blockErrors"]],cpt:[["p","sentry"],["p","errors"]]},
{id:"moisson",f:"tele",ic:"base",t:"Moisson de donnees",
d:"Les requetes qui collectent ton activite par paquets sont coupees.",
k:[["p","blockHarvest"]],cpt:[["p","harvest"]]},
{id:"analytique",f:"tele",ic:"reseau",t:"Analytique des serveurs",
d:"Les statistiques d usage relevees dans les serveurs que tu frequentes ne remontent plus.",
k:[["p","blockAnalytics"]],cpt:[["p","analytics"]]},
{id:"promotions",f:"tele",ic:"cadeau",t:"Promotions et quetes",
d:"Le suivi lie aux quetes, offres et promotions poussees dans le client est coupe.",
k:[["p","blockPromotions"]],cpt:[["p","promotions"]]},
{id:"experiences",f:"tele",ic:"couches",t:"Tests A/B",
d:"Ta cohorte de test n est plus recuperee. Certaines nouveautes en essai peuvent ne plus apparaitre.",
k:[["p","noExperiments"]],cpt:[["p","experiments"]]},
{id:"recommandations",f:"tele",ic:"etoile",t:"Recommandations de serveurs",
d:"Discord deduit tes gouts pour te proposer des serveurs. Cette deduction cesse de remonter.",
k:[["p","noRecommendations"]],cpt:[["p","recommendations"]]},
{id:"sondage",f:"tele",ic:"globe",t:"Sondage des regions vocales",
d:"Avant chaque appel, le client mesure sa latence vers une dizaine de serveurs dans le monde. Cette carte de ta position n est plus dressee, mais Discord ne sait plus quel serveur est le plus proche : tes appels peuvent perdre en qualite.",
k:[["p","noVoiceProbe"]],cpt:[["p","voiceprobe"]]},

{id:"frappe",f:"social",ic:"crayon",t:"Frappe silencieuse",
d:"Personne ne voit plus que tu es en train d ecrire, dans aucun salon.",
k:[["p","silentTyping"]],cpt:[["p","typing"]],pv:["pv_frappe"]},
{id:"lecture",f:"social",ic:"oeilBarre",t:"Pas d accuse de lecture",
d:"Le client ne dit plus quels salons tu as lus. Les pastilles de non-lu deviennent moins fiables.",
k:[["p","noAck"]],cpt:[["p","ack"]],pv:["pv_lu"]},
{id:"inactif",f:"social",ic:"horloge",t:"Inactivite non signalee",
d:"Ton statut ne passe plus tout seul en absent apres quelques minutes sans toucher au clavier.",
k:[["p","noPresenceIdle"]],cpt:[["p","idle"]]},
{id:"affinites",f:"social",ic:"coeur",t:"Affinites sociales",
d:"Discord calcule qui tu frequentes le plus et le renvoie au serveur. Cette liste ne part plus.",
k:[["p","noAffinities"]],cpt:[["p","affinities"]]},
{id:"contacts",f:"social",ic:"comptes",t:"Synchronisation de contacts",
d:"L envoi de ton carnet d adresses et les suggestions d amis qui en decoulent sont coupes.",
k:[["p","noContacts"]],cpt:[["p","contacts"]]},
{id:"evenements",f:"social",ic:"calendrier",t:"Evenements de serveur",
d:"Ta participation aux evenements planifies et aux parcours d accueil n est plus remontee.",
k:[["p","noGuildEvents"]],cpt:[["p","guildevents"]]},
{id:"activite",f:"social",ic:"lecture",t:"Ton activite reste a toi",
d:"Le logiciel que tu utilises n est plus annonce a Discord ni a tes contacts, et la liste des jeux a reconnaitre n est plus telechargee.",
k:[["p","noActivityShare"],["p","noDetectables"]],cpt:[["p","activity"],["p","detectables"]]},

{id:"canvas",f:"empreinte",ic:"image",t:"Empreinte du canvas",
d:"Une page peut faire dessiner une image invisible et lire le resultat, assez different d une machine a l autre pour t identifier. Le dessin lu est legerement brouille.",
k:[["p","noCanvas"]],cpt:[["p","canvas"]]},
{id:"webgl",f:"empreinte",ic:"puce",t:"Modele de carte graphique",
d:"Le nom exact de ta carte graphique distingue tres finement une machine. Il est remplace par un modele courant.",
k:[["p","noWebGL"]],cpt:[["p","webgl"]]},
{id:"audio",f:"empreinte",ic:"pouls",t:"Empreinte audio",
d:"Le calcul du son laisse des ecarts minuscules propres a chaque machine. Un bruit tres en dessous du seuil de l oreille les couvre.",
k:[["p","noAudioFp"]],cpt:[["p","audiofp"]]},
{id:"ecran",f:"empreinte",ic:"grille",t:"Dimensions de l ecran",
d:"La taille exacte de ton ecran et sa profondeur de couleur sont annoncees comme celles d un ecran courant.",
k:[["p","noScreen"]],cpt:[["p","screen"]]},
{id:"greffons",f:"empreinte",ic:"boite",t:"Liste des greffons",
d:"La liste des greffons installes suffit a te reconnaitre. Elle est presentee vide, comme sur une installation neuve.",
k:[["p","noPlugins"]],cpt:[["p","plugins"]]},
{id:"batterie",f:"empreinte",ic:"batterie",t:"Etat de la batterie",
d:"Niveau de charge et temps restant suffisent a relier deux visites. Ils sont annonces comme un appareil branche et plein.",
k:[["p","noBattery"]],cpt:[["p","battery"]]},
{id:"indices",f:"empreinte",ic:"code",t:"Indices de client",
d:"La version exacte, l architecture et la version du systeme que le client peut detailler sur demande sont normalisees.",
k:[["p","noUAData"]],cpt:[["p","uadata"]]},
{id:"materiel",f:"empreinte",ic:"reglages",t:"Empreinte materielle",
d:"Le nombre de coeurs, la memoire et le tactile lus par les pages sont normalises. Prend effet au redemarrage.",
k:[["p","spoofHardware"]],cpt:[["p","hardware"]],pv:["pv_materiel"]},
{id:"appels",f:"empreinte",ic:"reseau",t:"Ton adresse pendant les appels",
d:"L adresse de ta machine sur ton reseau local est retiree de ce que le client annonce, et aucun relais etranger a Discord ne peut servir de passage.",
k:[["p","noWebRtcIp"],["p","blockStun"]],cpt:[["p","rtcip"],["p","stun"]],pv:["pv_stun"]},
{id:"entetes",f:"empreinte",ic:"etiquette",t:"En-tetes de suivi",
d:"x-debug-options et x-discord-timezone sont retires des requetes sortantes. L en-tete que Discord exige reste intact.",
k:[["p","stripHeaders"]],cpt:[["p","headers"]],pv:["pv_entetes"]},

{id:"liens",f:"traces",ic:"lien",t:"Liens sans pistage",
d:"utm, fbclid, igshid et une vingtaine d autres marqueurs sont retires des liens que tu ouvres, que tu copies et que tu envoies.",
k:[["p","stripTracking"],["p","cleanClipboard"],["p","cleanSentLinks"]],cpt:[["p","clip"],["p","sentlinks"]],pv:["pv_utm","pv_presse"]},
{id:"fichiers",f:"traces",ic:"image",t:"Photos et fichiers anonymises",
d:"Date, modele de l appareil et position GPS sont retires des photos avant l envoi, sans toucher un pixel, et le nom d origine devient fichier.jpg.",
k:[["p","stripExif"],["p","stripFilenames"]],cpt:[["p","exif"],["p","filenames"]],pv:["pv_noms"]},
{id:"purge",f:"traces",ic:"poubelle",t:"Effacer les traces a la fermeture",
d:"Statistiques, journaux et quarantaine sont effaces en quittant. Tes reglages, eux, restent.",
k:[["p","purgeOnQuit"]],pv:["pv_purge"]}];
try{window._NXPRIVCAT=_NXPRIVCAT;}catch(_){}

