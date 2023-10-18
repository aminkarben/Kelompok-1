import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function FacebookLogin({ buttonText, onClick }) {
  return (
    <Button className="bg-white text-black fw-semibold" onClick={onClick}>
      <span>
        <img src="/facebook.svg" style={{ width: "25px", height: "25px" }} />
      </span>{" "}
      {buttonText}
    </Button>
  );
}

FacebookLogin.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

export default FacebookLogin;
