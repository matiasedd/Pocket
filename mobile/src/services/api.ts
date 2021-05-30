import axios from 'axios';

const host = {
  development: process.env.DEVELOPMENT_HOST,
};

const api = axios.create({
  baseURL: host.development,
});

export default api;
