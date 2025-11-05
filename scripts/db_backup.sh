#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"
BACKUP_DIR="$PROJECT_ROOT/data/backups"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
OUT_FILE="${1:-$BACKUP_DIR/artworks-$TIMESTAMP.sql}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env file at $ENV_FILE" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"

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

TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT

ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "cd '$REMOTE_PROJECT_ROOT' && docker compose exec -T db sh -c \"MYSQL_PWD='$DATABASE_ROOT_PASSWORD' mariadb-dump -u root '$DATABASE_NAME'\"" > "$TMP_FILE"

mv "$TMP_FILE" "$OUT_FILE"
echo "Database backup saved to $OUT_FILE"
