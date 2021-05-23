import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker';

import Main from '@components/Main';
import PartialLoading from '@components/LoadingOverlay';
import Store from '@models/Store';
import { http } from '@services/Backend';
import { Plus } from 'react-bootstrap-icons';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  & > * {
    flex-grow: 1;
  }
`;

const FilePreview = styled.div`
  display: flex;
  align-items:center;
  font-size: 0.8rem;
  gap: 0.5rem;

  & div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Thumbnail = styled.div`
  width: 75px;
  height: 75px;
  text-align: center;
  border-radius: 9999px;
  overflow:hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: var(--greenteal);
    padding: 2px;
  }
`;

const Input = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border-color: var(--btn);
  border-width: 2px;
  border-style: solid;
  background-color: var(--btn);
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: var(--btn-highlight);
  }

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
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  border-color: var(--bg-accent);
  border-style: solid;
  border-width: 1px;
  overflow: scroll;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  height: 100%;
`;

const MomentForm = (props) => {
  const { moment = {} } = props;
  const [ files, setFiles ] = useState({});
  const [ uploading, setUploading ] = useState(false);
  const [ title, setTitle ] = useState(moment.title);
  const [ text, setText ] = useState(moment.text);
  const [ takenAt, setTakenAt ] = useState(moment.takenAt || new Date())

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
    formData.append("profile", Store.profile.id);

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

  return (
    <Main>
      <Box>
        <h3>Create a new moment {Store.profile.nickname}</h3>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="A moment in time..." onChange={(e) => setText(e.target.value)}>
        </textarea>
        <FileBox>
          {Object.values(files).map((file, index) => {
            return (
              <FilePreview key={index}>
                <Thumbnail>
                  <img src={file.url} />
                </Thumbnail>
              </FilePreview>
            );
          })}
          <Input onChange={handleAddFile}>
            <Plus size={60}/>
            <input type='file' multiple />
          </Input>
        </FileBox>
        <DateTimePicker
          disableClock={true}
          onChange={setTakenAt}
          value={takenAt}
        />
        <button className="btn" onClick={handleClick}>Submit</button>
      </Box>
      <PartialLoading disabled={uploading} />
    </Main>
  );
};

export default observer(MomentForm);
