#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

GHCR_USER="mladen2211"

if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Copy .env.example to .env and fill in your secrets."
  exit 1
fi

echo "=== Portfolio Deployment ==="

if ! docker info > /dev/null 2>&1; then
  echo "ERROR: Docker is not running."
  exit 1
fi

echo ""
echo "Authenticating with GitHub Container Registry..."
if [ ! -f ~/.docker/config.json ] || ! grep -q "ghcr.io" ~/.docker/config.json 2>/dev/null; then
  echo "You need to log in to GHCR. Create a Personal Access Token at:"
  echo "  https://github.com/settings/tokens/new?scopes=read:packages"
  echo ""
  read -rp "Enter your GitHub PAT: " GHCR_TOKEN
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
fi

echo ""
echo "Pulling latest images..."
docker compose pull

echo ""
echo "Starting services..."
docker compose up -d

echo ""
echo "Waiting for Strapi to become healthy..."
timeout=180
elapsed=0
while [ $elapsed -lt $timeout ]; do
  if docker compose exec strapi wget --quiet --tries=1 --spider http://localhost:1337/_health 2>/dev/null; then
    echo "Strapi is healthy."
    break
  fi
  sleep 5
  elapsed=$((elapsed + 5))
  printf "."
done
echo ""

if [ $elapsed -ge $timeout ]; then
  echo "WARNING: Strapi did not become healthy within ${timeout}s."
  echo "  Check logs: docker compose logs strapi"
fi

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "  Portfolio:  http://localhost:8080  →  https://mraguz.me"
echo "  Strapi:     http://localhost:8082  →  https://strapi.mraguz.me"
echo "  Watchtower: running (polls every 5 min)"
echo ""
echo "Watchtower will auto-deploy new images on every push to main."
echo ""
echo "Useful commands:"
echo "  docker compose logs -f          # View all logs"
echo "  docker compose logs -f strapi   # Strapi logs only"
echo "  docker compose ps               # Service status"
echo "  docker compose down             # Stop all"
echo "  docker compose down -v          # Stop + delete volumes (DATA LOSS)"
