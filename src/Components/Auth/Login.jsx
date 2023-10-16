import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "../GoogleLogin";

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
      {/* <Container className="p-4 w-100">
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
            </Container> */}

      <div
        className="mt-5 px-4 py-5 px-md-5 text-center text-lg-start rounded mx-2"
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
                If you already have an account, please enter your login
                information to continue.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={login}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example3"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        <div className="col-auto">or</div>
                        <div className="col">
                          <hr />
                        </div>
                      </div>
                      {/* <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <img
                          src="/google.svg"
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </button> */}
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <GoogleLogin buttonText={"Login with Google"} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <img
                          src="/facebook.svg"
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </button>
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
