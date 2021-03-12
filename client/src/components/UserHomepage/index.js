import React, { useEffect, useContext } from "react";
import UserContext from "../../utils/userContext";



function UserHomepage(props) {
    
    useEffect(() => {
        props.setUser();
    },[]);

    const { id, name, portrait } = useContext(UserContext);
    
    console.log(" id ",id," name ",name," portrait ",portrait);

    return (
        <div>
            <h1>UserHomepage Page</h1>
            <h1>ID:{id}</h1>
            <h1>Name:{name}</h1>
            <h1>Portrait:{portrait}</h1>
        </div>
    );
};


export default UserHomepage;