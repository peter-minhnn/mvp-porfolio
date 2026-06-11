<!-- @mp-sentinel-generated generatorVersion=3.0.0 sourceIndexSchema=1.5 sourceIndexHash=478518df360ea549 agent=codex projectName=mvp generationConfigHash=a470c6e5696b89bd -->
## Project Profile: react-next

### Commands

Package manager: `pnpm`

```sh
pnpm run build  # next build
pnpm run dev  # next dev
pnpm run lint  # eslint
pnpm run start  # next start
```

### Module Ownership

Modules and their responsibilities:

- `(root)/` - 3 source file(s)
- `src/app/` - 2 source file(s)

### Import Conventions

- Module resolution is `bundler` - do **not** add `.js` extensions to internal imports.
- **Avoid `any`** - if unavoidable, isolate with a comment explaining why.
- Respect the strict `tsconfig.json` flags enabled here: `strict`.
- Respect `tsconfig.json` path aliases - do not bypass with relative traversals.

### Review Pitfalls

- **Server/Client boundary** - avoid server-only imports in client components; use `'use server'` / `'use client'` split.
- **Data fetching colocation** - keep data fetching close to consuming component; avoid prop-drill across >2 layers.
- **No direct DOM mutations** - use refs and effects, never `document.querySelector` outside isolated helpers.
- **Image optimization** - prefer `next/image` over `<img>`.
- **Bundle size vigilance** - new deps in page components can bloat route chunks; audit with `next bundle-analyzer`.