var NexiumVocalIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("pouls",z):null;};
function NexiumVocalComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t=F.useState("direct");var tab=_t[0];var setTab=_t[1];
var _av=F.useState("");var avis=_av[0];var setAvis=_av[1];
var _dg=F.useState(null);var diag=_dg[0];var setDiag=_dg[1];
var _vi=F.useState(false);var voisIp=_vi[0];var setVoisIp=_vi[1];

F.useEffect(function(){
var maj=function(){force();};
if(window._NXLIVE)_NXLIVE._ecoute.push(maj);
if(window._NXBEST)_NXBEST._ecoute.push(maj);
var iv=setInterval(function(){try{if(window._NXLIVE)_NXLIVE.veille();}catch(_){}},2000);
return function(){try{
clearInterval(iv);
if(window._NXLIVE)_NXLIVE._ecoute=_NXLIVE._ecoute.filter(function(f){return f!==maj;});
if(window._NXBEST)_NXBEST._ecoute=_NXBEST._ecoute.filter(function(f){return f!==maj;});}catch(_){}};},[]);

var P=_NXpal;
var L=window._NXLIVE||null;
var B=window._NXBEST||null;
var an=_NXFX.anime();

function dis(t){try{setAvis(String(t||""));setTimeout(function(){try{setAvis("");}catch(_){}},4500);}catch(_){}}
// Le pont de Discord, pas l API web : Electron refuse la permission
// presse-papier, et l appel restait en attente sans jamais lever.
function copie(t,quoi){try{
var r=_NXpresse(t);
var fin=function(ok){dis(ok?(quoi+" "+_T("copie.")):_T("La copie a echoue sur ce client."));};
if(r&&typeof r.then==="function")r.then(fin);else fin(r);}catch(_){dis(_T("La copie a echoue sur ce client."));}}

if(!L)return i(Kr,null,i("div",{style:{maxWidth:"880px",margin:"0 auto"}},
_NXhead(_T("Vocal"),_NXtr("Nexium Vocal"),_T("Ce que Discord sait de ton appel et ne montre pas.")),
_NXcard(i("div",{style:{fontSize:"12.5px",color:P.warn,lineHeight:1.6}},
_T("Le module vocal n a pas demarre sur ce client.")),{mb:0})));

var v=L.lit();
var CSS=".nxv-anim .nxv-bar{animation:nxvOnde 1.1s ease-in-out infinite}"+
"@keyframes nxvOnde{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}"+
".nxv-anim .nxv-pouls{animation:nxvPouls 2.2s ease-out infinite}"+
"@keyframes nxvPouls{0%{box-shadow:0 0 0 0 "+_NXteinte(P.ok,45)+"}100%{box-shadow:0 0 0 14px "+_NXteinte(P.ok,0)+"}}"+
".nxv-anim .nxv-parle{animation:nxvParle 1.2s ease-in-out infinite}"+
"@keyframes nxvParle{0%,100%{box-shadow:0 0 0 2px "+_NXteinte(P.ok,70)+"}50%{box-shadow:0 0 0 4px "+_NXteinte(P.ok,30)+"}}"+
".nxv-tuile{transition:transform .25s cubic-bezier(.22,1,.36,1),border-color .25s ease}"+
".nxv-anim .nxv-tuile:hover{transform:translateY(-3px)}"+
"@media (prefers-reduced-motion:reduce){.nxv-bar,.nxv-pouls,.nxv-parle{animation:none!important}}";

// Une valeur lue, ou l aveu qu on ne l a pas. Jamais d invention.
function absent(x){return x===null||x===undefined||x==="";}
function ligne(label,valeur,note,copiable){
var vide=absent(valeur);
return i("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid "+P.hair}},
i("div",{style:{width:"180px",flex:"0 0 auto",fontSize:"12.5px",color:P.sub}},_NXtr(label)),
i("div",{style:{flex:1,minWidth:0,fontSize:"13px",fontFamily:vide?"inherit":_NXf.mono,color:vide?P.dim:P.txt,
fontStyle:vide?"italic":"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},
vide?_T("introuvable"):_NXtr(String(valeur))),
note?i("div",{style:{fontSize:"11.5px",color:P.dim,flex:"0 0 auto"}},_NXtr(note)):null,
(!vide&&copiable)?_NXFX.bouton({t:_T("Copier"),petit:true,creux:true,col:P.sub,onClick:function(){copie(String(valeur),label);}}):null);}
function puce(txt,coul,point){
return i("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"5px 11px",borderRadius:"999px",
border:"1px solid "+_NXteinte(coul,32),background:_NXteinte(coul,11),fontSize:"11.5px",fontWeight:"700",color:P.pale}},
point?i("span",{className:point==="pouls"?"nxv-pouls":"",style:{width:"7px",height:"7px",borderRadius:"50%",background:coul}}):null,_NXtr(txt));}
function vide(icone,titre,sous){
return i("div",{style:{textAlign:"center",padding:"30px 18px"}},
i("div",{style:{display:"flex",justifyContent:"center",marginBottom:"13px",opacity:.85}},_NXFX.blason(icone,P.dim,58)),
i("div",{style:{fontSize:"14px",fontWeight:"700",color:P.pale}},_NXtr(titre)),
i("div",{style:{fontSize:"12.5px",color:P.dim,marginTop:"6px",lineHeight:1.6,maxWidth:"380px",margin:"6px auto 0"}},_NXtr(sous)));}
function quand(t){try{
if(!t)return "";
var e=Math.round((Date.now()-t)/60000);
if(e<1)return _T("a l instant");
if(e<60)return _T("il y a")+" "+e+" min";
if(e<1440)return _T("il y a")+" "+Math.round(e/60)+" h";
return _T("il y a")+" "+Math.round(e/1440)+" j";}catch(_){return "";}}
function nomDe(id){var n=id;try{if(B&&B.pseudo)n=B.pseudo(id)||id;}catch(_){}return String(n);}
function couleurPing(p){return (typeof p!=="number")?P.dim:(p<60?P.ok:(p<140?P.warn:P.danger));}
function couleurPerte(p){var x=parseFloat(p);return !isFinite(x)?P.dim:(x<1?P.ok:(x<4?P.warn:P.danger));}

