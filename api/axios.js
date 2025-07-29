import axios from 'axios';

const api = axios.create({
  baseURL: 'https://omybills.com.au/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here if needed
  },
});

export default api; 