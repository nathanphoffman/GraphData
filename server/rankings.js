import { seedRankings } from "./rankings/seed/seed.js";

export { renameRankingItem } from "./rankings/queries.js";
export { rankingRoutes } from "./rankings/routes.js";

// Create the tables and load the ranking files once, when the server (or the sync script) starts.
seedRankings();
