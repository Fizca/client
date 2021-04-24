import styled, { css }from 'styled-components'
import Spinner from './Spinner';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  // background: var(--deepblue);
  background-color: #FFFFFF;
  ${props =>
    !props.disabled && css`
      display: none;
    `};
`;

const LoadingOverlay = (props) => (
  <Overlay disabled={props.disabled} className="text-center">
    <div className="mb-5"></div>
    <Spinner />
    <div className="mt-5"></div>
  </Overlay>
);

export default LoadingOverlay;
