// Regression: ISSUE-001 — o menu do topo perdeu "Contato" quando a seção Palestras entrou
// (o montador só aceita 5 itens de menu; o 6º é ignorado sem aviso).
// Found by /qa on 2026-11-17
// Report: .gstack/qa-reports/run-20261117T033800Z/qa-report-gabriellapcardoso-com-br-2026-11-17.md
//
// Rodar:  node --test site-no-ar/menu.regression-1.test.mjs   (a partir da raiz do repositório)
// Lê o index.html montado; não precisa de rede nem de dependências.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pasta = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(pasta, 'index.html'), 'utf8');
const site = JSON.parse(readFileSync(join(pasta, 'site.json'), 'utf8'));

// links de âncora do menu do topo (<header> ... </header>)
const cabecalho = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
const menu = [...cabecalho.matchAll(/<a[^>]*href="#([\w-]+)"[^>]*>([^<]*)</g)].map(m => ({ id: m[1], texto: m[2].trim() })).filter(m => m.id);

test('o menu do topo leva ao Contato', () => {
  assert.ok(menu.some(m => m.id === 'contato'), `menu atual: ${menu.map(m => m.texto).join(', ')}`);
});

test('toda seção que pede "menu" no site.json aparece no menu (nenhuma é descartada)', () => {
  const pedidas = site.secoes.filter(s => s.menu).map(s => s.menu);
  const mostradas = menu.map(m => m.texto);
  const perdidas = pedidas.filter(p => !mostradas.includes(p));
  assert.deepEqual(perdidas, [], `pedem menu mas não aparecem: ${perdidas.join(', ')}`);
});

test('todo item do menu aponta para uma seção que existe', () => {
  const ids = new Set([...html.matchAll(/\sid="([\w-]+)"/g)].map(m => m[1]));
  const quebrados = menu.filter(m => !ids.has(m.id));
  assert.deepEqual(quebrados, []);
});
