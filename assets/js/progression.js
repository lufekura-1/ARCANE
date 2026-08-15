/* ========================= ARCANE HUNT V9 OVERRIDES ========================= */
/* V9.1 PROGRESSION AUDIT: Hunt access = Troll 1, Orc 5, Minotaur 10, Hatchling 12, Spider 15, Cyclops 18, Giant Spider 20, Dragon 25. Bosses = White Orc 15, Moroheus 25, Balthazar 30, Bhaaz 35. */
const V9_BOSS_COOLDOWN=10*60*1000;
const V9_SPELLS={
  holy_bolt:{id:"holy_bolt",name:"Holy Bolt",icon:"holy",level:1,mana:18,cooldown:2200,price:0,desc:"Bolt sagrado de alvo único. Escala com Magic Level."},
  speed:{id:"speed",name:"Speed",icon:"speed",level:1,mana:25,cooldown:9000,price:0,desc:"Aumenta a taxa de ataque durante 6 segundos."},
  holy_heal:{id:"holy_heal",name:"Holy Heal",icon:"heal",level:8,mana:30,cooldown:4000,price:350,desc:"Converte Mana em Life. A cura escala com Magic Level."},
  mas_holy:{id:"mas_holy",name:"Mas Holy",icon:"mas_holy",level:20,mana:35,cooldown:5200,price:900,desc:"Explosão sagrada em área ao redor do Paladin."}
};
const V9_ITEM_LEVELS={
  // Tiers aligned to the hunt progression: 1 → 5 → 15 → 25 → 35.
  hunting_bow:1,oak_bow:5,composite_bow:15,royal_bow:25,holy_bow:35,
  leather_helmet:1,iron_helmet:5,steel_helmet:15,guardian_helmet:25,halo_helmet:35,
  leather_armor:1,chain_armor:5,knight_armor:15,royal_armor:25,sacred_armor:35,
  cloth_legs:1,leather_legs:5,chain_legs:15,royal_legs:25,sacred_legs:35,
  travel_boots:1,leather_boots:5,steel_boots:15,ranger_boots:25,blessed_boots:35,
  rope_necklace:1,bronze_amulet:5,sapphire_amulet:15,sun_amulet:25,divine_amulet:35,
  copper_ring:1,silver_ring:5,ruby_ring:15,royal_ring:25,seraph_ring:35,
  wood_arrow:1,iron_arrow:5,steel_arrow:15,explosion_arrow:20,
  soldier_sword:1,iron_sword:5,knight_sword:15,royal_sword:25,holy_blade:35,
  wooden_shield:1,iron_shield:5,guardian_shield:15,royal_shield:25,divine_shield:35
};
const V9_HUNT_LOOT={
  // A hunt never drops equipment above its own access tier.
  troll:["hunting_bow","soldier_sword","wooden_shield","leather_helmet","leather_armor","cloth_legs","travel_boots","rope_necklace","copper_ring"],
  orc:["oak_bow","iron_sword","iron_shield","iron_helmet","chain_armor","leather_legs","leather_boots","bronze_amulet","silver_ring"],
  minotaur:["oak_bow","iron_sword","iron_shield","iron_helmet","chain_armor","leather_legs","leather_boots","bronze_amulet","silver_ring"],
  dragon:["oak_bow","iron_sword","iron_shield","iron_helmet","chain_armor","leather_legs","leather_boots","bronze_amulet","silver_ring"],
  spider:["composite_bow","knight_sword","guardian_shield","steel_helmet","knight_armor","chain_legs","steel_boots","sapphire_amulet","ruby_ring"],
  cyclops:["composite_bow","knight_sword","guardian_shield","steel_helmet","knight_armor","chain_legs","steel_boots","sapphire_amulet","ruby_ring"],
  giant_spider:["composite_bow","knight_sword","guardian_shield","steel_helmet","knight_armor","chain_legs","steel_boots","sapphire_amulet","ruby_ring"],
  adult_dragon:["royal_bow","royal_sword","royal_shield","guardian_helmet","royal_armor","royal_legs","ranger_boots","sun_amulet","royal_ring"]
};

// New hunts
Object.assign(MONSTERS,{
  spider:{name:"Spider",icon:"🕷️",level:15,life:245,damage:[16,23],spawnMs:2200,moveMs:560,attackMs:900,xp:39,gold:[7,13],theme:["#10140d","#08070a"]},
  cyclops:{name:"Cyclops",icon:"👁️",level:18,life:430,damage:[25,37],spawnMs:3300,moveMs:950,attackMs:1250,xp:62,gold:[12,22],theme:["#16130d","#08070a"]},
  giant_spider:{name:"Giant Spider",icon:"🕷️",level:20,life:510,damage:[26,39],spawnMs:3100,moveMs:520,attackMs:880,xp:78,gold:[15,27],theme:["#140d17","#08070a"]},
  adult_dragon:{name:"Dragon",icon:"🐉",level:25,life:760,damage:[37,55],spawnMs:3900,moveMs:720,attackMs:980,xp:118,gold:[24,42],theme:["#1a0b0c","#08070a"]}
});
MONSTERS.troll.level=1;MONSTERS.orc.level=5;MONSTERS.minotaur.level=10;MONSTERS.dragon.level=12;
Object.assign(WORLD_NAMES,{spider:"Venom Garden",cyclops:"Cyclops Quarry",giant_spider:"Widow Hollow",adult_dragon:"Dragon Mountain",bhaaz:"Sanctum of Radiance",white_orc:"Albino War Camp"});

Object.assign(BOSSES,{
  bhaaz:{name:"Bhaaz the Shinny",title:"Espírito Dourado",level:35,life:1780,damage:[24,34],xp:480,gold:[165,225],world:"Sanctum of Radiance",desc:"Um espírito dourado envolto por glow. Desenha linhas de energia pelo campo antes de descarregá-las.",tags:["Golden Lines","Radiant Bolt","2 SQMs"]},
  white_orc:{name:"White Orc Leader",title:"Chefe Albino",level:15,life:1260,damage:[19,28],xp:280,gold:[90,135],world:"Albino War Camp",desc:"Um orc branco com um machado pesado. Começa a luta acompanhado por quatro Orc Warriors.",tags:["4 Orcs","Axe Cleave","2 SQMs"]}
});
BOSSES.moroheus.level=25;BOSSES.balthazar.level=30;

