function NexiumAdminComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){
_NXADMIN.listeners.push(force);
if(_NXADMIN.connecte())_NXADMIN.chargeTout();
else _NXADMIN.reprend();
return function(){try{_NXADMIN.listeners=_NXADMIN.listeners.filter(function(f){return f!==force;});}catch(_){}};},[]);
var P=_NXpal;
var msg=F.useState(null),setMsg=msg[1];
var ident=F.useState(""),mdp=F.useState("");
var onglet=F.useState("tableau");
var monte=_NXmounted(F);
var codeF=F.useState({genre:"abo",offre:"pro",jours:"7",credits:"100",max:"1",validite:"30",note:"",code:""});
var codeNeuf=F.useState("");
var svcEss=F.useState({}),svcEng=F.useState(null),svcMin=F.useState(""),svcMsg=F.useState("");
var _TB0=_NXADMIN.tableau||{};
var cAct=_NXcount(F,((_TB0.membres||{}).actifs_24h)||0);
var cMem=_NXcount(F,((_TB0.membres||{}).total)||0);
var cAbo=_NXcount(F,((_TB0.abonnements||{}).actifs)||0);
var cRep=_NXcount(F,((_TB0.tickets||{}).a_repondre)||0);
var cExa=_NXcount(F,(_TB0.alertes_ouvertes||0)+(_TB0.menaces_proposees||0));
var titre=F.useState(""),resume=F.useState(""),grav=F.useState("majeur"),compo=F.useState("client"),vers=F.useState("");
var brut=F.useState("");
var q=F.useState(""),vise=F.useState(null);
var don=F.useState("50");
var bcle=F.useState(""),bgenre=F.useState("compte"),braison=F.useState(""),bjours=F.useState("7");
var acle=F.useState(""),aoffre=F.useState("plus"),ajours=F.useState("30");
var trep=F.useState(""),tfiltre=F.useState("");
var tbas=F.useRef?F.useRef(null):{current:null};
var histo=F.useState(false);

function dire(r,bon){try{if(r&&r.err)setMsg({t:r.err,ko:true});else setMsg({t:bon,ko:false});
setTimeout(function(){try{setMsg(function(x){return (x&&x.t===((r&&r.err)||bon))?null:x;});}catch(_){}},6000);}catch(_){}}
function quand(t){try{
if(!t)return "—";
var d=Date.now()-(new Date(t)).getTime();
var m=Math.floor(d/60000);
if(m<1)return "a l instant";
if(m<60)return m+" min";
var h=Math.floor(m/60);
if(h<48)return h+" h";
return Math.floor(h/24)+" j";}catch(_){return "—";}}

// ------------------------------------------------------------- les portes
if(!_NXADMIN.estEquipe()){
return i("div",null,
_NXFX.entete({cle:_NXtr("Administration"),titre:_NXtr("Acces refuse"),icone:"cadenas",col:P.danger,
texte:_NXtr("Ce compte Discord ne fait pas partie de l equipe Nexium. Cette page ne montre rien, et n envoie rien.")}),
_NXFX.note({col:P.danger,icone:"bouclier",titre:_NXtr("Rien n est charge"),
texte:_NXtr("Le client ne demande aucune donnee tant que le compte n est pas reconnu. Le controle est refait sur le serveur a chaque requete.")}),
_NXfoot(_NXtr("Nexium Admins")));}

function lancer(){setMsg(null);_NXADMIN.connexion(ident[0],mdp[0],function(r){mdp[1]("");dire(r,"Connecte.");});}

if(!_NXADMIN.connecte()){
return i("div",null,
_NXFX.entete({cle:_NXtr("Administration"),titre:_NXtr("Nexium Admins"),icone:"cle",col:P.warn,
texte:_NXtr("Une seconde porte, independante de Discord. Meme si quelqu un force l affichage de cette page, il ne passera pas cet ecran.")}),
_NXcard(i("div",_NXFX.fusion({style:{maxWidth:"430px",margin:"0 auto",padding:"6px 0"}},_NXFX.a({"data-nx-zoom":"1"})),
i("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"}},
_NXFX.blason("cadenas",P.warn,84)),
_NXFX.champ({k:_NXtr("Identifiant"),icone:"comptes",v:ident[0],ph:_NXtr("pseudo"),
onChange:function(e){ident[1](e.target.value);}}),
_NXFX.champ({k:_NXtr("Mot de passe"),icone:"cle",type:"password",v:mdp[0],ph:"••••••••",
onChange:function(e){mdp[1](e.target.value);},
onKeyDown:function(e){if(e.key==="Enter")lancer();}}),
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",margin:"4px 0 16px"}},
_NXtoggle(_NXADMIN.garde(),function(){_NXADMIN.setGarde(!_NXADMIN.garde());force();}),
i("div",{style:{flex:1}},
i("div",{style:{fontSize:"12.5px",color:P.txt,fontWeight:"600"}},_NXtr("Rester connecte")),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px",lineHeight:1.5}},
_NXtr("La session se renouvelle toute seule. Le jeton est range sur cette machine, brouille avec l identifiant d installation — ce n est pas du chiffrement.")))),
_NXFX.bouton({t:_NXADMIN.busy?_NXtr("Connexion…"):_NXtr("Se connecter"),icone:"fleche",plein:true,large:true,
col:P.warn,off:_NXADMIN.busy,onClick:lancer}),
msg[0]?i("div",_NXFX.fusion({style:{marginTop:"14px",fontSize:"12.5px",textAlign:"center",
color:msg[0].ko?P.danger:P.ok}},_NXFX.a({"data-nx-pop":"1"})),_NXtr(msg[0].t)):null)),
_NXfoot(_NXtr("Nexium Admins · la verification se fait sur le serveur, pas dans le client")));}

var estProp=_NXADMIN.role==="proprietaire";
var ouvertes=[],closes=[],a;
for(a=0;a<_NXADMIN.alertes.length;a++){var al=_NXADMIN.alertes[a];
if(al.fin||al.etat==="resolu")closes.push(al);else ouvertes.push(al);}
var graves=0;
for(a=0;a<ouvertes.length;a++)if(_NXSTATUS.poids(ouvertes[a].gravite)>=4)graves++;
var CH=_NXADMIN.chiffres||{};
var bansActifs=_NXADMIN.bans.length;

// ----------------------------------------------------------- les alertes
function diffusion(al){
var d=_NXADMIN.diffusion?_NXADMIN.diffusion(al):null;
var col=d?(d.echecs?P.danger:(d.attente?P.warn:P.ok)):P.faint;
var txt=d?(d.echecs?(d.echecs+" diffusion(s) en echec sur Discord")
:(d.attente?"diffusion sur Discord en cours…"
:("diffuse sur Discord · "+d.envoyes+" message(s)")))
:"pas encore diffuse sur Discord";
return i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginTop:"12px",flexWrap:"wrap"}},
i("span",_NXFX.fusion({"aria-hidden":"true",style:{width:"6px",height:"6px",borderRadius:"50%",
background:col,flexShrink:0}},(d&&d.attente)?_NXFX.a({"data-nx-dot":"1"}):{})),
i("span",{style:{fontSize:"11.5px",color:(d&&d.echecs)?P.danger:P.dim}},_NXtr(txt)),
(d&&d.echecs&&d.dernier&&d.dernier.detail)?i("span",{style:{fontSize:"11px",color:P.faint,
fontFamily:_NXf.mono}},"· "+String(d.dernier.detail).slice(0,80)):null,
i("div",{style:{flex:1,minWidth:"8px"}}),
_NXFX.bouton({t:_NXtr("Renvoyer sur Discord"),icone:"envoi",petit:true,creux:true,col:P.sub,onClick:function(){
_NXADMIN.renvoie(al,"manuel",function(r){dire(r,"Renvoi demande : la mention depend du reglage du serveur.");});}}),
_NXFX.bouton({t:_NXtr("Essai sans mention"),petit:true,creux:true,col:P.faint,onClick:function(){
_NXADMIN.renvoie(al,"test",function(r){dire(r,"Essai envoye, sans mention.");});}}));}

function carte(al,k){
var c=_NXSTATUS.couleur(al.gravite);
var M=al.maj||[];
return i("div",_NXFX.fusion({key:al.id,style:{position:"relative",overflow:"hidden",
background:P.inset,border:"1px solid "+P.line,borderRadius:"15px",padding:"16px",marginBottom:"11px"}},
_NXFX.a({"data-nx-rise":String(Math.min(6,k+1))})),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,top:0,bottom:0,width:"3px",
background:"linear-gradient(180deg,"+c+","+_NXteinte(c,15)+")"}}),
i("div",{style:{display:"flex",alignItems:"flex-start",gap:"12px"}},
_NXFX.pastille(al.gravite==="securite"?"bouclier":(al.gravite==="info"?"info":"alerte"),
{col:c,taille:34,halo:_NXSTATUS.poids(al.gravite)>=4,hv:"secoue"}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"5px"}},
i("span",{style:{fontSize:"9.5px",fontWeight:"900",letterSpacing:".14em",textTransform:"uppercase",
color:c}},_NXSTATUS.gravFr(al.gravite)),
_NXFX.badge(al.fin?_NXtr("cloturee"):_NXtr(al.etat),al.fin?P.faint:P.sub),
al.composant?_NXFX.badge(_NXtr(String(al.composant)),P.dim):null,
i("span",{style:{marginLeft:"auto",fontSize:"11px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(quand(al.debut)))),
i("div",{style:{fontSize:"14px",fontWeight:"700",color:P.txt,lineHeight:1.35}},_NXtr(al.titre)),
i("div",{style:{fontSize:"12.5px",color:P.sub,marginTop:"6px",lineHeight:1.55}},_NXtr(al.resume)),
M.length>1?i("div",{style:{marginTop:"11px",paddingLeft:"11px",borderLeft:"1px solid "+P.line}},
M.slice(-3).map(function(u,z){
return i("div",{key:z,style:{fontSize:"11.5px",color:P.dim,marginBottom:"4px",lineHeight:1.5}},
i("span",{style:{color:P.sub,fontWeight:"600"}},_NXtr(quand(u.a))),
" · "+String(u.texte||"").slice(0,140));})):null,
_NXtr(diffusion(al)),
al.fin?null:i("div",{style:{display:"flex",gap:"7px",marginTop:"12px",flexWrap:"wrap"}},
_NXFX.bouton({t:_NXtr("Cause identifiee"),icone:"loupe",petit:true,col:P.info,onClick:function(){
_NXADMIN.majEtat(al,"identifie","La cause est identifiee, un correctif est en preparation.",function(r){dire(r,"Alerte mise a jour.");});}}),
_NXFX.bouton({t:_NXtr("Sous surveillance"),icone:"oeil",petit:true,col:P.warn,onClick:function(){
_NXADMIN.majEtat(al,"surveille","Un correctif est en place, la situation est sous surveillance.",function(r){dire(r,"Alerte mise a jour.");});}}),
_NXFX.bouton({t:_NXtr("Cloturer"),icone:"check",petit:true,col:P.ok,onClick:function(){
_NXADMIN.majEtat(al,"resolu","Incident resolu.",function(r){dire(r,"Alerte cloturee.");});}}),
estProp?_NXFX.bouton({t:_NXtr("Supprimer"),icone:"poubelle",petit:true,creux:true,col:P.danger,onClick:function(){
_NXADMIN.supprime(al,function(r){dire(r,"Alerte supprimee.");});}}):null))));}

