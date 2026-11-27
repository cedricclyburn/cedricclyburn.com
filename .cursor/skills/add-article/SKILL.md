---
name: add-article
description: >-
  Adds a published article to this site as src/app/articles/<slug>/page.mdx.
  Use when the user asks to add an article or blog post, or when the source is
  a developers.redhat.com page, a redhat.com post, or a Google Doc.
---

# Add an article

Next.js 16. Each article is `src/app/articles/<slug>/page.mdx`. `src/lib/articles.ts` discovers `*/page.mdx` with fast-glob. There is no manual registry. Home (`slice(0, 2)`), `/articles`, the RSS feed, and the sitemap all read that file.

Copy the page shape and the image pattern from `src/app/articles/vllm-vs-sglang/page.mdx`, not the stock Spotlight template.

Leave these alone:

- Visible site copy in CLAUDE.md "Copy that stays", and existing article bodies
- The removed `/nvidia` route. The sitemap must not list `/nvidia`. New articles are listed because `getAllArticles()` reads `page.mdx`
- Do not commit or push unless the user asks

## 1. Decide it belongs

Add a full article whose byline date is 2024 or later.

Leave it out when it is:

- "Why standardization is the key to agentic AI success"
- an interactive demo
- dated before 2024, unless the user asks for that article

Done when you have the slug to create, or you have stopped without a page.

## 2. Get the prose

Use the author's full text. If the source page has no full text, stop and ask for the Google Doc. Do not invent the body.

`developers.redhat.com` often returns Akamai 403 to curl. Stop after one failure; do not hammer it. A browser fetch can work. `redhat.com` blog HTML is usable. The author list is `https://www.redhat.com/rhdc/jsonapi/solr_search/blog_author_list` with `fq=post_author_nids:"800081"`.

Done when the full prose is in hand, or you have asked for the Google Doc and stopped.

## 3. Clean the prose

Strip Workfront boilerplate, "Editor to provide", and track-changes doubled words. Keep the author's prose. Do not rewrite the body for SEO.

Done when every remaining sentence is the author's.

## 4. Set the byline

`article.date` is the byline date, `YYYY-MM-DD`. A `developers.redhat.com` URL date can differ by a day. The vLLM vs SGLang URL is `2026-10-15`; the byline and `src/app/articles/vllm-vs-sglang/page.mdx` use `2026-10-14`. Prefer the byline.

`author` is `Cedric Clyburn` unless the page lists coauthors. Example: `Cedric Clyburn and James Harmison`.

Copy the published title and summary. The prose follows the default export.

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: 'Cedric Clyburn',
  date: 'YYYY-MM-DD',
  title: 'Published title',
  description: 'Published summary',
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />
```

Done when `date` and `author` match the byline.

## 5. Add real images

Save each published figure beside `page.mdx` as `figure-1.webp`, `figure-2.png`, and so on, keeping the real extension. Import it and use the published alt text and caption:

```mdx
import figure1 from './figure-1.webp'

<Image src={figure1} alt={"Published alt text."} />

*Figure 1: Published caption.*
```

`<Image>` comes from `mdx-components.tsx`. Do not import `next/image` in the MDX. If you do not have the file, ask for it. Do not invent an image.

Done when the article has no figures, or every `src={figureN}` import points at a file in that directory.

## 6. Finish

The article is added when `page.mdx` exports `article`, `metadata`, and the `ArticleLayout` default, the byline fields match the source, the body is the author's prose, and every image import resolves.
