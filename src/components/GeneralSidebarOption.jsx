import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { setIsSidebar, setRoomId, setRoomType } from "../features/appSlice";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";

const GeneralSidebarOption = ({ Icon, title, id }) => {
  const dispatch = useDispatch();

  const selectChannel = () => {
    if (id) {
      dispatch(setRoomId(id));
      dispatch(setRoomType('generalRooms'))
      dispatch(setIsSidebar(false))
    }
  };

  return (
    <SidebarOptionContainer
      onClick={selectChannel}
    >
      <SidebarOptionImageContainer>
        {Icon === 'InsertCommentIcon' && <InsertCommentIcon fontSize="small" />}
        {Icon === 'InboxIcon' && <InboxIcon fontSize="small" />}
        {Icon === 'PeopleAltIcon' && <PeopleAltIcon fontSize="small" />}
        {Icon === 'AppsIcon' && <AppsIcon fontSize="small" />}
      </SidebarOptionImageContainer>
      <h3>{title}</h3>
    </SidebarOptionContainer>
  );
};

export default GeneralSidebarOption;

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
