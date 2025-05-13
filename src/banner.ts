import { DyeColor } from "./dye-color";
import { Pattern } from "./pattern";

export const BANNER_SIZE = [20, 40];
export type Layer = [Pattern, DyeColor];

export class Banner {
  public layers: Layer[];

  constructor(
    public baseColor: DyeColor,
    ...layers: Layer[]
  ) {
    this.layers = layers;
  }

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
}
