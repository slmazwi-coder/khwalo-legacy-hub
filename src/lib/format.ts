/** Format a number as South African Rand with a space thousands separator, e.g. R 12 380. */
export const formatZAR = (value: number) =>
  `R ${new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 })
    .format(value)
    .replaceAll(",", " ")}`;
