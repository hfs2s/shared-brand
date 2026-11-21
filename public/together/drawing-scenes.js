// Each plate builds a composition from the same normalized job timeline.
const drawingWaitScenes = (() => {
  const limit = value => Math.max(0,Math.min(1,value));
  function paper(g,x,y,w,h,color) {
    g.rect(x+4,y+5,w,h,'#877a62');
    g.box(x,y,w,h,color);
  }
  function bolt(g,x,y) {
    g.disk(x,y,3,g.C.ink);g.rect(x-1,y,3,1,g.C.cream);
  }
  function drafting(g,p,stage) {
    const {C,rect,line,box,poly,disk}=g;
    rect(0,0,360,210,'#acc4b3');g.noise('#93aa9c',390);
    paper(g,40,18,264,170,C.cream);
    for(let x=49;x<298;x+=12)line(x,25,x,179,'#e5ddc4');
    for(let y=27;y<181;y+=12)line(47,y,297,y,'#e5ddc4');
    for(const [x,y] of [[34,15],[282,14],[35,173],[281,173]])poly([[x,y+4],[x+25,y],[x+27,y+8],[x+2,y+13]],'#ecd69b');
    // The axonometric chair emerges as a continuous succession of pencil strokes.
    const paths=[
      [[99,116],[165,141],[234,105],[167,81],[99,116]],
      [[99,116],[99,124],[165,150],[234,113],[234,105]],
      [[165,141],[165,150]],[[105,125],[105,153],[112,156],[112,128]],
      [[164,150],[164,172],[171,168],[171,147]],
      [[224,118],[224,138],[231,134],[231,115]],
      [[167,81],[167,42],[174,38],[241,62],[241,103],[234,105],[234,66],[167,42]],
      [[174,38],[174,79]],[[174,50],[228,70]],[[175,57],[229,77]],[[175,64],[229,84]],
      [[110,116],[167,88],[221,107]],[[126,123],[186,93]],[[144,129],[203,99]]
    ];
    const edges=paths.flatMap(path=>path.slice(1).map((end,i)=>[path[i],end]));
    const pos=limit((p-.08)/.82)*edges.length;
    let px=98,py=115;
    edges.forEach(([[ax,ay],[bx,by]],i)=>{
      const part=limit(pos-i);
      if(part===0)return;
      px=ax+(bx-ax)*part;py=ay+(by-ay)*part;
      line(ax,ay,px,py,i<23?C.ink:C.blue,i<23?2:1);
    });
    if(stage===3){line(87,149,146,173,C.blue);line(84,148,90,148,C.blue);line(143,173,149,173,C.blue);}
    const lifted=limit((p-.9)/.10);px+=lifted*35;py-=lifted*18;
    poly([[px,py],[px+5,py-13],[px+48,py-52],[px+54,py-45],[px+10,py-4]],C.ink);
    poly([[px+6,py-12],[px+46,py-50],[px+51,py-46],[px+11,py-7]],C.gold);
    poly([[px+2,py-3],[px+5,py-12],[px+11,py-6]],C.sand);
    box(12,33,14,145,C.sand);for(let y=39;y<174;y+=5)rect(14,y,y%2?4:7,1,C.ink);
    disk(307,164,11,C.orange);disk(307,164,4,C.cream);
  }

  function screenprint(g,p,stage) {
    const {C,rect,box,disk,line,poly}=g;
    rect(0,0,360,210,'#c79579');g.noise('#ad8069',440);
    paper(g,69,17,219,181,C.cream);
    const travel=limit((p-.18)/.57), cutoff=43+Math.round(travel*123);
    const poster=(x,y)=>{
      const sun=(x-191)**2+(y-78)**2<24**2;
      const ridge=y>125-22*Math.sin((x-102)/26)-10*Math.sin(x/12);
      const water=y>142&&((x+y*3)%26<12);
      return water?C.cream:ridge?C.blue:sun?C.orange:null;
    };
    for(let y=37;y<170;y+=2)for(let x=90;x<268;x+=2){
      const shade=poster(x,y);
      if(shade&&y<cutoff)rect(x,y,2,2,shade);
    }
    // Mesh lifts away from the finished two-color print.
    const lift=limit((p-.76)/.22), left=52-Math.round(lift*90),right=299-Math.round(lift*43);
    for(let y=35;y<173;y+=6)line(left+10,y,right-9,y,'#b9ae95');
    for(let x=left+14;x<right-9;x+=8)line(x,33,x,174,'#cec2a4');
    if(lift<1){
      for(let y=39;y<cutoff;y+=3)for(let x=Math.max(90,left+11);x<Math.min(268,right-10);x+=3){
        const shade=poster(x,y);if(shade)rect(x,y,2,2,shade);
      }
    }
    box(left,24,right-left,10,C.sand);box(left,172,right-left,10,C.sand);
    box(left,29,11,148,C.sand);box(right-11,29,11,148,C.sand);
    for(const x of [left+5,right-6])for(const y of [29,177])bolt(g,x,y);
    const bladeY=42+travel*118;
    const bladeX=89-lift*125;
    box(bladeX,bladeY-7,181,11,C.ink);rect(bladeX+3,bladeY-5,175,4,C.orange);
    box(bladeX+55,bladeY-17,69,10,C.sand);rect(bladeX+3,bladeY+3,174,3,C.blue);
    box(309,55,27,41,C.cream);rect(312,63,21,29,C.orange);disk(323,54,13,C.ink);disk(323,54,10,C.orange);
    poly([[309,123],[322,112],[334,117],[322,129]],C.metal);line(324,116,341,96,C.ink,4);
  }

  function mosaic(g,p,stage) {
    const {C,rect,line,box,poly,disk}=g;
    rect(0,0,360,210,'#d4b891');g.noise('#bda17d',540);
    const cloth='#eadbbb';paper(g,71,17,214,173,cloth);
    for(let y=23;y<184;y+=5)for(let x=77;x<279;x+=5)if((x+y)%3===0)rect(x,y,2,1,'#d4c7a9');
    for(let x=80;x<276;x+=6){rect(x,23,3,1,C.ink);rect(x,183,3,1,C.ink);}
    for(let y=29;y<180;y+=6){rect(77,y,1,3,C.ink);rect(278,y,1,3,C.ink);}
    const tiles=['.....BB.....','...BBBBB....','..BWWBBRR...','.BBBBBBRRRO.','..BBBBBBBB..','...GGBBBB...','..GGGGBB....','.GGGGBB.....','..GGGG......','...Y..Y.....'];
    const colors={B:C.blue,W:C.cream,R:C.orange,O:C.gold,G:C.green,Y:'#aa682f'};
    const pieces=[];
    tiles.forEach((row,r)=>[...row].forEach((key,c)=>{if(colors[key])pieces.push([103+c*13,36+r*13,key]);}));
    const count=limit((p-.08)/.78)*pieces.length;
    pieces.forEach(([x,y,key],i)=>{
      if(i>count){rect(x+5,y+5,2,2,'#bbae97');return;}
      const drop=1-limit(count-i);x+=Math.round(drop*38);y-=Math.round(drop*24);
      rect(x+1,y+2,12,12,'#a29479');rect(x,y,12,12,colors[key]);rect(x+2,y+1,4,1,'#ffffff66');
      if(stage===3&&i/pieces.length<limit((p-.75)*4)){rect(x+4,y+9,3,1,cloth);rect(x+8,y+7,2,1,cloth);}
    });
    for(const [x,y,color] of [[24,50,C.green],[37,73,C.blue],[19,93,C.orange],[301,146,C.gold],[312,161,C.blue]]){box(x,y,17,17,color);line(x+3,y+2,x+9,y+2,cloth);}
    const next=pieces[Math.min(pieces.length-1,Math.floor(count))];
    const tx=stage===3?255:next[0]+13,ty=stage===3?38:next[1]+1;
    line(tx,ty,tx+37,ty-38,C.ink,2);line(tx+3,ty+2,tx+41,ty-35,C.metal,2);
    disk(37,153,12,C.ink);disk(37,153,8,C.orange);disk(37,153,3,C.ink);line(42,164,65,174,C.orange);
  }

  function fold(g,p,stage) {
    const {C,rect,line,box,poly,disk}=g;
    rect(0,0,360,210,'#344f79');g.noise('#48628a',390);
    for(let x=8;x<360;x+=12)line(x,0,x,209,'#415b81');
    for(let y=6;y<210;y+=12)line(0,y,359,y,'#415b81');
    const spread=limit(p/.25), bend=limit((p-.44)/.39), settle=limit((p-.82)/.18);
    const a=37+spread*3,b=77+spread*42,c=131+spread*64,d=180+spread*95;
    const base=148-settle*6;
    const panels=[
      [[a,base-77],[b,base-97+bend*37],[b,base+5+bend*28],[a,base+22]],
      [[b,base-97+bend*37],[c,base-75-bend*32],[c,base+26-bend*32],[b,base+5+bend*28]],
      [[c,base-75-bend*32],[d,base-94+bend*17],[d,base+8+bend*17],[c,base+26-bend*32]]
    ];
    panels.forEach((corners,i)=>{
      poly(corners.map(([x,y])=>[x+6,y+8]),'#283d56');poly(corners,[C.cream,'#dcd2b0','#f6e8c8'][i]);
      const [s,t,,v]=corners;
      const point=(u,h)=>[s[0]+(t[0]-s[0])*u,s[1]+(t[1]-s[1])*u+(v[1]-s[1])*h];
      for(let k=1;k<7;k++){line(...point(k/7,0),...point(k/7,1),'#d0c7ac');line(...point(0,k/7),...point(1,k/7),'#d0c7ac');}
      const route=[[0,[.65,.48,.32][i]],[.24,[.4,.69,.48][i]],[.65,[.46,.26,.29][i]],[1,[.48,.32,.58][i]]];
      const trail=limit((p-.18)/.36)*9-i*3;
      route.slice(1).forEach(([u,h],j)=>{
        const f=limit(trail-j);if(!f)return;
        const [u0,h0]=route[j];line(...point(u0,h0),...point(u0+(u-u0)*f,h0+(h-h0)*f),C.blue,3);
      });
      for(let j=0;j<4;j++)line(...corners[j],...corners[(j+1)%4],C.ink);
      if(stage>=1)for(let n=0;n<5;n++){const [x,y]=point(.18+(n%3)*.17,.72+(n%2)*.11);poly([[x,y],[x+3,y-6],[x+6,y]],C.green);}
      if(stage===3){const [x,y]=point(i===0?.08:.80,i===0?.61:.54);disk(x,y,5,C.ink);disk(x,y,3,C.orange);}
    });
    disk(319,50,19,C.ink);disk(319,50,16,C.cream);
    const angle=.45+bend*.5;
    const dx=Math.sin(angle)*12,dy=Math.cos(angle)*12;
    poly([[319-dx,50-dy],[323,50],[319+dx,50+dy],[315,50]],C.orange);
    for(let x=27;x<334;x+=8)rect(x,194,1,x%3?3:5,C.cream);
  }

  function press(g,p,stage) {
    const {C,rect,line,box,poly,disk}=g;
    rect(0,0,360,210,'#d9c7a2');g.noise('#c6b38e',460);
    // Feed, impression and delivery occupy different parts of the press bed.
    const feed=limit(p/.28),pull=limit((p-.69)/.29);
    const x=37+80*feed+90*pull,y=123-6*feed+3*pull;
    const squeeze=Math.sin(limit((p-.35)/.32)*Math.PI);
    const carriage=43*squeeze;
    box(38,157,281,14,C.metal);box(53,171,15,20,C.ink);box(286,171,15,20,C.ink);
    box(65,31,20,125,'#62766a');box(242,31,20,125,'#62766a');box(59,26,210,16,'#62766a');
    for(const xx of [72,251])for(const yy of [34,148])bolt(g,xx,yy);
    rect(33,141,293,10,C.ink);rect(37,142,285,3,C.sand);
    poly([[x,y],[x+96,y],[x+110,y+17],[x+14,y+17]],C.cream);
    if(p>.51){
      for(let col=0;col<14;col++)for(let row=0;row<5;row++){
        const diamond=Math.abs(col-6.5)/7+Math.abs(row-2)/3;
        if(diamond<1)rect(x+17+col*5+row*2,y+3+row*2,4,2,diamond<.5?C.blue:C.orange);
      }
    }
    box(134,41,32,20+carriage,C.metal);for(let yy=45;yy<57+carriage;yy+=5)line(136,yy,162,yy+3,C.ink);
    box(113,57+carriage,75,13,C.ink);box(98,68+carriage,109,11,'#8a9384');
    rect(103,79+carriage,99,4,C.blue);
    const wheelX=263,wheelY=78,ang=-1.1+p*6.4;
    disk(wheelX,wheelY,39,C.ink);disk(wheelX,wheelY,34,'#d9c7a2');
    for(let i=0;i<5;i++){const theta=ang+i*2*Math.PI/5;line(wheelX,wheelY,wheelX+Math.cos(theta)*34,wheelY+Math.sin(theta)*34,'#68786c',4);}
    disk(wheelX,wheelY,8,C.ink);disk(wheelX,wheelY,4,C.orange);
    const hx=wheelX+Math.cos(ang)*30,hy=wheelY+Math.sin(ang)*30;disk(hx,hy,6,C.ink);disk(hx,hy,3,C.sand);
    for(let i=0;i<4;i++){box(16,61+i*13,32,9,[C.cream,C.sand,C.cream,C.orange][i]);rect(21+i*3,64+i*13,9,2,C.ink);}
    if(stage===3){for(let i=0;i<3;i++)line(303+i*6,121,305+i*7,114,C.orange,2);}
  }

  return [
    {id:'pencil-draft',title:'The drafting board',description:'A carpenter’s pencil draws a chair in perspective, from its seat frame to the final dimension line.',duration:28000,stages:['Set the sheet','Draft the frame','Hatch the seat','Mark dimensions'],measured:true,draw:drafting},
    {id:'screen-print',title:'The screen print',description:'A squeegee carries ink across a mesh screen. Lift the frame to reveal a two-color landscape.',duration:30000,stages:['Register stock','Pull the ink','Finish the pass','Lift the mesh'],measured:true,draw:screenprint},
    {id:'felt-mosaic',title:'The felt mosaic',description:'Tweezers place cut felt squares onto linen. A stitched finish gives the little bird its feathers.',duration:32000,stages:['Lay out linen','Place feathers','Build the wing','Stitch the edges'],measured:true,draw:mosaic},
    {id:'folded-map',title:'The folding table',description:'A route crosses three panels of a field map. Watch the creases rise and the trail markers land.',duration:26000,stages:['Open the map','Trace the route','Score the folds','Mark the stops'],measured:false,draw:fold},
    {id:'proof-press',title:'The proof press',description:'The flywheel drives a platen onto a sheet of stock. Follow the fresh impression to the delivery tray.',duration:29000,stages:['Feed the stock','Lower the platen','Make the impression','Deliver the proof'],measured:false,draw:press}
  ];
})();
