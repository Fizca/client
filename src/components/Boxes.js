import styled from "styled-components";

import { ModalWrapper } from "@components/Modal";

export const ModalContentBox = styled(ModalWrapper)`
  flex-wrap: nowrap;

  background-color: var(--bg);
  border-radius: var(--border-radius);
  padding: 20px;
  width: 500px;
  max-height: 200%;
  gap: 1rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: ${({direction}) => direction === 'right' ? 'row-reverse' : 'row'};
  flex-wrap: wrap;
  flex: 1 1;
  flex-wrap: wrap;

  align-items: stretch;
  align-content: start;

  border-color: var(--bg-accent);
  border-style: solid;
  border-width: 1px;

  transition: box-shadow 300ms;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    transition: box-shadow 300ms;
  }
`;