const SAVE_KEY="arcane_hunt_visual_v3";
const MAX_UP=10,BP_SIZE=16,ROWS=7,COLS=5;
const DIFF={easy:{name:"Aventureiro",mult:.88,dmg:.88},normal:{name:"Normal",mult:1,dmg:1},hard:{name:"Veterano",mult:1.18,dmg:1.15}};
const SKILLS={
  distance:{name:"Distance",icon:"🏹"},
  sword:{name:"Sword",icon:"⚔"},
  magic:{name:"Magic",icon:"✨"},
  shielding:{name:"Shielding",icon:"🛡️"}
};
const SLOTS=["weapon","helmet","armor","legs","boots","necklace","ring"];
const ARROW_ORDER=["wood_arrow","iron_arrow","steel_arrow","explosion_arrow"];
const ARROW_DATA={
  wood_arrow:{name:"Wood Arrow",icon:"➶",mult:1,desc:"Arrow básica de madeira."},
  iron_arrow:{name:"Iron Arrow",icon:"➸",mult:1.18,desc:"+18% de dano."},
  steel_arrow:{name:"Steel Arrow",icon:"➹",mult:1.38,desc:"+38% de dano."},
  explosion_arrow:{name:"Explosion Arrow",icon:"💥",mult:1.12,desc:"Explode no alvo e causa dano em área nos SQMs próximos.",aoe:true}
};
const MONSTERS={
  troll:{name:"Cave Troll",icon:"👹",life:95,damage:[8,13],spawnMs:2200,moveMs:760,attackMs:1100,xp:14,gold:[2,6],theme:["#0b140d","#171408"]},
  orc:{name:"Orc Berserker",icon:"🧌",life:135,damage:[11,17],spawnMs:2400,moveMs:690,attackMs:980,xp:20,gold:[4,9],theme:["#0d1309","#1b1208"]},
  minotaur:{name:"Minotaur Guard",icon:"🐂",life:205,damage:[15,23],spawnMs:2800,moveMs:780,attackMs:1150,xp:31,gold:[7,13],theme:["#160d08","#1b100b"]},
  dragon:{name:"Dragon Hatchling",icon:"🐉",life:310,damage:[22,34],spawnMs:3300,moveMs:740,attackMs:1050,xp:48,gold:[10,19],theme:["#160808","#1a0d08"]}
};
const WORLD_NAMES={troll:"Dark Cave",orc:"Orc Camp",minotaur:"Blackstone Keep",dragon:"Ember Lair",moroheus:"Crimson Sanctum",balthazar:"Crypt of Violet Ash"};
const BOSSES={
  moroheus:{name:"Moroheus",title:"Demônio Carmesim",life:1650,damage:[24,34],xp:320,gold:[110,160],world:"Crimson Sanctum",desc:"Um demônio vermelho que lança bolas de fogo e invoca explosões infernais.",tags:["Fireball","Inferno Magic","2 SQMs"]},
  balthazar:{name:"Balthazar",title:"Mago Necromante",life:1420,damage:[20,29],xp:360,gold:[120,175],world:"Crypt of Violet Ash",desc:"Necromante protegido por dois summons. Conjura bolts e magia roxa em área.",tags:["2 Summons","Purple AoE","2 SQMs"]}
};
const PIX={
  ink:"#130e16",black:"#070609",gold:"#d2a33f",gold2:"#f0cf72",blue:"#2455a4",blue2:"#4b86d6",red:"#a82339",red2:"#dc4558",purple:"#713897",purple2:"#a05ac9",skin:"#c58b5b",skin2:"#e2b57b",iron:"#9aa0a6",steel:"#d2d5d5",wood:"#88542c",green:"#62753b",green2:"#899d50",brown:"#68452d",bone:"#d0c29a",orange:"#e56a21",yellow:"#ffd35d"
};
const ICON_CACHE={},MONSTER_ICON_CACHE={};
function pr(c,ox,oy,s,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(ox+x*s),Math.round(oy+y*s),Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)))}
function pset(c,ox,oy,s,x,y,color){pr(c,ox,oy,s,x,y,1,1,color)}
function drawPaladinPixel(c,cx,cy,s=1,dir="down",frame=0,attack=false){
  c.save();c.imageSmoothingEnabled=false;
  if(dir==="left"){c.translate(cx,cy);c.scale(-1,1);cx=0;cy=0;dir="right"}
  const ox=cx-8*s,oy=cy-8*s,bob=frame%2;
  // shadow
  c.fillStyle="rgba(0,0,0,.38)";c.fillRect(ox+4*s,oy+14*s,8*s,2*s);
  if(dir==="up"){
    pr(c,ox,oy,s,5,7,6,6,PIX.red);pr(c,ox,oy,s,6,5,4,6,PIX.blue);pr(c,ox,oy,s,6,4,4,2,PIX.gold);pr(c,ox,oy,s,7,2,2,3,PIX.blue2);pr(c,ox,oy,s,5,12+bob,2,3-bob,PIX.blue);pr(c,ox,oy,s,9,12+(1-bob),2,2+bob,PIX.blue);
  }else{
    pr(c,ox,oy,s,5,7,6,6,PIX.blue);pr(c,ox,oy,s,6,8,4,1,PIX.gold);pr(c,ox,oy,s,7,6,2,2,PIX.skin2);pr(c,ox,oy,s,6,3,4,4,PIX.blue);pr(c,ox,oy,s,7,2,2,2,PIX.gold);pset(c,ox,oy,s,7,5,PIX.ink);pset(c,ox,oy,s,9,5,PIX.ink);pr(c,ox,oy,s,5,12+bob,2,3-bob,PIX.blue2);pr(c,ox,oy,s,9,12+(1-bob),2,2+bob,PIX.blue2);pr(c,ox,oy,s,4,8,1,4,PIX.red);
  }
  // arm + bow on right side
  pr(c,ox,oy,s,11,7,2,2,PIX.skin);pr(c,ox,oy,s,12,6,1,5,PIX.gold);
  if(attack){pr(c,ox,oy,s,13,5,1,7,PIX.gold2);pr(c,ox,oy,s,14,7,2,1,PIX.bone)}
  else{pset(c,ox,oy,s,13,6,PIX.gold2);pset(c,ox,oy,s,13,10,PIX.gold2)}
  c.restore()
}
function drawMonsterPixel(c,kind,cx,cy,s=1,dir="down",frame=0,attack=false,dead=false){
  c.save();c.imageSmoothingEnabled=false;
  if(dir==="left"){c.translate(cx,cy);c.scale(-1,1);cx=0;cy=0;dir="right"}
  const ox=cx-8*s,oy=cy-8*s,b=frame%2;
  c.fillStyle="rgba(0,0,0,.38)";c.fillRect(ox+3*s,oy+14*s,10*s,2*s);
  if(dead){c.globalAlpha=.75;pr(c,ox,oy,s,3,11,10,3,kind==="dragon"?PIX.blue:kind==="minotaur"?PIX.brown:PIX.green);pr(c,ox,oy,s,5,10,4,2,PIX.red);c.restore();return}
  if(kind==="troll"){
    pr(c,ox,oy,s,4,5,8,8,PIX.green);pr(c,ox,oy,s,5,3,6,4,PIX.green2);pset(c,ox,oy,s,6,5,PIX.red);pset(c,ox,oy,s,9,5,PIX.red);pr(c,ox,oy,s,2,7,3,6,PIX.green);pr(c,ox,oy,s,11,7,3,6,PIX.green);pr(c,ox,oy,s,5,12+b,2,3-b,PIX.brown);pr(c,ox,oy,s,9,12+(1-b),2,2+b,PIX.brown);pr(c,ox,oy,s,5,10,6,2,PIX.wood);if(attack){pr(c,ox,oy,s,12,3,2,7,PIX.wood);pr(c,ox,oy,s,11,2,4,3,PIX.iron)}
  }else if(kind==="orc"){
    pr(c,ox,oy,s,5,5,6,7,PIX.green2);pr(c,ox,oy,s,6,3,4,4,PIX.green);pset(c,ox,oy,s,6,5,PIX.red);pset(c,ox,oy,s,9,5,PIX.red);pr(c,ox,oy,s,4,7,8,3,PIX.red);pr(c,ox,oy,s,3,8,2,4,PIX.iron);pr(c,ox,oy,s,11,8,2,4,PIX.iron);pr(c,ox,oy,s,5,12+b,2,3-b,PIX.brown);pr(c,ox,oy,s,9,12+(1-b),2,2+b,PIX.brown);pr(c,ox,oy,s,12,5,1,7,PIX.wood);pr(c,ox,oy,s,12,4,3,2,PIX.steel);if(attack)pr(c,ox,oy,s,13,2,2,5,PIX.steel)
  }else if(kind==="minotaur"){
    pr(c,ox,oy,s,5,5,6,8,PIX.purple);pr(c,ox,oy,s,6,3,4,4,PIX.brown);pr(c,ox,oy,s,4,2,2,2,PIX.bone);pr(c,ox,oy,s,10,2,2,2,PIX.bone);pset(c,ox,oy,s,7,5,PIX.red);pset(c,ox,oy,s,9,5,PIX.red);pr(c,ox,oy,s,3,7,2,5,PIX.gold);pr(c,ox,oy,s,11,7,3,5,PIX.purple2);pr(c,ox,oy,s,12,8,2,3,PIX.gold);pr(c,ox,oy,s,5,12+b,2,3-b,PIX.brown);pr(c,ox,oy,s,9,12+(1-b),2,2+b,PIX.brown);if(attack){pr(c,ox,oy,s,13,5,1,8,PIX.wood);pr(c,ox,oy,s,12,4,3,2,PIX.steel)}
  }else if(kind==="skeleton"){
    pr(c,ox,oy,s,6,4,4,4,PIX.bone);pset(c,ox,oy,s,6,6,PIX.ink);pset(c,ox,oy,s,9,6,PIX.ink);pr(c,ox,oy,s,7,8,2,4,PIX.bone);pr(c,ox,oy,s,4,8,3,1,PIX.bone);pr(c,ox,oy,s,9,8,3,1,PIX.bone);pr(c,ox,oy,s,6,12+b,1,3-b,PIX.bone);pr(c,ox,oy,s,9,12+(1-b),1,2+b,PIX.bone);pr(c,ox,oy,s,11,7,1,6,PIX.wood);if(attack)pr(c,ox,oy,s,11,5,3,2,PIX.steel)
  }else{
    // dragon hatchling
    pr(c,ox,oy,s,5,7,7,5,PIX.blue);pr(c,ox,oy,s,8,4,5,5,PIX.blue2);pset(c,ox,oy,s,11,6,PIX.yellow);pr(c,ox,oy,s,3,5,3,5,PIX.red);pr(c,ox,oy,s,4,4,2,2,PIX.purple);pr(c,ox,oy,s,4,11+b,2,3-b,PIX.blue2);pr(c,ox,oy,s,9,11+(1-b),2,2+b,PIX.blue2);pr(c,ox,oy,s,6,8,2,4,PIX.gold);pr(c,ox,oy,s,2,9,4,2,PIX.blue);if(attack){pr(c,ox,oy,s,13,6,3,1,PIX.orange);pset(c,ox,oy,s,15,5,PIX.yellow);pset(c,ox,oy,s,15,7,PIX.red)}
  }
  c.restore()
}
function drawIcon16(c,type){
  const s=1,ox=0,oy=0;c.clearRect(0,0,16,16);c.imageSmoothingEnabled=false;
  const frame=()=>{pr(c,ox,oy,s,1,1,14,14,PIX.ink);pr(c,ox,oy,s,1,1,14,1,PIX.gold);pr(c,ox,oy,s,1,14,14,1,PIX.gold);pr(c,ox,oy,s,1,1,1,14,PIX.gold);pr(c,ox,oy,s,14,1,1,14,PIX.gold)};
  if(["hero","shield","bow","health_potion","mana_potion","wood_arrow","iron_arrow","steel_arrow","explosion_arrow","holy","mas_holy","speed","backpack","pause","play","exit","swords","target","chest","hammer","gear","skull","monitor","mobile","helmet","armor","legs","boots","necklace","ring","boss","quest"].includes(type))frame();
  if(type==="hero"){drawPaladinPixel(c,8,8,.72,"down",0,false);return}
  if(type==="shield"){pr(c,ox,oy,s,4,3,8,8,PIX.blue);pr(c,ox,oy,s,5,4,6,8,PIX.blue2);pr(c,ox,oy,s,7,5,2,6,PIX.gold);pr(c,ox,oy,s,5,7,6,2,PIX.gold)}
  else if(type==="bow"){pr(c,ox,oy,s,4,3,1,10,PIX.gold);pset(c,ox,oy,s,5,2,PIX.gold2);pset(c,ox,oy,s,5,13,PIX.gold2);pr(c,ox,oy,s,5,7,7,1,PIX.bone);pr(c,ox,oy,s,11,6,2,3,PIX.steel)}
  else if(type==="health_potion"||type==="mana_potion"){const col=type==="health_potion"?PIX.red2:PIX.blue2;pr(c,ox,oy,s,6,3,4,2,PIX.bone);pr(c,ox,oy,s,5,5,6,7,PIX.gold);pr(c,ox,oy,s,6,6,4,5,col);pset(c,ox,oy,s,7,7,"#fff")}
  else if(type.includes("arrow")){const col=type==="wood_arrow"?PIX.wood:type==="iron_arrow"?PIX.iron:type==="steel_arrow"?PIX.steel:PIX.red2;for(let i=0;i<8;i++)pset(c,ox,oy,s,4+i,10-i,col);pr(c,ox,oy,s,11,2,2,3,PIX.steel);if(type==="explosion_arrow"){pset(c,ox,oy,s,3,11,PIX.orange);pset(c,ox,oy,s,2,12,PIX.yellow)}}
  else if(type==="holy"){for(let i=3;i<13;i++)pset(c,ox,oy,s,i,8,PIX.gold2);for(let i=5;i<12;i++)pset(c,ox,oy,s,8,i,PIX.gold);pset(c,ox,oy,s,7,7,"#fff");pset(c,ox,oy,s,9,9,"#fff")}
  else if(type==="mas_holy"){pr(c,ox,oy,s,4,4,8,8,PIX.purple);pr(c,ox,oy,s,5,5,6,6,PIX.ink);pr(c,ox,oy,s,7,3,2,10,PIX.gold2);pr(c,ox,oy,s,4,7,8,2,PIX.gold2)}
  else if(type==="speed"){pr(c,ox,oy,s,3,5,8,2,PIX.blue2);pr(c,ox,oy,s,5,8,7,2,PIX.blue);pr(c,ox,oy,s,7,11,5,1,PIX.purple2)}
  else if(type==="backpack"){pr(c,ox,oy,s,4,5,8,8,PIX.brown);pr(c,ox,oy,s,5,4,6,2,PIX.gold);pr(c,ox,oy,s,6,8,4,3,PIX.wood);pr(c,ox,oy,s,3,7,2,5,PIX.wood)}
  else if(type==="pause"){pr(c,ox,oy,s,5,4,2,8,PIX.gold2);pr(c,ox,oy,s,9,4,2,8,PIX.gold2)}
  else if(type==="play"){for(let i=0;i<7;i++)pr(c,ox,oy,s,5+Math.floor(i/2),4+i,1,1,PIX.gold2)}
  else if(type==="exit"){pr(c,ox,oy,s,4,4,6,8,PIX.brown);pr(c,ox,oy,s,8,7,5,2,PIX.red2);pr(c,ox,oy,s,11,6,2,4,PIX.red2)}
  else if(type==="swords"){for(let i=0;i<7;i++){pset(c,ox,oy,s,4+i,4+i,PIX.steel);pset(c,ox,oy,s,11-i,4+i,PIX.gold2)}}
  else if(type==="target"){pr(c,ox,oy,s,3,3,10,10,PIX.red);pr(c,ox,oy,s,5,5,6,6,PIX.ink);pr(c,ox,oy,s,7,7,2,2,PIX.gold2)}
  else if(type==="chest"){pr(c,ox,oy,s,3,6,10,7,PIX.wood);pr(c,ox,oy,s,4,4,8,3,PIX.brown);pr(c,ox,oy,s,7,7,2,4,PIX.gold2)}
  else if(type==="hammer"){pr(c,ox,oy,s,7,5,2,8,PIX.wood);pr(c,ox,oy,s,4,3,8,4,PIX.steel)}
  else if(type==="gear"){pr(c,ox,oy,s,5,5,6,6,PIX.iron);pr(c,ox,oy,s,7,7,2,2,PIX.ink);for(const [x,y] of [[7,3],[7,12],[3,7],[12,7]])pr(c,ox,oy,s,x,y,2,2,PIX.iron)}
  else if(type==="skull"){pr(c,ox,oy,s,5,4,6,6,PIX.bone);pr(c,ox,oy,s,6,9,4,3,PIX.bone);pset(c,ox,oy,s,6,7,PIX.ink);pset(c,ox,oy,s,9,7,PIX.ink);pset(c,ox,oy,s,7,10,PIX.ink);pset(c,ox,oy,s,9,10,PIX.ink)}
  else if(type==="monitor"){pr(c,ox,oy,s,3,4,10,7,PIX.blue);pr(c,ox,oy,s,4,5,8,5,PIX.ink);pr(c,ox,oy,s,7,11,2,2,PIX.gold);pr(c,ox,oy,s,5,13,6,1,PIX.gold)}
  else if(type==="mobile"){pr(c,ox,oy,s,5,2,6,12,PIX.gold);pr(c,ox,oy,s,6,3,4,9,PIX.ink);pset(c,ox,oy,s,8,13,PIX.blue2)}
  else if(type==="boss"){pr(c,ox,oy,s,4,5,8,7,PIX.red);pr(c,ox,oy,s,5,4,2,2,PIX.red2);pr(c,ox,oy,s,9,4,2,2,PIX.red2);pr(c,ox,oy,s,3,3,3,2,PIX.gold);pr(c,ox,oy,s,10,3,3,2,PIX.gold);pset(c,ox,oy,s,6,8,PIX.yellow);pset(c,ox,oy,s,9,8,PIX.yellow);pr(c,ox,oy,s,6,11,4,2,PIX.ink)}
  else if(type==="quest"){pr(c,ox,oy,s,4,3,8,10,PIX.bone);pr(c,ox,oy,s,5,4,6,1,PIX.gold);pr(c,ox,oy,s,5,7,5,1,PIX.purple2);pr(c,ox,oy,s,5,9,4,1,PIX.blue2);pr(c,ox,oy,s,5,11,3,1,PIX.red2)}
  else if(type==="helmet"){pr(c,ox,oy,s,4,5,8,6,PIX.steel);pr(c,ox,oy,s,5,4,6,2,PIX.gold);pr(c,ox,oy,s,7,8,5,1,PIX.ink)}
  else if(type==="armor"){pr(c,ox,oy,s,5,4,6,8,PIX.blue);pr(c,ox,oy,s,4,5,2,5,PIX.gold);pr(c,ox,oy,s,10,5,2,5,PIX.gold)}
  else if(type==="legs"){pr(c,ox,oy,s,5,4,6,5,PIX.purple);pr(c,ox,oy,s,5,9,2,4,PIX.blue);pr(c,ox,oy,s,9,9,2,4,PIX.blue)}
  else if(type==="boots"){pr(c,ox,oy,s,4,9,4,3,PIX.brown);pr(c,ox,oy,s,9,9,4,3,PIX.brown)}
  else if(type==="necklace"){for(let i=0;i<6;i++){pset(c,ox,oy,s,5+i,5+Math.abs(2-i),PIX.gold)};pr(c,ox,oy,s,7,10,2,2,PIX.purple2)}
  else if(type==="ring"){pr(c,ox,oy,s,5,5,6,6,PIX.gold);pr(c,ox,oy,s,6,6,4,4,PIX.ink);pset(c,ox,oy,s,8,4,PIX.purple2)}
}
function pixelIconData(type){if(ICON_CACHE[type])return ICON_CACHE[type];const cv=document.createElement("canvas");cv.width=cv.height=16;const c=cv.getContext("2d");drawIcon16(c,type);return ICON_CACHE[type]=cv.toDataURL("image/png")}
function monsterIconData(kind){if(MONSTER_ICON_CACHE[kind])return MONSTER_ICON_CACHE[kind];const cv=document.createElement("canvas");cv.width=cv.height=32;const c=cv.getContext("2d");c.imageSmoothingEnabled=false;drawMonsterPixel(c,kind,16,17,1.65,"down",0,false,false);return MONSTER_ICON_CACHE[kind]=cv.toDataURL("image/png")}
const NPC_ICON_CACHE={},BOSS_ICON_CACHE={};
function drawNpcPixel(c,type,cx,cy,s=1){
  c.save();c.imageSmoothingEnabled=false;const ox=cx-16*s,oy=cy-16*s;c.fillStyle="rgba(0,0,0,.38)";c.fillRect(ox+7*s,oy+27*s,18*s,3*s);
  if(type==="vendor"){
    pr(c,ox,oy,s,9,7,14,17,"#24172c");pr(c,ox,oy,s,7,10,5,14,"#3b1f49");pr(c,ox,oy,s,20,10,5,14,"#3b1f49");pr(c,ox,oy,s,11,5,10,7,"#151019");pr(c,ox,oy,s,12,7,8,5,"#30203a");pset(c,ox,oy,s,14,9,PIX.gold2);pset(c,ox,oy,s,18,9,PIX.gold2);pr(c,ox,oy,s,10,20,12,3,PIX.gold);pr(c,ox,oy,s,12,23,8,5,PIX.brown);pr(c,ox,oy,s,22,18,4,8,PIX.wood);pset(c,ox,oy,s,24,20,PIX.purple2)
  }else{
    pr(c,ox,oy,s,10,8,12,18,"#22295b");pr(c,ox,oy,s,8,11,5,15,PIX.purple);pr(c,ox,oy,s,20,11,5,15,PIX.purple2);pr(c,ox,oy,s,11,5,10,6,"#18152c");pr(c,ox,oy,s,13,7,6,5,PIX.skin2);pset(c,ox,oy,s,14,9,PIX.blue2);pset(c,ox,oy,s,18,9,PIX.blue2);pr(c,ox,oy,s,15,13,2,10,PIX.gold);pr(c,ox,oy,s,25,5,2,22,PIX.wood);pr(c,ox,oy,s,23,3,6,5,PIX.gold);pr(c,ox,oy,s,24,4,4,3,PIX.purple2);pset(c,ox,oy,s,25,5,"#fff")
  }c.restore()
}
function drawBossPixel(c,kind,cx,cy,s=1,frame=0,attack=false,dead=false){
  c.save();c.imageSmoothingEnabled=false;const ox=cx-16*s,oy=cy-10*s,b=frame%2;c.fillStyle="rgba(0,0,0,.42)";c.fillRect(ox+5*s,oy+18*s,22*s,3*s);
  if(dead){c.globalAlpha=.72;pr(c,ox,oy,s,5,15,22,5,kind==="moroheus"?PIX.red:PIX.purple);pr(c,ox,oy,s,12,13,8,3,PIX.ink);c.restore();return}
  if(kind==="moroheus"){
    pr(c,ox,oy,s,10,6,12,12,PIX.red);pr(c,ox,oy,s,12,3,8,6,PIX.red2);pr(c,ox,oy,s,8,2,5,3,PIX.gold);pr(c,ox,oy,s,19,2,5,3,PIX.gold);pr(c,ox,oy,s,5,7,7,8,"#70213b");pr(c,ox,oy,s,20,7,7,8,"#70213b");pr(c,ox,oy,s,7,14,6,4,PIX.red2);pr(c,ox,oy,s,19,14,6,4,PIX.red2);pset(c,ox,oy,s,14,7,PIX.yellow);pset(c,ox,oy,s,18,7,PIX.yellow);pr(c,ox,oy,s,14,11,4,2,PIX.ink);if(attack){pr(c,ox,oy,s,24,7,5,5,PIX.orange);pr(c,ox,oy,s,26,8,3,3,PIX.yellow)}
  }else{
    pr(c,ox,oy,s,10,7,12,12,"#34205d");pr(c,ox,oy,s,8,10,5,9,PIX.purple);pr(c,ox,oy,s,20,10,5,9,PIX.purple2);pr(c,ox,oy,s,12,3,8,7,"#16131d");pr(c,ox,oy,s,13,5,6,5,PIX.bone);pset(c,ox,oy,s,14,7,PIX.purple2);pset(c,ox,oy,s,18,7,PIX.purple2);pr(c,ox,oy,s,25,2,2,17,PIX.wood);pr(c,ox,oy,s,23,1,6,5,PIX.bone);pset(c,ox,oy,s,25,3,PIX.purple2);if(attack){pr(c,ox,oy,s,5,8,4,4,PIX.purple2);pset(c,ox,oy,s,4,7,"#d690ff");pset(c,ox,oy,s,3,9,PIX.blue2)}
  }c.restore()
}
function npcIconData(type){if(NPC_ICON_CACHE[type])return NPC_ICON_CACHE[type];const cv=document.createElement("canvas");cv.width=cv.height=32;const c=cv.getContext("2d");drawNpcPixel(c,type,16,16,1);return NPC_ICON_CACHE[type]=cv.toDataURL("image/png")}
function bossIconData(kind){if(BOSS_ICON_CACHE[kind])return BOSS_ICON_CACHE[kind];const cv=document.createElement("canvas");cv.width=44;cv.height=32;const c=cv.getContext("2d");drawBossPixel(c,kind,22,17,1.15,0,false,false);return BOSS_ICON_CACHE[kind]=cv.toDataURL("image/png")}
function hydratePixelIcons(root=document){
  root.querySelectorAll?.("[data-pixel-icon]").forEach(el=>{const k=el.dataset.pixelIcon;if(k)el.style.backgroundImage=`url(${pixelIconData(k)})`});
  root.querySelectorAll?.("[data-pixel-npc]").forEach(el=>{const k=el.dataset.pixelNpc;if(k)el.style.backgroundImage=`url(${npcIconData(k)})`});
  root.querySelectorAll?.("[data-boss-icon]").forEach(el=>{const k=el.dataset.bossIcon;if(k)el.style.backgroundImage=`url(${bossIconData(k)})`});
}
function iconKeyForItem(it){if(!it)return"chest";if(it.id==="health_potion"||it.id==="mana_potion"||ARROW_ORDER.includes(it.id))return it.id;return({weapon:"bow",helmet:"helmet",armor:"armor",legs:"legs",boots:"boots",necklace:"necklace",ring:"ring"})[it.type]||"chest"}
function iconHTML(it){return `<span class="mini-pixel-icon item-title-icon" data-pixel-icon="${iconKeyForItem(it)}"></span>`}


