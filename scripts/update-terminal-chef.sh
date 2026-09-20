#!/usr/bin/env bash
# Refresh the vendored copy of the Terminal Chef game source.
#
#   scripts/update-terminal-chef.sh [git-ref]
#
# Downloads terminal_chef/*.py from TaydenWhite/terminal-chef at the given ref
# (default: the default branch's latest commit), pins the commit in
# data/terminal_chef.yaml, and leaves the browser adapter alone.
set -euo pipefail

REPO="TaydenWhite/terminal-chef"
REF="${1:-HEAD}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/assets/games/terminal-chef/terminal_chef"

command -v gh >/dev/null || { echo "This script needs the GitHub CLI (gh)." >&2; exit 1; }

SHA=$(gh api "repos/$REPO/commits/$REF" --jq .sha)
DATE=$(gh api "repos/$REPO/commits/$SHA" --jq '.commit.author.date[:10]')

echo "Vendoring $REPO@${SHA:0:7} ($DATE)"
mkdir -p "$DEST"
rm -f "$DEST"/*.py

gh api "repos/$REPO/contents/terminal_chef?ref=$SHA" --jq '.[] | select(.name | endswith(".py")) | .name' |
  while read -r name; do
    gh api "repos/$REPO/contents/terminal_chef/$name?ref=$SHA" --jq .content | base64 -d > "$DEST/$name"
    echo "  $name"
  done

cat > "$ROOT/data/terminal_chef.yaml" <<EOF
# Written by scripts/update-terminal-chef.sh. Do not edit by hand.
repo: https://github.com/$REPO
commit: $SHA
short: ${SHA:0:7}
date: "$DATE"
EOF

echo "Pinned in data/terminal_chef.yaml. Rebuild and test /projects/terminal-chef/ before pushing."
