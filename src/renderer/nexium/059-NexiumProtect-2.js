function NexiumProtectComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("tableau");var tab=_t0[0];var setTab=_t0[1];
var _fa=F.useState("tout");var fam=_fa[0];var setFam=_fa[1];
var _cq=F.useState("");var q=_cq[0];var setQ=_cq[1];
var _ck=F.useState("");var chk=_ck[0];var setChk=_ck[1];
var _cs=F.useState(null);var res=_cs[0];var setRes=_cs[1];
var _cb=F.useState(false);var busy=_cb[0];var setBusy=_cb[1];
var _sx=F.useState(null);var sbx=_sx[0];var setSbx=_sx[1];
var _sb=F.useState(false);var sbxBusy=_sb[0];var setSbxBusy=_sb[1];
var _fl=F.useState("");var flt=_fl[0];var setFlt=_fl[1];
F.useEffect(function(){
var vivant=true,att=null;
var maj=function(){try{if(!vivant||att)return;att=setTimeout(function(){att=null;if(vivant)force();},200);}catch(_){}};
var L=[window._NXPR,window._NXV,window._NXGD,window._NXPRV];
for(var a=0;a<L.length;a++){try{if(L[a]&&L[a].listeners)L[a].listeners.push(maj);}catch(_){}}
return function(){vivant=false;
try{if(att)clearTimeout(att);}catch(_){}
for(var b=0;b<L.length;b++){try{if(L[b]&&L[b].listeners)L[b].listeners=L[b].listeners.filter(function(f){return f!==maj;});}catch(_){}}};},[]);
var monte=_NXmounted(F);
var P=_NXpal;
var PR=window._NXPR;var cfg=PR.cfg;var st=PR.stats||{};
var V=window._NXV||null;var G=window._NXGD||null;var PV=window._NXPRV||null;
var X=window._NXPROT;
var an=_NXFX.anime();
// A chaque ouverture : ce qui est verrouille et actif redescend.
try{if(PR.reconcilie)PR.reconcilie();}catch(_){}

var B=X.bilan();
var nSortie=G?G.total():0;
var nRetenues=((st.parType||{}).delai)||0;
var cScore=_NXcount(F,B.pct,1100);
var cBloc=_NXcount(F,(st.blocked)||0);
var cSortie=_NXcount(F,nSortie);
var cScan=_NXcount(F,(st.scanned)||0);
var cRet=_NXcount(F,nRetenues);
var scol=B.pct>=85?P.ok:(B.pct>=55?P.warn:P.danger);
var titreNiveau=B.pct>=85?_T("Tu es bien protege"):(B.pct>=55?_T("Protection partielle"):_T("Protection faible"));
var COUL={info:P.info,warn:P.warn,cyan:P.cyan,ok:P.ok,mauve:P.mauve,rose:P.rose};
function couleurFam(f){for(var a=0;a<_NXPROTFAM.length;a++)if(_NXPROTFAM[a][0]===f)return COUL[_NXPROTFAM[a][3]]||P.info;return P.info;}
function versOffres(){try{if(window._NXCP)_NXCP.ouvrir("equicord_abo","Nexium Abonnement");}catch(_){}}
function heure(t){try{var d=new Date(t);return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);}catch(_){return "";}}

var CSS=".nxp-anim .nxp-entre{animation:nxpEntre .55s cubic-bezier(.22,1,.36,1) both}"+
"@keyframes nxpEntre{from{opacity:0;transform:translate3d(0,16px,0) scale(.985)}to{opacity:1;transform:none}}"+
".nxp-carte{transition:transform .28s cubic-bezier(.22,1,.36,1),border-color .28s ease,background .28s ease,box-shadow .28s ease}"+
".nxp-anim .nxp-carte:hover{transform:translate3d(0,-3px,0)}"+
".nxp-anim .nxp-balai{animation:nxpBalai 16s linear infinite}"+
"@keyframes nxpBalai{to{transform:rotate(360deg)}}"+
".nxp-anim .nxp-onde{animation:nxpOnde 7s cubic-bezier(.2,.6,.3,1) infinite}"+
"@keyframes nxpOnde{0%{transform:scale(.62);opacity:.6}100%{transform:scale(1.32);opacity:0}}"+
".nxp-anim .nxp-trace{animation:nxpTrace 1.5s cubic-bezier(.65,0,.35,1) both}"+
".nxp-anim .nxp-coche{animation:nxpTrace .7s cubic-bezier(.65,0,.35,1) .95s both}"+
"@keyframes nxpTrace{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}"+
".nxp-anim .nxp-flotte{animation:nxpFlotte 9s ease-in-out infinite}"+
"@keyframes nxpFlotte{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-4px,0)}}"+
".nxp-anim .nxp-vif{animation:nxpVif 4.2s ease-in-out infinite}"+
"@keyframes nxpVif{0%,100%{opacity:.35}50%{opacity:1}}"+
".nxp-anim .nxp-lueur{animation:nxpLueur 10s ease-in-out infinite}"+
"@keyframes nxpLueur{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}"+
".nxp-anim .nxp-reflet{animation:nxpReflet 9s ease-in-out infinite}"+
"@keyframes nxpReflet{0%{transform:translate3d(-120%,0,0)}35%,100%{transform:translate3d(260%,0,0)}}"+
".nxp-bille{transition:transform .32s cubic-bezier(.34,1.56,.64,1),background .25s ease}"+
".nxp-rail{transition:background .25s ease,border-color .25s ease,box-shadow .25s ease}"+
".nxp-jauge{transition:width 1s cubic-bezier(.22,1,.36,1)}"+
".nxp-puce{transition:background .2s ease,border-color .2s ease,color .2s ease}"+
"@media (prefers-reduced-motion:reduce){.nxp-anim *{animation:none!important}}";

// ------------------------------------------------------------ les briques
function interrupteur(on,col,partiel){
return i("div",{"aria-hidden":"true",className:"nxp-rail",style:{flexShrink:0,width:"40px",height:"23px",borderRadius:"99px",position:"relative",
background:on?col:(partiel?_NXteinte(col,30):"transparent"),border:"1px solid "+(on||partiel?col:P.faint),
boxShadow:on?("0 0 16px "+_NXteinte(col,35)):"none"}},
i("div",{className:"nxp-bille",style:{position:"absolute",top:"3px",left:"3px",width:"15px",height:"15px",borderRadius:"50%",
background:on?P.ink:(partiel?col:P.faint),transform:on?"translateX(17px)":(partiel?"translateX(8px)":"none")}}));}
function chip(txt,col,icone){
return i("span",{style:{display:"inline-flex",alignItems:"center",gap:"5px",padding:"3px 8px",borderRadius:"99px",
fontSize:"10px",fontWeight:"800",letterSpacing:".04em",color:col,background:_NXteinte(col,10),border:"1px solid "+_NXteinte(col,26),whiteSpace:"nowrap"}},
icone?_NXFX.svg(icone,11):null,_NXtr(txt));}
function bouton(t,onClick,o){o=o||{};
return _NXFX.bouton({t:_NXtr(t),onClick:onClick,petit:!o.grand,plein:!!o.plein,creux:!!o.creux,col:o.col||P.pale,icone:o.icone,off:!!o.off});}
function titreSection(icone,col,titre,sous,droite){
return i("div",{style:{display:"flex",alignItems:"center",gap:"13px",margin:"6px 2px 14px"}},
i("div",{style:{width:"38px",height:"38px",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
background:"linear-gradient(145deg,"+_NXteinte(col,22)+","+_NXteinte(col,6)+")",border:"1px solid "+_NXteinte(col,30),color:col}},_NXFX.svg(icone,19)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"17px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em"}},_NXtr(titre)),
sous?i("div",{style:{fontSize:"12px",color:P.dim,marginTop:"2px",lineHeight:1.5}},_NXtr(sous)):null),
_NXtr(droite)||null);}
function vide(icone,titre,texte){return _NXFX.vide({icone:icone,titre:_NXtr(titre),texte:_NXtr(texte)});}

