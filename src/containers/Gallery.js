import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import Image from '@components/Image';
import Main from '@components/Main';
import Store from '@models/Store';
import { http } from '@services/Backend';
import Modal from '@components/Modal';
import Lightbox from '@components/Lightbox';

const Gallery = () => {
  const [ pickImg, setPickImg ] = useState(false);
  const [ showcase, setShowcase ] = useState(false);
  const [ assets, setAssets ] = useState([]);

  useEffect(() => {
    http(`/assets/list`)
      .then((result) => {
        setAssets(result.data);
      });
  }, []);

  const showchaseImage = (index) => {
    setPickImg(index);
    setShowcase(true);
  }

  return (
    <Main>
      <div className="jumbotron">
        <h1>{Store.profile.nickname}</h1>
        <p>An adventure starts...</p>
      </div>

      <div className="masonry">
        {
          assets.map((asset, i) => {
            return (
              <div key={`asset-${i}`} className={`masonry-brick`} onClick={() => showchaseImage(i)}>
                <Image src={asset.name} className='masonry-img'/>
              </div>
            );
          })
        }
      </div>

      <Modal showModal={showcase} setShowModal={setShowcase} backgroundClose>
        <Lightbox display={showcase} asset={assets[pickImg]} />
      </Modal>
    </Main>
  );
};

export default observer(Gallery);
