import { observer } from 'mobx-react';
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { HeroBox, Subtitle } from '@components/Headings';
import { ModalContentBox} from '@components/Boxes';
import FileBox from '@components/FileBox';
import TagSelector from '@components/TagSelector';
import Store from '@models/Store';
import { http, uploadAsset } from '@services/Backend';

const MomentForm = (props) => {
  const { moment = {} } = props;
  const [ files, setFiles ] = useState([]);
  const [ title, setTitle ] = useState(moment.title);
  const [ text, setText ] = useState(moment.text);
  const [ tags, setTags ] = useState([]);
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
    <ModalContentBox className="flex-box flex-column">
      <HeroBox>
        <div>Moments</div>
        <Subtitle>Add to the memories of {Store.profile.nickname}</Subtitle>
      </HeroBox>

      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

      <textarea placeholder="A moment in time..." onChange={(e) => setText(e.target.value)}>
      </textarea>

      <FileBox onChange={setFiles} />

      <TagSelector tags={tags} setTags={setTags} />

      <DateTimePicker
        disableClock={true}
        onChange={setTakenAt}
        value={takenAt}
      />

      <button className="btn" onClick={handleClick}>Submit</button>
    </ModalContentBox>
  );
};

export default observer(MomentForm);
