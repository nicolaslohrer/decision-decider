export const theme: Theme = {
  color: {
    // XXX: Tweak and extend theme colors.
    brand: "#515cba"
  },
  text: {
    // XXX: Choose font.
    fontFamily: "Verdana, Arial, Helvetica, sans-serif",
    size: {
      base: "16px",
      s: "0.5rem",
      m: "0.75rem",
      l: "1rem",
      xl: "1.5rem"
    },
    fontWeight: {
      regular: 400,
      bold: 900
    },
    lineHeight: {
      ultraCondensed: 1,
      condensed: 1.25,
      default: 1.5,
      expanded: 2
    }
  },
  spacing: {
    0: "0",
    0.5: "0.25rem",
    1: "0.5rem",
    2: "1rem",
    3: "1.5rem",
    4: "2rem",
    5: "2.5rem",
    6: "3rem",
    7: "3.5rem",
    8: "4rem"
  }
};

export type Theme = {
  color: { [key in "brand"]: string };
  text: {
    fontFamily: string;
    size: { [key in "base" | "s" | "m" | "l" | "xl"]: string };
    fontWeight: { [key in "regular" | "bold"]: number };
    lineHeight: {
      [key in "ultraCondensed" | "condensed" | "default" | "expanded"]: number
    };
  };
  spacing: { [key in 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8]: string };
};
