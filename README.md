# My Portfolio

Full-stack portfolio site built with **Next.js 16** (frontend) and **Strapi v5** (backend CMS).  
Auto-deploys via GitHub Actions + Watchtower.

## Architecture

```
frontend/   → Next.js 16, TypeScript, Tailwind CSS, App Router
backend/    → Strapi v5, SQLite, auto-seeded content
.github/    → CI/CD pipeline (build → GHCR → Watchtower auto-pull)
```

| Service    | Domain              | Port |
|------------|---------------------|------|
| Portfolio  | mraguz.me           | 8080 |
| Strapi CMS | strapi.mraguz.me   | 8082 |

## Local Development

### Prerequisites

- Node.js 20+
- npm 9+

### Backend (Strapi)

```bash
cd backend
cp .env.example .env
npm install
npm run develop
```

Admin credentials (auto-seeded): `admin@portfolio.local` / `Admin1234!`

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Deployment (NUC / Self-Hosted)

### How it works

1. Push to `main` → GitHub Actions builds Docker images → pushes to GHCR
2. Watchtower on your NUC polls GHCR every 5 minutes
3. New images detected → containers auto-restart with zero downtime

### Prerequisites

- Docker & Docker Compose
- A GitHub Personal Access Token with `read:packages` scope

### First-time setup

```bash
git clone https://github.com/Mladen2211/my-portfolio.git
cd my-portfolio

cp .env.example .env
# Edit .env — generate real secrets:
#   openssl rand -base64 32

chmod +x deploy.sh
./deploy.sh
```

The deploy script will prompt for your GitHub PAT to authenticate with GHCR.

### Reverse Proxy (Caddy)

```
mraguz.me {
    reverse_proxy localhost:8080
}

strapi.mraguz.me {
    reverse_proxy localhost:8082
}
```

### Data Persistence

All data survives container restarts and redeployments:

| Volume          | Contents                    |
|-----------------|-----------------------------|
| strapi-data     | SQLite database             |
| strapi-uploads  | Media uploads               |

Containers use `restart: unless-stopped` — they auto-start on server reboot.

### Backup

```bash
docker compose exec strapi cp /data/data.db /data/backup.db
docker cp $(docker compose ps -q strapi):/data/backup.db ./backup.db
```

### Useful commands

```bash
docker compose ps               # Service status
docker compose logs -f          # All logs
docker compose logs -f strapi   # Strapi logs
docker compose pull             # Pull latest images manually
docker compose up -d            # Restart with latest
docker compose down             # Stop all
docker compose down -v          # Stop + DELETE ALL DATA
```
