var _NXOU_CSS=".nxou-tuile{position:relative;cursor:pointer;border-radius:12px;transition:transform .3s cubic-bezier(.34,1.4,.6,1),box-shadow .3s ease,border-color .3s ease;}"+
".nxed-anim .nxou-tuile{animation:nxouRetourne .7s cubic-bezier(.3,1.3,.6,1) both;}"+
"@keyframes nxouRetourne{from{transform:perspective(600px) rotateY(-95deg)}to{transform:perspective(600px) rotateY(0)}}"+
".nxou-tuile:hover{transform:translateY(-4px);}"+
".nxou-tuile.nxou-choisie{transform:translateY(-4px) scale(1.06);}"+
".nxed-anim .nxou-tiroir{animation:nxouTiroir .55s cubic-bezier(.22,1,.36,1) both;}"+
"@keyframes nxouTiroir{from{transform:translateY(-18px);opacity:0}to{transform:none;opacity:1}}"+
".nxou-imprime{position:relative;overflow:hidden;}"+
".nxou-tete{position:absolute;inset:0;pointer-events:none;background:#0d0f0f;transform:translateX(101%);}"+
".nxou-tete::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--acc);box-shadow:0 0 12px var(--acc);}"+
".nxed-anim .nxou-tete{animation:nxouImprime .9s cubic-bezier(.5,0,.3,1) both;}"+
"@keyframes nxouImprime{from{transform:translateX(0)}to{transform:translateX(101%)}}"+
".nxou-coche{stroke-dasharray:30;stroke-dashoffset:30;transition:stroke-dashoffset .45s cubic-bezier(.5,0,.2,1);}"+
".nxou-oui .nxou-coche{stroke-dashoffset:0;}"+
".nxou-tampon{transform:rotate(-12deg);}"+
".nxed-anim .nxou-tampon{animation:nxouTampon .5s cubic-bezier(.3,1.6,.5,1) both;}"+
"@keyframes nxouTampon{0%{transform:rotate(-12deg) scale(2.4);opacity:0}60%{transform:rotate(-12deg) scale(.94);opacity:1}100%{transform:rotate(-12deg) scale(1);opacity:1}}"+
".nxou-point{transition:transform .2s ease;}"+
".nxou-point:hover{transform:translate(-50%,-50%) scale(1.6)!important;}";
function NexiumOutilsComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _c=F.useState({});var coches=_c[0];var setCoches=_c[1];
var _o=F.useState("b64");var outil=_o[0];var setOutil=_o[1];
var _e=F.useState("");var entree=_e[0];var setEntree=_e[1];
var _e2=F.useState("");var entree2=_e2[0];var setEntree2=_e2[1];
var _r=F.useState(null);var sortie=_r[0];var setSortie=_r[1];
var _av=F.useState("");var avis=_av[0];var setAvis=_av[1];
var _f=F.useState("");var filtre=_f[0];var setFiltre=_f[1];
var _n=F.useState(0);var tirage=_n[0];var setTirage=_n[1];

F.useEffect(function(){
try{_NXED.feuille("nx-ou-style",_NXOU_CSS);}catch(_){}
if(!window._NXOUT)return;
var maj=function(){force();};
_NXOUT._ecoute.push(maj);
return function(){try{
_NXOUT._ecoute=_NXOUT._ecoute.filter(function(f){return f!==maj;});}catch(_){}};},[]);

var P=_NXpal,ACC=P.cyan;
var O=window._NXOUT||null;
function dis(t){try{setAvis(String(t||""));setTimeout(function(){try{setAvis("");}catch(_){}},4500);}catch(_){}}
function copie(t,quoi){try{
_NXpresse(t).then(function(ok){dis(ok?(quoi+" copié."):"La copie a échoué sur ce client.");});}catch(_){}}
function entete(droite){
return i("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",marginBottom:"28px"}},
i("div",{style:{maxWidth:"540px"}},
i("div",{style:{fontSize:"12.5px",color:"var(--m)"}},_T("Outils")),
i("div",{style:{fontFamily:"var(--serif)",fontSize:"36px",lineHeight:1.1,marginTop:"4px",color:"var(--c)"}},"Nexium Boîte à outils"),
i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.6,marginTop:"6px"}},
_T("Des outils techniques, sans brides. Ceux qui restent sur la machine n’envoient aucun octet ; ceux qui passent par le réseau le disent avant."))),
droite||null);}

