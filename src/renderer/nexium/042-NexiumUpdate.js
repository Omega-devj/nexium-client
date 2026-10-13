var NexiumUpdateIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("maj",z):null;};
function NexiumUpdateComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t=F.useState("etat");var tab=_t[0];var setTab=_t[1];
F.useEffect(function(){
_NXUP.listeners.push(force);
if(!_NXUP._auto){_NXUP._auto=true;_NXUP.check();}
return function(){_NXUP.listeners=_NXUP.listeners.filter(function(f){return f!==force;});};},[]);
F.useEffect(function(){
// On ne va chercher les notes que s il y a quelque chose a annoncer.
try{if(_NXUP.available())_NXUP.litNotes();}catch(_){}},[_NXUP.repoVersion]);
var monte=_NXmounted(F);
var P=_NXpal;
var up=_NXUP.available();
var lt=_NXUP.latest;
var ahead=_NXUP.ahead();
var vLocal=parseInt(_NXUP.VERSION,10)||0;
var vRepo=_NXUP.repoVersion;
var retard=(up&&vRepo!=null)?(vRepo-vLocal):0;
var etat=_NXUP.busy?_T("Verification en cours")
:(up?_T("Mise a jour disponible")
:(_NXUP.err?_T("Depot injoignable")
:(ahead?_T("Version locale non publiee"):_T("Client a jour"))));
var col=up?_NXpal.ok:(_NXUP.err?_NXpal.dangerSoft:(ahead?_NXpal.warn:_NXpal.ok));

function depuis(t){try{
if(!t)return _T("jamais");
var s2=Math.floor((Date.now()-t)/1000);
if(s2<60)return _T("a l instant");
if(s2<3600)return _T("il y a")+" "+Math.floor(s2/60)+" min";
if(s2<86400)return _T("il y a")+" "+Math.floor(s2/3600)+" h";
return _T("il y a")+" "+Math.floor(s2/86400)+" "+_T("jours");}catch(_){return "";}}
function horodate(t){try{
var d=new Date(t);
var au=new Date();
var hh=("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
var meme=d.getFullYear()===au.getFullYear()&&d.getMonth()===au.getMonth()&&d.getDate()===au.getDate();
if(meme)return hh;
return ("0"+d.getDate()).slice(-2)+"/"+("0"+(d.getMonth()+1)).slice(-2)+" "+hh;}catch(_){return "";}}

// ---------------------------------------------------------------- le heros
function hero(){
return i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",
border:"1px solid "+(up?_NXteinte(col,26):P.hair),borderRadius:"22px",
background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",
padding:"25px 24px",marginBottom:"14px"}},
up?i("div",{"data-nx-halo":"1","aria-hidden":"true",style:{position:"absolute",
right:"-80px",top:"-100px",width:"260px",height:"260px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(col,20)+",transparent 70%)",
pointerEvents:"none"}}):null,
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"}},
i("div",{style:{width:"56px",height:"56px",borderRadius:"17px",flexShrink:0,
background:_NXteinte(col,12),border:"1px solid "+_NXteinte(col,28),color:col,
display:"flex",alignItems:"center",justifyContent:"center"}},
i("svg",{viewBox:"0 0 24 24",width:26,height:26,fill:"currentColor","aria-hidden":"true",
style:_NXUP.busy?{animation:"nx-spin 1.1s linear infinite"}:null},
i("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"}))),
i("div",{style:{flex:1,minWidth:"210px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",
textTransform:"uppercase",color:P.faint,marginBottom:"9px"}},_T("Etat du client")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"26px",fontWeight:"800",color:P.txt,
letterSpacing:"-.035em",lineHeight:1.15}},_NXtr(etat)),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6,marginTop:"9px"}},
up?(retard>1?(_NXtr(retard)+" "+_T("versions de retard. Redemarre pour appliquer."))
:_T("Une version t attend. Redemarre pour l appliquer."))
:(_NXUP.err?_T("La derniere verification n a pas abouti. Le client reessaiera tout seul.")
:(ahead?_T("Ce client tourne une version qui n est pas encore publiee.")
:_T("Rien a faire. Le client se met a jour seul a chaque demarrage.")))),
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"11px"}},
i("span",{"data-nx-dot":"1","aria-hidden":"true",style:{width:"6px",height:"6px",
borderRadius:"50%",background:col,flexShrink:0}}),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint}},
_T("verifie")+" "+_NXtr(depuis(_NXUP.vu)))))),
i("div",{style:{position:"relative",display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"14px",
marginTop:"22px",paddingTop:"19px",borderTop:"1px solid "+P.line}},
[["v"+vLocal,_T("Version installee"),ahead?_NXpal.warn:P.txt],
[vRepo!=null?("v"+vRepo):"\u2014",_T("Version publiee"),up?_NXpal.ok:P.txt],
[lt&&lt.sha?_NXUP.short(lt.sha):(vRepo!=null?_T("depot lu"):"\u2014"),_T("Reference"),P.txt],
[String((_NXUP.jrn()||[]).length),_T("Evenements journalises"),P.txt]].map(function(x,k){
return i("div",{key:k},
i("div",{key:"v"+x[0],"data-nx-pop":"1",style:{fontFamily:_NXf.disp,fontSize:"21px",
fontWeight:"800",color:x[2],letterSpacing:"-.04em",lineHeight:1,
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(x[0])),
i("div",{style:{fontSize:"9.5px",fontWeight:"800",letterSpacing:".13em",
textTransform:"uppercase",color:P.faint,marginTop:"6px"}},_NXtr(x[1])));})));}

