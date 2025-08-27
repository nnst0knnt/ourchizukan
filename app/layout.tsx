import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ContrastVariants, SizeVariants, ThemeVariants } from "@/hooks";

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
      data-theme={ThemeVariants.Light}
      data-contrast={ContrastVariants.Normal}
      data-size={SizeVariants.Normal}
      suppressHydrationWarning
    >
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
