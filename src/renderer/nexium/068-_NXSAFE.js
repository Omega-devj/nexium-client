if(!_NXSAFE.boot){try{_NXSAFE.boot=true;_NXSAFE.KEY="nexium_boot_guard";_NXSAFE.on=false;
_NXSAFE.check=function(){try{
var raw=_NXDB.get(_NXSAFE.KEY);var st=null;
try{st=raw?JSON.parse(raw):null;}catch(_){st=null;}
if(!st||typeof st!=="object")st={n:0,at:0};
var now=Date.now();
if(now-(st.at||0)>180000)st.n=0;
st.n=(st.n||0)+1;st.at=now;
try{_NXDB.set(_NXSAFE.KEY,JSON.stringify(st));}catch(_){}
if(st.n>=3){
_NXSAFE.on=true;
_NXSAFE.coupes=[];
try{if(window._NXUA){_NXUA._en=false;_NXUA._coupe="mode securise";if(_NXUA.iv)clearInterval(_NXUA.iv);_NXUA.iv=null;_NXUA.unmount&&_NXUA.unmount();_NXSAFE.coupes.push("restauration des icones de plugins (pour cette session)");}}catch(_){}
var rend={};
try{if(window._NXBG&&_NXBG.cfg&&_NXBG.cfg.on){_NXBG.cfg.on=false;if(_NXBG.save)_NXBG.save();if(_NXBG.apply)_NXBG.apply();rend.bg=true;_NXSAFE.coupes.push("fond personnalise");}}catch(_){}
try{if(window._NXSKIN&&_NXSKIN.cfg&&_NXSKIN.cfg.on&&_NXSKIN.set){_NXSKIN.set("on",false);rend.skin=true;_NXSAFE.coupes.push("habillage du client");}}catch(_){}
try{if(rend.bg||rend.skin)_NXDB.set(_NXSAFE.RENDRE,JSON.stringify(rend));}catch(_){}
try{if(window._NXMO&&_NXMO.coupe){_NXMO.coupe("securise",true);_NXSAFE.coupes.push("animations (pour cette session)");}}catch(_){}
try{if(window._NXERR){_NXERR.push("mode securise :: "+st.n+" demarrages rapproches, coupe : "+(_NXSAFE.coupes.join(", ")||"rien"));if(window._NXsaveErr)_NXsaveErr();}}catch(_){}
try{setTimeout(function(){if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Mode securise : Discord a redemarre plusieurs fois de suite. Ce qui touche a l affichage est coupe. Nexium Donnees permet d en sortir."),0);},6000);}catch(_){}}
setTimeout(function(){try{_NXDB.set(_NXSAFE.KEY,JSON.stringify({n:0,at:Date.now()}));
if(!_NXSAFE.on)_NXSAFE.rend();}catch(_){}},60000);
}catch(_){}};
// Ce que le mode securise a coupe revient des qu un demarrage tient une
// minute sans rechuter : c etait une mesure d urgence, pas un nouveau reglage.
_NXSAFE.RENDRE="nexium_safe_rendre";
_NXSAFE.rend=function(){try{
var raw=_NXDB.get(_NXSAFE.RENDRE);
if(!raw)return false;
var d=null;try{d=JSON.parse(raw);}catch(_){d=null;}
_NXDB.del(_NXSAFE.RENDRE);
if(!d)return false;
try{if(d.bg&&window._NXBG&&_NXBG.cfg){_NXBG.cfg.on=true;if(_NXBG.save)_NXBG.save();if(_NXBG.apply)_NXBG.apply();}}catch(_){}
try{if(d.skin&&window._NXSKIN&&_NXSKIN.set)_NXSKIN.set("on",true);}catch(_){}
return true;}catch(_){return false;}};
_NXSAFE.coupes=_NXSAFE.coupes||[];
_NXSAFE.etat=function(){try{
return {actif:!!_NXSAFE.on,coupes:(_NXSAFE.coupes||[]).slice()};}catch(_){return {actif:false,coupes:[]};}};
_NXSAFE.leve=function(){try{
_NXDB.set(_NXSAFE.KEY,JSON.stringify({n:0,at:Date.now()}));
_NXSAFE.on=false;_NXSAFE.coupes=[];
try{if(window._NXMO&&_NXMO.coupe)_NXMO.coupe("securise",false);}catch(_){}
try{_NXSAFE.rend();}catch(_){}
return true;}catch(_){return false;}};
try{_NXSAFE.check();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXSAFE");if(window._NXERR)_NXERR.push("module _NXSAFE :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXSAFE desactive:",_nxE);}catch(_){}}
}var _NXCPT=window._NXCPT||(window._NXCPT={});