const ITEMS={
  health_potion:{id:"health_potion",name:"Health Potion",icon:"🧪",type:"consumable",rarity:"common",price:18,sell:7,desc:"Recupera Life. Pode ser usada sem limite de quantidade por partida."},
  mana_potion:{id:"mana_potion",name:"Mana Potion",icon:"🔷",type:"consumable",rarity:"common",price:20,sell:8,desc:"Recupera Mana. Pode ser usada sem limite de quantidade por partida."},
  wood_arrow:{id:"wood_arrow",name:"Wood Arrow",icon:"➶",type:"ammo",rarity:"common",price:1,sell:0,pack:20,desc:"Pacote com 20 arrows de madeira."},
  iron_arrow:{id:"iron_arrow",name:"Iron Arrow",icon:"➸",type:"ammo",rarity:"common",price:6,sell:1,pack:10,desc:"Pacote com 10 arrows. +18% dano."},
  steel_arrow:{id:"steel_arrow",name:"Steel Arrow",icon:"➹",type:"ammo",rarity:"rare",price:12,sell:2,pack:10,desc:"Pacote com 10 arrows. +38% dano."},
  explosion_arrow:{id:"explosion_arrow",name:"Explosion Arrow",icon:"💥",type:"ammo",rarity:"epic",price:18,sell:3,pack:5,desc:"Pacote com 5 arrows explosivas. Dano em área."},

  hunting_bow:{id:"hunting_bow",name:"Hunting Bow",icon:"🏹",type:"weapon",rarity:"common",price:80,sell:31,stats:{atk:10,attackSpeed:.05}},
  oak_bow:{id:"oak_bow",name:"Oak Bow",icon:"🏹",type:"weapon",rarity:"common",price:130,sell:48,stats:{atk:15}},
  composite_bow:{id:"composite_bow",name:"Composite Bow",icon:"🏹",type:"weapon",rarity:"rare",price:220,sell:82,stats:{atk:22,attackSpeed:.09}},
  royal_bow:{id:"royal_bow",name:"Royal Bow",icon:"🏹",type:"weapon",rarity:"epic",price:390,sell:146,stats:{atk:30,attackSpeed:.13}},
  holy_bow:{id:"holy_bow",name:"Holy Bow",icon:"🏹",type:"weapon",rarity:"legendary",price:680,sell:255,stats:{atk:41,attackSpeed:.18,mana:18}},

  leather_helmet:{id:"leather_helmet",name:"Leather Helmet",icon:"🪖",type:"helmet",rarity:"common",price:45,sell:17,stats:{life:10,armor:1}},
  iron_helmet:{id:"iron_helmet",name:"Iron Helmet",icon:"🪖",type:"helmet",rarity:"common",price:90,sell:34,stats:{life:18,armor:2}},
  steel_helmet:{id:"steel_helmet",name:"Steel Helmet",icon:"🪖",type:"helmet",rarity:"rare",price:170,sell:64,stats:{life:28,armor:3}},
  guardian_helmet:{id:"guardian_helmet",name:"Guardian Helmet",icon:"🪖",type:"helmet",rarity:"epic",price:300,sell:112,stats:{life:40,armor:5}},
  halo_helmet:{id:"halo_helmet",name:"Halo Helmet",icon:"👑",type:"helmet",rarity:"legendary",price:520,sell:195,stats:{life:55,armor:6,mana:14}},

  leather_armor:{id:"leather_armor",name:"Leather Armor",icon:"🥋",type:"armor",rarity:"common",price:70,sell:26,stats:{life:18,armor:2}},
  chain_armor:{id:"chain_armor",name:"Chain Armor",icon:"🥋",type:"armor",rarity:"common",price:130,sell:49,stats:{life:30,armor:3}},
  knight_armor:{id:"knight_armor",name:"Knight Armor",icon:"🥋",type:"armor",rarity:"rare",price:240,sell:90,stats:{life:46,armor:5}},
  royal_armor:{id:"royal_armor",name:"Royal Armor",icon:"🥋",type:"armor",rarity:"epic",price:420,sell:158,stats:{life:66,armor:7}},
  sacred_armor:{id:"sacred_armor",name:"Sacred Armor",icon:"🥋",type:"armor",rarity:"legendary",price:720,sell:270,stats:{life:90,armor:9,mana:12}},

  cloth_legs:{id:"cloth_legs",name:"Cloth Legs",icon:"👖",type:"legs",rarity:"common",price:35,sell:13,stats:{life:8}},
  leather_legs:{id:"leather_legs",name:"Leather Legs",icon:"👖",type:"legs",rarity:"common",price:70,sell:26,stats:{life:15,armor:1}},
  chain_legs:{id:"chain_legs",name:"Chain Legs",icon:"👖",type:"legs",rarity:"rare",price:145,sell:54,stats:{life:24,armor:2}},
  royal_legs:{id:"royal_legs",name:"Royal Legs",icon:"👖",type:"legs",rarity:"epic",price:260,sell:97,stats:{life:35,armor:3}},
  sacred_legs:{id:"sacred_legs",name:"Sacred Legs",icon:"👖",type:"legs",rarity:"legendary",price:450,sell:169,stats:{life:48,armor:4,mana:8}},

  travel_boots:{id:"travel_boots",name:"Travel Boots",icon:"🥾",type:"boots",rarity:"common",price:35,sell:13,stats:{life:6}},
  leather_boots:{id:"leather_boots",name:"Leather Boots",icon:"🥾",type:"boots",rarity:"common",price:70,sell:26,stats:{life:10}},
  steel_boots:{id:"steel_boots",name:"Steel Boots",icon:"🥾",type:"boots",rarity:"rare",price:140,sell:52,stats:{life:18,armor:1}},
  ranger_boots:{id:"ranger_boots",name:"Ranger Boots",icon:"🥾",type:"boots",rarity:"epic",price:250,sell:94,stats:{life:24,attackSpeed:.06}},
  blessed_boots:{id:"blessed_boots",name:"Blessed Boots",icon:"🥾",type:"boots",rarity:"legendary",price:430,sell:161,stats:{life:34,attackSpeed:.1,mana:8}},

  rope_necklace:{id:"rope_necklace",name:"Rope Necklace",icon:"📿",type:"necklace",rarity:"common",price:30,sell:11,stats:{mana:5}},
  bronze_amulet:{id:"bronze_amulet",name:"Bronze Amulet",icon:"📿",type:"necklace",rarity:"common",price:70,sell:26,stats:{mana:10}},
  sapphire_amulet:{id:"sapphire_amulet",name:"Sapphire Amulet",icon:"📿",type:"necklace",rarity:"rare",price:150,sell:56,stats:{mana:20}},
  sun_amulet:{id:"sun_amulet",name:"Sun Amulet",icon:"📿",type:"necklace",rarity:"epic",price:280,sell:105,stats:{mana:30,life:15}},
  divine_amulet:{id:"divine_amulet",name:"Divine Amulet",icon:"📿",type:"necklace",rarity:"legendary",price:500,sell:188,stats:{mana:44,life:26}},

  copper_ring:{id:"copper_ring",name:"Copper Ring",icon:"💍",type:"ring",rarity:"common",price:30,sell:11,stats:{life:5}},
  silver_ring:{id:"silver_ring",name:"Silver Ring",icon:"💍",type:"ring",rarity:"common",price:65,sell:24,stats:{life:9,mana:5}},
  ruby_ring:{id:"ruby_ring",name:"Ruby Ring",icon:"💍",type:"ring",rarity:"rare",price:145,sell:54,stats:{atk:4,life:12}},
  royal_ring:{id:"royal_ring",name:"Royal Ring",icon:"💍",type:"ring",rarity:"epic",price:270,sell:101,stats:{atk:7,life:18,mana:10}},
  seraph_ring:{id:"seraph_ring",name:"Seraph Ring",icon:"💍",type:"ring",rarity:"legendary",price:490,sell:184,stats:{atk:10,life:24,mana:18,attackSpeed:.05}}
};

