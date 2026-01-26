#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-.}"
OUT_DIR="$TARGET/blueprint"
mkdir -p "$OUT_DIR"

OUT="$OUT_DIR/INVENTORY.md"

echo "# Inventory" > "$OUT"
echo "" >> "$OUT"
echo "Root: \`$TARGET\`" >> "$OUT"
echo "" >> "$OUT"

echo "## Tree (depth 5)" >> "$OUT"
echo '```' >> "$OUT"
( command -v tree >/dev/null 2>&1 && tree -L 5 "$TARGET" ) || find "$TARGET" -maxdepth 5 -print
echo '```' >> "$OUT"

echo "" >> "$OUT"
echo "## Key files quick list" >> "$OUT"
echo '```' >> "$OUT"
find "$TARGET" -maxdepth 6 -type f \( \
  -name "README*" -o -name "package.json" -o -name "next.config.*" -o -name "vite.config.*" -o -name "nuxt.config.*" -o \
  -name "tsconfig.json" -o -name ".env.example" -o -name "Dockerfile" -o -name "docker-compose*.yml" -o \
  -name "openapi*.yml" -o -name "swagger*.yml" -o -name "schema.prisma" -o -name "*.sql" \
\) -print | sort >> "$OUT"
echo '```' >> "$OUT"

echo "Wrote $OUT"
