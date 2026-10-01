// Tombstone catalogue. Prices are in South African Rand (ZAR).
// NOTE: the inline comments below are developer notes only — they are never rendered in the UI.
export type Tombstone = {
  code: string;
  size: string | null;
  headBase: number | null; // Head & Base (ZAR)
  fullSet: number | null; // Head, Base, Kerbs & Chips (ZAR)
};

// Flat add-on, the same price across all designs.
export const SLAB_PRICE = 7000;

/** Full-set price above which a design is flagged "Premium" in the UI. */
export const PREMIUM_THRESHOLD = 30000;

export const tombstones: Tombstone[] = [
  { code: "P1", size: "50x40", headBase: 2950, fullSet: 4950 },
  { code: "P2", size: "50x40", headBase: 2970, fullSet: 5060 },
  { code: "P3", size: "60x40", headBase: 3300, fullSet: 5500 },
  { code: "P4", size: "60x50", headBase: 3850, fullSet: 5500 },
  { code: "P5", size: "60x50", headBase: 5450, fullSet: 8050 },
  { code: "P6", size: "50x50", headBase: 4240, fullSet: 6840 },
  { code: "P7", size: "50x50", headBase: 4240, fullSet: 6840 },
  { code: "P8", size: "60x50", headBase: 4300, fullSet: 6900 },
  { code: "P9", size: "60x50", headBase: 4840, fullSet: 7440 },
  { code: "P10", size: "60x50", headBase: 5450, fullSet: 8050 },
  { code: "P11", size: "70x60", headBase: 5900, fullSet: 8500 },
  { code: "P12", size: "50x50", headBase: 5450, fullSet: 8050 },
  { code: "P13", size: "50x50", headBase: 5690, fullSet: 8290 },
  { code: "P14", size: "60x50", headBase: 5690, fullSet: 8290 },
  { code: "P15", size: "70x50", headBase: 6050, fullSet: 8650 },
  { code: "P16", size: "80x40", headBase: 7870, fullSet: 10470 },
  { code: "P17", size: "70x50", headBase: 7870, fullSet: 10470 },
  { code: "P18", size: "80x60", headBase: 8070, fullSet: 10670 },
  { code: "P19", size: "80x60", headBase: 8070, fullSet: 10670 },
  { code: "P20", size: "70x50", headBase: 6660, fullSet: 9200 },
  { code: "P21", size: "60x40", headBase: 6700, fullSet: 9300 },
  { code: "P22", size: "70x50", headBase: 6700, fullSet: 9300 },
  { code: "P23", size: "70x50", headBase: 6000, fullSet: 8600 },
  { code: "P24", size: "70x50", headBase: 6250, fullSet: 8850 },
  { code: "P25", size: "70x50", headBase: 6840, fullSet: 9440 },
  { code: "P26", size: "50x50", headBase: 6840, fullSet: 9440 },
  { code: "P27", size: "50x50", headBase: 6300, fullSet: 8900 },
  { code: "P28", size: "70x50", headBase: 5650, fullSet: 8250 },
  { code: "P29", size: "80x60 (pillar)", headBase: 7960, fullSet: 10560 },
  { code: "P30", size: "60x40", headBase: 9140, fullSet: 11740 },
  { code: "P31", size: "50x40", headBase: 6700, fullSet: 9300 },
  { code: "P32", size: "70x60", headBase: 6850, fullSet: 9450 },
  { code: "P33", size: "70x60", headBase: 6950, fullSet: 9550 },
  { code: "P34", size: "70x60", headBase: 6250, fullSet: 8850 },
  { code: "P35", size: "70x50", headBase: 6580, fullSet: 9180 },
  { code: "P36", size: "70x60", headBase: 5450, fullSet: 8050 },
  { code: "P37", size: "80x60", headBase: 4840, fullSet: 7440 },
  { code: "P38", size: "80x60", headBase: 6900, fullSet: 9500 },
  { code: "P39", size: "80x60", headBase: 8020, fullSet: 10620 },
  { code: "P40", size: "70x60", headBase: 5880, fullSet: 8480 },
  { code: "P41", size: "70x60", headBase: 5810, fullSet: 8410 },
  { code: "P42", size: "Double base", headBase: 4800, fullSet: 7500 },
  { code: "P43", size: "70x40x2", headBase: 7150, fullSet: 9750 },
  { code: "P44", size: "105x30", headBase: null, fullSet: 12640 },
  { code: "P45", size: "90x60", headBase: 9340, fullSet: 11940 },
  { code: "P46", size: "80x60", headBase: 9340, fullSet: 16370 },
  { code: "P47", size: "80x60", headBase: null, fullSet: 14980 },
  { code: "P48", size: "100x60", headBase: null, fullSet: 18600 },
  { code: "P49", size: "80x60", headBase: 14440, fullSet: 17040 },
  { code: "P50", size: null, headBase: 13090, fullSet: 15690 },
  { code: "P51", size: null, headBase: 9350, fullSet: 11950 },
  { code: "P52", size: null, headBase: 27500, fullSet: 35200 },
  { code: "P53", size: null, headBase: 24150, fullSet: 33000 },
  { code: "P54", size: null, headBase: null, fullSet: null }, // blank on the source sheet
  { code: "P55", size: null, headBase: 47000, fullSet: 50000 },
  { code: "P56", size: null, headBase: null, fullSet: null },
  { code: "P57", size: null, headBase: null, fullSet: null },
  { code: "P58", size: null, headBase: null, fullSet: null }, // blank on the source sheet
  { code: "P59", size: null, headBase: null, fullSet: null }, // blank on the source sheet
  { code: "P60", size: null, headBase: 13000, fullSet: 16500 },
  { code: "P61", size: "Complete", headBase: null, fullSet: 48000 }, // head & base price missing on the sheet
];

/**
 * Catalogue codes with a photo page in the physical catalogue.
 * Photos for P33–P36 and P41+ are not available yet ("photo coming soon").
 *
 * Add a photo by dropping a file at `public/tombstones/{code}.jpg`.
 * Confirmed by the client: the names and dates shown on the catalogue
 * headstones are fictional, so the photos can be published as-is.
 */
const COVERED = new Set([
  ...Array.from({ length: 32 }, (_, i) => `P${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `P${37 + i}`),
]);

export const hasCataloguePhoto = (code: string) => COVERED.has(code);
