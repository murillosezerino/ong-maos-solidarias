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
