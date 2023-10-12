import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    const navigate = useNavigate();

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
                <Navbar.Collapse id="navbarScroll">
                    <Form
                        onSubmit={handleSearch}
                        className="d-flex flex-grow-1 me-2"
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
                    <Nav className="d-none d-sm-flex ml-auto gap-2">
                        <Button
                            as={Link}
                            to="/login"
                            variant="outline-danger"
                            className="mr-2"
                        >
                            Login
                        </Button>
                        <Button variant="danger" className="">
                            Register
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