let profile=null,hunt=null,ctx=null,canvas=null,canvasW=0,canvasH=0,lastScene="homeScene",layoutMode="mobile";
let modalAutoPause={};
let shopTab="consumable",selectedShopItem=null,selectedShopBp=null,selectedSmithTarget={type:"gear",id:"hunting_bow"},selectedBp=null,dragState=null,idleSkill="distance",idleRunning=false,idleTimer=null,trainReady=true,resetArmed=false,resetTimer=null;
let menuFx={canvas:null,ctx:null,particles:[],raf:0,last:0};
let toastTimer=null;

function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
function defaultProfile(){
  const bp=Array(BP_SIZE).fill(null);
  bp[0]={uid:uid(),itemId:"health_potion",qty:3};
  bp[1]={uid:uid(),itemId:"mana_potion",qty:3};
  bp[2]={uid:uid(),itemId:"wood_arrow",qty:80};
  bp[3]={uid:uid(),itemId:"iron_arrow",qty:20};
  return{
    level:1,xp:0,gold:120,difficulty:"normal",life:185,mana:90,
    skills:{distance:{level:10,tries:0},sword:{level:10,tries:0},magic:{level:1,tries:0},shielding:{level:10,tries:0}},
    equipment:{weapon:"hunting_bow",helmet:"leather_helmet",armor:"leather_armor",legs:"cloth_legs",boots:"travel_boots",necklace:"rope_necklace",ring:"copper_ring"},
    upgrades:{},potionUpgrade:{health:0,mana:0},backpack:bp,selectedArrow:"wood_arrow",
    stats:{kills:0,totalGold:0,totalXp:0}
  }
}
function loadProfile(){
  try{profile=JSON.parse(localStorage.getItem(SAVE_KEY)||"null")||defaultProfile()}catch(e){profile=defaultProfile()}
  normalize();save()
}
function normalize(){
  const d=defaultProfile();
  profile={...d,...profile,skills:{...d.skills,...(profile.skills||{})},equipment:{...d.equipment,...(profile.equipment||{})},upgrades:{...(profile.upgrades||{})},potionUpgrade:{...d.potionUpgrade,...(profile.potionUpgrade||{})},stats:{...d.stats,...(profile.stats||{})}};
  for(const k in SKILLS)profile.skills[k]={...d.skills[k],...(profile.skills[k]||{})};
  if(!Array.isArray(profile.backpack))profile.backpack=[];
  profile.backpack=profile.backpack.slice(0,BP_SIZE);while(profile.backpack.length<BP_SIZE)profile.backpack.push(null);
  for(const e of profile.backpack)if(e&&!e.qty)e.qty=1;
  if(!ARROW_ORDER.includes(profile.selectedArrow))profile.selectedArrow="wood_arrow";
  profile.life=Math.min(Number(profile.life)||maxLife(),maxLife());
  profile.mana=Math.min(Number(profile.mana)||maxMana(),maxMana());
}
function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(profile))}
function up(id){return profile.upgrades[id]||0}
function gearStat(stat){
  let total=0;
  for(const id of Object.values(profile.equipment)){
    const it=ITEMS[id];if(!it)continue;
    const base=it.stats?.[stat]||0;
    total+=base*(1+up(id)*.08);
  }
  return total
}
function maxLife(){return Math.round(135+profile.level*5.2+gearStat("life"))}
function maxMana(){return Math.round(55+profile.level*3.2+gearStat("mana"))}
function armor(){return Math.round(gearStat("armor")+profile.skills.shielding.level*.32)}
function baseAttack(){
  const s=profile.skills.distance.level;
  return 9+s*1.55+profile.level*.7+gearStat("atk")
}
function attacksPerSecond(){return .72+profile.skills.distance.level*.012+gearStat("attackSpeed")}
function attackInterval(){return 1000/attacksPerSecond()}
function magicPower(){return 8+profile.skills.magic.level*2.1+profile.level*.55}
function xpNeed(){return Math.round(90*Math.pow(profile.level,1.32))}
function skillNeed(k,lv){return Math.round(14+lv*3.4)}
function addSkillTry(k,n=1){
  const s=profile.skills[k];s.tries+=n;
  while(s.tries>=skillNeed(k,s.level)){s.tries-=skillNeed(k,s.level);s.level++}
}
function addXp(n){
  profile.xp+=n;profile.stats.totalXp+=n;
  while(profile.xp>=xpNeed()){profile.xp-=xpNeed();profile.level++;toastMsg(`Level ${profile.level}!`);profile.life=maxLife();profile.mana=maxMana()}
}
function countItem(id){return profile.backpack.reduce((a,e)=>a+(e?.itemId===id?e.qty:0),0)}
function findFree(){return profile.backpack.findIndex(x=>!x)}
function addToBp(id,qty=1){
  const it=ITEMS[id];
  if(it?.type==="consumable"||it?.type==="ammo"){
    const stack=profile.backpack.find(e=>e?.itemId===id);
    if(stack){stack.qty+=qty;return true}
  }
  const i=findFree();if(i<0)return false;
  profile.backpack[i]={uid:uid(),itemId:id,qty};return true
}
function consumeItem(id,qty=1){
  let left=qty;
  for(let i=0;i<profile.backpack.length&&left>0;i++){
    const e=profile.backpack[i];if(!e||e.itemId!==id)continue;
    const use=Math.min(left,e.qty);e.qty-=use;left-=use;if(e.qty<=0)profile.backpack[i]=null
  }
  return left===0
}
function upgradeMult(id){return 1+up(id)*.08}
function itemStats(it,id=it.id){
  const s=it.stats||{},m=upgradeMult(id),parts=[];
  for(const [k,v] of Object.entries(s)){
    const label={atk:"ATK",life:"Life",mana:"Mana",armor:"Armor",attackSpeed:"AS"}[k]||k;
    const val=k==="attackSpeed"?(v*m).toFixed(2):Math.round(v*m);
    parts.push(`${label} +${val}`)
  }
  return parts.join(" • ")||it.desc||""
}
function rarityName(r){return{common:"Comum",rare:"Raro",epic:"Épico",legendary:"Lendário"}[r]||r}
function sellValue(it,id){return Math.max(0,Math.round((it.sell||0)*(1+up(id)*.18)))}

function closeAllModals(){document.querySelectorAll(".modal").forEach(m=>m.classList.add("hidden"));modalAutoPause={}}
function selectLayout(mode){
  layoutMode=mode==="pc"?"pc":"mobile";
  document.body.classList.remove("layout-unset","layout-pc","layout-mobile");
  document.body.classList.add(`layout-${layoutMode}`);
  closeAllModals();
  openScene("homeScene");
  setTimeout(()=>window.dispatchEvent(new Event("resize")),0);
}
function showLayoutPicker(){
  if(hunt?.running)stopHunt(true);
  closeAllModals();
  hunt=null;
  document.querySelectorAll("body>section").forEach(s=>s.classList.add("hidden"));
  layoutScene.classList.remove("hidden");
  document.body.classList.remove("layout-pc","layout-mobile");
  document.body.classList.add("layout-unset");
  lastScene="layoutScene";
}

/* SCENES */
function openScene(id){
  if(hunt?.running&&id!=="huntScene")stopHunt(false);
  document.querySelectorAll("body>section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");lastScene=id;
  if(id==="homeScene")renderHome();
  if(id==="huntSelectScene")renderHuntSelect();
  if(id==="bossSelectScene")renderBossSelect();
  if(id==="heroScene")renderHero();
  if(id==="trainerScene")renderTrainer();
  if(id==="shopScene")renderShop();
  if(id==="smithScene")renderSmith();
  if(id==="settingsScene")renderSettings();
}
function renderHome(){
  homeGold.textContent=profile.gold;homeLevel.textContent=profile.level;homeDistance.textContent=profile.skills.distance.level;homeMagic.textContent=profile.skills.magic.level;
  initMenuParticles();
}
function renderHuntSelect(){
  huntGrid.innerHTML="";
  for(const [k,m] of Object.entries(MONSTERS)){
    const d=document.createElement("button");d.className="hunt-card";
    d.innerHTML=`<span class="monster-pixel" style="background-image:url('${monsterIconData(k)}')"></span><h3>${m.name}</h3><p>Combate em SQMs sobre um mapa pixel-art próprio desta hunt.</p><div class="mini"><span>Life ${m.life}</span><span>XP ${m.xp}</span><span>Spawn ${(m.spawnMs/1000).toFixed(1)}s</span></div>`;
    d.onclick=()=>startHunt(k);huntGrid.appendChild(d)
  }
}
function openQuests(){questsModal.classList.remove("hidden")}
function renderBossSelect(){
  bossGrid.innerHTML="";
  for(const [k,b] of Object.entries(BOSSES)){
    const d=document.createElement("button");d.className=`boss-card ${k==="balthazar"?"necro":""}`;
    d.innerHTML=`<span class="boss-pixel" data-boss-icon="${k}"></span><div><h3>${b.name}</h3><p><b>${b.title}</b><br>${b.desc}</p><div class="boss-tags">${b.tags.map(x=>`<span>${x}</span>`).join("")}</div></div>`;
    d.onclick=()=>startBoss(k);bossGrid.appendChild(d)
  }
  hydratePixelIcons(bossGrid)
}
function initMenuParticles(){
  const cv=document.getElementById("menuParticles");if(!cv)return;menuFx.canvas=cv;menuFx.ctx=cv.getContext("2d");resizeMenuParticles();
  if(!menuFx.particles.length){for(let i=0;i<34;i++)menuFx.particles.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.000018,vy:-.000012-Math.random()*.000025,r:1+Math.random()*1.5,a:.035+Math.random()*.08,c:Math.random()<.55?"gold":"purple"})}
  if(!menuFx.raf)menuFx.raf=requestAnimationFrame(menuParticleLoop)
}
function resizeMenuParticles(){if(!menuFx.canvas)return;const dpr=Math.min(2,devicePixelRatio||1),w=innerWidth,h=innerHeight;menuFx.canvas.width=Math.floor(w*dpr);menuFx.canvas.height=Math.floor(h*dpr);menuFx.canvas.style.width=w+"px";menuFx.canvas.style.height=h+"px";menuFx.ctx?.setTransform(dpr,0,0,dpr,0,0)}
function menuParticleLoop(t){
  menuFx.raf=requestAnimationFrame(menuParticleLoop);if(!menuFx.canvas||!menuFx.ctx)return;const c=menuFx.ctx,w=innerWidth,h=innerHeight,dt=Math.min(40,t-(menuFx.last||t));menuFx.last=t;c.clearRect(0,0,w,h);
  if(lastScene!=="homeScene")return;
  for(const p of menuFx.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.y<-.03){p.y=1.03;p.x=Math.random()}if(p.x<0)p.x=1;if(p.x>1)p.x=0;c.globalAlpha=p.a*(.65+.35*Math.sin(t*.001+p.x*9));c.fillStyle=p.c==="gold"?"#d8ad52":"#9a58bd";c.fillRect(Math.floor(p.x*w),Math.floor(p.y*h),p.r,p.r)}c.globalAlpha=1
}
window.addEventListener("resize",resizeMenuParticles);