// ---------------------------------------------------------------- le pupitre
function onde(actif,col){
return i("div",{"aria-hidden":"true",style:{display:"flex",alignItems:"center",gap:"4px",height:"46px"}},
[0.55,0.9,0.4,1,0.7,0.5,0.85,0.35,0.95,0.6,0.45,0.8].map(function(h,k){
return i("span",{key:k,className:(actif&&an)?"nxv-bar":"",style:{display:"block",width:"4px",height:Math.round(46*h)+"px",
borderRadius:"3px",background:actif?col:_NXteinte(P.txt,12),transformOrigin:"center",
animationDelay:(k*0.08)+"s",opacity:actif?1:.6}});}));}
function pupitre(){
var ch=v.chiffrement;
var qual=(typeof v.qualite==="number")?Math.round(v.qualite*100):null;
var pc=couleurPing(v.ping);
var dureeS=L.dureeSession();
return i("div",{style:{position:"relative",overflow:"hidden",borderRadius:"26px",padding:"26px 26px 22px",marginBottom:"16px",
border:"1px solid "+_NXteinte(v.enAppel?P.ok:P.line,v.enAppel?30:100),
background:"linear-gradient(150deg,"+_NXteinte(v.enAppel?P.ok:P.info,9)+","+P.panel+" 55%,"+P.bg+")"}},
i("div",{"aria-hidden":"true",style:{position:"absolute",right:"-90px",top:"-110px",width:"320px",height:"320px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(v.enAppel?P.ok:P.info,16)+",transparent 68%)",pointerEvents:"none"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"22px",flexWrap:"wrap"}},
i("div",{style:{flex:"1 1 280px",minWidth:"240px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}},
v.enAppel?_NXtr(puce(_T("en appel"),P.ok,"pouls")):_NXtr(puce(_T("hors appel"),P.dim,true)),
(ch&&ch.bout)?_NXtr(puce(_T("chiffre de bout en bout")+" · "+ch.texte,P.mauve,false)):
(ch&&ch.mode)?_NXtr(puce(_T("transport chiffre")+" · "+ch.mode,P.info,false)):null,
(v.enAppel&&v.serveurIp)?_NXtr(puce(v.serveurIp+(v.serveurPort?(":"+v.serveurPort):""),P.cyan,false)):null),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"30px",fontWeight:"800",color:P.txt,letterSpacing:"-.035em",marginTop:"14px",lineHeight:1.1}},
v.enAppel?((v.salonInfo&&v.salonInfo.nom)?_NXtr(v.salonInfo.nom):_T("Appel en cours")):_T("Tu n es dans aucun vocal")),
i("div",{style:{fontSize:"12.5px",color:P.sub,marginTop:"7px",lineHeight:1.6}},
v.enAppel?_NXtr([(v.salonInfo&&v.salonInfo.serveur)?v.salonInfo.serveur:null,(v.site&&v.site.ville)?v.site.ville:null,v.hote,v.region].filter(function(x){return !!x;}).join(" · ")):
_T("Rejoins-en un et cette page se remplit toute seule : serveur, latence, codec, debit, qui parle."))),
_NXtr(onde(v.enAppel,pc))),
v.enAppel?i("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:"10px",marginTop:"22px"}},
[[_T("Latence"),(typeof v.ping==="number")?(v.ping+" ms"):null,pc],
[_T("Qualite"),qual!==null?(qual+" %"):null,qual===null?P.dim:(qual>=80?P.ok:(qual>=50?P.warn:P.danger))],
[_T("Duree"),dureeS?L.mmss(dureeS):null,P.mauve],
[_T("Personnes"),String(v.gens.length),P.info]].map(function(x,k){
return i("div",{key:k,className:"nxv-tuile",style:{padding:"13px 14px",borderRadius:"15px",background:_NXteinte(P.bg,55),border:"1px solid "+P.line}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:P.dim}},_NXtr(x[0])),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"22px",fontWeight:"800",color:absent(x[1])?P.dim:x[2],marginTop:"6px",fontVariantNumeric:"tabular-nums"}},
absent(x[1])?"—":_NXtr(x[1])));})):null);}

