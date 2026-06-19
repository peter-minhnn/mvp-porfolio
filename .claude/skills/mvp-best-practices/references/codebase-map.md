<!-- @mp-sentinel-generated generatorVersion=3.1.0 sourceIndexSchema=1.5 sourceIndexHash=9346fd0627574794 agent=claude projectName=mvp generationConfigHash=a470c6e5696b89bd -->
## Codebase Map

### Module Ownership

#### `src/components/` - unknown (11 source / 0 test files)
- Key files: `src/components/hero-canvas.tsx`, `src/components/selected-work.tsx`, `src/components/hero.tsx`, `src/components/cv-section.tsx` (+1 more)
- Key symbols: `Vec3` (type), `ScatterProps` (type), `Scatter` (function), `Slab` (function), `Rule` (function), `Rig` (function)
- Imports from: `src/components/ui/`, `src/content/`, `src/lib/`
- Imported by: `src/app/`

#### `src/components/ui/` - unknown (6 source / 0 test files)
- Key files: `src/components/ui/sheet.tsx`, `src/components/ui/dialog.tsx`, `src/components/ui/tooltip.tsx`, `src/components/ui/badge.tsx` (+1 more)
- Key symbols: `Sheet` (function), `SheetTrigger` (function), `SheetClose` (function), `SheetPortal` (function), `SheetOverlay` (function), `SheetContent` (function)
- Imports from: `src/lib/`
- Imported by: `src/components/`

#### `(root)/` - config (3 source / 0 test files)

#### `src/lib/` - unknown (3 source / 0 test files)
- Key files: `src/lib/use-reveal.ts`, `src/lib/utils.ts`
- Key symbols: `useReveal` (function), `cn` (function)
- Imported by: `src/components/`, `src/components/ui/`

#### `src/app/` - unknown (2 source / 0 test files)
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`
- Key symbols: `RootLayout` (function), `Home` (function)
- Imports from: `src/components/`, `src/content/`

#### `src/content/` - type (1 source / 0 test files)
- Key files: `src/content/site.ts`
- Key symbols: `NavLink` (type), `Project` (type), `Capability` (type), `Skill` (type), `Social` (type)
- Imported by: `src/app/`, `src/components/`

### Entrypoints

- **[CFG]** `eslint.config.mjs` - configuration
- **[CFG]** `next.config.ts` - configuration
- **[CFG]** `postcss.config.mjs` - configuration
- **[ROUTE]** `src/app/layout.tsx` - App Router route file
- **[ROUTE]** `src/app/page.tsx` - App Router route file