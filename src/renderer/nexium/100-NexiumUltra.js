var _NXULTRA_CSS=".nxul-piste{position:absolute;top:0;bottom:0;left:48%;right:0;overflow:hidden;pointer-events:none;opacity:.7;}"+
".nxul-trait{position:absolute;left:0;height:1px;border-radius:1px;background:linear-gradient(90deg,transparent,var(--acc),transparent);opacity:0;}"+
".nxed-anim .nxul-trait{animation:nxulFile 1.7s cubic-bezier(.4,0,.2,1) infinite;}"+
"@keyframes nxulFile{0%{transform:translate3d(-30%,0,0);opacity:0}20%{opacity:.9}100%{transform:translate3d(160%,0,0);opacity:0}}"+
".nxul-titre{font-style:italic;font-weight:800;letter-spacing:-.02em;}"+
".nxed-anim .nxul-titre{animation:nxulArrive .9s cubic-bezier(.16,1,.3,1) both;}"+
"@keyframes nxulArrive{from{transform:translateX(-60px) skewX(-12deg);opacity:0}to{transform:none;opacity:1}}"+
".nxul-levier{transition:background-color .25s ease,border-color .25s ease;}"+
".nxul-eclair{opacity:0;}"+
".nxed-anim .nxul-on .nxul-eclair{animation:nxulEclair .7s ease-out;}"+
"@keyframes nxulEclair{0%{opacity:1;transform:scale(.6)}100%{opacity:0;transform:scale(2.2)}}"+
".nxul-bouton{transition:transform .2s cubic-bezier(.34,1.5,.6,1);}"+
".nxul-bouton:hover{transform:translateY(-2px);}"+
".nxul-pastille{animation:none;}"+
".nxed-anim .nxul-vif{animation:nxulPouls 1.4s ease-in-out infinite;}"+
"@keyframes nxulPouls{0%,100%{opacity:1}50%{opacity:.35}}"+
".nxul-segment{transform-origin:left center;transition:transform 1s cubic-bezier(.22,1,.36,1);}";
var NexiumUltraIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("eclair",z):null;};
function NexiumUltraComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _m=F.useState(false);var mesure=_m[0];var setMesure=_m[1];
var _r=F.useState(null);var resultat=_r[0];var setResultat=_r[1];
var _e=F.useState("");var eclair=_e[0];var setEclair=_e[1];
var monte=_NXmounted(F);
F.useEffect(function(){
var vivant=true;
var maj=function(){if(vivant)force();};
try{_NXED.feuille("nx-ul-style",_NXULTRA_CSS);}catch(_){}
try{if(window._NXULTRA)_NXULTRA.listeners.push(maj);}catch(_){}
var id=setInterval(function(){try{if(!document.hidden)maj();}catch(_){}},5000);
return function(){vivant=false;try{clearInterval(id);}catch(_){}
try{if(window._NXULTRA)_NXULTRA.listeners=_NXULTRA.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var P=_NXpal,ACC=P.lime,ACC2=P.cyan;
var U=window._NXULTRA;
F.useEffect(function(){try{
if(!U||U._mes||!U.serie)return;
var cv=document.getElementById("nx-ultra-code");
var ctx=cv&&cv.getContext?cv.getContext("2d"):null;
if(!ctx)return;
var W=cv.width,Hh=cv.height,S2=U.serie,a;
ctx.clearRect(0,0,W,Hh);
for(a=0;a<S2.img.length;a++){var t2=S2.img[a][0],d2=S2.img[a][1];
var x=Math.max(0,(t2-d2)/S2.ms*W),w=Math.max(1,d2/S2.ms*W-0.6),h=Math.max(3,Math.min(1,d2/50)*Hh);
ctx.fillStyle=d2<=17.5?ACC:(d2<=34?P.warn:P.danger);ctx.fillRect(x,Hh-h,w,h);}}catch(_){}});
function entete(droite){
return i("div",{style:{position:"relative",padding:"6px 0 26px",marginBottom:"8px",borderBottom:"1px solid var(--l)"}},
i("div",{className:"nxul-piste","aria-hidden":"true"},
[12,26,38,52,64,78,88].map(function(y,k){return i("span",{key:k,className:"nxul-trait",style:{top:y+"%",width:(18+(k*13)%30)+"%",
animationDelay:(k*0.23)+"s",animationDuration:(1.3+(k%3)*0.35)+"s"}});})),
i("div",{style:{position:"relative",display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"20px",flexWrap:"wrap"}},
i("div",null,
i("div",{style:{fontSize:"12.5px",color:ACC}},_T("Nouveauté de la v204")),
i("div",{className:"nxul-titre",style:{fontSize:"42px",lineHeight:1.05,marginTop:"6px",color:"var(--c)"}},"Nexium Ultra Fast"),
i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.6,marginTop:"8px",maxWidth:"540px"}},
_T("Discord dessiné par ta carte graphique, sur ses meilleurs réglages, et un pilote qui n’allège que si des images bloquent vraiment. Tout ce qui est affiché ici est mesuré sur ta machine."))),
droite||null));}
if(!U||!window._NXPERF)return i(Kr,null,_NXED.racine({acc:ACC},entete(),
_NXED.vide(_T("Ultra Fast n’a pas démarré."),_T("Redémarre Discord : il se met en place au lancement."))));
var c=U.cfg(),etat=U.etat()||{},dem=etat.demarrage||{},prec=etat.precedent||{};
var G=_NXPERF.gpu(),genre=U.genre(G.rendu),FB=U.bilanFrappe(),H=U.historique();
var taux=U.dernierTaux!==undefined?U.dernierTaux:Math.round(U.taux(120000)*10)/10;
function pastille(t,col){return i("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"4px 11px",borderRadius:"99px",
fontSize:"12px",color:col,border:"1px solid "+_NXED.a(col.charAt(0)==="#"?col:"#bda9ff",0.4)}},
i("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:col}}),t);}

var statut=i("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",borderRadius:"14px",border:"1px solid "+(c.actif?_NXED.a(ACC,0.45):"var(--l)")}},
i("span",{className:c.actif?"nxul-vif":"",style:{width:"10px",height:"10px",borderRadius:"50%",background:c.actif?ACC:"var(--f)"}}),
i("div",null,
i("div",{style:{fontSize:"14px",color:"var(--c)"}},c.actif?_T("Actif"):_T("Coupé")),
i("div",{style:{fontSize:"12px",color:"var(--m)",fontVariantNumeric:"tabular-nums"}},
_T("palier")+" "+U.niveau+" · "+_NXtr(taux)+" "+_T("image(s) bloquée(s) par minute"))));

