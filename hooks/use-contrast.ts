"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const Key = "contrast";

export const ContrastKind = {
  Normal: "normal",
  High: "high",
} as const;
export type ContrastKind = (typeof ContrastKind)[keyof typeof ContrastKind];

export const useContrast = () => {
  const [value, setValue] = useState<ContrastKind>();

  /**
   * コントラストが標準か
   */
  const isNormal = useMemo(() => value === ContrastKind.Normal, [value]);

  /**
   * コントラストが高いか
   */
  const isHigh = useMemo(() => value === ContrastKind.High, [value]);

  /**
   * コントラストを更新する
   */
  const update = useCallback((value: ContrastKind) => {
    document.documentElement.setAttribute("data-contrast", value);
    localStorage.setItem(Key, value);
  }, []);

  /**
   * コントラストを切り替える
   */
  const toggle = useCallback(
    () =>
      setValue((current) => {
        const value: ContrastKind =
          current === ContrastKind.Normal
            ? ContrastKind.High
            : ContrastKind.Normal;

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
      ContrastKind.Normal) as ContrastKind;

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
