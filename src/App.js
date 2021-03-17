import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import Chat from "./Chat";
import { auth } from "./firebase";
//import {  } from 'react-firebase-hooks'
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import styled from "styled-components";
import Spinner from "react-spinkit";
function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt="slack"
        />
        <AppLoadingContent>
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContent>
      </AppLoading>
    );
  }
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <SideNav />
            <Switch>
              <Route exact path="/">
                <Chat />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
const AppLoading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin: 20px 0;
  }
`;
const AppLoadingContent = styled.div``;
