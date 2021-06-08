import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef, useCallback } from 'react';

import Image from '@components/Image';
import Main from '@components/Main';
import Store from '@models/Store';
import Lightbox from '@components/Lightbox';
import useAssetFetch from '@components/useAssetFetch';
import Spinner from '@components/Spinner';

const Gallery = () => {
  const [ pickImg, setPickImg ] = useState(false);
  const [ showcase, setShowcase ] = useState(false);
  // const [ assets, setAssets ] = useState([]);

  const [profile, setProfile] = useState(Store.profile.id);
  const [pageNumber, setPageNumber] = useState(0);
  const {
    assets,
    hasMore,
    loading,
    error
  } = useAssetFetch(profile, pageNumber);

  const observer = useRef()
  const lastAssetElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const previous = () => {
    if (pickImg > 0) {
      return () => setPickImg(currImg => currImg - 1);
    };
    return undefined;
  }

  const next = () =>{
    if (pickImg < assets.length - 1) {
      return () => setPickImg(currImg => currImg + 1);
    };
    return undefined;
  }

  const showchaseImage = (index) => {
    setPickImg(index);
    setShowcase(true);
  }

  return (
    <Main>
      <div className="jumbotron">
        <h1>{Store.profile.nickname}</h1>
        <p>An adventure starts...</p>
      </div>

      <div className="masonry">
        {
          assets.map((asset, index) => {
            if (assets.length === index + 1) {
              return (
                <div
                  key={`asset-${index}`}
                  className={`masonry-brick`}
                  onClick={() => showchaseImage(index)}
                  ref={lastAssetElementRef}
                >
                  <Image src={asset.name} className='masonry-img'/>
                </div>
              );
            } else {
              return (
                <div
                  key={`asset-${index}`}
                  className={`masonry-brick`}
                  onClick={() => showchaseImage(index)}
                >
                  <Image src={asset.name} className='masonry-img'/>
                </div>
              );
            }
          })
        }
      </div>
      <div>{loading && <Spinner />}</div>
      <div>{error && 'Error'}</div>
      <Lightbox
        display={showcase}
        asset={assets[pickImg]}
        close={setShowcase}
        prev={previous()}
        next={next()}
      />
    </Main>
  );
};

export default observer(Gallery);
