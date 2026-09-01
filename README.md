# Site Espaço Viventi

Site institucional do Espaço Viventi, em Ipatinga/MG. HTML estático, sem build.

## Como colocar no ar

Este repositório pode ser publicado direto em qualquer hospedagem estática
(GitHub Pages, Netlify, Vercel, Hostinger, ou FTP tradicional). Basta subir
todos os arquivos mantendo a estrutura de pastas.

## Estrutura

    index.html                     página inicial
    Site Espaço Viventi.html       cópia da inicial (link antigo, manter)
    Nossa História.html
    Cursos.html
    Galeria.html
    Rede Viventi.html              oculta do menu
    politica-de-privacidade.html
    geriatria/index.html           landing de tráfego pago (Google Ads)
    centro-dia/index.html          Clube Viventi
    sitemap.xml
    robots.txt
    assets/                        css, js, imagens, logos e vídeos

## Rotina de atualização

1. Edite o arquivo desejado.
2. Faça commit e push.
3. A hospedagem publica em seguida (no GitHub Pages leva cerca de 1 minuto).

## Medição

- Google Analytics 4: G-MB22GHFMG3
- Meta Pixel: 2252254588648286
- Evento de conversão de todo clique de WhatsApp: `contato_whatsapp`,
  com os parâmetros `secao` e `origem`.

No GA4, marque `contato_whatsapp` como conversão e importe-a na conta do
Google Ads antes de iniciar a campanha.

## Editor de texto embutido

As páginas carregam `assets/te.js`, que permite editar textos direto no
navegador com Shift+E ou adicionando `#editar` à URL. As alterações ficam
salvas apenas no navegador de quem editou, servem para testar redações e
não alteram o arquivo publicado.

## Paleta da marca

    sage      #6E795E
    ochre     #BA752C
    terra     #B4543D
    cream     #F6E3D0
    charcoal  #313232
    sand      #FBF4EC
