# Reads PROD_URL, PROD_USERNAME and PROD_PASSWORD from .env (git ignores it).
set dotenv-load := true

# Sync ranking items and weigh-ins with the live site in both directions: the most recently changed copy wins, nothing is deleted. Pass --dry-run to preview, --prefer local or remote to settle ties.
sync-prod *args:
    node scripts/sync-to-production.mjs {{args}}

# Recount lines and re-score code quality for every project, then save them in the local database. Run sync-prod afterwards to push them live.
refresh-local-line-quality:
    node scripts/line-quality-sync.ts --write-db
