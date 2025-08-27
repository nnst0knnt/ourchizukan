import type { AccessMethod } from "./access-method";

/**
 * セッション
 */
export type Session = {
  /** セッションID */
  id: string;
  /** アクセス方法 */
  method: AccessMethod;
  /** 認証時のIPアドレス */
  ip: string;
  /** 作成時間 */
  createdAt: number;
  /** 有効期限 */
  expiredAt: number;
};

/**
 * セッションオプション
 */
export const SessionOptions = {
  /**
   * セッションの有効期間（ミリ秒）
   *
   * この期間が過ぎると再認証が必要になります。
   * デフォルトは90日間です。
   */
  Lifetime: 90 * 24 * 60 * 60 * 1000,
} as const;
