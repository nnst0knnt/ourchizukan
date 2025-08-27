"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/elements/text-field";
import { AsyncButton } from "@/components/elements/trigger";
import { Description, Title } from "@/components/elements/typography";
import { Footer } from "@/components/structures";
import { useNoPullToRefresh } from "@/hooks";
import { CreateAlbumBody } from "@/routes/endpoints/albums/create/schema";
import { cn } from "@/styles/functions";
import repositories from "../../repositories";

type CreateProps = {
  onClose: () => void;
  onSuccess?: () => void;
};

export const Create = memo<CreateProps>(({ onClose, onSuccess }) => {
  useNoPullToRefresh();

  const {
    control,
    formState: { isSubmitting, errors },
    setError,
    handleSubmit,
  } = useForm<CreateAlbumBody>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(CreateAlbumBody),
    mode: "onChange",
  });

  const submit = handleSubmit(async (data) => {
    try {
      await repositories.albums.create(data);

      onSuccess?.();
    } catch (e: any) {
      setError("title", {
        message: e.message || "アルバムの作成に失敗しました",
      });

      throw e;
    }
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-4 md:gap-6 lg:gap-8",
        isSubmitting && "pointer-events-none",
      )}
    >
      <div className="flex flex-col gap-4">
        <Title as="h1">新しいアルバム</Title>

        <Description>
          <p>アルバムを作成して、思い出の写真を整理しましょう。</p>
        </Description>
      </div>

      <Controller
        control={control}
        name="title"
        render={({
          field: { value, onChange },
          formState: { isSubmitting, isValid },
        }) => (
          <div className="flex flex-col gap-4 md:gap-6">
            <Input
              label="アルバム名"
              placeholder="2025年の伊豆旅行"
              value={value}
              onChange={onChange}
              {...(errors.title
                ? { error: errors.title.message }
                : isValid
                  ? { success: "アルバムを作成できます" }
                  : {
                      helperText: "アルバム名を入力して、写真を追加しましょう",
                    })}
              required
              fullWidth
            />

            <AsyncButton
              onClick={submit}
              onSuccess={onClose}
              disabled={!isValid || isSubmitting}
              fullWidth
            >
              作成する
            </AsyncButton>
          </div>
        )}
      />
      <Footer to={onClose} fixed />
    </div>
  );
});

Create.displayName = "Create";
