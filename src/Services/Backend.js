import axios from 'axios';

const _transport = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true
});

/**
 * Upload assets to the server
 * @param {object} file
 * @param {array} tags
 * @param {string} profile
 * @returns
 */
const _uploadAsset = (file, tags, profile) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("profile", profile);

  tags.forEach((tag) => {
    formData.append('tags[]', tag.value);
  })

  return _transport.post("/assets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const serverUrl = process.env.SERVER_URL;
export const http = _transport;
export const uploadAsset = _uploadAsset;
