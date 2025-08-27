"use client";

import { ImageOff, LoaderCircle } from "lucide-react";
import NextImage, { type ImageProps } from "next/image";
import { forwardRef, useCallback, useEffect } from "react";
import { SourceStatus, useEnabledWindow, useSourceCache } from "@/hooks";
import { cn } from "@/styles/functions";

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const enabled = useEnabledWindow();

  const { load, cache } = useSourceCache(props.src);

  const status = load();

  const complete = useCallback(
    () => cache(props.src, SourceStatus.Complete),
    [cache, props.src],
  );

  const error = useCallback(
    () => cache(props.src, SourceStatus.Error),
    [cache, props.src],
  );

  useEffect(() => {
    if (enabled && status === SourceStatus.Idle && props.src) {
      cache(props.src, SourceStatus.Loading);
    }
  }, [enabled, status, props.src, cache]);

  if (status === SourceStatus.Error || !props.src) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ImageOff className="h-8 w-8 text-primary/40" />
      </div>
    );
  }

  return (
    <>
      <NextImage
        ref={ref}
        {...props}
        className={cn(
          props.className,
          status !== SourceStatus.Complete && "opacity-0",
        )}
        unoptimized
        onLoad={complete}
        onError={error}
      />
      {(status === SourceStatus.Idle || status === SourceStatus.Loading) && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center">
          <LoaderCircle className="h-8 w-8 animate-spin text-primary/40" />
        </div>
      )}
    </>
  );
});

Image.displayName = "Image";