function ongletAlertes(){
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Rediger une alerte"),_NXtr("Jette la situation en vrac : Nexium IA en fait un titre, un resume et un niveau. Tu relis, tu corriges, tu publies.")),
_NXFX.champ({k:_NXtr("Note brute"),multi:true,lignes:3,v:brut[0],
ph:_NXtr("ex : depuis la 184 le scan des liens plante chez certains, ca vient du cache"),
onChange:function(e){brut[1](e.target.value);}}),
i("div",{style:{display:"flex",gap:"8px",marginBottom:"18px",flexWrap:"wrap"}},
_NXFX.bouton({t:_NXADMIN.iaBusy?_NXtr("Redaction…"):_NXtr("Rediger avec Nexium IA"),icone:"etincelle",
col:P.mauve,plein:!_NXADMIN.iaBusy,off:_NXADMIN.iaBusy,onClick:function(){
setMsg(null);
_NXADMIN.redigeIA(brut[0],function(r){
if(r&&r.ok&&r.data){titre[1](r.data.titre);resume[1](r.data.resume);
if(_NXADMIN.peutNiveau(r.data.gravite))grav[1](r.data.gravite);
if(r.data.composant)compo[1](r.data.composant);
dire(null,"Proposition ecrite. Relis-la avant de publier.");}
else dire(r,"");});}}),
brut[0]?_NXFX.bouton({t:_NXtr("Vider"),petit:true,creux:true,col:P.faint,onClick:function(){brut[1]("");}}):null),
_NXFX.sep(4),
_NXFX.champ({k:_NXtr("Titre"),v:titre[0],ph:_NXtr("ce que l utilisateur constate"),
onChange:function(e){titre[1](e.target.value);},
aide:titre[0]?(_NXtr(titre[0].length)+_NXtr(" caracteres")):""}),
_NXFX.champ({k:_NXtr("Resume"),multi:true,lignes:4,v:resume[0],ph:_NXtr("ce qui ne marche pas, pour qui, quoi faire en attendant"),
onChange:function(e){resume[1](e.target.value);}}),
i("div",{style:{display:"flex",gap:"10px"}},
i("div",{style:{flex:1}},_NXFX.champ({k:_NXtr("Composant"),v:compo[0],ph:_NXtr("client, blocklist…"),
onChange:function(e){compo[1](e.target.value);}})),
i("div",{style:{flex:1}},_NXFX.champ({k:_NXtr("Versions touchees"),v:vers[0],ph:"184, 185…",
onChange:function(e){vers[1](e.target.value);}}))),
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".13em",color:P.dim,
textTransform:"uppercase",marginBottom:"9px"}},_NXtr("Niveau")),
i("div",{style:{display:"flex",gap:"6px",marginBottom:"16px",flexWrap:"wrap"}},
_NXSTATUS.NIVEAUX.map(function(nv){
var g=nv.k,on=grav[0]===g,interdit=!_NXADMIN.peutNiveau(g);
return i("div",_NXFX.fusion({key:g,className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
title:nv.d+(interdit?" — reserve au proprietaire":""),
onClick:function(){if(!interdit)grav[1](g);},
style:{display:"flex",alignItems:"center",gap:"7px",padding:"7px 13px",borderRadius:"99px",
cursor:interdit?"not-allowed":"pointer",border:"1px solid "+(on?nv.c:P.line),
background:on?_NXteinte(nv.c,12):"transparent",
color:interdit?P.faint:(on?nv.c:P.sub),fontSize:"12px",fontWeight:"700",
opacity:interdit?.45:1}},_NXFX.a({"data-nx-appui":"1"})),
i("span",_NXFX.fusion({style:{width:"7px",height:"7px",borderRadius:"50%",
background:interdit?P.faint:nv.c,display:"inline-block",flexShrink:0}},
on?_NXFX.a({"data-nx-dot":"1"}):{})),
_NXtr(nv.n)+(interdit?_NXtr(" · propriétaire"):""));})),
_NXFX.bouton({t:_NXtr("Publier l alerte"),icone:"envoi",plein:true,large:true,col:P.acc,onClick:function(){
_NXADMIN.ouvrir({titre:titre[0],resume:resume[0],gravite:grav[0],composant:compo[0],versions:vers[0]},function(r){
if(r&&r.ok){titre[1]("");resume[1]("");vers[1]("");brut[1]("");}
dire(r,"Alerte publiee. Elle part en direct chez les utilisateurs.");});}}))),
_NXcard(i("div",null,
_NXch(_NXtr("Alertes en cours"),ouvertes.length?(_NXtr(ouvertes.length)+_NXtr(" alerte(s) visible(s) par les utilisateurs")):_NXtr("Aucune alerte ouverte."),
_NXFX.bouton({t:_NXtr("Rafraichir"),icone:"maj",petit:true,creux:true,col:P.sub,hv:"tourne",onClick:function(){
_NXADMIN.charge(function(r){dire(r,"Liste rechargee.");});}})),
ouvertes.length?ouvertes.map(carte):_NXFX.vide({icone:"bouclierOk",col:P.ok,
titre:_NXtr("Tout va bien"),texte:_NXtr("Aucun incident ouvert. Les utilisateurs ne voient aucun bandeau.")}))),
closes.length?_NXcard(i("div",null,
_NXch(_NXtr("Historique"),_NXtr(closes.length)+_NXtr(" alerte(s) cloturee(s)"),
_NXFX.bouton({t:histo[0]?_NXtr("Replier"):_NXtr("Deplier"),petit:true,creux:true,col:P.sub,
onClick:function(){histo[1](!histo[0]);}})),
histo[0]?closes.slice(0,12).map(carte):null)):null));}

// ----------------------------------------------------------- les membres
function fiche(){
var m=vise[0];
if(!m)return null;
return i("div",_NXFX.fusion({style:{marginTop:"14px",padding:"15px",borderRadius:"14px",
background:_NXteinte(P.acc,5),border:"1px solid "+P.hair}},_NXFX.a({"data-nx-zoom":"1"})),
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",marginBottom:"14px"}},
_NXFX.pastille("comptes",{col:m.banni?P.danger:P.info,taille:36,halo:true}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"13px",color:P.txt,fontWeight:"700"}},_NXtr(m.user_id)),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px"}},
_NXtr("vu il y a ")+_NXtr(quand(m.last_seen))+_NXtr(" · arrive il y a ")+_NXtr(quand(m.first_seen))+
(m.version?(_NXtr(" · v")+_NXtr(m.version)):"")+" · "+(_NXtr(m.seen_count)||0)+_NXtr(" ouverture(s)"))),
_NXFX.bouton({t:_NXtr("Fermer"),petit:true,creux:true,col:P.faint,onClick:function(){vise[1](null);}})),
i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"14px"}},
_NXFX.badge(m.banni?_NXtr("banni"):_NXtr("actif"),m.banni?P.danger:P.ok,{point:true}),
_NXFX.badge((_NXtr(m.bonus)||0)+_NXtr(" credits offerts"),m.bonus?P.lime:P.faint,{icone:"jeton"})),
i("div",{style:{display:"flex",gap:"9px",alignItems:"flex-end",flexWrap:"wrap"}},
i("div",{style:{width:"120px"}},_NXFX.champ({k:_NXtr("Montant"),serre:true,mono:true,v:don[0],
onChange:function(e){don[1](e.target.value);}})),
_NXFX.bouton({t:_NXtr("Offrir"),icone:"cadeau",col:P.lime,plein:true,onClick:function(){
_NXADMIN.donneCredits(m.user_id,don[0],function(r){
if(r&&r.ok){_NXADMIN.chargeMembres(q[0]);dire(r,don[0]+" credits vers "+m.user_id+".");}
else dire(r,"");});}}),
_NXFX.bouton({t:_NXtr("Retirer"),icone:"moins",creux:true,col:P.warn,onClick:function(){
_NXADMIN.donneCredits(m.user_id,-Math.abs(parseInt(don[0],10)||0),function(r){
if(r&&r.ok)_NXADMIN.chargeMembres(q[0]);
dire(r,"Retire.");});}}),
i("div",{style:{flex:1,minWidth:"8px"}}),
m.banni?_NXFX.bouton({t:_NXtr("Lever le bannissement"),icone:"cadenasOuvert",col:P.ok,onClick:function(){
_NXADMIN.leveBan(m.user_id,function(r){if(r&&r.ok)_NXADMIN.chargeMembres(q[0]);dire(r,"Bannissement leve.");});}})
:_NXFX.bouton({t:_NXtr("Bannir…"),icone:"banni",creux:true,col:P.danger,onClick:function(){
bcle[1](m.user_id);bgenre[1]("compte");onglet[1]("bans");}})));}

function ongletMembres(){
var L=_NXADMIN.membres||[];
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Population"),(CH.total!==undefined)?(_NXtr(CH.total)+_NXtr(" comptes connus · ")+(_NXtr(CH.actifs_24h)||0)+_NXtr(" ces 24 h")):_NXtr("Chargement…"),
_NXFX.bouton({t:_NXtr("Rafraichir"),icone:"maj",petit:true,creux:true,col:P.sub,hv:"tourne",onClick:function(){
_NXADMIN.chargeChiffres();_NXADMIN.chargeMembres(q[0],function(r){dire(r,"Liste rechargee.");});}})),
i("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap",marginBottom:"18px"}},
_NXFX.chiffre({k:_NXtr("Total"),v:_NXn(CH.total||0),rang:1}),
_NXFX.chiffre({k:_NXtr("24 heures"),v:_NXn(CH.actifs_24h||0),col:P.ok,rang:2}),
_NXFX.chiffre({k:_NXtr("7 jours"),v:_NXn(CH.actifs_7j||0),col:P.info,rang:3}),
_NXFX.chiffre({k:_NXtr("Nouveaux"),v:_NXn(CH.nouveaux_7j||0),col:P.mauve,rang:4}),
_NXFX.chiffre({k:_NXtr("Bannis"),v:_NXn(CH.bannis||0),col:(CH.bannis?P.danger:P.faint),rang:5}),
_NXFX.chiffre({k:_NXtr("Credits offerts"),v:_NXn(CH.credits||0),col:P.lime,rang:6})),
CH.versions?i("div",null,
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".13em",color:P.dim,
textTransform:"uppercase",marginBottom:"10px"}},_NXtr("Versions en circulation, 30 derniers jours")),
_NXtr((function(){var ks=[],kk;for(kk in CH.versions)ks.push(kk);
ks.sort(function(x,y){return CH.versions[y]-CH.versions[x];});
var mx=ks.length?CH.versions[ks[0]]:1;
return i("div",null,ks.slice(0,8).map(function(v,z){
return i("div",{key:v,style:{display:"flex",alignItems:"center",gap:"11px",marginBottom:"7px"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11.5px",color:P.sub,width:"52px",flexShrink:0}},_NXtr("v")+_NXtr(v)),
i("div",{style:{flex:1}},_NXFX.barre(mx?(CH.versions[v]/mx*100):0,z===0?P.acc:P.info,4)),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.dim,width:"42px",
textAlign:"right",flexShrink:0}},_NXn(CH.versions[v])));}));})())):null)),
_NXcard(i("div",null,
_NXch(_NXtr("Chercher un compte"),_NXtr("Tape un identifiant, ou une partie. La liste montre les soixante derniers vus.")),
i("div",{style:{display:"flex",gap:"9px",alignItems:"flex-end",marginBottom:"6px"}},
i("div",{style:{flex:1}},_NXFX.champ({serre:true,icone:"loupe",mono:true,v:q[0],ph:"546349979757707265",
onChange:function(e){q[1](e.target.value);},
onKeyDown:function(e){if(e.key==="Enter")_NXADMIN.chargeMembres(q[0]);}})),
_NXFX.bouton({t:_NXtr("Chercher"),icone:"loupe",col:P.acc,plein:true,onClick:function(){
_NXADMIN.chargeMembres(q[0],function(r){dire(r,"");});
if(/^[0-9]{15,25}$/.test(String(q[0]||"").trim())){vise[1](null);_NXADMIN.chargeFiche(q[0]);}}})),
L.length?i("div",{style:{marginTop:"8px"}},L.map(function(m,k){
return _NXFX.rangee({premier:k===0,rang:Math.min(6,k+1),icone:"comptes",
col:m.banni?P.danger:(m.bonus?P.lime:P.faint),
titre:_NXtr(m.user_id),
texte:_NXtr("vu il y a ")+_NXtr(quand(m.last_seen))+(m.version?(_NXtr(" · v")+_NXtr(m.version)):"")+
" · "+(_NXtr(m.seen_count)||0)+_NXtr(" ouverture(s)"),
onClick:function(){vise[1](m);_NXADMIN.chargeFiche(m.user_id);},
droite:i("div",{style:{display:"flex",gap:"6px",alignItems:"center"}},
m.bonus?_NXFX.badge(_NXtr(String(m.bonus)),P.lime,{icone:"jeton"}):null,
m.banni?_NXFX.badge(_NXtr("banni"),P.danger,{point:true}):null,
_NXFX.ico("chevron",14,{hv:"pousse"}))});}))
:_NXFX.vide({icone:"loupe",titre:_NXtr("Rien pour l instant"),
texte:_NXtr("Lance une recherche, ou rafraichis la population.")}),
_NXtr(fiche360())))));}

