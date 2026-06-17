/* wf-kit.jsx — low-fi wireframe primitives + copy data for Espaço Viventi.
   Language: monospace = real/draft copy, gray bars = filler body text,
   Caveat = handwritten margin annotations, terracotta = the recurring CTA.
   Exports primitives + COPY to window. */

if (typeof document !== 'undefined' && !document.getElementById('wf-styles')) {
  const s = document.createElement('style');
  s.id = 'wf-styles';
  s.textContent = `
  .wf{
    --paper:#FBF8F3; --paper2:#F1EADF; --ink:#4A453E; --mute:#8C8475;
    --line:#CDC4B5; --fill:#EAE3D7; --fill2:#DCD3C4;
    --terra:#BA7827; --sage:#6E7E63; --dark:#3A332B; --dlight:#F3EDE3;
    font-family:'Spline Sans Mono', ui-monospace, monospace;
    color:var(--ink); background:var(--paper);
    -webkit-font-smoothing:antialiased; line-height:1.5;
  }
  .wf *{box-sizing:border-box;}
  .wf-bar{background:var(--fill2); border-radius:3px; display:block;}
  .wf-tag{font-size:10px; letter-spacing:2.5px; text-transform:uppercase;
    color:var(--terra); font-weight:500;}
  .wf-tag.sage{color:var(--sage);}
  .wf-h{font-family:'Spline Sans Mono',monospace; font-weight:500; color:var(--ink);
    letter-spacing:-.3px; line-height:1.18;}
  .wf-sub{color:var(--mute); font-weight:400;}
  .wf-anno{font-family:'Caveat',cursive; color:var(--sage); font-size:18px;
    line-height:1.15; font-weight:600;}
  .wf-num{font-family:'Caveat',cursive; color:var(--terra); font-weight:700;
    line-height:.8;}
  .wf-box{border:1.5px solid var(--line); background:#fff; border-radius:4px;}
  .wf-dash{border:1.5px dashed var(--line); background:transparent; border-radius:4px;}
  .wf-img{position:relative; border-radius:4px; overflow:hidden;
    background-image:repeating-linear-gradient(45deg,var(--fill) 0 9px,var(--fill2) 9px 18px);
    border:1.5px solid var(--line);}
  .wf-img.dark{background-image:repeating-linear-gradient(45deg,#46403A 0 9px,#3A332B 9px 18px);
    border-color:#544D44;}
  .wf-imgcap{position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
    font-size:11px; color:var(--mute); background:var(--paper); padding:3px 9px;
    border-radius:99px; white-space:nowrap; letter-spacing:.3px;}
  .wf-img.dark .wf-imgcap{background:#2E2823; color:#B9AE9D;}
  .wf-cta{display:inline-flex; align-items:center; gap:8px; background:var(--terra);
    color:#fff; font-family:'Spline Sans Mono',monospace; font-weight:500;
    text-transform:uppercase; letter-spacing:1.2px; border-radius:99px;
    text-decoration:none; white-space:nowrap; line-height:1;}
  .wf-cta.ghost{background:#fff; color:var(--terra); border:1.5px solid var(--terra);}
  .wf-cta .dot{width:9px;height:9px;border-radius:99px;background:currentColor;flex:0 0 auto;opacity:.85;}
  .wf-ico{display:flex;align-items:center;justify-content:center;border:1.5px solid var(--sage);
    border-radius:7px; color:var(--sage); flex:0 0 auto;}
  .wf-ico .d{width:6px;height:6px;border-radius:99px;background:currentColor;}
  .wf-rule{border:0;border-top:1.5px solid var(--line);}
  `;
  document.head.appendChild(s);
}

// ── primitives ───────────────────────────────────────────────
const Bar = ({ w = '100%', h = 9, mt = 0, mb = 0, o = 1, style }) =>
  <span className="wf-bar" style={{ width: w, height: h, marginTop: mt, marginBottom: mb, opacity: o, ...style }} />;

// column of filler text bars
const Lines = ({ n = 3, w = '100%', last = '60%', gap = 9, h = 8, color }) => (
  <span style={{ display: 'flex', flexDirection: 'column', gap }}>
    {Array.from({ length: n }).map((_, i) =>
      <Bar key={i} w={i === n - 1 ? last : w} h={h} style={color ? { background: color } : null} />)}
  </span>
);

const Tag = ({ children, sage }) => <div className={'wf-tag' + (sage ? ' sage' : '')}>{children}</div>;

const H = ({ children, size = 30, style }) =>
  <div className="wf-h" style={{ fontSize: size, ...style }}>{children}</div>;

const Sub = ({ children, size = 13, style }) =>
  <div className="wf-sub" style={{ fontSize: size, lineHeight: 1.55, ...style }}>{children}</div>;

const Note = ({ children, style }) => (
  <div className="wf-anno" style={style}>
    <span style={{ marginRight: 5 }}>↳</span>{children}
  </div>
);

const Num = ({ children, size = 64, style }) =>
  <div className="wf-num" style={{ fontSize: size, ...style }}>{children}</div>;

// generic line-icon placeholder (sage). size px.
const Ico = ({ s = 40, terra }) => (
  <div className="wf-ico" style={{ width: s, height: s, ...(terra ? { borderColor: 'var(--terra)', color: 'var(--terra)' } : null) }}>
    <span className="d" style={{ width: s * 0.16, height: s * 0.16 }} />
  </div>
);

// image placeholder with mono caption
const Img = ({ h = 180, w = '100%', cap = 'imagem', dark, r = 4, style }) => (
  <div className={'wf-img' + (dark ? ' dark' : '')} style={{ height: h, width: w, borderRadius: r, ...style }}>
    <span className="wf-imgcap">{cap}</span>
  </div>
);

