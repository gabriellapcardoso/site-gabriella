# site-gabriella — CLAUDE.md

Site pessoal de Gabriella Cardoso. Landing page one-page com Next.js 14 (static export) hospedada na Vercel.

> **STATUS ATUAL (2026-11-14): o domínio `gabriellapcardoso.com.br` NÃO é mais servido por este projeto.**
> O site no ar é um site estático novo, gerado pela skill `mestre-dos-sites` e publicado no projeto
> Vercel `gabriella-cardoso-site`. Este repositório (Next.js) continua intacto, como versão anterior
> e plano de volta. **Pushes na `main` deste repositório não alteram mais o domínio.**
> Como o site no ar é feito e publicado: `site-no-ar/COMO-PUBLICAR.md` (pasta dentro deste repositório
> desde 2026-11-17; antes ficava em `~/AI/sites-melhorados/gabriellapcardoso-com-br/`).
> Resumo e histórico da troca: seções "Site no ar" e "Histórico" abaixo.

## Stack

- **Framework**: Next.js 14 com App Router, modo `output: "export"` (geração estática)
- **Linguagem**: TypeScript
- **Estilo**: Tailwind CSS **v4** + design system próprio (`gabriella-cardoso-brandbook`)
- **Animações**: Framer Motion
- **Componentes UI**: shadcn/ui + componentes customizados
- **Ícones**: Lucide React
- **Fontes**: SF Pro Display (local, `/src/fonts/`) + Geist (fallback)

## Design System

Os tokens de cor estão inlined em `src/styles/tokens.css` (variáveis CSS puras). O pacote `gabriella-cardoso-brandbook` existe localmente mas não é usado em produção — os tokens foram copiados para evitar falha de build na Vercel.

Não hardcode cores — use sempre as variáveis CSS do brandbook ou as classes Tailwind mapeadas abaixo.

Paleta principal:
- `brand` → roxo (`--purple-700`, `--purple-900`, `--purple-500`) → classes `bg-brand`, `bg-brand-deep`, `bg-brand-light`
- `accent-pink` → `--pink-500` → classe `bg-accent-pink`
- `accent-lime` → `--lime-500` → classe `bg-accent-lime`
- `ink-*` → escala de cinza/texto → classes `text-ink-*`, `bg-ink-*`
- `surface-*` → superfícies semânticas → classes `bg-surface-page`, `bg-surface-card`, etc.

## Tailwind CSS v4 — Configuração

O projeto usa **Tailwind v4.3.2** com configuração CSS-first (sem `tailwind.config.ts`).

### Arquivos relevantes

| Arquivo | Função |
|---|---|
| `src/app/globals.css` | Entrada principal: imports, `@theme`, `@font-face`, `@layer base` |
| `src/styles/tokens.css` | Variáveis CSS do design system (cores, gradientes, tipografia) |
| `postcss.config.mjs` | Plugin `@tailwindcss/postcss` |
| `tailwind.config.v3.ts` | Config v3 arquivada (ignorada pelo build) |

### Estrutura do `globals.css`

```css
@import "tailwindcss";           /* base do Tailwind v4 */
@import "../styles/tokens.css";  /* variáveis CSS do brandbook */
@import "tw-animate-css";        /* utilitários de animação (já v4) */
@import "shadcn/tailwind.css";   /* variantes shadcn (já v4) */

@theme { ... }     /* tema: mapeia tokens CSS → classes Tailwind */
@font-face { ... } /* SF Pro Display (7 pesos) */
@layer base { ... } /* estilos globais de body, headings, :root, .dark */
```

### Como o tema funciona

O bloco `@theme` em `globals.css` mapeia as variáveis do `tokens.css` para nomes de utilidades Tailwind:

```css
@theme {
  --color-brand: var(--purple-700);      /* → bg-brand, text-brand */
  --color-accent-pink: var(--pink-500);  /* → bg-accent-pink */
  --color-ink-800: var(--ink-800);       /* → text-ink-800 */
  --font-sans: "SF Pro Display", ...;    /* → font-sans */
  --background-image-purple-gradient: var(--gradient-purple); /* → bg-purple-gradient */
}
```

