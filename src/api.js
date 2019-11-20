import axios from "axios";

const configureAPI = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });
  return api;
};

export default configureAPI;
