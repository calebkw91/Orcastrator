import {React, useContext } from "react";
import UserContext from "../../utils/UserContext";
import Navbar from "react-bootstrap/Navbar";
import "./style.css"


function UserInfo(props) {
    const { id, name, portrait } = useContext(UserContext);
    const inviteRedirect = () => {
      window.location.assign("/invites");
    }
    
    console.log(" id ",id," name ",name," portrait ",portrait);


    return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src={portrait}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            {name}
            <button className="inviteBtn" onClick={inviteRedirect}><i class="fas fa-envelope-open-text"></i></button>
          </Navbar.Brand>
        </Navbar>
    );
};


export default UserInfo;