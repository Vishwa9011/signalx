# Architecture

This codebase uses a feature-first architecture with clear domain boundaries.

## Top-Level Structure

- `app/`: Next.js App Router routes and route layouts only.
  - `app/(public)/`: Public app routes with shared public layout.
  - `app/(admin)/`: Admin routes with dedicated admin layout.
- `features/`: Domain modules (business logic, feature hooks, feature UI).
- `components/shared/`: Reusable shared UI blocks (layout, loaders, animate-ui wrappers).
- `components/ui/`: `shadcn/ui` primitives and local UI wrappers.
- `assets/`: Reusable imported assets (e.g. Lottie JSON).
- `constants/`: App-wide constants and icon components.
- `lib/`: Shared utility and helper modules.
- `types/`: Shared type definitions.
- `hooks/`: Only generic reusable hooks.
- `public/`: Static assets.

## Feature Boundaries

- `features/market/`
  - On-chain market domain: market API, stores, and market hooks.
- `features/trades/`
  - Trade flows and trade-specific hooks/components.
- `features/admin/`
  - Admin dashboard components and admin hooks.
- `features/leaderboard/`
  - Leaderboard UI and leaderboard hooks.
- `features/web3/`
  - Wallet provider and blockchain read/write/event hooks.

## Dependency Rules

- `app/*` may import from `features/*`, `components/shared/*`, `components/ui/*`, `assets/*`, `constants/*`, `lib/*`, `types/*`, and `hooks/*`.
- A feature may import:
  - itself,
  - `components/shared/*`,
  - `components/ui/*`,
  - `assets/*`, `constants/*`, `lib/*`, `types/*`, `hooks/*`,
  - explicit cross-feature dependencies when needed (e.g. `features/trades` -> `features/market`).
- `assets/constants/lib/types/hooks` must not depend on feature business logic.

## Practical Guidance

- Keep domain state and side effects inside the owning feature.
- Keep top-level `assets/constants/lib/types/hooks` generic and feature-agnostic.
- Place new hooks in the feature that owns the use case.
- Keep routes thin: render feature entry components from `app/*`.