if(!O)return i(Kr,null,_NXED.racine({acc:ACC},entete(),
_NXED.vide(_T("La boîte à outils n’a pas démarré."),_T("Redémarre Discord : elle se charge au lancement."))));

// ------------------------------------------------------------- le contrat
if(!O.ouvert()){
var tous=O.CASES.length,faits=0,k2;
for(k2=0;k2<O.CASES.length;k2++)if(coches[O.CASES[k2].k])faits++;
var pret=faits===tous;
var encre="#1d1a16",papier="#efe8dc";
return i(Kr,null,_NXED.racine({acc:ACC,max:760},entete(),
i("div",{style:{position:"relative",background:papier,color:encre,borderRadius:"6px",padding:"38px 40px 34px",
boxShadow:"0 30px 60px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,0,0,.06)",fontFamily:"var(--serif)"}},
i("div",{style:{fontSize:"12px",letterSpacing:".18em",textTransform:"uppercase",color:"#6b645a",fontFamily:"inherit"}},_T("Avant d’ouvrir")),
i("div",{style:{fontSize:"28px",marginTop:"6px"}},_T("Conditions d’ouverture")),
i("div",{style:{fontSize:"15px",lineHeight:1.7,color:"#3b362f",marginTop:"14px"}},_NXtr(O.PREAMBULE)),
i("div",{style:{marginTop:"22px"}},
O.CASES.map(function(c,k){
var on=!!coches[c.k];
return i("div",{key:k,className:"nx-fx"+(on?" nxou-oui":""),role:"checkbox","aria-checked":on?"true":"false",tabIndex:0,
"aria-label":_NXtr(c.t),onKeyDown:_NXkey,
onClick:function(){var o={},x;for(x in coches)o[x]=coches[x];o[c.k]=!on;setCoches(o);},
style:{display:"flex",gap:"16px",alignItems:"flex-start",cursor:"pointer",padding:"12px 0",borderTop:"1px solid rgba(29,26,22,.14)"}},
i("span",{style:{fontSize:"17px",color:"#8a8275",width:"22px",flex:"0 0 auto"}},(k+1)+"."),
i("span",{style:{flex:1,fontSize:"15px",lineHeight:1.65,color:on?encre:"#4a443b"}},_NXtr(c.t)),
i("svg",{width:28,height:28,viewBox:"0 0 28 28","aria-hidden":"true",style:{flex:"0 0 auto"}},
i("rect",{x:"3",y:"3",width:"22",height:"22",rx:"2",fill:"none",stroke:"#3b362f","stroke-width":"1.4"}),
i("path",{className:"nxou-coche",d:"M7 14 L12 19 L22 7",fill:"none",stroke:"#2c5d9c","stroke-width":"2.6","stroke-linecap":"round","stroke-linejoin":"round"})));})),
i("div",{style:{fontSize:"14px",lineHeight:1.7,color:"#4a443b",marginTop:"18px",paddingTop:"16px",borderTop:"1px solid rgba(29,26,22,.14)"}},_NXtr(O.CLOTURE)),
i("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",marginTop:"26px"}},
i("div",{style:{fontFamily:"inherit"}},
i("div",{style:{width:"220px",borderBottom:"1px solid #3b362f",height:"30px"}}),
i("div",{style:{fontSize:"13px",color:"#6b645a",marginTop:"6px"}},_NXtr(faits)+" / "+_NXtr(tous)+" "+_T("accepte(s)"))),
i("div",{className:"nx-fx"+(pret?" nxed-pouls":""),role:"button","aria-label":pret?"J’accepte, ouvrir les outils":("Coche les "+tous+" engagements"),
tabIndex:0,onKeyDown:_NXkey,onClick:function(){
var L2=[],x;for(x in coches)if(coches[x])L2.push(x);
if(O.accepte(L2))dis("Outils ouverts.");
else dis("Il faut accepter les "+tous+" engagements, un par un.");},
style:{padding:"11px 20px",borderRadius:"99px",cursor:"pointer",fontFamily:"'gg sans','Noto Sans',sans-serif",fontSize:"13px",fontWeight:"600",
background:pret?encre:"transparent",color:pret?papier:"#6b645a",border:"1px solid "+(pret?encre:"rgba(29,26,22,.3)")}},
pret?"J’accepte, ouvrir les outils":("Coche les "+tous+" engagements"))),
pret?i("div",{className:"nxou-tampon","aria-hidden":"true",style:{position:"absolute",left:"150px",bottom:"40px",padding:"8px 16px",
border:"3px solid rgba(178,52,40,.85)",borderRadius:"6px",color:"rgba(178,52,40,.9)",fontFamily:"'gg sans','Noto Sans',sans-serif",
fontWeight:"800",fontSize:"20px",letterSpacing:".14em",textTransform:"uppercase",pointerEvents:"none"}},_T("Accepté")):null),
avis?i("div",{style:{fontSize:"13px",color:P.warn,marginTop:"14px"}},_NXtr(avis)):null,
_NXfoot(_NXtr("Nexium Boîte à outils · réversible à tout moment"))));}

