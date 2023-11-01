import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { protect } from "../../redux/actions/authAction";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(protect(navigate, null, "/login"));
    }, [dispatch, navigate]);

    return children;
};

export default ProtectedRoute;
