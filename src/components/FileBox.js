import { useState } from 'react';
import styled from 'styled-components';

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
    border-color: var(--greenteal);
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

const FileBox = (props) => {
  const [ files, setFiles ] = useState({});
  const { onChange } = props;

  /**
   * Add the file object
   * @param {object} event
   */
  const handleAddFile = (event) => {
    // Iterate over the files and load them up on the state
    const length = event.target.files.length;
    const newFiles = {};
    for (let i = 0; i < length; i++) {
      const file = event.target.files[i];
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
        <i className="las la-plus" style={{size:60}}></i>
        <input type='file' multiple />
      </Input>
    </Box>
  );
};

export default FileBox;