// ------------------------------------------------------------ l embleme
function embleme(col){
var z=168;
return i("div",{className:"nxp-flotte",style:{position:"relative",width:z+"px",height:z+"px",flexShrink:0}},
i("div",{className:"nxp-lueur","aria-hidden":"true",style:{position:"absolute",inset:"-18px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(col,26)+",transparent 66%)"}}),
[0,1].map(function(k){return i("div",{key:k,className:"nxp-onde","aria-hidden":"true",style:{position:"absolute",inset:"8px",borderRadius:"50%",
border:"1px solid "+_NXteinte(col,45),animationDelay:(k*3.5)+"s"}});}),
i("div",{"aria-hidden":"true",style:{position:"absolute",inset:"16px",borderRadius:"50%",overflow:"hidden",
border:"1px solid "+_NXteinte(col,22),background:_NXteinte(P.bg,60)}},
i("div",{className:"nxp-balai",style:{position:"absolute",inset:0,borderRadius:"50%",
background:"conic-gradient(from 0deg,transparent 0 72%,"+_NXteinte(col,8)+" 86%,"+_NXteinte(col,30)+" 100%)"}}),
i("div",{style:{position:"absolute",inset:"22%",borderRadius:"50%",border:"1px dashed "+_NXteinte(col,20)}})),
i("svg",{viewBox:"0 0 120 120",width:z,height:z,"aria-hidden":"true",style:{position:"absolute",inset:0}},
i("path",{d:"M60 22 L90 34 V58 C90 78 77 92 60 99 C43 92 30 78 30 58 V34 Z",fill:_NXteinte(col,12),stroke:"none"}),
i("path",{className:"nxp-trace",pathLength:100,d:"M60 22 L90 34 V58 C90 78 77 92 60 99 C43 92 30 78 30 58 V34 Z",fill:"none",
stroke:col,strokeWidth:2.6,strokeLinejoin:"round",strokeDasharray:100,strokeDashoffset:0}),
i("path",{className:"nxp-coche",pathLength:100,d:"M47 60 L56 69 L74 50",fill:"none",stroke:col,strokeWidth:3.4,
strokeLinecap:"round",strokeLinejoin:"round",strokeDasharray:100,strokeDashoffset:0})));}

// ------------------------------------------------------------ le tableau
function lancerTests(){try{if(!PV||PV.encours)return;PV.lance("protect",function(){force();});force();}catch(_){}}
function resumeTests(){
if(!PV)return null;
var c=PV.compte("protect");
if(PV.encours){
var pct=PV.total?Math.round(PV.fini*100/PV.total):0;
return i("div",{style:{marginTop:"16px"}},
i("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11.5px",color:P.sub,marginBottom:"7px"}},
i("span",null,_T("Test en cours, pour de vrai")),i("span",{style:{fontFamily:_NXf.mono}},_NXtr(PV.fini)+" / "+_NXtr(PV.total))),
i("div",{style:{height:"6px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{className:"nxp-jauge",style:{height:"100%",width:pct+"%",borderRadius:"99px",background:"linear-gradient(90deg,"+_NXteinte(scol,50)+","+scol+")"}})));}
var fait=c.agit+c.echec+c.coupe+c.na;
if(!fait)return i("div",{style:{marginTop:"14px",fontSize:"12px",color:P.dim,lineHeight:1.6}},
_T("Aucun test lance depuis l ouverture. Un test essaie chaque protection sur un vrai piege, sans rien envoyer."));
return i("div",{style:{marginTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}},
_NXtr(chip(c.agit+" "+_T("prouvee(s)"),P.ok,"check")),
c.echec?_NXtr(chip(c.echec+" "+_T("en echec"),P.danger,"croix")):null,
c.coupe?_NXtr(chip(c.coupe+" "+_T("coupee(s)"),P.warn,"pause")):null,
c.na?_NXtr(chip(c.na+" "+_T("sans objet"),P.dim,null)):null);}
function hero(){
return i("div",{className:"nxp-entre",style:{position:"relative",overflow:"hidden",borderRadius:"28px",padding:"28px",marginBottom:"16px",
border:"1px solid "+_NXteinte(scol,28),background:"linear-gradient(140deg,"+_NXteinte(scol,10)+" 0%,"+P.panel+" 45%,"+P.bg+" 100%)"}},
i("div",{"aria-hidden":"true",style:{position:"absolute",right:"-120px",top:"-140px",width:"380px",height:"380px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(scol,14)+",transparent 68%)",pointerEvents:"none"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"28px",flexWrap:"wrap"}},
_NXtr(embleme(scol)),
i("div",{style:{flex:"1 1 300px",minWidth:"260px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}},
i("span",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".2em",textTransform:"uppercase",color:P.faint}},_NXtr("Nexium Protect")),
i("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"10.5px",color:P.ok,fontWeight:"700"}},
i("span",{className:"nxp-vif",style:{width:"6px",height:"6px",borderRadius:"50%",background:P.ok}}),_T("en veille"))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"31px",fontWeight:"800",color:P.txt,letterSpacing:"-.035em",lineHeight:1.08,marginTop:"10px"}},_NXtr(titreNiveau)),
i("div",{style:{fontSize:"13px",color:P.sub,marginTop:"8px",lineHeight:1.6}},
(_NXtr(Math.round(B.on))+" "+_T("protection(s) active(s) sur")+" "+_NXtr(B.acc))+
(B.ferme?(" · "+_NXtr(B.ferme)+" "+_T("reservee(s) aux abonnes")):"")+
(B.pause?(" · "+_NXtr(B.pause)+" "+_T("en pause")):"")),
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"14px",marginTop:"18px",flexWrap:"wrap"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"58px",fontWeight:"800",color:scol,letterSpacing:"-.06em",lineHeight:.9,fontVariantNumeric:"tabular-nums"}},
_NXtr(cScore),i("span",{style:{fontSize:"26px",marginLeft:"2px"}},"%")),
i("div",{style:{flex:1,minWidth:"150px",paddingBottom:"8px"}},
i("div",{style:{height:"8px",borderRadius:"99px",background:P.line,overflow:"hidden",position:"relative"}},
i("div",{className:"nxp-jauge",style:{height:"100%",width:(monte?B.pct:0)+"%",borderRadius:"99px",position:"relative",overflow:"hidden",
background:"linear-gradient(90deg,"+_NXteinte(scol,45)+","+scol+")"}},
i("div",{className:"nxp-reflet",style:{position:"absolute",top:0,bottom:0,width:"40%",
background:"linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)"}}))))),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"18px"}},
PV?_NXtr(bouton(PV.encours?_T("Test en cours..."):_T("Tout tester, pour de vrai"),lancerTests,{plein:true,col:scol,icone:"bouclierOk",off:PV.encours})):null,
_NXtr(bouton(_T("Verifier un lien"),function(){setTab("analyser");},{creux:true,icone:"loupe",col:P.sub})),
B.acc>B.on?_NXtr(bouton(_T("Tout activer"),function(){toutActiver();force();},{creux:true,icone:"eclair",col:P.sub})):null),
_NXtr(resumeTests()))));}
function toutActiver(){try{
for(var a=0;a<_NXPROTCAT.length;a++){var it=_NXPROTCAT[a],e=X.etat(it);
if(e.absent||e.toutFerme||e.plein)continue;
X.bascule(it);}
if(!X.lit("pr","scanLinks"))X.ecrit("pr","scanLinks",true);}catch(_){}}
function familles(){
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"10px",marginBottom:"16px"}},
_NXPROTFAM.map(function(f,k){
var col=COUL[f[3]]||P.info,on=0,tot=0,a;
for(a=0;a<_NXPROTCAT.length;a++){var it=_NXPROTCAT[a];if(it.f!==f[0])continue;
var e=X.etat(it);if(e.absent||e.toutFerme)continue;tot++;if(e.plein&&!e.pause)on++;}
var pct=tot?Math.round(on*100/tot):0;
return i("div",{key:f[0],className:"nxp-carte nxp-entre nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_T(f[1])+" "+_NXtr(on)+"/"+_NXtr(tot),
onClick:function(){setFam(f[0]);setTab("protections");},
style:{cursor:"pointer",padding:"15px 16px",borderRadius:"18px",background:P.inset,border:"1px solid "+P.line,animationDelay:(80+k*55)+"ms"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},
i("div",{style:{color:col,display:"flex"}},_NXFX.svg(f[2],17)),
i("div",{style:{flex:1,fontSize:"13px",fontWeight:"800",color:P.txt}},_T(f[1])),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11.5px",color:on===tot&&tot?col:P.sub}},_NXtr(on)+"/"+_NXtr(tot))),
i("div",{style:{height:"5px",borderRadius:"99px",background:P.line,overflow:"hidden",marginTop:"12px"}},
i("div",{className:"nxp-jauge",style:{height:"100%",width:(monte?pct:0)+"%",borderRadius:"99px",
background:"linear-gradient(90deg,"+_NXteinte(col,40)+","+col+")",transitionDelay:(k*90)+"ms"}})));}));}
function compteurs(){
var T=[[cBloc,_T("Menaces bloquees"),P.danger,"bouclier"],[cSortie,_T("Sorties arretees"),P.ok,"televerse"],
[cScan,_T("Liens analyses"),P.info,"loupe"],[cRet,_T("Actions graves annulees"),P.mauve,"horloge"]];
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"10px",marginBottom:"16px"}},
T.map(function(x,k){return i("div",{key:k,className:"nxp-carte nxp-entre",style:{position:"relative",overflow:"hidden",padding:"16px",borderRadius:"18px",
background:"linear-gradient(160deg,"+_NXteinte(x[2],8)+","+P.inset+")",border:"1px solid "+_NXteinte(x[2],20),animationDelay:(200+k*60)+"ms"}},
i("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:P.dim}},_NXtr(x[1])),
i("div",{style:{color:_NXteinte(x[2],70),display:"flex"}},_NXFX.svg(x[3],15))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"28px",fontWeight:"800",color:x[0]?x[2]:P.txt,marginTop:"8px",letterSpacing:"-.04em",fontVariantNumeric:"tabular-nums"}},_NXn(x[0])));}));}
function genre(k){
var L={grabber:"Logger d IP",phish:"Hameconnage",punycode:"Domaine trompeur",scam:"Arnaque",oauth:"Autorisation d application",
scheme:"Lien executable",bidi:"Texte trompeur",rawip:"Adresse IP brute",code:"Demande de code",download:"Telechargement",
short:"Lien raccourci",secret:"Secret expose",selfxss:"Console",file:"Fichier",gift:"Faux cadeau",identity:"Identite",
media:"Camera ou micro",masked:"Lien masque",invite:"Invitation",guild:"Serveur piege",account:"Compte recent",
dmlink:"Lien d un inconnu",crypto:"Portefeuille",clipper:"Portefeuille detourne",leak:"Fuite de webhook",raid:"Campagne",
nom:"Nom de fichier truque",qr:"QR code",unicode:"Caracteres invisibles",exif:"Donnees de photo",exfil:"Exfiltration",
sandbox:"Bac a sable",suspect:"Domaine suspect",lecture:"Lecture",delai:"Action grave annulee"};
return _T(L[k]||k);}
function activite(){
var R=(st.recent||[]).slice(0,6);
return _NXcard(i("div",null,
_NXch(_T("Ce que Nexium a arrete"),_T("Les derniers evenements, du plus recent au plus ancien."),
R.length?bouton(_T("Tout le journal"),function(){setTab("journal");},{creux:true,col:P.sub}):null),
!R.length?_NXtr(vide("bouclierOk",_T("Rien a signaler"),_T("Aucune menace n a encore ete arretee. Les protections veillent en silence."))):
i("div",{style:{position:"relative",paddingLeft:"20px"}},
i("div",{"aria-hidden":"true",style:{position:"absolute",left:"5px",top:"8px",bottom:"8px",width:"1px",background:P.hair}}),
R.map(function(r,k){return i("div",{key:k,className:"nxp-entre",style:{position:"relative",padding:"9px 0",animationDelay:(k*60)+"ms"}},
i("span",{"aria-hidden":"true",style:{position:"absolute",left:"-19px",top:"14px",width:"9px",height:"9px",borderRadius:"50%",
background:k===0?P.danger:P.bg,border:"2px solid "+(k===0?P.danger:P.faint)}}),
i("div",{style:{display:"flex",alignItems:"baseline",gap:"10px"}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_NXtr(genre(r.k))),
i("div",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono,marginLeft:"auto"}},_NXtr(heure(r.t)))),
r.d?i("div",{style:{fontSize:"11.5px",color:P.dim,fontFamily:_NXf.mono,marginTop:"3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(String(r.d))):null);}))),{mb:12});}
function reglagesGlobaux(){
var profil=cfg.profile||"equilibre";
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"12px",marginBottom:"12px"}},
_NXcard(i("div",null,
_NXch(_T("Profil"),_T("Un reglage global, a ajuster ensuite carte par carte.")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"7px"}},
[["strict",_T("Strict"),_T("Bloque au moindre doute")],["equilibre",_T("Equilibre"),_T("Recommande")],["minimal",_T("Minimal"),_T("Le strict necessaire")]].map(function(p){
var on=profil===p[0];
return i("div",{key:p[0],className:"nx-fx nxp-puce",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-pressed":on?"true":"false",
onClick:function(){PR.applyProfile(p[0]);force();},
style:{display:"flex",alignItems:"center",gap:"11px",padding:"11px 13px",borderRadius:"13px",cursor:"pointer",
background:on?_NXteinte(scol,9):"transparent",border:"1px solid "+(on?_NXteinte(scol,40):P.line)}},
i("span",{style:{width:"14px",height:"14px",borderRadius:"50%",flexShrink:0,border:"2px solid "+(on?scol:P.faint),
boxShadow:on?("inset 0 0 0 3px "+P.bg):"none",background:on?scol:"transparent"}}),
i("div",{style:{flex:1,fontSize:"12.5px",fontWeight:"800",color:on?P.txt:P.sub}},_NXtr(p[1])),
i("div",{style:{fontSize:"11px",color:P.dim}},_NXtr(p[2])));}))),{mb:0}),
G?_NXcard(i("div",null,
_NXch(_T("Posture du pare-feu"),_T("Face a un serveur que Nexium ne connait pas.")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"7px"}},
[["ouvert",_T("Ouvert"),_T("Journalise sans rien bloquer")],["guide",_T("Guide"),_T("Bloque ce qui emporte des donnees")],["verrouille",_T("Verrouille"),_T("Bloque tout hote non approuve")]].map(function(m){
var on=G.cfg.egressMode===m[0];
return i("div",{key:m[0],className:"nx-fx nxp-puce",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-pressed":on?"true":"false",
onClick:function(){G.set("egressMode",m[0]);force();},
style:{display:"flex",alignItems:"center",gap:"11px",padding:"11px 13px",borderRadius:"13px",cursor:"pointer",
background:on?_NXteinte(P.ok,9):"transparent",border:"1px solid "+(on?_NXteinte(P.ok,40):P.line)}},
i("span",{style:{width:"14px",height:"14px",borderRadius:"50%",flexShrink:0,border:"2px solid "+(on?P.ok:P.faint),
boxShadow:on?("inset 0 0 0 3px "+P.bg):"none",background:on?P.ok:"transparent"}}),
i("div",{style:{flex:1,fontSize:"12.5px",fontWeight:"800",color:on?P.txt:P.sub}},_NXtr(m[1])),
i("div",{style:{fontSize:"11px",color:P.dim}},_NXtr(m[2])));}))),{mb:0}):null);}
function promo(){
if(!B.ferme)return null;
return i("div",{className:"nxp-entre",style:{position:"relative",overflow:"hidden",borderRadius:"20px",padding:"18px 20px",marginBottom:"12px",
background:"linear-gradient(120deg,"+_NXteinte(P.mauve,14)+","+_NXteinte(P.info,8)+" 60%,"+P.inset+")",border:"1px solid "+_NXteinte(P.mauve,30)}},
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}},
i("div",{style:{color:P.mauve,display:"flex"}},_NXFX.svg("etincelle",24)),
i("div",{style:{flex:"1 1 240px"}},
i("div",{style:{fontSize:"14px",fontWeight:"800",color:P.txt}},_NXtr(B.ferme)+" "+_T("protection(s) de plus avec Nexium Security")),
i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"3px",lineHeight:1.55}},
_T("Pare-feu sortant, gardien des webhooks, liens executables, autorisations d application : ce qui arrete les voleurs de compte les plus aguerris."))),
_NXtr(bouton(_T("Voir les offres"),versOffres,{plein:true,col:P.mauve,icone:"fleche"}))));}
function vueTableau(){
return i("div",null,_NXtr(hero()),_NXtr(familles()),_NXtr(compteurs()),_NXtr(promo()),_NXtr(activite()),_NXtr(reglagesGlobaux()));}

