import React, { useContext } from "react";
import userContext from "../../utils/userContext"

function PodDisplay(props){
    const user = useContext(userContext);
    return(
        <div>
        <h1>PodDisplay Page</h1>
        <h1>{user.firstName}</h1>
        </div>
    )
}


export default PodDisplay;