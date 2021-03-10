import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserHomepage from "./components/UserHomepage";
import PodDisplay from "./components/PodDisplay";
<<<<<<< HEAD
import Landing from "./pages/Landing";
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import Landing from "./components/Landing";
import Login from "./components/Login/login"
>>>>>>> fc77fdd93ae2cefd5b12f044967d846115c38c2c

function App() {
  return (
    <BrowserRouter>
      <div>
<<<<<<< HEAD
          <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/User/:userID">
                <UserHomepage />
              </Route>
              <Route exact path="/Pod/:PodID">
                <PodDisplay />
              </Route>
              <Route path="*">
                <Landing />
              </Route>
          </Switch>
        </div>
=======
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
>>>>>>> fc77fdd93ae2cefd5b12f044967d846115c38c2c
    </BrowserRouter>
  );
}

export default App;
