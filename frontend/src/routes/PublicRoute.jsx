import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { ROUTES } from "../constants/routes";


function PublicRoute({ children }) {

    const { token } = useAuth();


    if (token) {

        return (
            <Navigate
                to={ROUTES.DASHBOARD}
                replace
            />
        );

    }


    return children;

}


export default PublicRoute;