import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authAction";
import swal from "sweetalert2";
import GoogleLogin from "../GoogleLogin";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const name = `${firstName} ${lastName}`;

    const registerAccount = async (event) => {
        event.preventDefault();

        if (!firstName.trim() || !lastName.trim()) {
            swal.fire({
                title: "Error!",
                text: "Nama depan dan belakang harus diisi.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        if (password !== confirmPassword) {
            swal.fire({
                title: "Error!",
                text: "Password dan Confirm Password harus sama.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        } else {
            dispatch(register(email, name, password, navigate));
        }
    };

    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center text-black">
            <div
                className="mt-5 px-4 py-3 px-md-5 text-center text-lg-start rounded mx-2"
                style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
            >
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-2 mb-lg-0">
                            <h1 className="fs-1 my-4 display-3 fw-bold ls-tight">
                                Sign Up Now! <br />
                                <span className="text-danger fs-4">
                                    Sign up to Access our Movie Collection
                                </span>
                            </h1>
                            <p className="mb-4 text-danger opacity-50 fw-semibold">
                                By signing up, you&apos;ll be able to explore
                                thousands of movies and receive personalized
                                recommendations tailored to your preferences.
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <form onSubmit={registerAccount}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="formBasicFirstName"
                                                        className="form-control"
                                                        placeholder="First Name"
                                                        value={firstName}
                                                        onChange={(e) =>
                                                            setFirstName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="formBasicLastName"
                                                        className="form-control"
                                                        placeholder="Last Name"
                                                        value={lastName}
                                                        onChange={(e) =>
                                                            setLastName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="email"
                                                id="formBasicEmail"
                                                className="form-control"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="formBasicPassword"
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="formBasicConfirmPassword"
                                                className="form-control"
                                                placeholder="Confirm Password"
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="container w-full text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-danger btn-block mb-4 w-75"
                                            >
                                                Sign Up
                                            </button>
                                        </div>

                                        <div className="mb-3 fw-bold">
                                            already have an account?{" "}
                                            <Link
                                                to="/login"
                                                className="text-primary-50 fw-bold text-decoration-none"
                                            >
                                                Sign In
                                            </Link>
                                        </div>

                                        <div className="text-center">
                                            <div className="row">
                                                <div className="col">
                                                    <hr />
                                                </div>
                                                <div className="col-auto">
                                                    or
                                                </div>
                                                <div className="col">
                                                    <hr />
                                                </div>
                                            </div>

                                            <div className="d-flex gap-3 justify-content-evenly flex-wrap">
                                                <GoogleLogin
                                                    buttonText={
                                                        "Login with Google"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
