/* V9 world-tile polish for the additional hunts and bosses */
const v9BaseDrawWorldTile=drawWorldTile;
drawWorldTile=function(r,c,g){
  if(!["spider","cyclops","giant_spider","adult_dragon","bhaaz","white_orc"].includes(hunt.kind))return v9BaseDrawWorldTile(r,c,g);
  const x=g.left+c*g.cw,y=g.top+r*g.ch,w=g.cw,h=g.ch,H=cellHash(r,c);let base,hi,dot;
  if(hunt.kind==="spider"){base=H%3===0?"#26291c":"#20231a";hi="#343a25";dot="#596045"}
  else if(hunt.kind==="giant_spider"){base=H%3===0?"#241728":"#1b141f";hi="#39213f";dot="#683a72"}
  else if(hunt.kind==="cyclops"){base=H%4===0?"#443827":"#393126";hi="#61513b";dot="#817057"}
  else if(hunt.kind==="adult_dragon"){base=H%4===0?"#351719":"#281315";hi="#4a2325";dot="#7d3027"}
  else if(hunt.kind==="bhaaz"){base=H%3===0?"#3a3020":"#2e291e";hi="#55472a";dot="#b48c35"}
  else{base=H%3===0?"#393a3c":"#2f3033";hi="#505154";dot="#d4d0c5"}
  ctx.fillStyle=base;ctx.fillRect(x,y,w,h);ctx.fillStyle=hi;ctx.fillRect(x+1,y+1,w-2,Math.max(2,h*.08));ctx.fillStyle=dot;
  for(let i=0;i<4;i++){const xx=x+((H*(i+3)+i*17)%89)/100*w,yy=y+((H*(i+7)+i*31)%83)/100*h;ctx.fillRect(Math.floor(xx),Math.floor(yy),Math.max(1,Math.floor(w/40)),Math.max(1,Math.floor(h/40)))}
  if(hunt.kind==="adult_dragon"&&H%4===0){ctx.strokeStyle="#9d3425";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+w*.08,y+h*.72);ctx.lineTo(x+w*.45,y+h*.48);ctx.lineTo(x+w*.9,y+h*.65);ctx.stroke();ctx.strokeStyle="#f08b2f";ctx.lineWidth=1;ctx.stroke()}
  if((hunt.kind==="spider"||hunt.kind==="giant_spider")&&H%5===0){ctx.strokeStyle="rgba(215,219,205,.22)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y+h);ctx.moveTo(x+w,y);ctx.lineTo(x,y+h);ctx.stroke()}
  if(hunt.kind==="bhaaz"&&c===2){ctx.fillStyle="#c79a3a";ctx.fillRect(x+w*.07,y,w*.025,h);ctx.fillRect(x+w*.905,y,w*.025,h)}
};
