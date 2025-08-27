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
import { toThumbnail } from "@/services/converter/file";
import { cn } from "@/styles/functions";
import repositories from "../../repositories";

type UploadProps = {
  albumId: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

export const Upload = memo<UploadProps>(
  ({ albumId = null, onClose, onSuccess }) => {
    useNoPullToRefresh();

    const {
      setValue,
      handleSubmit,
      formState: { isSubmitting, errors },
      setError,
      watch,
    } = useForm<UploadPicturesBody>({
      defaultValues: {
        albumId,
        originals: [],
        thumbnails: [],
      },
      resolver: zodResolver(UploadPicturesBody),
      mode: "onChange",
    });

    const originals = watch("originals");

    const thumbnails = watch("thumbnails");

    const previews = useMemo(
      () =>
        originals.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        })),
      [originals],
    );

    const message = useMemo(
      () =>
        errors.root
          ? errors.root.message
          : errors.originals
            ? errors.originals.message
            : errors.thumbnails
              ? errors.thumbnails.message
              : "",
      [errors.originals, errors.root, errors.thumbnails],
    );

    const drop = useCallback(
      async (acceptedFiles: File[]) => {
        const _originals: File[] = [];
        const _thumbnails: File[] = [];

        for (const _original of acceptedFiles.filter((file) =>
          file.type.startsWith("image/"),
        )) {
          _originals.push(_original);

          try {
            _thumbnails.push(
              new File([await toThumbnail(_original)], _original.name, {
                type: _original.type,
              }),
            );
          } catch (e) {
            console.error("⚠️ サムネイルの作成に失敗しました", e);
          }
        }

        setValue("originals", [...originals, ..._originals], {
          shouldValidate: true,
        });

        setValue("thumbnails", [...thumbnails, ..._thumbnails], {
          shouldValidate: true,
        });
      },
      [originals, thumbnails, setValue],
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
          "originals",
          originals.filter((_, index) => index !== selected),
          { shouldValidate: true },
        );

        setValue(
          "thumbnails",
          thumbnails.filter((_, index) => index !== selected),
          { shouldValidate: true },
        );
      },
      [originals, thumbnails, setValue],
    );

    const submit = handleSubmit(async (data) => {
      try {
        await repositories.pictures.upload(data);

        onSuccess?.();
      } catch (e: any) {
        setError("root", {
          message: e.message || "写真のアップロードに失敗しました",
        });

        throw e;
      }
    });

    return (
      <div
        className={cn(
          "flex flex-col gap-4 pb-[86px] md:gap-6 md:pb-4 lg:gap-8",
          isSubmitting && "pointer-events-none",
        )}
      >
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
                <p>※ 一度に20枚までアップロード可能</p>
              </div>
            </div>

            {previews.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <p>選択された写真（{previews.length}枚）</p>
                  {message && <p className="text-error">{message}</p>}
                </div>
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
            disabled={previews.length === 0 || !!errors.root || isSubmitting}
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
