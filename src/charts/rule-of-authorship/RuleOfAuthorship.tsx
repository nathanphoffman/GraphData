import data from "../../../data/rule-of-authorship.json";
import type { Owner, RuleOfAuthorshipData, Segment } from "./types";
import { OWNER_LABELS } from "./style";

const model = data as RuleOfAuthorshipData;

function Inline({ parts }: { parts: Segment[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.owner) {
          return (
            <span key={i} className={`auth-tag auth-owner-${part.owner}`}>
              {part.text}
            </span>
          );
        }
        return part.strong ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>;
      })}
    </>
  );
}

function Pill({ owner, children }: { owner: Owner; children: string }) {
  return <span className={`auth-pill auth-owner-${owner}`}>{children}</span>;
}

export default function RuleOfAuthorship() {
  return (
    <div className="authorship">
      <div className="auth-masthead">
        <div className="auth-kicker">
          <span>{model.kicker[0]}</span>
          <span>{model.kicker[1]}</span>
        </div>
        <p className="auth-headline">{model.title}</p>
        <p className="auth-subhead">{model.subhead}</p>
      </div>

      <div className="auth-case-strip">
        {model.caseStrip.map((item, i) => (
          <span key={i}>
            <Inline parts={item} />
          </span>
        ))}
      </div>

      <div className="auth-caveat">
        <Inline parts={model.caveat} />
      </div>

      <div className="auth-legend">
        {(Object.keys(OWNER_LABELS) as Owner[]).map((owner) => (
          <Pill key={owner} owner={owner}>
            {OWNER_LABELS[owner]}
          </Pill>
        ))}
      </div>

      <h2>Verdict at a glance</h2>
      <div className="auth-table-wrap">
        <table className="auth-summary">
          <thead>
            <tr>
              <th>Rule / element</th>
              <th>Leans toward</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {model.summary.map((row) => (
              <tr key={row.element}>
                <td>{row.element}</td>
                <td>
                  <Inline parts={row.leans} />
                </td>
                <td>{row.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {model.sections.map((section) => (
        <section key={section.number}>
          <h2>
            <span>{section.number}</span> &nbsp;{section.title}
          </h2>
          {section.rules.map((rule) => (
            <div key={rule.name} className={`auth-rule auth-owner-${rule.owner}`}>
              <div className="auth-rule-head">
                <span className="auth-rule-name">{rule.name}</span>
                <Pill owner={rule.owner}>{rule.label}</Pill>
              </div>
              <p className="auth-verdict">{rule.verdict}</p>
              {rule.body?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              {rule.exhibits?.map((exhibit) => (
                <div key={exhibit.cite} className="auth-exhibit">
                  <span className="auth-cite">{exhibit.cite}</span> — {exhibit.text}
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}

      <h2>Bottom line</h2>
      <div className="auth-rule auth-rule-neutral">
        <p>
          <Inline parts={model.bottomLine} />
        </p>
      </div>

      <footer className="auth-footer">{model.footer}</footer>
    </div>
  );
}