// New equipment remains fully embedded in this HTML.
Object.assign(ITEMS,{
  soldier_sword:{id:"soldier_sword",name:"Soldier Sword",icon:"⚔️",type:"sword",rarity:"common",price:75,sell:28,stats:{melee:12},desc:"Espada simples para combate adjacente."},
  iron_sword:{id:"iron_sword",name:"Iron Sword",icon:"⚔️",type:"sword",rarity:"common",price:145,sell:54,stats:{melee:19},desc:"Lâmina de ferro confiável."},
  knight_sword:{id:"knight_sword",name:"Knight Sword",icon:"⚔️",type:"sword",rarity:"rare",price:280,sell:105,stats:{melee:28},desc:"Espada balanceada de cavaleiro."},
  royal_sword:{id:"royal_sword",name:"Royal Sword",icon:"⚔️",type:"sword",rarity:"epic",price:520,sell:195,stats:{melee:39},desc:"Lâmina real de alto dano."},
  holy_blade:{id:"holy_blade",name:"Holy Blade",icon:"⚔️",type:"sword",rarity:"legendary",price:900,sell:338,stats:{melee:53,mana:10},desc:"Lâmina sagrada do Paladin."},
  wooden_shield:{id:"wooden_shield",name:"Wooden Shield",icon:"🛡️",type:"shield",rarity:"common",price:60,sell:22,stats:{shield:4},desc:"Escudo inicial de madeira."},
  iron_shield:{id:"iron_shield",name:"Iron Shield",icon:"🛡️",type:"shield",rarity:"common",price:130,sell:49,stats:{shield:7},desc:"Escudo reforçado de ferro."},
  guardian_shield:{id:"guardian_shield",name:"Guardian Shield",icon:"🛡️",type:"shield",rarity:"rare",price:265,sell:99,stats:{shield:11,life:12},desc:"Escudo de guarda com excelente bloqueio."},
  royal_shield:{id:"royal_shield",name:"Royal Shield",icon:"🛡️",type:"shield",rarity:"epic",price:495,sell:186,stats:{shield:16,life:20},desc:"Escudo pesado da guarda real."},
  divine_shield:{id:"divine_shield",name:"Divine Shield",icon:"🛡️",type:"shield",rarity:"legendary",price:860,sell:323,stats:{shield:22,life:32,mana:12},desc:"Escudo divino gravado em ouro."}
});
if(!SLOTS.includes("sword"))SLOTS.push("sword");if(!SLOTS.includes("shield"))SLOTS.push("shield");

function v9ItemLevel(it){return V9_ITEM_LEVELS[it?.id]||it?.level||1}
function v9CanUseItem(it){return profile.level>=v9ItemLevel(it)}
// Equipment above the player's level may remain visible from an older save, but contributes no stats until the requirement is met.
gearStat=function(stat){let total=0;for(const id of Object.values(profile.equipment)){const it=ITEMS[id];if(!it||!v9CanUseItem(it))continue;const base=it.stats?.[stat]||0;total+=base*(1+up(id)*.08)}return total};
function v9BossRemaining(kind){const t=profile.bossCooldowns?.[kind]||0;return Math.max(0,V9_BOSS_COOLDOWN-(Date.now()-t))}
function v9FmtCd(ms){const s=Math.ceil(ms/1000),m=Math.floor(s/60);return `${String(m).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`}
function v9SpellCd(id){if(!hunt)return 0;return Math.max(0,hunt.spellCds?.[id]||0)}
function v9SpellKnown(id){return profile.learnedSpells?.includes(id)}
function v9SwordPower(){const it=ITEMS[profile.equipment.sword],base=(it&&v9CanUseItem(it)?it.stats?.melee:8)||8,skill=profile.skills.sword?.level||10;return base*upgradeMult(it&&v9CanUseItem(it)?it.id:"")+profile.level*.75+skill*1.10}
function v9BowPower(){const bow=ITEMS[profile.equipment.weapon],bowAtk=(bow&&v9CanUseItem(bow)?bow.stats?.atk||0:0)*upgradeMult(bow&&v9CanUseItem(bow)?bow.id:"");let extras=0;for(const [slot,id] of Object.entries(profile.equipment)){if(["weapon","sword","shield"].includes(slot))continue;const it=ITEMS[id];if(it&&v9CanUseItem(it))extras+=(it?.stats?.atk||0)*upgradeMult(id)}return 9+profile.skills.distance.level*1.55+profile.level*.7+bowAtk+extras}
function v9ShieldPower(){const it=ITEMS[profile.equipment.shield];return it&&v9CanUseItem(it)?(it.stats?.shield||0)*upgradeMult(it.id):0}

function v9UpgradeProfile(){
  profile.learnedSpells=Array.isArray(profile.learnedSpells)?profile.learnedSpells:["holy_bolt","speed"];
  for(const id of ["holy_bolt","speed"])if(!profile.learnedSpells.includes(id))profile.learnedSpells.push(id);
  profile.equippedSpells=Array.isArray(profile.equippedSpells)?profile.equippedSpells.slice(0,3):["holy_bolt","speed",null];while(profile.equippedSpells.length<3)profile.equippedSpells.push(null);
  profile.bossCooldowns=profile.bossCooldowns||{};
  profile.skills=profile.skills||{};
  profile.skills.sword={level:10,tries:0,...(profile.skills.sword||{})};
  profile.equipment.sword=profile.equipment.sword||"soldier_sword";profile.equipment.shield=profile.equipment.shield||"wooden_shield";
  save();
}
v9UpgradeProfile();

// Compact classic MMORPG hero proportions; original sprite, not copied from another game.
const v8DrawPaladinPixel=drawPaladinPixel;
drawPaladinPixel=function(c,cx,cy,s=1,dir="down",frame=0,attack=false,mode="bow"){
  c.save();c.imageSmoothingEnabled=false;
  if(dir==="left"){c.translate(cx,cy);c.scale(-1,1);cx=0;cy=0;dir="right"}
  const ox=Math.round(cx-7*s),oy=Math.round(cy-8*s),step=frame%2;
  c.fillStyle="rgba(0,0,0,.36)";c.fillRect(ox+3*s,oy+14*s,9*s,2*s);
  // boots / compact legs
  pr(c,ox,oy,s,4,12+step,3,3-step,"#30213b");pr(c,ox,oy,s,8,12+(1-step),3,2+step,"#30213b");
  if(dir==="up"){
    pr(c,ox,oy,s,4,7,7,6,"#29538d");pr(c,ox,oy,s,5,8,5,2,PIX.gold);pr(c,ox,oy,s,5,4,5,4,"#496da1");pr(c,ox,oy,s,6,3,3,2,PIX.gold2);pr(c,ox,oy,s,3,8,2,5,PIX.red);
  }else{
    // larger readable head + small body evokes old-school top-down MMORPG proportions
    pr(c,ox,oy,s,4,7,7,6,"#28568f");pr(c,ox,oy,s,5,8,5,2,PIX.gold);pr(c,ox,oy,s,5,4,5,4,PIX.skin2);pr(c,ox,oy,s,5,3,5,2,"#d6c6a0");pr(c,ox,oy,s,4,4,1,3,"#7e5a36");pr(c,ox,oy,s,10,4,1,3,"#7e5a36");pset(c,ox,oy,s,6,6,PIX.ink);pset(c,ox,oy,s,9,6,PIX.ink);pr(c,ox,oy,s,3,8,2,5,PIX.red);
  }
  // left arm / shield in melee
  if(mode==="melee"){
    pr(c,ox,oy,s,2,7,3,5,"#4b6384");pr(c,ox,oy,s,1,8,3,4,PIX.blue2);pr(c,ox,oy,s,1,9,3,1,PIX.gold);
    // Sword is a single diagonal silhouette: pommel → grip → guard → blade → tip.
    if(attack){
      pset(c,ox,oy,s,10,11,PIX.gold);pset(c,ox,oy,s,11,10,PIX.wood);pr(c,ox,oy,s,10,9,4,1,PIX.gold);
      for(let i=0;i<5;i++){pset(c,ox,oy,s,12+i,8-i,PIX.steel);if(i<4)pset(c,ox,oy,s,13+i,8-i,"#f6f7f7")}
    }else{
      pset(c,ox,oy,s,10,12,PIX.gold);pset(c,ox,oy,s,11,11,PIX.wood);pr(c,ox,oy,s,10,10,4,1,PIX.gold);
      for(let i=0;i<4;i++){pset(c,ox,oy,s,12+i,9-i,PIX.steel);if(i<3)pset(c,ox,oy,s,13+i,9-i,"#eef1f2")}
    }
  }
  else{pr(c,ox,oy,s,11,7,2,2,PIX.skin);pr(c,ox,oy,s,12,5,1,7,PIX.gold);if(attack){pr(c,ox,oy,s,13,4,1,9,PIX.gold2);pr(c,ox,oy,s,14,7,2,1,PIX.bone)}else{pset(c,ox,oy,s,13,5,PIX.gold2);pset(c,ox,oy,s,13,11,PIX.gold2)}}
  c.restore()
};

