if(!_NXCONN.boot){try{_NXCONN.boot=true;
_NXCONN.SONDES=[
{cle:"protect",nom:"Nexium Protect",mod:"_NXPR",seuil:5},
{cle:"privacy",nom:"Nexium Privacy",mod:"_NXP",seuil:5},
{cle:"music",nom:"Nexium Music",mod:"_NXM",seuil:5},
{cle:"reseau",nom:"Nexium Reseau",mod:"_NXNET",seuil:8},
{cle:"gardes",nom:"Gardes de sortie",mod:"_NXGD",seuil:5},
{cle:"stockage",nom:"Stockage",mod:"_NXDB",seuil:1},
{cle:"alertes",nom:"Alertes de statut",mod:"_NXSTATUS",seuil:3}];
_NXCONN.vus={};
_NXCONN.dernier={};
_NXCONN.REPOS=3600000;

_NXCONN.erreursDe=function(mod){try{
var J=window._NXERR||[],n=0;
for(var a=0;a<J.length;a++){if(String(J[a]).indexOf(mod)>=0)n++;}
return n;}catch(_){return 0;}};

_NXCONN.mort=function(mod){try{
var F=window._NXFAIL||[];
for(var a=0;a<F.length;a++){if(F[a]===mod)return true;}
return false;}catch(_){return false;}};

_NXCONN.mesure=function(s){try{
var o={cle:s.cle,nom:s.nom,mod:s.mod,erreurs:_NXCONN.erreursDe(s.mod),mort:_NXCONN.mort(s.mod),extra:0,detail:""};
try{if(s.mod==="_NXDB"&&window._NXDB&&_NXDB.fail){o.extra=1;o.detail="écriture refusée : "+(_NXDB.fail.msg||"");}}catch(_){}
try{if(s.mod==="_NXNET"&&window._NXNETX&&_NXNETX.timeouts>0){o.extra=_NXNETX.timeouts;o.detail=_NXNETX.timeouts+" requête(s) sans réponse";}}catch(_){}
try{if(s.mod==="_NXSTATUS"&&window._NXSTATUS&&_NXSTATUS.err){o.extra=3;o.detail="alertes illisibles";}}catch(_){}
o.score=o.erreurs+o.extra+(o.mort?99:0);
o.depasse=o.mort||o.score>=s.seuil;
return o;}catch(_){return {cle:s.cle,nom:s.nom,mod:s.mod,erreurs:0,mort:false,extra:0,score:0,depasse:false,detail:""};}};

_NXCONN.etat=function(){try{
var out=[],a;
for(a=0;a<_NXCONN.SONDES.length;a++)out.push(_NXCONN.mesure(_NXCONN.SONDES[a]));
return out;}catch(_){return [];}};

_NXCONN.texte=function(m){try{
if(m.mort)return m.nom+" ne s’est pas lancé du tout.";
var p=[];
if(m.erreurs)p.push(m.erreurs+" erreur(s) au journal");
if(m.detail)p.push(m.detail);
return m.nom+" : "+(p.length?p.join(", "):"anomalie")+".";}catch(_){return "Anomalie.";}};

_NXCONN.signale=function(m){try{
var n=Date.now();
if(_NXCONN.dernier[m.cle]&&(n-_NXCONN.dernier[m.cle])<_NXCONN.REPOS)return false;
_NXCONN.dernier[m.cle]=n;
var corps=_NXCONN.texte(m)+"\n\nSeuil dépassé : "+m.score+" signal(aux). Ce message n’est visible que par l’équipe.";
return _NXMP.dis("Anomalie détectée — "+m.nom,corps,[
{libelle:"Publier une alerte",style:4,run:function(){_NXCONN.publie(m);}},
{libelle:"Voir le diagnostic",style:2,run:function(){try{_NXCP.ouvrir("equicord_data","Nexium Donnees");}catch(_){}}},
{libelle:"Page de statut",style:2,run:function(){try{_NXSTATUS.ouvrePage();}catch(_){}}},
{libelle:"Ignorer 24 h",style:2,run:function(){_NXCONN.dernier[m.cle]=Date.now()+82800000;_NXMP.dis("Ignoré","Plus d’alerte pour "+m.nom+" pendant 24 heures.",[]);}}]);
}catch(_){return false;}};

_NXCONN.publie=function(m){try{
if(!window._NXADMIN||!_NXADMIN.connecte()){_NXMP.dis("Connexion requise","Ouvre Nexium Admins et connecte-toi avant de publier.",[]);return;}
_NXADMIN.ouvrir({titre:m.nom+" rencontre des erreurs",
resume:_NXCONN.texte(m)+" Détecté automatiquement par le connecteur du client.",
gravite:"majeur",composant:m.cle,versions:(window._NXUP&&_NXUP.VERSION)?("v"+_NXUP.VERSION):""},
function(r){
if(r&&r.ok)_NXMP.dis("Alerte publi\u00e9e","Elle est visible sur la page de statut, dans le client de chaque utilisateur, et elle part sur le Discord de l equipe avec une mention.",[
{libelle:"Page de statut",style:2,run:function(){try{_NXSTATUS.ouvrePage();}catch(_){}}}]);
else _NXMP.dis("Publication refusée",(r&&r.err)||"Erreur inconnue.",[]);});
}catch(_){}};

_NXCONN.scan=function(){try{
if(!window._NXMP||!_NXMP.autorise())return;
var e=_NXCONN.etat(),a;
for(a=0;a<e.length;a++){if(e[a].depasse)_NXCONN.signale(e[a]);}
}catch(_){}};

try{setTimeout(function(){_NXCONN.scan();},45000);
setInterval(function(){if(!document.hidden)_NXCONN.scan();},300000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXCONN");if(window._NXERR)_NXERR.push("module _NXCONN :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXCONN desactive:",_nxE);}catch(_){}}
}
var _NXIA2=window._NXIA2||(window._NXIA2={});
if(!_NXIA2.boot){try{_NXIA2.boot=true;
// Nexium IA 2.0 -- la branche d essai.
//
// Ce qui distingue 2.0 de l assistant actuel : il connait ton monde, il
// surveille sans qu on lui demande, et il agit. Les trois coutent du relais,
// et le relais n est pas gratuit. Cette branche est donc reservee aux
// comptes de niveau deux ou plus -- offre generale ou offre IA -- et elle
// s active a la main : personne ne se retrouve dedans sans l avoir voulu.
//
// Le budget est la piece maitresse. Une fonction que l utilisateur declenche
// (poser une question, demander un brouillon) depense son quota habituel.
// Une fonction AUTOMATIQUE -- la veille, l examen d une conversation -- ne
// peut pas depenser librement : elle tirerait le quota a zero sans que
// personne ne l ait demande. Elle a donc son propre plafond quotidien, plus
// bas, et quand il est atteint elle se tait jusqu au lendemain.
_NXIA2.KEY="nexium_ia2";
_NXIA2.NIVEAU_MIN=2;
_NXIA2.listeners=[];
_NXIA2.notify=function(){for(var a=0;a<_NXIA2.listeners.length;a++){try{_NXIA2.listeners[a]();}catch(_){}}};

_NXIA2.cfg=(function(){try{
var r=_NXDB.get(_NXIA2.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.actif!=="boolean")d.actif=false;
if(typeof d.contexte!=="boolean")d.contexte=true;
if(typeof d.veille!=="boolean")d.veille=true;
if(typeof d.manip!=="boolean")d.manip=true;
if(typeof d.repondant!=="boolean")d.repondant=true;
if(typeof d.vocal!=="boolean")d.vocal=false;
if(typeof d.budget!=="number")d.budget=8;
return d;}catch(_){return {actif:false,contexte:true,veille:true,manip:true,
repondant:true,vocal:false,budget:8};}})();
_NXIA2.save=function(){try{_NXDB.set(_NXIA2.KEY,JSON.stringify(_NXIA2.cfg));}catch(_){}};
_NXIA2.set=function(k,v){try{
_NXIA2.cfg[k]=(k==="budget")?Math.max(0,Math.min(40,parseInt(v,10)||0)):!!v;
_NXIA2.save();_NXIA2.notify();}catch(_){}};

// Le droit d entrer. Le serveur en est seul juge : le niveau vient de
// nx_abo_etat, et les pionniers comme les administrateurs y sont deja.
_NXIA2.eligible=function(){try{
if(!window._NXABO)return false;
if(_NXABO.admin&&_NXABO.admin())return true;
if(_NXABO.pionnier&&_NXABO.pionnier())return true;
return _NXABO.niveau("ia")>=_NXIA2.NIVEAU_MIN;}catch(_){return false;}};
_NXIA2.actif=function(){try{
return !!(_NXIA2.cfg.actif&&_NXIA2.eligible());}catch(_){return false;}};
// Une fonction precise est-elle en service ?
_NXIA2.on=function(k){try{
return !!(_NXIA2.actif()&&_NXIA2.cfg[k]);}catch(_){return false;}};
// Ce qui manque pour entrer, dit simplement.
_NXIA2.pourquoiPas=function(){try{
if(_NXIA2.eligible())return _NXIA2.cfg.actif?null:"La branche d essai n est pas activee.";
var n=window._NXABO?_NXABO.niveau("ia"):0;
return "Reserve au niveau "+_NXIA2.NIVEAU_MIN+" et au-dessus. Ton niveau Nexium IA est "+n+".";
}catch(_){return "Indisponible.";}};

// ------------------------------------------------------------- le budget
// Un compteur par jour, remis a zero au changement de date. Il ne compte QUE
// les appels que personne n a demandes.
_NXIA2.KBUD="nexium_ia2_budget";
_NXIA2.jour=function(){try{
var d=new Date();
return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}catch(_){return "0";}};
_NXIA2.compteur=function(){try{
var r=_NXDB.get(_NXIA2.KBUD);var d=r?JSON.parse(r):null;
if(!d||d.j!==_NXIA2.jour())return {j:_NXIA2.jour(),n:0};
return {j:d.j,n:parseInt(d.n,10)||0};}catch(_){return {j:_NXIA2.jour(),n:0};}};
_NXIA2.reste=function(){try{
var c=_NXIA2.compteur();
return Math.max(0,(_NXIA2.cfg.budget||0)-c.n);}catch(_){return 0;}};
// Demander la permission de depenser. Renvoie false quand le plafond est
// atteint -- et l appelant doit alors se taire, pas insister.
_NXIA2.depense=function(n){try{
n=n||1;
if(!_NXIA2.actif())return false;
var c=_NXIA2.compteur();
if((c.n+n)>(_NXIA2.cfg.budget||0))return false;
_NXDB.set(_NXIA2.KBUD,JSON.stringify({j:c.j,n:c.n+n}));
_NXIA2.notify();
return true;}catch(_){return false;}};
_NXIA2.etat=function(){try{
return {eligible:_NXIA2.eligible(),actif:_NXIA2.actif(),
niveau:window._NXABO?_NXABO.niveau("ia"):0,
budget:_NXIA2.cfg.budget,depense:_NXIA2.compteur().n,reste:_NXIA2.reste(),
fonctions:{contexte:_NXIA2.on("contexte"),veille:_NXIA2.on("veille"),
manip:_NXIA2.on("manip"),repondant:_NXIA2.on("repondant"),vocal:_NXIA2.on("vocal")}};
}catch(_){return {};}};

// Si l abonnement tombe, la branche se referme d elle-meme au prochain
// passage : on ne laisse pas une fonction payante tourner apres l echeance.
try{if(window._NXABO&&_NXABO.listeners)_NXABO.listeners.push(function(){try{
if(_NXIA2.cfg.actif&&!_NXIA2.eligible()){_NXIA2.cfg.actif=false;_NXIA2.save();_NXIA2.notify();}
}catch(_){}});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXIA2");if(window._NXERR)_NXERR.push("module _NXIA2 :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXIA2 desactive:",_nxE);}catch(_){}}
}
