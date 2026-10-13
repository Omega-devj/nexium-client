if(!_NXBAN.boot){try{_NXBAN.boot=true;
_NXBAN.URL="https://raw.githubusercontent.com/Omega-devj/bl-client-nexium/refs/heads/main/ban";
_NXBAN.KEY="nexium_ban_state";
_NXBAN.SEEN="nexium_accounts_seen";
_NXBAN.INKEYS=["nexium_install_id","nexium_device_tag","nexium_ui_prefs_id"];
_NXBAN.active=false;
_NXBAN.reason="";
_NXBAN.hash=function(s){try{
var h=5381,a=0,t=String(s||""),n=t.length;
for(;a<n;a++)h=(((h<<5)+h)^t.charCodeAt(a))|0;
return (h>>>0).toString(36);}catch(_){return "0";}};
_NXBAN.myId=function(){try{var u=_NXcommon().store("UserStore").getCurrentUser();return u&&u.id?String(u.id):null;}catch(_){return null;}};
_NXBAN.gpu=function(){try{
var c=document.createElement("canvas");
var gl=c.getContext("webgl")||c.getContext("experimental-webgl");
if(!gl)return "nogl";
var dbg=gl.getExtension("WEBGL_debug_renderer_info");
var r=dbg?gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
var v=dbg?gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR);
return String(v||"")+"|"+String(r||"");}catch(_){return "nogl";}};
_NXBAN.traits=function(){try{
var n=window.navigator||{},s=window.screen||{};
var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";}catch(_){}
return [
_NXBAN.gpu(),
n.platform||"",
n.hardwareConcurrency||0,
n.deviceMemory||0,
(s.width||0)+"x"+(s.height||0)+"x"+(s.colorDepth||0),
tz,
(n.languages&&n.languages.join(","))||n.language||"",
n.maxTouchPoints||0
].join("~");}catch(_){return "";}};
_NXBAN.fp=function(){try{
if(_NXBAN._fp)return _NXBAN._fp;
_NXBAN._fp=_NXBAN.hash(_NXBAN.traits());
return _NXBAN._fp;}catch(_){return "0";}};
_NXBAN.install=function(){try{
if(_NXBAN._in)return _NXBAN._in;
var found="";
for(var a=0;a<_NXBAN.INKEYS.length&&!found;a++){try{var v=_NXDB.get(_NXBAN.INKEYS[a]);if(v&&/^[a-z0-9]{6,24}$/.test(v))found=v;}catch(_){}}
if(!found)found=(Date.now().toString(36)+Math.floor(Math.random()*1679616).toString(36)).slice(0,14);
for(var b=0;b<_NXBAN.INKEYS.length;b++){try{_NXDB.set(_NXBAN.INKEYS[b],found);}catch(_){}}
_NXBAN._in=found;return found;}catch(_){return "0";}};
_NXBAN.seenIds=function(){try{
var raw=_NXDB.get(_NXBAN.SEEN);var L=raw?JSON.parse(raw):null;
return Array.isArray(L)?L:[];}catch(_){return [];}};
_NXBAN.remember=function(id){try{
if(!id)return [];
var L=_NXBAN.seenIds();
if(L.indexOf(id)<0){L.unshift(id);if(L.length>12)L=L.slice(0,12);_NXDB.set(_NXBAN.SEEN,JSON.stringify(L));}
return L;}catch(_){return [];}};
_NXBAN.parse=function(t){try{
var ids=Object.create(null),fps=Object.create(null),ins=Object.create(null);
var lines=String(t||"").split(/\r?\n/);
for(var a=0;a<lines.length&&a<20000;a++){var L=lines[a];if(!L)continue;
L=L.trim();if(!L||L.charAt(0)==="#"||L.charAt(0)===";")continue;
var lower=L.toLowerCase();
if(lower.indexOf("fp:")===0){var f=lower.slice(3).trim();if(f)fps[f]=1;continue;}
if(lower.indexOf("in:")===0){var i2=lower.slice(3).trim();if(i2)ins[i2]=1;continue;}
var m=L.match(/(\d{5,25})/);if(m)ids[m[1]]=1;}
return {ids:ids,fps:fps,ins:ins};}catch(_){return {ids:Object.create(null),fps:Object.create(null),ins:Object.create(null)};}};
_NXBAN.lock=function(reason,id){try{
_NXDB.set(_NXBAN.KEY,JSON.stringify({v:2,fp:_NXBAN.fp(),in:_NXBAN.install(),id:id||null,why:reason||"compte",at:Date.now()}));}catch(_){}};
_NXBAN.readLock=function(){try{
var raw=_NXDB.get(_NXBAN.KEY);if(!raw)return null;
var j=JSON.parse(raw);if(!j||typeof j!=="object")return null;
if(j.v!==2)return {legacy:true,id:j.id||null};
return j;}catch(_){return null;}};
_NXBAN.GRACE=86400000;
_NXBAN.lockHits=function(){try{
var j=_NXBAN.readLock();if(!j)return "";
if(j.legacy)return "";
if(!j.at||(Date.now()-j.at)>_NXBAN.GRACE){try{_NXDB.del(_NXBAN.KEY);}catch(_){}return "";}
if(j.fp&&j.fp===_NXBAN.fp())return "appareil";
if(j["in"]&&j["in"]===_NXBAN.install())return "installation";
return "";}catch(_){return "";}};
_NXBAN.match=function(list,id){try{
if(!list)return "";
if(id&&list.ids[id])return "compte";
if(list.fps[_NXBAN.fp()])return "appareil";
if(list.ins[_NXBAN.install()])return "installation";
var seen=_NXBAN.seenIds();
for(var a=0;a<seen.length;a++){if(list.ids[seen[a]])return "compte lie a cette machine";}
return "";}catch(_){return "";}};
_NXBAN.report=function(id,why){try{
if(!_NXPR||!_NXPR.API)return;
if(_NXBAN._reported)return;_NXBAN._reported=true;
_NXNETX.go(_NXPR.API,{method:"POST",headers:{"Content-Type":"application/json","x-nexium-key":_NXPR.CKEY,"apikey":_NXPR.CKEY,"Authorization":"Bearer "+_NXPR.CKEY},
body:JSON.stringify({action:"ban_seen",user_id:id||null,fp:_NXBAN.fp(),install:_NXBAN.install(),accounts:_NXBAN.seenIds(),why:why||"",version:(window._NXUP&&_NXUP.VERSION)||""})},10000).catch(function(){});
}catch(_){}};
_NXBAN.disableAll=function(){try{
var mods=["_NXM","_NXS","_NXP","_NXNET","_NXCL","_NXLY","_NXPR","_NXSP","_NXUA","_NXCP","_NXlogin","_NXWelcome","_NXAU"];
for(var a=0;a<mods.length;a++){var m=window[mods[a]];if(!m)continue;
try{if(m.iv)clearInterval(m.iv);}catch(_){}
try{if(m.pv)clearInterval(m.pv);}catch(_){}
try{if(m.stop)m.stop();}catch(_){}
try{if(m.unmount)m.unmount();}catch(_){}
try{if(m.hideTip)m.hideTip();}catch(_){}}
try{if(window._NXAU)_NXAU.data.on=false;}catch(_){}
try{if(window._NXM&&_NXM.audio&&_NXM.audio.pause)_NXM.audio.pause();}catch(_){}
try{if(window._NXUP){if(_NXUP.iv)clearInterval(_NXUP.iv);_NXUP.banned=true;_NXUP.hideModal&&_NXUP.hideModal();_NXUP.hideVersionScreen&&_NXUP.hideVersionScreen();}}catch(_){}
try{if(window._NXPR){_NXPR.cfg.scanLinks=false;_NXPR.cfg.blockGrabbers=false;_NXPR.cfg.phishGuard=false;_NXPR.cfg.scamAlerts=false;_NXPR.cfg.heuristics=false;}}catch(_){}
try{var mp=document.getElementById("nx-miniplayer");if(mp&&mp.parentNode)mp.parentNode.removeChild(mp);}catch(_){}
}catch(_){}};
_NXBAN.screen=function(){try{
if(document.getElementById("nx-banned"))return;
var ov=document.createElement("div");ov.id="nx-banned";
ov.style.cssText="position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#08080a;";
var card=document.createElement("div");
card.style.cssText="width:520px;max-width:calc(100vw - 48px);text-align:center;padding:36px;";
var esc=function(x){return String(x==null?"?":x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
card.innerHTML=_NXtrHtml('<div style="width:60px;height:60px;margin:0 auto 20px;border-radius:18px;background:rgba(214,72,72,.14);border:1px solid rgba(214,72,72,.35);display:flex;align-items:center;justify-content:center;color:#e79a9a;font-size:30px;font-weight:800;">!</div>'
+'<div style="font-size:10px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#6b6b73;margin-bottom:10px;">Nexium Client</div>'
+'<div style="font-size:26px;font-weight:800;color:#f4f4f5;letter-spacing:-.03em;margin-bottom:14px;">Acces revoque</div>'
+'<div style="font-size:13.5px;color:#9a9aa0;line-height:1.7;margin-bottom:8px;">Cet appareil n est plus autorise a utiliser le client Nexium.</div>'
+'<div style="font-size:13px;color:#9a9aa0;line-height:1.7;">Changer de compte Discord ne leve pas cette restriction. Pour continuer a utiliser Discord, desinstalle le client Nexium et utilise l application officielle.</div>'
+'<div style="margin-top:22px;font-size:11px;color:#4a4a52;font-family:monospace;line-height:1.8;">motif '+esc(_NXBAN.reason||"compte")
+'<br>compte '+esc(_NXBAN.id)+'<br>appareil '+esc(_NXBAN.fp())+'<br>installation '+esc(_NXBAN.install())+'</div>');
var btn=document.createElement("div");
btn.style.cssText="margin:26px auto 0;max-width:260px;text-align:center;padding:13px;border-radius:12px;background:#e8e8ea;color:#0a0a0a;font-size:14px;font-weight:800;cursor:pointer;";
btn.textContent=_NXtr("Fermer Discord");
btn.onclick=function(){try{if(window.DiscordNative&&DiscordNative.window&&DiscordNative.window.close)DiscordNative.window.close();else if(window.close)window.close();}catch(_){}};
var cp=document.createElement("div");
cp.style.cssText="margin:12px auto 0;max-width:260px;text-align:center;padding:10px;border-radius:10px;border:1px solid #24242a;color:#8a8a92;font-size:12px;font-weight:700;cursor:pointer;";
cp.textContent=_NXtr("Copier mes references");
cp.onclick=function(){try{if(window.DiscordNative&&DiscordNative.clipboard&&DiscordNative.clipboard.copy)
DiscordNative.clipboard.copy("nexium ban | motif "+(_NXBAN.reason||"compte")+" | compte "+(_NXBAN.id||"?")+" | fp:"+_NXBAN.fp()+" | in:"+_NXBAN.install());}catch(_){}};
card.appendChild(btn);card.appendChild(cp);ov.appendChild(card);
_NXBAN.ov=ov;
if(document.body)document.body.appendChild(ov);
_NXBAN.guard=setInterval(function(){try{if(!_NXBAN.active){clearInterval(_NXBAN.guard);_NXBAN.guard=null;return;}if(!document.getElementById("nx-banned")&&document.body){document.body.appendChild(ov);}}catch(_){}},1500);
}catch(_){}};
_NXBAN.enforce=function(id,why){try{
if(_NXBAN.active)return;_NXBAN.active=true;_NXBAN.id=id;_NXBAN.reason=why||"compte";
_NXBAN.lock(_NXBAN.reason,id);
_NXBAN.disableAll();
_NXBAN.screen();
_NXBAN.report(id,_NXBAN.reason);
}catch(_){}};
_NXBAN.lift=function(){try{
if(!_NXBAN.active)return;
_NXBAN.active=false;_NXBAN.id=null;_NXBAN.reason="";
try{if(_NXBAN.guard)clearInterval(_NXBAN.guard);}catch(_){}_NXBAN.guard=null;
var kill=function(el){if(!el)return;
try{el.id="nx-banned-off";}catch(_){}
try{el.style.display="none";el.style.pointerEvents="none";el.style.opacity="0";}catch(_){}
try{if(el.parentNode&&el.parentNode.removeChild)el.parentNode.removeChild(el);}catch(_){}};
try{kill(_NXBAN.ov);_NXBAN.ov=null;}catch(_){}
try{kill(document.getElementById("nx-banned"));}catch(_){}
try{var all=document.querySelectorAll?document.querySelectorAll("#nx-banned"):[];for(var a=0;a<all.length;a++)kill(all[a]);}catch(_){}
try{_NXDB.del(_NXBAN.KEY);}catch(_){}
try{if(window._NXPR&&_NXPR.reload)_NXPR.reload();}catch(_){}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Acces Nexium retabli. Redemarre Discord pour reactiver toutes les fonctions."),1);}catch(_){}
}catch(_){}};
_NXBAN.deverrouille=function(){try{
_NXDB.del(_NXBAN.KEY);
_NXBAN.echecs=0;
_NXBAN.lift();
return true;}catch(_){return false;}};
_NXBAN.check=function(){try{
var id=_NXBAN.myId();
if(!id){setTimeout(_NXBAN.check,4000);return;}
_NXBAN.remember(id);
var localWhy=_NXBAN.lockHits();
_NXBAN.local=!!localWhy;
if(localWhy)_NXBAN.enforce(id,localWhy);
// Deux sources, lues ensemble : le fichier du depot et la table du serveur.
// `undefined` veut dire "source muette" ; on ne leve un bannissement que si
// les deux ont repondu, et qu aucune ne le confirme.
var depot=_NXNETX.go(_NXBAN.URL+"?nx="+Date.now(),{cache:"no-store"},20000)
.then(function(r){if(!r||!r.ok)throw 0;return r.text();})
.then(function(t){return _NXBAN.match(_NXBAN.parse(t),id)||null;})
.catch(function(){return undefined;});
Promise.all([depot,_NXBAN.serveur(id)]).then(function(deux){
var d=deux[0],v=deux[1];
var muettes=(d===undefined?1:0)+(v===undefined?1:0);
var why="";
if(d)why=d;
if(!why&&v)why=v.genre+(v.raison?(" \u2014 "+v.raison):"");
if(why){_NXBAN.echecs=0;_NXBAN.enforce(id,why);_NXBAN.lock(why,id);
try{_NXNETX.ok("ban");}catch(_){}return;}
if(muettes===2){
_NXBAN.echecs=(_NXBAN.echecs||0)+1;
if(_NXBAN.echecs>=3&&_NXBAN.local){try{_NXDB.del(_NXBAN.KEY);}catch(_){}_NXBAN.lift();}
try{_NXNETX.retry("ban",function(){_NXBAN.check();});}catch(_){}
return;}
_NXBAN.echecs=0;
try{_NXDB.del(_NXBAN.KEY);}catch(_){}
_NXBAN.lift();
try{_NXNETX.ok("ban");}catch(_){}});
}catch(_){}};
_NXBAN.RPC="https://emcoqnvxriyrchmfpunq.supabase.co/rest/v1/rpc/nx_ban_test";
_NXBAN.CLE="sb_publishable_mhLyot9Dv_VCtWpCbYpngg_evMB79C3";
_NXBAN.serveurEtat="jamais";
// Interroge la table des bannissements. La reponse est soit une ligne, soit
// rien : le serveur ne rend jamais la liste, seulement le verdict qui nous
// concerne. Une panne rend `null` -- ce qui veut dire "je ne sais pas", et
// surtout pas "personne n est banni".
_NXBAN.serveur=function(id){try{
return _NXNETX.go(_NXBAN.RPC,{method:"POST",
headers:{apikey:_NXBAN.CLE,"Content-Type":"application/json",Accept:"application/json"},
body:JSON.stringify({p_id:id||"",p_fp:_NXBAN.fp(),p_in:_NXBAN.install()}),
cache:"no-store"},15000).then(function(r){
if(!r||!r.ok)throw 0;
return r.json();}).then(function(j){
_NXBAN.serveurEtat="ok";
var L=(j&&j.length!==undefined)?j:(j?[j]:[]);
if(!L.length)return null;
var x=L[0];
if(!x||x.banni!==true)return null;
return {genre:x.genre||"compte",raison:x.raison||"",expire:x.expire_le||null};
}).catch(function(){_NXBAN.serveurEtat="injoignable";return undefined;});
}catch(_){return Promise.resolve(undefined);}};
_NXBAN.refs=function(){return {compte:_NXBAN.myId(),appareil:_NXBAN.fp(),installation:_NXBAN.install(),comptesVus:_NXBAN.seenIds(),actif:_NXBAN.active,motif:_NXBAN.reason};};
try{setTimeout(_NXBAN.check,2000);setInterval(function(){if(!document.hidden)_NXBAN.check();},300000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXBAN");if(window._NXERR)_NXERR.push("module _NXBAN :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXBAN desactive:",_nxE);}catch(_){}}
}
