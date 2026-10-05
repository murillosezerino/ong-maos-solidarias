# ONG Mãos Solidárias - SPA

Plataforma de página única (SPA) para divulgar projetos, captar doações e cadastrar voluntários.

## Como executar
O projeto usa módulos JavaScript (`type="module"`) e carrega as views com `fetch`, por isso precisa
de um servidor local. Abrir o `index.html` direto pelo explorador de arquivos não funciona.

- VS Code: extensão **Live Server** > botão "Go Live".
- Ou, no terminal, dentro da pasta do projeto: `python -m http.server 8000` e acesse http://localhost:8000

## Estrutura
- `index.html`: shell da aplicação (cabeçalho, menu, área `<main>` e rodapé).
- `html/`: views de cada rota, carregadas pelo roteador.
- `css/`: variáveis, base, layout e componentes, nesta ordem.
- `js/app.js`: ponto de entrada; `js/router.js`: navegação por hash (`#/rota`).
- `js/modulos/`: funcionalidades reutilizáveis (menu, máscaras, validação, feedback, armazenamento).
- `js/templates/`: funções que geram HTML a partir de dados.
- `js/paginas/`: lógica específica de cada view.
- `js/dados/`: dados dos projetos.
- `imagens/`: logotipo, ícones e fotos (WebP + JPG).
