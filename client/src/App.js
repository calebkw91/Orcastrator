import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import UserHomepage from "./components/UserHomepage";
import PodDisplay from "./components/PodDisplay";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav/>
          <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/User">
                <UserHomepage />
              </Route>
              <Route exact path="/Pod/:id">
                <PodDisplay />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
