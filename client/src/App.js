import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserHomepage from "./components/UserHomepage";
import PodDisplay from "./components/PodDisplay";
import Landing from "./components/Landing";
import Login from "./components/Login/login"
import UserContext from "./utils/userContext";

function App() {

  return (
    <BrowserRouter>
      <div>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
