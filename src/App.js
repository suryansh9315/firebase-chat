import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import styled from "@emotion/styled";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
          <Spinner name="pacman" color="purple" fadeIn="none" />
        </AppLoadingContainer>
      </AppLoading>
    );
  }

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <Container>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
            </Routes>
          </Container>
        </>
      )}
    </div>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 50px;
`;
