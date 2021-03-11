import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserHomepage from "./components/UserHomepage";
import PodDisplay from "./components/PodDisplay";
import Landing from "./components/Landing";
import Login from "./components/Login/login";
import axios from "axios";
import { UserProvider, useUserContext } from "./utils/GlobalUserState";

function App() {
  const [state, dispatch] = useUserContext;

  useEffect(() => {
    axios.get(window.location + "/User").then((res) => {
      if (res.data.id !== undefined) {
        dispatch({
          type: "add",
          id: res.data.id,
          firstName: res.data.name.givenName,
          lastName: res.data.name.familyName,
          email: res.data.email,
          portrait: res.data.photos[0],
        })
          .then(() => {
            if (state.id !== "") {
              window.open(window.location + "/User", "_self");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
  if (state.id === "") {
    return <Login />;
  }
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/User">
            <UserHomepage />
          </Route>
          <Route exact path="/Pod/:id">
            <PodDisplay />
          </Route>
          <Route path="*">
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