// ------------------------------------------------------------- les courbes
function barres(valeurs,haut,seuil,col,colChaud){
if(valeurs.length<2)return i("div",{style:{fontSize:"12px",color:P.dim,fontStyle:"italic",padding:"12px 0"}},_T("la courbe se remplit pendant l appel"));
var mx=0;for(var a=0;a<valeurs.length;a++)if(valeurs[a]>mx)mx=valeurs[a];
var h=Math.max(haut,(mx||haut)*1.15);
return i("div",{style:{position:"relative",height:"70px",display:"flex",alignItems:"flex-end",gap:"2px"}},
(seuil&&seuil<h)?i("div",{style:{position:"absolute",left:0,right:0,bottom:(seuil/h*70)+"px",height:"1px",background:_NXteinte(P.warn,55)}}):null,
valeurs.map(function(x,k){var chaud=seuil&&x>seuil;
return i("div",{key:k,style:{flex:1,minWidth:"2px",height:Math.max(2,Math.round(x/h*70))+"px",borderRadius:"3px 3px 1px 1px",
background:"linear-gradient(180deg,"+(chaud?colChaud:col)+","+_NXteinte(chaud?colChaud:col,35)+")",
transition:an?"height .4s ease":"none"}});}));}
function courbes(){
var Pg=L.pings||[],bo=L.bornesPing(),HD=L.histoDebit||[];
var db=v.debits||{};
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"12px",marginBottom:"12px"}},
_NXcard(i("div",null,
_NXch(_T("La latence, dans le temps"),_NXtr(Pg.length)+" "+_T("releve(s)")+" · "+_T("le trait est ton seuil d alerte")),
_NXtr(barres(Pg.map(function(p){return p.v;}),60,L.cfg.seuilPing,P.ok,P.warn)),
i("div",{style:{display:"flex",gap:"20px",marginTop:"12px",flexWrap:"wrap"}},
[[_T("moyenne"),L.moyennePing()],[_T("mini"),bo.min],[_T("maxi"),bo.max]].map(function(p2,k){
return i("div",{key:k},
i("div",{style:{fontSize:"15px",fontWeight:"800",color:P.txt,fontFamily:_NXf.mono}},absent(p2[1])?"—":(_NXtr(p2[1])+_NXtr(" ms"))),
i("div",{style:{fontSize:"10.5px",color:P.dim}},_NXtr(p2[0])));}))),{mb:0}),
_NXcard(i("div",null,
_NXch(_T("Le debit, mesure"),_T("Calcule entre deux releves des compteurs d octets du moteur.")),
_NXtr(barres(HD.map(function(p){return p.e+p.s;}),64,0,P.info,P.info)),
i("div",{style:{display:"flex",gap:"20px",marginTop:"12px",flexWrap:"wrap"}},
[[_T("entrant"),db.entrant],[_T("sortant"),db.sortant]].map(function(p2,k){
return i("div",{key:k},
i("div",{style:{fontSize:"15px",fontWeight:"800",color:P.txt,fontFamily:_NXf.mono}},absent(p2[1])?"—":(_NXtr(p2[1])+_NXtr(" kb/s"))),
i("div",{style:{fontSize:"10.5px",color:P.dim}},_NXtr(p2[0])));}))),{mb:0}));}

