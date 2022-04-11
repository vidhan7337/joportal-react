import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/">
              JobPortal
            </Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/login">
                <div className="navLabel">Login</div>
              </Link>
              <Link to="/register">
                <div className="navLabel">Register</div>
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
