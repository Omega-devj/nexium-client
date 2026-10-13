var _NXFO=window._NXFO||(window._NXFO={});
if(!_NXFO.boot){try{_NXFO.boot=true;
_NXFO.KEY="nexium_focus_v1";
_NXFO.STYLEID="nx-focus-style";
_NXFO.listeners=[];
_NXFO.notify=function(){for(var a=0;a<_NXFO.listeners.length;a++){try{_NXFO.listeners[a]();}catch(_){}}};
_NXFO.SEL={
guilds:'[data-list-item-id^="guildsnav___"]',
guildBar:'nav[class*="guilds"]',
badges:'[class*="numberBadge"],[class*="lowerBadge"],[class*="unreadMentionsBar"],[class*="mentionsBadge"]',
media:'[class*="imageWrapper"],[class*="embedMedia"],[class*="imageContainer"],[class*="videoWrapper"]',
members:'[class*="membersWrap"]'
};
_NXFO.load=function(){var d;try{var raw=_NXDB.get(_NXFO.KEY);d=raw?JSON.parse(raw):null;}catch(_){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.travail!=="number")d.travail=25;
if(typeof d.pause!=="number")d.pause=5;
if(typeof d.cycles!=="number")d.cycles=4;
if(typeof d.hideGuilds!=="boolean")d.hideGuilds=false;
if(!Array.isArray(d.allow))d.allow=[];
if(typeof d.hideBadges!=="boolean")d.hideBadges=true;
if(typeof d.hideMedia!=="boolean")d.hideMedia=false;
if(typeof d.hideMembers!=="boolean")d.hideMembers=false;
if(typeof d.dnd!=="boolean")d.dnd=true;
if(typeof d.quiet!=="boolean")d.quiet=true;
if(!Array.isArray(d.log))d.log=[];
return d;};
_NXFO.cfg=_NXFO.load();
_NXFO.save=function(){try{_NXDB.set(_NXFO.KEY,JSON.stringify(_NXFO.cfg));}catch(_){}};
_NXFO.state={on:false,phase:"travail",until:0,cycle:0,startedAt:0};
_NXFO.count=function(sel){try{
if(!document.querySelectorAll)return 0;
return document.querySelectorAll(sel).length;}catch(_){return 0;}};
_NXFO.probe=function(){try{
return {serveurs:_NXFO.count(_NXFO.SEL.guilds),pastilles:_NXFO.count(_NXFO.SEL.badges),
medias:_NXFO.count(_NXFO.SEL.media),membres:_NXFO.count(_NXFO.SEL.members)};}catch(_){return {};}};
_NXFO.css=function(){try{
var c=_NXFO.cfg,out=[];
if(c.hideGuilds){
out.push(_NXFO.SEL.guilds+"{display:none!important;}");
for(var a=0;a<c.allow.length;a++){
var id=String(c.allow[a]).replace(/[^0-9]/g,"");
if(id)out.push('[data-list-item-id="guildsnav___'+id+'"]{display:flex!important;}');}}
if(c.hideBadges)out.push(_NXFO.SEL.badges+"{display:none!important;}");
if(c.hideMedia)out.push(_NXFO.SEL.media+"{display:none!important;}");
if(c.hideMembers)out.push(_NXFO.SEL.members+"{display:none!important;}");
return out.join("\n");}catch(_){return "";}};
_NXFO.apply=function(){try{
var el=document.getElementById(_NXFO.STYLEID);
if(!_NXFO.state.on){if(el&&el.parentNode)el.parentNode.removeChild(el);return;}
if(!el){el=document.createElement("style");el.id=_NXFO.STYLEID;if(document.head)document.head.appendChild(el);}
el.textContent=_NXFO.css();}catch(_){}};
_NXFO.mmss=function(ms){try{
var s=Math.max(0,Math.round(ms/1000));
var m=Math.floor(s/60),r=s%60;
return m+":"+(r<10?"0"+r:r);}catch(_){return "0:00";}};
_NXFO.left=function(){try{return _NXFO.state.on?Math.max(0,_NXFO.state.until-Date.now()):0;}catch(_){return 0;}};
_NXFO.jot=function(m){try{
_NXFO.cfg.log.unshift({t:Date.now(),m:String(m||"").slice(0,90)});
if(_NXFO.cfg.log.length>40)_NXFO.cfg.log=_NXFO.cfg.log.slice(0,40);
_NXFO.save();}catch(_){}};
_NXFO.say=function(titre,corps){try{
if(window._NXAU&&_NXAU.notifSys)_NXAU.notifSys(titre,corps);
else if(typeof Notification==="function"&&Notification.permission==="granted")new Notification(titre,{body:corps});}catch(_){}
try{if(!_NXFO.cfg.quiet&&window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(corps),1);}catch(_){}};
_NXFO.setStatus=function(v){try{
if(window._NXAU&&_NXAU.setStatus)return _NXAU.setStatus(v);}catch(_){}return false;};
_NXFO.start=function(){try{
if(_NXFO.state.on)return;
_NXFO.state={on:true,phase:"travail",until:Date.now()+_NXFO.cfg.travail*60000,cycle:1,startedAt:Date.now()};
_NXFO.apply();
if(_NXFO.cfg.dnd){_NXFO._prevStatus="online";_NXFO.setStatus("dnd");}
if(_NXFO.cfg.quiet)_NXFO.muteToasts(true);
_NXFO.jot("session demarree ("+_NXFO.cfg.travail+" min)");
_NXFO.say("Nexium Focus","Session demarree : "+_NXFO.cfg.travail+" minutes de travail.");
_NXFO.tickOn();
_NXFO.notify();}catch(_){}};
_NXFO.stop=function(manuel){try{
if(!_NXFO.state.on)return;
var mn=Math.round((Date.now()-_NXFO.state.startedAt)/60000);
_NXFO.state.on=false;
_NXFO.apply();
_NXFO.tickOff();
if(_NXFO.cfg.dnd)_NXFO.setStatus("online");
if(_NXFO.cfg.quiet)_NXFO.muteToasts(false);
_NXFO.jot((manuel?"session arretee":"session terminee")+" apres "+mn+" min");
_NXFO.say("Nexium Focus",manuel?"Session arretee.":"Session terminee. "+mn+" minutes concentrees.");
_NXFO.notify();}catch(_){}};
_NXFO.muteToasts=function(on){try{
if(!window._NXPR)return;
if(on){if(!_NXFO._toast){_NXFO._toast=_NXPR.toast;_NXPR.toast=function(){};}}
else{if(_NXFO._toast){_NXPR.toast=_NXFO._toast;_NXFO._toast=null;}}}catch(_){}};
_NXFO.phaseEnd=function(){try{
var s=_NXFO.state;
if(s.phase==="travail"){
if(s.cycle>=_NXFO.cfg.cycles){_NXFO.stop(false);return;}
s.phase="pause";s.until=Date.now()+_NXFO.cfg.pause*60000;
_NXFO.say("Nexium Focus","Pause : "+_NXFO.cfg.pause+" minutes.");
_NXFO.jot("pause "+_NXFO.cfg.pause+" min");}
else{s.cycle++;s.phase="travail";s.until=Date.now()+_NXFO.cfg.travail*60000;
_NXFO.say("Nexium Focus","Retour au travail : cycle "+s.cycle+" sur "+_NXFO.cfg.cycles+".");
_NXFO.jot("cycle "+s.cycle);}
_NXFO.notify();}catch(_){}};
_NXFO.tickOn=function(){try{
if(_NXFO.iv)return;
_NXFO.iv=setInterval(function(){try{
if(!_NXFO.state.on){_NXFO.tickOff();return;}
if(_NXFO.left()<=0){_NXFO.phaseEnd();return;}
_NXFO.notify();}catch(_){}},1000);}catch(_){}};
_NXFO.tickOff=function(){try{if(_NXFO.iv)clearInterval(_NXFO.iv);}catch(_){}_NXFO.iv=null;};
_NXFO.set=function(k,v){try{_NXFO.cfg[k]=v;_NXFO.save();if(_NXFO.state.on)_NXFO.apply();_NXFO.notify();}catch(_){}};
_NXFO.addGuild=function(id){try{
var s=String(id||"").replace(/[^0-9]/g,"");
if(!s)return;
if(_NXFO.cfg.allow.indexOf(s)<0)_NXFO.cfg.allow.push(s);
_NXFO.save();if(_NXFO.state.on)_NXFO.apply();_NXFO.notify();}catch(_){}};
_NXFO.delGuild=function(id){try{
_NXFO.cfg.allow=_NXFO.cfg.allow.filter(function(x){return x!==id;});
_NXFO.save();if(_NXFO.state.on)_NXFO.apply();_NXFO.notify();}catch(_){}};
_NXFO.myGuilds=function(){try{
var GS=_NXcommon().store("GuildStore");
var all=GS&&GS.getGuilds&&GS.getGuilds();
if(!all)return [];
var out=[];
for(var k in all){out.push({id:k,name:(all[k]&&all[k].name)||k});}
out.sort(function(a,b){return String(a.name).localeCompare(String(b.name));});
return out.slice(0,60);}catch(_){return [];}};
_NXFO.todayMin=function(){try{
var d=new Date(),k=d.toDateString(),t=0;
for(var a=0;a<_NXFO.cfg.log.length;a++){var e=_NXFO.cfg.log[a];
if(new Date(e.t).toDateString()!==k)continue;
var m=String(e.m).match(/apres (\d+) min/);
if(m)t+=parseInt(m[1],10)||0;}
return t;}catch(_){return 0;}};
_NXFO.status=function(){try{
return {actif:_NXFO.state.on,phase:_NXFO.state.phase,restant:_NXFO.mmss(_NXFO.left()),
cycle:_NXFO.state.cycle,cycles:_NXFO.cfg.cycles,minutesDuJour:_NXFO.todayMin(),
cibles:_NXFO.probe(),serveursAutorises:_NXFO.cfg.allow.length};}catch(_){return {};}};
try{window.addEventListener("beforeunload",function(){try{if(_NXFO.state.on)_NXFO.stop(true);}catch(_){}});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXFO");if(window._NXERR)_NXERR.push("module _NXFO :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXFO desactive:",_nxE);}catch(_){}}
}
