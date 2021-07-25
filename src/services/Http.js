import axios from 'axios';

const Http = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true
});


/**
 * Upload assets to the server
 * @param {object} file
 * @param {array} tags
 * @param {string} profile
 * @param {string} moment
 * @returns
 */
export const uploadAsset = (file, tags, profile, moment) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("profile", profile);

  if (moment) {
    formData.append("moment", moment);
  }

  tags.forEach((tag) => {
    formData.append('tags[]', tag.value);
  })

  return Http.post("/assets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const serverUrl = process.env.SERVER_URL;
export default Http;
