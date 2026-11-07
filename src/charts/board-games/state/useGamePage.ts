import { useEffect, useState } from "react";
import { callApi } from "../../../api";
import { PAGE_SIZE } from "../model/constants";
import type { OwnedGame, Page } from "../model/types";

interface Query {
  preference: number;
  search: string;
  page: number;
  minYear: number;

  /** When set, only these games are shown (all on one page); otherwise the whole list is paged. */
  mineToShow: OwnedGame[] | null;
}

/** One page of games from the server, asked for again whenever the query changes. An older answer arriving late is ignored. */
export function useGamePage({ preference, search, page, minYear, mineToShow }: Query) {
  const [data, setData] = useState<Page | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let current = true;
    const query = new URLSearchParams({
      preference: String(preference),
      page: String(page),
      pageSize: String(PAGE_SIZE),
      search,
      minYear: String(minYear),
    });

    // My games are all shown on one page, so they come from their own call.
    const request = mineToShow
      ? mineToShow.length === 0
        ? Promise.resolve<Page>({ total: 0, games: [] })
        : callApi<Page>("/api/board-games/mine", "POST", { games: mineToShow, preference, search, minYear })
      : callApi<Page>(`/api/board-games?${query}`);

    request
      .then((result) => {
        if (!current) return;

        setData(result);
        setError(false);
      })
      .catch(() => current && setError(true));

    return () => {
      current = false;
    };
  }, [preference, search, page, minYear, mineToShow]);

  return { data, error };
}
