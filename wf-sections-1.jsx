/* wf-sections-1.jsx — sections 1–7, variant-aware (v: 'a'|'b'|'c', mode: 'desktop'|'mobile')
   Shared helpers exported to window for sections-2. */

const sz = (mode, d, m) => (mode === 'desktop' ? d : m);
const isM = (mode) => mode === 'mobile';

const Sec = ({ bg, children, mode, vpad, hpad, style }) => (
  <section style={{
    background: bg || 'var(--paper)',
    padding: `${vpad != null ? vpad : sz(mode, 64, 44)}px ${hpad != null ? hpad : sz(mode, 64, 22)}px`,
    ...style,
  }}>{children}</section>
);

// centered kicker + title block (variant A flavour)
const HeadCentered = ({ kicker, title, sub, mode, dark }) => (
  <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
    {kicker && <Tag>{kicker}</Tag>}
    <H size={sz(mode, 34, 25)} style={dark ? { color: 'var(--dlight)' } : null}>{title}</H>
    {sub && <Sub size={sz(mode, 14, 13)} style={{ maxWidth: 560 }}>{sub}</Sub>}
  </div>
);

// ── 1 · NAVBAR ───────────────────────────────────────────────
function Navbar({ v, mode }) {
  return (
    <div style={{ position: 'relative' }}>
      {v === 'c' && <div style={{ height: 3, background: 'var(--terra)' }} />}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: sz(mode, '18px 64px', '14px 20px'), background: 'var(--paper)',
        borderBottom: '1.5px solid var(--line)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: sz(mode, 26, 22), height: sz(mode, 26, 22), borderRadius: 6, border: '1.5px solid var(--terra)' }} />
          <div className="wf-h" style={{ fontSize: sz(mode, 17, 15), fontStyle: 'normal' }}>Espaço Viventi</div>
        </div>
        {isM(mode) ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: 20, height: 2, background: 'var(--ink)' }} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            {COPY.nav.map((l, i) => (
              <span key={l} style={{ fontSize: 12, color: 'var(--ink)', letterSpacing: '.3px' }}>
                {v === 'b' && <span style={{ color: 'var(--terra)', marginRight: 5 }}>0{i + 1}</span>}{l}
              </span>
            ))}
            <CTA size="sm">{COPY.navCta}</CTA>
          </div>
        )}
      </div>
      <Note style={{ position: 'absolute', right: sz(mode, 64, 16), top: '100%', marginTop: 6, fontSize: 15 }}>
        sticky · sombra suave ativa no scroll
      </Note>
    </div>
  );
}

// ── 2 · HERO ─────────────────────────────────────────────────
function Hero({ v, mode }) {
  const center = v === 'a';
  const H1 = sz(mode, center ? 40 : 44, 28);
  return (
    <div className="wf-img dark" style={{ height: sz(mode, 520, 560), borderRadius: 0, border: 'none', display: 'flex', position: 'relative' }}>
      <span className="wf-imgcap" style={{ top: 26, transform: 'translateX(-50%)' }}>imagem de ambiente · overlay #3A332B 50%</span>
      <div style={{
        margin: 'auto', width: '100%', maxWidth: sz(mode, center ? 760 : 980, 360),
        padding: sz(mode, '0 56px', '0 24px'),
        textAlign: center ? 'center' : 'left',
        display: 'flex', flexDirection: 'column', gap: 22,
        alignItems: center ? 'center' : 'flex-start',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!center && <span style={{ width: 28, height: 2, background: 'var(--terra)' }} />}
          <div className="wf-tag" style={{ color: '#E7BE84' }}>Longevidade · Ipatinga — Vale do Aço</div>
        </div>
        <H size={H1} style={{ color: '#FAF6F0', maxWidth: sz(mode, center ? 700 : 760, 340) }}>{COPY.hero.h}</H>
        <Sub size={sz(mode, 15, 13)} style={{ color: 'rgba(250,246,240,.78)', maxWidth: 540 }}>{COPY.hero.sub}</Sub>
        <div style={{ marginTop: 6 }}><CTA size="lg">{COPY.hero.cta}</CTA></div>
        <Note style={{ color: '#9DB089', marginTop: 2 }}>fade-in CSS do texto ao carregar</Note>
      </div>
    </div>
  );
}

// ── 3 · A DOR / A LACUNA ─────────────────────────────────────
function Dor({ v, mode }) {
  const icons = COPY.dor.icons;
  const IconRow = (
    <div style={{
      display: isM(mode) ? 'flex' : (v === 'b' ? 'flex' : 'flex'),
      flexDirection: isM(mode) ? 'column' : 'row',
      gap: sz(mode, 28, 16), marginTop: 30, width: '100%',
      justifyContent: v === 'a' ? 'center' : 'flex-start',
    }}>
      {icons.map((t, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: v === 'a' ? 'column' : 'row', alignItems: 'center', gap: 12, flex: v === 'a' ? '0 1 200px' : '1', textAlign: v === 'a' ? 'center' : 'left' }}>
          <Ico s={36} />
          <div style={{ fontSize: 12.5, color: 'var(--ink)' }}>{t}</div>
        </div>
      ))}
    </div>
  );

  if (v === 'b' && !isM(mode)) {
    return (
      <Sec bg="var(--paper2)" mode={mode} vpad={72}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.4fr', gap: 56, alignItems: 'start' }}>
          <div><Tag>A lacuna</Tag><div style={{ fontFamily: "'Caveat',cursive", color: 'var(--terra)', fontSize: 56, lineHeight: 1, marginTop: 14 }}>“</div></div>
          <div>
            <H size={22} style={{ fontWeight: 400, lineHeight: 1.5 }}>{COPY.dor.body}</H>
            {IconRow}
          </div>
        </div>
      </Sec>
    );
  }
  return (
    <Sec bg="var(--paper2)" mode={mode} vpad={sz(mode, 72, 48)}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {v === 'c' && <div style={{ fontFamily: "'Caveat',cursive", color: 'var(--terra)', fontSize: 64, lineHeight: 1, marginBottom: 8 }}>“</div>}
        {v !== 'c' && <Tag>A lacuna</Tag>}
        <H size={sz(mode, 23, 18)} style={{ fontWeight: 400, lineHeight: 1.55, marginTop: 14 }}>{COPY.dor.body}</H>
        {IconRow}
      </div>
    </Sec>
  );
}

