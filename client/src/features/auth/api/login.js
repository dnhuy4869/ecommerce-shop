import { api } from "@lib/axios";

export const login = async (data) => {
    try {
        const res = await api.post(`/auth/login`,
            data
        );

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