# My Portfolio

Full-stack portfolio site built with **Next.js 16** (frontend) and **Strapi v5** (backend CMS).

## Architecture

```
frontend/   → Next.js 16, TypeScript, Tailwind CSS, App Router
backend/    → Strapi v5, SQLite, auto-seeded content
```

## Local Development

### Prerequisites

- Node.js 20+
- npm 9+

### Backend (Strapi)

```bash
cd backend
cp .env.example .env   # or use the existing .env
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

## Production Deployment (Docker)

### Prerequisites

- Docker & Docker Compose
- Git

### Deploy to NUC / self-hosted server

```bash
# 1. Clone the repo
git clone https://github.com/Mladen2211/my-portfolio.git
cd my-portfolio

# 2. Create your environment file
cp .env.example .env
# Edit .env — generate real secrets for APP_KEYS, JWT_SECRET, etc.

# 3. Deploy
chmod +x deploy.sh
./deploy.sh
```

### Generating secrets

```bash
# Generate a random base64 secret
openssl rand -base64 32
```

### Ports

| Service  | Port |
|----------|------|
| Frontend | 3000 |
| Strapi   | 1337 |

### Reverse Proxy (Nginx / Caddy)

Point your domain to port `3000`. Example Caddy config:

```
mladenraguz.com {
    reverse_proxy localhost:3000
}
```

If you need Strapi admin access externally, also proxy port `1337` on a subdomain:

```
cms.mladenraguz.com {
    reverse_proxy localhost:1337
}
```

### Useful commands

```bash
docker compose logs -f          # View logs
docker compose down             # Stop
docker compose up --build -d    # Rebuild & restart
docker compose exec strapi sh   # Shell into Strapi container
```

### Data persistence

- **SQLite database**: stored in Docker volume `strapi-data`
- **Uploads**: stored in Docker volume `strapi-uploads`

To backup:

```bash
docker compose exec strapi cp /data/data.db /data/backup.db
docker cp $(docker compose ps -q strapi):/data/backup.db ./backup.db
```
