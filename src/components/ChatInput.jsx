import styled from "@emotion/styled";
import React, { useRef } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelId, channelName, chatRef, chatType }) => {
  const inputRef = useRef();
  const [user] = useAuthState(auth)

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) return;
    if (!inputRef.current.value) return;
    try {
      const roomRef = doc(db, chatType, channelId);
      const messagesRef = collection(roomRef, "messages");
      await addDoc(messagesRef, {
        message: inputRef.current.value,
        timeStamp: serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL
      });
      chatRef?.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current.value = ''
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <ChatinputContainer>
      <form>
        <input ref={inputRef} placeholder={`Message ${channelName}`} />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatinputContainer>
  );
};

export default ChatInput;

const ChatinputContainer = styled.div`
  border-radius: 20px;

  > form {
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    border-radius: 3px;
    width: 65%;
    padding: 20px;
    outline: none;
    border: 1px solid gray;
  }

  > form > button {
    display: none;
  }
`;
