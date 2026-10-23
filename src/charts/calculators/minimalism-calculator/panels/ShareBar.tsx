import { useState } from "react";
import { ITEM_TYPES } from "../logic/items";

interface Props {
  title: string;
  onTitle: (v: string) => void;
  typeId: string;
  onType: (v: string) => void;
  shareParams: () => Record<string, string>;
}

/** Title, what you're minimizing, and a button that copies a link with every setting in it. */
export default function ShareBar({ title, onTitle, typeId, onType, shareParams }: Props) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?${new URLSearchParams(shareParams())}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn("Clipboard copy failed, falling back to prompt", error);
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div className="panel mini-sharebar">
      <div>
        <label htmlFor="mini-title">Title (optional)</label>
        <input id="mini-title" type="text" maxLength={80} placeholder="e.g. Jack Smith's Board Games" value={title} onChange={(e) => onTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="mini-type">What are you minimizing?</label>
        <select id="mini-type" value={typeId} onChange={(e) => onType(e.target.value)}>
          {ITEM_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <button type="button" onClick={copyLink}>
        {copied ? "Copied!" : "Copy share link"}
      </button>
    </div>
  );
}
