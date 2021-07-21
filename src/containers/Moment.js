import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { Em, Text } from '@components/Headings';
import Image from "@components/Image";
import Lightbox from '@components/Lightbox';
import Main from '@components/Main';
import Modal from "@components/Modal";
import { Bubble } from '@components/Quote';
import TagLink, { Tags }from '@components/TagLink';
import MomentForm from "@containers/MomentForm";
import { http } from '@services/Backend';

const IconRow = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const IconBtn = styled.i`
  cursor: pointer;

  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  border-radius: 50%;
  border-width: 0px;
  border-style: solid;
  border-color: var(--bg-accent);
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  background-color: var(--bg-primary);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  ${ ({primary}) => primary && `--color: var(--little-prince-coat-green);` }
  ${ ({danger}) => danger && `--color: var(--highlight);` }

  ${
    ({primary, danger}) => {
      if (primary || danger) {
        return `
          transition: all 200ms linear;
          &:hover {
            background-color: var(--color);
            color: var(--bg);
          }
        `;
      }
    }
  }
`;

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

  const isEditing = () => {
    if (edit) {
      return (
        <IconRow>
          <IconBtn className="la la-save" onClick={onSave} primary/>
          <IconBtn className="la la-times" onClick={onCancel} danger/>
        </IconRow>
      )
    }
    return (
      <IconRow>
        <IconBtn className="la la-edit" onClick={() => setEdit(true)} />
      </IconRow>
    );
  }

  return (
    <Main>
      { isEditing() }
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

      <Container>
        {
          moment.assets?.map((object, index) => {
            return (
              <ImgContainer
                key={object._id}
                onClick={() => showchaseImage(index)}
              >
                <Image
                  className="scale-img"
                  src={object.name} size="small"
                />
              </ImgContainer>
            );
          })
        }
      </Container>

      <Lightbox
        display={showcase}
        assets={moment.assets || []}
        index={pickImg}
        close={setShowcase}
      />

      <Modal showModal={edit} setShowModal={() => setEdit(false)} backgroundClose >
        <MomentForm moment={moment} />
      </Modal>
    </Main>
  );
};

export default Moment;
