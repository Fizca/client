import { motion } from 'framer-motion';

import { serverUrl } from '@services/Http';

type ImageProps = React.ComponentProps<typeof motion.img> & { size?: string };

const Image = (props: ImageProps) => {
  const { src, size = 'large', ...rest } = props;

  if (!src) {
    return (<motion.img {...rest} />);
  }

  return (<motion.img src={`${serverUrl}/assets/${size}/${src}`} {...rest} />);
};

export default Image;
