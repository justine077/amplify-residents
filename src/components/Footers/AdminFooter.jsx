/* eslint-disable no-unused-vars */
import React from "react";

// react-bootstrap components
import { Container } from "react-bootstrap";

function AdminFooter() {
  return (
    <>
      <footer className="footer">
        <Container fluid className="pl-4 ml-2">
          <nav>
            <p className="copyright text-center">
              © <script>document.write(new Date().getFullYear())</script>
              <a href="http://www.creative-tim.com">Creative Tim</a>, made with
              love for a better web
            </p>
          </nav>
        </Container>
      </footer>
    </>
  );
}

export default AdminFooter;
