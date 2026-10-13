var _NXTK=window._NXTK||(window._NXTK={});
if(!_NXTK.boot){try{_NXTK.boot=true;
// Les tickets de support.
//
// Le client n a pas de compte aupres de la base : il se presente avec un
// jeton remis a l ouverture du fil, garde sur cette machine. C est ce jeton
// qui donne acces au fil, pas l identifiant Discord -- lequel n a rien d un
// secret. Perdre le jeton, c est perdre l acces : on ne peut donc pas lire
// le ticket de quelqu un d autre en devinant son identifiant.
//
// Le direct passe par un canal de diffusion qui ne transporte QU UN SIGNAL :
// jamais le contenu d un message. Chaque cote, prevenu, relit le fil par la
// fonction qui verifie ses droits. Si le canal ne s etablit pas, un sondage
// prend le relais -- plus lent, jamais muet.
_NXTK.URL="https://emcoqnvxriyrchmfpunq.supabase.co/rest/v1/rpc/";
_NXTK.WS="wss://emcoqnvxriyrchmfpunq.supabase.co/realtime/v1/websocket";
_NXTK.CLE="sb_publishable_mhLyot9Dv_VCtWpCbYpngg_evMB79C3";
_NXTK.KEY="nexium_tickets";
_NXTK.CATS=[["abonnement","Abonnement","etoile"],["probleme","Un probleme","alerte"],
["question","Une question","question"],["signalement","Un signalement","bouclier"]];
_NXTK.ETATS={ouvert:"Ouvert",en_cours:"En cours",resolu:"Resolu",ferme:"Ferme"};
_NXTK.listeners=[];
_NXTK.notify=function(){for(var a=0;a<_NXTK.listeners.length;a++){try{_NXTK.listeners[a]();}catch(_){}}};
_NXTK.liste=[];_NXTK.fil=null;_NXTK.filId=null;_NXTK.busy=false;_NXTK.err=null;

_NXTK.moi=function(){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getCurrentUser&&US.getCurrentUser();
return (u&&u.id)?String(u.id):"";}catch(_){return "";}};
_NXTK.pseudo=function(){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getCurrentUser&&US.getCurrentUser();
return (u&&(u.globalName||u.username))||"";}catch(_){return "";}};

// Les jetons, gardes ici et nulle part ailleurs.
_NXTK.jetons=function(){try{
var r=_NXDB.get(_NXTK.KEY);var d=r?JSON.parse(r):null;
return (d&&d.length!==undefined)?d:[];}catch(_){return [];}};
_NXTK.garde=function(id,jeton){try{
var L=_NXTK.jetons();
for(var a=0;a<L.length;a++)if(L[a].id===id)return;
L.unshift({id:id,j:jeton,a:Date.now()});
if(L.length>40)L=L.slice(0,40);
_NXDB.set(_NXTK.KEY,JSON.stringify(L));}catch(_){}};
_NXTK.jetonDe=function(id){try{
var L=_NXTK.jetons();
for(var a=0;a<L.length;a++)if(L[a].id===id)return L[a].j;
return null;}catch(_){return null;}};
_NXTK.oublie=function(id){try{
var L=_NXTK.jetons(),out=[];
for(var a=0;a<L.length;a++)if(L[a].id!==id)out.push(L[a]);
_NXDB.set(_NXTK.KEY,JSON.stringify(out));}catch(_){}};

_NXTK.appel=function(nom,corps,cb){try{
_NXNETX.go(_NXTK.URL+nom,{method:"POST",cache:"no-store",
headers:{apikey:_NXTK.CLE,"Content-Type":"application/json",Accept:"application/json"},
body:JSON.stringify(corps||{})},20000)
.then(function(r){if(!r||!r.ok)throw 0;return r.json();})
.then(function(j){cb(null,j);})
.catch(function(){cb("Serveur injoignable.",null);});
}catch(_){cb("Erreur interne.",null);}};

_NXTK.ouvre=function(o,cb){try{
var id=_NXTK.moi();
if(!id){cb("Compte Discord introuvable.");return;}
_NXTK.busy=true;_NXTK.notify();
_NXTK.appel("nx_ticket_ouvre",{p_id:id,p_pseudo:_NXTK.pseudo(),
p_sujet:String(o.sujet||""),p_categorie:String(o.categorie||"question"),
p_offre:o.offre||null,p_message:String(o.message||"")},function(e,j){
_NXTK.busy=false;
if(e){cb(e);_NXTK.notify();return;}
if(!j||j.ok===false){cb((j&&j.raison)||"Ouverture refusee.");_NXTK.notify();return;}
_NXTK.garde(j.id,j.jeton);
_NXTK.rafraichis(function(){cb(null,j.id);});});
}catch(_){_NXTK.busy=false;cb("Erreur interne.");}};

