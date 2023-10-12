import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center mt-5 gap-2"
            style={{ minHeight: "75vh" }}
        >
            <h1 className="text-danger">404 | Pages Not Found</h1>
            <Button variant="danger" as={Link} to="/">
                Back to HomePages
            </Button>
        </div>
    );
};

export default Error;
