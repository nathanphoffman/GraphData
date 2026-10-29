# bgg-scraper

Scrapes BoardGameGeek's game list (with its weights) into the site's database. The Board Games page re-ranks those games by weight preference.

## Running it

From the project root:

```
just scrape-bgg          # first run (or --full) fetches everything, later runs only last year's and this year's games
just refresh-bgg         # re-fetches any year whose oldest game was pulled more than 90 days ago, one year at a time
just sync-prod           # sends the new and changed games to the live site
```

The first time, `cd bgg-scraper && npm install` and put your bgg username in `bgg-scraper/.env` (see `.env.example`).

Games are saved in the `board_games` table of `data/graphdata.db`, the same database the site uses. A brand new database is filled from `data/board-games/games.json` the first time the server starts, so start the server once before scraping or the first run will fetch everything. BGG pages are cached in `cache/` so only pages that aren't cached are fetched (recent-year pages are re-fetched after a day).

Titles to leave out are in `src/config.ts`. The ranking itself (weight preferences, scoring, the games added by hand) lives in `server/board-game-scoring.js`.
