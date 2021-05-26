import Modal from './Modal';
import Spinner from './Spinner';

const Loading = (props) => {
  const { isLoading } = props;
  return (
    <Modal showModal={isLoading}>
      <Spinner />
    </Modal>
  );
}

export default Loading;
