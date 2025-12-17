import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiInstance = axios.create({
  baseURL: VITE_BASE_URL,
  timeout: 10000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

export const apiFileInstance = axios.create({
  baseURL: VITE_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "multipart/form-data" }
});