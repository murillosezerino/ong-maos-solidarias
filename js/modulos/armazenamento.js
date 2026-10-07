// Camada de acesso ao localStorage: o resto do código não usa localStorage diretamente.
const PREFIXO = 'maos-solidarias:';

function ler(chave, padrao) {
  try {
    const valor = localStorage.getItem(PREFIXO + chave);
    return valor === null ? padrao : JSON.parse(valor);
  } catch {
    return padrao; // armazenamento bloqueado ou dado corrompido
  }
}

function gravar(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
    return true;
  } catch {
    return false; // cota cheia ou navegação privada
  }
}

function apagar(chave) {
  try { localStorage.removeItem(PREFIXO + chave); } catch { /* ignora */ }
}

// ----- Voluntários cadastrados -----
export const listarCadastros = () => ler('cadastros', []);

export function salvarCadastro(cadastro) {
  const lista = listarCadastros();
  lista.push({ ...cadastro, id: crypto.randomUUID(), criadoEm: new Date().toISOString() });
  return gravar('cadastros', lista);
}

export function removerCadastro(id) {
  gravar('cadastros', listarCadastros().filter(c => c.id !== id));
}

// ----- Rascunho do formulário -----
export const lerRascunho = () => ler('rascunho', null);
export const salvarRascunho = dados => gravar('rascunho', dados);
export const limparRascunho = () => apagar('rascunho');

// ----- Preferências de aparência (tema e contraste) -----
// Lidas também pelo script do <head>, antes do CSS, para evitar troca de cores ao carregar
export const lerAparencia = () => ler('aparencia', {});
export const salvarAparencia = preferencias => gravar('aparencia', preferencias);
