import type { Metadata } from "next";

import { ColorPalettes } from "@/features/playgrounds/color-palettes";

export const metadata: Metadata = {
  title: "カラーパレット",
};

export default function Page() {
  return <ColorPalettes />;
}
