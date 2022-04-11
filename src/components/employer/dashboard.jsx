import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class DashboardComponent extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/">
              JobPortal
            </Navbar.Brand>
            <Nav className="me-auto">
              <Link to="">
                <div className="navLabel">Profile</div>
              </Link>
              <Link to="">
                <div className="navLabel">Add Vacancy</div>
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
