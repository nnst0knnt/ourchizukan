import { validate as isUUID } from "uuid";
import { z } from "zod";

export const ListPicturesQueryParameter = z.object({
  albumId: z
    .string()
    .optional()
    .refine((id) => !id || id.split(/[^a-zA-Z0-9-]/).some(isUUID), {
      message: "IDの形式が正しくありません",
    }),
});

export type ListPicturesQueryParameter = z.infer<
  typeof ListPicturesQueryParameter
>;
