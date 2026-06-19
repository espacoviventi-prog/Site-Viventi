/* ░░ Modo Mobile ░░  Shift+M ou #mobile na URL */
(function () {
  var ACTIVE = false;
  var overlay, inner;

  function on() {
    if (ACTIVE) return;
    ACTIVE = true;

    // Overlay escuro
    overlay = document.createElement('div');
    overlay.id = 'vv-mob-overlay';
    overlay.style.cssText =
      'position:fixed;inset:0;background:#1a1a1a;z-index:999998;' +
      'display:flex;flex-direction:column;align-items:center;overflow-y:auto;padding:20px 0;';

    // Barra de controle
    var bar = document.createElement('div');
    bar.style.cssText =
      'width:375px;background:#313232;color:#F6E3D0;font-family:system-ui,sans-serif;' +
      'font-size:13px;padding:10px 14px;display:flex;justify-content:space-between;' +
      'align-items:center;border-radius:12px 12px 0 0;flex-shrink:0;';
    bar.innerHTML =
      '<span>📱 Visualização mobile — 375 px</span>' +
      '<button id="vv-mob-close" style="background:none;border:none;color:#F6E3D0;' +
      'font-size:16px;cursor:pointer;line-height:1;">✕</button>';

    // Iframe com a mesma página
    inner = document.createElement('iframe');
    inner.id = 'vv-mob-iframe';
    inner.src = window.location.href.replace(/#.*$/, '');
    inner.style.cssText =
      'width:375px;height:700px;border:none;background:white;' +
      'flex-shrink:0;border-radius:0 0 12px 12px;';
    inner.setAttribute('scrolling', 'yes');

    // Botão para redimensionar altura
    var footer = document.createElement('div');
    footer.style.cssText =
      'width:375px;background:#313232;color:#F6E3D0;font-family:system-ui,sans-serif;' +
      'font-size:12px;padding:8px 14px;display:flex;gap:10px;border-radius:0 0 12px 12px;' +
      'flex-shrink:0;margin-top:-1px;';
    footer.innerHTML =
      '<span style="opacity:.6">Altura:</span>' +
      '<button data-h="667" style="background:#6E795E;border:none;color:white;padding:2px 8px;border-radius:4px;cursor:pointer;font-size:11px;">iPhone SE</button>' +
      '<button data-h="844" style="background:#6E795E;border:none;color:white;padding:2px 8px;border-radius:4px;cursor:pointer;font-size:11px;">iPhone 14</button>' +
      '<button data-h="915" style="background:#6E795E;border:none;color:white;padding:2px 8px;border-radius:4px;cursor:pointer;font-size:11px;">Galaxy S22</button>';

    overlay.appendChild(bar);
    overlay.appendChild(inner);
    overlay.appendChild(footer);
    document.body.appendChild(overlay);

    document.getElementById('vv-mob-close').onclick = off;
    footer.querySelectorAll('button[data-h]').forEach(function (btn) {
      btn.onclick = function () { inner.style.height = btn.dataset.h + 'px'; };
    });
  }

  function off() {
    if (!ACTIVE) return;
    ACTIVE = false;
    if (overlay) { overlay.remove(); overlay = null; }
  }

  document.addEventListener('keydown', function (e) {
    if (e.shiftKey && (e.key === 'M' || e.key === 'm')) {
      ACTIVE ? off() : on();
    }
  });

  if (window.location.hash === '#mobile') on();
}());
