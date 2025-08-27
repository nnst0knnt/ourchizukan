import { memo } from "react";

import type { Member } from "@/models";
import { date } from "@/services/date";
import { Links } from "./links";

/**
 * FooterProps
 */
type FooterProps = {
  member: Member;
};

/**
 * Footer
 *
 * アプリケーション全体のフッターです。
 * 主要ページへのナビゲーションと著作権表示を提供します。
 */
export const Footer = memo<FooterProps>(async ({ member }) => (
  <footer className="w-full border-outline border-t bg-foundation shadow-sm">
    <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center px-4 md:px-6 lg:px-8">
      <Links
        disabled={!member}
        className="flex w-full justify-around pt-1 md:max-w-md md:justify-between"
      />
    </div>
    <div className="flex items-center justify-center gap-1 pb-3 text-center text-secondary text-xs">
      <span>© {date().format("YYYY")}</span>
      <span>おうちずかん</span>
    </div>
  </footer>
));

Footer.displayName = "Footer";
