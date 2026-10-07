import React, { useState } from 'react';
import styled from 'styled-components';

// A selected file along with its preview URL and media kind (image, video, ...).
export interface FileEntry {
  url: string;
  type: string;
  file: File;
}

interface Props {
  onChange: (files: FileEntry[]) => void;
}

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  border-color: var(--bg-accent);
  border-style: solid;
  border-width: 1px;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  height: 100%;
`;

const FilePreview = styled.div`
  display: flex;
  align-items:center;
  font-size: 0.8rem;
  gap: 0.5rem;

  & div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Thumbnail = styled.div`
  width: 75px;
  height: 75px;
  text-align: center;
  border-radius: 9999px;
  overflow:hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: var(--success-dark);
    padding: 2px;
  }
`;

const Input = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border-color: var(--btn);
  border-width: 2px;
  border-style: solid;
  background-color: var(--btn);
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: var(--btn-highlight);
  }

  & input {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
  }
`;

const FileBox = ({ onChange }: Props) => {
  const [ files, setFiles ] = useState<Record<string, FileEntry>>({});

  /**
   * Add the selected files to local state and notify the caller.
   */
  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files;
    if (!selected) {
      return;
    }

    // Iterate over the files and load them up on the state
    const newFiles: Record<string, FileEntry> = {};
    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      newFiles[file.name] = {
        url: URL.createObjectURL(file),
        type: file.type.split('/')[0],
        file,
      };
    }
    setFiles(newFiles);

    // Pass the value to the calling component
    onChange(Object.values(newFiles));
  }

  return (
    <Box>
      {Object.values(files).map((file, index) => {
        return (
          <FilePreview key={index}>
            <Thumbnail>
              <img src={file.url} />
            </Thumbnail>
          </FilePreview>
        );
      })}
      <Input onChange={handleAddFile}>
        <i className="las la-plus" style={{ fontSize: 60 }}></i>
        <input type='file' multiple />
      </Input>
    </Box>
  );
};

export default FileBox;