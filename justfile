# Reads PROD_URL, PROD_USERNAME and PROD_PASSWORD from .env (git ignores it).
set dotenv-load := true

# Sync ranking items and weigh-ins with the live site in both directions: the most recently changed copy wins, nothing is deleted. Pass --dry-run to preview, --prefer local or remote to settle ties.
sync-prod *args:
    node scripts/sync-to-production.mjs {{args}}

# Recount lines and re-score code quality for every project, then save them in the local database. Run sync-prod afterwards to push them live.
refresh-local-line-quality:
    node scripts/line-quality-sync.ts --write-db

# Rewrite the ranking and weight-journey JSON files from the local database and the live site (the newer copy of each item or weigh-in wins), as a backup in git. Pass --local-only to skip the live site.
backup-json *args:
    node scripts/backup-to-json.mjs {{args}}

# Scrape new and recent board games from BoardGameGeek into the local database (the first run, or --full, scrapes everything). Run sync-prod afterwards to push them live.
scrape-bgg *args:
    cd bgg-scraper && npm start -- {{args}}

# Re-scrape any board game year that has not been pulled in 90 days, one year at a time.
refresh-bgg:
    cd bgg-scraper && npm run refresh

# Send fake RalphLoops reports to the local server (localhost only) so the /ralph-loops page has something to show.
fake-ralph *args:
    node scripts/ralph-fake-reports.mjs {{args}}
