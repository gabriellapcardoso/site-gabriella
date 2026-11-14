# site-gabriella

Site pessoal de Gabriella Cardoso — landing page one-page em Next.js 14 com static export, hospedada na Vercel.

> **Atenção (2026-11-14): este repositório não serve mais `gabriellapcardoso.com.br`.**
> O site no ar é uma página estática nova, feita com a skill `mestre-dos-sites` e publicada no projeto
> Vercel `gabriella-cardoso-site`. Este código (Next.js) é a **versão anterior**: continua intacto e
> funcionando em https://site-gabriella-lyart.vercel.app, e serve de plano de volta.
> **Um push na `main` daqui não muda o site do domínio.**
>
> - Como o site no ar é feito, publicado e revertido: `~/AI/sites-melhorados/gabriellapcardoso-com-br/COMO-PUBLICAR.md`
> - Infraestrutura, DNS e histórico: [`.claude/CLAUDE.md`](.claude/CLAUDE.md)

**URL do site no ar**: https://gabriellapcardoso.com.br
**URL desta versão (Next.js)**: https://site-gabriella-lyart.vercel.app

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

Deploy automático via Vercel ao fazer push na branch `main` — **atualiza só `site-gabriella-lyart.vercel.app`**
(o domínio foi movido para o projeto `gabriella-cardoso-site` em 2026-11-14).

DNS gerenciado pela Vercel (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`). Para alterar registros DNS, use `npx vercel dns` ou o painel da Vercel — não edite via Hostinger.

Documentação completa de infraestrutura e DNS em `.claude/CLAUDE.md`.
