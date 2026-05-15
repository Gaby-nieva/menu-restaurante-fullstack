import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, adminOnly = false}) =>  {
    const token = localStorage.getItem ("token");

    if (!token) {
        return <Navigate to= "/login" />;
    }

    try {
        const decode = jwtDecode(token);

        // Si la ruta es sólo Admin
        if (adminOnly && decode.role !== "admin") {
            return <Navigate to= "/" />;
        }

        return children;
    }

    catch (error) {
        localStorage.removeItem("token");
        
        return <Navigate to= "/login" />;
    }
};

export default ProtectedRoute;