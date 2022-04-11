import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import EmployerDashboard from "./components/employer/dashboard";

import LoginForm from "./components/authentication/login";
import RegisterForm from "./components/authentication/register";
import ChangePasswordForm from "./components/authentication/changePassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<EmployerDashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/changepassword" element={<ChangePasswordForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
