import axios from 'axios';

export const setupAxios = (logoutHandler)=>{
   axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 && error.response?.data?.message === "Token expired") {
            localStorage.removeItem('token');
            logoutHandler?.();
        }
        return Promise.reject(error);
    }
   )
};