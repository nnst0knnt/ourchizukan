import { ContrastDomAttributeName, ThemeDomAttributeName } from "@/hooks";

/**
 * ステータスバーの色を同期する
 */
const sync = () => {
  try {
    update();

    const observer = new MutationObserver(() => {
      setTimeout(() => {
        update();
      }, 10);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [ThemeDomAttributeName, ContrastDomAttributeName],
    });
  } catch (_e) {
    update();
  }
};

/**
 * ステータスバーの色を更新する
 */
const update = () => {
  let meta = document.querySelector(
    'meta[name="theme-color"]',
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  meta.content = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-foundation")
    .trim();
};

sync();