// ------------------------------------------------------------ ce qui change
function notes(){
if(!up)return null;
return _NXcard(i("div",null,
_NXch(_T("Ce qui change"),
_T("Lu sur le depot, pour que redemarrer soit une decision et non un reflexe."),
_NXUP.notesBusy?i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint}},
_T("lecture…")):null),
_NXUP.notes?i("div",null,_NXUP.notes.map(function(v,k){
return i("div",{key:k,style:{marginBottom:k===_NXUP.notes.length-1?0:"16px",
paddingBottom:k===_NXUP.notes.length-1?0:"14px",
borderBottom:k===_NXUP.notes.length-1?"none":"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"baseline",gap:"9px",flexWrap:"wrap",
marginBottom:"9px"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",fontWeight:"800",
padding:"2px 8px",borderRadius:"999px",
background:_NXteinte(_NXpal.ok,12),color:_NXpal.ok}},_NXtr("v")+_NXtr(v.v)),
i("span",{style:{fontSize:"13px",fontWeight:"700",color:P.txt,
letterSpacing:"-.01em"}},_NXtr(v.titre))),
v.lignes.map(function(l,z){
return l.chef
?i("div",{key:z,style:{fontSize:"11px",fontWeight:"800",letterSpacing:".08em",
textTransform:"uppercase",color:P.faint,margin:"11px 0 6px"}},_NXtr(l.t))
:i("div",{key:z,style:{display:"flex",gap:"9px",alignItems:"flex-start",padding:"3px 0"}},
i("span",{"aria-hidden":"true",style:{flexShrink:0,width:"4px",height:"4px",
borderRadius:"50%",marginTop:"8px",background:P.mute}}),
i("span",{style:{flex:1,minWidth:0,fontSize:"12px",color:P.sub,lineHeight:1.65,
overflowWrap:"anywhere"}},_NXtr(l.t)));}));}))
:i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6}},
_NXUP.notesBusy?_T("Lecture des notes de version…")
:(_NXUP.notesErr?_T("Les notes n ont pas pu etre lues. Le depot reste consultable ci-dessous.")
:_T("Aucune note publiee pour cette version."))),
i("div",{style:{marginTop:"16px"}},
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXUP.relaunchApply();},
style:{padding:"13px 20px",borderRadius:"12px",background:P.acc,color:_NXpal.ink,
fontSize:"13.5px",fontWeight:"800",cursor:"pointer",textAlign:"center",
letterSpacing:"-.01em"}},_T("Redemarrer pour appliquer"))),
_NXUP.msg?i("div",{style:{fontSize:"12px",color:P.dim,marginTop:"12px",
textAlign:"center",lineHeight:1.6}},_NXtr(_NXUP.msg)):null),{mb:12});}

