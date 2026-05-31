# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server on port 3000
bun build        # Production build
bun test         # Run tests with Vitest
bun lint         # ESLint
bun typecheck    # TypeScript type check (no emit)
bun format       # Prettier write
bun check        # Prettier check (no write)
```

## Project Constraints (Hard Rules)

1. **Frontend only.** Do not build, scaffold, or design a backend. No API servers, no databases, no auth services, no background workers. The entire deliverable is a presentable mockup that runs in the browser.
2. **Mock data only.** All data is sourced from typed in-repo fixtures (e.g. `src/mocks/*.ts`). Loading states, empty states, error states, and async UX are simulated with timers if needed. Never wire to a real API.
3. **shadcn/ui is the only design system.** Use components from `src/components/ui/`. Do not create new component primitives. If a need cannot be met by composing existing shadcn primitives, raise it as a PRD change before reaching for a custom component.
4. **No em dashes in any output.** Use commas, colons, semicolons, periods, or parentheses. This applies to product copy, documentation, comments, commit messages, and PRDs. `--` is also banned.
5. **Copywriting follows `/marketing-skills:copywriting`.** Specific over vague, active over passive, clear over clever, no marketing buzzwords without substance.
6. **IA and UX quality is enforced via `/impeccable`.** Honor the shared design laws: OKLCH color, hierarchy via scale and weight contrast, no side-stripe borders, no gradient text, no glassmorphism by default, no hero-metric template, no identical card grids, no modal-as-first-thought.

## Architecture

**Stack**: TanStack Start (SSR meta-framework) + TanStack Router (file-based) + React 19 + TypeScript 6 + Tailwind CSS 4 + shadcn/ui (Base UI primitives).

**Routing**: File-based routing in `src/routes/`. `__root.tsx` is the HTML shell. `routeTree.gen.ts` is auto-generated; never edit it manually. Add new routes by creating files in `src/routes/`.

**Components**: `src/components/ui/` holds shadcn components built on Base UI + CVA variants. Use `cn()` from `src/lib/utils.ts` for class merging throughout (combines `clsx` + `tailwind-merge`).

**Styling**: Global styles and design tokens (OKLCH color space, CSS custom properties, light/dark theme) live in `src/styles.css`. Tailwind 4 with the engine plugin is configured in `vite.config.ts`. Prettier sorts Tailwind classes automatically via `cn()` and `cva()` function detection.

**Path alias**: `@/*` resolves to `./src/*`.

**Package manager**: Bun (see `bun.lock`).

**Icons**: `@hugeicons/react`, configured in `components.json` as the shadcn icon library.
