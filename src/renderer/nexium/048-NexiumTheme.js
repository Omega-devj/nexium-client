function NexiumThemeComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _o0=F.useState(false);var avance=_o0[0];var setAvance=_o0[1];
F.useEffect(function(){
var vivant=true;
var maj=function(){if(vivant)force();};
try{if(window._NXSKIN)_NXSKIN.listeners.push(maj);}catch(_){}
return function(){vivant=false;
try{if(window._NXSKIN)_NXSKIN.listeners=_NXSKIN.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var monte=_NXmounted(F);
var P=_NXpal;
var S=window._NXSKIN;
if(!S)return i("div",null,null);
var cfg=S.cfg;
var st=S.status();
function estPreset(pr){
try{for(var k in pr.c){if(String(cfg[k])!==String(pr.c[k]))return false;}return true;}catch(_){return false;}}
var actif=null;
for(var a0=0;a0<NX_PRESETS.length;a0++)if(estPreset(NX_PRESETS[a0])){actif=NX_PRESETS[a0].k;break;}
function poser(pr){try{
for(var k in pr.c)S.set(k,pr.c[k]);
if(!cfg.on)S.set("on",true);
force();}catch(_){}}
function apercu(){
var clair=cfg.variante==="papier";
var fond=clair?"#f2f3f5":(cfg.variante==="graphite"?"#17171a":"#08080a");
var panneau=clair?"#ffffff":(cfg.variante==="graphite"?"#1e1e22":"#0e0e10");
var texte=clair?"#2e3338":"#e8e8ea";
var doux=clair?"#6d6f78":"#8a8a92";
var acc=cfg.accent==="braise"?"#d97a4a":(cfg.accent==="cendre"?"#9a9aa0":(cfg.accent==="discord"?"#5865f2":"#e8e8ea"));
var rayon=cfg.coins==="net"?"3px":(cfg.coins==="doux"?"8px":"14px");
var police=cfg.police==="editoriale"?"Georgia,serif":(cfg.police==="grotesque"?_NXf.disp:"inherit");
return i("div",{style:{borderRadius:"16px",overflow:"hidden",border:"1px solid "+P.hair,
background:fond,display:"flex",height:"178px",
transition:"background-color .35s ease"}},
i("div",{style:{width:"52px",flexShrink:0,background:panneau,padding:"11px 0",
display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",
transition:"background-color .35s ease"}},
[0,1,2,3].map(function(k){
return i("div",{key:k,style:{width:"30px",height:"30px",borderRadius:k===0?rayon:"50%",
background:k===0?acc:(clair?"#e3e5e8":"#1a1a1d"),
transition:"border-radius .3s ease,background-color .35s ease"}});})),
i("div",{style:{flex:1,minWidth:0,padding:"13px 15px",display:"flex",flexDirection:"column",gap:"11px"}},
i("div",{style:{height:"3px",width:cfg.intensite==="discrete"?"0":"100%",background:acc,
borderRadius:"2px",transition:"width .4s ease"}}),
[["Nexium",true],["Le theme se voit ici, en direct.",false],["Change un reglage, l apercu suit.",false]].map(function(o,k){
return i("div",{key:k,style:{display:"flex",gap:"9px",alignItems:"flex-start"}},
i("div",{style:{width:"22px",height:"22px",borderRadius:rayon,flexShrink:0,
background:clair?"#e3e5e8":"#1a1a1d",transition:"border-radius .3s ease"}}),
i("div",{style:{flex:1,minWidth:0}},
o[1]?i("div",{style:{fontFamily:police,fontSize:"11.5px",fontWeight:"700",color:texte,
marginBottom:"3px",transition:"color .35s ease"}},_NXtr(o[0])):null,
!o[1]?i("div",{style:{fontFamily:police,fontSize:"11px",color:doux,lineHeight:1.5,
borderLeft:cfg.intensite==="totale"?("2px solid "+acc):"none",
paddingLeft:cfg.intensite==="totale"?"7px":"0",
transition:"color .35s ease,padding-left .3s ease"}},_NXtr(o[0])):null));})));}
function puce(lab,on,onClick){
return i("div",{key:lab,className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{padding:"8px 13px",borderRadius:"10px",cursor:"pointer",fontSize:"11.5px",fontWeight:"600",
background:on?P.inset:"transparent",border:"1px solid "+(on?P.txt:P.line),
color:on?P.txt:P.sub}},_NXtr(lab));}
function famille(titre,opts,cle){
return i("div",{style:{paddingTop:"15px"}},
i("div",{style:{fontSize:"10px",fontWeight:"700",letterSpacing:".09em",textTransform:"uppercase",
color:P.dim,marginBottom:"8px"}},_NXtr(titre)),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
opts.map(function(o){return puce(o[1],cfg[cle]===o[0],function(){S.set(cle,o[0]);force();});})));}
function bascule(lab,desc,on,onClick,last){
return i("div",{className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{display:"flex",alignItems:"flex-start",gap:"13px",padding:"13px 0",cursor:"pointer",
borderBottom:last?"none":"1px solid "+P.line}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13.5px",fontWeight:"600",color:on?P.txt:P.sub}},_NXtr(lab)),
desc?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"4px",lineHeight:1.55}},_NXtr(desc)):null),
i("div",{"data-nx-sw":"1","aria-hidden":"true",style:{width:"38px",height:"22px",borderRadius:"11px",flexShrink:0,
marginTop:"1px",background:on?P.txt:"transparent",border:"1px solid "+(on?P.txt:P.faint)}},
i("div",{style:{width:"14px",height:"14px",borderRadius:"50%",margin:"3px",
background:on?_NXpal.ink:P.faint,transform:on?"translateX(16px)":"none"}})));}
return i("div",{"data-nx-panel":"1",style:{marginBottom:"20px"}},
i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",border:"1px solid "+P.hair,
borderRadius:"22px",background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",
padding:"24px",marginBottom:"14px"}},
i("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",
gap:"12px",flexWrap:"wrap",marginBottom:"6px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".18em",textTransform:"uppercase",
color:P.faint}},_T("Apparence Nexium")),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",
color:st.applique?_NXpal.ok:_NXpal.warn}},
st.applique?_T("applique"):_T("non applique"))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"27px",fontWeight:"800",color:P.txt,
letterSpacing:"-.04em",lineHeight:1.12,marginBottom:"9px"}},
actif?(_T("Theme")+" "+_NXtr((function(){for(var z=0;z<NX_PRESETS.length;z++)if(NX_PRESETS[z].k===actif)return NX_PRESETS[z].n;return "";})()))
:_T("Ton theme, sur mesure")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.65,marginBottom:"18px",maxWidth:"440px"}},
_T("Nexium habille Discord par ses variables de couleur, pas par des noms de classes : le theme survit aux mises a jour de Discord.")),
_NXtr(apercu())),
_NXcard(i("div",null,
_NXch(_T("Ambiances"),_T("Cinq combinaisons pretes. Tu peux ensuite retoucher chaque reglage.")),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(168px,1fr))",gap:"10px"}},
NX_PRESETS.map(function(pr){
var on=actif===pr.k&&cfg.on;
return i("div",{key:pr.k,className:"nx-fx","data-nx-tile":"1",role:"button","aria-label":_NXtr(pr.n),
"aria-pressed":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){poser(pr);},
style:{padding:"14px",borderRadius:"15px",cursor:"pointer",
background:on?P.inset:"transparent",border:"1px solid "+(on?P.txt:P.line)}},
i("div",{style:{display:"flex",gap:"4px",marginBottom:"11px"}},
pr.p.map(function(c,k){
return i("div",{key:k,style:{flex:1,height:"26px",background:c,
borderRadius:k===0?"7px 0 0 7px":(k===2?"0 7px 7px 0":"0"),
border:"1px solid "+P.hair,borderLeft:k?"none":("1px solid "+P.hair)}});})),
i("div",{style:{fontSize:"13px",fontWeight:"800",color:on?P.txt:P.sub,
letterSpacing:"-.012em",marginBottom:"4px"}},_NXtr(pr.n)),
i("div",{style:{fontSize:"11px",color:P.dim,lineHeight:1.5}},_NXtr(pr.d)));}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Réglages"),_T("Chaque element se change independamment ; l apercu suit en direct.")),
_NXtr(bascule(_T("Appliquer le theme Nexium"),
_T("Decoche pour retrouver l apparence d origine de Discord, a l identique."),
cfg.on,function(){S.set("on",!cfg.on);force();},!cfg.on)),
cfg.on?_NXtr(famille(_T("Fond"),[["encre",_T("Encre")],["graphite",_T("Graphite")],["papier",_T("Papier")]],"variante")):null,
cfg.on?_NXtr(famille(_T("Accent"),[["ivoire",_T("Ivoire")],["cendre",_T("Cendre")],["braise",_T("Braise")],["discord",_T("Aucun")]],"accent")):null,
cfg.on?_NXtr(famille(_T("Typographie"),[["defaut",_T("Origine")],["grotesque",_T("Grotesque")],["editoriale",_T("Editoriale")]],"police")):null,
cfg.on?_NXtr(famille(_T("Coins"),[["arrondi",_T("Arrondis")],["doux",_T("Doux")],["net",_T("Nets")]],"coins")):null,
cfg.on?_NXtr(famille(_T("Signature"),[["discrete",_T("Discrete")],["affirmee",_T("Affirmee")],["totale",_T("Totale")]],"intensite")):null,
cfg.on?i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.6,paddingTop:"12px"}},
cfg.intensite==="discrete"?_T("Couleurs, typographie et coins seulement.")
:(cfg.intensite==="affirmee"?_T("Ajoute le filet d accent en haut, le liserE des messages et les categories en capitales.")
:_T("Ajoute le sigle NEXIUM dans la barre de titre et un filigrane au fond de la fenetre."))):null,
cfg.on?i("div",{style:{paddingTop:"13px"}},
_NXtr(bascule(_T("Images sobres"),_T("Desature les bannieres pour garder une lecture monochrome."),
cfg.sobre,function(){S.set("sobre",!cfg.sobre);force();},true))):null),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Etat"),_T("Ce que Nexium a reellement pu appliquer."),
_NXbtn(_T("Reverifier"),function(){try{S.probe&&S.probe();S.apply&&S.apply();}catch(_){}force();})),
i("div",{style:{fontSize:"12px",color:st.applique?P.dim:_NXpal.warn,lineHeight:1.65}},
st.applique
?(_T("Le theme est applique.")
+((st.manquants&&st.manquants.length)
?(" "+_T("Elements de Discord introuvables")+" : "+_NXtr(st.manquants.join(", "))+".")
:(" "+_T("Tous les elements vises ont ete trouves."))))
:(_T("Le theme n est pas applique")+" : "+(_NXtr(st.pourquoi)||_NXtr("raison inconnue"))))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Thèmes et CSS d origine"),
_T("Le gestionnaire de themes d Equicord, QuickCSS et les themes en ligne. Rien n a ete retire."),
_NXbtn(avance?_T("Replier"):_T("Deplier"),function(){setAvance(!avance);force();})),
avance?i("div",{"data-nx-fade":"1",style:{marginTop:"8px",paddingTop:"14px",
borderTop:"1px solid "+P.line}},i("div",{id:"nx-themes-origine"},null)):
i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6}},
_T("A deplier si tu veux ajouter un theme externe ou ecrire du CSS."))),{mb:0,_deplie:avance}));
}
function NexiumThemeHeader(){
try{return i(_NXsafe(NexiumThemeComp,"Apparence Nexium"),null);}catch(_){return null;}}