// -------------------------------------------------------------- onglet Etat
function tEtat(){
return i("div",null,
_NXtr(notes()),
ahead?_NXcard(i("div",null,
_NXch(_T("Version locale en avance sur le depot"),null),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.65}},
_T("Ce client tourne une version")+_NXtr(" v")+_NXtr(vLocal)+" "+
_T("qui n a pas encore ete publiee ; le depot est en")+_NXtr(" v")+(vRepo!=null?_NXtr(vRepo):"?")+". "+
_T("Aucune mise a jour ne sera proposee tant que le depot n aura pas depasse cette version."))),{mb:12}):null,
_NXcard(i("div",null,
_NXch(_T("Verification"),
_T("Une verification a lieu au lancement, puis toutes les quarante-cinq minutes."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,
whiteSpace:"nowrap"}},_NXtr(depuis(_NXUP.vu)))),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXbtn(_NXUP.busy?_T("Verification…"):_T("Verifier maintenant"),function(){
if(!_NXUP.busy)_NXUP.check();}),
up?_NXbtn(_T("Relire les notes"),function(){
_NXUP.notes=null;_NXUP.notesErr=false;_NXUP.litNotes();}):null,
_NXbtn(_T("Ouvrir le depot"),function(){_NXUP.openRepo();}))),{mb:12}),
_NXcard(i("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",
gap:"14px",flexWrap:"wrap"}},
i("div",{style:{minWidth:0,flex:1}},
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.txt}},_T("Depot source")),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px",fontFamily:_NXf.mono,
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},
_NXtr("Omega-devj/nexium-client"))),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXUP.openRepo();},
style:{fontSize:"12px",color:P.sub,cursor:"pointer",flexShrink:0,fontWeight:"700"}},
_T("Ouvrir")+" \u2197")),{mb:12}));}

// ------------------------------------------------------------ onglet Journal
function tJournal(){
var L=_NXUP.jrn()||[];
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Journal des mises a jour"),
_T("Les dernieres verifications vues par le client. Il ne quitte pas cette machine."),
L.length?i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint}},
_NXtr(String(L.length))):null),
L.length?i("div",null,L.slice(0,30).map(function(e,k){
var bon=/a jour|Mise a jour|à jour/i.test(e.m||"");
var mal=/injoignable|echec|échec/i.test(e.m||"");
return i("div",{key:k,style:{display:"flex",gap:"11px",padding:"9px 0",
borderTop:k?"1px solid "+P.line:"none",alignItems:"flex-start"}},
i("span",{"aria-hidden":"true",style:{flexShrink:0,width:"5px",height:"5px",
borderRadius:"50%",marginTop:"6px",
background:mal?_NXpal.dangerSoft:(bon?_NXpal.ok:P.mute)}}),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,flexShrink:0,
paddingTop:"1px",minWidth:"42px"}},_NXtr(horodate(e.t))),
i("span",{style:{flex:1,minWidth:0,fontSize:"12px",color:P.sub,lineHeight:1.5,
overflowWrap:"anywhere"}},_NXtr(e.m)));}))
:i("div",{style:{fontSize:"12px",color:P.dim}},
_T("Aucun evenement enregistre pour le moment."))),{mb:12}));}

// --------------------------------------------------------- onglet Reparation
function fichier(nom,texte,libelle,principal){
return i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_NXtr(libelle),
onClick:function(){try{
var d=new TextEncoder().encode(texte);
DiscordNative.fileManager.saveWithDialog(d,nom);
if(_NXUP.toast)_NXUP.toast("Enregistre le fichier dans resources/equicord, puis relance Discord.");
}catch(_){try{DiscordNative.clipboard.copy(nom);
if(_NXUP.toast)_NXUP.toast("Nom du fichier copie : "+nom);}catch(__){}}},
style:{padding:"11px 18px",borderRadius:"11px",cursor:"pointer",
fontSize:"12.5px",fontWeight:principal?"800":"700",
background:principal?P.acc:"transparent",
color:principal?_NXpal.ink:P.sub,
border:principal?"none":"1px solid "+P.line}},_NXtr(libelle));}

