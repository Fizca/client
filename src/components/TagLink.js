import { Link } from "react-router-dom";
import styled from "styled-components";

const Tag = styled(Link)`
  padding-left: 0.5rem;
`;

const TagLink = (props) => {
  const { tag } = props;
  return (
    <Tag className='link' to={`/timeline/${tag}`}>#{tag}</Tag>
  );
}

export default TagLink;