export const AttemptKind = {
  FailedEmail: "failed-email",
} as const;

export type AttemptKind = (typeof AttemptKind)[keyof typeof AttemptKind];

export type Attempt = {
  ip: string;
  kind: AttemptKind;
  at: number;
};