const v8DrawMonsterPixel=drawMonsterPixel;
drawMonsterPixel=function(c,kind,cx,cy,s=1,dir="down",frame=0,attack=false,dead=false){
  if(!["spider","cyclops","giant_spider","adult_dragon","white_orc_minion"].includes(kind))return v8DrawMonsterPixel(c,kind,cx,cy,s,dir,frame,attack,dead);
  c.save();c.imageSmoothingEnabled=false;const ox=cx-8*s,oy=cy-8*s,b=frame%2;c.fillStyle="rgba(0,0,0,.38)";c.fillRect(ox+2*s,oy+14*s,12*s,2*s);
  if(dead){pr(c,ox,oy,s,3,11,10,3,kind.includes("spider")?"#37243d":kind==="cyclops"?"#8a7353":PIX.blue);pr(c,ox,oy,s,6,10,4,2,PIX.red);c.restore();return}
  if(kind==="spider"||kind==="giant_spider"){
    const body=kind==="giant_spider"?"#4a284f":"#4a3d31",hi=kind==="giant_spider"?PIX.purple2:"#7c674e";pr(c,ox,oy,s,5,6,6,6,body);pr(c,ox,oy,s,6,5,4,3,hi);pset(c,ox,oy,s,6,6,PIX.red2);pset(c,ox,oy,s,9,6,PIX.red2);for(const [y,dx] of [[6,0],[8,1],[10,0],[12,1]]){pr(c,ox,oy,s,1+dx, y,4,1,hi);pr(c,ox,oy,s,11-dx,y,4,1,hi)}if(attack){pr(c,ox,oy,s,7,3,2,2,"#d7e4be");pset(c,ox,oy,s,8,2,"#fff")}
  }else if(kind==="cyclops"){
    pr(c,ox,oy,s,4,5,8,8,"#8b7654");pr(c,ox,oy,s,5,3,6,4,"#a58b63");pr(c,ox,oy,s,7,5,2,2,PIX.red2);pr(c,ox,oy,s,2,7,3,6,"#806a4c");pr(c,ox,oy,s,11,7,3,6,"#806a4c");pr(c,ox,oy,s,5,12+b,2,3-b,PIX.brown);pr(c,ox,oy,s,9,12+(1-b),2,2+b,PIX.brown);pr(c,ox,oy,s,12,3,2,9,PIX.wood);pr(c,ox,oy,s,11,2,4,3,PIX.iron);if(attack)pr(c,ox,oy,s,10,1,5,3,PIX.steel)
  }else if(kind==="white_orc_minion"){
    pr(c,ox,oy,s,5,5,6,7,"#d9d6c9");pr(c,ox,oy,s,6,3,4,4,"#f0ead8");pset(c,ox,oy,s,6,5,PIX.red);pset(c,ox,oy,s,9,5,PIX.red);pr(c,ox,oy,s,4,7,8,3,"#5c334d");pr(c,ox,oy,s,12,5,1,7,PIX.wood);pr(c,ox,oy,s,12,4,3,2,PIX.steel)
  }else{
    // adult dragon
    pr(c,ox,oy,s,4,7,8,6,"#244b7c");pr(c,ox,oy,s,8,3,6,6,"#346fa8");pr(c,ox,oy,s,2,5,4,6,"#762d47");pr(c,ox,oy,s,3,4,2,2,PIX.purple2);pset(c,ox,oy,s,11,5,PIX.yellow);pr(c,ox,oy,s,5,10,3,3,PIX.gold);pr(c,ox,oy,s,2,10,4,2,"#244b7c");if(attack){pr(c,ox,oy,s,13,5,3,2,PIX.orange);pset(c,ox,oy,s,15,4,PIX.yellow);pset(c,ox,oy,s,15,7,PIX.red2)}
  }c.restore()
};

const v8DrawBossPixel=drawBossPixel;
drawBossPixel=function(c,kind,cx,cy,s=1,frame=0,attack=false,dead=false){
  if(!["bhaaz","white_orc"].includes(kind))return v8DrawBossPixel(c,kind,cx,cy,s,frame,attack,dead);
  c.save();c.imageSmoothingEnabled=false;const ox=cx-16*s,oy=cy-10*s,b=frame%2;c.fillStyle="rgba(0,0,0,.42)";c.fillRect(ox+5*s,oy+18*s,22*s,3*s);
  if(dead){c.globalAlpha=.72;pr(c,ox,oy,s,5,15,22,5,kind==="bhaaz"?PIX.gold2:"#e5e0d1");c.restore();return}
  if(kind==="bhaaz"){
    c.save();c.globalAlpha=.18;pr(c,ox,oy,s,6,2,20,18,"#ffe56d");c.restore();pr(c,ox,oy,s,11,6,10,12,"#d39b32");pr(c,ox,oy,s,12,3,8,6,"#f2d66f");pr(c,ox,oy,s,8,8,5,8,"#e9b845");pr(c,ox,oy,s,20,8,5,8,"#e9b845");pset(c,ox,oy,s,14,7,"#fff");pset(c,ox,oy,s,18,7,"#fff");if(attack){pr(c,ox,oy,s,24,7,6,2,"#fff2a6");pr(c,ox,oy,s,25,8,5,2,PIX.gold2)}
  }else{
    pr(c,ox,oy,s,10,6,12,12,"#e3dfd2");pr(c,ox,oy,s,12,3,8,6,"#f1ede1");pset(c,ox,oy,s,14,7,PIX.red);pset(c,ox,oy,s,18,7,PIX.red);pr(c,ox,oy,s,8,9,5,8,"#4b2838");pr(c,ox,oy,s,20,9,5,8,"#4b2838");pr(c,ox,oy,s,24,3,2,15,PIX.wood);pr(c,ox,oy,s,22,2,7,5,PIX.steel);if(attack){pr(c,ox,oy,s,20,1,9,4,"#e6e9ea");pr(c,ox,oy,s,25,4,2,10,PIX.wood)}
  }c.restore()
};

