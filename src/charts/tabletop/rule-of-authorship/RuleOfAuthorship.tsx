import data from "../../../../data/rule-of-authorship/rule-of-authorship.json";
import "./styles.css";
import type { Owner, Product, Rule, RuleOfAuthorshipData, Section, Segment, SummaryRow } from "./types";
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

/** The title block at the top: kicker, headline and subhead. */
function Masthead() {
  return (
    <div className="auth-masthead">
      <div className="auth-kicker">
        <span>{model.kicker[0]}</span>
        <span>{model.kicker[1]}</span>
      </div>
      <p className="auth-headline">{model.title}</p>
      <p className="auth-subhead">{model.subhead}</p>
    </div>
  );
}

/** The strip of short examples under the masthead. */
function CaseStrip() {
  return (
    <div className="auth-case-strip">
      {model.caseStrip.map((item, index) => ( // One example per item in the strip.
        <span key={index}>
          <Inline parts={item} />
        </span>
      ))}

    </div>
  );
}

/** The colour key: one pill for each kind of owner. */
function OwnerLegend() {
  return (
    <div className="auth-legend">
      {(Object.keys(OWNER_LABELS) as Owner[]).map((owner) => ( // One colour key per kind of owner.
        <Pill key={owner} owner={owner}>
          {OWNER_LABELS[owner]}
        </Pill>
      ))}

    </div>
  );
}

/** One row of the verdict table. */
function SummaryTableRow({ row: summaryRow }: { row: SummaryRow }) {
  return (
    <tr>
      <td>{summaryRow.element}</td>
      <td>
        <Inline parts={summaryRow.leans} />
      </td>
      <td>{summaryRow.confidence}</td>
    </tr>
  );
}

/** The "verdict at a glance" table: which side each rule element leans toward. */
function SummaryTable() {
  return (
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
          {model.summary.map((summaryRow) => <SummaryTableRow key={summaryRow.element} row={summaryRow} />)} {/* One summary row per rule element. */}
        </tbody>
      </table>
    </div>
  );
}

/** One row of the products table. */
function ProductRow({ product }: { product: Product }) {
  return (
    <tr>
      <td>
        {product.title} <span>({product.year})</span>
      </td>
      <td>
        <Inline parts={product.credits} />
      </td>
      <td>{product.added}</td>
    </tr>
  );
}

/** The OD&D-era products, with who is credited on each. */
function ProductsTable() {
  return (
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
          {model.products.map((product) => <ProductRow key={product.title} product={product} />)} {/* One row per product that was checked against the rules. */}
        </tbody>
      </table>
    </div>
  );
}

/** One rule: its name, who owns it, the verdict, any extra paragraphs and the quoted examples. */
function RuleBlock({ rule }: { rule: Rule }) {
  return (
    <div className={`auth-rule auth-owner-${rule.owner}`}>
      <div className="auth-rule-head">
        <span className="auth-rule-name">{rule.name}</span>
        <Pill owner={rule.owner}>{rule.label}</Pill>
      </div>
      <p className="auth-verdict">{rule.verdict}</p>
      {rule.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

      {rule.exhibits?.map((exhibit) => ( // One quoted example per rule.
        <div key={exhibit.cite} className="auth-exhibit">
          <span className="auth-cite">{exhibit.cite}</span> — {exhibit.text}
        </div>
      ))}

    </div>
  );
}

/** One numbered section, with a block for each of its rules. */
function SectionBlock({ section }: { section: Section }) {
  return (
    <section>
      <h2>
        <span>{section.number}</span> &nbsp;{section.title}
      </h2>
      {section.rules.map((rule) => <RuleBlock key={rule.name} rule={rule} />)} {/* One block per rule, coloured by who owns it. */}
    </section>
  );
}

/** Rule of authorship page: the rules, who owns each one and the examples. */
export default function RuleOfAuthorship() {
  return (
    <div className="authorship">
      <Masthead />
      <CaseStrip />

      <div className="auth-caveat">
        <Inline parts={model.caveat} />
      </div>

      <OwnerLegend />

      <h2>Verdict at a glance</h2>
      <SummaryTable />

      <h2>OD&amp;D-era products, credit by credit</h2>
      <ProductsTable />
      {model.sections.map((section) => <SectionBlock key={section.number} section={section} />)} {/* One block per section of the rules. */}

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
