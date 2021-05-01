import { http } from '@services/Backend';
import React, { useEffect, useState } from 'react';

const Image = (props) => {
  const [ src, setSrc ] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    http(`/assets/url/${props.src}`)
      .then((result) => {
        setSrc(result.data);
      });
  }, []);

  return (<img src={src} />);
}

export default Image;
