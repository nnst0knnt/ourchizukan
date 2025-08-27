"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export const ThemeLocalStorageKey = "theme";

export const ThemeDomAttributeName = "data-theme";

export const ThemeKind = {
  Light: "light",
  Dark: "dark",
} as const;
export type ThemeKind = (typeof ThemeKind)[keyof typeof ThemeKind];

export const useTheme = () => {
  const [value, setValue] = useState<ThemeKind>();

  /**
   * ライトモードか
   */
  const isLight = useMemo(() => value === ThemeKind.Light, [value]);

  /**
   * ダークモードか
   */
  const isDark = useMemo(() => value === ThemeKind.Dark, [value]);

  /**
   * テーマを更新する
   */
  const update = useCallback((value: ThemeKind) => {
    document.documentElement.setAttribute(ThemeDomAttributeName, value);
    localStorage.setItem(ThemeLocalStorageKey, value);
  }, []);

  /**
   * テーマを切り替える
   */
  const toggle = useCallback(
    () =>
      setValue((current) => {
        const value: ThemeKind =
          current === ThemeKind.Light ? ThemeKind.Dark : ThemeKind.Light;

        update(value);

        return value;
      }),
    [update],
  );

  /**
   * マウント時にローカルストレージからテーマを読み込む
   */
  useEffect(() => {
    const value = (localStorage.getItem(ThemeLocalStorageKey) ||
      ThemeKind.Light) as ThemeKind;

    update(value);

    setValue(value);
  }, [update]);

  return {
    key: ThemeLocalStorageKey,
    value,
    isLight,
    isDark,
    toggle,
  };
};
