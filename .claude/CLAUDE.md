# site-gabriella — CLAUDE.md

Site pessoal de Gabriella Cardoso. Landing page one-page com Next.js 14 (static export) hospedada na Vercel.

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

## Infraestrutura e Deploy

### Vercel

- **Projeto**: `site-gabriella` na equipe `gabriella-cardosos-projects`
- **Repositório GitHub**: `https://github.com/gabriellapcardoso/site-gabriella`
- **Deploy**: automático via GitHub (push na branch `main` → deploy na Vercel)
- **Domínios**: `gabriellapcardoso.com.br` e `www.gabriellapcardoso.com.br`

### DNS — gabriellapcardoso.com.br

**Nameservers ativos**: `ns1.vercel-dns.com` / `ns2.vercel-dns.com`

A Vercel gerencia o DNS completo do domínio. Todos os registros estão no painel da Vercel.

| Subdomínio | Tipo | Destino | Finalidade |
|---|---|---|---|
| `@` | ALIAS | `b37e53686b1f3ee2.vercel-dns-017.com` | Site principal |
| `*` | ALIAS | `cname.vercel-dns-017.com.` | Wildcard Vercel |
| `www` | CNAME | `cname.vercel-dns.com.` | www → Vercel |
| `@` | MX 5 | `mx1.hostinger.com.` | E-mail |
| `@` | MX 10 | `mx2.hostinger.com.` | E-mail |
| `@` | TXT | `v=spf1 include:_spf.mail.hostinger.com ~all` | SPF |
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

---

## Pendências conhecidas

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
