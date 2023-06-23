import styled from "@emotion/styled";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { db } from "../firebase";
import {
  collection,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useEffect, useRef } from "react";

const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(roomId && doc(db, "rooms", roomId));
  const [roomMessages, loading] = useCollection(
    roomId &&
      query(
        collection(doc(db, "rooms", roomId), "messages"),
        orderBy("timeStamp")
      )
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <ChatHeader>
            <ChatHeaderLeft>
              <h4>
                <strong>#{roomDetails?.data()?.name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </ChatHeaderRight>
          </ChatHeader>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timeStamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timeStamp={timeStamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            channelId={roomId}
            channelName={roomDetails?.data().name}
            chatRef={chatRef}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 60px;
`;
const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  .MuiSvgIcon-root {
    margin-left: 10px;
  }
`;
const ChatHeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 4px;
    font-size: 16px;
  }
`;
const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 100px;
`;
