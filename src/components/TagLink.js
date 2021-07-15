import { Link } from "react-router-dom";
import styled from "styled-components";

export const Tags = styled.div`
  align-self: flex-end;

  display: flex;
  align-items: end;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  font-weight: 300;
  text-transform: uppercase;
`;

const Tag = styled(Link)`
  padding-left: 1rem;

  transition: background-size 0.4s ease;
  background: linear-gradient(to bottom, transparent 42%, rgba(157, 0, 81, .1) 0) center center/0% 75% no-repeat;
  padding: 0 6px 2px 6px;
  color: var(--highlight);

  &:hover {
    color: var(--highlight);
    background-size: 100% 100%;
  }

  &:active {
    color: var(--highlight);
    background-size: 80% 100%;
  }
`;

const TagLink = (props) => {
  const { tag } = props;
  return (
    <Tag className='link' to={`/timeline/${tag}`}>#{tag}</Tag>
  );
}

export default TagLink;
