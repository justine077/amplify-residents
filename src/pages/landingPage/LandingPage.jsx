import { Link } from "react-router-dom";
import fullScreenImage from "../../assets/img/bg6.jpg";
//import PropTypes from "prop-types";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function Landing() {
  return (
    <div
      className="full-page register-page section-image"
      data-color="orange"
      data-image={fullScreenImage}
    >
      <div className="content d-flex align-items-center">
        <Container>
          <Card className="card-register card-plain text-center py-2">
            <Card.Header className="bg-primary">
              <Row className="justify-content-center card-custom-bg">
                <Col md="8">
                  <div className="text-white py-3 mt-3">
                    <Card.Title as="h1" className="fw-bolder text-white">
                      WELCOME TO
                    </Card.Title>
                    <Card.Subtitle as="h1" className="text-white">
                      Residential Management System
                    </Card.Subtitle>
                    <hr />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="mb-6 custom-margin  ">
              <Col className="mr-auto" md="12" lg="12">
                <Form action="" className="custom-margin">
                  <Card className="card-plain">
                    <Link
                      to="/admin-login"
                      className="card-footer text-center mt-3 mb-3 btn-custom "
                    >
                      <Button
                        className="btn-fill btn-warning  btn-wd btn-fonts "
                        type="submit"
                        variant="default"
                      >
                        Login as Admin
                      </Button>
                    </Link>
                    <Link
                      to="/resident-login"
                      className="card-footer text-center mb-3 btn-custom "
                    >
                      <Button
                        className="btn-fill btn-warning  btn-wd btn-fonts"
                        type="submit"
                        variant="default"
                      >
                        Login as Resident
                      </Button>
                    </Link>
                    <Link
                      to="/register-page"
                      className="card-footer text-center mb-3 btn-custom "
                    >
                      <Button
                        className="btn-fill btn-warning  btn-wd btn-fonts "
                        type="submit"
                        variant="default"
                      >
                        Register as Resident
                      </Button>
                    </Link>
                  </Card>
                </Form>
              </Col>
            </Card.Body>
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

export default Landing;
