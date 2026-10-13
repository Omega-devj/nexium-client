var NexiumSponsorIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("coeur",z):null;};
function fmtN(n){if(n==null)return "—";if(n>=1000)return (n/1000).toFixed(n>=10000?0:1).replace(".0","")+"k";return ""+n;}
function InviteCard(){
var P=_NXpal;var d=_NXSP.data;var bn=_NXSP.banner();var ic=_NXSP.icon();var on=_NXSP.online(),mb=_NXSP.members();
return i("div",{style:{position:"relative",overflow:"hidden",borderRadius:"18px",border:"1px solid "+P.line,background:P.panel,boxShadow:"0 12px 40px rgba(0,0,0,.35)"}},
i("div",{style:{position:"relative",height:"128px",background:bn?_NXpal.bg:"linear-gradient(120deg,#5865f2,#7c4dff 55%,#3a1d8a)"}},bn?i("img",{src:bn,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}}):null,i("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 40%, rgba(11,11,12,.85))"}})),
i("div",{style:{position:"relative",padding:"0 20px 20px"}},
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"15px",marginTop:"-34px"}},
i("div",{style:{width:"72px",height:"72px",borderRadius:"20px",flexShrink:0,border:"4px solid "+P.panel,background:P.inset,overflow:"hidden",boxShadow:"0 6px 18px rgba(0,0,0,.4)"}},ic?i("img",{src:ic,style:{width:"100%",height:"100%",objectFit:"cover"}}):i("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:_NXf.disp,fontWeight:"800",color:P.sub,fontSize:"26px"}},_NXtr(_NXSP.name().charAt(0).toUpperCase()))),
i("div",{style:{flex:1,minWidth:0,paddingBottom:"4px"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"19px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXSP.loading&&!d?_NXtr("Chargement…"):_NXSP.name()),
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",marginTop:"5px",fontSize:"12px",color:P.sub}},
i("span",{style:{display:"flex",alignItems:"center",gap:"6px"}},i("span",{style:{width:"8px",height:"8px",borderRadius:"50%",background:_NXpal.ok,flexShrink:0}}),_NXtr(fmtN(on))+_NXtr(" en ligne")),
i("span",{style:{display:"flex",alignItems:"center",gap:"6px"}},i("span",{style:{width:"8px",height:"8px",borderRadius:"50%",background:P.faint,flexShrink:0}}),_NXtr(fmtN(mb))+_NXtr(" membres"))))),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){_NXSP.join();},style:{marginTop:"16px",padding:"13px",borderRadius:"12px",background:_NXpal.ok,color:"#fff",fontSize:"14px",fontWeight:"800",textAlign:"center",cursor:"pointer",letterSpacing:"-.01em"}},_NXSP.err&&!d?_NXtr("Ouvrir discord.gg/")+_NXtr(_NXSP.CODE):_NXtr("Rejoindre le serveur")),
i("div",{style:{fontSize:"11px",color:P.faint,marginTop:"9px",textAlign:"center",fontFamily:_NXf.mono}},_NXtr("discord.gg/")+_NXtr(_NXSP.CODE))));
}
function SlotCard(slot,idx){
var P=_NXpal;var t=slot.tier;
var card=_NXSP.cards[slot.code];
var g=card&&card.guild;
var icon=g?_NXSP.iconUrl(g):null;
return i("div",{key:idx,style:{position:"relative",overflow:"hidden",borderRadius:"15px",border:"1px solid "+t.color+"3d",background:P.panel,padding:"15px 16px",marginBottom:"9px"}},
i("div",{style:{position:"absolute",insetBlock:0,left:0,width:"3px",background:t.color}}),
i("div",{style:{display:"flex",alignItems:"center",gap:"13px"}},
i("div",{style:{width:"46px",height:"46px",borderRadius:"14px",flexShrink:0,overflow:"hidden",background:P.inset,border:"1px solid "+P.line,display:"flex",alignItems:"center",justifyContent:"center"}},
icon?i("img",{src:icon,width:46,height:46,style:{width:"46px",height:"46px",objectFit:"cover"}})
:i("span",{style:{fontFamily:_NXf.disp,fontWeight:"800",fontSize:"17px",color:P.dim}},g&&g.name?_NXtr(String(g.name).charAt(0).toUpperCase()):"?")),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"7px",flexWrap:"wrap"}},
i("span",{style:{fontSize:"14px",fontWeight:"700",color:P.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},g&&g.name?_NXtr(g.name):(card&&card.err?_T("Invitation expirée"):_T("Chargement…"))),
i("span",{style:{fontSize:"9px",fontWeight:"800",letterSpacing:".1em",textTransform:"uppercase",color:t.color,border:"1px solid "+t.color+"55",borderRadius:"99px",padding:"2px 7px",flexShrink:0}},_T(t.label))),
card&&card.members?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px"}},
_NXn(card.members)+" "+_T("membres")+(card.online?(" · "+_NXn(card.online)+" "+_T("en ligne")):"")):null),
g?i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){_NXSP.join(slot.code);},
style:{flexShrink:0,padding:"9px 16px",borderRadius:"10px",background:t.color,color:"#fff",fontSize:"12.5px",fontWeight:"800",cursor:"pointer"}},_T("Rejoindre")):null));
}
function FreeSlot(idx,onClick){
var P=_NXpal;
return i("div",{key:"free"+idx,className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{borderRadius:"15px",border:"1px dashed "+P.hair,background:"transparent",padding:"15px 16px",marginBottom:"9px",cursor:"pointer",display:"flex",alignItems:"center",gap:"13px",transition:"border-color .16s ease"}},
i("div",{style:{width:"46px",height:"46px",borderRadius:"14px",flexShrink:0,border:"1px dashed "+P.hair,display:"flex",alignItems:"center",justifyContent:"center",color:P.faint,fontSize:"22px",fontWeight:"300"}},"+"),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"14px",fontWeight:"700",color:P.sub}},_T("Place disponible")),
i("div",{style:{fontSize:"11.5px",color:P.faint,marginTop:"3px"}},_T("Réserve-la maintenant, elle est libre"))),
i("div",{style:{flexShrink:0,padding:"9px 16px",borderRadius:"10px",border:"1px solid "+P.line,color:P.sub,fontSize:"12.5px",fontWeight:"800"}},_T("Réserver")));
}
function NexiumSponsorComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){_NXSP.listeners.push(force);_NXSP.loadSlots();
return function(){_NXSP.listeners=_NXSP.listeners.filter(function(f){return f!==force;});};},[]);
var P=_NXpal;
var copie=F.useState(false),setCopie=copie[1];
var ouvQ=F.useState(-1);
var monte=_NXmounted(F);
var an=_NXFX.anime();
var f=_NXSP.free();
var libres=f.left;
// Combien de clients voient cette page. Le chiffre vient du meme service que
// les badges : il n est pas invente, et s il manque on ne l affiche pas.
var audience=0;
try{audience=(window._NXBADGE&&_NXBADGE.count)||0;}catch(_){}