const v8DrawIcon16=drawIcon16;
drawIcon16=function(c,type){
  if(!["sword","spellbook","heal"].includes(type))return v8DrawIcon16(c,type);
  c.clearRect(0,0,16,16);c.imageSmoothingEnabled=false;pr(c,0,0,1,1,1,14,14,PIX.ink);pr(c,0,0,1,1,1,14,1,PIX.gold);pr(c,0,0,1,1,14,14,1,PIX.gold);pr(c,0,0,1,1,1,1,14,PIX.gold);pr(c,0,0,1,14,1,1,14,PIX.gold);
  if(type==="sword"){
    // One diagonal axis from pommel (bottom-left) to blade tip (top-right).
    pset(c,0,0,1,3,13,PIX.gold);pset(c,0,0,1,4,12,PIX.wood);pset(c,0,0,1,5,11,PIX.wood);
    pr(c,0,0,1,4,10,5,1,PIX.gold);
    for(let i=0;i<6;i++){pset(c,0,0,1,6+i,10-i,PIX.steel);if(i<5)pset(c,0,0,1,7+i,10-i,"#f2f4f4")}
    pset(c,0,0,1,12,4,"#ffffff");
  }
  else if(type==="spellbook"){pr(c,0,0,1,3,4,10,9,PIX.purple);pr(c,0,0,1,4,5,4,7,"#2e1a39");pr(c,0,0,1,8,5,4,7,"#41264d");pr(c,0,0,1,7,4,2,9,PIX.gold);pset(c,0,0,1,10,8,PIX.gold2)}
  else{pr(c,0,0,1,3,6,10,4,"#a9243b");pr(c,0,0,1,6,3,4,10,"#d8485b");pr(c,0,0,1,7,4,2,8,"#fff2c5");pr(c,0,0,1,4,7,8,2,"#fff2c5")}
};
iconKeyForItem=function(it){if(!it)return"chest";if(it.id==="health_potion"||it.id==="mana_potion"||ARROW_ORDER.includes(it.id))return it.id;return({weapon:"bow",sword:"sword",shield:"shield",helmet:"helmet",armor:"armor",legs:"legs",boots:"boots",necklace:"necklace",ring:"ring"})[it.type]||"chest"};
Object.keys(ICON_CACHE).forEach(k=>delete ICON_CACHE[k]);Object.keys(MONSTER_ICON_CACHE).forEach(k=>delete MONSTER_ICON_CACHE[k]);Object.keys(BOSS_ICON_CACHE).forEach(k=>delete BOSS_ICON_CACHE[k]);hydratePixelIcons(document);

baseAttack=function(){return v9BowPower()};
armor=function(){return Math.round(gearStat("armor")+profile.skills.shielding.level*.32+v9ShieldPower())};
itemStats=function(it,id=it.id){const ss=it.stats||{},m=upgradeMult(id),parts=[];for(const [k,v] of Object.entries(ss)){const label={atk:"ATK",melee:"MELEE",shield:"DEF",life:"Life",mana:"Mana",armor:"Armor",attackSpeed:"AS"}[k]||k;const val=k==="attackSpeed"?(v*m).toFixed(2):Math.round(v*m);parts.push(`${label} +${val}`)}return parts.join(" • ")||it.desc||""};

// Spellbook
function openSpellsScene(){openScene("spellsScene");renderSpells()}
function renderSpells(){
  equippedSpellSlots.innerHTML="";for(let i=0;i<3;i++){const id=profile.equippedSpells[i],sp=V9_SPELLS[id];const b=document.createElement("button");b.className=`equipped-spell ${sp?"":"empty"}`;b.innerHTML=sp?`<span class="spell-pixel pixel-icon" data-pixel-icon="${sp.icon}"></span><div><b>SLOT ${i+1} • ${sp.name}</b><small>${sp.mana} Mana • CD ${(sp.cooldown/1000).toFixed(1)}s</small></div><span>REMOVER</span>`:`<span class="spell-pixel pixel-icon" data-pixel-icon="spellbook"></span><div><b>SLOT ${i+1}</b><small>Vazio</small></div><span>+</span>`;b.onclick=()=>{if(sp){profile.equippedSpells[i]=null;save();renderSpells()}};equippedSpellSlots.appendChild(b)}
  spellGrid.innerHTML="";for(const sp of Object.values(V9_SPELLS)){const known=v9SpellKnown(sp.id),locked=profile.level<sp.level,d=document.createElement("div");d.className=`spell-card ${known?"learned":""} ${locked?"locked":""}`;const slotBtns=known?[0,1,2].map(i=>`<button class="btn ghost" onclick="equipSpell('${sp.id}',${i})">Slot ${i+1}</button>`).join(""):"";d.innerHTML=`<span class="spell-pixel pixel-icon" data-pixel-icon="${sp.icon}"></span><h3>${sp.name}</h3><p>${sp.desc}</p><div class="spell-meta"><span>LV.${sp.level}</span><span>${sp.mana} MANA</span><span>${(sp.cooldown/1000).toFixed(1)}s CD</span></div><div class="spell-actions">${known?slotBtns:`<button class="btn primary" ${locked||profile.gold<sp.price?"disabled":""} onclick="learnSpell('${sp.id}')">${locked?`Requer LV.${sp.level}`:`Aprender • ${sp.price} Gold`}</button>`}</div>`;spellGrid.appendChild(d)}hydratePixelIcons(document)
}
function learnSpell(id){const sp=V9_SPELLS[id];if(!sp||v9SpellKnown(id)||profile.level<sp.level||profile.gold<sp.price)return;profile.gold-=sp.price;profile.learnedSpells.push(id);save();renderSpells();toastMsg(`${sp.name} aprendida`)}
function equipSpell(id,slot){if(!v9SpellKnown(id)||!V9_SPELLS[id]||profile.level<V9_SPELLS[id].level)return;const old=profile.equippedSpells.indexOf(id);if(old>=0)profile.equippedSpells[old]=null;profile.equippedSpells[slot]=id;save();renderSpells();toastMsg(`${V9_SPELLS[id].name} equipada no Slot ${slot+1}`)}

// Level-gated hunts and items
renderHuntSelect=function(){huntGrid.innerHTML="";for(const [k,m] of Object.entries(MONSTERS)){const locked=profile.level<(m.level||1),d=document.createElement("button");d.className=`hunt-card ${locked?"locked-card":""}`;d.innerHTML=`<span class="monster-pixel" style="background-image:url('${monsterIconData(k)}')"></span><h3>${m.name}</h3><p>Combate em SQMs • <span class="level-lock">Requer Level ${m.level||1}</span></p><div class="mini"><span>Life ${m.life}</span><span>XP ${m.xp}</span><span>Spawn ${(m.spawnMs/1000).toFixed(1)}s</span></div>`;d.onclick=()=>locked?toastMsg(`Requer Level ${m.level||1}`):startHunt(k);huntGrid.appendChild(d)}};
const v8StartHunt=startHunt;startHunt=function(kind){const m=MONSTERS[kind];if(!m)return;if(profile.level<(m.level||1))return toastMsg(`Requer Level ${m.level||1}`);v8StartHunt(kind);hunt.spellCds={holy_bolt:0,speed:0,holy_heal:0,mas_holy:0};hunt.hero.combatMode="bow"};

