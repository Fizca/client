import styled, {css} from 'styled-components';

const editable = css`
  ${({contentEditable}) => {
    const css = `
      outline: none;
      background-color: var(--bg-primary);
      border-bottom: 2px solid var(--bg-accent);
      max-width: 100%;

      &:focus {
        border-color: var(--greenteal);
      }
    `;
    return contentEditable && css;
  }}
`;

export const HeroBox = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  line-height: 1;
  margin-top: 0;
  position: relative;

  font-size: 2rem; /* 36 / 18 = 2 */
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 12px;
  text-align: center;

  color: var(--highlight);
`;

export const Title = styled.div`
  text-align: center;
  font-size: 2rem; /* 36 / 18 = 2 */
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 12px;

  ${editable}
`;

export const HeroTitle = styled.span`
  font-size: 4.5rem; /* 117 / 18 = 6.5 */
  letter-spacing: 10px;
  font-weight: 500;
  color: #000;
  text-align: center;

  ${editable}
`;

export const Subtitle = styled.span`
  font-size: 1.16667rem; /* 21 / 18 = 1.1667 */
  margin-bottom: 1.41429rem;
  letter-spacing: 4px;
  ${({text}) => text ? 'color: black;' : null}

  ${editable}
`;

export const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 20%;
  position: relative;
  margin: 20px auto;
  background: var(--accent);
  overflow: visible;

  &::before {
    content: " ";
    width: 10px;
    height: 10px;
    background: var(--accent);
    display: inline-block;
    border: 2px solid var(--accent);
    border-radius: 50%;
    position: absolute;
    top: -4px;
    left: 50%;
    margin: 0 0 0 -3px;
  }
`;

export const Em = styled.div`
  align-self: flex-end;
  color: #505050;
  font-size: 0.9rem;
  letter-spacing: initial;
`;