// ------------------------------------------------------------ les protections
function correspond(it){var s=(q||"").trim().toLowerCase();
if(fam!=="tout"&&it.f!==fam)return false;
if(!s)return true;
return (_T(it.t)+" "+_T(it.d)+" "+it.t+" "+it.id).toLowerCase().indexOf(s)>=0;}
function carte(it,idx){
var e=X.etat(it);
if(e.absent)return null;
var col=couleurFam(it.f);
var on=e.plein&&!e.pause;
var pv=X.preuve(it);
var n=X.compte(it);
var clic=function(){if(e.toutFerme){versOffres();return;}X.bascule(it);force();};
return i("div",{key:it.id,className:"nxp-carte nxp-entre",
style:{position:"relative",overflow:"hidden",borderRadius:"18px",padding:"16px",animationDelay:(Math.min(idx,14)*38)+"ms",
background:on?("linear-gradient(155deg,"+_NXteinte(col,11)+","+P.inset+" 70%)"):P.inset,
border:"1px solid "+(e.toutFerme?_NXteinte(P.warn,24):(on?_NXteinte(col,38):(e.pause?_NXteinte(P.warn,34):P.line))),
boxShadow:on?("0 12px 32px "+_NXteinte(col,7)):"none",opacity:e.toutFerme?.8:1}},
on?i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,top:"16px",bottom:"16px",width:"3px",borderRadius:"0 3px 3px 0",background:col}}):null,
i("div",{className:"nx-fx",role:"switch",tabIndex:0,onKeyDown:_NXkey,onClick:clic,
"aria-checked":on?"true":"false","aria-label":_T(it.t),
style:{display:"flex",alignItems:"flex-start",gap:"12px",cursor:"pointer"}},
i("div",{style:{width:"36px",height:"36px",borderRadius:"11px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
background:on?_NXteinte(col,16):"transparent",border:"1px solid "+(on?_NXteinte(col,34):P.line),color:on?col:P.faint,
transition:"all .25s ease"}},_NXFX.svg(it.ic,18)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"7px",flexWrap:"wrap"}},
i("div",{style:{fontSize:"13.5px",fontWeight:"800",color:on?P.txt:P.pale,letterSpacing:"-.012em"}},_T(it.t)),
it.neuf?_NXneuf():null),
i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.6,marginTop:"5px"}},_T(it.d))),
e.toutFerme?i("div",{style:{flexShrink:0,color:P.warn,display:"flex",marginTop:"2px"}},_NXFX.svg("cadenas",17)):_NXtr(interrupteur(on,col,e.partiel&&!e.pause))),
(it.opt&&on)?i("div",{style:{marginTop:"12px",marginLeft:"48px"}},
it.opt.map(function(o){var so=X.lit(o[0],o[1]);
return i("div",{key:o[1],className:"nx-fx",role:"switch",tabIndex:0,onKeyDown:_NXkey,"aria-checked":so?"true":"false",
onClick:function(ev){try{ev.stopPropagation();}catch(_){}X.ecrit(o[0],o[1],!so);force();},
style:{display:"flex",alignItems:"center",gap:"10px",padding:"9px 11px",borderRadius:"11px",cursor:"pointer",
background:_NXteinte(P.bg,50),border:"1px solid "+P.line}},
i("div",{style:{flex:1,fontSize:"11.5px",color:so?P.pale:P.sub}},_T(o[2])),
_NXtr(interrupteur(so,col,false)));})):null,
e.pause?i("div",{style:{marginTop:"12px",marginLeft:"48px",display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap",
padding:"9px 11px",borderRadius:"11px",background:_NXteinte(P.warn,8),border:"1px solid "+_NXteinte(P.warn,26)}},
i("div",{style:{flex:1,minWidth:"150px",fontSize:"11.5px",color:P.warn,lineHeight:1.5}},_T("En pause : elle s appuie sur l analyse des liens, qui est coupee.")),
_NXtr(bouton(_T("Rallumer l analyse"),function(){X.ecrit("pr","scanLinks",true);force();},{col:P.warn}))):null,
i("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",marginTop:"12px",marginLeft:"48px"}},
e.toutFerme?i("span",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:versOffres,style:{cursor:"pointer"}},
_NXtr(chip(_T("Abonnement Security"),P.warn,"cadenas"))):null,
(!e.toutFerme&&e.ferme)?_NXtr(chip(_T("en partie reservee aux abonnes"),P.warn,"cadenas")):null,
(e.partiel&&!e.pause)?_NXtr(chip(_T("en partie active"),P.sub,null)):null,
pv&&pv.etat==="prouvee"?_NXtr(chip(_T("prouvee"),P.ok,"check")):null,
pv&&pv.etat==="echec"?_NXtr(chip(_T("echec au test"),P.danger,"croix")):null,
pv&&pv.etat==="partielle"?_NXtr(chip(_T("en partie prouvee"),P.warn,null)):null,
pv&&pv.etat==="jamais"?_NXtr(chip(_T("testable"),P.dim,"bouclierOk")):null,
(n!==null&&n>0)?_NXtr(chip(_NXn(n)+" "+_T(it.cl||"intervention(s)"),col,"pouls")):null,
it.socle?_NXtr(chip(_T("socle"),P.info,"couches")):null,
it.posture&&G?_NXtr(chip(_T("posture")+" : "+_T(G.cfg.egressMode==="verrouille"?"Verrouille":(G.cfg.egressMode==="ouvert"?"Ouvert":"Guide")),P.sub,null)):null));}
function vueProtections(){
var L=_NXPROTCAT.filter(correspond);
var chips=[["tout",_T("Tout"),"grille",P.pale]].concat(_NXPROTFAM.map(function(f){return [f[0],_T(f[1]),f[2],COUL[f[3]]];}));
var idx=0;
return i("div",null,
i("div",{style:{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap",marginBottom:"12px"}},
i("div",{style:{position:"relative",flex:"1 1 240px"}},
i("div",{style:{position:"absolute",left:"13px",top:"11px",color:P.faint,display:"flex",pointerEvents:"none"}},_NXFX.svg("loupe",15)),
i("input",{value:q,onChange:function(ev){setQ(ev.target.value);},placeholder:_T("Chercher une protection"),spellCheck:false,
"aria-label":_T("Chercher une protection"),
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"13px",
padding:"11px 13px 11px 36px",color:P.txt,fontSize:"12.5px",outline:"none"}})),
B.acc>B.on?_NXtr(bouton(_T("Tout activer"),function(){toutActiver();force();},{icone:"eclair",col:P.ok})):null,
PV?_NXtr(bouton(PV.encours?(_T("Test")+" "+PV.fini+"/"+PV.total):_T("Tout tester"),lancerTests,{icone:"bouclierOk",creux:true,col:P.sub,off:PV.encours})):null),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"18px"}},
chips.map(function(c){var on=fam===c[0];
var nb=0;for(var a=0;a<_NXPROTCAT.length;a++)if(c[0]==="tout"||_NXPROTCAT[a].f===c[0])nb++;
return i("div",{key:c[0],className:"nx-fx nxp-puce",role:"tab",tabIndex:0,onKeyDown:_NXkey,"aria-selected":on?"true":"false",
onClick:function(){setFam(c[0]);},
style:{display:"inline-flex",alignItems:"center",gap:"7px",padding:"7px 12px",borderRadius:"99px",cursor:"pointer",
fontSize:"12px",fontWeight:"700",color:on?P.txt:P.sub,
background:on?_NXteinte(c[3],14):"transparent",border:"1px solid "+(on?_NXteinte(c[3],45):P.line)}},
i("span",{style:{display:"flex",color:on?c[3]:P.faint}},_NXFX.svg(c[2],13)),_NXtr(c[1]),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:on?c[3]:P.faint}},_NXtr(String(nb))));})),
!L.length?_NXcard(vide("loupe",_T("Aucune protection ne correspond"),_T("Essaie un autre mot, ou une autre famille.")),{mb:0}):null,
_NXPROTFAM.map(function(f){
var LF=L.filter(function(it){return it.f===f[0];});
if(!LF.length)return null;
var col=COUL[f[3]]||P.info,on=0,tot=0;
LF.forEach(function(it){var e=X.etat(it);if(e.absent||e.toutFerme)return;tot++;if(e.plein&&!e.pause)on++;});
return i("div",{key:f[0],style:{marginBottom:"22px"}},
_NXtr(titreSection(f[2],col,_T(f[1]),_T(f[4]),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:on===tot&&tot?col:P.sub}},_NXtr(on)+" / "+_NXtr(tot)))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:"12px"}},
LF.map(function(it){return carte(it,idx++);})));}));}

