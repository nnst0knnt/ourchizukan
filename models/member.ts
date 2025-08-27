import type { http } from "@/services/http";
import type { InferResponseType } from "hono";

/**
 * おうちに入っている人
 */
export type Member = InferResponseType<typeof http.families.member.$get>;
