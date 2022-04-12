import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../utils/loader";
import { useNavigate } from "react-router-dom";

import EmployerDashboard from "../employer/dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function ChangePasswordForm() {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
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
        .get(
          "https://localhost:44361/gateway/getpassword/" +
            window.localStorage.getItem("id")
        )
        .then((response) => {
          console.log(response);
          setLoading(false);
          if (formValues.oldPassword != response.data) {
            toast("Old Password is wrong");
          } else {
            const user = {
              fullName: window.localStorage.getItem("fullName"),
              userName: window.localStorage.getItem("userName"),
              password: formValues.newPassword,
              email: window.localStorage.getItem("email"),
              phone: window.localStorage.getItem("phone"),
              userType: window.localStorage.getItem("usertype"),
            };

            const body = JSON.stringify(user);
            console.log(body);
            axios
              .put(
                "https://localhost:44361/gateway/changepassword/" +
                  window.localStorage.getItem("id"),
                body,
                { headers: { "Content-Type": "application/json" } }
              )
              .then((response) => {
                toast("Password Successfully changed");
                navigate("/dashboard");
                console.log(response);
              })
              .catch((errors) => {
                toast("Something went wrong");
                console.log(errors);
              });
          }
        });
    }
  }, [formErrors]);

  //validating form
  const validate = (values) => {
    const errors = {};

    if (!values.oldPassword) {
      errors.oldPassword = "Password is required";
    }
    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password must be more than 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required";
    } else if (values.confirmPassword.length < 6) {
      errors.confirmPassword = "Password must be more than 6 characters";
    } else if (values.confirmPassword != values.newPassword) {
      errors.confirmPassword = "Password not matching to new password";
    }
    return errors;
  };

  //ui for login form
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <EmployerDashboard />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Change Password</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Old Password : </label>
              <input
                type="password"
                name="oldPassword"
                placeholder=" Old Password"
                value={formValues.oldPassword}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.oldPassword}</p>
            <div className="field">
              <label>New Password : </label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formValues.newPassword}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.newPassword}</p>
            <div className="field">
              <label>Confirm Password : </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.confirmPassword}</p>

            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
