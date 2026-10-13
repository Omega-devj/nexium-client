var _NXFX=window._NXFX||(window._NXFX={});
if(!_NXFX.boot){try{_NXFX.boot=true;
// La boite a outils visuelle partagee par toutes les pages : un jeu d icones,
// et les quelques briques qui reviennent partout (entete, onglets, tuiles,
// jauges). Le mouvement y est toujours conditionnel : si le systeme demande
// moins d animation, ou si le mode economie est actif, ces fonctions rendent
// exactement la meme chose, immobile. Rien ne disparait, rien ne se decale.
_NXFX.anime=function(){try{
if(!window._NXMO)return false;
if(_NXMO.actif)return _NXMO.actif();
return !!_NXMO.on&&!_NXMO.reduced();}catch(_){return false;}};
// Attributs d animation, poses seulement si l animation a lieu d etre.
_NXFX.a=function(o){try{if(!_NXFX.anime())return {};var r={};for(var k in o)r[k]=o[k];return r;}catch(_){return {};}};
_NXFX.fusion=function(base,extra){try{var o={},k;for(k in base)o[k]=base[k];if(extra)for(k in extra)o[k]=extra[k];return o;}catch(_){return base||{};}};

// --------------------------------------------------------------- les traces
// Tout est dessine sur une grille de 24, en aplat : une seule couleur, celle
// du texte courant. Une icone ne porte donc jamais sa propre teinte -- c est
// son contenant qui decide, et le survol peut la changer d un seul reglage.
// Les icones, redessinees au trait.
//
// Elles etaient pleines, dans le gout des bibliotheques d icones courantes.
// Tout le reste du client est au trait fin -- le cadran du demarrage, les
// filets, les equerres, les jauges en arc -- et deux vocabulaires se
// disputaient chaque page. Elles sont maintenant tracees sur la meme grille
// de 24, avec la meme epaisseur, les memes bouts arrondis, et un dessin
// geometrique plutot que mime.
//
// Une seule contrainte a tenir : ce sont des donnees de chemin, rendues par
// _NXFX.svg avec `fill:none` et un trait. Un point ferme se dessine donc par
// un segment nul a bout rond, jamais par un disque.
_NXFX.D={
accueil:"M4 10.4 12 4.2l8 6.2M6.4 9.2v10h4v-5.2h3.2v5.2h4v-10",
etincelle:"M12 3.4 13.5 8.3 18.4 9.8 13.5 11.3 12 16.2 10.5 11.3 5.6 9.8 10.5 8.3Z M18.4 14.4l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6Z",
comptes:"M9.2 11.3a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2M3.6 19.6c0-2.9 2.5-4.8 5.6-4.8s5.6 1.9 5.6 4.8M16.2 5.4a3.1 3.1 0 0 1 0 5.6M17.6 15.1c1.9.6 3.2 1.9 3.2 4.5",
maj:"M20.2 12a8.2 8.2 0 1 1-2.6-6M20.2 4.2v5.6h-5.6",
liste:"M9 6.8h10.4M9 12h10.4M9 17.2h10.4M4.8 6.8h.01M4.8 12h.01M4.8 17.2h.01",
bouclier:"M12 3.6 19.2 6.3v5.4c0 4.2-2.9 7.3-7.2 8.7-4.3-1.4-7.2-4.5-7.2-8.7V6.3Z",
bouclierOk:"M12 3.6 19.2 6.3v5.4c0 4.2-2.9 7.3-7.2 8.7-4.3-1.4-7.2-4.5-7.2-8.7V6.3Z M8.8 11.9l2.3 2.3 4.1-4.5",
oeil:"M2.8 12S6.4 6.6 12 6.6 21.2 12 21.2 12 17.6 17.4 12 17.4 2.8 12 2.8 12Z M12 14.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2",
oeilBarre:"M4.3 9.2C3.3 10.3 2.8 12 2.8 12S6.4 17.4 12 17.4c1.5 0 2.8-.4 4-1M9.4 7c.8-.2 1.7-.4 2.6-.4 5.6 0 9.2 5.4 9.2 5.4s-.8 1.2-2.2 2.5M10.2 10.2a2.6 2.6 0 0 0 3.6 3.6M4.4 4.4l15.2 15.2",
graphe:"M4.2 4.4v15.2h15.6M7.6 16.4V11.2M11.8 16.4V6.8M16 16.4v-7",
eclair:"M13.6 3.2 6.4 13.2h5L10.4 20.8 17.6 10.8h-5Z",
note:"M6.4 4.2h7.8l4.4 4.4v11.2H6.4Z M14.2 4.2v4.4h4.4M9.6 14.4h5.4",
base:"M12 7.6c3.8 0 6.9-1 6.9-2.2S15.8 3.2 12 3.2 5.1 4.2 5.1 5.4 8.2 7.6 12 7.6Z M5.1 5.4v13.2c0 1.2 3.1 2.2 6.9 2.2s6.9-1 6.9-2.2V5.4",
equipe:"M9.4 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M3.6 19.6c0-3 2.6-5 5.8-5s5.8 2 5.8 5M16.4 5.6a3 3 0 0 1 0 5.8M17.8 15.2c1.9.6 3.2 1.9 3.2 4.4",
coeur:"M12 20C7.2 16.6 4 13.9 4 10.5a4.2 4.2 0 0 1 8-2 4.2 4.2 0 0 1 8 2c0 3.4-3.2 6.1-8 9.5Z",
reseau:"M12 2.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6M5.2 15.6a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6M18.8 15.6a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6M10.4 7.6 6.8 14.8M13.6 7.6l3.6 7.2M8 18.4h8",
check:"M5.2 12.6 9.8 17.2 18.8 7.4",
croix:"M6.6 6.6 17.4 17.4M17.4 6.6 6.6 17.4",
alerte:"M12 4 21 19.6H3Z M12 10v4.2M12 17h.01",
info:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M12 11v5.4M12 7.8h.01",
cadenas:"M6.8 10.4h10.4v9.2H6.8Z M9 10.4V8a3 3 0 0 1 6 0v2.4M12 14v2.4",
cadenasOuvert:"M6.8 10.4h10.4v9.2H6.8Z M9 10.4V8a3 3 0 0 1 5.8-1M12 14v2.4",
cle:"M8.4 7.2a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4M12.6 11.4h7M16.4 11.4v3.2M19.6 11.4v2.6",
horloge:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M12 7.4V12l3 2",
loupe:"M10.8 4.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8M15.6 15.6 20 20",
plus:"M12 5.4v13.2M5.4 12h13.2",
moins:"M5.4 12h13.2",
poubelle:"M4.8 7h14.4M9.4 7V4.8h5.2V7M6.8 7v12.4h10.4V7M10 10.6v5.4M14 10.6v5.4",
crayon:"M16.4 4.2 19.8 7.6 8.6 18.8 4.4 19.6 5.2 15.4Z M14.4 6.2l3.4 3.4",
copie:"M8.6 8.6h10.6v10.6H8.6Z M15.4 8.6V5.4H4.8V16h3.2",
telecharge:"M12 4v10.6M7.6 10.6 12 15l4.4-4.4M4.8 19.4h14.4",
televerse:"M12 19.4V8.8M7.6 12.8 12 8.4l4.4 4.4M4.8 4.6h14.4",
envoi:"M20.4 3.6 3.6 10.2l6.6 2.8M20.4 3.6 13.8 20.4l-3.6-7.4M20.4 3.6l-10.2 9.4",
lecture:"M7.6 4.8 19 12 7.6 19.2Z",
pause:"M8.6 5.4v13.2M15.4 5.4v13.2",
reglages:"M4.4 7.6h6M14 7.6h5.6M4.4 16.4h4M11.6 16.4h7.8M12.2 4.8v5.6M9.6 13.6v5.6",
etoile:"M12 3.8 14.5 9l5.7.8-4.1 4 1 5.6L12 16.8 6.9 19.4l1-5.6-4.1-4 5.7-.8Z",
feu:"M12 3.4c3 3.4 5.6 5.7 5.6 9.2A5.6 5.6 0 0 1 6.4 12.6c0-1.4.5-2.6 1.4-3.8.4 1.2 1.2 1.9 2 2 0-3 1-5.4 2.2-7.4Z",
cadeau:"M4.8 10.6h14.4v9.4H4.8Z M3.4 7h17.2v3.6H3.4Z M12 7v13M8.6 7a2.4 2.4 0 1 1 3.4-2.4A2.4 2.4 0 1 1 15.4 7",
jeton:"M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6M8.4 12h7.2",
banni:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M6 6 18 18",
couronne:"M3.8 7.8 7 13l5-6.6L17 13l3.2-5.2v10.8H3.8Z M3.8 18.6h16.4",
cloche:"M6.6 10.4a5.4 5.4 0 0 1 10.8 0c0 4 1.6 5.6 1.6 5.6H5s1.6-1.6 1.6-5.6ZM10.2 19a2 2 0 0 0 3.6 0",
courrier:"M4 6h16v12H4Z M4 6.8 12 13l8-6.2",
lien:"M10 13.6a3.6 3.6 0 0 0 5.2.2l3-3a3.6 3.6 0 0 0-5.2-5.2l-1.6 1.6M14 10.4a3.6 3.6 0 0 0-5.2-.2l-3 3a3.6 3.6 0 0 0 5.2 5.2l1.6-1.6",
globe:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M3.8 12h16.4M12 3.6c2 2.4 3.1 5.3 3.1 8.4S14 18 12 20.4c-2-2.4-3.1-5.3-3.1-8.4S10 6 12 3.6Z",
puce:"M6.6 6.6h10.8v10.8H6.6Z M12 6.6V4M12 20V17.4M6.6 12H4M20 12H17.4M12 12h.01",
terminal:"M3.4 5h17.2v14H3.4Z M7 9.4 10.4 12 7 14.6M12.8 15h4.6",
code:"M8.6 8 4.4 12l4.2 4M15.4 8l4.2 4-4.2 4M13.4 5.6l-2.8 12.8",
livre:"M12 6.8C10.4 5.4 8 5 4.2 5v12.8c3.8 0 6.2.4 7.8 1.8M12 6.8c1.6-1.4 4-1.8 7.8-1.8v12.8c-3.8 0-6.2.4-7.8 1.8",
question:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M9.6 9.6a2.4 2.4 0 1 1 3.3 2.2c-.6.3-.9.8-.9 1.4v.6M12 16.8h.01",
fleche:"M4.6 12h14.2M13.4 6.6 19.4 12l-6 5.4",
retour:"M19.4 12H5.2M10.6 6.6 4.6 12l6 5.4",
chevron:"M9.6 5.6 16 12l-6.4 6.4",
externe:"M13.4 4.6h6v6M19.4 4.6 11 13M17.2 13.6v5.8H4.6V6.8h5.8",
baguette:"M15.6 4.4 19.6 8.4 8.4 19.6 4.4 15.6Z M13.6 6.4l4 4M4.6 4.6l1.2 1.2M9.4 3.4v1.8M3.4 9.4h1.8M19.6 18.4l1.2 1.2",
cible:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6",
drapeau:"M5.4 20V4.2M5.4 5h12.2l-2.4 3.8 2.4 3.8H5.4",
couches:"M12 3.4 20.8 8 12 12.6 3.2 8Z M3.2 13.2 12 17.8l8.8-4.6",
grille:"M4.6 4.6h6v6h-6ZM13.4 4.6h6v6h-6ZM4.6 13.4h6v6h-6ZM13.4 13.4h6v6h-6Z",
calendrier:"M4.6 6.4h14.8v13H4.6Z M4.6 10.4h14.8M8.6 4v4.4M15.4 4v4.4",
pouls:"M3 12h4l2.2-5.4 3.6 11L15.4 12h5.6",
image:"M4.4 5.2h15.2v13.6H4.4Z M9 10.4a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2M4.4 16.2l4.8-4.6 4 3.8 2.8-2.4 3.6 3.2",
dossier:"M3.8 6.4h5.6l2 2.4h8.8v10.8H3.8Z",
etiquette:"M3.8 3.8h7.6l8.8 8.8-7.6 7.6-8.8-8.8Z M7.6 7.6h.01",
filtre:"M4 5.4h16l-6.2 7.2v6.2l-3.6 1.8v-8Z",
boussole:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M15.4 8.6 13.6 13.6 8.6 15.4 10.4 10.4Z",
robot:"M5.6 8.2h12.8v10H5.6Z M12 4.6v3.6M9.4 13.2h.01M14.6 13.2h.01M12 2.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4",
boite:"M12 3.4 20.4 7.8v8.4L12 20.6 3.6 16.2V7.8Z M3.6 7.8 12 12.2l8.4-4.4M12 12.2v8.4",
nuage:"M7.4 18.4a4.4 4.4 0 0 1-.4-8.8 5.4 5.4 0 0 1 10.3 1.4 3.7 3.7 0 0 1-.5 7.4Z",
batterie:"M3.2 7.8h14.4v8.4H3.2Z M19.8 10.4v3.2M6.6 12h4",
micro:"M12 3.6a3.2 3.2 0 0 0-3.2 3.2v4.6a3.2 3.2 0 0 0 6.4 0V6.8A3.2 3.2 0 0 0 12 3.6Z M6.2 11.2a5.8 5.8 0 0 0 11.6 0M12 17.2v3.2",
casque:"M4.6 15.4v-3.2a7.4 7.4 0 0 1 14.8 0v3.2M4.6 13.4h2.6v6H6a1.4 1.4 0 0 1-1.4-1.4ZM19.4 13.4h-2.6v6H18a1.4 1.4 0 0 0 1.4-1.4Z",
point:"M12 12h.01"};
_NXFX.trace=function(nom){try{return _NXFX.D[nom]||_NXFX.D.point;}catch(_){return "";}};
// La seconde couche des icones.
//
// Un trait unique donne des pictogrammes lisibles, mais plats. On ajoute donc
// a celles qu on voit le plus une couche de detail, tracee plus finement et
// plus discrete : l echo interieur d un bouclier, l iris d un oeil, les
// graduations d une horloge, la fenetre d une maison. Rien d indispensable --
// c est justement ce qui fait qu une icone a l air dessinee plutot que
// generee.
//
// Une icone sans entree ici reste au trait simple, et ne coute rien de plus.
_NXFX.A={
accueil:"M13.6 10.4h2.6v2.6h-2.6Z",
etincelle:"M5.6 15.2l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5Z",
bouclier:"M12 6.6 16.4 8.2v3.3c0 2.5-1.8 4.4-4.4 5.3-2.6-.9-4.4-2.8-4.4-5.3V8.2Z",
bouclierOk:"M12 6.6 16.4 8.2v1",
oeil:"M12 13.3a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6",
oeilBarre:"M12 6.6c-.6 0-1.2.05-1.7.15",
graphe:"M7.6 13.6 11.8 9.4l4.2 3",
eclair:"M12.4 6.6 9.4 11h2.6",
base:"M5.1 12c0 1.2 3.1 2.2 6.9 2.2s6.9-1 6.9-2.2",
coeur:"M8 9.6a2.2 2.2 0 0 1 2.2-2",
cadenas:"M12 13.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4",
cadenasOuvert:"M12 13.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4",
horloge:"M12 5.6v.9M18.4 12h-.9M12 18.4v-.9M5.6 12h.9",
etoile:"M12 7.6 13.2 10l2.6.4-1.9 1.8.5 2.6L12 13.6 9.6 14.8l.5-2.6L8.2 10.4 10.8 10Z",
couronne:"M7.4 16.2h.01M12 16.2h.01M16.6 16.2h.01",
cadeau:"M4.6 14.6h14.8",
jeton:"M12 8.4v-2.2M12 17.8v-2.2",
courrier:"M8.6 15.4h6.8",
globe:"M5.4 8.6h13.2M5.4 15.4h13.2",
robot:"M9.8 16.2h4.4",
casque:"M12.6 19.4h3.4a1.4 1.4 0 0 0 1.4-1.4",
terminal:"M3.8 8.4h16.4",
boussole:"M12 3.6v1.4M12 20.4v-1.4M3.6 12h1.4M20.4 12h-1.4",
livre:"M7 9.4h2.8M7 12.6h2.8",
nuage:"M9.4 13.6a2.2 2.2 0 0 1 4.2-.6",
boite:"M16.2 5.4v4.2",
reseau:"M12 9.5v1.6",
equipe:"M12 15.8v3.4",
puce:"M9.8 9.8h4.4v4.4H9.8Z",
baguette:"M11 8.8l2.2 2.2",
comptes:"M9.2 8.2h.01",
maj:"M12 8.4v3.6l2.4 1.4",
filtre:"M9.4 9.4h5.2",
calendrier:"M8.4 13.6h.01M12 13.6h.01M15.6 13.6h.01",
dossier:"M6.6 12.4h10.8",
image:"M4.4 12.6h4",
note:"M9.6 17.6h5.4",
pouls:"M3 12h1.6",
drapeau:"M5.4 9h6",
cible:"M12 3.6v2M12 18.4v2M3.6 12h2M18.4 12h2",
couches:"M12 3.6 21 8.2 12 12.8 3 8.2Z",
grille:"M7.6 7.6h.01M16.4 7.6h.01M7.6 16.4h.01M16.4 16.4h.01",
batterie:"M11.8 12h4",
micro:"M12 6.4v3.6",
feu:"M12 17.6a2.6 2.6 0 0 1-2.6-2.6c0-1.2.9-2.1 1.6-3 .2.8.7 1.2 1.2 1.3 0-1.4.5-2.5 1.1-3.5",
loupe:"M8.6 8.6a3.1 3.1 0 0 0-.9 2.2",
question:"M12 13.8v.01",
info:"M10.6 11h1.4",
alerte:"M12 7.4v1.2",
lien:"M9.6 14.4l4.8-4.8",
cle:"M8.4 11.4h.01M12.4 13.4v-2",
crayon:"M6 16.2l1.8 1.8",
poubelle:"M12 10.6v5.4",
telecharge:"M12 4v2.6",
televerse:"M12 19.4v-2.6",
envoi:"M10.2 13 20.4 3.6",
liste:"M9 9.4h7.4M9 14.6h7.4"};
// Le detail se dessine plus fin et plus discret que le trait principal :
// c est ce qui empeche l icone de devenir une grille de lignes.
// En dessous de cette taille, le detail se lit comme une rature.
_NXFX.SEUIL_ACCENT=22;
_NXFX.accent=function(nom){try{return _NXFX.A[nom]||null;}catch(_){return null;}};

// Une icone nue. `mv` nomme l animation permanente eventuelle (float, bob,
// beat, swing, glow) ; `hv` celle du survol du contenant (tourne, penche,
// saute, secoue, pousse). Les deux sont ignorees si l animation est coupee.
// Au trait, avec une epaisseur qui suit legerement la taille : a 13 px un
// trait de 1,65 boucherait les details, a 40 px il serait trop maigre.
// Le trait est exprime sur la grille de 24 : a l ecran il vaut
// `epaisseur x taille / 24`. On vise 1,4 pixel quelle que soit la taille --
// c est la seule facon qu une icone de 13 px soit aussi nette qu une de 26.
// Les bornes evitent les extremes : une icone minuscule ne doit pas devenir
// une tache, une grande ne doit pas devenir un dessin au feutre.
_NXFX.CIBLE=1.75;
_NXFX.EPAIS=function(z){try{
var e=(24/(z||18))*_NXFX.CIBLE;
if(e>3.4)e=3.4;
if(e<1.1)e=1.1;
return Math.round(e*100)/100;}catch(_){return 1.6;}};
_NXFX.svg=function(nom,z,opt){try{
opt=opt||{};z=z||18;
var e=nom==="point"?4.4:_NXFX.EPAIS(z);
var att={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",
strokeWidth:e,strokeLinecap:"round",strokeLinejoin:"round",
width:z,height:z,"aria-hidden":"true"};
if(opt.style)att.style=opt.style;
// Le detail n apparait qu a partir de 15 px : plus petit, il epaissit le
// dessin au lieu de l enrichir.
var a=(z>=_NXFX.SEUIL_ACCENT&&!opt.nu)?_NXFX.accent(nom):null;
if(!a)return i("svg",att,i("path",{d:_NXFX.trace(nom)}));
return i("svg",att,
i("path",{d:_NXFX.trace(nom)}),
i("path",{d:a,strokeWidth:e*0.82,opacity:.44}));}catch(_){return null;}};
_NXFX.ico=function(nom,z,opt){try{
opt=opt||{};
var att={"data-nx-ico":opt.hv||"1",style:_NXFX.fusion({color:opt.col||"inherit",lineHeight:0},opt.style)};
if(opt.mv&&_NXFX.anime())att["data-nx-"+opt.mv]="1";
return i("span",att,_NXFX.svg(nom,z||18));}catch(_){return null;}};

// La pastille : une icone posee dans un carre arrondi, avec un halo discret
// qui prend la teinte donnee. C est la brique de toutes les listes.
_NXFX.pastille=function(nom,opt){try{
opt=opt||{};
var P=_NXpal,col=opt.col||P.sub,t=opt.taille||34;
return i("div",{style:{position:"relative",width:t+"px",height:t+"px",borderRadius:Math.round(t*0.32)+"px",
flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
background:opt.plein?col:_NXteinte(col,opt.fond||10),
border:"1px solid "+(opt.plein?col:_NXteinte(col,22)),
color:opt.plein?P.ink:col,overflow:"hidden"}},
opt.halo&&_NXFX.anime()?i("div",{"data-nx-halo":"1","aria-hidden":"true",style:{position:"absolute",inset:"-30%",
background:"radial-gradient(circle,"+_NXteinte(col,30)+",transparent 68%)",pointerEvents:"none"}}):null,
i("div",{style:{position:"relative",display:"flex"}},_NXFX.ico(nom,opt.z||Math.round(t*0.52),{mv:opt.mv,hv:opt.hv})));}catch(_){return null;}};

// La grande icone d entete : trois anneaux concentriques, un halo, l icone.
_NXFX.blason=function(nom,col,taille){try{
var P=_NXpal,t=taille||76,c=col||P.acc,r=t/2;
var an=_NXFX.anime();
return i("div",{style:{position:"relative",width:t+"px",height:t+"px",flexShrink:0}},
i("svg",{viewBox:"0 0 100 100",width:t,height:t,"aria-hidden":"true",style:{position:"absolute",inset:0}},
i("circle",_NXFX.fusion({cx:50,cy:50,r:47,fill:"none",stroke:_NXteinte(c,16),"strokeWidth":1},an?{"data-nx-spin":"1",style:{transformOrigin:"50% 50%",animationDuration:"38s"},"strokeDasharray":"3 7"}:{})),
i("circle",{cx:50,cy:50,r:38,fill:_NXteinte(c,7),stroke:_NXteinte(c,24),"strokeWidth":1}),
i("circle",_NXFX.fusion({cx:50,cy:50,r:30,fill:"none",stroke:_NXteinte(c,30),"strokeWidth":1,"strokeDasharray":"46 142"},
an?{"data-nx-spin":"1",style:{transformOrigin:"50% 50%",animationDuration:"14s",animationDirection:"reverse"}}:{}))),
i("div",_NXFX.fusion({style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:c}},
an?{"data-nx-float":"1"}:{}),_NXFX.svg(nom,Math.round(t*0.34))),
an?i("div",{"data-nx-halo":"1","aria-hidden":"true",style:{position:"absolute",inset:"-22%",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(c,20)+",transparent 66%)",pointerEvents:"none"}}):null);}catch(_){return null;}};

// L entete de page : blason anime, surtitre, titre, phrase, et une bande de
// chiffres facultative. Toutes les pages partagent desormais cette forme.
// Une copie de l objet, champs textes traduits. En francais, l objet
// d origine est rendu tel quel : aucun cout.
_NXFX.tr=function(o,champs){try{
if(!o||!(window._NXI&&_NXI.lang==="en"))return o;
var r={},k;for(k in o)r[k]=o[k];
for(var a=0;a<champs.length;a++)if(typeof r[champs[a]]==="string")r[champs[a]]=_NXtr(r[champs[a]]);
return r;}catch(_){return o;}};
_NXFX.entete=function(o){try{
o=_NXFX.tr(o||{},["cle","titre","texte","marque"]);var P=_NXpal,c=o.col||P.acc;
return i("div",_NXFX.fusion({style:{position:"relative",marginBottom:"24px",paddingTop:"2px"}},_NXFX.a({"data-nx-fade":"1"})),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:"-60px",top:"-70px",width:"420px",height:"210px",
background:"radial-gradient(52% 66% at 8% 42%,"+_NXteinte(c,9)+",transparent 72%)",pointerEvents:"none"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"18px"}},
o.icone?_NXFX.blason(o.icone,c,o.taille||74):null,
i("div",{style:{flex:1,minWidth:0}},
i("div",_NXFX.fusion({style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"9px"}},_NXFX.a({"data-nx-slidel":"1"})),
i("div",_NXFX.fusion({style:{width:"6px",height:"6px",borderRadius:"50%",background:c,boxShadow:"0 0 10px "+_NXteinte(c,50)}},_NXFX.a({"data-nx-dot":"1"}))),
i("div",{style:{fontSize:"10.5px",fontWeight:"800",letterSpacing:".26em",color:P.sub,textTransform:"uppercase"}},_NXtr(o.cle)||""),
o.marque?i("div",{style:{marginLeft:"4px",fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,
border:"1px solid "+P.hair,borderRadius:"99px",padding:"1px 8px"}},_NXtr(o.marque)):null),
i("div",_NXFX.fusion({style:{fontFamily:_NXf.disp,fontSize:"33px",fontWeight:"800",color:P.txt,
letterSpacing:"-.035em",lineHeight:1.03}},_NXFX.a({"data-nx-blurin":"1"})),_NXtr(o.titre)||""),
o.texte?i("div",{style:{fontSize:"13.5px",color:P.sub,marginTop:"11px",lineHeight:1.62,maxWidth:"560px"}},_NXtr(o.texte)):null,
o.aide?i(_NXFX.Aide,{aide:o.aide,col:c}):null)),
o.chiffres&&o.chiffres.length?i("div",{style:{position:"relative",display:"flex",gap:"22px",marginTop:"20px",flexWrap:"wrap"}},
o.chiffres.map(function(x,k){return i("div",_NXFX.fusion({key:k,style:{minWidth:"84px"}},_NXFX.a({"data-nx-rise":String(k+1)})),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"21px",fontWeight:"800",color:x.col||P.txt,letterSpacing:"-.02em",
fontVariantNumeric:"tabular-nums",lineHeight:1}},_NXtr(x.v)),
i("div",{style:{fontSize:"10px",fontWeight:"700",letterSpacing:".1em",color:P.dim,textTransform:"uppercase",marginTop:"7px"}},_NXtr(x.k)));})):null,
i("div",{style:{position:"relative",height:"1px",marginTop:"22px",
background:"linear-gradient(90deg,"+_NXteinte(c,34)+","+P.hair+" 34%,transparent)"}}));}catch(_){return null;}};

