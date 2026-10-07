# Relatório de acessibilidade (WCAG 2.1 nível AA)

## Como foi auditado
- **Automático:** axe-core 4.14 nas rotas Início, Projetos, Cadastro, Guia de componentes e página não encontrada, em 1280px e 375px, incluindo estados dinâmicos (formulário com erros, modal aberto e menu móvel aberto). Resultado: **0 violações** nas regras WCAG 2.0/2.1 A e AA e de boas práticas.
- **Manual:** navegação só por teclado, reflow em 320px, contraste das cores e dos indicadores de foco, e conferência do HTML renderizado no validador do W3C.

## Problemas encontrados e corrigidos
| Critério | Problema | Correção |
|---|---|---|
| 1.4.11 Contraste não textual | Contorno de foco amarelo sobre fundo branco com 1,63:1 | Foco azul-petróleo em fundos claros (9,1:1) e amarelo só em fundos escuros (5,6:1) |
| 1.3.5 Finalidade da entrada | Nascimento, telefone, CEP e estado sem `autocomplete` | Tokens `bday`, `tel`, `postal-code` e `address-level1` |
| 2.2.1 Tempo ajustável | Toast sumia em 5 s mesmo durante a leitura | Tempo pausa com mouse ou foco e recomeça ao sair |

## Perfis de cor: modo escuro e alto contraste
O rodapé tem dois botões de alternância (`aria-pressed`): **Modo escuro** e **Alto contraste**. Sem escolha salva, a aplicação segue o sistema operacional (`prefers-color-scheme` e `prefers-contrast`). A escolha fica no `localStorage` e é aplicada por um script no `<head>`, antes do CSS, para que a página nunca seja desenhada com as cores erradas. O modo de cores forçadas do sistema (Alto Contraste do Windows) também é suportado com `@media (forced-colors: active)`.

Os componentes usam variáveis semânticas (`--cor-fundo`, `--cor-texto`, `--cor-cabecalho` e outras), e cada perfil redefine apenas os valores. Contraste medido pela fórmula de luminância relativa da WCAG e confirmado pelo axe-core (regra `color-contrast`) nas 4 combinações, em 1280px e 375px:

| Elemento | Claro | Escuro | Alto contraste | Escuro + alto contraste |
|---|---|---|---|---|
| Texto principal | 15,65:1 | 15,34:1 | 21:1 | 21:1 |
| Links e títulos | 9,1:1 | 9,52:1 | 12,28:1 | 14,93:1 |
| Legendas e dicas | 7,61:1 | 8,66:1 | 15,65:1 | 16,68:1 |
| Mensagem de erro | 6,54:1 | 7,92:1 | 9,12:1 | 11,53:1 |
| Botão de ação | 9,62:1 | 9,62:1 | 12,91:1 | 12,91:1 |
| Menu no cabeçalho | 9,1:1 | 14,3:1 | 15,07:1 | 21:1 |

No alto contraste, bordas, sublinhados e contornos de foco também ficam mais espessos, e o gráfico ganha contorno nas barras.

## Critérios atendidos (principais)
- **1.1.1** Imagens informativas com `alt` descritivo; decorativas com `alt=""`; gráfico com `role="img"`, descrição e tabela alternativa.
- **1.3.1** Estrutura semântica (`header`, `nav`, `main`, `section`, `footer`), títulos sem saltos, `fieldset`/`legend` e `label` ligado a cada campo.
- **1.4.1** Erros comunicados por texto e ícone, nunca só pela cor.
- **1.4.3** Contraste mínimo de 4,5:1 para texto normal e de 3:1 para títulos grandes (o menor caso é o título verde do bloco Transparência, com 4,35:1, acima dos 3:1 exigidos para texto grande).
- **1.4.10** Sem rolagem horizontal em 320px.
- **2.1.1 / 2.1.2** Tudo operável por teclado; dropdown abre com `:focus-within`; modal com `<dialog>` fecha com Esc.
- **2.4.1** Link "Pular para o conteúdo".
- **2.4.2 / 2.4.3** Título da aba atualizado a cada rota e foco movido para o `h1` da nova página.
- **2.4.7** Foco sempre visível (`:focus-visible`).
- **3.1.1** `lang="pt-BR"`.
- **3.3.1 / 3.3.3** Mensagens de erro específicas, com sugestão de correção, associadas por `aria-describedby`.
- **4.1.2** `aria-expanded` no menu, `aria-current` na página ativa, `aria-invalid` nos campos com erro.
- **4.1.3** Toasts em região `role="status"` e resumo de erros com `role="alert"`.
- Animações desativadas com `prefers-reduced-motion`.

## Limitações conhecidas
- Não houve teste com usuários reais nem com leitores de tela em todos os sistemas; recomenda-se validar com NVDA (Windows) e VoiceOver (macOS/iOS).
- A auditoria automática cobre apenas parte dos critérios; os demais foram verificados manualmente.
