import styled from "@emotion/styled";
import React from "react";
import { db } from "../firebase";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setRoomId, setRoomType, setIsSidebar } from "../features/appSlice";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();

  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      try {
        const currentDocs = await getDocs(query(collection(db, "rooms"), where("name", "==", channelName)))
        if(currentDocs.docs.length === 1) return alert("Room Already Exists")
        await addDoc(collection(db, "rooms"), {
          name: channelName,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const selectChannel = () => {
    if (id) {
        dispatch(setRoomId(id))
        dispatch(setRoomType('rooms'))
        dispatch(setIsSidebar(false))
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      <SidebarOptionImageContainer>
        {Icon && <Icon fontSize="small" />}
      </SidebarOptionImageContainer>
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  padding-left: 2px;
  align-items: center;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }
`;
const SidebarOptionImageContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
  color: white;

  > span {
    padding-right: 10px;
  }
`;
