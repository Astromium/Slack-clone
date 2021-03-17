import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Header() {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar
          //todo : Add onClick
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => auth.signOut()}
        />
        <ScheduleIcon />
      </HeaderLeft>

      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search Workspace" />
      </HeaderSearch>

      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  color: #fff;
  width: 100%;
  background: var(--slack-color);
  padding: 15px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 4vh;
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.3;
  align-items: center;

  > .MuiSvgIcon-root {
    margin-right: 50px;
    cursor: pointer;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  transition: opacity 0.2s ease;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0.4;
  background-color: #421f44;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  color: gray;
  border: 1px solid gray;
  > input {
    flex: 1;
    background: transparent;
    border: none;
    color: #fff;
    outline: none;

    ::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  > .MuiSvgIcon-root {
    margin-right: 20px;
    cursor: pointer;
  }
`;

const HeaderRight = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  flex: 0.3;
  justify-content: flex-end;
  > .MuiSvgIcon-root {
    margin-right: 30px;
    cursor: pointer;
  }
`;