function contact(){try{
DiscordNative.clipboard.copy("5dj0");
setCopie(true);setTimeout(function(){try{setCopie(false);}catch(_){}},2200);
if(window._NXPR&&_NXPR.toast)_NXPR.toast(_T("Pseudo copie : 5dj0"),1);}catch(_){}}

// ------------------------------------------------------------ les emplacements
// Ce que voit un utilisateur aujourd hui. Une place libre est montree comme
// libre : c est l argument le plus honnete, et le plus efficace.
function emplacement(s,k){
var c=_NXSP.cards[s.code]||{};
var g=c.guild;
var col=s.tier.color;
return i("div",_NXFX.fusion({key:s.code,style:{position:"relative",overflow:"hidden",
padding:"15px",borderRadius:"16px",background:_NXteinte(col,6),
border:"1px solid "+_NXteinte(col,26)}},
_NXFX.a({"data-nx-tile":"1","data-nx-rise":String(Math.min(6,k+1))})),
i("div",{style:{display:"flex",alignItems:"center",gap:"13px"}},
g&&_NXSP.iconUrl(g)?i("img",{src:_NXSP.iconUrl(g),alt:"",
style:{width:"46px",height:"46px",borderRadius:"14px",flexShrink:0,display:"block",
border:"1px solid "+P.hair}})
:_NXFX.pastille("globe",{col:col,taille:46,halo:true,hv:"penche"}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"7px",marginBottom:"4px"}},
_NXFX.badge(_NXtr(s.tier.label),col),
c.loading?i("span",{style:{fontSize:"10px",color:P.faint}},_T("chargement…")):null),
i("div",{style:{fontSize:"14px",fontWeight:"700",color:P.txt,
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},
g?_NXtr(g.name):(_NXtr("discord.gg/")+_NXtr(s.code))),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px"}},
(c.members!=null)?(_NXn(c.members)+" "+_T("membres")+
(c.online!=null?(" · "+_NXn(c.online)+" "+_T("en ligne")):"")):
(c.err?_T("invitation expiree"):_T("invitation Discord"))))),
i("div",{style:{marginTop:"12px"}},
_NXFX.bouton({t:_T("Rejoindre"),icone:"externe",large:true,col:col,plein:true,
onClick:function(){_NXSP.join(s.code);}})));}