// -------------------------------------------------------------- les bans
function ongletBans(){
var L=_NXADMIN.bans||[];
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Bannir depuis le client"),_NXtr("Le client verifie deux sources a chaque demarrage : le fichier du depot, et cette table. Ce qui est pose ici prend effet en quelques minutes, sans publication.")),
_NXFX.note({col:P.warn,icone:"alerte",titre:_NXtr("Trois portees"),
texte:_NXtr("Le compte vise une personne. L appareil vise la machine, donc tous ses comptes. L installation ne vise que ce profil Discord — elle se contourne en reinstallant.")}),
i("div",{style:{display:"flex",gap:"6px",marginBottom:"14px",flexWrap:"wrap"}},
_NXADMIN.GENRES.map(function(g){
var on=bgenre[0]===g[0];
return i("div",_NXFX.fusion({key:g[0],className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
title:g[2],onClick:function(){bgenre[1](g[0]);},
style:{padding:"8px 14px",borderRadius:"11px",cursor:"pointer",
border:"1px solid "+(on?P.danger:P.line),
background:on?_NXteinte(P.danger,10):"transparent",
color:on?P.danger:P.sub,fontSize:"12px",fontWeight:"700"}},_NXFX.a({"data-nx-appui":"1"})),_NXtr(g[1]));})),
_NXFX.champ({k:_NXtr("Cible"),mono:true,icone:"cible",v:bcle[0],
ph:bgenre[0]==="compte"?_NXtr("identifiant Discord"):_NXtr("empreinte"),
onChange:function(e){bcle[1](e.target.value);},
aide:_NXtr((function(){for(var z=0;z<_NXADMIN.GENRES.length;z++)if(_NXADMIN.GENRES[z][0]===bgenre[0])return _NXADMIN.GENRES[z][2];return "";})())}),
_NXFX.champ({k:_NXtr("Motif"),v:braison[0],ph:_NXtr("ce qui est reproche, en une phrase"),
onChange:function(e){braison[1](e.target.value);}}),
_NXFX.champ({k:_NXtr("Duree en jours"),mono:true,icone:"horloge",v:bjours[0],ph:"7",
onChange:function(e){bjours[1](e.target.value);},
aide:estProp?_NXtr("Laisse vide pour un bannissement definitif."):_NXtr("Un operateur ne pose que des bannissements a duree limitee.")}),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap"}},
_NXFX.bouton({t:_NXtr("Poser le bannissement"),icone:"banni",plein:true,col:P.danger,onClick:function(){
var j=String(bjours[0]||"").trim();
_NXADMIN.poseBan({cle:bcle[0],genre:bgenre[0],raison:braison[0],jours:j?j:null},function(r){
if(r&&r.ok){bcle[1]("");braison[1]("");dire(r,"Bannissement pose.");}
else dire(r,"");});}}),
_NXFX.bouton({t:_NXtr("Vider"),petit:true,creux:true,col:P.faint,onClick:function(){
bcle[1]("");braison[1]("");}})))),
_NXcard(i("div",null,
_NXch(_NXtr("Bannissements actifs"),bansActifs?(_NXtr(bansActifs)+_NXtr(" en vigueur")):_NXtr("Aucun bannissement pose depuis le client."),
_NXFX.bouton({t:_NXtr("Rafraichir"),icone:"maj",petit:true,creux:true,col:P.sub,hv:"tourne",onClick:function(){
_NXADMIN.chargeBans(function(r){dire(r,"Liste rechargee.");});}})),
L.length?L.map(function(b,k){
var perm=!b.expire_le;
return _NXFX.rangee({premier:k===0,rang:Math.min(6,k+1),icone:"banni",col:perm?P.danger:P.warn,
titre:_NXtr(b.cle),
texte:_NXtr(b.genre)+" · "+(perm?_NXtr("definitif"):(_NXtr("jusqu au ")+_NXtr(new Date(b.expire_le).toLocaleDateString("fr-FR"))))+
(b.par?(_NXtr(" · par ")+_NXtr(b.par)):"")+(b.raison?(" — "+_NXtr(b.raison)):""),
droite:_NXFX.bouton({t:_NXtr("Lever"),icone:"cadenasOuvert",petit:true,creux:true,col:P.ok,onClick:function(){
_NXADMIN.leveBan(b.cle,function(r){dire(r,"Bannissement leve.");});}})});})
:_NXFX.vide({icone:"bouclierOk",col:P.ok,titre:_NXtr("Personne"),
texte:_NXtr("Aucun bannissement en vigueur. Le fichier du depot reste consulte de son cote.")})))));}

// ----------------------------------------------------------- les credits
function ongletCredits(){
var L=_NXADMIN.credits||[];
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Offrir des credits Nexium IA"),_NXtr("Ils sont depenses AVANT le quota des sept heures, et rendus si la demande echoue. Un montant negatif retire.")),
i("div",{style:{display:"flex",gap:"9px",alignItems:"flex-end",flexWrap:"wrap"}},
i("div",{style:{flex:2,minWidth:"200px"}},_NXFX.champ({k:_NXtr("Identifiant Discord"),serre:true,mono:true,
icone:"comptes",v:q[0],ph:"546349979757707265",onChange:function(e){q[1](e.target.value);}})),
i("div",{style:{width:"120px"}},_NXFX.champ({k:_NXtr("Montant"),serre:true,mono:true,v:don[0],
onChange:function(e){don[1](e.target.value);}})),
_NXFX.bouton({t:_NXtr("Offrir"),icone:"cadeau",plein:true,col:P.lime,onClick:function(){
_NXADMIN.donneCredits(q[0],don[0],function(r){dire(r,don[0]+" credits vers "+q[0]+".");});}})),
i("div",{style:{display:"flex",gap:"7px",marginTop:"6px",flexWrap:"wrap"}},
["25","50","100","250"].map(function(v){
return i("div",{key:v},_NXFX.bouton({t:"+"+_NXtr(v),petit:true,creux:true,
col:don[0]===v?P.lime:P.faint,onClick:function(){don[1](v);}}));})))),
_NXcard(i("div",null,
_NXch(_NXtr("Comptes credites"),L.length?(_NXtr(L.length)+_NXtr(" compte(s)")):_NXtr("Personne n a encore recu de credits."),
_NXFX.bouton({t:_NXtr("Rafraichir"),icone:"maj",petit:true,creux:true,col:P.sub,hv:"tourne",onClick:function(){
_NXADMIN.chargeCredits(function(r){dire(r,"Liste rechargee.");});}})),
L.length?L.map(function(c,k){
return _NXFX.rangee({premier:k===0,rang:Math.min(6,k+1),icone:"jeton",
col:c.bonus?P.lime:P.faint,titre:_NXtr(c.discord_id),
texte:(_NXtr(c.bonus)||0)+_NXtr(" restant(s) sur ")+(_NXtr(c.total_offert)||0)+_NXtr(" offert(s) · il y a ")+_NXtr(quand(c.maj)),
droite:i("div",{style:{display:"flex",gap:"6px"}},
_NXFX.bouton({t:"+50",petit:true,creux:true,col:P.lime,onClick:function(){
_NXADMIN.donneCredits(c.discord_id,50,function(r){dire(r,"50 credits ajoutes.");});}}),
_NXFX.bouton({t:_NXtr("Vider"),petit:true,creux:true,col:P.warn,onClick:function(){
_NXADMIN.donneCredits(c.discord_id,-(c.bonus||0),function(r){dire(r,"Solde remis a zero.");});}}))});})
:_NXFX.vide({icone:"cadeau",titre:_NXtr("Aucun credit offert"),
texte:_NXtr("Offre des credits a un compte pour lui laisser essayer les paliers hauts.")})))));}

// ------------------------------------------------------------- les tickets
function ongletTickets(){
var L=_NXADMIN.tickets||[];
var f=_NXADMIN.fil;
var CAT={abonnement:["etoile",_NXpal.warn],probleme:["alerte",P.danger],
question:["question",P.info],signalement:["bouclier",P.mauve]};
var ETA={ouvert:[_T("Ouvert"),P.warn],en_cours:[_T("En cours"),P.info],
resolu:[_T("Resolu"),P.ok],ferme:[_T("Ferme"),P.faint]};
function ic(c){return (CAT[c]||["courrier",P.sub])[0];}
function co(c){return (CAT[c]||["courrier",P.sub])[1];}

if(f&&f.ticket){
var t=f.ticket;
var ec=(ETA[t.etat]||[t.etat,P.sub]);
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",marginBottom:"14px",flexWrap:"wrap"}},
_NXFX.bouton({t:_T("Retour"),icone:"retour",petit:true,creux:true,col:P.sub,
onClick:function(){try{if(window._NXTK)_NXTK.ferme();}catch(_){}
_NXADMIN.fil=null;_NXADMIN.filId=null;_NXADMIN.chargeTickets(null);force();}}),
_NXFX.pastille(ic(t.categorie),{col:co(t.categorie),taille:32,hv:"penche"}),
i("div",{style:{flex:1,minWidth:"150px"}},
i("div",{style:{fontSize:"14px",fontWeight:"700",color:P.txt}},_NXtr(t.sujet)),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px",fontFamily:_NXf.mono}},
(t.pseudo?(_NXtr(t.pseudo)+" \u00b7 "):"")+_NXtr(t.discord_id)+" \u00b7 "+_NXtr(quand(t.cree_le)))),
_NXFX.badge(_NXtr(ec[0]),ec[1],{point:t.etat==="ouvert",gros:true})),
t.offre?_NXFX.note({col:_NXpal.warn,icone:"etoile",titre:_T("Demande d abonnement"),
texte:_T("Ce ticket porte sur")+" : "+_NXtr(t.offre)+". "+
_T("Tu peux poser l abonnement sans quitter le fil."),
droite:i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
["30","90","365"].map(function(j){
return i("div",{key:j},_NXFX.bouton({t:_NXtr(j)+_NXtr(" j"),petit:true,creux:true,col:_NXpal.warn,
onClick:function(){
// L offre est nommee dans le ticket : on retrouve sa clef au catalogue.
var cle=null,z;
for(z=0;z<(_NXADMIN.offres||[]).length;z++)
if(_NXADMIN.offres[z].nom===t.offre)cle=_NXADMIN.offres[z].offre;
if(!cle){dire({err:_T("Offre introuvable au catalogue : pose-la depuis l onglet Abonnements.")});return;}
_NXADMIN.donneAbo(t.discord_id,cle,j,function(r){
if(r&&r.ok){_NXADMIN.repondTicket(t.id,
_T("Abonnement pose")+" : "+t.offre+" ("+j+" "+_T("jours")+"). "+
_T("Il apparait dans ta page Abonnement."),function(){});
dire(r,_T("Abonnement accorde et annonce dans le fil."));}
else dire(r,"");});}}));}))}):null,
i("div",{ref:tbas,style:{maxHeight:"44vh",minHeight:"170px",overflowY:"auto",
padding:"12px",background:P.bg,borderRadius:"14px",border:"1px solid "+P.line}},
(f.messages||[]).map(function(m,k){
if(m.auteur==="systeme")return i("div",{key:k,style:{textAlign:"center",padding:"7px 0"}},
i("span",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono,
border:"1px solid "+P.line,borderRadius:"99px",padding:"3px 11px"}},_NXtr(m.contenu)));
var moi=m.auteur==="admin";
return i("div",{key:k,style:{display:"flex",justifyContent:moi?"flex-end":"flex-start",
marginBottom:"11px"}},
i("div",{style:{maxWidth:"80%"}},
i("div",{style:{display:"flex",gap:"7px",marginBottom:"5px",
justifyContent:moi?"flex-end":"flex-start"}},
i("span",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".1em",
textTransform:"uppercase",color:moi?_NXpal.warn:P.dim}},
moi?_T("Equipe"):(_NXtr(t.pseudo)||_T("Utilisateur"))),
i("span",{style:{fontSize:"10px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(quand(m.a)))),
i("div",{style:{padding:"11px 14px",
borderRadius:moi?"14px 14px 4px 14px":"14px 14px 14px 4px",
background:moi?_NXteinte(_NXpal.warn,9):P.raise,
border:"1px solid "+(moi?_NXteinte(_NXpal.warn,24):P.hair),
color:P.txt,fontSize:"13px",lineHeight:1.65,whiteSpace:"pre-wrap",
overflowWrap:"anywhere",userSelect:"text",WebkitUserSelect:"text"}},_NXtr(m.contenu))));})),
t.etat==="ferme"?_NXFX.note({col:P.faint,icone:"cadenas",serre:true,
texte:_T("Ce ticket est ferme : l utilisateur ne peut plus y ecrire.")})
:i("div",{style:{marginTop:"12px"}},
_NXtr(reponsesTypes()),
_NXFX.champ({multi:true,lignes:3,serre:true,v:trep[0],ph:_T("Ta reponse\u2026"),
onChange:function(e){trep[1](e.target.value);},
onKeyDown:function(e){try{e.stopPropagation();
if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();
var v=trep[0];if(!v.trim())return;trep[1]("");
_NXADMIN.repondTicket(t.id,v,function(r){dire(r,"");});}}catch(_){}}}),
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
_NXFX.bouton({t:_T("Repondre"),icone:"envoi",plein:true,col:_NXpal.warn,onClick:function(){
var v=trep[0];if(!v.trim())return;trep[1]("");
_NXADMIN.repondTicket(t.id,v,function(r){dire(r,"");});}}),
_NXFX.bouton({t:_T("Marquer resolu"),icone:"check",creux:true,col:P.ok,onClick:function(){
_NXADMIN.etatTicket(t.id,"resolu",function(r){dire(r,_T("Ticket marque resolu."));});}}),
_NXFX.bouton({t:_T("Fermer"),icone:"cadenas",creux:true,col:P.danger,onClick:function(){
_NXADMIN.etatTicket(t.id,"ferme",function(r){dire(r,_T("Ticket ferme."));});}})))),{mb:0})));}

