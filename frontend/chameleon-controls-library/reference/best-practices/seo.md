# SEO best practices

## Critical content

- Keep critical content (headings, meta, main copy) in static HTML when possible
- Use proper heading hierarchy (`h1`, `h2`, etc.) in the page structure
- Ensure meta tags (title, description, og:*) are set correctly per page

## Markdown and dynamic content

- **ch-markdown-viewer** — Renders markdown on the client. For SEO, ensure the raw markdown or a server-rendered HTML version is available for crawlers (e.g. via SSR or prerendering)
- Use `ch-markdown-viewer` for user-generated or dynamic content; consider server-side rendering for public pages that must be indexed

## Server-side rendering

- Next.js, Angular SSR, and Stencil can prerender or server-render pages. Use them for public pages that need SEO
- Chameleon components may require hydration; ensure the loader is imported and `defineCustomElements` runs before the app renders

## Semantic HTML

- Use semantic elements (`main`, `nav`, `article`, `section`) around Chameleon components
- Ensure links and buttons have descriptive text or `aria-label` for screen readers and crawlers
