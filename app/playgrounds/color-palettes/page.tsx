import type { Metadata } from "next";

import { ColorPalettes } from "@/features/color-palettes";

export const metadata: Metadata = {
  title: "カラーパレット",
};

/**
 * カラーパレット
 *
 * `おうちずかん`で使用している色を紹介するページです。
 */
export default function Page() {
  return <ColorPalettes />;
}
