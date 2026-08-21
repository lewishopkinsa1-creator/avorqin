export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type HslColor = {
  h: number;
  s: number;
  l: number;
};

export type CmykColor = {
  c: number;
  m: number;
  y: number;
  k: number;
};

export type ContrastResult = {
  foreground: string;
  background: string;
  ratio: number;
  normalAA: boolean;
  normalAAA: boolean;
  largeAA: boolean;
  largeAAA: boolean;
};

export type PaletteColor = {
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
};

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function round(
  value: number,
  precision = 0
): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

export function normalizeHex(
  input: string
): string {
  let hex = input.trim().replace(/^#/, "");

  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    hex = hex
      .split("")
      .map((character) => character + character)
      .join("");
  }

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(
      "Enter a valid 3- or 6-digit hex color."
    );
  }

  return `#${hex.toUpperCase()}`;
}

export function hexToRgb(
  input: string
): RgbColor {
  const hex = normalizeHex(input).slice(1);
  const value = Number.parseInt(hex, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export function rgbToHex(
  r: number,
  g: number,
  b: number
): string {
  for (const value of [r, g, b]) {
    if (
      !Number.isInteger(value) ||
      value < 0 ||
      value > 255
    ) {
      throw new Error(
        "RGB values must be whole numbers from 0 to 255."
      );
    }
  }

  return `#${[r, g, b]
    .map((value) =>
      value
        .toString(16)
        .padStart(2, "0")
    )
    .join("")
    .toUpperCase()}`;
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): HslColor {
  for (const value of [r, g, b]) {
    if (
      !Number.isFinite(value) ||
      value < 0 ||
      value > 255
    ) {
      throw new Error(
        "RGB values must be between 0 and 255."
      );
    }
  }

  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  let hue = 0;
  let saturation = 0;

  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta !== 0) {
    saturation =
      lightness > 0.5
        ? delta / (2 - max - min)
        : delta / (max + min);

    if (max === red) {
      hue =
        (green - blue) / delta +
        (green < blue ? 6 : 0);
    } else if (max === green) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }

    hue /= 6;
  }

  return {
    h: round(hue * 360),
    s: round(saturation * 100, 1),
    l: round(lightness * 100, 1),
  };
}

export function hexToHsl(
  input: string
): HslColor {
  const { r, g, b } = hexToRgb(input);
  return rgbToHsl(r, g, b);
}

function hueToRgb(
  p: number,
  q: number,
  t: number
): number {
  let normalized = t;

  if (normalized < 0) {
    normalized += 1;
  }

  if (normalized > 1) {
    normalized -= 1;
  }

  if (normalized < 1 / 6) {
    return p + (q - p) * 6 * normalized;
  }

  if (normalized < 1 / 2) {
    return q;
  }

  if (normalized < 2 / 3) {
    return (
      p +
      (q - p) *
        (2 / 3 - normalized) *
        6
    );
  }

  return p;
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): RgbColor {
  if (
    !Number.isFinite(h) ||
    !Number.isFinite(s) ||
    !Number.isFinite(l)
  ) {
    throw new Error(
      "HSL values must be valid numbers."
    );
  }

  if (
    s < 0 ||
    s > 100 ||
    l < 0 ||
    l > 100
  ) {
    throw new Error(
      "Saturation and lightness must be between 0 and 100."
    );
  }

  const hue =
    (((h % 360) + 360) % 360) / 360;

  const saturation = s / 100;
  const lightness = l / 100;

  if (saturation === 0) {
    const gray = Math.round(lightness * 255);

    return {
      r: gray,
      g: gray,
      b: gray,
    };
  }

  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness +
        saturation -
        lightness * saturation;

  const p = 2 * lightness - q;

  return {
    r: Math.round(
      hueToRgb(p, q, hue + 1 / 3) * 255
    ),
    g: Math.round(
      hueToRgb(p, q, hue) * 255
    ),
    b: Math.round(
      hueToRgb(p, q, hue - 1 / 3) * 255
    ),
  };
}

export function hslToHex(
  h: number,
  s: number,
  l: number
): string {
  const rgb = hslToRgb(h, s, l);

  return rgbToHex(
    rgb.r,
    rgb.g,
    rgb.b
  );
}

export function rgbToCmyk(
  r: number,
  g: number,
  b: number
): CmykColor {
  for (const value of [r, g, b]) {
    if (
      !Number.isFinite(value) ||
      value < 0 ||
      value > 255
    ) {
      throw new Error(
        "RGB values must be between 0 and 255."
      );
    }
  }

  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const k = 1 - Math.max(red, green, blue);

  if (k === 1) {
    return {
      c: 0,
      m: 0,
      y: 0,
      k: 100,
    };
  }

  return {
    c: round(
      ((1 - red - k) / (1 - k)) * 100,
      1
    ),
    m: round(
      ((1 - green - k) / (1 - k)) * 100,
      1
    ),
    y: round(
      ((1 - blue - k) / (1 - k)) * 100,
      1
    ),
    k: round(k * 100, 1),
  };
}

