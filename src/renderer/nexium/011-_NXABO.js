var _NXABO=window._NXABO||(window._NXABO={});
if(!_NXABO.boot){try{_NXABO.boot=true;
// Les abonnements Nexium.
//
// Ce module ne DECIDE rien : il lit ce que le serveur repond, et le range.
// Le calcul des niveaux se fait dans la base, pour une raison simple -- un
// client qui tourne sur la machine de l utilisateur peut etre modifie, et
// une regle ecrite ici seule ne vaudrait que pour ceux qui ne cherchent pas.
//
// Ce qui est reellement infalsifiable : Nexium IA, dont le relais verifie le
// niveau de son cote avant de repondre. Pour Protect et Privacy, la limite
// est appliquee dans le COMPORTEMENT -- chaque protection demande la
// permission avant d agir, pas seulement son interrupteur -- et un client
// modifie se voit dans la somme de controle et le controle d integrite.
_NXABO.URL="https://emcoqnvxriyrchmfpunq.supabase.co/rest/v1/rpc/";
_NXABO.CLE="sb_publishable_mhLyot9Dv_VCtWpCbYpngg_evMB79C3";
_NXABO.KEY="nexium_abo";
_NXABO.FRAIS=3600000;      // on redemande au plus une fois par heure
_NXABO.PERIME=604800000;   // au-dela d une semaine sans reponse, le cache ne vaut plus
_NXABO.etat=null;
_NXABO.at=0;
_NXABO.busy=false;
_NXABO.err=null;
_NXABO.listeners=[];
_NXABO.notify=function(){for(var a=0;a<_NXABO.listeners.length;a++){try{_NXABO.listeners[a]();}catch(_){}}};

_NXABO.moi=function(){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getCurrentUser&&US.getCurrentUser();
return (u&&u.id)?String(u.id):"";}catch(_){return "";}};

_NXABO.lis=function(){try{
var r=_NXDB.get(_NXABO.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object"||!d.e)return null;
return d;}catch(_){return null;}};
_NXABO.range=function(e){try{
_NXDB.set(_NXABO.KEY,JSON.stringify({v:1,a:Date.now(),id:_NXABO.moi(),e:e}));}catch(_){}};

// L etat retenu : celui du serveur s il a repondu, sinon le dernier connu,
// a condition qu il concerne bien ce compte et qu il ne soit pas trop vieux.
_NXABO.courant=function(){try{
if(_NXABO.etat)return _NXABO.etat;
var d=_NXABO.lis();
if(!d)return null;
if(d.id&&_NXABO.moi()&&d.id!==_NXABO.moi())return null;
if(d.a&&(Date.now()-d.a)>_NXABO.PERIME)return null;
return d.e;}catch(_){return null;}};

_NXABO.charge=function(force,cb){try{
if(_NXABO.busy){if(cb)cb(null);return;}
if(!force&&_NXABO.at&&(Date.now()-_NXABO.at)<_NXABO.FRAIS){if(cb)cb(_NXABO.etat);return;}
var id=_NXABO.moi();
if(!id){if(cb)cb(null);return;}
_NXABO.busy=true;
_NXNETX.go(_NXABO.URL+"nx_abo_etat",{method:"POST",cache:"no-store",
headers:{apikey:_NXABO.CLE,"Content-Type":"application/json",Accept:"application/json"},
body:JSON.stringify({p_id:id})},20000)
.then(function(r){if(!r||!r.ok)throw 0;return r.json();})
.then(function(j){
_NXABO.busy=false;_NXABO.err=null;_NXABO.at=Date.now();
if(j&&typeof j==="object"){_NXABO.etat=j;_NXABO.range(j);}
try{_NXABO.reconcilie();}catch(_){}
_NXABO.notify();if(cb)cb(_NXABO.etat);})
.catch(function(){
_NXABO.busy=false;_NXABO.err=true;
_NXABO.notify();if(cb)cb(null);});
}catch(_){_NXABO.busy=false;if(cb)cb(null);}};

// -------------------------------------------------------------- les droits
_NXABO.DOMS=[["ia","Nexium IA"],["pr","Nexium Protect"],["pv","Nexium Privacy"]];
// Tant que le serveur n a jamais repondu et qu aucun cache ne subsiste, on
// n enleve rien : punir quelqu un parce qu il est hors ligne serait absurde.
_NXABO.inconnu=function(){return !_NXABO.courant();};
_NXABO.niveau=function(dom){try{
var e=_NXABO.courant();
if(!e)return 3;
var n=e.niveaux&&e.niveaux[dom];
return (typeof n==="number")?n:0;}catch(_){return 3;}};
_NXABO.libre=function(){try{
var e=_NXABO.courant();
if(!e)return true;
return !!(e.pionnier||e.admin);}catch(_){return true;}};
_NXABO.pionnier=function(){try{var e=_NXABO.courant();return !!(e&&e.pionnier);}catch(_){return false;}};
_NXABO.admin=function(){try{var e=_NXABO.courant();return !!(e&&e.admin);}catch(_){return false;}};
_NXABO.offres=function(){try{var e=_NXABO.courant();return (e&&e.offres)||[];}catch(_){return [];}};
_NXABO.permis=function(dom,rang){try{
return _NXABO.niveau(dom)>=(rang||1);}catch(_){return true;}};
// Ce qu il manque pour obtenir un droit : sert a proposer la bonne offre au
// bon endroit, plutot qu un mur sans issue.
_NXABO.manque=function(dom,rang){try{
if(_NXABO.permis(dom,rang))return null;
var f=dom==="ia"?"ia":(dom==="pr"?"securite":"privacy");
return {dom:dom,rang:rang,famille:f,niveau:_NXABO.niveau(dom)};}catch(_){return null;}};
_NXABO.expire=function(offre){try{
var L=_NXABO.offres();
for(var a=0;a<L.length;a++)if(L[a].offre===offre)return L[a].expire_le||null;
return null;}catch(_){return null;}};
// La plus proche echeance, pour prevenir avant la coupure.
_NXABO.prochaine=function(){try{
var L=_NXABO.offres(),min=null,a;
for(a=0;a<L.length;a++){
if(!L[a].expire_le)continue;
var t=(new Date(L[a].expire_le)).getTime();
if(!isFinite(t))continue;
if(min===null||t<min.t)min={t:t,offre:L[a].offre,nom:L[a].nom};}
return min;}catch(_){return null;}};
_NXABO.jours=function(iso){try{
if(!iso)return null;
var d=(new Date(iso)).getTime()-Date.now();
if(!isFinite(d))return null;
return Math.max(0,Math.ceil(d/86400000));}catch(_){return null;}};

// ----------------------------------------------------- remettre les compteurs
// Un reglage verrouille qui se retrouve actif -- fichier modifie a la main,
// sauvegarde importee d un autre compte, abonnement expire -- est remis a
// zero. C est la seule chose que le client puisse faire seul, et elle est
// refaite a chaque chargement.
_NXABO.reconcilie=function(){try{
var n=0;
try{if(window._NXPR&&_NXPR.reconcilie)n+=_NXPR.reconcilie()||0;}catch(_){}
try{if(window._NXP&&_NXP.reconcilie)n+=_NXP.reconcilie()||0;}catch(_){}
if(n)_NXABO.derniereRemise={n:n,a:Date.now()};
return n;}catch(_){return 0;}};

// Le catalogue, tel que le serveur le publie. Le client ne l invente pas :
// un prix code en dur ici finirait par mentir.
_NXABO.CAT=null;_NXABO.catAt=0;
_NXABO.catalogue=function(cb){try{
if(_NXABO.CAT&&(Date.now()-_NXABO.catAt)<21600000){if(cb)cb(_NXABO.CAT);return;}
_NXNETX.go(_NXABO.URL+"nx_offres_liste",{method:"POST",cache:"no-store",
headers:{apikey:_NXABO.CLE,"Content-Type":"application/json",Accept:"application/json"},
body:"{}"},20000)
.then(function(r){if(!r||!r.ok)throw 0;return r.json();})
.then(function(j){
if(j&&j.length!==undefined){_NXABO.CAT=j;_NXABO.catAt=Date.now();}
_NXABO.notify();if(cb)cb(_NXABO.CAT);})
.catch(function(){if(cb)cb(_NXABO.CAT);});
}catch(_){if(cb)cb(_NXABO.CAT);}};

// ------------------------------------------ ce que le serveur offre en plus
// L essai, les credits offerts et l engagement : lus tels que le serveur les
// donne. Rien de tout ca n est decide ici.
_NXABO.essai=function(){try{var e=_NXABO.courant();return (e&&e.essai)||null;}catch(_){return null;}};
_NXABO.enEssai=function(){try{
var L=_NXABO.offres();for(var a=0;a<L.length;a++)if(L[a].essai)return L[a];
return null;}catch(_){return null;}};
_NXABO.credits=function(){try{
var e=_NXABO.courant();return (e&&typeof e.credits==="number")?e.credits:null;}catch(_){return null;}};
_NXABO.engagement=function(){try{
var e=_NXABO.courant();var L=(e&&e.engagement)||[];return (L&&L.length!==undefined)?L:[];}catch(_){return [];}};
// Demander l essai. Le serveur verifie tout : une fois par compte, une fois
// par appareil, jamais pour qui a deja eu une offre.
_NXABO.essaie=function(cb){try{
if(_NXABO._essai){if(cb)cb({ok:false,raison:"Demande deja en cours."});return;}
var id=_NXABO.moi();
if(!id){if(cb)cb({ok:false,raison:"Compte Discord introuvable : attends que le client soit charge."});return;}
var fp="";try{if(window._NXBAN&&_NXBAN.fp)fp=String(_NXBAN.fp()||"");}catch(_){}
_NXABO._essai=true;
_NXNETX.go(_NXABO.URL+"nx_abo_essai",{method:"POST",cache:"no-store",
headers:{apikey:_NXABO.CLE,"Content-Type":"application/json",Accept:"application/json"},
body:JSON.stringify({p_id:id,p_fp:fp})},20000)
.then(function(r){if(!r||!r.ok)throw 0;return r.json();})
.then(function(j){
_NXABO._essai=false;
if(j&&j.ok)_NXABO.charge(true);
if(cb)cb(j||{ok:false,raison:"Reponse vide."});})
.catch(function(){_NXABO._essai=false;
if(cb)cb({ok:false,raison:"Le serveur n a pas repondu. Reessaie dans un instant."});});
}catch(_){_NXABO._essai=false;if(cb)cb({ok:false,raison:"Essai impossible."});}};

// Un code promo : des jours d abonnement ou des credits. Le serveur verifie
// tout ; le client ne fait que transmettre le code, le compte et l appareil.
_NXABO.utiliseCode=function(code,cb){try{
if(_NXABO._code){if(cb)cb({ok:false,raison:"Verification deja en cours."});return;}
var id=_NXABO.moi();
if(!id){if(cb)cb({ok:false,raison:"Compte Discord introuvable : attends que le client soit charge."});return;}
var c=String(code||"").toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,32);
if(c.length<6){if(cb)cb({ok:false,raison:"Ce code n est pas valide."});return;}
var fp="";try{if(window._NXBAN&&_NXBAN.fp)fp=String(_NXBAN.fp()||"");}catch(_){}
_NXABO._code=true;
_NXNETX.go(_NXABO.URL+"nx_code_utilise",{method:"POST",cache:"no-store",
headers:{apikey:_NXABO.CLE,"Content-Type":"application/json",Accept:"application/json"},
body:JSON.stringify({p_id:id,p_code:c,p_fp:fp})},20000)
.then(function(r){if(!r||!r.ok)throw 0;return r.json();})
.then(function(j){
_NXABO._code=false;
if(j&&j.ok)_NXABO.charge(true);
if(cb)cb(j||{ok:false,raison:"Reponse vide."});})
.catch(function(){_NXABO._code=false;
if(cb)cb({ok:false,raison:"Le serveur n a pas repondu. Reessaie dans un instant."});});
}catch(_){_NXABO._code=false;if(cb)cb({ok:false,raison:"Code impossible a verifier."});}};

// ------------------------------------------------------- la banniere d offre
_NXABO.BKEY="nexium_abo_banniere";
_NXABO.fermees=function(){try{
var r=_NXDB.get(_NXABO.BKEY);var d=r?JSON.parse(r):null;
return (d&&typeof d==="object")?d:{};}catch(_){return {};}};
_NXABO.fermeBanniere=function(ou){try{
var d=_NXABO.fermees();d[ou]=Date.now();
_NXDB.set(_NXABO.BKEY,JSON.stringify(d));_NXABO.notify();}catch(_){}};
_NXABO.banniere=function(o){try{
o=o||{};var ou=o.ou||"general";
var e=_NXABO.courant();
if(!e||_NXABO.libre())return null;
if(o.dom&&_NXABO.niveau(o.dom)>=3)return null;
var f=_NXABO.fermees();
if(f[ou]&&(Date.now()-f[ou])<604800000)return null;
if(!_NXABO.CAT&&!_NXABO._catDemande){_NXABO._catDemande=true;try{_NXABO.catalogue();}catch(_){}}
var P=_NXpal;
var essai=!!(e.essai&&e.essai.dispo&&!(e.offres&&e.offres.length));
var cle=essai?e.essai.offre:"pro";
var cat=_NXABO.CAT||[],pro=null;
for(var a=0;a<cat.length;a++)if(cat[a].offre===cle)pro=cat[a];
var nom=pro?pro.nom:"Nexium Pro";
var titre=essai?(_NXtr("Essaie")+" "+nom+" "+_NXtr("gratuitement pendant")+" "+e.essai.jours+" "+_NXtr("jours")):
(o.titre?_NXtr(o.titre):(_NXtr("Passe a")+" "+nom));
var texte=essai?_NXtr("Rien a payer, rien a annuler : l essai s arrete seul. Une fois par compte et par appareil."):
(o.texte?_NXtr(o.texte):((pro&&pro.bonus_credits)?("+"+pro.bonus_credits+" "+_NXtr("credits Nexium IA offerts chaque mois, et des protections qui coupent avant de prevenir.")):
_NXtr("Des protections plus fines et un assistant plus capable.")));
var col=P.mauve;
return i("div",{key:"nxab-b-"+ou,style:{position:"relative",overflow:"hidden",display:"flex",alignItems:"center",gap:"14px",
flexWrap:"wrap",padding:"16px 40px 16px 18px",borderRadius:"18px",marginBottom:o.mb===0?0:"14px",
border:"1px solid "+_NXteinte(col,34),
background:"linear-gradient(115deg,"+_NXteinte(col,16)+","+_NXteinte(P.info,8)+" 55%,"+P.panel+")"}},
_NXFX.pastille(essai?"cadeau":"etoile",{col:col,taille:40,halo:true}),
i("div",{style:{flex:"1 1 220px",minWidth:0}},
i("div",{style:{fontSize:"14px",fontWeight:"800",color:P.txt}},_NXtr(titre)),
i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"4px",lineHeight:1.55}},_NXtr(texte))),
_NXFX.bouton({t:essai?_NXtr("Voir l essai"):_NXtr("Voir les offres"),icone:essai?"cadeau":"etoile",plein:true,col:col,petit:true,
onClick:function(){try{if(window._NXCP)_NXCP.ouvrir("equicord_abo","Nexium Abonnement");}catch(_){}}}),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_NXtr("Masquer une semaine"),title:_NXtr("Masquer une semaine"),
onClick:function(){_NXABO.fermeBanniere(ou);try{if(o.maj)o.maj();}catch(_){}},
style:{position:"absolute",top:"10px",right:"12px",cursor:"pointer",color:P.faint,fontSize:"15px",lineHeight:1}},_NXtr("\u00d7")));
}catch(_){return null;}};

