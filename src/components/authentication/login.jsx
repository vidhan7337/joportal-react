import { useState, useEffect } from "react";


function LoginForm() {

    const initialValues = {  username: "",password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    //field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    //radio button change
    const radioChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    //validating form
    const validate = (values) => {
        const errors = {};
       
        if (!values.username) {
            errors.username = "Username is required!";
        }
        
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be more than 6 characters";
        }
        return errors;
    };


    //ui for login form
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                   
                    <div className="field">
                        <label>Username : </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.username}</p>
                   
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
    );

}

export default LoginForm;