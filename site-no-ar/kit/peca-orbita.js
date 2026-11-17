// Peça "orbita" · entrada, giro lento, destaque em sequência e interação (mouse, teclado, toque). Sem dependências.
(() => {
  const d = document, raiz = d.documentElement;
  const foto = () => raiz.classList.contains('sem-animacao');
  const calmo = () => foto() || matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fino = matchMedia('(pointer:fine)');

  const iniciar = sec => {
    if (sec.dataset.pOrbita) return; sec.dataset.pOrbita = '1';
    const arte = sec.querySelector('.p-orbita-arte'), painel = sec.querySelector('.p-orbita-painel');
    const pilares = [...sec.querySelectorAll('.p-orbita-pilar')], n = pilares.length;
    if (!arte || !n) return;
    const grupos = [pilares, [...sec.querySelectorAll('.p-orbita-vez')], [...sec.querySelectorAll('.p-orbita-lista li')], [...sec.querySelectorAll('.p-orbita-linha')]];
    const trilho = [...sec.querySelectorAll('.p-orbita-trilho i')];
    const TEMPO = 4200; sec.style.setProperty('--o-tempo', TEMPO + 'ms');
    let atual = 0, relogio = 0, emTela = false, viu = false, solta = 0;

    const ativar = k => {
      atual = (k + n) % n;
      grupos.forEach(g => g.forEach((el, i) => el.classList.toggle('ativo', i === atual)));
      pilares.forEach((p, i) => p.setAttribute('aria-pressed', i === atual ? 'true' : 'false'));
      trilho.forEach((t, i) => { t.classList.toggle('feito', i < atual); t.classList.remove('ativo'); });
      if (trilho[atual]) { void trilho[atual].offsetWidth; trilho[atual].classList.add('ativo'); }
    };
    const ciclo = () => {
      clearTimeout(relogio);
      if (foto()) { ativar(0); return; }
      relogio = setTimeout(() => { if (emTela && !d.hidden && !sec.classList.contains('p-orbita-segura')) ativar(atual + 1); ciclo(); }, TEMPO);
    };
    const segurar = () => { clearTimeout(solta); clearTimeout(relogio); sec.classList.add('p-orbita-segura'); };
    const soltar = (espera = 2000) => {
      clearTimeout(solta);
      solta = setTimeout(() => { sec.classList.remove('p-orbita-segura'); if (viu) { ativar(atual + 1); ciclo(); } }, espera);
    };

    // nome dentro da esfera: o maior tamanho que cabe sem encostar na borda; se ficar pequeno demais, a esfera mostra o número
    const ajustar = () => {
      const esf = sec.querySelector('.p-orbita-esfera'), w = esf && esf.clientWidth; if (!w) return;
      const nomes = [...sec.querySelectorAll('.p-orbita-nome')];
      arte.classList.remove('p-orbita-numeros');
      let menor = 99;
      nomes.forEach(nm => {
        let f = Math.min(17, Math.max(9, w * .125)); nm.style.fontSize = f + 'px';
        for (let g = 0; g < 40 && f > 8 && (nm.scrollWidth > nm.clientWidth + .5 || nm.offsetHeight > w * .56); g++) { f -= .5; nm.style.fontSize = f + 'px'; }
        menor = Math.min(menor, f);
      });
      nomes.forEach(nm => { nm.style.fontSize = menor + 'px'; });
      arte.classList.toggle('p-orbita-numeros', menor < 10.5);
      const c = sec.querySelector('.p-orbita-centro'), cs = c && c.querySelector('span');
      if (cs && c.clientWidth) {
        let f = Math.min(26, Math.max(11, c.clientWidth * .13)); cs.style.fontSize = f + 'px';
        for (let g = 0; g < 40 && f > 10 && (cs.scrollWidth > cs.clientWidth + .5 || cs.offsetHeight > c.clientWidth * .6); g++) { f -= .5; cs.style.fontSize = f + 'px'; }
      }
    };
    ajustar();
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(ajustar).catch(() => {});
    if ('ResizeObserver' in window) new ResizeObserver(ajustar).observe(arte); else addEventListener('resize', ajustar);

    // interação: mouse em cima, teclado ou toque destacam o pilar e mostram o texto dele
    pilares.forEach((p, k) => {
      p.addEventListener('pointerenter', ev => { if (ev.pointerType === 'mouse') { ativar(k); segurar(); } });
      p.addEventListener('focus', () => { ativar(k); segurar(); });
      p.addEventListener('blur', () => soltar(2400));
      p.addEventListener('click', ev => { ativar(k); segurar(); if (ev.pointerType !== 'mouse') soltar(8000); });
    });
    arte.addEventListener('pointerleave', ev => { if (ev.pointerType === 'mouse') soltar(1800); });
    if (painel) { painel.addEventListener('pointerenter', ev => { if (ev.pointerType === 'mouse') segurar(); }); painel.addEventListener('pointerleave', ev => { if (ev.pointerType === 'mouse') soltar(1800); }); }
    grupos[2].forEach((li, k) => li.addEventListener('click', () => { ativar(k); segurar(); soltar(8000); }));

    // botão magnético
    const bt = sec.querySelector('.p-orbita-acao .m-botao');
    if (bt && fino.matches && !calmo()) {
      bt.addEventListener('pointermove', ev => { const r = bt.getBoundingClientRect(); bt.style.translate = `${((ev.clientX - r.left) / r.width - .5) * 14}px ${((ev.clientY - r.top) / r.height - .5) * 10}px`; });
      bt.addEventListener('pointerleave', () => { bt.style.translate = ''; });
    }

    // entrada: anéis e linhas se desenham, esferas surgem, o giro só começa depois
    const entrar = () => {
      if (viu) return; viu = true; sec.classList.add('p-orbita-ver');
      if (calmo()) { ativar(0); if (!foto()) ciclo(); return; }
      ativar(0);
      setTimeout(() => { if (!foto()) sec.classList.add('p-orbita-gira'); }, 2100);
      clearTimeout(relogio); relogio = setTimeout(() => { ativar(1); ciclo(); }, TEMPO + 1400);
    };
    if (foto()) { sec.classList.add('p-orbita-ver'); ativar(0); viu = true; }
    const obs = new IntersectionObserver(es => es.forEach(e => {
      emTela = e.isIntersecting;
      if (e.isIntersecting && e.intersectionRatio >= .2) entrar();
    }), { threshold: [0, .2, .4] });
    obs.observe(sec);

    // se o finalizador ligar o modo foto depois, tudo para no estado final
    new MutationObserver(() => { if (foto()) { clearTimeout(relogio); clearTimeout(solta); sec.classList.remove('p-orbita-gira', 'p-orbita-segura'); sec.classList.add('p-orbita-ver'); ativar(0); } })
      .observe(raiz, { attributes: true, attributeFilter: ['class'] });
  };

  const tudo = () => d.querySelectorAll('.p-orbita').forEach(iniciar);
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', tudo); else tudo();
})();
