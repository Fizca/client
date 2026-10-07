import { useState, useRef, useEffect } from 'react';
import { toast, Id, UpdateOptions } from 'react-toastify';

import { ModalContentBox } from '@components/Boxes';
import FileBox, { FileEntry } from '@components/FileBox';
import { HeroBox, Subtitle, Title } from '@components/Headings';
import Store from '@models/Store';
import TagSelector from '@components/TagSelector';
import { uploadAsset } from '@services/Http';
import { TagOption } from '../types/api';

const Uploads = () => {
  const [ files, setFiles ] = useState<FileEntry[]>([]);
  const [ uploading, setUploading ] = useState(0);
  const [ tags, setTags ] = useState<TagOption[]>([]);

  const toastId = useRef<Id | null>(null);

  /**
   * Submit the files to the backend.
   */
  const handleSubmit = () => {
    const profileId = Store.profile?.id;
    if (!profileId || !files.length) {
      return;
    }

    // Set the overlay to avoid double submissions
    setUploading(files.length);
    toastId.current = toast("Saving...", { autoClose: false });

    // Create the form data, and load the image uploads
    files.forEach((entry) => {
      uploadAsset(entry.file, tags, profileId)
      .catch((e) => console.log(e))
      .then(() => {
        setUploading(prev => prev - 1)
      });
    })
  }

  useEffect(() => {
    const body: UpdateOptions = {
      render: `Uploading: ${files.length - uploading}/${files.length}`,
      type: toast.TYPE.INFO,
      autoClose: false,
    }

    if (!uploading) {
      body.type = toast.TYPE.SUCCESS;
      body.autoClose = 5000;
    }

    if (toastId.current !== null) {
      toast.update(toastId.current, body);
    }
  }, [uploading])

  return (
      <ModalContentBox className="flex-box flex-column gap-1">
        <HeroBox>
          <Title>Upload</Title>
          <Subtitle>Add to {Store.profile?.nickname}'s adventures</Subtitle>
        </HeroBox>

        <FileBox onChange={setFiles} />

        <TagSelector tags={tags} setTags={setTags} />

        <button className="btn" onClick={handleSubmit}>Submit</button>
      </ModalContentBox>
  );
}

export default Uploads;
