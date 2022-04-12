import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class DashboardComponent extends Component {
  render() {
    return (
      
        <ul>
          <li>
            <Link to="/dashboard">Job Portal</Link>
          </li>
          <li>
            <Link to="">Profile</Link>
          </li>
          <li>
            <Link to="">Add Vacancy</Link>
          </li>
          <li>
            <Link style={{float:"right"  }} to="/changepassword">
              Change Password
            </Link>
          </li>
          <li>
            <Link style={{float:"right"  }} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      
    );
  }
}