// ------------------------------------------------------------ analyser
function vueAnalyser(){
var verdictCol=res?(res.verdict==="danger"?P.danger:(res.verdict==="warn"?P.warn:P.ok)):P.info;
return i("div",null,
_NXcard(i("div",null,
_NXtr(titreSection("loupe",P.info,_T("Verifier un lien"),_T("Colle un lien douteux : Nexium l analyse et suit ses redirections pour trouver sa vraie destination."))),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
i("div",{style:{position:"relative",flex:"1 1 260px"}},
i("div",{style:{position:"absolute",left:"13px",top:"12px",color:P.faint,display:"flex",pointerEvents:"none"}},_NXFX.svg("lien",15)),
i("input",{value:chk,onChange:function(ev){setChk(ev.target.value);},placeholder:_NXtr("https://"),spellCheck:false,"aria-label":_T("Lien a analyser"),
onKeyDown:function(ev){if(ev.key==="Enter")analyse();},
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"13px",
padding:"12px 13px 12px 36px",color:P.txt,fontSize:"13px",fontFamily:_NXf.mono,outline:"none"}})),
_NXtr(bouton(busy?_T("Analyse..."):_T("Analyser"),analyse,{plein:true,grand:true,col:P.info,icone:"loupe",off:busy}))),
(PR.loading&&!res)?i("div",{style:{marginTop:"12px",fontSize:"12px",color:P.dim}},_T("La base de menaces se charge : l analyse sera complete dans quelques secondes.")):null,
res?(res.verdict==="off"?i("div",{style:{marginTop:"14px"}},
_NXFX.note({col:P.warn,icone:"pause",texte:_T("L analyse des liens est coupee."),droite:bouton(_T("La rallumer"),function(){X.ecrit("pr","scanLinks",true);force();},{col:P.warn})})):
i("div",{className:"nxp-entre",style:{marginTop:"16px",padding:"16px 18px",borderRadius:"16px",
background:_NXteinte(verdictCol,8),border:"1px solid "+_NXteinte(verdictCol,32)}},
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",flexWrap:"wrap"}},
i("div",{style:{color:verdictCol,display:"flex"}},_NXFX.svg(res.verdict==="danger"?"alerte":(res.verdict==="warn"?"info":"bouclierOk"),22)),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"17px",fontWeight:"800",color:verdictCol}},
res.verdict==="danger"?(res.kind==="grabber"?_T("Dangereux : logger d IP"):(res.kind==="phish"?_T("Dangereux : hameconnage"):(res.kind==="punycode"?_T("Dangereux : domaine trompeur"):_T("Dangereux")))):
(res.verdict==="warn"?_T("Suspect : destination masquee"):_T("Aucune menace detectee"))),
res.verdict==="danger"?_NXtr(chip(res.blocked?_T("bloque"):_T("protection coupee"),res.blocked?P.ok:P.warn,res.blocked?"check":"alerte")):null),
res.host?i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"10px",fontFamily:_NXf.mono,wordBreak:"break-all"}},_T("Domaine")+" : "+_NXtr(res.host)):null,
res.resolved?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"4px",fontFamily:_NXf.mono,wordBreak:"break-all"}},_T("Redirige vers")+" : "+_NXtr(res.resolved)):null,
i("div",{style:{marginTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXtr(bouton(sbxBusy?_T("Inspection..."):_T("Inspecter la page en bac a sable"),inspecte,{creux:true,col:P.sub,icone:"boite",off:sbxBusy})),
sbx?_NXtr(bouton(_T("Effacer"),function(){setSbx(null);},{creux:true,col:P.faint})):null),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"10px",lineHeight:1.6}},
_T("Le bac a sable fait recuperer la page par le relais Nexium et l inspecte ici sans rien executer : le site ne voit ni ton adresse IP ni ton navigateur.")),
sbx?_NXtr(bacASable()):null)):null),{mb:12}),
_NXtr(baseMenaces()));}
function analyse(){var u=(chk||"").trim();if(!u||busy)return;if(!/^https?:\/\//i.test(u))u="https://"+u;
setBusy(true);setRes(null);setSbx(null);
try{PR.deepScan(u,function(r){setBusy(false);setRes(r);force();});}catch(_){setBusy(false);}}
function inspecte(){var u=(res&&res.resolved)||(chk||"").trim();if(!u||sbxBusy)return;if(!/^https?:\/\//i.test(u))u="https://"+u;
setSbxBusy(true);setSbx(null);
try{PR.sandbox(u,function(r){setSbxBusy(false);setSbx(r);force();});}catch(_){setSbxBusy(false);}}
function bacASable(){
if(sbx.erreur)return i("div",{style:{marginTop:"12px",fontSize:"12.5px",color:P.warn,lineHeight:1.6}},_NXtr(sbx.erreur));
var col=sbx.verdict==="danger"?P.danger:(sbx.verdict==="suspect"?P.warn:P.ok);
return i("div",{className:"nxp-entre",style:{marginTop:"14px",paddingTop:"14px",borderTop:"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap",marginBottom:"10px"}},
i("div",{style:{fontSize:"14px",fontWeight:"800",color:col}},sbx.verdict==="danger"?_T("Page dangereuse"):(sbx.verdict==="suspect"?_T("Page suspecte"):_T("Rien d alarmant dans la page"))),
_NXtr(chip(_NXtr(String(sbx.host||"")),P.sub,"globe"))),
sbx.titre?i("div",{style:{fontSize:"13px",color:P.txt,fontWeight:"600"}},_NXtr(sbx.titre)):null,
(sbx.alertes&&sbx.alertes.length)?i("div",{style:{marginTop:"8px"}},sbx.alertes.slice(0,6).map(function(al,k){
return i("div",{key:k,style:{display:"flex",gap:"9px",padding:"3px 0",fontSize:"12px",color:P.sub,lineHeight:1.55}},
i("span",{style:{color:P.warn,display:"flex",marginTop:"2px"}},_NXFX.svg("alerte",12)),_NXtr(al));})):null,
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:"8px",marginTop:"12px"}},
[[_T("formulaires"),sbx.formulaires],[_T("mot de passe"),sbx.motDePasse?_T("oui"):_T("non")],[_T("champs caches"),sbx.champsCaches],
[_T("scripts tiers"),(sbx.scripts||[]).length],[_T("cadres"),sbx.iframes]].map(function(x,k){
return i("div",{key:k,style:{padding:"10px 12px",borderRadius:"12px",background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{fontSize:"16px",fontWeight:"800",color:P.txt}},_NXtr(String(x[1]===undefined?"-":x[1]))),
i("div",{style:{fontSize:"10.5px",color:P.dim}},_NXtr(x[0])));})),
(sbx.destinations&&sbx.destinations.length)?i("div",{style:{fontSize:"11.5px",color:P.sub,fontFamily:_NXf.mono,marginTop:"10px",wordBreak:"break-all"}},
_T("Le formulaire envoie vers")+" : "+_NXtr(sbx.destinations.join(", "))):null);}
function baseMenaces(){
var R=PR.rep||{};var qn=(R.queue||[]).length;
var prochain=(PR.nextSlotMin&&PR.nextSlotMin())||0;
var n=(PR.remote&&PR.remote.n)||0;
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"12px"}},
_NXcard(i("div",null,
_NXch(_T("Base de menaces"),_T("Domaines dangereux, mis a jour depuis le depot Nexium.")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"34px",fontWeight:"800",color:P.txt,letterSpacing:"-.04em"}},_NXn(n)),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"4px",lineHeight:1.55}},
PR.loading?_T("chargement en cours"):((PR.remote&&PR.remote.err)?(_T("indisponible")+" : "+_NXtr(String(PR.remote.err))):
(_T("domaines charges")+((PR.remote&&PR.remote.at)?(" · "+_NXtr(new Date(PR.remote.at).toLocaleDateString())):"")))),
i("div",{style:{marginTop:"12px"}},_NXtr(bouton(_T("Actualiser"),function(){PR.loadRemote(true);PR.toast(_T("Mise a jour de la liste..."),1);},{creux:true,col:P.sub,icone:"maj"})))),{mb:0}),
_NXcard(i("div",null,
_NXch(_T("Signalements"),_T("Les menaces que tu as transmises a Nexium.")),
i("div",{style:{display:"flex",gap:"20px",flexWrap:"wrap"}},
[[_NXn(R.total||0),_T("envoyes"),P.txt],[_NXn(qn),_T("en attente"),qn?P.warn:P.txt],[prochain>0?(prochain+" min"):_T("pret"),_T("prochain envoi"),prochain>0?P.warn:P.ok]].map(function(x,k){
return i("div",{key:k},i("div",{style:{fontSize:"19px",fontWeight:"800",color:x[2]}},_NXtr(x[0])),i("div",{style:{fontSize:"10.5px",color:P.dim}},_NXtr(x[1])));})),
R.lastErr?i("div",{style:{marginTop:"10px",fontSize:"11.5px",color:P.warn,lineHeight:1.55}},_T("Dernier echec")+" : "+_NXtr(String(R.lastErr))):null,
qn?i("div",{style:{marginTop:"12px"}},_NXtr(bouton(_T("Reessayer maintenant"),function(){PR.queueFlush();},{col:P.warn}))):null),{mb:0}));}

