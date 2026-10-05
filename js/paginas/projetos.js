// Página Projetos: gera os cartões a partir dos dados e ativa o modal de doação
import { projetos } from '../dados/projetos.js';
import { cartaoProjeto } from '../templates/componentes.js';
import { ativarFeedback } from '../modulos/feedback.js';

export function iniciar(raiz) {
  raiz.querySelector('#projetos')?.insertAdjacentHTML('beforeend', projetos.map(cartaoProjeto).join(''));
  ativarFeedback(raiz);
}
