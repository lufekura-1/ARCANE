(function(){
  // Lightweight placeholder assets for Codex-friendly diffs.
  const TILE_URLS = {
  "grass_plain_a": "assets/images/tiles/tile_grass.png",
  "grass_plain_b": "assets/images/tiles/tile_grass.png",
  "dirt_plain_a": "assets/images/tiles/tile_dirt.png",
  "dirt_plain_b": "assets/images/tiles/tile_dirt.png",
  "stone_plain": "assets/images/tiles/tile_stone.png",
  "rocky_stone": "assets/images/tiles/tile_stone.png",
  "dirt_north_grass_south": "assets/images/tiles/tile_grass_dirt.png",
  "grass_west_dirt_east": "assets/images/tiles/tile_grass_dirt.png",
  "grass_north_dirt_south": "assets/images/tiles/tile_grass_dirt.png",
  "dirt_west_grass_east": "assets/images/tiles/tile_grass_dirt.png",
  "stone_north_grass_south": "assets/images/tiles/tile_grass_stone.png",
  "grass_west_stone_east": "assets/images/tiles/tile_grass_stone.png",
  "grass_north_stone_south": "assets/images/tiles/tile_grass_stone.png",
  "stone_west_grass_east": "assets/images/tiles/tile_grass_stone.png",
  "dirt_north_stone_south_a": "assets/images/tiles/tile_dirt_stone.png",
  "dirt_west_stone_east": "assets/images/tiles/tile_dirt_stone.png",
  "dirt_north_stone_south_b": "assets/images/tiles/tile_dirt_stone.png",
  "stone_west_dirt_east": "assets/images/tiles/tile_dirt_stone.png",
  "grass_dirt_curve": "assets/images/tiles/tile_grass_dirt.png",
  "dirt_stone_curve": "assets/images/tiles/tile_dirt_stone.png"
};
  const TILES = {};
  Object.entries(TILE_URLS).forEach(([k,src])=>{ const im=new Image(); im.src=src; TILES[k]=im; });

  function setCombatNav(hidden){
    const nav=document.getElementById('arcaneBottomNav');
    document.body.classList.toggle('v126-hunt', !!hidden);
    document.body.classList.toggle('v12-in-hunt', !!hidden);
    if(!nav) return;
    if(hidden){
      nav.classList.add('hidden');
      nav.style.setProperty('display','none','important');
      nav.style.setProperty('visibility','hidden','important');
      nav.style.setProperty('pointer-events','none','important');
    }else{
      nav.classList.remove('hidden');
      nav.style.removeProperty('display');
      nav.style.removeProperty('visibility');
      nav.style.removeProperty('pointer-events');
    }
  }

  // startHunt/startBoss bypass openScene in the original game, so hide nav HERE.
  const oldStartHunt126 = window.startHunt;
  if(typeof oldStartHunt126==='function') window.startHunt=function(kind){
    setCombatNav(true);
    try{ const r=oldStartHunt126.apply(this,arguments); setCombatNav(!!window.hunt); return r; }
    catch(err){ setCombatNav(false); console.error('startHunt failed',err); throw err; }
  };
  const oldStartBoss126 = window.startBoss;
  if(typeof oldStartBoss126==='function') window.startBoss=function(kind){
    setCombatNav(true);
    try{ const r=oldStartBoss126.apply(this,arguments); setCombatNav(!!window.hunt); return r; }
    catch(err){ setCombatNav(false); console.error('startBoss failed',err); throw err; }
  };
  const oldOpenScene126 = window.openScene;
  if(typeof oldOpenScene126==='function') window.openScene=function(id){
    const r=oldOpenScene126.apply(this,arguments);
    setCombatNav(id==='huntScene');
    return r;
  };
  ['closeDeath','closeBossVictory','exitHunt','exitHuntFromConfig'].forEach(name=>{
    const old=window[name];
    if(typeof old==='function') window[name]=function(){ const r=old.apply(this,arguments); setTimeout(()=>setCombatNav(false),0); return r; };
  });

  function baseType(kind,r,c,H){
    kind=String(kind||'').toLowerCase();
    if(kind.includes('orc') || kind.includes('spider')){
      if((r+c+H)%6===0) return 'dirt';
      return H%4===0?'grass2':'grass';
    }
    if(kind.includes('troll')){
      if((r*c+H)%7===0) return 'dirt';
      if((r+c+H)%13===0) return 'stone';
      return H%3===0?'grass2':'grass';
    }
    if(kind.includes('minotaur') || kind.includes('cyclops') || kind.includes('balthazar')){
      return (H%4===0 || (r+c)%3===0)?'rock':'stone';
    }
    if(kind.includes('dragon') || kind.includes('moroheus')){
      return H%3===0?'stone':'dirt';
    }
    return H%6===0?'dirt':'grass';
  }

  function neighbor(kind,r,c){ return baseType(kind,r,c,cellHash(r,c)); }
  function tileFor(r,c){
    const kind=hunt?.kind||'troll', H=cellHash(r,c), t=baseType(kind,r,c,H);
    const n=r>0?neighbor(kind,r-1,c):t;
    const e=c<COLS-1?neighbor(kind,r,c+1):t;
    const s=r<ROWS-1?neighbor(kind,r+1,c):t;
    const w=c>0?neighbor(kind,r,c-1):t;

    if(t==='grass'||t==='grass2'){
      if(n==='dirt') return TILES.dirt_north_grass_south;
      if(e==='dirt') return TILES.grass_west_dirt_east;
      if(s==='dirt') return TILES.grass_north_dirt_south;
      if(w==='dirt') return TILES.dirt_west_grass_east;
      if(n==='stone'||n==='rock') return TILES.stone_north_grass_south;
      if(e==='stone'||e==='rock') return TILES.grass_west_stone_east;
      if(s==='stone'||s==='rock') return TILES.grass_north_stone_south;
      if(w==='stone'||w==='rock') return TILES.stone_west_grass_east;
      return t==='grass2'?TILES.grass_plain_b:TILES.grass_plain_a;
    }
    if(t==='dirt'){
      if(n==='grass'||n==='grass2') return TILES.grass_north_dirt_south;
      if(e==='grass'||e==='grass2') return TILES.dirt_west_grass_east;
      if(s==='grass'||s==='grass2') return TILES.dirt_north_grass_south;
      if(w==='grass'||w==='grass2') return TILES.grass_west_dirt_east;
      if(n==='stone'||n==='rock') return TILES.dirt_north_stone_south_a;
      if(e==='stone'||e==='rock') return TILES.dirt_west_stone_east;
      if(w==='stone'||w==='rock') return TILES.stone_west_dirt_east;
      return H%2?TILES.dirt_plain_b:TILES.dirt_plain_a;
    }
    if(t==='stone'||t==='rock'){
      if(n==='grass'||n==='grass2') return TILES.grass_north_stone_south;
      if(e==='grass'||e==='grass2') return TILES.stone_west_grass_east;
      if(s==='grass'||s==='grass2') return TILES.stone_north_grass_south;
      if(w==='grass'||w==='grass2') return TILES.grass_west_stone_east;
      if(e==='dirt') return TILES.stone_west_dirt_east;
      return t==='rock'?TILES.rocky_stone:TILES.stone_plain;
    }
    return TILES.grass_plain_a;
  }

  // Only 64x64 preloaded sprites are drawn in the gameplay loop.
  window.drawWorldTile=function(r,c,g){
    const x=g.left+c*g.cw, y=g.top+r*g.ch, im=tileFor(r,c);
    if(im && im.complete && im.naturalWidth) ctx.drawImage(im,x,y,g.cw,g.ch);
    else{ ctx.fillStyle='#5e9d2c'; ctx.fillRect(x,y,g.cw,g.ch); }
  };
  window.drawGrid=function(){
    const g=gridGeom();
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) drawWorldTile(r,c,g);
    // movement highlights only; no permanent grid seams
    ctx.save();ctx.strokeStyle='rgba(186,135,214,.48)';ctx.lineWidth=2;
    for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const rr=hunt.hero.r+dr,cc=hunt.hero.c+dc;
      if(rr<0||rr>=ROWS||cc<0||cc>=COLS||occupied(rr,cc)) continue;
      const p=cellCenter(rr,cc);
      ctx.strokeRect(Math.floor(p.x-g.cw*.40)+.5,Math.floor(p.y-g.ch*.40)+.5,Math.floor(g.cw*.8),Math.floor(g.ch*.8));
    }
    ctx.restore();
  };
})();
