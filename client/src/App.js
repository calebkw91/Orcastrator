import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserHomepage from "./components/UserHomepage";
import PodDisplay from "./components/PodDisplay";
import Landing from "./components/Landing";
import Login from "./components/Login/login"
import UserContext from "./utils/userContext";
import axios from "axios";

function App() {

  const [userState, setUserState] = useState({
    id: "",
    name: "",
    portrait: ""
  });

  console.log(userState);
  useEffect(() => {
    settingUser();
  }, []);

  const settingUser = () => {
    axios.get("/User")
      .then((res) => {
        if (res.data.id !== undefined) {
          if (res.data.provider === "google"){
          console.log(res);
          setUserState({
            ...userState,
            id: res.data.id,
            name: res.data._json.name,
            portrait: res.data.photos[0].value
          })
        }
        else if(res.data.provider === "github"){
          console.log(res);
          setUserState({
            ...userState,
            id: res.data.id,
            name: res.data._json.name,
            portrait: res.data._json.avatar_url
          })
        }
        }
        else {
          setUserState({
            ...userState,
            id: "Not Logged In",
            name: "Not Logged In",
            portrait: "Not Logged In"
          })
        }})
      .catch(err => console.log(err));
  };

  return (
    <UserContext.Provider value={userState}>
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
              <UserHomepage setUser={settingUser}/>
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
}

export default App;
