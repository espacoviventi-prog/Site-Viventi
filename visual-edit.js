/* ░░ Editor Visual ░░
   Selecionar, mover (↑↓), apagar, duplicar, adicionar e redimensionar elementos.
   Ative com Shift+W ou #visual na URL. Alterações salvas no navegador. */
(function () {
  'use strict';
  var KEY = 'vvVE:' + location.pathname.split('/').pop();
  var st = {};
  try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  // ── 1. Assign stable IDs ───────────────────────────────────────────────────
  Array.from(document.querySelectorAll(
    'section,article,figure,li,[class*="rounded-xl"],[class*="rounded-2xl"],' +
    'h1,h2,h3,h4,h5,h6,p,blockquote,' +
    'img:not([aria-hidden]):not(.vv-watermark),' +
    'a[class*="cta"],button:not([data-vv-ui])'
  )).filter(function (el) {
    return !el.closest('[data-vv-ui]') && !el.closest('#vv-ve-bar') && !el.closest('.vv-ve-add');
  }).forEach(function (el, i) { if (!el.getAttribute('data-vid')) el.setAttribute('data-vid', i); });

  // ── 2. Restore state ───────────────────────────────────────────────────────
  // Inline styles
  var stStyles = st.styles || {};
  Object.keys(stStyles).forEach(function (vid) {
    var el = document.querySelector('[data-vid="' + vid + '"]');
    if (el) Object.assign(el.style, stStyles[vid]);
  });
  // Sibling orders
  var stOrders = st.orders || {};
  Object.keys(stOrders).forEach(function (pvid) {
    var parent = pvid === '__body' ? document.body
      : document.querySelector('[data-vid="' + pvid + '"]');
    if (!parent) return;
    (stOrders[pvid] || []).forEach(function (vid) {
      var el = parent.querySelector(':scope > [data-vid="' + vid + '"]');
      if (el) parent.appendChild(el);
    });
  });
  // Added elements
  (st.added || []).forEach(function (item) {
    var temp = document.createElement('div'); temp.innerHTML = item.html;
    var newEl = temp.firstElementChild; if (!newEl) return;
    newEl.setAttribute('data-vid', item.vid);
    var after = item.afterVid ? document.querySelector('[data-vid="' + item.afterVid + '"]') : null;
    if (after) after.parentElement.insertBefore(newEl, after.nextElementSibling);
    else { var s = document.querySelector('main, body'); if (s) s.appendChild(newEl); }
    attachClick(newEl);
  });

  var active = null, editing = false;

  // ── 3. Styles ──────────────────────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent =
    '[data-vv-ve] [data-vid]{cursor:pointer;}' +
    '[data-vv-ve] [data-vid]:hover{outline:2px dashed rgba(110,121,94,.6)!important;outline-offset:3px;}' +
    '[data-vv-ve] [data-vid].vv-sel{outline:2.5px solid #6E795E!important;outline-offset:4px;}' +
    '#vv-ve-bar{position:fixed;z-index:10001;background:#fff;border:1px solid #D8C9B2;border-radius:16px;' +
    'box-shadow:0 20px 50px -12px rgba(49,50,50,.35);padding:10px 12px;font-family:Montserrat,sans-serif;' +
    'font-size:12px;color:#313232;display:none;min-width:280px;}' +
    '[data-vv-ve] #vv-ve-bar{display:block;}' +
    '#vv-ve-bar .row{display:flex;align-items:center;gap:5px;flex-wrap:wrap;}' +
    '#vv-ve-bar .row+.row{margin-top:8px;padding-top:8px;border-top:1px solid #EDE4D8;}' +
    '#vv-ve-bar button{border:1px solid #D8C9B2;background:#FAF5EE;border-radius:8px;padding:5px 10px;' +
    'font-size:12px;cursor:pointer;color:#313232;line-height:1;font-family:inherit;}' +
    '#vv-ve-bar button:hover{background:#F0E5D6;}' +
    '#vv-ve-bar .del{color:#B4543D;border-color:#e8afa0;background:#fff5f2;}' +
    '#vv-ve-bar .del:hover{background:#fde5de;}' +
    '#vv-ve-bar label{font-size:10px;color:#7a6e60;display:flex;align-items:center;gap:6px;flex:1;min-width:100px;}' +
    '#vv-ve-bar input[type=range]{flex:1;accent-color:#6E795E;height:4px;}' +
    '#vv-ve-bar .tag{font-size:10px;background:#F5EFE5;color:#7a6e60;border-radius:5px;padding:2px 7px;margin-right:4px;}' +
    '#vv-ve-bar .val{min-width:28px;text-align:right;color:#6E795E;font-weight:600;}' +
    '.vv-ve-launch{position:fixed;left:18px;bottom:62px;z-index:9998;display:none;align-items:center;gap:7px;' +
    'padding:10px 15px;background:#6E795E;color:#FBF4EC;border:0;border-radius:999px;' +
    'font-family:Montserrat,sans-serif;font-size:12px;font-weight:600;letter-spacing:.02em;cursor:pointer;' +
    'box-shadow:0 8px 24px -6px rgba(49,50,50,.45);}' +
    '.vv-add-wrap{position:fixed;right:18px;bottom:18px;z-index:9998;display:none;flex-direction:column;align-items:flex-end;gap:6px;}' +
    '[data-vv-ve] .vv-add-wrap{display:flex;}' +
    '.vv-add-menu{display:none;flex-direction:column;align-items:flex-end;gap:4px;}' +
    '.vv-add-menu.open{display:flex;}' +
    '.vv-add-menu button{border:0;background:#313232;color:#FBF4EC;border-radius:999px;padding:7px 14px;' +
    'font-family:Montserrat,sans-serif;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;' +
    'box-shadow:0 4px 12px -4px rgba(0,0,0,.3);}' +
    '.vv-add-menu button:hover{background:#555;}' +
    '.vv-add-wrap .plus{width:42px;height:42px;border-radius:50%;border:0;background:#313232;color:#fff;' +
    'font-size:22px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 6px 20px -6px rgba(0,0,0,.5);}' +
    '.vv-add-wrap .plus:hover{background:#555;}';
  document.head.appendChild(css);

  // ── 4. Panel ───────────────────────────────────────────────────────────────
  var bar = document.createElement('div');
  bar.id = 'vv-ve-bar'; bar.setAttribute('data-vv-ui', '');
  bar.innerHTML =
    '<div class="row"><span class="tag" id="vv-tag">—</span>' +
    '<button data-a="up">↑ Acima</button><button data-a="dn">↓ Abaixo</button>' +
    '<button data-a="dup">⧉ Duplicar</button></div>' +
    '<div class="row"><label>Largura <input id="vv-w" type="range" min="10" max="100" step="1" value="100"><span class="val" id="vv-wv">–</span></label></div>' +
    '<div class="row"><label>Alt.mín <input id="vv-h" type="range" min="0" max="800" step="8" value="0"><span class="val" id="vv-hv">–</span></label></div>' +
    '<div class="row"><label>Fonte <input id="vv-f" type="range" min="8" max="80" step="1" value="16"><span class="val" id="vv-fv">–</span></label>' +
    '<label>Opac. <input id="vv-o" type="range" min="0" max="100" step="5" value="100"><span class="val" id="vv-ov">–</span></label></div>';
  document.body.appendChild(bar);

  // ── 5. Add panel ───────────────────────────────────────────────────────────
  var PRESETS = [
    { label: '+ Título', html: '<h2 class="font-display text-[2rem] leading-tight mt-4">Novo título</h2>' },
    { label: '+ Parágrafo', html: '<p class="mt-4 text-[15px] text-ink/75 leading-relaxed max-w-xl">Novo parágrafo de texto aqui.</p>' },
    { label: '+ Botão CTA', html: '<a href="#" class="cta-primary inline-flex items-center gap-2 bg-terra text-sand font-semibold rounded-full px-7 py-3.5 text-[14px] mt-5">Texto do botão</a>' },
    { label: '+ Divisor', html: '<hr class="border-t border-sand3 my-8"/>' },
  ];
  var addWrap = document.createElement('div');
  addWrap.className = 'vv-add-wrap'; addWrap.setAttribute('data-vv-ui', '');
  addWrap.innerHTML = '<div class="vv-add-menu" id="vv-add-menu">' +
    PRESETS.map(function (p) { return '<button data-h="' + encodeURIComponent(p.html) + '">' + p.label + '</button>'; }).join('') +
    '</div><button class="plus" id="vv-add-main" title="Adicionar elemento">+</button>';
  document.body.appendChild(addWrap);

  var addMenu = document.getElementById('vv-add-menu');
  document.getElementById('vv-add-main').addEventListener('click', function () { addMenu.classList.toggle('open'); });
  addMenu.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-h]'); if (!btn) return;
    var html = decodeURIComponent(btn.getAttribute('data-h'));
    var vid = 'add-' + Date.now();
    var temp = document.createElement('div'); temp.innerHTML = html;
    var newEl = temp.firstElementChild; if (!newEl) return;
    newEl.setAttribute('data-vid', vid);
    var afterVid = active ? active.getAttribute('data-vid') : null;
    if (active) active.parentElement.insertBefore(newEl, active.nextElementSibling);
    else { var s = document.querySelector('main, section'); if (s) s.appendChild(newEl); }
    attachClick(newEl);
    if (!st.added) st.added = [];
    st.added.push({ vid: vid, html: newEl.outerHTML, afterVid: afterVid });
    save(); addMenu.classList.remove('open'); select(newEl);
  });

  // ── 6. Launch button ───────────────────────────────────────────────────────
  var launch = document.createElement('button');
  launch.className = 'vv-ve-launch'; launch.setAttribute('data-vv-ui', '');
  launch.textContent = '⊞ Editor visual';
  document.body.appendChild(launch);

  // ── 7. Position bar ────────────────────────────────────────────────────────
  function posBar() {
    if (!active) return;
    var r = active.getBoundingClientRect();
    var bh = bar.offsetHeight || 130;
    var t = r.top - bh - 10; if (t < 8) t = r.bottom + 10;
    t = Math.max(8, Math.min(t, window.innerHeight - bh - 8));
    var l = Math.max(8, Math.min(r.left, window.innerWidth - (bar.offsetWidth || 280) - 8));
    bar.style.top = t + 'px'; bar.style.left = l + 'px';
  }

  // ── 8. Select + sync sliders ───────────────────────────────────────────────
  function syncSlider(id, vid, val, fmt) {
    var i = document.getElementById(id); var v = document.getElementById(vid);
    if (i) i.value = val; if (v) v.textContent = fmt(val);
  }
  function select(el) {
    if (active) active.classList.remove('vv-sel');
    active = el;
    if (!el) return;
    el.classList.add('vv-sel'); posBar();
    document.getElementById('vv-tag').textContent = el.tagName.toLowerCase();
    var cs = getComputedStyle(el);
    syncSlider('vv-w','vv-wv', el.style.width ? parseFloat(el.style.width) : 100, function(v){return v+'%';});
    syncSlider('vv-h','vv-hv', parseFloat(el.style.minHeight)||0, function(v){return v?v+'px':'auto';});
    syncSlider('vv-f','vv-fv', Math.round(parseFloat(el.style.fontSize||cs.fontSize)||16), function(v){return v+'px';});
    syncSlider('vv-o','vv-ov', Math.round((parseFloat(el.style.opacity!==''?el.style.opacity:1)||1)*100), function(v){return v+'%';});
  }

  // ── 9. Slider wiring ───────────────────────────────────────────────────────
  function wireSlider(id, vid, applyFn, fmt) {
    var inp = document.getElementById(id); if (!inp) return;
    inp.addEventListener('input', function () {
      if (!active) return;
      var v = parseFloat(this.value);
      document.getElementById(vid).textContent = fmt(v);
      applyFn(active, v);
      var evid = active.getAttribute('data-vid'); if (!evid) return;
      if (!st.styles) st.styles = {};
      if (!st.styles[evid]) st.styles[evid] = {};
      Object.assign(st.styles[evid], {
        width: active.style.width, minHeight: active.style.minHeight,
        fontSize: active.style.fontSize, opacity: active.style.opacity
      });
      save();
    });
  }
  wireSlider('vv-w','vv-wv',function(el,v){el.style.width=v+'%';},function(v){return v+'%';});
  wireSlider('vv-h','vv-hv',function(el,v){el.style.minHeight=v?v+'px':'';},function(v){return v?v+'px':'auto';});
  wireSlider('vv-f','vv-fv',function(el,v){el.style.fontSize=v+'px';},function(v){return v+'px';});
  wireSlider('vv-o','vv-ov',function(el,v){el.style.opacity=v/100;},function(v){return v+'%';});

  // ── 10. Actions ────────────────────────────────────────────────────────────
  function saveParentOrder(parent) {
    var pvid = parent.getAttribute('data-vid') || ('__' + parent.tagName);
    if (!st.orders) st.orders = {};
    st.orders[pvid] = Array.from(parent.children)
      .map(function (c) { return c.getAttribute('data-vid'); }).filter(Boolean);
    save();
  }
  bar.addEventListener('mousedown', function (e) { if (e.target.closest('button')) e.preventDefault(); });
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var a = b.getAttribute('data-a');
    if (!a) return;
    if (a === 'up' || a === 'dn') {
      if (!active) return;
      var sib = a === 'up' ? active.previousElementSibling : active.nextElementSibling;
      while (sib && sib.getAttribute('data-vv-ui')) sib = a === 'up' ? sib.previousElementSibling : sib.nextElementSibling;
      if (!sib) return;
      if (a === 'up') active.parentElement.insertBefore(active, sib);
      else active.parentElement.insertBefore(sib, active);
      saveParentOrder(active.parentElement); posBar();
    } else if (a === 'dup') {
      if (!active) return;
      var clone = active.cloneNode(true);
      clone.removeAttribute('data-vid'); clone.removeAttribute('data-eid'); clone.classList.remove('vv-sel');
      var nid = 'dup-' + Date.now(); clone.setAttribute('data-vid', nid);
      active.parentElement.insertBefore(clone, active.nextElementSibling);
      attachClick(clone); select(clone);
    }
  });

  // ── 11. Click handler ──────────────────────────────────────────────────────
  function clickHandler(e) {
    if (!editing) return;
    e.stopPropagation();
    var el = e.currentTarget;
    select(el === active ? null : el);
  }
  function attachClick(el) { el.addEventListener('click', clickHandler); }
  Array.from(document.querySelectorAll('[data-vid]')).forEach(attachClick);
  document.addEventListener('click', function (e) {
    if (!editing) return;
    if (!e.target.closest('[data-vid]') && !e.target.closest('#vv-ve-bar') && !e.target.closest('.vv-add-wrap')) select(null);
  });

  // ── 12. Edit mode toggle ───────────────────────────────────────────────────
  function setEditing(on) {
    editing = on;
    document.documentElement.toggleAttribute('data-vv-ve', on);
    launch.style.background = on ? '#B4543D' : '#6E795E';
    launch.textContent = on ? '✕ Sair do editor' : '⊞ Editor visual';
    if (!on) { select(null); addMenu.classList.remove('open'); }
  }
  var shown = /visual/i.test(location.hash);
  if (shown) launch.style.display = 'inline-flex';
  launch.addEventListener('click', function () { setEditing(!editing); });
  window.addEventListener('keydown', function (e) {
    if (e.shiftKey && (e.key === 'W' || e.key === 'w') &&
        !document.activeElement.isContentEditable &&
        !/^(input|textarea)$/i.test(document.activeElement.tagName || '')) {
      e.preventDefault();
      if (!shown) { launch.style.display = 'inline-flex'; shown = true; }
      setEditing(!editing);
    }
    if (e.key === 'Escape' && editing) setEditing(false);
  });
})();
