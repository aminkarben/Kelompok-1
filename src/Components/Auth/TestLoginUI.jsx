import { Container, Row, Col, Card, Image, Form } from "react-bootstrap";
const TestLoginUI = () => {
    return (
        <div className="d-flex align-items-center justify-content-center text-white min-vh-100">
            <Container>
                <Card className="d-flex align-items-center">
                    <Card.Body>
                        <Row>
                            <Col>
                                <Image
                                    src="/bg-login.jpg"
                                    alt="bg-login"
                                    fluid
                                    style={{ height: "30rem" }}
                                ></Image>
                            </Col>
                            <Col>
                                <h2>Welcome Back,</h2>
                                <small>Sign In to Your Account</small>

                                <Card>
                                    <Card.Body mt="2">
                                        <Form>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicEmail"
                                            >
                                                <Form.Label>
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicEmail"
                                            >
                                                <Form.Label>
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default TestLoginUI;
