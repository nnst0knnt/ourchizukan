/**
 * レート制限オプション
 */
export const RateLimitOptions = {
  /**
   * 認証試行の最大回数
   *
   * この回数を超えるとアクセスが一時的にロックされます。
   */
  MaxAttempts: 3,
  /**
   * レート制限の監視期間（秒）
   *
   * この期間内での認証試行回数をカウントします。
   */
  CountingPeriod: 5 * 60,
  /**
   * ロックアウト期間（秒）
   *
   * 最大試行回数を超えた後、この期間は認証ができなくなります。
   */
  LockoutDuration: 15 * 60,
} as const;
