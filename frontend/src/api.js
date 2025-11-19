import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

// intercepter 
// intercepts requests that are sent and checks for access token 
// adds it if access token is found

// url for when application starts up
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    // checks for access token
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // if token then authorization header is passed with this format
        // `Bearer ACCESS_TOKEN`
        console.log(token)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;