import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: "http://localhost:2000",
    withCredentials: true
});

export default instanceAxios;