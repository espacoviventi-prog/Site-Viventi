/* ░░ Modo de edição de textos — v2 (chaves estáveis) ░░
   Permite reescrever qualquer texto do site e ajustar tamanho, negrito,
   itálico, sublinhado e alinhamento.
   Ative com Shift+E ou #editar na URL.
   Edições ficam salvas neste navegador (localStorage). */
(function () {
  'use strict';
  var KEY = 'vvText2:' + location.pathname.split('/').pop();
  var store = {};
  try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { store = {}; }

  // ── 1. Coletar elementos editáveis (apenas os mais externos) ─────────────
  var SEL = 'h1,h2,h3,h4,h5,h6,p,li,figcaption,blockquote,th,td,dt,dd';
  var all = Array.prototype.slice.call(document.querySelectorAll(SEL));
  var setAll = new Set(all);
  var list = all.filter(function (el) {
    if (el.closest('[data-vv-ui]')) return false;
    if (!el.textContent || !el.textContent.trim()) return false;
    var p = el.parentElement;
    while (p) { if (setAll.has(p)) return false; p = p.parentElement; }
    return true;
  });

  // ── 2. Gerar chaves estáveis (tag + texto original + contador) ───────────
  // Snapshot do texto ANTES de aplicar qualquer edição
  var keyCount = {};
  function makeStableKey(el) {
    var tag = el.tagName.toLowerCase();
    var raw = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50);
    var base = tag + '|' + raw;
    keyCount[base] = (keyCount[base] || 0) + 1;
    return base + (keyCount[base] > 1 ? '|' + keyCount[base] : '');
  }
  list.forEach(function (el) {
    var key = makeStableKey(el);
    el.setAttribute('data-eid', key);
  });

  // ── 3. Aplicar edições salvas ────────────────────────────────────────────
  function applyStored() {
    list.forEach(function (el) {
      var k = el.getAttribute('data-eid');
      var s = store[k];
      if (!s) return;
      if (typeof s.html === 'string') el.innerHTML = s.html;
      if (s.fontSize) el.style.fontSize = s.fontSize;
      if (s.textAlign) el.style.textAlign = s.textAlign;
      if (s.fontWeight) el.style.fontWeight = s.fontWeight;
      if (s.fontStyle) el.style.fontStyle = s.fontStyle;
    });
  }
  applyStored();

  function saveEl(el) {
    var k = el.getAttribute('data-eid');
    if (!k) return;
    store[k] = {
      html: el.innerHTML,
      fontSize: el.style.fontSize || '',
      textAlign: el.style.textAlign || ''
    };
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {}
  }

  // ── 4. Estilos ───────────────────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent =
    '[data-vv-editing] [data-eid]{outline:1px dashed rgba(186,117,44,.45);outline-offset:3px;cursor:text;border-radius:3px;transition:background .15s,outline-color .15s;}' +
    '[data-vv-editing] [data-eid]:hover{outline-color:rgba(186,117,44,.9);background:rgba(186,117,44,.06);}' +
    '[data-vv-editing] [data-eid]:focus{outline:2px solid #BA752C;background:rgba(186,117,44,.08);}' +
    '.vv-ed-bar button.vv-on{background:#BA752C!important;color:#fff!important;border-color:#BA752C!important;}' +
    '.vv-ed-bar button[data-act="bold"]{font-weight:800;font-size:14px;}' +
    '.vv-ed-bar button[data-act="italic"]{font-style:italic;font-size:14px;}' +
    '.vv-ed-bar button[data-act="underline"]{text-decoration:underline;font-size:14px;}' +
    '.vv-ed-btn{position:fixed;left:18px;bottom:18px;z-index:9998;display:none;align-items:center;gap:8px;padding:11px 16px;background:#313232;color:#FBF4EC;border:0;border-radius:999px;font-family:Montserrat,sans-serif;font-size:12.5px;font-weight:600;letter-spacing:.02em;cursor:pointer;box-shadow:0 10px 30px -8px rgba(49,50,50,.5);}' +
    '.vv-ed-bar{position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:9999;display:none;align-items:center;gap:6px;padding:8px 10px;background:#fff;border:1px solid #ECD9C2;border-radius:14px;box-shadow:0 16px 40px -12px rgba(49,50,50,.34);font-family:Montserrat,sans-serif;color:#313232;flex-wrap:wrap;max-width:95vw;}' +
    '[data-vv-editing] .vv-ed-bar{display:flex;}' +
    '.vv-ed-bar button{border:1px solid #ECD9C2;background:#FBF4EC;border-radius:8px;padding:7px 11px;font-size:13px;font-weight:600;cursor:pointer;color:#313232;font-family:inherit;line-height:1;}' +
    '.vv-ed-bar button:hover{background:#F3E7D6;}' +
    '.vv-ed-bar .vv-ed-done{background:#BA752C;color:#fff;border-color:#BA752C;}' +
    '.vv-ed-bar .vv-ed-sep{width:1px;height:22px;background:#ECD9C2;margin:0 2px;}' +
    '.vv-ed-bar .vv-ed-label{font-size:11px;color:#8a8378;padding:0 4px;max-width:200px;line-height:1.3;}';
  document.head.appendChild(css);

  // ── 5. Botão e barra ─────────────────────────────────────────────────────
  var launch = document.createElement('button');
  launch.className = 'vv-ed-btn';
  launch.setAttribute('data-vv-ui', '');
  launch.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg><span>Editar textos</span>';
  document.body.appendChild(launch);

  var bar = document.createElement('div');
  bar.className = 'vv-ed-bar';
  bar.setAttribute('data-vv-ui', '');
  bar.innerHTML =
    '<span class="vv-ed-label">Clique num texto para editar.</span>' +
    '<span class="vv-ed-sep"></span>' +
    '<button data-act="dec" title="Diminuir tamanho">A−</button>' +
    '<button data-act="inc" title="Aumentar tamanho">A+</button>' +
    '<button data-act="clearsize" title="Tamanho original">↺</button>' +
    '<span class="vv-ed-sep"></span>' +
    '<button data-act="bold" title="Negrito">B</button>' +
    '<button data-act="italic" title="Itálico">I</button>' +
    '<button data-act="underline" title="Sublinhado">U</button>' +
    '<span class="vv-ed-sep"></span>' +
    '<button data-act="alignleft" title="Alinhar à esquerda" id="vv-al"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect y="4.5" width="9" height="2" rx="1"/><rect y="9" width="11" height="2" rx="1"/></svg></button>' +
    '<button data-act="aligncenter" title="Centralizar" id="vv-ac"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect x="2.5" y="4.5" width="9" height="2" rx="1"/><rect x="1.5" y="9" width="11" height="2" rx="1"/></svg></button>' +
    '<button data-act="alignright" title="Alinhar à direita" id="vv-ar"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect x="5" y="4.5" width="9" height="2" rx="1"/><rect x="3" y="9" width="11" height="2" rx="1"/></svg></button>' +
    '<button data-act="alignjustify" title="Justificar" id="vv-aj"><svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><rect y="0" width="14" height="2" rx="1"/><rect y="4.5" width="14" height="2" rx="1"/><rect y="9" width="14" height="2" rx="1"/></svg></button>' +
    '<span class="vv-ed-sep"></span>' +
    '<button data-act="resetall">Restaurar tudo</button>' +
    '<button class="vv-ed-done" data-act="done">Concluir</button>';
  document.body.appendChild(bar);

  var active = null;
  var editing = false;

  function currentEl() {
    var sel = window.getSelection();
    if (sel && sel.anchorNode) {
      var n = sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement;
      var hit = n && n.closest && n.closest('[data-eid]');
      if (hit) return hit;
    }
    var ae = document.activeElement;
    if (ae && ae.closest) { var h = ae.closest('[data-eid]'); if (h) return h; }
    return active;
  }

  // ── Alinhamento ativo ────────────────────────────────────────────────────
  var ALIGN_BTNS = { left:'vv-al', center:'vv-ac', right:'vv-ar', justify:'vv-aj' };
  function syncAlignBtns(el) {
    var cur = el ? (el.style.textAlign || getComputedStyle(el).textAlign || 'left') : '';
    Object.keys(ALIGN_BTNS).forEach(function(k){
      var b = document.getElementById(ALIGN_BTNS[k]);
      if (b) b.classList.toggle('vv-on', cur === k);
    });
  }

  document.addEventListener('focusin', function (e) {
    var el = e.target.closest && e.target.closest('[data-eid]');
    if (el) { active = el; syncAlignBtns(el); }
  });
  document.addEventListener('input', function (e) {
    var el = e.target.closest && e.target.closest('[data-eid]');
    if (el && editing) saveEl(el);
  });
  document.addEventListener('click', function (e) {
    if (!editing) return;
    var el = e.target.closest && e.target.closest('[data-eid]');
    if (el) {
      e.stopPropagation();
      var a = e.target.closest('a');
      if (a) e.preventDefault();
    }
  }, true);

  // ── Nudge tamanho ────────────────────────────────────────────────────────
  function nudge(factor) {
    var el = currentEl(); if (!el) return;
    var sel = window.getSelection();
    if (sel && sel.rangeCount && !sel.isCollapsed &&
        el.contains(sel.anchorNode) && el.contains(sel.focusNode)) {
      var range = sel.getRangeAt(0);
      var refEl = (range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement) || el;
      var base = parseFloat(getComputedStyle(refEl).fontSize) || 16;
      var span = document.createElement('span');
      span.style.fontSize = Math.round(base * factor) + 'px';
      try { range.surroundContents(span); }
      catch (err) { var frag = range.extractContents(); span.appendChild(frag); range.insertNode(span); }
      sel.removeAllRanges();
    } else {
      var cur = parseFloat(el.style.fontSize || getComputedStyle(el).fontSize) || 16;
      el.style.fontSize = Math.round(cur * factor) + 'px';
    }
    saveEl(el);
  }

  // ── Acções da barra ──────────────────────────────────────────────────────
  bar.addEventListener('mousedown', function (e) { if (e.target.closest('button')) e.preventDefault(); });
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'inc') nudge(1.1);
    else if (act === 'dec') nudge(1 / 1.1);
    else if (act === 'clearsize') {
      var t = currentEl(); if (t) { t.style.fontSize = ''; saveEl(t); }
    } else if (act === 'bold' || act === 'italic' || act === 'underline') {
      document.execCommand(act); var tf = currentEl(); if (tf) saveEl(tf);
    } else if (act === 'alignleft' || act === 'aligncenter' || act === 'alignright' || act === 'alignjustify') {
      var ta = { alignleft:'left', aligncenter:'center', alignright:'right', alignjustify:'justify' }[act];
      var te = currentEl();
      if (te) { te.style.textAlign = ta; saveEl(te); syncAlignBtns(te); }
    } else if (act === 'done') {
      setEditing(false);
    } else if (act === 'resetall') {
      if (confirm('Desfazer todas as edições de texto desta página?')) {
        store = {}; try { localStorage.removeItem(KEY); } catch (err) {} location.reload();
      }
    }
  });

  function setEditing(on) {
    editing = on;
    document.documentElement.toggleAttribute('data-vv-editing', on);
    list.forEach(function (el) {
      if (on) { el.setAttribute('contenteditable', 'true'); el.spellcheck = false; }
      else { el.removeAttribute('contenteditable'); }
    });
    launch.style.display = on ? 'none' : (showLauncher ? 'inline-flex' : 'none');
  }

  launch.addEventListener('click', function () { setEditing(true); });
  var showLauncher = /editar/i.test(location.hash);
  if (showLauncher) launch.style.display = 'inline-flex';
  window.addEventListener('keydown', function (e) {
    if (e.shiftKey && (e.key === 'E' || e.key === 'e') &&
        !/^(input|textarea)$/i.test(e.target.tagName || '')) {
      e.preventDefault(); setEditing(!editing);
    }
    if (e.key === 'Escape' && editing) setEditing(false);
  });
})();
