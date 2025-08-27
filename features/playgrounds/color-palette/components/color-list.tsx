"use client";

import { Ellipsis } from "lucide-react";

import { useContrast, useTheme, useWindow } from "@/hooks";
import { varsToHex } from "@/styles/functions";

type Color = {
  name: string;
  category: string;
  description: string;
  className: string;
  cssVar: string;
};

const colors: Color[] = [
  {
    name: "ベースカラー",
    category: "背景色",
    description: "ページ全体のトーンを決定する",
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
    description: "現在選んでいる項目や入力中の場所を強調する",
    className: "bg-focus",
    cssVar: "--color-focus",
  },
  {
    name: "アウトラインカラー",
    category: "区切り色",
    description: "要素間の境界線や枠線を強調する",
    className: "bg-outline",
    cssVar: "--color-outline",
  },
  {
    name: "トラックカラー",
    category: "区切り色",
    description: "スライダーやプログレスバーの要素を強調する",
    className: "bg-track",
    cssVar: "--color-track",
  },
];

export const ColorList = () => {
  const window = useWindow();

  /**
   * テーマとコントラストの変更時に再レンダリングさせる
   */
  useTheme();
  useContrast();

  return (
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
                {window.enabled ? (
                  varsToHex(color.cssVar)
                ) : (
                  <Ellipsis size={16} />
                )}
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
                <p className="text-secondary text-sm">{color.description}</p>
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
  );
};
