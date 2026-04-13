import { describe, it, expect } from "vitest";
import { formatPHP, formatArea, formatFullPHP } from "@/lib/format";

describe("formatPHP", () => {
  it('formats 3_500_000 as "₱3.5M"', () => {
    expect(formatPHP(3_500_000)).toBe("₱3.5M");
  });

  it('formats 1_000_000 as "₱1M"', () => {
    expect(formatPHP(1_000_000)).toBe("₱1M");
  });

  it('formats 10_000_000 as "₱10M"', () => {
    expect(formatPHP(10_000_000)).toBe("₱10M");
  });

  it('formats 25_000_000 as "₱25M"', () => {
    expect(formatPHP(25_000_000)).toBe("₱25M");
  });

  it('formats 500_000 as "₱500K"', () => {
    expect(formatPHP(500_000)).toBe("₱500K");
  });

  it('formats 1_500 as "₱1.5K"', () => {
    expect(formatPHP(1_500)).toBe("₱1.5K");
  });

  it("handles amounts less than 1000", () => {
    expect(formatPHP(500)).toBe("₱500");
  });

  it('formats 7_200_000 as "₱7.2M"', () => {
    expect(formatPHP(7_200_000)).toBe("₱7.2M");
  });
});

describe("formatArea", () => {
  it('formats 85 as "85 sqm"', () => {
    expect(formatArea(85)).toBe("85 sqm");
  });

  it('formats 100 as "100 sqm"', () => {
    expect(formatArea(100)).toBe("100 sqm");
  });

  it('formats 0 as "0 sqm"', () => {
    expect(formatArea(0)).toBe("0 sqm");
  });
});

describe("formatFullPHP", () => {
  it("formats with Philippine Peso currency symbol", () => {
    const result = formatFullPHP(1_000_000);
    expect(result).toMatch(/1,000,000/);
  });
});
