import { memo } from "react";

import type { Member } from "@/models";
import { date } from "@/services/date";
import { Links } from "./links";

type FooterProps = {
  /** メンバー情報 */
  member: Member;
  /** ナビゲーションを表示するか */
  links: boolean;
};

export const Footer = memo<FooterProps>(({ member, links = false }) => (
  <footer className="w-full border-outline border-t bg-foundation shadow-sm">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 md:px-6 lg:px-8">
      {links && (
        <Links
          prefetch={!!member}
          className="flex w-full justify-around pt-1 md:max-w-md md:justify-between"
        />
      )}

      <div className="flex items-center justify-center gap-1 pt-2 text-center text-secondary text-xs">
        <span>© {date().format("YYYY")}</span>
        <span>おうちずかん</span>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";
