import axios from "axios";
import { refreshToken } from "@features/auth";
import { API_URL } from "../app/config";

const api = axios.create({
    baseURL: API_URL,
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

            // Parse data to json again
            if (originalRequest.headers['Content-Type'] === "application/json") {
                originalRequest.data = JSON.parse(originalRequest.data);
            }

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

export const apiGet = async (path) => {
    try {
        const res = await api.get(path);

        return {
            isSuccess: true,
            response: res.data
        }
    }
    catch (err) {
        if (err.response) {
            return {
                isSuccess: false,
                response: err.response.data
            }
        }

        console.log(err);

        return {
            isSuccess: false,
            response: { message: "Unknown error when post request" }
        }
    }
}

export const apiPost = async (path, data, config = undefined) => {
    try {
        const res = await api.post(path, data, config);

        return {
            isSuccess: true,
            response: res.data
        }
    }
    catch (err) {
        if (err.response) {
            return {
                isSuccess: false,
                response: err.response.data
            }
        }

        console.log(err);

        return {
            isSuccess: false,
            response: { message: "Unknown error when post request" }
        }
    }
}

export const apiPut = async (path, data, config = undefined) => {
    try {
        const res = await api.put(path, data, config);

        return {
            isSuccess: true,
            response: res.data
        }
    }
    catch (err) {
        if (err.response) {
            return {
                isSuccess: false,
                response: err.response.data
            }
        }

        console.log(err);

        return {
            isSuccess: false,
            response: { message: "Unknown error when post request" }
        }
    }
}

export const apiDelete = async (path) => {
    try {
        const res = await api.delete(path);

        return {
            isSuccess: true,
            response: res.data
        }
    }
    catch (err) {
        if (err.response) {
            return {
                isSuccess: false,
                response: err.response.data
            }
        }

        console.log(err);

        return {
            isSuccess: false,
            response: { message: "Unknown error when post request" }
        }
    }
}