// Página Cadastro: máscaras, validação, rascunho automático e lista salva no localStorage
import { ativarMascaras, ocultarCpf } from '../modulos/mascaras.js';
import { validarCampo, exibirResultado } from '../modulos/validacao.js';
import { mostrarToast } from '../modulos/feedback.js';
import * as armazenamento from '../modulos/armazenamento.js';
import { resumoErros, itemCadastro } from '../templates/componentes.js';

const CAMPOS_RASCUNHO = ['nome', 'nascimento', 'email', 'telefone', 'cep', 'endereco', 'cidade', 'estado'];

function rotuloDe(campo) {
  return document.querySelector(`label[for="${campo.id}"]`).textContent.replace('*', '').trim();
}

function renderizarLista(raiz) {
  const secao = raiz.querySelector('#meus-cadastros');
  const cadastros = armazenamento.listarCadastros();
  secao.hidden = cadastros.length === 0;
  secao.querySelector('.lista-cadastros').innerHTML = cadastros.map(itemCadastro).join('');
}

function restaurarRascunho(formulario) {
  const rascunho = armazenamento.lerRascunho();
  if (!rascunho || !Object.values(rascunho).some(Boolean)) return;
  CAMPOS_RASCUNHO.forEach(id => { if (rascunho[id]) formulario.elements[id].value = rascunho[id]; });
  mostrarToast('Recuperamos o preenchimento que você não terminou.', 'info');
}

export function iniciar(raiz) {
  const formulario = raiz.querySelector('form');
  const resumo = raiz.querySelector('#resumo-erros');
  const campos = [...formulario.querySelectorAll('input[required], select[required]')];

  // Data máxima de nascimento: hoje menos 18 anos
  const limite = new Date();
  limite.setFullYear(limite.getFullYear() - 18);
  formulario.elements.nascimento.max = limite.toISOString().slice(0, 10);

  ativarMascaras(formulario);
  restaurarRascunho(formulario);
  renderizarLista(raiz);

  // Valida cada campo ao sair dele e, depois de um erro, também enquanto digita
  campos.forEach(campo => {
    const evento = campo.type === 'checkbox' ? 'change' : 'blur';
    campo.addEventListener(evento, () => exibirResultado(campo, validarCampo(campo)));
    campo.addEventListener('input', () => {
      if (campo.getAttribute('aria-invalid') === 'true') exibirResultado(campo, validarCampo(campo));
    });
  });

  // Rascunho automático (sem CPF, por segurança)
  formulario.addEventListener('input', () => {
    const dados = Object.fromEntries(CAMPOS_RASCUNHO.map(id => [id, formulario.elements[id].value]));
    // Formulário totalmente vazio não gera rascunho
    if (Object.values(dados).some(Boolean)) armazenamento.salvarRascunho(dados);
    else armazenamento.limparRascunho();
  });

  // Links do resumo de erros levam o foco ao campo
  resumo.addEventListener('click', evento => {
    const link = evento.target.closest('[data-foco]');
    if (!link) return;
    evento.preventDefault();
    document.getElementById(link.dataset.foco).focus();
  });

  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    const erros = campos
      .map(campo => {
        const mensagem = validarCampo(campo);
        exibirResultado(campo, mensagem);
        return mensagem ? { id: campo.id, rotulo: rotuloDe(campo), mensagem } : null;
      })
      .filter(Boolean);

    if (erros.length) {
      resumo.innerHTML = resumoErros(erros);
      resumo.focus();
      return;
    }
    resumo.innerHTML = '';

    const botao = formulario.querySelector('button[type="submit"]');
    const textoOriginal = botao.textContent;
    botao.disabled = true;
    botao.textContent = 'Enviando...';

    const dados = new FormData(formulario);
    const cadastro = {
      nome: dados.get('nome').trim(),
      cpf: ocultarCpf(dados.get('cpf')),
      email: dados.get('email'),
      cidade: dados.get('cidade').trim(),
      estado: dados.get('estado'),
      areas: dados.getAll('areas').map(a => formulario.querySelector(`input[value="${a}"] + label`).textContent)
    };

    // Simula o tempo de resposta de um servidor
    setTimeout(() => {
      botao.disabled = false;
      botao.textContent = textoOriginal;
      if (!armazenamento.salvarCadastro(cadastro)) {
        mostrarToast('Não foi possível salvar neste navegador. Tente novamente.', 'erro');
        return;
      }
      armazenamento.limparRascunho();
      formulario.reset();
      campos.forEach(c => c.removeAttribute('aria-invalid'));
      renderizarLista(raiz);
      mostrarToast(`Cadastro de ${cadastro.nome.split(' ')[0]} salvo! Entraremos em contato em até 5 dias úteis.`, 'sucesso');
    }, 800);
  });

  // Remover cadastro salvo
  raiz.querySelector('.lista-cadastros').addEventListener('click', evento => {
    const botao = evento.target.closest('[data-remover]');
    if (!botao) return;
    armazenamento.removerCadastro(botao.dataset.remover);
    renderizarLista(raiz);
    mostrarToast('Cadastro removido deste navegador.', 'info');
  });
}
