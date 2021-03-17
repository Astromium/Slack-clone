import React from "react";
import styled from "styled-components";
import CreateIcon from "@material-ui/icons/Create";
import ListItem from "./ListItem";
import CommentIcon from "@material-ui/icons/Comment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AddIcon from "@material-ui/icons/Add";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { auth, db } from "./firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "./features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";

const listItems = [
  {
    Icon: CommentIcon,
    title: "Threads",
  },
  {
    Icon: InboxIcon,
    title: "Mentions & Reactions",
  },
  {
    Icon: DraftsIcon,
    title: "Saved Items",
  },
  {
    Icon: PeopleAltIcon,
    title: "Channel Browser",
  },
  {
    Icon: BookmarkBorderIcon,
    title: "People & User groups",
  },
  {
    Icon: AppsIcon,
    title: "Apps",
  },
  {
    Icon: FileCopyIcon,
    title: "File Browser",
  },
  {
    Icon: KeyboardArrowUpIcon,
    title: "Show Less",
  },
];

// const channels = [
//   {
//     Icon: LabelImportantIcon,
//     title: "general",
//   },
//   {
//     Icon: LabelImportantIcon,
//     title: "developpement",
//   },
//   {
//     Icon: LabelImportantIcon,
//     title: "random",
//   },
// ];

const addChannel = () => {
  const name = window.prompt("Enter channel name");
  if (name) {
    db.collection("channels").add({
      name,
    });
  }
};

function SideNav() {
  const [channels, loading, err] = useCollection(db.collection("channels"));
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const selectChannel = (id) => {
    dispatch(
      enterRoom({
        roomId: id,
      })
    );
  };
  return (
    <SideNavContainer>
      <SideNavHeader>
        <HeaderRight>
          <h3>Club Scientifique de l'ESI</h3>
          <p>{user?.displayName}</p>
        </HeaderRight>
        <CreateIcon />
      </SideNavHeader>
      <SideNavList>
        {listItems.map((item, i) => {
          return (
            <ListItem key={i} Icon={item.Icon} title={item.title}></ListItem>
          );
        })}
      </SideNavList>
      <Seperator>
        <ListItem Icon={KeyboardArrowDownIcon} title="Channels"></ListItem>
      </Seperator>
      <SideNavList>
        <ListItem
          Icon={AddIcon}
          onClick={addChannel}
          title="Add Channel"
        ></ListItem>
        {channels?.docs.map((doc, i) => {
          return (
            <ListItem
              onClick={() => selectChannel(channels?.docs[i].id)}
              key={i}
              title={doc.data().name}
            ></ListItem>
          );
        })}
      </SideNavList>
    </SideNavContainer>
  );
}

export default SideNav;

const SideNavContainer = styled.div`
  position: fixed;
  left: 0;
  top: 8vh;
  width: 20%;
  background: var(--slack-color);
  height: 90vh;
  padding: 10px 0;
  border-top: 1px gray solid;
`;

const SideNavHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 10px;
  border-bottom: 1px gray solid;

  > .MuiSvgIcon-root {
    color: var(--slack-color);
    background: #fff;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const HeaderRight = styled.div`
  color: #fff;
  > h3 {
  }
  > p {
    font-size: 15px;
    margin-top: 5px;
    position: relative;
    padding-left: 15px;
    font-weight: 400;
  }
  > p::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: green;
  }
`;

const SideNavList = styled.div`
  padding: 0.3rem 10px;
`;

const Seperator = styled.div`
  padding: 0.3rem 10px;
  border-bottom: 1px gray solid;
  border-top: 1px gray solid;
`;