// ------------------------------------------------------------- sur le fil
function fil(){
var pq=v.paquets||{};
var T2=[[_T("Codec"),v.codec,P.info,"code"],
[_T("Gigue"),absent(v.gigue)?null:(v.gigue+(typeof v.gigue==="number"?" ms":"")),P.cyan||P.info,"pouls"],
[_T("Perte entrante"),absent(v.perte)?null:(String(v.perte)+(String(v.perte).indexOf("%")<0?" %":"")),couleurPerte(v.perte),"telecharge"],
[_T("Perte sortante"),(typeof v.perteSortante==="number")?(Math.round(v.perteSortante*10)/10+" %"):null,couleurPerte(v.perteSortante),"televerse"],
[_T("Paquets recus"),absent(pq.recus)?null:String(pq.recus),P.ok,"telecharge"],
[_T("Paquets envoyes"),absent(pq.envoyes)?null:String(pq.envoyes),P.ok,"televerse"],
[_T("Paquets perdus"),absent(pq.perdus)?null:String(pq.perdus),pq.perdus?P.warn:P.ok,"alerte"],
[_T("Debit du salon"),(v.salonInfo&&v.salonInfo.debit)?(Math.round(v.salonInfo.debit/1000)+" kb/s"):null,P.mauve,"reseau"]];
return _NXcard(i("div",null,
_NXch(_T("Sur le fil"),_T("Lu dans les statistiques du moteur de Discord. Un champ absent est marque absent.")),
v.statsLues?null:i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6,marginBottom:"12px",fontStyle:"italic"}},
_T("Le moteur n a pas encore rendu ses statistiques. Les cases ci-dessous resteront vides tant qu il ne repond pas.")),
_NXtr(grilleInfo(T2))),{mb:12});}
function grilleInfo(T2){
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"9px"}},
T2.map(function(x,k){var vide2=absent(x[1]);
return i("div",{key:k,className:"nxv-tuile",style:{padding:"13px",borderRadius:"14px",background:P.inset,border:"1px solid "+P.line,opacity:vide2?.62:1}},
i("div",{style:{display:"flex",alignItems:"center",gap:"7px",color:vide2?P.faint:x[2]}},_NXFX.svg(x[3],13),
i("span",{style:{fontSize:"10.5px",fontWeight:"700",color:P.dim}},_NXtr(x[0]))),
i("div",{title:vide2?"":_NXtr(String(x[1])),style:{fontSize:"15px",fontWeight:"800",color:vide2?P.dim:P.txt,fontFamily:_NXf.mono,marginTop:"8px",
fontStyle:vide2?"italic":"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},vide2?_T("introuvable"):_NXtr(String(x[1]))));}));}

// ------------------------------------------------------------- la connexion
// L adresse ou partent vraiment les paquets : celle que le serveur vocal
// annonce lui-meme au client. Le DNS ne sert plus que de dernier recours, et
// il est presente comme tel.
function connexion(){
var c=v.connexion||{};
var ipS=v.serveurIp;
var dns=(!ipS&&L.ip)?L.ip:null;
var cible=ipS?(ipS+(v.serveurPort?(":"+v.serveurPort):"")):dns;
var etiquette=ipS?(v.sourceIp==="serveur"?_T("annoncee par le serveur vocal, exacte"):_T("lue dans la connexion de Discord"))
:(dns?_T("resolue par DNS : peut differer du serveur media"):null);
var colE=ipS?P.ok:(dns?P.warn:P.dim);
var dave=(typeof c.dave==="number")?c.dave:null;
var T3=[[_T("Port UDP du serveur"),v.serveurPort?String(v.serveurPort):null,P.info,"reseau"],
[_T("Port de signalisation"),c.portSignal?(c.portSignal+" · wss"):null,P.info,"lien"],
[_T("Transport"),c.protocole?String(c.protocole).toUpperCase():null,P.info,"envoi"],
[_T("Chiffrement du transport"),c.mode,P.mauve,"cadenas"],
[_T("Bout en bout"),dave===null?null:(dave>0?("DAVE v"+dave):_T("non negocie")),dave>0?P.ok:P.warn,"cle"],
[_T("Codec audio"),c.codecAudio||v.codec,P.cyan,"micro"],
[_T("Codec video"),c.codecVideo,P.cyan,"image"],
[_T("Ton flux (SSRC)"),(typeof c.ssrc==="number")?String(c.ssrc):null,P.sub,"pouls"],
[_T("Battement"),c.battement?((Math.round(c.battement/100)/10)+" s"):null,P.sub,"horloge"],
[_T("Protocole vocal"),c.version?("v"+c.version):null,P.sub,"code"]];
return _NXcard(i("div",null,
_NXch(_T("La connexion, lue a la source"),_T("Ce que le serveur vocal annonce lui-meme a ton client quand l appel s ouvre.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap",padding:"16px 18px",borderRadius:"16px",marginBottom:"14px",
background:"linear-gradient(135deg,"+_NXteinte(colE,10)+","+P.inset+")",border:"1px solid "+_NXteinte(colE,28)}},
i("div",{style:{color:colE,display:"flex"}},_NXFX.svg("globe",28)),
i("div",{style:{flex:1,minWidth:"200px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:P.dim}},_T("Serveur media")),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"21px",fontWeight:"800",color:cible?P.txt:P.dim,marginTop:"4px",
fontStyle:cible?"normal":"italic",wordBreak:"break-all"}},_NXtr(cible)||_T("introuvable")),
etiquette?i("div",{style:{fontSize:"11.5px",color:colE,marginTop:"4px",fontWeight:"700"}},_NXtr(etiquette)):null),
cible?_NXFX.bouton({t:_T("Copier"),icone:"copie",petit:true,creux:true,col:P.sub,onClick:function(){copie(cible,_T("L adresse"));}}):null),
!ipS?i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,marginBottom:"12px"}},
_T("Le serveur vocal annonce son adresse au tout debut de l appel. Si Nexium a demarre apres, quitte le salon et reviens : elle apparaitra ici, exacte.")):null,
_NXtr(grilleInfo(T3)),
i("div",{style:{marginTop:"6px"}},
_NXtr(ligne(_T("Nom du serveur"),v.hote,null,true)),
_NXtr(ligne(_T("Site"),v.site?(v.site.code+(v.site.ville?" · "+v.site.ville:"")):null,v.site?_T("d apres le nom du serveur"):null)),
v.region?_NXtr(ligne(_T("Region"),v.region)):null,
_NXtr(ligne(_T("Etat de la connexion"),v.etat)),
(v.flux&&v.flux.length)?_NXtr(ligne(_T("Partages d ecran"),v.flux.map(function(f){return f.ip?(f.ip+(f.port?":"+f.port:"")):f.hote;}).join(", "))):null),
i("div",{style:{marginTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXFX.bouton({t:_T("Copier le rapport"),icone:"copie",petit:true,creux:true,col:P.sub,onClick:function(){copie(L.rapport(),_T("Le rapport"));}}),
!ipS?_NXFX.bouton({t:L.ip?_T("Resoudre a nouveau"):_T("Resoudre par DNS"),icone:"globe",petit:true,creux:true,col:P.info,onClick:function(){
if(!v.hote){dis(_T("Aucun nom de serveur a resoudre pour l instant."));return;}
dis(_T("Resolution en cours..."));
L.resoutIP(v.hote).then(function(ip){dis(ip?(_T("Adresse")+" : "+ip):"");});}}):null,
(!ipS&&L.ip)?_NXFX.bouton({t:_T("Oublier"),petit:true,creux:true,col:P.sub,onClick:function(){L.oublieIP();dis(_T("Adresse oubliee."));}}):null),
(!ipS&&L.ipErreur)?i("div",{style:{marginTop:"11px",fontSize:"12.5px",color:P.warn}},_NXtr(L.ipErreur)):null,
i("div",{style:{marginTop:"14px",fontSize:"12px",color:P.dim,lineHeight:1.7}},
_T("Pourquoi l adresse change : Discord attribue un serveur media a chaque appel, et peut en changer en cours de route si la region bouge ou si la connexion se retablit. Dans un meme appel, elle ne bouge pas."))),{mb:12});}

// ------------------------------------------------------------- toi
function masque(ip){return String(ip).indexOf(":")>=0?"\u2022\u2022\u2022\u2022:\u2022\u2022\u2022\u2022:\u2022\u2022\u2022\u2022:\u2022\u2022\u2022\u2022":"\u2022\u2022\u2022.\u2022\u2022\u2022.\u2022\u2022\u2022.\u2022\u2022\u2022";}
function toi(){
var t=v.toi;
var lu=!!(t&&t.ip);
return _NXcard(i("div",null,
_NXch(_T("Ce que Discord voit de toi"),_T("L adresse que ton client annonce au serveur vocal pour recevoir le son.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}},
i("div",{style:{color:lu?P.warn:P.faint,display:"flex"}},_NXFX.svg(voisIp?"oeil":"oeilBarre",22)),
i("div",{style:{flex:1,minWidth:"200px",fontFamily:_NXf.mono,fontSize:"17px",fontWeight:"800",color:lu?P.txt:P.dim,
fontStyle:lu?"normal":"italic"}},
lu?(voisIp?(_NXtr(t.ip)+(t.port?(":"+_NXtr(t.port)):"")):_NXtr(masque(t.ip))):_T("introuvable")),
lu?_NXFX.bouton({t:voisIp?_T("Masquer"):_T("Afficher"),petit:true,creux:true,col:P.sub,onClick:function(){setVoisIp(!voisIp);}}):null),
i("div",{style:{marginTop:"12px",fontSize:"12px",color:P.sub,lineHeight:1.7}},
_T("Seuls les serveurs de Discord la recoivent : le son passe par eux, les autres membres du salon ne la voient pas. Un VPN la remplace par la sienne. Nexium ne l enregistre nulle part et ne la met jamais dans le rapport."))),{mb:12});}

// ------------------------------------------------------------- le salon
function salon(){
var parle=L.parlent(v.gens.map(function(g){return g.id;}));
var pp=v.personnes||{};
var si=v.salonInfo||{};
return _NXcard(i("div",null,
_NXch(_T("Dans le salon"),_NXtr(v.gens.length)+" "+_T("connecte(s)")+(si.limite?(" · "+_T("limite")+" "+_NXtr(si.limite)):"")+
(si.region?(" · "+_T("region forcee")+" "+_NXtr(si.region)):" · "+_T("region automatique"))),
v.gens.length===0?i("div",{style:{fontSize:"12.5px",color:P.dim,padding:"10px 0"}},_T("personne")):
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:"8px"}},
v.gens.map(function(g,k){
var enParle=parle.indexOf(g.id)>=0;
var q=pp[g.id];
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"11px",padding:"10px 12px",borderRadius:"13px",
background:enParle?_NXteinte(P.ok,7):P.inset,border:"1px solid "+(enParle?_NXteinte(P.ok,36):P.line)}},
i("div",{className:enParle?"nxv-parle":"",style:{width:"30px",height:"30px",borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
background:_NXteinte(enParle?P.ok:P.txt,enParle?20:8),color:enParle?P.ok:P.sub,fontSize:"12px",fontWeight:"800"}},
_NXtr(nomDe(g.id).charAt(0).toUpperCase())),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(nomDe(g.id))),
i("div",{style:{fontSize:"10.5px",color:P.dim,marginTop:"2px"}},
enParle?_T("parle"):(q&&q.perte!==null?(_T("reception")+" "+(100-q.perte)+" %"):_T("silencieux")))),
i("div",{style:{display:"flex",gap:"5px",color:P.faint}},
g.mute?i("span",{title:_T("micro coupe"),style:{display:"flex",color:P.warn}},_NXFX.svg("micro",13)):null,
g.sourd?i("span",{title:_T("sourd"),style:{display:"flex",color:P.danger}},_NXFX.svg("casque",13)):null,
g.video?i("span",{title:_T("camera"),style:{display:"flex",color:P.info}},_NXFX.svg("image",13)):null,
g.flux?i("span",{title:_T("partage"),style:{display:"flex",color:P.mauve}},_NXFX.svg("televerse",13)):null));}))),{mb:12});}

