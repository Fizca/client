import React, { useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalWrapper = ({children, ...rest}) => {
  return (
    <div onClick={e => e.stopPropagation()} {...rest}>
      {children}
    </div>
  );
}

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();

  // const renderModal = () => {
  //   if (!showModal) {
  //     return null;
  //   }
  //   return(
  //     <motion.div
  //       initial={{opacity: 0, y:-100}}
  //       enter={{opacity: 1, y: 0}}
  //       exit={{opacity: 0, y:-100}}
  //       transition={{duration: .3}}
  //       >
  //       <Background onClick={() => setShowModal && setShowModal(false)} ref={modalRef}>
  //         <div onClick={e => e.stopPropagation()}>{children}</div>
  //       </Background>
  //     </motion.div>
  //   );
  // }

  return (
    <AnimatePresence >
      {
        showModal &&
        (<motion.div
          initial={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1000,
            scale: 1.2,
            opacity: 0,
            position: "fixed",
            backgroundColor: 'rgba(0, 0, 0, .8)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{opacity: 0, scale: 1.2}}
          transition={{duration: .3}}
        >
          <Background onClick={() => setShowModal && setShowModal(false)} ref={modalRef}>
            {children}
          </Background>
        </motion.div>)
      }
    </AnimatePresence>
  );
};

export default Modal;