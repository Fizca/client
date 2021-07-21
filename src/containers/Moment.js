import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { Em, Text } from '@components/Headings';
import { IconBtn, IconRow } from "@components/Icon";
import Image from "@components/Image";
import Lightbox from '@components/Lightbox';
import Main from '@components/Main';
import Modal from "@components/Modal";
import { Bubble } from '@components/Quote';
import TagLink, { Tags }from '@components/TagLink';
import MomentForm from "@containers/MomentForm";
import { http } from '@services/Backend';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-contents: space-between;
  width: 100%;
  gap: 1rem;
`;

const ImgContainer = styled.div`
  width: 125px;
  height: 200px;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  border-radius: var(--border-radius);

  & img {
    object-fit: cover;
    width: 100%;
    height: 300px;
  }
`;

const Moment = () => {
  const { id } = useParams();
  const [moment, setMoment] = useState({});
  const [pickImg, setPickImg] = useState(0);
  const [showcase, setShowcase] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(async () => {
    const response = await http.get(`/moments/${id}`);
    setMoment(response.data);
  }, []);

  const onCancel = () => {
    loadMoment(originalMoment.current);
    setEdit(false);
  }

  const onSave = async () => {
    await http.put(`/moments/${id}`, {
      title,
      text,
      tags: tags.map((entry) => entry.value),
      takenAt,
    });

    const response = await http.get(`/moments/${id}`);

    assets.map(async (asset) => {
      await http.put(`/assets/${asset._id}`, {
        tags: tags.map((entry) => entry.value),
      });
    });

    // Load moment, and referrence for current moment.
    loadMoment(response.data);
    originalMoment.current = response.data;
    setEdit(false);

    toast(
      'Updated this moment!',
      { type: toast.TYPE.SUCCESS, autoClose: 3000, }
    );
  }

  const showchaseImage = (index) => {
    setPickImg(index);
    setShowcase(true);
  }

  return (
    <Main>
      <IconRow>
        <IconBtn className="la la-edit" onClick={() => setEdit(true)} />
      </IconRow>

      <Em>{new Date(moment.takenAt).toLocaleString()}</Em>

      <Bubble>
        <div className='blockquote'>
          <Text length={moment.text?.length}>
            {moment.text}
          </Text>
        </div>
      </Bubble>

      <Tags>
        {
          moment.tags?.map((tag, i) => <TagLink key={`t-${i}`} tag={tag.name} />)
        }
      </Tags>

      <div className="masonry">
        {
          moment.assets?.map((asset, index) => {
            return (
              <div key={`asset-${index}`} className={`masonry-brick`} onClick={() => showchaseImage(index)}>
                <Image src={asset.name} className='masonry-img scale-img' size='small' />
              </div>
            );
          })
        }
      </div>

      <Lightbox
        display={showcase}
        assets={moment.assets || []}
        index={pickImg}
        close={setShowcase}
      />

      <Modal showModal={edit} setShowModal={() => setEdit(false)} backgroundClose >
        <MomentForm moment={moment} close={() => setEdit(false)} />
      </Modal>
    </Main>
  );
};

export default Moment;
