import { Button } from "@/components/elements/trigger";
import { Footer } from "@/components/structures";
import { useKeyboard } from "@/hooks";
import { date } from "@/services/date";
import { cn } from "@/styles/functions";
import { AlertTriangle, Camera } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import type { PictureCard } from "../../models/card";

type ViewerProps = {
  invisible: boolean;
  model?: PictureCard;
  loading?: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
};

export const Viewer = memo<ViewerProps>(
  ({
    invisible = false,
    model = null,
    loading = false,
    onClose,
    onNext,
    onPrevious,
  }) => {
    const { keydown } = useKeyboard(
      {
        Escape: onClose,
        ArrowRight: onNext,
        ArrowLeft: onPrevious,
      },
      { global: true },
    );

    return (
      <div
        className={cn(
          "fixed inset-0 z-fullscreen flex flex-col bg-foundation",
          invisible ? "invisible" : "visible",
        )}
        onKeyDown={keydown}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 md:h-16 md:px-6 lg:px-8">
          {!loading && model ? (
            <p className="flex items-center gap-2 text-sm">
              <Camera className="inline-block h-4 w-4" />
              <span>{date(model.takenAt).format("YYYY年M月D日")}</span>
            </p>
          ) : (
            <p className="text-base text-secondary">&nbsp;</p>
          )}
        </div>

        <div className="relative flex flex-1 items-center justify-center border-outline border-t p-4">
          {loading || !model ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="aspect-square w-3/4 max-w-3xl animate-pulse rounded-lg bg-primary/20" />
            </div>
          ) : model.url ? (
            <>
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center transition-opacity duration-300 ease-in-out",
                  invisible ? "opacity-0" : "opacity-100",
                )}
              >
                <Image
                  src={model.url}
                  alt={model.name || "写真"}
                  className="max-h-full max-w-full object-contain"
                  fill
                  priority={true}
                />
              </div>

              <div
                className={cn(
                  "-translate-y-1/2 absolute mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8",
                  "top-auto bottom-[-0.5rem]",
                  "md:top-1/2 md:bottom-auto",
                )}
              >
                <Button
                  className="mr-auto"
                  kind="secondary"
                  disabled={!onPrevious}
                  onClick={onPrevious}
                  aria-label="前の写真"
                >
                  <span>前へ</span>
                </Button>

                <Button
                  className="ml-auto"
                  kind="secondary"
                  disabled={!onNext}
                  onClick={onNext}
                  aria-label="次の写真"
                >
                  <span>次へ</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-foreground">
              <AlertTriangle className="h-12 w-12" />
              <p className="text-lg">写真の読み込みに失敗しました</p>
            </div>
          )}
        </div>

        <Footer to={onClose} />
      </div>
    );
  },
);

Viewer.displayName = "Viewer";
