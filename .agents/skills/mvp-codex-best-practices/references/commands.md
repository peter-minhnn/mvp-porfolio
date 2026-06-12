<!-- @mp-sentinel-generated generatorVersion=3.0.0 sourceIndexSchema=1.5 sourceIndexHash=8f3b09313014889d agent=codex projectName=mvp generationConfigHash=a470c6e5696b89bd -->
## Project Profile: react-next

### Commands

Package manager: `pnpm`

```sh
pnpm run build  # next build
pnpm run check  # biome check --write
pnpm run check:ci  # biome ci
pnpm run dev  # next dev
pnpm run format  # biome format --write
pnpm run format:check  # biome format
pnpm run lint  # biome lint --write
pnpm run lint:check  # biome lint
pnpm run mp-sentinel  # npx mp-sentinel create-skills --force
pnpm run start  # next start
```

### Module Ownership

Modules and their responsibilities:

- `src/components/` - 11 source file(s)
- `src/components/ui/` - 6 source file(s)
- `(root)/` - 3 source file(s)
- `src/lib/` - 3 source file(s)
- `src/app/` - 2 source file(s)
- `src/content/` - 1 source file(s)

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