// ------------------------------------------------------------- le tableau
var FAM={dev:{n:"Développement",c:P.cyan},fichier:{n:"Fichiers",c:P.lime},secu:{n:"Sécurité",c:P.rose},reseau:{n:"Réseau",c:P.warn},discord:{n:"Discord",c:P.info}};
var ORDRE=["dev","fichier","secu","reseau","discord"];
var OUTILS=[
{k:"b64",cat:"dev",sym:"B64",n:"Base64",d:"Encoder ou décoder, accents et emoji compris.",
 champs:[{k:"a",n:"Texte",ph:"à encoder ou à décoder",multi:true,mono:true}],
 actions:[["Encoder",function(a){return O.b64(a);}],["Décoder",function(a){return O.deb64(a);}]]},
{k:"url",cat:"dev",sym:"Ur",n:"URL",d:"Encoder ou décoder une adresse.",
 champs:[{k:"a",n:"Texte",ph:"à encoder ou à décoder"}],
 actions:[["Encoder",function(a){return O.urlEnc(a);}],["Décoder",function(a){return O.urlDec(a);}]]},
{k:"hex",cat:"dev",sym:"Hx",n:"Hexadécimal",d:"Passer du texte aux octets, et l’inverse.",
 champs:[{k:"a",n:"Texte",ph:"texte ou hexadécimal",multi:true,mono:true}],
 actions:[["Vers hex",function(a){return O.hex(a);}],["Depuis hex",function(a){return O.dehex(a);}]]},
{k:"json",cat:"dev",sym:"Js",n:"JSON",d:"Reformater, valider, compter les nœuds.",
 champs:[{k:"a",n:"JSON",ph:"{ }",multi:true,mono:true}],
 actions:[["Mettre en forme",function(a){return O.json(a,2);}],["Compacter",function(a){return O.json(a,0);}]]},
{k:"jwt",cat:"dev",sym:"Jw",n:"JWT",d:"Décoder un jeton. Nexium ne vérifie jamais la signature.",
 champs:[{k:"a",n:"Jeton",ph:"eyJhbGciOi…",multi:true,mono:true}],
 actions:[["Décoder",function(a){return O.jwt(a);}]]},
{k:"temps",cat:"dev",sym:"Hd",n:"Horodatage",d:"Unix, millisecondes ou ISO, dans les deux sens.",
 champs:[{k:"a",n:"Valeur",ph:"1700000000 ou 2024-03-01T12:00:00Z"}],
 actions:[["Convertir",function(a){return O.temps(a);}],["Maintenant",function(){return O.temps(String(Date.now()));}]]},
{k:"uuid",cat:"dev",sym:"Uu",n:"UUID",d:"Un identifiant aléatoire, version 4.",
 champs:[],actions:[["Tirer",function(){return {ok:true,v:O.uuid()};}]]},
{k:"diff",cat:"dev",sym:"Df",n:"Comparer",d:"Deux textes, ligne à ligne.",
 champs:[{k:"a",n:"Avant",ph:"",multi:true,mono:true},{k:"b",n:"Après",ph:"",multi:true,mono:true}],
 actions:[["Comparer",function(a,b){return O.diff(a,b);}]]},
{k:"empreinte",cat:"fichier",sym:"Sh",n:"Empreintes",d:"SHA-1, 256, 384 et 512 d’un texte ou d’un fichier.",
 champs:[{k:"a",n:"Texte",ph:"ou choisis un fichier ci-dessous"}],fichier:true,
 actions:[["Calculer",function(a){return {promesse:O.empreintes(a)};}]]},
{k:"labo",cat:"fichier",sym:"Bs",n:"Analyse complète",d:"Ouvre le bac à sable, qui lit le fichier octet par octet.",
 champs:[],actions:[["Ouvrir le bac à sable",function(){
 try{_NXCP.ouvrir("equicord_labo","Nexium Bac a sable");}catch(_){}
 return {ok:true,v:"Bac à sable ouvert."};}]]},
{k:"mdp",cat:"secu",sym:"Mp",n:"Mot de passe",d:"Un tirage sans biais, et le nombre de bits qui va avec.",
 champs:[{k:"a",n:"Longueur",ph:"20"}],
 actions:[["Générer",function(a){return O.motDePasse(parseInt(a,10)||20,{symboles:true});}],
          ["Sans symboles",function(a){return O.motDePasse(parseInt(a,10)||20,{symboles:false});}]]},
{k:"robuste",cat:"secu",sym:"Rb",n:"Robustesse",d:"Combien de bits, et pourquoi.",
 champs:[{k:"a",n:"Mot de passe",ph:""}],
 actions:[["Mesurer",function(a){return O.robustesse(a);}]]},
{k:"cle",cat:"secu",sym:"Cl",n:"Clé aléatoire",d:"Des octets tirés au sort, en hexadécimal ou en base64.",
 champs:[{k:"a",n:"Octets",ph:"32"}],
 actions:[["Hexadécimal",function(a){return O.cle(parseInt(a,10)||32,"hex");}],
          ["Base64",function(a){return O.cle(parseInt(a,10)||32,"base64");}]]},
{k:"invisible",cat:"secu",sym:"Ci",n:"Caractères invisibles",d:"Ce qui est caché dans un texte.",
 champs:[{k:"a",n:"Texte",ph:"colle le texte à examiner",multi:true}],
 actions:[["Examiner",function(a){return O.invisibles(a);}]]},
{k:"dns",cat:"reseau",sym:"Dn",n:"DNS",d:"Interroge un résolveur public.",reseau:true,
 champs:[{k:"a",n:"Domaine",ph:"exemple.fr"},{k:"b",n:"Type",ph:"A, MX, TXT, NS…"}],
 actions:[["Résoudre",function(a,b){return {promesse:O.dns(a,(b||"A").toUpperCase())};}]]},
{k:"certs",cat:"reseau",sym:"Ct",n:"Certificats publics",d:"L’histoire d’un domaine dans les journaux de transparence.",reseau:true,
 champs:[{k:"a",n:"Domaine",ph:"exemple.fr"}],
 actions:[["Consulter",function(a){return {promesse:O.certificats(a)};}]]},
{k:"entetes",cat:"reseau",sym:"Eh",n:"En-têtes HTTP",d:"Ce qu’un navigateur a le droit de lire d’une réponse.",reseau:true,
 champs:[{k:"a",n:"Adresse",ph:"https://exemple.fr"}],
 actions:[["Interroger",function(a){return {promesse:O.entetes(a)};}]]},
{k:"flocon",cat:"discord",sym:"Ag",n:"Âge d’un compte",d:"Un identifiant porte sa date de création. C’est exact, pas estimé.",
 champs:[{k:"a",n:"Identifiant",ph:"175928847299117063"}],
 actions:[["Dater",function(a){return O.flocon(a);}]]}];
