import {React, useContext, useEffect } from "react";
import UserContext from "../../utils/UserContext";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./style.css"

function UserInfo(props) {
    const { name, portrait, invites } = useContext(UserContext);

    const inviteRedirect = () => {
      window.location.assign("/invites");
    };
    useEffect(() => {
      if(invites.length > 0){
        document.getElementById("envelope").classList.add("gotInvites")
      }
    })

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
          </Navbar.Brand>
          <Button className="inviteBtn" onClick={inviteRedirect}><i id="envelope" className="fas fa-envelope-open-text"></i> {invites.length}</Button>
          <Button className="float-end m-1" variant="secondary" onClick={props.logout}>Logout</Button>
        </Navbar>
    );
};


export default UserInfo;