import axios from 'axios';

// SERVER_URL is an origin only (empty in production for same-origin calls through the
// Cloudflare proxy, http://localhost:3001 in dev). The /api prefix is the client's
// knowledge of the server route contract, so it lives here rather than in deploy config.
const apiBase = `${import.meta.env.SERVER_URL || ''}/api`;

const Http = axios.create({
  baseURL: apiBase,
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

export const serverUrl = apiBase;
export default Http;