function placeLibre(k){
return i("div",_NXFX.fusion({key:"libre"+k,style:{position:"relative",overflow:"hidden",
padding:"15px",borderRadius:"16px",background:P.inset,
border:"1px dashed "+P.edge,minHeight:"128px",display:"flex",flexDirection:"column",
alignItems:"center",justifyContent:"center",textAlign:"center",gap:"10px"}},
_NXFX.a({"data-nx-tile":"1","data-nx-rise":String(Math.min(6,k+1))})),
i("div",_NXFX.fusion({style:{color:P.faint}},an?{"data-nx-float":"1"}:{}),_NXFX.svg("plus",26)),
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.pale}},_T("Place libre")),
i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.5,maxWidth:"200px"}},
_T("Ton serveur, ici, vu par tous ceux qui ouvrent cette page.")),
_NXFX.bouton({t:_T("La prendre"),icone:"fleche",petit:true,creux:true,col:P.acc,onClick:contact}));}

// ---------------------------------------------------------------- avantages
// Chacun dit ce qu il est vraiment. Ce qui depend d un geste humain est
// annonce comme tel : promettre de l automatique qui n existe pas serait
// le meilleur moyen de perdre la personne au deuxieme mois.
var AVANTAGES=[
{ic:"grille",c:P.acc,t:_T("Un emplacement dans le client"),
d:_T("Ton serveur apparait sur cette page, avec son icone, son nom et son nombre de membres, chez chaque personne qui ouvre Nexium."),
e:_T("en place, automatique")},
{ic:"jeton",c:P.lime,t:_T("Des credits Nexium IA chaque mois"),
d:_T("Un lot de credits pose sur ton compte Discord. Ils sont depenses avant le quota normal, et rendus si une demande echoue."),
e:_T("en place, credite a la main")},
{ic:"etoile",c:P.warn,t:_T("Ton nom au generique"),
d:_T("Cite dans les notes de version publiees avec le client, et sur la page de l equipe."),
e:_T("a chaque version")},
{ic:"maj",c:P.info,t:_T("Les versions en avance"),
d:_T("Tu recois la version avant sa publication, avec ce qui change et ce qui reste a verifier."),
e:_T("avant chaque sortie")},
{ic:"courrier",c:P.mauve,t:_T("Une ligne directe"),
d:_T("Un message prive au createur, sans passer par un serveur ni une file. Une reponse sous 48 h."),
e:_T("pas de serveur a rejoindre")},
{ic:"cible",c:P.cyan,t:_T("Tes demandes passent devant"),
d:_T("Une fonction, un reglage, une protection : ta demande est etudiee en premier, et tu sais pourquoi si elle est refusee."),
e:_T("priorite reelle, pas garantie d acceptation")}];