// the recurring conversion button
const CTA = ({ children, ghost, size = 'md', style }) => {
  const pad = size === 'lg' ? '15px 26px' : size === 'sm' ? '9px 16px' : '12px 20px';
  const fs = size === 'lg' ? 13 : size === 'sm' ? 10 : 11;
  return (
    <a href="#" className={'wf-cta' + (ghost ? ' ghost' : '')} style={{ padding: pad, fontSize: fs, ...style }}>
      <span className="dot" />{children}
    </a>
  );
};

// ── copy ─────────────────────────────────────────────────────
const COPY = {
  brand: 'Espaço Viventi',
  nav: ['Serviços', 'Centro Dia'],
  navCta: 'Marcar uma visita',
  hero: {
    h: 'O mais completo cuidado para longevidade do Vale do Aço.',
    sub: 'Corpo, cognição e vida social — em um único espaço especializado em gerontologia, para quem quer envelhecer com independência e autonomia.',
    cta: 'Marcar uma visita no WhatsApp',
  },
  dor: {
    body: 'Você percebeu uma mudança. Um esquecimento que preocupa. Uma queda que assustou. O isolamento foi aumentando acompanhado de um desânimo. Você quer ajuda de quem vai saber cuidar e orientar. De uma equipe especializada em envelhecimento em um espaço criado para oferecer as melhores soluções.',
    icons: ['Sobrecarga da família', 'Isolamento e perda de rotina', 'Medo de perder a independência'],
  },
  oque: {
    naoT: 'O que não somos',
    nao: ['ILPI / casa de repouso', 'Academia', 'Clínica isolada'],
    somosT: 'O que somos',
    somos: 'Centro de cuidado integral com equipe de gerontologia, atendendo corpo, mente e vida social da mesma pessoa.',
  },
  pilares: [
    ['Corpo', 'Força, equilíbrio e mobilidade com propósito clínico.'],
    ['Cognição', 'Estimulação baseada em evidências para memória, atenção e autonomia.'],
    ['Participação Social', 'Convívio, oficinas e vínculo que combatem o isolamento.'],
  ],
  servicos: ['Musculação Terapêutica', 'Pilates Clínico', 'Fisioterapia', 'Terapia Ocupacional', 'Estimulação Cognitiva / CST', 'Nutrição', 'Consulta Geriátrica'],
  centroDia: {
    h: 'Cuidado profissional o dia inteiro.',
    sub: 'Para quem precisa de suporte contínuo — e para a família que precisa de tranquilidade.',
    details: ['Segunda a sexta, 8h às 18h', 'Refeições incluídas', 'Rotina estruturada com equipe especializada', 'Até 6 vagas'],
    cta: 'Quero saber mais sobre o Centro Dia',
  },
  diferenciais: [
    'Único espaço de Ipatinga com profissional certificado em CST — protocolo validado em +40 países.',
    'Tecnologia Sensorial Life, criada por neurocientistas, para estimulação sensorial avançada.',
    'Avaliação funcional com equipamento MedEOR Medtech — relatório individual de força e equilíbrio.',
    'Ancorado na Década do Envelhecimento Saudável da OMS (2021–2030) e no Relatório Lancet 2025.',
  ],
  depo: {
    t: 'Quem já conhece o Viventi.',
    items: [
      '— Maria, filha de cliente',
      '— Antônio, 71 anos',
      '— Sônia, filha de cliente',
    ],
  },
  passos: [
    ['Visita', 'Conheça o espaço e entenda como funciona o cuidado Viventi.'],
    ['Avaliação', 'Avaliamos corpo, cognição e rotina com tecnologia e protocolo clínico.'],
    ['Plano individualizado', 'Cada pessoa recebe um programa feito para sua realidade.'],
    ['Acompanhamento contínuo', 'A equipe acompanha a evolução e ajusta o cuidado ao longo do tempo.'],
  ],
  passosCta: 'Começar pelo primeiro passo',
  equipe: {
    t: 'Quem cuida de você.',
    bio: 'Larissa Moreira, Terapeuta Ocupacional (UFMG), especialista em Gerontologia pelo COFFITO e pela SBGG, com Residência Multiprofissional no HC-UFMG. Mais de 10 anos de atuação clínica, fundadora dos cursos CUIDA e CENA, docente universitária e palestrante.',
    anchor: 'Antes de qualquer atividade, a gente avalia. Antes de qualquer diagnóstico, a gente enxerga a pessoa.',
  },
  faq: {
    t: 'Perguntas frequentes',
    items: [
      ['O Viventi é um asilo ou casa de repouso?', 'Não. Ninguém mora aqui. As pessoas vêm em dias e horários agendados, participam das atividades e voltam para casa — ou passam o dia no programa Viventi Integral.'],
      ['Preciso de encaminhamento médico para começar?', null],
      ['Como funciona a primeira visita?', null],
      ['Quais profissionais fazem parte da equipe?', null],
      ['Em quais casos o Centro Dia é indicado?', null],
    ],
  },
  ctaFinal: {
    t: 'Comece com uma visita.',
    cta: 'Marcar uma visita no WhatsApp',
    hours: 'Seg–Sex, 8h–18h',
    insta: '@espacoviventi_',
  },
  footer: ['CNPJ 00.000.000/0001-00', 'Aviso LGPD', '@espacoviventi_', 'wa.me/553198001-4114'],
};

Object.assign(window, { Bar, Lines, Tag, H, Sub, Note, Num, Ico, Img, CTA, COPY });
