import { z } from "zod";

export const UploadPicturesBody = z.object({
  albumId: z.string().nullable(),
  files: z
    .array(z.instanceof(File))
    .min(1, "写真を1枚以上選択してください")
    .refine(
      (files) => files.every((file) => file.type.startsWith("image/")),
      "画像ファイルのみアップロードできます",
    ),
});

export type UploadPicturesBody = z.infer<typeof UploadPicturesBody>;
