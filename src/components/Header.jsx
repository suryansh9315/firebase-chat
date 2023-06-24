import { Avatar } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from '@mui/icons-material/Search'
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSidebar, setIsSidebar } from "../features/appSlice";

const Header = () => {
  const [user] = useAuthState(auth)
  const isSidebar = useSelector(selectIsSidebar)
  const dispatch = useDispatch()

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar src={user?.photoURL} alt={user?.displayName} onClick={() => auth.signOut()} />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search chat" />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
        <MenuOpenIconContainer onClick={() => dispatch(setIsSidebar(!isSidebar))} />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`
const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }

  @media (max-width: 750px) {
    > .MuiSvgIcon-root {
      display: none;
    }
  }
`
const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  text-align: center;
  border-radius: 6px;
  background-color: #421f44;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  @media (max-width: 750px) {
    display: none;
  }

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
  }
`
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;

  > .MuiSvgIcon-root {
    /* margin-left: auto; */
    /* margin-right: 20px; */
  }
`
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover{
    opacity: 0.8;
  }
`
const MenuOpenIconContainer = styled(MenuOpenIcon)`
  display: none;
  font-size: 30px;

  @media (max-width: 750px) {
    display: block;
  }
`