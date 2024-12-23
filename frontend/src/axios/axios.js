import axios from 'axios';

const API_BASE_URL = axios.create({
    baseURL: 'https://shelfwise-8x8g.onrender.com',
});

export default API_BASE_URL;
