import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Bullseye, CloudUploadFill, FileImage } from 'react-bootstrap-icons'

import { http } from '@services/Backend';
import PartialLoading from '@components/LoadingOverlay';
import Navigation from '@containers/Navigation';

const FilePreview = styled.div`
  display: flex;
  align-items:center;
  font-size: 0.8rem;
`;

const Thumnail = styled.div`
  width: 75px;
  height: 75px;
  text-align: center;
  border-radius: 9999px;
  overflow:hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
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

const FileBox = styled.div`
  position: relative;
  border-color: var(--greenteal);
  border-style: solid;
  border-width: 1px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  height: 100%;
`;

const MomentForm = () => {
  const [ files, setFiles ] = useState({});
  const [ uploading, setUploading ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ text, setText ] = useState('');

  const handleAddFile = (event) => {
    // Iterate over the files and load them up on the state
    const length = event.target.files.length;
    const f = {};
    for (let i = 0; i < length; i++) {
      const file = event.target.files[i];
      f[file.name] = {
        url: URL.createObjectURL(file),
        type: file.type.split('/')[0],
        file,
      };
    }

    setFiles({ ...files, ...f});
  }

  const handleClick = () => {
    // Set the overlay to avoid double submissions
    setUploading(true);

    // Create the form data, and load the image uploads
    const formData = new FormData();
    Object.values(files).forEach((entry) => {
      formData.append("images", entry.file);
    })
    formData.append("title", title);
    formData.append("text", text);

    // Send the request upstream.
    return http.post("/moments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      // Faking a quick 2 second delay to give a sense of working
      // and reseting the state for more uploads.
      setTimeout(() => {
        setFiles({});
        setUploading(false);
      }, 2000);
    });
  }

  return (<>
    <Navigation />
    <main role="main">
      <div className="container row">
        <div className="col-6">
          <div className="form-group row">
            {/* <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label> */}
            <div className="col-sm-12">
              <input type="text" className="form-control" id="inputTitle" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>
          <div className="form-group row">
            {/* <label htmlFor="inputText" className="col-sm-2 col-form-label"></label> */}
            <div className="col-sm-12">
              <textarea className="form-control" id="inputText" placeholder="A moment in time..." onChange={(e) => setText(e.target.value)}>
              </textarea>
            </div>
          </div>
          <div className="form-group row">
            {/* <label htmlFor="inputText" className="col-sm-2 col-form-label"></label> */}
            <div className="col-sm-12">
              <Input onChange={handleAddFile} className='btn fz-btn-light col'>
                Upload Images
                <input type='file' multiple name={name} />
              </Input>
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <button className="btn btn-primary col" onClick={handleClick}>Submit</button>
            </div>
          </div>
        </div>

        <div className="col-6">
          <FileBox className="d-flex flex-wrap justify-content-start">
            {Object.values(files).map((file, index) => {
              return (
                <FilePreview key={index}>
                  <Thumnail className="p-3" >
                    <img src={file.url} />
                  </Thumnail>
                  <div>
                    {file.file.name}
                  </div>
                </FilePreview>
              );
            })}
          </FileBox>
        </div>
        <hr/>
      </div>
      <PartialLoading disabled={uploading} />
    </main>

    <footer className="container">
      <p>&copy; Company 2021</p>
    </footer>
  </>);
};

export default MomentForm;
