/* wf-sections-2.jsx — sections 8–14 + floating mobile CTA. Uses helpers from sections-1. */

// ── 8 · DIFERENCIAIS ─────────────────────────────────────────
function Diferenciais({ v, mode }) {
  const col = isM(mode);
  const items = COPY.diferenciais;
  if (v === 'c' && !col) {
    return (
      <Sec mode={mode} bg="var(--paper)">
        <Tag>Diferenciais</Tag>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column' }}>
          {items.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 22, alignItems: 'center', padding: '22px 0', borderTop: '1.5px solid var(--line)', borderBottom: i === items.length - 1 ? '1.5px solid var(--line)' : 'none' }}>
              <Num size={40}>{'0' + (i + 1)}</Num>
              <div className="wf-h" style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.45, maxWidth: 720 }}>{t}</div>
            </div>
          ))}
        </div>
      </Sec>
    );
  }
  const grid = col ? '1fr' : (v === 'b' ? '1fr 1fr' : '1fr 1fr 1fr 1fr');
  return (
    <Sec mode={mode}>
      <div style={{ textAlign: v === 'a' ? 'center' : 'left', marginBottom: 28 }}><Tag>Diferenciais</Tag></div>
      <div style={{ display: 'grid', gridTemplateColumns: grid, gap: sz(mode, 22, 16) }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16, borderTop: '2px solid var(--terra)' }}>
            <Ico s={32} terra />
            <div className="wf-h" style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.5 }}>{t}</div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── 9 · DEPOIMENTOS ──────────────────────────────────────────
function Depoimentos({ v, mode }) {
  const col = isM(mode);
  const Card = ({ name }) => (
    <div className="wf-box" style={{ padding: 24, flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: "'Caveat',cursive", color: 'var(--terra)', fontSize: 44, lineHeight: .6, fontWeight: 700 }}>“</div>
      <div style={{ fontStyle: 'italic', marginTop: 8 }}><Lines n={3} last="55%" h={8} /></div>
      <div style={{ fontSize: 12, color: 'var(--ink)', marginTop: 16 }}>{name}</div>
    </div>
  );
  const Video = ({ h }) => (
    <div className="wf-img dark" style={{ height: h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ width: 54, height: 54, borderRadius: 99, border: '2px solid #C9BCA9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '14px solid #C9BCA9', marginLeft: 4 }} />
      </span>
      <span className="wf-imgcap" style={{ bottom: 12, top: 'auto' }}>vídeo (16:9) · futuro</span>
    </div>
  );

  if (col) {
    return (
      <Sec bg="var(--paper2)" mode={mode}>
        <Tag>Depoimentos</Tag>
        <H size={21} style={{ marginTop: 10, marginBottom: 20 }}>{COPY.depo.t}</H>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 6 }}>
          {COPY.depo.items.map((n, i) => <div key={i} style={{ flex: '0 0 78%' }}><Card name={n} /></div>)}
        </div>
        <Note style={{ marginTop: 12 }}>carrossel swipe · JS vanilla</Note>
        <div style={{ marginTop: 18 }}><Video h={190} /></div>
      </Sec>
    );
  }
  if (v === 'b') {
    return (
      <Sec bg="var(--paper2)" mode={mode}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'stretch' }}>
          <Video h={340} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><Tag>Depoimentos</Tag><H size={24} style={{ marginTop: 8 }}>{COPY.depo.t}</H></div>
            {COPY.depo.items.map((n, i) => <Card key={i} name={n} />)}
          </div>
        </div>
      </Sec>
    );
  }
  return (
    <Sec bg="var(--paper2)" mode={mode}>
      <div style={{ textAlign: v === 'a' ? 'center' : 'left', marginBottom: 26 }}>
        <Tag>Depoimentos</Tag><H size={26} style={{ marginTop: 10 }}>{COPY.depo.t}</H>
      </div>
      <div style={{ display: 'flex', gap: 18, marginBottom: 20 }}>
        {COPY.depo.items.map((n, i) => <Card key={i} name={n} />)}
      </div>
      <Video h={300} />
    </Sec>
  );
}

