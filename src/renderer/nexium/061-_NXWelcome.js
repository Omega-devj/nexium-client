if(!_NXWelcome.boot){try{_NXWelcome.boot=true;
_NXWelcome.KEY="nexium_onboarded";
_NXWelcome.close=function(){try{var e=document.getElementById("nx-onboard");if(e&&e.parentNode)e.parentNode.removeChild(e);}catch(_){}};
_NXWelcome.show=function(){try{
if(document.getElementById("nx-onboard"))return;var P=_NXpal;
var ov=document.createElement("div");ov.id="nx-onboard";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,"+(P.light?".3":".65")+");backdrop-filter:blur(7px);";
var card=document.createElement("div");
card.style.cssText="width:520px;max-width:calc(100vw - 40px);max-height:calc(100vh - 80px);overflow-y:auto;background:"+(P.light?_NXpal.acc:"linear-gradient(168deg,#141416,#0b0b0c)")+";border:1px solid "+P.line+";border-radius:22px;padding:28px;box-shadow:0 40px 100px rgba(0,0,0,.5);";
var rows=[["Protect","Bloque les liens piégés, les loggers d IP et les arnaques, en temps réel."],["Privacy","Coupe la télémétrie et mesure ton niveau d anonymat."],["Stats","Tes statistiques d usage, en local et pour toi seul."],["Music","Un lecteur intégré avec la playlist du projet."],["Réseau & Données","Latence, stabilité, et contrôle total de ce qui est stocké."]];
var html='<div style="font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:'+P.faint+';margin-bottom:9px;">Bienvenue</div>'
+'<div style="font-size:26px;font-weight:800;letter-spacing:-.03em;color:'+P.txt+';margin-bottom:10px;">Nexium est installé</div>'
+'<div style="font-size:13px;color:'+P.sub+';line-height:1.6;margin-bottom:20px;">Voici ce que tu trouveras dans les réglages Discord, section Nexium.</div>';
for(var a=0;a<rows.length;a++){
html+='<div style="display:flex;gap:12px;margin-bottom:13px;"><div style="width:6px;height:6px;border-radius:50%;background:'+P.acc+';margin-top:7px;flex-shrink:0;"></div>'
+'<div><div style="font-size:14px;font-weight:700;color:'+P.txt+';">'+rows[a][0]+'</div>'
+'<div style="font-size:12.5px;color:'+P.sub+';line-height:1.55;margin-top:2px;">'+rows[a][1]+'</div></div></div>';}
html+='<div style="margin-top:18px;padding:12px 14px;border-radius:12px;background:'+(P.light?_NXpal.acc:_NXpal.inset)+';border:1px solid '+P.line+';font-size:12.5px;color:'+P.sub+';line-height:1.55;">Astuce : appuie sur <b style="color:'+P.txt+';">Ctrl + Maj + N</b> à tout moment pour ouvrir la recherche rapide Nexium.</div>';
card.innerHTML=_NXtrHtml(html);
var btn=document.createElement("div");btn.className="nx-fx";btn.setAttribute("role","button");btn.setAttribute("tabindex","0");
btn.style.cssText="margin-top:20px;text-align:center;padding:13px;border-radius:12px;background:"+P.acc+";color:"+(P.light?_NXpal.acc:_NXpal.ink)+";font-size:14px;font-weight:800;cursor:pointer;";
btn.textContent=_NXtr("Commencer");
btn.onclick=function(){try{_NXDB.set(_NXWelcome.KEY,"1");}catch(_){}_NXWelcome.close();};
btn.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();btn.onclick();}};
card.appendChild(btn);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov){try{_NXDB.set(_NXWelcome.KEY,"1");}catch(_){}_NXWelcome.close();}};
if(document.body)document.body.appendChild(ov);
}catch(_){}};
_NXWelcome.maybe=function(){try{if(_NXDB.get(_NXWelcome.KEY))return;setTimeout(function(){_NXWelcome.show();},3500);}catch(_){}};
try{_NXWelcome.maybe();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXWelcome");if(window._NXERR)_NXERR.push("module _NXWelcome :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXWelcome desactive:",_nxE);}catch(_){}}
}var _NXECO=window._NXECO||(window._NXECO={});
