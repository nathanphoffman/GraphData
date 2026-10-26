import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

const DB_PATH = process.env.DB_PATH ?? "data/graphdata.db";

mkdirSync(dirname(DB_PATH), { recursive: true });

/** The one SQLite database every feature keeps its tables in. */
export const db = new DatabaseSync(DB_PATH);
