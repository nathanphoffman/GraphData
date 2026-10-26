import { useState } from "react";
import { MAX_TITLE_LENGTH } from "../logic/constants";
import { ITEM_TYPES } from "../logic/items";

/** How long the "Copied" message stays. */
const COPIED_MESSAGE_MS = 2000;

interface Props {
  title: string;
  onTitle: (value: string) => void;
  typeId: string;
  onType: (value: string) => void;
  shareParams: () => Record<string, string>;
}

/** Title, what you're minimizing, and a button that copies a link with every setting in it. */
export default function ShareBar({ title, onTitle, typeId, onType, shareParams }: Props) {
  const [copied, setCopied] = useState(false);

  // Build a share link from the current settings; fall back to a prompt if the clipboard is blocked.
  const copyLink = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?${new URLSearchParams(shareParams())}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MESSAGE_MS);
    } catch (error) {
      console.warn("Clipboard copy failed, falling back to prompt", error);
      window.prompt("Copy this link:", shareUrl);
    }
  };

  return (
    <div className="panel mini-sharebar">
      <div>
        <label htmlFor="mini-title">Title (optional)</label>
        <input id="mini-title" type="text" maxLength={MAX_TITLE_LENGTH} placeholder="e.g. Jack Smith's Board Games" value={title} onChange={(event) => onTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="mini-type">What are you minimizing?</label>
        <select id="mini-type" value={typeId} onChange={(event) => onType(event.target.value)}>
          {/* One dropdown entry per kind of item. */}
          {ITEM_TYPES.map((itemType) => (
            <option key={itemType.id} value={itemType.id}>
              {itemType.name}
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