// ------------------------------------------------------------------ formules
function formule(o,k){
var vedette=!!o.vedette;
var pris=(f.byTier[o.k]||0);
var reste=Math.max(0,(o.places||1)-pris);
return i("div",_NXFX.fusion({key:o.k,style:{position:"relative",flex:"1 1 236px",minWidth:"224px",
borderRadius:"20px",padding:vedette?"26px 20px 22px":"22px 20px",
background:vedette?("linear-gradient(168deg,"+_NXteinte(o.c,13)+","+P.panel+" 62%)"):P.panel,
border:"1px solid "+(vedette?_NXteinte(o.c,45):P.line),
boxShadow:vedette?("0 16px 46px "+_NXteinte(o.c,13)):"none"}},
_NXFX.a({"data-nx-tile":"1","data-nx-rise":String(k+1)})),
vedette?i("div",_NXFX.fusion({style:{position:"absolute",top:"-11px",left:"50%",
transform:"translateX(-50%)",padding:"4px 13px",borderRadius:"99px",
background:"linear-gradient(100deg,"+o.c+","+P.txt+","+o.c+")",color:P.ink,
fontSize:"9.5px",fontWeight:"900",letterSpacing:".12em",textTransform:"uppercase",
whiteSpace:"nowrap"}},an?{"data-nx-shine":"1"}:{}),_T("Le plus demande")):null,
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"12px"}},
_NXFX.pastille(o.ic,{col:o.c,taille:32,halo:vedette,hv:"secoue"}),
i("div",{style:{fontSize:"10px",fontWeight:"900",letterSpacing:".14em",
textTransform:"uppercase",color:o.c}},_NXtr(o.label))),
i("div",{style:{display:"flex",alignItems:"baseline",gap:"6px",marginBottom:"5px"}},
i("span",{style:{fontFamily:_NXf.disp,fontSize:"31px",fontWeight:"800",color:P.txt,
letterSpacing:"-.04em"}},_NXtr(o.prix)),
i("span",{style:{fontSize:"12px",color:P.dim,fontWeight:"600"}},_NXtr(o.unite))),
i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.55,marginBottom:"14px",minHeight:"36px"}},_NXtr(o.d)),
i("div",{style:{height:"1px",background:P.line,marginBottom:"13px"}}),
o.pts.map(function(x,z){
return i("div",{key:z,style:{display:"flex",gap:"9px",alignItems:"flex-start",marginBottom:"9px"}},
i("div",{style:{color:o.c,flexShrink:0,marginTop:"1px",display:"flex"}},_NXFX.svg("check",13)),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.55}},_NXtr(x)));}),
i("div",{style:{marginTop:"15px"}},
_NXFX.bouton({t:reste>0?_T("Reserver cette place"):_T("Etre prevenu"),
icone:reste>0?"fleche":"cloche",large:true,plein:vedette,col:o.c,onClick:contact})),
i("div",{style:{marginTop:"9px",textAlign:"center",fontSize:"10.5px",
color:reste>0?P.dim:P.faint}},
reste>0?(_NXtr(reste)+" "+_T("place(s) sur")+" "+_NXtr(o.places)):_T("complet pour le moment")));}

var FORMULES=[
{k:"decouverte",label:_T("Decouverte"),c:P.ok,ic:"boussole",prix:"10 €",unite:_T("/ semaine"),places:2,
d:_T("Pour essayer sans engagement, et voir ce que ca ramene."),
pts:[_T("Emplacement dans le client, 7 jours"),_T("100 credits Nexium IA"),
_T("Ton nom au generique de la version en cours")]},
{k:"standard",label:_T("Standard"),c:P.info,ic:"couches",prix:"30 €",unite:_T("/ mois"),places:1,vedette:true,
d:_T("La formule courante : visible en continu, et tu comptes dans les decisions."),
pts:[_T("Emplacement dans le client, 30 jours"),_T("400 credits Nexium IA par mois"),
_T("Les versions en avance"),_T("Ligne directe, reponse sous 48 h"),
_T("Tes demandes etudiees en premier")]},
{k:"exclusif",label:_T("Exclusif"),c:P.warn,ic:"couronne",prix:"75 €",unite:_T("/ trimestre"),places:1,
d:_T("Une seule place, en tete de page, pendant trois mois."),
pts:[_T("Emplacement en tete, 90 jours"),_T("1500 credits Nexium IA"),
_T("Les versions en avance"),_T("Ligne directe, reponse sous 24 h"),
_T("Une fonction de ton choix etudiee en priorite"),_T("Retrait possible au prorata")]}];

var ETAPES=[
{ic:"courrier",t:_T("Tu ecris"),d:_T("Un message prive a 5dj0 sur Discord, avec ton serveur et la formule visee.")},
{ic:"loupe",t:_T("On regarde"),d:_T("Le serveur est verifie : pas d arnaque, pas de contenu interdit, pas de revente de comptes.")},
{ic:"jeton",t:_T("Tu payes"),d:_T("Une fois, pour la duree choisie. Aucun prelevement automatique, aucune reconduction cachee.")},
{ic:"check",t:_T("C est en ligne"),d:_T("Ton emplacement apparait chez tout le monde a la prochaine ouverture du client.")}];

