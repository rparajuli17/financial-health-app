import { describe, expect, it } from "vitest";
import { formatCents } from "./index";

describe("formatCents", () => {
    it("formats cents as USD", () => {
        expect(formatCents(12345)).toBe("$123.45");
        expect(formatCents(0)).toBe("$0.00");
    });
});