var vues=L;
if(tfiltre[0])vues=L.filter(function(x){return x.etat===tfiltre[0];});
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
_NXch(_T("File de support"),
L.length?(_NXADMIN.enAttente()+" "+_T("en attente de reponse, sur")+" "+_NXtr(L.length)):_T("Aucun ticket."),
_NXFX.bouton({t:_T("Rafraichir"),icone:"maj",hv:"tourne",petit:true,creux:true,col:P.sub,
onClick:function(){_NXADMIN.chargeTickets(tfiltre[0]||null,function(r){dire(r,_T("File rechargee."));});}})),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"14px"}},
[["",_T("Tous")],["ouvert",_T("Ouverts")],["en_cours",_T("En cours")],
["resolu",_T("Resolus")],["ferme",_T("Fermes")]].map(function(x){
var on=tfiltre[0]===x[0];
return i("div",{key:x[0]||"tous"},_NXFX.bouton({t:_NXtr(x[1]),petit:true,
plein:on,creux:!on,col:on?_NXpal.warn:P.sub,
onClick:function(){tfiltre[1](x[0]);_NXADMIN.chargeTickets(x[0]||null);}}));})),
vues.length?vues.map(function(x,k){
var ec=(ETA[x.etat]||[x.etat,P.sub]);
return _NXFX.rangee({key:x.id,premier:k===0,rang:Math.min(6,k+1),
icone:ic(x.categorie),col:x.attente?co(x.categorie):P.faint,
titre:_NXtr(x.sujet),
texte:(x.pseudo?(_NXtr(x.pseudo)+" \u00b7 "):"")+_NXtr(x.discord_id)+" \u00b7 "+
_NXtr(x.messages)+" "+_T("message(s)")+" \u00b7 "+_NXtr(quand(x.maj_le))+
(x.offre?(" \u00b7 "+_NXtr(x.offre)):""),
onClick:function(){_NXADMIN.ouvreFil(x.id,function(){
try{if(window._NXTK)_NXTK.suit(x.id,function(){_NXADMIN.ouvreFil(x.id);});}catch(_){}});},
droite:i("div",{style:{display:"flex",gap:"6px",alignItems:"center"}},
x.attente?_NXFX.badge(_T("a repondre"),_NXpal.warn,{point:true}):null,
_NXFX.badge(_NXtr(ec[0]),ec[1]),
_NXFX.ico("chevron",13,{col:P.faint,hv:"pousse"}))});})
:_NXFX.vide({icone:"courrier",titre:_T("Rien a traiter"),
texte:_T("Les tickets ouverts depuis le client arrivent ici. Ils disparaissent quinze jours apres leur dernier message.")})))));}

// --------------------------------------------------------- les abonnements
function ongletAbos(){
var L=_NXADMIN.abos||[];
var OF=_NXADMIN.offres||[];
var FAM={general:[_NXpal.warn,"etoile"],ia:[_NXpal.mauve,"etincelle"],
privacy:[_NXpal.ok,"oeilBarre"],securite:[_NXpal.danger,"bouclierOk"]};
function couleur(f){return (FAM[f]||[P.sub,"etoile"])[0];}
function icone(f){return (FAM[f]||[P.sub,"etoile"])[1];}
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
_NXch(_T("Accorder un abonnement"),
_T("La duree repart de l echeance en cours, pas d aujourd hui : renouveler en avance ne fait perdre aucun jour.")),
_NXFX.champ({k:_T("Identifiant Discord"),mono:true,icone:"comptes",v:acle[0],
ph:"546349979757707265",onChange:function(e){acle[1](e.target.value);}}),
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".13em",color:P.dim,
textTransform:"uppercase",marginBottom:"9px"}},_T("Offre")),
OF.length?i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"14px"}},
OF.map(function(o){
var on=aoffre[0]===o.offre;
var c=couleur(o.famille);
return i("div",_NXFX.fusion({key:o.offre,className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){aoffre[1](o.offre);},
title:o.nom+" \u00b7 "+o.prix+" \u20ac / "+o.periode,
style:{display:"flex",alignItems:"center",gap:"7px",padding:"7px 12px",borderRadius:"10px",
cursor:"pointer",border:"1px solid "+(on?c:P.line),
background:on?_NXteinte(c,12):"transparent",
color:on?c:P.sub,fontSize:"11.5px",fontWeight:"700"}},_NXFX.a({"data-nx-appui":"1"})),
_NXFX.ico(icone(o.famille),13),
i("span",null,_NXtr(o.nom)),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint}},
_NXtr(String(o.prix).replace(".00",""))+"\u20ac"));}))
:i("div",{style:{fontSize:"12px",color:P.dim,marginBottom:"14px"}},_T("Catalogue non charge.")),
_NXFX.champ({k:_T("Duree en jours"),mono:true,icone:"horloge",v:ajours[0],ph:"30",
onChange:function(e){ajours[1](e.target.value);},
aide:estProp?_T("Laisse vide pour un abonnement sans echeance.")
:_T("Un operateur ne pose que des abonnements a duree limitee.")}),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap"}},
_NXFX.bouton({t:_T("Accorder"),icone:"etoile",plein:true,col:_NXpal.warn,onClick:function(){
var j=String(ajours[0]||"").trim();
_NXADMIN.donneAbo(acle[0],aoffre[0],j?j:null,function(r){
if(r&&r.ok){acle[1]("");dire(r,_T("Abonnement accorde."));}
else dire(r,"");});}}),
["7","30","90","365"].map(function(v){
return i("div",{key:v},_NXFX.bouton({t:_NXtr(v)+_NXtr(" j"),petit:true,creux:true,
col:ajours[0]===v?_NXpal.warn:P.faint,onClick:function(){ajours[1](v);}}));}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Abonnements en cours"),L.length?(_NXtr(L.length)+" "+_T("ligne(s)")):_T("Aucun abonnement pose."),
_NXFX.bouton({t:_T("Rafraichir"),icone:"maj",hv:"tourne",petit:true,creux:true,col:P.sub,
onClick:function(){_NXADMIN.chargeOffres();_NXADMIN.chargeAbos("",function(r){dire(r,_T("Liste rechargee."));});}})),
L.length?L.map(function(x,k){
var fini=x.expire_le&&(new Date(x.expire_le)).getTime()<Date.now();
var j=x.expire_le?Math.max(0,Math.ceil(((new Date(x.expire_le)).getTime()-Date.now())/86400000)):null;
return _NXFX.rangee({key:x.discord_id+x.offre,premier:k===0,rang:Math.min(6,k+1),
icone:icone(x.famille),col:fini?P.faint:couleur(x.famille),
titre:_NXtr(x.discord_id),
texte:_NXtr(x.nom)+" \u00b7 "+(x.expire_le
?(fini?_T("expire"):(_NXtr(j)+" "+_T("jour(s) restant(s)")))
:_T("sans echeance"))+(x.par?(" \u00b7 "+_T("par")+" "+_NXtr(x.par)):""),
droite:i("div",{style:{display:"flex",gap:"6px"}},
_NXFX.bouton({t:_NXtr("+30 j"),petit:true,creux:true,col:_NXpal.warn,onClick:function(){
_NXADMIN.donneAbo(x.discord_id,x.offre,30,function(r){dire(r,_T("Prolonge de trente jours."));});}}),
_NXFX.bouton({t:_T("Retirer"),petit:true,creux:true,col:P.danger,onClick:function(){
_NXADMIN.retireAbo(x.discord_id,x.offre,function(r){dire(r,_T("Abonnement retire."));});}}))});})
:_NXFX.vide({icone:"etoile",titre:_T("Aucun abonnement"),
texte:_T("Les comptes connus avant la bascule ont deja tout, sans abonnement.")})))));}