/* HERO / BACKPACK */
function renderBars(target){
  target.innerHTML=`
  <div class="bar-wrap"><div class="bar-label"><span>Life</span><span>${Math.round(profile.life)}/${maxLife()}</span></div><div class="bar life"><div style="width:${profile.life/maxLife()*100}%"></div></div></div>
  <div class="bar-wrap"><div class="bar-label"><span>Mana</span><span>${Math.round(profile.mana)}/${maxMana()}</span></div><div class="bar mana"><div style="width:${profile.mana/maxMana()*100}%"></div></div></div>
  <div class="bar-wrap"><div class="bar-label"><span>XP</span><span>${profile.xp}/${xpNeed()}</span></div><div class="bar xp"><div style="width:${profile.xp/xpNeed()*100}%"></div></div></div>`
}
function renderSkillRows(target){
  target.innerHTML="";
  for(const k of Object.keys(SKILLS)){
    const s=profile.skills[k],need=skillNeed(k,s.level),d=document.createElement("div");d.className="skill-row";
    d.innerHTML=`<div class="skill-top"><b>${SKILLS[k].icon} ${SKILLS[k].name} ${s.level}</b><span>${s.tries}/${need}</span></div><div class="skill-track"><div style="width:${Math.min(100,s.tries/need*100)}%"></div></div>`;
    target.appendChild(d)
  }
}
function renderHero(){
  heroSubtitle.textContent=`Level ${profile.level} • ${Math.round(attacksPerSecond()*100)/100} ataques/s`;
  renderBars(heroBars);
  heroStats.innerHTML=`
  <div class="stat-box"><label>ATK base</label><b>${Math.round(baseAttack())}</b></div>
  <div class="stat-box"><label>Armor</label><b>${armor()}</b></div>
  <div class="stat-box"><label>Magic Power</label><b>${Math.round(magicPower())}</b></div>
  <div class="stat-box"><label>Gold</label><b>${profile.gold}</b></div>
  <div class="stat-box"><label>HP Potions</label><b>${countItem("health_potion")}</b></div>
  <div class="stat-box"><label>MP Potions</label><b>${countItem("mana_potion")}</b></div>`;
  renderSkillRows(heroSkills);
  equipGrid.innerHTML="";
  for(const slot of SLOTS){
    const id=profile.equipment[slot],it=ITEMS[id],d=document.createElement("div");d.className="equip-slot";
    const locked=it&&typeof v9ItemLevel==="function"&&profile.level<v9ItemLevel(it);
    d.classList.toggle("locked",!!locked);
    d.innerHTML=`<label>${slot}</label><b>${it?iconHTML(it)+" "+it.name+(up(id)?` +${up(id)}`:""):"—"}</b><span>${it?itemStats(it,id):"vazio"}${locked?`<br><span class="level-lock">INATIVO • LV.${v9ItemLevel(it)}</span>`:""}</span>`;
    equipGrid.appendChild(d)
  }
  renderBackpack(heroBackpack,true);
  renderHeroDetail()
}
function renderBackpack(target,selectable=false){
  target.innerHTML="";
  for(let i=0;i<BP_SIZE;i++){
    const e=profile.backpack[i],d=document.createElement("div");
    d.className=`bp-slot ${e?"":"empty"} ${selectable&&selectedBp===i?"selected":""}`;d.dataset.index=i;
    if(e){
      const it=ITEMS[e.itemId]||{name:e.itemId,icon:"❓",rarity:"common"};
      d.innerHTML=`<span class="rarity ${it.rarity}"></span><div><div class="bp-icon">${iconHTML(it)}</div><div class="bp-name">${it.name}</div></div>${e.qty>1?`<span class="stack">${e.qty}</span>`:""}`;
      if(selectable)d.onclick=()=>{selectedBp=i;renderHero()}
    }else d.innerHTML="<span style='font-size:11px;color:#4b3a30'>·</span>";
    attachDrag(d,i,selectable,target);target.appendChild(d)
  }
}
function attachDrag(el,index,selectable,target){
  el.addEventListener("pointerdown",ev=>{dragState={from:index,startX:ev.clientX,startY:ev.clientY,moved:false,el};el.setPointerCapture?.(ev.pointerId)});
  el.addEventListener("pointermove",ev=>{if(!dragState||dragState.from!==index)return;if(Math.hypot(ev.clientX-dragState.startX,ev.clientY-dragState.startY)>8){dragState.moved=true;el.classList.add("dragging")}});
  el.addEventListener("pointerup",ev=>{
    if(!dragState||dragState.from!==index)return;el.classList.remove("dragging");const st=dragState;dragState=null;
    if(!st.moved)return;
    const t=document.elementFromPoint(ev.clientX,ev.clientY)?.closest(".bp-slot");if(!t)return;
    const to=Number(t.dataset.index);if(Number.isNaN(to)||to===index)return;
    const a=profile.backpack[index],b=profile.backpack[to];
    if(a&&b&&a.itemId===b.itemId&&(ITEMS[a.itemId]?.type==="consumable"||ITEMS[a.itemId]?.type==="ammo")){b.qty+=a.qty;profile.backpack[index]=null}else{profile.backpack[index]=b;profile.backpack[to]=a}
    save();if(target===heroBackpack)renderHero();else renderBackpack(target,false)
  })
}
function renderHeroDetail(){
  const e=selectedBp!=null?profile.backpack[selectedBp]:null;
  if(!e){heroDetail.innerHTML="Selecione um item.";return}
  const it=ITEMS[e.itemId];if(!it){heroDetail.innerHTML="Item desconhecido.";return}
  const equip=SLOTS.includes(it.type)?`<button class="btn primary" onclick="equipBp(${selectedBp})">Equipar</button>`:"";
  heroDetail.innerHTML=`<h4>${iconHTML(it)} ${it.name} ${up(it.id)?`+${up(it.id)}`:""} ${e.qty>1?`×${e.qty}`:""}</h4><p>${rarityName(it.rarity)} • ${itemStats(it,it.id)}<br>${it.desc||""}</p><div class="item-actions">${equip}</div>`
}
function equipBp(i){
  const e=profile.backpack[i];if(!e)return;const it=ITEMS[e.itemId];if(!SLOTS.includes(it.type))return;
  const old=profile.equipment[it.type];profile.equipment[it.type]=it.id;profile.backpack[i]=old?{uid:uid(),itemId:old,qty:1}:null;
  save();renderHero()
}

/* TRAINER */
function renderTrainer(){
  renderBars(trainerBars);
  const skills=document.createElement("div");renderSkillRows(skills);trainerBars.appendChild(skills);
  document.querySelectorAll(".idle-skill").forEach(b=>b.classList.toggle("active",b.dataset.skill===idleSkill));
  idleToggle.textContent=idleRunning?"Parar Idle":"Iniciar Idle"
}
function manualTrain(k){
  if(!trainReady)return;trainReady=false;document.querySelectorAll(".train-btn").forEach(b=>b.classList.add("cooldown"));
  addSkillTry(k,1);save();renderTrainer();setTimeout(()=>{trainReady=true;document.querySelectorAll(".train-btn").forEach(b=>b.classList.remove("cooldown"))},700)
}
function selectIdle(k){idleSkill=k;renderTrainer()}
function toggleIdle(){
  idleRunning=!idleRunning;clearInterval(idleTimer);
  if(idleRunning)idleTimer=setInterval(()=>{if(lastScene!=="trainerScene")return;addSkillTry(idleSkill,1);save();renderTrainer()},1250);
  renderTrainer()
}

