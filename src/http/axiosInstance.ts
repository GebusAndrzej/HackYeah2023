import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://10.250.192.185:5001',
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // config.headers.Authorization = 'Bearer <example>'

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;