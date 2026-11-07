import type { Owner, Segment } from "../types";

/** Text with some parts coloured by who owns the idea. */
export function Inline({ parts }: { parts: Segment[] }) {
  return (
    <>
      {/* Plain text stays as is; parts with an owner get a coloured label. */}
      {parts.map((part, index) => {
        if (part.owner) {
          return (
            <span key={index} className={`auth-tag auth-owner-${part.owner}`}>
              {part.text}
            </span>
          );
        }

        return part.strong ? <strong key={index}>{part.text}</strong> : <span key={index}>{part.text}</span>;
      })}
    </>
  );
}

/** Coloured label for an owner. */
export function Pill({ owner, children }: { owner: Owner; children: string }) {
  return <span className={`auth-pill auth-owner-${owner}`}>{children}</span>;
}
