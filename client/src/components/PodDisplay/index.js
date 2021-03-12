import React, { useContext } from "react";
import userContext from "../../utils/UserContext"
import ChatWindow from "../ChatStuffs/ChatWindow";

function PodDisplay(){
    const user = useContext(userContext);
    return(
        <div>
        <h1>PodDisplay Page</h1>
        <h1>{user.firstName}</h1>
        <ChatWindow/>
        </div>
    )
}

export default PodDisplay;
