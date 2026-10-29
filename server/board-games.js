import { existsSync, readFileSync } from "node:fs";
import { requireUser } from "./auth.js";
import { CUSTOM_GAMES, findBestWeight, rankGames } from "./board-game-scoring.js";
import { db } from "./db.js";
import { HttpError, readJson, readStamp, sendJson } from "./http.js";

// Games scraped from BoardGameGeek by bgg-scraper, which writes this table itself. The JSON file is the seed (and a backup in git) for a new database.
const SEED_PATH = "data/board-games/games.json";
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 100;
const MAX_PREFERENCE = 5;
const MAX_TEXT = 200;
const MAX_BULK_GAMES = 1000;
const MAX_BULK_BYTES = 2_000_000;
const MAX_OWNED_GAMES = 200;
const MAX_OWNED_BYTES = 100_000;

db.exec(`
  CREATE TABLE IF NOT EXISTS board_games (
    title TEXT NOT NULL, release_date TEXT NOT NULL, average REAL NOT NULL, weight REAL NOT NULL, num INTEGER NOT NULL, rank INTEGER,
    pulled_at TEXT, updated_at INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (title, release_date)
  );
`);

/** On a brand new database, load the games from the JSON file. */
function seed() {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM board_games").get();
  if (count > 0 || !existsSync(SEED_PATH)) return;

  const games = Object.values(JSON.parse(readFileSync(SEED_PATH, "utf8")));
  const insert = db.prepare("INSERT INTO board_games (title, release_date, average, weight, num, rank, pulled_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  db.exec("BEGIN");
  for (const game of games) insert.run(game.title, game.releaseDate, game.average, game.weight, game.num, game.rank, game.pulledAt ?? null, 0);
  db.exec("COMMIT");
  console.log(`Seeded ${games.length} board games from ${SEED_PATH}`);
}

seed();

const rowToGame = (row) => ({ title: row.title, releaseDate: row.release_date, average: row.average, weight: row.weight, num: row.num, rank: row.rank });

/** One page of the games ranked for a weight preference. Positions are in the whole list, so a search keeps each game's real place. */
function getPage(query) {
  const preference = Number(query.get("preference") ?? 0);
  const page = Number(query.get("page") ?? 1);
  const pageSize = Number(query.get("pageSize") ?? DEFAULT_PAGE_SIZE);
  const search = (query.get("search") ?? "").trim().toLowerCase();
  const year = (query.get("year") ?? "").trim();

  if (!(preference >= 0 && preference <= MAX_PREFERENCE)) throw new HttpError(400, `preference must be from 0 to ${MAX_PREFERENCE}`);
  if (!Number.isInteger(page) || page < 1) throw new HttpError(400, "page must be 1 or more");
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > MAX_PAGE_SIZE) throw new HttpError(400, `pageSize must be from 1 to ${MAX_PAGE_SIZE}`);

  const games = [...db.prepare("SELECT title, release_date, average, weight, num, rank FROM board_games").all().map(rowToGame), ...CUSTOM_GAMES];
  const ranked = rankGames(games, preference).map((game, index) => ({ ...game, position: index + 1 }));
  const matching = ranked.filter((game) => game.title.toLowerCase().includes(search) && (year === "" || game.releaseDate === year));

  return { preference, page, pageSize, total: matching.length, games: matching.slice((page - 1) * pageSize, page * pageSize) };
}

/** Check one game sent by the sync script. */
function checkGame(game) {
  const isCount = (value) => Number.isInteger(value) && value >= 0;
  const isText = (value) => typeof value === "string" && value.length <= MAX_TEXT;
  const valid = game && isText(game.title) && game.title !== "" && isText(game.releaseDate)
    && Number.isFinite(game.average) && Number.isFinite(game.weight) && isCount(game.num)
    && (game.rank === null || isCount(game.rank)) && (game.pulledAt === null || isText(game.pulledAt));
  if (!valid) throw new HttpError(400, `Not a valid board game: ${JSON.stringify(game)?.slice(0, 100)}`);
}

export const boardGameRoutes = [
  {
    method: "GET",
    path: "/api/board-games",
    handler: (request, response) => sendJson(response, 200, getPage(new URL(request.url, "http://localhost").searchParams)),
  },
  // Which weight preference puts the sent games (title and releaseDate each) highest in the list. Nothing is saved.
  {
    method: "POST",
    path: "/api/board-games/best-weight",
    handler: async (request, response) => {
      const { games: owned } = await readJson(request, MAX_OWNED_BYTES);
      const valid = Array.isArray(owned) && owned.length > 0 && owned.length <= MAX_OWNED_GAMES
        && owned.every((game) => typeof game?.title === "string" && typeof game.releaseDate === "string");
      if (!valid) throw new HttpError(400, `Send a list of 1 to ${MAX_OWNED_GAMES} games, each with a title and releaseDate`);

      const games = [...db.prepare("SELECT title, release_date, average, weight, num, rank FROM board_games").all().map(rowToGame), ...CUSTOM_GAMES];
      sendJson(response, 200, findBestWeight(games, owned));
    },
  },
  // Every game with its change time, for the sync script.
  {
    method: "GET",
    path: "/api/board-games/export",
    handler: (request, response) => {
      requireUser(request);
      const rows = db.prepare("SELECT title, release_date, average, weight, num, rank, pulled_at, updated_at FROM board_games").all();
      sendJson(response, 200, { games: rows.map((row) => ({ ...rowToGame(row), pulledAt: row.pulled_at, updatedAt: row.updated_at })) });
    },
  },
  // Adds or changes up to MAX_BULK_GAMES games at once, each keeping the change time it is sent with.
  {
    method: "PUT",
    path: "/api/board-games/bulk",
    handler: async (request, response) => {
      requireUser(request);
      const { games } = await readJson(request, MAX_BULK_BYTES);
      if (!Array.isArray(games) || games.length > MAX_BULK_GAMES) throw new HttpError(400, `Send a list of up to ${MAX_BULK_GAMES} games`);
      games.forEach(checkGame);

      const upsert = db.prepare(`
        INSERT OR REPLACE INTO board_games (title, release_date, average, weight, num, rank, pulled_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      db.exec("BEGIN");
      for (const game of games) upsert.run(game.title, game.releaseDate, game.average, game.weight, game.num, game.rank, game.pulledAt, readStamp(game.updatedAt));
      db.exec("COMMIT");
      sendJson(response, 200, { saved: games.length });
    },
  },
];