// ── 10 · COMO COMEÇAR ────────────────────────────────────────
function ComoComecar({ v, mode }) {
  const col = isM(mode);
  const steps = COPY.passos;
  const Inner = () => {
    if (v === 'b' && !col) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1.5px solid var(--line)', paddingLeft: 30, marginLeft: 12 }}>
          {steps.map(([t, d], i) => (
            <div key={i} style={{ position: 'relative', padding: '16px 0' }}>
              <Num size={40} style={{ position: 'absolute', left: -64, top: 8 }}>{i + 1}</Num>
              <H size={19}>{t}</H>
              <Sub size={13} style={{ marginTop: 6, maxWidth: 560 }}>{d}</Sub>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div style={{ display: col ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: sz(mode, 24, 18) }}>
        {steps.map(([t, d], i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Num size={sz(mode, 56, 48)}>{i + 1}</Num>
            <H size={17} style={{ marginTop: 4 }}>{t}</H>
            <Sub size={12.5}>{d}</Sub>
          </div>
        ))}
      </div>
    );
  };
  return (
    <Sec mode={mode}>
      <div style={{ textAlign: v === 'a' ? 'center' : 'left', marginBottom: 30 }}>
        <Tag>Como começar</Tag>
        <H size={sz(mode, 26, 21)} style={{ marginTop: 10 }}>Quatro passos, no seu ritmo.</H>
      </div>
      <Inner />
      <div style={{ textAlign: v === 'a' ? 'center' : 'left', marginTop: 34 }}><CTA size="lg">{COPY.passosCta}</CTA></div>
    </Sec>
  );
}

// ── 11 · EQUIPE / AUTORIDADE ─────────────────────────────────
function Equipe({ v, mode }) {
  const col = isM(mode);
  const Photo = ({ s }) => (
    <div style={{ width: s, height: s, borderRadius: 99, background: 'var(--terra)', flex: '0 0 auto', position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 11, color: '#F4DDBF' }}>foto</span>
    </div>
  );
  const Anchor = (
    <div style={{ fontFamily: "'Caveat',cursive", fontStyle: 'italic', color: 'var(--terra)', fontSize: sz(mode, 26, 21), fontWeight: 600, lineHeight: 1.3 }}>
      "{COPY.equipe.anchor}"
    </div>
  );
  if (v === 'b' && !col) {
    return (
      <Sec bg="var(--paper2)" mode={mode} vpad={72}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'center' }}>
          <Photo s={200} />
          <div>
            <Tag>Quem cuida de você</Tag>
            <H size={28} style={{ marginTop: 10 }}>{COPY.equipe.t}</H>
            <Sub size={13.5} style={{ marginTop: 14, maxWidth: 640 }}>{COPY.equipe.bio}</Sub>
            <div style={{ marginTop: 22, paddingLeft: 18, borderLeft: '3px solid var(--terra)' }}>{Anchor}</div>
          </div>
        </div>
      </Sec>
    );
  }
  if (v === 'c' && !col) {
    return (
      <Sec bg="var(--paper2)" mode={mode} vpad={72}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 48, alignItems: 'center' }}>
          <div>
            <Tag>Quem cuida de você</Tag>
            <div style={{ marginTop: 18 }}>{Anchor}</div>
            <Sub size={13.5} style={{ marginTop: 22, maxWidth: 600 }}>{COPY.equipe.bio}</Sub>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <Photo s={220} /><div style={{ fontSize: 13 }}>Larissa Moreira</div>
          </div>
        </div>
      </Sec>
    );
  }
  return (
    <Sec bg="var(--paper2)" mode={mode} vpad={sz(mode, 64, 48)}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <Photo s={sz(mode, 140, 120)} />
        <Tag>Quem cuida de você</Tag>
        <H size={sz(mode, 26, 21)}>{COPY.equipe.t}</H>
        <Sub size={13} style={{ maxWidth: 560 }}>{COPY.equipe.bio}</Sub>
        <div style={{ marginTop: 8 }}>{Anchor}</div>
      </div>
    </Sec>
  );
}

// ── 12 · FAQ ─────────────────────────────────────────────────
function FAQ({ v, mode }) {
  const col = isM(mode);
  const Acc = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {COPY.faq.items.map(([q, a], i) => (
        <div key={i} style={{ borderBottom: '1.5px solid var(--line)', padding: '18px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
              {v === 'c' && <span style={{ fontFamily: "'Caveat',cursive", color: 'var(--terra)', fontSize: 24, fontWeight: 700 }}>{'0' + (i + 1)}</span>}
              <H size={sz(mode, 16, 14)} style={{ fontWeight: 500 }}>{q}</H>
            </div>
            <span style={{ fontSize: 20, color: 'var(--terra)', lineHeight: 1 }}>{i === 0 ? '–' : '+'}</span>
          </div>
          {i === 0 && a && <Sub size={13} style={{ marginTop: 14, maxWidth: 680 }}>{a}</Sub>}
        </div>
      ))}
    </div>
  );
  if (v === 'b' && !col) {
    return (
      <Sec mode={mode}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.5fr', gap: 48, alignItems: 'start' }}>
          <div><Tag>FAQ</Tag><H size={26} style={{ marginTop: 10 }}>{COPY.faq.t}</H><Note style={{ marginTop: 14 }}>accordion · max-height + transition CSS</Note></div>
          <div>{Acc}</div>
        </div>
      </Sec>
    );
  }
  return (
    <Sec mode={mode}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: v === 'a' ? 'center' : 'left', marginBottom: 22 }}>
          <Tag>FAQ</Tag><H size={sz(mode, 26, 21)} style={{ marginTop: 10 }}>{COPY.faq.t}</H>
        </div>
        {Acc}
        <Note style={{ marginTop: 16, textAlign: 'center' }}>accordion · 1ª aberta · transição suave CSS</Note>
      </div>
    </Sec>
  );
}

