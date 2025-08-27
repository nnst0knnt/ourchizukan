export const RateLimitOptions = {
  MaxAttempts: 3,
  CountingPeriod: 5 * 60,
  LockoutDuration: 15 * 60,
} as const;
