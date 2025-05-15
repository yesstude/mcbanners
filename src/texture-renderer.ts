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

export type LoadAssetFunction = (
  name?: Pattern,
) => Promise<string | Buffer | ArrayBuffer>;
export const defaultRenderingOptions = {
  overrideLoadAssetFunction: (async (pattern) => {
    return getPatternUrl(pattern).toString();
  }) as LoadAssetFunction,
};
export type RenderingOptions = Partial<typeof defaultRenderingOptions>;

export async function renderBannerTexture(
  banner: Banner,
  options?: RenderingOptions,
) {
  const opts = { ...defaultRenderingOptions, ...options };

  const url = await opts.overrideLoadAssetFunction();
  let image = await Jimp.read(url);
  let color = new Jimp({
    width: image.width,
    height: image.height,
    color: dyeColorToHex(banner.baseColor),
  }).mask(new Jimp(genMask(image.bitmap)));
  image.composite(color, 0, 0, { mode: BlendMode.MULTIPLY });

  for (const layer of banner.layers) {
    let pattern = await Jimp.read(
      await opts.overrideLoadAssetFunction(layer[0]),
    );
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

export async function renderBannerFace(
  banner: Banner,
  scale: number = 1,
  options?: RenderingOptions,
) {
  const texture = await renderBannerTexture(banner, options);
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