/* SHOP */
function setShopTab(t){shopTab=t;selectedShopItem=null;renderShop()}
function makeTradeSlot(it,opts={}){
  const d=document.createElement(opts.button===false?"div":"button");d.className=`trade-slot ${opts.selected?"selected":""}`;
  const price=opts.price!=null?`<span class="slot-price">${opts.price}</span>`:"";const stack=opts.qty>1?`<span class="slot-stack">${opts.qty}</span>`:"";const plus=opts.plus?`<span class="slot-plus">+${opts.plus}</span>`:"";
  d.innerHTML=`${price}${plus}<span class="slot-icon pixel-icon" data-pixel-icon="${iconKeyForItem(it)}"></span><span class="slot-name">${opts.label||it.name}</span>${stack}`;return d
}
function renderShop(){
  shopGold.textContent=profile.gold;document.querySelectorAll(".shop-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===shopTab));
  const stock=Object.values(ITEMS).filter(x=>x.type===shopTab);if(!stock.some(x=>x.id===selectedShopItem))selectedShopItem=stock[0]?.id||null;shopGrid.innerHTML="";
  for(const it of stock){const d=makeTradeSlot(it,{selected:selectedShopItem===it.id,price:it.price,label:it.name});d.onclick=()=>{selectedShopItem=it.id;renderShop()};shopGrid.appendChild(d)}
  if(!stock.length)shopGrid.innerHTML='<div class="trade-empty">Sem itens nesta categoria.</div>';
  const it=ITEMS[selectedShopItem];shopDetail.innerHTML=it?`<div><h4>${it.name}</h4><p>${rarityName(it.rarity)} • ${it.desc||itemStats(it)}${it.type==="ammo"?` • Pacote: ${it.pack}`:""}<br>Preço: <b>${it.price} Gold</b></p></div><button class="btn primary" ${profile.gold<it.price?"disabled":""} onclick="buyItem('${it.id}')">Comprar</button>`:'<div class="trade-empty">Selecione um item.</div>';
  shopBackpack.classList.add("shop-selectable");shopBackpack.innerHTML="";let has=false;
  profile.backpack.forEach((e,i)=>{if(!e)return;has=true;const bi=ITEMS[e.itemId];const d=makeTradeSlot(bi,{selected:selectedShopBp===i,qty:e.qty,plus:up(bi.id),label:bi.name});d.onclick=()=>{selectedShopBp=i;renderShop()};shopBackpack.appendChild(d)});if(!has)shopBackpack.innerHTML='<div class="trade-empty">Backpack vazia.</div>';
  const e=selectedShopBp!=null?profile.backpack[selectedShopBp]:null,bi=e?ITEMS[e.itemId]:null;shopSellDetail.innerHTML=bi?`<div><h4>${bi.name}${up(bi.id)?` +${up(bi.id)}`:""}</h4><p>${rarityName(bi.rarity)} • ${itemStats(bi,bi.id)}<br>Venda: <b>${sellValue(bi,bi.id)*e.qty} Gold</b>${e.qty>1?` • x${e.qty}`:""}</p></div><button class="btn red" onclick="sellBp(${selectedShopBp})">Vender</button>`:'<div class="trade-empty">Toque em um item da backpack para vender.</div>';
  hydratePixelIcons(document)
}
function buyItem(id){
  const it=ITEMS[id];if(!it||profile.gold<it.price)return;const qty=it.type==="ammo"?(it.pack||1):1;
  if((it.type==="consumable"||it.type==="ammo")&&!addToBp(id,qty))return toastMsg("Backpack cheia");
  if(SLOTS.includes(it.type)){const i=findFree();if(i<0)return toastMsg("Backpack cheia");profile.backpack[i]={uid:uid(),itemId:id,qty:1}}
  profile.gold-=it.price;save();renderShop();renderHome();toastMsg(`${it.name} comprado`)
}
function sellBp(i){const e=profile.backpack[i];if(!e)return;const it=ITEMS[e.itemId];if(!it)return;profile.gold+=sellValue(it,it.id)*e.qty;profile.backpack[i]=null;selectedShopBp=null;save();renderShop();toastMsg("Vendido")}
function sellAllEquipment(){let n=0,g=0;for(let i=0;i<BP_SIZE;i++){const e=profile.backpack[i];if(!e)continue;const it=ITEMS[e.itemId];if(!it||!SLOTS.includes(it.type))continue;g+=sellValue(it,it.id)*e.qty;n+=e.qty;profile.backpack[i]=null}profile.gold+=g;selectedShopBp=null;save();renderShop();toastMsg(`${n} equipamento(s) • +${g} Gold`)}

/* SMITH */
function smithCost(it,u){return Math.round(45+(it.sell||20)*(.65+u*.32)+38*Math.pow(u+1,1.35))}
function renderSmith(){
  smithGold.textContent=profile.gold;smithGrid.innerHTML="";
  if(selectedSmithTarget?.type==="gear"&&!Object.values(profile.equipment).includes(selectedSmithTarget.id))selectedSmithTarget={type:"gear",id:profile.equipment.weapon};
  for(const slot of SLOTS){const id=profile.equipment[slot],it=ITEMS[id],u=up(id),d=makeTradeSlot(it,{selected:selectedSmithTarget?.type==="gear"&&selectedSmithTarget.id===id,plus:u,label:slot});d.onclick=()=>{selectedSmithTarget={type:"gear",id};renderSmith()};smithGrid.appendChild(d)}
  potionSmith.innerHTML="";for(const type of ["health","mana"]){const id=type==="health"?"health_potion":"mana_potion",it=ITEMS[id],u=profile.potionUpgrade[type]||0,d=makeTradeSlot(it,{selected:selectedSmithTarget?.type==="potion"&&selectedSmithTarget.id===type,plus:u,label:it.name});d.onclick=()=>{selectedSmithTarget={type:"potion",id:type};renderSmith()};potionSmith.appendChild(d)}
  if(selectedSmithTarget?.type==="potion"){
    const type=selectedSmithTarget.id,u=profile.potionUpgrade[type]||0,c=potCost(type),range=type==="health"?hpRange():mpRange(),name=type==="health"?"Health Potion":"Mana Potion";
    smithDetail.innerHTML=`<div><h4>${name} +${u}</h4><p>Recuperação atual: <b>${range[0]}–${range[1]}</b>. Cada upgrade aumenta a potência.</p></div><button class="btn ${type==="health"?"red":"blue"}" ${u>=10||profile.gold<c?"disabled":""} onclick="upgradePotion('${type}')">${u>=10?"+10 MAX":`Upgrade • ${c}`}</button>`
  }else{
    const id=selectedSmithTarget?.id||profile.equipment.weapon,it=ITEMS[id],u=up(id),c=smithCost(it,u);smithDetail.innerHTML=`<div><h4>${it.name} ${u?`+${u}`:""}</h4><p>${itemStats(it,id)}<br>Venda: ${sellValue(it,id)} Gold.</p></div><button class="btn primary" ${u>=10||profile.gold<c?"disabled":""} onclick="upgradeGear('${id}')">${u>=10?"+10 MAX":`Upgrade +${u+1} • ${c}`}</button>`
  }
  smithBackpack.innerHTML="";let has=false;profile.backpack.forEach(e=>{if(!e)return;has=true;const it=ITEMS[e.itemId];smithBackpack.appendChild(makeTradeSlot(it,{button:false,qty:e.qty,plus:up(it.id),label:it.name}))});if(!has)smithBackpack.innerHTML='<div class="trade-empty">Backpack vazia.</div>';hydratePixelIcons(document)
}
function upgradeGear(id){const it=ITEMS[id],u=up(id),c=smithCost(it,u);if(u>=10||profile.gold<c)return;profile.gold-=c;profile.upgrades[id]=u+1;save();renderSmith();toastMsg(`${it.name} +${u+1}`)}
function potCost(type){const u=profile.potionUpgrade[type]||0;return Math.round(90+70*Math.pow(u+1,1.35))}
function upgradePotion(type){const u=profile.potionUpgrade[type],c=potCost(type);if(u>=10||profile.gold<c)return;profile.gold-=c;profile.potionUpgrade[type]=u+1;save();renderSmith();toastMsg(`${type==="health"?"Health":"Mana"} Potion +${u+1}`)}
function hpRange(){const m=1+(profile.potionUpgrade.health||0)*.09;return[Math.round(48*m),Math.round(70*m)]}
function mpRange(){const m=1+(profile.potionUpgrade.mana||0)*.09;return[Math.round(35*m),Math.round(55*m)]}

/* SETTINGS */
function renderSettings(){profile.difficulty="normal";resetBtn.textContent="Apagar progresso";resetArmed=false}
function setDifficulty(d){profile.difficulty=d;save();renderSettings();toastMsg(DIFF[d].name)}
function armReset(){
  if(!resetArmed){resetArmed=true;resetBtn.textContent="Clique novamente";clearTimeout(resetTimer);resetTimer=setTimeout(()=>{resetArmed=false;resetBtn.textContent="Apagar progresso"},4500);return}
  localStorage.removeItem(SAVE_KEY);profile=defaultProfile();normalize();save();resetArmed=false;renderSettings();toastMsg("Progresso resetado")
}

function huntDifficultyLevel(ms){return Math.min(10,1+Math.floor(Math.max(0,ms)/60000))}
function huntDifficultyScale(level){
  const n=Math.max(1,Math.min(10,level||1))-1;
  return{life:1+n*.18,damage:1+n*.115,reward:1+n*.12,spawn:Math.max(.57,1-n*.047),action:Math.max(.70,1-n*.033)}
}
function setHuntPaused(paused){
  if(!hunt?.running||hunt.paused===paused)return;
  hunt.paused=paused;
  if(paused){hunt.pauseStarted=performance.now();pauseCover.classList.remove("hidden")}
  else{hunt.totalPaused+=performance.now()-hunt.pauseStarted;hunt.lastTick=performance.now();pauseCover.classList.add("hidden")}
  const p=paused?"play":"pause";pauseIcon.dataset.pixelIcon=p;pauseIcon.style.backgroundImage=`url(${pixelIconData(p)})`;pauseLabel.textContent=paused?"PLAY":"PAUSE"
}
function pauseForModal(id){
  if(!hunt?.running){modalAutoPause[id]=false;return}
  modalAutoPause[id]=!hunt.paused;
  if(!hunt.paused)setHuntPaused(true)
}
function resumeAfterModal(id){
  const shouldResume=!!modalAutoPause[id];modalAutoPause[id]=false;
  if(shouldResume&&hunt?.running&&hunt.paused)setHuntPaused(false)
}

/* HUNT */
function startHunt(kind){
  closeAllModals();
  pauseCover.classList.add("hidden");pauseIcon.dataset.pixelIcon="pause";pauseIcon.style.backgroundImage=`url(${pixelIconData("pause")})`;pauseLabel.textContent="PLAY / PAUSE";
  if(profile.life<=0)profile.life=maxLife();
  if(profile.mana<0)profile.mana=0;
  save();
  const m=MONSTERS[kind],now=performance.now();
  hunt={
    mode:"hunt",kind,m,start:now,lastTick:now,elapsed:0,nextSpawn:700,monsters:[],projectiles:[],floats:[],effects:[],shake:0,
    id:1,running:true,paused:false,pauseStarted:0,totalPaused:0,
    hero:{r:6,c:2,moveCd:0,dir:"up",attackUntil:0,castUntil:0},decor:buildDecor(kind),attackCd:100,holyCd:0,masHolyCd:0,speedCd:0,speedUntil:0,potionCd:0,
    kills:0,xp:0,gold:0,drops:0,lastNoAmmo:0,difficultyLevel:1,lastDifficultyLevel:1
  };
  document.querySelectorAll("body>section").forEach(s=>s.classList.add("hidden"));huntScene.classList.remove("hidden");lastScene="huntScene";
  canvas=document.getElementById("gameCanvas");ctx=canvas.getContext("2d");resizeCanvas();window.addEventListener("resize",resizeCanvas);
  canvas.onclick=handleCanvasMove;
  ensureSelectedArrow();renderHuntHud();requestAnimationFrame(huntLoop)
}
function startBoss(kind){
  closeAllModals();if(profile.life<=0)profile.life=maxLife();if(profile.mana<0)profile.mana=0;save();const b=BOSSES[kind],now=performance.now();
  const boss={id:1,r:1,c:1,w:2,h:1,life:b.life,maxLife:b.life,alive:true,isBoss:true,stationary:true,spriteKind:kind,damage:b.damage,attackCd:850,specialCd:2600,hitFlash:0,deathAt:0,dir:"down",attackUntil:0};
  const mons=[boss];if(kind==="balthazar"){mons.push({id:2,r:3,c:0,w:1,h:1,life:190,maxLife:190,alive:true,isSummon:true,spriteKind:"skeleton",damage:[8,12],moveCd:500,attackCd:700,hitFlash:0,deathAt:0,dir:"down",attackUntil:0},{id:3,r:3,c:4,w:1,h:1,life:190,maxLife:190,alive:true,isSummon:true,spriteKind:"skeleton",damage:[8,12],moveCd:650,attackCd:850,hitFlash:0,deathAt:0,dir:"down",attackUntil:0})}
  hunt={mode:"boss",kind,bossKind:kind,m:{name:b.name,life:b.life,damage:b.damage,xp:b.xp,gold:b.gold,spawnMs:999999,moveMs:999999,attackMs:1600},start:now,lastTick:now,elapsed:0,nextSpawn:999999,monsters:mons,projectiles:[],floats:[],effects:[],shake:0,id:4,running:true,paused:false,pauseStarted:0,totalPaused:0,hero:{r:6,c:2,moveCd:0,dir:"up",attackUntil:0,castUntil:0},decor:buildDecor(kind),attackCd:120,holyCd:0,masHolyCd:0,speedCd:0,speedUntil:0,potionCd:0,kills:0,xp:0,gold:0,drops:0,lastNoAmmo:0,difficultyLevel:1,lastDifficultyLevel:1};
  document.querySelectorAll("body>section").forEach(x=>x.classList.add("hidden"));huntScene.classList.remove("hidden");lastScene="huntScene";pauseCover.classList.add("hidden");pauseIcon.dataset.pixelIcon="pause";pauseIcon.style.backgroundImage=`url(${pixelIconData("pause")})`;pauseLabel.textContent="PLAY / PAUSE";canvas=document.getElementById("gameCanvas");ctx=canvas.getContext("2d");resizeCanvas();window.addEventListener("resize",resizeCanvas);canvas.onclick=handleCanvasMove;ensureSelectedArrow();renderHuntHud();requestAnimationFrame(huntLoop)
}
function closeBossVictory(){bossVictoryModal.classList.add("hidden");if(hunt)stopHunt(false);profile.life=maxLife();profile.mana=maxMana();save();hunt=null;openScene("bossSelectScene")}
function completeBoss(mon){
  if(!hunt?.running)return;const b=BOSSES[hunt.bossKind],xp=b.xp,gold=rand(b.gold[0],b.gold[1]);hunt.xp+=xp;hunt.gold+=gold;profile.gold+=gold;profile.stats.totalGold+=gold;profile.stats.kills++;addXp(xp);save();hunt.running=false;window.removeEventListener("resize",resizeCanvas);bossVictoryText.textContent=`${b.name} foi derrotado. Recompensa: ${xp} XP e ${gold} Gold.`;setTimeout(()=>bossVictoryModal.classList.remove("hidden"),120)
}
function stopHunt(saveState=true){
  if(!hunt)return;hunt.running=false;if(saveState)save();window.removeEventListener("resize",resizeCanvas);if(canvas)canvas.onclick=null
}
function exitHunt(){if(!hunt)return;const dest=hunt.mode==="boss"?"bossSelectScene":"huntSelectScene";stopHunt(true);profile.life=Math.min(maxLife(),Math.max(1,profile.life));save();hunt=null;openScene(dest)}
function closeDeath(){
  deathModal.classList.add("hidden");
  if(hunt)stopHunt(false);
  profile.life=maxLife();
  profile.mana=maxMana();
  save();
  hunt=null;
  openScene("homeScene");
}
function togglePause(){if(!hunt?.running)return;setHuntPaused(!hunt.paused)}
function resizeCanvas(){
  if(!canvas)return;
  const rect=battlebox.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);
  canvasW=Math.max(320,Math.floor(rect.width));canvasH=Math.max(360,Math.floor(rect.height));
  canvas.width=Math.floor(canvasW*dpr);canvas.height=Math.floor(canvasH*dpr);
  canvas.style.width=canvasW+"px";canvas.style.height=canvasH+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0)
}
function huntLoop(now){
  if(!hunt?.running)return;
  const dt=Math.min(100,now-hunt.lastTick);hunt.lastTick=now;
  if(!hunt.paused)updateHunt(dt,now);
  drawScene(now);renderHuntHud();if(hunt.running)requestAnimationFrame(huntLoop)
}
function updateHunt(dt,now){
  hunt.elapsed=now-hunt.start-hunt.totalPaused;
  if(hunt.mode==="boss"){updateBossBattle(dt,now);return}
  const newDifficulty=huntDifficultyLevel(hunt.elapsed);
  if(newDifficulty!==hunt.difficultyLevel){
    hunt.lastDifficultyLevel=hunt.difficultyLevel;hunt.difficultyLevel=newDifficulty;
    toastMsg(`Hunt Difficulty NV.${newDifficulty}`);
    hunt.effects.push({type:"difficulty",r:hunt.hero.r,c:hunt.hero.c,start:now,duration:700})
  }
  const hs=huntDifficultyScale(hunt.difficultyLevel);
  profile.mana=Math.min(maxMana(),profile.mana+2.0*dt/1000);
  profile.life=Math.min(maxLife(),profile.life+.22*dt/1000);
  hunt.attackCd-=dt;hunt.holyCd-=dt;hunt.masHolyCd-=dt;hunt.speedCd-=dt;hunt.potionCd-=dt;hunt.hero.moveCd-=dt;
  hunt.nextSpawn-=dt;
  const accel=1+Math.min(1.15,hunt.elapsed/150000);
  if(hunt.nextSpawn<=0){spawnMonster();hunt.nextSpawn=Math.max(520,hunt.m.spawnMs*hs.spawn/accel)}
  const speedFactor=now<hunt.speedUntil?.95:1;
  if(hunt.attackCd<=0){autoAttack(now);hunt.attackCd+=attackInterval()*speedFactor}
  for(const mon of hunt.monsters.filter(x=>x.alive)){
    mon.moveCd-=dt;mon.attackCd-=dt;
    const d=distSqm(mon,hunt.hero);
    if(d===1){if(mon.attackCd<=0){monsterAttack(mon);mon.attackCd+=hunt.m.attackMs*hs.action}}
    else if(mon.moveCd<=0){moveMonster(mon);mon.moveCd+=hunt.m.moveMs*hs.action}
  }
  for(const p of hunt.projectiles){p.t+=dt/p.duration;if(p.t>=1&&!p.hit){p.hit=true;p.onHit?.()}}
  hunt.projectiles=hunt.projectiles.filter(p=>p.t<1.08);
  for(const f of hunt.floats){f.age+=dt}hunt.floats=hunt.floats.filter(f=>f.age<700);
  hunt.monsters=hunt.monsters.filter(m=>m.alive||now-m.deathAt<420);
  if(profile.life<=0){
    profile.life=0;hunt.running=false;window.removeEventListener("resize",resizeCanvas);save();
    deathText.textContent=`Você chegou ao Nível ${hunt.difficultyLevel} da hunt, ficou ${fmtTime(hunt.elapsed)}, matou ${hunt.kills} criatura(s) e manteve XP, Gold e loot. Ao voltar ao menu, Life e Mana serão restaurados.`;
    deathModal.classList.remove("hidden")
  }
}
function entityCells(e){const out=[];for(let rr=0;rr<(e.h||1);rr++)for(let cc=0;cc<(e.w||1);cc++)out.push({r:e.r+rr,c:e.c+cc});return out}
function updateTimedEffects(now){
  for(const e of hunt.effects){if(e.applied||!e.delay)continue;if(now-e.start>=e.delay){e.applied=true;if(e.cells?.some(x=>x.r===hunt.hero.r&&x.c===hunt.hero.c))hurtHero(e.damage,e.damageType||"hurt");hunt.shake=Math.max(hunt.shake||0,5)}}
}
function bossTargetCells(center,radius=1){const cells=[];for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)if(Math.abs(r-center.r)+Math.abs(c-center.c)<=radius)cells.push({r,c});return cells}
function updateBossBattle(dt,now){
  profile.mana=Math.min(maxMana(),profile.mana+2*dt/1000);profile.life=Math.min(maxLife(),profile.life+.18*dt/1000);hunt.attackCd-=dt;hunt.holyCd-=dt;hunt.masHolyCd-=dt;hunt.speedCd-=dt;hunt.potionCd-=dt;hunt.hero.moveCd-=dt;
  const speedFactor=now<hunt.speedUntil?.95:1;if(hunt.attackCd<=0){autoAttack(now);hunt.attackCd+=attackInterval()*speedFactor}
  const boss=hunt.monsters.find(m=>m.alive&&m.isBoss);
  for(const mon of hunt.monsters.filter(x=>x.alive&&!x.isBoss)){mon.moveCd-=dt;mon.attackCd-=dt;const d=distSqm(mon,hunt.hero);if(d===1){if(mon.attackCd<=0){monsterAttack(mon);mon.attackCd+=1050}}else if(mon.moveCd<=0){moveMonster(mon);mon.moveCd+=760}}
  if(boss){boss.attackCd-=dt;boss.specialCd-=dt;if(boss.attackCd<=0){boss.attackUntil=now+360;bossBasicCast(boss,now);boss.attackCd+=hunt.bossKind==="moroheus"?1750:2150}if(boss.specialCd<=0){boss.attackUntil=now+520;bossSpecialCast(boss,now);boss.specialCd+=hunt.bossKind==="moroheus"?4600:4200}}
  for(const p of hunt.projectiles){p.t+=dt/p.duration;if(p.t>=1&&!p.hit){p.hit=true;p.onHit?.()}}hunt.projectiles=hunt.projectiles.filter(p=>p.t<1.08);for(const f of hunt.floats)f.age+=dt;hunt.floats=hunt.floats.filter(f=>f.age<700);updateTimedEffects(now);hunt.monsters=hunt.monsters.filter(m=>m.alive||now-m.deathAt<520);
  if(profile.life<=0){profile.life=0;hunt.running=false;window.removeEventListener("resize",resizeCanvas);save();deathText.textContent=`${BOSSES[hunt.bossKind].name} venceu o confronto. Ao voltar ao menu, Life e Mana serão restaurados.`;deathModal.classList.remove("hidden")}
}
function bossBasicCast(boss,now){
  const target={r:hunt.hero.r,c:hunt.hero.c,w:1,h:1};if(hunt.bossKind==="moroheus"){shootProjectile(boss,target,"boss_fireball",520,()=>{if(hunt.hero.r===target.r&&hunt.hero.c===target.c)hurtHero(rand(25,36));hunt.effects.push({type:"fireImpact",r:target.r,c:target.c,start:performance.now(),duration:480})})}
  else{shootProjectile(boss,target,"necro_bolt",600,()=>{if(distSqm(hunt.hero,target)<=0)hurtHero(rand(20,29));hunt.effects.push({type:"necroImpact",r:target.r,c:target.c,start:performance.now(),duration:420})})}
}
function bossSpecialCast(boss,now){
  const center={r:hunt.hero.r,c:hunt.hero.c};if(hunt.bossKind==="moroheus"){const cells=bossTargetCells(center,1);hunt.effects.push({type:"infernoAoE",r:center.r,c:center.c,cells,start:now,duration:1500,delay:900,damage:rand(32,44)})}
  else{const cells=bossTargetCells(center,1);hunt.effects.push({type:"necroAoE",r:center.r,c:center.c,cells,start:now,duration:1550,delay:850,damage:rand(27,39)})}
}
function distSqm(a,b){let best=999;for(const ca of entityCells(a))for(const cb of entityCells(b))best=Math.min(best,Math.abs(ca.r-cb.r)+Math.abs(ca.c-cb.c));return best}
function monsterAt(r,c){return hunt.monsters.find(m=>m.alive&&entityCells(m).some(x=>x.r===r&&x.c===c))}
function occupied(r,c){return !!monsterAt(r,c)||(hunt.hero.r===r&&hunt.hero.c===c)}
function entityCenter(e){const g=gridGeom();return{x:g.left+(e.c+(e.w||1)/2)*g.cw,y:g.top+(e.r+(e.h||1)/2)*g.ch}}
function spawnMonster(){
  const free=[];for(let c=0;c<COLS;c++)if(!occupied(0,c))free.push(c);if(!free.length)return;
  const c=free[Math.floor(Math.random()*free.length)],m=hunt.m,hs=huntDifficultyScale(hunt.difficultyLevel),max=Math.round(m.life*hs.life);
  hunt.monsters.push({id:hunt.id++,r:0,c,life:max,maxLife:max,alive:true,moveCd:350+Math.random()*300,attackCd:600+Math.random()*350,hitFlash:0,bob:Math.random()*6.28,deathAt:0,dir:"down",attackUntil:0})
}
function moveMonster(mon){
  if(mon.stationary)return;const target=hunt.hero,candidates=[];
  for(const [dr,dc] of [[1,0],[0,-1],[0,1],[-1,0]]){
    const r=mon.r+dr,c=mon.c+dc;if(r<0||r>=ROWS||c<0||c>=COLS||occupied(r,c))continue;
    candidates.push({r,c,d:Math.abs(r-target.r)+Math.abs(c-target.c),bias:Math.random()*.15})
  }
  if(!candidates.length)return;
  candidates.sort((a,b)=>(a.d+a.bias)-(b.d+b.bias));const best=candidates[0];
  if(best.d<=distSqm(mon,target)+1){const dr=best.r-mon.r,dc=best.c-mon.c;mon.dir=dc<0?"left":dc>0?"right":dr<0?"up":"down";mon.r=best.r;mon.c=best.c}
}
function nearestMonster(){
  return hunt.monsters.filter(m=>m.alive).sort((a,b)=>distSqm(a,hunt.hero)-distSqm(b,hunt.hero))[0]||null
}
function ensureSelectedArrow(){
  if(profile.selectedArrow&&countItem(profile.selectedArrow)>0)return profile.selectedArrow;
  const next=ARROW_ORDER.find(id=>countItem(id)>0)||null;
  if(next&&profile.selectedArrow!==next){profile.selectedArrow=next;save()}
  return next
}
function faceHero(target){const tc=target.c+((target.w||1)-1)/2,tr=target.r+((target.h||1)-1)/2,dr=tr-hunt.hero.r,dc=tc-hunt.hero.c;hunt.hero.dir=Math.abs(dc)>Math.abs(dr)?(dc<0?"left":"right"):(dr<0?"up":"down")}
function autoAttack(now){
  const target=nearestMonster();if(!target)return;
  const arrow=ensureSelectedArrow();
  if(!arrow){
    if(now-hunt.lastNoAmmo>2500){toastMsg("Sem arrows");hunt.lastNoAmmo=now}
    return
  }
  consumeItem(arrow,1);addSkillTry("distance",.15);save();
  faceHero(target);hunt.hero.attackUntil=now+190;const data=ARROW_DATA[arrow],dmg=Math.round(baseAttack()*data.mult*(.88+Math.random()*.24));
  shootProjectile(hunt.hero,target,arrow,arrow==="explosion_arrow"?250:220,()=>{
    if(!target.alive)return;
    damageMonster(target,dmg,false);
    if(data.aoe){
      for(const other of hunt.monsters.filter(m=>m.alive&&m.id!==target.id&&distSqm(m,target)<=1))damageMonster(other,Math.round(dmg*.68),false);
      hunt.effects.push({type:"blast",r:target.r,c:target.c,start:performance.now(),duration:360})
    }
  });
  if(countItem(arrow)<=0){
    const next=ARROW_ORDER.find(id=>countItem(id)>0);if(next){profile.selectedArrow=next;toastMsg(`${ARROW_DATA[arrow].name} acabou • ${ARROW_DATA[next].name} equipado`);save()}
  }
}
function shootProjectile(from,target,type,duration,onHit,meta={}){const a=entityCenter(from),b=entityCenter(target);hunt.projectiles.push({from:a,to:b,type,t:0,duration,onHit,hit:false,...meta})}
function damageMonster(mon,dmg,holy=false){if(!mon.alive)return;mon.life-=dmg;mon.hitFlash=performance.now()+140;const now=performance.now();hunt.effects.push({type:holy?"holyImpact":"hitSpark",r:mon.r,c:mon.c,w:mon.w||1,start:now,duration:holy?380:240});hunt.shake=Math.max(hunt.shake||0,holy?3:1.5);floatText(mon.r,mon.c,`-${dmg}`,holy?"holy":"damage");if(mon.life<=0)killMonster(mon)}
function killMonster(mon){
  if(!mon.alive)return;mon.alive=false;mon.life=0;mon.deathAt=performance.now();hunt.kills++;
  if(mon.isBoss){completeBoss(mon);return}
  if(mon.isSummon){const xp=24,gold=8;hunt.xp+=xp;hunt.gold+=gold;profile.gold+=gold;profile.stats.totalGold+=gold;profile.stats.kills++;addXp(xp);save();return}
  profile.stats.kills++;const hs=huntDifficultyScale(hunt.difficultyLevel),xp=Math.round(hunt.m.xp*hs.reward*(.9+Math.random()*.2)),gold=Math.max(1,Math.round(rand(hunt.m.gold[0],hunt.m.gold[1])*hs.reward));hunt.xp+=xp;hunt.gold+=gold;profile.gold+=gold;profile.stats.totalGold+=gold;addXp(xp);dropRoll(mon);save()
}
function hurtHero(raw,type="hurt"){
  const dmg=Math.max(1,Math.round(raw-armor()*.32));profile.life-=dmg;hunt.shake=Math.max(hunt.shake||0,4);hunt.effects.push({type:"heroHit",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:300});floatText(hunt.hero.r,hunt.hero.c,`-${dmg}`,type);addSkillTry("shielding",.08);return dmg
}
function monsterAttack(mon){mon.attackUntil=performance.now()+260;const range=mon.damage||hunt.m.damage,scale=hunt.mode==="boss"?1:huntDifficultyScale(hunt.difficultyLevel).damage;hurtHero(rand(range[0],range[1])*scale)}
function dropRoll(mon){
  const r=Math.random();
  if(r<.025){addToBp("health_potion",1);hunt.drops++;toastMsg("🧪 Health Potion")}
  else if(r<.05){addToBp("mana_potion",1);hunt.drops++;toastMsg("🔷 Mana Potion")}
  else if(r<.12){addToBp("wood_arrow",rand(4,10));hunt.drops++}
  else if(r<.17){addToBp("iron_arrow",rand(2,5));hunt.drops++}
  else if(r<.195){addToBp("steel_arrow",rand(1,3));hunt.drops++}
  else if(r<.205){addToBp("explosion_arrow",1);hunt.drops++}
  else if(r<.23){
    const pool=Object.values(ITEMS).filter(it=>SLOTS.includes(it.type)&&it.rarity!=="legendary");
    const it=pool[Math.floor(Math.random()*pool.length)];if(addToBp(it.id,1)){hunt.drops++;toastMsg(`${it.name}`)}
  }
}
function castHolyBolt(){
  if(!hunt?.running||hunt.paused||hunt.holyCd>0||profile.mana<18)return;
  const target=nearestMonster();if(!target)return;
  faceHero(target);hunt.hero.castUntil=performance.now()+260;profile.mana-=18;hunt.holyCd=2200;addSkillTry("magic",.45);
  const dmg=Math.round((magicPower()*2.15+baseAttack()*.42)*(.92+Math.random()*.18));
  shootProjectile(hunt.hero,target,"holy",250,()=>{if(target.alive)damageMonster(target,dmg,true)});save()
}
function castMasHoly(){
  if(!hunt?.running||hunt.paused||hunt.masHolyCd>0||profile.mana<35)return;
  hunt.hero.castUntil=performance.now()+320;profile.mana-=35;hunt.masHolyCd=5200;addSkillTry("magic",.65);
  const dmg=Math.round(magicPower()*1.75+profile.level*1.2);
  hunt.effects.push({type:"masHoly",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:520});
  for(const m of hunt.monsters.filter(m=>m.alive&&distSqm(m,hunt.hero)<=2))damageMonster(m,Math.round(dmg*(.9+Math.random()*.2)),true);
  save()
}
function castSpeed(){
  if(!hunt?.running||hunt.paused||hunt.speedCd>0||profile.mana<25)return;
  hunt.hero.castUntil=performance.now()+280;profile.mana-=25;hunt.speedCd=9000;hunt.speedUntil=performance.now()+6000;hunt.effects.push({type:"speedBurst",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:560});addSkillTry("magic",.35);save()
}
function useHealthPotion(){
  if(!hunt?.running||hunt.paused||hunt.potionCd>0||countItem("health_potion")<=0||profile.life>=maxLife())return;
  const [a,b]=hpRange(),v=rand(a,b);consumeItem("health_potion",1);profile.life=Math.min(maxLife(),profile.life+v);hunt.potionCd=450;hunt.effects.push({type:"potionHp",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:620});floatText(hunt.hero.r,hunt.hero.c,`+${v}`,"heal");save()
}
function useManaPotion(){
  if(!hunt?.running||hunt.paused||hunt.potionCd>0||countItem("mana_potion")<=0||profile.mana>=maxMana())return;
  const [a,b]=mpRange(),v=rand(a,b);consumeItem("mana_potion",1);profile.mana=Math.min(maxMana(),profile.mana+v);hunt.potionCd=450;hunt.effects.push({type:"potionMp",r:hunt.hero.r,c:hunt.hero.c,start:performance.now(),duration:620});floatText(hunt.hero.r,hunt.hero.c,`+${v}`,"mana");save()
}
function handleCanvasMove(ev){
  if(!hunt?.running||hunt.paused||hunt.hero.moveCd>0)return;
  const rect=canvas.getBoundingClientRect(),x=ev.clientX-rect.left,y=ev.clientY-rect.top,cell=pointToCell(x,y);if(!cell)return;
  if(distSqm(cell,hunt.hero)!==1||occupied(cell.r,cell.c))return;
  const dr=cell.r-hunt.hero.r,dc=cell.c-hunt.hero.c;hunt.hero.dir=dc<0?"left":dc>0?"right":dr<0?"up":"down";hunt.hero.r=cell.r;hunt.hero.c=cell.c;hunt.hero.moveCd=360
}
function pointToCell(x,y){
  const g=gridGeom(),c=Math.floor((x-g.left)/g.cw),r=Math.floor((y-g.top)/g.ch);
  if(r<0||r>=ROWS||c<0||c>=COLS)return null;return{r,c}
}
function rand(a,b){return Math.floor(a+Math.random()*(b-a+1))}
function fmtTime(ms){const s=Math.floor(ms/1000),m=Math.floor(s/60);return`${String(m).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`}
function floatText(r,c,text,type){hunt.floats.push({r,c,text,type,age:0})}

