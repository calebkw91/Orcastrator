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
import API from "./utils/API";
import Invites from "./pages/Invites/index"
require("dotenv").config();

function App() {
    const [userState, setUserState] = useState({
        id: "",
        name: "",
        portrait: "",
        invites: [],
        loggedIn: false,
    });

    useEffect(() => {
        axios
            .get("/User")
            .then((res) => {
                console.log("first res", res);
                console.log(res.data.id);
                if (res.data.id) {
                    API.getUserByUserId(res.data.id)
                        .then(res => {
                            setUserState({
                                ...userState,
                                id: res.data._id,
                                name: res.data.name,
                                portrait: res.data.portrait,
                                invites: res.data.invites,
                                loggedIn: true,
                            });
                        });
                } else if (res.data._id) {
                    API.getUser(res.data._id)
                        .then(res => {
                            console.log(res);
                            setUserState({
                                ...userState,
                                id: res.data._id,
                                name: res.data.name,
                                portrait: res.data.portrait,
                                invites: res.data.invites,
                                loggedIn: true,
                            });
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
            invites: "",
            loggedIn: false
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
                        {userState.loggedIn ? <Dashboard logout={logout} UserContext={userState} /> : <Landing />}
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
                    <Route exact path="/invites">
                        {userState.loggedIn ? <Invites logout={logout} /> : <Landing />}
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