const v8RenderShop=renderShop;
renderShop=function(){v8RenderShop();document.querySelectorAll("#shopGrid .trade-slot").forEach((el,i)=>{const stock=Object.values(ITEMS).filter(x=>x.type===shopTab),it=stock[i];if(!it)return;const lv=v9ItemLevel(it);if(profile.level<lv){el.classList.add("locked");el.dataset.level=lv}});const it=ITEMS[selectedShopItem];if(it&&shopDetail){const lock=profile.level<v9ItemLevel(it);shopDetail.querySelector("p")?.insertAdjacentHTML("beforeend",`<br><span class="level-lock">Requer Level ${v9ItemLevel(it)}</span>`);const b=shopDetail.querySelector("button");if(b&&lock)b.disabled=true}}
const v8BuyItem=buyItem;buyItem=function(id){const it=ITEMS[id];if(it&&profile.level<v9ItemLevel(it))return toastMsg(`Requer Level ${v9ItemLevel(it)}`);v8BuyItem(id)};
const v8EquipBp=equipBp;equipBp=function(i){const e=profile.backpack[i],it=e?ITEMS[e.itemId]:null;if(it&&profile.level<v9ItemLevel(it))return toastMsg(`Requer Level ${v9ItemLevel(it)}`);v8EquipBp(i)};
const v8RenderHeroDetail=renderHeroDetail;renderHeroDetail=function(){v8RenderHeroDetail();const e=selectedBp!=null?profile.backpack[selectedBp]:null,it=e?ITEMS[e.itemId]:null;if(it&&SLOTS.includes(it.type))heroDetail.querySelector("p")?.insertAdjacentHTML("beforeend",`<br><span class="level-lock">Requer Level ${v9ItemLevel(it)}</span>`)};

// Boss cooldowns + two new encounters
let v9BossTimer=0;
renderBossSelect=function(){clearInterval(v9BossTimer);bossGrid.innerHTML="";for(const [k,b] of Object.entries(BOSSES).sort((a,b)=>(a[1].level||1)-(b[1].level||1))){const rem=v9BossRemaining(k),levelLocked=profile.level<(b.level||1),cd=rem>0,d=document.createElement("button");d.className=`boss-card ${k==="balthazar"?"necro":""} ${levelLocked?"locked-card":""} ${cd?"cooldown":""}`;d.innerHTML=`<span class="boss-pixel" data-boss-icon="${k}"></span><div><h3>${b.name}</h3><p><b>${b.title}</b><br>${b.desc}</p><div class="boss-tags"><span>LV.${b.level||1}</span>${b.tags.map(x=>`<span>${x}</span>`).join("")}${cd?`<span class="boss-cd">Cooldown ${v9FmtCd(rem)}</span>`:""}</div></div>`;d.onclick=()=>{if(levelLocked)return toastMsg(`Requer Level ${b.level||1}`);if(cd)return toastMsg(`Boss disponível em ${v9FmtCd(v9BossRemaining(k))}`);startBoss(k)};bossGrid.appendChild(d)}hydratePixelIcons(bossGrid);v9BossTimer=setInterval(()=>{if(lastScene==="bossSelectScene")renderBossSelect();else clearInterval(v9BossTimer)},1000)};
startBoss=function(kind){
  const b=BOSSES[kind];if(!b)return;if(profile.level<(b.level||1))return toastMsg(`Requer Level ${b.level||1}`);const rem=v9BossRemaining(kind);if(rem>0)return toastMsg(`Boss disponível em ${v9FmtCd(rem)}`);
  closeAllModals();if(profile.life<=0)profile.life=maxLife();if(profile.mana<0)profile.mana=0;save();const now=performance.now();
  const boss={id:1,r:1,c:1,w:2,h:1,life:b.life,maxLife:b.life,alive:true,isBoss:true,stationary:true,spriteKind:kind,damage:b.damage,attackCd:850,specialCd:2500,hitFlash:0,deathAt:0,dir:"down",attackUntil:0};
  const mons=[boss];let id=2;
  if(kind==="balthazar")for(const pos of [[3,0],[3,4]])mons.push({id:id++,r:pos[0],c:pos[1],w:1,h:1,life:190,maxLife:190,alive:true,isSummon:true,spriteKind:"skeleton",damage:[8,12],moveCd:500+id*70,attackCd:700,hitFlash:0,deathAt:0,dir:"down",attackUntil:0});
  if(kind==="white_orc")for(const pos of [[3,0],[3,4],[5,0],[5,4]])mons.push({id:id++,r:pos[0],c:pos[1],w:1,h:1,life:175,maxLife:175,alive:true,isSummon:true,spriteKind:"white_orc_minion",summonName:"Orc Warrior",damage:[9,14],moveCd:420+id*55,attackCd:700,hitFlash:0,deathAt:0,dir:"down",attackUntil:0});
  hunt={mode:"boss",kind,bossKind:kind,m:{name:b.name,life:b.life,damage:b.damage,xp:b.xp,gold:b.gold,spawnMs:999999,moveMs:999999,attackMs:1600},start:now,lastTick:now,elapsed:0,nextSpawn:999999,monsters:mons,projectiles:[],floats:[],effects:[],shake:0,id:id,running:true,paused:false,pauseStarted:0,totalPaused:0,hero:{r:6,c:2,moveCd:0,dir:"up",attackUntil:0,castUntil:0,combatMode:"bow"},decor:buildDecor(kind),attackCd:120,holyCd:0,masHolyCd:0,speedCd:0,speedUntil:0,potionCd:0,kills:0,xp:0,gold:0,drops:0,lastNoAmmo:0,difficultyLevel:1,lastDifficultyLevel:1,spellCds:{holy_bolt:0,speed:0,holy_heal:0,mas_holy:0}};
  document.querySelectorAll("body>section").forEach(x=>x.classList.add("hidden"));huntScene.classList.remove("hidden");lastScene="huntScene";pauseCover.classList.add("hidden");pauseIcon.dataset.pixelIcon="pause";pauseIcon.style.backgroundImage=`url(${pixelIconData("pause")})`;pauseLabel.textContent="PLAY / PAUSE";canvas=document.getElementById("gameCanvas");ctx=canvas.getContext("2d");resizeCanvas();window.addEventListener("resize",resizeCanvas);canvas.onclick=handleCanvasMove;ensureSelectedArrow();renderHuntHud();requestAnimationFrame(huntLoop)
};
completeBoss=function(mon){if(!hunt?.running)return;const b=BOSSES[hunt.bossKind],xp=b.xp,gold=rand(b.gold[0],b.gold[1]);hunt.xp+=xp;hunt.gold+=gold;profile.gold+=gold;profile.stats.totalGold+=gold;profile.stats.kills++;addXp(xp);profile.bossCooldowns[hunt.bossKind]=Date.now();save();hunt.running=false;window.removeEventListener("resize",resizeCanvas);bossVictoryText.textContent=`${b.name} foi derrotado. Recompensa: ${xp} XP e ${gold} Gold. Novo acesso em 10 minutos.`;setTimeout(()=>bossVictoryModal.classList.remove("hidden"),120)};

