import { useEffect, useState } from "react";
import { callApi } from "../../../api";
import { time } from "../model/timeline";
import type { Loop } from "../model/types";

/** Lists the files the loop sent; clicking one shows its newest copy (loaded again whenever the loop sends a newer one). */
export default function Files({ loop }: { loop: Loop }) {
  const [name, setName] = useState<string>();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const selected = loop.files.find((file) => file.name === name);

  useEffect(() => {
    if (!selected) return;
    callApi<{ content: string }>(
      `/api/ralph/files/${encodeURIComponent(loop.name)}/${encodeURIComponent(selected.name)}`,
    )
      .then((data) => {
        setContent(data.content);
        setError("");
      })
      .catch((problem: Error) => setError(problem.message));
  }, [loop.name, selected?.name, selected?.updatedAt]);

  if (!loop.files.length)

    return <p className="muted">The loop has not sent any files yet. It sends them when a round starts.</p>;

  return (
    <>
      <div className="ralph-filters">
        {loop.files.map((file) => (
          <button key={file.name} type="button" aria-pressed={file.name === name} onClick={() => setName(file.name)}>
            {file.name}
          </button>
        ))}

      </div>
      {selected && <p className="muted">Sent {time(selected.updatedAt)}</p>}
      {error ? <p>Could not load the file: {error}</p> : selected && <pre className="ralph-file">{content}</pre>}
    </>
  );
}
