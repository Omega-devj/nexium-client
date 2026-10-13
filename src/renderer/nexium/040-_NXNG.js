if(!_NXNG.boot){try{_NXNG.boot=true;
_NXNG.KEY="nexium_newgen_v150";
_NXNG.ID="nx-newgen";
_NXNG.vu=function(){try{return _NXDB.get(_NXNG.KEY)==="1";}catch(_){return false;}};
_NXNG.marquer=function(){try{_NXDB.set(_NXNG.KEY,"1");}catch(_){}};
_NXNG.PAS=[
{eyebrow:"Nexium NEW Gen",titre:"Le client change de generation.",
texte:"Cette version n ajoute pas une fonction de plus : elle refait le moteur de securite, la couche de vie privee, et la totalite des pages. Voici ce qui a change.",
chiffres:[["11","protections inedites"],["24","reglages de vie privee"],["11","pages refaites"]]},
{eyebrow:"Securite",titre:"Onze protections qui n existaient pas.",
listes:[["Cinq gardes de sortie",[
"Gardien des webhooks : la sortie qui passait par discord.com, donc que rien ne filtrait",
"Pare-feu sortant : aucune donnee ne part vers un serveur inconnu sans ton accord",
"Anti-balise invisible : image d un pixel, WebSocket, flux permanent",
"Gardien du DOM : scripts et cadres injectes, retires avant de servir",
"Anti-charge utile : le code qu un theme veut executer est lu avant"]],
["Six pieges dans les messages",[
"Caracteres invisibles caches dans un texte",
"Adresses de portefeuille, et detournement du presse-papiers",
"Liens recus en prive d un compte hors de tes amis",
"Fuite de webhook dans un message que tu envoies",
"Vagues coordonnees de comptes recents",
"Noms de fichiers a double extension ou sens de lecture inverse"]]]},
{eyebrow:"Anti-exfiltration",titre:"Ton jeton est reconnu meme deguise.",
texte:"Jusqu ici, seule sa forme litterale etait surveillee, et uniquement dans le corps de la requete.",
puces:["Encode en URL, en base64, inverse, recompose sans ses points, ou coupe en deux",
"L adresse de la requete est enfin inspectee : un jeton en parametre sortait sans un bruit",
"Corps binaires, formulaires et parametres d URL couverts",
"supabase.co n est plus autorise en entier : n importe qui pouvait ouvrir un projet gratuit et s en servir comme sortie",
"Le jeton ne reste plus pose sur une variable globale"]},
{eyebrow:"Failles corrigees",titre:"Quatre trous, dont un beant.",
puces:["La chaine de mise a jour n avait jamais fonctionne : le controle exigeait dix marqueurs qui n ont jamais existe qu en deux exemplaires. Aucune version publiee depuis un an n etait arrivee chez personne.",
"Un domaine de la base de menaces echappait au blocage s il etait servi sur un port inhabituel",
"Autoriser un domaine autorisait aussi tout domaine qui le contenait",
"Le lanceur sait desormais se mettre a jour lui-meme, avec retour arriere automatique"]},
{eyebrow:"Vie privee",titre:"Vingt-quatre reglages, trois profils, et des heures discretes.",
puces:["Telemetrie, plantages, moisson, analytique, promotions, tests A/B, detection de jeux, contacts, affinites, evenements, recommandations, sondage vocal",
"Frappe silencieuse, accuses de lecture, inactivite, partage de l activite en cours",
"En-tetes de suivi retires, empreinte materielle normalisee, serveurs STUN etrangers ecartes",
"Noms de fichiers anonymises a l envoi, liens copies nettoyes, traces purgees a la fermeture",
"Heures discretes : sur une plage horaire, le client passe tout seul en confidentialite maximale"]},
{eyebrow:"Interface",titre:"Onze pages refaites, de fond en comble.",
puces:["Un accueil qui devient un vrai tableau de bord",
"Protect : anneau de protection, vitrines des nouveautes, journal des sorties",
"Privacy : jauge segmentee, barre de flux, histogramme et bilan de la semaine",
"Reseau : trace de latence, inventaire des hotes, routes les plus lentes",
"Stats : calendrier de constance, rythme de journee, objectifs",
"Donnees : inspecteur de contenu, sauvegardes automatiques, tableau de sante",
"Music : disque qui tourne, forme d onde, touches media du clavier",
"Theme, Team, Sponsor et journal des versions"]},
{eyebrow:"Performances",titre:"Moins de travail a chaque message.",
puces:["Classification des requetes : une seule expression au lieu de douze, 1,6 fois plus rapide",
"162 400 recherches dans les stores de Discord remplacees par deux",
"Les tableaux de reglages ne sont plus reconstruits a chaque rendu",
"Les ecritures sur disque attendent un temps mort",
"Un panneau complet se redessine en moins d une milliseconde"],
final:true}];
_NXNG.el=function(t,style,txt){var e=document.createElement(t);if(style)e.style.cssText=style;if(txt!=null)e.textContent=_NXtr(txt);return e;};
_NXNG.fermer=function(){try{
_NXNG.marquer();
var ov=document.getElementById(_NXNG.ID);
if(!ov)return;
ov.style.opacity="0";
ov.style.transform="scale(.985)";
setTimeout(function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}},240);
}catch(_){}};
_NXNG.dessine=function(idx){try{
var P=_NXpal;
var ov=document.getElementById(_NXNG.ID);
if(!ov)return;
var pas=_NXNG.PAS[idx];
var corps=ov.querySelector("[data-nxng-corps]");
if(!corps)return;
corps.innerHTML="";
corps.style.animation="none";
void corps.offsetWidth;
corps.style.animation="nx-rise .34s cubic-bezier(.22,.8,.28,1) both";
corps.appendChild(_NXNG.el("div","font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:"+P.faint+";margin-bottom:13px;",pas.eyebrow));
corps.appendChild(_NXNG.el("div","font-family:"+_NXf.disp+";font-size:29px;font-weight:800;color:"+P.txt+";letter-spacing:-.042em;line-height:1.14;margin-bottom:"+(pas.texte?"13px":"20px")+";",pas.titre));
if(pas.texte)corps.appendChild(_NXNG.el("div","font-size:13.5px;color:"+P.sub+";line-height:1.68;margin-bottom:22px;max-width:520px;",pas.texte));
if(pas.chiffres){
var row=_NXNG.el("div","display:flex;gap:26px;flex-wrap:wrap;margin-top:6px;");
for(var c=0;c<pas.chiffres.length;c++){
var bloc=_NXNG.el("div","min-width:104px;");
bloc.appendChild(_NXNG.el("div","font-family:"+_NXf.disp+";font-size:38px;font-weight:800;color:"+P.txt+";letter-spacing:-.05em;line-height:1;",pas.chiffres[c][0]));
bloc.appendChild(_NXNG.el("div","font-size:11.5px;color:"+P.dim+";margin-top:7px;line-height:1.4;",pas.chiffres[c][1]));
row.appendChild(bloc);}
corps.appendChild(row);}
if(pas.listes){
for(var l=0;l<pas.listes.length;l++){
var grp=pas.listes[l];
corps.appendChild(_NXNG.el("div","font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:"+P.dim+";margin:"+(l?"20px":"2px")+" 0 10px;",grp[0]));
for(var m=0;m<grp[1].length;m++)corps.appendChild(_NXNG.puce(grp[1][m],m));}}
if(pas.puces){for(var p=0;p<pas.puces.length;p++)corps.appendChild(_NXNG.puce(pas.puces[p],p));}
var pts=ov.querySelector("[data-nxng-points]");
if(pts){var enf=pts.childNodes;
for(var q=0;q<enf.length;q++){
enf[q].style.width=(q===idx?"20px":"6px");
enf[q].style.background=(q===idx?P.txt:P.faint);}}
var prec=ov.querySelector("[data-nxng-prec]");
if(prec)prec.style.visibility=idx?"visible":"hidden";
var suiv=ov.querySelector("[data-nxng-suiv]");
if(suiv)suiv.textContent=(idx>=_NXNG.PAS.length-1)?_NXtr("Commencer"):_NXtr("Suivant");
_NXNG.idx=idx;}catch(_){}};
_NXNG.puce=function(txt,k){try{
var P=_NXpal;
var l=_NXNG.el("div","display:flex;gap:11px;align-items:flex-start;padding:6px 0;animation:nx-rise .3s cubic-bezier(.22,.8,.28,1) both;animation-delay:"+(0.03*k+0.05)+"s;");
var d=_NXNG.el("div","width:5px;height:5px;border-radius:50%;background:"+P.mid+";flex-shrink:0;margin-top:8px;");
var t=_NXNG.el("div","font-size:12.5px;color:"+P.sub+";line-height:1.62;",txt);
l.appendChild(d);l.appendChild(t);
return l;}catch(_){return _NXNG.el("div",null,txt);}};
_NXNG.show=function(){try{
if(!document.body)return;
if(document.getElementById(_NXNG.ID))return;
// La place est-elle libre ? Sinon on repassera.
if(window._NXQ&&!_NXQ.reserve("newgen")){setTimeout(_NXNG.show,3000);return;}
var P=_NXpal;
var ov=_NXNG.el("div","position:fixed;left:0;top:0;right:0;bottom:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(0,0,0,"+(P.light?".42":".76")+");opacity:0;transition:opacity .3s ease,transform .3s ease;");
ov.id=_NXNG.ID;
var carte=_NXNG.el("div","position:relative;overflow:hidden;width:640px;max-width:100%;max-height:88vh;display:flex;flex-direction:column;border-radius:26px;border:1px solid "+P.hair+";background:linear-gradient(158deg,"+P.panel+","+P.bg+");box-shadow:0 40px 110px rgba(0,0,0,.62);");
var halo=_NXNG.el("div","position:absolute;right:-110px;top:-130px;width:340px;height:340px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,"+P.txt+"14,transparent 70%);animation:nx-breathe 4s ease-in-out infinite;");
carte.appendChild(halo);
var tete=_NXNG.el("div","position:relative;display:flex;align-items:center;gap:11px;padding:20px 26px 0;flex-shrink:0;");
tete.appendChild(_NXNG.el("div","font-size:10px;font-weight:900;letter-spacing:.42em;color:"+P.txt+";","NEXIUM"));
var badge=_NXNG.el("div","margin-left:auto;font-family:"+_NXf.mono+";font-size:10.5px;color:"+P.dim+";padding:3px 10px;border-radius:99px;border:1px solid "+P.line+";","v"+((window._NXUP&&_NXUP.VERSION)||"150"));
tete.appendChild(badge);
carte.appendChild(tete);
var corps=_NXNG.el("div","position:relative;flex:1;min-height:0;overflow-y:auto;padding:26px 26px 8px;");
corps.setAttribute("data-nxng-corps","1");
carte.appendChild(corps);
var pied=_NXNG.el("div","position:relative;display:flex;align-items:center;gap:14px;padding:18px 26px 22px;border-top:1px solid "+P.line+";flex-shrink:0;");
var pts=_NXNG.el("div","display:flex;align-items:center;gap:6px;flex:1;");
pts.setAttribute("data-nxng-points","1");
for(var a=0;a<_NXNG.PAS.length;a++){
var pt=_NXNG.el("div","height:6px;width:6px;border-radius:99px;background:"+P.faint+";transition:width .3s cubic-bezier(.22,.8,.28,1),background-color .3s ease;");
pts.appendChild(pt);}
pied.appendChild(pts);
var mkBtn=function(txt,style,fn,attr){
var b=_NXNG.el("div",style,txt);
b.className="nx-fx";
b.setAttribute("role","button");
b.setAttribute("tabindex","0");
if(attr)b.setAttribute(attr,"1");
b.onclick=fn;
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
return b;};
pied.appendChild(mkBtn("Precedent","padding:10px 16px;border-radius:11px;cursor:pointer;font-size:12.5px;font-weight:700;color:"+P.dim+";visibility:hidden;",
function(){if(_NXNG.idx>0)_NXNG.dessine(_NXNG.idx-1);},"data-nxng-prec"));
pied.appendChild(mkBtn("Suivant","padding:11px 24px;border-radius:11px;cursor:pointer;font-size:13px;font-weight:800;background:"+P.acc+";color:"+(P.light?"#fff":_NXpal.ink)+";",
function(){if(_NXNG.idx>=_NXNG.PAS.length-1)_NXNG.fermer();else _NXNG.dessine(_NXNG.idx+1);},"data-nxng-suiv"));
carte.appendChild(pied);
ov.appendChild(carte);
ov.onclick=function(e){if(e.target===ov)_NXNG.fermer();};
document.body.appendChild(ov);
_NXNG.dessine(0);
setTimeout(function(){try{ov.style.opacity="1";}catch(_){}},20);
_NXNG._clav=function(e){try{
if(_NXsaisie(e))return;
if(e.key==="Escape"){_NXNG.fermer();document.removeEventListener("keydown",_NXNG._clav,true);return;}
if(e.key==="ArrowRight"&&_NXNG.idx<_NXNG.PAS.length-1)_NXNG.dessine(_NXNG.idx+1);
if(e.key==="ArrowLeft"&&_NXNG.idx>0)_NXNG.dessine(_NXNG.idx-1);}catch(_){}};
document.addEventListener("keydown",_NXNG._clav,true);
}catch(_){}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXNG");}catch(_){}}
}
