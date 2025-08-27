export const RateLimitOptions = {
  MaxAttempts: 3,
  CountingPeriodMilliseconds: 5 * 60,
  LockoutDurationSeconds: 15 * 60,
} as const;
