"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Images, X } from "lucide-react";
import Image from "next/image";
import { type MouseEvent, memo, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { AsyncButton, Mark } from "@/components/elements/trigger";
import { Description, Title } from "@/components/elements/typography";
import { Footer } from "@/components/structures";
import { useNoPullToRefresh } from "@/hooks";
import { UploadPicturesBody } from "@/routes/endpoints/pictures/upload/schema";
import { cn } from "@/styles/functions";
import repositories from "../../repositories";

type UploadProps = {
  albumId?: string | null;
  onClose: () => void;
  onSuccess?: () => void;
};

export const Upload = memo<UploadProps>(
  ({ albumId = null, onClose, onSuccess }) => {
    useNoPullToRefresh();

    const {
      setValue,
      handleSubmit,
      formState: { isSubmitting },
      setError,
      watch,
    } = useForm<UploadPicturesBody>({
      defaultValues: {
        albumId,
        files: [],
      },
      resolver: zodResolver(UploadPicturesBody),
    });

    const files = watch("files");

    const previews = useMemo(
      () =>
        files.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        })),
      [files],
    );

    const drop = useCallback(
      (acceptedFiles: File[]) =>
        setValue("files", [
          ...files,
          ...acceptedFiles.filter((file) => file.type.startsWith("image/")),
        ]),
      [files, setValue],
    );

    const dropzone = useDropzone({
      onDrop: drop,
      accept: {
        "image/*": [],
      },
    });

    const remove = useCallback(
      (e: MouseEvent<HTMLButtonElement>, selected: number) => {
        e.stopPropagation();

        setValue(
          "files",
          files.filter((_, index) => index !== selected),
        );
      },
      [files, setValue],
    );

    const submit = handleSubmit(async (data) => {
      try {
        await repositories.pictures.upload(data);

        onSuccess?.();
      } catch (e: any) {
        setError("files", {
          message: e.message || "写真のアップロードに失敗しました",
        });
      }
    });

    return (
      <div className="flex flex-col gap-4 pb-4 md:gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <Title as="h1">写真をアップロード</Title>

          <Description>
            <p>写真をアップロードして家族と思い出を共有しましょう。</p>
          </Description>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 md:gap-6">
            <div
              {...dropzone.getRootProps()}
              className={cn(
                "flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-outline border-dashed p-6",
                dropzone.isDragActive && "border-brand bg-brand/10",
              )}
            >
              <input {...dropzone.getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <Images className="h-12 w-12 text-secondary" />
                <p className="text-center text-lg text-secondary">写真を追加</p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm">選択された写真（{files.length}枚）</p>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {previews.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="relative aspect-square rounded-md bg-outline/10"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-md">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Mark
                            value={X}
                            size="small"
                            kind="secondary"
                            filled
                            onClick={(e) => remove(e, index)}
                            aria-label="削除"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <AsyncButton
            onClick={submit}
            onSuccess={onClose}
            disabled={files.length === 0 || isSubmitting}
            fullWidth
          >
            アップロードする
          </AsyncButton>
        </div>

        <Footer to={onClose} fixed />
      </div>
    );
  },
);

Upload.displayName = "Upload";
