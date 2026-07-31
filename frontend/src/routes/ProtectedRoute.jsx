import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { ROUTES } from "../constants/routes";

function ProtectedRoute({ children }) {

    const { token } = useAuth();

    if (!token) {

        return <Navigate to={ROUTES.LOGIN} replace />;

    }

    return children;

}

export default ProtectedRoute;