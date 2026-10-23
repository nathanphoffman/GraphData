/** Shape of data/maintainability-calculator/maintainability-calculator.json. */
export interface Role {
  name: string;
  /** Optional hint shown after the name in parentheses, not bold. */
  note?: string;
  /** Skill level before the AI and code quality adjustments. */
  base: number;
}

export interface MaintainabilityData {
  title: string;
  roles: Role[];
}

export interface Tier {
  name: string;
  /** Upper bound of the position range this tier covers. */
  upTo: number;
  background: string;
  color: string;
}

export interface Spans {
  /** Stable line count, n^n. */
  mid: number;
  /** Unstable line count, (n+1)^(n+1). */
  hi: number;
  /** Very Stable line count. */
  lo: number;
  up: number;
  down: number;
}
