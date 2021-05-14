import GridGallery from "@components/GridGallery";
import Image from "@components/Image";
import styled from "styled-components";

const Text = styled.div`
  flex-grow: 1;
  padding: 1rem;
`;

const Moment = (props) => {
  const { moment } = props;

  return (
    <div className="card">
      <Text>
        <h3>{new Date(moment.createdAt).toLocaleString()}</h3>
        <h3>{moment.title}</h3>
        <p>{moment.text}</p>
      </Text>
      <GridGallery>
        {moment.assets.map((entry, i) => {
          return (<Image src={entry.name} key={`gi-${i}`} />);
        })}
      </GridGallery>
    </div>
  );
}

export default Moment;
