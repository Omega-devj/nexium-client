var _NXPATCH=window._NXPATCH||(window._NXPATCH={});
if(!_NXPATCH.init){_NXPATCH.init=true;
_NXPATCH.KEY="nexium_patches";
_NXPATCH.on=(function(){try{return _NXDB.get(_NXPATCH.KEY)!=="0";}catch(_){return true;}})();
_NXPATCH.set=function(v){try{_NXPATCH.on=!!v;_NXDB.set(_NXPATCH.KEY,v?"1":"0");}catch(_){}};
_NXPATCH.list=["requetes reseau","requetes XHR","balises de suivi","erreurs console"];
}
var _NXsaisie=function(e){try{
var el=(e&&(e.target||e.srcElement))||null;
if(!el)return false;
if(el.isContentEditable)return true;
var t=String(el.tagName||"").toUpperCase();
return t==="INPUT"||t==="TEXTAREA"||t==="SELECT";}catch(_){return false;}};
var _NXkey=function(e){try{if(e.key==="Enter"||e.key===" "||e.key==="Spacebar"){e.preventDefault();if(e.currentTarget&&e.currentTarget.click)e.currentTarget.click();}}catch(_){}};
var _NXn=function(v){v=v||0;if(v>=1000000)return(v/1000000).toFixed(1).replace(/\.0$/,"")+"M";if(v>=1000)return(v/1000).toFixed(1).replace(/\.0$/,"")+"k";return""+v;};
var _NXMARQUES={
"Nexium Client":["accueil","acc"],"Nexium IA":["etincelle","mauve"],
"Nexium Protect":["bouclierOk","danger"],"Nexium Privacy":["oeilBarre","ok"],
"Nexium R\u00e9seau":["reseau","warn"],"Nexium Donn\u00e9es":["base","lime"],
"Nexium Stats":["graphe","info"],"Nexium Music":["note","rose"],
"Nexium Auto":["eclair","warn"],"Nexium Comptes":["comptes","rose"],
"Nexium Team":["equipe","acc"],"Nexium Sponsor":["coeur","rose"],
"Nexium Admins":["couronne","warn"],"Nexium Changelog":["liste","info"],
"Nexium Mise \u00e0 jour":["maj","cyan"]};
// ------------------------------------------------------------------- l aide
//
// Le client fait beaucoup de choses, et une page de reglages n explique
// jamais vraiment a quoi elle sert : elle montre des interrupteurs. On ajoute
// donc a chaque entete un bouton qui deplie trois reponses courtes, toujours
// les memes trois questions :
//
//   - ce que fait cette page,
//   - ce que ca change reellement sur la machine,
//   - ce que ca ne fait jamais.
//
// La troisieme est la plus utile : elle dit ou s arrete le client. Un outil
// qui touche aux messages et au reseau se doit d etre clair la-dessus.
_NXFX.Aide=function(props){try{
var P=_NXpal;
var A=(props&&props.aide)||null;
var c=(props&&props.col)||P.acc;
var o=F.useState(false);
if(!A||!A.length)return null;
var TITRES=[_T("Ce que fait cette page"),_T("Ce que ca change chez toi"),
_T("Ce que ca ne fait jamais")];
var ICONES=["question","puce","cadenas"];
return i("div",{style:{marginTop:"14px"}},
i("div",_NXFX.fusion({className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-expanded":o[0]?"true":"false",
onClick:function(){o[1](!o[0]);},
// Le seul bouton du client sans nom accessible, sur toutes les pages :
// un lecteur d ecran annoncait "bouton" et rien d autre.
"aria-label":o[0]?_T("Masquer l explication"):_T("A quoi ca sert ?"),
"aria-expanded":o[0]?"true":"false",
style:{display:"inline-flex",alignItems:"center",gap:"7px",padding:"6px 13px",
borderRadius:"99px",cursor:"pointer",
border:"1px solid "+(o[0]?_NXteinte(c,44):P.line),
background:o[0]?_NXteinte(c,10):"transparent",
color:o[0]?P.txt:P.sub,fontSize:"11.5px",fontWeight:"700",
transition:_NXFX.anime()?"background .2s ease,border-color .2s ease,color .2s ease":"none"}},
_NXFX.a({"data-nx-appui":"1"})),
i("span",{style:{display:"flex",color:o[0]?c:P.faint}},_NXFX.svg("question",14)),
i("span",null,o[0]?_T("Masquer l explication"):_T("A quoi ca sert ?"))),
o[0]?i("div",_NXFX.fusion({style:{marginTop:"13px",display:"flex",gap:"12px",
flexWrap:"wrap"}},_NXFX.a({"data-nx-panel":"1"})),
A.slice(0,3).map(function(t,k){
return i("div",{key:k,style:{flex:"1 1 210px",minWidth:"196px",
padding:"14px 15px",borderRadius:"14px",background:P.inset,
border:"1px solid "+(k===2?_NXteinte(P.ok,22):P.line)}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"9px"}},
i("span",{style:{display:"flex",color:k===2?P.ok:c}},_NXFX.svg(ICONES[k],14)),
i("span",{style:{fontSize:"9.5px",fontWeight:"900",letterSpacing:".13em",
textTransform:"uppercase",color:k===2?P.ok:P.dim}},_NXtr(TITRES[k]))),
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.6}},_NXtr(t)));})):null);
}catch(_){return null;}};

