import { Button } from "@/components/elements/trigger";
import { date } from "@/services/date";
import { cn } from "@/styles/functions";
import { AlertTriangle, Camera } from "lucide-react";
import Image from "next/image";
import { memo, useCallback } from "react";
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
    const keydown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight" && onNext) onNext();
        if (e.key === "ArrowLeft" && onPrevious) onPrevious();
      },
      [onClose, onNext, onPrevious],
    );

    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-foundation",
          invisible ? "invisible" : "visible",
        )}
        onKeyDown={keydown}
      >
        <header className="flex w-full items-center bg-foundation p-4">
          <Button kind="secondary" onClick={onClose} aria-label="戻る">
            <span>戻る</span>
          </Button>
        </header>

        <main className="relative flex flex-1 items-center justify-center border-outline border-t border-b p-4">
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
                  "-translate-y-1/2 absolute left-4",
                  "top-auto bottom-[-0.5rem]",
                  "md:top-1/2 md:bottom-auto",
                  !onPrevious && "disabled",
                )}
              >
                <Button
                  kind="secondary"
                  onClick={onPrevious}
                  aria-label="前の写真"
                >
                  <span>前へ</span>
                </Button>
              </div>

              <div
                className={cn(
                  "-translate-y-1/2 absolute right-4",
                  "top-auto bottom-[-0.5rem]",
                  "md:top-1/2 md:bottom-auto",
                  !onNext && "disabled",
                )}
              >
                <Button kind="secondary" onClick={onNext} aria-label="次の写真">
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
        </main>

        <footer className="w-full bg-foundation p-4">
          {!loading && model ? (
            <p className="flex items-center gap-2 text-sm">
              <Camera className="inline-block h-4 w-4" />
              <span>{date(model.takenAt).format("YYYY年M月D日")}</span>
            </p>
          ) : (
            <p className="text-base text-secondary">&nbsp;</p>
          )}
        </footer>
      </div>
    );
  },
);

Viewer.displayName = "Viewer";
