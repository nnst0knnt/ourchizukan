"use client";

import { ImageOff, LoaderCircle } from "lucide-react";
import NextImage, { type ImageProps } from "next/image";
import { forwardRef, useState } from "react";
import { cn } from "@/styles/functions";

const Status = {
  Loading: "Loading",
  Loaded: "Loaded",
  Error: "Error",
} as const;

type Status = (typeof Status)[keyof typeof Status];

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const [status, setStatus] = useState<Status>(Status.Loading);

  if (status === Status.Error || !props.src) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ImageOff className="h-8 w-8 text-primary/40" />
      </div>
    );
  }

  return (
    <>
      {status === Status.Loading && (
        <div className="flex h-full w-full animate-pulse items-center justify-center">
          <LoaderCircle className="h-8 w-8 animate-spin text-primary/40" />
        </div>
      )}
      <NextImage
        ref={ref}
        {...props}
        className={cn(
          props.className,
          status === Status.Loading && "absolute opacity-0",
        )}
        onLoad={() => setStatus(Status.Loaded)}
        onError={() => setStatus(Status.Error)}
      />
    </>
  );
});

Image.displayName = "Image";
