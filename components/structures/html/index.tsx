import { type PropsWithChildren, memo } from "react";

type HtmlProps = PropsWithChildren<{
  /** 言語 */
  lang?: string;
}>;

export const Html = memo<HtmlProps>(({ lang = "ja", children }) => (
  <html lang={lang} className="h-full overflow-hidden" suppressHydrationWarning>
    {children}
  </html>
));

Html.displayName = "Html";
