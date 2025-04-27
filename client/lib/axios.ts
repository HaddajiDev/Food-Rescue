import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: "https://food-rescue-server-virid.vercel.app",
    withCredentials: true
});

export default instanceAxios;