import {
  ContrastDomAttributeName,
  ContrastKind,
  ContrastLocalStorageKey,
  SizeDomAttributeName,
  SizeKind,
  SizeLocalStorageKey,
  ThemeDomAttributeName,
  ThemeKind,
  ThemeLocalStorageKey,
} from "@/hooks";

/**
 * アクセシビリティの設定を同期する
 *
 * これにより、画面のちらつき(FOUC)を防止します。
 */
const sync = () => {
  try {
    const theme = localStorage.getItem(ThemeLocalStorageKey) || ThemeKind.Light;
    const contrast =
      localStorage.getItem(ContrastLocalStorageKey) || ContrastKind.Normal;
    const size = localStorage.getItem(SizeLocalStorageKey) || SizeKind.Normal;

    document.documentElement.setAttribute(ThemeDomAttributeName, theme);
    document.documentElement.setAttribute(ContrastDomAttributeName, contrast);
    document.documentElement.setAttribute(SizeDomAttributeName, size);
  } catch (_e) {
    document.documentElement.setAttribute(
      ThemeDomAttributeName,
      ThemeKind.Light,
    );
    document.documentElement.setAttribute(
      ContrastDomAttributeName,
      ContrastKind.Normal,
    );
    document.documentElement.setAttribute(
      SizeDomAttributeName,
      SizeKind.Normal,
    );
  }
};

sync();
