import { Button, Form, Container, Card } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({
        isError: false,
        message: null,
    });

    const name = `${firstName} ${lastName}`;

    const registerAccount = async (event) => {
        event.preventDefault();

        const alertSuccess = () => {
            swal.fire({
                title: "Success!",
                text: "Registrasi Berhasil Silahkan Login!",
                icon: "success",
                confirmButtonText: "OK",
            });
        };

        const alertFail = () => {
            swal.fire({
                title: "Failed!",
                text: "Registrasi Gagal Silahkan Coba Lagi!",
                icon: "error",
                confirmButtonText: "OK",
            });
        };

        const validatePassword = () => {
            swal.fire({
                title: "Error!",
                text: "Password dan Confirm Password harus sama.",
                icon: "error",
                confirmButtonText: "OK",
            });
        };

        const customError = (error) => {
            swal.fire({
                title: "Failed!",
                text: `${error}`,
                icon: "error",
                confirmButtonText: "OK",
            });
        };

        try {
            if (password !== confirmPassword) {
                validatePassword();
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_VERCEL_AUTH}/register`,
                {
                    email,
                    name,
                    password,
                }
            );

            const { data } = response.data;
            const { token } = data;

            // Periksa apakah registrasi berhasil
            if (token) {
                alertSuccess();
                window.location.replace("/login");
            } else {
                alertFail();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors({
                    ...errors,
                    isError: true,
                    message: error?.response?.data?.message || error?.message,
                });
                customError(error?.response?.data?.message || error?.message);
                return;
            }

            setErrors({
                ...errors,
                isError: true,
                message: error?.message,
            });
            customError(error?.message);
        }
    };

    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center text-black">
            <Container className="p-4 w-100">
                <Card>
                    <Card.Header>Register an Account</Card.Header>
                    <Card.Body>
                        <Form onSubmit={registerAccount}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicFirstName"
                            >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Your First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicLastName"
                            >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Your Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Your email"
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
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicConfirmPassword"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                className="w-100"
                                variant="danger"
                                type="submit"
                            >
                                Register
                            </Button>
                            <small>
                                <Link
                                    to="/login"
                                    className="fw-semibold text-decoration-none "
                                >
                                    Sudah punya akun? masuk sekarang
                                </Link>
                            </small>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
