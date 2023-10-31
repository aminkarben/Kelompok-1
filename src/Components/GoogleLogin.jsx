import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    registerLoginWithGoogleAction,
    // getUser,
} from "../redux/actions/authAction";
import PropTypes from "prop-types";

function GoogleLogin({ buttonText }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (responseGoogle) => {
            await dispatch(
                registerLoginWithGoogleAction(
                    responseGoogle.access_token,
                    navigate
                )
            );
        },
        onError: (errorResponse) => {
            alert(errorResponse.error_description);
        },
    });

    return (
        <Button
            className="bg-white border text-black fw-semibold w-100"
            onClick={() => loginWithGoogle()}
        >
            <span>
                <img
                    src="/google.svg"
                    style={{ width: "30px" }}
                    alt="google_logo"
                />
            </span>{" "}
            {buttonText}
        </Button>
    );
}

GoogleLogin.propTypes = {
    buttonText: PropTypes.string,
};
export default GoogleLogin;