// Reworked combat: bow at range; sword + shield when adjacent.
autoAttack=function(now){const target=nearestMonster();if(!target)return;faceHero(target);const melee=distSqm(target,hunt.hero)<=1;hunt.hero.combatMode=melee?"melee":"bow";hunt.hero.attackUntil=now+(melee?260:190);
  if(melee){const dmg=Math.round(v9SwordPower()*(.88+Math.random()*.24));addSkillTry("sword",.15);hunt.effects.push({type:"meleeSlash",r:target.r,c:target.c,w:target.w||1,start:now,duration:260});damageMonster(target,dmg,false);save();return}
  const arrow=ensureSelectedArrow();if(!arrow){if(now-hunt.lastNoAmmo>2500){toastMsg("Sem arrows");hunt.lastNoAmmo=now}return}consumeItem(arrow,1);addSkillTry("distance",.15);save();const data=ARROW_DATA[arrow],dmg=Math.round(v9BowPower()*data.mult*(.88+Math.random()*.24));shootProjectile(hunt.hero,target,arrow,arrow==="explosion_arrow"?250:220,()=>{if(!target.alive)return;damageMonster(target,dmg,false);if(data.aoe){for(const other of hunt.monsters.filter(m=>m.alive&&m.id!==target.id&&distSqm(m,target)<=1))damageMonster(other,Math.round(dmg*.68),false);hunt.effects.push({type:"blast",r:target.r,c:target.c,start:performance.now(),duration:430})}});if(countItem(arrow)<=0){const next=ARROW_ORDER.find(id=>countItem(id)>0);if(next){profile.selectedArrow=next;toastMsg(`${ARROW_DATA[arrow].name} acabou • ${ARROW_DATA[next].name} equipado`);save()}}};

// Spell casting and cooldowns
function v9SetSpellCd(id,ms){hunt.spellCds=hunt.spellCds||{};hunt.spellCds[id]=ms}
castHolyBolt=function(){const sp=V9_SPELLS.holy_bolt;if(!hunt?.running||hunt.paused||v9SpellCd(sp.id)>0||profile.mana<sp.mana)return;const target=nearestMonster();if(!target)return;faceHero(target);hunt.hero.castUntil=performance.now()+260;profile.mana-=sp.mana;v9SetSpellCd(sp.id,sp.cooldown);addSkillTry("magic",.45);const dmg=Math.round((magicPower()*2.15+v9BowPower()*.42)*(.92+Math.random()*.18));shootProjectile(hunt.hero,target,"holy",250,()=>{if(target.alive)damageMonster(target,dmg,true)});save()};
castMasHoly=function(){const sp=V9_SPELLS.mas_holy;if(profile.level<sp.level||!hunt?.running||hunt.paused||v9SpellCd(sp.id)>0||profile.mana<sp.mana)return;hunt.hero.castUntil=performance.now()+320;profile.mana-=sp.mana;v9SetSpellCd(sp.id,sp.cooldown);addSkillTry("magic",.65);const dmg=Math.round(magicPower()*1.75+profile.level*1.2);hunt.effects.push({type:"masHoly",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:620});for(const m of hunt.monsters.filter(m=>m.alive&&distSqm(m,hunt.hero)<=2))damageMonster(m,Math.round(dmg*(.9+Math.random()*.2)),true);save()};
castSpeed=function(){const sp=V9_SPELLS.speed;if(!hunt?.running||hunt.paused||v9SpellCd(sp.id)>0||profile.mana<sp.mana)return;hunt.hero.castUntil=performance.now()+280;profile.mana-=sp.mana;v9SetSpellCd(sp.id,sp.cooldown);hunt.speedUntil=performance.now()+6000;hunt.effects.push({type:"speedBurst",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:650});addSkillTry("magic",.35);save()};
function castHolyHeal(){const sp=V9_SPELLS.holy_heal;if(profile.level<sp.level||!hunt?.running||hunt.paused||v9SpellCd(sp.id)>0||profile.mana<sp.mana||profile.life>=maxLife())return;hunt.hero.castUntil=performance.now()+330;profile.mana-=sp.mana;v9SetSpellCd(sp.id,sp.cooldown);const heal=Math.round(70+magicPower()*2.2+Math.random()*30);profile.life=Math.min(maxLife(),profile.life+heal);addSkillTry("magic",.45);hunt.effects.push({type:"holyHeal",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:720});floatText(hunt.hero.r,hunt.hero.c,`+${heal}`,"heal");save()}
function castEquippedSpell(slot){const id=profile.equippedSpells?.[slot],sp=V9_SPELLS[id];if(!sp)return;if(!v9SpellKnown(id)||profile.level<sp.level)return toastMsg(`Requer Level ${sp.level}`);({holy_bolt:castHolyBolt,speed:castSpeed,holy_heal:castHolyHeal,mas_holy:castMasHoly}[id])?.()}

// Update cooldowns without depending on fixed button positions.
const v8UpdateHunt=updateHunt;
updateHunt=function(dt,now){if(hunt?.spellCds)for(const k of Object.keys(hunt.spellCds))hunt.spellCds[k]=Math.max(0,hunt.spellCds[k]-dt);v8UpdateHunt(dt,now)};

// Boss mechanics
bossBasicCast=function(boss,now){const target={r:hunt.hero.r,c:hunt.hero.c,w:1,h:1};if(hunt.bossKind==="moroheus"){shootProjectile(boss,target,"boss_fireball",520,()=>{if(hunt.hero.r===target.r&&hunt.hero.c===target.c)hurtHero(rand(25,36));hunt.effects.push({type:"fireImpact",r:target.r,c:target.c,start:performance.now(),duration:480})})}else if(hunt.bossKind==="balthazar"){shootProjectile(boss,target,"necro_bolt",600,()=>{if(distSqm(hunt.hero,target)<=0)hurtHero(rand(20,29));hunt.effects.push({type:"necroImpact",r:target.r,c:target.c,start:performance.now(),duration:420})})}else if(hunt.bossKind==="bhaaz"){shootProjectile(boss,target,"gold_bolt",520,()=>{if(distSqm(hunt.hero,target)<=0)hurtHero(rand(22,32));hunt.effects.push({type:"goldImpact",r:target.r,c:target.c,start:performance.now(),duration:420})})}else{const cells=bossTargetCells({r:hunt.hero.r,c:hunt.hero.c},1);hunt.effects.push({type:"axeCleave",r:hunt.hero.r,c:hunt.hero.c,cells,start:now,duration:920,delay:480,damage:rand(28,39)})}};
bossSpecialCast=function(boss,now){const center={r:hunt.hero.r,c:hunt.hero.c};if(hunt.bossKind==="moroheus"){const cells=bossTargetCells(center,1);hunt.effects.push({type:"infernoAoE",r:center.r,c:center.c,cells,start:now,duration:1500,delay:900,damage:rand(32,44)})}else if(hunt.bossKind==="balthazar"){const cells=bossTargetCells(center,1);hunt.effects.push({type:"necroAoE",r:center.r,c:center.c,cells,start:now,duration:1550,delay:850,damage:rand(27,39)})}else if(hunt.bossKind==="bhaaz"){const cells=[];for(let c=0;c<COLS;c++)cells.push({r:hunt.hero.r,c});for(let r=0;r<ROWS;r++)if(r!==hunt.hero.r)cells.push({r,c:hunt.hero.c});hunt.effects.push({type:"goldLines",r:center.r,c:center.c,cells,start:now,duration:1450,delay:720,damage:rand(34,46)})}else{const cells=bossTargetCells(center,2);hunt.effects.push({type:"axeCleave",r:center.r,c:center.c,cells,start:now,duration:1250,delay:620,damage:rand(32,45)})}};
const v8UpdateBossBattle=updateBossBattle;
updateBossBattle=function(dt,now){v8UpdateBossBattle(dt,now)};

