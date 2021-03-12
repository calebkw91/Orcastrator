import React, { useEffect, useContext } from "react";
import UserContext from "../../utils/userContext";



function UserHomepage(props) {
    const { id, name, portrait } = useContext(UserContext);
   
    useEffect(() => {
        if(id === "Not Logged In"){
       window.open("http://localhost:3000/login", "_self")
        };
    },[id])

    useEffect(() => {
         props.setUser()
    }, []);

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