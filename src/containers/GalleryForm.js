import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import { ModalContentBox } from '@components/Boxes';
import FileBox from '@components/FileBox';
import { HeroBox, Subtitle, Title } from '@components/Headings';
import Store from '@models/Store';
import TagSelector from '@components/TagSelector';
import { uploadAsset } from '@services/Backend';

const Uploads = (props) => {
  const [ files, setFiles ] = useState([]);
  const [ uploading, setUploading ] = useState(0);
  const [ tags, setTags ] = useState([]);

  const toastId = useRef(null);

  /**
   * Submit the files to the backend
   * @param {object} _event
   * @returns
   */
  const handleSubmit = (_event) => {

    if (!files.length) {
      return;
    }

    // Set the overlay to avoid double submissions
    setUploading(files.length);
    toastId.current = toast("Saving...", { autoClose: false });

    // Create the form data, and load the image uploads
    files.forEach((entry) => {
      uploadAsset(entry.file, tags, Store.profile.id)
      .catch((e) => console.log(e))
      .then(() => {
        setUploading(prev => prev - 1)
      });
    })
  }

  useEffect(() => {
    const body = {
      render: `Uploading: ${files.length - uploading}/${files.length}`,
      type: toast.TYPE.INFO,
      autoClose: false,
    }

    if (!uploading) {
      body.type = toast.TYPE.SUCCESS;
      body.autoClose = 5000;
    }

    toast.update(toastId.current, body);
  }, [uploading])

  return (
      <ModalContentBox className="flex-box flex-column">
        <HeroBox>
          <Title>Upload</Title>
          <Subtitle>Add to {Store.profile.nickname}'s adventures</Subtitle>
        </HeroBox>

        <FileBox onChange={setFiles} />

        <TagSelector tags={tags} setTags={setTags} />

        <button className="btn" onClick={handleSubmit}>Submit</button>
      </ModalContentBox>
  );
}

export default Uploads;
