import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpfValido, idade } from '../js/modulos/validacao.js';

test('aceita CPF com dígitos verificadores corretos, com ou sem máscara', () => {
  assert.equal(cpfValido('529.982.247-25'), true);
  assert.equal(cpfValido('52998224725'), true);
});

test('recusa CPF com dígito verificador errado', () => {
  assert.equal(cpfValido('529.982.247-26'), false);
});

test('recusa CPF com todos os dígitos iguais ou tamanho incorreto', () => {
  assert.equal(cpfValido('111.111.111-11'), false);
  assert.equal(cpfValido('123.456.789'), false);
  assert.equal(cpfValido(''), false);
});

const dataHaAnos = (anos, diasExtras = 0) => {
  const data = new Date();
  data.setFullYear(data.getFullYear() - anos);
  data.setDate(data.getDate() + diasExtras);
  return data.toISOString().slice(0, 10);
};

test('calcula a idade considerando se já fez aniversário no ano', () => {
  assert.equal(idade(dataHaAnos(30)), 30);
  assert.equal(idade(dataHaAnos(18, 1)), 17); // faz 18 amanhã
  assert.equal(idade(dataHaAnos(18, -1)), 18); // fez 18 ontem
});
