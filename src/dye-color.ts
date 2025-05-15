export enum DyeColor {
  WHITE = "WHITE",
  ORANGE = "ORANGE",
  MAGENTA = "MAGENTA",
  LIGHT_BLUE = "LIGHT_BLUE",
  YELLOW = "YELLOW",
  LIME = "LIME",
  PINK = "PINK",
  GRAY = "GRAY",
  LIGHT_GRAY = "LIGHT_GRAY",
  CYAN = "CYAN",
  PURPLE = "PURPLE",
  BLUE = "BLUE",
  BROWN = "BROWN",
  GREEN = "GREEN",
  RED = "RED",
  BLACK = "BLACK",
}

const hexcodes: { [key in DyeColor]: string } = {
  WHITE: "#FFFFFF",
  ORANGE: "#D87F33",
  MAGENTA: "#B24CD8",
  LIGHT_BLUE: "#6699D8",
  YELLOW: "#E5E533",
  LIME: "#7FCC19",
  PINK: "#F27FA5",
  GRAY: "#4C4C4C",
  LIGHT_GRAY: "#999999",
  CYAN: "#4C7F99",
  PURPLE: "#7F3FB2",
  BLUE: "#334CB2",
  BROWN: "#664C33",
  GREEN: "#667F33",
  RED: "#993333",
  BLACK: "#191919",
};

export function dyeColorToHex(color: DyeColor) {
  return hexcodes[color];
}

const abbreviations: { [key in DyeColor]: string } = {
  WHITE: "W",
  ORANGE: "O",
  MAGENTA: "M",
  LIGHT_BLUE: "LB",
  YELLOW: "Y",
  LIME: "L",
  PINK: "P",
  GRAY: "G",
  LIGHT_GRAY: "LG",
  CYAN: "C",
  PURPLE: "PU",
  BLUE: "B",
  BROWN: "BR",
  GREEN: "GR",
  RED: "R",
  BLACK: "BL",
};

export function dyeColorToAbbreviation(color: DyeColor) {
  return abbreviations[color];
}
export function dyeColorFromAbbreviation(abbr: string) {
  for (const [key, value] of Object.entries(abbreviations)) {
    if (value === abbr) {
      return key as DyeColor;
    }
  }
  return null;
}