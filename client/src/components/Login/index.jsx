import React from "react";
import Button from "react-bootstrap/Button";
import "./style.css"
require("dotenv").config();

function Login() {

    const googleLogin = () => {
        window.open(process.env.GOOGLE_URL || "http://localhost:8080/auth/google", "_self");
    }
    const githubLogin = () => {
        window.open(process.env.GITHUB_URL || "http://localhost:8080/auth/github", "_self");
    }
    const localSignup = () => {
        window.location.assign("/signup");
    }
    const localLogin = () => {
        window.location.assign("/login");
    }

    return (
        <div className="mx-auto row justify-content-center align-self-center">
            <h1 className="title-header">Orcastrate</h1>
            <h3 className="title-subheader">Market your group</h3>
            <div className="col-12">
                <div className="justify-content-center">
                    <div className="card card-position">
                        <div className="card-header">
                            <h3>Sign In With:</h3>
                        </div>
                        <div className="card-body">
                            <Button variant="primary"><span onClick={googleLogin}><i className="fab fa-google-plus-square"></i></span></Button>{' '}
                            <Button variant="dark"><span onClick={githubLogin}><i className="fab fa-github"></i></span></Button>
<<<<<<< HEAD

=======
>>>>>>> 52b83c1ed26e9b63311972282f0a3051d89f2e69
                            <h3>Or Create an Account</h3>
                            <Button variant="secondary" onClick={localSignup}>Create Account</Button>
                            <h3>Already have an Account?</h3>
                            <Button variant="primary" onClick={localLogin}>Login</Button>
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD

=======
>>>>>>> 52b83c1ed26e9b63311972282f0a3051d89f2e69
        </div>
    )
};

export default Login;