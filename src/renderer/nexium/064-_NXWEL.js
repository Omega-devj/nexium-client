var _NXWEL=window._NXWEL||(window._NXWEL={});
if(!_NXWEL.boot){try{_NXWEL.boot=true;
_NXWEL.KEY="nexium_accueil";
_NXWEL.ID="nx-accueil";
_NXWEL.el=null;
_NXWEL.pas=0;
_NXWEL.vu=function(){try{return _NXDB.get(_NXWEL.KEY)==="1";}catch(_){return false;}};
_NXWEL.marque=function(){try{_NXDB.set(_NXWEL.KEY,"1");}catch(_){}};
_NXWEL.teinte=function(){try{
var S=window._NXSKIN;
if(S&&S.cfg.on){var A=S.ACCENTS[S.cfg.accent];if(A)return A.val;}
}catch(_){}return _NXpal.acc;};
_NXWEL.fonds=function(){try{
var S=window._NXSKIN;
if(S&&S.cfg.on){var V=S.VARIANTES[S.cfg.variante];
if(V)return {panel:V.bg2,inset:V.bg1,line:V.line,txt:V.txt,dim:V.dim,sub:V.sub,ink:V.clair?"#ffffff":"#0a0a0a"};}
}catch(_){}
return {panel:_NXpal.panel,inset:_NXpal.inset,line:_NXpal.line,txt:_NXpal.txt,dim:_NXpal.dim,sub:_NXpal.sub,ink:_NXpal.ink};};
_NXWEL.el2=function(tag,css,txt){var e=document.createElement(tag);if(css)e.style.cssText=css;if(txt!=null)e.textContent=_NXtr(txt);return e;};
_NXWEL.ligne=function(titre,detail){
var F=_NXWEL.fonds(),t=_NXWEL.teinte();
var w=_NXWEL.el2("div","display:flex;gap:12px;align-items:flex-start;padding:9px 0;");
w.appendChild(_NXWEL.el2("div","width:6px;height:6px;margin-top:6px;flex-shrink:0;background:"+t+";"));
var c=_NXWEL.el2("div","min-width:0;");
c.appendChild(_NXWEL.el2("div","font-size:13px;font-weight:700;color:"+F.txt+";letter-spacing:-.01em;",titre));
c.appendChild(_NXWEL.el2("div","font-size:12px;color:"+F.dim+";line-height:1.55;margin-top:2px;",detail));
w.appendChild(c);return w;};
_NXWEL.pastille=function(lab,actif,fn){
var F=_NXWEL.fonds(),t=_NXWEL.teinte();
var b=_NXWEL.el2("div","padding:7px 13px;border-radius:99px;cursor:pointer;font-size:11.5px;font-weight:700;letter-spacing:.02em;"
+"border:1px solid "+(actif?t:F.line)+";background:"+(actif?t:"transparent")+";color:"+(actif?F.ink:F.sub)+";",lab);
b.onclick=fn;return b;};
_NXWEL.rangee=function(titre,choix,courant,fn){
var F=_NXWEL.fonds();
var w=_NXWEL.el2("div","padding:11px 0;");
w.appendChild(_NXWEL.el2("div","font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:"+F.dim+";margin-bottom:9px;",titre));
var r=_NXWEL.el2("div","display:flex;gap:7px;flex-wrap:wrap;");
for(var a=0;a<choix.length;a++)(function(c){
r.appendChild(_NXWEL.pastille(c[1],courant===c[0],function(){fn(c[0]);}));})(choix[a]);
w.appendChild(r);return w;};
_NXWEL.bouton=function(lab,fn){
var F=_NXWEL.fonds(),t=_NXWEL.teinte();
var b=_NXWEL.el2("div","display:inline-block;padding:9px 16px;border-radius:10px;cursor:pointer;font-size:12.5px;font-weight:700;"
+"border:1px solid "+F.line+";color:"+F.txt+";background:transparent;",lab);
b.onmouseenter=function(){b.style.borderColor=t;};
b.onmouseleave=function(){b.style.borderColor=F.line;};
b.onclick=fn;return b;};
_NXWEL.PAS=function(){
var S=window._NXSKIN;
return [
{cle:"ouverture",titre:_T("Discord, repris en main."),
 sous:_T("Nexium Client n est pas un greffon de plus. C est un client complet, en francais, avec sa propre facon de faire."),
 corps:function(zone){
  zone.appendChild(_NXWEL.ligne(_T("Il te protege"),_T("Liens pieges, faux serveurs officiels, tentatives de vol de jeton : analyses avant que tu cliques.")));
  zone.appendChild(_NXWEL.ligne(_T("Il ne te surveille pas"),_T("Tout est calcule sur ta machine. Aucune analytique, aucun profilage.")));
  zone.appendChild(_NXWEL.ligne(_T("Il est fini"),_T("Onze pages, une identite visuelle coherente, et chaque reglage explique ce qu il fait vraiment.")));}},
{cle:"apparence",titre:_T("Ton client, ton allure."),
 sous:_T("Choisis maintenant, la fenetre change derriere. Tout est modifiable plus tard dans Nexium Donnees."),
 corps:function(zone){
  if(!S||!S.cfg.on){zone.appendChild(_NXWEL.ligne(_T("Theme desactive"),_T("Active Apparence Nexium dans Nexium Donnees pour retrouver ces reglages.")));return;}
  zone.appendChild(_NXWEL.rangee(_T("Fond"),[["encre",_T("Encre")],["graphite",_T("Graphite")],["papier",_T("Papier")]],S.cfg.variante,
   function(v){S.set("variante",v);_NXWEL.dessine();}));
  zone.appendChild(_NXWEL.rangee(_T("Accent"),[["ivoire",_T("Ivoire")],["cendre",_T("Cendre")],["braise",_T("Braise")],["discord",_T("Aucun")]],S.cfg.accent,
   function(v){S.set("accent",v);_NXWEL.dessine();}));
  zone.appendChild(_NXWEL.rangee(_T("Signature"),[["discrete",_T("Discrete")],["affirmee",_T("Affirmee")],["totale",_T("Totale")]],S.cfg.intensite,
   function(v){S.set("intensite",v);_NXWEL.dessine();}));}},
{cle:"protection",titre:_T("Ce qui est arrete avant toi."),
 sous:_T("Nexium Protect travaille en fond. Voici ce qu il regarde."),
 corps:function(zone){
  zone.appendChild(_NXWEL.ligne(_T("Chaque lien recu"),_T("Domaine imite, redirection, page de connexion factice : le lien est inspecte sans jamais etre execute.")));
  zone.appendChild(_NXWEL.ligne(_T("Chaque serveur rejoint"),_T("Un nom de marque sans badge de verification est signale avant que tu t installes.")));
  zone.appendChild(_NXWEL.ligne(_T("Ce que tu envoies"),_T("Jeton colle par erreur, coordonnees GPS cachees dans une photo : tu es prevenu avant l envoi.")));
  zone.appendChild(_NXWEL.ligne(_T("Ton ecran partage"),_T("Un bouton floute les messages prives et masque les pseudos le temps du partage.")));
  var l=_NXWEL.el2("div","margin-top:14px;");
  l.appendChild(_NXWEL.bouton(_T("Ouvrir Nexium Protect"),function(){_NXWEL.fermer();try{_NXCP.ouvrir("equicord_protect","Nexium Protect");}catch(_){}}));
  zone.appendChild(l);}},
{cle:"vieprivee",titre:_T("Rien ne part d ici."),
 sous:_T("Le seul moyen de le savoir, c est de pouvoir le verifier. Alors le client te le montre."),
 corps:function(zone){
  zone.appendChild(_NXWEL.ligne(_T("La liste des hotes contactes"),_T("Nexium Reseau nomme chaque serveur joint au demarrage et mesure ce qui lui est transmis.")));
  zone.appendChild(_NXWEL.ligne(_T("Tes donnees restent locales"),_T("Statistiques, retrospectives, automatisations : calcule et stocke sur ta machine, exportable, effacable.")));
  zone.appendChild(_NXWEL.ligne(_T("Aucune analytique"),_T("Pas de mesure d audience, pas de remontee d usage. Ce choix est definitif.")));
  var l=_NXWEL.el2("div","margin-top:14px;");
  l.appendChild(_NXWEL.bouton(_T("Ouvrir Nexium Reseau"),function(){_NXWEL.fermer();try{_NXCP.ouvrir("equicord_network","Nexium Reseau");}catch(_){}}));
  zone.appendChild(l);}}
];};
_NXWEL.dessine=function(){try{
if(!_NXWEL.el)return;
var F=_NXWEL.fonds(),t=_NXWEL.teinte();
var pas=_NXWEL.PAS(),p=pas[_NXWEL.pas]||pas[0];
var carte=_NXWEL.carte;
carte.style.background=F.panel;carte.style.borderColor=F.line;
while(carte.firstChild)carte.removeChild(carte.firstChild);
var tete=_NXWEL.el2("div","padding:26px 28px 16px;border-bottom:1px solid "+F.line+";");
tete.appendChild(_NXWEL.el2("div","font-size:10px;font-weight:800;letter-spacing:.42em;color:"+t+";margin-bottom:14px;","NEXIUM"));
tete.appendChild(_NXWEL.el2("div","font-size:25px;font-weight:800;letter-spacing:-.025em;line-height:1.15;color:"+F.txt+";",p.titre));
tete.appendChild(_NXWEL.el2("div","font-size:12.5px;color:"+F.dim+";margin-top:8px;line-height:1.55;",p.sous));
carte.appendChild(tete);
var zone=_NXWEL.el2("div","padding:16px 28px 20px;min-height:216px;overflow-y:auto;flex:1;");
try{p.corps(zone);}catch(_){}
carte.appendChild(zone);
var pied=_NXWEL.el2("div","padding:15px 28px;border-top:1px solid "+F.line+";display:flex;align-items:center;gap:12px;");
var points=_NXWEL.el2("div","display:flex;gap:6px;flex:1;");
for(var a=0;a<pas.length;a++)(function(n){
var d=_NXWEL.el2("div","width:"+(n===_NXWEL.pas?"18px":"6px")+";height:6px;border-radius:99px;cursor:pointer;background:"+(n===_NXWEL.pas?t:F.line)+";");
d.onclick=function(){_NXWEL.pas=n;_NXWEL.dessine();};
points.appendChild(d);})(a);
pied.appendChild(points);
if(_NXWEL.pas<pas.length-1){
var passer=_NXWEL.el2("div","font-size:12px;color:"+F.dim+";cursor:pointer;padding:6px;",_T("Passer"));
passer.onclick=function(){_NXWEL.fermer();};
pied.appendChild(passer);}
var suite=_NXWEL.el2("div","padding:11px 22px;border-radius:11px;cursor:pointer;font-size:13px;font-weight:800;letter-spacing:-.01em;"
+"background:"+t+";color:"+F.ink+";",_NXWEL.pas<pas.length-1?_T("Suivant"):_T("Commencer"));
suite.onclick=function(){
if(_NXWEL.pas<pas.length-1){_NXWEL.pas++;_NXWEL.dessine();}
else _NXWEL.fermer();};
pied.appendChild(suite);
carte.appendChild(pied);}catch(_){}};
_NXWEL.show=function(){try{
if(_NXWEL.el)return;
if(typeof document==="undefined"||!document.body)return;
// L accueil est prioritaire : il ne cede qu a l ecran d ouverture.
if(document.getElementById("nx-boot")){setTimeout(_NXWEL.show,1500);return;}
if(window._NXQ)_NXQ.reserve("accueil");
_NXWEL.pas=0;
var ov=_NXWEL.el2("div","position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;"
+"background:rgba(0,0,0,.74);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);");
ov.id=_NXWEL.ID;
var carte=_NXWEL.el2("div","width:520px;max-width:calc(100vw - 40px);max-height:calc(100vh - 80px);display:flex;flex-direction:column;"
+"border:1px solid "+_NXpal.line+";border-radius:22px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.62);");
ov.appendChild(carte);
ov.onclick=function(e){if(e.target===ov)_NXWEL.fermer();};
document.body.appendChild(ov);
_NXWEL.el=ov;_NXWEL.carte=carte;
_NXWEL.dessine();}catch(_){}};
_NXWEL.fermer=function(){try{
_NXWEL.marque();
if(_NXWEL.el&&_NXWEL.el.parentNode)_NXWEL.el.parentNode.removeChild(_NXWEL.el);}catch(_){}
_NXWEL.el=null;_NXWEL.carte=null;};
_NXWEL.rejouer=function(){try{_NXWEL.fermer();_NXWEL.show();}catch(_){}};
_NXWEL.status=function(){try{
return {vu:_NXWEL.vu(),ouvert:!!_NXWEL.el,pas:_NXWEL.pas,volets:_NXWEL.PAS().length};}catch(_){return {};}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXWEL");if(window._NXERR)_NXERR.push("module _NXWEL :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXWEL desactive:",_nxE);}catch(_){}}
}
