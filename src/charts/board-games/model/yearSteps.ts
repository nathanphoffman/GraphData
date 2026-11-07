/** The release year slider's steps: how many years back it shows (this year counting as the first), or null for every year. */
export const YEAR_STEPS: { label: string; years: number | null }[] = [
  { label: "Show all", years: null },
  { label: "Last 25 years", years: 25 },
  { label: "Last 10 years", years: 10 },
  { label: "Last 5 years", years: 5 },
  { label: "Last 3 years", years: 3 },
  { label: "Last 2 years", years: 2 },
  { label: "This year", years: 1 },
];

/** The first release year a step shows from, or 0 for every year. */
export const minYearOf = (step: number) => {
  const years = YEAR_STEPS[step].years;

  return years === null ? 0 : new Date().getFullYear() - years + 1;
};
