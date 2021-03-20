import React from "react";
import Login from "../../components/Login";
import "./style.css";

function Landing(props){
    return(
        <div className="landing">
            <div className="container d-flex h-100 ">
                <Login />
            </div>
        </div>
        
    )
}


export default Landing;