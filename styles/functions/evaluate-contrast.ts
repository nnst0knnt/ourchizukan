import { type Rgb, hexToRgb } from "./hex-to-rgb";

/**
 * WCAGアクセシビリティ基準値
 *
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
const WcagContrastRatios = {
  /** AA基準の大きなテキストの最小コントラスト比 */
  AALarge: 3,
  /** AA基準の通常テキストの最小コントラスト比 */
  AANormal: 4.5,
  /** AAA基準の大きなテキストの最小コントラスト比 */
  AAALarge: 4.5,
  /** AAA基準の通常テキストの最小コントラスト比 */
  AAANormal: 7,
  /** 高齢者向けの推奨最小コントラスト比 */
  ElderlyFriendly: 7,
} as const;

/**
 * コントラスト評価のレベル
 */
const ContrastLevels = {
  Perfect: "Perfect",
  VeryGood: "VeryGood",
  Good: "Good",
  Normal: "Normal",
  Bad: "Bad",
  VeryBad: "VeryBad",
} as const;
type ContrastLevel = keyof typeof ContrastLevels;

/**
 * コントラスト評価のバッジ
 */
const ContrastBadges = {
  Perfect: "最高",
  VeryGood: "非常に良い",
  Good: "良い",
  Normal: "普通",
  Bad: "低い",
  VeryBad: "非常に低い",
} as const satisfies Record<ContrastLevel, string>;
type ContrastBadge = (typeof ContrastBadges)[keyof typeof ContrastBadges];

/**
 * コントラスト評価の説明
 */
const ContrastDescriptions = {
  Perfect: "高齢者向けにも適した視認性",
  VeryGood: "すべてのWCAG基準を満たす",
  Good: "通常サイズのテキストに適した視認性",
  Normal: "大きなテキストに適した視認性",
  Bad: "大きなテキストのみ基準を満たす",
  VeryBad: "WCAG基準を満たしていない",
} as const satisfies Record<ContrastLevel, string>;
type ContrastDescription =
  (typeof ContrastDescriptions)[keyof typeof ContrastDescriptions];

/**
 * コントラスト評価のカラー
 */
const ContrastColors = {
  Perfect: "#00796B",
  VeryGood: "#388E3C",
  Good: "#1976D2",
  Normal: "#FBC02D",
  Bad: "#F57C00",
  VeryBad: "#D32F2F",
} as const satisfies Record<ContrastLevel, string>;
type ContrastColor = (typeof ContrastColors)[keyof typeof ContrastColors];

/**
 * 色のコントラスト比を評価する
 */
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

  if (!ratio) throw new Error("コントラスト比を計算できません");

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

/**
 * 色の相対輝度を計算する
 */
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

/**
 * 2色間のコントラスト比を計算する
 */
const getRatio = (color1: string, color2: string): number | null => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return null;

  const luminance1 = getLuminance(rgb1);
  const luminance2 = getLuminance(rgb2);

  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
};
