import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import Image from '@components/Image';
import Main from '@components/Main';
import Store from '@models/Store';
import { http } from '@services/Backend';

const Gallery = () => {
  const [ assets, setAssets ] = useState([]);

  useEffect(() => {
    http(`/assets/list`)
      .then((result) => {
        setAssets(result.data);
      });
  }, []);

  return (
    <Main>
      <div className="jumbotron">
        <h1>{Store.profile.nickname}</h1>
        <p>An adventure starts...</p>
      </div>

      <div className="masonry-grid-wrapper">
        {
          assets.map((asset, i) => {
            let c = ''
            if (i % 5 === 0) c = 'tall';
            if (i % 11 === 0) c = 'big';
            if (i % 13 === 0) c = 'wide';
            return (
              <div key={`asset-${i}`} className={`${c} masonry-item`}>
                <Image src={asset.name} className='masonry-img'/>
              </div>
            );
          })
        }
      </div>
    </Main>
  );
};

export default observer(Gallery);
