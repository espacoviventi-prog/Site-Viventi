/* ░░ Ajuste manual do monograma V ░░
   Controle só para edição: aparece com #ajuste na URL ou tecla Shift+V.
   Os valores ficam salvos no navegador (localStorage) e são aplicados sempre,
   inclusive para visitantes. */
(function () {
  const mark = document.querySelector('.vv-intro-mark');
  if (!mark) return;

  const KEY = 'vvVmark:' + location.pathname.split('/').pop();
  const BASE = { size: 320, x: 0, y: 0, op: 14 };
  let DEF = Object.assign({}, BASE);
  try { if (mark.dataset.vDefault) DEF = Object.assign(DEF, JSON.parse(mark.dataset.vDefault)); } catch (e) {}
  let st = Object.assign({}, DEF);
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) st = Object.assign(st, s); } catch (e) {}

  function apply() {
    mark.style.height = st.size + 'px';
    mark.style.transform = 'translate(' + st.x + 'px,' + st.y + 'px)';
    mark.style.opacity = (st.op / 100).toFixed(2);
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  apply();

  let panel = null;
  function build() {
    if (panel) { panel.style.display = 'flex'; return; }
    panel = document.createElement('div');
    panel.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:9999;display:flex;flex-direction:column;gap:12px;width:230px;padding:16px 16px 14px;background:#fff;border:1px solid #ECD9C2;border-radius:14px;box-shadow:0 16px 40px -12px rgba(49,50,50,.34);font-family:Montserrat,sans-serif;color:#313232;';
    panel.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<strong style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#BA752C">Ajuste do V</strong>' +
        '<button data-x style="border:0;background:none;font-size:18px;line-height:1;cursor:pointer;color:#313232">×</button>' +
      '</div>' +
      row('Tamanho', 'size', 120, 640, 1) +
      row('Horizontal', 'x', -300, 300, 1) +
      row('Vertical', 'y', -300, 300, 1) +
      row('Opacidade', 'op', 4, 100, 1) +
      '<button data-reset style="margin-top:2px;border:1px solid #ECD9C2;background:#FBF4EC;border-radius:8px;padding:7px 0;font-size:12px;font-weight:600;cursor:pointer;color:#313232">Restaurar padrão</button>' +
      '<p style="margin:0;font-size:10.5px;color:#313232;opacity:.5;line-height:1.4">Salvo automaticamente neste navegador. Shift+V mostra/oculta.</p>';
    document.body.appendChild(panel);

    panel.querySelectorAll('input[type=range]').forEach((inp) => {
      inp.addEventListener('input', () => {
        st[inp.dataset.k] = Number(inp.value);
        panel.querySelector('[data-v="' + inp.dataset.k + '"]').textContent = inp.value + (inp.dataset.k === 'op' ? '%' : 'px');
        apply(); save();
      });
    });
    panel.querySelector('[data-x]').addEventListener('click', () => { panel.style.display = 'none'; });
    panel.querySelector('[data-reset]').addEventListener('click', () => {
      st = Object.assign({}, DEF); apply(); save(); sync();
    });
  }
  function row(label, k, min, max, step) {
    const unit = k === 'op' ? '%' : 'px';
    return '<label style="display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:600">' +
      '<span style="display:flex;justify-content:space-between"><span>' + label + '</span>' +
      '<span data-v="' + k + '" style="color:#BA752C">' + st[k] + unit + '</span></span>' +
      '<input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + st[k] + '" style="width:100%;accent-color:#BA752C"></label>';
  }
  function sync() {
    if (!panel) return;
    panel.querySelectorAll('input[type=range]').forEach((inp) => {
      inp.value = st[inp.dataset.k];
      panel.querySelector('[data-v="' + inp.dataset.k + '"]').textContent = st[inp.dataset.k] + (inp.dataset.k === 'op' ? '%' : 'px');
    });
  }

  function toggle() { if (panel && panel.style.display !== 'none') panel.style.display = 'none'; else build(); }
  if (/ajuste/i.test(location.hash)) build();
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'V' || e.key === 'v')) { e.preventDefault(); toggle(); }
  });
})();
