import api from "./axios.js";

export const getSecurityQuestion = async (username) => {

    const response = await api.post("/forgot-password/get-security-question",{
        username
    });


    return response.data;
}

export const updatePassword = async (updatePasswordData) => {

   const response = await api.post("/forgot-password/update-password",updatePasswordData);

   return response.data;

};