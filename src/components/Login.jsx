import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="/logo-black-2.png" alt="" />
        <GoogleButton onClick={signIn}>Sign in with Google</GoogleButton>
        <GithubButton>Sign in with Github</GithubButton>
        <TwitterButton>Sign in with Twitter</TwitterButton>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 80px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    margin-bottom: 30px;
    height: 130px;
  }
`;

const GoogleButton = styled(Button)`
  width: 80%;
  padding: 10px 20px;
  color: white;
  background-color: #0a8d48 !important;
  text-transform: inherit !important;
  margin-top: 15px;
`;
const GithubButton = styled(Button)`
  margin-top: 15px;
  width: 80%;
  padding: 10px 20px;
  color: white;
  background-color: #010409 !important;
  text-transform: inherit !important;
`;
const TwitterButton = styled(Button)`
  margin-top: 15px;
  width: 80%;
  padding: 10px 20px;
  color: white;
  background-color: #1C9AF0 !important;
  text-transform: inherit !important;
`;
