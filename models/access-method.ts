/**
 * アクセス方法
 */
export const AccessMethod = {
  /** IP認証 */
  Ip: "ip",
  /** メールアドレス認証 */
  Email: "email",
} as const;
export type AccessMethod = (typeof AccessMethod)[keyof typeof AccessMethod];
