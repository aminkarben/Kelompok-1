import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    Button,
    Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { setQueryValue } from "../redux/reducers/searchReducers";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;

        //validate if search query is empty
        if (searchQuery.trim() === "") {
            return;
        }

        dispatch(setQueryValue(searchQuery));

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


                {user && (
                    <>
                        <Navbar.Toggle
                            aria-controls="navbarScroll"
                            className="bg-danger text-danger"
                        />
                        <Navbar.Collapse id="navbarScroll">
                            <Form
                                onSubmit={handleSearch}
                                className="d-flex flex-column m-2 flex-grow-1 justify-content-center"
                            >
                                <div className="d-flex flex-grow-1 gap-2 align-items-center ">
                                    {user && (
                                        <div className="d-sm-none align-items-center justify-content-start mb-2">
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="danger"
                                                    id="dropdown-basic"
                                                >
                                                    <img
                                                        src="/user.png"
                                                        alt={user?.name}
                                                        style={{
                                                            width: "25px",
                                                        }}
                                                    />
                                                </Dropdown.Toggle>


                                                <Dropdown.Menu
                                                    id="dropdown-button-drop-start"
                                                    drop="start"
                                                >
                                                    <Dropdown.Item>
                                                        Hello {user?.name},
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to="/profile"
                                                    >
                                                        Profile
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        as={Button}
                                                        onClick={logout}
                                                        variant="danger"
                                                        style={{
                                                            backgroundColor:
                                                                "red",
                                                            color: "white",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Log Out
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    )}

                                    <div className="input-group">
                                        <FormControl
                                            type="search"
                                            placeholder="What do you want to watch?"
                                            className="mr-2 flex-1 bg-white bg-opacity-25 text-dark border-danger "
                                            aria-label="Search"
                                            name="search"
                                        />
                                        <Button type="submit" variant="danger">
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                            <Nav
                                id="responsiveNavbar"
                                className="d-sm-none align-items-center justify-content-start mb-2"
                            ></Nav>

                            <Nav className="d-none d-sm-flex ml-auto gap-2 text-white">
                                {user ? (
                                    <div className="d-flex gap-2 justify-content-start align-items-center text-white">
                                        <Dropdown
                                            id="dropdown-button-drop-start"
                                            drop="start"
                                        >
                                            <Dropdown.Toggle variant="danger">
                                                <img
                                                    src="/user.png"
                                                    alt={user?.name}
                                                    style={{
                                                        width: "26px",
                                                        margin: "0",
                                                        padding: "0",
                                                    }}
                                                />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    disabled
                                                    className="text-black"
                                                >
                                                    Hello {user?.name},
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/profile"
                                                >
                                                    Profile
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    as={Button}
                                                    onClick={logout}
                                                    style={{
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Log Out
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
                    </>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