// Hunt-specific loot tables
dropRoll=function(mon){
  const r=Math.random(),sourceLv=MONSTERS[hunt.kind]?.level||BOSSES[hunt.kind]?.level||1;
  if(r<.022){addToBp("health_potion",1);hunt.drops++;toastMsg("Health Potion")}
  else if(r<.044){addToBp("mana_potion",1);hunt.drops++;toastMsg("Mana Potion")}
  else if(r<.105){addToBp("wood_arrow",rand(4,10));hunt.drops++}
  else if(r<.155&&sourceLv>=5){addToBp("iron_arrow",rand(2,5));hunt.drops++}
  else if(r<.188&&sourceLv>=15){addToBp("steel_arrow",rand(1,3));hunt.drops++}
  else if(r<.202&&sourceLv>=20){addToBp("explosion_arrow",1);hunt.drops++}
  else if(r<.235){const pool=(V9_HUNT_LOOT[hunt.kind]||V9_HUNT_LOOT.troll).filter(id=>ITEMS[id]&&v9ItemLevel(ITEMS[id])<=sourceLv);if(pool.length){const id=pool[Math.floor(Math.random()*pool.length)],it=ITEMS[id];if(addToBp(id,1)){hunt.drops++;toastMsg(`${it.name} dropou`)}}}
};

// World visuals for the new hunts/bosses.
const v8BuildDecor=buildDecor;buildDecor=function(kind){const extra={spider:[{r:1,c:0,t:"rock"},{r:2,c:4,t:"bones"},{r:4,c:0,t:"blood"},{r:5,c:4,t:"portal"}],cyclops:[{r:1,c:0,t:"rock"},{r:2,c:4,t:"rock"},{r:4,c:0,t:"chest"},{r:5,c:4,t:"torch"}],giant_spider:[{r:1,c:0,t:"bones"},{r:2,c:4,t:"portal"},{r:4,c:0,t:"blood"},{r:5,c:4,t:"rock"}],adult_dragon:[{r:1,c:0,t:"lava"},{r:1,c:4,t:"bones"},{r:3,c:0,t:"rock"},{r:4,c:4,t:"portal"},{r:5,c:0,t:"blood"}],bhaaz:[{r:0,c:0,t:"shrine"},{r:0,c:4,t:"shrine"},{r:3,c:0,t:"torch"},{r:3,c:4,t:"torch"}],white_orc:[{r:0,c:0,t:"banner"},{r:0,c:4,t:"banner"},{r:3,c:2,t:"blood"},{r:5,c:0,t:"fence"},{r:5,c:4,t:"fence"}]};return extra[kind]||v8BuildDecor(kind)};

const v8DrawBackground=drawBackground;drawBackground=function(now){if(["spider","cyclops","giant_spider","adult_dragon","bhaaz","white_orc"].includes(hunt.kind)){const palettes={spider:["#10150e","#07080a"],cyclops:["#18130d","#08070a"],giant_spider:["#160d18","#070609"],adult_dragon:["#1b0b0c","#080609"],bhaaz:["#211a0d","#090708"],white_orc:["#17141a","#08070a"]};const [a,b]=palettes[hunt.kind],g=ctx.createLinearGradient(0,0,0,canvasH);g.addColorStop(0,a);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillRect(0,0,canvasW,canvasH);return}v8DrawBackground(now)};

// Draw hero with mode and additional V9 effects.
drawPaladin=function(now){const p=cellCenter(hunt.hero.r,hunt.hero.c),g=gridGeom(),s=Math.max(2,Math.min(g.cw,g.ch)/20),frame=Math.floor(now/260)%2,mode=hunt.hero.combatMode||"bow";if(now<hunt.speedUntil){ctx.save();ctx.globalAlpha=.20;drawPaladinPixel(ctx,p.x-7,p.y+3,s,hunt.hero.dir,frame,false,mode);ctx.globalAlpha=.12;drawPaladinPixel(ctx,p.x-13,p.y+3,s,hunt.hero.dir,frame,false,mode);ctx.restore()}drawPaladinPixel(ctx,p.x,p.y+3,s,hunt.hero.dir,frame,hunt.hero.attackUntil>now,mode);if(hunt.hero.castUntil>now){ctx.save();ctx.fillStyle="#f0cf72";ctx.globalAlpha=.8;for(const [dx,dy] of [[-12,-10],[12,-8],[-8,9],[10,10]])ctx.fillRect(Math.floor(p.x+dx),Math.floor(p.y+dy),2,2);ctx.restore()}const barW=Math.min(g.cw*.68,72),barH=5,barY=p.y-8*s-16;ctx.save();ctx.fillStyle="#070509";ctx.fillRect(Math.round(p.x-barW/2),Math.round(barY),Math.round(barW),barH);ctx.fillStyle="#b5243b";ctx.fillRect(Math.round(p.x-barW/2+1),Math.round(barY+1),Math.round((barW-2)*Math.max(0,profile.life/maxLife())),barH-2);ctx.strokeStyle="#d2a64a";ctx.strokeRect(Math.round(p.x-barW/2)+.5,Math.round(barY)+.5,Math.round(barW)-1,barH-1);ctx.restore();ctx.font=`700 ${Math.max(7,Math.floor(s*2.4))}px "Courier New"`;ctx.textAlign="center";ctx.fillStyle="#f0cf72";ctx.shadowColor="#000";ctx.shadowBlur=3;ctx.fillText(mode==="melee"?"Paladin ⚔":"Paladin",p.x,barY-4);ctx.shadowBlur=0};

