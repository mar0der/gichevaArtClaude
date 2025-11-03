#!/usr/bin/env bash
set -euo pipefail

declare -a TARGETS=()
declare -a FILES=()

usage() {
  cat <<'EOF'
Usage: sync.sh [options]

Sync selected project folders to the remote server using rsync.

Options:
  --frontend            Sync the frontend folder only
  --backend             Sync the backend folder only
  --all                 Sync both frontend and backend (default if no target given)
  -f, --file <path>     Sync a specific file relative to the project root
  --dry-run             Show rsync changes without copying files
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

rsync_component() {
  local component="$1"
  local source_dir="$2"
  shift 2
  local excludes=("$@")

  if [[ ! -d "$source_dir" ]]; then
    echo "Skip $component: local path '$source_dir' does not exist."
    return
  fi

  local destination="$SSH_USER@$SSH_HOST:$REMOTE_PROJECT_ROOT/$component/"
  local opts=(-az --progress --delete)
  if [[ "$DRY_RUN" == true ]]; then
    opts+=(--dry-run --itemize-changes)
  fi

  opts+=("${excludes[@]}" "$source_dir/" "$destination")

  echo "Syncing $component -> $destination"
  ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "mkdir -p \"$REMOTE_PROJECT_ROOT/$component\""
  rsync -e "ssh -p $SSH_PORT" "${opts[@]}"
}

# --- Script start ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env file at $ENV_FILE. Aborting." >&2
  exit 1
fi

TARGETS=()
DRY_RUN=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --frontend) add_target "frontend"; shift ;;
    --backend) add_target "backend"; shift ;;
    --all) TARGETS=("frontend" "backend"); shift ;;
    -f|--file)
      if [[ $# -lt 2 ]]; then
        echo "Error: --file requires a path argument." >&2
        exit 1
      fi
      FILES+=("$2")
      shift 2
      ;;
    --dry-run) DRY_RUN=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

if [[ ${#TARGETS[@]} -eq 0 && ${#FILES[@]} -eq 0 ]]; then
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

FRONTEND_EXCLUDES=(--exclude 'node_modules' --exclude '.next' --exclude '.turbo' --exclude '.DS_Store')
BACKEND_EXCLUDES=(--exclude 'node_modules' --exclude 'dist' --exclude '.DS_Store')

if [[ ${#TARGETS[@]} -gt 0 ]]; then
  for target in "${TARGETS[@]}"; do
    case "$target" in
      frontend)
        rsync_component "frontend" "$PROJECT_ROOT/frontend" "${FRONTEND_EXCLUDES[@]}"
        ;;
      backend)
        rsync_component "backend" "$PROJECT_ROOT/backend" "${BACKEND_EXCLUDES[@]}"
        ;;
      *)
        echo "Unknown target: $target" >&2
        exit 1
        ;;
    esac
  done
fi

sync_file() {
  local rel_path="$1"
  rel_path="${rel_path#./}"
  if [[ -z "$rel_path" ]]; then
    echo "Skip file: empty path provided." >&2
    return
  fi

  local source="$PROJECT_ROOT/$rel_path"
  if [[ ! -f "$source" ]]; then
    echo "Skip file: '$rel_path' does not exist locally." >&2
    return
  fi

  local rel_dir
  rel_dir=$(dirname "$rel_path")
  local remote_dir="$REMOTE_PROJECT_ROOT"
  if [[ "$rel_dir" != "." ]]; then
    remote_dir="$REMOTE_PROJECT_ROOT/$rel_dir"
  fi

  echo "Syncing file $rel_path -> $SSH_USER@$SSH_HOST:$remote_dir/"
  ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "mkdir -p \"$remote_dir\""

  local destination="$SSH_USER@$SSH_HOST:$REMOTE_PROJECT_ROOT/$rel_path"
  local opts=(-az --progress)
  if [[ "$DRY_RUN" == true ]]; then
    opts+=(--dry-run --itemize-changes)
  fi

  rsync -e "ssh -p $SSH_PORT" "${opts[@]}" "$source" "$destination"
}

if [[ ${#FILES[@]} -gt 0 ]]; then
  for file_path in "${FILES[@]}"; do
    sync_file "$file_path"
  done
fi
