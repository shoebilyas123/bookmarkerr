import axios from 'axios';
export const BASE_API =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:8000/api/v1';

const instance = axios.create({ baseURL: BASE_API });

export default instance;
