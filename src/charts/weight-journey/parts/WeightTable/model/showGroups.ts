export type Show = {
  muscleDaily: boolean;
  muscleTotal: boolean;
  dayAverages: boolean;
  weightLoss: boolean;
  allAverages: boolean;
  wma: boolean;
  bloodPressure: boolean;
  bloodPressureAverage: boolean;
};

export const GROUPS: { key: keyof Show; label: string }[] = [
  { key: "dayAverages", label: "Day Averages" },
  { key: "weightLoss", label: "Weight Loss" },
  { key: "wma", label: "WMA" },
  { key: "allAverages", label: "All Averages" },
  { key: "muscleDaily", label: "Muscle gain" },
  { key: "muscleTotal", label: "Muscle gained so far" },
  { key: "bloodPressure", label: "Blood pressure" },
  { key: "bloodPressureAverage", label: "Avg blood pressure" },
];

/** Which column groups start switched on. */
export const DEFAULT_SHOW: Show = {
  muscleDaily: false,
  muscleTotal: false,
  dayAverages: false,
  weightLoss: false,
  allAverages: true,
  wma: true,
  bloodPressure: false,
  bloodPressureAverage: false,
};