/* ARROW SELECTOR */
function openArrowModal(){
  if(!hunt)return;renderArrowList();arrowModal.classList.remove("hidden")
}
function renderArrowList(){
  arrowList.innerHTML="";
  for(const id of ARROW_ORDER){
    const a=ARROW_DATA[id],count=countItem(id),d=document.createElement("div");d.className=`arrow-option ${profile.selectedArrow===id?"selected":""}`;
    d.innerHTML=`<div class="ai"><span class="pixel-icon" data-pixel-icon="${id}"></span></div><div><b>${a.name}</b><small>${a.desc}</small></div><strong>${count}</strong>`;
    d.onclick=()=>{if(count<=0)return toastMsg("Você não possui esta arrow");profile.selectedArrow=id;save();renderArrowList();renderHuntHud()};
    arrowList.appendChild(d)
  }
}
function openHuntBackpack(){pauseForModal("backpackModal");renderBackpack(huntBackpack,false);backpackModal.classList.remove("hidden")}
function openCharacterInfo(){
  pauseForModal("characterModal");
  characterInfo.innerHTML=`
  <div class="info-box"><label>Level</label><b>${profile.level}</b></div>
  <div class="info-box"><label>Distance</label><b>${profile.skills.distance.level}</b></div>
  <div class="info-box"><label>Magic</label><b>${profile.skills.magic.level}</b></div>
  <div class="info-box"><label>Shielding</label><b>${profile.skills.shielding.level}</b></div>
  <div class="info-box"><label>ATK</label><b>${Math.round(baseAttack())}</b></div>
  <div class="info-box"><label>Armor</label><b>${armor()}</b></div>
  <div class="info-box"><label>Attack Rate</label><b>${attacksPerSecond().toFixed(2)}/s</b></div>
  <div class="info-box"><label>Gold</label><b>${profile.gold}</b></div>`;
  characterModal.classList.remove("hidden")
}
function openHuntConfig(){if(!hunt)return;pauseForModal("huntConfigModal");if(hunt.mode==="boss"){const b=BOSSES[hunt.bossKind],boss=hunt.monsters.find(m=>m.isBoss);huntConfigInfo.innerHTML=`<div class="info-box"><label>Boss</label><b>${b.name}</b></div><div class="info-box"><label>Life</label><b>${Math.max(0,Math.round(boss?.life||0))}/${boss?.maxLife||b.life}</b></div><div class="info-box"><label>Room</label><b>Sem respawn</b></div><div class="info-box"><label>Mecânica</label><b>${hunt.bossKind==="moroheus"?"Fire / AoE":"Necro / AoE"}</b></div>`}else{const hs=huntDifficultyScale(hunt.difficultyLevel);huntConfigInfo.innerHTML=`<div class="info-box"><label>Dificuldade</label><b>NV.${hunt.difficultyLevel}/10</b></div><div class="info-box"><label>Próximo nível</label><b>${hunt.difficultyLevel>=10?"MAX":Math.max(0,60-Math.floor((hunt.elapsed%60000)/1000))+"s"}</b></div><div class="info-box"><label>Life monstros</label><b>×${hs.life.toFixed(2)}</b></div><div class="info-box"><label>Dano monstros</label><b>×${hs.damage.toFixed(2)}</b></div>`}huntConfigModal.classList.remove("hidden")}
function exitHuntFromConfig(){modalAutoPause.huntConfigModal=false;huntConfigModal.classList.add("hidden");exitHunt()}
function closeModal(id){document.getElementById(id).classList.add("hidden");resumeAfterModal(id)}

