import type { Metadata } from "next";

import { ColorPalette } from "@/features/playgrounds/color-palette";

export const metadata: Metadata = {
  title: "カラーパレット",
};

export default function ColorPalettePage() {
  return <ColorPalette />;
}