// ------------------------------------------------------------- la session
function ongletSession(){
var d=_NXSTATUS.etatDirect?_NXSTATUS.etatDirect():{};
var reste=Math.max(0,Math.round((_NXADMIN.expire-Date.now())/60000));
return i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Ta session"),_NXtr(_NXADMIN.pseudo)+" · "+(estProp?_NXtr("proprietaire, tous les droits"):_NXtr("operateur, droits limites"))),
_NXFX.grille([
_NXFX.tuile({key:"a",icone:"cle",col:P.ok,titre:_NXtr("Jeton d acces"),sous:_NXtr(reste)+_NXtr(" min restantes"),
texte:_NXtr("Il se renouvelle tout seul une minute avant l echeance. Une demande refusee pour cause de jeton perime est rejouee, une fois."),rang:1}),
_NXFX.tuile({key:"b",icone:_NXADMIN.garde()?"cadenas":"cadenasOuvert",
col:_NXADMIN.garde()?P.info:P.faint,titre:_NXtr("Rester connecte"),
sous:_NXADMIN.garde()?_NXtr("active"):_NXtr("desactive"),
texte:_NXADMIN.garde()?_NXtr("Le jeton de renouvellement est garde sur cette machine, brouille avec l identifiant d installation. Ce brouillage n est pas du chiffrement.")
:_NXtr("Rien n est garde : il faudra se reconnecter a chaque ouverture du client."),
rang:2,bas:_NXFX.bouton({t:_NXADMIN.garde()?_NXtr("Desactiver"):_NXtr("Activer"),petit:true,creux:true,
col:P.sub,onClick:function(){_NXADMIN.setGarde(!_NXADMIN.garde());force();}})}),
_NXFX.tuile({key:"c",icone:"reseau",col:d.ouvert?P.ok:P.warn,titre:_NXtr("Alertes en direct"),
sous:_NXtr(d.etat)||_NXtr("inactif"),
texte:d.ouvert?_NXtr("La table des alertes est diffusee : une alerte posee arrive chez les utilisateurs en une seconde.")
:_NXtr("La liaison permanente n est pas etablie. Le sondage prend le relais toutes les trente secondes."),
rang:3,mv:d.ouvert?"float":null})],250),
i("div",{style:{display:"flex",gap:"9px",marginTop:"16px",flexWrap:"wrap"}},
_NXFX.bouton({t:_NXtr("Renouveler maintenant"),icone:"maj",hv:"tourne",col:P.info,onClick:function(){
_NXADMIN.renouvelle(function(r){dire(r,"Session renouvelee.");});}}),
_NXFX.bouton({t:_NXtr("Tout recharger"),icone:"telecharge",creux:true,col:P.sub,onClick:function(){
_NXADMIN.chargeTout();dire(null,"Tout est en cours de rechargement.");}}),
i("div",{style:{flex:1,minWidth:"8px"}}),
_NXFX.bouton({t:_NXtr("Se deconnecter"),icone:"croix",creux:true,col:P.danger,onClick:function(){
_NXADMIN.deconnexion();}})))),
_NXcard(i("div",null,
_NXch(_NXtr("Journal d audit"),_NXtr("Chaque ouverture, chaque bannissement, chaque credit offert laisse une ligne, cote serveur."),
_NXFX.bouton({t:_NXtr("Charger"),icone:"liste",petit:true,creux:true,col:P.sub,onClick:function(){
_NXADMIN.chargeJournal(function(r){dire(r,"Journal charge.");});}})),
_NXADMIN.journal.length?_NXADMIN.journal.map(function(e,k){
var ic=e.action==="ban_pose"?"banni":(e.action==="ban_leve"?"cadenasOuvert":
(e.action==="credits_don"?"jeton":"crayon"));
var col=e.action==="ban_pose"?P.danger:(e.action==="credits_don"?P.lime:P.sub);
var det="";try{det=e.details?JSON.stringify(e.details).slice(0,120):"";}catch(_){det="";}
return _NXFX.rangee({key:k,premier:k===0,rang:Math.min(6,k+1),icone:ic,col:col,z:28,
titre:(_NXtr(e.pseudo)||"?")+" · "+_NXtr(e.action),
texte:_NXtr(new Date(e.a).toLocaleString("fr-FR"))+(det?(" · "+_NXtr(det)):"")});})
:_NXFX.vide({icone:"liste",titre:_NXtr("Journal vide"),texte:_NXtr("Appuie sur Charger pour le lire.")})))));}

// ------------------------------------------------------------ v203 : la console
var TB=_NXADMIN.tableau||{};
var TM=TB.membres||{},TA=TB.abonnements||{},TT=TB.tickets||{};
function euros(v){try{var n=Number(v)||0;return (Math.round(n*100)/100).toFixed(n%1?2:0).replace(".",",")+" €";}catch(_){return "0 €";}}
function action(a){var L={alerte_ouverte:"alerte publiee",alerte_maj:"alerte mise a jour",alerte_close:"alerte cloturee",ban_pose:"bannissement pose",
ban_leve:"bannissement leve",credits_don:"credits offerts",abo_donne:"abonnement accorde",abo_retire:"abonnement retire",code_cree:"code cree",
code_revoque:"code revoque",menace_statue:"menace examinee",maj_plancher:"version minimale imposee",service_pose:"reglage du service",
essai_efface:"essai rendu",essai:"essai demarre"};return _T(L[a]||String(a||"").replace(/_/g," "));}
function copie(t,quoi){try{var r=_NXpresse(t);var fin=function(ok){dire(ok?null:{err:"La copie a echoue."},(quoi||"Copie")+" : "+t);};
if(r&&r.then)r.then(fin);else fin(r);}catch(_){}}
function kpi(k,v,col,icone,rang,sous){
return i("div",{className:"nxa-carte nxa-entre",style:{position:"relative",overflow:"hidden",padding:"16px 18px",borderRadius:"18px",
animationDelay:(rang*55)+"ms",background:"linear-gradient(160deg,"+_NXteinte(col,10)+","+P.inset+")",border:"1px solid "+_NXteinte(col,24)}},
i("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".13em",textTransform:"uppercase",color:P.dim}},_T(k)),
i("div",{style:{color:_NXteinte(col,80),display:"flex"}},_NXFX.svg(icone,15))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"30px",fontWeight:"800",color:col,marginTop:"8px",letterSpacing:"-.04em",fontVariantNumeric:"tabular-nums"}},_NXtr(v)),
sous?i("div",{style:{fontSize:"10.5px",color:P.faint,marginTop:"2px"}},_NXtr(sous)):null);}
function titreBloc(icone,col,t,s,droite){
return i("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}},
i("div",{style:{width:"34px",height:"34px",borderRadius:"11px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
background:_NXteinte(col,14),border:"1px solid "+_NXteinte(col,30),color:col}},_NXFX.svg(icone,17)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"16px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em"}},_NXtr(t)),
s?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"2px",lineHeight:1.5}},_NXtr(s)):null),_NXtr(droite)||null);}
function panneau(contenu,k){return i("div",{className:"nxa-carte nxa-entre",style:{padding:"20px",borderRadius:"20px",background:P.panel,
border:"1px solid "+P.line,marginBottom:"14px",animationDelay:((k||0)*60)+"ms"}},_NXtr(contenu));}
function puceChoix(txt,on,col,fn,k){return i("div",{key:k===undefined?txt:k,className:"nx-fx nxa-puce",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-pressed":on?"true":"false",onClick:fn,
style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"7px 12px",borderRadius:"99px",cursor:"pointer",fontSize:"12px",fontWeight:"700",
color:on?P.txt:P.sub,background:on?_NXteinte(col,16):"transparent",border:"1px solid "+(on?_NXteinte(col,50):P.line)}},_NXtr(txt));}

function heroAdmin(){
var d=_NXSTATUS.etatDirect?_NXSTATUS.etatDirect():{};
return i("div",{className:"nxa-entre",style:{position:"relative",overflow:"hidden",borderRadius:"26px",padding:"24px 26px",marginBottom:"16px",
border:"1px solid "+_NXteinte(P.warn,28),background:"linear-gradient(135deg,"+_NXteinte(P.warn,12)+","+P.panel+" 50%,"+P.bg+")"}},
i("div",{"aria-hidden":"true",style:{position:"absolute",right:"-100px",top:"-120px",width:"340px",height:"340px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(P.warn,16)+",transparent 68%)"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"}},
i("div",{className:"nxa-flotte",style:{position:"relative",width:"76px",height:"76px",flexShrink:0}},
i("div",{className:"nxa-tourne",style:{position:"absolute",inset:0,borderRadius:"50%",
background:"conic-gradient(from 0deg,transparent 0 55%,"+_NXteinte(P.warn,80)+" 100%)",
WebkitMask:"radial-gradient(circle,transparent 34px,#000 35px)",mask:"radial-gradient(circle,transparent 34px,#000 35px)"}}),
i("div",{style:{position:"absolute",inset:"7px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
background:_NXteinte(P.warn,12),border:"1px solid "+_NXteinte(P.warn,40),color:P.warn}},_NXFX.svg("couronne",30))),
i("div",{style:{flex:"1 1 260px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}},
i("span",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".2em",textTransform:"uppercase",color:P.faint}},_NXtr("Nexium Admin")),
i("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"10.5px",fontWeight:"700",color:d.ouvert?P.ok:P.warn}},
i("span",{className:"nxa-vif",style:{width:"6px",height:"6px",borderRadius:"50%",background:d.ouvert?P.ok:P.warn}}),
d.ouvert?_T("en direct"):_T("sondage toutes les 30 s"))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"28px",fontWeight:"800",color:P.txt,letterSpacing:"-.035em",marginTop:"6px"}},
_T("Bonjour")+" "+_NXtr(String(_NXADMIN.pseudo||""))),
i("div",{style:{fontSize:"12.5px",color:P.sub,marginTop:"4px"}},
estProp?_T("Proprietaire : tous les droits. Chaque action est verifiee par le serveur et inscrite au journal.")
:_T("Operateur : droits limites. Chaque action est verifiee par le serveur et inscrite au journal."))),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXFX.bouton({t:_T("Tout recharger"),icone:"maj",hv:"tourne",petit:true,creux:true,col:P.sub,onClick:function(){_NXADMIN.chargeTout();dire(null,"Tout est en cours de rechargement.");}}))),
i("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"10px",marginTop:"20px"}},
_NXtr(kpi("Actifs 24 h",_NXn(cAct),P.ok,"pouls",0,(TM.actifs_7j!==undefined)?(TM.actifs_7j+" "+_T("sur 7 jours")):null)),
_NXtr(kpi("Membres",_NXn(cMem),P.info,"comptes",1,(TM.actifs_30j!==undefined)?(TM.actifs_30j+" "+_T("actifs sur 30 jours")):null)),
_NXtr(kpi("Abonnes",_NXn(cAbo),P.mauve,"etoile",2,(TA.essais_en_cours!==undefined)?(TA.essais_en_cours+" "+_T("essai(s) en cours")):null)),
_NXtr(kpi("Revenu mensuel",euros(TA.revenu_mensuel_estime),P.lime,"graphe",3,_T("estime au prix du catalogue"))),
_NXtr(kpi("A repondre",_NXn(cRep),cRep?P.warn:P.faint,"courrier",4,(TT.ouverts!==undefined)?(TT.ouverts+" "+_T("ticket(s) ouvert(s)")):null)),
_NXtr(kpi("A examiner",_NXn(cExa),cExa?P.danger:P.faint,"bouclier",5,_T("alertes et menaces")))));}

