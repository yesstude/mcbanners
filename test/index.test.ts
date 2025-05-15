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
  const exampleBanner = new Banner(DyeColor.LIME)
    .add(Pattern.STRIPE_CENTER, DyeColor.RED)
    .add(Pattern.BORDER, DyeColor.LIME)
    .add(Pattern.HALF_HORIZONTAL, DyeColor.LIME)
    .add(Pattern.STRIPE_MIDDLE, DyeColor.PINK)
    .add(Pattern.CREEPER, DyeColor.BLACK)
    .add(Pattern.CURLY_BORDER, DyeColor.LIME);

  it("toString", () => {
    expect(exampleBanner.toString()).toMatch(
      "L:cs-R:bo-L:hh-L:ms-P:cre-BL:cbo-L",
    );
  });

  it("fromString", () => {
    expect(
      Banner.fromString("L:cs-R:bo-L:hh-L:ms-P:cre-BL:cbo-L").toJSON(),
    ).toBe(exampleBanner.toJSON());
  });

  it("creeper", async () => {
    expect(hash(await renderBannerFace(exampleBanner))).toBe(
      11097594993981714374n,
    );
  });
});
