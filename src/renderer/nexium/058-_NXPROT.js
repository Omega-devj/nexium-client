var _NXPROT=window._NXPROT||(window._NXPROT={});
_NXPROT.lit=function(src,k){try{
if(src==="pr")return !!(window._NXPR&&_NXPR.cfg&&_NXPR.cfg[k]);
if(src==="v")return !!(window._NXV&&_NXV.cfg&&_NXV.cfg[k]);
if(src==="g")return !!(window._NXGD&&_NXGD.cfg&&_NXGD.cfg[k]);
if(src==="p")return !!(window._NXP&&_NXP.cfg&&_NXP.cfg[k]);
return false;}catch(_){return false;}};
_NXPROT.permis=function(src,k){try{
if(src==="pr"&&window._NXPR&&_NXPR.permis)return !!_NXPR.permis(k);
if(src==="g"&&window._NXPR&&_NXPR.permis)return !!_NXPR.permis(k);
if(src==="p"&&window._NXP&&_NXP.permis)return !!_NXP.permis(k);
return true;}catch(_){return true;}};
_NXPROT.dispo=function(src){try{
if(src==="pr")return !!window._NXPR;
if(src==="v")return !!(window._NXV&&_NXV.cfg);
if(src==="g")return !!(window._NXGD&&_NXGD.cfg);
if(src==="p")return !!(window._NXP&&_NXP.cfg);
return false;}catch(_){return false;}};
_NXPROT.ecrit=function(src,k,v){try{
if(!_NXPROT.dispo(src))return false;
if(v&&!_NXPROT.permis(src,k))return false;
if(src==="pr"){_NXPR.cfg[k]=!!v;_NXPR.saveCfg();
if(k==="maskLinks"||k==="maskSuspect"||k==="scanLinks"){try{
if(_NXPR.cfg.maskLinks&&_NXPR.cfg.scanLinks){_NXPR.masqueVeille();_NXPR.masqueRefaire();}else _NXPR.masqueTout();}catch(_){}}
try{_NXPR.cache=Object.create(null);}catch(_){}
return true;}
if(src==="v"){var V=_NXV;
if(k==="encryptLocal"){V.applyEncryption(!!v);}
else{V.cfg[k]=!!v;V.save();}
try{
if(k==="scanThemes"){V._cssWarned=false;V.scanCss();}
if(k==="verifyIntegrity"&&v)V.checkIntegrity();
if(k==="community"){if(v)V.loadCommunity(true);else{V.comm=Object.create(null);V.commN=0;}_NXPR.cache=Object.create(null);}
if(k==="auditPlugins"){if(v){V._plWarned=false;V.auditPlugins();}else V.plugins=[];}}catch(_){}
try{if(V.notify)V.notify();}catch(_){}
return true;}
if(src==="g"){_NXGD.set(k,!!v);return true;}
if(src==="p"){_NXP.cfg[k]=!!v;_NXP.saveCfg();
try{_NXP.appliquerTout();}catch(_){}
try{if(_NXP.notify)_NXP.notify();}catch(_){}
return true;}
return false;}catch(_){return false;}};
// L etat d une carte : allumee, eteinte, en partie, en pause, fermee.
_NXPROT.etat=function(it){try{
var on=0,tot=0,ferme=0,dispo=0,a;
for(a=0;a<it.k.length;a++){var s=it.k[a][0],k=it.k[a][1];
if(!_NXPROT.dispo(s))continue;
dispo++;tot++;
if(!_NXPROT.permis(s,k)){ferme++;continue;}
if(_NXPROT.lit(s,k))on++;}
var pause=!!(it.dep&&on&&!_NXPROT.lit("pr","scanLinks"));
return {on:on,tot:tot,ferme:ferme,absent:!dispo,
plein:tot>0&&on===tot-ferme&&on>0,partiel:on>0&&on<tot-ferme,
toutFerme:tot>0&&ferme===tot,pause:pause};}catch(_){return {on:0,tot:0,ferme:0,absent:true};}};
// Allumer une carte allume tout ce qu elle pilote, et l analyse des liens
// dont elle depend : une protection de lien sans analyse ne fait rien.
_NXPROT.bascule=function(it){try{
var e=_NXPROT.etat(it);
var veut=!e.plein;
for(var a=0;a<it.k.length;a++)_NXPROT.ecrit(it.k[a][0],it.k[a][1],veut);
if(veut&&it.dep&&!_NXPROT.lit("pr","scanLinks"))_NXPROT.ecrit("pr","scanLinks",true);
return veut;}catch(_){return false;}};
_NXPROT.compte=function(it){try{
if(!it.cpt)return null;
var st=(window._NXPR&&_NXPR.stats)||{},PT=st.parType||{};
var G=(window._NXGD&&_NXGD.stats)||{},VS=(window._NXV&&_NXV.stats)||{},PS=(window._NXP&&_NXP.stats)||{};
var n=0,a;
for(a=0;a<it.cpt.length;a++){var c=it.cpt[a],x=0;
if(c[0]==="pr")x=st[c[1]];else if(c[0]==="type")x=PT[c[1]];
else if(c[0]==="g")x=G[c[1]];else if(c[0]==="v")x=VS[c[1]];else if(c[0]==="p")x=PS[c[1]];
if(typeof x==="number"&&isFinite(x))n+=x;}
return n;}catch(_){return null;}};
// Ce que les preuves disent de la carte, si elles ont tourne.
_NXPROT.preuve=function(it){try{
if(!it.pv||!window._NXPRV)return null;
var ok=0,ko=0,vus=0,a;
for(a=0;a<it.pv.length;a++){var r=_NXPRV.res[it.pv[a]];if(!r)continue;vus++;
if(r.etat==="agit")ok++;else if(r.etat==="echec")ko++;}
if(!vus)return {etat:"jamais"};
if(ko)return {etat:"echec",ok:ok,ko:ko};
if(ok===vus)return {etat:"prouvee",ok:ok};
return {etat:"partielle",ok:ok};}catch(_){return null;}};
_NXPROT.bilan=function(cat){try{
var C=cat||_NXPROTCAT;
var on=0,acc=0,ferme=0,tot=0,pause=0,a;
for(a=0;a<C.length;a++){var e=_NXPROT.etat(C[a]);
if(e.absent)continue;tot++;
if(e.toutFerme){ferme++;continue;}
acc++;
if(e.pause){pause++;continue;}
if(e.plein)on++;else if(e.partiel)on+=0.5;}
return {on:on,acc:acc,ferme:ferme,tot:tot,pause:pause,
pct:acc?Math.round(on*100/acc):0};}catch(_){return {on:0,acc:0,ferme:0,tot:0,pause:0,pct:0};}};
try{window._NXPROTCAT=_NXPROTCAT;}catch(_){}
