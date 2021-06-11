import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker';

import Main from '@components/Main';
import Progress from '@components/Progress';
import FileBox from '@components/FileBox';
import Store from '@models/Store';
import { http, uploadAsset } from '@services/Backend';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  & > * {
    flex-grow: 1;
  }
`;

const MomentForm = (props) => {
  const { moment = {} } = props;
  const [ files, setFiles ] = useState([]);
  const [ uploading, setUploading ] = useState(false);
  const [ title, setTitle ] = useState(moment.title);
  const [ text, setText ] = useState(moment.text);
  const [ takenAt, setTakenAt ] = useState(moment.takenAt || new Date())

  const handleClick = () => {
    // Set the overlay to avoid double submissions
    setUploading(true);

    // Create the form data, and load the image uploads
    const moment = {
      title: title,
      text: text,
      profile: Store.profile.id,
    }

    // Send the request upstream.
    http.post("/moments", moment)
      .then(() => {
        // Faking a quick 2 second delay to give a sense of working
        // and reseting the state for more uploads.
        setTimeout(() => {
          setFiles({});
          setUploading(false);
        }, 2000);
      });

    files.forEach((entry) => {
      uploadAsset(entry.file, tags, profile);
    })
  }

  return (
    <Main>
      <Box>
        <h3>Create a new moment {Store.profile.nickname}</h3>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="A moment in time..." onChange={(e) => setText(e.target.value)}>
        </textarea>

        <FileBox onChange={setFiles} />

        <DateTimePicker
          disableClock={true}
          onChange={setTakenAt}
          value={takenAt}
        />
        <button className="btn" onClick={handleClick}>Submit</button>
      </Box>

      <Progress show={uploading}>
        <div>Saving your moment...</div>
        {files && <div>Uploading Images...</div>}
      </Progress>
    </Main>
  );
};

export default observer(MomentForm);
