import api from "./axios.js";

export const login = async (loginData) => {
    console.log("Sending login request:", loginData);

    const response = await api.post(
        "/login/login",
        loginData
    );

    console.log("Backend Response:", response);

    return response.data;
};