interface Props {
  page: number;
  lastPage: number;
  total: number;
  onPage: (page: number) => void;
}

/** Previous and Next buttons with the current page and the total number of games. */
export default function Pagination({ page, lastPage, total, onPage }: Props) {
  return (
    <div className="board-games-pages">
      <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} of {lastPage.toLocaleString()} ({total.toLocaleString()} games)
      </span>
      <button type="button" disabled={page >= lastPage} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