for(var z0=0;z0<OUTILS.length;z0++)OUTILS[z0].no=z0+1;

var ou=OUTILS[0];for(var a1=0;a1<OUTILS.length;a1++)if(OUTILS[a1].k===outil)ou=OUTILS[a1];
var fv=(filtre||"").trim().toLowerCase();
function correspond(x){if(!fv)return true;return (x.n+" "+x.sym+" "+x.k+" "+x.d+" "+FAM[x.cat].n).toLowerCase().indexOf(fv)>=0;}
function choisir(x){setOutil(x.k);setSortie(null);setEntree("");setEntree2("");}

function lance(fn){
try{
var r=fn(entree,entree2);
setTirage(tirage+1);
if(r&&r.promesse){setSortie({attente:true});
r.promesse.then(function(v){setSortie(v);setTirage(function(t){return t+1;});},function(){setSortie({ok:false,e:"échec"});});
try{O.trace(ou.k,entree,!!ou.reseau);}catch(_){}
return;}
setSortie(r);
try{O.trace(ou.k,entree,!!ou.reseau);}catch(_){}}
catch(e){setSortie({ok:false,e:String((e&&e.message)||e)});}}

function tuile(x,rang,grand){
var c=FAM[x.cat].c,on=x.k===ou.k,z=grand?132:86;
return i("div",{key:x.k,className:"nx-fx nxou-tuile"+(on&&!grand?" nxou-choisie":""),role:grand?null:"button",tabIndex:grand?null:0,
"aria-label":grand?null:_NXtr(x.n),"aria-pressed":grand?null:(on?"true":"false"),onKeyDown:grand?null:_NXkey,
onClick:grand?null:function(){choisir(x);},
style:{width:z+"px",height:z+"px",boxSizing:"border-box",padding:grand?"12px 14px":"8px 9px",flex:"0 0 auto",
background:"linear-gradient(160deg,"+_NXED.a(c,on||grand?0.22:0.1)+","+_NXED.a(c,0.03)+")",
border:"1px solid "+_NXED.a(c,on||grand?0.75:0.3),
boxShadow:on&&!grand?("0 10px 30px "+_NXED.a(c,0.25)):"none",
cursor:grand?"default":"pointer",animationDelay:grand?"0ms":(rang*45)+"ms",display:"flex",flexDirection:"column"}},
i("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:grand?"12px":"10.5px",color:_NXED.a(c,0.9),fontVariantNumeric:"tabular-nums"}},
i("span",null,String(x.no)),
x.reseau?i("span",{title:_T("Sort de la machine"),style:{width:grand?"8px":"6px",height:grand?"8px":"6px",borderRadius:"50%",background:P.warn}}):null),
i("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--serif)",
fontSize:grand?"44px":"26px",color:"var(--c)",lineHeight:1}},x.sym),
i("div",{style:{fontSize:grand?"12.5px":"10.5px",color:"var(--c2)",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},_NXtr(x.n)));}

