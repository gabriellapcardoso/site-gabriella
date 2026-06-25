# site-gabriella

Site pessoal de Gabriella Cardoso — landing page one-page em Next.js 14 com static export, hospedada na Vercel.

**URL**: https://gabriellapcardoso.com.br

## Stack

- Next.js 14 (App Router, `output: "export"`)
- TypeScript + Tailwind CSS
- Design system próprio: `gabriella-cardoso-brandbook` (pacote local)
- Animações com Framer Motion
- Fontes: SF Pro Display (local)

## Desenvolvimento

```bash
npm install
npm run dev        # localhost:3000
npm run build      # gera /out estático
npm run lint
```

> O pacote `gabriella-cardoso-brandbook` precisa estar disponível em `../gabriella-cardoso-designsystem/code` (caminho relativo configurado no `package.json`).

## Estrutura

```
src/
  app/
    layout.tsx        # metadata SEO global
    page.tsx          # composição das seções
    globals.css       # tokens, fontes, base styles
  components/
    layout/           # Navbar, Footer
    sections/         # Hero, Intro, Features, Services, Authority, Pricing, FAQ, ClientsSection
    ui/               # button, spotlight-card
  lib/utils.ts        # cn() helper
```

## Deploy

Deploy automático via Vercel ao fazer push na branch `main`.

DNS gerenciado pela Vercel (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`). Para alterar registros DNS, use `npx vercel dns` ou o painel da Vercel — não edite via Hostinger.

Documentação completa de infraestrutura e DNS em `.claude/CLAUDE.md`.