// ── 4 · O QUE É / O QUE NÃO É ────────────────────────────────
function OQue({ v, mode }) {
  const col = isM(mode);
  const Nao = (
    <div className="wf-box" style={{ padding: sz(mode, 34, 22), flex: v === 'c' ? '0 0 auto' : 1, width: v === 'c' && !col ? 320 : 'auto', background: '#fff' }}>
      <Tag sage>{COPY.oque.naoT}</Tag>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
        {COPY.oque.nao.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 16, height: 16, borderRadius: 99, border: '1.5px solid var(--mute)', position: 'relative', flex: '0 0 auto' }}>
              <span style={{ position: 'absolute', inset: 0, margin: 'auto', width: 9, height: 1.5, background: 'var(--mute)' }} />
            </span>
            <span style={{ fontSize: 13, color: 'var(--mute)', textDecoration: 'line-through' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
  const Somos = (
    <div style={{ padding: sz(mode, 38, 24), flex: v === 'c' ? 1 : 1, background: 'var(--terra)', borderRadius: 4, color: '#fff' }}>
      <Tag style={{ color: '#F4DDBF' }}><span style={{ color: '#F4DDBF' }}>{COPY.oque.somosT}</span></Tag>
      <div style={{ fontFamily: "'Caveat',cursive", fontSize: sz(mode, 30, 24), fontWeight: 600, fontStyle: 'italic', lineHeight: 1.25, marginTop: 14, color: '#fff' }}>
        {COPY.oque.somos}
      </div>
      <Note style={{ color: '#F4DDBF', marginTop: 16 }}>Fraunces itálico · bloco de afirmação</Note>
    </div>
  );
  return (
    <Sec mode={mode}>
      <div style={{ display: 'flex', flexDirection: col ? 'column' : 'row', gap: sz(mode, 24, 16), alignItems: 'stretch' }}>
        {v === 'c' ? <>{Nao}{Somos}</> : <>{Nao}{Somos}</>}
      </div>
    </Sec>
  );
}

// ── 5 · OS TRÊS PILARES ──────────────────────────────────────
function Pilares({ v, mode }) {
  const col = isM(mode);
  if (v === 'b' && !col) {
    return (
      <Sec mode={mode} bg="var(--paper)">
        <Tag>Os três pilares</Tag>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column' }}>
          {COPY.pilares.map(([t, d], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24, alignItems: 'center', padding: '26px 0', borderTop: '1.5px solid var(--line)', borderBottom: i === 2 ? '1.5px solid var(--line)' : 'none' }}>
              <Num size={52}>{'0' + (i + 1)}</Num>
              <div>
                <H size={20}>{t}</H>
                <Sub size={13} style={{ marginTop: 6, maxWidth: 540 }}>{d}</Sub>
              </div>
            </div>
          ))}
        </div>
      </Sec>
    );
  }
  return (
    <Sec mode={mode}>
      <div style={{ textAlign: v === 'a' ? 'center' : 'left', marginBottom: 28 }}>
        <Tag>Os três pilares</Tag>
      </div>
      <div style={{ display: col ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '1fr 1fr 1fr', gap: sz(mode, 20, 14) }}>
        {COPY.pilares.map(([t, d], i) => (
          <div key={i} style={{ background: 'var(--paper)', border: '1.5px solid var(--line)', borderBottom: '3px solid var(--terra)', borderRadius: 4, padding: sz(mode, 28, 22) }}>
            {v === 'c' ? <Num size={46} style={{ marginBottom: 12 }}>{'0' + (i + 1)}</Num> : <Ico s={38} />}
            <H size={sz(mode, 20, 18)} style={{ marginTop: 14 }}>{t}</H>
            <Sub size={12.5} style={{ marginTop: 8 }}>{d}</Sub>
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── 6 · SERVIÇOS ─────────────────────────────────────────────
function Servicos({ v, mode }) {
  const col = isM(mode);
  const Header = (
    <div style={{ textAlign: v === 'a' ? 'center' : 'left', marginBottom: 30 }}>
      <Tag>Serviços</Tag>
      <H size={sz(mode, 26, 21)} style={{ marginTop: 10 }}>Cuidado especializado, sob o mesmo teto.</H>
    </div>
  );
  if (v === 'c' && !col) {
    return (
      <Sec mode={mode}>{Header}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {COPY.servicos.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: 20, alignItems: 'center', padding: '20px 4px', borderTop: '1.5px solid var(--line)', borderBottom: i === COPY.servicos.length - 1 ? '1.5px solid var(--line)' : 'none' }}>
              <Num size={34}>{'0' + (i + 1)}</Num>
              <H size={18}>{s}</H>
              <Ico s={30} />
            </div>
          ))}
        </div>
      </Sec>
    );
  }
  if (v === 'b' && !col) {
    return (
      <Sec mode={mode}>{Header}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
          {COPY.servicos.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 0', borderBottom: '1.5px solid var(--line)' }}>
              <Ico s={32} />
              <div><H size={16}>{s}</H><Bar w="70%" h={7} mt={10} /></div>
            </div>
          ))}
        </div>
        <Note style={{ marginTop: 18 }}>hover: elevação suave + sombra difusa terracota</Note>
      </Sec>
    );
  }
  // variant A — 3-col card grid
  return (
    <Sec mode={mode}>{Header}
      <div style={{ display: col ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '1fr 1fr 1fr', gap: sz(mode, 18, 14) }}>
        {COPY.servicos.map((s, i) => (
          <div key={i} className="wf-box" style={{ padding: sz(mode, 24, 20), display: 'flex', flexDirection: 'column', gap: 14, boxShadow: i === 0 ? '0 10px 22px -10px rgba(186,120,39,.45)' : 'none' }}>
            <Ico s={34} />
            <H size={16}>{s}</H>
            <Bar w="80%" h={7} />
            {i === 0 && <Note style={{ fontSize: 15 }}>hover: sombra terracota</Note>}
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── 7 · CENTRO DIA / VIVENTI INTEGRAL ────────────────────────
function CentroDia({ v, mode }) {
  const col = isM(mode);
  const List = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {COPY.centroDia.details.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--terra)', flex: '0 0 auto' }} />
          <span style={{ fontSize: 13, color: 'rgba(250,246,240,.85)' }}>{d}</span>
        </div>
      ))}
    </div>
  );
  if (v === 'b' && !col) {
    return (
      <Sec bg="var(--dark)" mode={mode} vpad={72}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Tag>Viventi Integral</Tag>
            <H size={34} style={{ color: 'var(--dlight)', marginTop: 12 }}>{COPY.centroDia.h}</H>
            <Sub size={14} style={{ color: 'rgba(250,246,240,.7)', marginTop: 14 }}>{COPY.centroDia.sub}</Sub>
            <div style={{ marginTop: 26 }}><CTA size="lg">{COPY.centroDia.cta}</CTA></div>
          </div>
          <div style={{ border: '1.5px solid #544D44', borderRadius: 6, padding: 30 }}>{List}</div>
        </div>
      </Sec>
    );
  }
  return (
    <Sec bg="var(--dark)" mode={mode} vpad={sz(mode, 72, 48)}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        {v === 'c' && <Num size={70} style={{ color: 'var(--terra)' }}>07</Num>}
        <Tag>Centro Dia · Viventi Integral</Tag>
        <H size={sz(mode, 34, 25)} style={{ color: 'var(--dlight)' }}>{COPY.centroDia.h}</H>
        <Sub size={sz(mode, 14, 13)} style={{ color: 'rgba(250,246,240,.7)', maxWidth: 520 }}>{COPY.centroDia.sub}</Sub>
        <div style={{ marginTop: 6, display: 'inline-flex' }}>
          <div style={{ display: col ? 'flex' : 'inline-flex', flexDirection: col ? 'column' : 'row', flexWrap: 'wrap', gap: col ? 12 : '12px 28px', justifyContent: 'center' }}>
            {COPY.centroDia.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--terra)' }} />
                <span style={{ fontSize: 12.5, color: 'rgba(250,246,240,.85)' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 14 }}><CTA size="lg">{COPY.centroDia.cta}</CTA></div>
      </div>
    </Sec>
  );
}

Object.assign(window, { sz, isM, Sec, HeadCentered, Navbar, Hero, Dor, OQue, Pilares, Servicos, CentroDia });
