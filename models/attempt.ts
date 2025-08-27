/**
 * 試行種別
 */
export const AttemptKind = {
  /** メールアドレス認証失敗 */
  EmailFail: "email-fail",
  /** レート制限 */
  RateLimit: "rate-limit",
  /** 不正なセッションIDでのアクセス */
  InvalidSession: "invalid-session",
} as const;
export type AttemptKind = (typeof AttemptKind)[keyof typeof AttemptKind];

/**
 * アクセス記録
 */
export type Attempt = {
  /** アクセス元IP */
  ip: string;
  /** 試行種別 */
  kind: AttemptKind;
  /** 試行時間 */
  at: number;
};
