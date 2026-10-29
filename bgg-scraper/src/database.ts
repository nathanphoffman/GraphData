import { DatabaseSync } from "node:sqlite";
import { Game } from "./types/game";
import { gameKey } from "./records";
import { DAY_MS } from "./utility";

// the same database file the site uses, so the games are there for the site (and for sync-prod) as soon as a run finishes
const DB_PATH = process.env.DB_PATH ?? "../data/graphdata.db";

const db = new DatabaseSync(DB_PATH);

// the same table the site's server/board-games.js makes
db.exec(`
    CREATE TABLE IF NOT EXISTS board_games (
        title TEXT NOT NULL, release_date TEXT NOT NULL, average REAL NOT NULL, weight REAL NOT NULL, num INTEGER NOT NULL, rank INTEGER,
        pulled_at TEXT, updated_at INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (title, release_date)
    )
`);

interface GameRow {
    title: string;
    release_date: string;
    average: number;
    weight: number;
    num: number;
    rank: number | null;
    pulled_at: string | null;
}

export function databaseExists(): boolean {
    return db.prepare("SELECT 1 FROM board_games LIMIT 1").get() !== undefined;
}

// games are stored by title and release year, newer scrapes replace older ones
export function loadDatabase(): Map<string, Game> {
    const rows = db.prepare("SELECT title, release_date, average, weight, num, rank, pulled_at FROM board_games").all() as unknown as GameRow[];
    const games = rows.map((row): Game => ({
        title: row.title,
        average: row.average,
        weight: row.weight,
        num: row.num,
        rank: row.rank,
        releaseDate: row.release_date,
        pulledAt: row.pulled_at ?? undefined,
    }));

    return new Map(games.map((game) => [gameKey(game), game]));
}

// a game's change time only moves when its ratings changed, so sync-prod only sends games that really changed
export function saveDatabase(database: Map<string, Game>): void {
    const upsert = db.prepare(`
        INSERT INTO board_games (title, release_date, average, weight, num, rank, pulled_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT (title, release_date) DO UPDATE SET
            updated_at = CASE WHEN average IS NOT excluded.average OR weight IS NOT excluded.weight OR num IS NOT excluded.num OR rank IS NOT excluded.rank
                THEN excluded.updated_at ELSE updated_at END,
            average = excluded.average, weight = excluded.weight, num = excluded.num, rank = excluded.rank, pulled_at = excluded.pulled_at
    `);
    const now = Date.now();
    const finite = (value: number) => (Number.isFinite(value) ? value : 0);

    db.exec("BEGIN");
    for (const game of database.values()) {
        upsert.run(game.title, game.releaseDate, finite(game.average), finite(game.weight), finite(game.num), game.rank, game.pulledAt ?? null, now);
    }
    db.exec("COMMIT");
}

export function updateDatabase(database: Map<string, Game>, games: Game[]): void {
    const pulledAt = new Date().toISOString().slice(0, 10);
    for (const game of games) {
        database.set(gameKey(game), { ...game, pulledAt });
    }
}

// a year is stale when its least recently pulled game is older than maxAgeDays, the stalest year comes first
export function getStaleYears(database: Map<string, Game>, maxAgeDays: number): number[] {
    const oldestPull = new Map<number, number>();
    for (const game of database.values()) {
        if (!/^\d{4}$/.test(game.releaseDate)) continue;
        const year = Number(game.releaseDate);
        const pulled = game.pulledAt ? Date.parse(game.pulledAt) : 0;
        oldestPull.set(year, Math.min(oldestPull.get(year) ?? Infinity, pulled));
    }

    return [...oldestPull.entries()]
        .filter(([, pulled]) => Date.now() - pulled > maxAgeDays * DAY_MS)
        .sort((a, b) => a[1] - b[1])
        .map(([year]) => year);
}
