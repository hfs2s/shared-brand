(() => {
  const byId=id=>document.getElementById(id);
  const family=byId('brand-type-family'), size=byId('brand-type-range'), weight=byId('tr-weight');
  const leading=byId('tr-leading'), tracking=byId('tr-tracking'), measure=byId('tr-width');
  const text=byId('brand-type-text'), preview=byId('type-specimen');
  const css=byId('tr-css'), result=byId('tr-copy-result');
  const families={
    serif:{min:400,max:400},
    sans:{min:100,max:900},
    mono:{min:100,max:800}
  };
  const presets={
    headline:['serif',74,400,.95,-.012,28,'A place to work together.'],
    product:['sans',27,650,1.2,-.027,38,'Campaign review'],
    body:['sans',16,400,1.5,0,62,'Juan brings a folded paper model into the room. Lola points out the next change and Nando checks the drawing. The team decides what to do next.'],
    mono:['mono',12,550,1.4,.02,54,'CAMPAIGN / PAPER PLOTTER / 00:26']
  };
  const presetButtons=[...document.querySelectorAll('[data-type-preset]')];
  function render(){
    const range=families[family.value];
    weight.min=range.min;
    weight.max=range.max;
    weight.disabled=range.min===range.max;
    weight.value=Math.min(range.max,Math.max(range.min,Number(weight.value)));
    const parameters={
      '--tr-preview-face':'var(--'+(family.value === 'serif' ? 'display-serif' : family.value)+')',
      '--tr-preview-size':size.value+'px',
      '--tr-preview-weight':weight.value,
      '--tr-preview-leading':leading.value,
      '--tr-preview-tracking':tracking.value+'em',
      '--tr-preview-measure':measure.value+'ch'
    };
    Object.entries(parameters).forEach(([key,val])=>preview.style.setProperty(key,val));
    preview.textContent=text.value||'A place to work together.';
    byId('brand-type-size').value=size.value+' px';
    byId('tr-weight-output').value=weight.value;
    byId('tr-leading-output').value=leading.value;
    byId('tr-tracking-output').value=tracking.value+'em';
    byId('tr-width-output').value=measure.value+'ch';
    css.textContent=[
      'font-family: '+parameters['--tr-preview-face']+';',
      'font-size: '+parameters['--tr-preview-size']+';',
      'font-weight: '+weight.value+';',
      'line-height: '+leading.value+';',
      'letter-spacing: '+parameters['--tr-preview-tracking']+';',
      'max-inline-size: '+parameters['--tr-preview-measure']+';'
    ].join('\n');
  }
  for(const control of [family,size,weight,leading,tracking,measure,text]){
    control.addEventListener('input',()=>{
      for(const item of presetButtons)item.setAttribute('aria-pressed','false');
      render();
    });
  }
  for(const item of presetButtons){
    item.setAttribute('aria-pressed','false');
    item.addEventListener('click',()=>{
      const [face,s,w,l,t,m,copy]=presets[item.dataset.typePreset];
      family.value=face;
      const {min,max}=families[face];
      weight.min=min;
      weight.max=max;
      [size.value,weight.value,leading.value,tracking.value,measure.value,text.value]=[s,w,l,t,m,copy];
      for(const button of presetButtons)button.setAttribute('aria-pressed',String(button===item));
      result.value='';
      render();
    });
  }
  byId('tr-copy').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(css.textContent);result.value='CSS copied.';}
    catch{result.value='Select the CSS above to copy it.';}
  });
  render();
})();
