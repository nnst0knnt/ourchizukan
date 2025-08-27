import { validate as isUUID } from "uuid";
import { z } from "zod";

export const GetPicture = z.object({
  id: z.string().refine((id) => id.split(/[^a-zA-Z0-9-]/).some(isUUID), {
    message: "IDの形式が正しくありません",
  }),
});
export type GetPicture = z.infer<typeof GetPicture>;
