"use client";

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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const offset = useRef(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const trigger = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    if (loading || !more || refreshing) return;

    setLoading(true);

    try {
      const fetched = await fetch(offset.current, limit);

      if (fetched.length < limit) {
        setMore(false);
      }

      if (offset.current === 0) {
        setData(fetched);
      } else {
        setData((previous) => [...previous, ...fetched]);
      }

      offset.current += fetched.length;
    } catch (e) {
      console.error("🔥 データの読み込みに失敗しました", e);

      setMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetch, limit, loading, more, refreshing]);

  const refresh = useCallback(() => {
    if (refreshing || loading) return;

    setRefreshing(true);
    setData([]);
    setMore(true);
    offset.current = 0;

    setTimeout(() => {
      setRefreshing(false);
      load();
    }, 0);
  }, [refreshing, loading, load]);

  useEffect(() => {
    const element = trigger.current;
    if (!element) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && more && !loading && !refreshing) {
          load();
        }
      },
      { threshold: 0.1 },
    );

    observer.current.observe(element);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [more, loading, refreshing, load]);

  useEffect(() => {
    if (data.length === 0 && more && !loading && !refreshing) {
      load();
    }
  }, [data.length, more, loading, refreshing, load]);

  return {
    data,
    more,
    loading,
    load,
    refresh,
    trigger,
  };
};
