import api from "../axios/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// ===========================
// Login User
// ===========================

export async function login(username, password) {

    const response = await api.post(

        API_ENDPOINTS.LOGIN,

        {

            username,

            password

        }

    );

    return response.data;

}


// Refresh Token


export async function refreshToken(refresh) {

    const response = await api.post(

        API_ENDPOINTS.REFRESH,

        {

            refresh

        }

    );

    return response.data;

}