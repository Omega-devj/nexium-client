var _NXSKIN=window._NXSKIN||(window._NXSKIN={});
if(!_NXSKIN.boot){try{_NXSKIN.boot=true;
_NXSKIN.KEY="nexium_skin";
_NXSKIN.STYLEID="nx-skin-style";
_NXSKIN.listeners=[];
_NXSKIN.notify=function(){for(var a=0;a<_NXSKIN.listeners.length;a++){try{_NXSKIN.listeners[a]();}catch(_){}}};
_NXSKIN.VARIANTES={
encre:{clair:false,bg0:"#050506",bg1:"#0a0a0c",bg2:"#0e0e10",bg3:"#141416",bg4:"#1a1a1d",line:"#1e1e22",hair:"#2a2a30",txt:"#f4f4f5",sub:"#a6a6ac",dim:"#8a8a92",mute:"#5b5b63"},
graphite:{clair:false,bg0:"#0f0f11",bg1:"#151518",bg2:"#1a1a1e",bg3:"#202026",bg4:"#26262d",line:"#2c2c33",hair:"#3a3a43",txt:"#f2f2f4",sub:"#b0b0b8",dim:"#8f8f98",mute:"#65656e"},
papier:{clair:true,bg0:"#eaeae8",bg1:"#f2f2f1",bg2:"#fafaf9",bg3:"#ffffff",bg4:"#ffffff",line:"#e1e1de",hair:"#cbcbc6",txt:"#141416",sub:"#4a4a50",dim:"#6c6c74",mute:"#9a9aa0"}
};
_NXSKIN.ACCENTS={
ivoire:{val:"#e8e8ea",hover:"#ffffff",fg:"#0a0a0a"},
cendre:{val:"#9aa0a6",hover:"#b6bcc2",fg:"#0a0a0a"},
braise:{val:"#d6484a",hover:"#e35c5e",fg:"#0a0a0a"},
discord:null
};
_NXSKIN.POLICES={
defaut:null,
grotesque:{corps:'"Segoe UI Variable Text","Segoe UI",Inter,system-ui,"gg sans",sans-serif',titre:'"Segoe UI Variable Display","Segoe UI Semibold","Segoe UI",Inter,system-ui,sans-serif'},
editoriale:{corps:'"Segoe UI Variable Text","Segoe UI",system-ui,"gg sans",sans-serif',titre:'"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif'}
};
_NXSKIN.COINS={
arrondi:{xxs:"5px",xs:"7px",sm:"10px",md:"14px",lg:"20px",xl:"26px"},
doux:{xxs:"3px",xs:"4px",sm:"7px",md:"10px",lg:"14px",xl:"18px"},
net:{xxs:"0px",xs:"0px",sm:"2px",md:"3px",lg:"4px",xl:"5px"}
};
_NXSKIN.INTENSITES=["discrete","affirmee","totale"];
_NXSKIN.SEL={
rail:'nav[class*="guilds"]',
pilule:'nav[class*="guilds"] [class*="pill"] span',
separateur:'[class*="guildSeparator"]',
message:'[class*="message_"]',
mention:'[class*="mentioned_"]',
saisie:'[class*="channelTextArea_"]',
barretitre:'[class*="titleBar_"]',
categorie:'[class*="containerDefault_"] h3'
};
_NXSKIN.load=function(){var d;try{var raw=_NXDB.get(_NXSKIN.KEY);d=raw?JSON.parse(raw):null;}catch(_){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.on!=="boolean")d.on=true;
if(!_NXSKIN.VARIANTES[d.variante])d.variante="encre";
if(d.accent!=="discord"&&!_NXSKIN.ACCENTS[d.accent])d.accent="ivoire";
if(!_NXSKIN.POLICES[d.police]&&d.police!=="defaut")d.police="grotesque";
if(!_NXSKIN.COINS[d.coins])d.coins="doux";
if(_NXSKIN.INTENSITES.indexOf(d.intensite)<0)d.intensite=(d.signature===false?"discrete":"affirmee");
if(typeof d.sobre!=="boolean")d.sobre=true;
delete d.signature;
return d;};
_NXSKIN.cfg=_NXSKIN.load();
_NXSKIN.save=function(){try{_NXDB.set(_NXSKIN.KEY,JSON.stringify(_NXSKIN.cfg));}catch(_){}};
_NXSKIN.rang=function(){var r=_NXSKIN.INTENSITES.indexOf(_NXSKIN.cfg.intensite);return r<0?1:r;};
_NXSKIN.rgba=function(hex,a){try{
var h=String(hex).replace("#","");
if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
var r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
return "rgba("+r+","+g+","+b+","+a+")";}catch(_){return hex;}};
_NXSKIN.vars=function(){try{
var c=_NXSKIN.cfg;
var V=_NXSKIN.VARIANTES[c.variante]||_NXSKIN.VARIANTES.encre;
var base=V.clair?"0,0,0":"255,255,255";
var hov="rgba("+base+",.045)",act="rgba("+base+",.075)",sel="rgba("+base+",.095)";
var o={};
function put(noms,val){for(var a=0;a<noms.length;a++)o[noms[a]]=val;}
put(["--bg-base-primary","--background-primary","--background-mobile-primary","--chat-background","--home-background","--bg-overlay-chat"],V.bg2);
put(["--bg-base-secondary","--background-secondary","--background-secondary-alt","--background-mobile-secondary","--bg-surface-nested","--input-background","--modal-footer-background"],V.bg1);
put(["--bg-base-tertiary","--bg-base-lower","--bg-base-lowest","--background-tertiary"],V.bg0);
put(["--bg-surface-overlay","--bg-surface-raised","--background-floating","--modal-background","--channeltextarea-background","--deprecated-card-bg","--deprecated-card-editable-bg","--deprecated-quickswitcher-input-background","--activity-card-background"],V.bg3);
put(["--bg-surface-higher","--bg-surface-highest","--background-nested-floating"],V.bg4);
put(["--background-modifier-hover","--bg-mod-faint"],hov);
put(["--background-modifier-active","--bg-mod-subtle"],act);
put(["--background-modifier-selected","--bg-mod-moderate","--bg-mod-strong"],sel);
put(["--background-modifier-accent","--border-faint","--border-subtle","--app-border-frame"],V.line);
put(["--border-strong","--border-normal","--scrollbar-thin-thumb","--scrollbar-auto-thumb"],V.hair);
put(["--scrollbar-thin-track","--scrollbar-auto-track"],"transparent");
put(["--text-normal","--text-default","--header-primary","--interactive-active"],V.txt);
put(["--text-secondary","--interactive-normal"],V.sub);
put(["--text-muted","--text-feedback-muted","--header-secondary","--channels-default"],V.dim);
put(["--interactive-muted","--channel-icon"],V.mute);
o["--interactive-hover"]=V.txt;
var A=_NXSKIN.ACCENTS[c.accent];
if(A){
put(["--brand-360","--brand-400","--brand-430","--brand-460","--brand-500","--brand-530","--brand-560","--brand-600","--brand-experiment","--brand-experiment-500","--brand-experiment-560","--brand-experiment-600","--button-filled-brand-background","--control-brand-foreground","--control-brand-foreground-new","--text-brand","--text-link","--focus-primary","--mention-foreground"],A.val);
put(["--button-filled-brand-background-hover","--button-filled-brand-background-active"],A.hover);
o["--button-filled-brand-text"]=A.fg;
o["--mention-background"]=_NXSKIN.rgba(A.val,.12);
}
var P=_NXSKIN.POLICES[c.police];
if(P){o["--font-primary"]=P.corps;o["--font-display"]=P.titre;o["--font-headline"]=P.titre;}
var K=_NXSKIN.COINS[c.coins];
if(K){o["--radius-xxs"]=K.xxs;o["--radius-xs"]=K.xs;o["--radius-sm"]=K.sm;o["--radius-md"]=K.md;o["--radius-lg"]=K.lg;o["--radius-xl"]=K.xl;o["--radius-round"]="999px";}
return o;}catch(_){return {};}};
_NXSKIN.css=function(){try{
var c=_NXSKIN.cfg,rang=_NXSKIN.rang();
var V=_NXSKIN.VARIANTES[c.variante]||_NXSKIN.VARIANTES.encre;
var A=_NXSKIN.ACCENTS[c.accent];
var teinte=A?A.val:V.txt;
var K=_NXSKIN.COINS[c.coins]||_NXSKIN.COINS.doux;
var S=_NXSKIN.SEL;
var v=_NXSKIN.vars(),decl=[];
for(var k in v)decl.push(k+":"+v[k]+";");
var portee="html.nx-skin,html.nx-skin body,html.nx-skin .theme-dark,html.nx-skin .theme-light,html.nx-skin .visual-refresh,html.nx-skin #app-mount";
var out=[portee+"{"+decl.join("")+"}"];
out.push('html.nx-skin ::-webkit-scrollbar{width:10px;height:10px}');
out.push('html.nx-skin ::-webkit-scrollbar-thumb{background-color:'+V.hair+';border-radius:99px;border:3px solid transparent;background-clip:padding-box}');
out.push('html.nx-skin ::-webkit-scrollbar-thumb:hover{background-color:'+V.mute+'}');
out.push('html.nx-skin ::-webkit-scrollbar-track,html.nx-skin ::-webkit-scrollbar-corner{background:transparent;border:none}');
out.push('html.nx-skin ::selection{background:'+_NXSKIN.rgba(teinte,.24)+';color:'+V.txt+'}');
out.push('html.nx-skin :focus-visible{outline:1px solid '+_NXSKIN.rgba(teinte,.85)+';outline-offset:2px}');
if(c.sobre){
out.push('html.nx-skin [class*="bannerImg"],html.nx-skin [class*="bannerImage"]{filter:saturate(.55) contrast(1.04)}');
out.push('html.nx-skin a{text-underline-offset:2px}');
}
if(rang>=1){
out.push('html.nx-skin body::after{content:"";position:fixed;top:0;left:0;right:0;height:1px;pointer-events:none;z-index:100000;background:linear-gradient(90deg,transparent,'+_NXSKIN.rgba(teinte,.55)+' 22%,'+_NXSKIN.rgba(teinte,.55)+' 78%,transparent)}');
out.push('html.nx-skin '+S.pilule+'{background-color:'+teinte+'!important;border-radius:0!important;width:2px!important;margin-left:0!important}');
out.push('html.nx-skin '+S.separateur+'{background:'+V.line+'!important;height:1px!important;width:26px!important;margin:8px auto!important;border:none!important}');
out.push('html.nx-skin '+S.message+':hover{box-shadow:inset 2px 0 0 '+_NXSKIN.rgba(teinte,.45)+'}');
out.push('html.nx-skin '+S.mention+'{box-shadow:inset 2px 0 0 '+teinte+'!important}');
out.push('html.nx-skin '+S.saisie+'{border-top:1px solid '+V.line+'}');
out.push('html.nx-skin '+S.categorie+'{letter-spacing:.12em!important;text-transform:uppercase}');
}
if(rang>=2){
out.push('html.nx-skin '+S.barretitre+'::before{content:"NEXIUM";position:absolute;left:14px;top:50%;transform:translateY(-50%);'
+'font:600 10px/1 var(--font-display,system-ui);letter-spacing:.34em;color:'+_NXSKIN.rgba(teinte,.55)+';pointer-events:none;z-index:5}');
out.push('html.nx-skin body::before{content:"NEXIUM";position:fixed;right:18px;bottom:12px;z-index:0;pointer-events:none;user-select:none;'
+'font:700 34px/1 var(--font-display,system-ui);letter-spacing:.5em;color:'+_NXSKIN.rgba(teinte,V.clair?.05:.035)+'}');
out.push('html.nx-skin '+S.rail+'{box-shadow:inset -1px 0 0 '+V.line+'}');
out.push('html.nx-skin '+S.message+'{border-radius:'+K.xs+'}');
}
return out.join("\n");}catch(_){return "";}};
_NXSKIN.count=function(){try{
var o={};for(var k in _NXSKIN.SEL){try{o[k]=document.querySelectorAll(_NXSKIN.SEL[k]).length;}catch(_){o[k]=0;}}
return o;}catch(_){return {};}};
_NXSKIN.probe=function(){try{
var cs=window.getComputedStyle(document.body||document.documentElement);
function lu(n){try{return String(cs.getPropertyValue(n)||"").trim();}catch(_){return "";}}
return {fondAncien:lu("--background-primary"),fondNouveau:lu("--bg-base-primary"),
texte:lu("--text-normal"),accent:lu("--brand-500"),police:lu("--font-primary"),
coin:lu("--radius-md"),classe:!!(document.documentElement&&document.documentElement.classList&&document.documentElement.classList.contains("nx-skin")),
feuille:!!document.getElementById(_NXSKIN.STYLEID),cibles:_NXSKIN.count()};}catch(e){return {erreur:String(e&&e.message)};}};
_NXSKIN.pourquoi="";
_NXSKIN.sain=function(){try{
if(!_NXSKIN.cfg.on)return true;
var p=_NXSKIN.probe();
if(!p.feuille){_NXSKIN.pourquoi="feuille de style absente";return false;}
if(!p.classe){_NXSKIN.pourquoi="classe nx-skin absente";return false;}
var V=_NXSKIN.VARIANTES[_NXSKIN.cfg.variante]||_NXSKIN.VARIANTES.encre;
var att=V.bg2.toLowerCase();
if(String(p.fondAncien).toLowerCase()!==att&&String(p.fondNouveau).toLowerCase()!==att){
_NXSKIN.pourquoi="Discord a change ses variables de couleur";return false;}
_NXSKIN.pourquoi="";return true;}catch(e){_NXSKIN.pourquoi="erreur : "+((e&&e.message)||"?");return false;}};
_NXSKIN.manquants=function(){try{
if(_NXSKIN.rang()<1)return [];
var c=_NXSKIN.count(),m=[],cles=["rail","pilule","message","saisie"];
for(var a=0;a<cles.length;a++)if(!c[cles[a]])m.push(cles[a]);
return m;}catch(_){return [];}};
_NXSKIN.apply=function(){try{
var el=document.getElementById(_NXSKIN.STYLEID);
var root=document.documentElement;
if(!_NXSKIN.cfg.on){
if(el&&el.parentNode)el.parentNode.removeChild(el);
if(root&&root.classList){root.classList.remove("nx-skin");root.classList.remove("nx-sig-1");root.classList.remove("nx-sig-2");}
_NXSKIN.notify();return;}
if(!el){el=document.createElement("style");el.id=_NXSKIN.STYLEID;if(document.head)document.head.appendChild(el);}
el.textContent=_NXSKIN.css();
if(root&&root.classList){
root.classList.add("nx-skin");
var r=_NXSKIN.rang();
if(r>=1)root.classList.add("nx-sig-1");else root.classList.remove("nx-sig-1");
if(r>=2)root.classList.add("nx-sig-2");else root.classList.remove("nx-sig-2");}
_NXSKIN.notify();}catch(_){}};
_NXSKIN.set=function(k,v){try{_NXSKIN.cfg[k]=v;_NXSKIN.save();_NXSKIN.apply();}catch(_){}};
_NXSKIN.toggle=function(){try{_NXSKIN.set("on",!_NXSKIN.cfg.on);}catch(_){}};
_NXSKIN.status=function(){try{
var p=_NXSKIN.probe();
return {actif:_NXSKIN.cfg.on,variante:_NXSKIN.cfg.variante,accent:_NXSKIN.cfg.accent,
police:_NXSKIN.cfg.police,coins:_NXSKIN.cfg.coins,intensite:_NXSKIN.cfg.intensite,
applique:_NXSKIN.sain(),pourquoi:_NXSKIN.pourquoi||"",manquants:_NXSKIN.manquants(),sonde:p};}catch(_){return {};}};
try{_NXSKIN.apply();_NXPERF.amorce(_NXSKIN.apply,1500);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXSKIN");if(window._NXERR)_NXERR.push("module _NXSKIN :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXSKIN desactive:",_nxE);}catch(_){}}
}
