"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const Key = "theme";

export const ThemeVariants = {
  Light: "light",
  Dark: "dark",
} as const;
export type ThemeVariant = (typeof ThemeVariants)[keyof typeof ThemeVariants];

export const useTheme = () => {
  const [value, setValue] = useState<ThemeVariant>();

  /**
   * ライトモードか
   */
  const isLight = useMemo(() => value === ThemeVariants.Light, [value]);

  /**
   * ダークモードか
   */
  const isDark = useMemo(() => value === ThemeVariants.Dark, [value]);

  /**
   * テーマを更新する
   */
  const update = useCallback((value: ThemeVariant) => {
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem(Key, value);
  }, []);

  /**
   * テーマを切り替える
   */
  const toggle = useCallback(
    () =>
      setValue((current) => {
        const value: ThemeVariant =
          current === ThemeVariants.Light
            ? ThemeVariants.Dark
            : ThemeVariants.Light;

        update(value);

        return value;
      }),
    [update],
  );

  /**
   * マウント時にローカルストレージからテーマを読み込む
   */
  useEffect(() => {
    const value = (localStorage.getItem(Key) ||
      ThemeVariants.Light) as ThemeVariant;

    update(value);

    setValue(value);
  }, [update]);

  return {
    key: Key,
    value,
    isLight,
    isDark,
    toggle,
  };
};
