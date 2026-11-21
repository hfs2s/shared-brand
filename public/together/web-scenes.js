const webWaitScenes = (() => {
  const clamp = n => Math.min(1, Math.max(0, n));
  const ease = n => 1-Math.pow(1-clamp(n),3);
  const mix = (a,b,p) => a+(b-a)*p;
  function ground(g, color, rule) {
    g.rect(0,0,360,210,color);
    g.noise(rule,420);
    for (let x=8;x<355;x+=7) {
      g.rect(x,7,3,1,rule);
      g.rect(x,202,3,1,rule);
    }
  }
  function rail(g,x,y,w,edge,main) {
    g.box(x,y,w,7,main,edge);
    g.rect(x+3,y+2,w-6,1,g.C.cream);
  }
  function tick(g,x,y,ink=g.C.ink) {
    g.line(x,y+4,x+4,y+8,ink,2);
    g.line(x+4,y+8,x+12,y,ink,2);
  }
  function rays(g,x,y,r,c) {
    for (let i=0;i<8;i++) {
      const a=i*Math.PI/4;
      g.line(x+Math.cos(a)*r,y+Math.sin(a)*r,x+Math.cos(a)*(r+5),y+Math.sin(a)*(r+5),c,1);
    }
  }
  function nav(g,x,y,w,h,active) {
    const {C,box,rect}=g;
    box(x,y,w,h,C.cream);
    rect(x+2,y+2,w-4,12,C.mint);
    for(let i=0;i<3;i++)rect(x+7+i*6,y+7,3,3,i===active?C.orange:C.ink);
    rect(x+33,y+6,w-43,4,'#8c9f88');
  }
  function landscape(g,x,y,w,h,filled) {
    const {C,rect,poly,disk}=g;
    rect(x,y,w,h,filled?'#cfddd1':'#e2d6ba');
    const color=filled?C.gold:'#d1c39d';
    disk(x+w*.76,y+h*.26,Math.max(3,Math.floor(h*.105)),color);
    poly([[x,y+h],[x+w*.22,y+h*.38],[x+w*.51,y+h],[x,y+h]],filled?C.metal:'#b8af91');
    poly([[x+w*.28,y+h],[x+w*.59,y+h*.49],[x+w*.78,y+h*.69],[x+w,y+h*.43],[x+w,y+h]],filled?C.blue:'#bdb391');
    rect(x+w*.08,y+h*.84,w*.18,2,filled?C.cream:'#d7c6a5');
  }
  function assembly(g,p,stage) {
    const {C,rect,box,line,disk}=g;
    ground(g,'#bfd2bd','#8ca68b');
    rect(74,25,256,162,'#8da584');
    nav(g,67,19,256,162,stage);
    rect(76,39,236,129,'#e1d8c1');
    for(let x=79;x<310;x+=8)for(let y=42;y<167;y+=8)rect(x,y,1,1,'#acac95');
    box(20,42,34,118,'#87977d');
    for(let i=0;i<5;i++) {
      box(26,50+20*i,22,11,[C.cream,C.orange,C.gold,C.mint,C.blue][i]);
      rect(33,54+20*i,7,2,C.ink);
    }
    rail(g,20,31,303,C.ink,C.metal);
    const tracks=[
      [84,48,217,12,C.ink],[84,66,99,6,C.metal],[84,77,70,5,'#adb69f'],
      [84,91,61,17,C.gold],[170,66,132,74,C.mint],
      [84,147,53,13,C.blue],[144,147,50,13,C.mint],[201,147,101,13,C.orange]
    ];
    tracks.forEach(([x,y,w,h,c],i)=>{
      rect(x,y,w,h,'#cabf9c');
      const move=ease((p-.07-i*.088)/.20);
      if(move>0){
        const px=mix(28,x,move);
        const py=mix(52+(i%5)*19,y,move);
        const blockW=mix(21,w,move);
        if(i===4&&move>.94)landscape(g,px,py,blockW,h,p>.68);
        else rect(px,py,blockW,h,c);
      }
    });
    if(p<.86){
      const carrier=24+Math.floor(p*272);
      box(carrier,25,23,14,C.orange);
      line(carrier+11,39,carrier+11,44,C.ink,2);
    } else {
      disk(310,171,11,C.ink);
      disk(310,171,9,C.gold);
      tick(g,304,166);
    }
  }
  function responsive(g,p,stage) {
    const {C,rect,box,line,disk}=g;
    ground(g,'#ddbb90','#bb996c');
    box(15,45,330,138,'#7e948a');
    rect(20,166,320,10,'#465e55');
    const sizes=[[31,66,139,83],[185,75,81,78],[281,85,48,72]];
    sizes.forEach(([x,y,w,h],i)=>{
      const step=clamp((p-.03-i*.23)/.28);
      const rise=ease(step);
      const py=y+(1-rise)*18;
      box(x,py,w,h,C.ink);
      rect(x+2,py+2,w-4,h-4,i===stage?C.blue:'#52675f');
      rect(x+5,py+5,w-10,h-10,C.cream);
      rect(x+8,py+8,w-16,5,C.mint);
      rect(x+10,py+15,Math.floor((w-20)*.79*step),4,C.ink);
      if(i===0&&step>.38){
        landscape(g,x+w*.53,py+23,w*.4,h*.49,step>.8);
        for(let j=0;j<3;j++)rect(x+10,py+27+j*7,w*.32-j*3,2,C.metal);
        rect(x+10,py+h*.72,w*.22,7,C.gold);
      } else if(step>.32) {
        landscape(g,x+10,py+22,w-20,Math.round((h-i*4)*.35),step>.8);
        for(let j=0;j<2;j++)rect(x+10,py+h-20+j*5,w-20-j*3,2,C.metal);
      }
      const nodeColor=p>.82+i*.037?C.gold:'#657c6d';
      disk(x+w/2,171,3,nodeColor);
      if(p>.9+i*.027)tick(g,x+w/2-6,185,C.ink);
    });
    rail(g,40,23,270,C.ink,'#b29166');
    for(let i=0;i<26;i++)rect(43+i*10,27,1,i%5===0?6:3,'#786957');
    box(37+p*258,19,18,16,C.orange);
    disk(332,44,9,C.ink);
    disk(332,44,6,stage===3?C.gold:C.cream);
  }
  function components(g,p,stage) {
    const {C,rect,box,line,disk}=g;
    ground(g,'#a9bdd0','#7e9cad');
    box(18,26,324,151,'#365774');
    for(let x=26;x<341;x+=8)for(let y=32;y<174;y+=8)rect(x,y,1,1,'#7e9fae');
    const trayX=28, trayY=39;
    box(trayX,trayY,62,107,'#b2c1bb');
    const cells=[
      [111,45,87,26,C.gold],[208,45,101,26,C.mint],
      [111,82,150,25,C.cream],[275,82,34,25,C.orange],
      [111,118,64,35,C.mint],[186,118,123,35,C.cream]
    ];
    cells.forEach(([x,y,w,h,c],i)=>{
      const f=ease((p-i*.105-.05)/.24);
      rect(x,y,w,h,'#476982');
      if(f<.96)box(39,45+i*15,39,11,c);
      if(f>0){
        const dx=mix(39,x,f),dy=mix(45+i*15,y,f);
        const width=mix(39,w,f),height=mix(11,h,f);
        box(dx,dy,width,height,c);
        if(f>.68)rect(dx+6,dy+Math.floor(height/2),width*.48,2,C.ink);
        if(i===2&&f>.86){
          rect(dx+width-18,dy+8,9,2,C.blue);
          rect(dx+width-15,dy+10,4,2,C.blue);
        }
      }
    });
    rail(g,31,158,287,C.ink,'#78909a');
    box(30+262*clamp(p/.92),152,25,14,stage===3?C.gold:C.orange);
    if(p>.86)for(const x of [118,224,316]){disk(x,187,5,C.ink);disk(x,187,3,C.gold);}
  }
  function deployment(g,p,stage) {
    const {C,rect,box,disk,line,poly}=g;
    ground(g,'#b9c9af','#8ca480');
    box(14,21,332,168,'#e6d8af');
    const islands=[
      [[30,66],[54,48],[75,51],[90,40],[123,51],[140,69],[125,81],[104,78],[85,102],[58,94],[48,78]],
      [[94,100],[113,102],[135,117],[125,142],[112,162],[100,148],[107,128],[94,118]],
      [[150,63],[174,52],[191,57],[194,50],[218,51],[227,60],[270,50],[305,66],[321,83],[303,101],[277,93],[253,109],[218,98],[207,73],[189,78],[179,69],[163,77]],
      [[174,84],[201,82],[222,99],[213,118],[203,143],[186,134],[177,112]],
      [[267,127],[293,120],[313,132],[307,150],[284,156],[270,146]]
    ];
    for(const points of islands)poly(points,'#9dad8c');
    for(let x=31;x<335;x+=11)rect(x,33,1,1,'#8e876c');
    const base=[197,93], targets=[[54,68],[107,124],[253,70],[292,134]];
    for(const [i,[tx,ty]] of targets.entries()){
      const f=clamp((p-.13-i*.15)/.31);
      const bendY=ty+(ty<90?-10:9);
      const path=[[base[0],base[1]],[base[0],bendY],[tx,bendY],[tx,ty]];
      for(let j=1;j<4;j++)line(...path[j-1],...path[j],'#7d907e',1);
      const detailed=f*3;
      for(let j=1;j<4;j++){
        const step=clamp(detailed-j+1);
        if(step>0){
          const [x,y]=path[j-1], [xx,yy]=path[j];
          line(x,y,mix(x,xx,step),mix(y,yy,step),C.blue,2);
          if(step<1)disk(mix(x,xx,step),mix(y,yy,step),3,C.orange);
        }
      }
      disk(tx,ty,6,C.ink);
      disk(tx,ty,4,f>=1?C.gold:C.metal);
      if(f>=1&&stage>=2)rays(g,tx,ty,8,C.blue);
    }
    box(184,82,27,21,C.ink);
    rect(188,86,19,10,stage===3?C.gold:C.mint);
    for(let i=0;i<4;i++)rect(29+i*11,173,7,6,clamp((p-.13-i*.15)/.31)>=1?C.blue:'#afab91');
  }
  function indexing(g,p,stage) {
    const {C,rect,box,line,disk}=g;
    ground(g,'#c9b393','#a18d73');
    box(23,35,314,131,'#9fa38e');
    box(31,47,297,78,'#d6c7a7');
    rail(g,33,111,293,C.ink,C.metal);
    for(let i=0;i<16;i++)disk(41+i*18,116,2,'#435349');
    const bins=[[40,60,C.blue],[119,60,C.green],[200,60,C.orange],[279,60,C.gold]];
    bins.forEach(([x,y,c],i)=>{
      box(x,y,34,31,C.cream);
      rect(x+4,y+4,26,7,c);
      for(let k=0;k<3;k++)rect(x+5,y+15+k*4,20-k*3,1,C.ink);
      const f=clamp((p-.05-i*.117)/.36);
      const px=mix(x,55+i*74,f);
      const py=mix(93,141,f);
      if(f>0&&f<1){
        box(px,py,26,18,c);
        rect(px+5,py+6,16,2,C.cream);
      }
      if(f>=1){
        rect(52+i*74,145,35,8,C.ink);
        rect(55+i*74,147,29,4,c);
      }
    });
    const scanner=mix(34,305,ease((p-.1)/.60));
    box(scanner,41,20,79,'#758c82');
    rect(scanner+8,46,3,62,p<.8?C.orange:C.gold);
    box(40,179,278,15,C.cream);
    const read=clamp((p-.61)/.35);
    for(let i=0;i<43;i++)rect(49+i*6,183,2,(i%5)+4,i/43<read?C.ink:'#decfb2');
    if(p>.9)tick(g,324,183,C.blue);
  }
  return [
    {id:'build-website',title:'Build a website',duration:28000,measured:true,stages:['Lay out page','Place sections','Apply styles','Package build'],description:'A browser takes shape as headings, sections and artwork are fed onto a paper grid.',draw:assembly},
    {id:'fit-breakpoints',title:'Fit the breakpoints',duration:25000,measured:true,stages:['Set desktop','Fit tablet','Fit phone','Check widths'],description:'A fitting station checks the same layout through desktop, tablet and phone frames.',draw:responsive},
    {id:'assemble-components',title:'Assemble the controls',duration:27000,measured:true,stages:['Gather parts','Place controls','Set states','Test assembly'],description:'Buttons, fields and status tiles lock into a blueprint for a working interface.',draw:components},
    {id:'route-release',title:'Route a release',duration:30000,measured:false,stages:['Prepare bundle','Open route','Verify nodes','Confirm release'],description:'A route lights up across an atlas as a website package reaches each checkpoint.',draw:deployment},
    {id:'index-website',title:'Index a website',duration:26000,measured:true,stages:['Read pages','Sort entries','Build index','Check lookup'],description:'A scanning carriage sorts page cards into lanes and assembles a search index.',draw:indexing},
  ];
})();
