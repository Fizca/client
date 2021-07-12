import styled from "styled-components";

import { Em } from "@components/Headings";
import { Card } from "@components/Boxes";
import TagLink, { Tags } from "@components/TagLink";
import { Link } from "react-router-dom";
import GridGallery from "./GridGallery";

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 1rem;
  gap: 1rem;

  min-height: 250px;
  width: calc(var(--width) - 1rem);
`;

const H3 = styled.h3`
  margin: 0px;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 350px;

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
  const { moment, innerRef } = props;

  const { assets = [] } = moment;

  return (
    <Card ref={innerRef}>
      <HeroImage>
        <GridGallery assets={assets} />
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
