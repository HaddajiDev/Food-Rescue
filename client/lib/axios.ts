import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: "https://food-rescue-server-virid.vercel.app",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

export default instanceAxios;


//https://food-rescue-server-virid.vercel.app