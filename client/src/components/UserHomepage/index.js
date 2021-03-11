import React, { useEffect, useContext } from "react";
import UserContext from "../../utils/userContext";



function UserHomepage(props) {
    
    useEffect(() => {
        props.setUser();
    },[])

    const { id, firstName, lastName, portrait } = useContext(UserContext);
    
    console.log(" id ",id," firstName ",firstName, " lastName ",lastName," portrait ",portrait);

    return (
        <div>
            <h1>UserHomepage Page</h1>
            <h1>ID:{id}</h1>
            <h1>FirstName:{firstName}</h1>
            <h1>LastName:{lastName}</h1>
            <h1>Portrait:{portrait}</h1>
        </div>
    )
}


export default UserHomepage;