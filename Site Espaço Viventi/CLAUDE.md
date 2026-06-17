# Instruções do projeto — Espaço Viventi

## Backups automáticos
Antes de qualquer sessão de edições significativas, criar um backup copiando os 5 arquivos principais para `backups/AAAA-MM-DD/`:
- Site Espaço Viventi.html
- Nossa História.html
- Rede Viventi.html
- Cursos.html
- Galeria.html
- assets/te.js
- assets/viventi.css

Para reverter: copiar os arquivos da pasta de backup de volta para a raiz do projeto.

## Editor de texto
- Arquivo: `assets/te.js` (versão 3)
- Ativar: Shift+E ou `#editar` na URL
- Chave localStorage: `vvTE:` + nome da página
- NÃO usar os arquivos antigos text-edit.js ou visual-edit.js

## Editor visual do V (monograma)
- Ativar: Shift+V nas abas com o símbolo V (Nossa História, Rede Viventi, Cursos, Galeria)
- Padrões fixados via `data-v-default` em cada página

## Rede Viventi (oculta)
- A aba Rede Viventi está oculta do menu (comentada como `<!-- REDE VIVENTI (oculto) -->`)
- Para reativar: descomentar os links em todas as 5 páginas

## Paleta da marca
- Sage: #6E795E
- Ochre: #BA752C
- Terra: #B4543D
- Cream: #F6E3D0
- Charcoal: #313232
- Sand: #FBF4EC

## Logos disponíveis
- `assets/logo/logo-color.png` — logotipo colorido (para nav)
- `assets/logo/logo-cream.png` — logotipo creme (para hero/footer)
- `assets/logo/logo-color-tag.png` / `logo-cream-tag.png` — com tagline
- `assets/logo/symbol-*.png` — símbolo V nas cores sage, cream, ochre, terra, charcoal
