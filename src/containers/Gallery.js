import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import Photo from '@components/Photo';
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

      <div className="flex-box">
        {
          assets.map((asset, i) => {
            return (
              <div key={`asset-${i}`}>
                <Photo src={asset.name} />
              </div>
            );
          })
        }
      </div>
    </Main>
  );
};

export default observer(Gallery);
