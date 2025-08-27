"use client";

import { uniqBy } from "es-toolkit/array";
import { useCallback, useEffect, useRef, useState } from "react";

type InfinityScrollOptions<Datum> = {
  fetch: (offset: number, limit: number) => Promise<Datum[]>;
  limit?: number;
  defaultData?: Datum[];
};

export const useInfinityScroll = <Datum extends { id: string | number }>({
  fetch,
  limit = 8,
  defaultData = [],
}: InfinityScrollOptions<Datum>) => {
  const [data, setData] = useState<Datum[]>(defaultData);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const offset = useRef(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const trigger = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    if (!more || refreshing) return;

    try {
      const fetched = await fetch(offset.current, limit);

      if (fetched.length === 0 || fetched.length < limit) {
        setMore(false);
      }

      if (offset.current === 0) {
        setData(fetched);
        offset.current = fetched.length;
      } else {
        setData((previous) =>
          uniqBy([...previous, ...fetched], ({ id }) => id),
        );

        offset.current += fetched.length;
      }
    } catch (e) {
      console.error("🔥 データの読み込みに失敗しました", e);

      setMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetch, limit, more, refreshing]);

  const refresh = useCallback(() => {
    if (refreshing || loading) return;

    setRefreshing(true);
    setData([]);
    setMore(true);
    offset.current = 0;
    setLoading(true);

    setTimeout(() => {
      setRefreshing(false);
      load();
    }, 0);
  }, [refreshing, loading, load]);

  useEffect(() => {
    const element = trigger.current;
    if (!element || !more) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !refreshing) {
          load();
        }
      },
      {
        threshold: 0,
        rootMargin: "200px",
      },
    );

    observer.current.observe(element);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [more, loading, refreshing, load]);

  useEffect(() => {
    if (data.length === 0 && more && !refreshing) {
      load();
    }
  }, [data.length, more, refreshing, load]);

  return {
    data,
    more,
    loading,
    trigger,
    load,
    refresh,
  };
};