// ------------------------------------------------------------- en direct
function vueDirect(){
if(!v.dispo)return _NXcard(i("div",{style:{fontSize:"12.5px",color:P.warn,lineHeight:1.65}},
_T("Nexium ne trouve pas le module vocal de Discord sur ce client. Rien ne peut etre lu ici, et rien ne sera invente.")),{mb:0});
if(!v.enAppel)return i("div",null,
(L.derniere&&L.derniere.duree)?_NXcard(i("div",null,
_NXch(_T("Le dernier appel"),_T("Garde en memoire, efface au redemarrage.")),
_NXtr(ligne(_T("duree"),L.mmss(L.derniere.duree))),
_NXtr(ligne(_T("serveur"),L.derniere.hote)),
_NXtr(ligne(_T("latence moyenne"),(L.derniere.pingMoyen!==null)?(L.derniere.pingMoyen+" ms"):null))),{mb:12}):null,
_NXcard(vide("pouls",_T("En attente d un appel"),_T("Des que tu rejoins un salon vocal, le pupitre s allume : latence, debit mesure, pertes, chiffrement, qui parle.")),{mb:0}));
return i("div",null,
_NXtr(connexion()),
_NXtr(courbes()),
_NXtr(fil()),
_NXtr(salon()),
_NXtr(toi()));}

