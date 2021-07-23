import styled from 'styled-components';
import { AnimatePresence } from "framer-motion"

import Image from '@components/Image';
import Modal, {ModalWrapper} from '@components/Modal';
import { useEffect, useState } from 'react';

const Img = styled(Image)`
  max-width: 700px;
  min-width: 400px;
  max-height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius);
  position: absolute;
`;

const ArrowDiv = styled(ModalWrapper)`
  display: flex;
  align-content: flex-end;
  z-index: 2;
  border-radius: 50%;
  background-color: var(--deepblue);
  margin: 1rem;
  ${
    (props) => props.active ? 'color: var(--btn);' : 'color: var(--btn-disabled);'
  }
  ${
    (props) => props.right ? 'margin-left: auto;' : 'margin-right: auto;'
  }

  & .las {
    font-size: 3rem;
  }
`;
const Arrow = ({onClick, active, icon, right}) => {
  return (
    <ArrowDiv active={active} onClick={onClick} right={right}>
      <i className={`las ${icon}`}></i>
    </ArrowDiv>
  );
}

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const Lightbox = ({display, close, index, assets}) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setPage(index);
  }, [index, display]);

  const activeDirection = (direction) => {
    if (direction > 0 && page < assets.length -1) return 'true';
    if (direction < 0 && page > 0) return 'true';
    return undefined;
  }

  const paginate = (newDirection) => {
    if (!activeDirection(newDirection)) return;
    setPage((prev) => prev + newDirection);
    setDirection(newDirection);
  };

  if (!assets || !assets.length) {
    return null;
  }

  return (
    <Modal showModal={display} setShowModal={close} backgroundClose>
        <Arrow active={activeDirection(-1)} onClick={() => paginate(-1)} icon='la-arrow-circle-left' />
        <AnimatePresence initial={false} custom={direction}>
          <Img
            onClick={(e) => e.stopPropagation()}

            key={`lighbox-asset-${page}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}

            src={assets[page]?.name}
            size="large"
          />
        </AnimatePresence>
        <Arrow active={activeDirection(1)} onClick={() => paginate(1)} icon='la-arrow-circle-right' right='true'/>
    </Modal>
  );
}

export default Lightbox;
