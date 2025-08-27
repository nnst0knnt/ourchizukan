"use client";

import { isMobile } from "react-device-detect";

import { LogoLink } from "../elements";
import { AccessibilityControls } from "../tools";

/**
 * Header
 *
 * アプリケーションの最上部に常時表示され、ロゴとアクセシビリティ設定を提供します。
 */
export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-outline border-b bg-foundation shadow-sm">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-4 md:px-6 lg:px-8">
        <LogoLink size="large" className="py-2" iconOnly={isMobile} />
        <AccessibilityControls className="py-2" />
      </div>
    </header>
  );
};