// Les onglets, avec le trait qui glisse d un onglet a l autre.
_NXFX.onglets=function(L,actif,set,opt){try{
if(window._NXI&&_NXI.lang==="en")L=L.map(function(t){var c=t.slice();c[1]=_NXtr(c[1]);return c;});
opt=opt||{};var P=_NXpal,c=opt.col||P.acc;
var idx=0,a;for(a=0;a<L.length;a++)if(L[a][0]===actif)idx=a;
var pas=L.length?100/L.length:100;
var trait={position:"absolute",bottom:"-1px",height:"2px",borderRadius:"2px",background:c,
left:(idx*pas)+"%",width:pas+"%",boxShadow:"0 0 12px "+_NXteinte(c,50)};
if(_NXFX.anime())trait.transition="left .28s cubic-bezier(.22,.8,.28,1),width .28s cubic-bezier(.22,.8,.28,1)";
return i("div",{style:{position:"relative",display:"flex",gap:"2px",marginBottom:"22px",
borderBottom:"1px solid "+P.hair}},
L.map(function(t,k){var on=t[0]===actif;
return i("div",{key:k,className:"nx-fx",role:"tab","aria-selected":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){set(t[0]);},"data-nx-tab":"1",
style:{flex:1,textAlign:"center",padding:"11px 6px 13px",cursor:"pointer",
fontSize:"12.5px",fontWeight:on?"800":"600",letterSpacing:".01em",
color:on?P.txt:P.dim,display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}},
t[2]?_NXFX.ico(t[2],15,{hv:"saute",col:on?c:P.faint}):null,
i("span",null,_NXtr(t[1])),
(t[3]!==undefined&&t[3]!==null&&t[3]!=="")?i("span",_NXFX.fusion({style:{minWidth:"17px",height:"17px",padding:"0 5px",
borderRadius:"99px",background:on?_NXteinte(c,20):P.raise,color:on?c:P.sub,fontSize:"9.5px",fontWeight:"900",
display:"inline-flex",alignItems:"center",justifyContent:"center",fontFamily:_NXf.mono}},
_NXFX.a({"data-nx-pop":"1"})),_NXtr(String(t[3]))):null);}),
i("div",{"aria-hidden":"true",style:trait}));}catch(_){return null;}};

