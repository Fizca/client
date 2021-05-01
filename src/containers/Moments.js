import React, { useEffect, useState } from 'react';

import Navigation from '@containers/Navigation';
import { http } from '@services/Backend';
import Moment from '@components/Moment';

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

  return (<>
    <Navigation />
    <main role="main">

      <div className="container">
        <div className="row">
          {
            moments.map((moment, i) => {
              return (
                <Moment moment={moment} key={`m-${i}`}/>
              );
            })
          }
        </div>

        <hr/>

      </div>

    </main>

    <footer className="container">
      <p>&copy; Company 2021</p>
    </footer>
  </>);
};

export default Moments;
