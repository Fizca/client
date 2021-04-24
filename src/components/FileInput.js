import React from 'react';
import styled from 'styled-components'
import { CloudUploadFill, FileImage } from 'react-bootstrap-icons'

import { http } from '@services/Backend';
import PartialLoading from '@components/LoadingOverlay';


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

  // Constructor for the component
  constructor(props) {
    super(props);
    this.state = { files: {},  uploading: false };
  }

  handleAddFile = (event) => {
    // Iterate over the files and load them up on the state
    const { files } = this.state;
    const length = event.target.files.length;
    for (let i = 0; i < length; i++) {
      const file = event.target.files[i];
      files[file.name] = {
        url: URL.createObjectURL(file),
        type: file.type.split('/')[0],
        file,
      };
    }

    this.setState({ files });
  }

  handleClick = (_event) => {
    if (!Object.keys(this.state.files).length) {
      return;
    }

    // Set the overlay to avoid double submissions
    this.setState({ uploading: true });

    // Create the form data, and load the image uploads
    const formData = new FormData();
    Object.values(this.state.files).forEach((entry) => {
      formData.append("images", entry.file);
    })

    // Send the request upstream.
    return http.post("/assets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      // Faking a quick 2 second delay to give a sense of working
      // and reseting the state for more uploads.
      setTimeout(() => this.setState({ files: [], uploading: false }), 2000);
    });
  }

  render() {
    const { children, preview, name, ...rest } = this.props;

    // TODO: Add a remove button, or at least a way to clear images.
    return (
      <div className="d-flex flex-wrap justify-content-start" style={{position: 'relative' }}>

        {Object.values(this.state.files).map((file, index) => {
          return (
            <Sqr className="p-3"  key={index}>
                <img src={file.url} />
            </Sqr>
          );
        })}

        <Sqr className="p-3">
          <Input {...rest} onChange={this.handleAddFile} className='btn fz-btn-light'>
            <FileImage size={80}/>
            <hr />
            Select files
            <input type='file' multiple name={name} />
          </Input>
        </Sqr>

        <Sqr className="p-3">
          <Input onClick={this.handleClick} className='btn fz-btn-alert'>
            <CloudUploadFill size={80}/>
            <hr />
            Upload
          </Input>
        </Sqr>

        <PartialLoading disabled={this.state.uploading} />
      </div>
    );
  }
}

export default InputFile;