function NexiumBgPicker(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){_NXBG.listeners.push(force);return function(){var k=_NXBG.listeners.indexOf(force);if(k>=0)_NXBG.listeners.splice(k,1);};},[]);
var P=_NXpal;
var cur=(_NXBG.cfg.on&&_NXBG.cfg.color)?_NXBG.cfg.color:null;
var prev=cur?_NXBG.palette(cur):null;
return i("div",{style:{marginTop:"20px",marginBottom:"24px",borderRadius:"16px",border:"1px solid "+P.line,background:P.panel,padding:"20px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",textTransform:"uppercase",color:P.faint,marginBottom:"5px"}},_NXtr("Nexium")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"17px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em",marginBottom:"5px"}},_T("Couleur des paramètres")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.55,marginBottom:"16px"}},_T("Change le fond des pages de paramètres. Les textes s'adaptent automatiquement pour rester lisibles.")),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"9px",marginBottom:"14px"}},
_NXBG.SWATCHES.map(function(s,k){
var on=(s.v===null)?!cur:(cur===s.v);
var bg=s.v||_NXpal.edge;
var tick=s.v?_NXBG.readable(s.v):P.txt;
return i("div",{key:k,className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
title:_NXtr(s.n),
onClick:function(){_NXBG.set(s.v);force();},
style:{width:"46px",height:"46px",borderRadius:"12px",cursor:"pointer",position:"relative",
background:s.v?bg:"linear-gradient(135deg,#2b2d31 50%,#e8eaed 50%)",
border:"2px solid "+(on?P.txt:P.line),
boxShadow:on?("0 0 0 3px "+P.hair):"none",
display:"flex",alignItems:"center",justifyContent:"center"}},
on?i("span",{style:{color:s.v?tick:"#888",fontSize:"18px",fontWeight:"800",lineHeight:1}},"\u2713"):null);})),
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",flexWrap:"wrap"}},
i("label",{style:{display:"flex",alignItems:"center",gap:"9px",cursor:"pointer"}},
i("input",{type:"color",value:cur||"#1e2124",
onChange:function(e){try{_NXBG.set(e.target.value);force();}catch(_){}},
style:{width:"38px",height:"38px",border:"1px solid "+P.line,borderRadius:"10px",background:"transparent",cursor:"pointer",padding:"2px"}}),
i("span",{style:{fontSize:"12.5px",color:P.sub,fontWeight:"600"}},_T("Couleur personnalisée"))),
cur?i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXBG.set(null);force();},
style:{padding:"9px 15px",borderRadius:"10px",border:"1px solid "+P.line,color:P.sub,fontSize:"12px",fontWeight:"700",cursor:"pointer"}},_T("Rétablir")):null,
cur?i("span",{style:{fontSize:"11px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(cur.toUpperCase())):null),
prev?i("div",{style:{marginTop:"16px",padding:"14px 16px",borderRadius:"12px",background:cur,border:"1px solid "+prev.line}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".14em",textTransform:"uppercase",color:prev.faint,marginBottom:"6px"}},_T("Aperçu")),
i("div",{style:{fontSize:"15px",fontWeight:"800",color:prev.txt,marginBottom:"3px"}},_T("Titre de section")),
i("div",{style:{fontSize:"12.5px",color:prev.sub,lineHeight:1.5}},_T("Texte de description, lisible quelle que soit la couleur choisie.")),
i("div",{style:{marginTop:"9px",display:"flex",gap:"7px",alignItems:"center"}},
i("div",{style:{padding:"6px 12px",borderRadius:"8px",background:prev.acc,color:prev.light?"#fff":_NXpal.ink,fontSize:"11.5px",fontWeight:"800"}},_T("Bouton")),
i("div",{style:{padding:"6px 12px",borderRadius:"8px",border:"1px solid "+prev.line,color:prev.sub,fontSize:"11.5px",fontWeight:"700"}},_T("Secondaire")),
i("span",{style:{fontSize:"11px",color:prev.dim}},_T("Contraste")+" "+_NXtr(_NXBG.contrast(cur,prev.txt).toFixed(1))+":1"))):null);
}
