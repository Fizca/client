import { useState, useRef, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

import { ModalContentBox } from '@components/Boxes';
import FileBox from '@components/FileBox';
import { HeroBox, Subtitle } from '@components/Headings';
import Store from '@models/Store';
import { uploadAsset } from '@services/Backend';

const opts = [{value: 'alpha', label: 'alpha'}, {value: 'bravo', label: 'bravo'}, {value: 'delta', label: 'delta'}]

const Uploads = (props) => {
  const [ files, setFiles ] = useState([]);
  const [ uploading, setUploading ] = useState(0);
  const [ options, setOptions ] = useState(opts)
  const [ tags, setTags ] = useState([]);

  const toastId = useRef(null);

  /**
   * Sanitizes and creates and object for the selection dropdown.
   * @param {string} label
   * @returns
   */
  const createOption = (label) => {
    const tag = label.toLowerCase().replace(/\W|\ /g, '')
    return {
      label: tag,
      value: tag,
    }
  };

  /**
   * The value of the tag to be created.
   * @param {string} inputValue
   */
  const handleTagCreate = (inputValue) => {
    const newValue = createOption(inputValue);
    setOptions((prev) => [...prev, newValue]);
    setTags(prev => [...prev, newValue]);
  };

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
          <div>Upload</div>
          <Subtitle>Add to {Store.profile.nickname}'s adventures</Subtitle>
        </HeroBox>

        <FileBox onChange={setFiles} />

        <CreatableSelect
          isMulti
          isClearable
          onChange={setTags}
          onCreateOption={handleTagCreate}

          options={options}
          classNamePrefix='rs'
          placeholder="Tags..."
          value={tags}
        />

        <button className="btn" onClick={handleSubmit}>Submit</button>
      </ModalContentBox>
  );
}

export default Uploads;
