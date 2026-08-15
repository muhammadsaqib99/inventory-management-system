
import { createContext, useState } from "react";

import {
    getAccessToken,
    setAccessToken,
    setRefreshToken,
    clearTokens
} from "../utils/storage";


export const AuthContext = createContext();


function AuthProvider({ children }) {

    const [token, setToken] = useState(getAccessToken());


    // ===========================
    // Login User
    // ===========================

    function login(accessToken, refreshToken) {

        setAccessToken(accessToken);

        setRefreshToken(refreshToken);

        setToken(accessToken);

    }


    // ===========================
    // Logout User
    // ===========================

    function logout() {

        clearTokens();

        setToken(null);

    }


    return (

        <AuthContext.Provider

            value={{

                token,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}


export default AuthProvider;

