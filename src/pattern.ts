export enum Pattern {
  SQUARE_BOTTOM_LEFT = "minecraft:square_bottom_left",
  SQUARE_BOTTOM_RIGHT = "minecraft:square_bottom_right",
  SQUARE_TOP_LEFT = "minecraft:square_top_left",
  SQUARE_TOP_RIGHT = "minecraft:square_top_right",
  STRIPE_BOTTOM = "minecraft:stripe_bottom",
  STRIPE_TOP = "minecraft:stripe_top",
  STRIPE_LEFT = "minecraft:stripe_left",
  STRIPE_RIGHT = "minecraft:stripe_right",
  STRIPE_CENTER = "minecraft:stripe_center",
  STRIPE_MIDDLE = "minecraft:stripe_middle",
  STRIPE_DOWNRIGHT = "minecraft:stripe_downright",
  STRIPE_DOWNLEFT = "minecraft:stripe_downleft",
  SMALL_STRIPES = "minecraft:small_stripes",
  CROSS = "minecraft:cross",
  STRAIGHT_CROSS = "minecraft:straight_cross",
  TRIANGLE_BOTTOM = "minecraft:triangle_bottom",
  TRIANGLE_TOP = "minecraft:triangle_top",
  TRIANGLES_BOTTOM = "minecraft:triangles_bottom",
  TRIANGLES_TOP = "minecraft:triangles_top",
  DIAGONAL_LEFT = "minecraft:diagonal_left",
  DIAGONAL_UP_RIGHT = "minecraft:diagonal_up_right",
  DIAGONAL_UP_LEFT = "minecraft:diagonal_up_left",
  DIAGONAL_RIGHT = "minecraft:diagonal_right",
  CIRCLE = "minecraft:circle",
  RHOMBUS = "minecraft:rhombus",
  HALF_VERTICAL = "minecraft:half_vertical",
  HALF_HORIZONTAL = "minecraft:half_horizontal",
  HALF_VERTICAL_RIGHT = "minecraft:half_vertical_right",
  HALF_HORIZONTAL_BOTTOM = "minecraft:half_horizontal_bottom",
  BORDER = "minecraft:border",
  CURLY_BORDER = "minecraft:curly_border",
  CREEPER = "minecraft:creeper",
  GRADIENT = "minecraft:gradient",
  GRADIENT_UP = "minecraft:gradient_up",
  BRICKS = "minecraft:bricks",
  SKULL = "minecraft:skull",
  FLOWER = "minecraft:flower",
  MOJANG = "minecraft:mojang",
  GLOBE = "minecraft:globe",
  PIGLIN = "minecraft:piglin",
  FLOW = "minecraft:flow",
  GUSTER = "minecraft:guster",
}

export function getPatternUrl(pattern?: Pattern) {
  const name = pattern ? pattern.split(":")[1] : "base";
  return new URL(`../assets/${name}.png`, import.meta.url);
}

const abbreviations: { [key in Pattern]: string } = {
  [Pattern.SQUARE_BOTTOM_LEFT]: "bl",
  [Pattern.SQUARE_BOTTOM_RIGHT]: "br",
  [Pattern.SQUARE_TOP_LEFT]: "tl",
  [Pattern.SQUARE_TOP_RIGHT]: "tr",
  [Pattern.STRIPE_BOTTOM]: "bs",
  [Pattern.STRIPE_TOP]: "ts",
  [Pattern.STRIPE_LEFT]: "ls",
  [Pattern.STRIPE_RIGHT]: "rs",
  [Pattern.STRIPE_CENTER]: "cs",
  [Pattern.STRIPE_MIDDLE]: "ms",
  [Pattern.STRIPE_DOWNRIGHT]: "drs",
  [Pattern.STRIPE_DOWNLEFT]: "dls",
  [Pattern.SMALL_STRIPES]: "ss",
  [Pattern.CROSS]: "cr",
  [Pattern.STRAIGHT_CROSS]: "sc",
  [Pattern.TRIANGLE_BOTTOM]: "bt",
  [Pattern.TRIANGLE_TOP]: "tt",
  [Pattern.TRIANGLES_BOTTOM]: "bts",
  [Pattern.TRIANGLES_TOP]: "tts",
  [Pattern.DIAGONAL_LEFT]: "dl",
  [Pattern.DIAGONAL_UP_RIGHT]: "dur",
  [Pattern.DIAGONAL_UP_LEFT]: "dul",
  [Pattern.DIAGONAL_RIGHT]: "dr",
  [Pattern.CIRCLE]: "ci",
  [Pattern.RHOMBUS]: "rh",
  [Pattern.HALF_VERTICAL]: "vh",
  [Pattern.HALF_HORIZONTAL]: "hh",
  [Pattern.HALF_VERTICAL_RIGHT]: "vr",
  [Pattern.HALF_HORIZONTAL_BOTTOM]: "hb",
  [Pattern.BORDER]: "bo",
  [Pattern.CURLY_BORDER]: "cbo",
  [Pattern.CREEPER]: "cre",
  [Pattern.GRADIENT]: "gra",
  [Pattern.GRADIENT_UP]: "gru",
  [Pattern.BRICKS]: "bri",
  [Pattern.SKULL]: "sku",
  [Pattern.FLOWER]: "flo",
  [Pattern.MOJANG]: "moj",
  [Pattern.GLOBE]: "glo",
  [Pattern.PIGLIN]: "pig",
  [Pattern.FLOW]: "flw",
  [Pattern.GUSTER]: "gus",
};

export function patternToAbbreviation(pattern: Pattern) {
  return abbreviations[pattern];
}
export function patternFromAbbreviation(abbr: string) {
  for (const [key, value] of Object.entries(abbreviations)) {
    if (value === abbr) {
      return key as Pattern;
    }
  }
  return null;
}