function tableau(){
var rang=0;
return i("div",{style:{display:"flex",gap:"22px",flexWrap:"wrap",alignItems:"flex-start"}},
ORDRE.map(function(cat){
var L=OUTILS.filter(function(x){return x.cat===cat;});
var vis=L.filter(correspond);
var cols=L.length>=4?2:1;
return i("div",{key:cat,style:{opacity:vis.length?1:0.25,transition:"opacity .3s ease"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px",fontSize:"12.5px",color:"var(--c2)"}},
i("span",{style:{width:"16px",height:"3px",borderRadius:"2px",background:FAM[cat].c}}),_NXtr(FAM[cat].n),
i("span",{style:{color:"var(--f)",fontVariantNumeric:"tabular-nums"}},String(L.length))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat("+cols+",86px)",gap:"8px"}},
L.map(function(x){var t=tuile(x,rang++,false);
return correspond(x)?t:i("div",{key:x.k,style:{opacity:.2,pointerEvents:"none"}},t);})));}));}

function champ(ch,k){
var v=(ch.k==="a")?entree:entree2;
var props={className:"nxed-champ",value:v,placeholder:_NXtr(ch.ph),spellCheck:false,"aria-label":_NXtr(ch.n),
onChange:function(e){if(ch.k==="a")setEntree(e.target.value);else setEntree2(e.target.value);},
style:{width:"100%",boxSizing:"border-box",background:"rgba(0,0,0,.25)",border:"1px solid var(--l)",borderRadius:"10px",
padding:"11px 13px",color:"var(--c)",fontSize:ch.mono?"12.5px":"13.5px",outline:"none",
fontFamily:ch.mono?_NXf.mono:"inherit",resize:"vertical",minHeight:ch.multi?"96px":null,lineHeight:1.55}};
return i("div",{key:k,style:{marginTop:k?"12px":"0"}},
i("div",{style:{fontSize:"12.5px",color:"var(--m)",marginBottom:"6px"}},_NXtr(ch.n)),
ch.multi?i("textarea",props):i("input",props));}

function rendSortie(){
if(!sortie)return null;
if(sortie.attente)return i("div",{style:{fontSize:"13px",color:ACC,padding:"14px 0"}},_T("En cours"));
if(sortie.ok===false)return i("div",{style:{padding:"12px 14px",borderRadius:"10px",border:"1px solid "+_NXED.a(P.danger,0.4),
background:_NXED.a(P.danger,0.08),fontSize:"13px",color:P.danger,lineHeight:1.6}},_NXtr(String(sortie.e||"échec")));
var txt=(typeof sortie.v==="string")?sortie.v:JSON.stringify(sortie,null,2);
return i("div",{key:"s"+tirage},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}},
i("div",{style:{flex:1,fontFamily:"var(--serif)",fontSize:"18px",color:"var(--c)"}},_T("Résultat")),
_NXED.lien(_T("Copier"),function(){copie(txt,"Le résultat");},undefined,"cp")),
i("div",{className:"nxou-imprime",style:{borderRadius:"10px",border:"1px solid var(--l)",background:"#0d0f0f"}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:"var(--c2)",lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-all",
maxHeight:"340px",overflowY:"auto",padding:"12px 14px"}},_NXtr(txt)),
i("div",{className:"nxou-tete","aria-hidden":"true"})));}