// ------------------------------------------------------------ le tableau de bord
function ongletTableau(){
var N=TB.nouveaux_14j||[];var mx=1,a;for(a=0;a<N.length;a++)if(N[a].n>mx)mx=N[a].n;
var PF=TA.par_famille||{};var fams=[["general","Nexium",P.warn],["ia","IA",P.mauve],["privacy","Privacy",P.ok],["securite","Security",P.danger]];
var mxF=1;fams.forEach(function(f){if((PF[f[0]]||0)>mxF)mxF=PF[f[0]];});
var V=CH.versions||{},vk=[],kk;for(kk in V)vk.push(kk);vk.sort(function(x,y){return V[y]-V[x];});var mxV=vk.length?V[vk[0]]:1;
var AF=[["tickets","courrier",P.warn,TT.a_repondre||0,"ticket(s) attendent ta reponse"],
["alertes","alerte",P.danger,TB.alertes_ouvertes||0,"alerte(s) visibles par les utilisateurs"],
["menaces","bouclier",P.mauve,TB.menaces_proposees||0,"domaine(s) proposes a examiner"],
["menaces","drapeau",P.info,TB.signalements_7j||0,"signalement(s) de liens sur 7 jours"],
["codes","jeton",P.lime,TB.codes_actifs||0,"code(s) promo encore utilisables"],
["bans","banni",P.danger,TB.bannis||0,"bannissement(s) en vigueur"]];
var J=TB.journal||[];
return i("div",null,
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"14px"}},
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("comptes",P.info,_T("Nouveaux membres"),_T("Premiers lancements, jour par jour, sur 14 jours."))),
N.length?i("div",null,
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"5px",height:"120px"}},
N.map(function(o,k){var h=o.n?Math.max(6,Math.round(o.n/mx*112)):3;
return i("div",{key:k,title:_NXtr(o.j)+" : "+_NXtr(o.n),className:"nxa-pousse",style:{flex:1,height:h+"px",borderRadius:"6px 6px 3px 3px",animationDelay:(k*35)+"ms",
background:o.n?("linear-gradient(180deg,"+P.info+","+_NXteinte(P.info,35)+")"):P.line}});})),
i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",fontFamily:_NXf.mono,fontSize:"10px",color:P.faint}},
i("span",null,_NXtr("-14 j")),i("span",null,_T("aujourd hui")))):
_NXFX.vide({icone:"comptes",titre:_T("Chargement"),texte:_T("Les chiffres arrivent.")})),0)),
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("etoile",P.mauve,_T("Abonnements actifs"),(TA.actifs||0)+" "+_T("en cours, hors essais")+" · "+(TA.essais_total||0)+" "+_T("essai(s) depuis le debut"))),
fams.map(function(f,k){var v=PF[f[0]]||0;
return i("div",{key:f[0],style:{padding:"8px 0"}},
i("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"12.5px"}},
i("span",{style:{color:P.pale,fontWeight:"700"}},_NXtr(f[1])),i("span",{style:{fontFamily:_NXf.mono,color:P.txt}},_NXtr(String(v)))),
i("div",{style:{height:"7px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{className:"nxa-jauge",style:{height:"100%",width:(monte?Math.round(v/mxF*100):0)+"%",borderRadius:"99px",transitionDelay:(k*90)+"ms",
background:"linear-gradient(90deg,"+_NXteinte(f[2],40)+","+f[2]+")"}})));}),
i("div",{style:{marginTop:"12px",fontSize:"11.5px",color:P.dim,lineHeight:1.55}},
_T("Revenu mensuel estime")+" : "+_NXtr(euros(TA.revenu_mensuel_estime))+". "+_T("Abonnements actifs multiplies par le prix du catalogue ; les essais, les codes et les comptes sans echeance ne comptent pas."))),1))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"14px"}},
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("liste",P.warn,_T("A traiter"),_T("Ce qui attend quelqu un de l equipe."))),
AF.map(function(x,k){return i("div",{key:k,className:"nx-fx nxa-ligne",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){onglet[1](x[0]);},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"10px 12px",borderRadius:"12px",cursor:"pointer",marginBottom:"4px"}},
i("div",{style:{color:x[3]?x[2]:P.faint,display:"flex"}},_NXFX.svg(x[1],16)),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"18px",fontWeight:"800",color:x[3]?x[2]:P.faint,minWidth:"34px"}},_NXtr(String(x[3]))),
i("div",{style:{flex:1,fontSize:"12px",color:P.sub}},_T(x[4])),
_NXFX.svg("chevron",13));})),2)),
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("couches",P.info,_T("Versions en circulation"),_T("Sur les 30 derniers jours."))),
vk.length?vk.slice(0,7).map(function(v,k){return i("div",{key:v,style:{display:"flex",alignItems:"center",gap:"11px",padding:"6px 0"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:k===0?P.txt:P.sub,width:"52px"}},_NXtr("v")+_NXtr(v)),
i("div",{style:{flex:1,height:"7px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{className:"nxa-jauge",style:{height:"100%",width:(monte?Math.round(V[v]/mxV*100):0)+"%",borderRadius:"99px",transitionDelay:(k*70)+"ms",
background:k===0?P.ok:P.info}})),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.dim,width:"38px",textAlign:"right"}},_NXtr(String(V[v]))));})
:_NXFX.vide({icone:"couches",titre:_T("Aucune donnee"),texte:_T("Les versions apparaissent des que des clients se connectent.")})),3))),
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("horloge",P.sub,_T("Derniere activite de l equipe"),_T("Le journal d audit, cote serveur."),
_NXFX.bouton({t:_T("Tout le journal"),petit:true,creux:true,col:P.sub,onClick:function(){onglet[1]("session");_NXADMIN.chargeJournal();}}))),
J.length?J.map(function(e,k){return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"11px",padding:"8px 0",borderBottom:k===J.length-1?"none":"1px solid "+P.line}},
i("span",{style:{width:"8px",height:"8px",borderRadius:"50%",background:k===0?P.warn:P.faint,flexShrink:0}}),
i("span",{style:{fontSize:"12.5px",color:P.txt,fontWeight:"700"}},_NXtr(String(e.pseudo||"?"))),
i("span",{style:{flex:1,fontSize:"12px",color:P.sub}},_NXtr(action(e.action))),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint}},_NXtr(quand(e.a))));})
:_NXFX.vide({icone:"horloge",titre:_T("Rien encore"),texte:_T("Les actions de l equipe apparaitront ici.")})),4)));}

// ------------------------------------------------------------ la fiche d un membre
function fiche360(){
var m=vise[0];var FI=_NXADMIN.fiche;
if(!m&&!FI)return null;
var id=(FI&&FI.id)||(m&&m.user_id);
var U=(FI&&FI.membre)||m||{};
var AB=(FI&&FI.abonnements)||[],BN=(FI&&FI.bans)||[],TK=(FI&&FI.tickets)||[],CD=(FI&&FI.codes)||[],JR=(FI&&FI.journal)||[];
var CR=(FI&&FI.credits)||{bonus:(m&&m.bonus)||0,total_offert:0};
var banni=BN.length>0||(m&&m.banni);
var section=function(t,contenu){return i("div",{style:{marginTop:"16px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".13em",textTransform:"uppercase",color:P.dim,marginBottom:"8px"}},_NXtr(t)),_NXtr(contenu));};
return i("div",{className:"nxa-entre",style:{marginTop:"14px",padding:"20px",borderRadius:"20px",background:"linear-gradient(160deg,"+_NXteinte(banni?P.danger:P.info,8)+","+P.inset+")",
border:"1px solid "+_NXteinte(banni?P.danger:P.info,28)}},
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}},
i("div",{style:{width:"48px",height:"48px",borderRadius:"15px",display:"flex",alignItems:"center",justifyContent:"center",
background:_NXteinte(banni?P.danger:P.info,16),color:banni?P.danger:P.info}},_NXFX.svg("comptes",24)),
i("div",{style:{flex:1,minWidth:"200px"}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"15px",fontWeight:"800",color:P.txt}},_NXtr(String(id))),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px"}},
U.last_seen?(_T("vu il y a")+" "+_NXtr(quand(U.last_seen))+" · "+_T("arrive il y a")+" "+_NXtr(quand(U.first_seen))+(U.version?(_NXtr(" · v")+_NXtr(U.version)):"")+" · "+(_NXtr(U.seen_count)||0)+" "+_T("ouverture(s)"))
:_T("Jamais vu par le client : l identifiant n a pas encore lance Nexium."))),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
_NXFX.bouton({t:_T("Copier l identifiant"),icone:"copie",petit:true,creux:true,col:P.sub,onClick:function(){copie(String(id),"Identifiant");}}),
_NXFX.bouton({t:_T("Fermer"),petit:true,creux:true,col:P.faint,onClick:function(){vise[1](null);_NXADMIN.fermeFiche();}}))),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"12px"}},
_NXFX.badge(banni?_T("banni"):_T("en regle"),banni?P.danger:P.ok,{point:true}),
_NXFX.badge((_NXtr(CR.bonus)||0)+" "+_T("credits"),CR.bonus?P.lime:P.faint,{icone:"jeton"}),
_NXFX.badge(FI&&FI.essai?(_T("essai utilise")+" · "+_NXtr(quand(FI.essai.cree_le))):_T("essai disponible"),FI&&FI.essai?P.warn:P.faint,{icone:"cadeau"}),
_NXFX.badge(_NXtr(AB.length)+" "+_T("abonnement(s)"),AB.length?P.mauve:P.faint,{icone:"etoile"})),
!FI?i("div",{style:{marginTop:"12px",fontSize:"12px",color:P.dim}},_T("Chargement de la fiche complete...")):null,
_NXtr(section(_T("Abonnements"),i("div",null,
AB.length?AB.map(function(x,k){var fini=x.expire_le&&(new Date(x.expire_le)).getTime()<Date.now();
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"12px",background:P.bg,border:"1px solid "+P.line,marginBottom:"6px",flexWrap:"wrap"}},
i("div",{style:{flex:1,minWidth:"160px"}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:fini?P.dim:P.txt}},_NXtr(String(x.nom||x.offre))),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"2px"}},
(x.expire_le?(fini?_T("expire"):(_T("jusqu au")+" "+_NXtr(new Date(x.expire_le).toLocaleDateString()))):_T("sans echeance"))+(x.par?(" · "+_T("par")+" "+_NXtr(x.par)):""))),
_NXFX.bouton({t:_NXtr("+30 j"),petit:true,creux:true,col:P.warn,onClick:function(){_NXADMIN.donneAbo(id,x.offre,30,function(r){dire(r,"Prolonge de trente jours.");_NXADMIN.rafraichitFiche();});}}),
_NXFX.bouton({t:_T("Retirer"),petit:true,creux:true,col:P.danger,onClick:function(){_NXADMIN.retireAbo(id,x.offre,function(r){dire(r,"Abonnement retire.");_NXADMIN.rafraichitFiche();});}}));})
:i("div",{style:{fontSize:"12px",color:P.dim}},_T("Aucun.")),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center",marginTop:"6px"}},
(_NXADMIN.offres||[]).slice(0,6).map(function(o){return puceChoix(o.nom.replace("Nexium ",""),aoffre[0]===o.offre,P.mauve,function(){aoffre[1](o.offre);},o.offre);}),
_NXFX.bouton({t:_T("Accorder")+" "+(_NXtr(ajours[0])||"30")+_NXtr(" j"),icone:"etoile",petit:true,col:P.mauve,onClick:function(){
_NXADMIN.donneAbo(id,aoffre[0],ajours[0]||30,function(r){dire(r,"Abonnement accorde.");_NXADMIN.rafraichitFiche();});}}))))),
_NXtr(section(_T("Credits Nexium IA"),i("div",{style:{display:"flex",gap:"8px",alignItems:"flex-end",flexWrap:"wrap"}},
i("div",{style:{fontSize:"12px",color:P.sub,flex:"1 1 160px"}},(_NXtr(CR.bonus)||0)+" "+_T("restant(s) sur")+" "+(_NXtr(CR.total_offert)||0)+" "+_T("offert(s)")),
i("div",{style:{width:"110px"}},_NXFX.champ({serre:true,mono:true,v:don[0],onChange:function(e){don[1](e.target.value);}})),
i("div",{style:{marginBottom:"8px",display:"flex",gap:"6px"}},
_NXFX.bouton({t:_T("Offrir"),icone:"cadeau",petit:true,plein:true,col:P.lime,onClick:function(){_NXADMIN.donneCredits(id,don[0],function(r){dire(r,don[0]+" credits offerts.");_NXADMIN.rafraichitFiche();});}}),
_NXFX.bouton({t:_T("Retirer"),petit:true,creux:true,col:P.warn,onClick:function(){_NXADMIN.donneCredits(id,-Math.abs(parseInt(don[0],10)||0),function(r){dire(r,"Retire.");_NXADMIN.rafraichitFiche();});}}))))),
_NXtr(section(_T("Essai gratuit"),i("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}},
i("div",{style:{flex:1,fontSize:"12px",color:P.sub}},FI&&FI.essai?(_T("Essai de")+" "+_NXtr(FI.essai.offre)+" "+_T("pris il y a")+" "+_NXtr(quand(FI.essai.cree_le))+"."):_T("Jamais utilise : il peut le demarrer depuis sa page Abonnement.")),
(estProp&&FI&&FI.essai)?_NXFX.bouton({t:_T("Lui rendre l essai"),icone:"cadeau",petit:true,creux:true,col:P.warn,onClick:function(){
_NXADMIN.effaceEssai(id,function(r){dire(r,"Essai rendu : il peut le reprendre.");});}}):null))),
TK.length?_NXtr(section(_T("Tickets"),i("div",null,TK.map(function(t,k){return i("div",{key:k,className:"nx-fx nxa-ligne",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){onglet[1]("tickets");_NXADMIN.ouvreFil(t.id);},
style:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 10px",borderRadius:"10px",cursor:"pointer"}},
_NXFX.svg("courrier",14),i("span",{style:{flex:1,fontSize:"12px",color:P.txt}},_NXtr(String(t.sujet||""))),
_NXFX.badge(_NXtr(String(t.etat||"")),t.etat==="ouvert"?P.warn:P.faint),i("span",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(quand(t.maj_le))));})))):null,
CD.length?_NXtr(section(_T("Codes utilises"),i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
CD.map(function(c,k){return _NXFX.badge(_NXtr(String(c.code))+" · "+_NXtr(quand(c.le)),P.lime,{icone:"jeton",key:k});})))):null,
JR.length?_NXtr(section(_T("Ce que l equipe a fait pour ce compte"),i("div",null,JR.map(function(e,k){
return i("div",{key:k,style:{fontSize:"11.5px",color:P.sub,padding:"4px 0"}},
i("span",{style:{color:P.txt,fontWeight:"700"}},_NXtr(String(e.pseudo||"?")))," · "+_NXtr(action(e.action))+" · "+_NXtr(quand(e.a)));})))):null,
i("div",{style:{display:"flex",gap:"8px",marginTop:"16px",flexWrap:"wrap"}},
banni?_NXFX.bouton({t:_T("Lever le bannissement"),icone:"cadenasOuvert",col:P.ok,onClick:function(){
_NXADMIN.leveBan(String(id),function(r){dire(r,"Bannissement leve.");_NXADMIN.rafraichitFiche();_NXADMIN.chargeMembres(q[0]);});}})
:_NXFX.bouton({t:_T("Bannir..."),icone:"banni",creux:true,col:P.danger,onClick:function(){bcle[1](String(id));bgenre[1]("compte");onglet[1]("bans");}})));}

