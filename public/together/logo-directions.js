// Each study has its own drawing process. The shared mask is sampled directly
// from the studio wordmark so every material registers to the same silhouette.
function createLogoDirections(image, cells) {
  const ink='#201e29', paper='#fff2d9', orange='#f18d53', green='#1eb278', blue='#3d69f6';
  const colors=[orange,green,blue], tau=2*Math.PI;
  const {sin,cos,abs,floor}=Math;
  const clamp=n=>Math.min(1,Math.max(0,n));
  const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
  const hash=n=>{const v=sin(n*73.17+4.31)*43758.54;return v-floor(v);};
  const dots=cells.map(c=>({...c,px:c.x*4,py:c.y*4}));
  // The bubble's three dots sit on the half module (see logo-motion.js). The
  // mask and the outline keep them exactly. A material laid a whole module at a
  // time (stitches, tiles, punches) cannot, so it works from `lattice`, which
  // leaves one cell out for each dot.
  const lattice=dots.filter(c=>!c.snap);
  const mask=new Path2D(),edge=new Path2D();
  const occupied=new Set(dots.map(c=>c.row*66+c.col));
  for(const c of dots){
    const x=c.px-2,y=c.py-2,k=c.row*66+c.col;
    if(c.notch){
      const [sx,sy]=c.notch;
      mask.rect(x,sy>0?y:y+2,4,2);mask.rect(sx>0?x:x+2,sy>0?y+2:y,2,2);
      edge.moveTo(c.px+2*sx,c.py);edge.lineTo(c.px,c.py);edge.lineTo(c.px,c.py+2*sy);
    }else mask.rect(x,y,4,4);
    for(const [offset,x1,y1,x2,y2] of [[-66,x,y,x+4,y],[1,x+4,y,x+4,y+4],[66,x+4,y+4,x,y+4],[-1,x,y+4,x,y]]){
      if(!occupied.has(k+offset)){edge.moveTo(x1,y1);edge.lineTo(x2,y2);}
    }
  }
  let g;
  function rect(x,y,w,h,color){g.fillStyle=color;g.fillRect(x,y,w,h);}
  function circle(x,y,r,color){if(r<=0)return;g.fillStyle=color;g.beginPath();g.arc(x,y,r,0,tau);g.fill();}
  function line(x,y,X,Y,color,width=1){g.strokeStyle=color;g.lineWidth=width;g.beginPath();g.moveTo(x,y);g.lineTo(X,Y);g.stroke();}
  function polygon(points,color){g.fillStyle=color;g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill();}
  function logo(x=0,y=0,scale=1){g.drawImage(image,x-132*scale,y-38*scale,264*scale,76*scale);}
  function solid(color,x=0,y=0){g.save();g.translate(x,y);g.fillStyle=color;g.fill(mask);g.restore();}
  function outline(color,width=1){g.strokeStyle=color;g.lineWidth=width;g.stroke(edge);}
  function masked(fn){g.save();g.clip(mask);fn();g.restore();}
  function clipped(path,fn){g.save();g.clip(path);fn();g.restore();}
  function boxclip(x,y,w,h,fn){const p=new Path2D();p.rect(x,y,w,h);clipped(p,fn);}
  function bg(color){rect(-165,-210,330,420,color);}
  function grain(color,amount=220){for(let i=0;i<amount;i++)rect(hash(i)*320-160,hash(i+721)*206-103,.8,.8,color);}
  function ring(x,y,r,color,width){if(r<=0)return;g.beginPath();g.arc(x,y,r,0,tau);g.strokeStyle=color;g.lineWidth=width;g.stroke();}
  function wave(path,y,t,height,frequency){
    path.moveTo(-165,120);path.lineTo(-165,y);
    for(let x=-165;x<=165;x+=3)path.lineTo(x,y+sin(x*frequency+t*tau)*height);
    path.lineTo(165,120);path.closePath();
  }

  const studies=[
    ['Risograph pass',.38,t=>{
      bg('#f6dfba');grain('#cca788');const d=12*(1-smooth(t));
      solid('#ef6370',-d,3);solid('#367ed0',d,-3);g.globalCompositeOperation='multiply';
      solid('#efb83b',0,-d*.5);g.globalCompositeOperation='source-over';
      masked(()=>{for(let y=-29;y<33;y+=3)for(let x=-122;x<123;x+=3)circle(x+(y%2),y,.65,'#383350');});
    }],
    ['Halftone exposure',.39,t=>{
      bg('#ffdf65');const pitch=3.7;
      masked(()=>{for(let y=-34;y<37;y+=pitch)for(let x=-127;x<128;x+=pitch){
        const tone=.55+1.95*(.5+.5*sin(x*.058+y*.08-t*tau));circle(x+(floor(y/pitch)%2)*1.3,y,tone,ink);
      }});grain('#c9a643',130);
    }],
    ['Linocut proof',.43,t=>{
      bg('#232c27');solid('#e2e6b4');masked(()=>{for(let i=0;i<180;i++){
        const x=hash(i)*255-128,y=hash(i+397)*65-32;line(x,y,x+4+8*hash(i+7),y-2-4*t,'#293a2b',.7+hash(i+52));
      }});grain('#526050',190);
    }],
    ['Squeegee pull',.54,t=>{
      bg('#ffebcb');outline('#c9a583',.55);const x=-155+310*smooth(t);
      boxclip(-164,-75,x+164,150,()=>logo());
      boxclip(x,-45,12,90,()=>solid(blue));
      g.save();g.translate(x,0);g.rotate(-.095);rect(-2,-47,3,94,ink);rect(1,-47,5,94,'#cd7043');rect(6,-38,3,76,'#fcbe77');g.restore();
    }],
    ['Hot foil',.45,t=>{
      bg('#18252c');solid('#785027',1.6,2);masked(()=>{
        const x=-270+430*t,grad=g.createLinearGradient(x,-40,x+185,42);
        for(const [n,c] of [[0,'#bd8541'],[.3,'#805434'],[.46,'#f8cb76'],[.52,'#fff9d7'],[.64,'#ae7234'],[1,'#dbab62']])grad.addColorStop(n,c);
        rect(-135,-40,270,80,grad);
      });outline('#e6bd7b',.45);grain('#354449',180);
    }],

    ['Cross-stitch sampler',.55,t=>{
      bg('#f1dfbd');for(let x=-160;x<164;x+=4)line(x,-120,x,120,'#dfcba8',.55);
      for(let y=-102;y<103;y+=4)line(-160,y,160,y,'#e0ccae',.55);
      const stop=260*smooth(t)-130;
      for(const c of lattice){const col=c.px<stop?c.ink:'#b8a18a';line(c.px-1.65,c.py-1.6,c.px+1.6,c.py+1.6,col,1.15);
        if(c.px<stop+28)line(c.px-1.65,c.py+1.6,c.px+1.6,c.py-1.6,col,1.15);}
      const y=9*sin(t*tau);line(stop,y,stop+17,y-18,'#7b868b',1.5);
      g.beginPath();g.moveTo(stop+17,y-18);g.bezierCurveTo(stop+39,y-43,stop+48,y+10,stop+65,y-19);g.strokeStyle=blue;g.lineWidth=1;g.stroke();
    }],
    ['Torn paper',.43,t=>{
      bg('#e8ac99');const tear=new Path2D(), shift=120*(1-smooth(t)) - 34;
      tear.moveTo(-165,-110);tear.lineTo(165,-110);
      for(let x=165;x>=-165;x-=3)tear.lineTo(x,shift+x*.22+hash(x)*4);
      tear.closePath();logo(0,5);g.save();g.translate(0,-4-13*sin(t*Math.PI));
      g.shadowColor='#905b49';g.shadowBlur=4;g.shadowOffsetY=3;g.fillStyle='#fff0d6';g.fill(tear);g.shadowBlur=0;g.shadowOffsetY=0;
      clipped(tear,()=>logo());g.restore();grain('#c08c70',120);
    }],
    ['Cut-paper theatre',.36,t=>{
      bg('#304555');for(let k=4;k>=0;k--)solid(['#ffe7ae','#f4a049','#d36440','#995450','#4b3442'][k],k*(2+sin(t*tau)),k*2);
      masked(()=>{for(let k=0;k<5;k++){const p=new Path2D();wave(p,-22+10*k,t+k*.13,6,.035);g.fillStyle=['#ffcf75','#ec9756','#c45f46','#75444b','#323c56'][k];g.fill(p);}});
    }],
    ['Wet watercolor',.42,t=>{
      bg('#faf3df');grain('#ddcdb4');solid('#e5d7bd');masked(()=>{
        for(let i=0;i<38;i++){const x=hash(i)*270-135,y=hash(i+13)*66-33,r=7+19*hash(i+63)+6*t;
          const wash=g.createRadialGradient(x,y,1,x,y,r);
          const rgb=['58,105,167','223,132,72','57,142,114'][i%3];
          wash.addColorStop(0,'rgba('+rgb+',.62)');wash.addColorStop(.84,'rgba('+rgb+',.27)');wash.addColorStop(.92,'rgba('+rgb+',.44)');wash.addColorStop(1,'rgba('+rgb+',0)');
          rect(x-r,y-r,2*r,2*r,wash);}
      });
    }],
    ['Ceramic mosaic',.51,t=>{
      bg('#ddd2bf');for(const c of lattice){
        const x=c.px-1.8,y=c.py-1.8,f=smooth(3*t-c.u*1.7),tone=[blue,'#74b7c3','#1a6576','#e9a94a'][floor(hash(c.col*7+c.row*3)*4)];
        polygon([[x,y+.5],[x+3.6,y],[x+3.35,y+3.6],[x+.25,y+3.55]],f>.15?tone:'#c4b9a6');
        if(f>.45)line(x+.6,y+.65,x+2.9,y+.35,'#d2e9dd',.5);}
    }],

    ['Split-flap board',.38,t=>{
      bg('#26312e');
      for(let j=0;j<6;j++){
        const x=[-124,-85,-44,4,41,82][j],w=[37,39,46,36,39,43][j];
        rect(x,-35,w,65,'#11181b');boxclip(x,-33,w,64,()=>solid('#ffdfa0'));
        const flip=sin(Math.PI*clamp(t*2.4-j*.24));
        rect(x,-33,w,30*flip,'#394442');line(x,-3,x+w,-3,'#11181b',2);circle(x+2,-3,1,'#858a71');}
    }],
    ['Cathode bloom',.45,t=>{
      bg('#101f19');g.shadowColor='#4afa92';g.shadowBlur=5;solid('#92ffad');g.shadowBlur=0;
      for(let y=-110;y<111;y+=3)rect(-160,y,320,.9,'rgba(0,20,12,.52)');
      const y=-61+125*t;const glow=g.createLinearGradient(0,y-10,0,y+10);glow.addColorStop(0,'transparent');glow.addColorStop(.5,'rgba(167,255,196,.18)');glow.addColorStop(1,'transparent');rect(-160,y-10,320,20,glow);
    }],
    ['Thermal receipt',.47,t=>{
      bg('#626f67');const y=-105+92*smooth(t);
      g.save();const slot=new Path2D();slot.rect(-160,-59,320,187);g.clip(slot);g.translate(0,y);g.rotate(-.025);
      const points=[[-137,-40],[137,-40],[137,69]];for(let x=137;x>=-137;x-=4)points.push([x,69+(floor((137-x)/4)%2)*3]);
      polygon(points,'#fffae8');boxclip(-133,-35,266,99,()=>logo(0,29));
      for(let y=8;y<56;y+=3)rect(-132,y,264,.7,'rgba(255,249,229,.44)');g.restore();
      rect(-153,-65,306,7,'#303a38');rect(-144,-59,288,2,'#a4afa1');
    }],
    ['Oscilloscope trace',.43,t=>{
      bg('#10252c');for(let x=-160;x<161;x+=14)line(x,-110,x,110,'#214047',.6);
      for(let y=-98;y<99;y+=14)line(-160,y,160,y,'#214047',.6);
      outline('#477772',.7);const head=-134+268*t;
      g.save();g.shadowBlur=4;g.shadowColor='#6afac0';
      for(let k=0;k<8;k++){
        boxclip(head-k*7-7,-38,7,76,()=>outline('rgba(155,245,188,'+(1-k/9)+')',1.8));
      }
      boxclip(head-1,-38,2,76,()=>solid('#e1ffbf'));g.restore();

    }],
    ['Punch card reader',.46,t=>{
      bg('#35414c');g.save();g.rotate(-.035);polygon([[-144,-47],[134,-47],[144,-37],[144,47],[-144,47]],'#e6c384');
      for(let x=-134;x<135;x+=8){rect(x,-39,4,2,'#a48254');rect(x,36,4,2,'#a48254');}
      for(const c of lattice){rect(c.px-1.4,c.py-1.6,2.8,3.2,'#384451');}
      const x=-136+272*t;rect(x,-45,8,88,'rgba(233,91,48,.50)');g.restore();
    }],

    ['Venetian blinds',.39,t=>{
      bg('#c1d8d4');solid('#f9efdb');
      for(let y=-42;y<43;y+=7){
        const open=.5+.5*sin(t*tau+y*.064),h=1+6*open;
        boxclip(-140,y,280,h,()=>logo());line(-133,y+h,133,y+h,'rgba(38,61,69,.21)',.8);}
    }],
    ['Fresnel lens',.48,t=>{
      bg('#f7dccc');logo();
      const cx=-116+232*smooth(t),r=34;
      const lens=new Path2D();lens.arc(cx,0,r,0,tau);clipped(lens,()=>{bg('#fce8be');g.save();g.translate(cx,0);g.scale(1.72,1.72);logo(-cx,0);g.restore();});
      ring(cx,0,r+1,'#364353',2);ring(cx,0,r-2,'#fff5d9',1);g.beginPath();g.arc(cx,0,r-6,3.65,4.86);g.strokeStyle='#fff6e0';g.lineWidth=2;g.stroke();
    }],
    ['Moiré veil',.39,t=>{
      bg('#dce5ed');for(let x=-270;x<270;x+=4)line(x,-115,x+64,115,'#9aadc0',1.2);
      masked(()=>{rect(-130,-40,260,80,'#e2edf0');for(let x=-190;x<190;x+=3.6)line(x+t*12,-56,x-28+t*12,56,ink,2.25);});
    }],
    ['Stained-glass light',.47,t=>{
      bg('#222734');solid('#121a24',1.8,2);masked(()=>{
        rect(-130,-37,260,74,'#efae59');
        const tones=['#ec8755','#c5db8e','#71b2b1','#e4b95a','#7596ce'];
        for(let j=-2;j<3;j++)for(let i=-7;i<7;i++){
          const x=i*24+(j%2)*9,y=j*19;const pts=[[x,y],[x+25,y+2],[x+18,y+21]];
          polygon(pts,tones[Math.abs(i*7+j*3)%5]);line(x,y,x+18,y+21,'#35454d',1);}
        const x=-220+t*390,shine=g.createLinearGradient(x,0,x+68,20);
        shine.addColorStop(0,'transparent');shine.addColorStop(.5,'rgba(255,255,214,.65)');shine.addColorStop(1,'transparent');rect(-140,-45,280,90,shine);
      });outline('#b9aa80',.8);
    }],
    ['Camera obscura',.42,t=>{
      bg('#24202a');const radius=22+79*smooth(t),ap=new Path2D();
      for(let i=0;i<7;i++){const a=i*tau/6+t*.7,x=radius*cos(a),y=radius*sin(a);i?ap.lineTo(x,y):ap.moveTo(x,y);}ap.closePath();
      clipped(ap,()=>{bg('#ffe6b1');logo();});for(let i=0;i<6;i++){const a=i*tau/6+t*.7;line(radius*cos(a),radius*sin(a),205*cos(a+.47),205*sin(a+.47),'#554855',1);}
    }],

    ['Tide pool',.46,t=>{
      bg('#d7eee4');solid('#afd9cf');masked(()=>{for(let i=0;i<4;i++){const path=new Path2D();wave(path,32-65*smooth(t)+i*5,t+i*.17,4+.5*i,.057);g.fillStyle=['#d8f8e9','#74cec2','#398fa2','#215570'][i];g.fill(path);}
        for(let i=0;i<49;i++)ring(hash(i)*250-125,32-((t*36+hash(i+17)*40)%39),.5+hash(i+2), '#d3f1de',.45);
      });
    }],
    ['Sand timer',.49,t=>{
      bg('#eee0bf');outline('#bba579',.7);
      const level=28-58*smooth(t);
      masked(()=>{rect(-132,level,264,66,'#bd7846');for(let i=0;i<750;i++){const x=hash(i)*260-130,y=hash(i+51)*67-34;if(y>=level)rect(x,y,1,1,['#f3c76d','#885332','#ecac67'][i%3]);}});
      for(let i=0;i<92;i++){const x=hash(i)*244-122,y=-54+((t*58+hash(i+11)*70)%74);if(y<level)rect(x,y,.9,1.55,'#b57e4e');}
    }],
    ['Frost on glass',.45,t=>{
      bg('#223950');solid('#476479');masked(()=>{
        for(let i=0;i<58;i++){const x=hash(i)*250-125,y=hash(i+191)*65-33,r=2+8*smooth(t+i%4*.10);
          for(let a=0;a<6;a++){const q=a*tau/6+hash(i);line(x,y,x+r*cos(q),y+r*sin(q),'#c9e8e2',.85);
            line(x+r*.55*cos(q),y+r*.55*sin(q),x+r*.55*cos(q)+r*.35*cos(q+.7),y+r*.55*sin(q)+r*.35*sin(q+.7),'#a4d4de',.65);}}
      });
    }],
    ['Topographic survey',.4,t=>{
      bg('#d9dfb6');solid('#667d5d');masked(()=>{
        for(let k=0;k<20;k++){
          g.beginPath();for(let x=-134;x<=134;x+=2){const y=-48+k*5+6*sin(x*.043+k*.3+t*3)+3*cos(x*.075-k*.22);x===-134?g.moveTo(x,y):g.lineTo(x,y);}
          g.lineWidth=k%4===0?2:1;g.strokeStyle=k%4===0?'#f1d59a':'#c1ce9f';g.stroke();}
      });outline('#526d55',.6);
    }],
    ['Bioluminescence',.46,t=>{
      bg('#0e2334');masked(()=>{solid('#193d4b');for(const c of dots){
        const light=.5+.5*sin(c.px*.035-t*tau+c.py*.09);
        const r=.5+1.5*light;circle(c.px,c.py,r,light>.75?'#abffe1':light>.38?'#49c9b6':'#33788e');
        if(light>.94){g.globalAlpha=.15;circle(c.px,c.py,4.2,'#7cf8c8');g.globalAlpha=1;}
      }});
    }],

    ['Marquee chase',.42,t=>{
      bg('#35242d');solid('#714234',1,2);outline('#b57959',1);
      masked(()=>{for(const c of dots){const n=(c.col+c.row+t*22)%6;circle(c.px,c.py,1.1+.5*cos(n*tau/6),n<2?'#fff1ba':n===2?'#f2ae57':'#966249');}});
    }],
    ['Film gate',.4,t=>{
      bg('#7b6356');const frame=g=>{rect(-143,g-44,286,88,'#332f31');rect(-127,g-36,254,72,'#eed7a4');logo(0,g,.94);
        for(let y=-34;y<37;y+=14){rect(-139,g+y,7,8,'#c5af87');rect(132,g+y,7,8,'#c5af87');}};
      const phase=t*3%1,offset=94*smooth(clamp((phase-.66)/.34));for(let i=-1;i<=1;i++)frame(i*94-offset);
      grain('rgba(61,46,36,.25)',300);line(-77+4*sin(t*tau),-110,-76,110,'rgba(253,234,185,.4)',.65);
    }],
    ['Neon signwriter',.45,t=>{
      bg('#1d1a30');outline('#564051',2);
      const stop=-130+265*smooth(t*1.25);
      boxclip(-133,-42,stop+133,84,()=>{
        g.save();g.shadowBlur=6;g.shadowColor='#ff739d';outline('#df638c',3);
        g.shadowBlur=0;outline('#ffe2c8',1);g.restore();
      });
      boxclip(stop-4,-40,6,80,()=>solid('#ffcf91'));

    }],
    ['Shadow puppetry',.39,t=>{
      bg('#f7d7a3');const d=8+7*sin(t*tau);
      g.save();g.transform(1,.05,-.45,1,0,0);solid('#ab7654',d,d*.7);g.restore();
      solid('#362c33');for(const x of [-96,-13,84]){const a=.2*sin(t*tau+x);line(x,18,x+12*a,80,'#735641',.85);circle(x,18,1.35,'#cba46c');}
      grain('#d6b884',140);
    }],
    ['Cel animation',.41,t=>{
      bg('#e6e7d9');const frame=floor(t*18), beat=frame/18;
      for(let j=0;j<6;j++){const x=[-125,-85,-44,4,41,82][j],w=[40,41,48,37,41,45][j];
        const s=clamp(beat*2.1-j*.16),jump=abs(sin(s*Math.PI))*17,squash=1+.2*sin(s*tau);
        g.save();g.translate(x+w/2,14-jump);g.rotate(-.13*sin(s*tau));g.scale(1/squash,squash);g.translate(-x-w/2,-14);
        boxclip(x,-40,w,80,()=>logo());g.restore();
        if(s>.08&&s<.72){line(x+w*.4,23,x+w*.37,27+j%2,ink,.85);line(x+w*.6,24,x+w*.62,28,ink,.7);}
      }
    }]
  ].map(([name,poster,draw])=>({name,poster,draw}));

  function paint(context,w,h,id,t){
    g=context;g.save();g.clearRect(0,0,w,h);g.translate(w/2,h/2);g.scale(w/320,w/320);
    // A brief canonical hold makes every loop land on the original artwork.
    const blend=smooth(t/.055)*(1-smooth((t-.79)/.12));
    if(blend<1)logo(0,0,320*.94/264);
    if(blend>0){
      if(blend<1){
        const buffer=paint.buffer || (paint.buffer=document.createElement('canvas'));
        if(buffer.width!==w || buffer.height!==h){buffer.width=w;buffer.height=h;}
        g=buffer.getContext('2d');g.save();g.clearRect(0,0,w,h);g.translate(w/2,h/2);g.scale(w/320,w/320);
        studies[id].draw(t);g.restore();g=context;g.globalAlpha=blend;g.drawImage(buffer,-160,-h*160/w,320,h*320/w);
      }else studies[id].draw(t);
    }
    g.restore();
  }
  return {chapters:['Print room','Made by hand','Analogue machines','Optical studies','Natural processes','Stage and screen'],studies,paint};
}