// Trois phrases par page. Elles sont ecrites une fois, ici, pour qu on puisse
// les relire toutes d affilee et voir si le client tient ses promesses.
var _NXAIDES={
"Nexium Client":[
"La vue d ensemble : l etat des huit modules, ce qui tourne, ce qui dort, et les reglages de demarrage et de mouvement.",
"Rien par elle-meme. Elle lit l etat des autres modules et te laisse couper l animation d ouverture ou celle des pages.",
"Elle n envoie rien. Tous les chiffres affiches sont calcules sur cette machine, a partir de ce qui y est deja garde."],
"Nexium IA":[
"Un assistant dans le client : une page de discussion, et un panneau flottant que tu peux ouvrir par-dessus Discord.",
"Tes questions partent vers un relais qui interroge le modele, puis la reponse revient. Le fil est garde sur cette machine.",
"Il ne lit pas tes conversations Discord tout seul. Ce qui part est ce que tu as ecrit, ou ce que tu as explicitement joint."],
"Nexium Protect":[
"La garde contre ce qui arrive par messages : liens dangereux, hameconnage, fichiers pieges, codes a coller dans la console.",
"Les liens sont examines avant ouverture, et ceux qui sont reconnus dangereux sont bloques. Rien n est supprime.",
"Il n envoie aucun lien a l exterieur pour l analyser. La reconnaissance se fait sur cette machine, sur une base embarquee."],
"Nexium Privacy":[
"Ce que Discord et les sites apprennent de toi : telemetrie, accuses de lecture, empreinte du navigateur, liens de suivi.",
"Des requetes sortantes sont coupees avant d etre envoyees, et certains liens sont nettoyes de leurs marqueurs.",
"Il ne cache pas ton adresse IP a Discord et ne remplace pas un reseau prive. Ce qu il coupe, il le dit ; le reste passe."],
"Nexium Réseau":[
"Ce que le client fait sortir : quelles adresses, a quel rythme, et pour quelle raison.",
"Rien, sauf si tu actives une regle. C est d abord un journal : il regarde et il note.",
"Il ne voit pas le trafic des autres applications. Seules les requetes du client et de Discord passent par ici."],
"Nexium Données":[
"Tout ce que le client garde sur cette machine : taille, contenu, sauvegardes, et de quoi tout effacer.",
"Ce que tu y fais est definitif : effacer une cle efface vraiment ce qu elle contenait.",
"Rien de ce qui est liste ici n est envoye ailleurs. C est le stockage local du navigateur, et il ne quitte pas ton disque."],
"Nexium Stats":[
"Ce que tu fais sur Discord, compte a la maison : messages, vocal, serveurs frequentes, rythme des journees.",
"Un compteur tourne pendant que tu utilises Discord, et ecrit sur cette machine. Tu peux le remettre a zero.",
"Aucun de ces chiffres ne part. Personne d autre, y compris l equipe Nexium, ne les voit."],
"Nexium Music":[
"Le lecteur du client, et ce qu il affiche de ton ecoute.",
"Il lit les fichiers que tu lui donnes et retient ta liste. L affichage de Spotify peut etre coupe ici.",
"Il ne televerse aucun fichier et ne partage pas ce que tu ecoutes sans que tu l aies demande."],
"Nexium Auto":[
"Des regles simples : quand telle chose arrive, faire telle chose. Un declencheur, une action.",
"Une regle active agit vraiment -- elle peut ecrire un message, jouer un son, ou noter quelque chose.",
"Rien ne s execute sans que tu aies cree la regle et l aies allumee. L envoi de messages est coupe par defaut."],
"Nexium Comptes":[
"Les comptes Discord enregistres sur ce client, et de quoi passer de l un a l autre.",
"Les jetons sont gardes chiffres sur cette machine, et servent a rouvrir une session sans retaper de mot de passe.",
"Aucun jeton ne part vers un serveur Nexium. Ils ne servent qu a parler a Discord, depuis cette machine."],
"Nexium Team":[
"Qui fait le client, et comment le joindre.",
"Rien. C est une page de presentation.",
"Elle n affiche aucune donnee te concernant."],
"Nexium Sponsor":[
"Les emplacements de soutien, et ce que soutenir le client apporte en retour.",
"Rien tant que tu ne demandes rien. Un emplacement se reserve par ticket.",
"Il n y a ni publicite, ni suivi, ni redirection. Les emplacements libres sont montres comme tels."],
"Nexium Admins":[
"L administration du client : utilisateurs, alertes, bannissements, credits et abonnements.",
"Ce que tu fais ici touche les autres comptes. Chaque geste est inscrit dans un journal d audit.",
"Elle ne donne pas acces aux messages des utilisateurs. Elle ne montre que ce que le client remonte deja."],
"Nexium Changelog":[
"Ce qui a change d une version a l autre, dans les mots de celui qui l a fait.",
"Rien. La page lit le fichier publie sur le depot.",
"Elle ne telecharge aucune mise a jour. C est la page Mise a jour qui s en charge."],
"Nexium Mise à jour":[
"L etat de ta version, celle qui est publiee, et de quoi appliquer la nouvelle.",
"Appliquer une mise a jour reecrit le fichier du client et redemarre Discord. Tes reglages sont conserves.",
"Rien n est installe sans que tu l aies accepte. Le fichier telecharge est verifie avant d etre pose."],
"Nexium Abonnement":[
"Ce que ton compte ouvre aujourd hui, ce que chaque offre ajouterait, et comment souscrire.",
"Rien depuis cette page : elle lit ton etat sur le serveur et te laisse simuler une offre.",
"Aucun paiement ne passe par le client. Il n y a ni formulaire bancaire, ni prelevement automatique."],
"Nexium Ticket":[
"Un fil prive entre toi et l equipe : une question, un probleme, ou un abonnement a prendre.",
"Ce que tu ecris est envoye a l equipe et garde quinze jours apres le dernier message, puis efface.",
"Personne d autre que toi et l equipe ne lit ce fil. La preuve d acces reste sur cette machine."]};
var _NXhead=function(k,t,d){try{
var m=_NXMARQUES[t]||null;
return _NXFX.entete({cle:_NXtr(k),titre:_NXtr(t),texte:_NXtr(d),aide:_NXtr(_NXAIDES[t])||null,
icone:m?m[0]:"point",col:m?(_NXpal[m[1]]||_NXpal.acc):_NXpal.acc});
}catch(_){
// Repli : la forme d origine, sans blason. Une entete manquante vaudrait
// une page sans titre -- ce qui serait pire que pas d icone.
return i("div",{style:{marginBottom:"26px"}},
i("div",{style:{fontSize:"10.5px",fontWeight:"800",letterSpacing:".26em",
color:_NXpal.sub,textTransform:"uppercase"}},_NXtr(k)),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"34px",fontWeight:"800",
color:_NXpal.txt,letterSpacing:"-.035em",lineHeight:1.02,marginTop:"12px"}},_NXtr(t)),
d?i("div",{style:{fontSize:"13.5px",color:_NXpal.sub,marginTop:"13px",
lineHeight:1.65,maxWidth:"540px"}},_NXtr(d)):null,
i("div",{style:{height:"1px",marginTop:"22px",background:_NXpal.hair}}));}};
var _NXcard=function(body,opt){opt=opt||{};var g=opt.glow;
var p={style:{position:"relative",overflow:"hidden",background:_NXpal.panel,border:"1px solid "+_NXpal.line,borderRadius:_NXrad.lg,padding:opt.pad||"22px",marginBottom:opt.mb===0?0:"14px",boxShadow:"0 1px 0 rgba(255,255,255,.055) inset, 0 10px 34px rgba(0,0,0,.32)"}};
try{if(window._NXMO&&_NXMO.actif&&_NXMO.actif()){_NXcard._n=((_NXcard._n||0)%6)+1;p["data-nx-rise"]=String(_NXcard._n);p["data-nx-lift"]="1";}}catch(_){}
return i("div",p,g?i("div",{style:{position:"absolute",top:0,right:0,width:"200px",height:"200px",background:"radial-gradient(circle at top right, "+g+", transparent 70%)",pointerEvents:"none"}}):null,i("div",{style:{position:"relative"}},_NXtr(body)));};
var _NXch=function(label,desc,right){label=_NXtr(label);desc=_NXtr(desc);return i("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px",marginBottom:desc?"14px":"16px"}},i("div",{style:{flex:1,minWidth:0}},i("div",{style:{display:"flex",alignItems:"center",gap:"9px"}},i("div",{style:{width:"2px",height:"11px",borderRadius:"1px",background:_NXpal.faint,flexShrink:0}}),i("div",{style:{fontSize:"11px",fontWeight:"700",letterSpacing:".12em",color:_NXpal.dim,textTransform:"uppercase"}},_NXtr(label))),desc?i("div",{style:{fontSize:"12px",color:_NXpal.sub,marginTop:"8px",lineHeight:1.5}},_NXtr(desc)):null),right?i("div",{style:{flexShrink:0}},_NXtr(right)):null);};
var _NXstrip=function(items){return i("div",{style:{display:"flex"}},items.map(function(it,k){return i("div",{key:k,style:{flex:1,minWidth:0,paddingLeft:k===0?0:"18px",paddingRight:"18px",borderLeft:k>0?"1px solid "+_NXpal.hair:"none"}},i("div",{style:{fontFamily:_NXf.disp,fontSize:"27px",fontWeight:"800",letterSpacing:"-.03em",color:it.color||_NXpal.txt,lineHeight:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontVariantNumeric:"tabular-nums"}},_NXtr(it.v)),i("div",{style:{fontSize:"10px",fontWeight:"700",letterSpacing:".08em",color:_NXpal.dim,textTransform:"uppercase",marginTop:"10px"}},_NXtr(it.label)),it.sub?i("div",{style:{fontSize:"11px",color:_NXpal.faint,marginTop:"3px"}},_NXtr(it.sub)):null);}));};
var _NXbars=function(items,maxV,h){var hh=h||120;return i("div",{style:{display:"flex",alignItems:"flex-end",gap:items.length>40?"1px":(items.length>20?"3px":"5px"),height:hh+"px",borderBottom:"1px solid "+_NXpal.line,paddingBottom:"1px"}},items.map(function(it,k){var pct=maxV>0?Math.max(2,it.v/maxV*100):2;return i("div",{key:k,title:_NXtr(it.title),style:{flex:1,height:pct+"%",borderRadius:"3px 3px 1px 1px",background:it.v>0?(it.hi?_NXpal.acc:"linear-gradient(180deg,#dededf,#46464c)"):_NXpal.raise,transition:"height .35s ease"}});}));};
var _NXaxis=function(ticks){return i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"9px",fontFamily:_NXf.mono,fontSize:"10px",color:_NXpal.dim}},ticks.map(function(t,k){return i("span",{key:k},_NXtr(t));}));};
var _NXrank=function(rank,name,val,max,total,k){var pct=max>0?Math.max(3,val/max*100):0;var share=total>0?Math.round(val/total*100):0;return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"15px",padding:"12px 0",borderTop:rank>1?"1px solid "+_NXpal.line:"none"}},i("div",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:_NXpal.faint,width:"18px",flexShrink:0}},(rank<10?"0":"")+_NXtr(rank)),i("div",{style:{flex:1,minWidth:0}},i("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"7px",gap:"10px"}},i("span",{style:{fontSize:"13px",color:_NXpal.txt,fontWeight:"600",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(name)),i("span",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:_NXpal.sub,flexShrink:0}},_NXn(val)+(share?"  ·  "+_NXtr(share)+"%":""))),i("div",{style:{height:"4px",background:_NXpal.line,borderRadius:"99px",overflow:"hidden"}},i("div",{style:{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#42424a,#e8e8ea)",borderRadius:"99px",transition:"width .4s"}}))));};
var _NXinsight=function(k,big,sub){return i("div",{style:{position:"relative",overflow:"hidden",background:"linear-gradient(155deg,#121214,#0c0c0e)",border:"1px solid "+_NXpal.line,borderRadius:"14px",padding:"16px"}},i("div",{style:{position:"absolute",top:0,left:"16px",right:"16px",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)"}}),i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".1em",color:_NXpal.dim,textTransform:"uppercase"}},_NXtr(k)),i("div",{style:{fontFamily:_NXf.disp,fontSize:"19px",fontWeight:"800",color:_NXpal.txt,marginTop:"10px",letterSpacing:"-.02em",lineHeight:1.1}},_NXtr(big)),sub?i("div",{style:{fontSize:"11px",color:_NXpal.dim,marginTop:"5px"}},_NXtr(sub)):null);};
var _NXtabs=function(tabs,active,set){return i("div",{style:{display:"flex",gap:"4px",background:_NXpal.inset,border:"1px solid "+_NXpal.line,borderRadius:"12px",padding:"4px",marginBottom:"16px"}},tabs.map(function(t,k){var on=active===t.id;return i("div",{key:k,onClick:function(){set(t.id);},style:{flex:1,textAlign:"center",padding:"9px 6px",borderRadius:"9px",fontSize:"12px",fontWeight:"700",cursor:"pointer",letterSpacing:".01em",color:on?_NXpal.ink:_NXpal.sub,background:on?_NXpal.acc:"transparent",boxShadow:on?"0 1px 10px rgba(0,0,0,.45)":"none",transition:"all .18s"}},_NXtr(t.label));}));};
var _NXpill=function(label,on,onClick){label=_NXtr(label);return i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:onClick,style:{padding:"5px 13px",borderRadius:"8px",fontFamily:_NXf.mono,fontSize:"11px",fontWeight:"600",cursor:"pointer",color:on?_NXpal.ink:_NXpal.sub,background:on?_NXpal.acc:_NXpal.inset,border:"1px solid "+(on?_NXpal.acc:_NXpal.line),transition:"all .15s"}},_NXtr(label));};
var _NXtoggle=function(on,onClick,danger){return i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:onClick,style:{width:"44px",height:"25px",borderRadius:"99px",background:on?(danger?"#7a2b2b":_NXpal.acc):_NXpal.line,border:"1px solid "+(on?(danger?"#9a3a3a":_NXpal.acc):_NXpal.edge),position:"relative",cursor:"pointer",transition:"all .2s",flexShrink:0}},i("div",{style:{position:"absolute",top:"2px",left:on?"21px":"2px",width:"19px",height:"19px",borderRadius:"50%",background:on?_NXpal.ink:_NXpal.soft,transition:"left .2s"}}));};
var _NXico=function(path){return i("div",{style:{width:"32px",height:"32px",borderRadius:"9px",background:_NXpal.inset,border:"1px solid "+_NXpal.line,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:_NXpal.sub}},i("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:16,height:16},i("path",{d:path})));};
var _NXctrl=function(iconPath,label,desc,on,onClick,danger,last){label=_NXtr(label);desc=_NXtr(desc);return i("div",{style:{display:"flex",alignItems:"center",gap:"14px",padding:"15px 0",borderBottom:last?"none":"1px solid "+_NXpal.line}},_NXico(iconPath),i("div",{style:{flex:1}},i("div",{style:{fontSize:"14px",fontWeight:"600",color:_NXpal.txt}},_NXtr(label)),i("div",{style:{fontSize:"12px",color:_NXpal.sub,marginTop:"3px",lineHeight:1.45}},_NXtr(desc))),_NXtoggle(on,onClick,danger));};
var _NXbtn=function(label,onClick,tone){label=_NXtr(label);var c=tone==="danger"?{bg:"linear-gradient(160deg,#1a0d0d,#120909)",bd:"#2c1414",fg:_NXpal.dangerSoft}:{bg:"linear-gradient(160deg,#151517,#0e0e10)",bd:_NXpal.line,fg:_NXpal.pale};return i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:onClick,style:{flex:1,textAlign:"center",padding:"12px",borderRadius:"12px",background:c.bg,border:"1px solid "+c.bd,color:c.fg,fontSize:"12px",fontWeight:"700",cursor:"pointer",letterSpacing:".01em",boxShadow:"0 1px 0 rgba(255,255,255,.04) inset"}},_NXtr(label));};
var _NXmounted=function(F){var st=F.useState(false);
F.useEffect(function(){var t=setTimeout(function(){st[1](true);},40);return function(){try{clearTimeout(t);}catch(_){}};},[]);
return st[0];};
var _NXring=function(pct,col,size,gros,petit){
var p=pct<0?0:(pct>100?100:pct);
var r=size/2-5;
var c=2*Math.PI*r;
var off=c*(1-p/100);
return i("div",{style:{position:"relative",width:size+"px",height:size+"px",flexShrink:0}},
i("svg",{width:size,height:size,viewBox:"0 0 "+size+" "+size,style:{transform:"rotate(-90deg)",display:"block"},"aria-hidden":"true"},
i("circle",{cx:size/2,cy:size/2,r:r,fill:"none",stroke:_NXpal.line,"stroke-width":"4"}),
i("circle",{"data-nx-ring":"1",cx:size/2,cy:size/2,r:r,fill:"none",stroke:col,"stroke-width":"4","stroke-linecap":"round",
"stroke-dasharray":c.toFixed(1),"stroke-dashoffset":off.toFixed(1)})),
i("div",{style:{position:"absolute",left:0,top:0,right:0,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:Math.round(size*0.27)+"px",fontWeight:"800",color:col,letterSpacing:"-.045em",lineHeight:1}},_NXtr(gros)),
petit?i("div",{style:{fontSize:"8.5px",color:_NXpal.faint,marginTop:"4px",letterSpacing:".12em",textTransform:"uppercase",fontWeight:"800"}},_NXtr(petit)):null));};
var _NXcount=function(F,cible,duree){
var c=(typeof cible==="number"&&isFinite(cible))?Math.round(cible):0;
var vif=function(){try{return !!(window._NXMO&&_NXMO.actif());}catch(_){return false;}};
var st=F.useState(function(){return vif()?0:c;});var v=st[0],set=st[1];
F.useEffect(function(){var actif=true;
if(!vif()||c<=0){set(c);return;}
var d=duree||820,t0=0;
var pas=function(t){if(!actif)return;if(!t0)t0=t;
var p=(t-t0)/d;if(p>=1){set(c);return;}
set(Math.round(c*(1-Math.pow(1-p,3))));
try{requestAnimationFrame(pas);}catch(_){set(c);}};
try{requestAnimationFrame(pas);}catch(_){set(c);}
var secours=setTimeout(function(){if(actif)set(c);},(duree||820)+600);
return function(){actif=false;try{clearTimeout(secours);}catch(_){}};},[c]);
return v;};
var _NXton=function(pct){try{var p=+pct||0;
return p>=80?_NXpal.ok:(p>=50?_NXpal.warn:_NXpal.danger);}catch(_){return _NXpal.txt;}};
var _NXteinte=function(col,a){try{var h=String(col||"").replace("#","");
if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
if(h.length!==6)return "transparent";
var n=parseInt(h,16);
return "rgba("+((n>>16)&255)+","+((n>>8)&255)+","+(n&255)+","+((a===undefined?12:a)/100)+")";}catch(_){return "transparent";}};
var _NXscan=function(col){return i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden",pointerEvents:"none",borderRadius:"inherit"}},
i("div",{"data-nx-scan":"1",style:{position:"absolute",top:0,bottom:0,width:"22%",
background:"linear-gradient(90deg,transparent,"+(col||"rgba(255,255,255,.055)")+",transparent)"}}));};
var _NXneuf=function(){return i("span",{"data-nx-shine":"1",style:{display:"inline-block",fontSize:"8.5px",fontWeight:"900",letterSpacing:".13em",
textTransform:"uppercase",padding:"3px 7px",borderRadius:"99px",color:_NXpal.ink,verticalAlign:"middle",
background:"linear-gradient(100deg,"+_NXpal.acc+","+_NXpal.mid+","+_NXpal.acc+")"}},_NXtr("Nouveau"));};
var _NXbigNum=function(v,col){return i("div",{key:"n"+v,"data-nx-pop":"1",style:{fontFamily:_NXf.disp,fontSize:"25px",fontWeight:"800",
color:col||_NXpal.txt,letterSpacing:"-.04em",lineHeight:1}},_NXtr(v));};
var _NXfoot=function(t){return i("div",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:_NXpal.faint,textAlign:"center",marginTop:"20px",letterSpacing:".02em"}},_NXtr(t));};var _NXS=window._NXS||(window._NXS={});
