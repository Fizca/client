import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import Store from '@models/Store';
import Http from '@services/Http';

/**
 * Sanitizes and creates and object for the selection dropdown.
 * @param {string} label
 * @returns
 */
const createOption = (label) => {
  const tag = label.toLowerCase().replace(/\W|\ /g, '')
  return {
    label: `#${tag}`,
    value: tag,
  }
};

const TagSelector = (props) => {
  const { tags = [], setTags } = props;
  const [ options, setOptions ] = useState([]);
  const [ value, setValue] = useState([]);

  useEffect(() => {
    setValue(tags.map((entry) => createOption(entry)));

    Http(`/tags/profile/${Store.profile.id}`)
      .then((response) => {
        const entries = response.data.tags.map((tag) => {
          return createOption(tag.name);
        });

        setOptions(entries);
      })
  }, []);

  /**
   * The value of the tag to be created.
   * @param {string} inputValue
   */
  const handleTagCreate = (inputValue) => {
    const newValue = createOption(inputValue);

    setOptions((prev) => [...prev, newValue]);
    setValue(prev => [...prev, newValue]);
    setTags(prev => [...prev, newValue.value]);
  };

  const onChange = (entries) => {
    setTags(entries.map((entry) => entry.value));
    setValue(entries);
  };

  return (
    <CreatableSelect
      isMulti
      isClearable
      onChange={onChange}
      onCreateOption={handleTagCreate}

      options={options}
      classNamePrefix='rs'
      placeholder="Tags..."
      value={value}

      menuPlacement='auto'
    />
  );
};

export default TagSelector;