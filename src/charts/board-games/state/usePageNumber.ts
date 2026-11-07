import { useState } from "react";

/** The current page number, which goes back to 1 by itself whenever `resetKey` changes (a new search, filter or weight). */
export function usePageNumber(resetKey: string) {
  const [chosen, setChosen] = useState({ resetKey, page: 1 });
  const page = chosen.resetKey === resetKey ? chosen.page : 1;

  return [page, (nextPage: number) => setChosen({ resetKey, page: nextPage })] as const;
}