function etabli(){
var c=FAM[ou.cat].c;
return i("div",{key:ou.k,className:"nxou-tiroir",style:{marginTop:"26px",position:"relative",borderTop:"2px solid "+c,paddingTop:"24px"}},
i("div",{style:{display:"flex",gap:"26px",flexWrap:"wrap",alignItems:"flex-start"}},
i("div",{style:{flex:"0 0 auto"}},tuile(ou,0,true)),
i("div",{style:{flex:"1 1 360px",minWidth:"0"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"28px",color:"var(--c)",lineHeight:1.1}},_NXtr(ou.n)),
i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.6,marginTop:"6px"}},_NXtr(ou.d)),
ou.reseau?i("div",{style:{fontSize:"12.5px",color:P.warn,lineHeight:1.6,marginTop:"10px"}},
_T("Cet outil sort de ta machine : ce que tu tapes part chez un tiers, qui apprend donc ce que tu cherches.")):null,
ou.champs.length?i("div",{style:{marginTop:"18px"}},ou.champs.map(champ)):null,
ou.fichier?i("label",{style:{display:"inline-flex",alignItems:"center",gap:"8px",cursor:"pointer",marginTop:"12px",
padding:"8px 14px",borderRadius:"99px",fontSize:"12.5px",border:"1px solid var(--l2)",color:"var(--c2)"}},
_T("Depuis un fichier"),
i("input",{type:"file",style:{display:"none"},onChange:function(e){try{
var f=e.target.files&&e.target.files[0];
if(!f)return;
f.arrayBuffer().then(function(b){
setSortie({attente:true});
O.empreintes(new Uint8Array(b)).then(function(v){
setSortie({ok:true,fichier:f.name,octets:b.byteLength,empreintes:v});setTirage(function(t){return t+1;});
O.trace("empreinte",f.name,false);});});}catch(_){}}})):null,
i("div",{style:{display:"flex",gap:"10px",marginTop:"18px",flexWrap:"wrap"}},
ou.actions.map(function(ac,k){return _NXED.bouton(ac[0],function(){lance(ac[1]);},{fort:k===0,cle:k});})),
i("div",{style:{marginTop:"18px"}},rendSortie()))));}

