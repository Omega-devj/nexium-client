var _NXPLAN=window._NXPLAN||(window._NXPLAN={});
if(!_NXPLAN.boot){try{_NXPLAN.boot=true;
// Le plan, et la marche arriere.
_NXPLAN.KEY="nexium_plan";
_NXPLAN.MODID="nx-plan-modal";
_NXPLAN.VIE=240000;
_NXPLAN.MAXJ=24;
_NXPLAN.MAXE=10;
_NXPLAN.cfg={exige:true};
_NXPLAN.load=function(){try{
var r=_NXDB.get(_NXPLAN.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.exige!=="boolean")d.exige=true;
_NXPLAN.cfg=d;return d;}catch(_){_NXPLAN.cfg={exige:true};return _NXPLAN.cfg;}};
_NXPLAN.save=function(){try{_NXDB.set(_NXPLAN.KEY,JSON.stringify(_NXPLAN.cfg));}catch(_){}};
_NXPLAN.set=function(k,v){try{_NXPLAN.cfg[k]=v;_NXPLAN.save();
try{if(window._NXIA&&_NXIA.notify)_NXIA.notify();}catch(_){}}catch(_){}};

// Les outils qui changent quelque chose. Ouvrir une page n en est pas un :
// c est la facon dont l assistant montre ou il veut en venir.
_NXPLAN.MODIF={changer_reglage:1,changer_reglage_protect:1,appliquer_profil_privacy:1,
mode_economie:1,apparence:1,concentration:1,musique:1,envoyer_message:1};
_NXPLAN.ouvert=null;
_NXPLAN.journal=[];
_NXPLAN.attente=null;

_NXPLAN.modifie=function(nom){try{return _NXPLAN.MODIF[nom]===1;}catch(_){return false;}};
_NXPLAN.autorise=function(nom){try{
var o=_NXPLAN.ouvert;
if(!o)return false;
if(Date.now()>o.expire){_NXPLAN.ouvert=null;return false;}
if(!nom)return true;
if(o.tous)return true;
return o.outils[nom]===true;}catch(_){return false;}};
_NXPLAN.exige=function(nom){try{
if(!_NXPLAN.cfg.exige)return false;
// Auto a deja repondu a la question que le plan pose.
try{if(window._NXIA&&_NXIA.mode&&_NXIA.mode()==="auto")return false;}catch(_){}
if(!_NXPLAN.modifie(nom))return false;
return !_NXPLAN.autorise(nom);}catch(_){return false;}};
_NXPLAN.refus=function(nom){try{
return {refuse:"plan requis avant d agir",
detail:"L utilisateur veut voir la suite complete avant que quoi que ce soit change. "+
"Appelle d abord l outil plan avec la liste des etapes que tu comptes faire, "+
"une ligne par etape, en nommant l outil de chacune. Il la validera, et tu pourras "+
"alors executer "+nom+" sans redemander.",outil_bloque:nom};}catch(_){
return {refuse:"plan requis avant d agir"};}};

// --- La marche arriere ------------------------------------------------------
// On ne photographie pas l etat complet du client : on note, pour chaque
// modification, le geste exact qui la defait. C est plus sur qu une
// restauration en bloc, et ca se raconte.
_NXPLAN.REVERS={
changer_reglage:function(a){try{
var P=window._NXP;if(!P||!P.cfg)return null;
var k=String((a&&a.cle)||"");
if(typeof P.cfg[k]!=="boolean")return null;
var v=P.cfg[k];
return {etiquette:"le reglage "+k+" remis sur "+(v?"allume":"eteint"),
defaire:function(){try{P.cfg[k]=v;
if(typeof P.saveCfg==="function")P.saveCfg();
try{if(typeof P.appliquerTout==="function")P.appliquerTout();}catch(_){}
if(typeof P.notify==="function")P.notify();
return true;}catch(_){return false;}}};}catch(_){return null;}},
changer_reglage_protect:function(a){try{
var PR=window._NXPR;if(!PR||!PR.cfg)return null;
var k=String((a&&a.cle)||"");
if(typeof PR.cfg[k]!=="boolean")return null;
var v=PR.cfg[k];
return {etiquette:"la protection "+k+" remise sur "+(v?"allumee":"eteinte"),
defaire:function(){try{PR.cfg[k]=v;
if(typeof PR.save==="function")PR.save();else if(typeof PR.saveCfg==="function")PR.saveCfg();
if(typeof PR.notify==="function")PR.notify();
return true;}catch(_){return false;}}};}catch(_){return null;}},
appliquer_profil_privacy:function(){try{
var P=window._NXP;if(!P||!P.cfg)return null;
var avant={},k;
for(k in P.cfg)if(typeof P.cfg[k]==="boolean")avant[k]=P.cfg[k];
var n=0;for(k in avant)n++;
if(!n)return null;
return {etiquette:"les "+n+" reglages de confidentialite remis comme ils etaient",
defaire:function(){try{
var q;for(q in avant)P.cfg[q]=avant[q];
if(typeof P.saveCfg==="function")P.saveCfg();
try{if(typeof P.appliquerTout==="function")P.appliquerTout();}catch(_){}
if(typeof P.notify==="function")P.notify();
return true;}catch(_){return false;}}};}catch(_){return null;}},
mode_economie:function(a){try{
var E=window._NXECO;
if(!E||!E.cfg||!(a&&typeof a.actif==="boolean"))return null;
var v=E.cfg.mode;
return {etiquette:"le mode economie remis sur "+String(v),
defaire:function(){try{if(typeof E.set==="function")E.set("mode",v);return true;}catch(_){return false;}}};}catch(_){return null;}},
apparence:function(a){try{
var S2=window._NXSKIN,B=window._NXBG;
if(!a||(!a.variante&&!a.accent&&!a.fond))return null;
var av={},dit=[];
if(a.variante&&S2&&S2.cfg){av.variante=S2.cfg.variante;dit.push("le theme");}
if(a.accent&&S2&&S2.cfg){av.accent=S2.cfg.accent;dit.push("l accent");}
if(a.fond&&B&&B.cfg){av.fond=B.cfg.color;dit.push("le fond");}
if(!dit.length)return null;
return {etiquette:dit.join(" et ")+" remis comme avant",
defaire:function(){try{
if(av.variante!==undefined&&S2&&typeof S2.set==="function")S2.set("variante",av.variante);
if(av.accent!==undefined&&S2&&typeof S2.set==="function")S2.set("accent",av.accent);
if(av.fond!==undefined&&B&&typeof B.set==="function")B.set(av.fond);
return true;}catch(_){return false;}}};}catch(_){return null;}}};

_NXPLAN.IRREVERSIBLE={envoyer_message:"un message envoye ne se reprend pas",
concentration:"une session de concentration ne se rejoue pas",
musique:"la lecture ne se remonte pas"};

// Appele par _NXIA.executer, juste avant l outil. Rend soit un refus, soit
// de quoi noter la marche arriere une fois l outil reussi.
_NXPLAN.avant=function(nom,args){try{
var vrai=nom,vrais=args||{};
try{if(window._NXIA&&_NXIA.cible){
vrai=_NXIA.cible(nom,args);
if(nom==="utiliser_outil")vrais=(args&&args.arguments)||{};}}catch(_){}
if(_NXPLAN.exige(vrai))return {refuse:_NXPLAN.refus(vrai)};
if(!_NXPLAN.modifie(vrai))return null;
var rec=null;
try{if(_NXPLAN.REVERS[vrai])rec=_NXPLAN.REVERS[vrai](vrais);}catch(_){rec=null;}
var pourquoi=_NXPLAN.IRREVERSIBLE[vrai]||null;
return {note:function(){try{
_NXPLAN.journal.push({quand:Date.now(),outil:vrai,
etiquette:rec?rec.etiquette:null,
pourquoi:rec?null:(pourquoi||"cet outil ne sait pas se defaire"),
defaire:rec?rec.defaire:null});
while(_NXPLAN.journal.length>_NXPLAN.MAXJ)_NXPLAN.journal.shift();}catch(_){}}};
}catch(_){return null;}};

_NXPLAN.annulables=function(){try{
var out=[],a;
for(a=_NXPLAN.journal.length-1;a>=0;a--)
if(typeof _NXPLAN.journal[a].defaire==="function")out.push(_NXPLAN.journal[a]);
return out;}catch(_){return [];}};
// Du plus recent au plus ancien : defaire dans l ordre inverse est la seule
// facon de retomber sur l etat de depart quand deux etapes se recouvrent.
_NXPLAN.defaisTout=function(){try{
var n=0,rates=0,a;
for(a=_NXPLAN.journal.length-1;a>=0;a--){
var e=_NXPLAN.journal[a];
if(typeof e.defaire!=="function")continue;
if(e.defaire())n++;else rates++;
e.defaire=null;e.defait=true;}
try{if(window._NXIA&&_NXIA.notify)_NXIA.notify();}catch(_){}
return {annulees:n,ratees:rates};}catch(_){return {annulees:0,ratees:0};}};
_NXPLAN.oublie=function(){try{_NXPLAN.journal=[];}catch(_){}};

// --- La carte du plan -------------------------------------------------------
_NXPLAN.ferme=function(){try{
var o=document.getElementById(_NXPLAN.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};
// Une ligne blanche dans la carte, c est une case a cocher qui ne dit
// rien : elle ne doit pas exister.
_NXPLAN.propre=function(x){try{
return String(x===null||x===undefined?"":x).replace(/\s+/g," ").trim().slice(0,180);}catch(_){return "";}};
_NXPLAN.normalise=function(etapes){try{
var out=[],a;
if(!etapes||!etapes.length)return out;
for(a=0;a<etapes.length&&a<_NXPLAN.MAXE;a++){
var e=etapes[a];
if(typeof e==="string")out.push({titre:_NXPLAN.propre(e),outil:""});
else if(e&&typeof e==="object")out.push({
titre:_NXPLAN.propre(e.titre||e.etape||e.quoi),
outil:String(e.outil||e.tool||"").slice(0,48)});}
var net=[],b;
for(b=0;b<out.length;b++)if(out[b].titre)net.push(out[b]);
return net;}catch(_){return [];}};

// `fait` sert au routeur local : quand il est donne, la validation execute
// directement, sans repasser par le relais.
_NXPLAN.pose=function(etapes,fait,outils){try{
var L=_NXPLAN.normalise(etapes);
try{if(outils&&outils.length===L.length){var z;
for(z=0;z<L.length;z++)if(!L[z].outil)L[z].outil=String(outils[z]||"").slice(0,48);}}catch(_){}
if(!L.length)return {erreur:"le plan est vide : donne au moins une etape"};
_NXPLAN.attente={etapes:L,retires:{},fait:fait||null};
try{_NXPLAN.carte();}catch(_){}
return {en_attente:true,etapes:L.length,
note:"Le plan est affiche a l utilisateur. N execute rien : attends sa reponse, "+
"elle t arrivera comme un nouveau message."};}catch(_){
return {erreur:"le plan n a pas pu etre affiche"};}};

_NXPLAN.carte=function(){try{
var A=_NXPLAN.attente;
if(!A)return false;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
_NXPLAN.ferme();
var ov=document.createElement("div");ov.id=_NXPLAN.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:500px;max-width:calc(100vw - 40px);max-height:82vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var tete=document.createElement("div");
tete.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium IA</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">Voici ce qu il veut faire</div>'
+'<div style="font-size:12px;color:'+P.sub+';margin-top:6px;line-height:1.6;">Rien n a encore change. Retire les lignes que tu ne veux pas, puis valide une seule fois : les etapes gardees ne te redemanderont rien.</div>');
card.appendChild(tete);
var corps=document.createElement("div");
corps.style.cssText="overflow-y:auto;margin-top:14px;flex:1 1 auto;";
var a;
for(a=0;a<A.etapes.length;a++){(function(k){
var e=A.etapes[k];
var off=!!A.retires[k];
var l=document.createElement("div");
l.className="nx-fx";l.setAttribute("role","button");l.setAttribute("tabindex","0");
l.setAttribute("aria-pressed",off?"false":"true");
l.style.cssText="display:flex;gap:11px;align-items:flex-start;padding:11px 12px;margin-bottom:6px;border-radius:12px;"
+"background:"+(off?"transparent":P.inset)+";border:1px solid "+(off?P.line:P.hair)+";cursor:pointer;";
l.innerHTML=_NXtrHtml('<div style="flex:0 0 auto;width:16px;height:16px;border-radius:5px;margin-top:1px;'
+'border:1px solid '+(off?P.faint:P.acc)+';background:'+(off?"transparent":P.acc)+';color:'+P.ink
+';font-size:11px;font-weight:900;line-height:15px;text-align:center;">'+(off?"":"&#10003;")+'</div>'
+'<div style="flex:1 1 auto;min-width:0;">'
+'<div style="font-size:12.5px;font-weight:600;color:'+(off?P.faint:P.txt)+';line-height:1.5;'+(off?"text-decoration:line-through;":"")+'">'+esc(e.titre)+'</div>'
+(e.outil?('<div style="font-size:10.5px;color:'+P.dim+';margin-top:3px;font-family:'+_NXf.mono+';">'+esc(e.outil)+'</div>'):"")
+'</div>');
var bascule=function(){A.retires[k]=!A.retires[k];_NXPLAN.carte();};
l.onclick=bascule;
l.onkeydown=function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();bascule();}};
corps.appendChild(l);})(a);}
card.appendChild(corps);
var gardees=0;
for(a=0;a<A.etapes.length;a++)if(!A.retires[a])gardees++;
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var note=document.createElement("div");
note.style.cssText="flex:1 1 auto;font-size:10.5px;color:"+P.faint+";line-height:1.55;";
note.textContent=gardees?(_NXtr(gardees)+_NXtr(" etape")+(gardees>1?_NXtr("s"):"")+_NXtr(" gardee")+(gardees>1?_NXtr("s"):"")+_NXtr(" sur ")+_NXtr(A.etapes.length)+_NXtr(". Tout ce qui peut se defaire sera annulable ensuite.")):
_NXtr("Toutes les lignes sont retirees : valider revient a ne rien faire.");
pied.appendChild(note);
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();fn();}};
return b;};
pied.appendChild(mk("Ne rien faire","flex:0 0 auto;padding:10px 16px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;",
function(){_NXPLAN.annule();}));
pied.appendChild(mk(gardees?("Valider ces "+gardees+" etapes"):"Valider",
"flex:0 0 auto;padding:10px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:800;cursor:pointer;",
function(){_NXPLAN.valide();}));
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXPLAN.annule();};
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};

