// Regras de validação com mensagens claras para cada campo do cadastro.

// Verifica os dois dígitos verificadores do CPF
export function cpfValido(cpf) {
  const numeros = cpf.replace(/\D/g, '');
  if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) return false;
  const digito = tamanho => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(numeros[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(numeros[9]) && digito(10) === Number(numeros[10]);
}

export function idade(dataTexto) {
  const nascimento = new Date(dataTexto + 'T00:00:00');
  const hoje = new Date();
  let anos = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
  return aindaNaoFezAniversario ? anos - 1 : anos;
}

// Regras extras, além das validações nativas do HTML5
const regras = {
  nome: v => v.trim().split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : '',
  cpf: v => cpfValido(v) ? '' : 'CPF inválido. Confira os números digitados.',
  nascimento: v => idade(v) < 18 ? 'É preciso ter 18 anos ou mais para se cadastrar.' : '',
};

const mensagensNativas = {
  valueMissing: 'Campo obrigatório.',
  typeMismatch: 'Formato inválido.',
  patternMismatch: 'Formato inválido.',
  tooShort: 'Texto muito curto.',
  rangeOverflow: 'É preciso ter 18 anos ou mais para se cadastrar.'
};

// Retorna a mensagem de erro do campo, ou '' se estiver válido
export function validarCampo(campo) {
  campo.setCustomValidity('');
  const estado = campo.validity;
  for (const tipo in mensagensNativas) {
    if (estado[tipo]) return campo.id === 'termos' ? 'Aceite os termos para continuar.' : mensagensNativas[tipo];
  }
  const mensagem = regras[campo.id]?.(campo.value) ?? '';
  campo.setCustomValidity(mensagem);
  return mensagem;
}

// Mostra ou limpa o erro visualmente e para leitores de tela
export function exibirResultado(campo, mensagem) {
  const id = `erro-${campo.id}`;
  let aviso = document.getElementById(id);
  if (!aviso) {
    aviso = document.createElement('p');
    aviso.id = id;
    aviso.className = 'mensagem-erro';
    const termos = campo.closest('.termos');
    const dica = campo.nextElementSibling?.classList.contains('dica') ? campo.nextElementSibling : null;
    (termos ?? dica ?? campo).after(aviso);
  }
  aviso.textContent = mensagem;
  aviso.hidden = !mensagem;

  const descricoes = new Set((campo.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean));
  mensagem ? descricoes.add(id) : descricoes.delete(id);
  if (descricoes.size) campo.setAttribute('aria-describedby', [...descricoes].join(' '));
  else campo.removeAttribute('aria-describedby');

  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
}
