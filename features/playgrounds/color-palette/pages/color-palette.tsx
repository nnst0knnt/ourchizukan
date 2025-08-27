import { Palette } from "lucide-react";

import { ColorList } from "../components/color-list";
import { ContrastEvaluation } from "../components/contrast-evaluation";

export const ColorPalette = () => (
  <div className="flex flex-col gap-6 md:gap-8">
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="relative flex flex-col gap-4 bg-foundation">
        <h1 className="flex flex-row items-center justify-between gap-2 font-bold text-3xl text-primary">
          <span>カラーパレット</span>
          <span className="text-brand opacity-80">
            <Palette size={48} />
          </span>
        </h1>
        <div className="flex flex-col gap-2 text-secondary text-sm">
          <p>
            <strong>おうちずかん</strong>
            <span>で使用している色を紹介します。</span>
          </p>
          <p>
            十分なコントラスト比を確保し、視認性を向上させる配色を採用しています。
          </p>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-8">
      <ColorList />
      <ContrastEvaluation />
    </div>
  </div>
);
