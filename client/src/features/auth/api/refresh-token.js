import api from "@lib/axios";

export const refreshToken = async () => {
    try {
        const res = await api.post(`/auth/refresh`, null, {
            headers: { 
                'skip-interceptor': true 
            },
            withCredentials: true,
        });

        // Set back access token to local storage
        const currUser = localStorage.getItem('user');
        if (currUser) {
            const user = JSON.parse(currUser);
            user.accessToken = res.data.accessToken;

            localStorage.setItem("user", JSON.stringify(user));
        }

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