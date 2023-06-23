import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider).catch((err) => {
        alert(err.message)
    })
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://easydrawingguides.com/wp-content/uploads/2023/03/how-to-draw-tanjiro-kamado-from-demon-slayer-featured-image-1200.png"
          alt=""
        />
        <h1>Sign in to the Chat App</h1>
        <p>surya.chat.com</p>
        <Button onClick={signIn}>
          Sign in with Google
        </Button>
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
  padding: 80px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    margin-bottom: 30px;
    height: 150px;
  }

  > button {
    margin-top: 30px;
    padding: 10px 20px;
    color: white;
    background-color: #0a8d48 !important;
    text-transform: inherit !important;
  }
`;
