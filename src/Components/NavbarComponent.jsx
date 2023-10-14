import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./navbar.css";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getMe = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_VERCEL_AUTH}/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { data } = response.data;
                setUser(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error?.response?.data?.message);
                    return;
                }
            }
        };
        getMe();
    }, [user]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;

        //validate if search query is empty
        if (searchQuery.trim() === "") {
            return;
        }

        const searchUrl = `/search?query=${searchQuery}&include_adult=false&page=1`;

        navigate(searchUrl);
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.replace("/login");
    };

    return (
        <Navbar
            bg="transparent"
            className="navbar-expand-sm bg-white"
            expand="lg"
            sticky="top"
            style={{
                position: "fixed",
                top: "0",
                width: "100%",
                zIndex: "1000",
            }}
        >
            <Container style={{ position: "relative", zIndex: "1" }}>
                <Navbar.Brand>
                    <Link
                        to="/"
                        className="text-danger text-decoration-none fw-bold"
                    >
                        MovieList
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="navbarScroll"
                    className="bg-danger text-white"
                />
                {user && (
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            id="responsiveNavbar"
                            className="d-sm-none d-flex align-items-center mb-2"
                        >
                            {user && (
                                <div className="d-flex gap-2 justify-content-between align-items-center text-white">
                                    <p className=" fs-6 ">
                                        <Link
                                            to={"/profile"}
                                            className="text-decoration-none text-white fw-semibold fs-6 "
                                        >
                                            Hello {user?.name}
                                        </Link>
                                    </p>
                                    <Button onClick={logout} variant="danger">
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </Nav>
                        <Form
                            onSubmit={handleSearch}
                            className="d-flex flex-column m-2 flex-grow-1"
                        >
                            <div className="d-flex flex-grow-1 input-group">
                                <FormControl
                                    type="search"
                                    placeholder="What do you want to watch?"
                                    className="mr-4 flex-1 bg-white bg-opacity-25 text-light border-danger text-danger"
                                    aria-label="Search"
                                    name="search"
                                />
                                <Button type="submit" variant="danger">
                                    Search
                                </Button>
                            </div>
                        </Form>
                        <Nav className="d-none d-sm-flex ml-auto gap-2 text-white">
                            {user ? (
                                <div className="d-flex gap-2 justify-content-center align-items-center text-white">
                                    <Link
                                        to={"/profile"}
                                        className="text-decoration-none text-white fw-semibold fs-6"
                                    >
                                        Hello {user?.name}
                                    </Link>
                                    <Button
                                        onClick={logout}
                                        variant="danger"
                                        className="mr-2"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="outline-danger"
                                    className="mr-2"
                                >
                                    Login
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
