import data from "../../../../data/misc/rule-of-authorship.json";
import "./styles.css";
import type { Owner, RuleOfAuthorshipData, Segment } from "./types";
import { OWNER_LABELS } from "./style";

const model = data as RuleOfAuthorshipData;

/** Text with some parts coloured by who owns the idea. */
function Inline({ parts }: { parts: Segment[] }) {
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
function Pill({ owner, children }: { owner: Owner; children: string }) {
  return <span className={`auth-pill auth-owner-${owner}`}>{children}</span>;
}

/** Rule of authorship page: the rules, who owns each one and the examples. */
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
        {/* One example per item in the strip. */}
        {model.caseStrip.map((item, index) => (
          <span key={index}>
            <Inline parts={item} />
          </span>
        ))}
      </div>

      <div className="auth-caveat">
        <Inline parts={model.caveat} />
      </div>

      <div className="auth-legend">
        {/* One colour key per kind of owner. */}
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
            {/* One summary row per rule element. */}
            {model.summary.map((summaryRow) => (
              <tr key={summaryRow.element}>
                <td>{summaryRow.element}</td>
                <td>
                  <Inline parts={summaryRow.leans} />
                </td>
                <td>{summaryRow.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>OD&amp;D-era products, credit by credit</h2>
      <div className="auth-table-wrap">
        <table className="auth-summary">
          <thead>
            <tr>
              <th>Product</th>
              <th>Credited to</th>
              <th>What it added</th>
            </tr>
          </thead>
          <tbody>
            {/* One row per product that was checked against the rules. */}
            {model.products.map((product) => (
              <tr key={product.title}>
                <td>
                  {product.title} <span>({product.year})</span>
                </td>
                <td>
                  <Inline parts={product.credits} />
                </td>
                <td>{product.added}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* One block per section of the rules. */}
      {model.sections.map((section) => (
        <section key={section.number}>
          <h2>
            <span>{section.number}</span> &nbsp;{section.title}
          </h2>
          {/* One block per rule, coloured by who owns it. */}
          {section.rules.map((rule) => (
            <div key={rule.name} className={`auth-rule auth-owner-${rule.owner}`}>
              <div className="auth-rule-head">
                <span className="auth-rule-name">{rule.name}</span>
                <Pill owner={rule.owner}>{rule.label}</Pill>
              </div>
              <p className="auth-verdict">{rule.verdict}</p>
              {rule.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

              {/* One quoted example per rule. */}
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
