// Menu responsivo: botão hambúrguer no celular
export function iniciarMenu() {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  const botao = menu.querySelector('.menu__botao');
  const aberto = () => botao.getAttribute('aria-expanded') === 'true';
  const fechar = () => botao.setAttribute('aria-expanded', 'false');

  menu.classList.add('menu--js');
  requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('menu--pronto')));

  botao.addEventListener('click', () => botao.setAttribute('aria-expanded', String(!aberto())));
  document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape' && aberto()) { fechar(); botao.focus(); }
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', fechar));
  document.addEventListener('click', evento => { if (!menu.contains(evento.target)) fechar(); });
}
