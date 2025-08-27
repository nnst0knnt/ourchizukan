import type { CookieOptions as Options } from "hono/utils/cookie";

/**
 * クッキーオプション
 */
export const CookieOptions = {
  /** クッキー名 */
  Name: "ourchizukan_session",
  /** JavaScriptからアクセス不可 */
  HttpOnly: true,
  /** HTTPS接続でのみクッキーを送信 */
  Secure: true,
  /** クロスサイトリクエストでのクッキー送信を制限 */
  SameSite: "lax",
  /** クッキーの有効パス */
  Path: "/",
  /** クッキーの有効期間（秒） */
  MaxAge: 90 * 24 * 60 * 60,
} as const;

/**
 * クッキーオプションを生成する
 */
export const toCookieOptions = (options?: Options): Options => ({
  path: CookieOptions.Path,
  httpOnly: CookieOptions.HttpOnly,
  secure: CookieOptions.Secure,
  sameSite: CookieOptions.SameSite,
  maxAge: CookieOptions.MaxAge,
  ...options,
});
