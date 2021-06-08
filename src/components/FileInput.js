import React, { useState } from 'react';
import styled from 'styled-components'

import { http } from '@services/Backend';
import Loading from '@components/Loading';
import Store from '@models/Store';

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 1rem;
  gap: 1rem;
`;

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

const InputFile = (props) => {
  const { children, preview, name, ...rest } = props;
  const [ files, setFiles ] = useState({});
  const [ uploading, setUploading ] = useState(false);

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

  const handleClick = (_event) => {
    if (!Object.keys(files).length) {
      return;
    }

    // Set the overlay to avoid double submissions
    setUploading(Object.values(files).length);

    // Create the form data, and load the image uploads
    Object.values(files).map(async (entry) => {
      const formData = new FormData();
      formData.append("image", entry.file);
      formData.append("profile", Store.profile.id);

      http.post("/assets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .catch((e) => console.log(e))
        .then(() => setUploading(prev => prev - 1));
    })

    // Faking a quick 2 second delay to give a sense of working
    // and reseting the state for more uploads.
    setTimeout(() => {
      setFiles({});
    }, 2000);
  }

  // TODO: Add a remove button, or at least a way to clear images.
  return (
    <Box>
      {Object.values(files).map((file, index) => {
        return (
          <Sqr key={index}>
              <img src={file.url} />
          </Sqr>
        );
      })}

      <Sqr>
        <Input {...rest} onChange={handleAddFile} className='btn fz-btn-light'>
          <i className="las la-file-image" style={{fontSize:'6rem'}}></i>
          <hr />
          Select files
          <input type='file' multiple name={name} />
        </Input>
      </Sqr>

      <Sqr>
        <Input onClick={handleClick} className='btn fz-btn-alert'>
          <i class="las la-cloud-upload-alt" style={{fontSize:'6rem'}}></i>
          <hr />
          Upload
        </Input>
      </Sqr>

      <Loading isLoading={(uploading > 0)} />
    </Box>
  );
};

export default InputFile;
