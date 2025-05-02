import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: "https://food-rescue-server-virid.vercel.app",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

instanceAxios.interceptors.request.use(
  config => {
    config.headers['Origin'] = 'https://foodrescue-1.vercel.app';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instanceAxios;