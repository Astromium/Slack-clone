import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "./features/appSlice";
import { Button } from "@material-ui/core";
import { auth, db } from "./firebase";
import firebase from "firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat() {
  const [user] = useAuthState(auth);
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("channels").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("channels")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    if (!roomId) {
      return false;
    }
    db.collection("channels").doc(roomId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    setInput("");
  };

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomMessages, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <InfoOutlinedIcon />
              <p>Details</p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc, i) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={i}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInputContainer>
            <form>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder={`Message #${roomDetails?.data().name}`}
              />
              <Button hidden type="submit" onClick={sendMessage}>
                SEND
              </Button>
            </form>
          </ChatInputContainer>
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  margin-left: 20%;
  margin-top: 8vh;
  width: 80%;
  height: 90vh;
  position: relative;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px lightgray solid;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    margin-right: 5px;
    text-transform: lowercase;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  > p {
    margin-left: 5px;
  }
`;

const ChatMessages = styled.div``;

const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 5%;
  width: 60%;
  left: 60%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  > form {
    width: 100%;
    display: flex;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    > input {
      width: 80%;
      flex: 1;
      padding: 1rem;
      border: none;
      outline: none;
    }

    > Button {
      display: none !important;
    }

    ::placeholder {
      color: var(--slack-color);
    }
  }
`;
