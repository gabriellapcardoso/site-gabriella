// Kit Mestre dos Sites · movimento e acabamentos. Sem dependências.
(() => {
  const d = document, q = (s, r = d) => [...r.querySelectorAll(s)];
  const novo = (tag, cls, html) => { const e = d.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const parado = () => d.documentElement.classList.contains('sem-animacao') || matchMedia('(prefers-reduced-motion:reduce)').matches;

  // aviso de prévia: <body data-previa="Nome do negócio"> põe a faixa no alto e a linha no rodapé
  const previa = d.body.dataset.previa;
  if (previa != null && !d.querySelector('.m-faixa')) {
    d.body.prepend(novo('div', 'm-faixa', `${previa ? '<b></b> · ' : ''}Prévia de proposta · este ainda não é o site oficial`));
    if (previa) d.querySelector('.m-faixa b').textContent = previa;
    const fim = d.querySelector('.m-fim'); if (fim && !/prévia de proposta/i.test(fim.textContent)) fim.append(novo('span', '', 'Site de demonstração · prévia de proposta'));
  }

  // botão flutuante do WhatsApp: basta <a class="m-zap" href="..."></a>
  q('.m-zap').forEach(a => { if (!a.querySelector('svg')) a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'; if (!a.getAttribute('aria-label')) a.setAttribute('aria-label', 'Chamar no WhatsApp'); });

  // títulos que entram palavra por palavra (o destaque em itálico continua inteiro) e o traço desenhado sob o destaque do título principal
  const dividir = el => {
    let n = 0;
    const andar = no => [...no.childNodes].forEach(f => {
      if (f.nodeType === 3) {
        const partes = f.textContent.split(/(\s+)/), frag = d.createDocumentFragment();
        partes.forEach(p => { if (!p) return; if (/^\s+$/.test(p)) { frag.append(' '); return; } const fora = novo('span', 'm-palavra'), dentro = novo('span'); dentro.textContent = p; dentro.style.setProperty('--n', n++); fora.append(dentro); frag.append(fora); });
        f.replaceWith(frag);
      } else if (f.nodeType === 1 && !f.classList.contains('m-traco')) andar(f);
    });
    andar(el); el.classList.add('m-dividido');
  };
  q('.m-abertura h1, .m-cabeca h2, .m-sobre h2, .m-soma h2, .m-orbita-caixa h2, .m-medida h2, .m-contato h2, .m-chamada h2').forEach(el => { if (!el.closest('[data-fixo]')) dividir(el); });
  q('.m-abertura h1 em').forEach(em => { if (em.textContent.trim().split(/\s+/).length <= 3) em.insertAdjacentHTML('beforeend', '<svg class="m-traco" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M1 7 C 22 1, 44 9, 62 4 S 90 3, 99 6"/></svg>'); });

  // frase grande: as palavras acendem conforme a leitura
  q('.m-citacao blockquote').forEach(b => { b.innerHTML = b.textContent.trim().split(/\s+/).map(p => `<span>${p.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</span>`).join(' '); });

  // barra de leitura e sombra do topo
  const topo = d.querySelector('.m-topo'), barra = novo('div', 'm-progresso'); d.body.append(barra);
  const processos = q('.m-processo'), frases = q('.m-citacao blockquote');
  let pedido = 0;
  const aoRolar = () => {
    pedido = 0;
    const alto = innerHeight, total = d.documentElement.scrollHeight - alto;
    topo && topo.classList.toggle('rolou', scrollY > 12);
    barra.style.setProperty('--lido', total > 0 ? Math.min(1, scrollY / total).toFixed(4) : 0);
    // processo: a linha enche até o meio da tela e cada passo acende quando ela chega nele
    processos.forEach(p => { const r = p.getBoundingClientRect(), k = Math.max(0, Math.min(1, (alto * .62 - r.top - 28) / Math.max(1, r.height - 56)));
      p.style.setProperty('--feito', k.toFixed(3)); q('li', p).forEach(li => li.classList.toggle('passou', li.getBoundingClientRect().top - r.top <= k * (r.height - 56) + 2)); });
    frases.forEach(b => { const r = b.getBoundingClientRect(), k = Math.max(0, Math.min(1, (alto * .9 - r.top) / (alto * .3))), ps = b.children, ate = Math.round(k * ps.length);
      for (let i = 0; i < ps.length; i++) ps[i].classList.toggle('aceso', i < ate); });
  };
  addEventListener('scroll', () => { if (!pedido) pedido = requestAnimationFrame(aoRolar); }, { passive: true }); addEventListener('resize', aoRolar); aoRolar();

  // entrada ao rolar: os blocos do kit entram sozinhos, sem precisar marcar um por um (data-fixo desliga)
  q('.m-abertura .m-dentro > div:not(.m-palco) > *, .m-moldura, .m-palco, .m-vitrine, .m-cabeca > *, .m-cartao, .m-processo li, .m-sobre > .m-foto, .m-sobre > div:not(.m-palco) > *, .m-numeros li, .m-depoimentos blockquote, .m-duvidas details, .m-chamada, .m-galeria img, .m-precos li, .m-selos li, .m-contato > *, .m-video, .m-dupla > img, .m-soma > div > *, .m-soma-arte, .m-orbita-caixa > div > *, .m-orbita, .m-medida > div > *, .m-medida-arte, .m-comparacao, .m-citacao, .m-linhas li, .m-equipe article, .m-larga, .m-pilha')
    .forEach(el => { if (!el.hasAttribute('data-fixo') && !el.closest('[data-fixo]')) el.setAttribute('data-surge', ''); });
  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  q('[data-surge]').forEach(el => {
    const irmaos = [...el.parentElement.children].filter(x => x.hasAttribute('data-surge'));
    el.style.setProperty('--i', Math.min(irmaos.indexOf(el), 6)); obs.observe(el);
  });
  q('.m-comparacao li, .m-orbita .roda span, .m-medida-arte .etq').forEach(el => { if (!el.style.getPropertyValue('--k')) el.style.setProperty('--k', [...el.parentElement.children].indexOf(el)); });

  // a pessoa da abertura acompanha o mouse de leve, e os cartões ganham um brilho que segue o ponteiro
  if (!parado() && matchMedia('(pointer:fine)').matches) {
    q('.m-abertura, .m-sobre').forEach(sec => { const palco = sec.querySelector('.m-palco'); if (!palco) return;
      sec.addEventListener('pointermove', ev => { const r = sec.getBoundingClientRect(); palco.style.setProperty('--px', ((ev.clientX - r.left) / r.width - .5).toFixed(3)); palco.style.setProperty('--py', ((ev.clientY - r.top) / r.height - .5).toFixed(3)); });
      sec.addEventListener('pointerleave', () => { palco.style.setProperty('--px', 0); palco.style.setProperty('--py', 0); }); });
    q('.m-cartao').forEach(c => c.addEventListener('pointermove', ev => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (ev.clientX - r.left) + 'px'); c.style.setProperty('--my', (ev.clientY - r.top) + 'px'); }));
  }

  // faixa que corre: duplica o conteúdo para o laço ficar sem emenda
  q('.m-corre div').forEach(x => { x.innerHTML += x.innerHTML; });

  // números que sobem
  const conta = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; conta.unobserve(e.target);
    const el = e.target, escrito = el.textContent, m = (el.dataset.conta || '').trim().match(/^(\D*?)(\d[\d.,]*)(.*)$/); if (!m || parado()) return;   // sem número: fica o texto escrito
    let num = m[2].replace(/[.,]+$/, '');   // aceita 12000, 12.000, 4.9 e 4,9
    num = /,\d{1,2}$/.test(num) ? num.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(num) ? num.replace(/\./g, '') : num.replace(/,/g, '');
    const alvo = parseFloat(num), casas = (num.split('.')[1] || '').length, pre = el.dataset.antes ?? m[1], pos = el.dataset.depois ?? m[3];
    const fixo = el.dataset.antes === undefined && el.dataset.depois === undefined && /\d/.test(escrito);
    const t0 = performance.now(), dura = +el.dataset.tempo || 1400;
    (function passo(t) { const k = Math.min(1, (t - t0) / dura), v = alvo * (1 - Math.pow(1 - k, 3)); el.textContent = k === 1 && fixo ? escrito : pre + v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) + pos; if (k < 1) requestAnimationFrame(passo); })(t0);
  }), { threshold: .5 });
  q('[data-conta]').forEach(el => conta.observe(el));

  // dúvidas: uma aberta por vez
  q('.m-duvidas details').forEach(x => x.addEventListener('toggle', () => { if (x.open) q('details[open]', x.parentElement).forEach(o => { if (o !== x) o.open = false; }); }));
  q('[data-ano]').forEach(el => { el.textContent = new Date().getFullYear(); });
  // imagem que não carregou não deixa buraco com ícone quebrado; capa de vídeo cai para a versão que sempre existe
  q('img').forEach(i => i.addEventListener('error', () => { if (i.dataset.reserva && i.src !== i.dataset.reserva) { i.src = i.dataset.reserva; return; } i.style.visibility = 'hidden'; }));
})();
