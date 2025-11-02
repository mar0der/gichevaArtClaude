#!/usr/bin/env bash
set -euo pipefail

declare -a TARGETS=()

usage() {
  cat <<'EOF'
Usage: deploy.sh [options]

Manage remote Docker services for GichevaArt.

Options:
  --frontend        Target the frontend service
  --backend         Target the backend service
  --db              Target the database service
  --phpmyadmin      Target the phpMyAdmin service
  --all             Target all services (default: frontend + backend)
  --start           Run 'docker compose up -d' for the targets
  --restart         Run 'docker compose restart' for the targets (default)
  --force-recreate  Use '--force-recreate' with 'up -d' (start mode only)
  --migrate         After handling backend, run 'npm run migrate:deploy'
  -h, --help        Show this help message
EOF
}

add_target() {
  local value="$1"
  for existing in "${TARGETS[@]+"${TARGETS[@]}"}"; do
    if [[ "$existing" == "$value" ]]; then
      return
    fi
  done
  TARGETS+=("$value")
}

run_remote() {
  local script="$1"
  ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "bash -s" <<EOF
set -euo pipefail
cd "$REMOTE_PROJECT_ROOT"
$script
EOF
}

build_start_cmd() {
  local service="$1"
  local cmd="docker compose up -d"
  if [[ "$FORCE_RECREATE" == true ]]; then
    cmd+=" --force-recreate"
  fi
  cmd+=" $service"
  echo "$cmd"
}

build_restart_cmd() {
  local service="$1"
  echo "docker compose restart $service"
}

# --- Script start ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env file at $ENV_FILE. Aborting." >&2
  exit 1
fi

ACTION="restart"
FORCE_RECREATE=false
RUN_MIGRATE=false
TARGETS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --frontend) add_target "frontend"; shift ;;
    --backend) add_target "backend"; shift ;;
    --db) add_target "db"; shift ;;
    --phpmyadmin) add_target "phpmyadmin"; shift ;;
    --all) TARGETS=("frontend" "backend" "db" "phpmyadmin"); shift ;;
    --start) ACTION="start"; shift ;;
    --restart) ACTION="restart"; shift ;;
    --force-recreate) FORCE_RECREATE=true; shift ;;
    --migrate) RUN_MIGRATE=true; add_target "backend"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

if [[ ${#TARGETS[@]} -eq 0 ]]; then
  TARGETS=("frontend" "backend")
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${SSH_HOST:?Expected SSH_HOST in .env}"
: "${SSH_USER:?Expected SSH_USER in .env}"
: "${REMOTE_PROJECT_ROOT:?Expected REMOTE_PROJECT_ROOT in .env}"
SSH_PORT="${SSH_PORT:-22}"

SCRIPT_CONTENT=""
for target in "${TARGETS[@]}"; do
  case "$target" in
    frontend|backend|db|phpmyadmin)
      if [[ "$ACTION" == "start" ]]; then
        SCRIPT_CONTENT+=$(build_start_cmd "$target")
      else
        SCRIPT_CONTENT+=$(build_restart_cmd "$target")
      fi
      SCRIPT_CONTENT+=$'\n'
      ;;
    *)
      echo "Unknown target: $target" >&2
      exit 1
      ;;
  esac
done

if [[ "$RUN_MIGRATE" == true ]]; then
  SCRIPT_CONTENT+="docker compose exec -T backend sh -lc 'npm run migrate:deploy'"
  SCRIPT_CONTENT+=$'\n'
fi

if [[ -z "$SCRIPT_CONTENT" ]]; then
  echo "Nothing to do."
  exit 0
fi

echo "Executing remote commands:"
printf '  %s\n' "${SCRIPT_CONTENT%$'\n'}"

run_remote "$SCRIPT_CONTENT"
