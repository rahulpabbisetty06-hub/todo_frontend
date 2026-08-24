import api from "./axios.js";

export const signup = async (userData) => {
    const response = await api.post(
        "signup/signup",
        userData
    );

    return response.data;
};