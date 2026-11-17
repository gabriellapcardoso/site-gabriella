// Peça jornada · cena fixa na rolagem. Liga sozinha quando acha .p-jornada na página. Sem dependências.
(() => {
  const d = document, raiz = d.documentElement;
  const secoes = [...d.querySelectorAll('.p-jornada')];
  if (!secoes.length) return;
  const parado = () => raiz.classList.contains('sem-animacao') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const limita = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const atualizar = [];

  // entradas suaves: cada [data-pj-surge] ganha .pj-visivel quando aparece
  const entra = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pj-visivel'); entra.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -6% 0px' });

  secoes.forEach(s => {
    const trilho = s.querySelector('.p-jornada-trilho'), palco = s.querySelector('.p-jornada-palco'), lista = s.querySelector('.p-jornada-lista');
    const itens = [...s.querySelectorAll('.p-jornada-lista li')], fotos = [...s.querySelectorAll('.p-jornada-foto')];
    const cartoes = [...s.querySelectorAll('.p-jornada-cartao')], regua = [...s.querySelectorAll('.p-jornada-regua button')];
    const quadro = s.querySelector('.p-jornada-quadro'), blocos = s.querySelector('.p-jornada-blocos'), cadaBloco = [...s.querySelectorAll('.p-jornada-bloco')];
    const n = itens.length;
    if (!trilho || !palco || !n) return;
    let atual = -1, viu = false;
    const emCena = () => !parado() && getComputedStyle(palco).position === 'sticky';

    s.classList.add('pj-pronta');
    s.querySelectorAll('[data-pj-surge]').forEach(el => entra.observe(el));

    // a linha e o ponto da lista vão até o meio do nome da etapa ativa
    const mede = () => {
      if (!lista || !lista.offsetParent) return;
      const topo = lista.getBoundingClientRect().top;
      const meio = li => { const r = (li.querySelector('.p-jornada-nome') || li).getBoundingClientRect(); return (r.top + r.height / 2 - topo).toFixed(1) + 'px'; };
      lista.style.setProperty('--pj-a', meio(itens[0]));
      lista.style.setProperty('--pj-b', meio(itens[n - 1]));
      lista.style.setProperty('--pj-y', meio(itens[Math.max(0, atual)]));
    };

    const ativar = i => {
      if (i === atual) return;
      const antes = atual; atual = i;
      itens.forEach((li, k) => { li.classList.toggle('ativa', k === i); li.classList.toggle('passou', k < i);
        const b = li.querySelector('button'); if (b) { if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); } });
      regua.forEach((b, k) => { b.classList.toggle('ativa', k === i); b.classList.toggle('passou', k < i); });
      cartoes.forEach((c, k) => { c.classList.toggle('ativa', k === i); if (k === i) c.removeAttribute('aria-hidden'); else c.setAttribute('aria-hidden', 'true'); });
      if (quadro) {
        quadro.classList.toggle('volta', antes > i);
        void quadro.offsetWidth;            // a máscara parte do lado certo (sobe ao avançar, desce ao voltar)
        fotos.forEach((f, k) => { f.classList.toggle('saindo', k === antes); f.classList.toggle('ativa', k === i); });
      }
      s.style.setProperty('--pj-k', n > 1 ? (i / (n - 1)).toFixed(4) : '0');
      mede();
    };

    const rolar = () => {
      if (emCena()) {
        const r = trilho.getBoundingClientRect(), total = Math.max(1, r.height - innerHeight);
        const v = limita(-r.top / total) * n, i = Math.min(n - 1, Math.floor(v));
        s.style.setProperty('--pj-sub', limita(v - i).toFixed(3));
        if (!viu && r.top < innerHeight * .55 && r.bottom > 0) { viu = true; palco.querySelectorAll('[data-pj-surge]').forEach(el => el.classList.add('pj-visivel')); }   // a cena chegou: tudo entra e a primeira foto sobe
        if (viu) ativar(i);
      } else if (blocos && blocos.offsetParent) {
        const r = blocos.getBoundingClientRect(), linha = innerHeight * .7;
        const deitado = getComputedStyle(blocos).gridTemplateColumns.trim().split(/\s+/).length > 1;
        const k = deitado ? (r.top < linha ? 1 : 0) : limita((linha - r.top) / Math.max(1, r.height));
        blocos.style.setProperty('--pj-feito', k.toFixed(4));
        cadaBloco.forEach(b => { const m = b.querySelector('.p-jornada-marca'); b.classList.toggle('passou', !!m && (deitado ? k > 0 : m.getBoundingClientRect().top < linha)); });
      }
    };
    atualizar.push({ rolar, mede });

    // clicar numa etapa (na lista ou na régua) rola até ela
    const ir = i => {
      if (!emCena()) return;
      const r = trilho.getBoundingClientRect(), total = r.height - innerHeight;
      scrollTo({ top: Math.round(scrollY + r.top + total * (i + .5) / n), behavior: parado() ? 'auto' : 'smooth' });
    };
    itens.forEach((li, k) => li.querySelector('button')?.addEventListener('click', () => ir(k)));
    regua.forEach((b, k) => b.addEventListener('click', () => ir(k)));

    // botão magnético
    if (matchMedia('(pointer: fine)').matches) s.querySelectorAll('.p-jornada-acoes .m-botao').forEach(b => {
      b.addEventListener('pointermove', ev => { if (parado()) return; const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(((ev.clientX - r.left) / r.width) - .5) * 16}px, ${(((ev.clientY - r.top) / r.height) - .5) * 12}px)`; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  });

  let pedido = 0;
  const tudo = () => { pedido = 0; atualizar.forEach(a => a.rolar()); };
  addEventListener('scroll', () => { if (!pedido) pedido = requestAnimationFrame(tudo); }, { passive: true });
  addEventListener('resize', () => { atualizar.forEach(a => { a.mede(); a.rolar(); }); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => atualizar.forEach(a => a.mede())).catch(() => {});
  addEventListener('load', () => atualizar.forEach(a => { a.mede(); a.rolar(); }));
  tudo();
})();
