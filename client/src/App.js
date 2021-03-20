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
<<<<<<< HEAD
import LocalLogin from "./pages/LocalLogin/index"
import socketConnection from "./utils/SocketConnection";
=======
import LocalLogin from "./pages/LocalLogin/index";
import API from "./utils/API";
>>>>>>> 52b83c1ed26e9b63311972282f0a3051d89f2e69
require("dotenv").config();

function App() {
  const [userState, setUserState] = useState({
    id: "",
    name: "",
    portrait: "",
    loggedIn: false,
  });

<<<<<<< HEAD
    console.log(userState.loggedIn);
    useEffect(() => {
        axios.get("/User")
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
                            loggedIn: true
                        });
                    } else if (res.data.provider === "github") {
                        console.log(res);
                        setUserState({
                            ...userState,
                            id: res.data.id,
                            name: res.data._json.name,
                            portrait: res.data._json.avatar_url,
                            loggedIn: true
                        });
                    }
                }
                else if (res.data._id !== undefined) {
=======
  useEffect(() => {
    axios
      .get("/User")
      .then((res) => {
        console.log(res);
        console.log(res.data.id);
        if (res.data.id) {
            API.getUserByUserId(res.data.id)
                .then(res => {
>>>>>>> 52b83c1ed26e9b63311972282f0a3051d89f2e69
                    console.log(res);
                    setUserState({
                        ...userState,
                        id: res.data._id,
                        name: res.data.name,
                        portrait: res.data.portrait,
<<<<<<< HEAD
                        loggedIn: true
                    });
                }
                else {
                    return;
                }
            })
            .catch(err => console.log(err));
    }, []);

    const logout = () => {
        console.log("logging out");
        setUserState({
            ...userState,
            id: "",
            name: "",
            portrait: "",
            loggedIn: false
        });
        window.open(process.env.LOGOUT_URL || "http://localhost:8080/logout", "_self");
    };

    return (
        <UserContext.Provider value={userState}>
            <BrowserRouter>
                <div>
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
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
=======
                        loggedIn: true,
                      });
                });
        } else if (res.data._id) {
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
>>>>>>> 52b83c1ed26e9b63311972282f0a3051d89f2e69
}

export default App;