// La tuile : une icone, un titre, une phrase. Cliquable ou non.
_NXFX.tuile=function(o){try{
o=_NXFX.tr(o||{},["titre","sous","texte"]);var P=_NXpal,c=o.col||P.sub;
var att={style:{position:"relative",overflow:"hidden",padding:"16px",borderRadius:"15px",
background:o.plein?_NXteinte(c,7):P.inset,border:"1px solid "+(o.plein?_NXteinte(c,24):P.line),
cursor:o.onClick?"pointer":"default",minWidth:0}};
if(o.key!==undefined&&o.key!==null)att.key=o.key;
if(o.onClick){att.className="nx-fx";att.role="button";att.role="button";att.tabIndex=0;att.onKeyDown=_NXkey;att.onClick=o.onClick;}
if(_NXFX.anime()){att["data-nx-tile"]="1";if(o.rang)att["data-nx-rise"]=String(o.rang);}
return i("div",att,
o.ruban?i("div",{"aria-hidden":"true",style:{position:"absolute",top:0,left:"14px",right:"14px",height:"1px",
background:"linear-gradient(90deg,transparent,"+_NXteinte(c,50)+",transparent)"}}):null,
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",marginBottom:o.texte?"11px":"0"}},
o.icone?_NXFX.pastille(o.icone,{col:c,taille:o.z||32,mv:o.mv,hv:o.hv||"penche",halo:!!o.halo}):null,
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(o.titre)||""),
o.sous?i("div",{style:{fontSize:"10.5px",color:P.dim,marginTop:"3px",fontFamily:_NXf.mono}},_NXtr(o.sous)):null),
o.droite?i("div",{style:{flexShrink:0}},_NXtr(o.droite)):null),
o.texte?i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.55}},_NXtr(o.texte)):null,
o.bas?i("div",{style:{marginTop:"12px"}},_NXtr(o.bas)):null);}catch(_){return null;}};

