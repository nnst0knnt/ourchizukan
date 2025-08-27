"use client";

import { forwardRef, type MouseEvent, useState } from "react";

import { sleep } from "@/services/timer";
import { Button, type ButtonProps, ButtonStatus } from "./button";

type AsyncButtonProps = Omit<ButtonProps, "status" | "onClick"> & {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  autoReset?: boolean;
  resetDelayMs?: number;
  waitMs?: number;
};

export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  (
    {
      onClick,
      onSuccess,
      onError,
      autoReset = true,
      resetDelayMs = 3000,
      waitMs = 1500,
      children,
      ...props
    },
    ref,
  ) => {
    let timeout: NodeJS.Timeout | null = null;

    const [status, setStatus] = useState<ButtonStatus>(ButtonStatus.Idle);

    const click = async (event: MouseEvent<HTMLButtonElement>) => {
      if (status === ButtonStatus.Loading) return;

      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      try {
        setStatus(ButtonStatus.Loading);

        await onClick?.(event);

        setStatus(ButtonStatus.Success);

        timeout = await sleep(waitMs);

        onSuccess?.();
      } catch (e) {
        setStatus(ButtonStatus.Error);

        timeout = await sleep(waitMs);

        onError?.(e);
      }

      if (autoReset) {
        timeout = await sleep(resetDelayMs);

        setStatus(ButtonStatus.Idle);

        timeout = null;
      }
    };

    return (
      <Button ref={ref} {...props} status={status} onClick={click}>
        {children}
      </Button>
    );
  },
);

AsyncButton.displayName = "AsyncButton";
