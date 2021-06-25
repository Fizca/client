import styled from 'styled-components';

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

  color: var(--brightfucsia);
`;

export const Title = styled.div`
  text-align: center;
  font-size: 2rem; /* 36 / 18 = 2 */
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 12px;
`;

export const HeroTitle = styled.span`
  font-size: 4.5rem; /* 117 / 18 = 6.5 */
  letter-spacing: 10px;
  font-weight: 500;
  color: #000;
  text-align: center;
`;

export const Subtitle = styled.span`
  font-size: 1.16667rem; /* 21 / 18 = 1.1667 */
  margin-bottom: 1.41429rem;
  letter-spacing: 4px;
  ${({text}) => text ? 'color: black;' : null}
`;


export const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 20%;
  position: relative;
  margin: 30px auto;
  background: var(--brightfucsia);
  overflow: visible;

  &::before {
    content: " ";
    width: 10px;
    height: 10px;
    background: var(--brightfucsia);
    display: inline-block;
    border: 2px solid var(--brightfucsia);
    border-radius: 50%;
    position: absolute;
    top: -4px;
    left: 50%;
    margin: 0 0 0 -3px;
  }
`;