_NXFX.grille=function(enfants,min){try{
return i("div",{style:{display:"grid",gap:"12px",
gridTemplateColumns:"repeat(auto-fill,minmax("+(min||246)+"px,1fr))"}},_NXtr(enfants));}catch(_){return null;}};

// Un chiffre qui compte, une etiquette, une teinte.
_NXFX.chiffre=function(o){try{
o=_NXFX.tr(o||{},["k","sous"]);var P=_NXpal;
return i("div",_NXFX.fusion({style:{minWidth:0}},_NXFX.a(o.rang?{"data-nx-rise":String(o.rang)}:{})),
i("div",{style:{display:"flex",alignItems:"baseline",gap:"5px"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:o.grand?"30px":"23px",fontWeight:"800",
color:o.col||P.txt,letterSpacing:"-.03em",lineHeight:1,fontVariantNumeric:"tabular-nums"}},_NXtr(o.v)),
o.unite?i("div",{style:{fontSize:"11px",color:P.dim,fontFamily:_NXf.mono}},_NXtr(o.unite)):null),
i("div",{style:{fontSize:"10px",fontWeight:"700",letterSpacing:".1em",color:P.dim,
textTransform:"uppercase",marginTop:"8px"}},_NXtr(o.k)||""),
o.sous?i("div",{style:{fontSize:"11px",color:P.faint,marginTop:"3px"}},_NXtr(o.sous)):null);}catch(_){return null;}};

