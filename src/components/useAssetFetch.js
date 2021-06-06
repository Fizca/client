import { useEffect, useState } from 'react';
import {http, cancelToken} from '@services/Backend';
import axios from 'axios';

export default function useAssetFetch(profile, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [assets, setAssets] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setAssets([])
  }, [profile])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    http({
      url: '/assets/list',
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c),
    }).then(({data}) => {
      setAssets(prevAssets => {
        return [...prevAssets, ...data.assets];
      })
      setHasMore(data.assets.length > 0)
      setLoading(false)
    }).catch(e => {
      if (http.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [profile, pageNumber])

  return { loading, error, assets, hasMore }
}