// ------------------------------------------------------------- la parole
function vueParole(){
var CL=L.classement();
var total=0,a2;
for(a2=0;a2<CL.length;a2++)total+=CL[a2].secondes;
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Qui a parle, et combien"),_T("Compte pendant l appel, garde en memoire vive.")),
!L.dureeSession()?_NXtr(vide("horloge",_T("Aucun appel en cours"),_T("Le compteur demarre quand tu rejoins un vocal, et rien n est ecrit sur le disque.")))
:(CL.length===0?i("div",{style:{fontSize:"12.5px",color:P.dim,padding:"12px 0"}},_T("personne n a encore parle"))
:i("div",{style:{display:"flex",flexDirection:"column",gap:"9px"}},
CL.map(function(e,k){
var pc=total?Math.round(e.secondes*100/total):0;
var col=k===0?P.mauve:(k===1?P.info:P.sub);
return i("div",{key:k,style:{position:"relative",overflow:"hidden",border:"1px solid "+P.line,borderRadius:"13px",padding:"12px 14px"}},
i("div",{style:{position:"absolute",left:0,top:0,bottom:0,width:pc+"%",
background:"linear-gradient(90deg,"+_NXteinte(col,18)+","+_NXteinte(col,6)+")",transition:an?"width .6s ease":"none"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"10px"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:col,width:"18px"}},_NXtr(String(k+1))),
i("div",{style:{flex:1,minWidth:0,fontSize:"13px",fontWeight:"700",color:P.pale,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(nomDe(e.id))),
i("div",{style:{fontSize:"12.5px",color:P.txt,fontFamily:_NXf.mono}},_NXtr(L.mmss(e.secondes))),
i("div",{style:{fontSize:"11px",color:P.dim,width:"40px",textAlign:"right"}},_NXtr(pc)+" %")));}))),
L.dureeSession()?i("div",{style:{marginTop:"16px",paddingTop:"14px",borderTop:"1px solid "+P.hair,display:"flex",gap:"24px",flexWrap:"wrap"}},
[[_T("appel en cours"),L.mmss(L.dureeSession())],[_T("temps de parole cumule"),L.mmss(total)]].map(function(p2,k){
return i("div",{key:k},
i("div",{style:{fontSize:"16px",fontWeight:"800",color:P.txt,fontFamily:_NXf.mono}},_NXtr(p2[1])),
i("div",{style:{fontSize:"10.5px",color:P.dim}},_NXtr(p2[0])));})):null),{mb:12}),
_NXFX.note({col:P.dim,icone:"cadenas",
texte:_T("Ce compte reste en memoire vive et disparait a la fin de l appel. Il porte sur les autres, pas seulement sur toi : l ecrire sur le disque serait garder une trace de gens qui n ont rien demande.")}));}

// ------------------------------------------------------------- les serveurs
function vueServeurs(){
var SV=L.serveurs();
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Par ou Discord t a fait passer"),_T("Un serveur vocal par ligne, le plus recent en haut.")),
SV.length===0?_NXtr(vide("globe",_T("Aucun serveur connu"),_T("La liste se remplit au fil de tes appels : region, latence moyenne, nombre de fois.")))
:i("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},
SV.map(function(e,k){
var col=couleurPing(e.ping);
return i("div",{key:k,className:"nxv-tuile",style:{display:"flex",alignItems:"center",gap:"12px",
border:"1px solid "+(k===0?_NXteinte(P.ok,28):P.line),background:k===0?_NXteinte(P.ok,6):P.inset,borderRadius:"13px",padding:"12px 14px"}},
i("span",{style:{width:"8px",height:"8px",borderRadius:"50%",flex:"0 0 auto",background:col,boxShadow:"0 0 10px "+_NXteinte(col,50)}}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",color:P.txt,fontFamily:_NXf.mono,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(e.hote)),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"2px"}},(e.ip?_NXtr(e.ip)+" · ":"")+(e.region?_NXtr(e.region)+" · ":"")+_NXtr(quand(e.dernier)))),
i("div",{style:{textAlign:"right",flex:"0 0 auto"}},
i("div",{style:{fontSize:"13px",fontWeight:"800",color:col,fontFamily:_NXf.mono}},(e.ping===null)?"—":(_NXtr(e.ping)+_NXtr(" ms"))),
i("div",{style:{fontSize:"10.5px",color:P.dim}},_NXtr(e.vus)+" "+_T("releve(s)"))),
_NXFX.bouton({t:_T("Copier"),petit:true,creux:true,col:P.sub,onClick:function(){copie(e.hote,_T("Le serveur"));}}));})),
SV.length?i("div",{style:{marginTop:"14px"}},_NXFX.bouton({t:_T("Oublier l historique"),icone:"poubelle",petit:true,creux:true,col:P.danger,
onClick:function(){L.oublieServeurs();dis(_T("Historique efface."));}})):null),{mb:12}),
_NXFX.note({col:P.info,icone:"info",
texte:_T("Discord choisit le serveur a ta place et n en dit rien. Cette liste sert a repondre a une question simple : est-ce que ca hache toujours sur le meme, ou est-ce que c est toi ? Vingt serveurs sont gardes au maximum, sur cette machine seulement.")}));}

