var _NXSOS=window._NXSOS||(window._NXSOS={});
if(!_NXSOS.boot){try{_NXSOS.boot=true;
// La ligne de secours : quand Discord tombe, le repaire reste joignable.
//
// Tout repose sur un diagnostic honnete. Annoncer "Discord est tombe" quand
// c est la connexion de la personne qui a laché serait un mensonge, et cette
// fonction ne vaut que par sa justesse. On interroge donc DEUX points :
//   - Discord ;
//   - le relais Nexium, qui ne partage ni ses serveurs ni son reseau.
// Si le relais repond et que Discord ne repond pas, ce n est pas toi.
_NXSOS.DISCORD="https://discord.com/api/v9/gateway";
_NXSOS.etat={verdict:"inconnu",depuis:0,echecs:0,derniere:0,montre:false};
_NXSOS.ID="nx-sos";
_NXSOS._ecoute=[];

_NXSOS.notify=function(){try{
for(var a=0;a<_NXSOS._ecoute.length;a++){try{_NXSOS._ecoute[a]();}catch(_){}}}catch(_){}};

// Joignable veut dire : la machine d en face a repondu quelque chose. Meme un
// refus est une reponse -- il prouve que le chemin existe.
_NXSOS.sonde=function(url,opts){try{
return _NXNETX.go(url,opts||{method:"GET"},9000)
.then(function(r){return !!(r&&typeof r.status==="number");},function(){return false;});
}catch(_){return Promise.resolve(false);}};

_NXSOS.sondeDiscord=function(){return _NXSOS.sonde(_NXSOS.DISCORD,{method:"GET"});};
// On envoie exprès une demande que le relais refuse : sa reponse suffit, et
// on ne touche a aucun repaire.
_NXSOS.sondeRelais=function(){try{
return _NXSOS.sonde((window._NXCANAL&&_NXCANAL.URL)||"",
{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({action:"ping"})});}catch(_){return Promise.resolve(false);}};

_NXSOS.diagnostic=function(){try{
return Promise.all([_NXSOS.sondeDiscord(),_NXSOS.sondeRelais()])
.then(function(r){
var discord=r[0],relais=r[1];
if(discord)return "tout-va-bien";
if(relais)return "discord";
return "toi";});}catch(_){return Promise.resolve("inconnu");}};

_NXSOS.PHRASES={
"discord":"Discord est tombe. Ce n est pas toi : le reste de ton reseau repond.",
"toi":"Ta connexion ne repond plus. Ni Discord ni Nexium ne sont joignables.",
"tout-va-bien":"Discord repond normalement.",
"inconnu":"Etat inconnu : le diagnostic n a pas encore tourne."};

_NXSOS.phrase=function(){try{
return _NXSOS.PHRASES[_NXSOS.etat.verdict]||_NXSOS.PHRASES.inconnu;}catch(_){return "";}};

// Une panne se confirme avant de s annoncer : un appel qui rate une fois
// n est pas une panne, et un bandeau qui clignote ne serait pas cru.
_NXSOS.verifie=function(force){try{
_NXSOS.etat.derniere=Date.now();
return _NXSOS.diagnostic().then(function(v){
var avant=_NXSOS.etat.verdict;
if(v==="tout-va-bien"){
_NXSOS.etat.echecs=0;
if(avant==="discord"||avant==="toi"){
_NXSOS.etat.verdict=v;_NXSOS.etat.depuis=0;
_NXSOS.montreRetour();}
else{_NXSOS.etat.verdict=v;}
_NXSOS.notify();return v;}
_NXSOS.etat.echecs++;
if(_NXSOS.etat.echecs<2&&!force){_NXSOS.notify();return avant;}
if(!_NXSOS.etat.depuis)_NXSOS.etat.depuis=Date.now();
_NXSOS.etat.verdict=v;
_NXSOS.notify();
_NXSOS.montre();
return v;});}catch(_){return Promise.resolve("inconnu");}};

_NXSOS.depuisQuand=function(){try{
if(!_NXSOS.etat.depuis)return "";
var m=Math.round((Date.now()-_NXSOS.etat.depuis)/60000);
if(m<1)return "a l instant";
if(m===1)return "depuis 1 minute";
return "depuis "+m+" minutes";}catch(_){return "";}};

// --- le bandeau -------------------------------------------------------------
_NXSOS.ferme=function(){try{
var e=document.getElementById(_NXSOS.ID);
if(e&&e.parentNode)e.parentNode.removeChild(e);
_NXSOS.etat.montre=false;
return true;}catch(_){return false;}};

_NXSOS.barre=function(){try{
_NXSOS.ferme();
if(typeof document==="undefined"||!document.body)return null;
var P=_NXpal;
var b=document.createElement("div");
b.id=_NXSOS.ID;
b.setAttribute("role","status");
b.style.cssText="position:fixed;left:0;right:0;top:0;z-index:99400;display:flex;align-items:center;gap:12px;padding:10px 16px;background:"+P.raise+";border-bottom:1px solid "+P.edge+";color:"+P.txt+";font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,.35);";
return b;}catch(_){return null;}};

_NXSOS.bouton=function(txt,principal){try{
var P=_NXpal;
var x=document.createElement("button");
x.type="button";
x.textContent=_NXtr(txt);
x.style.cssText="margin-left:auto;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:12px;border:1px solid "+(principal?P.acc:P.edge)+";background:"+(principal?P.acc:"transparent")+";color:"+(principal?P.ink:P.pale)+";";
return x;}catch(_){return null;}};

_NXSOS.montre=function(){try{
if(typeof document==="undefined"||!document.body)return false;
var b=_NXSOS.barre();
if(!b)return false;
var P=_NXpal;
var pastille=document.createElement("span");
pastille.style.cssText="width:8px;height:8px;border-radius:50%;flex:0 0 auto;background:"+(_NXSOS.etat.verdict==="discord"?P.warn:P.danger)+";";
b.appendChild(pastille);
var txt=document.createElement("span");
txt.textContent=_NXSOS.phrase()+" "+_NXSOS.depuisQuand();
b.appendChild(txt);

if(_NXSOS.etat.verdict==="discord"){
var a=window._NXCANAL&&_NXCANAL.actif&&_NXCANAL.actif();
var btn=_NXSOS.bouton(a?"Ouvrir le repaire":"Creer un repaire",true);
if(btn){btn.onclick=function(){try{
_NXSOS.ferme();
if(window._NXCP)_NXCP.ouvrir("equicord_repaire","Nexium Repaire");}catch(_){}};
b.appendChild(btn);}}

var f=_NXSOS.bouton("Masquer",false);
if(f){f.style.marginLeft=(_NXSOS.etat.verdict==="discord"?"0":"auto");
f.onclick=function(){_NXSOS.ferme();};b.appendChild(f);}

document.body.appendChild(b);
_NXSOS.etat.montre=true;
return true;}catch(_){return false;}};

_NXSOS.montreRetour=function(){try{
if(typeof document==="undefined"||!document.body)return false;
var b=_NXSOS.barre();
if(!b)return false;
var P=_NXpal;
var pastille=document.createElement("span");
pastille.style.cssText="width:8px;height:8px;border-radius:50%;flex:0 0 auto;background:"+P.ok+";";
b.appendChild(pastille);
var txt=document.createElement("span");
txt.textContent=_NXtr("Discord est revenu.");
b.appendChild(txt);
var f=_NXSOS.bouton("Fermer",false);
if(f){f.onclick=function(){_NXSOS.ferme();};b.appendChild(f);}
document.body.appendChild(b);
_NXSOS.etat.montre=true;
setTimeout(function(){try{
if(_NXSOS.etat.verdict==="tout-va-bien")_NXSOS.ferme();}catch(_){}},12000);
return true;}catch(_){return false;}};

// --- la veille --------------------------------------------------------------
// Au calme, on regarde toutes les trois minutes. Des qu un doute apparait, on
// resserre : c est le moment ou la reponse compte.
_NXSOS.CALME=180000;
_NXSOS.TENDU=30000;

_NXSOS.veille=function(){try{
if(typeof document!=="undefined"&&document.hidden)return;
var mauvais=(_NXSOS.etat.verdict==="discord"||_NXSOS.etat.verdict==="toi"||_NXSOS.etat.echecs>0);
var attente=mauvais?_NXSOS.TENDU:_NXSOS.CALME;
if(_NXSOS.etat.derniere&&(Date.now()-_NXSOS.etat.derniere)<attente)return;
_NXSOS.verifie(false);}catch(_){}};

_NXSOS.etatLisible=function(){try{
return {verdict:_NXSOS.etat.verdict,phrase:_NXSOS.phrase(),
depuis:_NXSOS.depuisQuand(),echecs:_NXSOS.etat.echecs,
bandeau:!!_NXSOS.etat.montre};}catch(_){return {verdict:"inconnu"};}};

try{setInterval(_NXSOS.veille,20000);
setTimeout(function(){_NXSOS.veille();},45000);
if(typeof window!=="undefined"&&window.addEventListener){
// Le navigateur nous dit quand la connexion revient : c est le meilleur
// moment pour savoir ou on en est.
window.addEventListener("online",function(){try{
_NXSOS.etat.derniere=0;setTimeout(function(){_NXSOS.verifie(true);},2500);}catch(_){}});}
}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXSOS");if(window._NXERR)_NXERR.push("module _NXSOS :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXSOS desactive:",_nxE);}catch(_){}}
}
