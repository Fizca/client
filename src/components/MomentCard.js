import { Link } from "react-router-dom";
import styled from "styled-components";

import { Em, Text } from "@components/Headings";
import { Card } from "@components/Boxes";
import TagLink, { Tags } from "@components/TagLink";
import GridGallery from "@components/GridGallery";

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 1rem;
  gap: 1rem;

  min-height: 200px;
  width: calc(var(--width) - 1rem);
`;

const H3 = styled.h3`
  margin: 0px;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 350px;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
`;

const MomentCard = (props) => {
  const { moment, innerRef } = props;

  const { assets = [] } = moment;

  return (
    <Card ref={innerRef}>
      <HeroImage>
        <GridGallery assets={assets} />
      </HeroImage>
      <CardText>
        <Heading>
          <Em>{new Date(moment.takenAt).toLocaleString()}</Em>
        </Heading>

        <Text length={moment.text?.length}>
          <Link to={`/moments/${moment._id}`}>{moment.text}</Link>
        </Text>

        <Tags>{moment.tags && moment.tags.map((tag, i) => <TagLink key={`t-${i}`} tag={tag.name} />)}</Tags>
      </CardText>
    </Card>
  );
}

export default MomentCard;
