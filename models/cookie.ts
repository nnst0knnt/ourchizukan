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
  /** クッキーの有効期間（ミリ秒） */
  MaxAge: 90 * 24 * 60 * 60 * 1000,
} as const;
