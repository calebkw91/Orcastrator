import React from "react";
import { Link } from "react-router-dom"

function Landing(props){
    return(
        <div>
        <h1>Landing Page</h1>
        <Link to="/login">Login</Link>
        </div>
    )
}


export default Landing;