/* ░░ Editor de texto Viventi — v3 ░░
   Ative com Shift+E ou adicione #editar na URL.
   Salva em vvTE: (localStorage). Limpa automaticamente chaves antigas (vvText:/vvText2:). */
(function () {
  'use strict';

  // ── Limpar chaves antigas na primeira execução ──────────────────────────
  var PAGE = location.pathname.split('/').pop();
  var KEY  = 'vvTE:' + PAGE;
  ['vvText:', 'vvText2:'].forEach(function (prefix) {
    try { localStorage.removeItem(prefix + PAGE); } catch (e) {}
  });

  var store = {};
  try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

  // ── Estilos ──────────────────────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent =
    '[data-vv-editing] [data-te]{cursor:text;outline:1px dashed rgba(186,117,44,.4);outline-offset:3px;border-radius:3px;}' +
    '[data-vv-editing] [data-te]:hover{outline-color:rgba(186,117,44,.85);background:rgba(186,117,44,.05);}' +
    '[data-vv-editing] [data-te]:focus{outline:2px solid #BA752C;background:rgba(186,117,44,.08);}' +
    '.vvte-btn{position:fixed;left:18px;bottom:18px;z-index:9998;display:none;align-items:center;gap:8px;padding:11px 16px;background:#313232;color:#FBF4EC;border:0;border-radius:999px;font-family:Montserrat,sans-serif;font-size:12.5px;font-weight:600;letter-spacing:.02em;cursor:pointer;box-shadow:0 10px 30px -8px rgba(49,50,50,.5);}' +
    '.vvte-bar{position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:9999;display:none;align-items:center;gap:5px;padding:8px 10px;background:#fff;border:1px solid #ECD9C2;border-radius:14px;box-shadow:0 16px 40px -12px rgba(49,50,50,.3);font-family:Montserrat,sans-serif;color:#313232;flex-wrap:wrap;max-width:95vw;}' +
    '[data-vv-editing] .vvte-bar{display:flex;}' +
    '.vvte-bar button{border:1px solid #ECD9C2;background:#FBF4EC;border-radius:8px;padding:7px 10px;font-size:13px;font-weight:600;cursor:pointer;color:#313232;font-family:inherit;line-height:1;}' +
    '.vvte-bar button:hover{background:#F3E7D6;}' +
    '.vvte-bar .on{background:#BA752C!important;color:#fff!important;border-color:#BA752C!important;}' +
    '.vvte-bar .done{background:#BA752C;color:#fff;border-color:#BA752C;}' +
    '.vvte-bar .sep{width:1px;height:22px;background:#ECD9C2;margin:0 2px;}' +
    '.vvte-bar .lbl{font-size:11px;color:#8a8378;padding:0 4px;}' +
    '.vvte-bar b{font-weight:800;font-size:14px;}' +
    '.vvte-bar em{font-style:italic;font-size:14px;}' +
    '.vvte-bar u{text-decoration:underline;font-size:14px;}';
  document.head.appendChild(css);

  // ── Coletar elementos editáveis ──────────────────────────────────────────
  var SEL = 'h1,h2,h3,h4,h5,h6,p,li,figcaption,blockquote';
  var all = Array.from(document.querySelectorAll(SEL)).filter(function (el) {
    if (el.closest('[data-vv-ui]') || !el.textContent.trim()) return false;
    return true;
  });

  // Chave estável = tag + primeiros 60 chars do texto original + índice de desambiguação
  var keyCount = {};
  all.forEach(function (el) {
    var tag = el.tagName.toLowerCase();
    var raw = el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60);
    var base = tag + '\u00b6' + raw;
    keyCount[base] = (keyCount[base] || 0) + 1;
    var k = base + (keyCount[base] > 1 ? '\u00b6' + keyCount[base] : '');
    el.setAttribute('data-te', k);
  });

  // ── Restaurar edições salvas ─────────────────────────────────────────────
  all.forEach(function (el) {
    var k = el.getAttribute('data-te');
    var s = store[k]; if (!s) return;
    if (s.html !== undefined) el.innerHTML = s.html;
    if (s.fs)  el.style.fontSize  = s.fs;
    if (s.ta)  el.style.textAlign = s.ta;
    if (s.fw)  el.style.fontWeight = s.fw;
    if (s.fi)  el.style.fontStyle  = s.fi;
    if (s.td)  el.style.textDecoration = s.td;
  });

  function persist(el) {
    var k = el.getAttribute('data-te'); if (!k) return;
    store[k] = {
      html: el.innerHTML,
      fs: el.style.fontSize || '',
      ta: el.style.textAlign || '',
      fw: el.style.fontWeight || '',
      fi: el.style.fontStyle || '',
      td: el.style.textDecoration || ''
    };
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {}
  }

  // ── Botão de lançamento ──────────────────────────────────────────────────
  var btn = document.createElement('button');
  btn.className = 'vvte-btn'; btn.setAttribute('data-vv-ui', '');
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg><span>Editar textos</span>';
  document.body.appendChild(btn);

  // ── Barra de ferramentas ─────────────────────────────────────────────────
  var bar = document.createElement('div');
  bar.className = 'vvte-bar'; bar.setAttribute('data-vv-ui', '');
  bar.innerHTML =
    '<span class="lbl">Clique num texto para editar</span>' +
    '<span class="sep"></span>' +
    '<button data-a="dec" title="Diminuir fonte">A−</button>' +
    '<button data-a="inc" title="Aumentar fonte">A+</button>' +
    '<button data-a="fs0" title="Tamanho original">↺</button>' +
    '<span class="sep"></span>' +
    '<button data-a="bold" title="Negrito"><b>B</b></button>' +
    '<button data-a="italic" title="Itálico"><em>I</em></button>' +
    '<button data-a="underline" title="Sublinhado"><u>U</u></button>' +
    '<span class="sep"></span>' +
    '<button data-a="al" title="Esquerda"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect y="4.5" width="9" height="2" rx="1"/><rect y="9" width="11" height="2" rx="1"/></svg></button>' +
    '<button data-a="ac" title="Centro"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect x="2.5" y="4.5" width="9" height="2" rx="1"/><rect x="1.5" y="9" width="11" height="2" rx="1"/></svg></button>' +
    '<button data-a="ar" title="Direita"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect x="5" y="4.5" width="9" height="2" rx="1"/><rect x="3" y="9" width="11" height="2" rx="1"/></svg></button>' +
    '<button data-a="aj" title="Justificado"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect y="4.5" width="14" height="2" rx="1"/><rect y="9" width="14" height="2" rx="1"/></svg></button>' +
    '<span class="sep"></span>' +
    '<button data-a="reset">Restaurar tudo</button>' +
    '<button class="done" data-a="done">Concluir</button>';
  document.body.appendChild(bar);

  var active = null, editing = false;

  function curEl() {
    var ae = document.activeElement;
    if (ae && ae.getAttribute && ae.getAttribute('data-te')) return ae;
    return active;
  }

  // Sync alignment buttons highlight
  function syncBar(el) {
    var align = el ? (el.style.textAlign || '') : '';
    var fw = el ? (el.style.fontWeight || '') : '';
    var fi = el ? (el.style.fontStyle || '') : '';
    var td = el ? (el.style.textDecoration || '') : '';
    ['al','ac','ar','aj'].forEach(function(a){
      var b = bar.querySelector('[data-a="'+a+'"]');
      if (b) b.classList.remove('on');
    });
    var map = {left:'al',center:'ac',right:'ar',justify:'aj'};
    if (map[align]) { var b = bar.querySelector('[data-a="'+map[align]+'"]'); if(b) b.classList.add('on'); }
    var boldBtn = bar.querySelector('[data-a="bold"]');
    if (boldBtn) boldBtn.classList.toggle('on', /bold|700/.test(fw));
    var italicBtn = bar.querySelector('[data-a="italic"]');
    if (italicBtn) italicBtn.classList.toggle('on', fi === 'italic');
    var underBtn = bar.querySelector('[data-a="underline"]');
    if (underBtn) underBtn.classList.toggle('on', /underline/.test(td));
  }

  document.addEventListener('focusin', function (e) {
    var el = e.target.closest && e.target.closest('[data-te]');
    if (el) { active = el; syncBar(el); }
  });
  document.addEventListener('input', function (e) {
    var el = e.target.closest && e.target.closest('[data-te]');
    if (el && editing) persist(el);
  });
  document.addEventListener('click', function (e) {
    if (!editing) return;
    var el = e.target.closest && e.target.closest('[data-te]');
    if (el) { e.stopPropagation(); var a = e.target.closest('a'); if (a) e.preventDefault(); }
  }, true);

  // ── Nudge font size (element level — no nested spans) ────────────────────
  function nudge(factor) {
    var el = curEl(); if (!el) return;
    var cur = parseFloat(el.style.fontSize || getComputedStyle(el).fontSize) || 16;
    el.style.fontSize = Math.round(cur * factor) + 'px';
    persist(el);
  }

  // ── Toggle CSS property ──────────────────────────────────────────────────
  function toggleProp(el, prop, onVal, offVal) {
    el.style[prop] = (el.style[prop] === onVal) ? (offVal || '') : onVal;
    persist(el); syncBar(el);
  }

  // ── Barra: clique ────────────────────────────────────────────────────────
  bar.addEventListener('mousedown', function (e) { if (e.target.closest('button')) e.preventDefault(); });
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var a = b.getAttribute('data-a');
    var el = curEl();
    if (a === 'inc') { nudge(1.12); }
    else if (a === 'dec') { nudge(1/1.12); }
    else if (a === 'fs0') { if(el){el.style.fontSize='';persist(el);} }
    else if (a === 'bold')      { if(el) toggleProp(el,'fontWeight','bold',''); }
    else if (a === 'italic')    { if(el) toggleProp(el,'fontStyle','italic',''); }
    else if (a === 'underline') { if(el) toggleProp(el,'textDecoration','underline',''); }
    else if (a === 'al') { if(el){el.style.textAlign='left';persist(el);syncBar(el);} }
    else if (a === 'ac') { if(el){el.style.textAlign='center';persist(el);syncBar(el);} }
    else if (a === 'ar') { if(el){el.style.textAlign='right';persist(el);syncBar(el);} }
    else if (a === 'aj') { if(el){el.style.textAlign='justify';persist(el);syncBar(el);} }
    else if (a === 'done') { setEditing(false); }
    else if (a === 'reset') {
      if (confirm('Desfazer todas as edições de texto desta página?')) {
        store = {}; try { localStorage.removeItem(KEY); } catch(err){} location.reload();
      }
    }
  });

  // ── Ligar/desligar modo edição ───────────────────────────────────────────
  function setEditing(on) {
    editing = on;
    document.documentElement.toggleAttribute('data-vv-editing', on);
    all.forEach(function (el) {
      if (on) { el.setAttribute('contenteditable','true'); el.spellcheck = false; }
      else { el.removeAttribute('contenteditable'); }
    });
    btn.textContent = on ? '✕ Sair da edição' : '✏ Editar textos';
    if (!on) active = null;
  }

  var shown = /editar/i.test(location.hash);
  if (shown) btn.style.display = 'inline-flex';
  btn.addEventListener('click', function () { setEditing(!editing); });

  window.addEventListener('keydown', function (e) {
    if (e.shiftKey && (e.key === 'E' || e.key === 'e') &&
        !/^(input|textarea)$/i.test((document.activeElement||{}).tagName||'')) {
      e.preventDefault();
      if (!shown) { btn.style.display = 'inline-flex'; shown = true; }
      setEditing(!editing);
    }
    if (e.key === 'Escape' && editing) setEditing(false);
  });
})();
