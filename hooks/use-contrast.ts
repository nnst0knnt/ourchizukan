"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const Key = "contrast";

export const ContrastVariants = {
  Normal: "normal",
  High: "high",
} as const;
export type ContrastVariant =
  (typeof ContrastVariants)[keyof typeof ContrastVariants];

export const useContrast = () => {
  const [value, setValue] = useState<ContrastVariant>();

  /**
   * コントラストが標準か
   */
  const isNormal = useMemo(() => value === ContrastVariants.Normal, [value]);

  /**
   * コントラストが高いか
   */
  const isHigh = useMemo(() => value === ContrastVariants.High, [value]);

  /**
   * コントラストを更新する
   */
  const update = useCallback((value: ContrastVariant) => {
    document.documentElement.setAttribute("data-contrast", value);
    localStorage.setItem(Key, value);
  }, []);

  /**
   * コントラストを切り替える
   */
  const toggle = useCallback(
    () =>
      setValue((current) => {
        const value: ContrastVariant =
          current === ContrastVariants.Normal
            ? ContrastVariants.High
            : ContrastVariants.Normal;

        update(value);

        return value;
      }),
    [update],
  );

  /**
   * マウント時にローカルストレージからコントラストを読み込む
   */
  useEffect(() => {
    const value = (localStorage.getItem(Key) ||
      ContrastVariants.Normal) as ContrastVariant;

    update(value);

    setValue(value);
  }, [update]);

  return {
    key: Key,
    value,
    isNormal,
    isHigh,
    toggle,
  };
};