// ------------------------------------------------------------ les codes promo
function ongletCodes(){
var f=codeF[0];var set=function(k,v){var o={},z;for(z in f)o[z]=f[z];o[k]=v;codeF[1](o);};
var OF=_NXADMIN.offres||[];var L=_NXADMIN.codes||[];
var dernier=codeNeuf[0];
return i("div",null,
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("jeton",P.lime,_T("Creer un code"),estProp?_T("Des jours d abonnement ou des credits, a partager. Chaque code sert une fois par compte et par appareil.")
:_T("Un operateur cree des codes de 30 jours, 500 credits et 50 utilisations au plus."))),
i("div",{style:{display:"flex",gap:"6px",marginBottom:"14px"}},
_NXtr(puceChoix(_T("Jours d abonnement"),f.genre==="abo",P.mauve,function(){set("genre","abo");})),
_NXtr(puceChoix(_T("Credits Nexium IA"),f.genre==="credits",P.lime,function(){set("genre","credits");}))),
f.genre==="abo"?i("div",null,
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"12px"}},
OF.map(function(o){return puceChoix(o.nom,f.offre===o.offre,P.mauve,function(){set("offre",o.offre);},o.offre);})),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center",marginBottom:"12px"}},
["3","7","14","30","90"].map(function(v){return puceChoix(v+" j",f.jours===v,P.mauve,function(){set("jours",v);},"j"+v);}),
i("div",{style:{width:"110px"}},_NXFX.champ({serre:true,mono:true,v:f.jours,ph:_T("jours"),onChange:function(e){set("jours",e.target.value);}}))))
:i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center",marginBottom:"12px"}},
["50","100","250","500"].map(function(v){return puceChoix("+"+v,f.credits===v,P.lime,function(){set("credits",v);},"c"+v);}),
i("div",{style:{width:"110px"}},_NXFX.champ({serre:true,mono:true,v:f.credits,ph:_T("credits"),onChange:function(e){set("credits",e.target.value);}}))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"10px"}},
_NXFX.champ({k:_T("Utilisations"),mono:true,v:f.max,ph:"1",onChange:function(e){set("max",e.target.value);}}),
_NXFX.champ({k:_T("Valable (jours)"),mono:true,v:f.validite,ph:_T("sans limite"),onChange:function(e){set("validite",e.target.value);}}),
_NXFX.champ({k:_T("Code choisi (facultatif)"),mono:true,v:f.code,ph:_NXtr("NX-XXXXXXXX"),onChange:function(e){set("code",String(e.target.value||"").toUpperCase());}})),
_NXFX.champ({k:_T("Note interne"),v:f.note,ph:_T("pour qui, pourquoi"),onChange:function(e){set("note",e.target.value);}}),
_NXFX.bouton({t:_T("Creer le code"),icone:"jeton",plein:true,large:true,col:P.lime,onClick:function(){
_NXADMIN.creeCode(f,function(r){if(r&&r.ok&&r.data&&r.data.code){codeNeuf[1](r.data.code);set("code","");dire(r,"Code cree : "+r.data.code);}else dire(r,"");});}}),
dernier?i("div",{className:"nxa-pop",style:{marginTop:"14px",display:"flex",alignItems:"center",gap:"12px",padding:"14px 16px",borderRadius:"14px",
background:_NXteinte(P.lime,10),border:"1px dashed "+_NXteinte(P.lime,50)}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"20px",fontWeight:"800",color:P.lime,letterSpacing:".04em",flex:1}},_NXtr(dernier)),
_NXFX.bouton({t:_T("Copier"),icone:"copie",petit:true,col:P.lime,onClick:function(){copie(dernier,"Code");}})):null),0)),
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("liste",P.sub,_T("Codes crees"),L.length?(L.length+" "+_T("code(s)")):_T("Aucun code pour l instant."),
_NXFX.bouton({t:_T("Rafraichir"),icone:"maj",hv:"tourne",petit:true,creux:true,col:P.sub,onClick:function(){_NXADMIN.chargeCodes(function(r){dire(r,"Liste rechargee.");});}}))),
L.length?L.map(function(c,k){
var expire=c.expire_le&&(new Date(c.expire_le)).getTime()<Date.now();
var epuise=c.utilisations>=c.max;
var etat=!c.actif?[_T("revoque"),P.danger]:(expire?[_T("expire"),P.faint]:(epuise?[_T("epuise"),P.warn]:[_T("actif"),P.ok]));
var pct=c.max?Math.round(c.utilisations/c.max*100):0;
return i("div",{key:c.code,className:"nxa-entre",style:{padding:"12px 14px",borderRadius:"14px",background:P.inset,border:"1px solid "+P.line,marginBottom:"8px",animationDelay:(Math.min(k,10)*40)+"ms"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"14px",fontWeight:"800",color:c.actif&&!expire&&!epuise?P.txt:P.dim}},_NXtr(String(c.code))),
_NXFX.badge(_NXtr(etat[0]),etat[1],{point:etat[1]===P.ok}),
i("div",{style:{flex:1,minWidth:"120px",fontSize:"11.5px",color:P.sub}},
c.genre==="abo"?((_NXtr(c.nom)||_NXtr(c.offre))+" · "+_NXtr(c.jours)+" "+_T("jours")):("+"+_NXtr(c.credits)+" "+_T("credits"))),
_NXFX.bouton({t:_T("Copier"),icone:"copie",petit:true,creux:true,col:P.sub,onClick:function(){copie(String(c.code),"Code");}}),
c.actif?_NXFX.bouton({t:_T("Revoquer"),petit:true,creux:true,col:P.danger,onClick:function(){_NXADMIN.revoqueCode(c.code,function(r){dire(r,"Code revoque.");});}}):null),
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"9px"}},
i("div",{style:{flex:1,height:"5px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{className:"nxa-jauge",style:{height:"100%",width:(monte?pct:0)+"%",background:epuise?P.warn:P.lime,borderRadius:"99px"}})),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.dim}},_NXtr(c.utilisations)+" / "+_NXtr(c.max)),
i("span",{style:{fontSize:"10.5px",color:P.faint}},(c.expire_le?(_T("jusqu au")+" "+_NXtr(new Date(c.expire_le).toLocaleDateString())):_T("sans limite"))+(c.par?(" · "+_NXtr(c.par)):"")+(c.note?(" · "+_NXtr(c.note)):""))));})
:_NXFX.vide({icone:"jeton",titre:_T("Aucun code"),texte:_T("Cree un code au-dessus : il s affichera ici avec ses utilisations.")})),1)));}

// ------------------------------------------------------------ les menaces proposees
function ongletMenaces(){
var L=_NXADMIN.menaces||[];var e=_NXADMIN.menEtat||"propose";
var GEN={grabber:["Logger d IP",P.danger],phish:["Hameconnage",P.warn],scam:["Arnaque",P.warn],malware:["Logiciel malveillant",P.danger]};
return panneau(i("div",null,
_NXtr(titreBloc("bouclier",P.mauve,_T("Menaces proposees"),_T("Les domaines signales par la communaute. Valider un domaine l ajoute a la base de tous les clients."))),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"14px"}},
[["propose","A examiner"],["valide","Validees"],["refuse","Refusees"],["tout","Toutes"]].map(function(x){
return puceChoix(_T(x[1]),e===x[0],P.mauve,function(){_NXADMIN.chargeMenaces(x[0],function(r){dire(r,"");});},x[0]);})),
L.length?L.map(function(m,k){var g=GEN[m.genre]||[m.genre||"?",P.sub];
return i("div",{key:m.id,className:"nxa-entre",style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px",borderRadius:"14px",
background:P.inset,border:"1px solid "+P.line,marginBottom:"8px",flexWrap:"wrap",animationDelay:(Math.min(k,10)*40)+"ms"}},
i("div",{style:{minWidth:"38px",textAlign:"center"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"20px",fontWeight:"800",color:m.signalements>=3?P.danger:P.txt}},_NXtr(String(m.signalements||0))),
i("div",{style:{fontSize:"9.5px",color:P.faint}},_T("signal."))),
i("div",{style:{flex:1,minWidth:"180px"}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"13px",fontWeight:"800",color:P.txt,wordBreak:"break-all"}},_NXtr(String(m.hote||""))),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px"}},(m.raison?String(m.raison).slice(0,120)+" · ":"")+_NXtr(quand(m.premier_le))+(m.statue_par?(" · "+_T("par")+" "+_NXtr(m.statue_par)):""))),
_NXFX.badge(_T(g[0]),g[1]),
m.etat!=="valide"?_NXFX.bouton({t:_T("Valider"),icone:"check",petit:true,col:P.ok,onClick:function(){_NXADMIN.statueMenace(m.id,"valide",function(r){dire(r,"Domaine valide : il entre dans la base.");});}}):null,
m.etat!=="refuse"?_NXFX.bouton({t:_T("Refuser"),icone:"croix",petit:true,creux:true,col:P.danger,onClick:function(){_NXADMIN.statueMenace(m.id,"refuse",function(r){dire(r,"Proposition refusee.");});}}):null,
m.etat!=="propose"?_NXFX.bouton({t:_T("Remettre en attente"),petit:true,creux:true,col:P.sub,onClick:function(){_NXADMIN.statueMenace(m.id,"propose",function(r){dire(r,"Remise en attente.");});}}):null);})
:_NXFX.vide({icone:"bouclierOk",col:P.ok,titre:_T("Rien a examiner"),texte:_T("Aucune proposition dans cette liste.")})),0);}

