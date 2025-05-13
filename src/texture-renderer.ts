import {
  Bitmap,
  BlendMode,
  Jimp,
  JimpInstance,
  JimpMime,
  ResizeStrategy,
} from "jimp";
import { Banner, BANNER_FACE_OFFSET, BANNER_FACE_SIZE } from "./banner";
import { getPatternUrl, Pattern } from "./pattern";
import { dyeColorToHex } from "./dye-color";

export async function renderBannerTexture(banner: Banner) {
  const url = getPatternUrl();
  let image = await Jimp.read(url.toString());
  let color = new Jimp({
    width: image.width,
    height: image.height,
    color: dyeColorToHex(banner.baseColor),
  }).mask(new Jimp(genMask(image.bitmap)));
  image.composite(color, 0, 0, { mode: BlendMode.MULTIPLY });

  for (const layer of banner.layers) {
    let pattern = await Jimp.read(getPatternUrl(layer[0]).toString());
    color = new Jimp({
      width: pattern.width,
      height: pattern.height,
      color: dyeColorToHex(layer[1]),
    }).mask(
      new Jimp(genMask(pattern.bitmap, !layer[0].match(Pattern.GRADIENT))),
    );
    image.composite(color, 0, 0, { mode: BlendMode.SRC_OVER });
  }

  return image.getBuffer(JimpMime.png);
}

function genMask(bitmap: Bitmap, doContrast = true) {
  const mask = new Jimp({
    width: bitmap.width,
    height: bitmap.height,
    color: "#000000",
  }).composite(new Jimp(bitmap)) as JimpInstance;
  if (doContrast) {
    mask.contrast(0);
  }
  return mask.bitmap;
}

export async function renderBannerFace(banner: Banner, scale: number = 1) {
  const texture = await renderBannerTexture(banner);
  const img = await Jimp.fromBuffer(texture);
  img.crop({
    x: BANNER_FACE_OFFSET[0],
    y: BANNER_FACE_OFFSET[1],
    w: BANNER_FACE_SIZE[0],
    h: BANNER_FACE_SIZE[1],
  });
  return img
    .scale({ f: scale, mode: ResizeStrategy.NEAREST_NEIGHBOR })
    .getBuffer(JimpMime.png);
}
