"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const Key = "size";

export const SizeVariants = {
  Small: "small",
  Normal: "normal",
  Large: "large",
} as const;
export type SizeVariant = (typeof SizeVariants)[keyof typeof SizeVariants];

export const useSize = () => {
  const [value, setValue] = useState<SizeVariant>();

  /**
   * 文字サイズが小さいか
   */
  const isSmall = useMemo(() => value === SizeVariants.Small, [value]);

  /**
   * 文字サイズが標準か
   */
  const isNormal = useMemo(() => value === SizeVariants.Normal, [value]);

  /**
   * 文字サイズが大きいか
   */
  const isLarge = useMemo(() => value === SizeVariants.Large, [value]);

  /**
   * 文字サイズを更新する
   */
  const update = useCallback((value: SizeVariant) => {
    document.documentElement.setAttribute("data-size", value);
    localStorage.setItem(Key, value);
  }, []);

  /**
   * 文字サイズを拡大する
   */
  const increase = useCallback(
    () =>
      setValue((current) => {
        if (current === SizeVariants.Large) return current;

        const value: SizeVariant =
          current === SizeVariants.Small
            ? SizeVariants.Normal
            : SizeVariants.Large;

        update(value);

        return value;
      }),
    [update],
  );

  /**
   * 文字サイズを縮小する
   */
  const decrease = useCallback(
    () =>
      setValue((current) => {
        if (current === SizeVariants.Small) return current;

        const value: SizeVariant =
          current === SizeVariants.Large
            ? SizeVariants.Normal
            : SizeVariants.Small;

        update(value);

        return value;
      }),
    [update],
  );

  /**
   * マウント時にローカルストレージから文字サイズを読み込む
   */
  useEffect(() => {
    const value = (localStorage.getItem(Key) ||
      SizeVariants.Normal) as SizeVariant;

    update(value);

    setValue(value);
  }, [update]);

  return {
    key: Key,
    value,
    isSmall,
    isNormal,
    isLarge,
    increase,
    decrease,
  };
};
