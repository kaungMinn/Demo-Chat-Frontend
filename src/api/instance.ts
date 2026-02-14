import axios from "axios";

const baseURL = import.meta.env.VITE_API_KEY || "";

export const instanceForJSON = axios.create({
  // withCredentials: true,
  baseURL,

  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const generalInstance = axios.create({
  // withCredentials: true,
  baseURL,

  headers: {
    "Content-Type": "application/json",
  },
});

export const instanceForMultipart = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
  },
});
