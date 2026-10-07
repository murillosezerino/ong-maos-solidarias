// Controles de aparência: modo escuro e alto contraste.
// Sem escolha salva, a aplicação segue a preferência do sistema operacional.
import { lerAparencia, salvarAparencia } from './armazenamento.js';

const raiz = document.documentElement;
const opcoes = {
  tema:      { atributo: 'data-tema',      ativo: 'escuro', inativo: 'claro',  consulta: '(prefers-color-scheme: dark)' },
  contraste: { atributo: 'data-contraste', ativo: 'alto',   inativo: 'normal', consulta: '(prefers-contrast: more)' }
};

function aplicar(chave, ativo) {
  const opcao = opcoes[chave];
  raiz.setAttribute(opcao.atributo, ativo ? opcao.ativo : opcao.inativo);
  document.querySelector(`[data-aparencia="${chave}"]`)?.setAttribute('aria-pressed', String(ativo));
  window.dispatchEvent(new CustomEvent('aparencia:mudou'));
}

export function iniciarAparencia() {
  Object.entries(opcoes).forEach(([chave, opcao]) => {
    const botao = document.querySelector(`[data-aparencia="${chave}"]`);
    botao?.setAttribute('aria-pressed', String(raiz.getAttribute(opcao.atributo) === opcao.ativo));

    // Escolha manual: salva e passa a ter prioridade sobre o sistema
    botao?.addEventListener('click', () => {
      const ativo = botao.getAttribute('aria-pressed') !== 'true';
      aplicar(chave, ativo);
      salvarAparencia({ ...lerAparencia(), [chave]: ativo ? opcao.ativo : opcao.inativo });
    });

    // Sem escolha salva, acompanha mudanças feitas no sistema com a página aberta
    window.matchMedia?.(opcao.consulta).addEventListener('change', evento => {
      if (!lerAparencia()[chave]) aplicar(chave, evento.matches);
    });
  });
}
