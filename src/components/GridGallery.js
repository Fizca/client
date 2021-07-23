import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';
import { useState } from "react";

import Image from "@components/Image";
import Lightbox from "@components/Lightbox";

const Counter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--bg);
  background-color: rgba(0, 0, 0, .4);

  font-size: 2.5rem;
  font-weight: bold;

  &:hover {
    color: var(--btn-highlight);
  }
`;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 0.25rem;

  &.grid-style-1 > * {
    grid-column: 1 / span 12;
    grid-row: 1 / span 12;
  }

  &.grid-style-2 > * {
    &:first-child {
      grid-column: 1 / span 6;
      grid-row: 1 / span 12;
    }

    grid-column: auto / span 6;
    grid-row: auto / span 12;
  }

  &.grid-style-3 > * {
    &:first-child {
      grid-column: 1 / span 6;
      grid-row: 1 / span 12;
    }

    grid-column: auto / span 6;
    grid-row: auto / span 6;
  }

  &.grid-style-4 > * {
      grid-column: auto / span 6;
      grid-row: auto / span 6;

      .alt > * {
        grid-column: auto / span 3;
        grid-row: 2 / span 12;

        .alt:nth-child(odd) {
          grid-row: 1 / span 10;
        }
      }
  }

  &.grid-style-4.alt > * {
    grid-column: auto / span 3;
    grid-row: 2 / span 12;

    &:nth-child(odd) {
      grid-row: 1 / span 10;
    }
  }

  &.grid-style-5 > * {
    grid-column: auto / span 6;
    grid-row: auto / span 6;

    &:nth-child(n+3) {
      grid-column: auto / span 4;
      grid-row: auto / span 6;
    }
  }

  .last {
    position: relative;
  }

  & .grid-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  & > * {
    overflow: hidden;
  }
`;

const mod = (length) => {
  return Math.max(length % 5, 3);
}

const GridGallery = (props) => {
  const { assets = [] } = props;

  const [ pickImg, setPickImg ] = useState(false);
  const [ showcase, setShowcase ] = useState(false);

  const items = assets.slice(0, mod(assets.length));

  if (!assets.length) {
    return (
      <GridContainer className="grid-style-1">
        <i className="las la-image" style={{fontSize: '6rem'}}></i>
      </GridContainer>
    )
  }

  const counter = (isLast, asset) => {
    const count = Math.max(assets.length - items.length, 0)
    if (isLast && count) {
      return (
        <Counter>
          <span>+{count}</span>
        </Counter>
      );
    }
    return null;
  }

  const alt = () => assets.length % 2 ? 'alt' : '';

  const showcaseImage = (index) => {
    setPickImg(index);
    setShowcase(true);
  }

  return (
    <GridContainer className={`grid-style-${items.length} ${alt()}`}>
      {
        items.map((item, index) => {
          const c = index == items.length - 1 ? 'last' : '';
          return (
            <div key={item._id} className={`${c}`} onClick={() => showcaseImage(index)}>
              <Image src={item.name} size="medium" className='grid-img scale-img' />
              { counter(c, item) }
            </div>
          )
        })
      }

      <Lightbox
        display={showcase}
        assets={assets || []}
        index={pickImg}
        close={setShowcase}
      />
    </GridContainer>
  );
}

export default GridGallery;
