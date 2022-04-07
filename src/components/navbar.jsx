import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
import LoginForm from './authentication/login'
import RegisterForm from './authentication/register'

export default class NavbarComponent extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="light" variant="light">
                        <Container>
                            <Navbar.Brand as={Link} to="/">JobPortal</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>

                            </Nav>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Switch>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <Route path="/register">
                            <RegisterForm />
                        </Route>
                        <Route path="/">
                            <LoginForm />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
