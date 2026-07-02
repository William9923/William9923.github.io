# Plan: Build William Ong's Personal Hugo Site

## Goal
Build a minimal, Mitchell Hashimoto-style personal site using Hugo and the hugo-bearblog theme.

## Target structure
- `/` — About page (bio, experience, social links)
- `/blog/` — Writing list
- `/:slug/` — Individual blog posts
- `/misc/` — Misc page

## Tech stack
- **Generator**: Hugo v0.163.3
- **Theme**: [hugo-bearblog](https://github.com/janraasch/hugo-bearblog)
- **Package manager**: mise (for Hugo version pinning)
- **Hosting**: Vercel (static `public/` build)

## Step-by-step plan

### Phase 1: Foundation
Install Hugo, scaffold the site, add the theme, create base config.

1. `mise use hugo@0.163.3`
2. `hugo new site . --force`
3. `git init` and rename branch to `main`
4. `git submodule add https://github.com/janraasch/hugo-bearblog.git themes/hugo-bearblog`
5. Create `hugo.toml`, `.gitignore`

**Verification**:
```bash
hugo version
hugo server -D
# Expected: server starts at localhost:1313 with no errors
```

### Phase 2: Navigation + URL structure
Set up Mitchell-style nav: About, Writing, Misc.

1. Add manual `[[menu.main]]` entries in `hugo.toml`
2. Configure permalinks: `blog = "/:slug/"`
3. Create `content/blog/_index.md`

**Verification**:
```bash
hugo server -D
# Expected: header shows "About | Writing | Misc"
```

### Phase 3: About page (home)
Make the homepage the About page.

1. Create `content/_index.md` with name, intro, experience placeholder, and social links
2. Update `hugo.toml` metadata

**Verification**:
```bash
hugo server -D
# Expected: / shows About page with LinkedIn and GitHub links
```

### Phase 4: Blog/Writing section
Confirm posts render correctly with dates.

1. Create sample post `content/blog/hello-world.md`
2. Verify list and single page

**Verification**:
```bash
hugo server -D
# Expected: /blog/ lists post; /hello-world/ shows post content
```

### Phase 5: Misc page
Add placeholder Misc page.

1. Create `content/misc.md`

**Verification**:
```bash
hugo server -D
# Expected: /misc/ loads and appears in nav
```

### Phase 6: Content migration guide
Document how to add past articles.

1. Create `README.md` with front matter template and migration instructions
2. Include Vercel deployment notes

**Verification**:
```bash
hugo server -D
# Expected: user can create a new .md file and see it listed
```

### Phase 7: Production build + Vercel config
Make the static site build cleanly and prepare for Vercel.

1. Add `vercel.json`
2. Run `hugo --minify`
3. Inspect `public/` output

**Verification**:
```bash
hugo --minify
# Expected: no errors; public/ contains index.html, blog/, misc/
```

## Notes
- Keep the theme as a git submodule for easy updates.
- The theme shows a harmless `.Site.LanguageCode` deprecation warning; it does not affect output.
- Delete `content/blog/hello-world.md` when adding real articles.