// La mesure : chaque image est un trait, sa largeur est sa duree, sa
// hauteur aussi. Une image lente se voit large, haute et rouge.
function lancer(){
if(mesure)return;
var cv=document.getElementById("nx-ultra-code");
var ctx=cv&&cv.getContext?cv.getContext("2d"):null;
var W=cv?cv.width:0,Hh=cv?cv.height:0,n=0;
if(ctx){ctx.clearRect(0,0,W,Hh);}
setMesure(true);setResultat(null);
var ok=U.mesurer(5000,function(d,t,ms){try{
n++;
if(ctx){var x=Math.max(0,(t-d)/ms*W),w=Math.max(1,d/ms*W-0.6),h=Math.max(3,Math.min(1,d/50)*Hh);
ctx.fillStyle=d<=17.5?ACC:(d<=34?P.warn:P.danger);ctx.fillRect(x,Hh-h,w,h);}
if(n%12===0){var el=document.getElementById("nx-ultra-direct");if(el)el.textContent=Math.round(n*1000/Math.max(1,t))+" "+_NXtr("images/s");}}catch(_){}},
function(r){setResultat(r);setMesure(false);});
if(!ok)setMesure(false);}

function levier(k,titre,texte,quand,applique,dispo){
var on=!!c[k];
return i("div",{key:k,className:"nx-fx nxed-ligne nxul-levier"+(eclair===k&&on?" nxul-on":""),role:"button","aria-label":_NXtr(titre),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:function(){U.set(k,!on);setEclair(k);},
style:{display:"flex",alignItems:"flex-start",gap:"16px",padding:"13px 12px",margin:"0 -12px",cursor:"pointer",opacity:dispo===false?0.5:1}},
i("div",{style:{position:"relative",width:"40px",height:"24px",borderRadius:"12px",flexShrink:0,marginTop:"2px",boxSizing:"border-box",
background:on?ACC:"transparent",border:"1px solid "+(on?ACC:"var(--f)"),transition:"background-color .2s ease"}},
i("span",{className:"nxul-eclair","aria-hidden":"true",style:{position:"absolute",inset:"-6px",borderRadius:"14px",border:"2px solid "+ACC}}),
i("div",{style:{width:"16px",height:"16px",borderRadius:"50%",margin:"3px",background:on?"#16130f":"var(--f)",
transform:on?"translateX(16px)":"none",transition:"transform .25s cubic-bezier(.34,1.5,.6,1)"}})),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"baseline",gap:"10px",flexWrap:"wrap"}},
i("span",{style:{fontSize:"14.5px",color:on?"var(--c)":"var(--m)"}},_NXtr(titre)),
i("span",{style:{fontSize:"11.5px",color:"var(--f)"}},_NXtr(quand)),
applique?i("span",{style:{fontSize:"11.5px",color:ACC}},_NXtr(applique)):null),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",marginTop:"3px",lineHeight:1.55}},_NXtr(texte))));}

