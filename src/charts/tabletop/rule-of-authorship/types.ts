/** Shape of data/rule-of-authorship/rule-of-authorship.json. */
export type Owner = "arneson" | "gygax" | "kuntz" | "kask" | "ernie" | "others" | "joint" | "disputed";

/** A run of inline text; `owner` renders it as a colored tag, `strong` as bold. */
export interface Segment {
  text: string;
  owner?: Owner;
  strong?: boolean;
}

export interface Exhibit {
  /** Where the quote comes from, e.g. "Arneson Dep. I, p.776". */
  cite: string;
  text: string;
}

export interface Rule {
  name: string;
  owner: Owner;
  /** Text of the pill next to the rule name. */
  label: string;
  verdict: string;
  /** Extra paragraphs shown after the verdict. */
  body?: string[];
  exhibits?: Exhibit[];
}

export interface Section {
  number: string;
  title: string;
  rules: Rule[];
}

export interface SummaryRow {
  element: string;
  leans: Segment[];
  confidence: string;
}

/** One OD&D-era product and who is credited on it. */
export interface Product {
  title: string;
  year: string;
  credits: Segment[];
  /** What it added to the game. */
  added: string;
}

export interface RuleOfAuthorshipData {
  title: string;
  kicker: [string, string];
  subhead: string;
  caseStrip: Segment[][];
  caveat: Segment[];
  summary: SummaryRow[];
  products: Product[];
  sections: Section[];
  bottomLine: Segment[];
  footer: string;
}
