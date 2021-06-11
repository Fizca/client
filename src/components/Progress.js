import styled from 'styled-components';

import Modal from '@components/Modal';
import { HeroBox } from '@components/Headings';

const Box = styled(HeroBox)`
  border-radius: var(--border-radius);
  justify-contents: center;
  background-color: var(--bg);
  width: 400px;
  padding: 20px;
`;

const Progress = (props) => {
  const { show, children } = props;
  return (
    <Modal showModal={show} >
      <Box>
        {children}
      </Box>
    </Modal>
  );
}

export default Progress;