// ------------------------------------------------------------ le coffre-fort
function vueCoffre(){
if(!V)return _NXcard(vide("cadenas",_T("Coffre-fort indisponible"),_T("Le module de protection du compte n a pas demarre sur ce client.")),{mb:0});
var integ=V.integrity||{state:"inconnu"};
var iTxt=integ.state==="conforme"?_T("Fichier conforme au depot officiel"):(integ.state==="version differente"?(_T("Version locale")+" v"+integ.local+" ≠ "+_T("depot")+" v"+integ.repo):
(integ.state==="desactive"?_T("Verification coupee"):(integ.state==="injoignable"?_T("Depot injoignable"):(integ.state==="reference incoherente"?_T("Reference incoherente sur le depot"):_T("Verification en cours")))));
var iCol=integ.state==="conforme"?P.ok:((integ.state==="injoignable"||integ.state==="inconnu"||integ.state==="desactive")?P.dim:P.danger);
var risky=V.cssRisky||[];var PL=V.plugins||[];
return i("div",null,
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"12px",marginBottom:"12px"}},
_NXcard(i("div",null,
_NXch(_T("Integrite du client"),_T("Ton fichier compare a la version publiee.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"12px"}},
i("div",{style:{width:"44px",height:"44px",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center",
background:_NXteinte(iCol,12),border:"1px solid "+_NXteinte(iCol,30),color:iCol}},_NXFX.svg(integ.state==="conforme"?"bouclierOk":"bouclier",22)),
i("div",{style:{flex:1,fontSize:"12.5px",color:P.pale,lineHeight:1.5}},_NXtr(iTxt))),
i("div",{style:{marginTop:"12px"}},_NXtr(bouton(_T("Verifier maintenant"),function(){V.checkIntegrity();PR.toast(_T("Verification en cours..."),1);},{creux:true,col:P.sub,icone:"maj"})))),{mb:0}),
_NXcard(i("div",null,
_NXch(_T("Ce que le coffre a bloque")),
i("div",{style:{display:"flex",gap:"20px",flexWrap:"wrap"}},
[[_NXn((V.stats&&V.stats.blocked)||0),_T("exfiltration(s)"),P.danger],[_NXn(risky.length),_T("source(s) CSS externe(s)"),risky.length?P.warn:P.txt],[_NXn(PL.length),_T("plugin(s) a surveiller"),PL.length?P.warn:P.txt]].map(function(x,k){
return i("div",{key:k},i("div",{style:{fontFamily:_NXf.disp,fontSize:"24px",fontWeight:"800",color:x[2]}},_NXtr(x[0])),i("div",{style:{fontSize:"10.5px",color:P.dim}},_NXtr(x[1])));}))),{mb:0})),
risky.length?_NXcard(i("div",null,
_NXch(_T("Tes themes exposent ton IP"),_T("Ces serveurs recoivent ton adresse a chaque demarrage.")),
risky.slice(0,8).map(function(f,k,arr){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"9px",padding:"11px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("div",{style:{flex:1,minWidth:0,fontSize:"12px",fontFamily:_NXf.mono,color:P.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(String(f.h))+(f.imp?_NXtr(" (import)"):"")),
_NXtr(bouton(_T("Bloquer"),function(){V.blockCssHost(f.h);force();},{col:P.danger})),
_NXtr(bouton(_T("Autoriser"),function(){V.allowCss(f.h);force();},{creux:true,col:P.sub})));})),{mb:12}):null,
PL.length?_NXcard(i("div",null,
_NXch(_T("Plugins a surveiller"),null,bouton(_T("Reanalyser"),function(){V._plWarned=false;V.auditPlugins();force();},{creux:true,col:P.sub})),
PL.slice(0,8).map(function(pl,k,arr){
var col=pl.risk>=3?P.danger:(pl.risk===2?P.warn:P.dim);
return i("div",{key:k,style:{padding:"12px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"5px"}},
i("div",{style:{flex:1,fontSize:"13px",fontWeight:"700",color:P.txt}},_NXtr(String(pl.n))),
_NXtr(chip(pl.risk>=3?_T("risque eleve"):(pl.risk===2?_T("a verifier"):_T("signal")),col,null))),
(pl.f||[]).map(function(fl,k2){return i("div",{key:k2,style:{fontSize:"11.5px",color:P.sub,lineHeight:1.55}},"— "+_NXtr(String(fl)));}));})),{mb:12}):null,
_NXtr(masqueEcran()),
_NXtr(bilanCarte()));}
function masqueEcran(){
if(!V.maskToggle)return null;
var cnt=V.maskCount?V.maskCount():{dms:0,names:0,members:0};
return _NXcard(i("div",null,
_NXch(_T("Masque de partage d ecran"),_T("Avant de montrer ton ecran : les messages prives floutes, les pseudos caches."),
bouton(V.maskActive?_T("Retirer le masque"):_T("Activer le masque"),function(){V.maskToggle();force();},{plein:!V.maskActive,col:V.maskActive?P.warn:P.pale,icone:V.maskActive?"oeil":"oeilBarre"})),
[["auto",_T("Automatique au partage d ecran"),_T("S active quand le partage commence, se retire a la fin.")],
["dms",_T("Flouter les messages prives"),_T("La colonne de gauche devient illisible.")],
["names",_T("Masquer les pseudos"),_T("Les noms affiches sont floutes.")],
["members",_T("Cacher la liste des membres"),_T("La colonne de droite disparait.")],
["content",_T("Flouter le contenu des messages"),_T("Radical : plus rien n est lisible a l ecran.")]].map(function(o,k,arr){
var on=!!(V.mcfg&&V.mcfg[o[0]]);
return i("div",{key:o[0],className:"nx-fx",role:"switch",tabIndex:0,onKeyDown:_NXkey,"aria-checked":on?"true":"false",
onClick:function(){V.maskSet(o[0],!on);force();},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"11px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line,cursor:"pointer"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",fontWeight:"600",color:on?P.txt:P.sub}},_NXtr(o[1])),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"2px"}},_NXtr(o[2]))),
_NXtr(interrupteur(on,P.info,false)));}),
i("div",{style:{marginTop:"10px",fontSize:"11px",color:P.faint}},
_T("Reperes dans ta fenetre")+" : "+_NXtr(cnt.dms)+" "+_T("zone(s) de MP")+" · "+_NXtr(cnt.names)+" "+_T("pseudo(s)")+" · "+_NXtr(cnt.members)+" "+_T("liste(s) de membres"))),{mb:12});}
function bilanCarte(){
var RT=window._NXRT;
if(!RT||!RT.drawSecurity)return null;
var im=null;try{im=(RT.secDataUrlCached||RT.secDataUrl)("mois");}catch(_){}
return _NXcard(i("div",null,
_NXch(_T("Bilan de securite"),_T("Une carte a partager, faite de ce que Nexium a vraiment arrete.")),
im?i("img",{src:im,alt:_T("Apercu du bilan de securite"),style:{width:"100%",display:"block",borderRadius:"14px",border:"1px solid "+P.line,marginBottom:"12px"}}):null,
_NXtr(bouton(_T("Telecharger le bilan"),function(){RT.secDownload("mois");},{plein:true,col:P.pale,icone:"telecharge"}))),{mb:0});}

