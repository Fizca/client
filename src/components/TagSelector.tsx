import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import Store from '@models/Store';
import Http from '@services/Http';
import { TagOption, TagRef } from '../types/api';

/**
 * Sanitizes a label and builds an option for the selection dropdown.
 */
const createOption = (label: string): TagOption => {
  const tag = label.toLowerCase().replace(/\W|\ /g, '')
  return {
    label: `#${tag}`,
    value: tag,
  }
};

interface Props {
  tags?: TagOption[];
  setTags: React.Dispatch<React.SetStateAction<TagOption[]>>;
}

const TagSelector = ({ tags = [], setTags }: Props) => {
  const [ options, setOptions ] = useState<TagOption[]>([]);
  const [ value, setValue] = useState<TagOption[]>([]);

  useEffect(() => {
    setValue(tags.map((entry) => createOption(entry.value)));

    Http(`/tags/profile/${Store.profile?.id}`)
      .then((response) => {
        const entries = response.data.tags.map((tag: TagRef) => {
          return createOption(tag.name);
        });

        setOptions(entries);
      })
  }, []);

  /**
   * Create a new tag option from the typed input.
   */
  const handleTagCreate = (inputValue: string) => {
    const newValue = createOption(inputValue);

    setOptions((prev) => [...prev, newValue]);
    setValue(prev => [...prev, newValue]);
    setTags(prev => [...prev, newValue]);
  };

  // react-select/creatable is shimmed to `any`; selected values are TagOption[].
  const onChange = (entries: readonly TagOption[]) => {
    setTags([...entries]);
    setValue([...entries]);
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