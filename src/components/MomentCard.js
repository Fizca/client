import styled from "styled-components";

import { Card } from "@components/Boxes";
import Image from "@components/Image";
import TagLink from "@components/TagLink";

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 1rem;
  gap: 1rem;

  min-height: 300px;
  max-width: 370px;
`;

const Em = styled.div`
  align-self: end;
  color: #505050;
  font-size: 0.9rem;
  align-self: end;
`;

const Tags = styled.div`
  align-self: end;

  display: flex;
  align-items: end;
  color: var(--brightfucsia);
  font-size: 1rem;
`;

const H3 = styled.h3`
  margin: 0px;
`;

const HeroImage = styled.div`
  width: 370px;
  height: 300px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
`;

const MomentCard = (props) => {
  const { moment, direction, innerRef } = props;

  const { assets = [] } = moment;

  return (
    <Card direction={direction} ref={innerRef}>
      <HeroImage>
        <Image src={assets[0]?.name} />
      </HeroImage>
      <Text>
        <Heading>
          <Em>{new Date(moment.createdAt).toLocaleString()}</Em>
          <H3>{moment.title}</H3>
        </Heading>

        <div>{moment.text}</div>

        <Tags>{moment.tags && moment.tags.map((tag, i) => <TagLink key={`t-${i}`} tag={tag.name} />)}</Tags>
      </Text>
    </Card>
  );
}

export default MomentCard;