// ------------------------------------------------------------ le journal
function ligneJournal(k,dernier,gauche,centre,droite){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"10px",padding:"11px 0",borderBottom:dernier?"none":"1px solid "+P.line}},_NXtr(gauche),
i("div",{style:{flex:1,minWidth:0}},_NXtr(centre)),_NXtr(droite)||null);}
function vueJournal(){
var quar=PR.quar||[];var recent=st.recent||[];var vlog=(V&&V.stats&&V.stats.log)||[];var allow=cfg.allow||[];
var rec=(G&&G.stats&&G.stats.recent)||[];
var hotes=[];try{var H=(G&&G.stats&&G.stats.hotes)||{};for(var hk in H)hotes.push([hk,H[hk]]);hotes.sort(function(x,y){return (y[1].n||0)-(x[1].n||0);});}catch(_){}
if(!quar.length&&!recent.length&&!vlog.length&&!allow.length&&!rec.length&&!hotes.length)
return _NXcard(vide("liste",_T("Journal vide"),_T("Aucune menace bloquee, aucun domaine autorise pour l instant.")),{mb:0});
var s=(flt||"").toLowerCase();
var filtre=recent.map(function(r,idx){return {r:r,idx:idx};}).filter(function(o){return !s||(genre(o.r.k)+" "+(o.r.d||"")).toLowerCase().indexOf(s)>=0;});
return i("div",null,
quar.length?_NXcard(i("div",null,
_NXch(_T("Quarantaine"),_T("Liens bloques avant l ouverture."),bouton(_T("Tout vider"),function(){if(window.confirm(_T("Vider la quarantaine ?"))){PR.clearQuar();force();}},{creux:true,col:P.sub})),
quar.slice(0,8).map(function(qq,k,arr){
return i("div",{key:k,style:{padding:"12px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",flexWrap:"wrap"}},
_NXtr(chip(_NXtr(PR.kindFr(qq.k)),P.danger,"alerte")),
i("div",{style:{flex:1,minWidth:0,fontSize:"12.5px",fontWeight:"700",color:P.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(String(qq.h))),
i("span",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(heure(qq.t))+(qq.n>1?(_NXtr(" ×")+_NXtr(qq.n)):""))),
i("div",{style:{fontSize:"10.5px",color:P.dim,fontFamily:_NXf.mono,wordBreak:"break-all",margin:"6px 0 9px"}},String(qq.u).slice(0,120)),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
_NXtr(bouton(_T("Ouvrir quand meme"),function(){if(window.confirm(_T("Ouvrir ce lien malgre l alerte ?")))PR.openQuar(qq.u);},{creux:true,col:P.danger})),
_NXtr(bouton(_T("Autoriser ce domaine"),function(){PR.allowHost(qq.h);PR.delQuar(k);force();},{creux:true,col:P.sub})),
_NXtr(bouton(_T("Signaler"),function(){PR.reportPrompt({k:qq.k,host:qq.h});},{creux:true,col:P.sub})),
_NXtr(bouton(_T("Retirer"),function(){PR.delQuar(k);force();},{creux:true,col:P.faint}))));})),{mb:12}):null,
(hotes.length||rec.length)?_NXcard(i("div",null,
_NXch(_T("Ce qui voulait sortir"),_T("Les serveurs inconnus contactes depuis ce client, et ce que les gardes ont coupe."),
G?bouton(_T("Tout oublier"),function(){G.viderJournal();force();},{creux:true,col:P.sub}):null),
hotes.slice(0,10).map(function(o,k,arr){
return ligneJournal("h"+k,k===arr.length-1&&!rec.length,chip(_T("hote"),P.warn,"globe"),
i("div",null,i("div",{style:{fontSize:"12.5px",fontFamily:_NXf.mono,color:P.txt,wordBreak:"break-all"}},_NXtr(o[0])),
i("div",{style:{fontSize:"10.5px",color:P.dim,marginTop:"2px"}},(_NXtr(o[1].n)||0)+" "+_T("tentative(s)")+" · "+_NXtr(heure(o[1].at)))),
i("div",{style:{display:"flex",gap:"6px"}},_NXtr(bouton(_T("Approuver"),function(){G.approuver(o[0]);force();},{creux:true,col:P.ok})),
_NXtr(bouton(_T("Oublier"),function(){G.oublierHote(o[0]);force();},{creux:true,col:P.faint}))));}),
rec.slice(0,10).map(function(L2,k,arr){
return ligneJournal("r"+k,k===arr.length-1,i("span",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(heure(L2.t))),
i("div",{style:{fontSize:"11.5px",color:P.sub,lineHeight:1.55,wordBreak:"break-word"}},_NXtr(String(L2.d||""))));})),{mb:12}):null,
recent.length?_NXcard(i("div",null,
_NXch(_T("Menaces recentes"),null,i("div",{style:{display:"flex",gap:"6px"}},
_NXtr(bouton(_T("Copier"),function(){try{var T2=recent.map(function(r){return new Date(r.t).toISOString()+" | "+genre(r.k)+" | "+(r.d||"");}).join("\n");
_NXpresse(T2);PR.toast(_T("Journal copie"),1);}catch(_){}},{creux:true,col:P.sub,icone:"copie"})),
_NXtr(bouton(_T("Tout vider"),function(){if(window.confirm(_T("Vider le journal des menaces ?"))){PR.clearThreats();force();}},{creux:true,col:P.sub})))),
i("input",{value:flt,onChange:function(ev){setFlt(ev.target.value);},placeholder:_T("Filtrer par domaine ou par type"),spellCheck:false,
"aria-label":_T("Filtrer le journal"),
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"11px",padding:"9px 12px",color:P.txt,fontSize:"12px",outline:"none",marginBottom:"6px"}}),
!filtre.length?i("div",{style:{fontSize:"12px",color:P.dim,padding:"10px 0"}},_T("Rien ne correspond au filtre.")):
filtre.slice(0,16).map(function(o,k,arr){var r=o.r;var host=String(r.d||"").split("/")[0];
return ligneJournal(k,k===arr.length-1,i("span",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono,flexShrink:0}},_NXtr(heure(r.t))),
i("div",null,i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_NXtr(genre(r.k))),
i("div",{style:{fontSize:"11px",color:P.dim,fontFamily:_NXf.mono,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:"2px"}},_NXtr(String(r.d||"")))),
i("div",{style:{display:"flex",gap:"5px",flexShrink:0}},
host?_NXtr(bouton(_T("Signaler"),function(){PR.reportPrompt(r);},{creux:true,col:P.sub})):null,
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-label":_T("Supprimer cette entree"),
onClick:function(){PR.removeThreat(o.idx);force();},style:{cursor:"pointer",color:P.faint,display:"flex",padding:"6px"}},_NXFX.svg("croix",13))));})),{mb:12}):null,
vlog.length?_NXcard(i("div",null,
_NXch(_T("Journal du coffre-fort"),_T("Ce que les protections du compte ont fait.")),
vlog.slice(0,10).map(function(L2,k,arr){
return ligneJournal(k,k===arr.length-1,i("span",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(heure(L2.t))),
i("div",{style:{fontSize:"11.5px",color:P.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(String(L2.d||""))));})),{mb:12}):null,
allow.length?_NXcard(i("div",null,
_NXch(_T("Domaines autorises"),_T("Ils ne seront plus signales.")),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"7px"}},allow.map(function(h,k){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"8px",padding:"6px 10px",background:P.inset,border:"1px solid "+P.line,borderRadius:"99px"}},
i("span",{style:{fontSize:"11px",color:P.sub,fontFamily:_NXf.mono}},_NXtr(String(h))),
i("span",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-label":_T("Retirer")+" "+_NXtr(h),
onClick:function(){PR.unallowHost(h);force();},style:{cursor:"pointer",color:P.faint,display:"flex"}},_NXFX.svg("croix",11)));}))),{mb:0}):null);}

