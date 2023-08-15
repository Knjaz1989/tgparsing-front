import axios from 'axios';
import type { AppStore } from '../store';
import { localLogout } from '../store/user-slice/userSlice';
import { BASE_URL } from '../consts/consts';
import { getErrorMessage } from '../utils/getErrorMessage';
import { getISOTime } from '../utils/getISOTime';

const REQUEST_TIME = 5000;
let store: AppStore;

export const injectStore = (_store: AppStore) => (store = _store);

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIME,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.set('X-Datetime', getISOTime(new Date()));
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401) {
      store.dispatch(localLogout());
    }
    if (error.response.status < 500) {
      const clearErrorMessage = getErrorMessage(error);
      alert(clearErrorMessage);
      throw clearErrorMessage;
    }
    throw error;
  },
);
