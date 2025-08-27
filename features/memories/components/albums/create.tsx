"use client";

import { Input } from "@/components/elements/text-field";
import { AsyncButton, Button } from "@/components/elements/trigger";
import { Description, Title } from "@/components/elements/typography";
import { Centered, Container, Outlet } from "@/components/structures";
import { CreateAlbum } from "@/routes/endpoints/albums/create/schema";
import { http } from "@/services/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";

type CreateProps = {
  onClose: () => void;
};

export const Create = memo<CreateProps>(({ onClose }) => {
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<CreateAlbum>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateAlbum),
  });

  const submit = handleSubmit(async (data) => {
    const response = await http.albums.$post({
      json: data,
    });

    if (!response.ok) {
      setError("name", { message: await response.json() });

      throw new Error();
    }
  });

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-foundation text-primary antialiased">
      <div className="flex w-full items-center border-outline border-b p-4">
        <Button kind="secondary" onClick={onClose} aria-label="戻る">
          <span>戻る</span>
        </Button>
      </div>

      <Outlet>
        <Centered>
          <Container>
            <div className="flex flex-col gap-4">
              <Title as="h1">新しいアルバム</Title>

              <Description>
                <p>アルバムを作成して、思い出の写真を整理しましょう。</p>
              </Description>
            </div>

            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange },
                formState: { isValid, isSubmitting },
              }) => (
                <div className="flex flex-col gap-4 md:gap-6">
                  <Input
                    label="アルバム名"
                    placeholder="2025年の伊豆旅行"
                    onChange={onChange}
                    {...(errors.name
                      ? { error: errors.name.message }
                      : isValid
                        ? { success: "アルバムを作成できます" }
                        : {
                            helperText:
                              "アルバム名を入力して、写真を追加しましょう",
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
          </Container>
        </Centered>
      </Outlet>
    </div>
  );
});

Create.displayName = "Create";