// Prevenir une fois, quand un fil passe de "lu" a "du neuf". Sans cela, il
// fallait etre sur la page Support au bon moment pour voir la reponse.
_NXTK._signales={};
_NXTK.avise=function(){try{
var L=_NXTK.nonLus(),a,neufs=0,sujet="";
var vus={};
for(a=0;a<L.length;a++){
var id=String(L[a].id);
vus[id]=1;
if(!_NXTK._signales[id]){neufs++;sujet=L[a].sujet||sujet;}}
_NXTK._signales=vus;
if(!neufs)return;
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(
neufs===1?(_NXtr("L equipe a repondu : ")+String(sujet).slice(0,60))
:(_NXtr(neufs)+_NXtr(" reponses de l equipe t attendent")),1);}catch(_){}
}catch(_){}};
_NXTK.rafraichis=function(cb){try{
var id=_NXTK.moi();
var L=_NXTK.jetons();
if(!id||!L.length){_NXTK.liste=[];_NXTK.notify();if(cb)cb();return;}
var js=[];for(var a=0;a<L.length;a++)js.push(L[a].j);
_NXTK.appel("nx_ticket_miens",{p_id:id,p_jetons:js},function(e,j){
if(!e&&j&&j.length!==undefined)_NXTK.liste=j;
_NXTK.err=e||null;
// La liste vient de changer : c est le seul moment ou un fil peut passer
// de "lu" a "du neuf".
try{_NXTK.avise();}catch(_){}
_NXTK.notify();if(cb)cb();});
}catch(_){if(cb)cb();}};

_NXTK.lis=function(tid,cb){try{
var jt=_NXTK.jetonDe(tid);
if(!jt){if(cb)cb("Jeton perdu pour ce ticket.");return;}
_NXTK.appel("nx_ticket_lis",{p_id:_NXTK.moi(),p_jeton:jt},function(e,j){
if(e){_NXTK.err=e;_NXTK.notify();if(cb)cb(e);return;}
// Ouvrir un fil, c est le lire.
try{var M=(j&&j.messages)||[];
_NXTK.marqueVu(tid,M.length?M[M.length-1].a:new Date().toISOString());
_NXTK._signales[String(tid)]=0;delete _NXTK._signales[String(tid)];}catch(_){}
if(!j||j.ok===false){if(cb)cb((j&&j.raison)||"Ticket introuvable.");return;}
_NXTK.fil=j;_NXTK.filId=tid;_NXTK.err=null;
_NXTK.notify();if(cb)cb(null,j);});
}catch(_){if(cb)cb("Erreur interne.");}};

_NXTK.ecrit=function(tid,texte,cb){try{
var jt=_NXTK.jetonDe(tid);
if(!jt){cb("Jeton perdu pour ce ticket.");return;}
var t=String(texte||"").trim();
if(!t){cb("Message vide.");return;}
_NXTK.appel("nx_ticket_ecrit",{p_id:_NXTK.moi(),p_jeton:jt,p_texte:t},function(e,j){
if(e){cb(e);return;}
if(!j||j.ok===false){cb((j&&j.raison)||"Envoi refuse.");return;}
_NXTK.signale(tid);
_NXTK.lis(tid,function(){cb(null);});});
}catch(_){cb("Erreur interne.");}};

