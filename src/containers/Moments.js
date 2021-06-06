import React, { useEffect, useState } from 'react';

import Main from '@components/Main';
import Moment from '@components/Moment';
import { HeroBox, Subtitle, HeroTitle } from '@components/Headings';
import { http } from '@services/Backend';
import Store from '@models/Store';

const Moments = () => {
  const [ moments, setMoments ] = useState([]);

  useEffect(() => {
    http(`/moments/profile/${Store.profile.id}?include=assets&include=profile`)
      .then((result) => {
        setMoments(result.data);
      });
  }, []);

  return (
    <Main>
      <HeroBox>
        <div>{Store.profile.nickname}'s</div>
        <HeroTitle>Moments</HeroTitle>
        <Subtitle>All things I've done!</Subtitle>
      </HeroBox>

      { moments.map((moment, i) => {
        return (<Moment moment={moment} key={`m-${i}`} />);
      })}
    </Main>
  );
};

export default Moments;