var QUESTIONS=[
[_T("Faut-il rejoindre un serveur Discord ?"),
_T("Non, et il n y en a pas. Tout se fait par message prive avec le createur du client. C est plus court, et personne n a a s inscrire quelque part.")],
[_T("Combien de personnes voient cette page ?"),
audience?(_NXn(audience)+" "+_T("comptes utilisent le client aujourd hui. Une partie ouvre cette page ; le chiffre exact n est pas mesure, parce que le client ne suit personne.")):
_T("Le client ne compte pas les visites : il ne suit personne. Ce qui est verifiable, c est le nombre de comptes qui l utilisent, affiche sur la page Nexium Team.")],
[_T("Que se passe-t-il si mon serveur ne ramene rien ?"),
_T("La formule Exclusif est retirable au prorata. Pour les autres, la duree est courte exprès : tu essaies une semaine avant de t engager plus.")],
[_T("Les credits Nexium IA, c est quoi ?"),
_T("La monnaie de l assistant integre au client. Un lot est pose sur ton compte Discord ; il est depense avant le quota normal, et rendu si une demande echoue.")],
[_T("Quels serveurs sont refuses ?"),
_T("Ceux qui vendent des comptes, du nitro, des services de raid, ou qui hebergent du contenu illegal. Le client existe pour proteger ses utilisateurs : le contredire en page d accueil n aurait aucun sens.")],
[_T("Puis-je changer de serveur en cours de route ?"),
_T("Oui, une fois par periode. Le nouveau serveur passe la meme verification que le premier.")]];

return i(Kr,null,i("div",{style:{maxWidth:"820px",margin:"0 auto"}},

// -------------------------------------------------------------------- l appel
i("div",_NXFX.fusion({style:{position:"relative",overflow:"hidden",borderRadius:"24px",
border:"1px solid "+P.hair,background:"linear-gradient(162deg,"+P.panel+","+P.bg+")",
padding:"32px 28px",marginBottom:"14px"}},_NXFX.a({"data-nx-carte":"1"})),
i("div",_NXFX.fusion({"aria-hidden":"true",style:{position:"absolute",inset:0,pointerEvents:"none",
background:"radial-gradient(112% 128% at 86% -20%,"+_NXteinte(P.mauve,16)+",transparent 58%)"}},
an?{"data-nx-breathe":"1"}:{})),
i("div",{style:{position:"relative"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap",marginBottom:"14px"}},
_NXFX.pastille("coeur",{col:P.rose,taille:34,halo:true,mv:an?"beat":null}),
i("div",{style:{fontSize:"10px",fontWeight:"900",letterSpacing:".2em",
textTransform:"uppercase",color:P.faint}},_T("Partenariat Nexium")),
libres>0?_NXFX.badge(_NXtr(libres)+" "+_T("place(s) libre(s)"),P.ok,{point:true,gros:true})
:_NXFX.badge(_T("complet"),P.warn,{gros:true})),
i("div",_NXFX.fusion({style:{fontFamily:_NXf.disp,fontSize:"36px",fontWeight:"800",color:P.txt,
letterSpacing:"-.042em",lineHeight:1.06,maxWidth:"560px"}},_NXFX.a({"data-nx-blurin":"1"})),
_T("Ton serveur, devant tous ceux qui ouvrent Nexium.")),
i("div",{style:{fontSize:"14px",color:P.sub,marginTop:"14px",lineHeight:1.65,maxWidth:"540px"}},
_T("Quatre emplacements, pas un de plus. Pas de banniere, pas de fenetre qui surgit : une carte propre, avec ton icone et ton nombre de membres en direct, sur une page que les gens ouvrent d eux-memes.")),
i("div",{style:{display:"flex",gap:"26px",flexWrap:"wrap",marginTop:"22px"}},
_NXFX.chiffre({k:_T("Emplacements"),v:_NXSP.MAX,rang:1}),
_NXFX.chiffre({k:_T("Libres"),v:libres,col:libres?P.ok:P.warn,rang:2}),
audience?_NXFX.chiffre({k:_T("Comptes actifs"),v:_NXn(audience),col:P.info,rang:3}):null,
_NXFX.chiffre({k:_T("Engagement"),v:_T("aucun"),col:P.lime,rang:4})),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap",marginTop:"22px"}},
_NXFX.bouton({t:copie[0]?_T("Pseudo copie : 5dj0"):_T("Reserver une place"),
icone:copie[0]?"check":"fleche",plein:true,col:copie[0]?P.ok:P.acc,onClick:contact}),
_NXFX.bouton({t:_T("Voir les formules"),icone:"couches",creux:true,col:P.sub,
onClick:function(){try{var e=document.getElementById("nx-sponsor-formules");
if(e&&e.scrollIntoView)e.scrollIntoView({behavior:"smooth",block:"start"});}catch(_){}}})))),

// ------------------------------------------------------------ ce qui est visible
_NXcard(i("div",null,
_NXch(_T("Ce que ca donne, en ce moment"),
_T("Exactement ce que voit un utilisateur. Les places vides sont montrees vides."),
_NXFX.bouton({t:_T("Rafraichir"),icone:"maj",hv:"tourne",petit:true,creux:true,col:P.sub,
onClick:function(){_NXSP.loadSlots(true);}})),
_NXFX.grille((function(){
var out=[],k;
for(k=0;k<_NXSP.slots.length;k++)out.push(emplacement(_NXSP.slots[k],k));
for(k=_NXSP.slots.length;k<_NXSP.MAX;k++)out.push(placeLibre(k));
return out;})(),238)),{mb:12}),

// ------------------------------------------------------------------ avantages
_NXcard(i("div",null,
_NXch(_T("Ce que tu obtiens"),
_T("Six choses concretes. Ce qui demande un geste humain est annonce comme tel.")),
_NXFX.grille(AVANTAGES.map(function(x,k){
return _NXFX.tuile({key:x.t,icone:x.ic,col:x.c,rang:k+1,hv:"secoue",halo:true,
titre:_NXtr(x.t),texte:_NXtr(x.d),
bas:_NXFX.badge(_NXtr(x.e),x.c)});}),252)),{mb:12}),

// ------------------------------------------------------------------ formules
i("div",{id:"nx-sponsor-formules"},
_NXcard(i("div",null,
_NXch(_T("Les formules"),_T("Trois durees, trois prix. Rien ne se reconduit tout seul.")),
i("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"stretch",
paddingTop:"12px"}},FORMULES.map(formule))),{mb:12})),

