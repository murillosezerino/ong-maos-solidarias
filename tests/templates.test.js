import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapar, badge, cartaoProjeto, resumoErros } from '../js/templates/componentes.js';

test('escapa caracteres especiais para evitar injeção de HTML', () => {
  assert.equal(escapar('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  assert.equal(escapar("D'Ávila & Cia"), 'D&#39;Ávila &amp; Cia');
});

test('gera badge com o modificador do tipo', () => {
  assert.equal(badge({ texto: 'Urgente', tipo: 'erro' }), '<li class="badge badge--erro">Urgente</li>');
  assert.match(badge({ texto: 'Sem tipo' }), /badge--neutro/);
});

test('gera cartão de projeto com imagens WebP e JPG e texto alternativo', () => {
  const html = cartaoProjeto({
    titulo: 'Horta <b>comunitária</b>',
    descricao: 'Plantio coletivo.',
    imagem: 'horta',
    alt: 'Pessoas plantando mudas',
    etiquetas: [{ texto: 'Novo', tipo: 'info' }]
  });
  assert.match(html, /imagens\/horta\.webp/);
  assert.match(html, /imagens\/horta\.jpg/);
  assert.match(html, /alt="Pessoas plantando mudas"/);
  assert.match(html, /srcset="imagens\/horta-400\.webp 400w, imagens\/horta\.webp 600w"/);
  assert.match(html, /sizes="[^"]*90vw"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /Horta &lt;b&gt;comunitária&lt;\/b&gt;/);
});

test('resumo de erros usa singular e plural e cria links para os campos', () => {
  assert.match(resumoErros([{ id: 'cpf', rotulo: 'CPF', mensagem: 'Inválido' }]), /Corrija 1 campo para/);
  const html = resumoErros([
    { id: 'cpf', rotulo: 'CPF', mensagem: 'Inválido' },
    { id: 'cep', rotulo: 'CEP', mensagem: 'Obrigatório' }
  ]);
  assert.match(html, /Corrija 2 campos/);
  assert.match(html, /href="#cep"/);
  assert.match(html, /role="alert"/);
});
