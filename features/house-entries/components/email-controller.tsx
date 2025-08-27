"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/elements/text-field";
import { AsyncButton } from "@/components/elements/trigger";
import { EnterFamily } from "@/routes/endpoints/families/enter/schema";
import { http } from "@/services/http";

export const EmailController = memo(() => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<EnterFamily>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(EnterFamily),
  });

  const submit = handleSubmit(async (data) => {
    const response = await http.families.enter.$post({
      json: data,
    });

    if (!response.ok) {
      setError("email", { message: await response.json() });

      throw new Error();
    }

    router.replace("/");
  });

  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { onChange }, formState: { isValid } }) => {
        return (
          <div className="flex flex-col gap-4 md:gap-6">
            <Input
              label="メールアドレス"
              type="email"
              placeholder="ourchizukan@example.com"
              onChange={onChange}
              {...(errors.email
                ? { error: errors.email.message }
                : isValid
                  ? { success: "おうちに入る準備ができました" }
                  : {
                      helperText:
                        "メールアドレスを入力して、おうちに入りましょう",
                    })}
              required
              fullWidth
            />
            <AsyncButton onClick={submit} disabled={!isValid} fullWidth>
              おうちに入る
            </AsyncButton>
          </div>
        );
      }}
    />
  );
});

EmailController.displayName = "EmailController";