// --------------------------------------------------------------- le deroule
_NXcard(i("div",null,
_NXch(_T("Comment ca se passe"),_T("Quatre etapes, une seule personne en face.")),
i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"}},
ETAPES.map(function(e,k){
return i("div",_NXFX.fusion({key:k,style:{flex:"1 1 168px",minWidth:"160px",padding:"15px",
borderRadius:"15px",background:P.inset,border:"1px solid "+P.line,position:"relative"}},
_NXFX.a({"data-nx-tile":"1","data-nx-rise":String(k+1)})),
i("div",{style:{position:"absolute",right:"13px",top:"11px",fontFamily:_NXf.disp,
fontSize:"22px",fontWeight:"800",color:P.line,lineHeight:1}},_NXtr(String(k+1))),
_NXFX.pastille(e.ic,{col:P.acc,taille:30,hv:"saute"}),
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.txt,marginTop:"11px"}},_NXtr(e.t)),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"5px",lineHeight:1.5}},_NXtr(e.d)));}))),{mb:12}),

// ------------------------------------------------------------------ questions
_NXcard(i("div",null,
_NXch(_T("Questions"),_T("Les six qui reviennent le plus.")),
QUESTIONS.map(function(q,k){
var on=ouvQ[0]===k;
return i("div",{key:k,style:{borderTop:k?"1px solid "+P.line:"none"}},
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){ouvQ[1](on?-1:k);},
style:{display:"flex",alignItems:"center",gap:"11px",padding:"14px 2px",cursor:"pointer"}},
i("div",{style:{color:on?P.acc:P.faint,display:"flex",flexShrink:0,
transform:on?"rotate(90deg)":"none",transition:an?"transform .22s cubic-bezier(.22,.8,.28,1)":"none"}},
_NXFX.svg("chevron",14)),
i("div",{style:{flex:1,fontSize:"13px",fontWeight:on?"700":"600",
color:on?P.txt:P.pale}},_NXtr(q[0]))),
on?i("div",_NXFX.fusion({style:{padding:"0 2px 15px 26px",fontSize:"12.5px",color:P.sub,
lineHeight:1.65}},_NXFX.a({"data-nx-zoom":"1"})),_NXtr(q[1])):null);})),{mb:12}),

// -------------------------------------------------------------------- contact
_NXcard(i("div",null,
_NXch(_T("Prendre contact"),_T("Un message prive, c est tout. Pas de formulaire, pas de serveur.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}},
_NXFX.pastille("courrier",{col:P.acc,taille:44,halo:true,mv:an?"float":null}),
i("div",{style:{flex:1,minWidth:"180px"}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"16px",fontWeight:"700",color:P.txt}},_NXtr("5dj0")),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"4px"}},
_T("createur du client · reponse sous 48 h"))),
_NXFX.bouton({t:copie[0]?_T("Copie"):_T("Copier le pseudo"),
icone:copie[0]?"check":"copie",plein:true,col:copie[0]?P.ok:P.acc,onClick:contact}))),{mb:0}),
_NXfoot(_NXtr("Nexium Sponsor · ")+_T("quatre places, aucune reconduction automatique"))));
}