// La jauge en arc : la portion pleine se dessine au montage.
_NXFX.jauge=function(pct,col,taille,texte,sous){try{
var P=_NXpal,t=taille||118,c=col||P.acc;
var p=Math.max(0,Math.min(100,+pct||0));
var r=42,circ=2*Math.PI*r,arc=circ*0.75;
var plein=arc*(p/100);
return i("div",{style:{position:"relative",width:t+"px",height:t+"px",flexShrink:0}},
i("svg",{viewBox:"0 0 100 100",width:t,height:t,"aria-hidden":"true",
style:{transform:"rotate(135deg)"}},
i("circle",{cx:50,cy:50,r:r,fill:"none",stroke:P.line,"strokeWidth":7,"strokeLinecap":"round",
"strokeDasharray":arc+" "+circ}),
i("circle",_NXFX.fusion({cx:50,cy:50,r:r,fill:"none",stroke:c,"strokeWidth":7,"strokeLinecap":"round",
"strokeDasharray":plein+" "+circ},_NXFX.a({"data-nx-ring":"1"})))),
i("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",
alignItems:"center",justifyContent:"center",paddingTop:"4px"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:Math.round(t*0.2)+"px",fontWeight:"800",color:P.txt,
letterSpacing:"-.03em",lineHeight:1,fontVariantNumeric:"tabular-nums"}},_NXtr(texte)),
sous?i("div",{style:{fontSize:"9.5px",fontWeight:"700",letterSpacing:".1em",color:P.dim,
textTransform:"uppercase",marginTop:"5px"}},_NXtr(sous)):null));}catch(_){return null;}};

