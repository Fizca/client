import { http } from '@services/Backend';
import React, { useEffect, useState } from 'react';

const Image = (props) => {
  const { src, ...rest } = props;
  const [ source, setSource ] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    http(`/assets/url/${src}`)
      .then((result) => {
        setSource(result.data);
      });
  }, [src]);

  return (<img src={source} {...rest}/>);
}

export default Image;
