"use client";

import { type PropsWithChildren, createContext, useContext } from "react";

import { useContrast, useSize, useTheme } from "@/hooks";

/**
 * Accessibility
 *
 * アクセシビリティ機能のコンテキスト
 */
export type Accessibility = {
  theme: ReturnType<typeof useTheme>;
  contrast: ReturnType<typeof useContrast>;
  size: ReturnType<typeof useSize>;
};
export const Accessibility = createContext<Accessibility | null>(null);

/**
 * useAccessibility
 *
 * アクセシビリティ機能を使用するためのフック
 */
export const useAccessibility = () =>
  useContext(Accessibility) as Accessibility;

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

  return (
    <Accessibility.Provider value={{ theme, contrast, size }}>
      {children}
    </Accessibility.Provider>
  );
};
