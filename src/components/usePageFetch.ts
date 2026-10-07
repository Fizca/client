import axios, { Canceler } from 'axios';
import { useEffect, useState } from 'react';

import Http from '@services/Http';
import { PageResponse } from '../types/api';

export default function usePageFetch<T>(url: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [objects, setObjects] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setObjects([]);
  }, [url]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: Canceler = () => {};
    Http({
      url,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }: { data: PageResponse<T> }) => {
        setObjects((prevObjects) => [...prevObjects, ...data.objects]);
        setHasMore(data.objects.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [url, pageNumber]);

  return { loading, error, objects, hasMore };
}
