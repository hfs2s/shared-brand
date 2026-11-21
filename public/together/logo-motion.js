(async () => {
  const startup = document.querySelector('[data-torus-loader]');
  const loader = startup || document.querySelector('#logo-loader');
  if (!loader) return;
  const screen = loader.querySelector('.solo-screen');
  const image = screen.querySelector('img');
  const canvas = screen.querySelector('canvas');
  const select = loader.querySelector('select');
  const play = loader.querySelector('.solo-play');
  const indexes = Array.from(document.querySelectorAll('.logo-index'));
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = ['On paper', 'Mechanical type', 'Folded space', 'Orbital forms', 'Particle physics', 'Finales'];
  const tau = Math.PI * 2;
  const { sin, cos, abs, hypot } = Math;
  const clamp = n => Math.min(1, Math.max(0,n));
  const ease = n => { n = clamp(n); return n*n*(3-2*n); };
  const mix = (a,b,n) => a+(b-a)*n;
  const palette = ['#f18d53','#1eb278','#3d69f6'];
  const title = (i,name) => String(i+1).padStart(2,'0')+' · '+name;

  // Every pose is a rearrangement of the ink cells of the original wordmark.
  // u and v locate a cell on its design grid; a and b are its angular coordinates.
  const poses = [
    ['Carbon copy', ({x,y},t) => [x+5*sin(t+y*.14),y,0]],
    ['Roller press', ({x,y,u},t) => [x,y*.56+6*sin(u*tau+t),1.5*cos(u*tau+t)]],
    ['Split register', ({x,y,row},t) => [x+(row%3-1)*(8+3*sin(t)),y+(row%3-1)*2,0]],
    ['Concertina', ({x,y,u},t) => [x*.73,y+6*Math.asin(sin(u*4*tau+t)),5*cos(u*4*tau+t)]],
    ['Type cascade', ({x,y,letter},t) => [x*.87,y+9*sin(letter*.95+t),5*cos(letter*.95+t)]],
    ['Flip drum', ({x,y,u},t) => [x*.9,y*cos(t+u*4),y*sin(t+u*4)]],
    ['Piston bank', ({x,y,col},t) => [x*.85,y+7*sin(Math.floor(col/3)*.76+t),6*cos(Math.floor(col/3)*.76+t)]],
    ['Zipper teeth', ({x,y,col},t) => [x*.82+(col%2?1:-1)*3*sin(t),y*.65+(col%2?1:-1)*(7+2*cos(x*.18+t)),4*sin(x*.18+t)]],
    ['Rotary shutters', ({x,y,letter,center},t) => [center*.85+(x-center)*cos(t+letter*.85),y,(x-center)*sin(t+letter*.85)]],
    ['Escapement', ({x,y,letter,center},t) => {
      const turn=(letter%2?-1:1)*(t+letter*.52), dx=x-center;
      return [center*.83+dx*cos(turn)-y*sin(turn),dx*sin(turn)+y*cos(turn)+3*sin(letter+t),4*cos(turn)];
    }],
    ['Pleated fan', ({u,y},t) => {
      const angle=(u-.5)*2.7+.18*sin(t), r=18+y*.85;
      return [r*sin(angle),11-r*cos(angle),4*cos(u*5*tau+t)];
    }],
    ['Silk flag', ({x,y,u,v},t) => [x*.84+2*sin(v*4+t),y+6*sin(u*tau+t+v),8*sin(u*1.5*tau+t)]],
    ['Page curl', ({x,y,u},t) => {
      const a=u*1.6*tau+t;return [x*.52+8*sin(a),y*.85+4*cos(a),10*cos(a)];
    }],
    ['Prism twist', ({x,y,u},t) => {
      const a=u*tau+t, edge=Math.round(a/(tau/3))*(tau/3);
      return [x*.84,y*cos(edge)+6*sin(a),y*sin(edge)+6*cos(a)];
    }],
    ['Double helix', ({x,y,u,row},t) => {
      const a=u*1.6*tau+t+(row%2)*Math.PI,r=8+y*.38;
      return [x*.82,r*sin(a),r*cos(a)];
    }],
    ['Saturn ring', ({a,y},t) => {
      const r=18+y*.8,q=a+t;return [r*cos(q),r*sin(q)*.4+2*cos(q),r*sin(q)*.68];
    }],
    ['Meridian globe', ({a,b},t) => {
      const q=a+t,r=15*cos(b);return [r*cos(q),14*sin(b)+2*sin(q),r*sin(q)];
    }],
    ['Gyroscope', ({a,y,letter},t) => {
      const q=a*3+t, tilt=letter*Math.PI/6+sin(t)*.3,r=13+y*.45;
      return [r*cos(q)*cos(tilt)-r*sin(q)*.32*sin(tilt),r*cos(q)*sin(tilt)+r*sin(q)*.32*cos(tilt),r*sin(q)];
    }],
    ['Möbius strip', ({a,y},t) => {
      const q=a+2*t,r=16+y*cos(q/2);return [r*cos(q),r*sin(q)*.36+y*sin(q/2),r*sin(q)*.68];
    }],
    ['Torus knot', ({a,y},t) => {
      const q=a+sin(t)*.55,r=11+5*cos(3*q)+y*.32;return [r*cos(2*q),r*sin(2*q)*.67+4*sin(3*q),8*sin(3*q)+y*.55];
    }],
    ['Magnetic field', ({a,y,row},t) => {
      const q=a+t,r=8+y*.5,side=row%2?1:-1;return [side*11+r*cos(q),r*sin(q)*cos(q)*1.7+3*sin(t+side),8*sin(q)];
    }],
    ['Gravity lens', ({x,y,r},t) => {
      const q=1.9*Math.exp(-r/19)+.4*sin(t),scale=.74+4/(r+3);
      return [(x*cos(q)-y*sin(q))*scale,(x*sin(q)+y*cos(q))*scale,11*cos(r*.15-t)];
    }],
    ['Spiral galaxy', ({a,u,v,letter},t) => {
      const q=a*1.4+t+letter*tau/3,r=3+19*u;return [r*cos(q),r*sin(q)*.55+(v-.5)*5,9*sin(q)+v*3];
    }],
    ['Shock front', ({x,y,r},t) => {
      const wave=sin(r*.4-t*2),scale=.72+wave*3/(r+2);return [x*scale,y*scale+wave*4,10*wave];
    }],
    ['Crystal bloom', ({u,v,letter},t) => {
      const q=letter*tau/6+sin(t)*.35, l=4+15*sin(u*Math.PI), s=(v-.5)*8;
      return [l*cos(q)-s*sin(q),l*sin(q)*.8+s*cos(q),9*sin(u*tau+q)];
    }],
    ['Stained glass', ({x,y,letter,center},t) => {
      const q=letter*tau/6+sin(t)*.4,local=x-center, r=10+local*cos(t+q);
      return [r*cos(q)-y*sin(q),r*sin(q)+y*cos(q),local*sin(t+q)+5*cos(q)];
    }],
    ['Vortex tunnel', ({a,u,v},t) => {
      const q=a*2+t+v*.45,r=4+u*15;return [r*cos(q),r*sin(q)*.73,21*(.5-u)+4*cos(q)];
    }],
    ['Aurora curtain', ({x,y,u,v},t) => {
      const q=u*2*tau+t;return [x*.72+5*sin(q+v),y*(.5+.45*cos(q))+7*sin(u*tau+t)+4*sin(q+v*2),12*cos(q)+v*3];
    }],
    ['Supernova', ({a,u,v,seed},t) => {
      const q=Math.round(a/(tau/18))*(tau/18)+sin(t)*.24, r=3+18*seed+3*sin(t+u*tau);
      return [r*cos(q),r*sin(q)*.82,12*sin(v*tau+q)];
    }],
    ['Grand synthesis', (cell,t) => {
      // Fold the knot into a galaxy, then send it through the radial burst.
      const phase=2*ease(clamp(t/(tau*.55)))*(1-ease((t/tau-.74)/.12)), first=phase<1?19:22, next=phase<1?22:28;
      const p=poses[first][1](cell,t), q=poses[next][1](cell,t);
      return p.map((v,k)=>mix(v,q[k],ease(phase<1?phase:phase-1)));
    }]
  ];

  const ctx=canvas.getContext('2d');
  const finishStartup = () => startup?.dispatchEvent(new Event('torus-finished'));
  if (!ctx) return finishStartup();
  try { await image.decode(); } catch { return finishStartup(); }
  // The wordmark is read at two samples a module. Every form sits on whole
  // modules except the three dots of the reply bubble: they are centred in it,
  // on the half module, so each takes one quarter out of four cells. Such a
  // cell carries `notch`, the corner it gives up. `snap` marks the one cell a
  // dot that whole-module materials (beads, stitches, tiles) leave out instead.
  const grid=document.createElement('canvas');
  grid.width=132;grid.height=38;
  const sample=grid.getContext('2d');
  sample.drawImage(image,0,0,132,38);
  const bytes=sample.getImageData(0,0,132,38).data;
  const cells=[];
  const centers=[7,17,28,39,49,59];
  const corners=[[-1,-1],[1,-1],[-1,1],[1,1]];
  for(let row=0;row<19;row++) for(let col=0;col<66;col++){
    const quarters=corners.map(([sx,sy])=>((row*2+(sy+1)/2)*132+col*2+(sx+1)/2)*4);
    const inked=quarters.filter(q=>bytes[q+3]>=128);
    if(inked.length<3) continue;
    const offset=inked[0], notch=inked.length<4?corners[quarters.findIndex(q=>bytes[q+3]<128)]:null;
    const x=col-32.5,y=row-9,u=(col-3)/60,v=(row-3)/13;
    const letter=centers.reduce((best,c,i)=>abs(col-c)<abs(col-centers[best])?i:best,0);
    cells.push({x,y,col,row,u,v,a:u*tau,b:(v-.5)*Math.PI,letter,center:centers[letter]-32.5,
      seed:((col*31+row*47)%103)/103,r:hypot(x,y),ink:'rgb('+bytes.slice(offset,offset+3).join(',')+')',
      color:palette[(letter+Math.floor(row/3))%3],notch,snap:!!notch&&notch[0]===1&&notch[1]===-1});
  }

  const directions = startup ? null : createLogoDirections(image,cells);
  const paper = startup ? null : createPaperLogos(image,cells);
  const paperStart = poses.length + (directions?.studies.length ?? 0);
  function paint(target,width,height,id,t){
    if(id>=paperStart) return paper.paint(target,width,height,id-paperStart,t);
    if(id>=poses.length) return directions.paint(target,width,height,id-poses.length,t);
    const chapter=Math.floor(id/5),angle=t*tau;
    // The finale spends its first half moving through three complete structures.
    const wave=id===29 ? 1-ease((t-.54)/.21)+ease((t-.87)/.12)
                       : 1-ease((t-.11)/.34)+ease((t-.67)/.29);
    target.clearRect(0,0,width,height);
    const unit=width*.94/66;
    if(wave===0){
      target.drawImage(image,width*.03,(height-unit*19)/2,unit*66,unit*19);
      return;
    }
    const tiles=cells.map(cell=>{
      const blend=ease(clamp(wave*(1.28-.26*cell.u)));
      const [x,y,z]=poses[id][1](cell,angle);
      const depth=z*blend;
      const scale=unit/(1-depth/85);
      return {cell,blend,depth,scale,x:width/2+mix(cell.x,x,blend)*scale,y:height/2+mix(cell.y,y,blend)*scale};
    });
    tiles.sort((a,b)=>a.depth-b.depth);
    // The last two collections add motion echoes and perspective-cut facets.
    if(chapter>=4){
      target.save();
      for(const p of tiles){
        const reach=p.blend*p.scale*(chapter===5?2.7:1.4);
        target.fillStyle=p.cell.color;
        for(let echo=2;echo>=1;echo--){
          target.globalAlpha=(3-echo)*.12*p.blend;
          target.fillRect(p.x+reach*echo*sin(p.cell.a+angle),p.y+reach*echo*cos(p.cell.a+angle),p.scale,p.scale);
        }
      }
      target.restore();
    }
    for(const p of tiles){
      const {cell,blend,scale,x,y,depth}=p, half=scale*(.502-.09*blend);
      const extrusion=scale*blend*(.18+chapter*.34)*(1+depth/45);
      if(extrusion>.1){
        target.fillStyle=cell.color;target.beginPath();
        target.moveTo(x-half,y+half);target.lineTo(x+half,y+half);target.lineTo(x+half,y-half);
        target.lineTo(x+half+extrusion,y-half+extrusion);target.lineTo(x+half+extrusion,y+half+extrusion);
        target.lineTo(x-half+extrusion,y+half+extrusion);target.fill();
      }
      target.fillStyle=blend>.24 && chapter>=2 && depth < -2 ? cell.color : cell.ink;
      if(cell.notch){
        // Beside a dot: the square less the quarter the dot takes.
        const [sx,sy]=cell.notch;
        target.beginPath();target.moveTo(x-sx*half,y-sy*half);target.lineTo(x+sx*half,y-sy*half);target.lineTo(x+sx*half,y);
        target.lineTo(x,y);target.lineTo(x,y+sy*half);target.lineTo(x-sx*half,y+sy*half);target.fill();
      }else target.fillRect(x-half,y-half,2*half,2*half);
      if(chapter===5 && blend>.12){
        target.globalAlpha=blend*.78;target.fillStyle=cell.color;target.beginPath();
        target.moveTo(x-half,y-half);target.lineTo(x+half,y-half);target.lineTo(x-half,y+half);target.fill();
        target.globalAlpha=1;
      }
    }
  }

  if (startup) {
    const knot = poses.findIndex(([name]) => name === 'Torus knot');
    if (motion.matches || knot < 0) return finishStartup();
    const duration = 6400;
    // At this point the Motion pose has fully resolved into the wordmark.
    const wordmarkPhase = .45;
    let frame = 0, elapsed = 0, last = null, visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncStartup();
    });
    function finish() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener('change', syncStartup);
      document.removeEventListener('visibilitychange', syncStartup);
      finishStartup();
    }
    function draw(now) {
      if (last !== null) elapsed += now - last;
      last = now;
      const scale = Math.min(devicePixelRatio, 2);
      const width = Math.max(1, Math.round(screen.clientWidth * scale));
      const height = Math.max(1, Math.round(screen.clientHeight * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const phase = Math.min(elapsed / duration, wordmarkPhase);
      paint(ctx, width, height, knot, phase);
      startup.classList.add('animated');
      // Give the final frame a paint before handing off to the page.
      frame = requestAnimationFrame(phase === wordmarkPhase ? finish : draw);
    }
    function syncStartup() {
      cancelAnimationFrame(frame);
      last = null;
      if (motion.matches) return finish();
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    }
    observer.observe(startup);
    motion.addEventListener('change', syncStartup);
    document.addEventListener('visibilitychange', syncStartup);
    return;
  }

  const names = [...poses.map(([name])=>name), ...directions.studies.map(study=>study.name), ...paper.studies.map(study=>study.name)];
  const thumbs=[];
  [...chapters,...directions.chapters,...paper.chapters].forEach((chapter,group)=>{
    const optgroup=document.createElement('optgroup');optgroup.label=chapter;
    const section=document.createElement('section');
    const heading=document.createElement('h2');heading.textContent=chapter;
    const shelf=document.createElement('div');shelf.className='logo-shelf';
    names.slice(group*5,group*5+5).forEach((name,j)=>{
      const i=group*5+j,label=title(i,name);
      optgroup.append(new Option(label,String(i)));
      const tile=document.createElement('button');tile.type='button';tile.dataset.variant=i;
      const preview=document.createElement('canvas');preview.width=300;preview.height=172;preview.setAttribute('aria-hidden','true');
      const caption=document.createElement('span');caption.textContent=label;
      tile.append(preview,caption);shelf.append(tile);thumbs.push(tile);
    });
    select.append(optgroup);section.append(heading,shelf);indexes.find(el=>el.dataset.edition===(group<6?'original':group<12?'new':'paper')).querySelector('.logo-collections').append(section);
  });
  indexes.forEach(index=>index.addEventListener('toggle',()=>{
    if(index.dataset.drawn || !index.open)return;
    for(const tile of index.querySelectorAll('[data-variant]')){
      const i=Number(tile.dataset.variant), c=tile.querySelector('canvas');
      paint(c.getContext('2d'),c.width,c.height,i,i<paperStart?(i<30?.055:directions.studies[i-30].poster):paper.studies[i-paperStart].poster);
    }
    index.dataset.drawn='true';
  }));

  let selected=0,time=0,last=null,frame=0,paused=false,visible=false;
  function draw(){
    const duration=selected===29?11000:6400;
    paint(ctx,canvas.width,canvas.height,selected,(time%duration)/duration);
  }
  function tick(now){
    if(last!==null)time+=now-last;
    last=now;draw();frame=requestAnimationFrame(tick);
  }
  function sync(){
    cancelAnimationFrame(frame);last=null;play.hidden=motion.matches;
    loader.classList.toggle('animated',!motion.matches);
    if(visible&&!paused&&!motion.matches&&!document.hidden)frame=requestAnimationFrame(tick);
  }
  function choose(id,link=true){
    selected=(id+names.length)%names.length;select.value=String(selected);time=0;last=null;
    thumbs.forEach((tile,i)=>tile.setAttribute('aria-current',String(i===selected)));
    screen.setAttribute('aria-label',names[selected]+', Shared logo loader '+(selected+1)+' of '+names.length);
    if(link){const url=new URL(location.href);url.searchParams.set('variant',selected+1);history.replaceState(null,'',url);}
    draw();sync();
  }
  select.addEventListener('change',()=>choose(Number(select.value)));
  loader.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>choose(selected+Number(b.dataset.step))));
  indexes.forEach(index=>index.addEventListener('click',event=>{
    const tile=event.target.closest('[data-variant]');if(!tile)return;
    choose(Number(tile.dataset.variant));select.focus({preventScroll:true});loader.scrollIntoView({block:'center'});
  }));
  play.addEventListener('click',()=>{paused=!paused;play.textContent=paused?'Resume':'Pause';sync();});
  new ResizeObserver(()=>{
    const scale=Math.min(devicePixelRatio,2);
    canvas.width=Math.max(1,Math.round(screen.clientWidth*scale));canvas.height=Math.max(1,Math.round(screen.clientHeight*scale));draw();
  }).observe(screen);
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(screen);
  motion.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  indexes.forEach(index=>{index.hidden=false;});loader.querySelector('.solo-fallback').hidden=true;loader.querySelector('.solo-controls').hidden=false;
  const initial=Number(new URL(location.href).searchParams.get('variant'));
  choose(Number.isInteger(initial)&&initial>=1&&initial<=names.length?initial-1:0,false);
})();
