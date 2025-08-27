export const AccessMethod = {
  Ip: "ip",
  Email: "email",
} as const;

export type AccessMethod = (typeof AccessMethod)[keyof typeof AccessMethod];
