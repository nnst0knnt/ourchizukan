import { z } from "zod";

export const UploadPicturesBody = z.object({
  albumId: z.string().nullable(),
  files: z
    .array(z.instanceof(File))
    .min(1, "写真を1枚以上選択してください")
    .max(20, "一度にアップロードできる写真は20枚までです")
    .refine(
      (files) => files.every((file) => file.size <= 10 * 1024 * 1024),
      "ファイルサイズは10MB以下にしてください",
    )
    .refine(
      (files) =>
        files.reduce((sum, file) => sum + file.size, 0) <= 10 * 1024 * 1024 * 5,
      "ファイルサイズは合計50MB以下にしてください",
    ),
});

export type UploadPicturesBody = z.infer<typeof UploadPicturesBody>;
