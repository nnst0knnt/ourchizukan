import { z } from "zod";

export const EnterFamily = z.object({
  email: z.string().email("メールアドレスの形式が正しくないようです"),
});
export type EnterFamily = z.infer<typeof EnterFamily>;
