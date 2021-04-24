import { http } from '@services/Backend';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Img = styled.img`
  height: 225px;
  width: 100%;
  display: block;
`;

const Photo = (props) => {
  const [ src, setSrc ] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    http(`/assets/url/${props.src}`)
      .then((result) => {
        setSrc(result.data);
      });
  }, []);

  return (
    <div>
      <Img src={src} />
    </div>
  );
}

export default Photo;
