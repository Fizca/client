import React, { useEffect, useState } from 'react';

import Main from '@components/Main';
import Moment from '@components/Moment';
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
      <div className="jumbotron">
        <h1>Hello, I am {Store.profile.nickname}</h1>
        And this are all the adventures I've had...
      </div>
      { moments.map((moment, i) => {
        return (<Moment moment={moment} key={`m-${i}`} />);
      })}
    </Main>
  );
};

export default Moments;
