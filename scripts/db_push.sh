#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"
SQL_FILE="${1:-$PROJECT_ROOT/data/artworks.sql}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env file at $ENV_FILE" >&2
  exit 1
fi

if [[ ! -f "$SQL_FILE" ]]; then
  echo "SQL file not found: $SQL_FILE" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${DATABASE_ROOT_PASSWORD:?DATABASE_ROOT_PASSWORD not set in .env}"
: "${DATABASE_NAME:?DATABASE_NAME not set in .env}"
: "${SSH_HOST:?SSH_HOST not set in .env}"
: "${SSH_USER:?SSH_USER not set in .env}"
: "${REMOTE_PROJECT_ROOT:?REMOTE_PROJECT_ROOT not set in .env}"

SSH_PORT="${SSH_PORT:-22}"

echo "Seeding '$DATABASE_NAME' on $SSH_HOST using $SQL_FILE"

ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "cd '$REMOTE_PROJECT_ROOT' && docker compose exec -T db sh -c \"MYSQL_PWD='$DATABASE_ROOT_PASSWORD' mariadb -u root '$DATABASE_NAME'\"" < "$SQL_FILE"

echo "Database seed complete."
