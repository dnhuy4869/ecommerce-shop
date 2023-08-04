import axios from "axios";
import { refreshToken } from "@features/auth";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
});

// Request interceptor for API calls
api.interceptors.request.use(
    async config => {

        let accessToken = "";

        const currUser = localStorage.getItem('user');
        if (currUser) {
            const user = JSON.parse(currUser);
            accessToken = user.accessToken;
        }

        config.headers = {
            'authorization': accessToken,
        }

        return config;
    },
    error => {
        Promise.reject(error)
    }
);

// Response interceptor for API calls
api.interceptors.response.use((response) => {
    return response
}, async (error) => {

    const originalRequest = error.config;

    if (originalRequest.headers['skip-interceptor']) {
        return Promise.reject(error);
    }

    if ((error.response.status === 401 && error.response.data.requireRefresh)
        && !originalRequest._retry) {

        const resData = await refreshToken();

        if (resData.isSuccess) {
            axios.defaults.headers.common['authorization'] = resData.response.accessToken;

            //console.log("refresh token");
            originalRequest._retry = true;
            originalRequest.headers['authorization'] = resData.response.accessToken;

            return api(originalRequest);
        } else {
            // Dispatch failed event
            const event = new CustomEvent('refreshTokenFailed');
            window.dispatchEvent(event);
        }
    }

    return Promise.reject(error);
});

export default api;

