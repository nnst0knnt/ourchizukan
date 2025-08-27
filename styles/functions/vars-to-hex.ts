/**
 * CSS変数を16進数カラーコードに変換する
 */
export const varsToHex = (vars: string): string =>
  typeof window !== "undefined"
    ? getComputedStyle(document.documentElement).getPropertyValue(vars).trim()
    : "";
