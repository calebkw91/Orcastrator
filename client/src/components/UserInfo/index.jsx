import {React, useContext } from "react";
import UserContext from "../../utils/UserContext";
import Navbar from "react-bootstrap/Navbar";



function UserInfo(props) {
    const { id, name, portrait } = useContext(UserContext);
    
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
          </Navbar.Brand>
        </Navbar>
    );
};


export default UserInfo;