// ------------------------------------------------------------ la page
var nQuar=(PR.quar||[]).length;
var TABS=[["tableau",_T("Tableau de bord"),"bouclier",""],
["protections",_T("Protections"),"reglages",Math.round(B.on)+"/"+B.acc],
["analyser",_T("Analyser"),"loupe",""],
["coffre",_T("Coffre-fort"),"cadenas",""],
["journal",_T("Journal"),"liste",nQuar?(nQuar>99?"99+":String(nQuar)):""],
["preuve",_T("Preuve"),"bouclierOk",""]];
var contenu=tab==="tableau"?vueTableau():(tab==="protections"?vueProtections():(tab==="analyser"?vueAnalyser():
(tab==="coffre"?vueCoffre():(tab==="journal"?vueJournal():i(NexiumPreuveComp,{g:"protect"})))));
return i(Kr,null,i("div",{className:an?"nxp-anim":"",style:{maxWidth:"940px",margin:"0 auto"}},
i("style",null,CSS),
(PR.missing&&PR.missing.length)?_NXFX.note({col:P.danger,icone:"alerte",titre:_T("Protect incomplet"),
texte:_NXtr(PR.missing.length)+" "+_T("fonction(s) manquante(s) : reinstalle ou mets a jour le client.")+" "+_NXtr(PR.missing.slice(0,6).join(", "))}):null,
_NXFX.onglets(TABS,tab,function(k){if(tab!==k){setTab(k);setQ("");}},{col:scol}),
i("div",{key:tab},_NXtr(contenu)),
_NXfoot(_NXtr("Nexium Protect · ")+_T("analyse locale, rien n est envoye sans ton accord"))));
}
