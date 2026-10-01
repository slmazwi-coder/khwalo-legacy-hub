// Burial scheme rules, premiums and benefits.
// isiXhosa labels are kept alongside English, matching the source flyer.
export type Language = "en" | "xh";

export type Scheme = {
  id: "A" | "B" | "C";
  age: string;
  ageXh: string;
  withoutSpouse: number;
  withSpouse: number;
  /** Joining fee. Number for schemes A/B; a short label for scheme C, which differs by spouse. */
  joining: number | string;
};

export const schemes: Scheme[] = [
  {
    id: "A",
    age: "22–59 years",
    ageXh: "Iminyaka 22–59",
    withoutSpouse: 100,
    withSpouse: 130,
    joining: 180,
  },
  {
    id: "B",
    age: "60–79 years",
    ageXh: "Iminyaka 60–79",
    withoutSpouse: 110,
    withSpouse: 150,
    joining: 180,
  },
  {
    id: "C",
    age: "80 years & above",
    ageXh: "Iminyaka 80 nangaphezulu",
    withoutSpouse: 150,
    withSpouse: 200,
    joining: "R150 single / R200 spouse",
  },
];

/** "Ukusetyenzelwa" — what the family receives. */
export const benefits = [
  "Casket",
  "Transport services",
  "R3,500 cash",
  "Grave tent & decoration",
  "Lowering device",
  "50 programmes",
  // Kept verbatim as printed on the flyer; deliberately not translated.
  "Amadlelo aluhlaza",
];

export const benefitsXh = [
  "Ibhokisi yomngcwabo",
  "Iinkonzo zothutho",
  "R3,500 ngemali",
  "Intente nokuhonjiswa kwengcwaba",
  "Isixhobo sokwehlisa ibhokisi",
  "Iinkqubo zomngcwabo ezingama-50",
  "Amadlelo aluhlaza",
];

export type Term = { en: string; xh: string };

/** Terms paraphrased from the flyer — the UI appends a "(please confirm with us)" marker to each. */
export const terms: Term[] = [
  {
    en: "Children under 21 can be added; up to 13 dependants.",
    xh: "Abantwana abangaphantsi kweminyaka engama-21 banokongezwa; ukuya kuthi ga kwi-13.",
  },
  {
    en: "Cover starts 6 months after joining.",
    xh: "Ukhuselo luqala emva kweenyanga ezi-6 zokujoyina.",
  },
  {
    en: "Members are collected free of charge; non-members are still assisted.",
    xh: "Amalungu aqokelelwa simahla; abangengawo amalungu basancedwa.",
  },
  {
    en: "You can pay R50 per month — ask us how.",
    xh: "Uyakwazi ukubhatala R50 ngenyanga — buza ukuba njani.",
  },
];
