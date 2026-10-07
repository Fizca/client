import Modal from './Modal';
import Spinner from './Spinner';

interface Props {
  isLoading?: boolean;
}

const Loading = ({ isLoading }: Props) => {
  return (
    <Modal showModal={isLoading}>
      <Spinner />
    </Modal>
  );
}

export default Loading;
