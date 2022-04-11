import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../utils/loader";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";

function LoginForm() {
  const initialValues = { userName: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  //field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // setFormErrors(validate(formValues));
  };

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      setLoading(true);
      axios
        .post("https://localhost:44361/gateway/login", formValues)
        .then((response) => {
          setLoading(false);
          console.log(response);
          window.localStorage.setItem("email", response.data.email);
          window.localStorage.setItem("id", response.data.id);
          window.localStorage.setItem("userName", response.data.userName);
          window.localStorage.setItem("usertype", response.data.userType);
          window.localStorage.setItem("token", response.data.tokenString);
          window.localStorage.setItem("fullName", response.data.fullName);
          window.localStorage.setItem("phone", response.data.phone);
          navigate("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          alert("Invalid username or password");
        });
    }
  }, [formErrors]);

  //validating form
  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  };

  //ui for login form
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Username : </label>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formValues.userName}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.userName}</p>

            <div className="field">
              <label>Password : </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>

            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
