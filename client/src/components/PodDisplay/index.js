import React, { useEffect } from "react";
import socketConnection from "../../utils/socket"

function PodDisplay(props){
    useEffect(()=>{
        socketConnection();
    })
    return(
        <>
        <h1>PodDisplay Page</h1>
        </>
    )
}


export default PodDisplay;