/* HUD */
function renderHuntHud(){
  if(!hunt)return;
  const lifePct=Math.max(0,Math.min(100,profile.life/maxLife()*100)),manaPct=Math.max(0,Math.min(100,profile.mana/maxMana()*100)),xpPct=Math.max(0,Math.min(100,profile.xp/xpNeed()*100));
  lifeFill.style.height=`${lifePct}%`;manaFill.style.height=`${manaPct}%`;xpFill.style.width=`${xpPct}%`;
  lifeText.textContent=`${Math.max(0,Math.round(profile.life))}/${maxLife()}`;manaText.textContent=`${Math.round(profile.mana)}/${maxMana()}`;xpText.textContent=`${profile.xp} / ${xpNeed()}`;huntLevelText.textContent=`LV.${profile.level}`;
  huntTitle.textContent=`${hunt.m.name} • ${WORLD_NAMES[hunt.kind]||"Boss Room"}`;huntMeta.textContent=hunt.mode==="boss"?`${fmtTime(hunt.elapsed)} • BOSS ENCOUNTER • +${hunt.xp} XP`:`${fmtTime(hunt.elapsed)} • ${hunt.kills} kills • +${hunt.xp} XP`;
  huntDifficultyText.textContent=hunt.mode==="boss"?"BOSS":`NV.${hunt.difficultyLevel}`;
  huntDifficultyProgress.style.width=hunt.mode==="boss"?"100%":(hunt.difficultyLevel>=10?"100%":`${(hunt.elapsed%60000)/600}%`);
  const hp=countItem("health_potion"),mp=countItem("mana_potion");hpCount.textContent=hp;mpCount.textContent=mp;
  hpBtn.disabled=hp<=0;mpBtn.disabled=mp<=0;hpBtn.classList.toggle("unavailable",hp<=0);mpBtn.classList.toggle("unavailable",mp<=0);
  const selected=ensureSelectedArrow(),a=ARROW_DATA[selected]||{name:"Sem Arrow",icon:"🏹"};
  arrowIcon.dataset.pixelIcon=selected||"wood_arrow";arrowIcon.style.backgroundImage=`url(${pixelIconData(selected||"wood_arrow")})`;arrowName.textContent=a.name;arrowCount.textContent=selected?countItem(selected):0;
  arrowBtn.disabled=!selected;arrowBtn.classList.toggle("unavailable",!selected);
  holyBtn.disabled=hunt.holyCd>0||profile.mana<18;masHolyBtn.disabled=hunt.masHolyCd>0||profile.mana<35;speedBtn.disabled=hunt.speedCd>0||profile.mana<25;
  holyBtn.classList.toggle("unavailable",profile.mana<18);masHolyBtn.classList.toggle("unavailable",profile.mana<35);speedBtn.classList.toggle("unavailable",profile.mana<25);
  renderCd(holyCd,hunt.holyCd);renderCd(masHolyCd,hunt.masHolyCd);renderCd(speedCd,hunt.speedCd);speedRing.classList.toggle("hidden",performance.now()>=hunt.speedUntil)
}
function renderCd(el,v){if(v>0){el.classList.remove("hidden");el.textContent=(v/1000).toFixed(1)}else el.classList.add("hidden")}

