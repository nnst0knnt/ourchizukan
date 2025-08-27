"use client";

import { useMedia } from "react-use";

export const DeviceSizes = {
  MobileBreakpoint: 768,
  TabletBreakpoint: 1024,
} as const;

export const UIDimensions = {
  SelectDropdownMaxHeight: 320,
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
