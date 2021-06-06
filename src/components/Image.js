import { http } from '@services/Backend';
import React, { useEffect, useState } from 'react';

const Image = (props) => {
  const { src, size = 'large', ...rest } = props;
  const [ source, setSource ] = useState(null);

  useEffect(() => {
    http(`/assets/url/${size}/${src}`)
      .then((result) => {
        setSource(result.data);
      });
  }, [src]);

  return (<img src={source} {...rest}/>);
}

export default Image;
