import { describe, expect, it } from "bun:test";
import { getPatternUrl, Pattern } from "../src";
import fs from "fs";

describe("get pattern url", () => {
  it("base", () => {
    expect(fs.readFileSync(getPatternUrl()).length).toBeGreaterThan(0);
  });
  it("border", () => {
    expect(
      fs.readFileSync(getPatternUrl(Pattern.BORDER)).length,
    ).toBeGreaterThan(0);
  });
});
