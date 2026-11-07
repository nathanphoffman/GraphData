import { useState } from "react";
import { callApi } from "../../../api";
import type { BestWeight, OwnedGame } from "../model/types";

/** Asks the server which weight puts the games you own highest, and keeps the answer until `clear` is called. */
export function useBestWeight(games: OwnedGame[]) {
  const [found, setFound] = useState<BestWeight | null>(null);
  const [finding, setFinding] = useState(false);
  const [error, setError] = useState("");

  const find = async () => {
    setFinding(true);
    setError("");

    try {
      setFound(await callApi<BestWeight>("/api/board-games/best-weight", "POST", { games }));
    } catch (problem) {
      setError((problem as Error).message);
    } finally {
      setFinding(false);
    }
  };

  return { found, finding, error, find, clear: () => setFound(null) };
}
