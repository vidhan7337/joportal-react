import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";


export default class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Job Portal</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    );
  }
}
