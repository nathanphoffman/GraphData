# Reads PROD_URL, PROD_USERNAME and PROD_PASSWORD from .env (git ignores it).
set dotenv-load := true

# Sync ranking items and weigh-ins with the live site in both directions: the most recently changed copy wins, nothing is deleted. Pass --dry-run to preview, --prefer local or remote to settle ties.
sync-prod *args:
    node scripts/sync-to-production.mjs {{args}}
