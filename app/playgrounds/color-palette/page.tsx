"use client";

import { useContrast, useTheme } from "@/hooks";
import { evaluateContrast, varsToHex } from "@/styles/functions";
import { cn } from "@/styles/functions";
import { Eye, EyeOff, Moon, Palette, Sun } from "lucide-react";

type Color = {
  name: string;
  category: string;
  description: string;
  className: string;
  cssVar: string;
};

type Evaluation = {
  name: string;
  description: string;
  background: string;
  foreground: string;
};

const colors: Color[] = [
  {
    name: "ベースカラー",
    category: "背景色",
    description: "目に優しく長時間見ても疲れにくくさせる",
    className: "bg-base",
    cssVar: "--color-base",
  },
  {
    name: "ブランドカラー",
    category: "背景色",
    description: "らしさを表現する特徴的な色で重要な要素に注目させる",
    className: "bg-brand",
    cssVar: "--color-brand",
  },
  {
    name: "アクセントカラー",
    category: "背景色",
    description: "アクセントとしてブラントカラーを強調させる",
    className: "bg-accent",
    cssVar: "--color-accent",
  },
  {
    name: "テキストカラー",
    category: "文字色",
    description: "濃い背景上で読みやすい明るめの文字色で目の負担を軽減させる",
    className: "bg-foreground",
    cssVar: "--color-foreground",
  },
  {
    name: "プライマリーカラー",
    category: "文字色",
    description: "タイトルや本文に使う基本的な文字色で読みやすさを高める",
    className: "bg-primary",
    cssVar: "--color-primary",
  },
  {
    name: "セカンダリーカラー",
    category: "文字色",
    description:
      "説明文やヒントなどの補助的な役割でプライマリーカラーを補完する",
    className: "bg-secondary",
    cssVar: "--color-secondary",
  },
  {
    name: "サクセスカラー",
    category: "背景色",
    description: "操作成功や完了を伝える",
    className: "bg-success",
    cssVar: "--color-success",
  },
  {
    name: "エラーカラー",
    category: "背景色",
    description: "操作失敗やエラーを伝える",
    className: "bg-error",
    cssVar: "--color-error",
  },
  {
    name: "フォーカスカラー",
    category: "区切り色",
    description: "現在選んでいる項目や入力中の場所を示す",
    className: "bg-focus",
    cssVar: "--color-focus",
  },
  {
    name: "アウトラインカラー",
    category: "区切り色",
    description: "要素間の境界線や枠線を示す",
    className: "bg-outline",
    cssVar: "--color-outline",
  },
];

