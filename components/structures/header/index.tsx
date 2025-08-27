import { memo } from "react";

import { cn } from "@/styles/functions";

import type { Member } from "@/models";
import { LogoLink } from "../../elements/anchor";
import { AccessibilityControls } from "../../tools";

/**
 * HeaderProps
 */
type HeaderProps = {
  member: Member;
};

/**
 * Header
 *
 * アプリケーション全体のヘッダーです。
 * アプリケーションの最上部に常時表示され、ロゴとアクセシビリティ設定を提供します。
 */
export const Header = memo<HeaderProps>(({ member }) => (
  <header className="w-full border-outline border-b bg-foundation shadow-sm">
    <div
      className={cn(
        "mx-auto flex h-14 w-full max-w-7xl items-center justify-between md:h-16",
        "px-4 md:px-6 lg:px-8",
      )}
    >
      <LogoLink size="large" className="py-2" disabled={!member} />
      <AccessibilityControls className="py-2" />
    </div>
  </header>
));

Header.displayName = "Header";
