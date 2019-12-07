import axios from "axios";
import {ActionCreator} from "./reducer/reducer";

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error.response === 401) {
      dispatch(ActionCreator.changeIsAuthorizationRequired(true));
      history.push(`/login`);
    }
    return error;
  };
  api.interceptors.response.use(onSuccess, onError);
  return api;
};

export default configureAPI;
