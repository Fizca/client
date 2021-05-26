import React, { useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, .8);
  // background: var(--deepblue);
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  opacity: 1;
  width: 800px;
  height: 500px;
  overflow-y: scroll;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #FFFFFF;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  border-radius: var(--border-radius);
`;

export const ModalBox = ({showModal}) => {
  <motion.div
    initial={{opacity: 0, y:-100}}
    exit={{opacity: 0, y:-100}}
    animate={{opacity: showModal ? 1 : 0, y: showModal ? 0 : -100}}
    transition={{duration: .3}}
    >
    {/* do not close modal if anything inside modal content is clicked */}
    <ModalWrapper onClick={e => e.stopPropagation() }>
      {children}
    </ModalWrapper>
  </motion.div>
}

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();

  const renderModal = () => {
    if (!showModal) {
      return null;
    }
    return(
      <Background onClick={() => setShowModal && setShowModal(false)} ref={modalRef}>
        <div >{children}</div>
      </Background>
    );
  }

  // return  ReactDom.createPortal(
  //   <AnimatePresence >
  //     {renderModal()}
  //   </AnimatePresence>,
  //   document.getElementById('modal-root')
  // );

  return (
    <AnimatePresence >
      {renderModal()}
    </AnimatePresence>
  );
};

export default Modal;