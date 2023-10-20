import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (!token) return navigate("/login");

            axios.get(`${import.meta.env.VITE_VERCEL_AUTH}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    }, []);

    return children;
};

export default ProtectedRoute;
