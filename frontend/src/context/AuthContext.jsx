import { createContext, useState } from "react";
import {

    getAccessToken,

    setAccessToken,

    clearTokens

} from "../utils/storage";

export const AuthContext = createContext();

function AuthProvider({ children }) {

   const [token, setToken] = useState(getAccessToken);
   
    // Login Function
    function login(accessToken) {

        setAccessToken(accessToken);

        setToken(accessToken);

    }

    // Logout Function
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