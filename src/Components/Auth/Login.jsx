import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "../GoogleLogin";
import { login } from "../../redux/actions/authAction";
import { getUser } from "../../redux/actions/profileAction";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);


    const onLogin = async (event) => {
        event.preventDefault();
        dispatch(login(email, password, navigate));
        dispatch(getUser());
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
                                Welcome Back! <br />
                                <span className="text-danger fs-4">
                                    Log in to Access our Movie Collection
                                </span>
                            </h1>
                            <p className="mb-4 text-danger opacity-50 fw-semibold">
                                If you already have an account, please enter
                                your login information to continue.
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <form onSubmit={onLogin}>
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
                                        <div className="container w-full text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-danger btn-block mb-4 w-75"
                                            >
                                                Sign in
                                            </button>
                                        </div>
                                        <p className="mb-3 fw-bold">
                                            Don&apos;t have an account ?{" "}
                                            <Link
                                                to="/register"
                                                className="text-primary-50 fw-bold text-decoration-none"
                                            >
                                                Sign Up
                                            </Link>
                                        </p>
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

export default Login;
