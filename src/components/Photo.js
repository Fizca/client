import styled from 'styled-components';
import Image from '@components/Image';

const Block = styled.div`
  & img {
    height: 225px;
    width: 225px;
    display: block;
    border-radius: 10px;
    object-fit: cover;
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