// Une courbe, tracee au montage. `vals` est une suite de nombres bruts.
_NXFX.courbe=function(vals,col,h,opt){try{
opt=opt||{};var P=_NXpal,c=col||P.acc,H=h||58,W=100;
var L=vals&&vals.length?vals:[0];
var mx=0,a;for(a=0;a<L.length;a++)if(L[a]>mx)mx=L[a];
if(mx<=0)mx=1;
var pts=[],pas=L.length>1?W/(L.length-1):W;
for(a=0;a<L.length;a++)pts.push((a*pas).toFixed(2)+","+(H-(L[a]/mx)*(H-6)-3).toFixed(2));
var d="M"+pts.join(" L");
var aire=d+" L"+W+","+H+" L0,"+H+" Z";
var uid="nxc"+Math.abs(_NXFX.hash(String(c)+L.length+H));
return i("svg",{viewBox:"0 0 "+W+" "+H,preserveAspectRatio:"none",width:"100%",height:H+"px","aria-hidden":"true"},
i("defs",null,i("linearGradient",{id:uid,x1:"0",y1:"0",x2:"0",y2:"1"},
i("stop",{offset:"0%","stopColor":c,"stopOpacity":opt.plein||.22}),
i("stop",{offset:"100%","stopColor":c,"stopOpacity":0}))),
i("path",{d:aire,fill:"url(#"+uid+")"}),
i("path",_NXFX.fusion({d:d,fill:"none",stroke:c,"strokeWidth":opt.gros||1.6,
"strokeLinecap":"round","strokeLinejoin":"round","vectorEffect":"non-scaling-stroke"},
_NXFX.a({"data-nx-trace":"1",style:{"--nx-len":"260"}}))));}catch(_){return null;}};

