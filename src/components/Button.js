import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #0B0C10;
  border-color: #66FCF1;
  color: #66FCF1;

  &:hover, &:active {
    background-color: #0B0C10;
    border-color: #45A29E;
    color: #45A29E;
  }
`;

const Button = (props) => (
  <StyledButton className="btn">
    {props.children}
  </StyledButton>
);

export default Button