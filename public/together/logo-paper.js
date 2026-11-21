// These renderers draw foreground marks on a transparent canvas. The stage and
// contact sheets supply the same cream background in the shared stylesheet.
function createPaperLogos(image, cells) {
  const TAU = 2 * Math.PI;
  const {sin, cos, abs, floor, max, min} = Math;
  const ink='#292830', blue='#3157c8', green='#218a66', ochre='#c88323';
  const accents=[blue,ochre,green], threads=['#323f72','#c76147','#e5a142','#428c78'];
  const clamp = n=>max(0,min(1,n));
  const smooth = n=>{n=clamp(n);return n*n*(3-2*n);};
  const noise = n=>{const a=sin(n*78.3+4.1)*43758.54;return a-floor(a);};
  const inked=cells.map(c=>({...c,x:c.x*4,y:c.y*4}));
  // The bubble's three dots sit on the half module (see logo-motion.js). The
  // mask, the outline and the pen strokes keep them exactly. Marks laid a whole
  // module at a time (beads, droplets, links) use `points`, which leaves one
  // cell out for each dot.
  const points=inked.filter(p=>!p.snap);
  const occupancy=new Set(cells.map(c=>66*c.row+c.col));
  const mask=new Path2D(), outline=new Path2D(), outlines=Array.from({length:6},()=>new Path2D());
  const segments=[], next=new Map();
  function trace(p,x0,y0,x1,y1){
    for(const path of [outline,outlines[p.letter]]){path.moveTo(x0,y0);path.lineTo(x1,y1);}
    const seg={x0,y0,x1,y1};segments.push(seg);
    const key=x0+','+y0;if(!next.has(key))next.set(key,[]);next.get(key).push(seg);
  }
  for(const p of inked){
    const x=p.x-2,y=p.y-2,k=66*p.row+p.col;
    if(p.notch){
      // Beside a dot: the cell less the quarter the dot takes. Its two new
      // edges run the way the pen already goes round every other shape.
      const [sx,sy]=p.notch,h=[p.x+2*sx,p.y],v=[p.x,p.y+2*sy],from=sx*sy>0?h:v,to=sx*sy>0?v:h;
      mask.rect(x,sy>0?y:y+2,4,2);mask.rect(sx>0?x:x+2,sy>0?y+2:y,2,2);
      trace(p,from[0],from[1],p.x,p.y);trace(p,p.x,p.y,to[0],to[1]);
    }else mask.rect(x,y,4,4);
    for(const [d,x0,y0,x1,y1] of [[-66,x,y,x+4,y],[1,x+4,y,x+4,y+4],[66,x+4,y+4,x,y+4],[-1,x,y+4,x,y]]){
      if(occupancy.has(k+d))continue;
      trace(p,x0,y0,x1,y1);
    }
  }
  // Follow the perimeter in pen order instead of exposing unrelated edges.
  const strokes=[],used=new Set();
  for(const start of segments){
    let seg=start;
    while(seg&&!used.has(seg)){used.add(seg);strokes.push(seg);seg=next.get(seg.x1+','+seg.y1)?.find(s=>!used.has(s));}
  }
  let g;
  function line(x,y,X,Y,color,width=1){g.beginPath();g.moveTo(x,y);g.lineTo(X,Y);g.strokeStyle=color;g.lineWidth=width;g.stroke();}
  function dot(x,y,r,color){g.beginPath();g.arc(x,y,max(.01,r),0,TAU);g.fillStyle=color;g.fill();}
  function ring(x,y,r,color,width){g.beginPath();g.arc(x,y,r,0,TAU);g.lineWidth=width;g.strokeStyle=color;g.stroke();}
  function box(x,y,w,h,c){g.fillStyle=c;g.fillRect(x,y,w,h);}
  function poly(pts,c){g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fillStyle=c;g.fill();}
  function solid(c){g.fillStyle=c;g.fill(mask);}
  function edge(c,w=.8,path=outline){g.strokeStyle=c;g.lineWidth=w;g.stroke(path);}
  function inside(fn){g.save();g.clip(mask);fn();g.restore();}
  function logo(){g.drawImage(image,-132,-38,264,76);}
  const columns=[-124,-84,-41,4,42,84,128];
  function letter(i,fn){g.save();g.beginPath();g.rect(columns[i],-50,columns[i+1]-columns[i],100);g.clip();fn();g.restore();}
  function local(x,y,angle,sx,sy,fn){g.save();g.translate(x,y);g.rotate(angle);g.scale(sx,sy);fn();g.restore();}
  function study(name,draw,poster=.43){return {name,draw,poster};}
  const studies=[
    study('Plotter pen',t=>{
      edge('#ab9e8e',.5);const count=max(1,floor(smooth(t)*strokes.length));
      g.beginPath();for(const s of strokes.slice(0,count)){g.moveTo(s.x0,s.y0);g.lineTo(s.x1,s.y1);}
      g.strokeStyle=blue;g.lineWidth=1.45;g.stroke();const s=strokes[count-1];
      poly([[s.x1,s.y1],[s.x1+5,s.y1-14],[s.x1+10,s.y1-10]],ink);
    }),
    study('Graphite rubbing',t=>{
      inside(()=>{for(let i=0;i<2100;i++){const x=noise(i)*255-128,y=noise(i+173)*68-34;
        if(x<-110+270*t+11*sin(y*.24))line(x,y,x+2+5*noise(i+75),y-1.7,'rgba(48,44,44,.55)',.72);}});
      edge('#aca095',.4);
    }),
    study('Ink droplets',t=>{
      for(const p of points){const r=.15+2.8*smooth(t*2.3-p.u*.88-p.seed*.58);
        dot(p.x,p.y,r,p.letter===2?p.ink:ink);}
    }),
    study('Brush lettering',t=>{
      const reach=-130+290*t;inside(()=>{for(let i=0;i<36;i++){const y=-32+i*1.8;
        line(-137,y,reach+13*sin(i*.43)+noise(i)*5,y-1,threads[floor(i/9)],2.15);}});
      for(let i=0;i<8;i++){const y=2*sin(t*TAU)+i*.65;line(reach-3,y,reach+8+i*.35,y-7,ochre,.7);}
    }),
    study('Pin and string',t=>{
      for(const p of points){if(p.row%2!==0)continue;
        const reach=smooth(t*2-p.u*.85);line(p.x-2,p.y+2,p.x-2+4*reach,p.y+2-4*reach,p.letter===2?blue:ink,.85);}
      for(let i=0;i<segments.length;i+=4){const s=segments[i];dot(s.x0,s.y0,1.03,'#ba7942');dot(s.x0-.2,s.y0-.3,.36,'#f9d08e');}
    }),

    study('Herringbone',t=>{
      inside(()=>{for(let row=-8;row<=8;row++){for(let x=-137;x<139;x+=7){
        const y=row*4,dx=row%2?5:-5;line(x+5*sin(t*TAU),y,x+dx+5*sin(t*TAU),y+4,threads[(row+8)%4],2.6);}}});
    }),
    study('Bead loom',t=>{
      for(let row=4;row<17;row+=2){const rowCells=points.filter(p=>p.row===row);
        if(rowCells.length)line(rowCells[0].x,rowCells[0].y,rowCells.at(-1).x,rowCells[0].y,'#c9b39a',.45);}
      for(const p of points){const y=p.y-(1-smooth(t*2.6-p.u-p.seed*.4))*11;
        dot(p.x,y,1.87,threads[(p.letter+floor(p.row/3))%4]);dot(p.x-.55,y-.55,.48,'#ffedd0');}
    }),
    study('Chain links',t=>{
      const phase=t*TAU;
      for(let i=0;i<points.length;i++){const p=points[i];if((p.col+p.row)%2)continue;
        g.beginPath();g.ellipse(p.x,p.y,3.15,1.65,(p.row%2?-.65:.65)+.32*sin(phase+p.u*4),0,TAU);
        g.strokeStyle=p.letter===2?ochre:ink;g.lineWidth=1.05;g.stroke();}
    }),
    study('Passementerie',t=>{
      inside(()=>{for(let j=-8;j<9;j++){for(let i=0;i<3;i++){
        g.beginPath();for(let x=-130;x<131;x+=2){
          const y=j*5+2.2*sin(x*.18+t*TAU+i*TAU/3);
          x===-130?g.moveTo(x,y):g.lineTo(x,y);}
        g.strokeStyle=[ochre,'#282f50',green][i];g.lineWidth=1.6;g.stroke();}}});
    }),
    study('Lacework',t=>{
      edge('#626d76',.6);inside(()=>{for(let y=-36;y<37;y+=5)for(let x=-132;x<133;x+=5){
        const r=1.25+.95*(.5+.5*sin(x*.06+y*.08-t*TAU));ring(x+(y%2?2:0),y,r,blue,.7);
      }});
    }),

    study('Domino run',t=>{
      for(const p of points){if(p.row%2)continue;const tilt=1.18*smooth(3*t-p.u*2);
        local(p.x,p.y+3,tilt,1,1,()=>{box(-1.4,-6,2.8,6,p.letter===2?blue:ink);dot(0,-4.7,.43,'#fff3dc');});}
    }),
    study('Letterpress sorts',t=>{
      for(let j=0;j<6;j++){const fall=1-smooth(t*2.5-j*.22),x=(columns[j]+columns[j+1])/2;
        local(x,-fall*15,fall*(j%2?.12:-.12),1,1,()=>{g.translate(-x,0);
          box(columns[j]+1,-32,columns[j+1]-columns[j]-2,63,'#ddc6a1');
          box(columns[j]+1,28,columns[j+1]-columns[j]-2,3,'#a98865');letter(j,logo);});}
    }),
    study('Scissor cut',t=>{
      const split=4+10*sin(t*Math.PI),cut=-8+10*t;
      for(let side=0;side<2;side++){g.save();g.beginPath();const sign=side?1:-1;
        g.moveTo(-160,cut-24);g.lineTo(160,cut+24);g.lineTo(160,sign*120);g.lineTo(-160,sign*120);g.closePath();g.clip();g.translate(sign*split,-sign*2);logo();g.restore();}
      const x=112-226*t,y=cut+x*.15;ring(x+7,y-4,3,blue,1);ring(x+8,y+4,3,blue,1);
      line(x+5,y-2,x-10,y+3,ink,1);line(x+5,y+2,x-10,y-2,ink,1);
    }),
    study('Counterweights',t=>{
      for(let j=0;j<6;j++){const x=(columns[j]+columns[j+1])/2,h=9*sin(t*TAU+j*.88);
        ring(x,-39,2.3,'#83745e',.85);line(x-2,-38,x-2,-26+h,'#948673',.7);
        line(x+2,-38,x+2,-23-h,'#948673',.7);box(x,-23-h,4,3,ochre);
        local(0,h,0,1,1,()=>letter(j,logo));}
    }),
    study('Combination dials',t=>{
      for(let j=0;j<6;j++){const x=(columns[j]+columns[j+1])/2,a=(1-smooth(t*2.4-j*.22))*(j%2?1:-1)*Math.PI;
        ring(x,0,17.7,'#b6a790',.65);for(let k=0;k<8;k++){const q=k*TAU/8;line(x+18*cos(q),18*sin(q),x+19.6*cos(q),19.6*sin(q),'#95836a',.7);}
        local(x,0,a,.8,.8,()=>{g.translate(-x,0);letter(j,logo);});}
    }),

    study('Piano roll',t=>{
      const x=-123+246*t;for(const p of points){const d=abs(x-p.x);box(p.x-1.9,p.y-1.4,3.8,2.8,d<13?ochre:p.letter===2?blue:ink);}
      line(x,-31,x,31,green,1.3);poly([[x-3,-34],[x+3,-34],[x,-30]],green);
    }),
    study('Tuning forks',t=>{
      for(let j=0;j<6;j++){const x=(columns[j]+columns[j+1])/2,d=3.1*sin(t*TAU*3+j);
        g.globalAlpha=.25;for(const shift of [-d,d])local(shift,0,0,1,1,()=>letter(j,()=>solid(blue)));
        g.globalAlpha=1;letter(j,logo);line(x,24,x,31+2*abs(d),ochre,1.1);}
    }),
    study('Groove cutter',t=>{
      inside(()=>{const cx=-54+26*sin(t*TAU),cy=35;for(let i=4;i<205;i+=3.2)ring(cx,cy,i,ink,1.55);});
      const x=-110+220*t;line(x,-25,x+13,-43,ochre,2.6);dot(x,-25,1.7,blue);
    }),
    study('Reed organ',t=>{
      inside(()=>{for(let x=-124;x<=125;x+=4){const offset=6*sin(x*.062+t*TAU);
        box(x,-34,2.9,68,'#a78355');box(x+.7,-34,1,68,'#ebbb73');box(x,-12+offset,2.9,4,ink);}});
      edge('#795e3e',.45);
    }),
    study('Choir of six',t=>{
      for(let j=0;j<6;j++){const a=t*TAU+j*.83,x=(columns[j]+columns[j+1])/2;
        local(x,17,0,1+.08*sin(a),1+.3*cos(a),()=>{g.translate(-x,-17);letter(j,logo);});
        if(sin(a)>.1){for(let n=0;n<2;n++){g.beginPath();g.arc(x,-17,9+4*n,-2.15,-1.1);g.lineWidth=1;g.strokeStyle=accents[j%3];g.stroke();}}}
    }),

    study('Circuit board',t=>{
      const split=-128+260*t;for(let i=0;i<segments.length;i+=2){const s=segments[i];line(s.x0,s.y0,s.x1,s.y1,'#a3b8a5',.65);}
      inside(()=>{for(let j=-8;j<9;j++){const y=j*4;line(-135,y,135,y,green,.9);for(let x=-124;x<124;x+=14){
        line(x,y,x+3,y-3,green,.8);dot(x+3,y-3,1,green);}}});
      inside(()=>{box(split-2,-40,4,80,ochre);});
    }),
    study('Metro interchange',t=>{
      edge('#bcad98',.55);
      for(let j=0;j<4;j++){const y=-12+8*j;
        inside(()=>{g.beginPath();g.moveTo(-134,y);g.lineTo(-33+j*7,y);g.lineTo(-24+j*7,y-6);g.lineTo(135,y-6);g.strokeStyle=threads[j];g.lineWidth=2.5;g.stroke();});
        const x=-127+254*((t+j*.23)%1);dot(x,y+(x>0?-6:0),2.4,threads[j]);dot(x,y+(x>0?-6:0),1,'#ffefd6');}
    }),
    study('Constellation chart',t=>{
      for(let i=0;i<strokes.length;i+=3){const s=strokes[i],prev=strokes[max(0,i-3)];
        if(abs(prev.x0-s.x0)+abs(prev.y0-s.y0)<16)line(prev.x0,prev.y0,s.x0,s.y0,'#80919f',.58);
        const r=.7+1.15*(.5+.5*cos(t*TAU+i*.17));dot(s.x0,s.y0,r,i%12?ink:ochre);}
    }),
    study('Isometric streets',t=>{
      inside(()=>{for(let y=-36;y<39;y+=5){for(let x=-140;x<140;x+=9){
        const xx=x+((y+36)%10?4.5:0),h=1+2*(.5+.5*sin(xx*.085+y*.15-t*TAU));
        poly([[xx-3,y],[xx,y-1.8],[xx+3,y],[xx,y+1.8]],'#be8264');
        poly([[xx-3,y],[xx,y+1.8],[xx,y+1.8+h],[xx-3,y+h]],'#805c52');
        poly([[xx,y+1.8],[xx+3,y],[xx+3,y+h],[xx,y+1.8+h]],'#e4a973');}}});
    }),
    study('Survey flags',t=>{
      edge('#c6b9a4',.65);for(let i=0;i<strokes.length;i+=5){const s=strokes[i],lift=smooth(t*2-i/strokes.length);
        line(s.x0,s.y0,s.x0,s.y0-5*lift,'#49535a',.75);
        poly([[s.x0,s.y0-6*lift],[s.x0+4.6,s.y0-5*lift+sin(t*TAU+i)*1.1],[s.x0,s.y0-2*lift]],accents[floor(i/5)%3]);}
    }),

    study('Typewriter carriage',t=>{
      const n=min(6,floor(t*8));for(let i=0;i<n;i++)letter(i,logo);
      if(n<6){const x=columns[n]+1;box(x,22,columns[n+1]-x-3,2,blue);
        const f=(t*8)%1;g.globalAlpha=.24+.7*f;local(0,-8*(1-f),0,1,1,()=>letter(n,logo));g.globalAlpha=1;}
    }),
    study('Rubber stamp',t=>{
      const angle=-.10*(1-smooth(t)),shift=8*(1-smooth(t));
      local(shift,-shift,angle,1,1,()=>{inside(()=>{solid('#a84938');g.globalCompositeOperation='destination-out';
        for(let i=0;i<680;i++){const x=noise(i)*250-125,y=noise(i+32)*64-32;dot(x,y,.4+.95*(1-smooth(t)),ink);}});});
    }),
    study('Peel-back label',t=>{
      logo();const x=-125+250*t;
      inside(()=>{box(x,-40,145-x,80,'#5a73ac');});
      const fold=new Path2D();fold.moveTo(x,-37);fold.lineTo(x+10,-37);fold.quadraticCurveTo(x-5,5,x+8,37);fold.lineTo(x,37);fold.closePath();
      inside(()=>{g.fillStyle='#abc3d9';g.fill(fold);});
    }),
    study('Magnetic poetry',t=>{
      for(let j=0;j<6;j++){const x=(columns[j]+columns[j+1])/2,w=columns[j+1]-columns[j]-3,s=1-smooth(t*2-j*.15);
        local(x,s*(j%2?12:-12),s*(j%2?.12:-.15),1,1,()=>{box(-w/2+1,-25+2,w,51,'#ac987d');box(-w/2,-25,w,51,['#f0d599','#a6c7bc','#c4cfe7'][j%3]);
          g.translate(-x,0);letter(j,logo);});}
    }),
    study('Folio flipbook',t=>{
      const step=floor(20*t);
      for(let j=0;j<6;j++){const x=(columns[j]+columns[j+1])/2,a=(step+j*2)*.44,wave=sin(a);
        for(let k=2;k>=0;k--){g.globalAlpha=k?.13:1;
          local(x+k*1.8,wave*5-k*2,cos(a-k*.4)*.1,1,1,()=>{g.translate(-x,0);letter(j,k?()=>solid(accents[j%3]):logo);});}
      }g.globalAlpha=1;
    })
  ];

  function paint(target,w,h,id,t){
    g=target;g.save();g.clearRect(0,0,w,h);g.translate(w/2,h/2);const scale=w*.94/264;g.scale(scale,scale);
    const art=smooth(t/.065)*(1-smooth((t-.77)/.16));
    if(art>0){g.save();studies[id].draw(t);
      if(art<1){g.globalCompositeOperation='destination-in';g.fillStyle='rgba(0,0,0,'+art+')';g.fillRect(-200,-150,400,300);}
      g.restore();}
    if(art<1){g.globalAlpha=1-art;logo();}
    g.restore();
  }
  return {chapters:['Drawing implements','Textile structures','Workshop mechanisms','Sound and rhythm','Maps and networks','Type in use'],studies,paint};
}
