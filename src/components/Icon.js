import styled from 'styled-components';

export const IconRow = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 2;
`;

export const IconBtn = styled.i`
  cursor: pointer;

  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  border-radius: 50%;
  border-width: 0px;
  border-style: solid;
  border-color: var(--bg-accent);
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  background-color: var(--bg-primary);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  ${ ({primary}) => primary && `--color: var(--little-prince-coat-green);` }
  ${ ({danger}) => danger && `--color: var(--highlight);` }

  ${
    ({primary, danger}) => {
      if (primary || danger) {
        return `
          transition: all 200ms linear;
          &:hover {
            background-color: var(--color);
            color: var(--bg);
          }
        `;
      }
    }
  }
`;
