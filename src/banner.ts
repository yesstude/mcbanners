import {
  DyeColor,
  dyeColorFromAbbreviation,
  dyeColorToAbbreviation,
} from "./dye-color";
import {
  Pattern,
  patternFromAbbreviation,
  patternToAbbreviation,
} from "./pattern";

export const BANNER_FACE_OFFSET = [1, 1];
export const BANNER_FACE_SIZE = [20, 40];
export type Layer = [Pattern, DyeColor];

export class Banner {
  public layers: Layer[];

  constructor(
    public baseColor: DyeColor,
    ...layers: Layer[]
  ) {
    this.layers = layers;
  }

  /**
   * @example ```ts
   * const banner = new Banner(DyeColor.WHITE)
   *  .add(Pattern.GRADIENT, DyeColor.PURPLE)
   *  .add(Pattern.CROSS, DyeColor.RED);
   */
  public add(...l: Layer) {
    this.layers.push(l);
    return this;
  }

  public toObject() {
    return { base: this.baseColor, layers: this.layers };
  }
  public static fromObject(obj: any) {
    return new Banner(obj.base, ...obj.layers);
  }

  public toJSON() {
    return JSON.stringify(this.toObject());
  }
  public static fromJSON(json: string) {
    return Banner.fromObject(JSON.parse(json));
  }

  /**
   * @example ```ts
   * banner.toString(); // "L:cs-R:bo-L:hh-L:ms-P:cre-BL:cbo-L"
   */
  public toString() {
    let str = dyeColorToAbbreviation(this.baseColor);
    for (const layer of this.layers) {
      str += ":";
      str += patternToAbbreviation(layer[0]);
      str += "-";
      str += dyeColorToAbbreviation(layer[1]);
    }
    return str;
  }
  /**
   * @example ```ts
   * Banner.fromString("L:cs-R:bo-L:hh-L:ms-P:cre-BL:cbo-L"); // Banner instance
   */
  public static fromString(str: string) {
    const parts = str.split(":");
    const base = parts.shift();
    const b = dyeColorFromAbbreviation(base ?? "");
    if (!b) throw new Error("Invalid banner string: invalid base color");
    const banner = new Banner(b);
    for (const part of parts) {
      const [pattern, color] = part.split("-");
      if (!pattern || !color)
        throw new Error("Invalid banner string: invalid layer");
      const p = patternFromAbbreviation(pattern);
      if (!p) throw new Error("Invalid banner string: invalid pattern");
      const c = dyeColorFromAbbreviation(color);
      if (!c) throw new Error("Invalid banner string: invalid color");
      banner.add(p, c);
    }
    return banner;
  }
}
