"use client";

import { useMedia } from "react-use";

/**
 * デバイスサイズの閾値
 */
export const DeviceSizes = {
  /** モバイルとタブレットの境界ピクセル */
  MobileBreakpoint: 768,
  /** タブレットとデスクトップの境界ピクセル */
  TabletBreakpoint: 1024,
} as const;

/**
 * UIコンポーネントの寸法定数
 */
export const UIDimensions = {
  /** セレクトドロップダウンの推定最大高さ（ピクセル） */
  SelectDropdownMaxHeight: 320,
  /** 画面下部のマージン（ピクセル） */
  BottomSafetyMargin: 90,
} as const;

export const useResponsive = () => {
  const isMobile = useMedia(
    `(max-width: ${DeviceSizes.MobileBreakpoint}px)`,
    true,
  );

  const isTablet = useMedia(
    `(min-width: ${DeviceSizes.MobileBreakpoint + 1}px) and (max-width: ${DeviceSizes.TabletBreakpoint}px)`,
    false,
  );

  const isDesktop = useMedia(
    `(min-width: ${DeviceSizes.TabletBreakpoint + 1}px)`,
    false,
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
