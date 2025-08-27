import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ContrastKind, SizeKind, ThemeKind } from "@/hooks";

export const metadata: Metadata = {
  title: {
    template: "%s | おうちずかん",
    default: "おうちずかん",
  },
  description: "おうちの大切な瞬間を記録する家族のずかん",
  applicationName: "おうちずかん",
  authors: [{ name: "Family" }],
  keywords: ["家族", "写真", "動画", "思い出"],
  creator: "Family",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      data-theme={ThemeKind.Light}
      data-contrast={ContrastKind.Normal}
      data-size={SizeKind.Normal}
      suppressHydrationWarning
    >
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
