import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";



function UserHomepage() {

    const { id, firstName, lastName, portrait } = useContext(UserContext);
    
   
   
    return (
        <div>
            <h1>UserHomepage Page</h1>
            <h1>ID:{id}</h1>
            <h1>FirstName:{firstName}</h1>
            <h1>LastName:{lastName}</h1>
            <h1>Portrait:{portrait}</h1>
            <button onClick="window.location.href='window.location.hostname'"/>
        </div>
    )
}


export default UserHomepage;