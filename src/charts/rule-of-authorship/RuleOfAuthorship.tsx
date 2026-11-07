import data from "../../../data/rule-of-authorship/rule-of-authorship.json";
import "./styles.css";
import Masthead from "./RuleOfAuthorship/Masthead";
import OwnerLegend from "./RuleOfAuthorship/OwnerLegend";
import ProductsTable from "./RuleOfAuthorship/ProductsTable";
import SectionBlock from "./RuleOfAuthorship/SectionBlock";
import SummaryTable from "./RuleOfAuthorship/SummaryTable";
import { Inline } from "./RuleOfAuthorship/TextPieces";
import type { RuleOfAuthorshipData } from "./types";

const model = data as RuleOfAuthorshipData;

/** Rule of authorship page: the rules, who owns each one and the examples. */
export default function RuleOfAuthorship() {
  return (
    <div className="authorship">
      <Masthead model={model} />
      <div className="auth-caveat">
        <Inline parts={model.caveat} />
      </div>
      <OwnerLegend />
      <h2>Verdict at a glance</h2>
      <SummaryTable rows={model.summary} />
      <h2>OD&amp;D-era products, credit by credit</h2>
      <ProductsTable products={model.products} />
      {/* One block per section of the rules. */}
      {model.sections.map((section) => (
        <SectionBlock key={section.number} section={section} />
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
