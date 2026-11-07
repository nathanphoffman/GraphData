import type { RuleOfAuthorshipData } from "../types";
import { Inline } from "./TextPieces";

/** The title block at the top: kicker, headline and subhead, then the strip of short examples under it. */
export default function Masthead({ model }: { model: RuleOfAuthorshipData }) {
  return (
    <>
      <div className="auth-masthead">
        <div className="auth-kicker">
          <span>{model.kicker[0]}</span>
          <span>{model.kicker[1]}</span>
        </div>
        <p className="auth-headline">{model.title}</p>
        <p className="auth-subhead">{model.subhead}</p>
      </div>
      <div className="auth-case-strip">
        {/* One example per item in the strip. */}
        {model.caseStrip.map((item, index) => (
          <span key={index}>
            <Inline parts={item} />
          </span>
        ))}
      </div>
    </>
  );
}
