// frontend/src/lib/api/axios.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// frontend/src/lib/api/axios.ts
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const oldToken = localStorage.getItem('token');
                const response = await axios.post(
                    `${API_URL}/auth/refresh`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${oldToken}` }
                    }
                );
                
                const newToken = response.data.token;
                localStorage.setItem('token', newToken);
                
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('token');
                window.location.href = '/auth';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;