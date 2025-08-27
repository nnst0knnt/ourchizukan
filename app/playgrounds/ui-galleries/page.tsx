import type { Metadata } from "next";

import { UIGalleries } from "@/features/ui-galleries";

export const metadata: Metadata = {
  title: "UIギャラリー",
};

/**
 * UIギャラリー
 *
 * `おうちずかん`で使用しているUIを紹介するページです。
 */
export default function Page() {
  return <UIGalleries />;
}
