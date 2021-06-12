import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import styled from 'styled-components';

const Background = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, .8);
  z-index: 1000;
`;

export const ModalWrapper = ({children, onClick, ...rest}) => {
  return (
    <div onClick={e => e.stopPropagation()} {...rest}>
      {children}
    </div>
  );
}

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();

  const baseTrasition = {
    scale: 1.2,
    opacity: 0,
  }

  useEffect(() => {
    const overflow = showModal ? 'hidden' : 'unset';
    document.body.style.overflow = overflow;
  }, [showModal]);

  return (
    <AnimatePresence >
      {
        showModal &&
        (
          <Background
            onClick={() => setShowModal && setShowModal(false)} ref={modalRef}
            key='modal'
            initial={baseTrasition}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={baseTrasition}
            transition={{duration: .3}}
          >
            {children}
          </Background>
        )
      }
    </AnimatePresence>
  );
};

export default Modal;
