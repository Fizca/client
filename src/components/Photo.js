import styled from 'styled-components';
import Image from '@components/Image';

const Block = styled.div`
  & img: {
    height: 225px;
    width: 100%;
    display: block;
  }
`;

const Photo = (props) => {
  return (
    <Block>
      <Image src={props.src} />
    </Block>
  );
}

export default Photo;
