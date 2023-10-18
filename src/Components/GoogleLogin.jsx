import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function GoogleLogin({ buttonText }) {
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_VERCEL_AUTH}/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      // navigate("/");

      // Temporary solution
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <Button
      className="bg-white text-black fw-semibold w-100"
      onClick={() => loginWithGoogle()}
    >
      <span>
        <img src="/google.svg" style={{ width: "30px" }} alt="google_logo" />
      </span>{" "}
      {buttonText}
    </Button>
  );
}

GoogleLogin.propTypes = {
  buttonText: PropTypes.string,
};
export default GoogleLogin;
