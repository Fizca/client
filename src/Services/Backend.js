import axios from 'axios';

const _transport = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true
});

export const serverUrl = process.env.SERVER_URL;
export const http = _transport;
