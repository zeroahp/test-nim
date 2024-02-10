import axios from 'axios';

const commonConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const axiosInstance = (baseURL='https://test-nim-server-zeroahp.vercel.app/') => {
  return axios.create({  
    baseURL,
    ...commonConfig,
  });
};

export default axiosInstance;
