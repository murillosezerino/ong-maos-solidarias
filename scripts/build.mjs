// Build de produção: une e minifica CSS e JavaScript e copia HTML e imagens para dist/
import { build } from 'esbuild';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const ESTILOS = ['variaveis', 'base', 'layout', 'componentes'];

// Remove comentários e espaços extras entre tags (as views não têm <pre> nem <textarea>)
const minificarHtml = html => html
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/>\s+</g, '><')
  .replace(/\s{2,}/g, ' ')
  .trim();

async function tamanho(pasta) {
  let total = 0;
  for (const item of await readdir(pasta, { withFileTypes: true })) {
    const caminho = join(pasta, item.name);
    total += item.isDirectory() ? await tamanho(caminho) : (await stat(caminho)).size;
  }
  return total;
}

await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, 'html'), { recursive: true });

// 1) JavaScript: os módulos ES viram um único arquivo minificado
await build({
  entryPoints: ['js/app.js'],
  bundle: true,
  format: 'esm',
  minify: true,
  target: 'es2020',
  outfile: join(DIST, 'js/app.min.js')
});

// 2) CSS: os quatro arquivos, na ordem da cascata, viram um só
await build({
  stdin: {
    contents: ESTILOS.map(nome => `@import "./${nome}.css";`).join('\n'),
    resolveDir: 'css',
    loader: 'css'
  },
  bundle: true,
  minify: true,
  outfile: join(DIST, 'css/estilos.min.css')
});

// 3) index.html aponta para os arquivos minificados
let indice = await readFile('index.html', 'utf8');
indice = indice
  .replace(/(<link rel="stylesheet" href="css\/[a-z]+\.css">\n?)+/, '<link rel="stylesheet" href="css/estilos.min.css">\n')
  .replace('js/app.js', 'js/app.min.js')
  .replace('</title>', '</title>\n<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>');
await writeFile(join(DIST, 'index.html'), minificarHtml(indice));

// 4) Views e imagens
for (const view of await readdir('html')) {
  await writeFile(join(DIST, 'html', view), minificarHtml(await readFile(join('html', view), 'utf8')));
}
await cp('imagens', join(DIST, 'imagens'), { recursive: true });

const kb = bytes => `${(bytes / 1024).toFixed(1)} KB`;
const origem = (await tamanho('css')) + (await tamanho('js')) + (await tamanho('html')) + (await stat('index.html')).size;
const final = (await tamanho(join(DIST, 'css'))) + (await tamanho(join(DIST, 'js'))) + (await tamanho(join(DIST, 'html'))) + (await stat(join(DIST, 'index.html'))).size;
console.log(`Código (HTML, CSS e JS): ${kb(origem)} -> ${kb(final)} (${Math.round((1 - final / origem) * 100)}% menor)`);
console.log(`Build concluído em ${DIST}/`);
