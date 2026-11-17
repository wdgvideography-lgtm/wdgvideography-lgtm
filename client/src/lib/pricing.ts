/**
 * Small wording helpers for prices, kept in one place so the maths behind any
 * "per image" figure is real and tested (sales-psychology golden rule: every number true).
 */

/** "£1,200" style, whole pounds without pence, pence shown only when needed ("£12.50"). */
export function gbp(pounds: number): string {
  const whole = Number.isInteger(pounds);
  return `£${pounds.toLocaleString("en-GB", { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 })}`;
}

/**
 * What one unit works out at in a pack, e.g. perUnit(200, 20) → "£10".
 * Rounds to the nearest penny; returns "" for nonsense input so callers can skip it.
 */
export function perUnit(totalPounds: number, units: number): string {
  if (!Number.isFinite(totalPounds) || !Number.isFinite(units) || totalPounds <= 0 || units <= 0) return "";
  return gbp(Math.round((totalPounds / units) * 100) / 100);
}
