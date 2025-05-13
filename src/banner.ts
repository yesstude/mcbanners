import { DyeColor } from "./dye-color";
import { Pattern } from "./pattern";

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
}
