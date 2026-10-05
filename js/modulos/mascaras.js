// Máscaras de entrada para CPF, telefone e CEP
const formatos = {
  cpf: v => v.slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  telefone: v => v.slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2'),
  cep: v => v.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2')
};

export function aplicarMascara(campo) {
  const formato = formatos[campo.id];
  if (formato) campo.value = formato(campo.value.replace(/\D/g, ''));
}

export function ativarMascaras(formulario) {
  Object.keys(formatos).forEach(id => {
    const campo = formulario.querySelector(`#${id}`);
    campo?.addEventListener('input', () => aplicarMascara(campo));
  });
}

// Oculta parte do CPF antes de salvar (proteção de dados pessoais)
export const ocultarCpf = cpf => cpf.replace(/^\d{3}\.(\d{3})\.(\d{3})-\d{2}$/, '***.$1.$2-**');
