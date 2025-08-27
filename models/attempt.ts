/**
 * 試行種別
 */
export const AttemptKind = {
  /** メールアドレス認証失敗 */
  FailedEmail: "failed-email",
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
