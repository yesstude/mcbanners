import { Banner, DyeColor, Pattern, renderBannerFace } from "mcbanners";
import fs from "fs/promises";

(async () => {
  const banner = new Banner(DyeColor.WHITE)
    .add(Pattern.GLOBE, DyeColor.BLUE)
    .add(Pattern.CURLY_BORDER, DyeColor.BLACK)
    .add(Pattern.BRICKS, DyeColor.LIGHT_BLUE)
    .add(Pattern.GRADIENT_UP, DyeColor.GREEN)
    .add(Pattern.GRADIENT, DyeColor.LIME)
    .add(Pattern.CREEPER, DyeColor.BLACK);

  const buf = await renderBannerFace(banner, 5, {
    async overrideLoadAssetFunction(pattern) {
      const res = await fs.readFile(
        `../../assets/${pattern?.split(":")[1] ?? "base"}.png`,
      );
      return Buffer.from(res.buffer);
    },
  });

  await fs.writeFile("./banner.png", buf);

  console.log("Rendered!");
})();