// Le journal en frise : chaque lancement est un point sur la ligne du temps.
function frise(){
var H2=(O.cfg.histo||[]).slice(0,40);
if(!H2.length)return i("div",{style:{fontSize:"13px",color:"var(--m)"}},_T("Rien pour l’instant."));
var t1=H2[0].q,t0=H2[H2.length-1].q,span=Math.max(60000,t1-t0);
return i("div",null,
i("div",{style:{position:"relative",height:"46px",margin:"6px 8px 0"}},
i("div",{style:{position:"absolute",left:0,right:0,top:"22px",height:"1px",background:"var(--l2)"}}),
H2.map(function(h,k){var x=H2.length>1?((h.q-t0)/span*100):50;
return i("div",{key:k,className:"nxou-point",title:h.o+" · "+h.c+" · "+new Date(h.q).toLocaleTimeString("fr-FR"),
style:{position:"absolute",left:x+"%",top:"22px",width:"10px",height:"10px",borderRadius:"50%",transform:"translate(-50%,-50%)",
background:h.r?P.warn:((FAM[(OUTILS.filter(function(o){return o.k===h.o;})[0]||{}).cat]||{}).c||ACC),boxShadow:"0 0 0 3px #0b0b0c"}});})),
i("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11.5px",color:"var(--m)",margin:"0 0 14px"}},
i("span",null,new Date(t0).toLocaleTimeString("fr-FR")),i("span",null,new Date(t1).toLocaleTimeString("fr-FR"))),
i("div",{style:{maxHeight:"200px",overflowY:"auto"}},H2.map(function(h,k){
return i("div",{key:k,className:"nxed-ligne",style:{display:"flex",alignItems:"center",gap:"14px",padding:"6px 10px",margin:"0 -10px"}},
i("span",{style:{width:"7px",height:"7px",borderRadius:"50%",flex:"0 0 auto",background:h.r?P.warn:"var(--f)"}}),
i("span",{style:{width:"96px",fontSize:"13px",color:"var(--c)"}},_NXtr(h.o)),
i("span",{style:{flex:1,minWidth:0,fontFamily:_NXf.mono,fontSize:"12px",color:"var(--c2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(h.c)),
i("span",{style:{fontSize:"12px",color:"var(--f)",fontVariantNumeric:"tabular-nums"}},_NXtr(new Date(h.q).toLocaleTimeString("fr-FR"))));})));}

var recherche=i("input",{className:"nxed-champ",value:filtre,spellCheck:false,"aria-label":_T("Chercher un outil"),
placeholder:_T("Chercher un outil : base64, dns, jwt…"),
onChange:function(e){setFiltre(e.target.value);},
onKeyDown:function(e){try{if(e.key==="Enter"){var L=OUTILS.filter(correspond);if(L.length)choisir(L[0]);}}catch(_){}},
style:{width:"280px",maxWidth:"100%",boxSizing:"border-box",background:"transparent",border:"none",borderBottom:"1px solid var(--l2)",
padding:"9px 2px",color:"var(--c)",fontSize:"13.5px",outline:"none",fontFamily:"inherit"}});
return i(Kr,null,_NXED.racine({acc:FAM[ou.cat].c,max:900},
entete(recherche),
avis?i("div",{style:{fontSize:"13px",color:P.ok,margin:"-14px 0 16px"}},_NXtr(avis)):null,
tableau(),
etabli(),
_NXED.section(_T("Ce qui a été lancé"),_NXtr((O.cfg.histo||[]).length)+" "+_T("entrée(s), gardées sur cette machine uniquement. Un point ambre marque un outil qui est sorti de la machine."),
frise(),
i("div",{style:{display:"flex",gap:"18px",alignItems:"center"}},
_NXED.lien(_T("Effacer le journal"),function(){O.oublie();dis("Journal effacé.");},undefined,"ef"),
_NXED.bouton(_T("Refermer les outils"),function(){O.referme();dis("Conditions retirées.");},{danger:true,cle:"rf"})),"j1"),
_NXfoot(_NXtr("Nexium Boîte à outils · un point ambre signale un outil qui sort de la machine"))));
}
