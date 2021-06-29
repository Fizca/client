import styled from "styled-components";

import { Em } from "@components/Headings";
import { Card } from "@components/Boxes";
import Image from "@components/Image";
import TagLink, { Tags } from "@components/TagLink";
import { Link } from "react-router-dom";

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
          <Em>{new Date(moment.takenAt).toLocaleString()}</Em>
          <H3><Link to={`/moments/${moment.id}`}>{moment.title}</Link></H3>
        </Heading>

        <div>{moment.text}</div>

        <Tags>{moment.tags && moment.tags.map((tag, i) => <TagLink key={`t-${i}`} tag={tag.name} />)}</Tags>
      </Text>
    </Card>
  );
}

export default MomentCard;