function Mst(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _q0=F.useState("");var q=_q0[0];var setQ=_q0[1];
var _o0=F.useState(0);var ouvert=_o0[0];var setOuvert=_o0[1];
F.useEffect(function(){
var vivant=true;
var maj=function(){if(vivant)force();};
_NXCL.listeners.push(maj);
return function(){vivant=false;
try{_NXCL.listeners=_NXCL.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var monte=_NXmounted(F);
var P=_NXpal;
var st=_NXCL.st;
function depuis(ts){
if(!ts)return _T("jamais");
var sec=Math.floor((Date.now()-ts)/1000);
if(sec<60)return _T("a l instant");
var m=Math.floor(sec/60);
if(m<60)return _T("il y a")+" "+m+" min";
var h=Math.floor(m/60);
if(h<24)return _T("il y a")+" "+h+" h";
return _T("il y a")+" "+Math.floor(h/24)+" j;".slice(0,2);}
function versions(txt){
var out=[],cur=null;
var lignes=String(txt||"").split(/\r?\n/);
for(var a=0;a<lignes.length;a++){
var l=lignes[a].replace(/\s+$/,"");
var t=l.trim();
var mv=t.match(/^#{1,3}\s*v?(\d+)\s*(?:[-\u2014:]\s*(.*))?$/i);
if(mv){cur={n:parseInt(mv[1],10),titre:(mv[2]||"").trim(),sections:[],lignes:[]};out.push(cur);continue;}
if(!cur){
if(/^#{1,3}\s/.test(t))continue;
continue;}
if(/^[=\-_*]{3,}$/.test(t))continue;
if(/^#{1,4}\s/.test(t)){cur.sections.push({t:t.replace(/^#{1,4}\s*/,""),l:[]});continue;}
if(!t)continue;
var texte=t.replace(/^[-*\u2022]\s*/,"");
if(cur.sections.length)cur.sections[cur.sections.length-1].l.push(texte);
else cur.lignes.push(texte);}
return out;}
var V=versions(st.text);
var vq=(q||"").trim().toLowerCase();
if(vq)V=V.filter(function(v){
var t=("v"+v.n+" "+v.titre+" "+v.lignes.join(" ")+" "+v.sections.map(function(x){return x.t+" "+x.l.join(" ");}).join(" ")).toLowerCase();
return t.indexOf(vq)>=0;});
var courante=parseInt((window._NXUP&&_NXUP.VERSION)||"0",10);
var etatC=_NXCL.busy?{t:_T("Actualisation…"),c:P.dim}
:(_NXCL.err?{t:_T("Source injoignable — copie locale"),c:_NXpal.warn}
:{t:_T("Synchronise")+" "+depuis(st.ts),c:_NXpal.ok});
function ligne(txt,k){
return i("div",{key:k,style:{display:"flex",gap:"10px",alignItems:"flex-start",padding:"5px 0"}},
i("div",{style:{width:"4px",height:"4px",borderRadius:"50%",background:P.mute,
flexShrink:0,marginTop:"8px"}}),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.62}},_NXtr(txt)));}
function carte(v,k){
var op=(ouvert===v.n)||(!!vq);
var estCourante=v.n===courante;
return i("div",{key:v.n,"data-nx-tile":op?null:"1",
style:{borderRadius:"16px",marginBottom:"9px",overflow:"hidden",
background:op?P.panel:"transparent",
border:"1px solid "+(estCourante?P.edge:(op?P.hair:P.line))}},
i("div",{className:"nx-fx",role:"button","aria-label":_NXtr("v")+_NXtr(v.n),"aria-expanded":op?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:function(){setOuvert(op&&!vq?-1:v.n);},
style:{display:"flex",alignItems:"center",gap:"13px",padding:"15px 17px",cursor:"pointer"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"17px",fontWeight:"800",flexShrink:0,
color:estCourante?P.txt:P.dim,letterSpacing:"-.03em",width:"46px",
fontVariantNumeric:"tabular-nums"}},_NXtr("v")+_NXtr(v.n)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13.5px",fontWeight:op?"700":"600",color:op?P.txt:P.sub,
letterSpacing:"-.012em",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},
_NXtr(v.titre)||_T("Mise a jour")),
i("div",{style:{fontSize:"10.5px",color:P.faint,marginTop:"3px"}},
(v.sections.length?(_NXtr(v.sections.length)+" "+_T("sections")+" \u00b7 "):"")
+(_NXtr(v.lignes.length)+_NXtr(v.sections.reduce(function(x,y){return x+y.l.length;},0)))+" "+_T("changements"))),
estCourante?i("span",{style:{fontSize:"9px",fontWeight:"800",letterSpacing:".1em",
textTransform:"uppercase",color:_NXpal.ok,border:"1px solid "+_NXpal.ok,
borderRadius:"99px",padding:"3px 8px",flexShrink:0}},_T("installee")):null,
i("span",{"aria-hidden":"true",style:{flexShrink:0,color:P.faint,fontSize:"12px",
transform:op?"rotate(90deg)":"none",transition:"transform .22s ease"}},"\u203a")),
op?i("div",{"data-nx-fade":"1",style:{padding:"0 17px 16px"}},
v.lignes.map(ligne),
v.sections.map(function(sec,k2){
return i("div",{key:k2,style:{marginTop:k2||v.lignes.length?"15px":"0"}},
i("div",{style:{fontSize:"10.5px",fontWeight:"800",letterSpacing:".09em",
textTransform:"uppercase",color:P.dim,marginBottom:"7px",
paddingBottom:"7px",borderBottom:"1px solid "+P.line}},_NXtr(sec.t)),
sec.l.map(ligne));})):null);}
return i(Kr,null,i("div",{style:{maxWidth:"660px",margin:"0 auto"}},
_NXhead(_T("Journal des versions"),_NXtr("Nexium Changelog"),
_T("Chaque version du client, ce qu elle a change et pourquoi. Le journal est recupere depuis le depot Nexium : rien n est envoye en retour.")),
i("div",{"data-nx-panel":"1"},
i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",border:"1px solid "+P.hair,
borderRadius:"22px",background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",
padding:"24px",marginBottom:"14px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"11px",flexWrap:"wrap"}},
i("span",{"data-nx-dot":_NXCL.busy?"1":null,"aria-hidden":"true",
style:{width:"6px",height:"6px",borderRadius:"50%",background:etatC.c,flexShrink:0}}),
i("span",{style:{fontSize:"11px",color:etatC.c,fontWeight:"700"}},_NXtr(etatC.t))),
i("div",{style:{display:"flex",alignItems:"baseline",gap:"13px",flexWrap:"wrap"}},
i("div",{key:"v"+courante,"data-nx-pop":"1",style:{fontFamily:_NXf.disp,fontSize:"40px",
fontWeight:"800",color:P.txt,letterSpacing:"-.05em",lineHeight:1}},_NXtr("v")+_NXtr(courante)),
i("div",{style:{fontSize:"13px",color:P.sub,fontWeight:"600"}},
V.length?(_NXtr(V.length)+" "+_T("versions au journal")):_T("journal en cours de chargement"))),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap",marginTop:"20px"}},
_NXbtn(_NXCL.busy?_T("Actualisation…"):_T("Actualiser"),function(){
if(!_NXCL.busy){_NXCL.refresh();force();}},true),
_NXbtn(_T("Ouvrir le depot"),function(){
try{_NXP.open("https://github.com/Omega-devj/nexium-client");}catch(_){}}),
(window._NXNG)?_NXbtn(_T("Revoir Nexium NEW Gen"),function(){
try{_NXDB.del(_NXNG.KEY);_NXNG.show();}catch(_){}}):null)),
i("div",{style:{position:"relative",marginBottom:"12px"}},
i("input",{value:q,onChange:function(e){setQ(e.target.value);},
placeholder:_T("Chercher dans le journal…"),spellCheck:false,
"aria-label":_T("Chercher dans le journal"),
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"11px 13px",color:P.txt,fontSize:"12.5px",
outline:"none",fontFamily:"inherit"}}),
q?i("div",{className:"nx-fx",role:"button","aria-label":_T("Effacer"),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){setQ("");},
style:{position:"absolute",right:"11px",top:"10px",color:P.faint,fontSize:"14px",
cursor:"pointer",lineHeight:1}},_NXtr("\u00d7")):null),
V.length?i("div",null,V.map(carte))
:_NXcard(i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.65}},
q?_T("Aucune version ne correspond a cette recherche.")
:(_NXCL.busy?_T("Recuperation du journal depuis le depot…")
:_T("Le journal n a pas pu etre recupere. Verifie ta connexion, puis clique sur Actualiser."))),{mb:0})),
_NXfoot(_NXtr("Nexium Changelog · lu depuis le dépôt, aucune donnée envoyée"))));

}