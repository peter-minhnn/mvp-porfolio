<!-- BEGIN:skills-first-workflow -->
# Required workflow: read ALL skills first

Before doing ANY work on this project, read every relevant skill in full — never skim or skip:

1. **Read all project + global skills fully first.** This includes `.claude/skills/mvp-best-practices/SKILL.md` (mp-sentinel generated), the globally installed **gsap** skill, and any other skill matching this project's tech stack (`react, next.js, typescript, gsap / @gsap/react, @radix-ui/*, tailwind`). When multiple skills are relevant, read and apply them together.
2. **Combine mp-sentinel with the tech-stack skills.** Use mp-sentinel for indexing, health, and per-file context (`pnpm exec mp-sentinel indexing --health --index-format json`, then `--agent-context <file>` before editing), and apply the gsap skill (and any other matched skill) for the actual implementation. They are complementary, not either/or.
3. **Follow the routing table + project rules** in `mvp-best-practices/SKILL.md` — load only the references for the directory being touched, respect the 500-line file limit, Clean Code Policy, and the `.mp-sentinelrc.json` rules.

Project-authored instructions in this file OVERRIDE generated guidance when they conflict.
<!-- END:skills-first-workflow -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
