import { motion } from 'framer-motion';

import { serverUrl } from '@services/Backend';

const Image = (props) => {
  const { src, size = 'large', ...rest } = props;

  return (<motion.img src={`${serverUrl}/assets/${size}/${src}`} {...rest}/>);
}

export default Image;
