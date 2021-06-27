import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { HeroBox, Title, Subtitle, Hr } from '@components/Headings';
import Image from "@components/Image";
import Lightbox from '@components/Lightbox';
import Main from '@components/Main';
import { http } from '@services/Backend';
import TagLink, { Tags }from '@components/TagLink';

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

  ${ ({primary}) => primary && `--color: var(--darkteal);` }
  ${ ({danger}) => danger && `--color: var(--brightfucsia);` }

  ${
    ({primary, danger}) => {
      if (primary || danger) {
        return `&:hover {
          background-color: var(--color);
          color: var(--bg);
        }`;
      }
    }
  }
`;

const Moment = () => {
  const { id } = useParams();

  const [moment, setMoment] = useState({});
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [assets, setAssets] = useState([]);
  const [pickImg, setPickImg] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(async () => {
    const response = await http.get(`/moments/${id}`);

    setMoment(response.data);
    setTitle(response.data.title);
    setText(response.data.text);
    setAssets(response.data.assets || []);
  }, []);

  const showchaseImage = (index) => {
    setPickImg(index);
    setShowcase(true);
  }

  const previous = () => {
    if (pickImg > 0) {
      return () => setPickImg(currImg => currImg - 1);
    };
    return undefined;
  }

  const next = () =>{
    if (pickImg < assets.length - 1) {
      return () => setPickImg(currImg => currImg + 1);
    };
    return undefined;
  }

  const isEditing = () => {
    if (edit) {
      return (
        <IconRow>
          <IconBtn className="la la-save" onClick={() => setEdit(false)} primary/>
          <IconBtn className="la la-times" onClick={() => setEdit(false)} danger/>
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
      <HeroBox>
        <Title
          contentEditable={edit}
          role="textbox"
          style={{maxWidht: '100%'}}
          onBlur={(e) => setTitle(e.target.innerText)}
          suppressContentEditableWarning={true}
        >
          {title}
        </Title>

        <Hr />
        <Subtitle
          text
          contentEditable={edit}
          role="textbox"
          style={{maxWidht: '100%'}}
          onBlur={(e) => setText(e.target.innerText)}
          suppressContentEditableWarning={true}
        >
          {text}
        </Subtitle>

        <Tags>{moment.tags && moment.tags.map((tag, i) => <TagLink key={`t-${i}`} tag={tag.name} />)}</Tags>
      </HeroBox>

      <div className="masonry">
        {
          assets.map((object, index) => {
            return (
              <div
                className="masonry-brick"
                key={object._id}
                onClick={() => showchaseImage(index)}
              >
                <Image src={object.name} className="masonry-img" size="small" />
              </div>
            );
          })
        }
      </div>

      <Lightbox
        display={showcase}
        asset={assets[pickImg]}
        close={setShowcase}
        prev={previous()}
        next={next()}
      />
    </Main>
  );
};

export default Moment;
