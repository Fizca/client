import styled from "styled-components";

import { ModalWrapper } from "@components/Modal";

export const ModalContentBox = styled(ModalWrapper)`
  flex-wrap: nowrap;

  background-color: var(--bg);
  border-radius: var(--border-radius);
  padding: 20px;
  width: var(--width);
  max-height: 95%;
  overflow: scroll;
  gap: 1rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1 1;
  flex-wrap: wrap;

  align-items: stretch;
  align-content: start;

  border-color: var(--bg-accent);
  border-style: solid;
  border-width: 1px;
`;
