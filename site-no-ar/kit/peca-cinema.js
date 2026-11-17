// Peça cinema · entrada em sequência, rolagem (parallax, luz que escurece, palavra que desliza), botões magnéticos e topo claro em cima da abertura.
// Inicia sozinha quando acha .p-cinema na página. Sem dependências. Carregue depois do mestre.js.
(() => {
  const d = document, sec = d.querySelector('.p-cinema'); if (!sec) return;
  const raiz = d.documentElement;
  const parado = () => raiz.classList.contains('sem-animacao') || matchMedia('(prefers-reduced-motion:reduce)').matches;

  // o topo do site passa a ficar em cima da abertura escura (só quando ele vem logo antes dela)
  const topo = d.querySelector('.m-topo');
  const encaixar = () => {
    if (!topo) return;
    if (!sec.classList.contains('p-cinema-sob-topo') && sec.style.getPropertyValue('--p-cinema-topo') === '0px') return;
    const alto = topo.offsetHeight;
    sec.style.setProperty('--p-cinema-topo', alto + 'px');
    if (!sec.classList.contains('p-cinema-sob-topo')) {
      const fimTopo = topo.getBoundingClientRect().bottom, inicio = sec.getBoundingClientRect().top;
      if (Math.abs(fimTopo - inicio) < 6) { sec.classList.add('p-cinema-sob-topo'); d.body.classList.add('p-cinema-ativa'); } else sec.style.setProperty('--p-cinema-topo', '0px');
    }
  };
  encaixar(); addEventListener('resize', encaixar);

  // a proporção real da foto recortada define o tamanho da pessoa
  const img = sec.querySelector('.p-cinema-foto');
  const proporcao = () => {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    const ar = img.naturalWidth / img.naturalHeight;
    sec.style.setProperty('--p-cinema-ar', ar.toFixed(4));
    sec.classList.toggle('p-cinema-estreita', ar < .75);
  };
  if (img) { if (img.complete) proporcao(); img.addEventListener('load', proporcao); }

  // a palavra gigante cabe exatamente na largura da coluna, seja qual for a palavra (letras largas ou estreitas)
  const gig = sec.querySelector('.p-cinema-gigante span');
  const caber = () => {
    if (!gig) return;
    const fs = parseFloat(getComputedStyle(gig).fontSize), w = gig.offsetWidth;
    if (!fs || !w) return;
    const cx = getComputedStyle(sec.querySelector('.p-cinema-gigante'));
    const livre = sec.clientWidth - parseFloat(cx.paddingLeft) - parseFloat(cx.paddingRight);
    const atual = parseFloat(sec.style.getPropertyValue('--p-cinema-gig-fit')) || 0;
    // teto pela altura da tela (no celular a palavra pode ser menor), com piso para palavras muito longas
    const cel = innerWidth <= 820;
    const teto = cel ? 150 : Math.min(330, innerHeight * .27);
    const novo = Math.max(cel ? 54 : 90, Math.min(teto, Math.floor(livre / (w / fs))));
    if (Math.abs(novo - atual) > 1) sec.style.setProperty('--p-cinema-gig-fit', novo + 'px');
  };
  caber(); if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => { caber(); encaixar(); });
  // no modo foto (html.sem-animacao) a tela é esticada para fotografar a página inteira: a palavra fica como estava
  addEventListener('resize', () => { if (!raiz.classList.contains('sem-animacao')) caber(); });

  // entrada: a luz acende, a palavra sobe, a pessoa surge, o título entra palavra por palavra, as fichas por último
  const ligar = () => sec.classList.add('p-cinema-ligou', 'visivel');
  if (parado()) ligar();
  else {
    sec.classList.add('p-cinema-arma');
    let foi = false;
    const vai = () => { if (foi) return; foi = true; requestAnimationFrame(() => requestAnimationFrame(ligar)); };
    if (!img || (img.complete && img.naturalWidth)) vai();
    else { img.addEventListener('load', vai, { once: true }); img.addEventListener('error', vai, { once: true }); setTimeout(vai, 1500); }
  }

  // rolagem: a pessoa sobe mais devagar que o texto, a luz escurece, a palavra desliza
  let pedido = 0;
  const rolar = () => {
    pedido = 0;
    if (parado()) { sec.style.setProperty('--p-cinema-k', '0'); return; }
    const r = sec.getBoundingClientRect();
    if (r.bottom < -50) { sec.style.setProperty('--p-cinema-k', '1'); return; }
    const k = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)));
    sec.style.setProperty('--p-cinema-k', k.toFixed(4));
  };
  addEventListener('scroll', () => { if (!pedido) pedido = requestAnimationFrame(rolar); }, { passive: true });
  addEventListener('resize', rolar); rolar();

  // botões magnéticos: seguem o ponteiro até 6 px
  if (!parado() && matchMedia('(pointer:fine)').matches) {
    sec.querySelectorAll('.p-cinema-acoes .m-botao').forEach(b => {
      b.addEventListener('pointermove', ev => {
        if (parado()) return;
        const r = b.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (ev.clientX - r.left - r.width / 2) / (r.width / 2)));
        const y = Math.max(-1, Math.min(1, (ev.clientY - r.top - r.height / 2) / (r.height / 2)));
        b.style.translate = `${(x * 6).toFixed(1)}px ${(y * 4).toFixed(1)}px`;
      });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
  }
})();
