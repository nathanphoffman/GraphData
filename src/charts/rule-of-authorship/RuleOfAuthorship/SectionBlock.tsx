import type { Rule, Section } from "../types";
import { Pill } from "./TextPieces";

/** One rule: its name, who owns it, the verdict, any extra paragraphs and the quoted examples. */
function RuleBlock({ rule }: { rule: Rule }) {
  return (
    <div className={`auth-rule auth-owner-${rule.owner}`}>
      <div className="auth-rule-head">
        <span className="auth-rule-name">{rule.name}</span>
        <Pill owner={rule.owner}>{rule.label}</Pill>
      </div>
      <p className="auth-verdict">{rule.verdict}</p>
      {rule.body?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {/* One quoted example per rule. */}
      {rule.exhibits?.map((exhibit) => (
        <div key={exhibit.cite} className="auth-exhibit">
          <span className="auth-cite">{exhibit.cite}</span> — {exhibit.text}
        </div>
      ))}
    </div>
  );
}

/** One numbered section, with a block for each of its rules. */
export default function SectionBlock({ section }: { section: Section }) {
  return (
    <section>
      <h2>
        <span>{section.number}</span> &nbsp;{section.title}
      </h2>
      {/* One block per rule, coloured by who owns it. */}
      {section.rules.map((rule) => (
        <RuleBlock key={rule.name} rule={rule} />
      ))}
    </section>
  );
}
