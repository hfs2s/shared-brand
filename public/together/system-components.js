(() => {
  const byId = id => document.getElementById(id);
  const status = root => root.querySelector('output.ds-status,[role="status"]');
  function announce(root, message) {
    const target = status(root);
    if (target) target.textContent = message;
  }
  function specimen(control) { return control.closest('.ds-preview') || control.parentElement; }
  function syncInput(input) {
    const output = input.closest('.ds-field')?.querySelector('output');
    if (!output) return;
    if (input.hasAttribute('data-range')) output.value = input.value + ' / ' + input.max;
    if (input.hasAttribute('data-color')) output.value = input.value.toUpperCase();
    if (input.hasAttribute('data-character-count')) output.value = input.value.length + ' / ' + input.maxLength;
    if (input.hasAttribute('data-file')) output.value = input.files[0]?.name || 'No file selected.';
  }

  for (const form of document.querySelectorAll('.ds-form')) {
    const errors = new Map();
    const hasError = input => {
      if (input.required && !input.value.trim()) return input.dataset.error || 'Complete this field.';
      if (!input.validity.valid) return input.dataset.error || input.validationMessage || 'Check this field.';
      if (input.matches('[data-upload]') && input.files.length) {
        const file = input.files[0];
        if (!/\.(jpe?g|png|webp|svg|pdf)$/i.test(file.name)) return 'Choose a JPG, PNG, SVG, WebP or PDF.';
        if (file.size > 10 * 1024 * 1024) return 'Choose a file under 10 MB.';
      }
      return '';
    };
    let serial = 0;
    const controls = [...form.querySelectorAll('input,select,textarea')];
    for (const control of controls) {
      const field = control.closest('.ds-field');
      if (!field) continue;
      const helper = field.querySelector('small');
      const id = form.dataset.example + '-' + ++serial;
      if (helper) {
        helper.id = id + '-help';
        control.setAttribute('aria-describedby', helper.id);
      }
      const error = document.createElement('small');
      error.id = id + '-error';
      error.className = 'ds-error';
      error.hidden = true;
      field.append(error);
      errors.set(control,{error,helper});
    }
    function setError(control, message) {
      const info = errors.get(control);
      if (!info) return;
      info.error.textContent = message;
      info.error.hidden = !message;
      if (message) control.setAttribute('aria-invalid','true');
      else control.removeAttribute('aria-invalid');
      const description = [info.helper?.id,message ? info.error.id : ''].filter(Boolean).join(' ');
      if (description) control.setAttribute('aria-describedby', description);
      else control.removeAttribute('aria-describedby');
    }
    form.addEventListener('input', event => {
      const control = event.target;
      if (control.getAttribute('aria-invalid') === 'true') setError(control,hasError(control));
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (form.getAttribute('aria-busy') === 'true') return;
      const invalid = controls.map(control => [control, hasError(control)]).filter(([,message]) => message);
      for (const control of controls) setError(control,invalid.find(([input])=>input===control)?.[1] || '');
      if (invalid.length) {
        announce(form, 'Check ' + (invalid.length === 1 ? 'the highlighted field.' : 'the highlighted fields.'));
        invalid[0][0].focus();
        return;
      }
      const button = form.querySelector('[type="submit"]');
      const label = button.textContent;
      const data = new FormData(form);
      form.setAttribute('aria-busy','true');
      button.setAttribute('aria-disabled','true');
      button.textContent = 'Working…';
      announce(form,'Working…');
      window.setTimeout(() => {
        let receipt = form.dataset.receipt;
        if (form.dataset.example === 'room') receipt = '“' + data.get('room').trim() + '” is ready as a sample room.';
        if (form.dataset.example === 'schedule') receipt = data.get('date') + ' at ' + data.get('time') + ' · ' + data.get('timezone');
        if (form.dataset.example === 'settings') receipt += ' Captions ' + (data.has('captions') ? 'on' : 'off') + '. Receipts ' + (data.has('receipts') ? 'on.' : 'off.');
        if (form.dataset.example === 'message') {
          const line = document.createElement('li');
          line.textContent = data.get('message').trim();
          form.nextElementSibling.append(line);
          form.reset();
          syncInput(form.querySelector('textarea'));
        }
        form.removeAttribute('aria-busy');
        button.removeAttribute('aria-disabled');
        button.textContent = label;
        announce(form,receipt);
      }, 240);
    });
  }

  for (const wrapper of document.querySelectorAll('[data-mini-tabs]')) {
    const tabs = [...wrapper.querySelectorAll('[role="tab"]')];
    function choose(selected, focus=false) {
      tabs.forEach((tab,i) => {
        tab.setAttribute('aria-selected',String(i===selected));
        tab.tabIndex = i===selected ? 0 : -1;
        byId(tab.getAttribute('aria-controls')).hidden = i!==selected;
      });
      if (focus) tabs[selected].focus();
    }
    tabs.forEach((tab,i) => {
      tab.addEventListener('click',()=>choose(i));
      tab.addEventListener('keydown',event=>{
        const target = {'ArrowLeft':(i+tabs.length-1)%tabs.length,'ArrowRight':(i+1)%tabs.length,Home:0,End:tabs.length-1}[event.key];
        if (target===undefined) return;
        event.preventDefault(); choose(target,true);
      });
    });
  }

  for(const row of document.querySelectorAll('[data-find]')){
    row.querySelector('input').addEventListener('input',event=>{
      const query = event.target.value.trim().toLowerCase();
      const items = [...row.querySelectorAll('li')];
      for(const item of items) item.hidden=!item.textContent.toLowerCase().includes(query);
      row.querySelector('output').value = items.filter(item=>!item.hidden).length + ' results';
    });
  }

  for (const field of document.querySelectorAll('[data-range],[data-color],[data-character-count],[data-file]')){
    field.addEventListener('input',()=>syncInput(field));
    field.addEventListener('change',()=>syncInput(field));
  }

  document.addEventListener('click', async event => {
    const btn = event.target.closest('.ds-preview button');
    if (!btn) return;
    const root = specimen(btn);
    const has = name => btn.hasAttribute('data-'+name);
    if (has('note')) announce(root, btn.dataset.note);
    if (has('toggle')){
      const active=btn.getAttribute('aria-pressed')!=='true';
      btn.setAttribute('aria-pressed',String(active));
      announce(root, btn.dataset.toggle + (active?' on.':' off.'));
    }
    if (has('page')){
      const bar=btn.closest('[data-pager]');
      const page=Math.min(3,Math.max(1,Number(bar.dataset.current||1)+Number(btn.dataset.page)));
      bar.dataset.current=page;
      bar.querySelector('output').value='Page '+page+' of 3';
      bar.querySelector('[data-page="-1"]').disabled=page===1;
      bar.querySelector('[data-page="1"]').disabled=page===3;
    }
    if (has('chip') || has('chip-reset')){
      const chips=[...root.querySelectorAll('[data-chip]')];
      if (has('chip')){
        btn.hidden=true;
        (chips.find(item=>!item.hidden) || root.querySelector('[data-chip-reset]')).focus();
      }else chips.forEach(item=>{item.hidden=false;});
      announce(root, chips.filter(item=>!item.hidden).length+' active filters');
    }
    if (has('toast')){
      const toast=root.querySelector('.ds-toast');
      toast.hidden=false;
      announce(toast,'Sample draft saved.');
    }
    if (has('toast-close')){
      btn.closest('.ds-toast').hidden=true;
      root.querySelector('[data-toast]').focus();
    }
    if (has('run-progress')){
      const progress=root.querySelector('progress');
      btn.disabled=true;
      progress.value=0;
      announce(root,'Preparing files.');
      const running=setInterval(()=>{
        progress.value+=20;
        if(progress.value<100)return;
        clearInterval(running);
        announce(root,'Export ready.');
        btn.disabled=false;
      },100);
    }
    if (has('fill-empty')){
      root.querySelector('[data-empty]').replaceChildren(Object.assign(document.createElement('p'),{textContent:'Paper plotter.svg added to the sample room.'}));
    }
    if (has('recover')){
      announce(root,'Retrying…');
      btn.disabled=true;
      setTimeout(()=>{announce(root,'Artwork loaded. Your filters are still set.');btn.disabled=false;},250);
    }
    if (has('load-preview')){
      root.querySelector('.ds-placeholder').hidden=false;
      root.querySelector('.ds-loaded-preview').hidden=true;
      announce(root,'Loading preview…');
      btn.disabled=true;
      setTimeout(()=>{
        root.querySelector('.ds-placeholder').hidden=true;
        root.querySelector('.ds-loaded-preview').hidden=false;
        announce(root,'Paper plotter preview is ready.');
        btn.disabled=false;
      },350);
    }
    if (btn.closest('[data-sort]')){
      const table=btn.closest('table');
      const h=btn.closest('th');
      const ascending=h.getAttribute('aria-sort')!=='ascending';
      const rows=[...table.tBodies[0].rows].sort((a,b)=>a.cells[0].textContent.localeCompare(b.cells[0].textContent)*(ascending?1:-1));
      table.tBodies[0].append(...rows);
      h.setAttribute('aria-sort',ascending?'ascending':'descending');
    }
    if (has('open-dialog')) byId(btn.dataset.openDialog).showModal();
    if (has('close-dialog')) btn.closest('dialog').close();
    if (has('confirm-remove')){
      btn.closest('dialog').close();
      root.querySelector('[data-removable]').hidden=true;
      root.querySelector('[data-open-dialog]').hidden=true;
      const restore=root.querySelector('[data-restore-room]');
      restore.hidden=false;
      restore.focus();
      byId('remove-state').value='Draft test room removed from the preview.';
    }
    if (has('restore-room')){
      root.querySelector('[data-removable]').hidden=false;
      const trigger=root.querySelector('[data-open-dialog]');
      trigger.hidden=false;
      btn.hidden=true;
      trigger.focus();
      byId('remove-state').value='Draft test room restored.';
    }
    if (has('guest')){
      const next=btn.dataset.guest;
      const waiting=next==='Waiting in the lobby';
      const choices=[...root.querySelectorAll('[data-guest]')];
      for (const choice of choices) choice.hidden=waiting ? choice===choices[2] : choice!==choices[2];
      root.querySelector('[data-guest-state]').textContent=next;
      announce(root,'Sample guest · '+next);
      (waiting?choices[0]:choices[2]).focus();
    }
    if (has('reveal')){
      const control=btn.parentElement.querySelector('input');
      const visible=control.type==='password';
      control.type=visible?'text':'password';
      btn.textContent=visible?'Hide':'Show';
      btn.setAttribute('aria-pressed',String(visible));
    }
    if (has('show-id')){
      const target=byId(btn.dataset.showId);
      target.hidden=!target.hidden;
      btn.setAttribute('aria-expanded',String(!target.hidden));
      btn.textContent=target.hidden?'Show captions':'Hide captions';
    }
    if (has('ds-copy')){
      try {await navigator.clipboard.writeText(btn.dataset.dsCopy);announce(root,'Sample link copied.');}
      catch {announce(root,btn.dataset.dsCopy);}
    }
  });
  for (const tip of document.querySelectorAll('.ds-tip')){
    tip.addEventListener('keydown',event=>{if(event.key==='Escape')tip.dataset.dismissed='true';});
    tip.addEventListener('focusout',()=>{delete tip.dataset.dismissed;});
    tip.addEventListener('mouseleave',()=>{delete tip.dataset.dismissed;});
  }
})();

for (const reference of document.querySelectorAll('[data-reference]')) {
  const query = reference.querySelector('[data-spec-query]');
  const groups = [...reference.querySelectorAll('.ds-group')];
  const entries = [...reference.querySelectorAll('.ds-entry')];
  query.addEventListener('input',() => {
    const terms=query.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    for (const entry of entries) {
      const content=entry.querySelector('.row-copy').textContent.toLowerCase();
      entry.hidden=!terms.every(term=>content.includes(term));
    }
    for (const group of groups) group.hidden=[...group.querySelectorAll('.ds-entry')].every(item=>item.hidden);
    const active=entries.filter(entry=>!entry.hidden).length;
    reference.querySelector('[data-spec-count]').value=active+' examples';
    reference.querySelector('[data-spec-empty]').hidden=active>0;
  });
}
