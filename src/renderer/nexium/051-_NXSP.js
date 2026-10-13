var _NXSP=window._NXSP||(window._NXSP={});
if(!_NXSP.boot){try{_NXSP.boot=true;
_NXSP.CODE="itsuki";
_NXSP.data=null;_NXSP.err=false;_NXSP.loading=false;_NXSP.busy=false;_NXSP.listeners=[];
_NXSP.notify=function(){for(var a=0;a<_NXSP.listeners.length;a++){try{_NXSP.listeners[a]();}catch(_){}}};
_NXSP.wp=function(prop){try{var W=window.Vencord&&Vencord.Webpack;if(W&&W.findByProps){var m=W.findByProps(prop);if(m&&typeof m[prop]==="function")return m;}}catch(_){}return null;};
_NXSP.LIST="https://raw.githubusercontent.com/Omega-devj/inv-sponsor-nexium/refs/heads/main/sponsor";
_NXSP.TIERS=[
{k:"exclusif",rx:/exclusi/i,label:"Exclusif",color:_NXpal.warn,price:"75 €",unit:"/ trimestre"},
{k:"standard",rx:/standar/i,label:"Standard",color:"#5865f2",price:"30 €",unit:"/ mois"},
{k:"decouverte",rx:/decouv|découv/i,label:"Découverte",color:_NXpal.ok,price:"10 €",unit:"/ semaine"}];
_NXSP.MAX=4;
_NXSP.slots=[];_NXSP.slotsAt=0;_NXSP.slotsBusy=false;_NXSP.cards={};
_NXSP.codeOf=function(u){try{
var m=String(u||"").match(/(?:discord\.gg|discord(?:app)?\.com\/invite)\/([a-zA-Z0-9\-]{2,25})/i);
if(m)return m[1];
var t=String(u||"").trim();
return /^[a-zA-Z0-9\-]{2,25}$/.test(t)?t:null;}catch(_){return null;}};
_NXSP.parseList=function(txt){try{
var out=[];var cur=null;
var lines=String(txt||"").split(/\r?\n/);
for(var a=0;a<lines.length;a++){
var L=lines[a].trim();
if(!L)continue;
if(L.charAt(0)==="#"){
var name=L.slice(1).trim();
cur=null;
for(var b=0;b<_NXSP.TIERS.length;b++){if(_NXSP.TIERS[b].rx.test(name)){cur=_NXSP.TIERS[b];break;}}
continue;}
var code=_NXSP.codeOf(L);
if(code&&out.length<_NXSP.MAX)out.push({code:code,tier:cur||_NXSP.TIERS[1]});}
return out;}catch(_){return [];}};
_NXSP.loadSlots=function(force){try{
if(_NXSP.slotsBusy)return;
if(!force&&_NXSP.slotsAt&&(Date.now()-_NXSP.slotsAt)<900000)return;
_NXSP.slotsBusy=true;_NXSP.notify();
_NXNETX.go(_NXSP.LIST+"?nx="+Date.now(),{cache:"no-store"})
.then(function(r){if(!r||!r.ok)throw 0;return r.text();})
.then(function(t){
_NXSP.slotsBusy=false;_NXSP.slotsAt=Date.now();
try{_NXNETX.ok("spon");}catch(_){}
_NXSP.slots=_NXSP.parseList(t);
try{_NXDB.set("nexium_sponsors",JSON.stringify({at:Date.now(),raw:t}));}catch(_){}
_NXSP.notify();
for(var a=0;a<_NXSP.slots.length;a++)_NXSP.loadCard(_NXSP.slots[a].code);})
.catch(function(){
_NXSP.slotsBusy=false;
try{_NXNETX.retry("spon",function(){_NXSP.loadSlots(true);});}catch(_){}
try{var r2=_NXDB.get("nexium_sponsors");
if(r2){var j=JSON.parse(r2);if(j&&j.raw){_NXSP.slots=_NXSP.parseList(j.raw);_NXSP.slotsAt=j.at||Date.now();
for(var b=0;b<_NXSP.slots.length;b++)_NXSP.loadCard(_NXSP.slots[b].code);}}}catch(_){}
_NXSP.notify();});
}catch(_){_NXSP.slotsBusy=false;}};
_NXSP.loadCard=function(code){try{
if(!code||_NXSP.cards[code])return;
_NXSP.cards[code]={loading:true};
var done=function(inv){try{
if(inv&&inv.guild){
_NXSP.cards[code]={guild:inv.guild,
members:(inv.approximate_member_count!=null?inv.approximate_member_count:inv.member_count),
online:(inv.approximate_presence_count!=null?inv.approximate_presence_count:inv.presence_count)};}
else _NXSP.cards[code]={err:true};
_NXSP.notify();}catch(_){}};
var R=_NXSP.wp("resolveInvite");
if(R){try{Promise.resolve(R.resolveInvite(code,"Nexium Sponsor"))
.then(function(res){done((res&&(res.invite||res))||null);})
.catch(function(){_NXSP.rawCard(code,done);});return;}catch(_){}}
_NXSP.rawCard(code,done);}catch(_){}};
_NXSP.rawCard=function(code,cb){try{
_NXNETX.go("https://discord.com/api/v10/invites/"+code+"?with_counts=true",{cache:"no-store"})
.then(function(r){if(!r||!r.ok)throw 0;return r.json();})
.then(cb).catch(function(){cb(null);});}catch(_){cb(null);}};
_NXSP.iconUrl=function(g){try{
if(!g||!g.icon)return null;
return "https://cdn.discordapp.com/icons/"+g.id+"/"+g.icon+(String(g.icon).indexOf("a_")===0?".gif":".png")+"?size=128";}catch(_){return null;}};
_NXSP.join=function(code){try{
var O=_NXSP.wp("openInviteModal");
if(O){O.openInviteModal(code).catch(function(){});return;}
if(typeof VencordNative!=="undefined"&&VencordNative.native&&VencordNative.native.openExternal)VencordNative.native.openExternal("https://discord.gg/"+code);
}catch(_){}};
_NXSP.free=function(){try{
var used={};
for(var a=0;a<_NXSP.slots.length;a++)used[_NXSP.slots[a].tier.k]=(used[_NXSP.slots[a].tier.k]||0)+1;
return {taken:_NXSP.slots.length,left:Math.max(0,_NXSP.MAX-_NXSP.slots.length),byTier:used};}catch(_){return {taken:0,left:_NXSP.MAX,byTier:{}};}};
_NXSP.apply=function(inv){try{if(inv&&inv.guild){_NXSP.at=Date.now();_NXSP.data={guild:inv.guild,approximate_member_count:inv.approximate_member_count!=null?inv.approximate_member_count:inv.member_count,approximate_presence_count:inv.approximate_presence_count!=null?inv.approximate_presence_count:inv.presence_count};_NXSP.err=false;return true;}}catch(_){}return false;};
_NXSP.rawFetch=function(){try{_NXNETX.go("https://discord.com/api/v10/invites/"+_NXSP.CODE+"?with_counts=true&with_expiration=true",{cache:"no-store"}).then(function(r){if(!r||!r.ok)throw 0;return r.json();}).then(function(j){_NXSP.busy=false;_NXSP.loading=false;if(!_NXSP.apply(j))_NXSP.err=true;_NXSP.notify();}).catch(function(){_NXSP.busy=false;_NXSP.loading=false;_NXSP.err=true;_NXSP.notify();});}catch(_){_NXSP.busy=false;_NXSP.loading=false;_NXSP.err=true;_NXSP.notify();}};
_NXSP.fetch=function(){if(_NXSP.busy)return;_NXSP.busy=true;if(!_NXSP.data)_NXSP.loading=true;_NXSP.notify();
var R=_NXSP.wp("resolveInvite");
if(R){try{Promise.resolve(R.resolveInvite(_NXSP.CODE,"Nexium Sponsor")).then(function(res){var inv=res&&(res.invite||res);_NXSP.busy=false;_NXSP.loading=false;if(!_NXSP.apply(inv)){_NXSP.rawFetch();}else{_NXSP.notify();}}).catch(function(){_NXSP.rawFetch();});return;}catch(_){}}
_NXSP.rawFetch();};
_NXSP.banner=function(){try{var g=_NXSP.data&&_NXSP.data.guild;if(g&&g.banner){var e=String(g.banner).indexOf("a_")===0?"gif":"png";return "https://cdn.discordapp.com/banners/"+g.id+"/"+g.banner+"."+e+"?size=600";}if(g&&g.splash)return "https://cdn.discordapp.com/splashes/"+g.id+"/"+g.splash+".png?size=600";}catch(_){}return null;};
_NXSP.icon=function(){try{var g=_NXSP.data&&_NXSP.data.guild;if(g&&g.icon){var e=String(g.icon).indexOf("a_")===0?"gif":"png";return "https://cdn.discordapp.com/icons/"+g.id+"/"+g.icon+"."+e+"?size=128";}}catch(_){}return null;};
_NXSP.name=function(){try{return (_NXSP.data&&_NXSP.data.guild&&_NXSP.data.guild.name)||("discord.gg/"+_NXSP.CODE);}catch(_){return "discord.gg/"+_NXSP.CODE;}};
_NXSP.members=function(){try{var v=_NXSP.data&&_NXSP.data.approximate_member_count;return v!=null?v:null;}catch(_){return null;}};
_NXSP.online=function(){try{var v=_NXSP.data&&_NXSP.data.approximate_presence_count;return v!=null?v:null;}catch(_){return null;}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXSP");if(window._NXERR)_NXERR.push("module _NXSP :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXSP desactive:",_nxE);}catch(_){}}
}var _NXPR=window._NXPR||(window._NXPR={});
