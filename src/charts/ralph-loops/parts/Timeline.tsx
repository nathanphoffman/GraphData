import { role, time } from "../model/timeline";
import type { Entry } from "../model/types";

/** Log lines and commits, newest first. */
export default function Timeline({ entries }: { entries: Entry[] }) {
  if (!entries.length) return <p className="muted">Nothing here yet.</p>;

  return (
    <ul className="ralph-timeline">
      {entries.map((entry, index) => (
        <li key={`${entry.at}-${index}`} className={entry.commit ? "ralph-commit" : undefined}>
          <span className="ralph-time">{time(entry.at)}</span>
          <span className={`ralph-source ralph-${role(entry.source)}`}>{entry.source}</span>
          <span className="ralph-text">
            {entry.commit ? (
              <>
                <code>{entry.commit.sha.slice(0, 7)}</code> {entry.text}{" "}
                <span className="ralph-added">+{entry.commit.added}</span>{" "}
                <span className="ralph-removed">−{entry.commit.removed}</span>{" "}
                <span className="muted">
                  {entry.commit.files} {entry.commit.files === 1 ? "file" : "files"}
                </span>
              </>
            ) : (
              entry.text
            )}

          </span>
        </li>
      ))}

    </ul>
  );
}