> **Nota**: valores com `var()` no `@theme` não suportam modificadores de opacidade (ex: `bg-brand/50`). Se precisar de opacidade, substitua o valor por um literal (ex: `#54007f`).

### Para adicionar novas classes Tailwind customizadas

Adicione no `@theme` de `globals.css`:
```css
@theme {
  --color-minha-cor: var(--minha-variavel);
}
```
Isso gera automaticamente `bg-minha-cor`, `text-minha-cor`, `border-minha-cor`, etc.

## Estrutura de componentes

```
src/
  app/
    layout.tsx      — metadata SEO, fonte global, html lang="pt-BR"
    page.tsx        — monta as seções na ordem da landing
    globals.css     — @import tailwindcss, @theme, @font-face SF Pro Display, @layer base
  styles/
    tokens.css      — variáveis CSS do design system (inlined do brandbook)
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      ClientsSection.tsx
      Intro.tsx
      Features.tsx
      Services.tsx
      Authority.tsx
      Pricing.tsx
      FAQ.tsx
    ui/
      button.tsx
      spotlight-card.tsx
  lib/
    utils.ts        — cn() helper (clsx + tailwind-merge)
```

## Comandos

```bash
npm run dev      # dev em localhost:3000
npm run build    # gera /out (static export)
npm run lint
```

O build gera a pasta `out/` com HTML estático — não há servidor Node em produção.

---

## Site no ar (desde 2026-11-14)

| Item | Valor |
|---|---|
| Domínio | `gabriellapcardoso.com.br` (o `www` redireciona para ele) |
| Projeto Vercel | `gabriella-cardoso-site` (`prj_bptEeO2hDXXaeh75cvaIoDV8bgoz`) |
| Endereço da Vercel | `gabriella-cardoso-site.vercel.app` |
| Tipo | HTML estático de uma página, sem build, **sem repositório GitHub e sem deploy automático** |
| Fonte do conteúdo | `site-no-ar/site.json` (neste repositório) |
| Montagem | skill `mestre-dos-sites` (`~/.claude/skills/mestre-dos-sites/`) |
| Publicação | manual, por `vercel deploy --prod` (comando completo em `COMO-PUBLICAR.md`) |

Como o domínio foi movido: o domínio estava no projeto `site-gabriella`. Em vez de colar o site novo
por cima (o que mudaria as configurações do app Next.js e seria sobrescrito no próximo push do
GitHub), foi criado o projeto `gabriella-cardoso-site` e o domínio foi movido para ele pela API:
`POST /v1/projects/{id do site-gabriella}/domains/gabriellapcardoso.com.br/move` com
`projectId` = id do projeto novo. O projeto `site-gabriella` **não foi alterado**.

O que mudou para o visitante: sai o site Next.js; entra uma página com abertura em tom "cinema" (foto
recortada), peças animadas (órbita de método, linha do tempo de formas de trabalho), citação, seções
de serviços, trajetória e contato. Todo o texto veio do site antigo. Ficaram de fora a faixa de
clientes (nomes fictícios: Acme Corp, Global Tech, Command Systems, Shield Security, Zap Energy,
Sparkles AI) e quatro das cinco perguntas do FAQ (abriam sem resposta no site antigo).

Mudanças depois da estreia (2026-11-17): a seção "Sobre" passou a contar a trajetória no marketing
político (documento da própria Gabriella) e entrou a seção "Palestras", com foto de palco de 4 eventos
e link para o post de cada um. Esses dois conteúdos não vieram do site antigo. Histórico abaixo.

### Voltar ao site anterior

O `site-gabriella` continua com o último deploy de produção no ar em
`site-gabriella-lyart.vercel.app` (conferido em 2026-11-14, responde 200). Para devolver o domínio:
mover de volta com o mesmo endpoint, trocando origem e destino (comando em `COMO-PUBLICAR.md`).
A ida foi testada; a volta não. Se voltar a ele, tirar a faixa de clientes fictícios.

### Favicon

`monograma-roxo.svg` do design system (com versão branca em tema escuro) + PNGs de apoio para Safari
e iPhone. Detalhes em `COMO-PUBLICAR.md`.

