/** The eyepiece view is this many CSS pixels square, drawn at this many times that for sharpness. */
export const VIEW_SIZE = 280;
export const SCALE = 2;

/** How much more you see looking slightly off to the side of the target (the eye's rod cells are more sensitive), in magnitudes. */
export const AVERTED_BOOST = 0.9;

/** Dark-adapted eyes see red as dark and blue-green as bright, and sky-survey photos are red-heavy, so the photo's red is turned down and its blue turned up. */
export const COOL_BALANCE = [0.65, 0.9, 1.15];

/** Magnitudes above the faintest star where a point starts to glow, and how much further it takes to glow fully. */
export const BLOOM_START = 4;
export const BLOOM_RANGE = 6;

/** Seconds for one full direct, averted, direct cycle. */
export const CYCLE_SECONDS = 8;
