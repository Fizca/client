import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { HeroBox, HeroTitle, Subtitle, Title, Hr } from '@components/Headings';
import Image from "@components/Image";
import Lightbox from '@components/Lightbox';
import Main from '@components/Main';
import usePageFetch from '@components/usePageFetch';
import Spinner from '@components/Spinner';
import Store from '@models/Store';

const Timeline = () => {
  const { tag } = useParams();

  const [assets, setAssets] = useState([]);
  const [pickImg, setPickImg] = useState(false);
  const [showcase, setShowcase] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const {
    objects,
    hasMore,
    loading,
    error
  } = usePageFetch(`/tags/profile/${Store.profile.id}/${tag}`, pageNumber);

  useEffect(() => {
    const a = objects.filter((object) => object.asset).map(({asset}) => asset);
    setAssets(a);
  }, [objects]);

  const showchaseImage = (index) => {
    console.log(index);
    setPickImg(index);
    setShowcase(true);
  }

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

  const renderObject = (object, ref) => {
    const { asset, moment } = object;
    if (asset) {
      return (
        <div
          key={object.id}
          className={`masonry-brick`}
          onClick={() => showchaseImage(assets.findIndex((entry) => entry._id == asset._id))}
          ref={ref}
        >
          <Image src={asset.name} className='masonry-img scale-img' size='small'/>
        </div>
      );
    }

    return (
      <div className="masonry-brick-100">
        <h1
          style={{fontSize: `${moment.text?.length < 80 ? '2rem' : '1.25rem'}`}}
        >
          {moment.text}
        </h1>
      </div>
    );
  }

  return (
    <Main>
      <HeroBox>
        <Title>{Store.profile.nickname}'s</Title>
        <HeroTitle>#{tag}</HeroTitle>
      </HeroBox>

      <div className="masonry">
        {
          objects.map((object, index) => {
            return renderObject(object, index + 1 == objects.length ? lastAssetElementRef : null);
          })
        }
      </div>
      <div>{loading && <Spinner />}</div>
      <div>{error && 'Error'}</div>

      <Lightbox
        display={showcase}
        asset={assets[pickImg]}
        close={setShowcase}
      />
    </Main>
  );
};

export default Timeline;
