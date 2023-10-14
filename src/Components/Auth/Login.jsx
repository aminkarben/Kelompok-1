import { Button, Form, Container, Card } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_VERCEL_AUTH}/login`,
                {
                    email,
                    password,
                }
            );
            const { data } = response.data;
            const { token } = data;

            localStorage.setItem("token", token);

            window.location.replace("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error?.response?.data?.message);
                return;
            }
        }
    };

    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center text-black">
            <Container className="p-4 w-100">
                <Card>
                    <Card.Body>
                        <h1>Sign in to your account</h1>
                        <Form onSubmit={login}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button
                                className="w-100"
                                variant="danger"
                                type="submit"
                            >
                                Login
                            </Button>
                        </Form>

                        <Link
                            to="/register"
                            className="fw-semibold text-decoration-none"
                        >
                            <small>belum punya akun?</small>
                        </Link>

                        <div className="row">
                            <div className="col">
                                <hr />
                            </div>
                            <div className="col-auto">OR</div>
                            <div className="col">
                                <hr />
                            </div>
                        </div>

                        {/* test only, you can use this with Component instead of Button directly on this page*/}
                        <div className="d-flex gap-3 justify-content-evenly flex-wrap">
                            <Button className="bg-white text-black fs-6 fw-semibold">
                                <span>
                                    <img
                                        src="/google.svg"
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                        }}
                                    />
                                </span>
                            </Button>
                            <Button className="bg-white text-black fs-6 fw-semibold">
                                <span>
                                    <img
                                        src="/facebook.svg"
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                        }}
                                    />
                                </span>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
