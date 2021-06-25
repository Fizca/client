import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { HeroBox, Title, Subtitle, Hr } from '@components/Headings';
import Image from "@components/Image";
import Lightbox from '@components/Lightbox';
import Main from '@components/Main';
import { http } from '@services/Backend';
import TagLink, { Tags }from '@components/TagLink';

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
        <Title>{moment.title}</Title>
        <Hr />
        <Subtitle text>{moment.text}</Subtitle>

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