// ------------------------------------------------------------- les clips
function vueClips(){
if(!B)return _NXcard(i("div",{style:{fontSize:"12.5px",color:P.warn}},_T("Le module de clips n a pas demarre sur ce client.")),{mb:0});
var e=B.etat();
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Enregistrer le vocal"),_T("Il garde en memoire les dernieres minutes et en decoupe les moments forts.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"14px"}},
_NXtr(puce(e.actif?_T("en cours"):_T("a l arret"),e.actif?P.ok:P.dim,e.actif?"pouls":true)),
e.voie?_NXtr(puce(String(e.voie),P.info,false)):null,
_NXtr(puce(e.moments+" "+_T("moment(s)"),P.mauve,false)),
_NXtr(puce(_T("tampon")+" "+Math.round((e.tampon||0))+" s",P.sub,false))),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
e.actif?_NXFX.bouton({t:_T("Arreter"),icone:"pause",petit:true,col:P.danger,onClick:function(){B.arrete();dis(_T("Enregistrement arrete."));}})
:_NXFX.bouton({t:_T("Demarrer"),icone:"lecture",petit:true,plein:true,col:P.ok,onClick:function(){
dis(_T("Ouverture de la source..."));
B.demarre(true).then(function(ok){dis(ok?_T("Enregistrement en cours."):"");}).catch(function(){dis("");});}}),
_NXFX.bouton({t:_T("Ouvrir le best-of"),icone:"etoile",petit:true,creux:true,col:P.sub,onClick:function(){try{B.carte();}catch(_){dis(_T("Le best-of ne s ouvre pas."));}}}),
_NXFX.bouton({t:_T("Qu est-ce qu il peut entendre ?"),icone:"question",petit:true,creux:true,col:P.sub,onClick:function(){
dis(_T("Examen des sources..."));
B.diagnostic().then(function(d){setDiag(d);dis("");},function(){dis(_T("Examen impossible."));});}})),
e.erreur?i("div",{style:{marginTop:"12px",fontSize:"12.5px",color:P.warn,lineHeight:1.6}},_NXtr(e.erreur)):null),{mb:12}),
diag?_NXcard(i("div",null,
_NXch(_T("Les sources, une par une"),_T("Ce que chacune donnerait maintenant.")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"9px"}},
[["page",diag.page],["bouclage",diag.bouclage],["micro",diag.micro]].map(function(p2,k){
var d=p2[1];if(!d)return null;
var bon=(d.ok!==false)&&(p2[0]!=="page"||d.n>0);
return i("div",{key:k,style:{display:"flex",gap:"11px",alignItems:"flex-start",padding:"11px 13px",border:"1px solid "+P.line,borderRadius:"12px"}},
i("span",{style:{width:"8px",height:"8px",borderRadius:"50%",marginTop:"5px",flex:"0 0 auto",background:bon?P.ok:P.dim}}),
i("div",null,
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_NXtr(d.nom)||_NXtr(p2[0])),
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.6,marginTop:"2px"}},_NXtr(String(d.texte||"")))));}))),{mb:12}):null,
_NXFX.note({col:P.dim,icone:"cadenas",
texte:_T("Nexium ecoute ce que Discord joue dans la page : c est la seule voie qui contient les voix des autres, et elle ne demande aucune permission. Rien n est envoye nulle part : le son reste en memoire vive, le temps du tampon, et disparait a l arret.")}));}

