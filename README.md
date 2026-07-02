# William Ong — Personal Site

Built with [Hugo](https://gohugo.io/) and the [hugo-bearblog](https://github.com/janraasch/hugo-bearblog) theme.

## Local development

```bash
hugo server -D
```

Then open http://localhost:1313.

## Adding content

### New blog post

```bash
hugo new content blog/YYYY-MM-DD-my-post-slug.md
```

### Front matter template

```toml
+++
title = 'Post Title'
date = '2024-01-15'
slug = 'optional-custom-slug'
+++
```

- `slug` is optional. If omitted, Hugo uses the filename.
- Posts use the permalink `/[:slug]/` (configured in `hugo.toml`).

### Migrating existing content

| Source | Approach |
|--------|----------|
| **Medium** | Open the article → copy the text → paste into a new `.md` file → clean up formatting and images. Or use a Medium-to-Markdown converter, then review. |
| **Old blog (williamong.netlify.app)** | Scrape or manually copy posts → convert to markdown → preserve original dates in front matter. |
| **LinkedIn posts** | Treat short posts as brief blog entries, or collect a few into a single "Notes" post under Misc. |

### Sample post

`content/blog/hello-world.md` exists as a verification placeholder. Replace or delete it when adding real articles.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Set the environment variable `HUGO_VERSION` to `0.163.3` in Vercel project settings.
4. Vercel will run `hugo --minify` and serve the `public/` directory.

The included `vercel.json` pins the build command explicitly.
