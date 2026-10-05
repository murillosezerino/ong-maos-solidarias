// Roteador da SPA: lê o endereço após o "#", carrega a view da pasta html/
// e executa o script da página correspondente, sem recarregar o navegador.
import * as inicio from './paginas/inicio.js';
import * as projetos from './paginas/projetos.js';
import * as cadastro from './paginas/cadastro.js';
import * as componentes from './paginas/componentes.js';

const rotas = {
  inicio:      { view: 'inicio',      titulo: 'Início',              pagina: inicio },
  projetos:    { view: 'projetos',    titulo: 'Projetos',            pagina: projetos },
  cadastro:    { view: 'cadastro',    titulo: 'Seja voluntário',     pagina: cadastro },
  componentes: { view: 'componentes', titulo: 'Guia de componentes', pagina: componentes }
};
const naoEncontrada = { view: 'nao-encontrada', titulo: 'Página não encontrada' };

const cache = new Map();
const saida = document.getElementById('conteudo');

async function carregarView(nome) {
  if (!cache.has(nome)) {
    const resposta = await fetch(`html/${nome}.html`);
    if (!resposta.ok) throw new Error(`View ${nome} não encontrada`);
    cache.set(nome, await resposta.text());
  }
  return cache.get(nome);
}

// "#/projetos/doacao" -> { nome: 'projetos', secao: 'doacao' }
function lerEndereco() {
  const [nome = 'inicio', secao] = location.hash.replace(/^#\/?/, '').split('/');
  return { nome: nome || 'inicio', secao };
}

function marcarMenu(nome) {
  document.querySelectorAll('.menu__link').forEach(link => {
    if (link.getAttribute('href') === `#/${nome}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

async function navegar() {
  // Âncoras comuns (ex.: "Pular para o conteúdo") não são rotas
  if (location.hash && !location.hash.startsWith('#/')) return;

  const { nome, secao } = lerEndereco();
  const rota = rotas[nome] ?? naoEncontrada;

  try {
    saida.innerHTML = await carregarView(rota.view);
  } catch {
    saida.innerHTML = '<h1 tabindex="-1">Erro ao carregar</h1><p>Verifique sua conexão e tente novamente.</p>';
  }

  rota.pagina?.iniciar(saida);
  marcarMenu(nome);
  document.title = `${rota.titulo} | ONG Mãos Solidárias`;

  // Leva o foco ao título (ou à seção pedida) para leitores de tela anunciarem a nova página
  const alvo = secao ? document.getElementById(secao) : null;
  if (alvo) {
    alvo.setAttribute('tabindex', '-1');
    alvo.focus({ preventScroll: true });
    alvo.scrollIntoView();
  } else {
    saida.querySelector('h1')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

export function iniciarRoteador() {
  window.addEventListener('hashchange', navegar);
  navegar();
}
