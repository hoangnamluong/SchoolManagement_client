import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosClient;

export { axiosPrivate };
