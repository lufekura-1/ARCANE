(function(){
  // Lightweight placeholder assets for Codex-friendly diffs.
  const V12_DATA = {
  "backpack": "assets/images/ui/backpack.png",
  "bg_adult_dragon_0": "assets/images/tiles/bg_fire.png",
  "bg_adult_dragon_1": "assets/images/tiles/bg_fire.png",
  "bg_balthazar_0": "assets/images/tiles/bg_arcane.png",
  "bg_balthazar_1": "assets/images/tiles/bg_arcane.png",
  "bg_bhaaz_0": "assets/images/tiles/bg_gold.png",
  "bg_bhaaz_1": "assets/images/tiles/bg_gold.png",
  "bg_cyclops_0": "assets/images/tiles/bg_cave.png",
  "bg_cyclops_1": "assets/images/tiles/bg_cave.png",
  "bg_dragon_0": "assets/images/tiles/bg_fire.png",
  "bg_dragon_1": "assets/images/tiles/bg_fire.png",
  "bg_giant_spider_0": "assets/images/tiles/bg_web.png",
  "bg_giant_spider_1": "assets/images/tiles/bg_web.png",
  "bg_minotaur_0": "assets/images/tiles/bg_cave.png",
  "bg_minotaur_1": "assets/images/tiles/bg_cave.png",
  "bg_moroheus_0": "assets/images/tiles/bg_fire.png",
  "bg_moroheus_1": "assets/images/tiles/bg_fire.png",
  "bg_orc_0": "assets/images/tiles/bg_grass.png",
  "bg_orc_1": "assets/images/tiles/bg_grass.png",
  "bg_spider_0": "assets/images/tiles/bg_web.png",
  "bg_spider_1": "assets/images/tiles/bg_web.png",
  "bg_troll_0": "assets/images/tiles/bg_grass.png",
  "bg_troll_1": "assets/images/tiles/bg_grass.png",
  "bg_white_orc_0": "assets/images/tiles/bg_grass.png",
  "bg_white_orc_1": "assets/images/tiles/bg_grass.png",
  "blessed_boots": "assets/images/equipment/boots.png",
  "boss_balthazar": "assets/images/creatures/boss_balthazar.png",
  "boss_bhaaz": "assets/images/creatures/boss_bhaaz.png",
  "boss_moroheus": "assets/images/creatures/boss_moroheus.png",
  "boss_white_orc": "assets/images/creatures/boss_white_orc.png",
  "bronze_amulet": "assets/images/equipment/amulet.png",
  "chain_armor": "assets/images/equipment/armor.png",
  "chain_legs": "assets/images/equipment/legs.png",
  "cloth_legs": "assets/images/equipment/legs.png",
  "composite_bow": "assets/images/equipment/bow.png",
  "copper_ring": "assets/images/equipment/ring.png",
  "divine_amulet": "assets/images/equipment/amulet.png",
  "divine_shield": "assets/images/equipment/shield.png",
  "explosion_arrow": "assets/images/equipment/arrow.png",
  "guardian_helmet": "assets/images/equipment/helmet.png",
  "guardian_shield": "assets/images/equipment/shield.png",
  "halo_helmet": "assets/images/equipment/helmet.png",
  "health_potion": "assets/images/equipment/potion_hp.png",
  "holy_blade": "assets/images/equipment/sword.png",
  "holy_bow": "assets/images/equipment/bow.png",
  "hunting_bow": "assets/images/equipment/bow.png",
  "iron_arrow": "assets/images/equipment/arrow.png",
  "iron_helmet": "assets/images/equipment/helmet.png",
  "iron_shield": "assets/images/equipment/shield.png",
  "iron_sword": "assets/images/equipment/sword.png",
  "knight_armor": "assets/images/equipment/armor.png",
  "knight_sword": "assets/images/equipment/sword.png",
  "leather_armor": "assets/images/equipment/armor.png",
  "leather_boots": "assets/images/equipment/boots.png",
  "leather_helmet": "assets/images/equipment/helmet.png",
  "leather_legs": "assets/images/equipment/legs.png",
  "mana_potion": "assets/images/equipment/potion_mp.png",
  "monster_cyclops": "assets/images/creatures/cyclops.png",
  "monster_dragon": "assets/images/creatures/dragon.png",
  "monster_dragon_hatchling": "assets/images/creatures/dragon.png",
  "monster_giant_spider": "assets/images/creatures/spider.png",
  "monster_minotaur": "assets/images/creatures/minotaur.png",
  "monster_orc": "assets/images/creatures/orc.png",
  "monster_spider": "assets/images/creatures/spider.png",
  "monster_troll": "assets/images/creatures/troll.png",
  "oak_bow": "assets/images/equipment/bow.png",
  "player_bow_down": "assets/images/characters/player.png",
  "player_bow_left": "assets/images/characters/player.png",
  "player_bow_right": "assets/images/characters/player.png",
  "player_bow_up": "assets/images/characters/player.png",
  "player_cast_down": "assets/images/characters/player.png",
  "player_cast_left": "assets/images/characters/player.png",
  "player_cast_right": "assets/images/characters/player.png",
  "player_cast_up": "assets/images/characters/player.png",
  "player_down": "assets/images/characters/player.png",
  "player_left": "assets/images/characters/player.png",
  "player_right": "assets/images/characters/player.png",
  "player_sword_down": "assets/images/characters/player.png",
  "player_sword_left": "assets/images/characters/player.png",
  "player_sword_right": "assets/images/characters/player.png",
  "player_sword_up": "assets/images/characters/player.png",
  "player_up": "assets/images/characters/player.png",
  "ranger_boots": "assets/images/equipment/boots.png",
  "rope_necklace": "assets/images/equipment/amulet.png",
  "royal_armor": "assets/images/equipment/armor.png",
  "royal_bow": "assets/images/equipment/bow.png",
  "royal_legs": "assets/images/equipment/legs.png",
  "royal_shield": "assets/images/equipment/shield.png",
  "royal_sword": "assets/images/equipment/sword.png",
  "ruby_ring": "assets/images/equipment/ring.png",
  "sacred_armor": "assets/images/equipment/armor.png",
  "sacred_legs": "assets/images/equipment/legs.png",
  "sapphire_amulet": "assets/images/equipment/amulet.png",
  "silver_ring": "assets/images/equipment/ring.png",
  "soldier_sword": "assets/images/equipment/sword.png",
  "steel_arrow": "assets/images/equipment/arrow.png",
  "steel_boots": "assets/images/equipment/boots.png",
  "steel_helmet": "assets/images/equipment/helmet.png",
  "summon_orc": "assets/images/creatures/orc.png",
  "summon_skeleton": "assets/images/creatures/skeleton.png",
  "sun_amulet": "assets/images/equipment/amulet.png",
  "travel_boots": "assets/images/equipment/boots.png",
  "wood_arrow": "assets/images/equipment/arrow.png",
  "wooden_shield": "assets/images/equipment/shield.png"
};
  const V12_IMG = {};
  for (const [k,src] of Object.entries(V12_DATA)) { const im=new Image(); im.src=src; V12_IMG[k]=im; }

  const prevPixelIconData = window.pixelIconData;
  const prevMonsterIconData = window.monsterIconData;
  const prevBossIconData = window.bossIconData;
  const prevDrawGrid = window.drawGrid;
  const prevDrawPaladin = window.drawPaladin;
  const prevDrawMonster = window.drawMonster;
  const prevOpenScene = window.openScene;
  const prevRenderHero = window.renderHero;
  const prevSpawnMonster = window.spawnMonster;
  const prevStartBoss = window.startBoss;

  const ITEM_GENERIC = {
    hero:'player_down', bow:'hunting_bow', sword:'soldier_sword', shield:'wooden_shield', helmet:'leather_helmet', armor:'leather_armor', legs:'cloth_legs', boots:'travel_boots', necklace:'rope_necklace', ring:'copper_ring', backpack:'backpack',
    health_potion:'health_potion', mana_potion:'mana_potion', wood_arrow:'wood_arrow', iron_arrow:'iron_arrow', steel_arrow:'steel_arrow', explosion_arrow:'explosion_arrow'
  };
  pixelIconData = function(type){
    const k = V12_DATA[type] ? type : ITEM_GENERIC[type];
    if (k && V12_DATA[k]) return V12_DATA[k];
    return prevPixelIconData(type);
  };
  monsterIconData = function(kind){
    const map={troll:'monster_troll',orc:'monster_orc',minotaur:'monster_minotaur',dragon:'monster_dragon_hatchling',spider:'monster_spider',giant_spider:'monster_giant_spider',cyclops:'monster_cyclops',adult_dragon:'monster_dragon'};
    const k=map[kind]; return k&&V12_DATA[k]?V12_DATA[k]:prevMonsterIconData(kind);
  };
  bossIconData = function(kind){
    const k='boss_'+kind; return V12_DATA[k]?V12_DATA[k]:prevBossIconData(kind);
  };


  function v12LifeNameBar(label,px,barY,barW,ratio,color,fontSz){
    ctx.save();ctx.font=`700 ${fontSz}px "Courier New"`;ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillStyle='#eadfbf';ctx.shadowBlur=3;ctx.shadowColor='#000';ctx.fillText(label,px,barY-2);ctx.shadowBlur=0;ctx.fillStyle='#09070b';ctx.fillRect(px-barW/2,barY,barW,7);ctx.fillStyle=color;ctx.fillRect(px-barW/2+1,barY+1,(barW-2)*Math.max(0,ratio),5);ctx.strokeStyle='#b88a43';ctx.strokeRect(px-barW/2+.5,barY+.5,barW-1,6);ctx.restore();
  }

  function fit(img,x,y,w,h,alpha=1){
    if(!img || !img.complete || !img.naturalWidth) return false;
    const s=Math.min(w/img.naturalWidth,h/img.naturalHeight),dw=img.naturalWidth*s,dh=img.naturalHeight*s;
    ctx.save();ctx.globalAlpha=alpha;ctx.imageSmoothingEnabled=false;ctx.drawImage(img,Math.round(x+(w-dw)/2),Math.round(y+(h-dh)/2),Math.round(dw),Math.round(dh));ctx.restore();return true;
  }
  function huntBgKey(){
    if(!hunt) return null;
    const v=((hunt.id||0)+(hunt.mode==='boss'?1:0))%2;
    return `bg_${hunt.kind}_${v}`;
  }
  drawGrid=function(){
    const g=gridGeom(),key=huntBgKey(),bg=key?V12_IMG[key]:null;
    if(bg && bg.complete && bg.naturalWidth){
      ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(bg,Math.floor(g.left),Math.floor(g.top),Math.ceil(g.cw*COLS),Math.ceil(g.ch*ROWS));ctx.restore();
    } else {
      for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++) drawWorldTile(r,c,g);
    }
    // Very subtle grid to preserve the discrete-SQM gameplay.
    ctx.save();ctx.strokeStyle='rgba(211,165,72,.075)';ctx.lineWidth=1;
    for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)ctx.strokeRect(Math.floor(g.left+c*g.cw)+.5,Math.floor(g.top+r*g.ch)+.5,Math.floor(g.cw)-1,Math.floor(g.ch)-1);
    ctx.strokeStyle='rgba(151,86,181,.55)';ctx.lineWidth=2;
    for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const r=hunt.hero.r+dr,c=hunt.hero.c+dc;if(r<0||r>=ROWS||c<0||c>=COLS||occupied(r,c))continue;
      const p=cellCenter(r,c);ctx.strokeRect(Math.floor(p.x-g.cw*.39)+.5,Math.floor(p.y-g.ch*.39)+.5,Math.floor(g.cw*.78),Math.floor(g.ch*.78));
    }
    ctx.restore();
  };
  // backgrounds already carry their props; this removes duplicate overlays.
  buildDecor=function(){return []};

  function playerKey(now){
    const dir=hunt.hero.dir||'down',mode=hunt.hero.combatMode||'bow';
    if(hunt.hero.castUntil>now && V12_DATA[`player_cast_${dir}`]) return `player_cast_${dir}`;
    if(hunt.hero.attackUntil>now){
      const p=`player_${mode==='melee'?'sword':'bow'}_${dir}`; if(V12_DATA[p]) return p;
    }
    return `player_${dir}`;
  }
  drawPaladin=function(now){
    const p=cellCenter(hunt.hero.r,hunt.hero.c),g=gridGeom(),key=playerKey(now),img=V12_IMG[key];
    const size=Math.min(g.cw,g.ch)*.88,x=p.x-size/2,y=p.y-size*.58;
    if(now<hunt.speedUntil){fit(img,x-7,y,size,size,.20);fit(img,x-13,y,size,size,.11)}
    if(!fit(img,x,y,size,size,1)) return prevDrawPaladin(now);
    const barW=Math.min(g.cw*.68,72),barH=5,barY=p.y-size*.53-12;
    ctx.save();ctx.fillStyle='#070509';ctx.fillRect(Math.round(p.x-barW/2),Math.round(barY),Math.round(barW),barH);ctx.fillStyle='#b5243b';ctx.fillRect(Math.round(p.x-barW/2+1),Math.round(barY+1),Math.round((barW-2)*Math.max(0,profile.life/maxLife())),barH-2);ctx.strokeStyle='#b98a43';ctx.strokeRect(Math.round(p.x-barW/2)+.5,Math.round(barY)+.5,Math.round(barW)-1,barH-1);ctx.restore();
  };

  function normalMonsterKey(m){
    if(m.isSummon) return m.spriteKind==='white_orc_minion'?'summon_orc':'summon_skeleton';
    const k=m.spriteKind||hunt.kind;
    return ({troll:'monster_troll',orc:'monster_orc',minotaur:'monster_minotaur',dragon:'monster_dragon_hatchling',spider:'monster_spider',giant_spider:'monster_giant_spider',cyclops:'monster_cyclops',adult_dragon:'monster_dragon'}[k]||'monster_troll');
  }
  drawMonster=function(m,now){
    const p=entityCenter(m),g=gridGeom(),alive=m.alive;
    if(m.isBoss){
      const key='boss_'+(m.spriteKind||hunt.bossKind),img=V12_IMG[key];
      const maxW=g.cw*1.78,maxH=g.ch*1.68,x=p.x-maxW/2,y=p.y-maxH*.55;
      if(!fit(img,x,y,maxW,maxH,alive?1:Math.max(0,1-(now-m.deathAt)/520))) return prevDrawMonster(m,now);
      const barW=Math.min(g.cw*1.42,148),barY=y-14;
      v12LifeNameBar((BOSSES[hunt.bossKind]||{name:'Boss'}).name,p.x,barY,barW,m.life/m.maxLife,({moroheus:'#b92d36',balthazar:'#75408f',bhaaz:'#c99b36',white_orc:'#c7c2b8'}[hunt.bossKind]||'#75408f'),9);return;
    }
    const key=normalMonsterKey(m),img=V12_IMG[key],size=Math.min(g.cw,g.ch)*.86,x=p.x-size/2,y=p.y-size*.58;
    if(!fit(img,x,y,size,size,alive?1:Math.max(0,1-(now-m.deathAt)/420))) return prevDrawMonster(m,now);
    const barW=Math.min(g.cw*.82,90),barY=y-13,name=m.isSummon?(m.summonName||'Summon'):hunt.m.name;
    v12LifeNameBar(name,p.x,barY,barW,m.life/m.maxLife,m.isSummon?'#70428e':'#9f2737',7);
  };


  // Gameplay safeguards kept from the stable branch.
  spawnMonster=function(){
    if(hunt && hunt.mode!=='boss'){
      const lv=MONSTERS[hunt.kind]?.level||1,maxAlive=lv<=5?5:(lv<=12?6:8),alive=hunt.monsters.filter(m=>m.alive&&!m.isBoss).length;
      if(alive>=maxAlive)return;
    }
    return prevSpawnMonster();
  };
  startBoss=function(kind){
    const r=prevStartBoss(kind);
    if(hunt?.mode==='boss'){
      const b=hunt.monsters.find(m=>m.isBoss);if(b){b.r=2;b.c=1;b.w=2;b.h=1;}
      if(kind==='balthazar'){const s=hunt.monsters.filter(m=>m.isSummon);if(s[0]){s[0].r=4;s[0].c=0}if(s[1]){s[1].r=4;s[1].c=4}}
      if(kind==='white_orc'){const s=hunt.monsters.filter(m=>m.isSummon),pos=[[4,0],[4,4],[5,0],[5,4]];s.forEach((m,i)=>{if(pos[i]){m.r=pos[i][0];m.c=pos[i][1]}})}
    }
    return r;
  };

  // Tibia-style equipment placement, using the isolated 32x32 assets.
  function v12Slot(cls,label,id,qty,onClick){
    const d=document.createElement('div');d.className='v12-slot '+cls;const ic=document.createElement('span');ic.className='pixel-icon';if(id){ic.dataset.pixelIcon=id;ic.style.backgroundImage=`url(${pixelIconData(id)})`}d.appendChild(ic);const sm=document.createElement('small');sm.textContent=label;d.appendChild(sm);if(qty!=null){const q=document.createElement('span');q.className='q';q.textContent=qty;d.appendChild(q)}if(onClick)d.onclick=onClick;return d;
  }
  renderHero=function(){
    prevRenderHero();
    profile.equipment.sword=profile.equipment.sword||'soldier_sword';profile.equipment.shield=profile.equipment.shield||'wooden_shield';
    const grid=document.getElementById('equipGrid');if(!grid)return;grid.className='equipment-grid v12-equip';grid.innerHTML='';
    const ammo=ensureSelectedArrow(),aq=ammo?countItem(ammo):0,bp=(profile.backpack||[]).filter(Boolean).length+'/'+(profile.backpack?.length||0),mp=countItem('mana_potion');
    const defs=[['ring','RING',profile.equipment.ring],['helmet','HEAD',profile.equipment.helmet],['bag','BAG','backpack',bp],['bow','BOW',profile.equipment.weapon],['armor','ARMOR',profile.equipment.armor],['shield','SHIELD',profile.equipment.shield],['neck','NECK',profile.equipment.necklace],['legs','LEGS',profile.equipment.legs],['ammo','AMMO',ammo,aq],['mana','MANA','mana_potion',mp],['boots','BOOTS',profile.equipment.boots],['sword','SWORD',profile.equipment.sword]];
    for(const [cls,label,id,qty] of defs){grid.appendChild(v12Slot(cls,label,id,qty,()=>{const it=ITEMS[id];const det=document.getElementById('heroDetail');if(det)det.innerHTML=it?`<b>${it.name}</b><br>${itemStats(it,id)}`:`<b>${label}</b>`}))}
    hydratePixelIcons(document);
  };

  function installCheats(){
    const grid=document.querySelector('#settingsScene .settings-grid');if(!grid||document.getElementById('v12Cheats'))return;
    const d=document.createElement('div');d.className='setting';d.id='v12Cheats';d.innerHTML='<h3>Cheats</h3><p>Ferramentas de teste.</p><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px"><button class="btn gold" id="v12Level">Level Up</button><button class="btn gold" id="v12Skills">Skills +1</button><button class="btn gold" id="v12Gold">+10.000 Gold</button><button class="btn gold" id="v12Heal">Full Life & Mana</button></div>';
    grid.appendChild(d);
    d.querySelector('#v12Level').onclick=()=>{profile.level++;profile.life=maxLife();profile.mana=maxMana();save();renderSettings();toastMsg('Level +1')};
    d.querySelector('#v12Skills').onclick=()=>{Object.values(profile.skills||{}).forEach(s=>s.level=(s.level||0)+1);save();toastMsg('Skills +1')};
    d.querySelector('#v12Gold').onclick=()=>{profile.gold+=10000;save();renderSettings();toastMsg('+10.000 Gold')};
    d.querySelector('#v12Heal').onclick=()=>{profile.life=maxLife();profile.mana=maxMana();save();toastMsg('Life e Mana restaurados')};
  }

  // ---------- Mobile navigation shell ----------
  const CSS=`
  :root{--v12-gold:#b88a43;--v12-gold2:#e0bd78;--v12-iron:#262422;--v12-leather:#35271d;--v12-wine:#5c2427;--v12-blue:#273c52}
  body{background:#08090b!important;padding-bottom:76px!important}
  body.v12-in-hunt{padding-bottom:0!important}
  #arcaneBottomNav{position:fixed;z-index:10020;bottom:0;left:50%;transform:translateX(-50%);width:min(100%,760px);height:70px;display:grid;grid-template-columns:repeat(5,1fr);background:linear-gradient(#27231d,#11100e);border-top:2px solid #8f6b35;box-shadow:0 -5px 20px #000b;padding:4px;gap:3px}
  #arcaneBottomNav.hidden{display:none!important}.v12-navbtn{border:1px solid #514532;background:linear-gradient(#211f1a,#11100e);color:#cbb58a;border-radius:7px;font:800 9px/1.05 'Courier New',monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-width:0}.v12-navbtn .ico{font-size:20px;line-height:20px;filter:saturate(.7)}.v12-navbtn.active{color:#f0d69a;border-color:#b98a43;background:linear-gradient(#4a3420,#1d1710);box-shadow:inset 0 0 0 1px #6d4b24}
  .arcane-subtabs{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:4px;padding:6px;margin:0 0 7px;background:#100f0f;border:1px solid #59472f;border-radius:8px;position:sticky;top:0;z-index:12}.arcane-subtabs button{min-height:38px;border:1px solid #4f4433;background:#1a1815;color:#c9b284;border-radius:6px;font:800 9px 'Courier New',monospace;padding:4px}.arcane-subtabs button.active{border-color:#b98a43;background:#3c2a1b;color:#f1d79b}
  #heroScene .equipment-grid.v12-equip{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,72px);gap:6px;max-width:300px;margin:0 auto}.v12-slot{position:relative;border:2px solid #4f4331;background:linear-gradient(145deg,#191714,#0d0c0b);border-radius:5px;display:flex;align-items:center;justify-content:center}.v12-slot .pixel-icon{width:42px!important;height:42px!important;background-size:contain!important}.v12-slot small{position:absolute;bottom:3px;left:0;right:0;text-align:center;font:700 7px 'Courier New';color:#a99165}.v12-slot .q{position:absolute;right:3px;top:3px;background:#0a0908;border:1px solid #735827;color:#e9d39a;font:700 7px 'Courier New';padding:1px 3px}.v12-slot.ring{grid-column:1;grid-row:1}.v12-slot.helmet{grid-column:2;grid-row:1}.v12-slot.bag{grid-column:3;grid-row:1}.v12-slot.bow{grid-column:1;grid-row:2}.v12-slot.armor{grid-column:2;grid-row:2}.v12-slot.shield{grid-column:3;grid-row:2}.v12-slot.neck{grid-column:1;grid-row:3}.v12-slot.legs{grid-column:2;grid-row:3}.v12-slot.ammo{grid-column:3;grid-row:3}.v12-slot.mana{grid-column:1;grid-row:4}.v12-slot.boots{grid-column:2;grid-row:4}.v12-slot.sword{grid-column:3;grid-row:4}
  body:not(.v12-in-hunt) .screen-head .btn.ghost{display:none!important}
  body:not(.v12-in-hunt)>section:not(#huntScene) .app{padding-bottom:78px!important}
  @media(max-width:700px){body>section:not(#huntScene) .app{padding-left:6px!important;padding-right:6px!important}.screen-head{margin-top:2px!important}.screen-head h2{font-size:25px!important}.panel{border-radius:7px!important}.trade-screen,.inventory-card,.hero-card,.trainer-main,.trainer-side{padding:8px!important}.trade-slot{min-width:0!important}.equipment-grid.tibia-layout{max-width:300px!important}.backpack{gap:5px!important}.arcane-subtabs{top:0}}
  `;
  const style=document.createElement('style');style.textContent=CSS;document.head.appendChild(style);
  const nav=document.createElement('nav');nav.id='arcaneBottomNav';nav.innerHTML=`
    <button class="v12-navbtn" data-nav="hunt"><span class="ico">⚔</span><span>HUNT</span></button>
    <button class="v12-navbtn" data-nav="city"><span class="ico">♜</span><span>CITY</span></button>
    <button class="v12-navbtn" data-nav="trainer"><span class="ico">◎</span><span>TRAINER</span></button>
    <button class="v12-navbtn" data-nav="hero"><span class="ico">♞</span><span>HERÓI</span></button>
    <button class="v12-navbtn" data-nav="settings"><span class="ico">⚙</span><span>CONFIG</span></button>`;
  document.body.appendChild(nav);
  nav.addEventListener('click',e=>{const b=e.target.closest('[data-nav]');if(!b)return;navTo(b.dataset.nav)});
  let spellContext='city';
  window.navTo=function(where){
    if(where==='hunt') openScene('huntSelectScene');
    else if(where==='city') openScene('shopScene');
    else if(where==='trainer') openScene('trainerScene');
    else if(where==='hero') openScene('heroScene');
    else if(where==='settings') openScene('settingsScene');
  };
  function setActiveNav(scene){
    let key='hunt';if(['shopScene','smithScene'].includes(scene)||(scene==='spellsScene'&&spellContext==='city'))key='city';else if(scene==='trainerScene')key='trainer';else if(scene==='heroScene'||(scene==='spellsScene'&&spellContext==='hero'))key='hero';else if(scene==='settingsScene')key='settings';
    nav.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===key));
  }
  function tabs(sceneId,defs,active){
    const scene=document.getElementById(sceneId),app=scene?.querySelector('.app');if(!app)return;let bar=app.querySelector(':scope > .arcane-subtabs');if(!bar){bar=document.createElement('div');bar.className='arcane-subtabs';const head=app.querySelector('.screen-head');head?head.insertAdjacentElement('afterend',bar):app.prepend(bar)}
    bar.innerHTML='';for(const d of defs){const b=document.createElement('button');b.textContent=d[0];b.classList.toggle('active',d[0]===active);b.onclick=d[1];bar.appendChild(b)}
  }
  function installTabs(scene){
    if(scene==='huntSelectScene')tabs(scene,[['HUNTS',()=>openScene('huntSelectScene')],['BOSSES',()=>openScene('bossSelectScene')],['QUESTS',()=>toastMsg('Quests em desenvolvimento')]],'HUNTS');
    if(scene==='bossSelectScene')tabs(scene,[['HUNTS',()=>openScene('huntSelectScene')],['BOSSES',()=>openScene('bossSelectScene')],['QUESTS',()=>toastMsg('Quests em desenvolvimento')]],'BOSSES');
    if(scene==='shopScene')tabs(scene,[['SHOP',()=>openScene('shopScene')],['ARCANE',()=>{spellContext='city';openScene('spellsScene')}],['SMITH & POTIONS',()=>openScene('smithScene')]],'SHOP');
    if(scene==='smithScene')tabs(scene,[['SHOP',()=>openScene('shopScene')],['ARCANE',()=>{spellContext='city';openScene('spellsScene')}],['SMITH & POTIONS',()=>openScene('smithScene')]],'SMITH & POTIONS');
    if(scene==='spellsScene'){
      const isHero=spellContext==='hero';tabs(scene,isHero?[["EQUIPMENT",()=>openScene('heroScene')],["BACKPACK",()=>{openScene('heroScene');setTimeout(()=>document.getElementById('heroBackpack')?.scrollIntoView({behavior:'smooth'}),80)}],["STATS",()=>{openScene('heroScene');setTimeout(()=>document.getElementById('heroStats')?.scrollIntoView({behavior:'smooth'}),80)}],["SPELLS",()=>{}]]:[["SHOP",()=>openScene('shopScene')],["ARCANE",()=>{}],["SMITH & POTIONS",()=>openScene('smithScene')]],isHero?'SPELLS':'ARCANE');
      const h=document.querySelector('#spellsScene .screen-head h2');if(h)h.textContent=isHero?'Herói • Spells':'Arcane';
    }
    if(scene==='trainerScene')tabs(scene,[['TRAINING',()=>document.querySelector('.trainer-main')?.scrollIntoView({behavior:'smooth'})],['IDLE TRAINING',()=>document.querySelector('.trainer-side')?.scrollIntoView({behavior:'smooth'})]],'TRAINING');
    if(scene==='heroScene')tabs(scene,[['EQUIPMENT',()=>document.getElementById('equipGrid')?.scrollIntoView({behavior:'smooth'})],['BACKPACK',()=>document.getElementById('heroBackpack')?.scrollIntoView({behavior:'smooth'})],['STATS',()=>document.getElementById('heroStats')?.scrollIntoView({behavior:'smooth'})],['SPELLS',()=>{spellContext='hero';openScene('spellsScene')}]],'EQUIPMENT');
    if(scene==='settingsScene')tabs(scene,[['GAME',()=>document.querySelector('#settingsScene .settings-grid')?.scrollIntoView({behavior:'smooth'})],['INTERFACE',()=>toastMsg('Interface medieval mobile ativa')],['CHEATS',()=>document.querySelector('#v12Cheats')?.scrollIntoView({behavior:'smooth'})],['SAVE',()=>document.querySelector('#resetBtn')?.scrollIntoView({behavior:'smooth'})]],'GAME');
  }
  openScene=function(id){
    if(id==='homeScene') id='huntSelectScene';
    prevOpenScene(id);
    const inHunt=id==='huntScene';document.body.classList.toggle('v12-in-hunt',inHunt);nav.classList.toggle('hidden',inHunt);setActiveNav(id);setTimeout(()=>{installTabs(id);if(id==='settingsScene')installCheats();if(id==='heroScene')renderHero();},0);
  };
  // launch directly into the new tabbed app shell
  setTimeout(()=>{ if(!hunt) openScene('huntSelectScene'); hydratePixelIcons(document); },80);
})();