### Compartilhamento (Open Graph)

O site antigo tinha `opengraph-image.tsx`; o novo ficou sem imagem de compartilhamento até 2026-11-14,
quando foram ligadas as tags `og:*`, `twitter:*` e `canonical` com a imagem `img/og.jpg`
(1200×630, ~150 KB). Detalhes e como trocar a imagem em `COMO-PUBLICAR.md`.

### Indexação no Google

- Propriedade **Domínio** `gabriellapcardoso.com.br` no Google Search Console, verificada em
  2026-11-14 por registro TXT na raiz do DNS (ver tabela de DNS). **Não apagar esse TXT.**
- O site novo sai **sem** `noindex` (`"previa": false`). Indexação da página inicial solicitada em
  2026-11-14; no momento do pedido o Google ainda guardava a versão antiga.
- Não há `sitemap.xml` nem `robots.txt`.

---

## Infraestrutura e Deploy

### Vercel

- **Projeto**: `site-gabriella` na equipe `gabriella-cardosos-projects`
- **Repositório GitHub**: `https://github.com/gabriellapcardoso/site-gabriella`
- **Deploy**: automático via GitHub (push na branch `main` → deploy na Vercel). **Desde 2026-11-14
  isso só atualiza `site-gabriella-lyart.vercel.app`; o domínio foi movido para o projeto
  `gabriella-cardoso-site`.**
- **Domínios**: até 2026-11-13 o projeto tinha `gabriellapcardoso.com.br` (o `www` era atendido pelo
  wildcard `*` do DNS, não era domínio do projeto). Hoje só resta `site-gabriella-lyart.vercel.app`.

### DNS — gabriellapcardoso.com.br

**Nameservers ativos**: `ns1.vercel-dns.com` / `ns2.vercel-dns.com`

A Vercel gerencia o DNS completo do domínio. Todos os registros estão no painel da Vercel.

| Subdomínio | Tipo | Destino | Finalidade |
|---|---|---|---|
| `@` | ALIAS | `e13f4ab36accade2.vercel-dns-017.com` (valor gerenciado pela Vercel; muda sozinho, mudou na troca de 2026-11-14) | Site principal |
| `*` | ALIAS | `cname.vercel-dns-017.com.` | Wildcard Vercel (atende o `www`, que redireciona para o domínio principal) |
| `@` | MX 5 | `mx1.hostinger.com.` | E-mail |
| `@` | MX 10 | `mx2.hostinger.com.` | E-mail |
| `@` | TXT | `v=spf1 include:_spf.mail.hostinger.com ~all` | SPF |
| `@` | TXT | `google-site-verification=...` (registro `rec_fa0a9fca1f3320b5aceddce5`, criado em 2026-11-14) | Verificação do Google Search Console. **Não apagar** |
| `_dmarc` | TXT | `v=DMARC1; p=none` | DMARC |
| `hostingermail-a._domainkey` | CNAME | `hostingermail-a.dkim.mail.hostinger.com` | DKIM |
| `hostingermail-b._domainkey` | CNAME | `hostingermail-b.dkim.mail.hostinger.com` | DKIM |
| `hostingermail-c._domainkey` | CNAME | `hostingermail-c.dkim.mail.hostinger.com` | DKIM |
| `autodiscover` | CNAME | `autodiscover.mail.hostinger.com.` | E-mail autodiscovery |
| `autoconfig` | CNAME | `autoconfig.mail.hostinger.com.` | E-mail autoconfig |
| `vps` | A | `72.60.55.54` | VPS principal |
| `n8n` | A | `72.60.55.54` | n8n (automação) |
| `www.n8n` | A | `72.60.55.54` | n8n (alias www) |
| `portainer` | A | `72.60.55.54` | Portainer (Docker) |
| `www.portainer` | A | `72.60.55.54` | Portainer (alias www) |
| `webhook` | A | `72.60.55.54` | Webhooks |
| `www.webhook` | A | `72.60.55.54` | Webhooks (alias www) |
| `api` | A | `72.60.55.54` | API |
| `www.api` | A | `72.60.55.54` | API (alias www) |
| `evolutionapi` | A | `72.60.55.54` | Evolution API (WhatsApp) |
| `ftp` | A | `154.56.48.36` | FTP (legado Hostinger) |
| `pixels` | CNAME | `pixels.kiwify.com.br.` | Pixel Kiwify |

