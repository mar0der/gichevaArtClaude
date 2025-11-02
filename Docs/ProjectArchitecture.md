Always question the user's decision if they don't sound right!!!

## Target Stack
- Frontend: existing Next.js/React UI continued and expanded for production, styled with Tailwind CSS plus shared global design tokens (Playfair Display and Inter font pairing, animation utilities).
- Backend: new Node.js + Express service written in TypeScript with Prisma ORM (current backend directory cleared and ready for rebuild).
- Database: dedicated MariaDB/MySQL instance managed via Docker for persistent art data.

## Container Layout
- Single `docker-compose.yml` orchestrates the Next.js frontend, Express API, MariaDB, and phpMyAdmin.
- Node services mount source folders and launch `npm run dev` (`next dev` / `ts-node-dev`) so code changes appear after a quick restart; no image rebuild needed.
- Services share an internal network; only Nginx on the host exposes public ports to the internet.

- Live environment hosted on the `fivecams.com` server within `/var/www/gichevaart/`.
- Public domain `https://www.gichevaart.com` is reachable today, served by Nginx (Let’s Encrypt TLS) proxying the Next.js frontend (`curl` returns HTTP/2 200 via nginx/1.24.0).
- Nginx reverse proxy (already configured with Let’s Encrypt certificates) routes HTTPS traffic to the Dockerized stack.
- Development and verification happen directly on the server by syncing code and running the dev-mode Docker stack—no CI pipeline between commits and deploys.

## Configuration & Secrets
- All sensitive values (database URL, API keys, mail creds) live in the project root `.env` on this workstation and sync to the server as needed.
- Prisma database connection targets the MariaDB container; migrations run from the backend service.

- Dont youse migrations. Modify db directly and macke a backup of the strcture and data before that. use mysql dump.

## Environment & Access Summary
- Primary server: `fivecams.com` (`78.47.123.191`) reachable via SSH as `root`.
- Project root on server: `/var/www/gichevaart/`; local working copy: `/Users/petarpetkov/Developer/GicehvaArt/`.
- Active compose file: `/var/www/gichevaart/docker-compose.yml` (dev-mode stack mirroring production services).
- Deployment flow: develop locally, sync via `scripts/sync.sh`, and let its automatic restart run the containers in `npm run dev` mode.
- HTTPS managed by Nginx + Let’s Encrypt on the host; certificates already provisioned for `www.gichevaart.com`.
- Keep the root `.env` synced to `/var/www/gichevaart/.env` so Docker has current secrets and URLs.

## Environment Variables (.env Template)
- `.env` at the repo root (gitignored) captures all secrets and operational config.
- Key entries:
  - SSH access details (`SSH_HOST`, `SSH_USER`, `SSH_PORT`, `SERVER_IP`, path variables).
  - Application ports and public URLs (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`).
  - Database credentials (`DATABASE_ROOT_PASSWORD`, `DATABASE_URL`, individual host/user/password variables for Prisma/MariaDB).
  - Auth/session secrets (`JWT_SECRET`, `SESSION_SECRET`, expiry values).
  - Email delivery (`MAIL_*` SMTP settings) and social handles for surfaced content.
  - Admin tooling (`PMA_PORT`) and backup settings (`BACKUP_BUCKET`, `BACKUP_RETENTION_DAYS`).
- Replace each `replace_me` placeholder locally; never commit actual secrets.

## Operations Scripts
- `scripts/sync.sh [--frontend|--backend|--all] [--dry-run]` rsyncs source folders to the server; containers stay running in dev-watch mode and pick up changes automatically.
- `scripts/deploy.sh [--frontend|--backend|--db|--phpmyadmin] [--start|--restart] [--migrate]` handles manual remote `docker compose` actions whenever restarts or migrations are required.

## Reference Versions (checked 2025-11-01)
- Node.js 24.11.0 LTS “Krypton” – https://nodejs.org/en/download
- Next.js 16.0.1 – https://nextjs.org/docs
- React 19.2.0 – https://react.dev/learn
- Express 5.1.0 – https://expressjs.com/
- TypeScript 5.9.3 – https://www.typescriptlang.org/docs/
- Prisma 6.18.0 – https://www.prisma.io/docs/
- Tailwind CSS 4.1.16 – https://tailwindcss.com/docs
- MariaDB 11.8 LTS – https://mariadb.com/kb/en/