var leviersPoses=(dem.leviers||[]);
function pose(mot){for(var a=0;a<leviersPoses.length;a++)if(String(leviersPoses[a]).indexOf(mot)>=0)return _T("appliqué à ce démarrage");return null;}
var prio=prec&&typeof prec.priorite==="number"?prec.priorite:null;
var gpus=(prec&&prec.gpu)||[];

var avant=H.length>1?H[1]:null;
var res=resultat||H[0]||null;
var ecart=(res&&avant)?(res.ips-avant.ips):null;

var diag=_NXPERF.diagnostic();
var verdict={traitement:_T("Le délai vient surtout du traitement : du code s’exécute à chaque touche, ceux des plugins et des outils de développement compris."),
attente:_T("Le délai vient surtout de l’attente : la page était déjà occupée quand la touche est arrivée."),
affichage:_T("Le délai vient surtout de l’affichage : c’est le dessin de l’image qui traîne, donc la carte graphique ou son absence.")};

return i(Kr,null,_NXED.racine({acc:ACC,acc2:ACC2,max:820},
entete(statut),
i("div",{className:"nxed-monte"},
_NXED.section(_T("Ta carte graphique"),_T("Ce que Chromium utilise vraiment pour dessiner Discord, lu sur un contexte graphique ouvert à l’instant."),
i("div",null,
i("div",{style:{fontFamily:_NXf.mono,fontSize:"13px",color:"var(--c)",lineHeight:1.6,wordBreak:"break-word"}},G.rendu||_T("aucun rendu graphique disponible")),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"12px"}},
G.active===true?pastille(_T("accélération matérielle active"),ACC):(G.active===false?pastille(_T("rendu par le processeur"),P.danger):pastille(_T("état inconnu"),"#bda9ff")),
genre==="dediee"?pastille(_T("carte dédiée"),ACC):(genre==="integree"?pastille(_T("carte intégrée"),P.warn):null),
prio!==null?pastille(prio+" "+_T("processus en priorité haute"),ACC2):null),
gpus.length>1?i("div",{style:{marginTop:"14px"}},_NXED.registre(gpus.map(function(g){
return {lab:g.nom||((g.vendeur===4318?"NVIDIA":g.vendeur===32902?"Intel":g.vendeur===4098?"AMD":"Carte")+" "+(g.materiel||"")),v:g.actif?_T("utilisée"):_T("au repos"),col:g.actif?ACC:"var(--m)"};}))):null),null,"u1"),
_NXED.section(_T("La mesure"),_T("Cinq secondes, image par image. Chaque trait est une image : plus il est large et haut, plus elle a mis de temps. Bouge la souris ou fais défiler un salon pendant la mesure pour voir Discord sous charge."),
i("div",null,
i("canvas",{id:"nx-ultra-code",width:760,height:90,style:{width:"100%",height:"90px",display:"block",borderRadius:"10px",background:"rgba(0,0,0,.3)",border:"1px solid var(--l)"}}),
i("div",{style:{display:"flex",alignItems:"center",gap:"18px",flexWrap:"wrap",marginTop:"14px"}},
i("div",{className:"nx-fx nxul-bouton"+(mesure?"":" nxed-pouls"),role:"button","aria-label":_T("Mesurer cinq secondes"),tabIndex:0,onKeyDown:_NXkey,onClick:lancer,
style:{padding:"11px 20px",borderRadius:"99px",cursor:"pointer",fontSize:"13px",fontWeight:"700",background:ACC,color:"#16130f"}},
mesure?_T("Mesure en cours"):_T("Mesurer cinq secondes")),
i("span",{id:"nx-ultra-direct",style:{fontSize:"14px",color:"var(--c)",fontVariantNumeric:"tabular-nums"}},mesure?"…":""),
res&&!mesure?i("div",{style:{display:"flex",gap:"22px",flexWrap:"wrap",alignItems:"baseline"}},
i("span",null,i("span",{style:{fontFamily:"var(--serif)",fontSize:"34px",color:res.ips>=55?ACC:(res.ips>=30?P.warn:P.danger),fontVariantNumeric:"tabular-nums"}},_NXtr(res.ips)),
i("span",{style:{fontSize:"13px",color:"var(--m)",marginLeft:"6px"}},_T("images/s"))),
i("span",{style:{fontSize:"13px",color:"var(--m)"}},_T("médiane")+" "+_NXtr(res.mediane)+" ms · 95 % "+_NXtr(res.p95)+" ms · "+_NXtr(res.lents)+" "+_T("lente(s)")),
ecart!==null?i("span",{style:{fontSize:"13px",color:ecart>=0?ACC:P.warn}},(ecart>=0?"+":"")+_NXtr(ecart)+" "+_T("images/s depuis la mesure d’avant")):null):null),
H.length?i("div",{style:{marginTop:"16px"}},_NXED.registre(H.slice(0,6).map(function(h){var d=new Date(h.quand);
return {lab:d.toLocaleDateString("fr-FR")+" "+("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)+" · "+(h.ultra?_T("Ultra Fast actif"):_T("Ultra Fast coupé"))+(h.gpu===false?" · "+_T("sans carte graphique"):""),
v:h.ips+" "+_T("images/s"),col:h.ips>=55?ACC:(h.ips>=30?P.warn:P.danger)};}))):null),null,"u2"),
_NXED.section(_T("La frappe"),_T("Le temps entre une touche et l’image qui l’affiche. Seules les touches lentes, au-delà de 16 ms, sont détaillées par Chromium."),
!FB.suivi?i("div",{style:{fontSize:"13px",color:"var(--m)"}},_T("Ce client ne fournit pas la mesure des touches.")):
(FB.lentes?i("div",null,
i("div",{style:{fontFamily:"var(--serif)",fontSize:"22px",color:"var(--c2)",lineHeight:1.6}},
_NXtr(FB.lentes)+" "+_T("touche(s) lente(s) sur")+" "+_NXtr(FB.touches)+(FB.part!==null?(" ("+FB.part+" %)"):"")+", "+_T("médiane")+" "+_NXtr(FB.mediane)+" ms, "+_T("pire")+" "+_NXtr(FB.pire)+" ms."),
i("div",{style:{display:"flex",height:"12px",borderRadius:"99px",overflow:"hidden",marginTop:"14px",background:"var(--l)"}},
[["attente",P.info],["traitement",P.warn],["affichage",P.rose]].map(function(z){var tot=Math.max(1,FB.attente+FB.traitement+FB.affichage);
return i("div",{key:z[0],className:"nxul-segment",style:{width:(FB[z[0]]/tot*100)+"%",background:z[1],transform:"scaleX("+(monte?1:0)+")"}});})),
i("div",{style:{display:"flex",gap:"18px",flexWrap:"wrap",marginTop:"8px",fontSize:"12.5px",color:"var(--m)"}},
i("span",{style:{color:P.info}},_T("attente")+" "+FB.attente+" ms"),
i("span",{style:{color:P.warn}},_T("traitement")+" "+FB.traitement+" ms"),
i("span",{style:{color:P.rose}},_T("affichage")+" "+FB.affichage+" ms")),
i("div",{style:{fontSize:"13.5px",color:"var(--c2)",lineHeight:1.6,marginTop:"12px"}},verdict[FB.cause]))
:i("div",{style:{fontSize:"13px",color:"var(--m)"}},_NXtr(FB.touches)+" "+_T("touche(s) observée(s), aucune lente. La frappe s’affiche en moins de 16 ms."))),null,"u3"),
_NXED.section(_T("Les leviers"),_T("Tous allumés par défaut. Ceux marqués « au démarrage » prennent effet au prochain lancement de Discord."),
i("div",null,
levier("actif",_T("Ultra Fast"),_T("L’interrupteur général. Coupé, plus aucun levier ne s’applique."),_T("au démarrage"),null),
levier("gpuDedie",_T("Carte graphique dédiée"),_T("Sur les portables à deux cartes, Discord tourne sur la carte puissante plutôt que sur la puce intégrée. Windows retient aussi ce choix pour Nexium."),_T("au démarrage"),pose("dediee")),
levier("raster",_T("Rastérisation par la carte graphique"),_T("Le texte et les images sont rastérisés par la carte graphique, directement dans sa mémoire, avec des fils de rendu adaptés à ton processeur."),_T("au démarrage"),pose("rasterisation")),
levier("priorite",_T("Priorité relevée"),_T("Les processus de Discord passent devant les tâches de fond de Windows, sans jamais dépasser un jeu en plein écran."),_T("au démarrage"),prio?(_NXtr(prio)+" "+_T("processus relevés")):null),
levier("isolation",_T("Isolation des zones"),_T("La liste des serveurs, les membres et le panneau du bas ne recalculent plus leur mise en page à chaque message ou à chaque touche."),_T("en direct"),c.actif&&c.isolation?_T("appliquée"):null),
levier("pilote",_T("Pilote automatique"),_T("Il lit les images que Chromium déclare bloquées. Au-delà de 10 par minute, il retire les flous d’arrière-plan, ce qui coûte le plus à la carte graphique. Il ne touche jamais aux animations, et revient en arrière après trois minutes calmes."),_T("en direct"),_T("palier")+" "+U.niveau),
levier("memoire",_T("Mémoire rendue en arrière-plan"),_T("Après dix minutes fenêtre cachée, Discord rend la mémoire qu’il garde en cache."),_T("en direct"),U.memoire.dispo===false?_T("indisponible sur ce client"):(U.memoire.n?(_NXtr(U.memoire.n)+" "+_T("fois")):null),U.memoire.dispo!==false),
U.aRedemarrer?i("div",{style:{marginTop:"14px"}},_NXED.bouton(_T("Redémarrer Discord pour appliquer"),function(){try{setTimeout(function(){try{if(window._NXUP&&_NXUP.relaunch&&_NXUP.relaunch())return;location.reload();}catch(_){}},800);}catch(_){}},{fort:true,pouls:true,cle:"rd"})):null,
U.journal.length?i("div",{style:{marginTop:"16px"}},_NXED.registre(U.journal.slice(0,5).map(function(j){var d=new Date(j.t);
return {lab:("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)+" · "+_T("palier")+" "+j.de+" → "+j.a,v:j.taux+" "+_T("bloquées/min"),col:j.a>j.de?P.warn:ACC};}))):null),null,"u4"),
(diag.points&&diag.points.length)?_NXED.section(_T("Ce qui pèse encore"),_T("Des réglages du client qu’Ultra Fast ne peut pas changer seul. Un clic, puis un redémarrage."),
i("div",null,diag.points.map(function(p){
return i("div",{key:p.id,style:{padding:"12px 0",borderTop:"1px solid var(--l)"}},
i("div",{style:{fontSize:"14px",color:p.grave?P.warn:"var(--c)"}},_NXtr(p.titre)),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",lineHeight:1.55,margin:"4px 0 8px"}},_NXtr(p.texte)),
p.fait?i("div",{style:{fontSize:"12.5px",color:ACC}},_T("Appliqué. Pris en compte au prochain démarrage.")):
_NXED.bouton(p.action,function(){try{_NXPERF.corrige(p.id);U.aRedemarrer=true;force();}catch(_){}},{cle:p.id}));})),null,"u5"):null),
_NXfoot(_NXtr("Nexium Ultra Fast · mesuré sur ta machine, rien n’est envoyé"))));
}
