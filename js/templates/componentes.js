// Templates JavaScript: funções que recebem dados e devolvem HTML.

// Escapa caracteres especiais para evitar injeção de HTML (XSS)
export function escapar(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Imagens responsivas: o navegador escolhe a versão de 400 px ou de 600 px
// conforme a largura que o cartão ocupa (medida em cada breakpoint) e a densidade da tela
const TAMANHOS_CARTAO = '(min-width: 1536px) 600px, (min-width: 1280px) 520px, (min-width: 1024px) 417px, (min-width: 768px) 44vw, 90vw';
const variantes = (imagem, formato) =>
  `imagens/${imagem}-400.${formato} 400w, imagens/${imagem}.${formato} 600w`;

export const badge = ({ texto, tipo = 'neutro' }) =>
  `<li class="badge badge--${tipo}">${escapar(texto)}</li>`;

export const cartaoProjeto = projeto => `
<article>
  <h3>${escapar(projeto.titulo)}</h3>
  <ul class="etiquetas" aria-label="Situação e categoria">
    ${projeto.etiquetas.map(badge).join('')}
  </ul>
  <picture>
    <source type="image/webp" srcset="${variantes(projeto.imagem, 'webp')}" sizes="${TAMANHOS_CARTAO}">
    <img src="imagens/${projeto.imagem}.jpg" srcset="${variantes(projeto.imagem, 'jpg')}" sizes="${TAMANHOS_CARTAO}"
      alt="${escapar(projeto.alt)}" width="600" height="400" loading="lazy">
  </picture>
  <p>${escapar(projeto.descricao)}</p>
</article>`;

export const alerta = (tipo, titulo, mensagem) => `
<div class="alerta alerta--${tipo}">
  <p><strong>${escapar(titulo)}</strong> ${escapar(mensagem)}</p>
</div>`;

export const resumoErros = erros => `
<div class="alerta alerta--erro" role="alert">
  <div>
    <p><strong>Corrija ${erros.length === 1 ? '1 campo' : `${erros.length} campos`} para continuar:</strong></p>
    <ul class="resumo-erros__lista">
      ${erros.map(e => `<li><a href="#${e.id}" data-foco="${e.id}">${escapar(e.rotulo)}: ${escapar(e.mensagem)}</a></li>`).join('')}
    </ul>
  </div>
</div>`;

export const itemCadastro = cadastro => `
<li class="lista-cadastros__item">
  <div>
    <p class="lista-cadastros__nome">${escapar(cadastro.nome)}</p>
    <p class="lista-cadastros__dados">${escapar(cadastro.cidade)} - ${escapar(cadastro.estado)} | CPF ${escapar(cadastro.cpf)}</p>
    <ul class="etiquetas">${cadastro.areas.map(a => badge({ texto: a, tipo: 'info' })).join('')}</ul>
  </div>
  <button type="button" class="botao botao--secundario" data-remover="${escapar(cadastro.id)}">Remover</button>
</li>`;
