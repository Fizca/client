import axios from 'axios';
import { useEffect, useState } from 'react';

import Http from '@services/Http';

export default function usePageFetch(url, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [objects, setObjects] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setObjects([])
  }, [url])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    Http({
      url,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c),
    }).then(({data}) => {
      setObjects(prevObjects => {
        return [...prevObjects, ...data.objects];
      })
      setHasMore(data.objects.length > 0)
      setLoading(false)
    }).catch(e => {
      if (Http.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [url, pageNumber])

  return { loading, error, objects, hasMore }
}
