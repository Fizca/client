import { Link } from "react-router-dom";
import styled from "styled-components";

const Tag = styled(Link)`
  padding-left: 1rem;

  transition: background-size 0.4s ease;
  background: linear-gradient(to bottom, transparent 42%, rgba(157, 0, 81, .1) 0) center center/0% 75% no-repeat;
  padding: 0 6px 2px 6px;
  color: var(--brightfucsia);

  &:hover {
    color: var(--brightfucsia);
    background-size: 100% 100%;
  }

  &:active {
    color: var(--brightfucsia);
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
