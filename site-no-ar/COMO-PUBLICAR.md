# gabriellapcardoso.com.br — como o site no ar é feito e publicado

Documento operacional do site que está no ar desde **2026-11-14**.
Infraestrutura, DNS e histórico completos: `~/AI/Gabriella C/site-gabriella/.claude/CLAUDE.md`.

## Resumo

| Item | Valor |
|---|---|
| URL | https://gabriellapcardoso.com.br (o `www` redireciona para ele) |
| Tipo | Site estático de uma página (HTML + CSS + JS), sem build e sem servidor |
| Projeto Vercel | `gabriella-cardoso-site` (`prj_bptEeO2hDXXaeh75cvaIoDV8bgoz`), equipe `gabriella-cardosos-projects` |
| Endereço da Vercel | https://gabriella-cardoso-site.vercel.app |
| Origem do conteúdo | `site.json` (esta pasta). Quem monta o HTML é a skill `mestre-dos-sites` |
| Versão anterior | Next.js, projeto `site-gabriella`, intacto (ver "Voltar ao site anterior") |

O projeto novo **não tem repositório no GitHub nem deploy automático**. Nada que se faça no
GitHub muda o site no ar. A publicação é manual, pelo comando da seção abaixo.

## Onde está cada coisa

```
site-gabriella/site-no-ar/   (desde 2026-11-17; antes: ~/AI/sites-melhorados/gabriellapcardoso-com-br/)
  site.json            conteúdo e escolhas visuais (a ÚNICA fonte editável)
  index.html           gerado a partir do site.json (não editar à mão)
  img/                 fotos e ícones usados pela página
  kit/                 CSS e JS do kit da skill (copiados pelo montador)
  captura/             capturas do site antigo e retratos do depois (não vão ao ar)
  antes-e-depois.html  página de comparação (não vai ao ar)
  site-novo.zip        pacote gerado pelo finalizador (não vai ao ar)
  COMO-PUBLICAR.md     este arquivo
```

Skill: `~/.claude/skills/mestre-dos-sites/` (`scripts/capturar.mjs`, `scripts/montar.mjs`,
`scripts/finalizar.mjs`).

## Fazer uma alteração

1. Editar o `site.json` (texto, cores, seções, fotos). Pedir ao Claude resolve: ele faz a edição pontual.
2. Remontar e conferir:

   ```bash
   cd "$HOME/AI/Gabriella C/site-gabriella"
   node ~/.claude/skills/mestre-dos-sites/scripts/finalizar.mjs site-no-ar
   ```

   Precisa sair **TUDO CERTO**. Se sair CONSERTE, corrigir o item apontado e rodar de novo.
3. Publicar (próxima seção).

## Publicar

A pasta enviada à Vercel deve ter **só** o que a página usa. Não enviar `captura/`, `site.json`,
`site-novo.zip` nem `antes-e-depois.html`.

```bash
SRC="$HOME/AI/Gabriella C/site-gabriella/site-no-ar"
OUT=$(mktemp -d)
mkdir -p "$OUT/img" "$OUT/kit"
cp "$SRC/index.html" "$OUT/"
cp "$SRC"/img/{foto-02.jpg,foto-02-recorte.webp,favicon.svg,favicon-32.png,apple-touch-icon.png,og.jpg,palestra-reload.jpg,palestra-expo-favela.jpg,palestra-neves-summit.jpg,palestra-semana-mei.jpg} "$OUT/img/"
cp "$SRC"/kit/{mestre.css,mestre.js,peca-cinema.css,peca-cinema.js,peca-mosaico.css,peca-mosaico.js,peca-orbita.css,peca-orbita.js,tom-direto.css} "$OUT/kit/"
cd "$OUT" && vercel deploy --prod --yes --name gabriella-cardoso-site --scope gabriella-cardosos-projects
```

Atenção: a lista de arquivos acima vale para as seções atuais. Se o `site.json` ganhar outro tipo
de seção ou outro tom, outros arquivos de `kit/` passam a ser usados. Para saber exatamente quais:

```bash
grep -oE '(href|src)="(img|kit)/[^"]+"' "$SRC/index.html" | sort -u
```

Depois de publicar, conferir no domínio de verdade (não só no endereço da Vercel):

```bash
curl -s https://gabriellapcardoso.com.br/ | shasum -a 256
shasum -a 256 "$HOME/AI/Gabriella C/site-gabriella/site-no-ar/index.html"   # os dois hashes devem ser iguais
```

## Voltar ao site anterior (Next.js)

