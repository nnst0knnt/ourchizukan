"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export const SizeLocalStorageKey = "size";

export const SizeDomAttributeName = "data-size";

export const SizeKind = {
  Small: "small",
  Normal: "normal",
  Large: "large",
} as const;
export type SizeKind = (typeof SizeKind)[keyof typeof SizeKind];

export const useSize = () => {
  const [value, setValue] = useState<SizeKind>();

  /**
   * 文字サイズが小さいか
   */
  const isSmall = useMemo(() => value === SizeKind.Small, [value]);

  /**
   * 文字サイズが標準か
   */
  const isNormal = useMemo(() => value === SizeKind.Normal, [value]);

  /**
   * 文字サイズが大きいか
   */
  const isLarge = useMemo(() => value === SizeKind.Large, [value]);

  /**
   * 文字サイズを更新する
   */
  const update = useCallback((value: SizeKind) => {
    document.documentElement.setAttribute(SizeDomAttributeName, value);
    localStorage.setItem(SizeLocalStorageKey, value);
  }, []);

  /**
   * 文字サイズを拡大する
   */
  const increase = useCallback(
    () =>
      setValue((current) => {
        if (current === SizeKind.Large) return current;

        const value: SizeKind =
          current === SizeKind.Small ? SizeKind.Normal : SizeKind.Large;

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
        if (current === SizeKind.Small) return current;

        const value: SizeKind =
          current === SizeKind.Large ? SizeKind.Normal : SizeKind.Small;

        update(value);

        return value;
      }),
    [update],
  );

  /**
   * マウント時にローカルストレージから文字サイズを読み込む
   */
  useEffect(() => {
    const value = (localStorage.getItem(SizeLocalStorageKey) ||
      SizeKind.Normal) as SizeKind;

    update(value);

    setValue(value);
  }, [update]);

  return {
    key: SizeLocalStorageKey,
    value,
    isSmall,
    isNormal,
    isLarge,
    increase,
    decrease,
  };
};
