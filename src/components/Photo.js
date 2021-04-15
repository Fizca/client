import axios from 'axios';
import React, { useEffect, useState } from 'react';

const serverUrl = process.env.SERVER_URL;

const Photo = (props) => {
  const [ src, setSrc ] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    axios(`http://${serverUrl}/assets/${props.src}`)
      .then((result) => {
        setSrc(result.data);
      });
  });

  return (
    <div>
      <img src={src} />
    </div>
  );
}

export default Photo;
