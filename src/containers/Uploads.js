import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import FileBox from '@components/FileBox';
import Progress from '@components/Progress';
import { HeroBox, Subtitle } from '@components/Headings';
import Main from '@components/Main';
import Store from '@models/Store';
import { http, uploadAsset } from '@services/Backend';

const opts = [{value: 'alpha', label: 'alpha'}, {value: 'bravo', label: 'bravo'}, {value: 'delta', label: 'delta'}]

const Uploads = () => {
  const [ files, setFiles ] = useState([]);
  const [ uploading, setUploading ] = useState(0);
  const [ options, setOptions ] = useState(opts)
  const [ tags, setTags ] = useState([]);

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
    console.log(files);
    if (!files.length) {
      return;
    }

    // Set the overlay to avoid double submissions
    setUploading(files.length);

    // Create the form data, and load the image uploads
    files.forEach((entry) => {
        uploadAsset(entry.file, tags, Store.profile.id)
          .catch((e) => console.log(e))
          .then(() => setUploading(prev => prev - 1));
    })
  }

  return (
    <Main>
      <HeroBox>
        <div>Upload</div>
        <Subtitle>Add to {Store.profile.nickname}'s adventures</Subtitle>
      </HeroBox>

      <div>
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
      </div>


      <Progress show={uploading}>
        <div>Uploading</div>
        <div>{files.length - uploading}/{files.length}</div>
      </Progress>
    </Main>
  );
}

export default Uploads;
