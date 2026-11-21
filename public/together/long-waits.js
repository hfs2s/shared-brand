(() => {
  'use strict';
  const ink = '#262823', cream = '#fff6d9', metal = '#b5bcaa', blue = '#3157c8', orange = '#e98750', lemon = '#f4f56e';
  const C={ink:'#252820',cream:'#fff2d6',blue:'#3157c8',mint:'#b7c9af',green:'#1ca477',gold:'#f6d45d',orange:'#e88959',metal:'#848d7c',sand:'#d9b385'};
  const clamp = n => Math.max(0, Math.min(1, n));
  const grain = (x,y) => ((x*97 ^ y*137 ^ x*y*13) >>> 0) % 71;
  const clock = seconds => '00:' + String(Math.floor(seconds)).padStart(2,'0');

  function instruments(ctx) {
    function rect(x,y,w,h,color) {
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));
    }
    function box(x,y,w,h,color,edge=ink) {
      rect(x,y,w,h,edge);
      rect(x+2,y+2,w-4,h-4,color);
    }
    function disk(x,y,r,color) {
      for(let dy=-r;dy<=r;dy++){
        const width=Math.floor(Math.sqrt(r*r-dy*dy));
        rect(x-width,y+dy,width*2+1,1,color);
      }
    }
    function line(x1,y1,x2,y2,color,size=1) {
      const count=Math.max(1,Math.abs(x2-x1),Math.abs(y2-y1));
      for(let i=0;i<=count;i++) rect(x1+(x2-x1)*i/count,y1+(y2-y1)*i/count,size,size,color);
    }
    function ground(base,fleck) {
      rect(0,0,360,210,base);
      for(let y=0;y<210;y+=3) for(let x=0;x<360;x+=3) if(grain(x,y)<4) rect(x,y,1,1,fleck);
      for(let x=3;x<360;x+=7){rect(x,7,3,1,fleck);rect(x,202,3,1,fleck);}
    }
    function screw(x,y) {rect(x,y,3,3,ink);rect(x+1,y+1,1,1,cream);}
    function poly(points, color) {
      const bottom=Math.ceil(Math.max(...points.map(p=>p[1])));
      const top=Math.floor(Math.min(...points.map(p=>p[1])));
      for(let y=top;y<bottom;y++){
        const sample=y+.5;
        const crossings=[];
        for(let i=0;i<points.length;i++){
          const [ax,ay]=points[i], [bx,by]=points[(i+1)%points.length];
          if((ay<=sample&&sample<by)||(by<=sample&&sample<ay))crossings.push(ax+(bx-ax)*(sample-ay)/(by-ay));
        }
        crossings.sort((a,b)=>a-b);
        for(let i=0;i+1<crossings.length;i+=2){
          const x=Math.round(crossings[i]);
          rect(x,y,Math.round(crossings[i+1])-x,1,color);
        }
      }
    }
    function noise(color='#6e6245',count=250){
      for(let i=0;i<count;i++){
        const n=Math.imul(i+17,2654435761)>>>0;
        rect(n%360,(n>>>14)%210,1,1,color);
      }
    }
    return {ctx,C,rect,box,disk,line,poly,noise,ground,screw};
  }

  function plotter(d,p,stage) {
    const {rect,box,line,disk,ground,screw}=d;
    ground('#b8cdb8','#8da992');
    rect(28,34,307,153,'#809681');box(23,29,307,153,'#87988a');
    box(33,37,286,132,'#bdc4af');
    for(let x=43;x<312;x+=6)rect(x,40,1,x%3===0?5:2,ink);
    const feed=Math.round(clamp(p/.19)*10);
    rect(63,55+feed,228,96,'#8b9481');box(59,49+feed,228,96,cream);
    const top=54+feed;
    const passes=clamp((p-.19)/.58);
    const fill=clamp((p-.48)/.30);
    const sceneX=74, sceneW=178;
    for(let x=0;x<sceneW;x+=2){
      const ridge=34-Math.floor(11*Math.sin(x/24)+5*Math.sin(x/11));
      const hill=51-Math.floor(9*Math.sin(x/23+1.8));
      const near=64-Math.floor(8*Math.sin(x/37-2));
      for(let y=0;y<71;y+=2){
        const dot=grain(x,y);
        let shade=null;
        if(Math.abs(ridge-y)<2||Math.abs(hill-y)<2||Math.abs(near-y)<2) shade=x/sceneW<passes?ink:'#ded9bf';
        if(x/sceneW<fill){
          if(y>ridge&&y<hill&&dot%4!==0) shade='#abc2b1';
          if(y>hill&&y<near&&dot%6!==0) shade=blue;
          if(y>near&&dot%8!==0) shade=ink;
          if((x-130)**2+(y-14)**2<70)shade=orange;
        }
        if(shade)rect(sceneX+x,top+y,2,2,shade);
      }
    }
    for(const x of [65,277])for(const y of [top,top+80]){rect(x,y,5,1,ink);rect(x+2,y-2,1,5,ink);}
    if(p>.80){box(253,top+47,21,24,orange);for(const [x,y] of [[0,5],[4,5],[4,1],[8,1],[8,9]])rect(257+x,top+53+y,4,4,ink);}
    box(34,45,12,115,'#939f8f');box(300,45,12,115,'#939f8f');
    const traveling=p>.16&&p<.81;
    const carriage=traveling?64+Math.round((1-Math.cos((p-.16)/.65*8*Math.PI))*103):58;
    const railY=traveling?47+Math.floor((p-.16)*85):45;
    box(36,railY,275,8,metal);rect(47,railY+3,254,1,cream);
    box(carriage,railY-6,21,18,ink);rect(carriage+3,railY-4,15,8,orange);rect(carriage+8,railY+10,4,8,ink);
    for(const x of [29,319])for(const y of [34,174])screw(x,y);
    rect(44,172,89,5,ink);rect(46,173,20+Math.floor(p*62),2,lemon);
  }

  function tape(d,p,stage) {
    const {rect,box,line,disk,ground,screw}=d;
    ground('#cfab83','#b49370');
    rect(27,28,308,157,'#a48669');box(22,23,308,157,'#434b45');box(30,31,292,105,'#a5b1a0');
    for(let x=36;x<316;x+=4){rect(x,34,1,2,'#c6cdbb');rect(x,130,1,2,'#849780');}
    const phase=p*29;
    const hubs=[88,262];
    hubs.forEach((x,index)=>{
      disk(x,76,39,ink);disk(x,76,37,'#c7c8af');
      disk(x,76,Math.round(index?19+p*12:31-p*12),'#635747');
      for(let k=0;k<3;k++){
        const angle=phase+2*Math.PI*k/3;
        const dx=Math.cos(angle),dy=Math.sin(angle);
        line(x+dx*7,76+dy*7,x+dx*27,76+dy*27,cream,4);
        disk(x+Math.round(dx*25),76+Math.round(dy*25),5,metal);
      }
      disk(x,76,8,ink);disk(x,76,4,orange);rect(x-1,75,3,3,cream);
    });
    const route=[[59,96],[87,119],[143,121],[205,121],[261,117],[290,96]];
    const thread=clamp(p/.22);
    for(let i=0;i<route.length-1;i++){
      const f=clamp(thread*(route.length-1)-i);
      const [x,y]=route[i], [ex,ey]=route[i+1];
      if(f>0)line(x,y,x+(ex-x)*f,y+(ey-y)*f,ink,2);
    }
    for(const x of [87,143,205,261]){disk(x,119,5,ink);disk(x,119,2,cream);}
    box(137,46,77,42,'#203a38');rect(142,65,66,1,'#819f7c');
    for(let x=0;x<63;x+=2){
      const amp=stage===0?2:stage===1?5:stage===2?13:8;
      const y=65+Math.sin(x/3+p*40)*Math.sin(x/10+p*13)*amp;
      rect(144+x,y,2,2,lemon);
    }
    box(39,143,94,23,'#838977');for(let x=44;x<127;x+=12){box(x,147,10,14,x===44+12*stage?orange:cream);}
    box(146,143,75,22,cream);for(let i=0;i<14;i++){rect(151+i*4,150,2,8-i%4,i<(p?5+Math.round(7*Math.abs(Math.sin(phase))):2)?blue:'#d4cbb0');}
    disk(282,155,12,ink);disk(282,155,9,metal);line(282,155,282+6*Math.cos(phase/3),155+6*Math.sin(phase/3),ink,2);
    for(const x of [26,324])for(const y of [27,173])screw(x,y);
  }

  const registry=new Map([
    {id:'plotter',duration:28000,draw:plotter,stops:[0,.19,.48,.80],complete:'Field print complete'},
    {id:'tape',duration:26000,draw:tape,stops:[0,.22,.43,.83],complete:'Recording complete'},
    ...webWaitScenes,...drawingWaitScenes
  ].map(scene=>[scene.id,scene]));
  document.querySelectorAll('.lw-card').forEach(card=>{
    const scene=registry.get(card.dataset.scene);
    if(!scene)return;
    const {duration,draw}=scene;
    const stops=scene.stops||[0,.22,.47,.78];
    const canvas=card.querySelector('canvas'),ctx=canvas.getContext('2d');
    const kit=ctx&&instruments(ctx), media=matchMedia('(prefers-reduced-motion: reduce)');
    const stages=[...card.querySelectorAll('.lw-stages li')];
    const run=card.querySelector('[data-action=run]'),pause=card.querySelector('[data-action=pause]'),cancel=card.querySelector('[data-action=cancel]');
    const status=card.querySelector('.lw-status'),counter=card.querySelector('.lw-clock'),bar=card.querySelector('progress');
    const title=card.querySelector('h3').textContent.toLowerCase();
    let phase='ready',elapsed=0,base=0,timer=0,lastStage=-1;
    function inform(message){if(status.textContent!==message)status.textContent=message;}
    function controls(){
      card.dataset.phase=phase;
      const active=phase==='running'||phase==='paused';
      run.textContent=active?'Restart':phase==='complete'?'Replay':'Start';
      pause.textContent=phase==='paused'?'Resume':'Pause';
      pause.disabled=cancel.disabled=!active;
      for(const button of [run,pause,cancel])button.setAttribute('aria-label',button.textContent+' '+title);
    }
    function paint(force=false){
      const p=clamp(elapsed/duration);
      const stage=stops.reduce((current,at,index)=>p>=at?index:current,0);
      const changed=stage!==lastStage;
      if(kit&&(force||changed||!media.matches))draw(kit,media.matches&&p<1?stops[stage]:p,stage);
      if(bar)bar.value=Math.floor(p*100);
      counter.textContent=clock(elapsed/1000)+(bar?' · '+Math.floor(p*100)+'%':'');
      if(force||changed){
        stages.forEach((li,index)=>{
          li.classList.toggle('past',(phase==='complete'||index<stage)&&phase!=='cancelled');
          if(index===stage&&(phase==='running'||phase==='paused'))li.setAttribute('aria-current','step');
          else li.removeAttribute('aria-current');
        });
        if(phase==='running')inform(stages[stage].textContent);
      }
      lastStage=stage;
    }
    function tick(){
      elapsed=Math.min(duration,performance.now()-base);
      if(elapsed>=duration){
        clearInterval(timer);phase='complete';controls();paint(true);inform(scene.complete||'Complete');
      }else paint();
    }
    function start(){
      clearInterval(timer);elapsed=0;base=performance.now();phase='running';controls();paint(true);
      timer=setInterval(tick,100);
    }
    run.addEventListener('click',start);
    pause.addEventListener('click',()=>{
      if(phase==='running'){
        tick();
        if(phase==='complete')return;
        clearInterval(timer);phase='paused';inform('Paused · '+stages[lastStage].textContent);
      }else if(phase==='paused'){
        phase='running';base=performance.now()-elapsed;inform(stages[lastStage].textContent);timer=setInterval(tick,100);
      }
      controls();
    });
    cancel.addEventListener('click',()=>{
      clearInterval(timer);elapsed=0;phase='cancelled';controls();paint(true);inform('Cancelled');
      run.focus();
    });
    media.addEventListener('change',()=>paint(true));
    controls();paint(true);
  });
})();

(() => {
  const section=document.querySelector('#long-waits');
  const view=document.querySelector('#lw-expanded');
  const frame=view.querySelector('.lw-expanded-frame');
  let active=null;
  let slot=null;
  let opener=null;
  for(const button of section.querySelectorAll('[data-lw-expand]')){
    button.addEventListener('click',()=>{
      active=button.closest('.lw-card');
      opener=button;
      slot=document.createElement('div');
      slot.setAttribute('aria-hidden','true');
      slot.style.minHeight=active.getBoundingClientRect().height+'px';
      active.before(slot);
      button.hidden=true;
      frame.append(active);
      view.setAttribute('aria-labelledby',active.getAttribute('aria-labelledby'));
      view.showModal();
      view.querySelector('[data-lw-close]').focus();
    });
  }
  view.querySelector('[data-lw-close]').addEventListener('click',()=>view.close());
  view.addEventListener('close',()=>{
    if(!active)return;
    slot.replaceWith(active);
    opener.hidden=false;
    opener.focus();
    active=null;
    slot=null;
    opener=null;
  });
})();