const evaluations: Evaluation[] = [
  {
    name: "基本カラー",
    description: "アプリケーションの基本的な色を表現する",
    background: "--color-base",
    foreground: "--color-primary",
  },
  {
    name: "補助カラー",
    description: "アプリケーションの補助的な色を表現する",
    background: "--color-base",
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

export default function ColorPalette() {
  const theme = useTheme();
  const contrast = useContrast();

  if (!theme.value || !contrast.value) return null;

  return (
    <div className="min-h-screen bg-base text-primary flex flex-col antialiased">
      <div className="flex-1 flex flex-col gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="relative flex flex-col gap-4 bg-base">
            <h1 className="flex flex-row gap-2 items-center justify-between text-3xl font-bold text-primary">
              <span>カラーパレット</span>
              <span className="text-brand opacity-80">
                <Palette size={48} />
              </span>
            </h1>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-secondary">
                <strong className="font-medium">おうちずかん</strong>
                <span>で使用している色を紹介します。</span>
              </p>
              <p className="text-secondary">
                高齢者にも見やすく使いやすいよう、色の組み合わせに配慮しています。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center bg-base">
            <div className="min-w-47 flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-outline bg-base">
              <span className="text-sm font-medium flex items-center gap-2 text-primary">
                テーマ
              </span>
              <button
                type="button"
                onClick={theme.toggle}
                className={cn(
                  "relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-focus",
                  theme.isDark ? "bg-brand" : "bg-outline",
                )}
                aria-checked={theme.isDark}
                aria-label={
                  theme.isLight
                    ? "ダークモードに切り替え"
                    : "ライトモードに切り替え"
                }
                role="switch"
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full bg-foreground shadow-md transition-transform",
                    theme.isDark ? "translate-x-8" : "translate-x-1",
                  )}
                >
                  {theme.isLight ? (
                    <Sun size={12} className="text-brand" />
                  ) : (
                    <Moon size={12} className="text-brand" />
                  )}
                </span>
              </button>
            </div>
            <div className="min-w-47 flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-outline bg-base">
              <span className="text-sm font-medium flex items-center gap-2 text-primary">
                コントラスト
              </span>
              <button
                type="button"
                onClick={contrast.toggle}
                className={cn(
                  "relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-focus",
                  contrast.isHigh ? "bg-accent" : "bg-outline",
                )}
                aria-checked={contrast.isHigh}
                aria-label={
                  contrast.isNormal
                    ? "高コントラストに切り替え"
                    : "通常コントラストに切り替え"
                }
                role="switch"
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full bg-foreground shadow-md transition-transform",
                    contrast.isHigh ? "translate-x-8" : "translate-x-1",
                  )}
                >
                  {contrast.isNormal ? (
                    <Eye size={12} className="text-accent" />
                  ) : (
                    <EyeOff size={12} className="text-accent" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight relative inline-flex items-center">
              <span className="relative z-10">一覧</span>
              <span className="absolute bottom-1 left-0 w-16 h-3 bg-brand opacity-20 z-0 rounded-sm" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {colors.map((color) => (
                <div
                  key={color.cssVar}
                  className="flex flex-col rounded-lg overflow-hidden group/card transition-all duration-300 hover:shadow-lg border border-outline"
                >
                  <div
                    className={`h-32 ${color.className} relative group-hover/card:h-36 transition-all duration-300 flex items-end justify-end border-b border-outline`}
                  >
                    <div className="absolute top-3 left-3 bg-base border border-outline text-primary text-xs font-medium px-2 py-1 rounded shadow-sm">
                      {color.category}
                    </div>
                    <div className="bg-base border border-outline text-primary text-xs font-mono px-2 py-1 m-3 rounded shadow-sm">
                      {varsToHex(color.cssVar)}
                    </div>
                  </div>

                  <div className="min-h-45 flex flex-col justify-between gap-4 p-5 flex-1 bg-base">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-bold text-lg flex items-center gap-2 text-primary">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${color.className} border border-outline`}
                        />
                        {color.name}
                      </h3>
                      <p className="text-secondary text-sm">
                        {color.description}
                      </p>
                    </div>

                    <div className="flex justify-start">
                      <code className="bg-base border border-outline px-3 py-1.5 rounded text-xs font-mono text-primary">
                        {color.cssVar}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight relative inline-flex items-center">
              <span className="relative z-10">評価</span>
              <span className="absolute bottom-1 left-0 w-28 h-3 bg-accent opacity-20 z-0 rounded-sm" />
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {evaluations.map((evaluation) => {
                const evaluated = evaluateContrast(
                  varsToHex(evaluation.foreground),
                  varsToHex(evaluation.background),
                );

                return (
                  <div
                    key={evaluation.name}
                    className="flex flex-col rounded-lg overflow-hidden group/card transition-all duration-300 hover:shadow-lg border border-outline"
                  >
                    <div
                      className="flex flex-col items-center justify-center gap-2 py-10 px-6 group-hover/card:py-12 transition-all duration-300 relative border-b border-outline"
                      style={{
                        backgroundColor: varsToHex(evaluation.background),
                        color: varsToHex(evaluation.foreground),
                      }}
                    >
                      <span className="font-bold text-xl text-center">
                        {evaluation.name}
                      </span>
                      <span className="text-sm text-center">
                        {evaluation.description}
                      </span>
                    </div>

                    <div className="flex flex-col gap-5 p-5 bg-base">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-outline bg-base">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-secondary">
                              視認性スコア
                            </span>
                            <div className="flex items-baseline gap-1 text-primary">
                              <span className="text-xl font-bold">
                                {evaluated.ratio.toFixed(2)}
                              </span>
                              <span className="text-xs text-secondary">
                                /10
                              </span>
                            </div>
                          </div>
                          <div
                            className="px-4 py-2 rounded-full text-sm font-bold text-foreground flex items-center gap-2 shadow-sm"
                            style={{ backgroundColor: evaluated.color }}
                          >
                            {evaluated.badge}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="h-3 bg-outline/10 rounded-full overflow-hidden border border-outline">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(100, (evaluated.ratio / 10) * 100)}%`,
                                backgroundColor: evaluated.color,
                              }}
                            />
                          </div>

                          <p className="text-xs text-secondary flex items-center gap-2">
                            <span
                              className="inline-block w-3 h-3 rounded-full border border-outline"
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
          </section>
        </div>
      </div>
    </div>
  );
}
