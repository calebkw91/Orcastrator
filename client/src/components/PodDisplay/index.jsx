import React, { useContext } from "react";
import userContext from "../../utils/UserContext"
import ChatWindow from "../ChatStuffs/ChatWindow";

function PodDisplay(){
    const {firstName,} = useContext(userContext);
    return(
        <div>
        <h1>PodDisplay Page</h1>
        <h1>{firstName}</h1>
        <ChatWindow/>
        </div>
    )
}

export default PodDisplay;
