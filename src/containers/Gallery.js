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

  useEffect(() => {
    if (!Store.profiles.length) {
      Store.loadProfiles();
    }
  }, []);

  return (
    <Main>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">{Store.profile.nickname}</h1>
          <p>An adventure starts...</p>
          <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {
            assets.map((asset, i) => {
              return (
                <div className="col-md-4" key={i + "row"} p={i+"row"}>
                  <div className="card mb-4 box-shadow">
                  <Photo className="card-img-top" src={asset.name} />
                    <div className="card-body">
                      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </Main>
  );
};

export default observer(Gallery);
