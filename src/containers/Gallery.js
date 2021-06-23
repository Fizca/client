import { observer } from 'mobx-react';
import React, { useState, useRef, useCallback } from 'react';

import Image from '@components/Image';
import Main from '@components/Main';
import Store from '@models/Store';
import Lightbox from '@components/Lightbox';
import usePageFetch from '@components/usePageFetch';
import Spinner from '@components/Spinner';
import { HeroBox, Subtitle, HeroTitle } from '@components/Headings';

const Gallery = () => {
  const [ pickImg, setPickImg ] = useState(false);
  const [ showcase, setShowcase ] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const {
    objects: assets,
    hasMore,
    loading,
    error
  } = usePageFetch(`/assets/profile/${Store.profile.id}`, pageNumber);

  /**
   * Fire the useAssetFetch only when the last object enters the page.
   */
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
      <HeroBox>
        <div>{Store.profile.nickname}'s</div>
        <HeroTitle>Gallery</HeroTitle>
        <Subtitle>All the adventures I've had!</Subtitle>
      </HeroBox>

      <div className="masonry">
        {
          assets.map((asset, index) => {
            return (
              <div
                key={`asset-${index}`}
                className={`masonry-brick`}
                onClick={() => showchaseImage(index)}
                ref={index + 1 == assets.length ? lastAssetElementRef : null}
              >
                <Image src={asset.name} className='masonry-img'/>
              </div>
            );
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
