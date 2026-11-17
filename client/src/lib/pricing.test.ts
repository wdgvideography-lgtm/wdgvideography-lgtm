import { describe, expect, it } from "vitest";
import { gbp, perUnit } from "./pricing";

describe("gbp", () => {
  it("formats whole pounds without pence", () => {
    expect(gbp(60)).toBe("£60");
    expect(gbp(1200)).toBe("£1,200");
  });
  it("shows pence only when there are some", () => {
    expect(gbp(12.5)).toBe("£12.50");
  });
});

describe("perUnit", () => {
  it("works out the real per-image price of each product photography pack", () => {
    expect(perUnit(60, 5)).toBe("£12");
    expect(perUnit(110, 10)).toBe("£11");
    expect(perUnit(200, 20)).toBe("£10");
  });
  it("rounds to the penny", () => {
    expect(perUnit(100, 3)).toBe("£33.33");
  });
  it("returns nothing for nonsense input", () => {
    expect(perUnit(0, 5)).toBe("");
    expect(perUnit(60, 0)).toBe("");
    expect(perUnit(Number.NaN, 5)).toBe("");
  });
});
