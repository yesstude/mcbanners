# mcbanners

Exports the types for Minecraft banners and utilities for rendering them

## Usage

### Rendering

```js
import {
  Banner,
  DyeColor,
  Pattern,
  renderBannerTexture,
  renderBannerFace,
} from "mcbanners";

const banner = new Banner(DyeColor.WHITE)
  .add(Pattern.GLOBE, DyeColor.BLUE)
  .add(Pattern.CURLY_BORDER, DyeColor.BLACK)
  .add(Pattern.BRICKS, DyeColor.LIGHT_BLUE)
  .add(Pattern.GRADIENT_UP, DyeColor.GREEN)
  .add(Pattern.GRADIENT, DyeColor.LIME)
  .add(Pattern.CREEPER, DyeColor.BLACK);

const textureBuf = await renderBannerTexture(banner);
const faceBuf = await renderBannerFace(banner, 5);

await fs.writeFile("./texture.png", textureBuf);
await fs.writeFile("./face.png", faceBuf);
```

### Storing

```js
const str = banner.toString(); // "L:cs-R:bo-L:hh-L:ms-P:cre-BL:cbo-L"
const b = Banner.fromString(str); // b == banner
```