// Le titre de l entree dans la colonne. Il porte l information qui merite
// un coup d oeil : une echeance proche, ou le nombre d offres actives.
_NXABO.titreOnglet=function(){try{
var A=_NXtr("Abonnement");
var e=_NXABO.courant();
if(!e||e.admin||e.pionnier)return A;
if(e.essai&&e.essai.dispo&&!(e.offres&&e.offres.length))return A+" · "+_NXtr("essai offert");
var p=_NXABO.prochaine();
if(p){var j=_NXABO.jours(new Date(p.t).toISOString());
if(j!==null&&j<=7)return A+" · "+j+" "+_NXtr("j");}
var L=e.offres||[];
if(!L.length)return A;
return A+" · "+L.length;}catch(_){return "Abonnement";}};
_NXABO.resume=function(){try{
var e=_NXABO.courant();
if(!e)return {etat:"inconnu",texte:"Etat d abonnement inconnu pour le moment."};
if(e.admin)return {etat:"admin",texte:"Compte d equipe : tout est ouvert, sans abonnement."};
if(e.pionnier)return {etat:"pionnier",texte:"Utilisateur des les debuts : tout est ouvert, a vie."};
var L=e.offres||[];
if(!L.length)return {etat:"libre",texte:"Aucun abonnement. Le socle protecteur reste actif."};
return {etat:"abonne",texte:L.length+" abonnement(s) actif(s)."};}catch(_){return {etat:"inconnu",texte:""};}};

try{setTimeout(function(){_NXABO.charge();},9000);
setInterval(function(){if(!document.hidden)_NXABO.charge();},3600000);
document.addEventListener("visibilitychange",function(){if(!document.hidden)_NXABO.charge();});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXABO");if(window._NXERR)_NXERR.push("module _NXABO :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXABO desactive:",_nxE);}catch(_){}}
}
