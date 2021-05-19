import React, { useEffect, useState } from 'react';

import Main from '@components/Main';
import Moment from '@components/Moment';
import { http } from '@services/Backend';

const Moments = () => {
  const [ moments, setMoments ] = useState([]);

  useEffect(() => {
    http(`/moments/profile/6088ef4d34033901f14294dd?include=assets&include=profile`)
      .then((result) => {
        setMoments(result.data);
      });

    // This check prevents an infinite loop. It's a known issue with react
    // where the state change triggers the useEffect again.
    // https://dmitripavlutin.com/react-useeffect-infinite-loop/
    // https://css-tricks.com/run-useeffect-only-once/
  }, []);

  return (
    <Main>
      { moments.map((moment, i) => {
        return (<Moment moment={moment} key={`m-${i}`} />);
      })}
    </Main>
  );
};

export default Moments;
