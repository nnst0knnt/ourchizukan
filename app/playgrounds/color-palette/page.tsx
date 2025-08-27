"use client";

import { Glasses, Moon, Palette, Sun } from "lucide-react";

import { useContrast, useTheme } from "@/hooks";
import { evaluateContrast, varsToHex } from "@/styles/functions";
import { cn } from "@/styles/functions";

interface Color {
  name: string;
  category: string;
  description: string;
  className: string;
  cssVar: string;
}

interface Evaluation {
  name: string;
  description: string;
  background: string;
  foreground: string;
}

const colors: Color[] = [
  {
    name: "ベースカラー",
    category: "背景色",
    description: "目に優しく長時間見ても疲れにくくさせる",
    className: "bg-foundation",
    cssVar: "--color-foundation",
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

export default function ColorPalette() {
  const theme = useTheme();
  const contrast = useContrast();

  if (!theme.value || !contrast.value) return null;

  return (
    <div className="flex min-h-screen flex-col bg-foundation text-primary antialiased">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6 lg:gap-8 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="relative flex flex-col gap-4 bg-foundation">
            <h1 className="flex flex-row items-center justify-between gap-2 font-bold text-3xl text-primary">
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

          <div className="flex flex-col flex-wrap items-start gap-4 bg-foundation md:flex-row md:items-center">
            <div className="flex min-w-full items-center justify-between gap-4 rounded-lg border border-outline bg-foundation px-4 py-3 md:min-w-52">
              <span className="flex items-center gap-2 font-medium text-primary text-sm">
                テーマ
              </span>
              <button
                type="button"
                onClick={theme.toggle}
                className={cn(
                  "relative inline-flex h-7 w-20 items-center rounded-full transition-colors",
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
                    "flex h-6 w-6 items-center justify-center rounded-full bg-foreground shadow-md transition-transform",
                    theme.isDark ? "translate-x-12" : "translate-x-2",
                  )}
                >
                  {theme.isLight ? (
                    <Sun size={14} className="text-brand" />
                  ) : (
                    <Moon size={14} className="text-brand" />
                  )}
                </span>
              </button>
            </div>
            <div className="flex min-w-full items-center justify-between gap-4 rounded-lg border border-outline bg-foundation px-4 py-3 md:min-w-52">
              <span className="flex items-center gap-2 font-medium text-primary text-sm">
                コントラスト
              </span>
              <button
                type="button"
                onClick={contrast.toggle}
                className={cn(
                  "relative inline-flex h-7 w-20 items-center rounded-full transition-colors",
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
                    "flex h-6 w-6 items-center justify-center rounded-full bg-foreground shadow-md transition-transform",
                    contrast.isHigh ? "translate-x-12" : "translate-x-2",
                  )}
                >
                  {contrast.isNormal ? (
                    <Glasses
                      size={14}
                      className="text-accent"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Glasses
                      size={14}
                      className="text-accent"
                      strokeWidth={3}
                    />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="relative inline-flex items-center font-bold text-2xl tracking-tight">
              <span className="relative z-10">一覧</span>
              <span className="absolute bottom-1 left-0 z-0 h-3 w-16 rounded-sm bg-brand opacity-20" />
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
              {colors.map((color) => (
                <div
                  key={color.cssVar}
                  className="group/card flex flex-col overflow-hidden rounded-lg border border-outline transition-all duration-300 hover:shadow-lg"
                >
                  <div
                    className={`h-32 ${color.className} relative flex items-end justify-end border-outline border-b transition-all duration-300 group-hover/card:h-36`}
                  >
                    <div className="absolute top-3 left-3 rounded border border-outline bg-foundation px-2 py-1 font-medium text-primary text-xs shadow-sm">
                      {color.category}
                    </div>
                    <div className="m-3 rounded border border-outline bg-foundation px-2 py-1 font-mono text-primary text-xs shadow-sm">
                      {varsToHex(color.cssVar)}
                    </div>
                  </div>

                  <div className="flex min-h-45 flex-1 flex-col justify-between gap-4 bg-foundation p-5">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="flex items-center gap-2 font-bold text-lg text-primary">
                        <span
                          className={`inline-block h-3 w-3 rounded-full ${color.className} border border-outline`}
                        />
                        {color.name}
                      </h3>
                      <p className="text-secondary text-sm">
                        {color.description}
                      </p>
                    </div>

                    <div className="flex justify-start">
                      <code className="rounded border border-outline bg-foundation px-3 py-1.5 font-mono text-primary text-xs">
                        {color.cssVar}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="relative inline-flex items-center font-bold text-2xl tracking-tight">
              <span className="relative z-10">評価</span>
              <span className="absolute bottom-1 left-0 z-0 h-3 w-28 rounded-sm bg-accent opacity-20" />
            </h2>

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
                              <span className="text-secondary text-xs">
                                /10
                              </span>
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
                              className="h-full rounded-full"
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
          </section>
        </div>
      </div>
    </div>
  );
}
