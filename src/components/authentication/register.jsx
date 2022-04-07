import { useState, useEffect } from "react";


function RegisterForm() {

    const initialValues = { fullname: "", username: "", email: "", phone: "", password: "",userType:"Employer" };
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
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexName = /^[a-zA-Z]+$/;
        if (!values.fullname) {
            errors.fullname = "Fullname is required"
        }
        else if (!regexName.test(values.fullname)) {
            errors.fullname = "Fullname should only contain characters"
        }

        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regexEmail.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.phone) {
            errors.phone = "Phone number is required"
        }
        else if (values.phone.length !== 10) {
            errors.phone = "Please enter 10 digit phone number"
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be more than 6 characters";
        }
        return errors;
    };


    //ui for registration form
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <label>Fullname : </label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Fullname"
                            value={formValues.fullname}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.fullname}</p>
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
                        <label>Email : </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.email}</p>
                    <div className="field">
                        <label>Phone : </label>
                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone Number"
                            value={formValues.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.phone}</p>
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
                    <div className="field" onChange={radioChange}>
                        <label>
                            <input className="radio"
                                type="radio"
                                value="Employer"
                                name="userType"
                                checked={formValues.userType==="Employer"}
                            ></input>Employer</label>
                        <label>
                            <input className="radio"
                                type="radio"
                                value="JobSeeker"
                                name="userType"
                                checked={formValues.userType==="JobSeeker"}
                            ></input>JobSeeker</label>
                    </div>


                    <button className="fluid ui button blue">Submit</button>
                </div>
            </form>
        </div>
    );

}

export default RegisterForm;