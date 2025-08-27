"use client";

import { useContrast, useTheme, useWindow } from "@/hooks";
import { evaluateContrast, varsToHex } from "@/styles/functions";

type Evaluation = {
  name: string;
  description: string;
  background: string;
  foreground: string;
};

const evaluations: Evaluation[] = [
  {
    name: "基本カラー",
    description: "アプリケーションの基本的な色を表現する",
    background: "--color-foundation",
    foreground: "--color-primary",
  },
  {
    name: "補助カラー",
    description: "アプリケーションの補助的な色を表現する",
    background: "--color-foundation",
    foreground: "--color-secondary",
  },
  {
    name: "主要ボタン",
    description: "「保存」や「次へ」など、ユーザーの主要アクションを促す",
    background: "--color-brand",
    foreground: "--color-foreground",
  },
  {
    name: "補助ボタン",
    description: "「キャンセル」や「前へ」など、補助的な操作を促す",
    background: "--color-accent",
    foreground: "--color-foreground",
  },
  {
    name: "成功メッセージ",
    description:
      "操作が完了したことをユーザーへ通知する肯定的なフィードバックを表す",
    background: "--color-success",
    foreground: "--color-foreground",
  },
  {
    name: "エラーメッセージ",
    description:
      "操作が失敗したことをユーザーへ通知する否定的なフィードバックを表す",
    background: "--color-error",
    foreground: "--color-foreground",
  },
];

export const ContrastEvaluation = () => {
  const window = useWindow();

  /**
   * テーマとコントラストの変更時に再レンダリングさせる
   */
  useTheme();
  useContrast();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="relative inline-flex items-center font-bold text-2xl tracking-tight">
        <span className="relative z-10">評価</span>
        <span className="absolute bottom-1 left-0 z-0 h-3 w-16 rounded-sm bg-accent opacity-20" />
      </h2>
      {window.enabled && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {evaluations.map((evaluation) => {
            const evaluated = evaluateContrast(
              varsToHex(evaluation.foreground),
              varsToHex(evaluation.background),
            );

            return (
              <div
                key={evaluation.name}
                className="group/card flex flex-col overflow-hidden rounded-lg border border-outline transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className="relative flex flex-col items-center justify-center gap-2 border-outline border-b px-6 py-10 transition-all duration-300 group-hover/card:py-12"
                  style={{
                    backgroundColor: varsToHex(evaluation.background),
                    color: varsToHex(evaluation.foreground),
                  }}
                >
                  <span className="text-center font-bold text-xl">
                    {evaluation.name}
                  </span>
                  <span className="text-center text-sm">
                    {evaluation.description}
                  </span>
                </div>

                <div className="flex flex-col gap-5 bg-foundation p-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg border border-outline bg-foundation p-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-secondary text-xs">
                          視認性スコア
                        </span>
                        <div className="flex items-baseline gap-1 text-primary">
                          <span className="font-bold text-xl">
                            {evaluated.ratio.toFixed(2)}
                          </span>
                          <span className="text-secondary text-xs">/10</span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 rounded-full px-4 py-2 font-bold text-foreground text-sm shadow-sm"
                        style={{ backgroundColor: evaluated.color }}
                      >
                        {evaluated.badge}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="h-3 overflow-hidden rounded-full border border-outline bg-outline/10">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, (evaluated.ratio / 10) * 100)}%`,
                            backgroundColor: evaluated.color,
                          }}
                        />
                      </div>

                      <p className="flex items-center gap-2 text-secondary text-xs">
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-outline"
                          style={{ backgroundColor: evaluated.color }}
                        />
                        <span>{evaluated.description}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
