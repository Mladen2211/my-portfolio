#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Copy .env.example to .env and fill in your secrets."
  exit 1
fi

echo "Pulling latest changes..."
git pull origin main

echo "Building and starting containers..."
docker compose up --build -d

echo "Waiting for Strapi to become healthy..."
timeout=120
elapsed=0
while [ $elapsed -lt $timeout ]; do
  if docker compose exec strapi wget --quiet --tries=1 --spider http://localhost:1337/_health 2>/dev/null; then
    echo "Strapi is healthy."
    break
  fi
  sleep 5
  elapsed=$((elapsed + 5))
done

if [ $elapsed -ge $timeout ]; then
  echo "WARNING: Strapi did not become healthy within ${timeout}s. Check logs:"
  echo "  docker compose logs strapi"
fi

echo ""
echo "Deployment complete!"
echo "  Frontend: http://localhost:3000"
echo "  Strapi:   http://localhost:1337/admin"
echo ""
echo "To view logs: docker compose logs -f"
echo "To stop:      docker compose down"
