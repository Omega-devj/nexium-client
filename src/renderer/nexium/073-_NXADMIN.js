if(!_NXADMIN.boot){try{_NXADMIN.boot=true;
_NXADMIN.EQUIPE={"546349979757707265":"proprietaire","587085078899851266":"operateur"};
_NXADMIN.jeton=null;_NXADMIN.pseudo=null;_NXADMIN.role=null;_NXADMIN.expire=0;
_NXADMIN.alertes=[];_NXADMIN.journal=[];_NXADMIN.busy=false;_NXADMIN.listeners=[];
_NXADMIN.notify=function(){for(var a=0;a<_NXADMIN.listeners.length;a++){try{_NXADMIN.listeners[a]();}catch(_){}}};
_NXADMIN.moiId=function(){try{var US=_NXcommon().store("UserStore");var u=US&&US.getCurrentUser&&US.getCurrentUser();return (u&&u.id)?String(u.id):"";}catch(_){return "";}};
_NXADMIN.estEquipe=function(){try{return !!_NXADMIN.EQUIPE[_NXADMIN.moiId()];}catch(_){return false;}};
_NXADMIN.connecte=function(){return !!(_NXADMIN.jeton&&Date.now()<_NXADMIN.expire);};
_NXADMIN.peutSupprimer=function(){return _NXADMIN.role==="proprietaire";};
_NXADMIN.peutNiveau=function(g){try{
if(_NXADMIN.role==="proprietaire")return true;
return _NXSTATUS.poids(g)<4;}catch(_){return false;}};
// --------------------------------------------------------- rester connecte
// Le jeton d acces expire vite -- c est voulu. Ce qui ne doit pas expirer,
// c est la session : Supabase donne un jeton de renouvellement, et c est lui
// qu on garde. Il est range brouille avec l identifiant d installation.
// Ce brouillage n est PAS du chiffrement : il empeche une lecture de passage,
// pas quelqu un qui a la main sur la machine. C est pourquoi il est
// desactivable, et efface a la deconnexion.
_NXADMIN.SKEY="nexium_admin_session";
_NXADMIN.GARDE="nexium_admin_garde";
_NXADMIN.frein=null;
_NXADMIN.garde=function(){try{var v=_NXDB.get(_NXADMIN.GARDE);return v===null||v===undefined?true:v==="1";}catch(_){return true;}};
_NXADMIN.setGarde=function(v){try{_NXDB.set(_NXADMIN.GARDE,v?"1":"0");if(!v)_NXADMIN.oublie();else _NXADMIN.retiens();}catch(_){}};
_NXADMIN.sel=function(){try{return (window._NXBAN&&_NXBAN.install)?_NXBAN.install():"nexium";}catch(_){return "nexium";}};
_NXADMIN.brouille=function(t){try{
var k=_NXADMIN.sel(),out=[],a;
for(a=0;a<t.length;a++)out.push(String.fromCharCode(t.charCodeAt(a)^k.charCodeAt(a%k.length)));
return btoa(unescape(encodeURIComponent(out.join(""))));}catch(_){return "";}};
_NXADMIN.debrouille=function(b){try{
var t=decodeURIComponent(escape(atob(b))),k=_NXADMIN.sel(),out=[],a;
for(a=0;a<t.length;a++)out.push(String.fromCharCode(t.charCodeAt(a)^k.charCodeAt(a%k.length)));
return out.join("");}catch(_){return "";}};
_NXADMIN.retiens=function(){try{
if(!_NXADMIN.garde()||!_NXADMIN.renouv)return false;
_NXDB.set(_NXADMIN.SKEY,JSON.stringify({v:1,p:_NXADMIN.pseudo||"",
r:_NXADMIN.brouille(_NXADMIN.renouv),a:Date.now()}));
return true;}catch(_){return false;}};
_NXADMIN.oublie=function(){try{_NXDB.del(_NXADMIN.SKEY);}catch(_){}};
_NXADMIN.pose=function(j,cb){try{
if(!j||!j.access_token){if(cb)cb(false);return;}
_NXADMIN.jeton=j.access_token;
_NXADMIN.renouv=j.refresh_token||_NXADMIN.renouv||null;
_NXADMIN.expire=Date.now()+(((j.expires_in||3600)*1000)-120000);
_NXADMIN.retiens();
_NXADMIN.planifie();
if(cb)cb(true);}catch(_){if(cb)cb(false);}};
// Un renouvellement pose deux minutes avant l echeance : la session ne se
// coupe donc jamais pendant qu on s en sert.
_NXADMIN.planifie=function(){try{
if(_NXADMIN.frein){clearTimeout(_NXADMIN.frein);_NXADMIN.frein=null;}
if(!_NXADMIN.renouv)return;
var d=Math.max(30000,_NXADMIN.expire-Date.now()-60000);
_NXADMIN.frein=setTimeout(function(){_NXADMIN.renouvelle();},d);}catch(_){}};
_NXADMIN.renouvelle=function(cb){try{
if(!_NXADMIN.renouv){if(cb)cb({err:"Aucune session a renouveler."});return;}
if(_NXADMIN.enRenouv){if(cb)cb({err:"Renouvellement deja en cours."});return;}
_NXADMIN.enRenouv=true;
_NXNETX.go(_NXSTATUS.URL+"/auth/v1/token?grant_type=refresh_token",
{method:"POST",headers:{apikey:_NXSTATUS.CLE,"Content-Type":"application/json"},
body:JSON.stringify({refresh_token:_NXADMIN.renouv})},20000)
.then(function(r){return r.json();}).then(function(j){
_NXADMIN.enRenouv=false;
if(!j||!j.access_token){_NXADMIN.oublie();_NXADMIN.deconnexion();
if(cb)cb({err:"La session a expire. Reconnecte-toi."});return;}
_NXADMIN.pose(j,function(){
_NXADMIN.monRole(function(){
if(!_NXADMIN.role){_NXADMIN.oublie();_NXADMIN.deconnexion();
if(cb)cb({err:"Ce compte n est plus administrateur."});return;}
_NXADMIN.notify();if(cb)cb({ok:true});});});
}).catch(function(){_NXADMIN.enRenouv=false;if(cb)cb({err:"Serveur injoignable."});});
}catch(_){_NXADMIN.enRenouv=false;if(cb)cb({err:"Erreur interne."});}};
// Au demarrage : si une session a ete gardee et que le compte Discord est
// bien celui d un membre de l equipe, on la reprend sans rien demander.
_NXADMIN.reprend=function(cb){try{
if(_NXADMIN.connecte()){if(cb)cb({ok:true});return;}
if(!_NXADMIN.garde()||!_NXADMIN.estEquipe()){if(cb)cb({err:"rien a reprendre"});return;}
var raw=_NXDB.get(_NXADMIN.SKEY);
if(!raw){if(cb)cb({err:"rien a reprendre"});return;}
var d=null;try{d=JSON.parse(raw);}catch(_){d=null;}
if(!d||!d.r){if(cb)cb({err:"session illisible"});return;}
_NXADMIN.renouv=_NXADMIN.debrouille(d.r);
_NXADMIN.pseudo=d.p||null;
if(!_NXADMIN.renouv){_NXADMIN.oublie();if(cb)cb({err:"session illisible"});return;}
_NXADMIN.busy=true;_NXADMIN.notify();
_NXADMIN.renouvelle(function(r){
_NXADMIN.busy=false;
if(r&&r.ok){try{_NXADMIN.charge();}catch(_){}try{if(window._NXMP)_NXMP.rafraichisBarre();}catch(_){}}
_NXADMIN.notify();if(cb)cb(r);});
}catch(_){if(cb)cb({err:"Erreur interne."});}};
_NXADMIN.deconnexion=function(){try{_NXADMIN.jeton=null;_NXADMIN.role=null;_NXADMIN.pseudo=null;_NXADMIN.expire=0;_NXADMIN.alertes=[];_NXADMIN.journal=[];
_NXADMIN.renouv=null;_NXADMIN.bans=[];_NXADMIN.credits=[];_NXADMIN.membres=[];_NXADMIN.chiffres=null;
_NXADMIN.abos=[];_NXADMIN.tickets=[];_NXADMIN.fil=null;_NXADMIN.filId=null;
if(_NXADMIN.frein){try{clearTimeout(_NXADMIN.frein);}catch(_){}_NXADMIN.frein=null;}
_NXADMIN.oublie();
try{if(window._NXMP){_NXMP.ferme();_NXMP.rafraichisBarre();}}catch(_){}_NXADMIN.notify();}catch(_){}};
_NXADMIN.entetes=function(){var h={apikey:_NXSTATUS.CLE,"Content-Type":"application/json",Accept:"application/json"};if(_NXADMIN.connecte())h.Authorization="Bearer "+_NXADMIN.jeton;return h;};
_NXADMIN.rest=function(chemin,opts,cb){try{
var o=opts||{};var h=_NXADMIN.entetes();
if(o.prefer)h.Prefer=o.prefer;
var q={method:o.method||"GET",headers:h,cache:"no-store"};
if(o.body)q.body=o.body;
_NXNETX.go(_NXSTATUS.URL+"/rest/v1/"+chemin,q,20000).then(function(r){
if(r.status===401){
// Le jeton vient d expirer : on le renouvelle et on rejoue la demande une
// seule fois. C est ce qui evite d avoir a se reconnecter sans arret.
if(_NXADMIN.renouv&&!o._rejoue){
_NXADMIN.renouvelle(function(rr){
if(rr&&rr.ok){var o2={};for(var kk in o)o2[kk]=o[kk];o2._rejoue=true;_NXADMIN.rest(chemin,o2,cb);}
else cb({err:"Session expiree, reconnecte-toi."});});
return null;}
_NXADMIN.deconnexion();cb({err:"Session expiree, reconnecte-toi."});return null;}
if(r.status===403){cb({err:"Refuse par le serveur : ton role ne permet pas cette action."});return null;}
if(!r.ok){cb({err:"Le serveur a repondu "+r.status+"."});return null;}
if(r.status===204){cb({ok:true,data:null});return null;}
return r.json();}).then(function(j){
if(j===null||j===undefined)return;
cb({ok:true,data:j});}).catch(function(){cb({err:"Serveur injoignable."});});
}catch(_){cb({err:"Erreur interne."});}};
_NXADMIN.monRole=function(cb){_NXADMIN.rest("rpc/nx_role",{method:"POST",body:"{}"},function(r){
try{if(r.ok)_NXADMIN.role=(typeof r.data==="string")?r.data:null;}catch(_){}
if(cb)cb(r);});};
_NXADMIN.connexion=function(pseudo,mdp,cb){try{
var p=String(pseudo||"").trim().toLowerCase();
if(!p||!mdp){cb({err:"Renseigne l identifiant et le mot de passe."});return;}
_NXADMIN.busy=true;_NXADMIN.notify();
_NXNETX.go(_NXSTATUS.URL+"/auth/v1/token?grant_type=password",
{method:"POST",headers:{apikey:_NXSTATUS.CLE,"Content-Type":"application/json"},
body:JSON.stringify({email:p+"@nexium.local",password:String(mdp)})},20000).then(function(r){
return r.json();}).then(function(j){
_NXADMIN.busy=false;
if(!j||!j.access_token){cb({err:"Identifiant ou mot de passe incorrect."});_NXADMIN.notify();return;}
_NXADMIN.pseudo=p;
_NXADMIN.pose(j);
_NXADMIN.monRole(function(){
if(!_NXADMIN.role){_NXADMIN.deconnexion();cb({err:"Ce compte n est pas administrateur."});return;}
_NXADMIN.charge();try{if(window._NXMP)_NXMP.rafraichisBarre();}catch(_){}cb({ok:true});_NXADMIN.notify();});
}).catch(function(){_NXADMIN.busy=false;cb({err:"Serveur injoignable."});_NXADMIN.notify();});
}catch(_){_NXADMIN.busy=false;cb({err:"Erreur interne."});}};
// Tout ce dont la page a besoin, en une fois.
_NXADMIN.chargeTout=function(){try{
_NXADMIN.charge();_NXADMIN.chargeJournal();_NXADMIN.chargeBans();
_NXADMIN.chargeCredits();_NXADMIN.chargeChiffres();_NXADMIN.chargeMembres("");
_NXADMIN.chargeOffres();_NXADMIN.chargeAbos("");_NXADMIN.chargeTickets(null);
_NXADMIN.chargeTableau();_NXADMIN.chargeCodes();_NXADMIN.chargeMenaces("propose");_NXADMIN.chargeService();}catch(_){}};
_NXADMIN.charge=function(cb){_NXADMIN.rest("nx_alertes?select="+_NXSTATUS.CHAMPS+"&order=debut.desc&limit=30",{},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.alertes=r.data;}catch(_){}
try{_NXADMIN.chargeRelais();}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.chargeJournal=function(cb){_NXADMIN.rest("nx_journal?select=a,pseudo,action,details&order=a.desc&limit=25",{},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.journal=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.ouvrir=function(o,cb){try{
var titre=String(o.titre||"").trim(),resume=String(o.resume||"").trim();
if(titre.length<3){cb({err:"Le titre est trop court."});return;}
if(resume.length<3){cb({err:"Le resume est trop court."});return;}
var g=o.gravite||"mineur";
if(!_NXADMIN.peutNiveau(g)){cb({err:"Le niveau \u00ab "+_NXSTATUS.gravFr(g)+" \u00bb est r\u00e9serv\u00e9 au propri\u00e9taire."});return;}
var corps={titre:titre.slice(0,140),resume:resume.slice(0,2000),gravite:g,etat:"enquete",
composant:o.composant?String(o.composant).slice(0,40):null,
versions_touchees:o.versions?String(o.versions).slice(0,60):null,
maj:[{a:new Date().toISOString(),etat:"enquete",texte:resume.slice(0,400)}]};
_NXADMIN.rest("nx_alertes",{method:"POST",body:JSON.stringify(corps),prefer:"return=representation"},function(r){
if(r.ok)_NXADMIN.charge();cb(r);});
}catch(_){cb({err:"Erreur interne."});}};
_NXADMIN.majEtat=function(al,etat,texte,cb){try{
var maj=[];
try{if(al.maj&&al.maj.length)for(var a=0;a<al.maj.length;a++)maj.push(al.maj[a]);}catch(_){}
maj.push({a:new Date().toISOString(),etat:etat,texte:String(texte||"").slice(0,400)||"Mise a jour."});
var corps={etat:etat,maj:maj};
if(etat==="resolu")corps.fin=new Date().toISOString();
_NXADMIN.rest("nx_alertes?id=eq."+encodeURIComponent(al.id),{method:"PATCH",body:JSON.stringify(corps)},function(r){
if(r.ok)_NXADMIN.charge();cb(r);});
}catch(_){cb({err:"Erreur interne."});}};
_NXADMIN.relais={};
_NXADMIN.chargeRelais=function(cb){_NXADMIN.rest("nx_alertes_relais?select=alerte,evenement,statut,detail,demande_le&order=demande_le.desc&limit=200",{},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined){
var m={},a;
for(a=0;a<r.data.length;a++){var x=r.data[a];if(!m[x.alerte])m[x.alerte]=[];m[x.alerte].push(x);}
_NXADMIN.relais=m;}}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.diffusion=function(al){try{
var L=_NXADMIN.relais[al.id]||[];
if(!L.length)return null;
var envoyes=0,echecs=0,attente=0,a;
for(a=0;a<L.length;a++){
if(L[a].statut==="envoye")envoyes++;
else if(L[a].statut==="echec")echecs++;
else attente++;}
return {n:L.length,envoyes:envoyes,echecs:echecs,attente:attente,dernier:L[0]};}catch(_){return null;}};
_NXADMIN.renvoie=function(al,evenement,cb){try{
_NXADMIN.rest("rpc/nx_relais_renvoyer",{method:"POST",
body:JSON.stringify({p_alerte:al.id,p_evenement:evenement||"manuel"})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Renvoi refuse."});return;}}catch(_){}
if(r.ok)try{setTimeout(function(){_NXADMIN.chargeRelais();},2500);}catch(_){}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};
// --------------------------------------------------------- bannissements
_NXADMIN.bans=[];
_NXADMIN.chargeBans=function(cb){_NXADMIN.rest("rpc/nx_ban_liste",{method:"POST",body:"{}"},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.bans=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.GENRES=[
["compte","Compte Discord","L identifiant du compte. 15 a 25 chiffres."],
["appareil","Appareil","L empreinte materielle, partagee par tous les comptes de la machine."],
["installation","Installation","L identifiant pose par le client dans ce profil."]];
_NXADMIN.poseBan=function(o,cb){try{
var cle=String((o&&o.cle)||"").trim();
var genre=(o&&o.genre)||"compte";
if(!cle){cb({err:"Indique la cible."});return;}
if(genre==="compte"&&!/^[0-9]{15,25}$/.test(cle)){cb({err:"Un identifiant Discord est fait de 15 a 25 chiffres."});return;}
var jours=(o&&o.jours)?parseInt(o.jours,10):null;
if(jours!==null&&(!isFinite(jours)||jours<1||jours>3650)){cb({err:"La duree va de 1 a 3650 jours."});return;}
if(cle===_NXADMIN.moiId()){cb({err:"Tu ne peux pas te bannir toi-meme."});return;}
_NXADMIN.rest("rpc/nx_ban_pose",{method:"POST",body:JSON.stringify({
p_cle:cle,p_genre:genre,p_raison:String((o&&o.raison)||"").slice(0,300),p_jours:jours})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
if(r.ok){_NXADMIN.chargeBans();_NXADMIN.chargeJournal();}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};
_NXADMIN.leveBan=function(cle,cb){try{
_NXADMIN.rest("rpc/nx_ban_leve",{method:"POST",body:JSON.stringify({p_cle:String(cle||"")})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
if(r.ok){_NXADMIN.chargeBans();_NXADMIN.chargeJournal();}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};

// ---------------------------------------------------------------- credits
_NXADMIN.credits=[];
_NXADMIN.chargeCredits=function(cb){_NXADMIN.rest("rpc/ia_credits_liste",{method:"POST",body:"{}"},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.credits=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.donneCredits=function(id,montant,cb){try{
var i2=String(id||"").trim();
var n=parseInt(montant,10);
if(!/^[0-9]{15,25}$/.test(i2)){cb({err:"Un identifiant Discord est fait de 15 a 25 chiffres."});return;}
if(!isFinite(n)||n===0){cb({err:"Indique un montant, positif pour offrir, negatif pour retirer."});return;}
if(n<-100000||n>100000){cb({err:"Le montant va de -100000 a 100000."});return;}
_NXADMIN.rest("rpc/ia_credits_donne",{method:"POST",body:JSON.stringify({p_id:i2,p_montant:n})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
if(r.ok){_NXADMIN.chargeCredits();_NXADMIN.chargeJournal();}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};

// ----------------------------------------------------------- utilisateurs
_NXADMIN.membres=[];_NXADMIN.chiffres=null;
_NXADMIN.chargeMembres=function(q,cb){_NXADMIN.rest("rpc/nx_membres_detail",{method:"POST",
body:JSON.stringify({p_q:q||null,p_limite:60})},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.membres=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.chargeChiffres=function(cb){_NXADMIN.rest("rpc/nx_membres_chiffres",{method:"POST",body:"{}"},function(r){
try{if(r.ok&&r.data&&typeof r.data==="object")_NXADMIN.chiffres=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};

// ------------------------------------------------------ redaction assistee
// Une note jetee en vitesse devient un titre, un resume et un niveau. Le
// modele PROPOSE : rien n est publie sans qu un humain relise et valide.
_NXADMIN.iaBusy=false;
_NXADMIN.CONSIGNE="Tu rediges une alerte d incident pour les utilisateurs d un client Discord. "+
"A partir de la note brute, rends UNIQUEMENT un objet JSON, sans texte autour, sans balise de code, "+
"avec exactement ces clefs : titre (une phrase de 8 a 90 caracteres, factuelle, sans point final), "+
"resume (2 a 4 phrases, ce qui se passe, qui est touche, quoi faire en attendant ; 80 a 600 caracteres), "+
"gravite (une valeur parmi securite, critique, majeur, mineur, maintenance, info), "+
"composant (un ou deux mots, ou une chaine vide). "+
"Ecris en francais simple, sans jargon, sans promettre de delai de correction.";
_NXADMIN.redigeIA=function(brut,cb){try{
var t=String(brut||"").trim();
if(t.length<10){cb({err:"Ecris d abord quelques mots sur ce qui se passe."});return;}
if(!window._NXIA){cb({err:"Nexium IA n est pas disponible."});return;}
_NXADMIN.iaBusy=true;_NXADMIN.notify();
fetch(_NXIA.URL,{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({messages:[{role:"system",content:_NXADMIN.CONSIGNE},{role:"user",content:t}],
moi:_NXADMIN.moiId(),palier:"S",reflexion:"normal",temperature:0.2})})
.then(function(r){return r.text();}).then(function(txt){
_NXADMIN.iaBusy=false;
var j=null;try{j=JSON.parse(txt);}catch(_){}
if(!j||j.erreur){cb({err:(j&&j.detail)||"L assistant n a pas repondu."});_NXADMIN.notify();return;}
var c=String(j.content||"");
var d=_NXADMIN.litJSON(c);
if(!d){cb({err:"La reponse n etait pas exploitable. Reessaie."});_NXADMIN.notify();return;}
cb({ok:true,data:d});_NXADMIN.notify();})
.catch(function(){_NXADMIN.iaBusy=false;cb({err:"Serveur injoignable."});_NXADMIN.notify();});
}catch(_){_NXADMIN.iaBusy=false;cb({err:"Erreur interne."});}};
// Le modele encadre parfois son JSON de trois accents graves, ou d une
// phrase. On prend le premier objet complet et on valide chaque champ.
_NXADMIN.litJSON=function(t){try{
var x=String(t||"").replace(/```[a-z]*\n?/gi,"").trim();
var a=x.indexOf("{");if(a<0)return null;
var prof=0,fin=-1,dans=false,ech=false,k;
for(k=a;k<x.length;k++){var ch=x.charAt(k);
if(dans){if(ech){ech=false;continue;}if(ch==="\\"){ech=true;continue;}if(ch==="\"")dans=false;continue;}
if(ch==="\""){dans=true;continue;}
if(ch==="{")prof++;else if(ch==="}"){prof--;if(prof===0){fin=k;break;}}}
if(fin<0)return null;
var j=JSON.parse(x.slice(a,fin+1));
var g=String(j.gravite||"mineur").toLowerCase();
var ok=false;for(k=0;k<_NXSTATUS.NIVEAUX.length;k++)if(_NXSTATUS.NIVEAUX[k].k===g)ok=true;
if(!ok)g="mineur";
var titre=String(j.titre||"").trim().slice(0,140);
var resume=String(j.resume||"").trim().slice(0,2000);
if(titre.length<3||resume.length<10)return null;
return {titre:titre,resume:resume,gravite:g,composant:String(j.composant||"").trim().slice(0,40)};
}catch(_){return null;}};

// ------------------------------------------------------------ abonnements
_NXADMIN.abos=[];_NXADMIN.offres=[];
_NXADMIN.chargeOffres=function(cb){_NXADMIN.rest("rpc/nx_offres_liste",{method:"POST",body:"{}"},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.offres=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.chargeAbos=function(q,cb){_NXADMIN.rest("rpc/nx_abo_liste",{method:"POST",
body:JSON.stringify({p_q:q||null})},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.abos=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.donneAbo=function(id,offre,jours,cb){try{
var i2=String(id||"").replace(/[^0-9]/g,"");
if(!/^[0-9]{15,25}$/.test(i2)){cb({err:"Un identifiant Discord est fait de 15 a 25 chiffres."});return;}
if(!offre){cb({err:"Choisis une offre."});return;}
var j=(jours===null||jours==="")?null:parseInt(jours,10);
if(j!==null&&(!isFinite(j)||j<1||j>3650)){cb({err:"La duree va de 1 a 3650 jours."});return;}
_NXADMIN.rest("rpc/nx_abo_donne",{method:"POST",
body:JSON.stringify({p_id:i2,p_offre:offre,p_jours:j})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
if(r.ok){_NXADMIN.chargeAbos("");_NXADMIN.chargeJournal();}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};
_NXADMIN.retireAbo=function(id,offre,cb){try{
_NXADMIN.rest("rpc/nx_abo_retire",{method:"POST",
body:JSON.stringify({p_id:String(id||""),p_offre:String(offre||"")})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
if(r.ok){_NXADMIN.chargeAbos("");_NXADMIN.chargeJournal();}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};
// ---------------------------------------------------------------- tickets
_NXADMIN.tickets=[];_NXADMIN.fil=null;_NXADMIN.filId=null;
_NXADMIN.chargeTickets=function(etat,cb){_NXADMIN.rest("rpc/nx_tickets_liste",{method:"POST",
body:JSON.stringify({p_etat:etat||null})},function(r){
try{if(r.ok&&r.data&&r.data.length!==undefined)_NXADMIN.tickets=r.data;}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.ouvreFil=function(id,cb){_NXADMIN.rest("rpc/nx_ticket_admin",{method:"POST",
body:JSON.stringify({p_ticket:id})},function(r){
try{if(r.ok&&r.data&&r.data.ok!==false){_NXADMIN.fil=r.data;_NXADMIN.filId=id;}}catch(_){}
_NXADMIN.notify();if(cb)cb(r);});};
_NXADMIN.repondTicket=function(id,texte,cb){try{
var t=String(texte||"").trim();
if(!t){cb({err:"Message vide."});return;}
_NXADMIN.rest("rpc/nx_ticket_repond",{method:"POST",
body:JSON.stringify({p_ticket:id,p_texte:t})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
if(r.ok){try{if(window._NXTK)_NXTK.signale(id);}catch(_){}
_NXADMIN.ouvreFil(id);_NXADMIN.chargeTickets(null);}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};
_NXADMIN.etatTicket=function(id,etat,cb){try{
_NXADMIN.rest("rpc/nx_ticket_etat",{method:"POST",
body:JSON.stringify({p_ticket:id,p_etat:etat})},function(r){
try{if(r.ok&&r.data&&r.data.ok===false){cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
if(r.ok){try{if(window._NXTK)_NXTK.signale(id);}catch(_){}
_NXADMIN.ouvreFil(id);_NXADMIN.chargeTickets(null);}
cb(r);});}catch(_){cb({err:"Erreur interne."});}};
_NXADMIN.enAttente=function(){try{
var n=0;
for(var a=0;a<_NXADMIN.tickets.length;a++){
var t=_NXADMIN.tickets[a];
if(t.attente&&(t.etat==="ouvert"||t.etat==="en_cours"))n++;}
return n;}catch(_){return 0;}};
_NXADMIN.supprime=function(al,cb){try{
if(!_NXADMIN.peutSupprimer()){cb({err:"Seul le proprietaire peut supprimer une alerte."});return;}
_NXADMIN.rest("nx_alertes?id=eq."+encodeURIComponent(al.id),{method:"DELETE"},function(r){
if(r.ok)_NXADMIN.charge();cb(r);});
}catch(_){cb({err:"Erreur interne."});}};
// --- v203 : le tableau de bord, la fiche, les codes, les menaces, le service --
// Toujours le meme contrat : le serveur verifie le role a chaque appel ; le
// client ne fait que montrer ce qu il repond.
_NXADMIN.tableau=null;_NXADMIN.fiche=null;_NXADMIN.codes=[];_NXADMIN.menaces=[];_NXADMIN.service=null;
_NXADMIN.rpc=function(nom,corps,cb,apres){try{
_NXADMIN.rest("rpc/"+nom,{method:"POST",body:JSON.stringify(corps||{})},function(r){
try{if(r&&r.ok&&r.data&&r.data.ok===false){if(cb)cb({err:r.data.raison||"Refuse."});return;}}catch(_){}
try{if(r&&r.ok&&apres)apres(r.data);}catch(_){}
_NXADMIN.notify();
if(cb)cb(r);});}catch(_){if(cb)cb({err:"Erreur interne."});}};
_NXADMIN.chargeTableau=function(cb){_NXADMIN.rpc("nx_admin_tableau",{},cb,function(d){_NXADMIN.tableau=d||{};});};
_NXADMIN.chargeFiche=function(id,cb){try{
var i2=String(id||"").replace(/[^0-9]/g,"");
if(!/^[0-9]{15,25}$/.test(i2)){if(cb)cb({err:"Un identifiant Discord est fait de 15 a 25 chiffres."});return;}
_NXADMIN.ficheId=i2;
_NXADMIN.rpc("nx_admin_fiche",{p_id:i2},cb,function(d){if(_NXADMIN.ficheId===i2)_NXADMIN.fiche=d;});}catch(_){if(cb)cb({err:"Erreur interne."});}};
_NXADMIN.fermeFiche=function(){_NXADMIN.fiche=null;_NXADMIN.ficheId=null;_NXADMIN.notify();};
_NXADMIN.rafraichitFiche=function(){try{if(_NXADMIN.ficheId)_NXADMIN.chargeFiche(_NXADMIN.ficheId);}catch(_){}};
_NXADMIN.chargeCodes=function(cb){_NXADMIN.rpc("nx_code_liste",{},cb,function(d){_NXADMIN.codes=Array.isArray(d)?d:[];});};
_NXADMIN.creeCode=function(o,cb){try{
o=o||{};
var num=function(x){var v=String(x==null?"":x).trim();if(!v)return null;var n=parseInt(v,10);return isFinite(n)?n:NaN;};
var c={p_genre:o.genre==="credits"?"credits":"abo",p_offre:o.genre==="credits"?null:(o.offre||null),
p_jours:o.genre==="credits"?null:num(o.jours),p_credits:o.genre==="credits"?num(o.credits):null,
p_max:num(o.max)||1,p_expire_jours:num(o.validite),p_note:String(o.note||"").slice(0,200),
p_code:String(o.code||"").trim()||null};
if(c.p_jours!==null&&isNaN(c.p_jours)||c.p_credits!==null&&isNaN(c.p_credits)||isNaN(c.p_expire_jours)){if(cb)cb({err:"Un nombre attendu n en est pas un."});return;}
_NXADMIN.rpc("nx_code_cree",c,cb,function(){_NXADMIN.chargeCodes();_NXADMIN.chargeJournal();});}catch(_){if(cb)cb({err:"Erreur interne."});}};
_NXADMIN.revoqueCode=function(code,cb){_NXADMIN.rpc("nx_code_revoque",{p_code:String(code||"")},cb,function(){_NXADMIN.chargeCodes();});};
_NXADMIN.chargeMenaces=function(etat,cb){_NXADMIN.menEtat=etat||"propose";
_NXADMIN.rpc("nx_menaces_file",{p_etat:_NXADMIN.menEtat==="tout"?null:_NXADMIN.menEtat},cb,function(d){_NXADMIN.menaces=Array.isArray(d)?d:[];});};
_NXADMIN.statueMenace=function(id,etat,cb){_NXADMIN.rpc("nx_menace_statue",{p_id:id,p_etat:etat},cb,function(){_NXADMIN.chargeMenaces(_NXADMIN.menEtat);});};
_NXADMIN.chargeService=function(cb){_NXADMIN.rpc("nx_service_lit",{},cb,function(d){_NXADMIN.service=d||{};});};
_NXADMIN.poseService=function(cle,valeur,cb){_NXADMIN.rpc("nx_service_pose",{p_key:cle,p_value:typeof valeur==="string"?valeur:JSON.stringify(valeur)},cb,
function(){_NXADMIN.chargeService();_NXADMIN.chargeJournal();});};
_NXADMIN.posePlancher=function(min,message,cb){_NXADMIN.rpc("nx_maj_plancher_pose",{p_min:String(min||"0"),p_message:message==null?null:String(message)},cb,
function(){_NXADMIN.chargeService();_NXADMIN.chargeJournal();});};
_NXADMIN.effaceEssai=function(id,cb){_NXADMIN.rpc("nx_essai_efface",{p_id:String(id||"")},cb,function(){_NXADMIN.rafraichitFiche();});};
// Les reponses types de la file de support : gardees sur cette machine.
_NXADMIN.RKEY="nexium_admin_reponses";
_NXADMIN.REPONSES=[
["Bonjour","Bonjour, merci pour ton message. On regarde ca et on revient vers toi tres vite."],
["Infos","Pour t aider, peux-tu nous dire ta version de Nexium (Reglages) et ce que tu faisais quand le probleme est apparu ?"],
["Redemarrer","Peux-tu fermer completement Discord (icone pres de l horloge, Quitter) puis le relancer ? Dis-nous si ca persiste."],
["Abonnement pose","C est fait : ton abonnement est actif. Il apparait dans la page Abonnement, avec ses credits offerts."],
["Resolu","On considere ce ticket comme resolu. S il reste quelque chose, reponds simplement ici."]];
_NXADMIN.reponses=function(){try{var r=_NXDB.get(_NXADMIN.RKEY);var d=r?JSON.parse(r):null;
return (Array.isArray(d)&&d.length)?d:_NXADMIN.REPONSES;}catch(_){return _NXADMIN.REPONSES;}};
_NXADMIN.ajouteReponse=function(titre,texte){try{var L=_NXADMIN.reponses().slice();
L.push([String(titre||"").slice(0,24),String(texte||"").slice(0,600)]);
_NXDB.set(_NXADMIN.RKEY,JSON.stringify(L.slice(-12)));_NXADMIN.notify();return true;}catch(_){return false;}};
_NXADMIN.retireReponse=function(k){try{var L=_NXADMIN.reponses().slice();L.splice(k,1);
_NXDB.set(_NXADMIN.RKEY,JSON.stringify(L));_NXADMIN.notify();return true;}catch(_){return false;}};
// Reprendre la session sitot que Discord sait qui est connecte.
try{setTimeout(function(){try{_NXADMIN.reprend();}catch(_){}},7000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXADMIN");if(window._NXERR)_NXERR.push("module _NXADMIN :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXADMIN desactive:",_nxE);}catch(_){}}
}var _NXMP=window._NXMP||(window._NXMP={});
