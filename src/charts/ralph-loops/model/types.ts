export interface Area {
  name: string;
  done: number;
  open: number;
  blocked: number;
}

export interface LoopEvent {
  at: number;
  kind: string;
  message: string;
  source: string;
}

export interface Commit {
  at: number;
  source: string;
  sha: string;
  message: string;
  added: number;
  removed: number;
  files: number;
  total: number;
}

export interface LoopFile {
  name: string;
  updatedAt: number;
}

export interface Loop {
  name: string;
  state: string;
  round: number;
  areas: Area[];
  updatedAt: number;
  events: LoopEvent[];
  commits: Commit[];
  files: LoopFile[];
  languages: { deor: number; rust: number } | null;
}

/** One line of the timeline: a log event or a commit. */
export type Entry = { at: number; source: string; text: string; commit?: Commit };
