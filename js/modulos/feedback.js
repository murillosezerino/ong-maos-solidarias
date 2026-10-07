// Componentes de feedback: toasts e modais

export function mostrarToast(mensagem, tipo = 'info') {
  const area = document.querySelector('.toasts');
  if (!area) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${tipo}`;
  toast.innerHTML = '<p class="toast__mensagem"></p><button type="button" class="toast__fechar" aria-label="Fechar notificação">&times;</button>';
  toast.querySelector('.toast__mensagem').textContent = mensagem;
  const remover = () => {
    toast.classList.add('toast--saindo');
    setTimeout(() => toast.remove(), 250);
  };
  toast.querySelector('.toast__fechar').addEventListener('click', remover);
  area.appendChild(toast);

  // O tempo para sumir pausa enquanto a pessoa lê com o mouse ou o teclado (WCAG 2.2.1)
  let temporizador = setTimeout(remover, 5000);
  const pausar = () => clearTimeout(temporizador);
  const retomar = () => { temporizador = setTimeout(remover, 3000); };
  toast.addEventListener('mouseenter', pausar);
  toast.addEventListener('mouseleave', retomar);
  toast.addEventListener('focusin', pausar);
  toast.addEventListener('focusout', retomar);
}

// Ativa botões de toast, modais e cópia dentro de uma view recém-renderizada
export function ativarFeedback(raiz) {
  raiz.querySelectorAll('[data-toast]').forEach(botao =>
    botao.addEventListener('click', () => mostrarToast(botao.dataset.mensagem, botao.dataset.toast)));

  raiz.querySelectorAll('[data-abre-modal]').forEach(botao =>
    botao.addEventListener('click', () => document.getElementById(botao.dataset.abreModal)?.showModal()));

  raiz.querySelectorAll('dialog.modal').forEach(modal => {
    modal.querySelectorAll('[data-fecha-modal]').forEach(b => b.addEventListener('click', () => modal.close()));
    modal.addEventListener('click', evento => { if (evento.target === modal) modal.close(); });
  });

  raiz.querySelectorAll('[data-copiar]').forEach(botao =>
    botao.addEventListener('click', async () => {
      const texto = document.getElementById(botao.dataset.copiar).textContent;
      try {
        await navigator.clipboard.writeText(texto);
        mostrarToast('Chave Pix copiada.', 'sucesso');
      } catch {
        mostrarToast('Não foi possível copiar. Selecione a chave e copie manualmente.', 'erro');
      }
    }));
}