_NXPLAN.valide=function(){try{
var A=_NXPLAN.attente;
if(!A)return false;
_NXPLAN.attente=null;
_NXPLAN.ferme();
var gardees=[],outils={},a;
for(a=0;a<A.etapes.length;a++){
if(A.retires[a])continue;
gardees.push(A.etapes[a]);
if(A.etapes[a].outil)outils[A.etapes[a].outil]=true;}
if(!gardees.length){
_NXPLAN.ouvert=null;
if(A.fait)return true;
try{_NXIA.envoyer("J ai retire toutes les etapes. N execute rien et propose-moi autre chose.");}catch(_){}
return true;}
// Une etape sans nom d outil ne doit pas bloquer l execution : le plan a
// ete valide dans son ensemble, pas outil par outil.
var nomme=false;
for(a=0;a<gardees.length;a++)if(gardees[a].outil)nomme=true;
_NXPLAN.ouvert={expire:Date.now()+_NXPLAN.VIE,etapes:gardees,outils:outils,tous:!nomme};
if(A.fait){try{A.fait(gardees);}catch(_){}return true;}
var L=[],b;
for(b=0;b<gardees.length;b++)L.push((b+1)+". "+gardees[b].titre);
try{_NXIA.envoyer("Plan valide. Execute exactement ces etapes, dans cet ordre, "+
"sans en ajouter :\n"+L.join("\n"));}catch(_){}
return true;}catch(_){return false;}};

