import axios from "axios";

import { ROUTES } from "../constants/routes";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

import {

    getAccessToken,

    getRefreshToken,

    setAccessToken,

    clearTokens

} from "../utils/storage";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL

});


// Request Interceptor


api.interceptors.request.use(

    (config) => {

        const token = getAccessToken();

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);


// Response Interceptor


api.interceptors.response.use(

    (response) => {

        return response;

    },

    async (error) => {

        const originalRequest = error.config;

        // Access Token Expired
        if (

            error.response?.status === 401 &&

            !originalRequest._retry

        ) {

            originalRequest._retry = true;

            try {

                const refresh = getRefreshToken();

                // Request New Access Token
                const response = await axios.post(

                    `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.REFRESH}`,

                    {

                        refresh

                    }

                );

                const newAccessToken = response.data.access;

                // Save New Access Token
                setAccessToken(newAccessToken);

                // Update Authorization Header
                originalRequest.headers.Authorization =

                    `Bearer ${newAccessToken}`;

                // Retry Original Request
                return api(originalRequest);

            }

            catch (refreshError) {

                // Refresh Token Expired
                clearTokens();

                window.location.href = ROUTES.LOGIN;

                return Promise.reject(refreshError);

            }

        }

        return Promise.reject(error);

    }

);

export default api;