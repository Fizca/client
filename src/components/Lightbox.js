import { motion } from "framer-motion";
import styled from 'styled-components';

import Image from '@components/Image';
import Modal, {ModalWrapper} from '@components/Modal';

const Box = styled(ModalWrapper)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 90%;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: var(--greenteal);
  background-color: #000000;
  border-radius: var(--border-radius);

  & div {
    display: flex;
  }

  & img {
    object-fit: contain;
  }
`;

const Lightbox = ({display, asset}) => (
  // <motion.div
  //   initial={{opacity: 0, y:-100}}
  //   exit={{opacity: 0, y:-100}}
  //   animate={{opacity: display ? 1 : 0, y: display ? 0 : -100}}
  //   transition={{duration: .3}}
  //   >
    <Box>
      {/* do not close modal if anything inside modal content is clicked */}
      <div>
        <Image src={asset?.name} />
      </div>
      <div>
        <h2>{asset?.takenAt}</h2>
      </div>
    </Box>
  // </motion.div>
)

export default Lightbox;