import React from 'react';
import styled from 'styled-components'
import { CloudUploadFill } from 'react-bootstrap-icons'

const Sqr = styled.div`
  width: 150px;
  height: 200px;
  text-align: center;
  border-radius: 5px;
  overflow:hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    border-style: solid;
    border-width: 3px;
    border-color: var(--greenteal);
    padding: 2px;
  }
`;

const Input = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  & input {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
  }
`;


class InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: {} };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    if (this.callback) {
      this.callback(event);
    }

    const { files } = this.state;
    const length = event.target.files.length;
    for (let i = 0; i < length; i += 1) {
      files[event.target.files[i].name] = {
        filename: event.target.files[i].name,
        file: URL.createObjectURL(event.target.files[i]),
        type: event.target.files[i].type.split('/')[0]
      };
    };

    this.setState({ files });
  }

  render() {
    const { children, preview, onChange, name, ...rest } = this.props;
    this.callback = onChange;

    // TODO: Add a remove button, or at least a way to clear images.
    return (
      <div className="d-flex flex-wrap justify-content-start">

        <Sqr className="p-3">
          <Input {...rest} onChange={this.handleChange} className='btn fz-btn-light'>
            <CloudUploadFill size={80}/>
            <hr />
            Select files
            <input type='file' multiple name={name} />
          </Input>
        </Sqr>

        {Object.values(this.state.files).map((file, index) => {
          return (
            <Sqr className="p-3"  key={index}>
                <img src={file.file} />
            </Sqr>
          );
        })}
      </div>
    );
  }
}

export default InputFile;
