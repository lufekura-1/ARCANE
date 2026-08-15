(function(){
  const oldPixelIconData = window.pixelIconData;
  const oldRenderSpells = window.renderSpells;
  const oldRenderHero = window.renderHero;

  const style = document.createElement('style');
  style.textContent = `
  .trade-slot.common,.v12-slot.common{border-color:#5d4f3a!important;box-shadow:inset 0 0 0 1px rgba(173,134,80,.18)}
  .trade-slot.rare,.v12-slot.rare{border-color:#3e73b8!important;box-shadow:0 0 0 1px rgba(104,165,255,.22), inset 0 0 10px rgba(28,76,138,.22)}
  .trade-slot.epic,.v12-slot.epic{border-color:#8b55c7!important;box-shadow:0 0 0 1px rgba(187,120,255,.22), inset 0 0 10px rgba(91,39,133,.24)}
  .trade-slot.legendary,.v12-slot.legendary{border-color:#cc9b33!important;box-shadow:0 0 0 1px rgba(255,224,132,.28), inset 0 0 10px rgba(138,95,28,.22)}
  .trade-slot.mythic,.v12-slot.mythic{border-color:#73c4bf!important;box-shadow:0 0 0 1px rgba(178,255,249,.24), inset 0 0 10px rgba(31,96,92,.24)}
  .trade-slot.unavailable-item{opacity:.86;filter:saturate(.92) brightness(.88)}
  .trade-slot .slot-badge{position:absolute;left:3px;bottom:3px;background:#0d0b09;border:1px solid #6f5526;color:#efcf88;padding:1px 3px;font:900 6px 'Courier New',monospace;letter-spacing:.3px}
  .trade-slot .slot-drop{position:absolute;left:3px;top:3px;background:#121019;border:1px solid #5a4b79;color:#dbcaef;padding:1px 3px;font:900 6px 'Courier New',monospace}
  .trade-slot .slot-price{right:3px;top:3px}
  .trade-slot .slot-stack{right:3px;bottom:3px}
  .trade-slot .slot-plus{left:3px;top:3px}
  .trade-slot .slot-name{padding:0 4px}
  .v12-slot .rarity-tag{position:absolute;left:3px;top:3px;background:#090807;border:1px solid #5f4d2d;color:#e7cb90;padding:0 3px;font:900 6px 'Courier New',monospace}
  .spell-card .spell-pixel,.equipped-spell .spell-pixel{filter:drop-shadow(0 0 6px rgba(255,220,120,.15))}
  .spell-card.learned{box-shadow:inset 0 0 16px rgba(240,208,115,.08)}
  .spell-card h3,.equipped-spell b{text-shadow:0 1px 0 #000, 0 0 8px rgba(255,210,110,.12)}
  .trade-detail-note{margin-top:4px;color:#d8c9a0;font-size:8px;line-height:1.4}
  `;
  document.head.appendChild(style);

  function item(id,name,type,rarity,price,sell,stats,desc,extra){
    const o={id:id,name:name,type:type,rarity:rarity,price:price,sell:sell,stats:stats||{},desc:desc||''};
    if(extra) for(const k in extra) o[k]=extra[k];
    return o;
  }

  Object.assign(ITEMS, {
    dragon_shield: item('dragon_shield','Dragon Shield','shield','legendary',4800,1800,{shield:24,life:36},'Escudo dracônico coberto por placas rubras.',{specialOnly:true}),
    medusa_shield: item('medusa_shield','Medusa Shield','shield','mythic',6200,2300,{shield:27,life:40,mana:10},'Escudo exótico de escamas e runas venenosas.',{specialOnly:true}),
    ghost_shield: item('ghost_shield','Ghost Shield','shield','mythic',7600,2850,{shield:30,life:42,mana:14},'Escudo etéreo banhado em névoa espectral.',{specialOnly:true}),

    dragon_bow: item('dragon_bow','Dragon Bow','weapon','legendary',5200,1950,{atk:55,attackSpeed:.18},'Arco de guerra com chifres dracônicos.',{specialOnly:true}),
    medusa_bow: item('medusa_bow','Medusa Bow','weapon','mythic',6800,2550,{atk:59,attackSpeed:.19,mana:10},'Arco de serpentes petrificadas e gemas verdes.',{specialOnly:true}),
    ghost_bow: item('ghost_bow','Ghost Bow','weapon','mythic',8200,3075,{atk:63,attackSpeed:.21,mana:16},'Arco espectral quase translúcido.',{specialOnly:true}),
    sacred_bow: item('sacred_bow','Sacred Bow','weapon','legendary',9400,3525,{atk:68,attackSpeed:.22,mana:18},'Arco sagrado de elite, exposto como relíquia.',{specialOnly:true}),

    dragon_helmet: item('dragon_helmet','Dragon Helmet','helmet','legendary',3600,1350,{life:66,armor:7},'Elmo dracônico com detalhes flamejantes.',{specialOnly:true}),
    dragon_armor: item('dragon_armor','Dragon Armor','armor','legendary',6100,2280,{life:102,armor:10},'Armadura pesada de placas dracônicas.',{specialOnly:true}),
    dragon_legs: item('dragon_legs','Dragon Legs','legs','legendary',3300,1230,{life:56,armor:5},'Grevas dracônicas resistentes ao calor.',{specialOnly:true}),
    dragon_boots: item('dragon_boots','Dragon Boots','boots','legendary',2600,970,{life:38,armor:2,attackSpeed:.05},'Botas dracônicas reforçadas.',{specialOnly:true}),

    medusa_helmet: item('medusa_helmet','Medusa Helmet','helmet','mythic',4300,1610,{life:72,armor:8,mana:10},'Elmo exótico de escamas verdes.',{specialOnly:true}),
    medusa_armor: item('medusa_armor','Medusa Armor','armor','mythic',6900,2580,{life:110,armor:11,mana:16},'Armadura de escamas com brilho venenoso.',{specialOnly:true}),
    medusa_legs: item('medusa_legs','Medusa Legs','legs','mythic',3900,1460,{life:62,armor:6,mana:8},'Grevas sinuosas inspiradas na Medusa.',{specialOnly:true}),
    medusa_boots: item('medusa_boots','Medusa Boots','boots','mythic',3050,1140,{life:42,armor:2,attackSpeed:.06,mana:6},'Botas silenciosas de caçadora exótica.',{specialOnly:true}),

    ghost_helmet: item('ghost_helmet','Ghost Helmet','helmet','mythic',4800,1800,{life:74,armor:8,mana:14},'Elmo fantasmal e espectral.',{specialOnly:true}),
    ghost_armor: item('ghost_armor','Ghost Armor','armor','mythic',7600,2850,{life:116,armor:11,mana:20},'Armadura etérea para guerreiros assombrados.',{specialOnly:true}),
    ghost_legs: item('ghost_legs','Ghost Legs','legs','mythic',4200,1570,{life:66,armor:6,mana:10},'Perneiras brancas de névoa encantada.',{specialOnly:true}),
    ghost_boots: item('ghost_boots','Ghost Boots','boots','mythic',3400,1270,{life:46,armor:2,attackSpeed:.07,mana:8},'Botas espectrais de passos leves.',{specialOnly:true}),

    sacred_helmet: item('sacred_helmet','Sacred Helmet','helmet','legendary',5200,1950,{life:78,armor:9,mana:14},'Elmo sagrado de ouro e marfim.',{specialOnly:true}),
    sacred_boots: item('sacred_boots','Sacred Boots','boots','legendary',3650,1360,{life:48,armor:3,attackSpeed:.08,mana:8},'Botas sagradas da ordem celestial.',{specialOnly:true}),
    sacred_shield: item('sacred_shield','Sacred Shield','shield','legendary',7900,2960,{shield:31,life:44,mana:16},'Escudo sagrado com brasão real.',{specialOnly:true})
  });

  Object.assign(V9_ITEM_LEVELS, {
    dragon_bow:30, dragon_helmet:30, dragon_armor:30, dragon_legs:30, dragon_boots:30, dragon_shield:30,
    medusa_bow:34, medusa_helmet:34, medusa_armor:34, medusa_legs:34, medusa_boots:34, medusa_shield:34,
    ghost_bow:38, ghost_helmet:38, ghost_armor:38, ghost_legs:38, ghost_boots:38, ghost_shield:38,
    sacred_bow:42, sacred_helmet:42, sacred_shield:42, sacred_boots:42
  });

  function rarityClass(r){return ({common:'common',rare:'rare',epic:'epic',legendary:'legendary',mythic:'mythic'})[r]||'common'}
  function rarityShort(r){return ({common:'C',rare:'R',epic:'E',legendary:'L',mythic:'M'})[r]||'C'}
  function isDropOnly(it){return !!(it && it.specialOnly)}
  function unlockLevel(it){return window.v9ItemLevel ? v9ItemLevel(it) : (it && it.level) || 1}

  window.iconKeyForItem = function(it){
    if(!it) return 'chest';
    if(it.id) return it.id;
    return ({weapon:'bow',shield:'shield',sword:'sword',helmet:'helmet',armor:'armor',legs:'legs',boots:'boots',necklace:'necklace',ring:'ring',consumable:'health_potion',ammo:'wood_arrow'})[it.type] || 'chest';
  };

  const ICON2 = {};
  function iconCanvas(draw){ const cv=document.createElement('canvas'); cv.width=cv.height=32; const c=cv.getContext('2d'); c.imageSmoothingEnabled=false; draw(c); return cv.toDataURL('image/png'); }
  function px(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))}
  function dot(c,x,y,col){px(c,x,y,1,1,col)}
  function outline(c,x,y,w,h,col){px(c,x,y,w,1,col);px(c,x,y+h-1,w,1,col);px(c,x,y,1,h,col);px(c,x+w-1,y,1,h,col)}
  function itemFrame(c,stroke,fill){px(c,2,2,28,28,fill||'#120f0d'); outline(c,2,2,28,28,stroke||'#695334')}
  function bowIcon(c,main,trim,stringCol,gem){ itemFrame(c,trim,'#0d0c0a'); px(c,9,6,2,20,main); px(c,8,7,1,3,trim); px(c,8,22,1,3,trim); px(c,10,8,1,16,stringCol||'#dfd3b0'); px(c,12,10,1,12,main); if(gem) px(c,14,14,3,3,gem) }
  function swordIcon(c,blade,hilt,guard,gem){ itemFrame(c,guard,'#0d0c0a'); px(c,15,5,2,16,blade); px(c,13,4,6,2,blade); px(c,11,18,10,2,guard); px(c,14,20,4,2,hilt); px(c,14,22,4,4,hilt); if(gem) px(c,15,20,2,2,gem); px(c,14,26,4,1,guard) }
  function shieldIcon(c,main,trim,emblem){ itemFrame(c,trim,'#0d0c0a'); px(c,9,6,14,4,trim); px(c,7,10,18,12,main); px(c,10,22,12,3,trim); if(emblem==='cross'){px(c,14,10,4,11,trim);px(c,10,14,12,3,trim)} else if(emblem==='gem'){px(c,13,12,6,6,trim);px(c,15,14,2,2,'#dce6ff')} else if(emblem==='eye'){px(c,11,13,10,4,trim);px(c,14,12,4,6,'#101416');px(c,15,14,2,2,'#84ff86')} else if(emblem==='ghost'){px(c,11,12,10,6,trim);px(c,12,18,8,4,'#d8f8ff'); dot(c,14,14,'#0a0f14'); dot(c,17,14,'#0a0f14')} else {px(c,12,12,8,8,trim)} }
  function helmIcon(c,main,trim,plume){ itemFrame(c,trim,'#0d0c0a'); px(c,8,11,16,10,main); px(c,10,8,12,4,trim); px(c,12,21,8,3,trim); px(c,12,14,8,2,'#0e1114'); if(plume) px(c,14,5,4,4,plume) }
  function armorIcon(c,main,trim,gem){ itemFrame(c,trim,'#0d0c0a'); px(c,10,7,12,5,trim); px(c,8,12,16,12,main); px(c,6,12,4,8,trim); px(c,22,12,4,8,trim); px(c,12,12,8,10,'#0e1114'); if(gem) px(c,14,14,4,4,gem) }
  function legsIcon(c,main,trim){ itemFrame(c,trim,'#0d0c0a'); px(c,9,8,14,6,trim); px(c,10,14,5,11,main); px(c,17,14,5,11,main); px(c,10,24,5,2,trim); px(c,17,24,5,2,trim) }
  function bootsIcon(c,main,trim){ itemFrame(c,trim,'#0d0c0a'); px(c,8,15,6,8,main); px(c,10,23,7,3,trim); px(c,18,15,6,8,main); px(c,15,23,9,3,trim) }
  function necklaceIcon(c,chain,gem){ itemFrame(c,chain,'#0d0c0a'); for(let i=0;i<8;i++) dot(c,9+i,11+Math.abs(4-i),chain); px(c,14,18,4,4,gem) }
  function ringIcon(c,band,gem){ itemFrame(c,band,'#0d0c0a'); px(c,10,10,12,4,band); px(c,9,14,4,6,band); px(c,19,14,4,6,band); px(c,10,19,12,3,band); px(c,13,6,6,4,gem) }
  function potionIcon(c,liquid,cap,glass){ itemFrame(c,cap,'#0d0c0a'); px(c,13,5,6,4,cap); px(c,11,9,10,15,glass||'#cfc3a0'); px(c,12,11,8,11,liquid); px(c,12,21,8,2,'#ffffff55'); px(c,13,12,2,5,'#ffffff') }
  function arrowIcon(c,shaft,head,feather,spark){ itemFrame(c,head,'#0d0c0a'); px(c,7,22,13,2,shaft); px(c,18,19,2,3,shaft); px(c,20,16,2,3,shaft); px(c,19,18,6,2,head); px(c,24,17,3,4,head); px(c,6,21,2,2,feather); px(c,5,19,2,2,feather); if(spark){px(c,23,13,2,2,spark); px(c,26,15,2,2,spark)} }
  function spellbookIcon(c){ itemFrame(c,'#a48038','#0d0b10'); px(c,8,6,16,20,'#c8b48c'); px(c,15,6,2,20,'#8f764b'); px(c,10,10,4,2,'#8142a9'); px(c,10,14,8,2,'#3a63b8'); px(c,10,18,6,2,'#c23e52') }
  function healIcon(c){ itemFrame(c,'#d4b467','#0e0b08'); px(c,13,7,6,18,'#f0d98b'); px(c,7,13,18,6,'#f0d98b'); px(c,14,8,4,16,'#fff0c2'); px(c,8,14,16,4,'#fff0c2') }
  function holyIcon(c){ itemFrame(c,'#d4b467','#0e0b08'); px(c,15,6,2,20,'#f6d478'); px(c,8,15,16,2,'#f6d478'); for(let i=0;i<8;i++){dot(c,16+(i%2?5:-5),6+i*2,'#fff2bb');dot(c,6+i*2,16,'#fff2bb')} }
  function masHolyIcon(c){ itemFrame(c,'#8f5bc7','#0d0b11'); px(c,8,8,16,16,'#201325'); px(c,15,6,2,20,'#f6d478'); px(c,6,15,20,2,'#f6d478'); for(let i=0;i<10;i++){dot(c,16+((i%2)*2-1)*(5+i%3),8+i,'#bb8cff');dot(c,16+((i%2)*2-1)*(5+i%3),24-i,'#bb8cff')} }
  function speedIcon(c){ itemFrame(c,'#4e7dd0','#0c0f14'); px(c,7,12,10,3,'#75b1ff'); px(c,12,9,7,3,'#75b1ff'); px(c,15,16,8,3,'#3662d2'); px(c,10,20,9,3,'#3662d2') }

  function drawPatchedIcon(type){
    if(ICON2[type]) return ICON2[type];
    let recognized = true;
    const url = iconCanvas(function(c){
      const t=type;
      if(t==='spellbook') return spellbookIcon(c);
      if(t==='heal' || t==='holy_heal') return healIcon(c);
      if(t==='holy' || t==='holy_bolt') return holyIcon(c);
      if(t==='mas_holy') return masHolyIcon(c);
      if(t==='speed') return speedIcon(c);
      if(t==='health_potion') return potionIcon(c,'#cf3e50','#8d6f3c','#bca274');
      if(t==='mana_potion') return potionIcon(c,'#3c69c5','#8d6f3c','#bca274');
      if(t==='wood_arrow') return arrowIcon(c,'#8e6435','#d3d6db','#dcc59a');
      if(t==='iron_arrow') return arrowIcon(c,'#755736','#c9d0d8','#d55252');
      if(t==='steel_arrow') return arrowIcon(c,'#c3c9d4','#f0f3f8','#6fa4ff');
      if(t==='explosion_arrow') return arrowIcon(c,'#7b5d32','#ff9f37','#eb5757','#ffd760');
      if(t==='hunting_bow') return bowIcon(c,'#7e532a','#b68a4b','#d7d0c3');
      if(t==='oak_bow') return bowIcon(c,'#8b5d2d','#c79a57','#e2d7c1');
      if(t==='composite_bow') return bowIcon(c,'#6f4c2d','#b7c4d8','#f5ebd6','#4b86d6');
      if(t==='royal_bow') return bowIcon(c,'#31508a','#ddb96d','#f1eadb','#caa13f');
      if(t==='holy_bow') return bowIcon(c,'#e8dfc1','#d9ad45','#fff2cc','#9ed0ff');
      if(t==='dragon_bow') return bowIcon(c,'#8a2e28','#db8a39','#f6deaf','#ffaf45');
      if(t==='medusa_bow') return bowIcon(c,'#416c3b','#7ac463','#f1edd8','#56d378');
      if(t==='ghost_bow') return bowIcon(c,'#d8eef3','#7aaac1','#ffffff','#b7f6ff');
      if(t==='sacred_bow') return bowIcon(c,'#f0e7d3','#d8b054','#ffffff','#9ed0ff');
      if(t==='soldier_sword') return swordIcon(c,'#d7dbe0','#7b5228','#a88656');
      if(t==='iron_sword') return swordIcon(c,'#c8ced6','#795126','#8b96a1');
      if(t==='knight_sword') return swordIcon(c,'#d7dfea','#6b4b2d','#406db3');
      if(t==='royal_sword') return swordIcon(c,'#ebedf2','#7e5a2a','#d4b159');
      if(t==='holy_blade') return swordIcon(c,'#f6f4ef','#d4a54b','#8cd8ff');
      if(t==='wooden_shield') return shieldIcon(c,'#7d5630','#c08b4d','plain');
      if(t==='iron_shield') return shieldIcon(c,'#7e838b','#d0d5dc','plain');
      if(t==='guardian_shield') return shieldIcon(c,'#56736b','#c1d1cf','gem');
      if(t==='royal_shield') return shieldIcon(c,'#31508a','#ddb96d','cross');
      if(t==='divine_shield') return shieldIcon(c,'#efe6c7','#d3a744','cross');
      if(t==='dragon_shield') return shieldIcon(c,'#8e2f29','#e2a04a','gem');
      if(t==='medusa_shield') return shieldIcon(c,'#48693e','#8ce184','eye');
      if(t==='ghost_shield') return shieldIcon(c,'#d8eef6','#75a7be','ghost');
      if(t==='sacred_shield') return shieldIcon(c,'#efeadb','#d8b054','cross');
      if(t==='leather_helmet') return helmIcon(c,'#7a5835','#b28853');
      if(t==='iron_helmet') return helmIcon(c,'#9aa2ac','#d8dce2');
      if(t==='steel_helmet') return helmIcon(c,'#a8b3c0','#e7edf6','#5a7fbe');
      if(t==='guardian_helmet') return helmIcon(c,'#58786f','#d7e6e2','#70d096');
      if(t==='halo_helmet') return helmIcon(c,'#efe7cf','#dbb054','#84d3ff');
      if(t==='dragon_helmet') return helmIcon(c,'#9c2f2a','#e59f4c','#ffb760');
      if(t==='medusa_helmet') return helmIcon(c,'#44683f','#79c86f','#84ff9b');
      if(t==='ghost_helmet') return helmIcon(c,'#d7e8f2','#7eb4c8','#dffaff');
      if(t==='sacred_helmet') return helmIcon(c,'#f0e7d5','#d8b055','#9ed4ff');
      if(t==='leather_armor') return armorIcon(c,'#765338','#b58852');
      if(t==='chain_armor') return armorIcon(c,'#9da5ae','#d2d7df');
      if(t==='knight_armor') return armorIcon(c,'#31558f','#d8b56a','#cfe1ff');
      if(t==='royal_armor') return armorIcon(c,'#264675','#dbba70','#8dc0ff');
      if(t==='sacred_armor') return armorIcon(c,'#efe5cf','#d7a949','#9ed2ff');
      if(t==='dragon_armor') return armorIcon(c,'#8d2c27','#e69e45','#ffae4c');
      if(t==='medusa_armor') return armorIcon(c,'#476a41','#83d072','#a1ffba');
      if(t==='ghost_armor') return armorIcon(c,'#d5e6ef','#78a9bd','#e5fbff');
      if(t==='cloth_legs') return legsIcon(c,'#5a4d72','#8064a1');
      if(t==='leather_legs') return legsIcon(c,'#6d5234','#b08254');
      if(t==='chain_legs') return legsIcon(c,'#98a0ab','#d4d9df');
      if(t==='royal_legs') return legsIcon(c,'#305186','#ddb56c');
      if(t==='sacred_legs') return legsIcon(c,'#efe6d1','#d8ae4f');
      if(t==='dragon_legs') return legsIcon(c,'#8d2c27','#e59e46');
      if(t==='medusa_legs') return legsIcon(c,'#42673f','#7ec36d');
      if(t==='ghost_legs') return legsIcon(c,'#d7e8ef','#7ca9bc');
      if(t==='travel_boots') return bootsIcon(c,'#6c4d2e','#aa7f4e');
      if(t==='leather_boots') return bootsIcon(c,'#775536','#b68955');
      if(t==='steel_boots') return bootsIcon(c,'#9ca5af','#d5dae2');
      if(t==='ranger_boots') return bootsIcon(c,'#41603c','#82b96b');
      if(t==='blessed_boots') return bootsIcon(c,'#efe6d2','#d6ac4c');
      if(t==='dragon_boots') return bootsIcon(c,'#8b2e29','#e29a44');
      if(t==='medusa_boots') return bootsIcon(c,'#44693f','#7fc76e');
      if(t==='ghost_boots') return bootsIcon(c,'#d8ecf3','#77aec4');
      if(t==='sacred_boots') return bootsIcon(c,'#efe8d8','#d8af52');
      if(t==='rope_necklace') return necklaceIcon(c,'#b58b54','#9a6ae0');
      if(t==='bronze_amulet') return necklaceIcon(c,'#c18f45','#5cb0ff');
      if(t==='sapphire_amulet') return necklaceIcon(c,'#d0d6df','#4a86db');
      if(t==='sun_amulet') return necklaceIcon(c,'#e1b353','#ff9354');
      if(t==='divine_amulet') return necklaceIcon(c,'#edd9a6','#85d4ff');
      if(t==='copper_ring') return ringIcon(c,'#b17a3f','#cb5a62');
      if(t==='silver_ring') return ringIcon(c,'#d4d8de','#6c92e2');
      if(t==='ruby_ring') return ringIcon(c,'#cfb16e','#c7424d');
      if(t==='royal_ring') return ringIcon(c,'#dfc57c','#4d79dc');
      if(t==='seraph_ring') return ringIcon(c,'#f0e2b6','#8dd9ff');
      recognized = false;
    });
    if(!recognized) return null;
    ICON2[type]=url; return url;
  }

  window.pixelIconData = function(type){ const custom=drawPatchedIcon(type); return custom || oldPixelIconData(type) };

  window.makeTradeSlot = function(it, opts){
    opts = opts || {};
    const d=document.createElement(opts.button===false?'div':'button');
    const rc=rarityClass(it && it.rarity);
    d.className='trade-slot '+(opts.selected?'selected ':'')+rc+(isDropOnly(it)?' unavailable-item':'');
    if(opts.lockedLevel) d.classList.add('locked'), d.dataset.level=opts.lockedLevel;
    let html='';
    if(opts.price!=null) html += `<span class="slot-price">${opts.price}</span>`;
    if(opts.plus) html += `<span class="slot-plus">+${opts.plus}</span>`;
    if(isDropOnly(it)) html += `<span class="slot-drop">DROP</span>`;
    html += `<span class="slot-icon pixel-icon" data-pixel-icon="${iconKeyForItem(it)}"></span>`;
    html += `<span class="slot-name">${opts.label||it?.name||'—'}</span>`;
    if(opts.qty>1) html += `<span class="slot-stack">${opts.qty}</span>`;
    html += `<span class="slot-badge">${rarityShort(it && it.rarity)}</span>`;
    d.innerHTML = html;
    return d;
  };

  const prevBuyItem = window.buyItem;
  window.buyItem = function(id){
    const it = ITEMS[id];
    if(!it) return;
    if(isDropOnly(it)) return toastMsg('Item raro de vitrine • somente drop');
    if(profile.level < unlockLevel(it)) return toastMsg(`Requer Level ${unlockLevel(it)}`);
    return prevBuyItem(id);
  };

  window.renderShop = function(){
    shopGold.textContent = profile.gold;
    document.querySelectorAll('.shop-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===shopTab));
    const stock = Object.values(ITEMS).filter(x=>x.type===shopTab);
    if(!stock.some(x=>x.id===selectedShopItem)) selectedShopItem = stock[0]?.id || null;
    shopGrid.innerHTML='';
    for(const it of stock){
      const lv=unlockLevel(it);
      const d=makeTradeSlot(it,{selected:selectedShopItem===it.id,price:it.price,label:it.name,lockedLevel:profile.level<lv?lv:null});
      d.onclick=()=>{selectedShopItem=it.id; renderShop()};
      shopGrid.appendChild(d);
    }
    if(!stock.length) shopGrid.innerHTML='<div class="trade-empty">Sem itens nesta categoria.</div>';
    const it = ITEMS[selectedShopItem];
    if(it){
      const lock=profile.level<unlockLevel(it);
      const unavailable=isDropOnly(it);
      const note = unavailable ? '<div class="trade-detail-note">Exibido na loja como <b>item raro de drop</b>. Não pode ser comprado diretamente.</div>' : '';
      const lvNote = `<br><span class="level-lock">Requer Level ${unlockLevel(it)}</span>`;
      const action = unavailable ? `<button class="btn ghost" disabled>Apenas Drop Raro</button>` : `<button class="btn primary" ${(profile.gold<it.price||lock)?'disabled':''} onclick="buyItem('${it.id}')">Comprar</button>`;
      shopDetail.innerHTML = `<div><h4>${it.name}</h4><p>${rarityName(it.rarity)} • ${it.desc||itemStats(it,it.id)}${it.type==='ammo'?` • Pacote: ${it.pack}`:''}<br>Preço: <b>${it.price} Gold</b>${lvNote}</p>${note}</div>${action}`;
    }else shopDetail.innerHTML='<div class="trade-empty">Selecione um item.</div>';
    shopBackpack.classList.add('shop-selectable'); shopBackpack.innerHTML=''; let has=false;
    profile.backpack.forEach((e,i)=>{ if(!e) return; has=true; const bi=ITEMS[e.itemId]; const d=makeTradeSlot(bi,{selected:selectedShopBp===i,qty:e.qty,plus:up(bi.id),label:bi.name}); d.onclick=()=>{selectedShopBp=i; renderShop()}; shopBackpack.appendChild(d); });
    if(!has) shopBackpack.innerHTML='<div class="trade-empty">Backpack vazia.</div>';
    const e=selectedShopBp!=null?profile.backpack[selectedShopBp]:null, bi=e?ITEMS[e.itemId]:null;
    shopSellDetail.innerHTML = bi ? `<div><h4>${bi.name}${up(bi.id)?` +${up(bi.id)}`:''}</h4><p>${rarityName(bi.rarity)} • ${itemStats(bi,bi.id)}<br>Venda: <b>${sellValue(bi,bi.id)*e.qty} Gold</b>${e.qty>1?` • x${e.qty}`:''}</p></div><button class="btn red" onclick="sellBp(${selectedShopBp})">Vender</button>` : '<div class="trade-empty">Toque em um item da backpack para vender.</div>';
    hydratePixelIcons(document);
  };

  window.renderHero = function(){
    if(oldRenderHero) oldRenderHero();
    profile.equipment.sword = profile.equipment.sword || 'soldier_sword';
    profile.equipment.shield = profile.equipment.shield || 'wooden_shield';
    const grid=document.getElementById('equipGrid');
    if(!grid) return;
    grid.className='equipment-grid v12-equip'; grid.innerHTML='';
    const ammo=ensureSelectedArrow(), aq=ammo?countItem(ammo):0, bp=(profile.backpack||[]).filter(Boolean).length+'/'+(profile.backpack?.length||0), mp=countItem('mana_potion');
    const defs=[['ring','RING',profile.equipment.ring],['helmet','HEAD',profile.equipment.helmet],['bag','BAG','backpack',bp],['bow','BOW',profile.equipment.weapon],['armor','ARMOR',profile.equipment.armor],['shield','SHIELD',profile.equipment.shield],['neck','NECK',profile.equipment.necklace],['legs','LEGS',profile.equipment.legs],['ammo','AMMO',ammo,aq],['mana','MANA','mana_potion',mp],['boots','BOOTS',profile.equipment.boots],['sword','SWORD',profile.equipment.sword]];
    function slot(cls,label,id,qty){
      const it=ITEMS[id]; const rc=rarityClass(it && it.rarity); const d=document.createElement('div'); d.className='v12-slot '+cls+' '+rc; const ic=document.createElement('span'); ic.className='pixel-icon'; if(id){ic.dataset.pixelIcon=id; ic.style.backgroundImage=`url(${pixelIconData(id)})`} d.appendChild(ic); const sm=document.createElement('small'); sm.textContent=label; d.appendChild(sm); if(qty!=null){const q=document.createElement('span'); q.className='q'; q.textContent=qty; d.appendChild(q)} if(it){ const rt=document.createElement('span'); rt.className='rarity-tag'; rt.textContent=rarityShort(it.rarity); d.appendChild(rt);} d.onclick=()=>{ const det=document.getElementById('heroDetail'); if(det) det.innerHTML=it?`<b>${it.name}</b><br>${itemStats(it,id)}<br><span class="level-lock">Requer Level ${unlockLevel(it)}</span>`:`<b>${label}</b>`; }; return d;
    }
    defs.forEach(x=>grid.appendChild(slot(x[0],x[1],x[2],x[3])));
    hydratePixelIcons(document);
  };

  const prevRenderHeroDetail = window.renderHeroDetail;
  window.renderHeroDetail = function(){ if(prevRenderHeroDetail) prevRenderHeroDetail(); hydratePixelIcons(document); };
  window.renderSpells = function(){ if(oldRenderSpells) oldRenderSpells(); hydratePixelIcons(document); };

  const prevDrawEffects = window.drawEffects;
  if(prevDrawEffects){
    window.drawEffects = function(now){
      prevDrawEffects(now);
      if(!window.hunt || !window.ctx) return;
      const c = window.ctx;
      for(const e of hunt.effects||[]){
        const age = now - e.start; if(age > e.duration) continue;
        const p = window.cellCenter ? cellCenter(e.r,e.c) : null; if(!p) continue;
        c.save(); c.globalAlpha = Math.max(0,1-age/e.duration); c.imageSmoothingEnabled=false;
        if(e.type==='speedBurst'){ px(c,p.x-12,p.y-2,24,4,'#75b1ff'); px(c,p.x-8,p.y+4,18,3,'#3f6fd9'); }
        if(e.type==='holyHeal'){ outline(c,p.x-10,p.y-10,20,20,'#fff0b0'); px(c,p.x-2,p.y-8,4,16,'#f3d478'); px(c,p.x-8,p.y-2,16,4,'#f3d478'); }
        c.restore();
      }
    };
  }

  setTimeout(function(){ hydratePixelIcons(document); if(lastScene==='shopScene') renderShop(); if(lastScene==='heroScene') renderHero(); if(lastScene==='spellsScene') renderSpells(); }, 60);
})();
