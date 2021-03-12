import React, { useEffect, useContext } from "react";
import UserContext from "../../utils/userContext";
import Navbar from "react-bootstrap/Navbar";



function UserInfo(props) {
    
    useEffect(() => {
        props.setUser();
    },[]);

    const { id, firstName, lastName, portrait } = useContext(UserContext);
    
    console.log(" id ",id," firstName ",firstName, " lastName ",lastName," portrait ",portrait);


    return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand class="align-right">
            <img
              alt=""
              src={portrait}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            {firstName} {lastName}
          </Navbar.Brand>
        </Navbar>
    );
};


export default UserInfo;