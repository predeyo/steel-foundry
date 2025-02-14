import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component.jsx";
import CustomButton from "../custom-button/custom-button.component.jsx";

import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/user.actions.js";

import "./sign-in.styles.scss";

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    console.log(email, password);
    event.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sing in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          value={email}
          name="email"
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          value={password}
          name="password"
          handleChange={handleChange}
          required
          label="password"
        />
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            {" "}
            Sign in with Google{" "}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