/* DRAWING — PIXEL WORLD */
function gridGeom(){
  const padX=8,top=66,bottom=30;return{left:padX,top,cw:(canvasW-padX*2)/COLS,ch:(canvasH-top-bottom)/ROWS}
}
function cellCenter(r,c){const g=gridGeom();return{x:g.left+(c+.5)*g.cw,y:g.top+(r+.5)*g.ch}}
function cellHash(r,c){let x=(r+1)*92821+(c+3)*68917+(hunt?.kind?.length||1)*7717;x=(x^(x>>13))*1274126177;return Math.abs(x)%1000}
function buildDecor(kind){
  const sets={
    troll:[{r:1,c:0,t:"rock"},{r:2,c:4,t:"torch"},{r:4,c:4,t:"bones"},{r:5,c:0,t:"chest"},{r:1,c:3,t:"blood"}],
    orc:[{r:1,c:0,t:"fence"},{r:2,c:4,t:"banner"},{r:4,c:0,t:"chest"},{r:3,c:3,t:"blood"},{r:5,c:4,t:"torch"}],
    minotaur:[{r:1,c:0,t:"banner"},{r:1,c:4,t:"banner"},{r:3,c:0,t:"torch"},{r:3,c:4,t:"torch"},{r:1,c:2,t:"shrine"}],
    dragon:[{r:1,c:0,t:"bones"},{r:2,c:4,t:"lava"},{r:4,c:0,t:"rock"},{r:5,c:4,t:"portal"},{r:3,c:3,t:"blood"}],
    moroheus:[{r:0,c:0,t:"torch"},{r:0,c:4,t:"torch"},{r:3,c:0,t:"blood"},{r:3,c:4,t:"lava"},{r:5,c:0,t:"bones"},{r:5,c:4,t:"bones"}],
    balthazar:[{r:0,c:0,t:"bones"},{r:0,c:4,t:"bones"},{r:2,c:0,t:"torch"},{r:2,c:4,t:"torch"},{r:5,c:0,t:"shrine"},{r:5,c:4,t:"portal"}]
  };return sets[kind]||[]
}
function drawScene(now){if(!ctx||!hunt)return;ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,canvasW,canvasH);const sh=hunt.shake||0,dx=sh?(Math.random()-.5)*sh*2:0,dy=sh?(Math.random()-.5)*sh*2:0;hunt.shake=Math.max(0,sh*.82-.08);ctx.save();ctx.translate(dx,dy);drawBackground(now);drawGrid();drawDecor();drawEffects(now);for(const m of hunt.monsters)drawMonster(m,now);drawPaladin(now);drawProjectiles(now);drawFloats(now);ctx.restore()}
function drawBackground(now){
  const palettes={troll:["#111013","#08070a"],orc:["#16130d","#08070a"],minotaur:["#15101a","#08070a"],dragon:["#190b0d","#090609"]};
  const [a,b]=palettes[hunt.kind]||palettes.troll,g=ctx.createLinearGradient(0,0,0,canvasH);g.addColorStop(0,a);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillRect(0,0,canvasW,canvasH)
}
function drawWorldTile(r,c,g){
  const x=g.left+c*g.cw,y=g.top+r*g.ch,w=g.cw,h=g.ch,H=cellHash(r,c);
  let base="#252127",hi="#312b31",dot="#40343e";
  if(hunt.kind==="orc"){base=H%4===0?"#34331d":"#3a2b19";hi="#55502a";dot="#6b5530"}
  else if(hunt.kind==="minotaur"){base="#29252c";hi="#3b353f";dot="#19161c";if(c===2){base="#422044";hi="#6a2f65";dot="#b48735"}}
  else if(hunt.kind==="dragon"){base="#26191b";hi="#3a2424";dot="#6b2820"}
  else if(hunt.kind==="moroheus"){base=H%4===0?"#321417":"#241013";hi="#4c1c22";dot="#8c2a25"}
  else if(hunt.kind==="balthazar"){base=H%3===0?"#21152b":"#18121f";hi="#352243";dot="#683a7a"}
  else{base="#28262a";hi="#39363a";dot="#151417"}
  ctx.fillStyle=base;ctx.fillRect(x,y,w,h);ctx.fillStyle=hi;ctx.fillRect(x+1,y+1,w-2,Math.max(2,h*.08));
  ctx.fillStyle=dot;
  for(let i=0;i<4;i++){const xx=x+((H*(i+3)+i*17)%89)/100*w,yy=y+((H*(i+7)+i*31)%83)/100*h;ctx.fillRect(Math.floor(xx),Math.floor(yy),Math.max(1,Math.floor(w/40)),Math.max(1,Math.floor(h/40)))}
  if((hunt.kind==="dragon"||hunt.kind==="moroheus")&&H%5===0){ctx.strokeStyle="#b34224";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+w*.15,y+h*.7);ctx.lineTo(x+w*.48,y+h*.48);ctx.lineTo(x+w*.8,y+h*.62);ctx.stroke();ctx.strokeStyle="#ef8a2d";ctx.lineWidth=1;ctx.stroke()}
  if(hunt.kind==="minotaur"&&c===2){ctx.fillStyle="#d0a23e";ctx.fillRect(x+w*.08,y,w*.03,h);ctx.fillRect(x+w*.89,y,w*.03,h)}
}
function drawGrid(){
  const g=gridGeom();for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){drawWorldTile(r,c,g);ctx.strokeStyle="rgba(211,165,72,.17)";ctx.lineWidth=1;ctx.strokeRect(Math.floor(g.left+c*g.cw)+.5,Math.floor(g.top+r*g.ch)+.5,Math.floor(g.cw)-1,Math.floor(g.ch)-1)}
  ctx.save();ctx.strokeStyle="rgba(162,91,202,.48)";ctx.lineWidth=2;
  for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){const r=hunt.hero.r+dr,c=hunt.hero.c+dc;if(r<0||r>=ROWS||c<0||c>=COLS||occupied(r,c))continue;const p=cellCenter(r,c);ctx.strokeRect(Math.floor(p.x-g.cw*.40)+.5,Math.floor(p.y-g.ch*.40)+.5,Math.floor(g.cw*.8),Math.floor(g.ch*.8))}ctx.restore()
}
function drawDecor(){for(const d of hunt.decor||[])drawProp(d)}
function drawProp(d){
  const p=cellCenter(d.r,d.c),g=gridGeom(),s=Math.max(1,Math.floor(Math.min(g.cw,g.ch)/20)),ox=Math.floor(p.x-8*s),oy=Math.floor(p.y-8*s);
  ctx.save();ctx.globalAlpha=.88;
  if(d.t==="rock"){pr(ctx,ox,oy,s,4,9,8,5,"#656269");pr(ctx,ox,oy,s,6,7,5,4,"#89858b");pr(ctx,ox,oy,s,8,8,2,2,"#b1abb0")}
  else if(d.t==="bones"){pr(ctx,ox,oy,s,4,9,8,1,PIX.bone);pr(ctx,ox,oy,s,7,6,3,3,PIX.bone);pset(ctx,ox,oy,s,7,7,PIX.ink);pset(ctx,ox,oy,s,9,7,PIX.ink)}
  else if(d.t==="torch"){pr(ctx,ox,oy,s,7,7,2,7,PIX.wood);pr(ctx,ox,oy,s,6,4,4,4,PIX.orange);pr(ctx,ox,oy,s,7,3,2,3,PIX.yellow)}
  else if(d.t==="banner"){pr(ctx,ox,oy,s,6,3,1,11,PIX.gold);pr(ctx,ox,oy,s,7,4,6,7,PIX.purple);pr(ctx,ox,oy,s,9,5,2,5,PIX.gold)}
  else if(d.t==="shrine"){pr(ctx,ox,oy,s,4,9,8,4,"#77737a");pr(ctx,ox,oy,s,6,5,4,5,"#55515b");pr(ctx,ox,oy,s,7,6,2,4,PIX.gold);pr(ctx,ox,oy,s,6,7,4,2,PIX.gold)}
  else if(d.t==="chest"){pr(ctx,ox,oy,s,3,8,10,5,PIX.wood);pr(ctx,ox,oy,s,4,6,8,3,PIX.brown);pr(ctx,ox,oy,s,7,8,2,3,PIX.gold2)}
  else if(d.t==="blood"){for(const [x,y] of [[5,8],[8,7],[10,10],[6,11],[11,6]])pr(ctx,ox,oy,s,x,y,2,1,PIX.red2)}
  else if(d.t==="fence"){for(let x=3;x<14;x+=3)pr(ctx,ox,oy,s,x,6,1,8,PIX.wood);pr(ctx,ox,oy,s,2,8,12,2,PIX.brown)}
  else if(d.t==="portal"){pr(ctx,ox,oy,s,3,4,10,10,"#52415f");pr(ctx,ox,oy,s,4,5,8,8,PIX.purple);pr(ctx,ox,oy,s,6,6,4,6,"#1c0b2a");pr(ctx,ox,oy,s,7,7,2,4,PIX.purple2)}
  else if(d.t==="lava"){pr(ctx,ox,oy,s,3,9,10,4,"#6b231a");pr(ctx,ox,oy,s,5,8,2,3,PIX.orange);pr(ctx,ox,oy,s,9,9,2,2,PIX.yellow)}
  ctx.restore()
}
function drawMonster(m,now){
  const p=entityCenter(m),g=gridGeom(),alive=m.alive,frame=Math.floor(now/260)%2;
  if(m.isBoss){const s=Math.max(2.2,Math.min(g.ch/22,g.cw/14));ctx.save();if(!alive)ctx.globalAlpha=Math.max(0,1-(now-m.deathAt)/520);if(m.hitFlash>now)ctx.globalAlpha=.58;drawBossPixel(ctx,m.spriteKind,p.x,p.y+4,s,frame,m.attackUntil>now,!alive);ctx.restore();const barW=Math.min(g.cw*1.62,170),barH=9,barY=p.y-10*s-17;ctx.save();ctx.font=`900 ${Math.max(9,Math.floor(s*2.6))}px "Courier New"`;ctx.textAlign="center";ctx.fillStyle="#f2d078";ctx.shadowColor="#000";ctx.shadowBlur=4;ctx.fillText(BOSSES[hunt.bossKind].name,p.x,barY-5);ctx.shadowBlur=0;ctx.fillStyle="#080609";ctx.fillRect(p.x-barW/2,barY,barW,barH);ctx.fillStyle=({moroheus:"#bd2838",balthazar:"#7d3aa0",bhaaz:"#e5b94d",white_orc:"#d8d3c8"}[hunt.bossKind]||"#7d3aa0");ctx.fillRect(p.x-barW/2+1,barY+1,(barW-2)*Math.max(0,m.life/m.maxLife),barH-2);ctx.strokeStyle="#d3a645";ctx.strokeRect(p.x-barW/2+.5,barY+.5,barW-1,barH-1);ctx.restore();return}
  const s=Math.max(1.8,Math.min(g.cw,g.ch)/20);ctx.save();if(!alive)ctx.globalAlpha=Math.max(0,1-(now-m.deathAt)/420);if(m.hitFlash>now)ctx.globalAlpha=.65;drawMonsterPixel(ctx,m.spriteKind||hunt.kind,p.x,p.y+3,s,m.dir||"down",frame,m.attackUntil>now,!alive);ctx.restore();const spriteH=16*s,barW=Math.min(g.cw*.86,94),barH=7,barY=p.y-spriteH*.48-19,name=m.isSummon?(m.summonName||"Bone Servant"):hunt.m.name;ctx.save();ctx.font=`700 ${Math.max(7,Math.floor(s*2.7))}px "Courier New"`;ctx.textAlign="center";ctx.textBaseline="bottom";ctx.fillStyle="#eadfbf";ctx.shadowBlur=3;ctx.shadowColor="#000";ctx.fillText(name,p.x,barY-2);ctx.shadowBlur=0;ctx.fillStyle="#09070b";ctx.fillRect(p.x-barW/2,barY,barW,barH);ctx.fillStyle=m.isSummon?"#71429a":"#a41f37";ctx.fillRect(p.x-barW/2+1,barY+1,(barW-2)*Math.max(0,m.life/m.maxLife),barH-2);ctx.strokeStyle="#c89b3e";ctx.strokeRect(p.x-barW/2+.5,barY+.5,barW-1,barH-1);ctx.restore()
}
function drawPaladin(now){
  const p=cellCenter(hunt.hero.r,hunt.hero.c),g=gridGeom(),s=Math.max(2,Math.min(g.cw,g.ch)/20),frame=Math.floor(now/260)%2;
  if(now<hunt.speedUntil){ctx.save();ctx.globalAlpha=.20;drawPaladinPixel(ctx,p.x-7,p.y+3,s,hunt.hero.dir,frame,false);ctx.globalAlpha=.12;drawPaladinPixel(ctx,p.x-13,p.y+3,s,hunt.hero.dir,frame,false);ctx.restore()}
  drawPaladinPixel(ctx,p.x,p.y+3,s,hunt.hero.dir,frame,hunt.hero.attackUntil>now);
  if(hunt.hero.castUntil>now){ctx.save();ctx.fillStyle="#f0cf72";ctx.globalAlpha=.8;for(const [dx,dy] of [[-12,-10],[12,-8],[-8,9],[10,10]])ctx.fillRect(Math.floor(p.x+dx),Math.floor(p.y+dy),2,2);ctx.restore()}
  const barW=Math.min(g.cw*.68,72),barH=5,barY=p.y-8*s-16;
  ctx.save();ctx.fillStyle="#070509";ctx.fillRect(Math.round(p.x-barW/2),Math.round(barY),Math.round(barW),barH);ctx.fillStyle="#b5243b";ctx.fillRect(Math.round(p.x-barW/2+1),Math.round(barY+1),Math.round((barW-2)*Math.max(0,profile.life/maxLife())),barH-2);ctx.strokeStyle="#d2a64a";ctx.strokeRect(Math.round(p.x-barW/2)+.5,Math.round(barY)+.5,Math.round(barW)-1,barH-1);ctx.restore();
  ctx.font=`700 ${Math.max(7,Math.floor(s*2.4))}px "Courier New"`;ctx.textAlign="center";ctx.fillStyle="#f0cf72";ctx.shadowColor="#000";ctx.shadowBlur=3;ctx.fillText("Paladin",p.x,barY-4);ctx.shadowBlur=0
}
function drawProjectiles(now){
  for(const p of hunt.projectiles){const t=Math.min(1,p.t),x=p.from.x+(p.to.x-p.from.x)*t,y=p.from.y+(p.to.y-p.from.y)*t,ang=Math.atan2(p.to.y-p.from.y,p.to.x-p.from.x);ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(ang);ctx.imageSmoothingEnabled=false;
    if(p.type==="holy"){ctx.globalAlpha=.28;ctx.fillStyle="#a45bd0";ctx.fillRect(-22,-4,24,8);ctx.globalAlpha=1;ctx.fillStyle="#f4cf63";ctx.fillRect(-14,-2,23,4);ctx.fillStyle="#fff5c1";ctx.fillRect(-8,-1,20,2);ctx.fillStyle="#ffffff";ctx.fillRect(8,-2,4,4)}
    else if(p.type==="explosion_arrow"){ctx.fillStyle="#8d2730";ctx.fillRect(-13,-2,17,4);ctx.fillStyle="#e76622";ctx.fillRect(-7,-3,14,6);ctx.fillStyle="#ffd65e";ctx.fillRect(5,-2,5,4)}
    else if(p.type==="steel_arrow"||p.type==="iron_arrow"||p.type==="wood_arrow"){const col=p.type==="wood_arrow"?PIX.wood:p.type==="iron_arrow"?PIX.iron:PIX.steel;ctx.globalAlpha=.28;ctx.fillStyle=p.type==="steel_arrow"?"#b8d9ff":"#b69b79";ctx.fillRect(-17,-1,12,2);ctx.globalAlpha=1;ctx.fillStyle=col;ctx.fillRect(-11,-1,18,2);ctx.fillStyle="#e2e5e6";ctx.fillRect(7,-2,4,4);ctx.fillStyle=p.type==="steel_arrow"?PIX.blue2:PIX.red;ctx.fillRect(-13,-2,3,4)}
    else if(p.type==="boss_fireball"){ctx.globalAlpha=.25;ctx.fillStyle="#e8332b";ctx.fillRect(-22,-5,22,10);ctx.globalAlpha=1;ctx.fillStyle="#a51e29";ctx.fillRect(-7,-6,12,12);ctx.fillStyle="#f06a22";ctx.fillRect(-4,-5,11,10);ctx.fillStyle="#ffe05e";ctx.fillRect(0,-3,8,6)}
    else if(p.type==="necro_bolt"){ctx.globalAlpha=.3;ctx.fillStyle="#713897";ctx.fillRect(-22,-5,24,10);ctx.globalAlpha=1;ctx.fillStyle="#9f56c7";ctx.fillRect(-12,-3,18,6);ctx.fillStyle="#d18cff";ctx.fillRect(3,-2,7,4);ctx.fillStyle="#5d8ed5";ctx.fillRect(7,-1,5,2)}
    ctx.restore()}
}
function drawEffects(now){
  const g=gridGeom();for(const e of hunt.effects){const age=now-e.start;if(age>e.duration)continue;const t=age/e.duration,p=e.w?entityCenter({r:e.r,c:e.c,w:e.w,h:e.h||1}):cellCenter(e.r,e.c);ctx.save();ctx.imageSmoothingEnabled=false;
    if(e.type==="blast"){const rad=8+t*Math.min(g.cw,g.ch)*.75;ctx.globalAlpha=1-t;for(let ring=0;ring<2;ring++){ctx.strokeStyle=ring?"#ffd45a":"#e55323";ctx.lineWidth=ring?2:5;ctx.strokeRect(Math.floor(p.x-rad-ring*5),Math.floor(p.y-rad-ring*5),Math.floor((rad+ring*5)*2),Math.floor((rad+ring*5)*2))}ctx.fillStyle="#fff09b";for(let i=0;i<14;i++){const a=i*.48;ctx.fillRect(Math.floor(p.x+Math.cos(a)*rad),Math.floor(p.y+Math.sin(a)*rad),3,3)}}
    else if(e.type==="masHoly"){ctx.globalAlpha=1-t;const rad=14+t*Math.max(g.cw,g.ch)*1.75;ctx.strokeStyle="#e5bb4b";ctx.lineWidth=4;ctx.strokeRect(Math.floor(p.x-rad),Math.floor(p.y-rad),Math.floor(rad*2),Math.floor(rad*2));ctx.strokeStyle="#9851bb";ctx.lineWidth=2;ctx.strokeRect(Math.floor(p.x-rad*.72),Math.floor(p.y-rad*.72),Math.floor(rad*1.44),Math.floor(rad*1.44));ctx.fillStyle="#fff0a0";ctx.fillRect(p.x-2,p.y-rad*.62,4,rad*1.24);ctx.fillRect(p.x-rad*.62,p.y-2,rad*1.24,4);for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.fillStyle=i%2?"#b066ce":"#f0cf72";ctx.fillRect(Math.floor(p.x+Math.cos(a)*rad*.82),Math.floor(p.y+Math.sin(a)*rad*.82),4,4)}}
    else if(e.type==="difficulty"){ctx.globalAlpha=1-t;const rad=10+t*Math.max(g.cw,g.ch)*1.15;ctx.strokeStyle="#bd62d1";ctx.lineWidth=3;ctx.strokeRect(Math.floor(p.x-rad),Math.floor(p.y-rad),Math.floor(rad*2),Math.floor(rad*2));ctx.fillStyle="#e0b958";for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.fillRect(Math.floor(p.x+Math.cos(a)*rad),Math.floor(p.y+Math.sin(a)*rad),3,3)}}
    else if(e.type==="hitSpark"||e.type==="heroHit"){ctx.globalAlpha=1-t;const col=e.type==="heroHit"?"#ff4458":"#e8b053";ctx.fillStyle=col;for(let i=0;i<8;i++){const a=i*Math.PI/4,r=5+t*16;ctx.fillRect(Math.floor(p.x+Math.cos(a)*r),Math.floor(p.y+Math.sin(a)*r),3,2)}ctx.fillStyle="#fff0c5";ctx.fillRect(p.x-3,p.y-3,6,6)}
    else if(e.type==="holyImpact"){ctx.globalAlpha=1-t;const r=5+t*24;ctx.strokeStyle="#f4d066";ctx.lineWidth=3;ctx.strokeRect(p.x-r,p.y-r,r*2,r*2);ctx.fillStyle="#fff5bd";ctx.fillRect(p.x-2,p.y-r,4,r*2);ctx.fillRect(p.x-r,p.y-2,r*2,4);ctx.fillStyle="#a45bd0";for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.fillRect(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,3,3)}}
    else if(e.type==="potionHp"||e.type==="potionMp"){ctx.globalAlpha=1-t;const col=e.type==="potionHp"?"#df4055":"#4b89e6",r=9+t*20;ctx.strokeStyle=col;ctx.lineWidth=3;ctx.strokeRect(p.x-r,p.y-r,r*2,r*2);ctx.fillStyle=col;for(let i=0;i<7;i++){const a=i*.9+t*2;ctx.fillRect(p.x+Math.cos(a)*r*.8,p.y+Math.sin(a)*r*.8,3,3)}ctx.fillStyle="#fff";ctx.fillRect(p.x-2,p.y-8,4,16);ctx.fillRect(p.x-8,p.y-2,16,4)}
    else if(e.type==="speedBurst"){ctx.globalAlpha=1-t;ctx.strokeStyle="#4c8be4";ctx.lineWidth=3;for(let i=0;i<4;i++){const r=8+i*8+t*18;ctx.strokeRect(p.x-r,p.y-r*.5,r*2,r)}}
    else if(e.type==="fireImpact"){ctx.globalAlpha=1-t;const r=8+t*30;ctx.fillStyle="#7e1f28";ctx.fillRect(p.x-r,p.y-r,r*2,r*2);ctx.globalAlpha=(1-t)*.8;ctx.fillStyle="#e86120";ctx.fillRect(p.x-r*.65,p.y-r*.65,r*1.3,r*1.3);ctx.fillStyle="#ffd45a";ctx.fillRect(p.x-r*.3,p.y-r*.3,r*.6,r*.6)}
    else if(e.type==="necroImpact"){ctx.globalAlpha=1-t;const r=7+t*26;ctx.strokeStyle="#aa64d0";ctx.lineWidth=4;ctx.strokeRect(p.x-r,p.y-r,r*2,r*2);ctx.fillStyle="#6c3b8e";for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.fillRect(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,3,3)}}
    else if(e.type==="infernoAoE"||e.type==="necroAoE"){const pre=age<(e.delay||0),alpha=pre?.45:Math.max(0,1-(age-(e.delay||0))/(e.duration-(e.delay||0)));for(const cell of e.cells||[]){const q=cellCenter(cell.r,cell.c),rad=Math.min(g.cw,g.ch)*.40;ctx.globalAlpha=alpha;ctx.fillStyle=e.type==="infernoAoE"?(pre?"#7b2024":"#d34b22"):(pre?"#542c70":"#8d4fb1");ctx.fillRect(q.x-rad,q.y-rad,rad*2,rad*2);ctx.strokeStyle=e.type==="infernoAoE"?"#ffbb42":"#d89aff";ctx.lineWidth=pre?2:4;ctx.strokeRect(q.x-rad,q.y-rad,rad*2,rad*2);if(!pre){ctx.fillStyle=e.type==="infernoAoE"?"#ffd65a":"#c881ef";ctx.fillRect(q.x-3,q.y-rad,6,rad*2);ctx.fillRect(q.x-rad,q.y-3,rad*2,6)}}}
    ctx.restore()}
  hunt.effects=hunt.effects.filter(e=>now-e.start<e.duration)
}
function drawFloats(now){
  const g=gridGeom();for(const f of hunt.floats){const p=cellCenter(f.r,f.c),t=f.age/700,y=p.y-g.ch*.36-t*25;ctx.save();ctx.globalAlpha=1-t;ctx.font="900 13px 'Courier New'";ctx.textAlign="center";ctx.fillStyle={damage:"#ffd1a8",holy:"#fff08d",hurt:"#ff5264",heal:"#ff6578",mana:"#69a2ff"}[f.type]||"#fff";ctx.shadowColor="#000";ctx.shadowBlur=3;ctx.fillText(f.text,p.x,Math.round(y));ctx.restore()}
}
function getCss(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}

/* TOAST */
function toastMsg(msg){clearTimeout(toastTimer);toast.textContent=msg;toast.classList.remove("hidden");toastTimer=setTimeout(()=>toast.classList.add("hidden"),1600)}

/* INIT */
loadProfile();renderHome();
hydratePixelIcons(document);
const pixelObserver=new MutationObserver(()=>hydratePixelIcons(document));
pixelObserver.observe(document.body,{childList:true,subtree:true});openScene("homeScene");
