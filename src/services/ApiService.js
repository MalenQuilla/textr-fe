import axios from "axios";

const BASE_URL = "http://textr.ulake.usth.edu.vn/api/";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const setAuthorizationHeader = (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken)
        config.headers.Authorization = "bearer " + accessToken;
}

axiosInstance.interceptors.request.use(
    async (config) => {
        setAuthorizationHeader(config);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.error(error);

        if (error.response && error.response.status === 401)
            return new Promise((resolve) => {
                localStorage.removeItem("accessToken");
                window.location.href = '/auth';
                resolve(axiosInstance(error.config));
            })

        return Promise.reject(error);
    }
);

export const ApiService = {
    async GET(apiConfig) {
        const {uri, params, ...rest} = apiConfig;
        try {
            const res = await axiosInstance.get(uri, {
                params,
                ...rest,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    async GET_FULL(apiConfig) {
        const {uri, params, ...rest} = apiConfig;
        try {
            return await axiosInstance.get(uri, {
                params,
                ...rest,
            });
        } catch (error) {
            throw error;
        }
    },

    async POST(apiConfig) {
        const {uri, request, params, ...rest} = apiConfig;
        try {
            const res = await axiosInstance.post(uri, request, {
                params,
                ...rest,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    async PUT(apiConfig) {
        const {uri, request, params, ...rest} = apiConfig;
        try {
            const res = await axiosInstance.put(uri, request, {
                params,
                ...rest,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    async PATCH(apiConfig) {
        const {uri, request, params, ...rest} = apiConfig;
        try {
            const res = await axiosInstance.patch(uri, request, {
                params,
                ...rest,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    async DELETE(apiConfig) {
        const {uri, request, params, ...rest} = apiConfig;
        try {
            const res = await axiosInstance.delete(uri, {
                params,
                ...rest,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
}