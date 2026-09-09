import { isRateLimited } from "@/lib/rateLimit";

describe("isRateLimited", () => {
  it("allows up to 5 requests per minute for a given IP, then blocks", () => {
    const ip = "203.0.113.1";
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(ip)).toBe(false);
    }
    expect(isRateLimited(ip)).toBe(true);
  });

  it("tracks each IP independently", () => {
    expect(isRateLimited("203.0.113.2")).toBe(false);
  });

  it("fails open (never limits) when no IP could be determined", () => {
    for (let i = 0; i < 10; i++) {
      expect(isRateLimited(null)).toBe(false);
    }
  });
});
