import styled from 'styled-components';

import Image from '@components/Image';
import Modal, {ModalWrapper} from '@components/Modal';

const ArrowDiv = styled(ModalWrapper)`
  margin-right: auto;
  margin-left: auto;
  border-radius: 50%;
  background-color: var(--deepblue);
  ${
    (props) => props.active ? 'color: var(--btn);' : 'color: var(--btn-disabled);'
  }
  & .las {
    font-size: 3rem;
  }
`;

const Box = styled(ModalWrapper)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  gap: 8px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: var(--greenteal);
  background-color: rgb(0, 0, 0, 0.3);
  border-radius: var(--border-radius);
  padding: 5px;

  & div {
    flex: 1;
    display: flex;
  }

  & .description {
    align-items: center;
    flex-direction: row;
    gap: 5px;
  }

  & .image-box {
    justify-content: center;
  }

  & img {
    width: 600px;
    max-height: 100vh;
    object-fit: contain;
    border-radius: var(--border-radius);
  }
`;

const Arrow = ({onClick, active, icon}) => {
  return (
    <ArrowDiv active={active}>
      <div onClick={onClick}><i className={`las ${icon}`}></i></div>
    </ArrowDiv>
  );
}

const Lightbox = ({display, close, asset, prev, next}) => {
  if (!asset) {
    return null;
  }

  const previousItem = (e) => {
    if(prev) {
      prev();
    }
  }

  const nextItem = (e) => {
    if (next) {
      next();
    }
  }

  return (
    <Modal showModal={display} setShowModal={close} backgroundClose>
      <Arrow active={prev ? 'true' : undefined} onClick={previousItem} icon='la-arrow-circle-left' />
      <Box className='test'>
        {/* do not close modal if anything inside modal content is clicked */}
        <div className='image-box'>
          <Image src={asset.name} />
        </div>
      </Box>
      <Arrow active={next ? 'true' : undefined} onClick={nextItem} icon='la-arrow-circle-right' />
    </Modal>
  );
}

export default Lightbox;