const v8DrawProjectiles=drawProjectiles;drawProjectiles=function(now){v8DrawProjectiles(now);for(const p of hunt.projectiles){if(!["gold_bolt"].includes(p.type))continue;const t=Math.min(1,p.t),x=p.from.x+(p.to.x-p.from.x)*t,y=p.from.y+(p.to.y-p.from.y)*t,ang=Math.atan2(p.to.y-p.from.y,p.to.x-p.from.x);ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(ang);ctx.globalAlpha=.25;ctx.fillStyle="#ffe36b";ctx.fillRect(-22,-5,26,10);ctx.globalAlpha=1;ctx.fillStyle="#f3c64d";ctx.fillRect(-13,-3,19,6);ctx.fillStyle="#fff8c6";ctx.fillRect(3,-2,8,4);ctx.restore()}};
const v8DrawEffects=drawEffects;drawEffects=function(now){v8DrawEffects(now);const g=gridGeom();for(const e of hunt.effects){const age=now-e.start;if(age>e.duration)continue;const p=cellCenter(e.r,e.c),t=age/e.duration;ctx.save();ctx.imageSmoothingEnabled=false;if(e.type==="holyHeal"){ctx.globalAlpha=1-t;const r=10+t*28;ctx.strokeStyle="#f4d36b";ctx.lineWidth=3;ctx.strokeRect(p.x-r,p.y-r,r*2,r*2);ctx.fillStyle="#fff2b0";ctx.fillRect(p.x-3,p.y-r*.7,6,r*1.4);ctx.fillRect(p.x-r*.7,p.y-3,r*1.4,6);for(let i=0;i<10;i++){const a=i*.63+t*2;ctx.fillStyle=i%2?"#b66dd5":"#f1c95b";ctx.fillRect(p.x+Math.cos(a)*r*.85,p.y+Math.sin(a)*r*.85,3,3)}}else if(e.type==="meleeSlash"){const q=e.w?entityCenter({r:e.r,c:e.c,w:e.w,h:1}):p;ctx.globalAlpha=1-t;ctx.strokeStyle="#f6e0aa";ctx.lineWidth=5*(1-t)+1;ctx.beginPath();ctx.arc(q.x,q.y,10+t*24,-1.2,.7);ctx.stroke();ctx.strokeStyle="#8ec1ff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,14+t*26,-1.0,.9);ctx.stroke()}else if(["goldLines","axeCleave"].includes(e.type)){const pre=age<(e.delay||0),alpha=pre?.35:Math.max(0,1-(age-(e.delay||0))/(e.duration-(e.delay||0)));for(const cell of e.cells||[]){const q=cellCenter(cell.r,cell.c),rad=Math.min(g.cw,g.ch)*.42;ctx.globalAlpha=alpha;ctx.fillStyle=e.type==="goldLines"?(pre?"#806a27":"#d4a52d"):(pre?"#6a2731":"#a52b39");ctx.fillRect(q.x-rad,q.y-rad,rad*2,rad*2);ctx.strokeStyle=e.type==="goldLines"?"#fff0a0":"#f1c276";ctx.lineWidth=pre?2:4;ctx.strokeRect(q.x-rad,q.y-rad,rad*2,rad*2);if(!pre&&e.type==="goldLines"){ctx.fillStyle="#fff8d0";ctx.fillRect(q.x-rad,q.y-3,rad*2,6);ctx.fillRect(q.x-3,q.y-rad,6,rad*2)}}}else if(e.type==="goldImpact"){ctx.globalAlpha=1-t;const r=6+t*24;ctx.strokeStyle="#ffe875";ctx.lineWidth=4;ctx.strokeRect(p.x-r,p.y-r,r*2,r*2);ctx.fillStyle="#fff7c5";for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.fillRect(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,3,3)}}ctx.restore()}};

// Dynamic spell buttons; dark when unavailable due to mana, level, missing spell or cooldown.
renderHuntHud=function(){if(!hunt)return;const lifePct=Math.max(0,Math.min(100,profile.life/maxLife()*100)),manaPct=Math.max(0,Math.min(100,profile.mana/maxMana()*100)),xpPct=Math.max(0,Math.min(100,profile.xp/xpNeed()*100));lifeFill.style.height=`${lifePct}%`;manaFill.style.height=`${manaPct}%`;xpFill.style.width=`${xpPct}%`;lifeText.textContent=`${Math.max(0,Math.round(profile.life))}/${maxLife()}`;manaText.textContent=`${Math.round(profile.mana)}/${maxMana()}`;xpText.textContent=`${profile.xp} / ${xpNeed()}`;huntLevelText.textContent=`LV.${profile.level}`;huntTitle.textContent=`${hunt.m.name} • ${WORLD_NAMES[hunt.kind]||"Boss Room"}`;huntMeta.textContent=hunt.mode==="boss"?`${fmtTime(hunt.elapsed)} • BOSS ENCOUNTER • +${hunt.xp} XP`:`${fmtTime(hunt.elapsed)} • ${hunt.kills} kills • +${hunt.xp} XP`;huntDifficultyText.textContent=hunt.mode==="boss"?"BOSS":`NV.${hunt.difficultyLevel}`;huntDifficultyProgress.style.width=hunt.mode==="boss"?"100%":(hunt.difficultyLevel>=10?"100%":`${(hunt.elapsed%60000)/600}%`);const hp=countItem("health_potion"),mp=countItem("mana_potion");hpCount.textContent=hp;mpCount.textContent=mp;hpBtn.disabled=hp<=0;mpBtn.disabled=mp<=0;hpBtn.classList.toggle("unavailable",hp<=0);mpBtn.classList.toggle("unavailable",mp<=0);const selected=ensureSelectedArrow(),a=ARROW_DATA[selected]||{name:"Sem Arrow"};arrowIcon.dataset.pixelIcon=selected||"wood_arrow";arrowIcon.style.backgroundImage=`url(${pixelIconData(selected||"wood_arrow")})`;arrowName.textContent=a.name;arrowCount.textContent=selected?countItem(selected):0;arrowBtn.disabled=!selected;arrowBtn.classList.toggle("unavailable",!selected);for(let i=0;i<3;i++){const id=profile.equippedSpells?.[i],sp=V9_SPELLS[id],btn=document.getElementById(`spellBtn${i}`),ic=document.getElementById(`spellIcon${i}`),nm=document.getElementById(`spellName${i}`),cost=document.getElementById(`spellCost${i}`),cd=document.getElementById(`spellCd${i}`);if(!btn)continue;if(!sp){ic.dataset.pixelIcon="spellbook";ic.style.backgroundImage=`url(${pixelIconData("spellbook")})`;nm.textContent="Empty";cost.textContent="—";btn.disabled=true;btn.classList.add("unavailable");renderCd(cd,0);continue}ic.dataset.pixelIcon=sp.icon;ic.style.backgroundImage=`url(${pixelIconData(sp.icon)})`;nm.textContent=sp.name;cost.textContent=`${sp.mana} M`;const c=v9SpellCd(id),unavailable=profile.mana<sp.mana||profile.level<sp.level||!v9SpellKnown(id);btn.disabled=c>0||unavailable;btn.classList.toggle("unavailable",unavailable);renderCd(cd,c)}speedRing.classList.toggle("hidden",performance.now()>=hunt.speedUntil)};

// More explicit hero info for dual weapon system.
openCharacterInfo=function(){if(hunt)pauseForModal("characterModal");characterInfo.innerHTML=`<div class="info-box"><label>Level</label><b>${profile.level}</b></div><div class="info-box"><label>Distance</label><b>${profile.skills.distance.level}</b></div><div class="info-box"><label>Sword</label><b>${profile.skills.sword?.level||10}</b></div><div class="info-box"><label>Magic</label><b>${profile.skills.magic.level}</b></div><div class="info-box"><label>Shielding</label><b>${profile.skills.shielding.level}</b></div><div class="info-box"><label>Bow ATK</label><b>${Math.round(v9BowPower())}</b></div><div class="info-box"><label>Sword ATK</label><b>${Math.round(v9SwordPower())}</b></div><div class="info-box"><label>Defense</label><b>${armor()}</b></div><div class="info-box"><label>Combat</label><b>${hunt?.hero?.combatMode==="melee"?"Sword + Shield":"Bow"}</b></div>`;characterModal.classList.remove("hidden")};

// Home refresh and shop state after V9 mutations.
const v8RenderHome=renderHome;renderHome=function(){v8RenderHome();hydratePixelIcons(document)};
renderHome();