// ------------------------------------------------------------ le service
function ongletService(){
var S=_NXADMIN.service||{};
var lit=function(k){try{return S[k]?S[k].valeur:null;}catch(_){return null;}};
var ess=null;try{ess=JSON.parse(lit("abo_essai")||"null");}catch(_){ess=null;}
var eng=[];try{eng=JSON.parse(lit("abo_engagement")||"[]")||[];}catch(_){eng=[];}
var OF=_NXADMIN.offres||[];
var essO=svcEss[0].offre||(ess&&ess.offre)||"pro";
var essJ=(svcEss[0].jours!==undefined&&svcEss[0].jours!=="")?svcEss[0].jours:(ess?String(ess.jours):"3");
var engL=svcEng[0]||eng.map(function(x){return {jours:String(x.jours),offerts:String(x.offerts)};});
var setEng=function(k,cle,v){var L=engL.map(function(x){return {jours:x.jours,offerts:x.offerts};});L[k][cle]=v;svcEng[1](L);};
var fermeNote=!estProp?_NXFX.note({col:P.warn,icone:"cadenas",texte:_T("Seul le proprietaire modifie ces reglages. Tu les vois tels qu ils sont appliques.")}):null;
return i("div",null,
_NXtr(fermeNote),
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("cadeau",P.rose||P.mauve,_T("Essai gratuit"),_T("Ce que la page Abonnement propose aux nouveaux comptes. Mettre 0 jour coupe l essai."))),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"12px"}},
OF.map(function(o){return puceChoix(o.nom,essO===o.offre,P.rose||P.mauve,function(){if(estProp)svcEss[1]({offre:o.offre,jours:essJ});},o.offre);})),
i("div",{style:{display:"flex",gap:"10px",alignItems:"flex-end",flexWrap:"wrap"}},
i("div",{style:{width:"140px"}},_NXFX.champ({k:_T("Jours"),mono:true,v:essJ,onChange:function(e){if(estProp)svcEss[1]({offre:essO,jours:e.target.value});}})),
i("div",{style:{marginBottom:"12px"}},_NXFX.bouton({t:_T("Enregistrer l essai"),icone:"check",plein:true,col:P.rose||P.mauve,off:!estProp,onClick:function(){
_NXADMIN.poseService("abo_essai",{offre:essO,jours:parseInt(essJ,10)||0},function(r){dire(r,"Essai enregistre.");svcEss[1]({});});}})))),0)),
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("calendrier",P.info,_T("Jours offerts a l engagement"),_T("Au-dela d une duree, des jours en plus. Le serveur les ajoute lui-meme quand un abonnement est accorde."))),
engL.map(function(x,k){return i("div",{key:k,style:{display:"flex",gap:"10px",alignItems:"flex-end",flexWrap:"wrap"}},
i("div",{style:{width:"150px"}},_NXFX.champ({k:k===0?_T("A partir de (jours)"):null,mono:true,serre:true,v:x.jours,onChange:function(e){if(estProp)setEng(k,"jours",e.target.value);}})),
i("div",{style:{width:"150px"}},_NXFX.champ({k:k===0?_T("Jours offerts"):null,mono:true,serre:true,v:x.offerts,onChange:function(e){if(estProp)setEng(k,"offerts",e.target.value);}})),
estProp?i("div",{style:{marginBottom:"8px"}},_NXFX.bouton({t:_T("Retirer"),petit:true,creux:true,col:P.faint,onClick:function(){var L=engL.slice();L.splice(k,1);svcEng[1](L);}})):null);}),
i("div",{style:{display:"flex",gap:"8px",marginTop:"8px"}},
estProp&&engL.length<6?_NXFX.bouton({t:_T("Ajouter un palier"),icone:"plus",petit:true,creux:true,col:P.info,onClick:function(){var L=engL.slice();L.push({jours:"180",offerts:"20"});svcEng[1](L);}}):null,
_NXFX.bouton({t:_T("Enregistrer les paliers"),icone:"check",petit:true,plein:true,col:P.info,off:!estProp,onClick:function(){
var L=engL.map(function(x){return {jours:parseInt(x.jours,10)||0,offerts:parseInt(x.offerts,10)||0};});
_NXADMIN.poseService("abo_engagement",L,function(r){dire(r,"Paliers enregistres.");svcEng[1](null);});}}))),1)),
_NXtr(panneau(i("div",null,
_NXtr(titreBloc("maj",P.warn,_T("Version minimale"),_T("Les clients plus anciens sont pries de se mettre a jour, avec ce message."))),
i("div",{style:{fontSize:"12px",color:P.sub,marginBottom:"10px"}},
_T("Actuellement")+" : "+(lit("maj_min")&&lit("maj_min")!=="0"?(_NXtr("v")+_NXtr(lit("maj_min"))):_T("aucune"))+(lit("maj_message")?(" · « "+_NXtr(lit("maj_message"))+" »"):"")),
i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"flex-end"}},
i("div",{style:{width:"140px"}},_NXFX.champ({k:_T("Version"),mono:true,v:svcMin[0],ph:_NXtr(String(lit("maj_min")||"0")),onChange:function(e){svcMin[1](e.target.value);}})),
i("div",{style:{flex:"1 1 260px"}},_NXFX.champ({k:_T("Message"),v:svcMsg[0],ph:_NXtr(String(lit("maj_message")||_T("Une mise a jour importante est disponible."))),onChange:function(e){svcMsg[1](e.target.value);}}))),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXFX.bouton({t:_T("Imposer cette version"),icone:"maj",plein:true,col:P.warn,onClick:function(){
var v=String(svcMin[0]||lit("maj_min")||"0").replace(/[^0-9]/g,"");
_NXADMIN.posePlancher(v,svcMsg[0]||lit("maj_message")||"",function(r){dire(r,"Version minimale posee : v"+v+".");svcMin[1]("");svcMsg[1]("");});}}),
_NXFX.bouton({t:_T("Lever la contrainte"),petit:true,creux:true,col:P.sub,onClick:function(){
_NXADMIN.posePlancher("0",null,function(r){dire(r,"Plus aucune version minimale.");});}}))),2)));}

// ------------------------------------------------------------ les reponses types
function reponsesTypes(){
var R=_NXADMIN.reponses();
return i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",margin:"10px 0 8px",alignItems:"center"}},
i("span",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:P.dim,marginRight:"4px"}},_T("Reponses types")),
R.map(function(x,k){return i("div",{key:k,className:"nx-fx nxa-puce",role:"button",tabIndex:0,onKeyDown:_NXkey,title:_NXtr(x[1]),
onClick:function(){var v=trep[0];trep[1]((v&&v.trim()?(v.replace(/\s+$/,"")+"\n\n"):"")+x[1]);},
style:{padding:"6px 11px",borderRadius:"99px",cursor:"pointer",fontSize:"11.5px",fontWeight:"700",color:P.sub,border:"1px solid "+P.line}},_NXtr(x[0]));}),
trep[0]&&trep[0].trim().length>10?i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){var t=window.prompt(_T("Nom de cette reponse type"),"");if(t){_NXADMIN.ajouteReponse(t,trep[0]);dire(null,"Reponse type enregistree.");}},
style:{padding:"6px 11px",borderRadius:"99px",cursor:"pointer",fontSize:"11.5px",fontWeight:"800",color:P.warn,border:"1px dashed "+_NXteinte(P.warn,50)}},
"+ "+_T("Garder cette reponse")):null);}

var CSSA=".nxa-anim .nxa-entre{animation:nxaEntre .55s cubic-bezier(.22,1,.36,1) both}"+
"@keyframes nxaEntre{from{opacity:0;transform:translate3d(0,14px,0)}to{opacity:1;transform:none}}"+
".nxa-anim .nxa-pop{animation:nxaPop .5s cubic-bezier(.34,1.56,.64,1) both}"+
"@keyframes nxaPop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}"+
".nxa-anim .nxa-pousse{animation:nxaPousse .8s cubic-bezier(.22,1,.36,1) both;transform-origin:bottom}"+
"@keyframes nxaPousse{from{transform:scaleY(0)}to{transform:scaleY(1)}}"+
".nxa-anim .nxa-tourne{animation:nxaTourne 6s linear infinite}"+
"@keyframes nxaTourne{to{transform:rotate(360deg)}}"+
".nxa-anim .nxa-flotte{animation:nxaFlotte 5s ease-in-out infinite}"+
"@keyframes nxaFlotte{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-4px,0)}}"+
".nxa-anim .nxa-vif{animation:nxaVif 2s ease-in-out infinite}"+
"@keyframes nxaVif{0%,100%{opacity:.35}50%{opacity:1}}"+
".nxa-carte{transition:transform .25s cubic-bezier(.22,1,.36,1),border-color .25s ease,box-shadow .25s ease}"+
".nxa-anim .nxa-carte:hover{transform:translate3d(0,-2px,0)}"+
".nxa-jauge{transition:width 1s cubic-bezier(.22,1,.36,1)}"+
".nxa-ligne{transition:background .2s ease}.nxa-ligne:hover{background:"+_NXteinte(P.txt,5)+"}"+
".nxa-puce{transition:background .2s ease,border-color .2s ease,color .2s ease}"+
".nxa-item{transition:background .2s ease,color .2s ease}.nxa-item:hover{background:"+_NXteinte(P.txt,5)+"}"+
".nxa-grille{display:flex;gap:18px;align-items:flex-start}"+
".nxa-nav{position:sticky;top:12px;width:214px;flex:0 0 214px;display:flex;flex-direction:column;gap:3px;padding:10px;border-radius:20px;"+
"background:"+P.inset+";border:1px solid "+P.line+"}"+
"@media (max-width:900px){.nxa-grille{flex-direction:column}.nxa-nav{position:static;width:auto;flex:none;flex-direction:row;overflow-x:auto}}"+
"@media (prefers-reduced-motion:reduce){.nxa-anim *{animation:none!important}}";

var NAV=[["tableau","Tableau de bord","graphe",""],
["membres","Membres","comptes",""],
["abos","Abonnements","etoile",(_NXADMIN.abos||[]).length||""],
["codes","Codes promo","jeton",""],
["tickets","Tickets","courrier",_NXADMIN.enAttente()||""],
["alertes","Alertes","alerte",ouvertes.length||""],
["menaces","Menaces","bouclier",(TB.menaces_proposees||"")],
["bans","Bans","banni",bansActifs||""],
["credits","Credits","cadeau",""],
["service","Service","reglages",""],
["session","Session","cle",""]];
var ong=onglet[0];
var contenu=ong==="tableau"?ongletTableau():
ong==="membres"?_NXtr(ongletMembres()):
ong==="abos"?_NXtr(ongletAbos()):
ong==="codes"?ongletCodes():
ong==="tickets"?_NXtr(ongletTickets()):
ong==="alertes"?_NXtr(ongletAlertes()):
ong==="menaces"?ongletMenaces():
ong==="bans"?_NXtr(ongletBans()):
ong==="credits"?_NXtr(ongletCredits()):
ong==="service"?ongletService():_NXtr(ongletSession());
var anA=_NXFX.anime();
return i("div",{className:anA?"nxa-anim":"",style:{maxWidth:"1180px",margin:"0 auto"}},
i("style",null,CSSA),
_NXtr(heroAdmin()),
msg[0]?_NXFX.note({col:msg[0].ko?P.danger:P.ok,icone:msg[0].ko?"alerte":"check",texte:_NXtr(msg[0].t)}):null,
i("div",{className:"nxa-grille"},
i("nav",{className:"nxa-nav","aria-label":_T("Sections de l administration")},
NAV.map(function(x){var on=ong===x[0];
return i("div",{key:x[0],className:"nx-fx nxa-item",role:"tab",tabIndex:0,onKeyDown:_NXkey,"aria-selected":on?"true":"false",
onClick:function(){onglet[1](x[0]);
try{if(x[0]==="codes")_NXADMIN.chargeCodes();if(x[0]==="menaces")_NXADMIN.chargeMenaces(_NXADMIN.menEtat||"propose");
if(x[0]==="service")_NXADMIN.chargeService();if(x[0]==="tableau")_NXADMIN.chargeTableau();}catch(_){}},
style:{position:"relative",display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",borderRadius:"12px",cursor:"pointer",whiteSpace:"nowrap",
fontSize:"12.5px",fontWeight:on?"800":"600",color:on?P.txt:P.sub,background:on?_NXteinte(P.warn,12):"transparent"}},
on?i("span",{"aria-hidden":"true",style:{position:"absolute",left:"-10px",top:"9px",bottom:"9px",width:"3px",borderRadius:"0 3px 3px 0",background:P.warn}}):null,
i("span",{style:{display:"flex",color:on?P.warn:P.faint}},_NXFX.svg(x[2],16)),
i("span",{style:{flex:1}},_T(x[1])),
(x[3]!==""&&x[3]!==0&&x[3]!==undefined&&x[3]!==null)?i("span",{style:{minWidth:"18px",height:"18px",padding:"0 6px",borderRadius:"99px",
display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"900",fontFamily:_NXf.mono,
background:on?P.warn:_NXteinte(P.warn,18),color:on?P.ink:P.warn}},_NXtr(String(x[3]))):null);})),
i("div",{key:ong,className:"nxa-entre",style:{flex:1,minWidth:0}},_NXtr(contenu))),
_NXfoot(_NXtr("Nexium Admin · les droits sont verifies par Supabase, pas par le client")));
}
