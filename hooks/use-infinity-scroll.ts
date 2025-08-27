"use client";

import { uniqBy } from "es-toolkit/array";
import { debounce } from "es-toolkit/function";
import { useCallback, useEffect, useRef, useState } from "react";

type Meta = {
  count: number;
  next: {
    more: boolean;
    offset: number | null;
  };
};

type InfinityScrollOptions<Datum> = {
  fetch: (
    offset: number,
    limit: number,
  ) => Promise<{ data: Datum[]; meta: Meta }>;
  limit?: number;
};

export const useInfinityScroll = <Datum extends { id: string | number }>({
  fetch,
  limit = 4,
}: InfinityScrollOptions<Datum>) => {
  const [data, setData] = useState<Datum[]>([]);
  const [starting, setStarting] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const meta = useRef<Meta | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const trigger = useRef<HTMLDivElement | null>(null);

  const load = useCallback(
    async (force = false) => {
      if (
        (starting && !force) ||
        refreshing ||
        (meta.current && !meta.current.next.more) ||
        (meta.current && meta.current.next.offset === null)
      )
        return;

      try {
        setLoading(true);

        const response = await fetch(
          meta.current && meta.current.next.offset
            ? meta.current.next.offset
            : 0,
          limit,
        );

        setData((previous) =>
          uniqBy([...previous, ...response.data], ({ id }) => id),
        );

        meta.current = response.meta;
      } catch (e) {
        console.error("🔥 データの読み込みに失敗しました", e);
      } finally {
        setLoading(false);
      }
    },
    [fetch, limit, meta, refreshing, starting],
  );

  const detected = useCallback(
    () =>
      debounce(() => {
        load();
      }, 150)(),
    [load],
  );

  const refresh = useCallback(async () => {
    if (starting || refreshing) return;

    setRefreshing(true);

    setData([]);
    meta.current = {
      count: 0,
      next: {
        more: true,
        offset: 0,
      },
    };

    await load();

    setRefreshing(false);
  }, [starting, refreshing, load]);

  const start = useCallback(async () => {
    await load(true);

    setStarting(false);
  }, [load]);

  useEffect(() => {
    if (!trigger.current) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          detected();
        }
      },
      {
        threshold: 0,
        rootMargin: "10%",
      },
    );

    observer.current.observe(trigger.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [detected]);

  useEffect(() => {
    start();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    data,
    meta: meta.current,
    loading,
    trigger,
    load: detected,
    refresh,
  };
};
