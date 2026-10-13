var _NXUP=window._NXUP||(window._NXUP={});
if(!_NXUP.boot){_NXUP.boot=true;
_NXUP.COMPAT='registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord" registrar:"NanoCord"';
_NXUP.compatOk=function(){try{return (String(_NXUP.COMPAT).match(/registrar:"NanoCord"/g)||[]).length>=10;}catch(_){return false;}};
_NXUP.APPLIED="__NEXIUM_APPLIED_SHA__";_NXUP.VERSION="204";_NXUP.repoVersion=null;
_NXUP.KEY="nexium_update_v1";
_NXUP.SLUG="Omega-devj/nexium-client";

_NXUP.RAW_URL="https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/resources/equicord/renderer.js";
_NXUP.REPO="https://github.com/Omega-devj/nexium-client/";
_NXUP.st=(function(){try{var raw=_NXDB.get(_NXUP.KEY);var d=raw?JSON.parse(raw):null;if(d&&typeof d==="object")return {seen:d.seen||"",notified:d.notified||""};}catch(_){}return {seen:"",notified:""};})();
_NXUP.save=function(){_NXDB.set(_NXUP.KEY,JSON.stringify(_NXUP.st));};
_NXUP.latest=null;_NXUP.listeners=[];_NXUP.busy=false;_NXUP.err=false;_NXUP.native=null;_NXUP.msg="";
_NXUP.notify=function(){for(var a=0;a<_NXUP.listeners.length;a++){try{_NXUP.listeners[a]();}catch(_){}}};
_NXUP.short=function(s){return (s||"").slice(0,7);};

_NXUP.checkRaw=function(){try{_NXNETX.go(_NXUP.RAW_URL+"?nx="+Date.now(),{cache:"no-store"}).then(function(r){if(!r||!r.ok)throw new Error("http");return r.text();}).then(function(t){t=String(t||"");if(t.length<50000)throw new Error("short");var mv=t.match(/_NXUP\.VERSION="(\d+)"/);var rv=mv?parseInt(mv[1],10):null;_NXUP.repoVersion=rv;_NXUP.latest={version:rv,raw:true,msg:"Nouvelle version disponible",date:""};_NXUP.busy=false;_NXUP.err=false;_NXUP.marqueVu();_NXUP.jlog(_NXUP.available()?("Mise à jour disponible : v"+_NXUP.VERSION+" -> v"+rv):("Vérifié : à jour (v"+_NXUP.VERSION+")"));if(_NXUP.available()&&_NXUP.st.notified!==rv){_NXUP.st.notified=rv;_NXUP.save();_NXUP.toast("Nexium — nouvelle version disponible.");}_NXUP.maybePrompt();_NXUP.notify();}).catch(function(){_NXUP.busy=false;_NXUP.err=true;_NXUP.jlog("Dépôt injoignable (réseau)");_NXUP.notify();});}catch(_){_NXUP.busy=false;_NXUP.err=true;_NXUP.notify();}};
// L heure de la derniere verification aboutie. Sans elle, "client a jour" ne
// vaut rien : on ignore si le renseignement date de dix secondes ou de la
// veille.
_NXUP.VKEY="nexium_update_vu";
_NXUP.vu=(function(){try{return parseInt(_NXDB.get(_NXUP.VKEY),10)||0;}catch(_){return 0;}})();
_NXUP.marqueVu=function(){try{
_NXUP.vu=Date.now();
_NXDB.set(_NXUP.VKEY,String(_NXUP.vu));}catch(_){}};

// Les notes de la version proposee, lues sur le depot. Redemarrer sans savoir
// ce qui change n est pas une decision, c est un reflexe.
_NXUP.NOTES_URL="https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/CHANGELOG.md";
_NXUP.notes=null;_NXUP.notesBusy=false;_NXUP.notesErr=false;
_NXUP.litNotes=function(){try{
if(_NXUP.notesBusy||_NXUP.notes)return;
_NXUP.notesBusy=true;_NXUP.notify();
_NXNETX.go(_NXUP.NOTES_URL+"?nx="+Date.now(),{cache:"no-store"})
.then(function(r){if(!r||!r.ok)throw new Error("http");return r.text();})
.then(function(t){
_NXUP.notesBusy=false;
_NXUP.notes=_NXUP.decoupeNotes(String(t||""));
_NXUP.notesErr=!_NXUP.notes;
_NXUP.notify();})
.catch(function(){_NXUP.notesBusy=false;_NXUP.notesErr=true;_NXUP.notify();});
}catch(_){_NXUP.notesBusy=false;_NXUP.notesErr=true;}};
// On ne garde que les sections plus recentes que la version installee : ce
// qui est deja en place n a pas a etre presente comme nouveau.
_NXUP.decoupeNotes=function(txt){try{
var L=String(txt||"").split(/\r?\n/);
var out=[],cur=null,local=parseInt(_NXUP.VERSION,10)||0;
for(var a=0;a<L.length;a++){
var m=L[a].match(/^##\s+v(\d+)\s*[-\u2014]?\s*(.*)$/);
if(m){
var v=parseInt(m[1],10);
if(v<=local){cur=null;continue;}
cur={v:v,titre:(m[2]||"").trim(),lignes:[]};
out.push(cur);
continue;}
if(!cur)continue;
var x=L[a].replace(/^\s*[-*]\s*/,"").trim();
if(!x)continue;
if(/^#/.test(x)){cur.lignes.push({t:x.replace(/^#+\s*/,""),chef:true});continue;}
cur.lignes.push({t:x.slice(0,220),chef:false});}
if(!out.length)return null;
for(var b=0;b<out.length;b++)out[b].lignes=out[b].lignes.slice(0,14);
return out.slice(0,4);}catch(_){return null;}};

_NXUP.available=function(){var lv=parseInt(_NXUP.VERSION,10)||0;return _NXUP.repoVersion!=null&&_NXUP.repoVersion>lv;};
_NXUP.ahead=function(){var lv=parseInt(_NXUP.VERSION,10)||0;return _NXUP.repoVersion!=null&&lv>_NXUP.repoVersion;};
_NXUP.toast=function(m){try{var T=window.Vencord&&Vencord.Webpack&&Vencord.Webpack.Common&&Vencord.Webpack.Common.Toasts;if(T&&T.show)T.show({message:m,id:T.genId(),type:T.Type.MESSAGE,options:{position:T.Position.BOTTOM}});}catch(_){}};
_NXUP.probeNative=function(){try{var U=window.Vencord&&Vencord.Updater;if(!U||typeof U.getRepo!=="function"){_NXUP.native=false;return;}Promise.resolve(U.getRepo()).then(function(r){var url=(r&&(r.value||r))||"";_NXUP.native=String(url).toLowerCase().indexOf(_NXUP.SLUG.toLowerCase())>=0;_NXUP.notify();}).catch(function(){_NXUP.native=false;_NXUP.notify();});}catch(_){_NXUP.native=false;}};
_NXUP.jrn=function(){try{var raw=_NXDB.get("nexium_update_log");return raw?JSON.parse(raw):[];}catch(_){return [];}};
_NXUP.jlog=function(msg){try{var L=_NXUP.jrn();L.unshift({t:Date.now(),m:String(msg).slice(0,120)});if(L.length>30)L=L.slice(0,30);_NXDB.set("nexium_update_log",JSON.stringify(L));}catch(_){}};
_NXUP.calmeEquicord=function(){try{
var V=window.Vencord;
if(!V||!V.Settings){_NXUP._ceN=(_NXUP._ceN||0)+1;if(_NXUP._ceN<40)setTimeout(_NXUP.calmeEquicord,1000);return;}
try{if(V.Settings.autoUpdate!==false)V.Settings.autoUpdate=false;}catch(_){}
try{if(V.Settings.autoUpdateNotification!==false)V.Settings.autoUpdateNotification=false;}catch(_){}
_NXUP.equicordCalme=true;}catch(_){}};
_NXUP.noticesRetirees=0;
_NXUP.chasseNotice=function(){try{
var N=window.Vencord&&Vencord.Api&&Vencord.Api.Notices;
if(!N||typeof N.popNotice!=="function")return;
var t="";
try{t=String(JSON.stringify(N.currentNotice||""));}catch(_){t="";}
if(t.indexOf("has been updated")>=0||t.indexOf("new version of Nexium")>=0||t.indexOf("An Nexium")>=0){
N.popNotice();_NXUP.noticesRetirees++;}
}catch(_){}};
try{setTimeout(_NXUP.calmeEquicord,800);
_NXUP._noN=0;
_NXUP._noI=setInterval(function(){try{
_NXUP._noN++;_NXUP.chasseNotice();
if(_NXUP._noN>60){clearInterval(_NXUP._noI);_NXUP._noI=null;}}catch(_){}},3000);}catch(_){}
_NXUP.check=function(){if(_NXUP.banned)return;if(_NXUP.busy)return;_NXUP.busy=true;_NXUP.err=false;_NXUP.notify();_NXUP.checkRaw();};
_NXUP.markUpdated=function(){_NXUP.notify();};
_NXUP.relaunch=function(){try{if(window.DiscordNative&&DiscordNative.processUtils&&typeof DiscordNative.processUtils.restart==="function"){DiscordNative.processUtils.restart();return true;}}catch(_){}try{if(window.DiscordNative&&DiscordNative.app&&DiscordNative.app.relaunch){DiscordNative.app.relaunch();return true;}}catch(_){}return false;};
_NXUP.relaunchApply=function(){_NXUP.msg="Redémarrage pour appliquer la mise à jour…";_NXUP.notify();if(!_NXUP.relaunch())_NXUP.msg="Ferme complètement Discord puis rouvre-le pour appliquer la mise à jour.";_NXUP.notify();};
_NXUP.openRepo=function(){try{_NXP.open(_NXUP.REPO);}catch(_){}};
_NXUP.snoozeUntil=0;try{_NXUP.snoozeUntil=parseInt((_NXUP.st&&_NXUP.st.snooze)||0,10)||0;}catch(_){}_NXUP.modalEl=null;
_NXUP.hideModal=function(){try{
var d=_NXUP.modalEl;
_NXUP.modalEl=null;
try{if(_NXUP._clav)document.removeEventListener("keydown",_NXUP._clav,true);}catch(_){}
if(!d)return;
try{d.className=(d.className+" nxu-part").replace(/^ /,"");}catch(_){}
setTimeout(function(){try{
if(d&&d.parentNode)d.parentNode.removeChild(d);
// La feuille ne part que si plus aucune carte ne s en sert.
if(!_NXUP.modalEl){var st=document.getElementById("nx-maj-style");
if(st&&st.parentNode)st.parentNode.removeChild(st);}}catch(_){}},300);
}catch(_){_NXUP.modalEl=null;}};
// L invitation a mettre a jour.
//
// Avant, elle disait "une nouvelle version est prete" et rien d autre : aucune
// raison de cliquer, et un flou plein ecran qui coutait cher a chaque image.
// Maintenant elle montre ce que la version apporte -- les vraies lignes du
// changelog, lues sur le depot -- et ne fait bouger que des transformations.
// ------------------------------------------------- le plancher de version
// Ce que l equipe exige au minimum. Lu au demarrage, puis toutes les heures.
// Si la lecture echoue, on ne bloque personne : un serveur muet ne doit pas
// rendre le client inutilisable.
_NXUP.plancher=0;
_NXUP.plancherMsg="";
_NXUP.plancherAt=0;
_NXUP.litPlancher=function(cb){try{
if(!window._NXABO||!_NXNETX){if(cb)cb();return;}
if(_NXUP.plancherAt&&(Date.now()-_NXUP.plancherAt)<3600000){if(cb)cb();return;}
_NXNETX.go(_NXABO.URL+"nx_maj_plancher",{method:"POST",cache:"no-store",
headers:{apikey:_NXABO.CLE,"Content-Type":"application/json",Accept:"application/json"},
body:"{}"},15000)
.then(function(r){if(!r||!r.ok)throw 0;return r.json();})
.then(function(j){
_NXUP.plancherAt=Date.now();
var m=parseInt((j&&j.min)||"0",10);
_NXUP.plancher=isFinite(m)?m:0;
_NXUP.plancherMsg=(j&&j.message)||"";
_NXUP.notify();
try{_NXUP.maybeObligatoire();}catch(_){}
if(cb)cb();})
.catch(function(){if(cb)cb();});
}catch(_){if(cb)cb();}};
// La version installee est-elle sous le plancher ?
_NXUP.obsolete=function(){try{
var v=parseInt(_NXUP.VERSION,10)||0;
return _NXUP.plancher>0&&v<_NXUP.plancher;}catch(_){return false;}};

_NXUP.modalCss=function(){return ""+
"#nx-maj{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;"+
"justify-content:center;padding:22px;background:rgba(4,4,6,.70);opacity:1;"+
"font-family:'gg sans','Noto Sans',Helvetica,Arial,sans-serif;"+
"transition:opacity .28s cubic-bezier(.32,0,.24,1);}"+
"#nx-maj.nxu-part{opacity:0;pointer-events:none;}"+
"#nx-maj *{box-sizing:border-box;}"+
"#nx-maj .nxu-cadre{position:relative;width:min(432px,100%);}"+
"#nx-maj .nxu-liseret{position:absolute;inset:-1px;border-radius:21px;overflow:hidden;"+
"pointer-events:none;}"+
"#nx-maj .nxu-liseret i{position:absolute;left:50%;top:50%;width:150%;padding-bottom:150%;"+
"margin:-75% 0 0 -75%;display:block;will-change:transform;transform:translateZ(0);"+
"background:conic-gradient(from 0deg,transparent 0deg,rgba(255,255,255,.44) 30deg,"+
"transparent 66deg,transparent 190deg,rgba(143,180,234,.40) 218deg,transparent 258deg);}"+
"#nx-maj .nxu-carte{position:relative;background:linear-gradient(180deg,#141418,#0b0b0d);"+
"border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:26px 24px 20px;"+
"box-shadow:0 30px 84px rgba(0,0,0,.66);color:#f4f4f5;"+
"max-height:calc(100vh - 44px);overflow-x:hidden;overflow-y:auto;}"+
"#nx-maj .nxu-tete{display:flex;align-items:center;gap:13px;margin-bottom:18px;}"+
"#nx-maj .nxu-logo{position:relative;width:46px;height:46px;flex:0 0 auto;border-radius:14px;"+
"background:#f4f4f5;display:flex;align-items:center;justify-content:center;}"+
"#nx-maj .nxu-cle{font-size:9.5px;font-weight:900;letter-spacing:.22em;"+
"text-transform:uppercase;color:#6c6c74;margin-bottom:5px;}"+
"#nx-maj .nxu-ver{font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;"+
"font-size:21px;font-weight:800;letter-spacing:-.02em;color:#f4f4f5;line-height:1.1;}"+
"#nx-maj .nxu-titre{font-size:14.5px;font-weight:800;color:#f4f4f5;line-height:1.4;"+
"margin-bottom:13px;letter-spacing:-.01em;}"+
"#nx-maj .nxu-liste{border:1px solid rgba(255,255,255,.08);border-radius:13px;"+
"background:rgba(255,255,255,.022);padding:10px 14px;margin-bottom:14px;}"+
"#nx-maj .nxu-li{display:flex;gap:9px;align-items:flex-start;font-size:12.5px;"+
"color:#c9c9d2;line-height:1.5;padding:5px 0;}"+
"#nx-maj .nxu-li s{flex:0 0 auto;width:5px;height:5px;margin-top:6px;border-radius:50%;"+
"background:rgba(255,255,255,.45);text-decoration:none;}"+
"#nx-maj .nxu-plus{font-size:11.5px;color:#6c6c74;padding:5px 0 1px;}"+
"#nx-maj .nxu-rassure{display:flex;gap:8px;align-items:center;font-size:11.5px;"+
"color:#8a8a92;line-height:1.5;margin-bottom:17px;}"+
"#nx-maj .nxu-actions{display:flex;gap:9px;}"+
"#nx-maj .nxu-b{position:relative;overflow:hidden;flex:1;text-align:center;padding:12px 10px;"+
"border-radius:12px;border:1px solid rgba(255,255,255,.14);background:transparent;"+
"color:#9a9aa0;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;"+
"transition:background .18s ease,color .18s ease,transform .18s ease;}"+
"#nx-maj .nxu-b:hover{background:rgba(255,255,255,.07);color:#f4f4f5;transform:translateY(-1px);}"+
"#nx-maj .nxu-b1{flex:1.7;background:#f4f4f5;color:#0a0a0a;border-color:#f4f4f5;font-weight:800;}"+
"#nx-maj .nxu-b1:hover{background:#fff;color:#0a0a0a;}"+
"#nx-maj .nxu-b1::after{content:'';position:absolute;top:0;bottom:0;left:0;width:38%;"+
"pointer-events:none;transform:translate3d(-190%,0,0);will-change:transform;"+
"background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);}"+
"#nx-maj.nxu-vif .nxu-carte{animation:nxu-arrive .62s cubic-bezier(.16,1.1,.3,1) both;}"+
"#nx-maj.nxu-vif .nxu-liseret i{animation:nxu-tourne 8s linear infinite;}"+
"#nx-maj.nxu-vif .nxu-logo{animation:nxu-pop .7s cubic-bezier(.16,1.6,.3,1) .08s both;}"+
"#nx-maj.nxu-vif .nxu-titre{animation:nxu-monte .5s cubic-bezier(.2,.9,.3,1) .18s both;}"+
"#nx-maj.nxu-vif .nxu-li{animation:nxu-glisse .5s cubic-bezier(.2,.9,.3,1) both;}"+
"#nx-maj.nxu-vif .nxu-li:nth-child(1){animation-delay:.24s;}"+
"#nx-maj.nxu-vif .nxu-li:nth-child(2){animation-delay:.31s;}"+
"#nx-maj.nxu-vif .nxu-li:nth-child(3){animation-delay:.38s;}"+
"#nx-maj.nxu-vif .nxu-li:nth-child(4){animation-delay:.45s;}"+
"#nx-maj.nxu-vif .nxu-rassure{animation:nxu-monte .5s cubic-bezier(.2,.9,.3,1) .50s both;}"+
"#nx-maj.nxu-vif .nxu-actions{animation:nxu-monte .5s cubic-bezier(.2,.9,.3,1) .56s both;}"+
"#nx-maj.nxu-vif .nxu-b1::after{animation:nxu-sillage 3.4s cubic-bezier(.5,0,.5,1) 1.2s infinite;}"+
"@keyframes nxu-arrive{from{transform:translateY(24px) scale(.94)}to{transform:none}}"+
"@keyframes nxu-monte{from{transform:translateY(9px)}to{transform:none}}"+
"@keyframes nxu-glisse{from{transform:translateX(-8px)}to{transform:none}}"+
"@keyframes nxu-pop{from{transform:scale(.6)}to{transform:none}}"+
"@keyframes nxu-tourne{to{transform:rotate(360deg)}}"+
"@keyframes nxu-sillage{0%{transform:translate3d(-190%,0,0)}"+
"48%{transform:translate3d(300%,0,0)}100%{transform:translate3d(300%,0,0)}}"+
"@media (prefers-reduced-motion: reduce){#nx-maj *{animation:none!important;}}";};
// Les trois ou quatre lignes qui donnent envie. Elles viennent du changelog
// publie, jamais d un texte ecrit ici : ce qui est annonce est ce qui a ete
// fait.
_NXUP.pointsForts=function(){try{
var N=_NXUP.notes;
if(!N||!N.length)return null;
var v=null,a;
for(a=0;a<N.length;a++)if(v===null||N[a].v>v.v)v=N[a];
if(!v)return null;
var chefs=[],autres=[],b;
for(b=0;b<v.lignes.length;b++){
if(v.lignes[b].chef)chefs.push(v.lignes[b].t);
else autres.push(v.lignes[b].t);}
var L=chefs.length>=2?chefs:autres;
return {titre:v.titre||"",lignes:L.slice(0,4),reste:Math.max(0,v.lignes.length-4)};}catch(_){return null;}};
// La carte obligatoire. Elle ressemble a l invitation, mais elle n a pas de
// "Plus tard" et ne se ferme ni au clic a cote ni a l echap : c est tout son
// interet. Elle ne s affiche que si l equipe a pose un plancher au-dessus de
// la version installee.
_NXUP.oblEl=null;
_NXUP.maybeObligatoire=function(){try{
if(!_NXUP.obsolete())return false;
if(_NXUP.oblEl)return true;
if(typeof document==="undefined"||!document.body)return false;
try{if(String(location.pathname||"").indexOf("popout")>=0)return false;}catch(_){}
// Tant que l ecran d ouverture est la, on attend : deux voiles l un sur
// l autre ne se lisent pas.
if(document.getElementById("nx-boot")){setTimeout(_NXUP.maybeObligatoire,1500);return false;}
if(_NXUP.modalEl)_NXUP.hideModal();
if(!document.getElementById("nx-maj-style")){
var st=document.createElement("style");
st.id="nx-maj-style";st.textContent=_NXUP.modalCss();
(document.head||document.documentElement).appendChild(st);}
var esc=function(x){return String(x===null||x===undefined?"":x)
.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");};
var pf=_NXUP.pointsForts();
var li="",z;
if(pf&&pf.lignes.length)for(z=0;z<pf.lignes.length;z++)
li+='<div class="nxu-li"><s></s><span>'+esc(pf.lignes[z])+'</span></div>';
var ov=document.createElement("div");
ov.id="nx-maj";
ov.setAttribute("role","dialog");
ov.setAttribute("aria-label",_NXtr("Mise a jour requise"));
ov.innerHTML=
_NXtrHtml('<div class="nxu-cadre"><div class="nxu-liseret"><i></i></div>'+
'<div class="nxu-carte">'+
'<div class="nxu-tete"><div class="nxu-logo">'+
'<svg viewBox="0 0 100 100" width="21" height="21" fill="none" stroke="#0a0a0a" '+
'stroke-width="10" stroke-linecap="square"><path d="M28 72 V28 L72 72 V28"/></svg></div>'+
'<div><div class="nxu-cle">Nexium Client</div>'+
'<div class="nxu-ver">Mise '+String.fromCharCode(0xE0)+' jour requise</div></div></div>'+
'<div class="nxu-titre">'+esc(_NXUP.plancherMsg||
("Cette version n est plus suivie. La version "+_NXUP.plancher+" ou superieure est demandee."))+
"</div>"+
(li?('<div class="nxu-liste">'+li+"</div>"):"")+
'<div class="nxu-rassure">'+
'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" '+
'stroke-width="2" stroke-linecap="round" style="flex:0 0 auto">'+
'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'+
'<span>Tu es en v'+esc(_NXUP.VERSION)+'. Un red'+String.fromCharCode(0xE9)+
"marrage suffit : tes r"+String.fromCharCode(0xE9)+"glages et tes donn"+
String.fromCharCode(0xE9)+"es restent en place.</span></div>"+
'<div class="nxu-actions">'+
'<button type="button" class="nxu-b nxu-b1">Installer et red'+
String.fromCharCode(0xE9)+"marrer</button></div></div></div>");
document.body.appendChild(ov);
_NXUP.oblEl=ov;
try{ov.querySelector(".nxu-b1").onclick=function(){_NXUP.relaunchApply();};}catch(_){}
try{if(typeof requestAnimationFrame==="function")
requestAnimationFrame(function(){requestAnimationFrame(function(){try{
if(_NXUP.oblEl)_NXUP.oblEl.className="nxu-vif";}catch(_){}});});
else ov.className="nxu-vif";}catch(_){}
return true;}catch(_){return false;}};

_NXUP.showModal=function(){try{
if(_NXUP.modalEl)return;if(typeof document==="undefined"||!document.body)return;
// Les notes arrivent peut-etre en retard : on les demande, et la carte se
// contente de ce qu elle a.
try{_NXUP.litNotes();}catch(_){}
if(!document.getElementById("nx-maj-style")){
var st=document.createElement("style");
st.id="nx-maj-style";st.textContent=_NXUP.modalCss();
(document.head||document.documentElement).appendChild(st);}
var esc=function(s){return String(s===null||s===undefined?"":s)
.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");};
var pf=_NXUP.pointsForts();
var ver=(_NXUP.repoVersion!=null)?("v"+_NXUP.repoVersion):"";
var li="",z;
if(pf&&pf.lignes.length){
for(z=0;z<pf.lignes.length;z++)
li+='<div class="nxu-li"><s></s><span>'+esc(pf.lignes[z])+'</span></div>';
if(pf.reste)li+='<div class="nxu-plus">'+String.fromCharCode(0x2026)+" et "+pf.reste+
' autre'+(pf.reste>1?"s":"")+' changement'+(pf.reste>1?"s":"")+'</div>';}
var ov=document.createElement("div");
ov.id="nx-maj";
ov.setAttribute("role","dialog");
ov.setAttribute("aria-label",_NXtr("Mise a jour de Nexium Client"));
ov.innerHTML=
_NXtrHtml('<div class="nxu-cadre">'+
'<div class="nxu-liseret"><i></i></div>'+
'<div class="nxu-carte">'+
'<div class="nxu-tete"><div class="nxu-logo">'+
'<svg viewBox="0 0 100 100" width="21" height="21" fill="none" stroke="#0a0a0a" '+
'stroke-width="10" stroke-linecap="square"><path d="M28 72 V28 L72 72 V28"/></svg></div>'+
'<div><div class="nxu-cle">Nexium Client</div>'+
'<div class="nxu-ver">'+esc(ver)+" est pr"+String.fromCharCode(0xEA)+"te</div></div></div>"+
(pf&&pf.titre?('<div class="nxu-titre">'+esc(pf.titre)+"</div>"):"")+
(li?('<div class="nxu-liste">'+li+"</div>"):"")+
'<div class="nxu-rassure">'+
'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" '+
'stroke-width="2" stroke-linecap="round" style="flex:0 0 auto">'+
'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'+
'<span>Un red'+String.fromCharCode(0xE9)+"marrage, quelques secondes. Tes r"+
String.fromCharCode(0xE9)+"glages et tes donn"+String.fromCharCode(0xE9)+
"es restent en place.</span></div>"+
'<div class="nxu-actions">'+
'<button type="button" class="nxu-b nxu-b2">Plus tard</button>'+
'<button type="button" class="nxu-b nxu-b1">Installer maintenant</button>'+
"</div></div></div>");
var plusTard=function(){
_NXUP.snoozeUntil=Date.now()+1500000;
try{_NXUP.st.snooze=_NXUP.snoozeUntil;_NXUP.save();}catch(_){}
_NXUP.hideModal();};
document.body.appendChild(ov);
_NXUP.modalEl=ov;
try{
ov.querySelector(".nxu-b1").onclick=function(){_NXUP.hideModal();_NXUP.relaunchApply();};
ov.querySelector(".nxu-b2").onclick=plusTard;
ov.onclick=function(e){try{if(e.target===ov)plusTard();}catch(_){}};
_NXUP._clav=function(e){try{
if(e.key==="Escape"){e.preventDefault();e.stopPropagation();plusTard();}}catch(_){}};
document.addEventListener("keydown",_NXUP._clav,true);}catch(_){}
// Meme regle que partout : le mouvement n arrive qu a la premiere image
// peinte, et la carte reste entierement lisible si elle n arrive jamais.
try{if(typeof requestAnimationFrame==="function")
requestAnimationFrame(function(){requestAnimationFrame(function(){try{
if(_NXUP.modalEl)_NXUP.modalEl.className="nxu-vif";}catch(_){}});});
else ov.className="nxu-vif";}catch(_){}
// Les notes peuvent arriver apres coup : on redessine une seule fois.
try{if(!pf)setTimeout(function(){try{
if(!_NXUP.modalEl||_NXUP._redessine)return;
if(!_NXUP.pointsForts())return;
_NXUP._redessine=true;
_NXUP.hideModal();_NXUP.showModal();}catch(_){}},2600);}catch(_){}
}catch(_){}};
// Le titre de l entree dans la colonne des reglages : une pastille quand une
// version attend.
_NXUP.titreOnglet=function(){try{
var t=_NXtr("Mise "+String.fromCharCode(0xE0)+" jour");
return _NXUP.available()?(t+" "+String.fromCharCode(0xB7)+" 1"):t;}catch(_){
return "Mise "+String.fromCharCode(0xE0)+" jour";}};
_NXUP.maybePrompt=function(){try{if(_NXUP.obsolete()){_NXUP.maybeObligatoire();return;}if(!_NXUP.available())return;if(_NXUP.modalEl)return;if(Date.now()<_NXUP.snoozeUntil)return;_NXUP.showModal();}catch(_){}};
_NXUP._vsBody=function(txt){var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};if(!txt)return '<div style="font-size:13px;color:#8a8a92;text-align:center;padding:24px 0;">Chargement des notes de version…</div>';var lines=String(txt).split(/\r?\n/).slice(0,120);var body="";for(var a=0;a<lines.length;a++){var s=lines[a].trim();if(!s){body+='<div style="height:8px;"></div>';continue;}if(/^[=\-_]{3,}$/.test(s)){body+='<div style="height:1px;background:#1e1e22;margin:12px 0;"></div>';continue;}if(/^#{1,3}\s/.test(s)||/^\[.+\]$/.test(s)){var h=s.replace(/^#{1,3}\s*/,"").replace(/^\[/,"").replace(/\]$/,"");body+='<div style="display:flex;align-items:center;gap:8px;margin:14px 0 7px;"><div style="width:3px;height:14px;background:#e8e8ea;border-radius:2px;"></div><div style="font-size:14px;font-weight:800;color:#f4f4f5;">'+esc(h)+'</div></div>';continue;}if(/^[-*\u2022]\s/.test(s)){body+='<div style="display:flex;gap:9px;padding:2px 0 2px 6px;"><div style="width:4px;height:4px;border-radius:50%;background:#5b5b63;margin-top:8px;flex-shrink:0;"></div><div style="font-size:12.5px;color:#b8b8be;line-height:1.55;">'+esc(s.replace(/^[-*\u2022]\s*/,""))+'</div></div>';continue;}body+='<div style="font-size:12.5px;color:#b8b8be;line-height:1.6;padding:2px 0;">'+esc(s)+'</div>';}return body;};
_NXUP.showVersionScreen=function(prevVer){try{
if(_NXUP.vsEl)return;if(typeof document==="undefined"||!document.body)return;
if(window._NXQ&&!_NXQ.reserve("version"))return;
var txt="";try{txt=(window._NXCL&&_NXCL.st&&_NXCL.st.text)||"";}catch(_){}
var ov=document.createElement("div");ov.id="nx-version-screen";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);";
var card=document.createElement("div");
card.style.cssText="width:460px;max-width:calc(100vw - 40px);max-height:calc(100vh - 80px);display:flex;flex-direction:column;background:"+_NXpal.panel+";border:1px solid "+_NXpal.line+";border-radius:22px;padding:0;box-shadow:0 40px 100px rgba(0,0,0,.6);position:relative;overflow:hidden;";
var body=_NXUP._vsBody(txt);
card.innerHTML=_NXtrHtml('<div style="position:absolute;top:-50px;right:-50px;width:200px;height:200px;background:radial-gradient(circle,rgba(232,232,234,.12),transparent 70%);pointer-events:none;"></div>'
+'<div style="position:relative;padding:24px 24px 18px;border-bottom:1px solid #17171a;">'
+'<div style="display:inline-block;font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#0a0a0a;background:#e8e8ea;padding:5px 12px;border-radius:99px;margin-bottom:12px;">'+(prevVer?(_T("Nouvelle version")+" \u00b7 v"+_NXUP.VERSION):_T("Bienvenue"))+'</div>'
+'<div style="font-family:inherit;font-size:24px;font-weight:800;color:#f4f4f5;letter-spacing:-.02em;">'+(prevVer?_T("Nexium a été mis à jour"):_T("Nexium est installé"))+'</div>'
+'<div style="font-size:12.5px;color:#8a8a92;margin-top:6px;line-height:1.5;">'+(prevVer?(_T("Voici ce qui a changé depuis la v")+prevVer+"."):_T("Voici ce que le client apporte."))+'</div></div>'
+'<div id="nx-vs-body" style="position:relative;padding:16px 24px;overflow-y:auto;flex:1;">'+body+'</div>');
var foot=document.createElement("div");foot.style.cssText="position:relative;padding:16px 24px;border-top:1px solid #17171a;";
var btn=document.createElement("div");btn.style.cssText="text-align:center;padding:13px;border-radius:12px;background:#e8e8ea;color:#0a0a0a;font-size:14px;font-weight:800;cursor:pointer;";btn.textContent=_NXtr("C'est parti");
btn.onclick=function(){_NXUP.hideVersionScreen();};
foot.appendChild(btn);card.appendChild(foot);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXUP.hideVersionScreen();};
document.body.appendChild(ov);_NXUP.vsEl=ov;
try{if(window._NXCL){if(!_NXCL.st.text&&_NXCL.refresh)_NXCL.refresh();if(!_NXUP._vsListener){_NXUP._vsListener=function(){try{if(!_NXUP.vsEl)return;var bd=document.getElementById("nx-vs-body");if(bd&&_NXCL.st.text){bd.innerHTML=_NXtrHtml(_NXUP._vsBody(_NXCL.st.text));}}catch(_){}};}if(_NXCL.listeners.indexOf(_NXUP._vsListener)<0)_NXCL.listeners.push(_NXUP._vsListener);}}catch(_){}
}catch(_){}};
_NXUP.hideVersionScreen=function(){try{if(_NXUP.vsEl&&_NXUP.vsEl.parentNode)_NXUP.vsEl.parentNode.removeChild(_NXUP.vsEl);}catch(_){}_NXUP.vsEl=null;try{if(window._NXCL&&_NXUP._vsListener)_NXCL.listeners=_NXCL.listeners.filter(function(f){return f!==_NXUP._vsListener;});}catch(_){}};
_NXUP.maybeVersionScreen=function(){try{
var cur=String(_NXUP.VERSION);
var prev=_NXUP.st.lastBooted;
if(prev===cur)return;
_NXUP.st.lastBooted=cur;_NXUP.save();
_NXUP.freshInstall=!prev;
// Premiere ouverture : on classe tout le passe comme lu. Sinon l accueil,
// les nouveautes de la v150 et l annonce de la version courante s ouvrent
// tous les trois, l un par-dessus l autre.
if(!prev&&window._NXQ)try{_NXQ.marquePasse();}catch(_){}
try{if(_NXCL&&_NXCL.refresh)_NXCL.refresh();}catch(_){}
setTimeout(function(){try{
// A l installation, un seul ecran : l accueil. Le reste appartient a une
// histoire que cette personne n a pas vecue.
if(!prev){if(window._NXWEL&&!_NXWEL.vu())_NXWEL.show();return;}
if(window._NXNG&&!_NXNG.vu()){_NXNG.show();return;}
_NXUP.showVersionScreen(prev);}catch(_){}},2500);
}catch(_){}};
_NXUP.probeNative();
setTimeout(function(){_NXUP.maybeVersionScreen();},1500);
// La presentation des nouveautes n a plus sa propre minuterie : elle passait
// par-dessus l accueil a 4,2 secondes. Elle est desormais proposee par
// maybeVersionScreen, qui sait ce qui a deja ete montre.
setTimeout(function(){_NXUP.check();},6000);
try{setTimeout(function(){_NXUP.litPlancher();},12000);
setInterval(function(){if(typeof document==="undefined"||!document.hidden)_NXUP.litPlancher();},3600000);}catch(_){}
_NXUP.iv=setInterval(function(){if(typeof document==="undefined"||!document.hidden)_NXUP.check();},2700000);
}
