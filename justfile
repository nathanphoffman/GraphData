# Reads PROD_URL, PROD_USERNAME and PROD_PASSWORD from .env (git ignores it).
set dotenv-load := true

# Copy local ranking items and weigh-ins to the live site: matches are overwritten, new rows added, nothing deleted. Pass --dry-run to preview.
sync-prod *args:
    node scripts/sync-to-production.mjs {{args}}
