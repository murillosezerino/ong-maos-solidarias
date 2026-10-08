# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versionamento semântico.

## [1.3.1]
### Corrigido
- README: números do build atualizados após o modo escuro (16 módulos, 27 → 9 requisições) e módulo de aparência incluído na estrutura.

## [1.3.0]
### Adicionado
- Modo escuro e alto contraste, com botões no rodapé, preferência do sistema e suporte a cores forçadas (#18).

### Alterado
- Design system com variáveis semânticas de cor (fundo, texto, cabeçalho, rodapé).

## [1.2.1]
### Corrigido
- Deploy no GitHub Pages: actions atualizadas para versões compatíveis com o Node.js 24 e build com Node.js 22 LTS.

## [1.2.0]
### Adicionado
- Testes unitários com node:test para validação, máscaras e templates, executados no CI antes do deploy (#11).
- README completo com demonstração, instalação, scripts, arquitetura e versionamento, além da licença MIT (#12).

## [1.1.0]
### Adicionado
- Conformidade com a WCAG 2.1 AA: foco com contraste adequado, autocomplete nos campos e toast com pausa durante a leitura (#2).
- Build de produção com esbuild: de 26 para 9 requisições na primeira carga (#3).
- Deploy automático no GitHub Pages com GitHub Actions (#4).
- Modelos de issue e de pull request (#5).

## [1.0.1]
### Corrigido
- Rascunho vazio era salvo e exibia o aviso de recuperação sem dados.

## [1.0.0]
### Adicionado
- SPA com roteamento por hash: Início, Projetos, Cadastro e Guia de componentes.
- Design system, grid de 12 colunas e menu responsivo com dropdown e hambúrguer.
- Formulário com máscaras, validação de CPF e idade, resumo de erros e rascunho automático.
- Persistência de cadastros no localStorage.
- Gráfico de impacto com Chart.js.