_NXFX.hash=function(s){try{var h=5381,a=0,t=String(s||"");for(;a<t.length;a++)h=(((h<<5)+h)^t.charCodeAt(a))|0;return h>>>0;}catch(_){return 0;}};

// Des barres, qui poussent au montage.
_NXFX.barres=function(L,col,h){try{
var P=_NXpal,c=col||P.acc,H=h||72;
var mx=0,a;for(a=0;a<L.length;a++)if(L[a].v>mx)mx=L[a].v;
if(mx<=0)mx=1;
return i("div",{style:{display:"flex",alignItems:"flex-end",gap:L.length>36?"1px":(L.length>18?"3px":"5px"),
height:H+"px"}},
L.map(function(x,k){var pc=Math.max(3,(x.v/mx)*100);
return i("div",_NXFX.fusion({key:k,title:x.t||"",style:{flex:1,height:pc+"%",borderRadius:"3px 3px 1px 1px",
background:x.v>0?(x.hi?c:"linear-gradient("+"180deg,"+_NXteinte(c,62)+","+_NXteinte(c,16)+")"):P.raise,
transformOrigin:"bottom center"}},_NXFX.a({style:{flex:1,height:pc+"%",borderRadius:"3px 3px 1px 1px",
background:x.v>0?(x.hi?c:"linear-gradient(180deg,"+_NXteinte(c,62)+","+_NXteinte(c,16)+")"):P.raise,
transformOrigin:"bottom center",transition:"height .5s cubic-bezier(.22,.8,.28,1)"}})));}));}catch(_){return null;}};

// Une pastille de texte : etat, compteur, mention.
_NXFX.badge=function(txt,col,opt){try{
txt=_NXtr(txt);
opt=opt||{};var P=_NXpal,c=col||P.sub;
return i("span",_NXFX.fusion({style:{display:"inline-flex",alignItems:"center",gap:"5px",
padding:opt.gros?"5px 11px":"3px 9px",borderRadius:"99px",
background:opt.plein?c:_NXteinte(c,12),color:opt.plein?P.ink:c,
border:"1px solid "+(opt.plein?c:_NXteinte(c,26)),
fontSize:opt.gros?"11px":"10px",fontWeight:"800",letterSpacing:".04em",whiteSpace:"nowrap"}},
opt.anime?_NXFX.a({"data-nx-pop":"1"}):{}),
opt.point?i("span",_NXFX.fusion({style:{width:"5px",height:"5px",borderRadius:"50%",
background:"currentColor",flexShrink:0}},_NXFX.a({"data-nx-dot":"1"}))):null,
opt.icone?_NXFX.ico(opt.icone,11):null,
_NXtr(txt));}catch(_){return null;}};

// Un bouton, avec sa teinte et son icone.
_NXFX.bouton=function(o){try{
o=_NXFX.tr(o||{},["t"]);var P=_NXpal,c=o.col||P.pale;
var fond=o.plein?c:(o.creux?"transparent":P.raise);
return i("div",_NXFX.fusion({className:"nx-fx",role:"button",tabIndex:o.off?-1:0,onKeyDown:_NXkey,
onClick:o.off?null:o.onClick,"aria-disabled":o.off?"true":"false",
style:{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"7px",
padding:o.petit?"7px 12px":"11px 16px",borderRadius:"11px",
background:o.off?P.inset:fond,color:o.off?P.mute:(o.plein?P.ink:c),
border:"1px solid "+(o.off?P.line:(o.plein?c:_NXteinte(c,30))),
fontSize:o.petit?"11.5px":"12.5px",fontWeight:"800",letterSpacing:".01em",
cursor:o.off?"not-allowed":"pointer",flex:o.large?1:"0 0 auto",whiteSpace:"nowrap",
opacity:o.off?.6:1}},_NXFX.a({"data-nx-appui":"1"})),
o.icone?_NXFX.ico(o.icone,o.petit?13:15,{hv:o.hv||"pousse"}):null,
i("span",null,_NXtr(o.t)||""));}catch(_){return null;}};

