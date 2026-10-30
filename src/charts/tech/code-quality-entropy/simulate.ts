/** The knobs of the entropy model. Quality is a share from 0 to 1. */
export interface Params {
  commits: number;
  commitImpact: number;
  baseCommits: number;
  baseEntropy: number;
  startingQuality: number;
  intuition: number;
}

/** The chance of a bad commit never goes above this. */
const MAX_ENTROPY = 0.99;

/** Quality never drops below this when working out how fragile the code is, so the fragility stays finite. */
const MIN_QUALITY = 0.01;

/** A source of random numbers from 0 up to (not including) 1. */
type Random = () => number;

/** How unguided the developer is: 1 with full intuition, up to e with none. */
export function unguidedness(intuition: number): number {
  return 1 + (1 - intuition) * (Math.E - 1);
}

/** The chance a commit is a bad one: more commits and lower quality both raise it. */
export function entropyChance(params: Params, commit: number, quality: number): number {
  const growth = Math.log(params.baseCommits + commit + Math.E);
  const fragility = 1 / Math.max(quality, MIN_QUALITY);
  return Math.min(MAX_ENTROPY, growth * fragility * params.baseEntropy);
}

/** One run: the quality after each commit, starting with the quality before the first. */
export function simulateRun(params: Params, random: Random = Math.random): number[] {
  const unguided = unguidedness(params.intuition);
  const history = [params.startingQuality];
  let quality = params.startingQuality;

  for (let commit = 0; commit < Math.ceil(params.commits); commit++) {
    const entropy = entropyChance(params, commit, quality);
    const next =
      random() < entropy
        ? quality * (1 - entropy * params.commitImpact) ** unguided
        : quality * (1 + (1 - entropy) * params.commitImpact) ** (1 / unguided);

    quality = Math.min(1, Math.max(0, next));
    history.push(quality);
  }
  return history;
}

/** Many runs of the same model. */
export function simulate(params: Params, samples: number, random: Random = Math.random): number[][] {
  return Array.from({ length: samples }, () => simulateRun(params, random));
}

/** The average, lowest and highest quality across the runs at each commit. */
export function summarize(runs: number[][]): { average: number[]; low: number[]; high: number[] } {
  const average: number[] = [];
  const low: number[] = [];
  const high: number[] = [];

  for (let commit = 0; commit < runs[0].length; commit++) {
    let sum = 0;
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const run of runs) {
      sum += run[commit];
      min = Math.min(min, run[commit]);
      max = Math.max(max, run[commit]);
    }
    average.push(sum / runs.length);
    low.push(min);
    high.push(max);
  }
  return { average, low, high };
}
