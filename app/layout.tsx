import type { ReactNode } from "react";

import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { Content, Footer, Header } from "@/components/structures";
import { TransitionProgress } from "@/components/tools";

export const metadata: Metadata = {
  title: {
    template: "%s | おうちずかん",
    default: "おうちずかん",
  },
  description: "おうちの大切な瞬間を記録する家族のずかん",
  applicationName: "おうちずかん",
  authors: [{ name: "nnst0knnt" }],
  keywords: ["家族", "写真", "動画", "思い出"],
  creator: "nnst0knnt",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full overflow-hidden" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          /**
           * FOUCを防ぐためのスクリプトを読み込む
           *
           * レンダリング前に適用させたい処理のため`defer`や`async`を使用していません。
           */
          src="/scripts/sync-accessibility.js"
        />
      </head>
      <body className="flex h-full flex-col bg-foundation text-primary antialiased">
        <TransitionProgress />
        <Header />
        <Content>{children}</Content>
        <Footer />
      </body>
    </html>
  );
}
