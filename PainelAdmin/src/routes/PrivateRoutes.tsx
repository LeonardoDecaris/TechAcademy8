import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";

interface Props {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated, userAdmin } = useAuth();

    return isAuthenticated && userAdmin ? children : <Navigate to="*" replace />;
};

export default PrivateRoute;