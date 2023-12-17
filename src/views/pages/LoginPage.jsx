import React from "react";
import fullScreenImage from "../../assets/img/full-screen-image-2.jpg";
import { Button, Card, Form, Container, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function LoginPage({
  title,
  setUserName,
  setPassword,
  setSubmit,
  username,
  password,
}) {
  const [cardClasses, setCardClasses] = React.useState("card-hidden");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 1000);
  });
  return (
    <div
      className="full-page section-image"
      data-color="orange"
      data-image={fullScreenImage}
    >
      <div className="content d-flex align-items-center p-0">
        <Container>
          <Col className="mx-auto " lg="5" md="8">
            <Form
              action=""
              className="form card-custom-login "
              method=""
              onSubmit={handleSubmit}
            >
              <Card className={"card-login card-custom-login " + cardClasses}>
                <Card.Header className="card-custom-login">
                  <h3 className="header text-center">{title}</h3>
                </Card.Header>
                <Card.Body>
                  <Card.Body>
                    <Form.Group>
                      <label>Email address</label>
                      <Form.Control
                        placeholder="Enter email"
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <label>Password</label>
                      <Form.Control
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card.Body>
                <Card.Footer className="ml-auto mr-auto">
                  <Button className="btn-wd" type="submit" variant="warning">
                    Login
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
      <div
        className="full-page-background"
        style={{
          backgroundImage: "url(" + fullScreenImage + ")",
        }}
      ></div>
    </div>
  );
}

LoginPage.propTypes = {
  title: PropTypes.string,
  setUserName: PropTypes.func,
  setPassword: PropTypes.func,
  setSubmit: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
};

export default LoginPage;