// ------------------------------------------------------------------ le direct
// Un canal par ticket, qui ne porte qu un signal. Les deux cotes relisent le
// fil par leur propre fonction : le contenu ne transite jamais par la.
_NXTK.rt=null;_NXTK.rtTopic=null;_NXTK.rtRef=0;_NXTK.rtBat=null;_NXTK.rtEtat="inactif";
_NXTK.ferme=function(){try{
if(_NXTK.rtBat){clearInterval(_NXTK.rtBat);_NXTK.rtBat=null;}
if(_NXTK.rt){try{_NXTK.rt.onclose=null;_NXTK.rt.close();}catch(_){}_NXTK.rt=null;}
_NXTK.rtTopic=null;_NXTK.rtEtat="inactif";}catch(_){}};
_NXTK.suit=function(tid,quand){try{
if(typeof WebSocket!=="function")return false;
var topic="realtime:nxt-"+String(tid);
if(_NXTK.rt&&_NXTK.rtTopic===topic)return true;
_NXTK.ferme();
var w=new WebSocket(_NXTK.WS+"?apikey="+encodeURIComponent(_NXTK.CLE)+"&vsn=1.0.0");
_NXTK.rt=w;_NXTK.rtTopic=topic;_NXTK.rtEtat="connexion";
w.onopen=function(){try{
_NXTK.rtEtat="ouvert";
w.send(JSON.stringify({topic:topic,event:"phx_join",
payload:{config:{broadcast:{self:false}}},ref:String(++_NXTK.rtRef)}));
_NXTK.rtBat=setInterval(function(){try{
if(_NXTK.rt&&_NXTK.rt.readyState===1)
_NXTK.rt.send(JSON.stringify({topic:"phoenix",event:"heartbeat",payload:{},ref:String(++_NXTK.rtRef)}));
}catch(_){}},28000);}catch(_){}};
w.onmessage=function(ev){try{
var m=JSON.parse(ev.data);
if(m&&m.event==="phx_reply"&&m.payload&&m.payload.status==="ok")_NXTK.rtEtat="abonne";
if(m&&m.event==="broadcast"){_NXTK.rtEtat="abonne";if(quand)quand();}
}catch(_){}};
w.onerror=function(){_NXTK.rtEtat="erreur";};
w.onclose=function(){_NXTK.rt=null;_NXTK.rtEtat="ferme";};
return true;}catch(_){_NXTK.rtEtat="indisponible";return false;}};
_NXTK.signale=function(tid){try{
if(!_NXTK.rt||_NXTK.rt.readyState!==1)return false;
_NXTK.rt.send(JSON.stringify({topic:"realtime:nxt-"+String(tid),event:"broadcast",
payload:{type:"broadcast",event:"nx",payload:{t:Date.now()}},ref:String(++_NXTK.rtRef)}));
return true;}catch(_){return false;}};
// Le titre ne signale que ce qui demande une lecture. Compter les fils
// ouverts faisait clignoter une pastille pour rien.
_NXTK.titreOnglet=function(){try{
var n=_NXTK.nonLus?_NXTK.nonLus().length:0;
return n?(_NXtr("Support")+" · "+n):_NXtr("Support");}catch(_){return "Support";}};
_NXTK.etatDirect=function(){try{
return {etat:_NXTK.rtEtat,ouvert:!!(_NXTK.rt&&_NXTK.rt.readyState===1),topic:_NXTK.rtTopic};}catch(_){return {};}};

// Ce que le client a deja vu, fil par fil : la date du dernier message au
// moment ou il l a ouvert. Garde ici, pas en base -- c est une preference de
// lecture, pas une donnee partagee.
_NXTK.KVU="nexium_tickets_vus";
_NXTK.vus=function(){try{
var r=_NXDB.get(_NXTK.KVU);var d=r?JSON.parse(r):null;
return (d&&typeof d==="object")?d:{};}catch(_){return {};}};
_NXTK.marqueVu=function(tid,quand){try{
if(!tid)return;
var v=_NXTK.vus();
v[String(tid)]=quand||new Date().toISOString();
// On ne garde pas la memoire des fils disparus.
var vivants={},a;
for(a=0;a<_NXTK.liste.length;a++)vivants[String(_NXTK.liste[a].id)]=1;
var net={},k;
for(k in v)if(vivants[k]||k===String(tid))net[k]=v[k];
_NXDB.set(_NXTK.KVU,JSON.stringify(net));
_NXTK.notify();}catch(_){}};
// Les fils qui ont du neuf depuis la derniere lecture. Un fil jamais ouvert
// dont l equipe a repondu compte aussi.
_NXTK.nonLus=function(){try{
var v=_NXTK.vus(),out=[],a;
for(a=0;a<_NXTK.liste.length;a++){
var t=_NXTK.liste[a];
if(!t||!t.dernier)continue;
if(!t.reponses)continue;              // rien de l equipe : rien a lire
var vu=v[String(t.id)];
if(!vu||(new Date(t.dernier)).getTime()>(new Date(vu)).getTime())out.push(t);}
return out;}catch(_){return [];}};
_NXTK.enAttente=function(){try{
var n=0;
for(var a=0;a<_NXTK.liste.length;a++){
var t=_NXTK.liste[a];
if(t.etat==="ouvert"||t.etat==="en_cours")n++;}
return n;}catch(_){return 0;}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXTK");if(window._NXERR)_NXERR.push("module _NXTK :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXTK desactive:",_nxE);}catch(_){}}
}
