#!/usr/bin/env bash
set -euo pipefail

# Rebuilds website artwork folders with optimized outputs:
# - fullsize: JPG + WebP
# - thumb: JPG + WebP
#
# Usage:
#   ./scripts/reformat_web_artworks.sh [artworks_base_dir]
#
# Default base:
#   frontend/public/images/artworks

BASE_DIR="${1:-frontend/public/images/artworks}"
FULL_MAX=2200
THUMB_MAX=900
Q_FULL=82
Q_THUMB=74

if [[ ! -d "$BASE_DIR" ]]; then
  echo "Directory not found: $BASE_DIR" >&2
  exit 1
fi

processed_folders=0
skipped_folders=0
processed_images=0
failed_images=0

for slug_dir in "$BASE_DIR"/*; do
  [[ -d "$slug_dir" ]] || continue

  src_dir="$slug_dir/fullsize"
  if [[ ! -d "$src_dir" ]]; then
    skipped_folders=$((skipped_folders + 1))
    continue
  fi

  tmp_dir="$(mktemp -d)"
  mkdir -p "$tmp_dir/fullsize" "$tmp_dir/thumb"

  src_count=0
  idx=1

  while IFS= read -r -d '' src_file; do
    src_count=$((src_count + 1))
    id="$(printf "%03d" "$idx")"

    full_jpg="$tmp_dir/fullsize/$id.jpg"
    thumb_jpg="$tmp_dir/thumb/$id.jpg"

    if ! sips --resampleHeightWidthMax "$FULL_MAX" -s format jpeg -s formatOptions "$Q_FULL" "$src_file" --out "$full_jpg" >/dev/null 2>&1; then
      echo "WARN: failed full convert: $src_file" >&2
      failed_images=$((failed_images + 1))
      idx=$((idx + 1))
      continue
    fi

    if ! sips --resampleHeightWidthMax "$THUMB_MAX" -s format jpeg -s formatOptions "$Q_THUMB" "$src_file" --out "$thumb_jpg" >/dev/null 2>&1; then
      echo "WARN: failed thumb convert: $src_file" >&2
      failed_images=$((failed_images + 1))
      idx=$((idx + 1))
      continue
    fi

    cwebp -quiet -mt -q "$Q_FULL" "$full_jpg" -o "$tmp_dir/fullsize/$id.webp" || true
    cwebp -quiet -mt -q "$Q_THUMB" "$thumb_jpg" -o "$tmp_dir/thumb/$id.webp" || true

    processed_images=$((processed_images + 1))
    idx=$((idx + 1))
  done < <(find "$src_dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.tif' -o -iname '*.tiff' -o -iname '*.heic' \) -print0 | sort -z)

  if [[ "$src_count" -eq 0 ]]; then
    rm -rf "$tmp_dir"
    skipped_folders=$((skipped_folders + 1))
    continue
  fi

  rm -rf "$slug_dir/fullsize" "$slug_dir/thumb"
  mkdir -p "$slug_dir/fullsize" "$slug_dir/thumb"

  if compgen -G "$tmp_dir/fullsize/*" > /dev/null; then
    mv "$tmp_dir/fullsize"/* "$slug_dir/fullsize/"
  fi
  if compgen -G "$tmp_dir/thumb/*" > /dev/null; then
    mv "$tmp_dir/thumb"/* "$slug_dir/thumb/"
  fi

  rm -rf "$tmp_dir"
  processed_folders=$((processed_folders + 1))
done

echo "DONE folders_processed=$processed_folders folders_skipped=$skipped_folders images_processed=$processed_images images_failed=$failed_images"
