import axios from 'axios';
import { axiosBaseUrl } from './axiosBaseUrl';

axios.defaults.baseURL = axiosBaseUrl;

// REGISTER USER
export const register = async (username, password) => {
  const Url = '/auth/register/';
  let params = { username: username, password: password };
  let response = await axios.post(Url, { params });
  return response.data;
};

// LOGIN USER
export const login = async (username, password) => {
  const Url = '/auth/login/';
  let params = { username: username, password: password };
  let response = await axios.post(Url, { params });
  return response.data;
};
