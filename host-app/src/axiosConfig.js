import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://qa-app.mewurk.com/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Add interceptors or additional configuration here if needed




export default axiosInstance;
