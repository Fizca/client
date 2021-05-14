import { Image } from "react-bootstrap-icons";
import styled from "styled-components";

const Counter = styled.div`
  background-color: white;
  border: 2px solid red;
`;

const GridContainer = styled.div`
  width: 300px;
  height: 300px;

  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 0.5rem;

  & > * {
    grid-column: 1 / span 10;
    grid-row: 1 / span 10;
  }

  & img {
    border-radius: var(--border-radius);
    object-fit: cover;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  & svg {
    border-radius: var(--border-radius);
    object-fit: cover;
    overflow: hidden;
    width: 50%;
    height: 50%;
    align-self: center;
    justify-self: center;
  }
`;

const Twins = styled(GridContainer)`
  & :first-child {
    grid-column: 1 / span 10;
    grid-row: 1 / span 4;
  }

  & > * {
    grid-column: auto / span 10;
    grid-row: auto / span 6;
  }
`;

const Threes = styled(GridContainer)`
  & :first-child {
    grid-column: 1 / span 10;
    grid-row: 1 / span 6;
  }

  & > * {
    grid-column: auto / span 5;
    grid-row: auto / span 4;
  }
`;

const Fours = styled(GridContainer)`
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);

  & > * {
    grid-column: auto / span 6;
    grid-row: auto / span 6;
  }
`;

const Fives = styled(GridContainer)`
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);

  & :first-child {
    grid-column: 1 / span 6;
    grid-row: 1 / span 6;
  }

  & :nth-child(2) {
    grid-column: auto / span 6;
    grid-row: auto / span 6;
  }

  & > * {
    grid-column: auto / span 3;
    grid-row: auto / span 3;
  }
`;

const Many = styled(GridContainer)`
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);

  & :first-child {
    grid-column: 1 / span 8;
    grid-row: 1 / span 8;
  }

  & > * {
    grid-column: auto / span 3;
    grid-row: auto / span 3;
  }
`;

const GridGallery = (props) => {
  const { children } = props;

  const counter = (n) => {
    return (<Counter>+{n}</Counter>);
  }

  if (children.length === 1) {
    return(
      <GridContainer>
        {children[0]}
      </GridContainer>
    );
  }

  if (children.length === 2) {
    return(
      <Twins>
        {children}
      </Twins>
    );
  }

  if (children.length === 3) {
    return(
      <Threes>
        {children}
      </Threes>
    );
  }

  if (children.length === 4) {
    return(
      <Fours>
        {children}
      </Fours>
    );
  }


  if (children.length > 5) {
    const arr = children.slice(0, 4);
    return(
      <Fives>
        {arr}
        {counter(children.length - 5)}
      </Fives>
    );
  }

  return (
    <GridContainer>
      <Image height="auto" />
    </GridContainer>
  );
}

export default GridGallery;
