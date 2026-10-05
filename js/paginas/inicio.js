// Página Início: total de voluntários (localStorage) e gráfico de impacto (Chart.js)
import { listarCadastros } from '../modulos/armazenamento.js';
import { criarGraficoBarras } from '../modulos/graficos.js';
import { familiasPorAno } from '../dados/impacto.js';

const VOLUNTARIOS_ATIVOS = 350;

export async function iniciar(raiz) {
  const total = raiz.querySelector('[data-total-voluntarios]');
  if (total) total.textContent = VOLUNTARIOS_ATIVOS + listarCadastros().length;

  const figura = raiz.querySelector('.grafico');
  if (!figura) return;
  try {
    await criarGraficoBarras(
      figura.querySelector('canvas'),
      familiasPorAno.map(item => item.ano),
      familiasPorAno.map(item => item.familias),
      'Famílias atendidas'
    );
    figura.classList.add('grafico--pronto');
  } catch {
    // Sem a biblioteca, a tabela com os mesmos dados continua visível
    figura.classList.add('grafico--indisponivel');
  }
}
