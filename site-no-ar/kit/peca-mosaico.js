// Peça mosaico: abre cada cartão com a máscara, em cascata, quando ele chega na tela; a borda de luz segue o ponteiro. Sem dependências.
(() => {
  const d = document, html = d.documentElement;
  const secoes = [...d.querySelectorAll('.p-mosaico')];
  if (!secoes.length) return;
  d.body.classList.add('p-mosaico-ativa');
  const parado = () => html.classList.contains('sem-animacao') || matchMedia('(prefers-reduced-motion:reduce)').matches;
  const cartoes = secoes.flatMap(s => [...s.querySelectorAll('.p-mosaico-cartao')]);
  const indices = secoes.flatMap(s => [...s.querySelectorAll('.p-mosaico-indice')]);
  const abrirTudo = () => { cartoes.forEach(c => c.classList.add('aberto', 'solto')); indices.forEach(o => o.classList.add('aberto')); };

  if (parado()) abrirTudo();
  else {
    secoes.forEach(s => s.classList.add('vivo'));
    // quando a máscara termina, ela sai de cena (assim a sombra do cartão volta a aparecer)
    const soltar = c => { if (!c.classList.contains('solto')) c.classList.add('solto'); };
    cartoes.forEach(c => c.addEventListener('transitionend', ev => { if (ev.target === c && ev.propertyName === 'clip-path') soltar(c); }));
    // os que chegam juntos na tela abrem um depois do outro (medido pela caixa do cartão: a máscara fechada esconde o cartão do IntersectionObserver)
    let pedido = 0;
    const conferir = () => {
      pedido = 0;
      const alto = innerHeight; let k = 0;
      cartoes.forEach(c => {
        if (c.classList.contains('aberto')) return;
        const r = c.getBoundingClientRect();
        if (r.top < alto * .9 && r.bottom > alto * .06) {
          const atraso = k++ * 150;
          c.style.setProperty('--d', atraso + 'ms'); c.classList.add('aberto');
          setTimeout(() => soltar(c), atraso + 1500);   // garantia, caso o transitionend não chegue
        }
      });
      // o índice do topo: os traços se desenham um depois do outro quando ele chega na tela
      indices.forEach(o => {
        if (o.classList.contains('aberto')) return;
        if (o.getBoundingClientRect().top < alto * .9) { [...o.children].forEach((li, i) => li.style.setProperty('--d', i * 130 + 'ms')); o.classList.add('aberto'); }
      });
      if (cartoes.every(c => c.classList.contains('aberto')) && indices.every(o => o.classList.contains('aberto'))) { removeEventListener('scroll', pedir); removeEventListener('resize', pedir); }
    };
    const pedir = () => { if (!pedido) pedido = requestAnimationFrame(conferir); };
    addEventListener('scroll', pedir, { passive: true }); addEventListener('resize', pedir); pedir();
    // se o finalizador ligar o modo sem animação depois, tudo abre na hora
    new MutationObserver(() => { if (html.classList.contains('sem-animacao')) abrirTudo(); }).observe(html, { attributes: true, attributeFilter: ['class'] });
  }

  // índice e cartão acendem juntos (passar o mouse num acende o outro; o foco do teclado no cartão também acende o índice)
  secoes.forEach(s => {
    const cs = [...s.querySelectorAll('.p-mosaico-cartao')], ls = [...s.querySelectorAll('.p-mosaico-indice li')];
    if (!ls.length) return;
    const acender = (i, sim) => { cs[i] && cs[i].classList.toggle('acesa', sim); ls[i] && ls[i].classList.toggle('acesa', sim); };
    const mouse = matchMedia('(hover:hover)').matches;
    cs.forEach((c, i) => {
      if (mouse) { c.addEventListener('pointerenter', () => acender(i, true)); c.addEventListener('pointerleave', () => acender(i, false)); }
      c.addEventListener('focus', () => acender(i, true)); c.addEventListener('blur', () => acender(i, false));
    });
    if (mouse) ls.forEach((l, i) => { l.addEventListener('pointerenter', () => acender(i, true)); l.addEventListener('pointerleave', () => acender(i, false)); });
  });

  // borda de luz que acompanha o ponteiro
  if (matchMedia('(pointer:fine)').matches) cartoes.forEach(c => {
    c.addEventListener('pointermove', ev => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (ev.clientX - r.left).toFixed(0) + 'px'); c.style.setProperty('--my', (ev.clientY - r.top).toFixed(0) + 'px'); });
    c.addEventListener('pointerleave', () => { c.style.removeProperty('--mx'); c.style.removeProperty('--my'); });
  });
})();
