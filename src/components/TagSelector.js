import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import Store from '@models/Store';
import { http } from '@services/Backend';

const TagSelector = (props) => {
  const { tags, setTags } = props;
  const [ options, setOptions ] = useState([]);

  useEffect(() => {
    http(`/tags/profile/${Store.profile.id}`)
      .then((response) => {
        const entries = response.data.tags.map((tag) => {
          return createOption(tag.name);
        });

        setOptions(entries);
      })
  }, []);

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

  return (
    <CreatableSelect
      isMulti
      isClearable
      onChange={setTags}
      onCreateOption={handleTagCreate}

      options={options}
      classNamePrefix='rs'
      placeholder="Tags..."
      value={tags}

      menuPlacement='bottom'
    />
  );
};

export default TagSelector;