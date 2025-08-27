import type { AccessMethod } from "./access-method";

/**
 * 認証済みメンバー
 */
export type VerifiedMember = {
  method: AccessMethod;
};

/**
 * 未認証メンバー
 */
export type UnverifiedMember = null;

/**
 * おうちのメンバー
 */
export type Member = VerifiedMember | UnverifiedMember;