// ── 13 · CTA FINAL + LOCALIZAÇÃO ─────────────────────────────
function CtaFinal({ v, mode }) {
  const col = isM(mode);
  const Map = ({ h }) => (
    <div className="wf-img" style={{ height: h, borderColor: '#D8A766' }}>
      <span className="wf-imgcap">mapa · Google Maps — Ipatinga, MG</span>
      <span style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-100%)', width: 16, height: 16, borderRadius: '50% 50% 50% 0', background: 'var(--dark)', rotate: '-45deg' }} />
    </div>
  );
  const Meta = (
    <div style={{ display: 'flex', flexDirection: col ? 'column' : 'row', gap: col ? 8 : 24, justifyContent: 'center', marginTop: 16 }}>
      <span style={{ fontSize: 12, color: '#fff' }}>⏱ {COPY.ctaFinal.hours}</span>
      <span style={{ fontSize: 12, color: '#fff' }}>◎ {COPY.ctaFinal.insta}</span>
    </div>
  );
  if (v === 'b' && !col) {
    return (
      <Sec bg="var(--terra)" mode={mode} vpad={0} hpad={0}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
          <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
            <H size={36} style={{ color: '#fff' }}>{COPY.ctaFinal.t}</H>
            <div><CTA ghost size="lg">{COPY.ctaFinal.cta}</CTA></div>
            <div style={{ display: 'flex', gap: 24 }}><span style={{ fontSize: 12, color: '#fff' }}>⏱ {COPY.ctaFinal.hours}</span><span style={{ fontSize: 12, color: '#fff' }}>◎ {COPY.ctaFinal.insta}</span></div>
          </div>
          <Map h={'100%'} />
        </div>
      </Sec>
    );
  }
  return (
    <Sec bg="var(--terra)" mode={mode} vpad={sz(mode, 64, 48)}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <H size={sz(mode, 36, 26)} style={{ color: '#fff' }}>{COPY.ctaFinal.t}</H>
        <CTA ghost size="lg">{COPY.ctaFinal.cta}</CTA>
        {Meta}
        <div style={{ width: '100%', marginTop: 22 }}><Map h={sz(mode, 280, 200)} /></div>
      </div>
    </Sec>
  );
}

// ── 14 · RODAPÉ ──────────────────────────────────────────────
function Rodape({ v, mode }) {
  const col = isM(mode);
  return (
    <Sec bg="var(--dark)" mode={mode} vpad={sz(mode, 44, 36)}>
      <div style={{ display: 'flex', flexDirection: col ? 'column' : 'row', justifyContent: 'space-between', gap: 22, alignItems: col ? 'flex-start' : 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, border: '1.5px solid var(--terra)' }} />
          <div className="wf-h" style={{ fontSize: 15, color: 'var(--dlight)' }}>Espaço Viventi</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: col ? 8 : 24 }}>
          {COPY.footer.map((f, i) => <span key={i} style={{ fontSize: 11, color: 'rgba(250,246,240,.7)' }}>{f}</span>)}
        </div>
      </div>
    </Sec>
  );
}

// ── floating mobile CTA ──────────────────────────────────────
function FloatWhats({ mode }) {
  if (!isM(mode)) return null;
  return (
    <div style={{ position: 'sticky', bottom: 16, left: 0, display: 'flex', justifyContent: 'flex-end', padding: '0 16px', marginTop: -64, pointerEvents: 'none', zIndex: 20 }}>
      <div style={{ pointerEvents: 'auto' }}>
        <CTA size="md" style={{ boxShadow: '0 8px 22px rgba(58,51,43,.35)' }}>Marcar visita</CTA>
      </div>
    </div>
  );
}

Object.assign(window, { Diferenciais, Depoimentos, ComoComecar, Equipe, FAQ, CtaFinal, Rodape, FloatWhats });
