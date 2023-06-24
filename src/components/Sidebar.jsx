import styled from "@emotion/styled";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarOption from "./SidebarOption";
import GeneralSidebarOption from "./GeneralSidebarOption";
import { auth, db } from "../firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { selectIsSidebar } from "../features/appSlice";

const Sidebar = () => {
  const [channels] = useCollection(
    query(collection(db, "rooms"), orderBy("name"))
  );
  const isSidebar = useSelector(selectIsSidebar)
  const [generalChannels] = useCollection(collection(db, "generalRooms"));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer isSidebar={isSidebar}>
      <SidebarHeader>
        <SidebarInfo>
          <h2>OTAKU CHAT</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <SidebarHeaderRight>
          <CreateIcon />
        </SidebarHeaderRight>
      </SidebarHeader>
      {generalChannels?.docs.map((doc) => (
        <GeneralSidebarOption
          key={doc.id}
          id={doc.id}
          Icon={doc.data().Icon}
          title={doc.data().name}
        />
      ))}
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  max-width: 300px;
  margin-top: 60px;
  border-top: 1px solid #49274b;
  overflow-y: auto;
  transition: all ease-in-out 0.5s;

  @media (max-width: 900px) {
    color: white;
    background-color: var(--slack-color);
    flex: 0.4;
    max-width: 300px;
    margin-top: 60px;
    border-top: 1px solid #49274b;
    overflow-y: auto;
  }

  @media (max-width: 750px) {
    color: white;
    background-color: var(--slack-color);
    width: 250px;
    margin-top: 60px;
    border-top: 1px solid #49274b;
    overflow-y: auto;
    position: absolute;
    left: ${props => (props.isSidebar ? '0px' : '-500px')};
    top: 0;
    bottom: 0;
    z-index: 200;
  }

  > hr {
    margin: 10px 0px;
    border: 1px solid #49274b;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
`;
const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 16px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    color: green;
    margin-right: 2px;
  }
`;
const SidebarHeaderRight = styled.div`
  padding: 8px;
  color: #49274b;
  background-color: white;
  height: 100%;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > .MuiSvgIcon-root {
    font-size: 18px;
  }
`;
