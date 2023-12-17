/* eslint-disable react/prop-types */
// import ProfilePicturec from "../../assets/img/default-avatar.png";
import BackgroundImage1 from "../../assets/img/full-screen-image-3.jpg";
import BackgroundImage2 from "../../assets/img/bg5.jpg";
import { Form } from "@formio/react"; // import {Form } from 'react-bootstrap'

// react-bootstrap components
import {
  Button,
  Card,
  Form as BoostrapForm,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { updateUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

function UserPage({ firstName, middleName, lastName, email }) {
  const [initialFirstName, setInitialFirstName] = useState("");
  const [initialMiddleName, setInitialMiddleName] = useState("");
  const [initialLastName, setInitialLastName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedMiddleName, setUpdatedMiddleName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    // Retrieve values from local storage on component mount
    const storedFirstName = localStorage.getItem("firstName") || firstName;
    const storedMiddleName = localStorage.getItem("middleName") || middleName;
    const storedLastName = localStorage.getItem("lastName") || lastName;
    const storedEmail = localStorage.getItem("email") || email;

    setInitialFirstName(storedFirstName);
    setInitialMiddleName(storedMiddleName);
    setInitialLastName(storedLastName);
    setInitialEmail(storedEmail);

    setUpdatedFirstName(storedFirstName);
    setUpdatedMiddleName(storedMiddleName);
    setUpdatedLastName(storedLastName);
    setUpdatedEmail(storedEmail);
  }, [firstName, middleName, lastName, email]);
  // Update local storage when the values change
  useEffect(() => {
    localStorage.setItem("firstName", updatedFirstName);
    localStorage.setItem("middleName", updatedMiddleName);
    localStorage.setItem("lastName", updatedLastName);
    localStorage.setItem("email", updatedEmail);
  }, [updatedFirstName, updatedMiddleName, updatedLastName, updatedEmail]);

  // Update initial state when props change
  useEffect(() => {
    setInitialFirstName(firstName);
    setInitialMiddleName(middleName);
    setInitialLastName(lastName);
    setInitialEmail(email);
  }, [firstName, middleName, lastName, email]);

  const handleUpdateProfile = async () => {
    const attributesToUpdate = {};

    if (updatedEmail !== initialEmail) {
      attributesToUpdate.email = updatedEmail;
    }
    if (updatedFirstName !== initialFirstName) {
      attributesToUpdate.given_name = updatedFirstName;
    }
    if (updatedMiddleName !== initialMiddleName) {
      attributesToUpdate.middle_name = updatedMiddleName;
    }
    if (updatedLastName !== initialLastName) {
      attributesToUpdate.family_name = updatedLastName;
    }

    // Use the updated values to reflect changes in the form fields
    setInitialFirstName(updatedFirstName);
    setInitialMiddleName(updatedMiddleName);
    setInitialLastName(updatedLastName);
    setInitialEmail(updatedEmail);

    if (Object.keys(attributesToUpdate).length === 0) {
      console.log("No changes detected.");
      return;
    }

    try {
      const updatedAttributes = await updateUserAttributes({
        userAttributes: attributesToUpdate,
      });

      console.log("Attributes updated successfully:", updatedAttributes);
    } catch (error) {
      console.error("Error updating attributes:", error);
    }
  };

  const handleFirstNameChange = (e) => {
    setUpdatedFirstName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setUpdatedMiddleName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setUpdatedLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUpdatedEmail(e.target.value);
  };

  // Function to handle form submission
  const onSubmit = (submission) => {
    // Handle form submission here, including the uploaded image data
    console.log("Form submission:", submission);
  };

  return (
    <div className="mt-5 pt-5">
      <Container fluid>
        <div className="section-image" data-image={BackgroundImage2}>
          <Container>
            <Row>
              <Col md="8" sm="6">
                <BoostrapForm action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">Edit Profile</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="12">
                          <BoostrapForm.Group>
                            <label>First Name</label>
                            <BoostrapForm.Control
                              value={updatedFirstName}
                              onChange={handleFirstNameChange}
                              placeholder="Enter First Name"
                              required
                              type="text"
                            ></BoostrapForm.Control>
                          </BoostrapForm.Group>
                        </Col>
                        <Col className="pr-1" md="12">
                          <BoostrapForm.Group>
                            <label>Middle Name</label>
                            <BoostrapForm.Control
                              value={updatedMiddleName}
                              onChange={handleMiddleNameChange}
                              placeholder="Enter Middle Name"
                              type="text"
                              required
                            ></BoostrapForm.Control>
                          </BoostrapForm.Group>
                        </Col>
                        <Col className="pr-1" md="12">
                          <BoostrapForm.Group>
                            <label>Last Name</label>
                            <BoostrapForm.Control
                              value={updatedLastName}
                              onChange={handleLastNameChange}
                              placeholder="Enter Last Name"
                              type="text"
                              required
                            ></BoostrapForm.Control>
                          </BoostrapForm.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="12">
                          <BoostrapForm.Group>
                            <label>Email Address</label>
                            <BoostrapForm.Control
                              value={updatedEmail}
                              onChange={handleEmailChange}
                              placeholder="Enter Email Address"
                              type="email"
                              required
                            ></BoostrapForm.Control>
                          </BoostrapForm.Group>
                        </Col>
                      </Row>

                      <Button
                        className="btn-fill pull-right"
                        onClick={handleUpdateProfile}
                        variant="info"
                      >
                        Update Profile
                      </Button>
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </BoostrapForm>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                      <img alt="..." src={BackgroundImage1}></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="author mt-5">
                      <div

                      // onClick={(e) => e.preventDefault()}
                      // className="bg-black"
                      >
                        <Form
                          src="https://bhexakipcmeeosf.form.io/residentbucket"
                          onSubmit={onSubmit}
                          // alt="..."
                          className="avatar border-gray text-center flex justify-center items-center h-24 w-24 rounded-full mx-auto bg-transparent"
                          // src={ProfilePicturec}
                        />
                      </div>
                      <Card.Title as="h5">{`${updatedFirstName} ${updatedMiddleName} ${updatedLastName}`}</Card.Title>
                      <p className="card-description">{email}</p>
                    </div>
                    <p className="card-description text-center">
                      Hey there! As you can see, <br></br>
                      it is already looking great.
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="button-container text-center">
                      <Button className="btn-simple btn-icon" variant="link">
                        <i className="fab fa-facebook-square"></i>
                      </Button>
                      <Button className="btn-simple btn-icon" variant="link">
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button className="btn-simple btn-icon" variant="link">
                        <i className="fab fa-google-plus-square"></i>
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default UserPage;
