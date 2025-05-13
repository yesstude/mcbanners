import { describe, expect, it } from "bun:test";
import { Banner, DyeColor, getPatternUrl, Pattern } from "../src";
import fs from "fs";
import { hash } from "bun";
import { renderBannerFace } from "../src/texture-renderer";

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

describe("test banners", () => {
  it("creeper", async () => {
    expect(
      hash(
        await renderBannerFace(
          new Banner(DyeColor.LIME)
            .add(Pattern.STRIPE_CENTER, DyeColor.RED)
            .add(Pattern.BORDER, DyeColor.LIME)
            .add(Pattern.HALF_HORIZONTAL, DyeColor.LIME)
            .add(Pattern.STRIPE_MIDDLE, DyeColor.PINK)
            .add(Pattern.CREEPER, DyeColor.BLACK)
            .add(Pattern.CURLY_BORDER, DyeColor.LIME),
        ),
      ),
    ).toBe(11097594993981714374n);
  });
});
