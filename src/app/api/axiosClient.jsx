import axios from "axios";
import { useSelector } from "react-redux";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export default axiosClient;