O projeto `site-gabriella` não foi alterado e o último deploy de produção dele continua válido
(também acessível em https://site-gabriella-lyart.vercel.app). Para devolver o domínio a ele:

```bash
vercel api /v1/projects/prj_bptEeO2hDXXaeh75cvaIoDV8bgoz/domains/gabriellapcardoso.com.br/move \
  -X POST -F projectId=prj_VDExsPQxAvqGO0k23dgH8gqHr8UR --scope gabriella-cardosos-projects
```

Este é o mesmo endpoint usado na troca de 2026-11-14, com origem e destino invertidos. A ida foi
testada; a volta **não** foi testada. O campo que identifica o destino se chama `projectId`.

Observação: o site anterior mostra uma faixa "Marcas e lideranças que confiam no método" com nomes
fictícios (Acme Corp, Global Tech etc.). Se um dia voltar a ele, trocar ou tirar essa faixa.

## Decisões de conteúdo e design

- **Só entra o que estava no site antigo ou em material da própria Gabriella** (documento, posts, fotos
  que ela escolheu). Nada de serviço, número, prêmio ou depoimento inventado.
- **Exceção (2026-11-16):** a seção "Sobre" foi reescrita com o documento da própria Gabriella
  "Carreira no marketing político" (trajetória desde 2015, campanhas de 2024 e 2026). Cópia do
  `site.json` e do `index.html` anteriores em `captura/*.antes-sobre-2026-11-16.*`.
- **Seção "Palestras" (2026-11-16, fotos em 2026-11-17):** peça `mosaico`, uma foto de palco por
  evento (Reload 2026 Sebrae Minas, Expo Favela Minas, Neves Summit 2025, Semana do MEI BH). Textos
  tirados das legendas dos posts dela no Instagram; cada cartão abre o post do evento. Fotos
  escolhidas pela Gabriella em `~/Downloads/Fotos Palestras/Selecionadas`, convertidas para
  `img/palestra-*.jpg`. Cópias anteriores: `captura/site.antes-palestras-2026-11-16.json` e
  `captura/site.antes-fotos-palestras-2026-11-17.json`.
- **Faixa de clientes do site antigo ficou de fora:** eram nomes fictícios.
- **FAQ:** só a primeira pergunta tinha resposta no site antigo; as outras quatro abriam vazias.
  Por isso entrou só uma. Novas perguntas só entram se a Gabriella escrever as respostas.
- **Sem logo em imagem:** o site antigo não tinha; o nome aparece escrito.
- **Tom e cores:** `tom: direto` (fonte Sora), tema escuro, roxo e verde-limão da marca.
- **Abertura `cinema` com foto recortada** (`img/foto-02-recorte.webp`, recorte feito pelo macOS
  com `scripts/recortar.swift`). A palavra gigante do efeito foi desligada: não explicava nada.
- **Primeira dobra:** o botão "Quero uma análise estratégica" precisa aparecer sem rolar, no celular
  e no computador. Medido em 375×640, 390×664, 430×740, 1280×650, 1440×760 e 1470×690.
  O ajuste fica no campo `css` do `site.json`.
- **Contraste dos botões:** a seção `orbita` pinta o botão com cor clara fixa, que some em tema
  escuro. Há uma regra no `css` do `site.json` que força o verde-limão. Medido em todos os botões
  (mínimo 11,6; o recomendado é 4,5).
- **Foto em "Autoridade":** moldura vertical 4:5 para não cortar os olhos.
- **Faixa que corre (2026-11-17):** o kit parava a faixa quando o aparelho pede "Reduzir movimento"
  (Ajustes > Acessibilidade > Movimento). A pedido da Gabriella, a faixa anda nesse caso também, mais
  devagar (70 s por volta em vez de 38 s). Regra no `css` do `site.json`.
- **Seção "Sobre" no celular (2026-11-17):** o círculo da direita começa fora da tela antes de animar
  e alargava a página em 22 px. Corrigido com `#sobre{overflow-x:clip}` no `css`. Medido em 375 px,
  com e sem "Reduzir movimento": largura 375, faixa andando.

## Favicon

- `img/favicon.svg`: o `monograma-roxo.svg` do design system. Acrescentei uma regra interna para o
  roxo virar branco em navegador com tema escuro (o `#54007f` some numa aba escura).
- `img/favicon-32.png` e `img/apple-touch-icon.png` (180 px): monograma branco e verde-limão sobre
  fundo roxo, para Safari e para a tela inicial do iPhone, que não usam SVG.
- Origem: `~/AI/Gabriella C/gabriella-cardoso-designsystem/assets/logo/svg/`.
- Ligado pelo campo `favicon` do `site.json` (suporte acrescentado ao montador em 2026-11-14).
- O navegador guarda favicon em cache: se a aba mostrar o ícone antigo, recarregar com Cmd+Shift+R.

## Compartilhamento (WhatsApp, LinkedIn, Instagram, X)

Quando o link do site é colado numa conversa ou post, a rede mostra uma prévia (imagem, título e
descrição) lida das tags Open Graph da página. Ligado em 2026-11-14.

- **Imagem:** `img/og.jpg`, 1200×630, ~150 KB (o WhatsApp só mostra prévia de imagens leves, até
  cerca de 300 KB). Feita a partir de `img/foto-02-recorte.webp`, do monograma branco do design
  system e do título do site, em Sora e verde-limão `#bff208`. Texto só com o que já está no site.
- **Campos do `site.json`:** `"url": "https://gabriellapcardoso.com.br/"` (obrigatório, a imagem
  precisa de endereço absoluto) e `"og": { "imagem": "img/og.jpg", "largura": 1200, "altura": 630, "alt": "..." }`.
- **O que o montador gera:** `canonical`, `og:type/locale/site_name/title/description/url`,
  `og:image` (+ largura, altura, alt) e `twitter:card=summary_large_image` com título, descrição e imagem.
  Título e descrição saem de `titulo_da_aba` e `descricao`.
- **Para trocar a imagem:** gerar outro JPG 1200×630, salvar como `img/og.jpg` (ou apontar outro
  arquivo em `og.imagem`), remontar e publicar.
- **Cache das redes:** WhatsApp, LinkedIn e Facebook guardam a prévia por dias. Quem já colou o link
  antes de 2026-11-14 pode continuar vendo a prévia vazia. Para forçar a releitura: LinkedIn Post
  Inspector (linkedin.com/post-inspector) e Facebook Sharing Debugger (developers.facebook.com/tools/debug);
  no WhatsApp, colar o link com um parâmetro novo (`?v=2`) mostra a prévia nova.
- **Conferido em 2026-11-14:** os rastreadores do WhatsApp, Facebook, LinkedIn e X recebem a página
  e a imagem (HTTP 200, `image/jpeg`) sem bloqueio. **Não conferido:** como a prévia aparece dentro
  de cada aplicativo.

## Indexação no Google

- `"previa": false` no `site.json` faz o montador **omitir** a faixa "Prévia de proposta" **e** o
  `<meta name="robots" content="noindex">`. Sem isso o Google não lista o site.
  (Antes de 2026-11-14 o montador colocava `noindex` sempre; a skill foi corrigida.)
- Google Search Console: propriedade do tipo **Domínio** (`sc-domain:gabriellapcardoso.com.br`),
  verificada em 2026-11-14 por registro TXT no DNS, na conta Google da Gabriella.
- **Não apagar o TXT `google-site-verification`** (registro `rec_fa0a9fca1f3320b5aceddce5` no DNS da
  Vercel): apagar desfaz a verificação.
- Em 2026-11-14 foi pedida a indexação da página inicial. Na inspeção, o Google ainda tinha a
  versão antiga (Next.js) no índice.
- Não existem `sitemap.xml` nem `robots.txt` (404). Para uma página só, o Google encontra tudo.

## Pendências

- [ ] **~2026-11-17:** abrir Search Console > Inspeção de URL e conferir se o último rastreamento é
      posterior a 2026-11-14 (ou seja, se o Google já leu o site novo).
- [ ] **Conferir a prévia do link no WhatsApp e no LinkedIn** (seção "Compartilhamento"). As tags e
      a imagem estão no ar desde 2026-11-14, mas a aparência dentro dos aplicativos não foi vista.
- [ ] **Conferir num iPhone se a faixa que corre anda** (corrigida em 2026-11-17; conferida só no
      Chromium simulado, sem Safari nesta máquina).
- [ ] **Testar em celular de verdade** (testado só em telas simuladas do navegador do app). No
      celular pequeno (375×548) o botão fica a ~52 px do fim da tela.
- [ ] **Ativar a verificação em duas etapas na conta Vercel** (a Vercel avisou na CLI; só o dono da
      conta faz, em https://vercel.com/account/settings/authentication).
- [ ] Criar `sitemap.xml` e `robots.txt` se o site ganhar mais páginas.
- [ ] Respostas do FAQ (ver decisões de conteúdo).