> **Importante**: Para adicionar ou editar registros DNS, use `npx vercel dns` ou o painel da Vercel. Não edite via Hostinger — os nameservers não apontam mais para lá.

### Hostinger (legado)

O domínio ainda tem um plano de hospedagem compartilhada ativo na Hostinger (ordem `200721742`, usuário `u896920154`) com `gabriellapcardoso.com.br` como addon domain e `aaagencia.com.br` como domínio principal. Esse plano **não está sendo usado** para servir o site — o hosting ativo é a Vercel.

O e-mail (`@gabriellapcardoso.com.br`) ainda passa pelos servidores da Hostinger via registros MX configurados na Vercel.

### VPS

IP `72.60.55.54` — serviços próprios rodando em Docker:
- n8n (`n8n.gabriellapcardoso.com.br`)
- Portainer (`portainer.gabriellapcardoso.com.br`)
- Evolution API / WhatsApp (`evolutionapi.gabriellapcardoso.com.br`)
- API própria (`api.gabriellapcardoso.com.br`)
- Webhooks (`webhook.gabriellapcardoso.com.br`)

---

## Histórico de incidentes

### 2026-06-25 — SSL inativo / domínio "não seguro"

**Causa**: Os nameservers do domínio estavam configurados como `ns1.dns-parking.com` / `ns2.dns-parking.com` desde a criação do domínio. Com nameservers de estacionamento, todos os registros DNS configurados na Hostinger eram ignorados, e a Vercel nunca conseguiu verificar o domínio para provisionar o certificado SSL.

**Resolução**:
1. Identificado via `vercel domains inspect` (✘ nos nameservers esperados)
2. Migrados todos os registros DNS da Hostinger para a Vercel via `vercel dns add`
3. Nameservers atualizados para `ns1.vercel-dns.com` / `ns2.vercel-dns.com` via API da Hostinger
4. SSL provisionado automaticamente pela Vercel após propagação DNS (até 48h)

### 2026-11-14 — Troca do site no domínio e registro no Google (mudança planejada)

1. Site novo montado com a skill `mestre-dos-sites` a partir do conteúdo do site antigo; foto
   profissional da Gabriella recortada para a abertura; faixa "Prévia de proposta" removida por o
   site ser dela.
2. Ajustes pedidos e feitos: palavra gigante "decisão" removida da abertura; botão de CTA na
   primeira dobra (celular e computador); foto da abertura ampliada; foto da seção Trajetória
   reenquadrada (cortava os olhos); botão da seção Estratégia invisível (roxo sobre roxo) corrigido.
3. Publicado no projeto novo `gabriella-cardoso-site`; conferido no endereço da Vercel (HTML com o
   mesmo hash do build local); domínio movido para ele; conferido no domínio (HTTP 200, certificado
   válido, `www` e `http` redirecionando para `https://gabriellapcardoso.com.br/`).
4. Favicon ligado (monograma roxo do design system). O montador da skill ganhou o campo `favicon`.
5. `noindex` removido: o montador da skill colocava `noindex` sempre; agora omite quando
   `"previa": false`. Republicado.
6. Search Console: propriedade Domínio criada e verificada por TXT no DNS (criado pela API da Vercel
   após liberação da usuária); indexação da página inicial solicitada.

7. Imagem de compartilhamento criada e tags Open Graph/Twitter/canonical ligadas (o site novo tinha
   perdido o `opengraph-image.tsx` do antigo). O montador da skill ganhou os campos `url` e `og`.

Não verificado nessa data: teste em celular real; rastreamento do site novo pelo Google; aparência da
prévia do link dentro do WhatsApp e do LinkedIn.

### 2026-11-17 — Seções "Sobre" e "Palestras" no site no ar (mudança planejada)

