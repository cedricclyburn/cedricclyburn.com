# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 15 personal portfolio site** using the App Router, deployed on Vercel. It uses MDX for articles, Tailwind CSS for styling, and TypeScript throughout.

### Key conventions

**Articles** live at `src/app/articles/<slug>/page.mdx`. Each MDX file must export:
- `article` — metadata object with `title`, `description`, `author`, `date`
- `metadata` — Next.js metadata for SEO
- A default export wrapping children in `<ArticleLayout article={article} />`

Article images live in the same directory as their `page.mdx` and are imported directly in the MDX file.

`src/lib/articles.ts` uses `fast-glob` to discover all `*/page.mdx` files under `src/app/articles/` and dynamically imports them to build the articles list.

**Path aliases**: `@/` maps to `src/` (configured in `tsconfig.json`).

**Dark mode**: handled by `next-themes` via `src/app/providers.tsx`. Use Tailwind's `dark:` variant for dark-mode styles.

**SEO/structured data**: JSON-LD is injected inline in `src/app/layout.tsx` (site-wide Person schema) and per-article in `ArticleLayout.tsx`.

**RSS feed**: generated at `src/app/feed.xml/route.ts` as a Next.js Route Handler.

**Sitemap/robots**: `src/app/sitemap.ts` and `src/app/robots.ts` use Next.js metadata file conventions.

### Site structure

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/articles` | `src/app/articles/page.tsx` |
| `/articles/<slug>` | `src/app/articles/<slug>/page.mdx` |
| `/projects` | `src/app/projects/page.tsx` |
| `/speaking` | `src/app/speaking/page.tsx` |
| `/uses` | `src/app/uses/page.tsx` |

### Adding a new article

1. Create `src/app/articles/<slug>/` directory
2. Add `page.mdx` with the required `article` export, `metadata` export, and default export
3. Place any images in the same directory and import them in the MDX

### Environment variables

`NEXT_PUBLIC_SITE_URL` — defaults to `https://cedricclyburn.com`; set in your `.env.local` for local development if needed.
