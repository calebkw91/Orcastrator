import React from "react";
import Button from "react-bootstrap/Button";
import "./style.css"
require("dotenv").config();

function Login() {

    const googleLogin = () => {
        window.open("https://orcastrator.herokuapp.com/auth/google", "_self");
    }
    const githubLogin = () => {
        window.open("https://orcastrator.herokuapp.com/auth/github", "_self");
    }
    const localSignup = () => {
        window.location.assign("/signup");
    }
    const localLogin = () => {
        window.location.assign("/login");
    }

    return (
        <div className="mx-auto row justify-content-center align-self-center">
            <h1 className="title-header">Orcastrator</h1>
            <h2 className="title-subheader">Organize Your Orcas</h2>
            <div className="col-12">
                <div className="justify-content-center">
                    <div className="card card-position">
                        <div className="card-header">
                            <h2>Sign In With:</h2>
                        </div>
                        <div className="card-body loginCardBody">
                            <Button className="oAuthButton" onClick={googleLogin} variant="primary"><span><i className="fab fa-google-plus-square oAuthButton"> Google</i></span></Button>{' '}
                            <Button className="oAuthButton" onClick={githubLogin} variant="dark"><span><i className="fab fa-github "> Github</i></span></Button>
                            <h3>Or Create an Account</h3>
                            <Button variant="secondary" onClick={localSignup}>Create Account</Button>
                            <h3>Already have an Account?</h3>
                            <Button variant="primary" onClick={localLogin}>Login</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;