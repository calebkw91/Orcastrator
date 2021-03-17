import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PodDisplay from "./components/PodDisplay";
import Landing from "./pages/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./utils/UserContext";
import axios from "axios";
import LocalSignup from "./pages/LocalSignup/index";
import LocalLogin from "./pages/LocalLogin/index";
require("dotenv").config();

function App() {
  const [userState, setUserState] = useState({
    id: "",
    name: "",
    portrait: "",
    loggedIn: false,
  });

  useEffect(() => {
    axios
      .get("/User")
      .then((res) => {
        console.log(res);
        if (res.data.id !== undefined) {
          if (res.data.provider === "google") {
            console.log(res);
            setUserState({
              ...userState,
              id: res.data.id,
              name: res.data._json.name,
              portrait: res.data.photos[0].value,
              loggedIn: true,
            });
          } else if (res.data.provider === "github") {
            console.log(res);
            setUserState({
              ...userState,
              id: res.data.id,
              name: res.data._json.name,
              portrait: res.data._json.avatar_url,
              loggedIn: true,
            });
          }
        } else if (res.data._id !== undefined) {
          console.log(res);
          setUserState({
            ...userState,
            id: res.data._id,
            name: res.data.name,
            portrait: res.data.portrait,
            loggedIn: true,
          });
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }, []);

<<<<<<< HEAD
  const logout = () => {
    console.log("logging out");
    setUserState({
      ...userState,
      id: "",
      name: "",
      portrait: "",
      loggedIn: false,
    });
    window.open(
      process.env.LOGOUT_URL || "http://localhost:8080/logout",
      "_self"
=======
    return (
        <UserContext.Provider value={userState}>
            <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            {userState.loggedIn ? <Dashboard logout={logout} /> : <Landing />}
                        </Route>
                        <Route exact path="/signup">
                            <LocalSignup />
                        </Route>
                        <Route exact path="/login">
                            <LocalLogin />
                        </Route>
                        <Route exact path="/Pod/:id">
                            <PodDisplay />
                        </Route>
                        <Route path="*">
                            <Landing />
                        </Route>
                    </Switch>
            </BrowserRouter>
        </UserContext.Provider>
>>>>>>> dd084f6a10212d642604fa909df75a4a31d6e014
    );
  };

  return (
    <UserContext.Provider value={userState}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {userState.loggedIn ? <Dashboard logout={logout} /> : <Landing />}
          </Route>
          <Route exact path="/signup">
            <LocalSignup />
          </Route>
          <Route exact path="/login">
            <LocalLogin />
          </Route>
          <Route exact path="/Pod/:id">
            <PodDisplay />
          </Route>
          <Route path="*">
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
