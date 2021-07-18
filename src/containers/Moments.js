import React, { useRef, useCallback, useState } from 'react';

import Main from '@components/Main';
import MomentCard from '@components/MomentCard';
import { HeroBox, Subtitle, HeroTitle, Title } from '@components/Headings';
import usePageFetch from '@components/usePageFetch';
import Spinner from '@components/Spinner';
import Store from '@models/Store';

const Moments = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const {
    objects: moments,
    hasMore,
    loading,
    error
  } = usePageFetch(`/moments/profile/${Store.profile.id}`, pageNumber);

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
   }, [loading, hasMore]);

  return (
    <Main>
      <HeroBox>
        <Title>{Store.profile.nickname}'s</Title>
        <HeroTitle>Moments</HeroTitle>
        <Subtitle>All things I've done!</Subtitle>
      </HeroBox>

      <div className='flex-box gap-3'>
        { moments.map((moment, i) => {
          return (
            <MomentCard
              moment={moment}
              key={`m-${i}`}
              innerRef={i + 1 == moments.length ? lastAssetElementRef : null}
            />
          );
        })}
      </div>
      <div>{loading && <Spinner />}</div>
      <div>{error && 'Error'}</div>
    </Main>
  );
};

export default Moments;
