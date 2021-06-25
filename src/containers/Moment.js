import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { HeroBox, HeroTitle, Subtitle } from '@components/Headings';
import Image from "@components/Image";
import Lightbox from '@components/Lightbox';
import Main from '@components/Main';
import Store from '@models/Store';
import { http } from '@services/Backend';

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 20%;
  position: relative;
  margin: 30px auto;
  background: var(--brightfucsia);
  overflow: visible;

  &::before {
    content: " ";
    width: 10px;
    height: 10px;
    background: var(--brightfucsia);
    display: inline-block;
    border: 2px solid var(--brightfucsia);
    border-radius: 50%;
    position: absolute;
    top: -4px;
    left: 50%;
    margin: 0 0 0 -3px;
  }
`;

const Moment = () => {
  const { id } = useParams();

  const [moment, setMoment] = useState({});
  const [assets, setAssets] = useState([]);
  const [pickImg, setPickImg] = useState(false);
  const [showcase, setShowcase] = useState(false);

  useEffect(async () => {
    const response = await http.get(`/moments/${id}`);

    setMoment(response.data);
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

  return (
    <Main>
      <HeroBox>
        <span>{moment.title}</span>
        <Hr />
        <Subtitle text>{moment.text}</Subtitle>
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