_NXPLAN.annule=function(){try{
var A=_NXPLAN.attente;
_NXPLAN.attente=null;
_NXPLAN.ouvert=null;
_NXPLAN.ferme();
if(A&&A.fait)return true;
try{_NXIA.envoyer("Je refuse ce plan. N execute rien, et dis-moi seulement pourquoi tu proposais ca.");}catch(_){}
return true;}catch(_){return false;}};

// --- La carte de la marche arriere ------------------------------------------
_NXPLAN.modaleAnnuler=function(){try{
if(document.getElementById("nx-undo-modal"))return false;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var ov=document.createElement("div");ov.id="nx-undo-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:470px;max-width:calc(100vw - 40px);max-height:78vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;";
var J=_NXPLAN.journal,a,h="";
var possibles=_NXPLAN.annulables().length;
for(a=J.length-1;a>=0;a--){
var e=J[a];
var quand=new Date(e.quand);
var hh=("0"+quand.getHours()).slice(-2)+"h"+("0"+quand.getMinutes()).slice(-2);
var peut=(typeof e.defaire==="function");
h+='<div style="display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-top:1px solid '+P.line+';">'
+'<div style="flex:0 0 44px;font-size:10.5px;color:'+P.faint+';font-family:'+_NXf.mono+';padding-top:1px;">'+hh+'</div>'
+'<div style="flex:1 1 auto;min-width:0;">'
+'<div style="font-size:12px;color:'+(peut?P.mid:P.faint)+';line-height:1.5;">'+esc(e.etiquette||e.outil)+'</div>'
+(peut?"":('<div style="font-size:10.5px;color:'+P.faint+';margin-top:2px;">'+esc(e.defait?"deja annule":e.pourquoi||"")+'</div>'))
+'</div></div>';}
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium IA</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">Annuler ce que l assistant a fait</div>'
+'<div style="font-size:12px;color:'+P.sub+';margin-top:6px;line-height:1.6;">'
+(J.length?(possibles?("Ces changements seront remis comme ils etaient, du plus recent au plus ancien."):
"Rien de ce qu il a fait ne peut etre defait."):"L assistant n a rien change depuis le demarrage.")+'</div>'
+'<div style="overflow-y:auto;margin-top:12px;flex:1 1 auto;">'+h+'</div>');
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();fn();}};
return b;};
var ferme=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
pied.appendChild(mk("Fermer","padding:10px 16px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;",ferme));
if(possibles)
pied.appendChild(mk("Tout annuler ("+possibles+")","padding:10px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:800;cursor:pointer;",
function(){var r=_NXPLAN.defaisTout();ferme();
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(r.annulees)+_NXtr(" changement(s) annule(s)")+(r.ratees?(", "+_NXtr(r.ratees)+_NXtr(" en echec")):"")+".",1);}catch(_){}}));
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)ferme();};
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};

_NXPLAN.etat=function(){try{
return {exige:!!_NXPLAN.cfg.exige,plan_ouvert:_NXPLAN.autorise(),
en_attente:!!_NXPLAN.attente,annulables:_NXPLAN.annulables().length,
journal:_NXPLAN.journal.length};}catch(_){return {exige:true};}};
try{_NXPLAN.load();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXPLAN");if(window._NXERR)_NXERR.push("module _NXPLAN :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXPLAN desactive:",_nxE);}catch(_){}}
}
