var _NXPERFW=window._NXPERFW||(window._NXPERFW={});
if(!_NXPERFW.boot){try{_NXPERFW.boot=true;
_NXPERFW.LISTE=[["_NXPR","onMsg","Protect : messages recus"],["_NXPR","onMsgUpdate","Protect : messages modifies"],
["_NXPR","onPresence","Protect : statuts"],["_NXPR","masqueVague","Protect : liens a l ecran"],
["_NXGD","domScan","Gardes : fenetre"],["_NXP","onFlux","Privacy : evenements Discord"],
["_NXS","onMsg","Stats : messages"],["_NXS","onReact","Stats : reactions"],["_NXS","onEdit","Stats : modifications"],
["_NXS","onDelete","Stats : suppressions"],["_NXS","onVoice","Stats : vocal"],
["_NXAU","onMsg","Auto : messages"],["_NXAU","onVoice","Auto : vocal"],["_NXAU","onGuild","Auto : serveurs"],["_NXAU","onRelation","Auto : amis"],
["_NXUA","tick","Zone utilisateur"],["_NXIA","poseBouton","Bouton IA"],["_NXLIVE","tic","Vocal en direct"],
["_NXBEST","tour","Clips : ecoute"],["_NXCPT","veille","Compteurs"],["_NXPOP","veille","Nouveautes"],
["_NXSTATUS","rafraichis","Statut du service"],["_NXCANAL","veille","Salons suivis"],["_NXSOS","veille","SOS"]];
_NXPERFW.poses=[];
_NXPERFW.pose=function(){var L=_NXPERFW.LISTE;for(var a=0;a<L.length;a++){try{
var x=L[a],m=window[x[0]];
if(m&&typeof m[x[1]]==="function"&&!m[x[1]].__nxm){m[x[1]]=_NXPERF.mesure(x[2],m[x[1]]);_NXPERFW.poses.push(x[2]);}}catch(_){}}};
_NXPERFW.pose();
_NXPERF.observe();
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXPERFW");if(window._NXERR)_NXERR.push("module _NXPERFW :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXPERFW desactive:",_nxE);}catch(_){}}
}
