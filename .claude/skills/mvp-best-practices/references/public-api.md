<!-- @mp-sentinel-generated generatorVersion=3.1.0 sourceIndexSchema=1.5 sourceIndexHash=9346fd0627574794 agent=claude projectName=mvp generationConfigHash=a470c6e5696b89bd -->
## Public API Surface

### Risk Surface

| Risk Type | Count |
|---|---|
| default-export | 3 |
| hub-file | 5 |

### Risk Details

- **default-export**: `eslint.config.mjs` - Default export - harder to tree-shake
- **default-export**: `next.config.ts` - Default export - harder to tree-shake
- **default-export**: `postcss.config.mjs` - Default export - harder to tree-shake
- **hub-file**: `src/components/ui/button.tsx` (7 importers) - Imported by 7 file(s) - high blast radius
- **hub-file**: `src/content/site.ts` (10 importers) - Imported by 10 file(s) - high blast radius
- **hub-file**: `src/lib/gsap.ts` (6 importers) - Imported by 6 file(s) - high blast radius
- **hub-file**: `src/lib/use-reveal.ts` (5 importers) - Imported by 5 file(s) - high blast radius
- **hub-file**: `src/lib/utils.ts` (8 importers) - Imported by 8 file(s) - high blast radius