export function cmykToRgb(
  c: number,
  m: number,
  y: number,
  k: number
): RgbColor {
  for (const value of [c, m, y, k]) {
    if (
      !Number.isFinite(value) ||
      value < 0 ||
      value > 100
    ) {
      throw new Error(
        "CMYK values must be between 0 and 100."
      );
    }
  }

  const cyan = c / 100;
  const magenta = m / 100;
  const yellow = y / 100;
  const black = k / 100;

  return {
    r: Math.round(
      255 *
        (1 - cyan) *
        (1 - black)
    ),
    g: Math.round(
      255 *
        (1 - magenta) *
        (1 - black)
    ),
    b: Math.round(
      255 *
        (1 - yellow) *
        (1 - black)
    ),
  };
}

function linearizeChannel(
  value: number
): number {
  const channel = value / 255;

  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(
  input: string
): number {
  const { r, g, b } = hexToRgb(input);

  return (
    0.2126 * linearizeChannel(r) +
    0.7152 * linearizeChannel(g) +
    0.0722 * linearizeChannel(b)
  );
}

export function calculateContrast(
  foreground: string,
  background: string
): ContrastResult {
  const foregroundHex =
    normalizeHex(foreground);

  const backgroundHex =
    normalizeHex(background);

  const first =
    relativeLuminance(foregroundHex);

  const second =
    relativeLuminance(backgroundHex);

  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  const ratio =
    (lighter + 0.05) /
    (darker + 0.05);

  return {
    foreground: foregroundHex,
    background: backgroundHex,
    ratio: round(ratio, 2),
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5,
  };
}

function createPaletteColor(
  h: number,
  s: number,
  l: number
): PaletteColor {
  const normalizedHue =
    ((h % 360) + 360) % 360;

  const safeSaturation =
    clamp(s, 0, 100);

  const safeLightness =
    clamp(l, 0, 100);

  const rgb = hslToRgb(
    normalizedHue,
    safeSaturation,
    safeLightness
  );

  return {
    hex: rgbToHex(
      rgb.r,
      rgb.g,
      rgb.b
    ),
    rgb,
    hsl: {
      h: round(normalizedHue),
      s: round(safeSaturation, 1),
      l: round(safeLightness, 1),
    },
  };
}

export function generatePalette(
  baseHex: string,
  type:
    | "complementary"
    | "analogous"
    | "triadic"
    | "split-complementary"
    | "tetradic"
    | "monochromatic"
): PaletteColor[] {
  const base = hexToHsl(baseHex);

  switch (type) {
    case "complementary":
      return [
        createPaletteColor(
          base.h,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 180,
          base.s,
          base.l
        ),
      ];

    case "analogous":
      return [
        createPaletteColor(
          base.h - 30,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 30,
          base.s,
          base.l
        ),
      ];

    case "triadic":
      return [
        createPaletteColor(
          base.h,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 120,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 240,
          base.s,
          base.l
        ),
      ];

    case "split-complementary":
      return [
        createPaletteColor(
          base.h,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 150,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 210,
          base.s,
          base.l
        ),
      ];

    case "tetradic":
      return [
        createPaletteColor(
          base.h,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 90,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 180,
          base.s,
          base.l
        ),
        createPaletteColor(
          base.h + 270,
          base.s,
          base.l
        ),
      ];

    case "monochromatic":
      return [
        createPaletteColor(
          base.h,
          base.s,
          20
        ),
        createPaletteColor(
          base.h,
          base.s,
          35
        ),
        createPaletteColor(
          base.h,
          base.s,
          50
        ),
        createPaletteColor(
          base.h,
          base.s,
          65
        ),
        createPaletteColor(
          base.h,
          base.s,
          80
        ),
      ];

    default:
      throw new Error(
        "Unsupported palette type."
      );
  }
}

export function generateShadesAndTints(
  baseHex: string,
  steps = 5
): {
  shades: PaletteColor[];
  base: PaletteColor;
  tints: PaletteColor[];
} {
  const safeSteps = clamp(
    Math.round(steps),
    2,
    10
  );

  const base = hexToHsl(baseHex);

  const baseColor = createPaletteColor(
    base.h,
    base.s,
    base.l
  );

  const shades = Array.from(
    { length: safeSteps },
    (_, index) => {
      const amount =
        (index + 1) /
        (safeSteps + 1);

      return createPaletteColor(
        base.h,
        base.s,
        base.l * (1 - amount)
      );
    }
  ).reverse();

  const tints = Array.from(
    { length: safeSteps },
    (_, index) => {
      const amount =
        (index + 1) /
        (safeSteps + 1);

      return createPaletteColor(
        base.h,
        base.s,
        base.l +
          (100 - base.l) * amount
      );
    }
  );

  return {
    shades,
    base: baseColor,
    tints,
  };
}

export function generateGradientCss(
  firstColor: string,
  secondColor: string,
  angle = 90
): string {
  const first =
    normalizeHex(firstColor);

  const second =
    normalizeHex(secondColor);

  if (!Number.isFinite(angle)) {
    throw new Error(
      "Enter a valid gradient angle."
    );
  }

  const normalizedAngle =
    ((angle % 360) + 360) % 360;

  return `linear-gradient(${normalizedAngle}deg, ${first} 0%, ${second} 100%)`;
}

export function describeColor(
  hexValue: string
) {
  const hex =
    normalizeHex(hexValue);

  const rgb =
    hexToRgb(hex);

  const hsl =
    rgbToHsl(
      rgb.r,
      rgb.g,
      rgb.b
    );

  const cmyk =
    rgbToCmyk(
      rgb.r,
      rgb.g,
      rgb.b
    );

  return {
    hex,
    rgb,
    hsl,
    cmyk,
    css: {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    },
  };
}