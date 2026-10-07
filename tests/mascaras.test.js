import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aplicarMascara, ocultarCpf } from '../js/modulos/mascaras.js';

const campo = (id, value) => ({ id, value });

test('formata CPF, telefone e CEP enquanto o usuário digita', () => {
  const cpf = campo('cpf', '52998224725'); aplicarMascara(cpf);
  const celular = campo('telefone', '12999998888'); aplicarMascara(celular);
  const fixo = campo('telefone', '1233334444'); aplicarMascara(fixo);
  const cep = campo('cep', '12345678'); aplicarMascara(cep);
  assert.equal(cpf.value, '529.982.247-25');
  assert.equal(celular.value, '(12) 99999-8888');
  assert.equal(fixo.value, '(12) 3333-4444');
  assert.equal(cep.value, '12345-678');
});

test('ignora letras e limita a quantidade de dígitos', () => {
  const cpf = campo('cpf', 'abc529.982.247-25999'); aplicarMascara(cpf);
  assert.equal(cpf.value, '529.982.247-25');
});

test('oculta o início e o fim do CPF antes de salvar', () => {
  assert.equal(ocultarCpf('529.982.247-25'), '***.982.247-**');
});
