import Image from "@components/Image";
import { ImageFill } from "react-bootstrap-icons";
import styled from "styled-components";

const Box = styled.div`
  width: 200px,
  height: 250px,
`;

const Moment = (props) => {
  const { moment } = props;

  const images = (asset) => {
    if (asset.length) {
      return(
        <Box>
          <Image className="card-img-right flex-auto d-none d-md-block" src={moment.assets[0].name} />
        </Box>
      );
    }

    return (<ImageFill className="card-img-right flex-auto d-none d-md-block" width={200} height="auto" />);
  }

  return (
    <div className="card flex-md-row mb-4 box-shadow h-md-250">
      <div className="card-body d-flex flex-column align-items-start">
        <strong className="d-inline-block mb-2 text-primary">{moment.profile.name}</strong>
        <h3 className="mb-0">
          <a className="text-dark" href="#">{moment.title}</a>
        </h3>
        <div className="mb-1 text-muted">{new Date(moment.createdAt).toLocaleString()}</div>
        <p className="card-text mb-auto">{moment.text}</p>
      </div>
      { images(moment.assets)}
    </div>
  );
}

export default Moment;
