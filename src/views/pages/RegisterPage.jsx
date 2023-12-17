import fullScreenImage from "../../assets/img/bg5.jpg";
import PropTypes from "prop-types";
import { BsChevronLeft } from "react-icons/bs";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
function RegisterPage({
  setGivenName,
  setMiddleName,
  setFamilyName,
  setUserName,
  setPassword,
  setIsSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  return (
    <div
      className="full-page register-page section-image"
      data-color="orange"
      data-image={fullScreenImage}
    >
      <div className="content d-flex align-items-center">
        <Container className="bg-custom">
          <Card className="card-register card-plain text-center py-3">
            <Card.Header>
              <Row className="justify-content-center card-custom-bg py-2">
                <Col md="8">
                  <div className="header-text card-custom">
                    <Card.Title as="h2">
                      Residential Management System
                    </Card.Title>
                    <Card.Subtitle as="h4">
                      Create your account to register as a resident
                    </Card.Subtitle>
                    <hr />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="mb-6 custom-margin">
              <Row>
                <Col className="ml-auto" md="7" lg="5">
                  <div className="icon">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div className="card-description  mt-5">
                    <h4 className="text-custom">Admin In Charge</h4>
                    <p>
                      Admin Admins oversee the operational aspects of various
                      functions within the establishment, managing accounts and
                      ensuring seamless operations across departments.
                    </p>
                  </div>

                  <div className="icon">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="card-description">
                    <h4 className="text-custom">Resident In Charge</h4>
                    <p>
                      Their responsibility lies in contributing to the
                      community&#39;s well-being, adhering to guidelines, and
                      sharing their insights for continual improvement within
                      the residential environment. Residents rely on Admins to
                      address community concerns and maintain a conducive living
                      space.
                    </p>
                  </div>

                  <div className="icon">
                    <i className="bi bi-newspaper"></i>
                  </div>
                </Col>
                <Col className="mr-auto" md="5" lg="4">
                  <Form action="" method="" onSubmit={handleSubmit}>
                    <Card className="card-plain">
                      <div className="card-body">
                        <Form.Group>
                          <Form.Control
                            placeholder="Your Given Name"
                            required
                            type="text"
                            onChange={(e) => setGivenName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Your Middle Name (Optional)"
                            type="text"
                            onChange={(e) => setMiddleName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Your Last Name"
                            required
                            type="text"
                            onChange={(e) => setFamilyName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Enter email"
                            required
                            type="email"
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Password"
                            required
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                        {/*    <Form.Group>
                            <Form.Control
                              placeholder="Password Confirmation"
                              type="password"
                            />
                          </Form.Group> */}
                      </div>
                      <div className="card-footer text-center">
                        <Button
                          className="btn-fill btn-warning  btn-wd"
                          type="submit"
                          variant="default"
                        >
                          Create Resident
                        </Button>
                      </div>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer
              className="text-center bg-transparent d-flex justify-content-center align-items-center fs-bold"
              style={styles.textColor}
            >
              <BsChevronLeft size={18} />
              <Link to="/" style={styles.textColor}>
                <span style={styles.fonstSize}>Back to Landing Page</span>
              </Link>
            </Card.Footer>
          </Card>
        </Container>
      </div>
      <div
        className="full-page-background "
        style={{
          backgroundImage: `url(${fullScreenImage})`,
        }}
      ></div>
    </div>
  );
}

RegisterPage.propTypes = {
  setGivenName: PropTypes.func,
  setMiddleName: PropTypes.func,
  setFamilyName: PropTypes.func,
  setUserName: PropTypes.func,
  setPassword: PropTypes.func,
  setIsSubmit: PropTypes.func,
};

const styles = {
  textColor: {
    color: "#D7872D",
    textDecoration: "none",
    listStyle: "none",
  },

  fonstSize: {
    fontSize: "16px",
  },
  // Other styles as needed
};
export default RegisterPage;