// ------------------------------------------------------------- les reglages
function choix(label,valeur,options,pose){
return i("div",{style:{display:"flex",alignItems:"center",gap:"11px",padding:"11px 0",borderBottom:"1px solid "+P.hair,flexWrap:"wrap"}},
i("div",{style:{flex:1,minWidth:"170px",fontSize:"12.5px",color:P.sub}},_NXtr(label)),
i("div",{style:{display:"flex",gap:"6px"}},
options.map(function(o,k){var on=valeur===o[1];
return _NXpill(_NXtr(o[0]),on,function(){pose(o[1]);});})));}
function qualiteSon(){
var a3=v.audio||{};
function oui(x){return (x===true||x==="true")?_T("oui"):((x===false||x==="false")?_T("non"):null);}
var NP=window._NXP||null;
var krispNon=(a3.krispDispo===false);
var soucis=[];
if(NP&&NP.cfg&&NP.cfg.noVoiceProbe)soucis.push({k:"sondage",t:_T("Le sondage des regions vocales est coupe"),
d:_T("Discord ne peut plus mesurer quel serveur est le plus proche de toi : il peut t envoyer plus loin, avec plus de latence et de pertes."),
f:function(){try{NP.cfg.noVoiceProbe=false;NP.saveCfg();if(NP.appliquerTout)NP.appliquerTout();}catch(_){}}});
if(a3.echo===false)soucis.push({k:"echo",t:_T("L annulation d echo est coupee dans Discord"),
d:_T("Sans elle, ce qui sort de tes haut-parleurs revient dans ton micro. Voix et video, section Traitement de la voix.")});
if(a3.antibruit===false&&!a3.krisp)soucis.push({k:"bruit",t:_T("Aucune reduction de bruit n est active"),
d:_T("Choisis Standard dans Discord, Voix et video, Reduction du bruit : c est celle qui marche dans ce client.")});
return _NXcard(i("div",null,
_NXch(_T("La qualite du son"),_T("Ce qui travaille sur ta voix pendant un appel, lu dans le moteur de Discord.")),
_NXtr(ligne(_T("Krisp"),krispNon?_T("indisponible dans ce client"):(a3.krisp===true?_T("actif"):(a3.krisp===false?_T("coupe"):null)))),
_NXtr(ligne(_T("Reduction de bruit Standard"),oui(a3.antibruit))),
_NXtr(ligne(_T("Annulation d echo"),oui(a3.echo))),
_NXtr(ligne(_T("Gain automatique"),oui(a3.gain))),
_NXFX.note({col:P.info,icone:"info",titre:_T("Pourquoi Krisp reste sur Standard"),
texte:_T("Krisp ne demarre que dans l application signee par Discord : c est une condition de sa licence, verifiee par le module lui-meme, et Nexium ne la contourne pas. Discord utilise alors sa reduction de bruit Standard, qui fonctionne normalement.")}),
soucis.length?i("div",{style:{marginTop:"4px"}},
soucis.map(function(x){return i("div",{key:x.k,style:{display:"flex",gap:"12px",alignItems:"flex-start",padding:"12px 14px",borderRadius:"13px",marginBottom:"8px",
background:_NXteinte(P.warn,8),border:"1px solid "+_NXteinte(P.warn,26)}},
i("div",{style:{color:P.warn,display:"flex",marginTop:"1px"}},_NXFX.svg("alerte",16)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",fontWeight:"800",color:P.txt}},_NXtr(x.t)),
i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"3px",lineHeight:1.55}},_NXtr(x.d))),
x.f?_NXFX.bouton({t:_T("Retablir"),petit:true,col:P.warn,onClick:function(){x.f();dis(_T("Retabli."));}}):null);}))
:i("div",{style:{display:"flex",alignItems:"center",gap:"9px",fontSize:"12px",color:P.ok,padding:"6px 0"}},
_NXFX.svg("check",15),_T("Rien dans Nexium ne pese sur tes appels.")),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"8px",lineHeight:1.6}},
_T("L enregistrement de clips ecoute ton micro sans rien lui appliquer : il ne change plus son niveau dans Windows."))),{mb:12});}
function vueReglages(){
var a3=v.audio;
function oui(x){return (x===true||x==="true")?_T("oui"):((x===false||x==="false")?_T("non"):null);}
return i("div",null,
_NXtr(qualiteSon()),
_NXcard(i("div",null,
_NXch(_T("Ton materiel"),_T("Lu dans le moteur de Discord, pas devine.")),
!a3?i("div",{style:{fontSize:"12.5px",color:P.dim,fontStyle:"italic",padding:"10px 0"}},_T("Les reglages audio de Discord ne sont pas lisibles sur ce client.")):
i("div",null,
_NXtr(ligne(_T("Micro"),a3.nomEntree||a3.entree,null,true)),
_NXtr(ligne(_T("Sortie"),a3.nomSortie||a3.sortie,null,true)),
_NXtr(ligne(_T("Mode de saisie"),a3.modeTexte)),
_NXtr(ligne(_T("Sensibilite"),(typeof a3.seuil==="number")?(a3.seuil+" dB"+(a3.seuilAuto?" · "+_T("automatique"):"")):(a3.seuilAuto?_T("automatique"):null))),
_NXtr(ligne(_T("Volume d entree"),(typeof a3.volEntree==="number")?(Math.round(a3.volEntree)+" %"):null)),
_NXtr(ligne(_T("Volume de sortie"),(typeof a3.volSortie==="number")?(Math.round(a3.volSortie)+" %"):null)),
_NXtr(ligne(_T("Micro coupe"),a3.muet?_T("oui"):_T("non"))),
_NXtr(ligne(_T("Sourd"),a3.sourd?_T("oui"):_T("non"))),
_NXtr(ligne(_T("Reduction de bruit"),oui(a3.antibruit))),
_NXtr(ligne(_T("Annulation d echo"),oui(a3.echo))),
_NXtr(ligne(_T("Gain automatique"),oui(a3.gain)))),
i("div",{style:{marginTop:"13px",fontSize:"12.5px",color:P.sub,lineHeight:1.7}},
_T("Ces reglages se changent dans Discord, section Voix et video. Nexium les lit pour que tu puisses verifier d un coup d oeil ce qui est reellement actif pendant un appel."))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("L alerte qualite"),_T("Elle previent quand ca se degrade vraiment, pas au premier soubresaut.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",marginBottom:"6px"}},
_NXtoggle(L.cfg.alertes,function(){L.set("alertes",!L.cfg.alertes);}),
i("div",{style:{fontSize:"12.5px",color:P.pale}},L.cfg.alertes?_T("Nexium te previendra"):_T("Aucune alerte"))),
_NXtr(choix(_T("Latence au-dela de"),L.cfg.seuilPing,[["100 ms",100],["150 ms",150],["250 ms",250]],function(x){L.set("seuilPing",x);})),
_NXtr(choix(_T("Paquets perdus au-dela de"),L.cfg.seuilPerte,[["1 %",1],["2 %",2],["5 %",5]],function(x){L.set("seuilPerte",x);})),
i("div",{style:{marginTop:"12px",fontSize:"12px",color:P.dim,lineHeight:1.7}},
_T("Il faut que ca dure vingt secondes avant qu une alerte sorte, et il n y en a pas plus d une toutes les deux minutes. Une alerte qui crie pour rien finit ignoree."))),{mb:0}));}

var TABS=[["direct",_T("En direct"),"pouls",""],["parole",_T("Parole"),"micro",""],["serveurs",_T("Serveurs"),"globe",""],
["clips",_T("Clips"),"lecture",""],["reglages",_T("Reglages"),"reglages",""]];
var contenu=tab==="direct"?vueDirect():(tab==="parole"?vueParole():(tab==="serveurs"?vueServeurs():(tab==="clips"?vueClips():vueReglages())));

return i(Kr,null,i("div",{className:an?"nxv-anim":"",style:{maxWidth:"900px",margin:"0 auto"}},
i("style",null,CSS),
_NXhead(_T("Vocal"),_NXtr("Nexium Vocal"),_T("Ce que Discord sait de ton appel et ne montre pas : le serveur qui relaie ta voix, ta latence reelle, le debit mesure, les pertes, le chiffrement, et qui parle.")),
_NXtr(pupitre()),
avis?_NXFX.note({col:P.ok,icone:"check",texte:_NXtr(avis)}):null,
_NXFX.onglets(TABS,tab,setTab,{col:P.ok}),
_NXtr(contenu),
_NXfoot(_NXtr("Nexium Vocal · ")+_T("rien n est invente : un champ absent est marque absent"))));
}
