"use client";

import type { PropsWithChildren } from "react";

import { useContrast, useSize, useTheme } from "@/hooks";

/**
 * AccessibilityProvider
 *
 * アクセシビリティ機能を提供します。
 */
export const AccessibilityProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const contrast = useContrast();
  const size = useSize();

  if (!theme.value || !contrast.value || !size.value) return null;

  return <>{children}</>;
};
