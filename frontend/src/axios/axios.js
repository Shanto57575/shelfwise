import axios from 'axios';

const API_BASE_URL = axios.create({
    baseURL: 'https://shelfwise-backend.vercel.app',
});

export default API_BASE_URL;
