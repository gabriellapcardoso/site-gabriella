/* Peça "livros": balanço lento dos livros e do ingresso, giro na direção do mouse, botões magnéticos e carrossel no celular. Sem biblioteca. */
(() => {
  const d = document, html = d.documentElement;
  const iniciar = () => {
    const secoes = [...d.querySelectorAll('.p-livros')];
    if (!secoes.length) return;
    d.body.classList.add('p-livros-ativa');
    const calmo = matchMedia('(prefers-reduced-motion: reduce)');
    const parado = () => html.classList.contains('sem-animacao') || calmo.matches;
    const fino = matchMedia('(pointer: fine)').matches, celular = matchMedia('(max-width: 760px)');
    const objs = [];
    let raf = 0, t0 = performance.now();

    secoes.forEach(sec => {
      // proporção real de cada capa (entre 0,64 e 0,92) e a do ingresso acompanha o livro mais alto
      const medir = () => {
        let menor = 9;
        sec.querySelectorAll('.p-livros-livro').forEach(l => {
          let p = parseFloat(l.dataset.prop);
          const im = l.querySelector('.p-livros-capa');
          if (!p && im && im.naturalWidth) p = im.naturalWidth / im.naturalHeight;
          if (!p) return;
          p = Math.max(.64, Math.min(.92, p));
          l.style.setProperty('--prop', p.toFixed(3)); menor = Math.min(menor, p);
        });
        if (menor < 9) sec.style.setProperty('--prop-min', menor.toFixed(3));
      };
      sec.querySelectorAll('.p-livros-capa').forEach(im => { if (!im.complete) im.addEventListener('load', medir, { once: true }); });
      medir();

      sec.querySelectorAll('.p-livros-item').forEach((li, i) => {
        const el = li.querySelector('.p-livros-livro, .p-livros-ingresso'); if (!el) return;
        const livro = el.classList.contains('p-livros-livro');
        const o = { sec, li, el, sombra: li.querySelector('.p-livros-sombra'), livro,
          P: parseFloat(li.dataset.tempo) || 7, fase: parseFloat(li.dataset.fase) || i * 2,
          giro: parseFloat(li.dataset.giro), amp: livro ? 15 : 13, k: 0, alvo: 0, hx: 0, hy: 0 };
        objs.push(o);
        if (fino) {
          const obj = li.querySelector('.p-livros-objeto');
          obj.addEventListener('pointermove', ev => {
            if (parado()) return;
            const r = obj.getBoundingClientRect();
            o.hx = Math.max(-1, Math.min(1, ((ev.clientX - r.left) / r.width - .5) * 2));
            o.hy = Math.max(-1, Math.min(1, ((ev.clientY - r.top) / r.height - .55) * 2));
            o.alvo = 1; acordar();
          });
          obj.addEventListener('pointerleave', () => { o.alvo = 0; o.hx = o.hy = 0; });
        }
      });

      // botões magnéticos
      if (fino) sec.querySelectorAll('.p-livros-botao').forEach(b => {
        b.addEventListener('pointermove', ev => { if (parado()) return; const r = b.getBoundingClientRect();
          b.style.setProperty('--mx', ((ev.clientX - r.left - r.width / 2) * .22).toFixed(1) + 'px');
          b.style.setProperty('--my', ((ev.clientY - r.top - r.height / 2) * .3).toFixed(1) + 'px'); });
        b.addEventListener('pointerleave', () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
      });

      // carrossel do celular: contador e barra
      const lista = sec.querySelector('.p-livros-lista'), passos = sec.querySelector('.p-livros-passos');
      if (lista && passos) {
        const num = passos.querySelector('b'), total = lista.children.length;
        let pedido = 0;
        const atualizar = () => { pedido = 0; const it = lista.children[0]; if (!it) return;
          const passo = it.getBoundingClientRect().width + (parseFloat(getComputedStyle(lista).columnGap) || 0);
          const fim = lista.scrollWidth - lista.clientWidth;
          let pos = passo ? lista.scrollLeft / passo : 0;
          if (fim > 0 && lista.scrollLeft >= fim - 2) pos = total - 1;
          pos = Math.max(0, Math.min(total - 1, pos));
          passos.style.setProperty('--pos', pos.toFixed(3));
          const agora = Math.round(pos);
          [...lista.children].forEach((li, j) => li.classList.toggle('p-livros-agora', j === agora));
          num.textContent = String(agora + 1).padStart(2, '0'); };
        lista.classList.add('p-livros-guia');
        lista.addEventListener('scroll', () => { if (!pedido) pedido = requestAnimationFrame(atualizar); }, { passive: true });
        addEventListener('resize', atualizar);
        atualizar();
      }

      // entrada e laço só com a seção perto da tela
      const ver = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0) sec.classList.add('p-livros-viu');
      }), { threshold: [0, .12], rootMargin: '0px 0px -8% 0px' });
      ver.observe(sec);
      const vivo = new IntersectionObserver(es => es.forEach(e => { sec.pLivrosVivo = e.isIntersecting; if (e.isIntersecting) acordar(); }), { rootMargin: '200px 0px' });
      vivo.observe(sec);
      if (parado()) sec.classList.add('p-livros-viu');
    });

    const limpar = () => objs.forEach(o => { o.el.style.transform = ''; o.el.style.removeProperty('--bp'); o.el.style.removeProperty('--sombra-capa');
      if (o.sombra) { o.sombra.style.removeProperty('--sx'); o.sombra.style.removeProperty('--tx'); o.sombra.style.removeProperty('--so'); } });

    const TAU = Math.PI * 2, mix = (a, b, k) => a + (b - a) * k;
    const quadro = agora => {
      raf = 0;
      if (parado()) { limpar(); return; }
      const t = (agora - t0) / 1000;
      let algum = false;
      objs.forEach(o => {
        if (!o.sec.pLivrosVivo) return; algum = true;
        o.k += (o.alvo - o.k) * .085;
        const s = Math.sin(TAU * t / o.P + o.fase);
        const base = celular.matches || isNaN(o.giro) ? -16 : o.giro;
        let ry = base + o.amp * s;
        let rx = -7 + 2.4 * Math.sin(TAU * t / (o.P * 1.37) + o.fase);
        let rz = 1.2 * Math.sin(TAU * t / (o.P * .83) + o.fase + 1);
        let y = -7 * (.5 + .5 * Math.sin(TAU * t / (o.P * .71) + o.fase));
        ry = mix(ry, o.hx * 32 - 4, o.k); rx = mix(rx, -o.hy * 20 - 5, o.k); rz = mix(rz, 0, o.k); y = mix(y, -18, o.k);
        o.el.style.transform = `translate3d(0,${y.toFixed(2)}px,0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
        o.el.style.setProperty('--bp', (58 + ry * 2.1).toFixed(1) + '%');
        o.el.style.setProperty('--sombra-capa', Math.max(.15, Math.min(1, .45 + ry / 34)).toFixed(3));
        if (o.sombra) {
          o.sombra.style.setProperty('--sx', (1 - Math.abs(ry) / 140 + y / 70).toFixed(3));
          o.sombra.style.setProperty('--tx', (-ry * .45).toFixed(1) + 'px');
          o.sombra.style.setProperty('--so', (1 + y / 40).toFixed(3));
        }
      });
      if (algum) raf = requestAnimationFrame(quadro);
    };
    function acordar() { if (!raf && !parado()) raf = requestAnimationFrame(quadro); }

    // o finalizador pode pôr html.sem-animacao depois: congela no estado final
    new MutationObserver(() => {
      if (parado()) { if (raf) cancelAnimationFrame(raf); raf = 0; limpar(); secoes.forEach(s => s.classList.add('p-livros-viu')); }
      else acordar();
    }).observe(html, { attributes: true, attributeFilter: ['class'] });
    if (calmo.addEventListener) calmo.addEventListener('change', () => { if (parado()) limpar(); else acordar(); });
    acordar();
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
