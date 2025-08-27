import { hexToRgb, type Rgb } from "./hex-to-rgb";

const WcagContrastRatios = {
  AALarge: 3,
  AANormal: 4.5,
  AAALarge: 4.5,
  AAANormal: 7,
  ElderlyFriendly: 7,
} as const;

const ContrastLevels = {
  Perfect: "perfect",
  VeryGood: "very-good",
  Good: "good",
  Normal: "normal",
  Bad: "bad",
  VeryBad: "very-bad",
} as const;

type ContrastLevel = (typeof ContrastLevels)[keyof typeof ContrastLevels];

const ContrastBadges = {
  "perfect": "最高",
  "very-good": "非常に良い",
  "good": "良い",
  "normal": "普通",
  "bad": "低い",
  "very-bad": "非常に低い",
} as const satisfies Record<ContrastLevel, string>;

type ContrastBadge = (typeof ContrastBadges)[keyof typeof ContrastBadges];

const ContrastDescriptions = {
  "perfect": "高齢者向けにも適した視認性",
  "very-good": "すべてのWCAG基準を満たす",
  "good": "通常サイズのテキストに適した視認性",
  "normal": "大きなテキストに適した視認性",
  "bad": "大きなテキストのみ基準を満たす",
  "very-bad": "WCAG基準を満たしていない",
} as const satisfies Record<ContrastLevel, string>;

type ContrastDescription =
  (typeof ContrastDescriptions)[keyof typeof ContrastDescriptions];

const ContrastColors = {
  "perfect": "#00796B",
  "very-good": "#388E3C",
  "good": "#1976D2",
  "normal": "#FBC02D",
  "bad": "#F57C00",
  "very-bad": "#D32F2F",
} as const satisfies Record<ContrastLevel, string>;

type ContrastColor = (typeof ContrastColors)[keyof typeof ContrastColors];

export const evaluateContrast = (
  foreground: string,
  background: string,
): {
  ratio: number;
  badge: ContrastBadge;
  description: ContrastDescription;
  color: ContrastColor;
} => {
  const ratio = getRatio(foreground, background);

  const isElderlyFriendly = ratio >= WcagContrastRatios.ElderlyFriendly;
  const isAAANormal = ratio >= WcagContrastRatios.AAANormal;
  const isAANormal = ratio >= WcagContrastRatios.AANormal;
  const isAAALarge = ratio >= WcagContrastRatios.AAALarge;
  const isAALarge = ratio >= WcagContrastRatios.AALarge;

  let level: ContrastLevel;
  if (isAAANormal) {
    level = isElderlyFriendly
      ? ContrastLevels.Perfect
      : ContrastLevels.VeryGood;
  } else if (isAANormal) {
    level = ContrastLevels.Good;
  } else if (isAAALarge) {
    level = ContrastLevels.Normal;
  } else if (isAALarge) {
    level = ContrastLevels.Bad;
  } else {
    level = ContrastLevels.VeryBad;
  }

  return {
    ratio,
    badge: ContrastBadges[level],
    description: ContrastDescriptions[level],
    color: ContrastColors[level],
  };
};

const getLuminance = (color: Rgb): number => {
  const sRGB = {
    r: color.r / 255,
    g: color.g / 255,
    b: color.b / 255,
  };

  const rgb = {
    r: sRGB.r <= 0.03928 ? sRGB.r / 12.92 : ((sRGB.r + 0.055) / 1.055) ** 2.4,
    g: sRGB.g <= 0.03928 ? sRGB.g / 12.92 : ((sRGB.g + 0.055) / 1.055) ** 2.4,
    b: sRGB.b <= 0.03928 ? sRGB.b / 12.92 : ((sRGB.b + 0.055) / 1.055) ** 2.4,
  };

  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
};

const getRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const luminance1 = getLuminance(rgb1);
  const luminance2 = getLuminance(rgb2);

  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
};
