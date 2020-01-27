import React from "react";

import "./sign-in-and-sign-up.styles.scss";

import SignIn from "../../components/sing-in/sign-in.component.jsx";
import SignUp from "../../components/sign-up/sign-up.component.jsx";

const SignInAndSignUpPage = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignUpPage;
