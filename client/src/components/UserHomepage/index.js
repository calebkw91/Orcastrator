import React, { useContext } from "react";
import UserContext from "../../utils/userContext";



function UserHomepage(props) {
    const { id, name, portrait } = useContext(UserContext);

    return (
        <div>
            <h1>UserHomepage Page</h1>
            <h1>ID:{id}</h1>
            <h1>Name:{name}</h1>
            <h1>Portrait:{portrait}</h1>
            <button onClick={props.logout}>Logout</button>
        </div>
    );
};


export default UserHomepage;