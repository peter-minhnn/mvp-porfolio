<!-- @mp-sentinel-generated generatorVersion=3.0.0 sourceIndexSchema=1.5 sourceIndexHash=8f3b09313014889d agent=codex projectName=mvp generationConfigHash=a470c6e5696b89bd -->
## Language Patterns

Auto-detected language patterns and framework rules for this codebase. Agents should respect these when writing or reviewing code.

## Language Distribution

| Language | File Count | Share |
|---|---|---|
| tsx | 19 | 73.1% |
| typescript | 5 | 19.2% |
| javascript | 2 | 7.7% |

## Framework & Language Rules

### Built-in Policies


### React

Applies to: `**/*.tsx`, `**/*.jsx`

- **MUST**: Follow the Rules of Hooks: only call hooks at the top level of a component or custom hook, never inside conditions, loops, or callbacks.
- **AVOID**: Do NOT fetch data directly in render. Use `useEffect`, React Query, SWR, or a framework data loader (Next.js, Remix).
- **MUST**: Add a stable `key` prop to all elements inside `.map()` or `.filter()` render loops. Use a unique ID, not the array index.
- **SHOULD**: Prefer function components with hooks over class components for new code.
- **SHOULD**: Extract reusable logic into custom hooks rather than duplicating `useEffect` / `useState` patterns.
- **AVOID**: Do NOT mutate state directly -- always use the setter from `useState` or produce new objects/arrays.
- **SHOULD**: Use `React.memo` sparingly and only after profiling. Premature memoization can increase memory pressure.

### Next.js

Applies to: `**/*.tsx`, `**/*.jsx`, `src/app/**/*`, `pages/**/*`

- **MUST**: Use `'use client'` and `'use server'` directives correctly. Client components cannot import server-only modules (Node fs, direct DB access, etc.).
- **SHOULD**: Prefer Server Components by default. Only add `'use client'` when interactivity (hooks, event handlers, browser APIs) is required.
- **MUST**: Use route segment config (`export const dynamic = 'force-static'`, etc.) at the top of page/layout files for fine-grained caching control.
- **SHOULD**: Use `next/image` for image optimization instead of `<img>` tags.
- **SHOULD**: Colocate data fetching close to consuming components. Avoid prop-drilling data through more than 2 layers.
- **AVOID**: Do NOT import large client-side libraries in Server Components that re-export them -- this can bloat the client bundle.

### TypeScript (Strict)

Applies to: `**/*.ts`, `**/*.tsx`, `**/*.mts`, `**/*.cts`

- **AVOID**: Do NOT use `any` type. If unavoidable (e.g., untyped third-party types), isolate with a `// eslint-disable-next-line` and a comment explaining why.
- **MUST**: Respect all strict `tsconfig.json` flags enabled in this project (see Code Conventions for the exact list).
- **SHOULD**: Prefer `interface` over `type` for object shapes that may be extended. Use `type` for unions, intersections, and mapped types.
- **SHOULD**: Use `const` assertions (`as const`) for literal types and tuple inference.
- **AVOID**: Do NOT use `namespace` or `module` declarations -- use ES module imports/exports instead.
