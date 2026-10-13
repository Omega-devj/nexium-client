var _NXBADGE=window._NXBADGE||(window._NXBADGE={});
if(!_NXBADGE.boot){try{_NXBADGE.boot=true;
_NXBADGE.API="https://emcoqnvxriyrchmfpunq.supabase.co/functions/v1/users";
_NXBADGE.KEY="nexium_badge_users";
_NXBADGE.DEVS={"546349979757707265":1,"1480728136021970946":1};
_NXBADGE.users=Object.create(null);_NXBADGE.count=0;_NXBADGE.at=0;
_NXBADGE.tries=0;_NXBADGE.done=false;

_NXBADGE.me=function(){try{
var u=_NXcommon().store("UserStore");
var me=u&&u.getCurrentUser&&u.getCurrentUser();
return (me&&me.id)?String(me.id):null;}catch(_){return null;}};
_NXBADGE.viewerIsDev=function(){try{
var id=_NXBADGE.me();
return !!(id&&_NXBADGE.DEVS[id]);}catch(_){return false;}};
_NXBADGE.has=function(id){try{
var k=String(id||"");
if(!/^[0-9]{5,25}$/.test(k))return false;
var e=_NXBADGE.users[k];
if(!e||(Date.now()-(e.a||0))>_NXBADGE.FRAIS)_NXBADGE.demande(k);
return !!(e&&e.v);}catch(_){return false;}};
_NXBADGE.FRAIS=21600000;
_NXBADGE.MAXCACHE=400;
_NXBADGE.file=[];
_NXBADGE.loadCache=function(){try{
var raw=_NXDB.get(_NXBADGE.KEY);if(!raw)return false;
var j=JSON.parse(raw);if(!j||!j.c)return false;
_NXBADGE.users=Object.create(null);
var n=0;
for(var k in j.c){if(!Object.prototype.hasOwnProperty.call(j.c,k))continue;
var e=j.c[k];if(!e||typeof e.a!=="number")continue;
_NXBADGE.users[k]={v:!!e.v,a:e.a};if(e.v)n++;}
_NXBADGE.count=n;_NXBADGE.at=j.at||0;return true;}catch(_){return false;}};
_NXBADGE.saveCache=function(){try{
var noms=[],k;
for(k in _NXBADGE.users)if(Object.prototype.hasOwnProperty.call(_NXBADGE.users,k))noms.push(k);
noms.sort(function(x,y){return (_NXBADGE.users[y].a||0)-(_NXBADGE.users[x].a||0);});
if(noms.length>_NXBADGE.MAXCACHE)noms=noms.slice(0,_NXBADGE.MAXCACHE);
var c={},n=0;
for(var a=0;a<noms.length;a++){var e=_NXBADGE.users[noms[a]];c[noms[a]]={v:e.v?1:0,a:e.a};if(e.v)n++;}
_NXBADGE.count=n;
_NXDB.set(_NXBADGE.KEY,JSON.stringify({at:Date.now(),c:c}));}catch(_){}};
_NXBADGE.reponse=function(demandes,membres){try{
var oui=Object.create(null),a;
for(a=0;a<membres.length;a++)oui[String(membres[a])]=1;
var neuf=false,t=Date.now();
for(a=0;a<demandes.length;a++){
var id=demandes[a],v=!!oui[id],avant=_NXBADGE.users[id];
if(v&&(!avant||!avant.v))neuf=true;
_NXBADGE.users[id]={v:v,a:t};}
_NXBADGE.saveCache();
if(neuf)_NXBADGE.rejoue();}catch(_){}};
_NXBADGE.rejoue=function(){try{
var API=(window.Vencord&&Vencord.Api&&Vencord.Api.Badges)||null;
if(!API||!_NXBADGE.entry)return;
if(typeof API.removeProfileBadge!=="function"||typeof API.addProfileBadge!=="function")return;
API.removeProfileBadge(_NXBADGE.entry);
API.addProfileBadge(_NXBADGE.entry);}catch(_){}};
_NXBADGE.videFile=function(){try{
_NXBADGE._t=null;
if(_NXBADGE.busy||!_NXBADGE.file.length)return;
if(window._NXPR&&_NXPR.cfg&&_NXPR.cfg.noRegistry){_NXBADGE.file=[];return;}
var lot=_NXBADGE.file.splice(0,200);
_NXBADGE.busy=true;
_NXNETX.go(_NXBADGE.API,{method:"POST",headers:{"Content-Type":"application/json","x-nexium-key":_NXPR.CKEY,"apikey":_NXPR.CKEY,"Authorization":"Bearer "+_NXPR.CKEY},
body:JSON.stringify({action:"check",ids:lot,user_id:_NXBADGE.me(),version:_NXUP.VERSION})})
.then(function(r){return r.json();}).then(function(j){
_NXBADGE.busy=false;
_NXBADGE.reponse(lot,(j&&j.ok&&Array.isArray(j.membres))?j.membres:[]);
if(_NXBADGE.file.length)_NXBADGE.planifie();
}).catch(function(){_NXBADGE.busy=false;});
}catch(_){_NXBADGE.busy=false;}};
_NXBADGE.planifie=function(){try{
if(_NXBADGE._t)return;
_NXBADGE._t=setTimeout(_NXBADGE.videFile,500);}catch(_){}};
_NXBADGE.demande=function(id){try{
if(_NXBADGE.file.length>600)return;
for(var a=0;a<_NXBADGE.file.length;a++)if(_NXBADGE.file[a]===id)return;
_NXBADGE.file.push(id);_NXBADGE.planifie();}catch(_){}};
_NXBADGE.sync=function(){try{
var id=_NXBADGE.me();
if(!id){if((_NXBADGE.tries||0)<20){_NXBADGE.tries++;setTimeout(function(){_NXBADGE.sync();},3000);}return;}
if(window._NXPR&&_NXPR.cfg&&_NXPR.cfg.noRegistry)return;
_NXNETX.go(_NXBADGE.API,{method:"POST",headers:{"Content-Type":"application/json","x-nexium-key":_NXPR.CKEY,"apikey":_NXPR.CKEY,"Authorization":"Bearer "+_NXPR.CKEY},
body:JSON.stringify({action:"register",user_id:id,version:_NXUP.VERSION})}).catch(function(){});
}catch(_){}};

_NXBADGE.Flame=function(){try{
return i("span",{
title:_NXtr("Nexium Client"),
"aria-label":_NXtr("Nexium Client"),
style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"22px",height:"22px",fontSize:"16px",lineHeight:"22px",cursor:"pointer",userSelect:"none"}
},"\uD83D\uDD25");}catch(_){return null;}};
_NXBADGE.kill=function(why){try{
if(_NXBADGE.killed)return;_NXBADGE.killed=true;
var API=null;try{API=(window.Vencord&&Vencord.Api&&Vencord.Api.Badges)||null;}catch(_){}
try{if(API&&_NXBADGE.entry&&typeof API.removeProfileBadge==="function")API.removeProfileBadge(_NXBADGE.entry);}catch(_){}
_NXBADGE.done=true;
try{if(window._NXERR){_NXERR.push("badge :: retire automatiquement ("+why+")");if(window._NXsaveErr)_NXsaveErr();}}catch(_){}
}catch(_){}};
_NXBADGE.install=function(){try{
if(_NXBADGE.done||_NXBADGE.killed)return;
var me=_NXBADGE.me();
if(!me){_NXBADGE.itries=(_NXBADGE.itries||0)+1;if(_NXBADGE.itries<20)setTimeout(_NXBADGE.install,3000);return;}
if(!_NXBADGE.viewerIsDev()){_NXBADGE.done=true;return;}
// Le badge passe par le rendu du profil, donc par du code de Discord qui
// change sans prevenir. Si le client vient de tomber trois fois, on ne le
// remet pas : mieux vaut un client sans badge qu un client qui ne s ouvre
// plus.
try{if(window._NXSAFE&&_NXSAFE.on){
_NXBADGE.done=true;
if(window._NXERR)_NXERR.push("badge :: pas installe, le client est en mode securise");
return;}}catch(_){}
var API=null;try{API=(window.Vencord&&Vencord.Api&&Vencord.Api.Badges)||null;}catch(_){}
if(!API||typeof API.addProfileBadge!=="function"){
_NXBADGE.itries=(_NXBADGE.itries||0)+1;
if(_NXBADGE.itries<30)setTimeout(_NXBADGE.install,2000);
else{try{if(window._NXERR)_NXERR.push("badge :: API Badges indisponible");}catch(_){}}
return;}
_NXBADGE.entry={
// Depuis le dispositif 2026-08-badge-management, Discord resout chaque
// badge par son identifiant : l[id] puis i.$[id.toUpperCase()]. Un badge
// sans identifiant fait lever toUpperCase sur undefined, en plein rendu du
// profil, et emporte l arbre React. Une chaine suffit -- elle ne
// correspond a rien dans sa table, ce qui est exactement ce qu on veut.
id:"nexium_client",
key:"nexium_client",
description:"Nexium Client",
component:_NXBADGE.Flame,
link:"https://discord.gg/"+((window._NXSP&&_NXSP.CODE)||"itsuki"),
shouldShow:function(info){try{
if(!_NXBADGE.viewerIsDev())return false;
if(!info)return false;
var id=info.userId||(info.user&&info.user.id)||info.id;
return _NXBADGE.has(id);}catch(_){return false;}}
};
API.addProfileBadge(_NXBADGE.entry);
_NXBADGE.done=true;
}catch(e){try{if(window._NXERR)_NXERR.push("badge :: "+((e&&e.message)||"erreur"));}catch(_){}}};
try{_NXBADGE.loadCache();
setTimeout(_NXBADGE.install,3000);
setTimeout(function(){_NXBADGE.sync();},5000);
setInterval(function(){if(!document.hidden)_NXBADGE.sync();},3600000);
try{if(_NXDB.get(_NXBADGE.KEY)&&_NXBADGE.at===0)_NXDB.del(_NXBADGE.KEY);}catch(_){}}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXBADGE");if(window._NXERR)_NXERR.push("module _NXBADGE :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXBADGE desactive:",_nxE);}catch(_){}}
}var _NXSTATUS=window._NXSTATUS||(window._NXSTATUS={});
