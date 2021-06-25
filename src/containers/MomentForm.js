import { observer } from 'mobx-react';
import React, { useState, useRef, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';

import { HeroBox, Subtitle, Title } from '@components/Headings';
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
  const [ uploading, setUploading ] = useState(0);

  const toastId = useRef(null);

  useEffect(() => {
    const body = {
      render: `Uploading: ${files.length - uploading}/${files.length}`,
      type: toast.TYPE.INFO,
      autoClose: false,
    }

    if (!uploading) {
      body.render = `Succesfully uploaded ${files.length} items!`,
      body.type = toast.TYPE.SUCCESS;
      body.autoClose = 3000;
    }

    toast.update(toastId.current, body);
  }, [uploading])

  const handleSubmit = async () => {
    // Set the overlay to avoid double submissions
    setUploading(files.length);
    toastId.current = toast("Saving...", { autoClose: false });

    // Create the form data, and load the image uploads
    const tagMap = tags.map((entry) => entry.value);
    const moment = {
      title,
      text,
      tags: tagMap,
      profile: Store.profile.id,
    }

    // Send the request upstream.
    const newMoment = await http.post("/moments", moment)
      .then((response) => {
        toast(
          `Created a new moment for ${Store.profile.nickname}!`,
          {
            type: toast.TYPE.SUCCESS,
            autoClose: 3000,
          }
        );
        return response.data;
      });

    console.log(newMoment)
    files.forEach((entry) => {
      uploadAsset(entry.file, tags, Store.profile.id, newMoment._id)
        .catch((e) => e)
        .then(() => {
          setUploading(prev => prev - 1)
        });
    })
  }

  return (
    <ModalContentBox className="flex-box flex-column">
      <HeroBox>
        <Title>Moments</Title>
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

      <button className="btn" onClick={handleSubmit}>Submit</button>
    </ModalContentBox>
  );
};

export default observer(MomentForm);