1. "Sobre" reescrita com o documento da Gabriella "Carreira no marketing político" (trajetória desde
   2015, 17 campanhas em 2024, 3 campanhas para deputado em 2026). Os círculos passaram a dizer
   "Leitura política + Dados e tráfego = Campanha com método".
2. Seção nova "Palestras" (peça `mosaico`, entra no menu): Reload 2026 Sebrae Minas, Expo Favela
   Minas, Neves Summit 2025 e Semana do MEI BH. Textos tirados das legendas dos posts dela no
   Instagram; fotos escolhidas por ela; cada cartão abre o post do evento.
3. Publicado no projeto `gabriella-cardoso-site`; conferido no domínio (HTML e as 6 peças novas com o
   mesmo hash dos arquivos locais, HTTP 200).
4. Correção no celular, publicada no mesmo dia: a faixa que corre ficava parada em aparelho com
   "Reduzir movimento" (agora anda, mais devagar) e o círculo da seção "Sobre" alargava a página em
   22 px (agora 375 px exatos). Conferido no domínio com Chromium em 375 px; **não** num iPhone real.

Fontes: documento `Gabriella Cardoso - Carreira no marketing político.md` (Downloads), legendas de 10
posts do Instagram dela (Reload, Neves Summit, Semana do MEI, Expo Favela) e as fotos de
`~/Downloads/Fotos Palestras/Selecionadas`. A publicação passou a incluir `img/palestra-*.jpg` e
`kit/peca-mosaico.{css,js}`.

Detalhes, lista de arquivos para publicar e cópias anteriores: `COMO-PUBLICAR.md`.

---

## Pendências conhecidas

### Abertas (atualizado em 2026-11-17)

- [ ] **~2026-11-17:** conferir no Search Console (Inspeção de URL) se o Google já rastreou o site novo.
- [ ] Conferir a prévia do link no WhatsApp e no LinkedIn (tags e imagem no ar desde 2026-11-14; a aparência nos apps não foi vista).
- [ ] Testar o site novo em celular de verdade. Em especial, num iPhone, a faixa que corre (corrigida em 2026-11-17, conferida só no Chromium simulado).
- [ ] Ativar verificação em duas etapas na conta Vercel (só o dono faz).
- [ ] `sitemap.xml` e `robots.txt`, se o site crescer.

### Resolvidas

- [x] ~~Verificar e-mail após propagação DNS~~ — confirmado em 2026-06-25 (MX mx1/mx2.hostinger.com propagados via Vercel DNS)
- [x] ~~Testar subdomínios do VPS~~ — confirmado em 2026-06-25 (n8n e demais resolvendo para `72.60.55.54`)
- [x] ~~Links do Footer~~ — resolvido em 2026-06-25 (Instagram, LinkedIn, WhatsApp e E-mail preenchidos em `Footer.tsx`)
- [x] ~~WhatsApp na seção de contato~~ — resolvido em 2026-06-25 (`5531994822228`)
- [x] ~~Remover arquivos de script DNS do repositório~~ — resolvido em 2026-06-25
- [x] ~~Imagem OG ausente~~ — resolvido em 2026-06-25 (`src/app/opengraph-image.tsx`)
- [x] ~~Seção de contato ausente~~ — resolvido em 2026-06-25 (`src/components/sections/Contact.tsx`)
- [x] ~~Dependência local `gabriella-cardoso-brandbook` quebrando build na Vercel~~ — resolvido em 2026-06-25 (tokens e Logo inlined em `src/styles/tokens.css` e `src/components/ui/Logo.tsx`)
- [x] ~~Repositório GitHub ausente / links do footer não atualizando em produção~~ — resolvido em 2026-06-26 (repositório criado em `github.com/gabriellapcardoso/site-gabriella`, Vercel conectada via `vercel git connect`, deploy automático ativo)
- [x] ~~Tailwind v3 → v4~~ — migrado em 2026-06-30 (`tailwindcss@4.3.2`, `@tailwindcss/postcss`, tema migrado para `@theme` em `globals.css`, `tailwind.config.ts` arquivado como `tailwind.config.v3.ts`)