// L etat vide : une icone qui flotte, une phrase, une porte de sortie.
_NXFX.vide=function(o){try{
o=_NXFX.tr(o||{},["titre","texte"]);var P=_NXpal,c=o.col||P.faint;
return i("div",_NXFX.fusion({style:{padding:"46px 22px",textAlign:"center"}},_NXFX.a({"data-nx-fade":"1"})),
i("div",_NXFX.fusion({style:{display:"inline-flex",color:c,marginBottom:"16px"}},_NXFX.a({"data-nx-float":"1"})),
_NXFX.svg(o.icone||"point",44)),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"17px",fontWeight:"800",color:P.pale,letterSpacing:"-.02em"}},_NXtr(o.titre)||""),
o.texte?i("div",{style:{fontSize:"12.5px",color:P.dim,marginTop:"9px",lineHeight:1.6,maxWidth:"400px",
marginLeft:"auto",marginRight:"auto"}},_NXtr(o.texte)):null,
o.action?i("div",{style:{marginTop:"18px"}},_NXtr(o.action)):null);}catch(_){return null;}};

// Une ligne de liste : pastille, deux lignes de texte, un cote droit.
_NXFX.rangee=function(o){try{
o=_NXFX.tr(o||{},["titre","texte"]);var P=_NXpal,c=o.col||P.sub;
var att={style:{display:"flex",alignItems:"center",gap:"13px",padding:"13px 2px",
borderTop:o.premier?"none":"1px solid "+P.line,cursor:o.onClick?"pointer":"default"}};
if(o.key!==undefined&&o.key!==null)att.key=o.key;
if(o.onClick){att.className="nx-fx";att.role="button";att.tabIndex=0;att.onKeyDown=_NXkey;att.onClick=o.onClick;}
if(_NXFX.anime()&&o.rang)att["data-nx-rise"]=String(o.rang);
return i("div",att,
o.icone?_NXFX.pastille(o.icone,{col:c,taille:o.z||32,hv:"penche"}):null,
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"600",color:P.txt,overflow:"hidden",
textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(o.titre)||""),
o.texte?i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"4px",lineHeight:1.5}},_NXtr(o.texte)):null),
o.droite?i("div",{style:{flexShrink:0,display:"flex",alignItems:"center",gap:"8px"}},_NXtr(o.droite)):null);}catch(_){return null;}};

// Un champ de saisie, au meme dessin partout.
_NXFX.champ=function(o){try{
o=_NXFX.tr(o||{},["k","ph","aide"]);var P=_NXpal;
return i("div",{style:{marginBottom:o.serre?"8px":"12px"}},
o.k?i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".13em",color:P.dim,
textTransform:"uppercase",marginBottom:"7px"}},_NXtr(o.k)):null,
i("div",{style:{position:"relative",display:"flex",alignItems:"center"}},
o.icone?i("div",{style:{position:"absolute",left:"12px",color:P.faint,display:"flex",pointerEvents:"none"}},
_NXFX.svg(o.icone,15)):null,
i(o.multi?"textarea":"input",{type:o.type||"text",value:o.v==null?"":o.v,placeholder:_NXtr(o.ph)||"",
onChange:o.onChange,onKeyDown:o.onKeyDown,rows:o.lignes||3,spellCheck:false,
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:o.icone?"11px 12px 11px 34px":"11px 12px",color:P.txt,
fontSize:"12.5px",fontFamily:o.mono?_NXf.mono:"inherit",outline:"none",resize:o.multi?"vertical":"none"}})),
o.aide?i("div",{style:{fontSize:"10.5px",color:P.faint,marginTop:"6px",lineHeight:1.5}},_NXtr(o.aide)):null);}catch(_){return null;}};

// Un bandeau d avertissement, colore par le ton.
_NXFX.note=function(o){try{
o=_NXFX.tr(o||{},["titre","texte"]);var P=_NXpal,c=o.col||P.info;
return i("div",_NXFX.fusion({style:{display:"flex",gap:"11px",alignItems:"flex-start",
padding:"13px 14px",borderRadius:"13px",background:_NXteinte(c,8),
border:"1px solid "+_NXteinte(c,24),marginBottom:o.serre?"10px":"14px"}},_NXFX.a({"data-nx-zoom":"1"})),
i("div",{style:{color:c,display:"flex",flexShrink:0,marginTop:"1px"}},_NXFX.svg(o.icone||"info",16)),
i("div",{style:{flex:1,minWidth:0}},
o.titre?i("div",{style:{fontSize:"12px",fontWeight:"800",color:c,marginBottom:"5px"}},_NXtr(o.titre)):null,
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.6}},_NXtr(o.texte)||"")),
o.droite?i("div",{style:{flexShrink:0}},_NXtr(o.droite)):null);}catch(_){return null;}};

// Une barre de progression, qui pousse au montage.
_NXFX.barre=function(pct,col,h){try{
var P=_NXpal,c=col||P.acc,p=Math.max(0,Math.min(100,+pct||0));
return i("div",_NXFX.fusion({style:{height:(h||5)+"px",background:P.line,borderRadius:"99px",overflow:"hidden"}},
_NXFX.a({"data-nx-bar":"1"})),
i("div",{style:{height:"100%",width:p+"%",borderRadius:"99px",
background:"linear-gradient(90deg,"+_NXteinte(c,45)+","+c+")"}}));}catch(_){return null;}};

_NXFX.sep=function(m){return i("div",{style:{height:"1px",background:_NXpal.line,margin:(m||16)+"px 0"}});};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXFX");if(window._NXERR)_NXERR.push("module _NXFX :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXFX desactive:",_nxE);}catch(_){}}
}