function tReparation(){
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Reparation"),
_T("A utiliser si le client se comporte mal, meme sans mise a jour recente.")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,marginBottom:"14px"}},
_T("Le client verifie ses fichiers a chaque demarrage et restaure tout seul la version precedente s il detecte un probleme.")),
i("div",{style:{display:"flex",gap:"11px",alignItems:"flex-start",padding:"13px 14px",
borderRadius:"12px",background:P.inset,border:"1px solid "+P.line,marginBottom:"14px"}},
i("span",{"aria-hidden":"true",style:{flexShrink:0,marginTop:"5px",width:"5px",height:"5px",
borderRadius:"50%",background:P.mute}}),
i("div",{style:{flex:1,minWidth:0,fontSize:"12px",color:P.dim,lineHeight:1.7}},
_T("Chaque bouton enregistre un petit fichier declencheur. Place-le dans "),
i("span",{style:{fontFamily:_NXf.mono,color:P.txt}},_NXtr("resources/equicord")),
_T(", puis relance Discord."))),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap"}},
_NXtr(fichier(".nexium-repair","Nexium: reparation complete au prochain demarrage.\n",
_T("Reparer les fichiers"),true)),
_NXtr(fichier(".nexium-restore","Nexium: retour a la version precedente au prochain demarrage.\n",
_T("Revenir a la version precedente"),false)),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_T("Copier le nom du fichier"),
onClick:function(){try{DiscordNative.clipboard.copy(".nexium-restore");
if(_NXUP.toast)_NXUP.toast("Nom du fichier copie : .nexium-restore");}catch(_){}},
style:{padding:"11px 18px",borderRadius:"11px",border:"1px solid "+P.line,
color:P.sub,fontSize:"12.5px",fontWeight:"700",cursor:"pointer"}},
_T("Copier le nom du fichier")))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Ce que fait chaque bouton"),null),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",
gap:"11px"}},
[[_T("Reparer les fichiers"),
_T("Retelecharge tous les fichiers depuis le depot, meme si la version semble a jour. A essayer en premier.")],
[_T("Revenir a la version precedente"),
_T("Repose la version d avant la derniere mise a jour. Utile si un probleme est apparu juste apres.")]].map(function(x,k){
return i("div",{key:k,style:{padding:"13px 14px",borderRadius:"13px",
background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt,marginBottom:"5px"}},_NXtr(x[0])),
i("div",{style:{fontSize:"11px",color:P.dim,lineHeight:1.65}},_NXtr(x[1])));}))),{mb:12}));}

// ------------------------------------------------------------------ onglets
var TABS=[["etat",_T("État"),"pouls",_NXUP.available()?_T("neuf"):""],["journal",_T("Journal"),"liste",""],["reparation",_T("Réparation"),"reglages",""]];
function tabbar(){return _NXFX.onglets(TABS,tab,function(k){if(tab!==k)setTab(k);},{col:_NXpal.cyan});}

return i(Kr,null,i("div",{style:{maxWidth:"760px",margin:"0 auto",opacity:monte?1:0,
transform:monte?"none":"translateY(6px)",transition:"opacity .32s ease,transform .32s ease"}},
_NXhead(_NXtr("Client Nexium"),_NXtr("Mise a jour"),
_T("Le client recupere la derniere version depuis le depot a chaque demarrage. Aucune manipulation de fichier n est necessaire.")),
_NXtr(hero()),
_NXtr(tabbar()),
tab==="etat"?_NXtr(tEtat()):null,
tab==="journal"?_NXtr(tJournal()):null,
tab==="reparation"?_NXtr(tReparation()):null,
_NXfoot(_NXtr("Mise a jour automatique via le depot GitHub \u00b7 aucune donnee envoyee"))));
}var _NXLY=window._NXLY||(window._NXLY={});
