# Repository Index

Last updated: 2026-03-01

## Top-Level Structure

| Path | Purpose |
| --- | --- |
| `frontend/` | Next.js App Router site for the public artist portfolio. |
| `backend/` | Express + TypeScript API service (currently minimal scaffold). |
| `data/` | SQL seed and DB backups. |
| `docs/` | Product, design, planning, and architecture documentation. |
| `scripts/` | Operational scripts for sync, deploy, DB push, and DB backup. |
| `artwoks/` | Source media/library folders for artwork assets (large content tree). |
| `docker-compose.yml` | Development stack (frontend, backend, MariaDB, phpMyAdmin). |
| `docker-compose.prod.yml` | Production compose stack (frontend, backend, MariaDB). |

## Frontend (`frontend/`)

### Runtime and Config

| Path | Notes |
| --- | --- |
| `frontend/package.json` | Next.js `14.2.5`, React `18`, Tailwind `3`. |
| `frontend/next.config.js` | Next.js config. |
| `frontend/tailwind.config.ts` | Tailwind theme/config. |
| `frontend/postcss.config.js` | PostCSS setup. |
| `frontend/app/globals.css` | Global styles and design tokens. |

### App Routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `frontend/app/page.tsx` | Home page with hero, featured works, and CTA to gallery. |
| `/gallery` | `frontend/app/gallery/page.tsx` | Client-side gallery with search/filtering, pagination, and lightbox. |
| `/artwork/[id]` | `frontend/app/artwork/[id]/page.tsx` | Artwork detail page (currently static mock data). |
| `/about` | `frontend/app/about/page.tsx` | Artist bio, statement, and profile sections. |
| `/contact` | `frontend/app/contact/page.tsx` | Client-side validated contact form (simulated submit). |
| Layout | `frontend/app/layout.tsx` | Global metadata, navigation, and skip-link/main wrapper. |

### Shared Components and Hooks

| Path | Responsibility |
| --- | --- |
| `frontend/components/Navigation.tsx` | Top nav, mobile menu, and search UI with route push to `/gallery?search=...`. |
| `frontend/components/ArtworkImage.tsx` | Artwork image resolver and optimized rendering with loading/error states. |
| `frontend/components/Lightbox.tsx` | Fullscreen artwork modal with keyboard and prev/next navigation. |
| `frontend/components/SkeletonLoader.tsx` | Placeholder loaders for gallery/card/text/image states. |
| `frontend/components/Toast.tsx` | Toast UI plus `useToast` helper hook. |
| `frontend/hooks/useScrollAnimation.ts` | IntersectionObserver animation trigger and parallax utility. |

## Backend (`backend/`)

### Runtime and Config

| Path | Notes |
| --- | --- |
| `backend/package.json` | Express `5.1`, Prisma `6.18`, TypeScript backend scripts. |
| `backend/tsconfig.json` | TypeScript compiler config. |
| `backend/prisma/schema.prisma` | Prisma datasource/client config (MySQL). |
| `backend/Dockerfile` | Backend production container build. |

### API Entry Points

| Path | Responsibility |
| --- | --- |
| `backend/src/server.ts` | Boots Express app on `PORT` (default `8000`). |
| `backend/src/app.ts` | Middleware + basic endpoints: `GET /v1/health`, `GET /`. |

## Infrastructure and Operations

| Path | Purpose |
| --- | --- |
| `docker-compose.yml` | Dev containers: frontend (`3002->3000`), backend (`5001->8000`), MariaDB, phpMyAdmin. |
| `docker-compose.prod.yml` | Production-oriented compose with built images and MariaDB volume. |
| `.github/workflows/*` | CI/CD workflow that builds images and deploys to remote server via SSH. |

### Scripts (`scripts/`)

| Script | Purpose |
| --- | --- |
| `scripts/sync.sh` | Rsync frontend/backend or single files to remote host using `.env` SSH settings. |
| `scripts/deploy.sh` | Remote `docker compose` start/restart controls and optional backend migration command. |
| `scripts/db_push.sh` | Push local SQL dump into remote MariaDB container. |
| `scripts/db_backup.sh` | Pull DB dump from remote MariaDB into `data/backups/`. |

## Data

| Path | Notes |
| --- | --- |
| `data/artworks.sql` | Seed/structure SQL source. |
| `data/backups/` | Local backup output destination. |

## Documentation (`docs/`)

| Path | Purpose |
| --- | --- |
| `docs/ProjectArchitecture.md` | Working architecture and operational notes. |
| `docs/ProjectGoals.md` | Product goals and outcomes. |
| `docs/Tasklist.md` | Task tracking list. |
| `docs/Project/completed_tasks.md` | Completed work log. |
| `docs/Planning/website_design_proposal.md` | Design planning/proposal content. |
| `docs/Design/*` | Design reviews, guidelines, and evaluation reports. |
| `docs/Mockups/*` | Mockup content for individual pages. |
| `docs/Overview/README.md` | High-level project summary. |

## Current Gaps to Keep in Mind

- Backend API is scaffold-level and not yet wired to artwork/contact business logic.
- Several frontend sections still use static arrays/mock data instead of backend-fed content.
- Artwork detail route (`/artwork/[id]`) currently displays hardcoded placeholder content.
