import { serverUrl } from '@services/Backend';
import { motion } from 'framer-motion';

const Image = (props) => {
  const { src, size = 'large', ...rest } = props;

  return (<motion.img src={`${serverUrl}/assets/${size}/${src}`} {...rest}/>);
}

export default Image;
