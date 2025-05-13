# mcbanners

Exports the types for Minecraft banners and utilities for rendering them

## Usage

```js
import { Banner, DyeColor, Pattern, renderBannerFace } from "mcbanners";

const banner = new Banner(DyeColor.WHITE)
  .add(Pattern.GLOBE, DyeColor.BLUE)
  .add(Pattern.CURLY_BORDER, DyeColor.BLACK)
  .add(Pattern.BRICKS, DyeColor.LIGHT_BLUE)
  .add(Pattern.GRADIENT_UP, DyeColor.GREEN)
  .add(Pattern.GRADIENT, DyeColor.LIME)
  .add(Pattern.CREEPER, DyeColor.BLACK);

const buf = await renderBannerFace(banner, 5);

await fs.writeFile("./banner.png", buf);
```