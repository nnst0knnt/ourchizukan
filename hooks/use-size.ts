"use client";

import { useCallback, useEffect, useMemo } from "react";

import { create } from "zustand";

export const SizeLocalStorageKey = "size";

export const SizeDomAttributeName = "data-size";

export const SizeKind = {
  Small: "small",
  Normal: "normal",
  Large: "large",
} as const;
export type SizeKind = (typeof SizeKind)[keyof typeof SizeKind];

const useStore = create<{
  value: SizeKind | null;
  set: (value: SizeKind) => SizeKind;
}>()((_set, _get) => ({
  value: null,
  set: (value) => {
    _set({ value });

    return value;
  },
}));

export const useSize = () => {
  const { value, set } = useStore();

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
      update(
        set(
          value === SizeKind.Small
            ? SizeKind.Normal
            : value === SizeKind.Normal
              ? SizeKind.Large
              : SizeKind.Large,
        ),
      ),
    [set, update, value],
  );

  /**
   * 文字サイズを縮小する
   */
  const decrease = useCallback(
    () =>
      update(
        set(
          value === SizeKind.Large
            ? SizeKind.Normal
            : value === SizeKind.Normal
              ? SizeKind.Small
              : SizeKind.Small,
        ),
      ),
    [set, update, value],
  );

  /**
   * マウント時にローカルストレージから文字サイズを読み込む
   */
  useEffect(() => {
    const value = (localStorage.getItem(SizeLocalStorageKey) ||
      SizeKind.Normal) as SizeKind;

    update(value);

    set(value);
  }, [set, update]);

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
