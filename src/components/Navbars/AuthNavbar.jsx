/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { AiOutlineLogout } from "react-icons/ai";
import { MdAppRegistration } from "react-icons/md";

// react-bootstrap components
import { Navbar, Nav, Container } from "react-bootstrap";

function AuthNavbar({ firstName, lastName, middleName }) {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <div>
      <Navbar
        className="position-absolute w-100 mt-10 bg-dark fixed"
        expand="lg"
        variant={collapseOpen ? "white" : "transparent"}
      >
        <Container>
          <div className="navbar-wrapper">
            <Navbar.Brand href="#pablo" onClick={(e) => e.preventDefault()}>
              <span className="d-none d-md-block">
                Hello, {lastName}, {firstName} {middleName}
              </span>
              <span className="d-block d-md-none">LBDP React</span>
            </Navbar.Brand>
          </div>
          <button
            className="navbar-toggler navbar-toggler-right border-0"
            type="button"
            onClick={() => setCollapseOpen(!collapseOpen)}
          >
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </button>
          <Navbar.Collapse className="justify-content-end" in={collapseOpen}>
            <Nav navbar>
              <Nav.Item>
                <Nav.Link to="/resident-registration" as={Link}>
                  <MdAppRegistration className="mr-2" />
                  Register
                </Nav.Link>
              </Nav.Item>

              <Nav.Item
              // className={
              //   location.pathname === "/auth/lock-screen-page"
              //     ? "active mr-1"
              //     : "mr-1"
              // }
              >
                <Nav.Link as={Link} onClick={handleSignOut}>
                  <AiOutlineLogout className="mr-2" />
                  Sign out
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AuthNavbar;
