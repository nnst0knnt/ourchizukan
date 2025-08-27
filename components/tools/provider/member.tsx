import type { Member } from "@/models";
import { http } from "@/services/http";
import type { ReactNode } from "react";

/**
 * MemberProviderProps
 */
type MemberProviderProps = {
  children: (member: Member) => ReactNode;
};

/**
 * MemberProvider
 *
 * おうちに入っている人を提供します。
 */
export const MemberProvider = async ({ children }: MemberProviderProps) => {
  const member = await (await http.families.member.$get()).json();

  return children(member);
};
