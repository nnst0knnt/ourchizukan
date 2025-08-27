import { z } from "zod";

export const CreateAlbum = z.object({
  title: z
    .string()
    .min(1, "アルバム名を入力してください")
    .max(50, "アルバム名は50文字以内で入力してください"),
});

export type CreateAlbum = z.infer<typeof CreateAlbum>;
